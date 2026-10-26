const fs = require('fs');

console.log('Optimizing Texas counties for web display...');
const raw = JSON.parse(fs.readFileSync('public/data/texas_counties.geojson', 'utf8'));

function simplifyRing(ring, tolerance = 0.006) {
  if (ring.length <= 4) return ring.map(([lng, lat]) => [Number(lng.toFixed(4)), Number(lat.toFixed(4))]);
  const simplified = [];
  let prev = ring[0];
  simplified.push([Number(prev[0].toFixed(4)), Number(prev[1].toFixed(4))]);

  for (let i = 1; i < ring.length - 1; i++) {
    const cur = ring[i];
    const dx = Math.abs(cur[0] - prev[0]);
    const dy = Math.abs(cur[1] - prev[1]);
    if (dx > tolerance || dy > tolerance) {
      simplified.push([Number(cur[0].toFixed(4)), Number(cur[1].toFixed(4))]);
      prev = cur;
    }
  }
  const last = ring[ring.length - 1];
  simplified.push([Number(last[0].toFixed(4)), Number(last[1].toFixed(4))]);
  return simplified;
}

const optimizedFeatures = raw.features.map(f => {
  let newGeom = { type: f.geometry.type, coordinates: [] };
  if (f.geometry.type === 'Polygon') {
    newGeom.coordinates = f.geometry.coordinates.map(ring => simplifyRing(ring));
  } else if (f.geometry.type === 'MultiPolygon') {
    newGeom.coordinates = f.geometry.coordinates.map(poly => poly.map(ring => simplifyRing(ring)));
  }
  return {
    type: 'Feature',
    properties: {
      name: f.properties.COUNTY.replace(/\s+County$/i, ''),
      fullName: f.properties.COUNTY,
      fips: f.properties.FIPS,
    },
    geometry: newGeom,
  };
});

const optimized = {
  type: 'FeatureCollection',
  features: optimizedFeatures,
};

fs.writeFileSync('public/data/texas_counties_web.json', JSON.stringify(optimized), 'utf8');
const stats = fs.statSync('public/data/texas_counties_web.json');
console.log('Saved optimized texas_counties_web.json, size:', (stats.size / 1024).toFixed(1), 'KB');
