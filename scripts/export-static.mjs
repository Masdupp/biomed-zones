// Exports the read-only data of the static demo (GitHub Pages) from a running stack.
// Usage: RATE_LIMIT_ENABLED=false make demo && node scripts/export-static.mjs [baseUrl]
//   → apps/web/static-data/ (copied into the static build by scripts/build-static.mjs)
//
// The responses are the real API/ML responses (resolution 6), so the static site shows exactly
// what the full stack shows. To keep the site small they are grouped into spatial tiles (H3
// resolution-3 parents), repeated strings and string-only objects (labels, descriptions,
// provenance records) are stored once in dict.json, floats are rounded to 6 significant digits
// (the source rasters are float32) and tiles are gzipped. apps/web/src/lib/static.ts reverses it.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { cellToParent } from 'h3-js';

const base =
  process.argv.slice(2).find((a) => !a.startsWith('--')) ??
  process.env.BASE_URL ??
  'http://localhost:8080';
const out = 'apps/web/static-data';
const CONCURRENCY = 16;

async function get(path, attempt = 1) {
  const res = await fetch(base + path);
  if (res.status === 429)
    throw new Error('rate limited: restart the stack with RATE_LIMIT_ENABLED=false');
  if (!res.ok) {
    if (attempt < 3 && res.status >= 500) return get(path, attempt + 1);
    throw new Error(`${res.status} ${path}`);
  }
  return res.json();
}

/** Runs `fn` over `items` with bounded concurrency, logging progress. */
async function pool(label, items, fn) {
  let next = 0;
  let done = 0;
  const started = Date.now();
  const worker = async () => {
    while (next < items.length) {
      const item = items[next++];
      await fn(item);
      if (++done % 2000 === 0 || done === items.length)
        console.log(
          `  ${label}: ${done}/${items.length} (${((Date.now() - started) / 1000).toFixed(0)} s)`,
        );
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

// --- compaction ---------------------------------------------------------------------------
const dict = [];
const dictIndex = new Map();
const H3 = /^[0-9a-f]{15}$/;
const intern = (value) => {
  const key = JSON.stringify(value);
  let i = dictIndex.get(key);
  if (i === undefined) {
    i = dict.length;
    dict.push(value);
    dictIndex.set(key, i);
  }
  return { $: i };
};
const hasNumber = (v) =>
  typeof v === 'number' ||
  (v !== null && typeof v === 'object' && Object.values(v).some(hasNumber));

function compact(v) {
  if (typeof v === 'number') return Number.isInteger(v) ? v : Number(v.toPrecision(6));
  if (typeof v === 'string') return v.length >= 12 && !H3.test(v) ? intern(v) : v;
  if (Array.isArray(v)) return v.map(compact);
  if (v && typeof v === 'object') {
    if (!hasNumber(v) && JSON.stringify(v).length >= 24) return intern(v);
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, compact(x)]));
  }
  return v;
}

const write = (path, data) => {
  mkdirSync(dirname(`${out}/${path}`), { recursive: true });
  writeFileSync(`${out}/${path}`, JSON.stringify(data));
};
const writeGz = (path, data) => {
  mkdirSync(dirname(`${out}/${path}`), { recursive: true });
  writeFileSync(`${out}/${path}.gz`, gzipSync(JSON.stringify(data), { level: 9 }));
};
const tileOf = (h3) => cellToParent(h3, 3);

// --- repack ---------------------------------------------------------------------------------
/**
 * Keeps in dict.json only the entries referenced at least MIN_REFS times across all tiles and
 * inlines the others (e.g. per-cell recommendation texts), so the browser downloads a small
 * dictionary once and gzip handles local repetition inside each tile.
 */
const MIN_REFS = 3;
function repack(dictionary) {
  const files = readdirSync(out, { recursive: true })
    .map(String)
    .filter((f) => f.endsWith('.json.gz') && /^(cell|explain)\//.test(f));
  const counts = new Uint32Array(dictionary.length);
  const isRef = (v) =>
    v &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    typeof v.$ === 'number' &&
    Object.keys(v).length === 1;
  const walk = (v, fn) => {
    if (Array.isArray(v)) return v.map((x) => walk(x, fn));
    if (isRef(v)) return fn(v.$);
    if (v && typeof v === 'object')
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, fn)]));
    return v;
  };
  const read = (f) => JSON.parse(gunzipSync(readFileSync(`${out}/${f}`)).toString());
  for (const f of files) walk(read(f), (i) => (counts[i]++, null));
  const keep = new Map();
  const kept = [];
  dictionary.forEach((v, i) => {
    if (counts[i] >= MIN_REFS) {
      keep.set(i, kept.length);
      kept.push(v);
    }
  });
  for (const f of files)
    writeFileSync(
      `${out}/${f}`,
      gzipSync(
        JSON.stringify(walk(read(f), (i) => (keep.has(i) ? { $: keep.get(i) } : dictionary[i]))),
        { level: 9 },
      ),
    );
  writeFileSync(`${out}/dict.json`, JSON.stringify(kept));
  console.log(
    `dict.json: ${kept.length} of ${dictionary.length} entries kept (referenced >= ${MIN_REFS} times)`,
  );
}

if (process.argv.includes('--repack-only')) {
  // Older exports wrote every interned value to dict.json: repack them in place.
  repack(JSON.parse(readFileSync(`${out}/dict.json`, 'utf8')));
  process.exit(0);
}

// --- export -------------------------------------------------------------------------------
rmSync(out, { recursive: true, force: true });
console.log(`Exporting static data from ${base}`);

const species = await get('/api/species');
write('species.json', species);
const ids = species.items.map((s) => s.id);
for (const [file, path] of [
  ['stats.json', '/api/stats'],
  ['sources.json', '/api/sources'],
  ['metrics.json', '/ml/metrics'],
  ['health-api.json', '/api/health'],
  ['health-ml.json', '/ml/health'],
])
  write(file, await get(path));
writeGz('coverage-6.json', await get('/api/coverage?resolution=6'));

const cellsBySpecies = {};
for (const id of ids) {
  write(`species/${id}.json`, await get(`/api/species/${id}`));
  writeGz(`occurrences/${id}.json`, await get(`/api/species/${id}/occurrences?limit=8000`));
  const all = await get(`/api/cells?species=${id}&resolution=6&pageSize=50000`);
  const open = await get(
    `/api/cells?species=${id}&resolution=6&pageSize=50000&excludeProtected=true`,
  );
  writeGz(`cells/${id}.json`, all);
  writeGz(`cells/${id}-unprotected.json`, open);
  cellsBySpecies[id] = all.items.map((r) => r[0]);
  console.log(`  ${id}: ${all.items.length} cells`);
}

// Cell profiles (species-independent), tiled by resolution-3 parent.
const allCells = [...new Set(Object.values(cellsBySpecies).flat())];
const profileTiles = new Map();
await pool('cell profiles', allCells, async (h3) => {
  const profile = compact(await get(`/api/cells/${h3}`));
  const t = tileOf(h3);
  if (!profileTiles.has(t)) profileTiles.set(t, {});
  profileTiles.get(t)[h3] = profile;
});
for (const [t, cells] of profileTiles) writeGz(`cell/${t}.json`, cells);

// Explanations per species, same tiling.
let explanations = 0;
for (const id of ids) {
  const tiles = new Map();
  await pool(`explain ${id}`, cellsBySpecies[id], async (h3) => {
    const explain = compact(await get(`/ml/explain?species=${id}&h3=${h3}`));
    const t = tileOf(h3);
    if (!tiles.has(t)) tiles.set(t, {});
    tiles.get(t)[h3] = explain;
  });
  for (const [t, cells] of tiles) writeGz(`explain/${id}/${t}.json`, cells);
  explanations += cellsBySpecies[id].length;
}

repack(dict);
write('manifest.json', {
  exportedAt: new Date().toISOString(),
  source: base,
  snapshot: species.runId,
  resolution: 6,
  cells: allCells.length,
  explanations,
  tiles: profileTiles.size,
});
console.log(
  `Done: ${allCells.length} cells, ${explanations} explanations, ${dict.length} dictionary entries`,
);
