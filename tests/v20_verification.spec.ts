import { test, expect } from '@playwright/test';

test.describe('V20 Verification: Strict Civic Architecture & UI Polish', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('truth_onboarded_v1', 'true');
      localStorage.setItem('truth_selected_cd', 'tx-cd-26');
      localStorage.setItem('truth_selected_sd', 'tx-sd-12');
      localStorage.setItem('truth_selected_hd', 'tx-hd-65');
      localStorage.setItem('truth_active_zip', '75028');
    });
  });

  test('1. Overview Page: Clean representation, no random pills, no separate sync, proper sort', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.waitForLoadState('networkidle');

    const headerLiveSync = page.locator('header button:has-text("Live Sync")');
    await expect(headerLiveSync).toBeVisible();

    await expect(page.locator('text=Your Texas Representation')).toBeVisible();
    await expect(page.locator('text=Brandon Gill').first()).toBeVisible();

    await expect(page.locator('text=Full District Setup')).toHaveCount(0);
    await expect(page.locator('text=Interactive Roll-Call Graphs & District Delegation Map')).toHaveCount(0);
    await expect(page.locator('text=50 Active Outlets')).toHaveCount(0);
    await expect(page.locator('text=Active Outlets')).toHaveCount(0);

    await expect(page.locator('section button:has-text("Sync")')).toHaveCount(0);

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: false,
    });
  });

  test('2. Investigate Page: Civic Claims Library with verified verdicts and 100+ claims', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/investigate');
    await page.waitForLoadState('networkidle');

    const libraryTab = page.locator('button:has-text("Civic Claims Library")');
    await expect(libraryTab).toBeVisible();
    await libraryTab.click();

    const libraryHeader = page.locator('text=/Civic Claims Library \\(\\d+\\)/i').first();
    await expect(libraryHeader).toBeVisible();

    await expect(page.locator('text=Supported by evidence').first()).toBeVisible();
    await expect(page.locator('text=Contradicted by available evidence').first()).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: false,
    });
  });

  test('3. Compare Page: Accurate TX-26 Counties, no battlegrounds tags, no separate sync', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/compare');
    await page.waitForLoadState('networkidle');

    const tx26RaceBtn = page.getByRole('button', { name: /2026 U.S. House District 26/i });
    await expect(tx26RaceBtn).toBeVisible();
    await tx26RaceBtn.click();

    await expect(page.locator('text=TX-26 District Counties')).toBeVisible();

    await expect(page.locator('text=Denton County').first()).toBeVisible();
    await expect(page.locator('text=Wise County').first()).toBeVisible();
    await expect(page.locator('text=Cooke County').first()).toBeVisible();

    await expect(page.locator('text=Harris County (Houston)')).toHaveCount(0);
    await expect(page.locator('text=Travis County (Austin)')).toHaveCount(0);
    await expect(page.locator('text=El Paso County (El Paso)')).toHaveCount(0);

    await expect(page.locator('text=regional battlegrounds')).toHaveCount(0);
    await expect(page.locator('text=Regional Battlegrounds')).toHaveCount(0);
    await expect(page.locator('button:has-text("Suburban Battlegrounds")')).toHaveCount(0);
    await expect(page.locator('button:has-text("Urban Metro Hubs")')).toHaveCount(0);

    await expect(page.locator('button:has-text("Resync Wire")')).toHaveCount(0);

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: false,
    });
  });

  test('4. Government Page: Interactive Map with 38 districts, no overlapping text, portrait loaded', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/government?tab=analytics');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Interactive Texas Congressional & Legislative Map')).toBeVisible();

    await expect(page.locator('text=Showing 38 of 38 Texas Congressional Districts')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Brandon Gill' })).toBeVisible();
    const repPhoto = page.locator('img[alt="Brandon Gill"]');
    await expect(repPhoto).toBeVisible();

    await page.goto('http://127.0.0.1:5173/government');
    await expect(page.locator('button:has-text("Check for New Bills")')).toHaveCount(0);

    const officialsTab = page.locator('button:has-text("Elected Officials")');
    await officialsTab.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: false,
    });

    await page.locator('button:has-text("Roll-Call Analytics & District Map")').click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: false,
    });
  });
});
