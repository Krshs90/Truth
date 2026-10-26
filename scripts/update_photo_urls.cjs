const fs = require('fs');

let content = fs.readFileSync('src/data/officials.ts', 'utf8');

const targetMeyer = "id: 'off-txrep-meyer',\r\n    name: 'Morgan Meyer',\r\n    office: 'Texas State Representative (District 108)',\r\n    jurisdiction: 'Texas House',\r\n    district: 'House District 108 (Dallas - Park Cities & Uptown)',\r\n    party: 'Republican',";
const replaceMeyer = "id: 'off-txrep-meyer',\r\n    name: 'Morgan Meyer',\r\n    office: 'Texas State Representative (District 108)',\r\n    jurisdiction: 'Texas House',\r\n    district: 'House District 108 (Dallas - Park Cities & Uptown)',\r\n    party: 'Republican',\r\n    photoUrl: '/images/officials/off-txrep-meyer.jpg',";

if (content.includes(targetMeyer)) {
  content = content.replace(targetMeyer, replaceMeyer);
  fs.writeFileSync('src/data/officials.ts', content, 'utf8');
  console.log('Updated off-txrep-meyer photoUrl');
} else {
  const targetMeyerLF = "id: 'off-txrep-meyer',\n    name: 'Morgan Meyer',\n    office: 'Texas State Representative (District 108)',\n    jurisdiction: 'Texas House',\n    district: 'House District 108 (Dallas - Park Cities & Uptown)',\n    party: 'Republican',";
  const replaceMeyerLF = "id: 'off-txrep-meyer',\n    name: 'Morgan Meyer',\n    office: 'Texas State Representative (District 108)',\n    jurisdiction: 'Texas House',\n    district: 'House District 108 (Dallas - Park Cities & Uptown)',\n    party: 'Republican',\n    photoUrl: '/images/officials/off-txrep-meyer.jpg',";
  content = content.replace(targetMeyerLF, replaceMeyerLF);
  fs.writeFileSync('src/data/officials.ts', content, 'utf8');
  console.log('Updated off-txrep-meyer photoUrl (LF)');
}
