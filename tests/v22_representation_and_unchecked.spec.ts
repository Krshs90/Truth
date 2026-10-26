import { test, expect } from '@playwright/test';

test.describe('V23 Representation Box, Real Photos, Unchecked Badges & Persistent AI Verification', () => {
  test('Overview displays real portraits, clean header, Unchecked status, and persistent AI verification across reloads', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('truth_selected_cd', 'tx-cd-26');
      localStorage.setItem('truth_selected_sd', 'tx-sd-12');
      localStorage.setItem('truth_selected_hd', 'tx-hd-108');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const repBox = page.locator('section:has-text("Your Texas Representation")').first();
    await expect(repBox).toBeVisible();

    await expect(repBox.locator('text=Brandon Gill').first()).toBeVisible();
    await expect(repBox.locator('text=District 26').first()).toBeVisible();

    await expect(repBox.locator('text=Tan Parker').first()).toBeVisible();
    await expect(repBox.locator('text=District 12').first()).toBeVisible();

    await expect(repBox.locator('text=Morgan Meyer').first()).toBeVisible();
    await expect(repBox.locator('text=District 108').first()).toBeVisible();

    await expect(page.locator('text=In-District Delegation')).toHaveCount(0);
    await expect(page.locator('text=Active Delegation')).toHaveCount(0);
    await expect(page.locator('text=Texas 89th Legislative Session')).toHaveCount(0);

    const images = repBox.locator('img');
    const imgCount = await images.count();
    expect(imgCount).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
      expect(isLoaded).toBe(true);
    }

    await repBox.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    const feedSection = page.locator('section:has-text("Recent Claim Investigations")').first();
    await expect(feedSection).toBeVisible();

    const unverifiedBadges = page.locator('span:has-text("Unverified")');
    await expect(unverifiedBadges).toHaveCount(0);

    const uncheckedBadges = feedSection.locator('span:has-text("Unchecked")');
    const uncheckedCount = await uncheckedBadges.count();
    console.log(`Verified ${uncheckedCount} "Unchecked" claim badges in recent investigations feed.`);
    expect(uncheckedCount).toBeGreaterThan(0);

    const verifyBtn = page.getByRole('button', { name: /Verify with AI/i }).first();
    await expect(verifyBtn).toBeVisible();

    const parentCard = verifyBtn.locator('xpath=ancestor::div[contains(@class, "rounded-xl") and contains(@class, "p-4")]');
    const headline = await parentCard.locator('a[href^="/investigate"]').first().innerText();
    console.log(`Testing AI verification on claim: ${headline}`);

    await verifyBtn.click();

    await expect(page.getByText(/AI Research Assessment Generated/i).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Saved Locally/i).first()).toBeVisible();
    await expect(page.getByText(/Verified with AI — may be wrong or contain inaccuracies/i).first()).toBeVisible();

    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.getByText(/AI Research Assessment Generated/i).first()).toBeVisible();
    await expect(page.getByText(/Saved Locally/i).first()).toBeVisible();
    await expect(page.getByText(/Verified with AI — may be wrong or contain inaccuracies/i).first()).toBeVisible();

    const reloadedCard = page.locator('div.rounded-xl.p-4').filter({ hasText: headline.replace(/"/g, '') }).first();
    await expect(reloadedCard).toBeVisible();
    await expect(reloadedCard.locator('span:has-text("Unchecked")')).toHaveCount(0);

    await page.locator('section:has-text("Recent Claim Investigations")').first().screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });
  });
});
