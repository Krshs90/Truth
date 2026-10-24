import { TexasDistrict } from '../types';

export const TEXAS_DISTRICTS: TexasDistrict[] = [
  // Congressional Districts
  {
    id: 'tx-cd-37',
    type: 'congressional',
    districtNumber: '37',
    name: 'Texas Congressional District 37',
    region: 'Austin Metro (Central/Downtown/East Austin)',
    majorCounties: ['Travis County', 'Williamson County'],
    description: 'Encompasses central Austin, the University of Texas campus, East Austin, and portions of western Travis and southwestern Williamson counties.',
    currentOfficialId: 'off-fed-doggett',
    verifiedZipCodes: ['78701', '78702', '78703', '78704', '78705', '78712', '78722', '78723', '78751', '78752', '78756'],
  },
  {
    id: 'tx-cd-10',
    type: 'congressional',
    districtNumber: '10',
    name: 'Texas Congressional District 10',
    region: 'Central Texas / Brazos Valley',
    majorCounties: ['Travis County', 'Bastrop County', 'Lee County', 'Burleson County', 'Brazos County'],
    description: 'Stretches from northeastern Travis County through Pflugerville and Manor eastward to College Station and Bryan.',
    currentOfficialId: 'off-fed-mccaul',
    verifiedZipCodes: ['78660', '78653', '78621', '78753', '78754', '77840', '77845'],
  },
  {
    id: 'tx-cd-21',
    type: 'congressional',
    districtNumber: '21',
    name: 'Texas Congressional District 21',
    region: 'Texas Hill Country & North San Antonio',
    majorCounties: ['Travis County', 'Hays County', 'Comal County', 'Kendall County', 'Bexar County', 'Gillespie County', 'Kerr County'],
    description: 'Spans the Texas Hill Country from southwest Austin and Westlake through San Marcos, New Braunfels, and northern San Antonio.',
    currentOfficialId: 'off-fed-roy',
    verifiedZipCodes: ['78735', '78736', '78739', '78746', '78666', '78130', '78006', '78258'],
  },
  {
    id: 'tx-cd-35',
    type: 'congressional',
    districtNumber: '35',
    name: 'Texas Congressional District 35',
    region: 'I-35 Corridor (Austin to San Antonio)',
    majorCounties: ['Travis County', 'Hays County', 'Caldwell County', 'Comal County', 'Bexar County'],
    description: 'Runs along the Interstate 35 corridor, connecting southeast Austin and Del Valle through Lockhart and San Marcos into downtown and South San Antonio.',
    currentOfficialId: 'off-fed-casar',
    verifiedZipCodes: ['78741', '78744', '78745', '78747', '78610', '78640', '78207', '78210'],
  },
  {
    id: 'tx-cd-32',
    type: 'congressional',
    districtNumber: '32',
    name: 'Texas Congressional District 32',
    region: 'Dallas-Fort Worth Metroplex',
    majorCounties: ['Dallas County', 'Collin County', 'Denton County'],
    description: 'Encompasses suburban Dallas County communities including parts of North Dallas, Richardson, Garland, and Rowlett.',
    currentOfficialId: 'off-fed-allred',
    verifiedZipCodes: ['75206', '75214', '75218', '75231', '75080', '75081', '75040'],
  },

  // State Senate Districts
  {
    id: 'tx-sd-14',
    type: 'state_senate',
    districtNumber: '14',
    name: 'Texas Senate District 14',
    region: 'Travis County & Bastrop County',
    majorCounties: ['Travis County', 'Bastrop County'],
    description: 'Encompasses the majority of Travis County including Austin, Pflugerville, Manor, Del Valle, and neighboring Bastrop County.',
    currentOfficialId: 'off-txsen-eckhardt',
    verifiedZipCodes: ['78701', '78702', '78703', '78704', '78705', '78722', '78723', '78741', '78744', '78751', '78602'],
  },
  {
    id: 'tx-sd-25',
    type: 'state_senate',
    districtNumber: '25',
    name: 'Texas Senate District 25',
    region: 'Hill Country & Interstate 35',
    majorCounties: ['Bexar County', 'Comal County', 'Hays County', 'Kendall County', 'Guadalupe County', 'Travis County'],
    description: 'Covers northern Bexar County, New Braunfels in Comal County, Boerne in Kendall County, San Marcos, and southwestern Travis County.',
    currentOfficialId: 'off-txsen-campbell',
    verifiedZipCodes: ['78130', '78006', '78666', '78736', '78739', '78258', '78259', '78260'],
  },
  {
    id: 'tx-sd-15',
    type: 'state_senate',
    districtNumber: '15',
    name: 'Texas Senate District 15',
    region: 'Houston / Harris County',
    majorCounties: ['Harris County'],
    description: 'Heart of Houston including the Houston Heights, Montrose, downtown Houston, and portions of north Harris County.',
    currentOfficialId: 'off-txsen-cook',
    verifiedZipCodes: ['77002', '77006', '77007', '77008', '77009', '77019'],
  },

  // State House Districts
  {
    id: 'tx-hd-49',
    type: 'state_house',
    districtNumber: '49',
    name: 'Texas House District 49',
    region: 'Central Austin',
    majorCounties: ['Travis County'],
    description: 'Covers the urban core of Austin, including Downtown, the Texas Capitol complex, UT Austin, West Campus, Rosedale, and Hyde Park.',
    currentOfficialId: 'off-txrep-hinojosa',
    verifiedZipCodes: ['78701', '78703', '78705', '78712', '78751', '78756'],
  },
  {
    id: 'tx-hd-46',
    type: 'state_house',
    districtNumber: '46',
    name: 'Texas House District 46',
    region: 'East Austin & Manor',
    majorCounties: ['Travis County'],
    description: 'Covers East Austin, Del Valle, Manor, and northeast Travis County.',
    currentOfficialId: 'off-txrep-cole',
    verifiedZipCodes: ['78702', '78721', '78723', '78724', '78653'],
  },
  {
    id: 'tx-hd-136',
    type: 'state_house',
    districtNumber: '136',
    name: 'Texas House District 136',
    region: 'Northwest Austin & Williamson County',
    majorCounties: ['Williamson County'],
    description: 'Includes northwest Austin, Cedar Park, and southern Leander.',
    currentOfficialId: 'off-txrep-bucy',
    verifiedZipCodes: ['78613', '78641', '78717', '78726', '78729', '78750'],
  },
  {
    id: 'tx-hd-73',
    type: 'state_house',
    districtNumber: '73',
    name: 'Texas House District 73',
    region: 'Comal & Kendall Counties',
    majorCounties: ['Comal County', 'Kendall County'],
    description: 'Encompasses New Braunfels, Canyon Lake, Bulverde, and Boerne.',
    currentOfficialId: 'off-txrep-isaac',
    verifiedZipCodes: ['78130', '78132', '78133', '78006', '78015'],
  },
];

// Helper to look up likely districts by Texas ZIP code
export function findDistrictsByZip(zip: string): {
  congressional?: TexasDistrict;
  stateSenate?: TexasDistrict;
  stateHouse?: TexasDistrict;
  notes: string;
} {
  const cleanZip = zip.trim();
  const cd = TEXAS_DISTRICTS.find(
    (d) => d.type === 'congressional' && d.verifiedZipCodes.includes(cleanZip)
  );
  const sd = TEXAS_DISTRICTS.find(
    (d) => d.type === 'state_senate' && d.verifiedZipCodes.includes(cleanZip)
  );
  const hd = TEXAS_DISTRICTS.find(
    (d) => d.type === 'state_house' && d.verifiedZipCodes.includes(cleanZip)
  );

  return {
    congressional: cd || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-37'),
    stateSenate: sd || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-14'),
    stateHouse: hd || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49'),
    notes: cd
      ? `Matches verified geographic region for ZIP ${cleanZip}.`
      : `ZIP ${cleanZip} is not in the curated central Texas demonstration index. Defaulted to Capitol District; please select your exact districts manually below.`,
  };
}
