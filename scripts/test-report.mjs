// Builds docs/TEST_REPORT.md from the JUnit files of every suite and the Lighthouse summary.
// Usage: make report  (runs the suites first)  or  node scripts/test-report.mjs
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const JUNIT = 'reports/junit';
const LAYERS = [
  { file: 'web.xml', name: 'Web — components & logic', tool: 'Vitest + React Testing Library' },
  { file: 'api.xml', name: 'API — unit & integration', tool: 'Jest + Supertest (PostGIS test DB)' },
  { file: 'python.xml', name: 'Data pipeline & ML service', tool: 'pytest' },
  { file: 'e2e.xml', name: 'End-to-end journeys & quality', tool: 'Playwright + axe-core' },
];

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? decode(m[1]) : '';
};

/** Minimal JUnit reader: testcases with group, status, duration and properties. */
function readJunit(path) {
  const xml = readFileSync(path, 'utf8');
  const cases = [];
  const re = /<testcase\b([^>]*?)(\/>|>([\s\S]*?)<\/testcase>)/g;
  for (let m; (m = re.exec(xml));) {
    const head = `<testcase${m[1]}>`;
    const body = m[3] ?? '';
    const status = /<(failure|error)\b/.test(body)
      ? 'fail'
      : /<skipped\b/.test(body)
        ? 'skip'
        : 'pass';
    const props = Object.fromEntries(
      [...body.matchAll(/<property\s+name="([^"]*)"\s+value="([^"]*)"/g)].map((p) => [
        decode(p[1]),
        decode(p[2]),
      ]),
    );
    const failure = body.match(/<(?:failure|error)\b[^>]*message="([^"]*)"/);
    cases.push({
      group: attr(head, 'classname'),
      name: attr(head, 'name'),
      seconds: Number(attr(head, 'time') || 0),
      status,
      props,
      message: failure ? decode(failure[1]).split('\n')[0].slice(0, 160) : '',
    });
  }
  return cases;
}

/** Normalise the per-tool group names into readable file paths. */
function groupName(layer, c) {
  if (layer.file === 'python.xml') {
    // "data.pipeline.tests.test_h3[.TestClass]" → data/pipeline/tests/test_h3.py
    const parts = c.group.split('.');
    while (parts.length && /^[A-Z]/.test(parts.at(-1))) parts.pop();
    return `${parts.join('/')}.py`;
  }
  if (layer.file === 'e2e.xml') return c.name.includes(' › ') ? c.name.split(' › ')[0] : c.group;
  return `${layer.file === 'web.xml' ? 'apps/web/' : 'apps/api/'}${c.group}`;
}
function caseName(layer, c) {
  if (layer.file === 'python.xml') return c.name.replace(/^test_/, '').replace(/_/g, ' ');
  if (layer.file === 'e2e.xml') return c.name.split(' › ').slice(1).join(' › ') || c.name;
  return c.name;
}

const esc = (s) => s.replace(/\|/g, '\\|');
const icon = { pass: '✅ pass', fail: '❌ FAIL', skip: '⏭ skipped' };
const sh = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return 'n/a';
  }
};

const results = LAYERS.map((layer) => {
  const path = `${JUNIT}/${layer.file}`;
  return { ...layer, cases: existsSync(path) ? readJunit(path) : null };
});
const missing = results.filter((r) => !r.cases).map((r) => r.file);
const all = results.flatMap((r) => r.cases ?? []);
const count = (cases, s) => cases.filter((c) => c.status === s).length;

const lines = [];
const out = (s = '') => lines.push(s);
out('# BioMed Zones v2 — Test report');
out();
out(
  `Generated ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC by \`scripts/test-report.mjs\` from the JUnit output of each suite (\`make report\`). Commit \`${sh('git rev-parse --short HEAD')}\`${sh('git status --porcelain --untracked-files=no -- . :!docs/TEST_REPORT.md') ? ' plus uncommitted changes' : ''}, Node ${process.version}, ${sh('uv run python --version')}.`,
);
if (missing.length)
  out(`\n> **Incomplete:** no results for ${missing.join(', ')} — run \`make report\`.`);
out();
out('## Summary');
out();
out('| Layer | Tool | Tests | Passed | Failed | Skipped | Duration |');
out('|---|---|---:|---:|---:|---:|---:|');
for (const r of results) {
  if (!r.cases) {
    out(`| ${r.name} | ${r.tool} | — | — | — | — | not run |`);
    continue;
  }
  const t = r.cases.reduce((s, c) => s + c.seconds, 0);
  out(
    `| ${r.name} | ${r.tool} | ${r.cases.length} | ${count(r.cases, 'pass')} | ${count(r.cases, 'fail')} | ${count(r.cases, 'skip')} | ${t.toFixed(1)} s |`,
  );
}
out(
  `| **Total** | | **${all.length}** | **${count(all, 'pass')}** | **${count(all, 'fail')}** | **${count(all, 'skip')}** | |`,
);
out();
out(
  count(all, 'fail') === 0 && !missing.length
    ? `**Result: all ${all.length} tests pass.**`
    : `**Result: ${count(all, 'fail')} failing test(s)${missing.length ? ', some suites not run' : ''}.**`,
);

// Performance budgets measured by the E2E suite (annotations → JUnit properties).
const e2e = results.find((r) => r.file === 'e2e.xml')?.cases ?? [];
const prop = (key) => e2e.find((c) => c.props[key])?.props[key];
out();
out('## Performance budgets');
out();
out('| Budget | Target | Measured | Status | How |');
out('|---|---:|---:|---|---|');
const budget = (label, key, target, how) => {
  const v = prop(key);
  const ok = v !== undefined && Number(v) < target;
  out(
    `| ${label} | < ${target} ms | ${v === undefined ? 'n/a' : `${v} ms`} | ${v === undefined ? 'not measured' : ok ? '✅' : '❌'} | ${how} |`,
  );
};
budget(
  'Map interactive',
  'map-ready-ms',
  2000,
  'navigation start → first deck.gl frame with cells (`bz:map-ready` mark), Salix alba, res 6, ~19k cells',
);
budget(
  'Cell click → filled panel',
  'panel-ms',
  300,
  '`bz:cell-click` → `bz:panel-ready` marks (profile and explanation rendered)',
);

const lhPath = 'reports/lighthouse/summary.json';
if (existsSync(lhPath)) {
  const lh = JSON.parse(readFileSync(lhPath, 'utf8'));
  out();
  out('## Lighthouse');
  out();
  out(
    `Desktop preset, ${lh.gl}, ${lh.at.slice(0, 10)}, against the production build served by the nginx gateway (\`make lighthouse\`). Each row is the ${lh.statistic ?? 'single run'} of ${lh.runs_per_page ?? 1} runs; the last column lists every run's performance score, because WebGL pages vary between identical runs. Target ≥ 90 in every category.`,
  );
  out();
  out(
    '| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Performance, all runs |',
  );
  out('|---|---:|---:|---:|---:|---:|---:|---:|---:|---|');
  const mark = (v) => (v >= 90 ? `${v}` : `**${v}** ⚠`);
  for (const p of lh.pages)
    out(
      `| \`${p.path}\` | ${mark(p.performance)} | ${mark(p.accessibility)} | ${mark(p['best-practices'])} | ${mark(p.seo)} | ${p.fcp_ms} ms | ${p.lcp_ms} ms | ${p.tbt_ms} ms | ${p.cls} | ${(p.runs ?? [p.performance]).join(', ')} |`,
    );
  const min = Math.min(
    ...lh.pages.flatMap((p) => [p.performance, p.accessibility, p['best-practices'], p.seo]),
  );
  out();
  out(
    min >= 90
      ? `Lowest score: ${min} — all pages meet the ≥ 90 target.`
      : `Lowest score: ${min} (below target).`,
  );
}

out();
out('## Test environment and limits');
out();
for (const note of [
  'Unit and integration suites run on the host. The API suite creates a throwaway PostGIS database per run (`biomed_test_<timestamp>_<pid>`) and drops it afterwards; nothing touches the demo database.',
  'E2E tests run in headless Chromium against the production build behind the nginx gateway (`make demo`). Chromium renders WebGL in software (SwiftShader) there, so the measured budgets are conservative for a desktop with a GPU. The cell-panel budget has the thinnest margin (about 230–260 ms against 300 ms in software rendering).',
  'GitHub-hosted CI runners have no GPU, so CI relaxes the two budgets by `BUDGET_FACTOR=2` (ADR-0035). Local runs use the real budgets.',
  'Lighthouse figures come from headed Chrome on the GPU of the development machine (Apple silicon), desktop preset with simulated throttling. Headless SwiftShader runs score lower on the two map pages.',
  'Offline operation is checked in the browser: no page requests a third-party host. `make demo` starts from built images with `--no-build --pull never` and the committed snapshot; it was verified healthy in about 100 s. A run with the network physically disconnected was not automated.',
  'The E2E journeys 3 and 4 create a contributor account and an approved contribution in the demo database on each run (titles start with "E2E"). `make reset && make demo` restores a clean database.',
])
  out(`- ${note}`);

out();
out('## Requirement traceability');
out();
out('| Requirement | Covered by |');
out('|---|---|');
const trace = [
  ['Journey 1 — browse map → cell detail', 'e2e/journeys.spec.ts › Journey 1'],
  ['Journey 2 — compare cells', 'e2e/journeys.spec.ts › Journey 2'],
  ['Journey 3 — contribute (register, 5-step form, DOI check)', 'e2e/journeys.spec.ts › Journey 3'],
  ['Journey 4 — admin validates, audit log, public listing', 'e2e/journeys.spec.ts › Journey 4'],
  ['Journey 5 — export PDF report', 'e2e/journeys.spec.ts › Journey 5'],
  [
    'Regression: Arenicola marina × Baie du Mont-Saint-Michel (cell 87186068affffff) — inputs, expert score 100, modifiers',
    'services/ml/tests/test_worked_example.py (pytest), apps/web/src/lib/expert.test.ts (Vitest), API explain/PDF tests',
  ],
  ['WCAG 2.1 AA (no serious/critical axe violations)', 'e2e/quality.spec.ts › Accessibility'],
  ['Offline operation (no third-party requests)', 'e2e/quality.spec.ts › Offline operation'],
  ['Auth, roles, GDPR, rate limits, audit', 'apps/api/tests (Jest + Supertest)'],
  ['Spatial-CV metrics, calibration, honesty caps', 'services/ml/tests (pytest)'],
];
for (const [req, by] of trace) out(`| ${esc(req)} | ${esc(by)} |`);

out();
out('## All tests');
for (const r of results) {
  if (!r.cases) continue;
  out();
  out(`### ${r.name} (${r.tool})`);
  const groups = new Map();
  for (const c of r.cases) {
    const g = groupName(r, c);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(c);
  }
  for (const [g, cases] of groups) {
    out();
    out(`**\`${g}\`** — ${count(cases, 'pass')}/${cases.length} passed`);
    out();
    out('| # | Test | Result | Time |');
    out('|---:|---|---|---:|');
    cases.forEach((c, i) => {
      const note = c.message ? `<br>_${esc(c.message)}_` : '';
      out(
        `| ${i + 1} | ${esc(caseName(r, c))}${note} | ${icon[c.status]} | ${c.seconds < 1 ? `${Math.round(c.seconds * 1000)} ms` : `${c.seconds.toFixed(1)} s`} |`,
      );
    });
  }
}
out();
out('## How to reproduce');
out();
out('```bash');
out('make demo        # start the stack from the committed snapshot (offline)');
out('make test        # Vitest, Jest (throwaway PostGIS test DB), pytest');
out('make e2e         # Playwright journeys, budgets, axe, offline check');
out(
  'make lighthouse  # Lighthouse on 8 pages, median of 5 runs (LH_GPU=1: headed Chrome on the GPU)',
);
out('make report      # all of the above results → docs/TEST_REPORT.md');
out('```');

writeFileSync('docs/TEST_REPORT.md', lines.join('\n') + '\n');
console.log(
  `docs/TEST_REPORT.md: ${all.length} tests, ${count(all, 'pass')} passed, ${count(all, 'fail')} failed${missing.length ? `, missing ${missing.join(', ')}` : ''}`,
);
process.exit(count(all, 'fail') > 0 ? 1 : 0);
