import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { activeRunId, responseCache } from '../lib/cache';
import { notFound } from '../lib/errors';
import { parametersFor } from '../lib/parameters';
import { params, query } from '../lib/validate';
import { errors, json, registry } from '../openapi';

export const speciesRouter = Router();

type Json = Record<string, unknown>;
const SpeciesId = z.object({
  id: z
    .string()
    .regex(/^[a-z-]+$/)
    .max(60),
});

async function modelMetrics(runId: string | null) {
  if (!runId) return new Map<string, Json>();
  const rows = await prisma.speciesMetric.findMany({ where: { runId } });
  return new Map(
    rows.map((m) => [
      m.speciesId,
      {
        runId,
        trained: m.trained,
        reason: m.reason,
        nPresences: m.nPresences,
        nBackground: m.nBackground,
        aucMean: m.aucMean,
        aucStd: m.aucStd,
        tssMean: m.tssMean,
        tssStd: m.tssStd,
        baselineAucMean: m.lrAucMean,
        baselineTssMean: m.lrTssMean,
      },
    ]),
  );
}

async function scoreSummary(runId: string | null) {
  if (!runId) return new Map<string, Json>();
  const rows = await prisma.$queryRaw<{ species_id: string; category: string; n: bigint }[]>`
    SELECT species_id, category, count(*) AS n FROM score WHERE resolution = 7
    GROUP BY species_id, category`;
  const out = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const m = out.get(r.species_id) ?? {};
    m[r.category] = Number(r.n);
    out.set(r.species_id, m);
  }
  return out;
}

const SpeciesSummary = registry.register(
  'SpeciesSummary',
  z.object({
    id: z.string(),
    scientificName: z.string(),
    commonNameEn: z.string().nullable(),
    commonNameFr: z.string().nullable(),
    habitat: z.enum(['marine', 'freshwater', 'terrestrial']),
    iucn: z.object({ category: z.string(), code: z.string(), source: z.string() }).nullable(),
    photo: z.object({}).passthrough().nullable(),
    compounds: z.array(z.string()),
    cultivationDifficulty: z.string().nullable(),
    occurrences: z.number().int(),
    model: z.object({}).passthrough().nullable(),
    cellsByCategory: z.record(z.number()),
  }),
);

registry.registerPath({
  method: 'get',
  path: '/species',
  tags: ['Species'],
  summary: 'The nine species with headline facts, model metrics and score distribution',
  responses: {
    200: json(z.object({ runId: z.string().nullable(), items: z.array(SpeciesSummary) })),
  },
});
speciesRouter.get('/species', async (_req, res) => {
  const runId = await activeRunId();
  const key = `species:${runId}`;
  const hit = responseCache.get(key);
  if (hit) return void res.set('Cache-Control', 'public, max-age=300').json(hit);
  const [species, counts, metrics, summary] = await Promise.all([
    prisma.species.findMany({ orderBy: { scientificName: 'asc' } }),
    prisma.occurrence.groupBy({ by: ['speciesId'], _count: { _all: true } }),
    modelMetrics(runId),
    scoreSummary(runId),
  ]);
  const occ = new Map(counts.map((c) => [c.speciesId, c._count._all]));
  const body = {
    runId,
    items: species.map((s) => ({
      id: s.id,
      scientificName: s.scientificName,
      commonNameEn: s.commonNameEn,
      commonNameFr: s.commonNameFr,
      habitat: s.habitat,
      iucn: s.iucn,
      photo: s.photo,
      compounds: ((s.medicalApplications as Json[] | null) ?? []).map((m) => String(m.compound)),
      cultivationDifficulty: s.cultivationDifficulty,
      occurrences: occ.get(s.id) ?? 0,
      model: metrics.get(s.id) ?? null,
      cellsByCategory: summary.get(s.id) ?? {},
    })),
  };
  responseCache.set(key, body);
  res.set('Cache-Control', 'public, max-age=300').json(body);
});

registry.registerPath({
  method: 'get',
  path: '/species/{id}',
  tags: ['Species'],
  summary:
    'Full species profile: taxonomy, medical uses, tolerance bands, references, model metrics',
  request: { params: SpeciesId },
  responses: { 200: json(z.object({}).passthrough()), ...errors(404) },
});
speciesRouter.get('/species/:id', async (req, res) => {
  const { id } = params(req, SpeciesId);
  const s = await prisma.species.findUnique({ where: { id } });
  if (!s) throw notFound('Species');
  const runId = await activeRunId();
  const [metrics, occ, bySource] = await Promise.all([
    modelMetrics(runId),
    prisma.occurrence.count({ where: { speciesId: id } }),
    prisma.occurrence.groupBy({ by: ['source'], where: { speciesId: id }, _count: { _all: true } }),
  ]);
  const refs = (s.references as Record<string, Json> | null) ?? {};
  const resolve = (keys: string[]) => keys.map((k) => refs[k] ?? { key: k, status: 'to verify' });
  const medical = ((s.medicalApplications as Json[] | null) ?? []).map((m) => ({
    ...m,
    references: resolve((m.references as string[]) ?? []),
  }));
  const tolerances = (s.tolerances as Record<string, Json> | null) ?? {};
  const parameters = parametersFor(s.habitat).map((p) => ({
    ...p,
    band: tolerances[p.key] ?? null,
  }));
  const metric = metrics.get(id);
  const metricRow =
    metric && runId
      ? await prisma.speciesMetric.findUnique({
          where: { runId_speciesId: { runId, speciesId: id } },
        })
      : null;
  const detail = metricRow?.detail as Json | undefined;
  res.set('Cache-Control', 'public, max-age=300').json({
    id: s.id,
    scientificName: s.scientificName,
    authorship: s.authorship,
    commonNameEn: s.commonNameEn,
    commonNameFr: s.commonNameFr,
    habitat: s.habitat,
    taxonomy: s.taxonomy,
    iucn: s.iucn,
    gbifTaxonKey: s.gbifTaxonKey,
    photo: s.photo,
    medicalApplications: medical,
    parameters,
    frostSensitive: s.frostSensitive,
    toleranceNote: s.toleranceNote,
    toleranceReferences: resolve(s.toleranceReferences),
    toleranceStatus: 'Literature-derived approximation; requires expert validation',
    cultivationDifficulty: s.cultivationDifficulty,
    cultivationNote: s.cultivationNote,
    nativeTerritories: s.nativeTerritories,
    nativeNote: s.nativeNote,
    occurrences: {
      total: occ,
      bySource: Object.fromEntries(bySource.map((b) => [b.source, b._count._all])),
    },
    model: metric
      ? {
          ...metric,
          calibration: detail?.calibration,
          importance: detail?.importance,
          cv: detail?.cv,
        }
      : null,
    profileUpdatedAt: s.profileUpdatedAt,
  });
});

const OccQuery = z.object({
  bbox: z
    .string()
    .regex(/^-?\d+(\.\d+)?(,-?\d+(\.\d+)?){3}$/, 'bbox = minLon,minLat,maxLon,maxLat')
    .optional(),
  limit: z.coerce.number().int().min(1).max(20_000).default(5000),
});

registry.registerPath({
  method: 'get',
  path: '/species/{id}/occurrences',
  tags: ['Species'],
  summary: 'Occurrence points (GBIF / OBIS) as GeoJSON, thinned to one per 0.05° square',
  request: { params: SpeciesId, query: OccQuery },
  responses: {
    200: json(z.object({ type: z.literal('FeatureCollection') }).passthrough()),
    ...errors(400, 404),
  },
});
speciesRouter.get('/species/:id/occurrences', async (req, res) => {
  const { id } = params(req, SpeciesId);
  const q = query(req, OccQuery);
  if (!(await prisma.species.findUnique({ where: { id }, select: { id: true } })))
    throw notFound('Species');
  const [x0, y0, x1, y1] = q.bbox ? q.bbox.split(',').map(Number) : [-180, -90, 180, 90];
  const rows = await prisma.$queryRaw<
    { lat: number; lon: number; source: string; year: number | null; n: bigint }[]
  >`
    SELECT round(lat::numeric, 2)::float AS lat, round(lon::numeric, 2)::float AS lon,
           min(source) AS source, max(year)::int AS year, count(*) AS n
    FROM occurrence
    WHERE species_id = ${id} AND lon BETWEEN ${x0} AND ${x1} AND lat BETWEEN ${y0} AND ${y1}
    GROUP BY round(lat::numeric * 20), round(lon::numeric * 20), round(lat::numeric, 2), round(lon::numeric, 2)
    LIMIT ${q.limit}`;
  res.set('Cache-Control', 'public, max-age=3600').json({
    type: 'FeatureCollection',
    provenance: ['gbif', 'obis'],
    features: rows.map((r) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [r.lon, r.lat] },
      properties: { source: r.source, lastYear: r.year, records: Number(r.n) },
    })),
  });
});
