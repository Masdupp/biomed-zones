// Builds the read-only static demo for GitHub Pages → apps/web/dist-static
// Usage: node scripts/build-static.mjs [--base /biomed-zones/] [--repo https://github.com/user/biomed-zones]
// Needs apps/web/static-data from scripts/export-static.mjs.
import { execFileSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
const manifest = JSON.parse(readFileSync(`${data}/manifest.json`, 'utf8'));
console.log(
  `Static demo in ${out} (base ${values.base}, ${manifest.cells} cells, ${manifest.explanations} explanations)`,
);
