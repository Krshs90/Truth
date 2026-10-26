const fetch = globalThis.fetch;

async function testLiveQuery() {
  const query = 'Texas+(legislature+OR+Paxton+OR+"Brandon+Gill"+OR+Abbott+OR+vouchers+OR+taxes+OR+border)';
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  });
  const text = await resp.text();
  const items = [...text.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>[\s\S]*?(?:<source[^>]*url=\"(.*?)\"[^>]*>(.*?)<\/source>)?[\s\S]*?<\/item>/gi)];
  
  console.log(`Found ${items.length} live articles:`);
  items.slice(0, 10).forEach((m, idx) => {
    console.log(`\n[${idx + 1}] ${m[1]}`);
    console.log(`    Date: ${m[3]}`);
    console.log(`    Source: ${m[5] || 'Unknown'} (${m[4] || ''})`);
  });
}

testLiveQuery().catch(console.error);
