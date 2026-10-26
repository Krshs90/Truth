import fs from 'fs';
const d = fs.readFileSync('public/tx_path.txt', 'utf8').trim();
const html = `<!DOCTYPE html>
<html>
<head>
<style>
body { background: #121212; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
svg { width: 500px; height: 500px; }
path { fill: #222220; stroke: #eab308; stroke-width: 1.5; }
</style>
</head>
<body>
<svg viewBox="395 315 250 235">
  <path d="${d}" />
</svg>
</body>
</html>`;
fs.writeFileSync('test_tx_map.html', html);
console.log('Wrote test_tx_map.html');
