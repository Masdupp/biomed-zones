import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { activeRunId, responseCache } from '../lib/cache';
import { prisma } from '../lib/db';
import { badRequest, notFound } from '../lib/errors';
import { type Band, trapezoid } from '../lib/fit';
import { cellPolygon, validCell } from '../lib/h3';
import { parametersFor } from '../lib/parameters';
import { params, query } from '../lib/validate';
import { errors, json, registry } from '../openapi';

export const cellsRouter = Router();

const TERRITORIES = ['FXX', 'GLP', 'MTQ', 'GUF', 'REU', 'MYT'] as const;
const H3 = z.string().refine(validCell, 'invalid H3 index');
const boolish = z.enum(['true', 'false', '1', '0']).transform((v) => v === 'true' || v === '1');

const CellsQuery = registry.register(
  'CellsQuery',
  z.object({
    species: z
      .string()
      .regex(/^[a-z-]+$/)
      .max(60),
    resolution: z.coerce
      .number()
      .int()
      .refine((r) => r === 6 || r === 7, 'resolution must be 6 or 7')
      .default(6),
    bbox: z
      .string()
      .regex(/^-?\d+(\.\d+)?(,-?\d+(\.\d+)?){3}$/, 'bbox = minLon,minLat,maxLon,maxLat')
      .optional(),
    minScore: z.coerce.number().min(0).max(100).default(0),
    territory: z.enum(TERRITORIES).optional(),
    excludeProtected: boolish.default('false').openapi({
      description: 'Drop cells where protected areas cover ≥ 50 % of the cell, and excluded cells',
    }),
    format: z.enum(['h3', 'geojson']).default('h3'),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(50_000).optional(),
  }),
);

registry.registerPath({
  method: 'get',
  path: '/cells',
  tags: ['Cells'],
  summary:
    'Scores of one species over the H3 grid (compact H3 rows or GeoJSON), paginated and cached',
  description:
    'format=h3 returns `items` as `[h3, score, category, confidence]` rows (page size up to 50,000, default ' +
    '25,000 — the whole resolution-6 grid fits in one page). format=geojson returns polygons (page size up to ' +
    '5,000, default 2,000).',
  request: { query: CellsQuery },
  responses: { 200: json(z.object({}).passthrough()), ...errors(400, 404) },
});
cellsRouter.get('/cells', async (req, res) => {
  const q = query(req, CellsQuery);
  const maxPage = q.format === 'geojson' ? 5000 : 50_000;
  const pageSize = Math.min(q.pageSize ?? (q.format === 'geojson' ? 2000 : 25_000), maxPage);
  if (!(await prisma.species.findUnique({ where: { id: q.species }, select: { id: true } }))) {
    throw notFound('Species');
  }
  const runId = await activeRunId();
  const key = `cells:${runId}:${JSON.stringify({ ...q, pageSize })}`;
  const hit = responseCache.get(key);
  if (hit)
    return void res.set('Cache-Control', 'public, max-age=300').set('X-Cache', 'HIT').json(hit);

  const where: Prisma.Sql[] = [
    Prisma.sql`s.species_id = ${q.species}`,
    Prisma.sql`s.resolution = ${q.resolution}`,
    Prisma.sql`s.score >= ${q.minScore}`,
  ];
  if (q.territory) where.push(Prisma.sql`c.territory_code = ${q.territory}`);
  if (q.bbox) {
    const [x0, y0, x1, y1] = q.bbox.split(',').map(Number) as [number, number, number, number];
    if (x0 >= x1 || y0 >= y1) throw badRequest('bbox must be minLon,minLat,maxLon,maxLat');
    where.push(Prisma.sql`c.geom && ST_MakeEnvelope(${x0}, ${y0}, ${x1}, ${y1}, 4326)`);
  }
  if (q.excludeProtected) {
    where.push(Prisma.sql`s.mode <> 'excluded'`);
    where.push(Prisma.sql`NOT EXISTS (SELECT 1 FROM cell_feature pf WHERE pf.h3 = s.h3
      AND pf.feature_key = 'protected_frac' AND pf.value >= 0.5)`);
  }
  const cond = Prisma.join(where, ' AND ');
  const offset = (q.page - 1) * pageSize;
  const [countRow] = await prisma.$queryRaw<{ total: bigint }[]>`
    SELECT count(*) AS total FROM score s JOIN cell c ON c.h3 = s.h3 WHERE ${cond}`;
  const total = countRow?.total ?? 0n;

  let body: object;
  if (q.format === 'h3') {
    const rows = await prisma.$queryRaw<
      { h3: string; score: number; category: string; confidence: number }[]
    >`
      SELECT s.h3, s.score, s.category, s.confidence FROM score s JOIN cell c ON c.h3 = s.h3
      WHERE ${cond} ORDER BY s.h3 LIMIT ${pageSize} OFFSET ${offset}`;
    body = {
      species: q.species,
      runId,
      resolution: q.resolution,
      total: Number(total),
      page: q.page,
      pageSize,
      columns: ['h3', 'score', 'category', 'confidence'],
      items: rows.map((r) => [
        r.h3,
        Math.round(r.score * 10) / 10,
        r.category,
        Math.round(r.confidence * 100) / 100,
      ]),
    };
  } else {
    const rows = await prisma.$queryRaw<
      {
        h3: string;
        score: number;
        category: string;
        confidence: number;
        mode: string;
        territory: string;
        geometry: string;
      }[]
    >`
      SELECT s.h3, s.score, s.category, s.confidence, s.mode, c.territory_code AS territory,
             ST_AsGeoJSON(c.geom, 6) AS geometry
      FROM score s JOIN cell c ON c.h3 = s.h3
      WHERE ${cond} ORDER BY s.h3 LIMIT ${pageSize} OFFSET ${offset}`;
    body = {
      type: 'FeatureCollection',
      species: q.species,
      runId,
      resolution: q.resolution,
      total: Number(total),
      page: q.page,
      pageSize,
      features: rows.map((r) => ({
        type: 'Feature',
        id: r.h3,
        geometry: JSON.parse(r.geometry),
        properties: {
          h3: r.h3,
          score: r.score,
          category: r.category,
          confidence: r.confidence,
          mode: r.mode,
          territory: r.territory,
        },
      })),
    };
  }
  responseCache.set(key, body);
  res.set('Cache-Control', 'public, max-age=300').set('X-Cache', 'MISS').json(body);
});

type FeatureRow = {
  feature_key: string;
  value: number;
  label: string;
  unit: string;
  domain: string;
  description: string;
  provenance_id: string;
  provenance_name: string;
  license: string;
  retrieved_at: Date;
  mode: string;
  spatial_resolution: string;
  temporal_coverage: string | null;
};

export async function cellProfile(h3: string) {
  const cell = await prisma.cell.findUnique({
    where: { h3 },
    include: { territory: { select: { name: true, kind: true } } },
  });
  if (!cell) return null;
  const [features, scores] = await Promise.all([
    prisma.$queryRaw<FeatureRow[]>`
      SELECT cf.feature_key, cf.value, fd.label, fd.unit, fd.domain, fd.description, cf.provenance_id,
             p.name AS provenance_name, p.license, p.retrieved_at, p.mode, p.spatial_resolution,
             p.temporal_coverage
      FROM cell_feature cf
      JOIN feature_def fd ON fd.key = cf.feature_key
      JOIN provenance p ON p.id = cf.provenance_id
      WHERE cf.h3 = ${h3} ORDER BY fd.domain, cf.feature_key`,
    prisma.score.findMany({ where: { h3 }, orderBy: { score: 'desc' } }),
  ]);
  return { cell, features, scores };
}

registry.registerPath({
  method: 'get',
  path: '/cells/{h3}',
  tags: ['Cells'],
  summary: 'Full profile of one cell: environment with provenance, and scores for every species',
  request: { params: z.object({ h3: H3 }) },
  responses: { 200: json(z.object({}).passthrough()), ...errors(400, 404) },
});
cellsRouter.get('/cells/:h3', async (req, res) => {
  const { h3 } = params(req, z.object({ h3: H3 }));
  const p = await cellProfile(h3);
  if (!p) throw notFound('Cell');
  const { cell, features, scores } = p;
  const children =
    cell.resolution === 6
      ? (await prisma.cell.findMany({ where: { parentH3: h3 }, select: { h3: true } })).map(
          (c) => c.h3,
        )
      : [];
  const grouped: Record<string, object[]> = {};
  for (const f of features) {
    (grouped[f.domain] ??= []).push({
      key: f.feature_key,
      label: f.label,
      unit: f.unit,
      value: f.value,
      description: f.description,
      provenance: {
        id: f.provenance_id,
        name: f.provenance_name,
        license: f.license,
        retrievedAt: f.retrieved_at.toISOString(),
        mode: f.mode,
        spatialResolution: f.spatial_resolution,
        temporalCoverage: f.temporal_coverage,
      },
    });
  }
  res.set('Cache-Control', 'public, max-age=300').json({
    h3,
    resolution: cell.resolution,
    territory: { code: cell.territoryCode, name: cell.territory.name, kind: cell.territory.kind },
    centroid: { lat: cell.lat, lon: cell.lon },
    areaKm2: cell.areaKm2,
    landFraction: cell.landFraction,
    seaFraction: cell.seaFraction,
    parent: cell.parentH3,
    children,
    geometry: { type: 'Polygon', coordinates: cellPolygon(h3) },
    features: grouped,
    scores: scores.map((s) => ({
      species: s.speciesId,
      score: s.score,
      category: s.category,
      mode: s.mode,
      expertScore: s.expertScore,
      mlScore: s.mlScore,
      confidence: s.confidence,
      completeness: s.completeness,
      modifiers: { regulatory: s.regulatoryMod, human: s.humanMod, data: s.dataMod },
      limiting: s.limiting,
      drivers: s.drivers,
      runId: s.runId,
    })),
  });
});

const CompareQuery = registry.register(
  'CompareQuery',
  z.object({
    cells: z
      .string()
      .transform((v) => [
        ...new Set(
          v
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean),
        ),
      ])
      .pipe(z.array(H3).min(2, 'compare 2 to 4 cells').max(4, 'compare 2 to 4 cells')),
    species: z
      .string()
      .regex(/^[a-z-]+$/)
      .max(60),
  }),
);

registry.registerPath({
  method: 'get',
  path: '/compare',
  tags: ['Cells'],
  summary:
    'Two to four cells side by side for one species (parameter fits for a radar chart + table)',
  request: { query: CompareQuery },
  responses: { 200: json(z.object({}).passthrough()), ...errors(400, 404) },
});
cellsRouter.get('/compare', async (req, res) => {
  const q = query(req, CompareQuery);
  const sp = await prisma.species.findUnique({ where: { id: q.species } });
  if (!sp) throw notFound('Species');
  const profiles = await Promise.all(q.cells.map((h) => cellProfile(h)));
  const missing = q.cells.filter((_, i) => !profiles[i]);
  if (missing.length) throw notFound(`Cell(s) ${missing.join(', ')}`);
  const tolerances = (sp.tolerances as Record<string, Band> | null) ?? {};
  const parameters = parametersFor(sp.habitat);
  res.json({
    species: { id: sp.id, scientificName: sp.scientificName, habitat: sp.habitat },
    parameters: parameters.map((p) => ({ ...p, band: tolerances[p.key] ?? null })),
    cells: profiles
      .flatMap((p) => (p ? [p] : []))
      .map(({ cell, features, scores }) => {
        const values = Object.fromEntries(features.map((f) => [f.feature_key, f.value]));
        const s = scores.find((x) => x.speciesId === sp.id) ?? null;
        return {
          h3: cell.h3,
          resolution: cell.resolution,
          territory: cell.territoryCode,
          centroid: { lat: cell.lat, lon: cell.lon },
          score: s && {
            score: s.score,
            category: s.category,
            mode: s.mode,
            expertScore: s.expertScore,
            mlScore: s.mlScore,
            confidence: s.confidence,
            modifiers: { regulatory: s.regulatoryMod, human: s.humanMod, data: s.dataMod },
            limiting: s.limiting,
          },
          parameters: parameters.map((pm) => {
            const value = values[pm.feature] ?? null;
            const band = tolerances[pm.key];
            return { key: pm.key, value, fit: band ? trapezoid(value, band) : null };
          }),
          features: values,
        };
      }),
  });
});
