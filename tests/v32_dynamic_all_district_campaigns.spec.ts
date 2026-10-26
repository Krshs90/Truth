import { test, expect } from '@playwright/test';

test.describe('V32 Dynamic Campaign Races for Every Texas District', () => {
  test('Overview & Compare dynamically render matching race when ZIP is 78660 (TX-10)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.addInitScript(() => {
      localStorage.setItem('truth_active_zip', '78660');
      localStorage.setItem('truth_selected_cd', 'tx-cd-10');
      localStorage.setItem('truth_selected_sd', 'tx-sd-05');
      localStorage.setItem('truth_selected_hd', 'tx-hd-46');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const campaignCard = page.locator('div.rounded-2xl:has-text("Active 2026 Campaign")');
    await expect(campaignCard).toBeVisible();
    await expect(campaignCard.locator('text=Michael McCaul vs. Theresa Boisseau')).toBeVisible();
    await expect(campaignCard.locator('button:text-is("TX-10")')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx10-overview.png' });

    await campaignCard.getByRole('link', { name: /Explore Campaign Standings & Stances/i }).click();
    await page.waitForURL(/compare/);

    await expect(page.getByRole('heading', { name: /Michael McCaul.*Theresa Boisseau/i })).toBeVisible();
    await expect(page.locator('text=TX-10 District Counties')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx10-compare.png' });
  });

  test('Overview & Compare dynamically render matching race when ZIP is 76201 (TX-26)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.addInitScript(() => {
      localStorage.setItem('truth_active_zip', '76201');
      localStorage.setItem('truth_selected_cd', 'tx-cd-26');
      localStorage.setItem('truth_selected_sd', 'tx-sd-12');
      localStorage.setItem('truth_selected_hd', 'tx-hd-64');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const campaignCard = page.locator('div.rounded-2xl:has-text("Active 2026 Campaign")');
    await expect(campaignCard).toBeVisible();
    await expect(campaignCard.locator('text=Brandon Gill vs. Ernest Lineberger')).toBeVisible();
    await expect(campaignCard.locator('button:text-is("TX-26")')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx26-overview.png' });

    await campaignCard.getByRole('link', { name: /Explore Campaign Standings & Stances/i }).click();
    await page.waitForURL(/compare/);

    await expect(page.getByRole('heading', { name: /Brandon Gill.*Ernest Lineberger/i })).toBeVisible();
    await expect(page.locator('text=TX-26 District Counties')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx26-compare.png' });
  });

  test('Overview & Compare dynamically render matching race when ZIP is 78701 (TX-37)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.addInitScript(() => {
      localStorage.setItem('truth_active_zip', '78701');
      localStorage.setItem('truth_selected_cd', 'tx-cd-37');
      localStorage.setItem('truth_selected_sd', 'tx-sd-14');
      localStorage.setItem('truth_selected_hd', 'tx-hd-49');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const campaignCard = page.locator('div.rounded-2xl:has-text("Active 2026 Campaign")');
    await expect(campaignCard).toBeVisible();
    await expect(campaignCard.locator('text=Lloyd Doggett vs. Jenny Garcia Sharon')).toBeVisible();
    await expect(campaignCard.locator('button:text-is("TX-37")')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx37-overview.png' });

    await campaignCard.getByRole('link', { name: /Explore Campaign Standings & Stances/i }).click();
    await page.waitForURL(/compare/);

    await expect(page.getByRole('heading', { name: /Lloyd Doggett.*Jenny Garcia Sharon/i })).toBeVisible();
    await expect(page.locator('text=TX-37 District Counties')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx37-compare.png' });
  });

  test('Can select any other congressional district (e.g. TX-02) from dropdown in Compare page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.goto('http://127.0.0.1:5173/compare', { waitUntil: 'networkidle' });

    const districtSelect = page.locator('select');
    await expect(districtSelect).toBeVisible();

    await districtSelect.selectOption('tx-cd2-2026');

    await expect(page.getByRole('heading', { name: /Dan Crenshaw.*Peter Filler/i })).toBeVisible();
    await expect(page.locator('text=TX-2 District Counties')).toBeVisible();

    await page.screenshot({ path: './scratch/v32-tx02-compare-dropdown.png' });
  });
});
