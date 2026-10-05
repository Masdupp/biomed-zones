// README screenshots from the running stack → docs/screenshots/*.png (read-only: submits nothing).
// Usage: node scripts/screenshots.mjs [baseUrl]
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:8080';
const out = 'docs/screenshots';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'light',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const mapReady = () =>
  page.waitForFunction(() => performance.getEntriesByName('bz:map-ready').length > 0, null, {
    timeout: 30_000,
  });
const shot = async (name) => {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log(`${out}/${name}.png`);
};

await page.goto(`${base}/map?species=salix-alba`);
await mapReady();
await shot('map');

await page.goto(`${base}/map?species=arenicola-marina&cell=87186068affffff`);
await mapReady();
await page.getByTestId('cell-panel').getByText('Expert parameters').waitFor();
await shot('cell');

await page.evaluate(() =>
  localStorage.setItem(
    'bz-compare',
    JSON.stringify(['87186068affffff', '871860689ffffff', '87186065effffff']),
  ),
);
await page.goto(`${base}/compare?species=arenicola-marina`);
await page.getByRole('rowheader', { name: 'Final score' }).waitFor();
await shot('compare');

await page.goto(`${base}/model`);
await page.getByText('Worked example').first().waitFor();
await shot('model');

await page.goto(`${base}/login?next=/contribute`);
await page.fill('#email', 'admin@biomed-zones.local');
await page.fill('#password', 'BioMedAdmin!2026');
await page.click('button[type=submit]');
await page.waitForURL((u) => u.pathname === '/contribute');
await page.evaluate(() => localStorage.removeItem('bz-contribution-draft'));
await page.reload();
await page.getByRole('button', { name: 'Continue' }).click();
await page.fill('#c-lat', '48.6650');
await page.fill('#c-lon', '-1.6150');
await page.getByText('habitat matches').waitFor({ timeout: 15_000 });
await shot('contribute');
await page.evaluate(() => localStorage.removeItem('bz-contribution-draft'));

await page.goto(`${base}/admin`);
await page.getByText('Review comment').waitFor();
await shot('admin');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
