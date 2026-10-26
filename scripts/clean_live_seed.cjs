const fs = require('fs');

const seedPath = 'src/data/liveCivicSeed.ts';
const content = fs.readFileSync(seedPath, 'utf8');
const jsonStr = content.replace('export const LIVE_CIVIC_SEED = ', '').replace(/;\s*$/, '');
const seed = JSON.parse(jsonStr);

console.log('Original seed claims:', seed.claims.length);
seed.claims = seed.claims.filter(c => c.assessment && c.assessment.verdict !== 'Unchecked');
console.log('Filtered seed claims (verified only):', seed.claims.length);

fs.writeFileSync(seedPath, `export const LIVE_CIVIC_SEED = ${JSON.stringify(seed, null, 2)};\n`, 'utf8');
console.log('Successfully updated liveCivicSeed.ts!');
