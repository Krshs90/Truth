async function test() {
  const url = 'https://news.google.com/rss/search?q=Texas+Ken+Paxton&hl=en-US&gl=US&ceid=US:en';
  const resp = await fetch(url);
  const xml = await resp.text();
  const itemRegex = /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>[\s\S]*?<source[^>]*url=\"(.*?)\"[^>]*>(.*?)<\/source>[\s\S]*?<\/item>/gi;
  let match;
  const sources = [];
  while ((match = itemRegex.exec(xml)) !== null && sources.length < 4) {
    const rawTitle = match[1].replace(/<[^>]+>/g, '').replace(/&quot;/g, '"');
    const parts = rawTitle.split(' - ');
    const publisher = match[5] || (parts.length > 1 ? parts.pop() : 'News Source');
    const title = parts.join(' - ');
    let domain = 'google.com';
    try {
      domain = new URL(match[4]).hostname.replace(/^www\./, '');
    } catch {}

    sources.push({
      title,
      url: match[2],
      domain,
      publisher,
      pubDate: match[3],
    });
  }
  console.log('PARSED SOURCES:', JSON.stringify(sources, null, 2));
}
test().catch(console.error);
