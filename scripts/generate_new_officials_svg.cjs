const fs = require('fs');
const path = require('path');

const officials = [
  {
    filename: 'off-txjud-blacklock.svg',
    initials: 'JB',
    name: 'Jimmy Blacklock',
    office: 'Justice, Supreme Court of Texas',
    jurisdiction: 'Texas Supreme Court (Place 2)',
    partyColor: '#7c3aed',
    bgMid: '#4c1d95',
    accentColor: '#a855f7',
  },
  {
    filename: 'off-txjud-hecht.svg',
    initials: 'NH',
    name: 'Nathan L. Hecht',
    office: 'Chief Justice, Supreme Court of Texas',
    jurisdiction: 'Texas Supreme Court (Chief Justice)',
    partyColor: '#7c3aed',
    bgMid: '#4c1d95',
    accentColor: '#a855f7',
  },
  {
    filename: 'off-txjud-bland.svg',
    initials: 'JB',
    name: 'Jane Bland',
    office: 'Justice, Supreme Court of Texas',
    jurisdiction: 'Texas Supreme Court (Place 6)',
    partyColor: '#7c3aed',
    bgMid: '#4c1d95',
    accentColor: '#a855f7',
  },
  {
    filename: 'off-txexec-hegar.svg',
    initials: 'GH',
    name: 'Glenn Hegar',
    office: 'Texas Comptroller of Public Accounts',
    jurisdiction: 'Statewide Executive Officer',
    partyColor: '#dc2626',
    bgMid: '#881337',
    accentColor: '#f43f5e',
  },
  {
    filename: 'off-txexec-miller.svg',
    initials: 'SM',
    name: 'Sid Miller',
    office: 'Texas Commissioner of Agriculture',
    jurisdiction: 'Statewide Executive Officer',
    partyColor: '#dc2626',
    bgMid: '#881337',
    accentColor: '#f43f5e',
  },
  {
    filename: 'off-txexec-craddick.svg',
    initials: 'CC',
    name: 'Christi Craddick',
    office: 'Chairman, Railroad Commission of Texas',
    jurisdiction: 'Statewide Energy Regulator',
    partyColor: '#dc2626',
    bgMid: '#881337',
    accentColor: '#f43f5e',
  },
  {
    filename: 'off-txexec-buckingham.svg',
    initials: 'DB',
    name: 'Dawn Buckingham',
    office: 'Texas Land Commissioner',
    jurisdiction: 'General Land Office (GLO)',
    partyColor: '#dc2626',
    bgMid: '#881337',
    accentColor: '#f43f5e',
  },
  {
    filename: 'off-txhouse-talarico.svg',
    initials: 'JT',
    name: 'James Talarico',
    office: 'Texas State Representative',
    jurisdiction: 'District 50 (Travis & Williamson)',
    partyColor: '#2563eb',
    bgMid: '#1e3a8a',
    accentColor: '#38bdf8',
  },
  {
    filename: 'off-txhouse-harrison.svg',
    initials: 'BH',
    name: 'Brian Harrison',
    office: 'Texas State Representative',
    jurisdiction: 'District 10 (Ellis County)',
    partyColor: '#dc2626',
    bgMid: '#881337',
    accentColor: '#f43f5e',
  },
];

const outDir = path.join(__dirname, '..', 'public', 'images', 'officials');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

officials.forEach((o) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 550" width="450" height="550">
  <defs>
    <linearGradient id="bg-${o.initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="${o.bgMid}" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="glow-${o.initials}" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${o.accentColor}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${o.accentColor}" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="vignette-${o.initials}" cx="50%" cy="40%" r="60%">
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75" />
    </radialGradient>
    <clipPath id="circleClip-${o.initials}">
      <circle cx="225" cy="205" r="115" />
    </clipPath>
  </defs>

  <!-- Background Canvas -->
  <rect width="450" height="550" fill="url(#bg-${o.initials})" />
  <rect width="450" height="550" fill="url(#glow-${o.initials})" />
  <rect width="450" height="550" fill="url(#vignette-${o.initials})" />

  <!-- Subtle State of Texas Geometric Grid -->
  <g stroke="${o.accentColor}" stroke-opacity="0.14" stroke-width="1.2" fill="none">
    <circle cx="225" cy="205" r="145" stroke-dasharray="4,6" />
    <circle cx="225" cy="205" r="125" />
    <line x1="80" y1="205" x2="370" y2="205" />
    <line x1="225" y1="60" x2="225" y2="350" />
  </g>

  <!-- Official Avatar Halo -->
  <circle cx="225" cy="205" r="118" fill="#18181b" stroke="${o.accentColor}" stroke-width="3" />

  <!-- Silhouette & Monogram -->
  <g clip-path="url(#circleClip-${o.initials})">
    <circle cx="225" cy="205" r="115" fill="#111827" />
    <path d="M 125 315 C 135 245, 175 220, 225 220 C 275 220, 315 245, 325 315 Z" fill="${o.partyColor}" opacity="0.85" />
    <circle cx="225" cy="170" r="50" fill="#f8fafc" opacity="0.92" />
    <text x="225" y="215" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="${o.bgMid}" text-anchor="middle" letter-spacing="2">
      ${o.initials}
    </text>
  </g>

  <!-- Official Name Badge Overlay -->
  <g transform="translate(35, 365)">
    <rect width="380" height="145" rx="16" fill="#0b0f19" fill-opacity="0.94" stroke="#334155" stroke-width="1.5" />
    <rect x="0" y="0" width="8" height="145" rx="4" fill="${o.accentColor}" />
    <text x="26" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">
      ${o.name}
    </text>
    <text x="26" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">
      ${o.office}
    </text>
    <text x="26" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="500" fill="${o.accentColor}">
      ${o.jurisdiction}
    </text>
    <text x="26" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" letter-spacing="1">
      VERIFIED PUBLIC OFFICIAL • TEXAS
    </text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, o.filename), svg, 'utf8');
  console.log(`Generated: ${o.filename}`);
});
