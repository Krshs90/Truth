const fs = require('fs');
const path = require('path');

const candPath = path.resolve(__dirname, '../src/data/candidates.ts');
let candContent = fs.readFileSync(candPath, 'utf8');

const candReplacements = [
  ["photoUrl: '/images/officials/cand-campbell-2024.svg'", "photoUrl: '/images/officials/off-txsen-campbell.jpg'"],
  ["photoUrl: '/images/officials/cand-fox-2024.svg'", "photoUrl: '/images/officials/merrie-fox.jpg'"],
  ["photoUrl: '/images/officials/brandon-gill.jpg'", "photoUrl: '/images/officials/off-fed-gill.jpg'"],
  ["photoUrl: '/images/officials/ken-paxton.svg'", "photoUrl: '/images/officials/off-txgov-paxton.jpg'"],
  ["photoUrl: '/images/officials/james-talarico.svg'", "photoUrl: '/images/officials/off-txhouse-talarico.jpg'"],
  ["photoUrl: '/images/officials/ernest-lineberger.svg'", "photoUrl: '/images/officials/ernest-lineberger.jpg'"],
  ["photoUrl: '/images/officials/gutierrez-pos-gun.svg'", "photoUrl: '/images/officials/roland-gutierrez.jpg'"],
  ["photoUrl: '/images/officials/off-txgov-patrick.svg'", "photoUrl: '/images/officials/off-txgov-patrick.jpg'"],
  ["photoUrl: '/images/officials/collier-pos-tax.svg'", "photoUrl: '/images/officials/mike-collier.jpg'"],
];

for (const [target, repl] of candReplacements) {
  candContent = candContent.replaceAll(target, repl);
}
fs.writeFileSync(candPath, candContent, 'utf8');
console.log('candidates.ts successfully updated!');

const offPath = path.resolve(__dirname, '../src/data/officials.ts');
let offContent = fs.readFileSync(offPath, 'utf8');

offContent = offContent.replace(/\s*photoUrl:\s*'[^']+',/g, '');

offContent = offContent.replace(/(\s*id:\s*'([^']+)',)/g, (match, p1, id) => {
  return `${p1}\n    photoUrl: '/images/officials/${id}.jpg',`;
});

fs.writeFileSync(offPath, offContent, 'utf8');
console.log('officials.ts successfully updated with all 46 photos!');
