// Builds the read-only static demo for GitHub Pages → apps/web/dist-static
// Usage: node scripts/build-static.mjs [--base /biomed-zones/] [--repo https://github.com/user/biomed-zones]
// Needs apps/web/static-data from scripts/export-static.mjs.
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    base: { type: 'string', default: '/biomed-zones/' },
    repo: { type: 'string', default: '' },
  },
});
const data = 'apps/web/static-data';
const out = 'apps/web/dist-static';
if (!existsSync(`${data}/manifest.json`))
  throw new Error(`${data} is missing or incomplete: run scripts/export-static.mjs first`);

rmSync(out, { recursive: true, force: true });
execFileSync('npx', ['vite', 'build', '--outDir', 'dist-static', '--emptyOutDir'], {
  cwd: 'apps/web',
  stdio: 'inherit',
  env: { ...process.env, VITE_STATIC: '1', VITE_BASE: values.base, VITE_REPO_URL: values.repo },
});
cpSync(data, `${out}/data`, { recursive: true });
// GitHub Pages: unknown paths serve 404.html, which boots the SPA on deep links.
copyFileSync(`${out}/index.html`, `${out}/404.html`);
writeFileSync(`${out}/.nojekyll`, '');
// Every route also gets its own HTML file so GitHub Pages answers 200 (`/map` → map.html,
// `/species/x` → species/x.html). Only unknown paths fall back to 404.html with a 404 status,
// which some browsers, link previews and extensions report as an error.
const species = JSON.parse(readFileSync(`${data}/species.json`, 'utf8')).items.map((s) => s.id);
const routes = [
  'map',
  'species',
  'compare',
  'model',
  'sources',
  'login',
  'contribute',
  'admin',
  'account',
].concat(species.map((id) => `species/${id}`));
for (const route of routes) {
  mkdirSync(dirname(`${out}/${route}`), { recursive: true });
  copyFileSync(`${out}/index.html`, `${out}/${route}.html`);
  // `/species/` (trailing slash, from directory redirects) → species/index.html
  if (route === 'species') mkdirSync(`${out}/species`, { recursive: true });
  if (route === 'species') copyFileSync(`${out}/index.html`, `${out}/species/index.html`);
}
const manifest = JSON.parse(readFileSync(`${data}/manifest.json`, 'utf8'));
console.log(
  `Static demo in ${out} (base ${values.base}, ${manifest.cells} cells, ${manifest.explanations} explanations)`,
);
