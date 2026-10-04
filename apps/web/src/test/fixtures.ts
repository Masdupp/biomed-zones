import type { SpeciesSummary, User } from '@/lib/types';

const NAMES = [
  'Arenicola marina',
  'Conus magus',
  'Limulus polyphemus',
  'Holothuria tubulosa',
  'Danio rerio',
  'Ambystoma mexicanum',
  'Catharanthus roseus',
  'Salix alba',
  'Ginkgo biloba',
];

export const SPECIES: SpeciesSummary[] = NAMES.map((n, i) => ({
  id: n.toLowerCase().replace(' ', '-'),
  scientificName: n,
  commonNameEn: `Common ${i}`,
  commonNameFr: null,
  habitat: i < 4 ? 'marine' : i < 6 ? 'freshwater' : 'terrestrial',
  iucn: { category: 'LEAST_CONCERN', code: 'LC', source: 'test' },
  photo: null,
  compounds: [`Compound ${i}`],
  cultivationDifficulty: 'low',
  occurrences: 100 * (i + 1),
  model: null,
  cellsByCategory: {},
}));

export const ADMIN: User = {
  id: 'u1',
  email: 'admin@test',
  displayName: 'Ada Lovelace',
  role: 'ADMIN',
  createdAt: '2026-01-01',
};

/** fetch stub routing by path; `user` controls the session. */
export function mockApi(user: User | null = null, overrides: Record<string, unknown> = {}) {
  const routes: Record<string, unknown> = {
    '/api/auth/session': { user, refreshable: Boolean(user) },
    '/api/species': { runId: 'run-x', items: SPECIES },
    '/api/stats': {
      cellsAnalysed: { value: 150146, resolution6: 22030, source: 'cell table' },
      occurrencesUsed: { value: 278852, source: 'GBIF + OBIS' },
      dataSources: { value: 20, source: 'registry' },
      dataset: { mode: 'snapshot', snapshotVersion: '2026.10.04', loadedAt: null },
      model: { runId: 'run-x', finishedAt: '2026-10-04' },
    },
    '/api/health': {
      status: 'ok',
      version: '2.0.0',
      checks: { database: { status: 'ok', postgis: '3.6.4', h3: '4.2.3' }, ml: { status: 'ok' } },
    },
    '/ml/health': { status: 'ok', service: 'ml', version: '2.0.0', database: 'ok' },
    ...overrides,
  };
  return vi.fn(async (input: string | URL | Request) => {
    const path = String(input).split('?')[0] ?? '';
    if (path in routes) return new Response(JSON.stringify(routes[path]), { status: 200 });
    return new Response(JSON.stringify({ error: 'not_found', message: 'not mocked' }), {
      status: 404,
    });
  });
}
