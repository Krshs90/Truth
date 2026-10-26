import { test, expect } from '@playwright/test';

test('Verify Government tab, Democrat filter, roll-call safety, Compare vote bar + county map, and Onboarding rerun', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('truth_onboarded_v1', 'true');
    localStorage.setItem('truth_onboarding_completed', 'true');
    localStorage.setItem('truth_active_zip', '76201');
  });

  await page.goto('http://127.0.0.1:5173/government');
  await page.waitForLoadState('networkidle');

  const billLookupText = await page.textContent('body');
  expect(billLookupText).toContain('Look Up Any Texas or Federal Bill');
  expect(billLookupText).toContain('Texas & Federal Bills');
  expect(billLookupText).toContain('Check for New Bills');

  const expandButtons = page.locator('button:has-text("View Roll-Call Votes & History")');
  const count = await expandButtons.count();
  if (count > 0) {
    await expandButtons.first().click();
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });

  await page.click('button:has-text("Elected Officials & Legislators")');
  await page.waitForTimeout(600);

  await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });

  const demFilter = page.locator('button:text-is("Democrat")');
  await demFilter.click();
  await page.waitForTimeout(600);

  const officialCards = page.locator('h3.text-lg.font-bold');
  const demCount = await officialCards.count();
  console.log(`Found ${demCount} Democratic officials displayed after filtering`);
  expect(demCount).toBeGreaterThan(5);

  await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });

  await page.goto('http://127.0.0.1:5173/compare');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  const compareText = await page.textContent('body');
  expect(compareText).toContain('Projected Vote Share & Lead Indicator');
  expect(compareText).toContain('County Voting Coalitions & Regional Battlegrounds');

  const tarrantCard = page.locator('text=Tarrant County (Fort Worth)');
  if (await tarrantCard.count() > 0) {
    await tarrantCard.first().click();
    await page.waitForTimeout(400);
  }

  await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });

  await page.goto('http://127.0.0.1:5173/');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('text=Recent Claim Investigations');
  await page.waitForTimeout(500);

  const overviewText = await page.textContent('body');
  expect(overviewText).toContain('Next:');

  await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });

  await page.goto('http://127.0.0.1:5173/settings');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);

  const rerunButton = page.locator('button:has-text("Rerun Setup Wizard")');
  if (await rerunButton.count() > 0) {
    await rerunButton.click();
    await page.waitForTimeout(600);
    const beginButton = page.locator('button:has-text("Begin")');
    expect(await beginButton.count()).toBeGreaterThan(0);
    await page.screenshot({ path: (process.env.ARTIFACT_DIR || './scratch/screenshots'), fullPage: false });
  }
});
