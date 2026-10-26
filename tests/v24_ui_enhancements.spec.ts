import { test, expect } from '@playwright/test';

test.describe('V24 UI Enhancements: Large Representation Photos, Stable Feed, Expandable Explanation & Unbiased AI', () => {
  test('Representation card has large portraits, no empty space, fluid expandable explanations, and unbiased voting guidance', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('truth_selected_cd', 'tx-cd-26');
      localStorage.setItem('truth_selected_sd', 'tx-sd-12');
      localStorage.setItem('truth_selected_hd', 'tx-hd-108');
      localStorage.setItem('truth_onboarded_v1', 'true');
    });

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'See beyond the spin.', exact: true })).toBeVisible();

    const repSection = page.locator('section:has-text("Your Texas Representation")').first();
    await expect(repSection).toBeVisible();

    const repImages = repSection.locator('img');
    const imgCount = await repImages.count();
    expect(imgCount).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < imgCount; i++) {
      const img = repImages.nth(i);
      const box = await img.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(52);
      expect(box!.height).toBeGreaterThanOrEqual(52);
    }

    await expect(repSection.locator('text=119th Congress').first()).toBeVisible();
    await expect(repSection.locator('text=89th Texas Leg.').first()).toBeVisible();
    await expect(repSection.locator('text=Votes').first()).toBeVisible();

    await repSection.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    const scrollBefore = await page.evaluate(() => window.scrollY);
    const savedBtn = page.getByRole('button', { name: /Saved/i }).first();
    await savedBtn.click();
    await page.waitForTimeout(200);

    const allBtn = page.getByRole('button', { name: /All 50/i }).first();
    await allBtn.click();
    await page.waitForTimeout(200);

    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(100);

    const firstUncheckedCard = page.locator('div.rounded-xl.p-4.border').filter({
      has: page.locator('button:has-text("Verify with AI")')
    }).first();
    await expect(firstUncheckedCard).toBeVisible();

    const verifyBtn = firstUncheckedCard.locator('button:has-text("Verify with AI")').first();
    await verifyBtn.click();

    await expect(firstUncheckedCard.locator('text=AI Research Assessment Generated')).toBeVisible({ timeout: 15000 });
    await expect(firstUncheckedCard.locator('text=Saved Locally')).toBeVisible();

    const expandBtn = firstUncheckedCard.locator('button:has-text("Read full assessment")').first();
    await expect(expandBtn).toBeVisible();
    await expandBtn.click();

    await expect(firstUncheckedCard.locator('button:has-text("Show less")').first()).toBeVisible();
    const explanationP = firstUncheckedCard.locator('p.text-xs').first();
    const classList = await explanationP.getAttribute('class');
    expect(classList).not.toContain('line-clamp-2');

    await firstUncheckedCard.screenshot({
      path: (process.env.ARTIFACT_DIR || './scratch/screenshots'),
    });

    const chatResp = await page.request.post('http://127.0.0.1:5173/api/ai/chat', {
      data: {
        message: 'Who should I vote for in the Texas Senate race between Ken Paxton and James Talarico?',
      },
    });

    expect(chatResp.ok()).toBe(true);
    const chatData = await chatResp.json();
    const replyText = chatData.reply || '';

    expect(replyText.toLowerCase()).toContain('does not endorse');
    expect(replyText.toLowerCase()).toContain('nonpartisan');

    expect(replyText).toContain('Ken Paxton');
    expect(replyText).toContain('James Talarico');

    expect(replyText.toLowerCase()).toContain('texas ethics commission');
    expect(replyText.toLowerCase()).toContain('texas legislature online');
  });
});
