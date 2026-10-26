import { test, expect } from '@playwright/test';

test.describe('V25 Representation Section Optimization & Politician Photos Audit', () => {
  test('Representation cards are cleanly fitted with full names, "R" party tag, no votes button, and real photos', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

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

    const votesLink = repCard.locator('a:has-text("Votes")');
    await expect(votesLink).toHaveCount(0);

    const partyRBadges = repCard.locator('span:text-is("R")');
    const rCount = await partyRBadges.count();
    expect(rCount).toBeGreaterThanOrEqual(3);

    await expect(repCard.locator('text=Brandon Gill').first()).toBeVisible();
    await expect(repCard.locator('text=Tan Parker').first()).toBeVisible();
    await expect(repCard.locator('text=Morgan Meyer').first()).toBeVisible();

    await expect(repCard.locator('text=District 26').first()).toBeVisible();
    await expect(repCard.locator('text=District 12').first()).toBeVisible();
    await expect(repCard.locator('text=District 108').first()).toBeVisible();

    await repCard.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    await page.goto('http://127.0.0.1:5173/government', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Government & Legislative Tracker', exact: true })).toBeVisible();

    await page.getByRole('button', { name: /Elected Officials & Legislators/i }).click();
    await page.waitForTimeout(300);

    await page.fill('input[placeholder*="Search officials"]', 'Blacklock');
    await page.waitForTimeout(300);
    const blacklockCard = page.locator('div:has-text("Jimmy Blacklock")').first();
    await expect(blacklockCard).toBeVisible();
    const blacklockImg = blacklockCard.locator('img').first();
    await expect(blacklockImg).toBeVisible();

    await page.fill('input[placeholder*="Search officials"]', 'Abbott');
    await page.waitForTimeout(300);
    const abbottCard = page.locator('div:has-text("Greg Abbott")').first();
    await expect(abbottCard).toBeVisible();
    const abbottImg = abbottCard.locator('img').first();
    await expect(abbottImg).toBeVisible();

    await page.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });
  });
});
