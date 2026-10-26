const { chromium } = require('playwright');
const fs = require('fs');

async function renderTexasWhite() {
  const txPath = fs.readFileSync('public/tx_path.txt', 'utf8').trim();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1200px;
            height: 1200px;
            overflow: hidden;
          }
          svg {
            display: block;
          }
        </style>
      </head>
      <body>
        <svg id="txSvg" xmlns="http://www.w3.org/2000/svg">
          <path id="txPath" d="${txPath}" fill="#FFFFFF" />
        </svg>
      </body>
    </html>
  `;

  await page.setContent(html);

  const bbox = await page.evaluate(() => {
    const p = document.getElementById('txPath');
    const b = p.getBBox();
    const svg = document.getElementById('txSvg');
    
    const pad = Math.max(b.width, b.height) * 0.08;
    const vb = `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`;
    svg.setAttribute('viewBox', vb);
    svg.setAttribute('width', '1024');
    svg.setAttribute('height', '1024');
    
    return { x: b.x, y: b.y, width: b.width, height: b.height, viewBox: vb };
  });

  console.log('Texas Bounding Box:', bbox);

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bbox.viewBox}" width="1024" height="1024">
  <path d="${txPath}" fill="#FFFFFF" />
</svg>
  `.trim();
  fs.writeFileSync('public/texas_shape.svg', svgContent);

  const svgHandle = await page.$('#txSvg');
  await svgHandle.screenshot({ path: 'public/texas_shape.png' });
  await svgHandle.screenshot({ path: 'public/texas_sculpture.jpg' });

  await browser.close();
  console.log('Successfully rendered clean white Texas shape to public/texas_shape.png and public/texas_sculpture.jpg!');
}

renderTexasWhite().catch(console.error);
