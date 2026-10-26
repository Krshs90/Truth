async function testSync() {
  const query = 'Texas+politics+election+Paxton+Talarico';
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
  const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const xml = await resp.text();

  const itemRegex = /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>[\s\S]*?<\/item>/gi;
  let match;
  let count = 0;
  while ((match = itemRegex.exec(xml)) !== null && count < 3) {
    count++;
    console.log(`[Item ${count}] Title:`, match[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'"));
    console.log(`   Date:`, match[3]);
  }
}
testSync().catch(console.error);
