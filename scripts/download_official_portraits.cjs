const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const userAgent = 'TruthCivicApp/1.0 (https://github.com/example/truth; truth-app@example.com)';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': userAgent } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function searchBallotpediaImage(slug) {
  return new Promise((resolve) => {
    https.get(`https://ballotpedia.org/${slug}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(null);
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const m = html.match(/https:\/\/s3\.amazonaws\.com\/ballotpedia-api4\/files\/thumbs\/(?:200\/300|100\/100|150\/150)\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|jpeg)/i);
        if (m) {
          resolve(m[0]);
        } else {
          const m2 = html.match(/https:\/\/s3\.amazonaws\.com\/ballotpedia-api4\/files\/thumbs\/[^\"]+\.(?:jpg|png|jpeg)/i);
          resolve(m2 ? m2[0] : null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

const WIKI_MAPPINGS = [
  { id: 'off-txgov-patrick', title: 'Dan Patrick (politician)' },
  { id: 'off-txexec-hegar', title: 'Glenn Hegar' },
  { id: 'off-txexec-miller', title: 'Sid Miller (politician)' },
  { id: 'off-txexec-craddick', title: 'Christi Craddick' },
  { id: 'off-txexec-buckingham', title: 'Dawn Buckingham' },
  { id: 'off-txjud-hecht', title: 'Nathan Hecht' },
  { id: 'off-fed-allred', title: 'Colin Allred' },
  { id: 'off-fed-fletcher', title: 'Lizzie Fletcher' },
  { id: 'off-fed-granger', title: 'Kay Granger' },
  { id: 'off-txsen-eckhardt', title: 'Sarah Eckhardt' },
  { id: 'off-txsen-campbell', title: 'Donna Campbell' },
  { id: 'off-txsen-cook', title: 'Molly Cook' },
  { id: 'off-txsen-bettencourt', title: 'Paul Bettencourt' },
  { id: 'off-txsen-west', title: 'Royce West' },
  { id: 'off-txrep-hinojosa', title: 'Gina Hinojosa' },
  { id: 'off-txrep-cole', title: 'Sheryl Cole' },
  { id: 'off-txrep-bucy', title: 'John Bucy III' },
  { id: 'off-txrep-phelan', title: 'Dade Phelan' },
  { id: 'off-txrep-burrows', title: 'Dustin Burrows' },
  { id: 'off-txhouse-talarico', title: 'James Talarico' },
];

const BALLOTPEDIA_MAPPINGS = [
  { id: 'off-txhouse-harrison', slug: 'Brian_Harrison_(Texas)' },
  { id: 'off-txsen-schwertner', slug: 'Charles_Schwertner' },
  { id: 'off-txrep-moody', slug: 'Joe_Moody' },
  { id: 'off-txrep-romero', slug: 'Ramon_Romero_Jr.' },
  { id: 'off-txjud-bland', slug: 'Jane_Bland' },
  { id: 'off-txrep-johnson', slug: 'Ann_Johnson_(Texas)' },
  { id: 'off-txrep-isaac', slug: 'Carrie_Isaac' },
  { id: 'off-txsen-johnson', slug: 'Nathan_Johnson_(Texas)' },
  { id: 'off-txsen-blanco', slug: 'Cesar_Blanco' },
];

async function main() {
  const destDir = path.resolve(__dirname, '../public/images/officials');
  console.log('Downloading official portraits into:', destDir);

  const titles = WIKI_MAPPINGS.map(m => encodeURIComponent(m.title)).join('|');
  const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=400`;
  const wikiData = await fetchJson(wikiUrl);
  
  const pages = Object.values(wikiData.query.pages);
  for (const mapping of WIKI_MAPPINGS) {
    const page = pages.find(p => p.title.toLowerCase() === mapping.title.toLowerCase() || p.title.startsWith(mapping.title.split(' ')[0]));
    if (page && page.thumbnail && page.thumbnail.source) {
      const dest = path.join(destDir, `${mapping.id}.jpg`);
      try {
        const size = await downloadFile(page.thumbnail.source, dest);
        console.log(`[WIKI OK] ${mapping.id} (${mapping.title}) -> ${size} bytes`);
      } catch (err) {
        console.error(`[WIKI ERR] ${mapping.id}: ${err.message}`);
      }
    } else {
      console.log(`[WIKI NO THUMB] ${mapping.id} (${mapping.title})`);
    }
  }

  for (const mapping of BALLOTPEDIA_MAPPINGS) {
    try {
      const imgUrl = await searchBallotpediaImage(mapping.slug);
      if (imgUrl) {
        const dest = path.join(destDir, `${mapping.id}.jpg`);
        const size = await downloadFile(imgUrl, dest);
        console.log(`[BALLOTPEDIA OK] ${mapping.id} (${mapping.slug}) -> ${size} bytes`);
      } else {
        console.log(`[BALLOTPEDIA NOT FOUND] ${mapping.id} (${mapping.slug})`);
      }
    } catch (err) {
      console.error(`[BALLOTPEDIA ERR] ${mapping.id}: ${err.message}`);
    }
  }

  console.log('Finished downloading portraits!');
}

main().catch(console.error);
