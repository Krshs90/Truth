const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        f.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', reject);
  });
}

function getBallotpedia(slug) {
  return new Promise((resolve) => {
    https.get('https://ballotpedia.org/' + slug, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const m = html.match(/https:\/\/s3\.amazonaws\.com\/ballotpedia-api4\/files\/thumbs\/[^\"]+\.(?:jpg|png|jpeg)/i);
        resolve(m ? m[0] : null);
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const campbellUrl = await getBallotpedia('Donna_Campbell');
  console.log('Campbell URL:', campbellUrl);
  if (campbellUrl) {
    const s = await download(campbellUrl, 'public/images/officials/off-txsen-campbell.jpg');
    console.log('Campbell saved:', s);
  }

  const johnsonUrl = await getBallotpedia('Ann_Johnson');
  console.log('Johnson URL:', johnsonUrl);
  if (johnsonUrl) {
    const s = await download(johnsonUrl, 'public/images/officials/off-txrep-johnson.jpg');
    console.log('Johnson saved:', s);
  }
}

run().catch(console.error);
