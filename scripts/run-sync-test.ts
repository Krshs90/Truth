import { syncCivicFeeds, loadDynamicStore } from '../server/civicLiveEngine.ts';

async function main() {
  console.log('Starting autonomous sync...');
  const res = await syncCivicFeeds();
  console.log('Sync results:', res);
  const store = loadDynamicStore();
  console.log('Store counts: Claims:', store.claims.length, 'Bills:', store.bills.length, 'Campaigns:', store.campaignUpdates.length);
  if (store.claims.length > 0) {
    console.log('Sample dynamic claim:', store.claims[0].claimText);
  }
}

main().catch(console.error);
