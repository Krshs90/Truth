import { test, expect } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = (process.env.ARTIFACT_DIR || './scratch/screenshots');

test.describe('V21 Verification Tests: Texas Statewide Leadership, Coming Soon Analytics, 22 Laws, Custom Matchups & Ad Video Ingest', () => {
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

  test('1. Government Tab: Judicial Branch, Jimmy Blacklock, and Statewide Officers', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/government');
    await page.waitForLoadState('networkidle');

    const officialsTabBtn = page.getByRole('button', { name: /Elected Officials & Legislators/i });
    await expect(officialsTabBtn).toBeVisible();
    await officialsTabBtn.click();

    const judicialFilterBtn = page.getByRole('button', { name: 'Judicial' });
    await expect(judicialFilterBtn).toBeVisible();
    await judicialFilterBtn.click();

    await expect(page.getByText('Jimmy Blacklock')).toBeVisible();
    await expect(page.getByText(/Justice, Supreme Court of Texas/i).first()).toBeVisible();
    await expect(page.getByText(/Statewide \(Texas Supreme Court\)/i).first()).toBeVisible();

    const searchInput = page.getByPlaceholder(/Search officials/i);
    await searchInput.fill('Jimmy Blacklock');
    await expect(page.getByText('Jimmy Blacklock')).toBeVisible();
    await expect(page.getByText(/In re Abbott/i)).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-government-jimmy-blacklock-judicial.png'),
      fullPage: true,
    });

    await searchInput.fill('');
    const execFilterBtn = page.getByRole('button', { name: 'Executive' });
    await execFilterBtn.click();
    await expect(page.getByText('Glenn Hegar')).toBeVisible();
    await expect(page.getByText('Sid Miller')).toBeVisible();
    await expect(page.getByText('Christi Craddick')).toBeVisible();
    await expect(page.getByText('Dawn Buckingham')).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-government-executive-statewide-officers.png'),
      fullPage: true,
    });
  });

  test('2. Government Tab: Roll-Call Analytics Disabled & "Coming Soon" Display', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/government');
    await page.waitForLoadState('networkidle');

    const analyticsTabBtn = page.getByRole('button', { name: /Roll-Call Analytics \(Coming Soon\)/i });
    await expect(analyticsTabBtn).toBeVisible();
    await analyticsTabBtn.click();

    await expect(page.getByText(/Roll-Call Analytics & District Map — Coming Soon/i)).toBeVisible();
    await expect(page.getByText(/This analytics module is currently disabled while undergoing an architecture modernization/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Browse Verified Bills & Laws/i })).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-government-rollcall-analytics-coming-soon.png'),
      fullPage: true,
    });
  });

  test('3. Government Tab: Bills & Laws Comprehensive 22 Texas Legislation Tracker', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/government');
    await page.waitForLoadState('networkidle');

    const billsTabBtn = page.getByRole('button', { name: /Bills & Laws/i });
    await expect(billsTabBtn).toBeVisible();
    await billsTabBtn.click();

    const searchInput = page.getByPlaceholder(/Search by bill number/i);
    await searchInput.fill('HB 1927');
    await expect(page.getByText(/Firearm Carry Act of 2021 \(Constitutional Carry\)/i)).toBeVisible();

    await searchInput.fill('READER');
    await expect(page.getByText(/Restricting Explicit and Adult-Designated Educational Resources \(READER\) Act/i)).toBeVisible();

    await searchInput.fill('H.R. 2');
    await expect(page.getByText(/Secure the Border Act of 2023/i)).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-government-bills-expanded-legislation.png'),
      fullPage: true,
    });
  });

  test('4. Compare Tab: Custom Candidate Matchup Detection, Honest Comparison Bar & Propaganda Video Embeds (Beta)', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/compare');
    await page.waitForLoadState('networkidle');

    const candidateAButton = page.locator('button:has-text("Candidate A")').or(page.locator('button:has-text("Brandon Gill")').first()).or(page.locator('text=Candidate A').locator('..').locator('button'));
    const selectTrigger = page.locator('text=Candidate A').locator('..').locator('button');
    if (await selectTrigger.isVisible()) {
      await selectTrigger.click();
      await page.locator('text=Brandon Gill — U.S. Representative (TX-26)').first().click();
    }

    const selectBTrigger = page.locator('text=Candidate B').locator('..').locator('button');
    if (await selectBTrigger.isVisible()) {
      await selectBTrigger.click();
      await page.locator('text=Colin Allred — U.S. Senator for Texas').first().click();
    }

    await expect(page.getByText(/Custom Candidate Comparison/i).first()).toBeVisible();
    await expect(page.getByText(/Notice: Not on the Same Ballot/i)).toBeVisible();
    await expect(page.getByText(/Total Campaign Funds Raised/i)).toBeVisible();
    await expect(page.getByText(/Cash-on-Hand Reserves/i)).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-compare-custom-candidate-honest-bars.png'),
      fullPage: true,
    });

    const tx26RaceBtn = page.getByRole('button', { name: /2026 U.S. House District 26/i });
    if (await tx26RaceBtn.isVisible()) {
      await tx26RaceBtn.click();
    }

    const propagandaTabBtn = page.getByRole('button', { name: /Propaganda & Attack Ads/i });
    await expect(propagandaTabBtn).toBeVisible();
    await propagandaTabBtn.click();

    await expect(page.getByText(/Campaign Propaganda Ad Video Archive • Beta Feature/i)).toBeVisible();
    await expect(page.getByText(/Autonomous Video Ingest \(Beta\)/i).first()).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'v21-compare-propaganda-ad-video-beta.png'),
      fullPage: true,
    });
  });
});
