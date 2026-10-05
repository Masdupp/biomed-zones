import { expect, type Page } from '@playwright/test';

export const ACCOUNTS = {
  admin: { email: 'admin@biomed-zones.local', password: 'BioMedAdmin!2026' },
  contributor: { email: 'contributor@biomed-zones.local', password: 'BioMedContrib!2026' },
};

export async function login(page: Page, email: string, password: string, next = '/') {
  await page.goto(`/login?next=${encodeURIComponent(next)}`);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in', exact: true }).last().click();
  await page.waitForURL((u) => u.pathname === next);
}

/** Wait until deck.gl has drawn the first frame with cells (performance mark set by MapView). */
export async function waitForMap(page: Page) {
  await expect
    .poll(() => page.evaluate(() => performance.getEntriesByName('bz:map-ready').length), {
      timeout: 20_000,
    })
    .toBeGreaterThan(0);
}

/** Open the keyboard-accessible "Best cells in view" list and pick the n-th cell. */
export async function pickBestCell(page: Page, n = 0): Promise<string> {
  const list = page.locator('details', { hasText: 'Best cells in view' });
  // An open <details> has open="" (falsy): test for absence explicitly.
  if ((await list.getAttribute('open')) === null) await list.locator('summary').click();
  const item = list.getByRole('button').nth(n);
  const h3 = (await item.locator('.num').first().textContent())?.trim() ?? '';
  await item.click();
  await expect(page.getByTestId('cell-panel')).toContainText(h3);
  return h3;
}
