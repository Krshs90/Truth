const fs = require('fs');
const path = require('path');

const candPath = path.join(__dirname, '../src/data/candidates.ts');
let content = fs.readFileSync(candPath, 'utf8');

const candidatePhotos = {
  'cand-cruz-2024': '/images/officials/off-fed-cruz.jpg',
  'cand-allred-2024': '/images/officials/off-fed-allred.jpg',
  'cand-paxton-2026': '/images/officials/ken-paxton.svg',
  'cand-talarico-2026': '/images/officials/james-talarico.svg',
  'cand-gill-2024': '/images/officials/brandon-gill.jpg',
  'cand-lineberger-2026': '/images/officials/ernest-lineberger.svg',
  'cand-cornyn-2026': '/images/officials/off-fed-cornyn.jpg',
  'cand-gutierrez-2026': '/images/officials/gutierrez-pos-gun.svg',
  'cand-patrick-2026': '/images/officials/off-txgov-patrick.svg',
  'cand-collier-2026': '/images/officials/collier-pos-tax.svg',
};

content = content.replace(/\n\s*photoUrl:\s*['"][^'"]+['"],?/g, '');

content = content.replace(/id:\s*['"](cand-[^'"]+)['"],/g, (m, id) => {
  const photo = candidatePhotos[id] || `/images/officials/${id}.svg`;
  return `${m}\n    photoUrl: '${photo}',`;
});

fs.writeFileSync(candPath, content, 'utf8');
console.log('Fixed candidates.ts photoUrls cleanly!');
