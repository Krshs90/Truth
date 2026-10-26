const fs = require('fs');

async function getTexas() {
  try {
    const res = await fetch('https://simplemaps.com/static/demos/resources/svg-library/svgs/us.svg');
    const svgText = await res.text();
    const match = svgText.match(/<path[^>]*id=["']TX["'][^>]*d=["']([^"']+)["']/i) ||
                  svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*id=["']TX["']/i);
    if (match) {
      console.log('Found Texas path from Simplemaps, length:', match[1].length);
      fs.writeFileSync('public/tx_path.txt', match[1]);
      return;
    }
  } catch (err) {
    console.warn('Simplemaps fetch failed, trying alternative:', err.message);
  }

  try {
    const res2 = await fetch('https://raw.githubusercontent.com/python-visualization/folium/main/examples/data/us-states.json');
    const geo = await res2.json();
    const tx = geo.features.find(f => f.id === 'TX' || f.properties?.name === 'Texas');
    if (tx) {
      console.log('Found Texas geojson coordinates count:', tx.geometry.coordinates[0].length);
      fs.writeFileSync('public/tx_geo.json', JSON.stringify(tx));
    }
  } catch (err2) {
    console.error('Geojson fetch failed:', err2.message);
  }
}

getTexas();
