import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { notFound } from '../lib/errors';
import { params } from '../lib/validate';
import { errors, json, registry } from '../openapi';

export const sourcesRouter = Router();

const Provenance = registry.register(
  'Provenance',
  z.object({
    id: z.string(),
    sourceKey: z.string(),
    name: z.string(),
    url: z.string(),
    license: z.string(),
    licenseUrl: z.string().nullable(),
    citation: z.string().nullable(),
    spatialResolution: z.string(),
    temporalCoverage: z.string().nullable(),
    temporalResolution: z.string().nullable(),
    variables: z.array(z.string()),
    accessMethod: z.string().nullable(),
    mode: z.enum(['live', 'snapshot-fallback', 'derived']),
    retrievedAt: z.string(),
    recordCount: z.number().nullable(),
    notes: z.string().nullable(),
    cellValues: z.number(),
    occurrences: z.number(),
    features: z.array(z.string()),
  }),
);

async function usage() {
  const [values, occ, feats] = await Promise.all([
    prisma.$queryRaw<{ provenance_id: string; n: bigint }[]>`
      SELECT provenance_id, count(*) AS n FROM cell_feature GROUP BY provenance_id`,
    prisma.occurrence.groupBy({ by: ['provenanceId'], _count: { _all: true } }),
    prisma.$queryRaw<{ provenance_id: string; feature_key: string }[]>`
      SELECT DISTINCT provenance_id, feature_key FROM cell_feature`,
  ]);
  const f = new Map<string, string[]>();
  for (const r of feats) f.set(r.provenance_id, [...(f.get(r.provenance_id) ?? []), r.feature_key]);
  return {
    values: new Map(values.map((v) => [v.provenance_id, Number(v.n)])),
    occ: new Map(occ.map((o) => [o.provenanceId, o._count._all])),
    features: f,
  };
}

let usageCache: { at: number; data: Awaited<ReturnType<typeof usage>> } | null = null;
async function cachedUsage() {
  if (!usageCache || Date.now() - usageCache.at > 10 * 60 * 1000)
    usageCache = { at: Date.now(), data: await usage() };
  return usageCache.data;
}

function dto(
  p: Awaited<ReturnType<typeof prisma.provenance.findMany>>[number],
  u: Awaited<ReturnType<typeof usage>>,
) {
  return {
    id: p.id,
    sourceKey: p.sourceKey,
    name: p.name,
    url: p.url,
    license: p.license,
    licenseUrl: p.licenseUrl,
    citation: p.citation,
    spatialResolution: p.spatialResolution,
    temporalCoverage: p.temporalCoverage,
    temporalResolution: p.temporalResolution,
    variables: p.variables,
    accessMethod: p.accessMethod,
    mode: p.mode,
    retrievedAt: p.retrievedAt.toISOString(),
    recordCount: p.recordCount,
    notes: p.notes,
    cellValues: u.values.get(p.id) ?? 0,
    occurrences: u.occ.get(p.id) ?? 0,
    features: (u.features.get(p.id) ?? []).sort(),
  };
}

registry.registerPath({
  method: 'get',
  path: '/sources',
  tags: ['Sources'],
  summary: 'Provenance registry: every data source with licence, retrieval date and usage',
  responses: { 200: json(z.object({ items: z.array(Provenance) })) },
});
sourcesRouter.get('/sources', async (_req, res) => {
  const [list, u] = await Promise.all([
    prisma.provenance.findMany({ orderBy: { name: 'asc' } }),
    cachedUsage(),
  ]);
  res.set('Cache-Control', 'public, max-age=600').json({ items: list.map((p) => dto(p, u)) });
});

const Id = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .max(80),
});
registry.registerPath({
  method: 'get',
  path: '/sources/{id}',
  tags: ['Sources'],
  summary: 'One provenance record',
  request: { params: Id },
  responses: { 200: json(Provenance), ...errors(404) },
});
sourcesRouter.get('/sources/:id', async (req, res) => {
  const { id } = params(req, Id);
  const p = await prisma.provenance.findUnique({ where: { id } });
  if (!p) throw notFound('Source');
  res.json(dto(p, await cachedUsage()));
});

const FeatureDef = registry.register(
  'FeatureDef',
  z.object({
    key: z.string(),
    label: z.string(),
    unit: z.string(),
    domain: z.string(),
    description: z.string(),
  }),
);
registry.registerPath({
  method: 'get',
  path: '/features',
  tags: ['Sources'],
  summary: 'Feature dictionary (label, unit, domain, definition)',
  responses: { 200: json(z.object({ items: z.array(FeatureDef) })) },
});
sourcesRouter.get('/features', async (_req, res) => {
  const items = await prisma.featureDef.findMany({ orderBy: [{ domain: 'asc' }, { key: 'asc' }] });
  res.set('Cache-Control', 'public, max-age=3600').json({ items });
});

registry.registerPath({
  method: 'get',
  path: '/stats',
  tags: ['System'],
  summary: 'Headline numbers with their provenance (home page)',
  responses: { 200: json(z.object({}).passthrough()) },
});
sourcesRouter.get('/stats', async (_req, res) => {
  const [cells, occurrences, sources, meta, run] = await Promise.all([
    prisma.cell.groupBy({ by: ['resolution'], _count: { _all: true } }),
    prisma.occurrence.count(),
    prisma.provenance.count(),
    prisma.appMeta.findMany(),
    prisma.modelRun.findFirst({
      where: { isActive: true },
      select: { id: true, finishedAt: true },
    }),
  ]);
  const byRes = Object.fromEntries(cells.map((c) => [`r${c.resolution}`, c._count._all]));
  const m = Object.fromEntries(meta.map((x) => [x.key, x.value]));
  res.set('Cache-Control', 'public, max-age=300').json({
    cellsAnalysed: {
      value: byRes.r7 ?? 0,
      resolution6: byRes.r6 ?? 0,
      source: 'cell table (H3 resolution 7)',
    },
    occurrencesUsed: {
      value: occurrences,
      source: 'GBIF download 10.15468/dl.sfc2ns + OBIS',
      provenance: ['gbif', 'obis'],
    },
    dataSources: { value: sources, source: 'provenance registry (/sources)' },
    species: 9,
    dataset: {
      mode: m.dataset_mode ?? null,
      snapshotVersion: m.snapshot_version || null,
      loadedAt: m.loaded_at ?? null,
    },
    model: run ? { runId: run.id, finishedAt: run.finishedAt } : null,
  });
});
