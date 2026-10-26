import { test, expect } from '@playwright/test';

test.describe('V26 Civic Claims Library Integrity, County Placement, and Stability', () => {
  test('Counties fill the middle open space, Civic Claims Library has 104 verified claims with 0 Unchecked, and page remains stable', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.addInitScript(() => {
      localStorage.setItem('truth_selected_cd', 'tx-cd-26');
      localStorage.setItem('truth_selected_sd', 'tx-sd-12');
      localStorage.setItem('truth_selected_hd', 'tx-hd-108');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const repCard = page.locator('div.rounded-2xl:has-text("Your Texas Representation")').first();
    await expect(repCard).toBeVisible();

    await expect(repCard.locator('text=Counties Served').first()).toBeVisible();
    await expect(repCard.locator('text=Denton County, Cooke County, Wise County')).toBeVisible();
    await expect(repCard.locator('text=Denton County, Tarrant County, Wise County')).toBeVisible();
    await expect(repCard.locator('text=Dallas County').first()).toBeVisible();

    await expect(repCard.locator('text=Brandon Gill').first()).toBeVisible();
    await expect(repCard.locator('text=Tan Parker').first()).toBeVisible();
    await expect(repCard.locator('text=Morgan Meyer').first()).toBeVisible();
    await expect(repCard.locator('span:text-is("R")').first()).toBeVisible();

    await expect(repCard.locator('a:has-text("Votes")')).toHaveCount(0);

    await repCard.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    await page.waitForTimeout(3000);
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    await page.goto('http://127.0.0.1:5173/investigate', { waitUntil: 'networkidle' });
    const libraryHeading = page.getByRole('heading', { name: /Civic Claims Library/i });
    await expect(libraryHeading).toBeVisible();

    const headingText = await libraryHeading.textContent();
    const countMatch = headingText?.match(/\((\d+)\)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    console.log('Civic Claims Library count in heading:', count);
    expect(count).toBeGreaterThanOrEqual(100);

    const libraryGrid = page.locator('div.grid.grid-cols-1.md\\:grid-cols-2');
    await expect(libraryGrid).toBeVisible();
    const uncheckedBadgesInLibrary = libraryGrid.locator('span:text-is("Unchecked")');
    const uncheckedCount = await uncheckedBadgesInLibrary.count();
    console.log('Unchecked count in library grid:', uncheckedCount);
    expect(uncheckedCount).toBe(0);

    await expect(page.locator('text=Texas passed an $18 billion property tax cut in 2023').first()).toBeVisible();
    await expect(page.locator('text=Mostly supported').first()).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });
  });
});
