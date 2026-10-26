const fs = require('fs');
const path = require('path');
const https = require('https');

const offPath = path.join(__dirname, '../src/data/officials.ts');
const candPath = path.join(__dirname, '../src/data/candidates.ts');
const targetDir = path.join(__dirname, '../public/images/officials');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const offContent = fs.readFileSync(offPath, 'utf8');
const candContent = fs.readFileSync(candPath, 'utf8');

const regex = /id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?photoUrl:\s*['"]([^'"]+)['"]/g;

const officials = [];
let match;
while ((match = regex.exec(offContent)) !== null) {
  officials.push({ id: match[1], name: match[2], photoUrl: match[3] });
}

const candRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?photoUrl:\s*['"]([^'"]+)['"]/g;
const candidates = [];
while ((match = candRegex.exec(candContent)) !== null) {
  candidates.push({ id: match[1], name: match[2], photoUrl: match[3] });
}

console.log('Officials found:', officials.length);
console.log('Candidates found:', candidates.length);

const all = [...officials, ...candidates];

function generateSVGPortrait(name, party, role) {
  const initials = name
    .split(' ')
    .filter(n => !n.startsWith('(') && !n.startsWith('Dr.') && !n.startsWith('Rep.') && !n.startsWith('Sen.'))
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  const isDem = party === 'Democratic' || party === 'Democrat';
  const isGOP = party === 'Republican';
  const gradStart = isGOP ? '#881337' : isDem ? '#1e3a8a' : '#27272a';
  const gradEnd = isGOP ? '#e11d48' : isDem ? '#2563eb' : '#52525b';
  const accentColor = isGOP ? '#f43f5e' : isDem ? '#60a5fa' : '#a1a1aa';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 550" width="450" height="550">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="${gradStart}" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="40%" r="60%">
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
    </radialGradient>
    <clipPath id="circleClip">
      <circle cx="225" cy="205" r="115" />
    </clipPath>
  </defs>

  <!-- Background Canvas -->
  <rect width="450" height="550" fill="url(#bg)" />
  <rect width="450" height="550" fill="url(#glow)" />
  <rect width="450" height="550" fill="url(#vignette)" />

  <!-- Subtle State of Texas Geometric Grid -->
  <g stroke="${accentColor}" stroke-opacity="0.12" stroke-width="1.2" fill="none">
    <circle cx="225" cy="205" r="145" stroke-dasharray="4,6" />
    <circle cx="225" cy="205" r="125" />
    <line x1="80" y1="205" x2="370" y2="205" />
    <line x1="225" y1="60" x2="225" y2="350" />
  </g>

  <!-- Official Seal / Avatar Halo -->
  <circle cx="225" cy="205" r="118" fill="#18181b" stroke="${accentColor}" stroke-width="3" />

  <!-- Silhouette Icon or Monogram -->
  <g clip-path="url(#circleClip)">
    <circle cx="225" cy="205" r="115" fill="#111827" />
    <!-- Shoulders -->
    <path d="M 125 315 C 135 245, 175 220, 225 220 C 275 220, 315 245, 325 315 Z" fill="${gradEnd}" opacity="0.85" />
    <!-- Head -->
    <circle cx="225" cy="170" r="50" fill="#f8fafc" opacity="0.92" />
    <!-- Monogram Initial Overlay -->
    <text x="225" y="215" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="${gradStart}" text-anchor="middle" letter-spacing="2">
      ${initials}
    </text>
  </g>

  <!-- Official Name Badge Overlay -->
  <rect x="25" y="375" width="400" height="135" rx="16" fill="#090d16" fill-opacity="0.94" stroke="#27272a" stroke-width="1.5" />
  
  <!-- Party Indicator Accent Bar -->
  <rect x="25" y="375" width="400" height="4" fill="${accentColor}" />

  <text x="225" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle">
    ${name}
  </text>
  <text x="225" y="450" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${accentColor}" text-anchor="middle" letter-spacing="1">
    ${party.toUpperCase()}
  </text>
  <text x="225" y="480" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace" font-size="11" font-weight="500" fill="#94a3b8" text-anchor="middle">
    ${role || 'TEXAS ELECTED OFFICIAL'}
  </text>
</svg>`;
}

const officialPhotoUrls = {
  'off-fed-cruz': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001098.jpg',
  'off-fed-cornyn': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001056.jpg',
  'off-fed-burgess': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/B001248.jpg',
  'off-fed-doggett': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/D000399.jpg',
  'off-fed-roy': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/R000614.jpg',
  'off-fed-crenshaw': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001120.jpg',
  'off-fed-mccaul': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/M001157.jpg',
  'off-fed-escobar': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/E000299.jpg',
  'off-fed-gonzales': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/G000594.jpg',
  'off-fed-delacruz': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/D000594.jpg',
  'off-fed-vicente': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/G000581.jpg',
  'off-fed-jackson': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/J000304.jpg',
  'off-fed-arrington': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/A000375.jpg',
  'off-fed-crockett': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001130.jpg',
  'off-fed-casar': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001131.jpg',
  'off-fed-moran': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/M001224.jpg',
  'off-fed-nehls': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/N000026.jpg',
  'off-fed-vanduyne': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/V000134.jpg',
  'off-fed-williams': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/W000816.jpg',
  'off-fed-self': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/S001224.jpg',
  'off-fed-fallon': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/F000246.jpg',
  'off-fed-gooden': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/G000589.jpg',
  'off-fed-fletcher': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/F000668.jpg',
  'off-fed-luttrell': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/L000603.jpg',
  'off-fed-green': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/G000553.jpg',
  'off-fed-pfluger': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/P000048.jpg',
  'off-fed-weber': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/W000814.jpg',
  'off-fed-sessions': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/S000250.jpg',
  'off-fed-castro': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001091.jpg',
  'off-fed-cuellar': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001063.jpg',
  'off-fed-garcia': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/G000587.jpg',
  'off-fed-carter': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/C001051.jpg',
  'off-fed-veasey': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/V000131.jpg',
  'off-fed-babin': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/B001291.jpg',
  'off-fed-hunt': 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/450x550/H001095.jpg',
};

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function run() {
  console.log('Generating and downloading all politician portraits...');

  for (const item of all) {
    const filename = path.basename(item.photoUrl);
    const dest = path.join(targetDir, filename);

    if (filename.endsWith('.jpg') && officialPhotoUrls[item.id]) {
      const ok = await downloadFile(officialPhotoUrls[item.id], dest);
      if (ok) {
        console.log(`Downloaded photo for ${item.name} -> ${filename}`);
        continue;
      }
    }

    const svgFilename = filename.replace(/\.jpg$/, '.svg');
    const svgDest = path.join(targetDir, svgFilename);
    const isDem = item.name.includes('Talarico') || item.name.includes('Doggett') || item.name.includes('Casar') || item.name.includes('Johnson') || item.name.includes('Crockett') || item.name.includes('Escobar') || item.name.includes('Turner');
    const party = isDem ? 'Democratic' : 'Republican';
    const svgContent = generateSVGPortrait(item.name, party, 'Texas Elected Official');
    fs.writeFileSync(svgDest, svgContent, 'utf8');

    if (filename.endsWith('.jpg')) {
      fs.writeFileSync(path.join(targetDir, filename.replace('.jpg', '.svg')), svgContent, 'utf8');
      if (!fs.existsSync(dest)) {
        fs.writeFileSync(dest, svgContent, 'utf8');
      }
    }
    console.log(`Generated SVG portrait for ${item.name} -> ${filename}`);
  }

  const gillSvg = generateSVGPortrait('Brandon Gill', 'Republican', 'U.S. Representative (TX-26)');
  fs.writeFileSync(path.join(targetDir, 'off-fed-gill.svg'), gillSvg, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'brandon-gill.svg'), gillSvg, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'off-fed-gill.jpg'), gillSvg, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'brandon-gill.jpg'), gillSvg, 'utf8');

  const paxtonSvg = generateSVGPortrait('Ken Paxton', 'Republican', 'Texas Attorney General');
  fs.writeFileSync(path.join(targetDir, 'off-exec-paxton.svg'), paxtonSvg, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'ken-paxton.svg'), paxtonSvg, 'utf8');

  const talaricoSvg = generateSVGPortrait('James Talarico', 'Democratic', 'Texas State Representative');
  fs.writeFileSync(path.join(targetDir, 'off-house-50.svg'), talaricoSvg, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'james-talarico.svg'), talaricoSvg, 'utf8');

  const linebergerSvg = generateSVGPortrait('Ernest Lineberger III', 'Democratic', 'TX-26 Congressional Candidate');
  fs.writeFileSync(path.join(targetDir, 'ernest-lineberger.svg'), linebergerSvg, 'utf8');

  console.log('Finished populating politician portraits!');
}

run();
