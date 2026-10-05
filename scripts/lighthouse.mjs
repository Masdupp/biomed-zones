// Lighthouse audit of the key pages (desktop preset) against the running stack.
// Usage: node scripts/lighthouse.mjs [baseUrl]   → reports/lighthouse/{summary.json,*.html}
//   LH_GPU=1  headed Chrome on the real GPU. Headless runs use SwiftShader (software WebGL), which
//             puts every GL call of the map on the CPU main thread and inflates TBT.
//   PAGES=/a,/b  subset of pages.
// Each page runs in its own process with a timeout: Lighthouse occasionally stalls after a
// WebGL page, and a retry is cheaper than a hung audit.
import { spawnSync } from 'node:child_process';
import { mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = 'reports/lighthouse';
const base = process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:8080';
const fileName = (path) => path.replace(/[/?=]+/g, '_').replace(/^_|_$/g, '') || 'home';

async function auditOne(path) {
  const { chromium } = await import('@playwright/test');
  const chromeLauncher = await import('chrome-launcher');
  const { default: lighthouse } = await import('lighthouse');
  const { default: desktop } = await import('lighthouse/core/config/desktop-config.js');
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: process.env.LH_GPU
      ? ['--window-size=1350,940']
      : [
          '--headless=new',
          '--use-gl=swiftshader',
          '--enable-unsafe-swiftshader',
          '--ignore-gpu-blocklist',
        ],
  });
  try {
    const { lhr, report } = await lighthouse(
      base + path,
      { port: chrome.port, output: 'html', logLevel: process.env.LH_LOG ?? 'error' },
      desktop,
    );
    writeFileSync(`${out}/${fileName(path)}.run${process.env.LH_RUN ?? 0}.html`, report);
    const m = (id) => lhr.audits[id]?.numericValue ?? 0;
    return {
      path,
      ...Object.fromEntries(
        Object.entries(lhr.categories).map(([k, c]) => [k, Math.round((c.score ?? 0) * 100)]),
      ),
      fcp_ms: Math.round(m('first-contentful-paint')),
      lcp_ms: Math.round(m('largest-contentful-paint')),
      tbt_ms: Math.round(m('total-blocking-time')),
      cls: +m('cumulative-layout-shift').toFixed(3),
    };
  } finally {
    await chrome.kill();
  }
}

if (process.env.LH_ONE) {
  const result = await auditOne(process.env.LH_ONE);
  console.log(`LH_RESULT ${JSON.stringify(result)}`);
  process.exit(0);
}

const pages = (
  process.env.PAGES ??
  '/,/map?species=arenicola-marina,/species,/species/arenicola-marina,/model,/sources,/compare,/login'
).split(',');
mkdirSync(out, { recursive: true });
const RUNS = Number(process.env.LH_RUNS ?? 3);
const summary = [];

/** One audit in a child process; retried when Lighthouse stalls. */
function runOnce(path, index) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const run = spawnSync(process.execPath, [fileURLToPath(import.meta.url), base], {
      env: { ...process.env, LH_ONE: path, LH_RUN: String(index) },
      encoding: 'utf8',
      timeout: 90_000,
      killSignal: 'SIGKILL',
    });
    const line = run.stdout?.split('\n').find((l) => l.startsWith('LH_RESULT '));
    if (line) return { ...JSON.parse(line.slice('LH_RESULT '.length)), index };
    console.warn(
      `${path}: attempt ${attempt} failed (${run.error?.message ?? `exit ${run.status}`})`,
    );
  }
  throw new Error(`Lighthouse failed for ${path}`);
}

for (const path of pages) {
  // Lighthouse scores vary run to run (GPU warm-up, shader caches): report the median run by
  // performance score, as Lighthouse's own variability guidance recommends.
  const runs = Array.from({ length: RUNS }, (_, i) => runOnce(path, i)).sort(
    (a, b) => a.performance - b.performance,
  );
  const { index, ...median } = runs[Math.floor(runs.length / 2)];
  // Keep the HTML report of the median run only.
  for (const r of runs) {
    const file = `${out}/${fileName(path)}.run${r.index}.html`;
    if (r.index === index) renameSync(file, `${out}/${fileName(path)}.html`);
    else rmSync(file, { force: true });
  }
  const result = { ...median, runs: runs.map((r) => r.performance) };
  summary.push(result);
  console.log(path.padEnd(32), JSON.stringify(result));
}
writeFileSync(
  `${out}/summary.json`,
  JSON.stringify(
    {
      base,
      preset: 'desktop',
      runs_per_page: RUNS,
      statistic: 'median run by performance score',
      gl: process.env.LH_GPU ? 'gpu (headed)' : 'swiftshader (headless)',
      at: new Date().toISOString(),
      pages: summary,
    },
    null,
    2,
  ) + '\n',
);
