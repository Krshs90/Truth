const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = 'C:\\Users\\krish\\.gemini\\antigravity\\brain\\9ee12a58-41ed-4478-898b-aa4c7cc1270d';

  // 1. Fresh launch -> Onboarding Step 1
  await page.goto('http://localhost:4173/');
  await page.waitForTimeout(600);

  // Click Continue -> Step 2 (District Selector)
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'ui-onboarding-step2.png') });
  console.log('Captured step 2');

  // Click Continue -> Step 3 (Engine & AI)
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'ui-onboarding-step3.png') });
  console.log('Captured step 3');

  // Click Continue -> Step 4 (Launch Summary)
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'ui-onboarding-step4.png') });
  console.log('Captured step 4');

  // Click "Enter Truth Dashboard" -> Dashboard overview
  await page.click('button:has-text("Enter Truth Dashboard")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-overview-live.png') });
  console.log('Captured overview live');

  // Navigate to District Page
  await page.goto('http://localhost:4173/district');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-district-live.png') });
  console.log('Captured district live');

  // Navigate to Government Tracker Page
  await page.goto('http://localhost:4173/government');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-government-live.png') });
  console.log('Captured government live');

  await browser.close();
}

main().catch(console.error);
