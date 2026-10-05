import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pickBestCell, waitForMap } from './helpers';

// Budgets are for a desktop with a GPU. CI runners render WebGL in software: CI may relax them
// with BUDGET_FACTOR (documented in docs/TEST_REPORT.md); local runs use the real budgets.
const FACTOR = Number(process.env.BUDGET_FACTOR ?? 1);

test.describe('Performance budgets', () => {
  test('map is interactive in under 2 s', async ({ page }) => {
    await page.goto('/map?species=salix-alba');
    await waitForMap(page);
    const ready = await page.evaluate(
      () => performance.getEntriesByName('bz:map-ready')[0]?.startTime ?? Infinity,
    );
    test.info().annotations.push({ type: 'map-ready-ms', description: ready.toFixed(0) });
    expect(ready).toBeLessThan(2000 * FACTOR);
  });

  test('cell click to filled panel in under 300 ms', async ({ page }) => {
    await page.goto('/map?species=arenicola-marina');
    await waitForMap(page);
    const h3 = await pickBestCell(page, 2);
    // The header shows the cell id immediately; wait for the profile itself to be rendered.
    await expect
      .poll(() =>
        page.evaluate((h) => performance.getEntriesByName(`bz:panel-ready:${h}`).length, h3),
      )
      .toBeGreaterThan(0);
    const ms = await page.evaluate((h) => {
      const click = performance.getEntriesByName(`bz:cell-click:${h}`)[0];
      const ready = performance.getEntriesByName(`bz:panel-ready:${h}`)[0];
      return click && ready ? ready.startTime - click.startTime : Infinity;
    }, h3);
    test.info().annotations.push({ type: 'panel-ms', description: ms.toFixed(0) });
    expect(ms).toBeLessThan(300 * FACTOR);
  });
});

test.describe('Offline operation', () => {
  test('no page requests a third-party host', async ({ page, baseURL }) => {
    const origin = new URL(baseURL ?? 'http://localhost:8080').host;
    const external: string[] = [];
    page.on('request', (r) => {
      const u = new URL(r.url());
      if (!['data:', 'blob:'].includes(u.protocol) && u.host !== origin) external.push(r.url());
    });
    for (const path of [
      '/',
      '/map?species=salix-alba',
      '/species',
      '/species/ginkgo-biloba',
      '/compare',
      '/model',
      '/sources',
      '/login',
    ]) {
      await page.goto(path, { waitUntil: 'networkidle' });
    }
    expect(external).toEqual([]);
  });
});

test.describe('Accessibility (axe-core, WCAG 2.1 AA)', () => {
  for (const path of [
    '/',
    '/species',
    '/species/arenicola-marina',
    '/model',
    '/sources',
    '/login',
    '/compare',
  ]) {
    test(`no serious or critical violations on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('.maplibregl-canvas-container') // WebGL canvas: covered by the cell list
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual([]);
    });
  }

  test('map page with an open cell panel', async ({ page }) => {
    await page.goto('/map?species=arenicola-marina');
    await waitForMap(page);
    await pickBestCell(page, 0);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.maplibregl-canvas-container')
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
