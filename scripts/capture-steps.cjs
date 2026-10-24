const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  const outDir = 'C:\\Users\\krish\\.gemini\\antigravity\\brain\\9ee12a58-41ed-4478-898b-aa4c7cc1270d';

  // Mark onboarding complete in localStorage so we can capture direct pages
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => localStorage.setItem('truth_onboarded_v1', 'true'));

  // 1. Overview Page
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-overview.png') });
  console.log('Captured ui-whispr-overview.png');

  // 2. Dynamic Island Expanded
  await page.click('button:has-text("Verify Claim")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-dynamic-island.png') });
  console.log('Captured ui-whispr-dynamic-island.png');

  // 3. Investigate Page
  await page.goto('http://localhost:5173/investigate');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-investigate.png') });
  console.log('Captured ui-whispr-investigate.png');

  // 4. Claim Detail Page
  await page.goto('http://localhost:5173/investigate/claim-tx-tax-cut-18b');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-claim-detail.png') });
  console.log('Captured ui-whispr-claim-detail.png');

  // 5. District Page
  await page.goto('http://localhost:5173/district');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-district.png') });
  console.log('Captured ui-whispr-district.png');

  // 6. Compare Page
  await page.goto('http://localhost:5173/compare');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-compare.png') });
  console.log('Captured ui-whispr-compare.png');

  // 7. Government Page
  await page.goto('http://localhost:5173/government');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'ui-whispr-government.png') });
  console.log('Captured ui-whispr-government.png');

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

main().catch(console.error);
