import { expect, test } from '@playwright/test';
import { ACCOUNTS, login, pickBestCell, waitForMap } from './helpers';

test.describe('Journey 1 — browse the map and open a cell', () => {
  test('selects a cell and shows its explained score with provenance', async ({ page }) => {
    await page.goto('/map?species=arenicola-marina');
    await waitForMap(page);
    await expect(page.getByText(/res 6 · [\d,]+ cells/)).toBeVisible();
    await pickBestCell(page, 0);
    const panel = page.getByTestId('cell-panel');
    await expect(panel.getByText('Expert parameters')).toBeVisible();
    await expect(panel.getByText(/Model drivers \(SHAP/)).toBeVisible();
    await expect(panel.getByText(/blend\(/)).toBeVisible();
    await expect(panel.getByText(/retrieved/).first()).toBeVisible();
    expect(page.url()).toMatch(/cell=8[0-9a-f]{14}/);
  });

  test('flies to an overseas region and switches to resolution 7', async ({ page }) => {
    await page.goto('/map?species=conus-magus');
    await waitForMap(page);
    await page.getByRole('button', { name: 'Réunion' }).click();
    await expect(page.getByText(/res 7 · [\d,]+ cells/)).toBeVisible({ timeout: 20_000 });
  });
});

test.describe('Journey 2 — compare cells', () => {
  test('adds two cells and compares them on a radar and a table', async ({ page }) => {
    await page.goto('/map?species=arenicola-marina');
    await page.evaluate(() => localStorage.removeItem('bz-compare'));
    await waitForMap(page);
    for (const n of [0, 1]) {
      await pickBestCell(page, n);
      await page.getByRole('button', { name: 'Add to comparison' }).click();
      await expect(page.getByRole('button', { name: 'In comparison' })).toBeVisible();
    }
    await page.getByRole('link', { name: /Compare 2 cells/ }).click();
    await expect(page.getByRole('heading', { name: 'Compare cells' })).toBeVisible();
    await expect(page.getByRole('img', { name: /Radar chart/ })).toBeVisible();
    const header = page.locator('thead th');
    await expect(header).toHaveCount(3);
    await expect(page.getByRole('rowheader', { name: 'Final score' })).toBeVisible();
  });
});

test.describe.serial('Journeys 3 & 4 — contribute, then validate as administrator', () => {
  const title = `E2E observation ${Date.now()}`;

  test('a new contributor registers and submits an observation with a reference', async ({
    page,
  }) => {
    await page.goto('/login?next=/contribute');
    await page.getByRole('radio', { name: 'Register' }).click();
    await page.getByLabel('Display name').fill('E2E Contributor');
    await page.getByLabel('Email').fill(`e2e-${Date.now()}@test.local`);
    await page.getByLabel('Password').fill('a long e2e passphrase');
    await page.getByRole('button', { name: 'Create account' }).click();
    await page.waitForURL((u) => u.pathname === '/contribute');

    await page.getByRole('button', { name: 'Continue' }).click(); // what: defaults (Arenicola, presence)
    await page.getByLabel('Latitude').fill('48.665');
    await page.getByLabel('Longitude').fill('-1.615');
    await expect(page.getByText('habitat matches')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Title').fill(title);
    await page
      .getByLabel('Description')
      .fill('Lugworm casts counted on two quadrats during a spring low tide.');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('DOI').fill('10.3354/meps240171');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText(title)).toBeVisible();
    await page.getByRole('button', { name: 'Submit for review' }).click();
    await expect(page.getByRole('status')).toHaveText(/Submitted for review/);
    await expect(
      page.locator('section', { hasText: 'My contributions' }).getByText(title),
    ).toBeVisible();
  });

  test('the administrator reviews it against the model and approves it', async ({ page }) => {
    await login(page, ACCOUNTS.admin.email, ACCOUNTS.admin.password, '/admin');
    await page.getByRole('button', { name: new RegExp(title) }).click();
    await expect(page.getByText('Contribution says')).toBeVisible();
    await expect(page.getByText('Model says (active run)')).toBeVisible();
    await page.getByLabel('Review comment').fill('Consistent with the intertidal habitat (e2e).');
    await page.getByRole('button', { name: 'Approve' }).click();
    await expect(page.getByRole('button', { name: new RegExp(title) })).toHaveCount(0);
    await page.getByRole('radio', { name: 'Audit log' }).click();
    await expect(page.getByText('contribution.approve').first()).toBeVisible();
    // Approved contributions are public.
    await page.goto('/api/contributions?pageSize=200');
    await expect(page.locator('body')).toContainText(title);
  });
});

test.describe('Journey 5 — export a PDF report', () => {
  test('downloads the cell report as a PDF', async ({ page }) => {
    await page.goto('/map?species=arenicola-marina&cell=87186068affffff');
    const panel = page.getByTestId('cell-panel');
    await expect(panel.getByText('Expert parameters')).toBeVisible();
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      panel.getByRole('link', { name: 'Export PDF' }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('biomed-zones_arenicola-marina_87186068affffff.pdf');
    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const c of stream) chunks.push(c as Buffer);
    const pdf = Buffer.concat(chunks);
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(3000);
  });
});
