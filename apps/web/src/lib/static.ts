/**
 * Static demo mode (GitHub Pages build, `VITE_STATIC=1`). There is no server: requests to the
 * API/ML routes are answered from files exported by scripts/export-static.mjs. Read-only routes
 * return the exact responses of the full stack at resolution 6; everything else (sign-in,
 * contributions, admin, PDF reports, resolution 7) answers 503 with an explanation.
 */
import type { CellProfile, CellsResponse, SpeciesDetail } from './types';

export const STATIC = import.meta.env.VITE_STATIC === '1';
/** Source repository, linked from the static demo's banner and header. */
export const REPO_URL: string = import.meta.env.VITE_REPO_URL ?? '';

/** URL of a file under the site's base path (`/` locally, `/biomed-zones/` on Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export class StaticUnavailable extends Error {
  readonly status = 503;
  readonly code = 'static_demo';
  constructor(what: string) {
    super(
      `${what} needs the full application (API, database and ML service). This is the read-only static demo: run it locally with \`docker compose up\`.`,
    );
  }
}

// --- loading -----------------------------------------------------------------------------
const cache = new Map<string, Promise<unknown>>();

async function decode(res: Response): Promise<unknown> {
  const bytes = new Uint8Array(await res.arrayBuffer());
  // GitHub Pages serves .gz files as-is; some servers decompress them on the way (Content-Encoding).
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return JSON.parse(new TextDecoder().decode(bytes));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return JSON.parse(await new Response(stream).text());
}

async function loadJson<T>(file: string): Promise<T> {
  let pending = cache.get(file);
  if (!pending) {
    pending = fetch(asset(`data/${file}`)).then((res) => {
      if (!res.ok) throw new Error(`${res.status} data/${file}`);
      return decode(res);
    });
    pending.catch(() => cache.delete(file));
    cache.set(file, pending);
  }
  return pending as Promise<T>;
}

/** Tiles reference repeated strings/objects by index into dict.json: `{ "$": 12 }`. */
type Packed = unknown;
function expand(v: Packed, dict: unknown[]): unknown {
  if (Array.isArray(v)) return v.map((x) => expand(x, dict));
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o.$ === 'number' && Object.keys(o).length === 1) return dict[o.$];
    return Object.fromEntries(Object.entries(o).map(([k, x]) => [k, expand(x, dict)]));
  }
  return v;
}

async function fromTile<T>(dir: string, h3: string): Promise<T | null> {
  const { cellToParent, getResolution, isValidCell } = await import('h3-js');
  if (!isValidCell(h3) || getResolution(h3) !== 6) return null;
  const [dict, tile] = await Promise.all([
    loadJson<unknown[]>('dict.json'),
    loadJson<Record<string, Packed>>(`${dir}/${cellToParent(h3, 3)}.json.gz`).catch(() => ({})),
  ]);
  const packed = (tile as Record<string, Packed>)[h3];
  return packed === undefined ? null : (expand(packed, dict) as T);
}

const notFound = (what: string) =>
  Object.assign(new Error(`${what} is not part of the static demo (resolution 6 only).`), {
    status: 404,
    code: 'not_found',
  });

// --- routes ------------------------------------------------------------------------------
interface ExplainLike {
  score: {
    score: number;
    category: string;
    mode: string;
    expert_score: number | null;
    ml_score: number | null;
    confidence: number;
    regulatory_mod: number;
    human_mod: number;
    data_mod: number;
    limiting: unknown[];
    parameters: { key: string; value: number | null; fit: number | null }[];
  };
  features: Record<string, number>;
}

/** /api/compare assembled from the same cell and explanation tiles. */
async function compare(species: string, cells: string[]) {
  const detail = await loadJson<SpeciesDetail>(`species/${species}.json`);
  const rows = await Promise.all(
    cells.map(async (h3) => {
      const [profile, explain] = await Promise.all([
        fromTile<CellProfile>('cell', h3),
        fromTile<ExplainLike>(`explain/${species}`, h3),
      ]);
      if (!profile) throw notFound(`Cell ${h3}`);
      const s = explain?.score;
      return {
        h3,
        resolution: profile.resolution,
        territory: profile.territory.code,
        centroid: profile.centroid,
        score: s
          ? {
              score: s.score,
              category: s.category,
              mode: s.mode,
              expertScore: s.expert_score,
              mlScore: s.ml_score,
              confidence: s.confidence,
              modifiers: { regulatory: s.regulatory_mod, human: s.human_mod, data: s.data_mod },
              limiting: s.limiting,
            }
          : null,
        parameters: s ? s.parameters.map(({ key, value, fit }) => ({ key, value, fit })) : [],
        features: explain?.features ?? {},
      };
    }),
  );
  return {
    species: { id: detail.id, scientificName: detail.scientificName, habitat: detail.habitat },
    parameters: detail.parameters,
    cells: rows,
  };
}

export async function staticRequest(path: string, method = 'GET'): Promise<unknown> {
  const url = new URL(path, 'http://static');
  const p = url.pathname;
  const q = url.searchParams;
  if (p === '/api/auth/session') return { user: null, refreshable: false };
  if (p.startsWith('/api/auth/')) throw new StaticUnavailable('Signing in');
  if (method !== 'GET') throw new StaticUnavailable('This action');

  const simple: Record<string, string> = {
    '/api/stats': 'stats.json',
    '/api/species': 'species.json',
    '/api/sources': 'sources.json',
    '/api/health': 'health-api.json',
    '/ml/health': 'health-ml.json',
    '/ml/metrics': 'metrics.json',
    '/api/coverage': 'coverage-6.json.gz',
  };
  if (simple[p]) return loadJson(simple[p]);
  if (p === '/api/contributions') return { total: 0, items: [] };

  let m = p.match(/^\/api\/species\/([\w-]+)\/occurrences$/);
  if (m) return loadJson(`occurrences/${m[1]}.json.gz`);
  m = p.match(/^\/api\/species\/([\w-]+)$/);
  if (m) return loadJson(`species/${m[1]}.json`);

  if (p === '/api/cells') {
    if (q.get('resolution') !== '6') throw notFound('Resolution 7');
    const species = q.get('species') ?? '';
    const file = q.get('excludeProtected') === 'true' ? `${species}-unprotected` : species;
    return loadJson<CellsResponse>(`cells/${file}.json.gz`);
  }
  m = p.match(/^\/api\/cells\/([0-9a-f]{15})$/);
  if (m?.[1]) return (await fromTile('cell', m[1])) ?? Promise.reject(notFound(`Cell ${m[1]}`));
  if (p === '/ml/explain') {
    const h3 = q.get('h3') ?? '';
    return (
      (await fromTile(`explain/${q.get('species')}`, h3)) ??
      Promise.reject(notFound(`The explanation of ${h3}`))
    );
  }
  if (p === '/api/compare')
    return compare(q.get('species') ?? '', (q.get('cells') ?? '').split(','));
  if (p.startsWith('/api/reports/')) throw new StaticUnavailable('PDF reports');
  throw new StaticUnavailable('This page');
}
