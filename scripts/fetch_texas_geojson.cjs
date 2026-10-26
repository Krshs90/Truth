const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.geojson';
console.log('Fetching', url);

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Successfully fetched GeoJSON! Total features (counties):', parsed.features.length);
      console.log('Sample properties:', parsed.features[0].properties);
      fs.mkdirSync('public/data', { recursive: true });
      fs.writeFileSync('public/data/texas_counties.geojson', data, 'utf8');
      console.log('Saved to public/data/texas_counties.geojson (size:', (data.length / 1024).toFixed(1), 'KB)');
    } catch (e) {
      console.error('Failed to parse:', e.message);
    }
  });
}).on('error', (e) => {
  console.error('Request error:', e.message);
});
