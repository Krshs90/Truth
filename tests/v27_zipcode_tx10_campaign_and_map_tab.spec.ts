import { test, expect } from '@playwright/test';

test.describe('V27 ZIP Code Dynamic Campaign (TX-10 vs TX-26) and New Map Tab', () => {
  test('Changing ZIP to 78660 updates active campaign to TX-10 McCaul vs Boisseau, shows TX-10 counties, and Map tab is operational', async ({ page }) => {
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

    await expect(page.locator('header').locator('text=TX-10')).toBeVisible();

    const campaignCard = page.locator('div.rounded-2xl:has-text("Active 2026 Campaign")');
    await expect(campaignCard).toBeVisible();
    await expect(campaignCard.locator('text=Michael McCaul vs. Theresa Boisseau')).toBeVisible();
    await expect(campaignCard.locator('button:text-is("TX-10")')).toBeVisible();

    await expect(campaignCard.locator('text=Brandon Gill')).toHaveCount(0);

    await campaignCard.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    await campaignCard.getByRole('link', { name: /Explore Campaign Standings & Stances/i }).click();
    await page.waitForURL(/compare/);

    await expect(page.getByRole('heading', { name: /Michael McCaul.*Theresa Boisseau/i })).toBeVisible();

    await expect(page.locator('text=TX-10 District Counties')).toBeVisible();
    await expect(page.locator('text=Showing 5 TX-10 Counties')).toBeVisible();
    await expect(page.locator('text=Brazos County (College Station / Bryan - Texas A&M)').first()).toBeVisible();
    await expect(page.locator('text=Travis County (Pflugerville / East Austin / Manor)').first()).toBeVisible();
    await expect(page.locator('text=Bastrop County (Bastrop / Elgin / Smithville)').first()).toBeVisible();
    await expect(page.locator('text=Lee County (Giddings)').first()).toBeVisible();
    await expect(page.locator('text=Burleson County (Caldwell)').first()).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    const bottomNav = page.locator('nav[aria-label="Primary Navigation"]');
    await expect(bottomNav).toBeVisible();
    const mapTab = bottomNav.getByRole('link', { name: 'Map' });
    await expect(mapTab).toBeVisible();

    await mapTab.click();
    await page.waitForURL(/map/);

    await expect(page.getByRole('heading', { name: 'Texas Civic & Electoral Map' })).toBeVisible();
    await expect(page.locator('text=Your Current Geographic Alignment: TX-10')).toBeVisible();
    await expect(page.locator('text=District & County Directory')).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });
  });
});
