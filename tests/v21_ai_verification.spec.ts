import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = (process.env.ARTIFACT_DIR || './scratch/screenshots');

test.describe('Verify with AI & News Feed Verdict Quality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5173');
    await page.evaluate(() => {
      localStorage.setItem('truth_onboarded_v1', 'true');
      localStorage.setItem('truth_user_district_pref', JSON.stringify({
        congressionalDistrict: '26',
        stateSenateDistrict: '12',
        stateHouseDistrict: '64',
        isManualSelection: true,
        selectedAt: new Date().toISOString(),
      }));
    });
  });

  test('News feed displays realistic supported verdicts and Verify with AI generates in-depth assessment', async ({ page }) => {
    page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', (err) => console.log('BROWSER ERROR:', err));

    await page.goto('http://127.0.0.1:5173/overview');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('text=Recent Claim Investigations');

    const supportedBadges = page.locator('span:has-text("Supported by evidence")');
    const supportedCount = await supportedBadges.count();
    console.log(`Found ${supportedCount} "Supported by evidence" badges in news feed`);
    expect(supportedCount).toBeGreaterThan(0);

    const firstVerifyBtn = page.getByRole('button', { name: /Verify with AI/i }).first();
    await expect(firstVerifyBtn).toBeVisible();

    await firstVerifyBtn.click();

    await expect(page.getByText(/AI Research Assessment Generated/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Verified with AI/i).first()).toBeVisible();
    await expect(page.getByText(/Saved Locally/i).first()).toBeVisible();

    const firstCard = page.locator('div.rounded-xl.p-4.border').first();
    await expect(firstCard.locator('span:has-text("Supported by evidence")').first()).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-overview-verified-with-ai-live.png'),
      fullPage: true,
    });
  });
});
