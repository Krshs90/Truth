const fs = require('fs');

const seed = JSON.parse(fs.readFileSync('src/data/liveCivicSeed.ts', 'utf8').replace('export const LIVE_CIVIC_SEED = ', '').replace(/;\s*$/, ''));
console.log('Seed claims count:', seed.claims ? seed.claims.length : 0);

const verdicts = {};
(seed.claims || []).forEach(c => {
  const v = c.assessment?.verdict || 'NO VERDICT';
  verdicts[v] = (verdicts[v] || 0) + 1;
});
console.log('Seed verdicts:', verdicts);

const store = JSON.parse(fs.readFileSync('server/data/live_civic_store.json', 'utf8'));
console.log('Store claims count:', store.claims ? store.claims.length : 0);
const storeVerdicts = {};
(store.claims || []).forEach(c => {
  const v = c.assessment?.verdict || 'NO VERDICT';
  storeVerdicts[v] = (storeVerdicts[v] || 0) + 1;
});
console.log('Store verdicts:', storeVerdicts);
