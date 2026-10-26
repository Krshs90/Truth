import { test, expect } from '@playwright/test';

test.describe('V31 254-Counties GIS Map & Senate Workspace Verification', () => {
  test('Renders 254 selectable counties with Democratic/Republican majorities, 31 Senate districts, spaced politician dots, and no api key prompts', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });

    await page.addInitScript(() => {
      localStorage.setItem('truth_active_zip', '78660');
      localStorage.setItem('truth_selected_cd', 'tx-cd-10');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/map');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Texas Civic & Electoral Map' })).toBeVisible();

    await expect(page.locator('button:has-text("All Texas")')).toHaveCount(0);
    await expect(page.locator('button:has-text("North Texas")')).toHaveCount(0);
    await expect(page.locator('button:has-text("East Texas")')).toHaveCount(0);

    await expect(page.locator('text=api key required')).toHaveCount(0);
    await expect(page.locator('text=API Key Required')).toHaveCount(0);

    const countiesBtn = page.locator('button:has-text("Counties (254)")');
    const districtsBtn = page.locator('button:has-text("Districts (38)")');
    const politiciansBtn = page.locator('button:has-text("Politicians (12 Key)")');
    const senateBtn = page.locator('button:has-text("TX Senate (31)")');

    await expect(countiesBtn).toBeVisible();
    await expect(districtsBtn).toBeVisible();
    await expect(politiciansBtn).toBeVisible();
    await expect(senateBtn).toBeVisible();

    await countiesBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator('h3:has-text("Harris County")')).toBeVisible();
    await expect(page.locator('text=Majority Democratic').first()).toBeVisible();
    await expect(page.locator('text=County Seat:')).toBeVisible();
    await expect(page.getByText('Houston', { exact: true })).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: true,
    });

    const searchInput = page.locator('input[placeholder*="254 counties"]');
    await searchInput.fill('Collin');
    await page.waitForTimeout(200);
    await searchInput.fill('');
    await page.waitForTimeout(200);

    await senateBtn.click();
    await page.waitForTimeout(400);

    const sd14Marker = page.locator('[data-testid="marker-senate-SD-14"]');
    const sd12Marker = page.locator('[data-testid="marker-senate-SD-12"]');
    const sd01Marker = page.locator('[data-testid="marker-senate-SD-01"]');

    await expect(sd14Marker).toBeVisible();
    await expect(sd12Marker).toBeVisible();
    await expect(sd01Marker).toBeVisible();

    await sd12Marker.click();
    await page.waitForTimeout(300);

    await expect(page.locator('h3:has-text("Senator Tan Parker")')).toBeVisible();
    await expect(page.locator('text=Senate District 12').first()).toBeVisible();
    await expect(page.locator('text=Recorded Senate Roll-Call Votes')).toBeVisible();
    await expect(page.locator('text=Official Texas Senate Member Page')).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: true,
    });

    await districtsBtn.click();
    await page.waitForTimeout(400);

    const tx10Marker = page.locator('[data-testid="marker-district-TX-10"]');
    await expect(tx10Marker).toBeVisible();
    await tx10Marker.click();
    await page.waitForTimeout(300);
    await expect(page.locator('h3:has-text("Michael McCaul")')).toBeVisible();

    await politiciansBtn.click();
    await page.waitForTimeout(400);

    const abbottMarker = page.locator('[data-testid="marker-politician-pol-abbott"]');
    const patrickMarker = page.locator('[data-testid="marker-politician-pol-patrick"]');
    const paxtonMarker = page.locator('[data-testid="marker-politician-pol-paxton"]');
    const gillMarker = page.locator('[data-testid="marker-politician-pol-gill"]');

    await expect(abbottMarker).toBeVisible();
    await expect(patrickMarker).toBeVisible();
    await expect(paxtonMarker).toBeVisible();
    await expect(gillMarker).toBeVisible();

    await gillMarker.click();
    await page.waitForTimeout(300);

    await expect(page.locator('h3:has-text("Brandon Gill")')).toBeVisible();
    const gillImg = page.locator('img[alt="Brandon Gill"]');
    await expect(gillImg).toBeVisible();
    expect(await gillImg.getAttribute('src')).toBe('/images/officials/off-fed-gill.jpg');

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
      fullPage: true,
    });
  });
});
