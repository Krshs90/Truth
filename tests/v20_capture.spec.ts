import { test, expect } from '@playwright/test';

test('Capture SVG map view scrolled', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('truth_onboarded_v1', 'true');
  });

  await page.setViewportSize({ width: 1440, height: 950 });

  await page.goto('http://127.0.0.1:5173/government?tab=analytics');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  const mapTitle = page.locator('h3:has-text("Interactive Texas Congressional & Legislative Map")');
  await mapTitle.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await page.screenshot({
    path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    fullPage: false,
  });
});
