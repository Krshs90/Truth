import { TexasDistrict } from '../types';

export const TEXAS_DISTRICTS: TexasDistrict[] = [
  // ==================== U.S. CONGRESSIONAL DISTRICTS (Texas has 38) ====================
  {
    id: 'tx-cd-37',
    type: 'congressional',
    districtNumber: '37',
    name: 'Texas Congressional District 37',
    region: 'Austin Metro (Central, Downtown, East & West Austin)',
    majorCounties: ['Travis County', 'Williamson County'],
    description: 'Encompasses central Austin, the University of Texas campus, East Austin, Mueller, Hyde Park, and portions of western Travis and southern Williamson counties.',
    currentOfficialId: 'off-fed-doggett',
    verifiedZipCodes: ['78701', '78702', '78703', '78704', '78705', '78712', '78722', '78723', '78731', '78751', '78752', '78756', '78757'],
  },
  {
    id: 'tx-cd-10',
    type: 'congressional',
    districtNumber: '10',
    name: 'Texas Congressional District 10',
    region: 'Central Texas & Brazos Valley (Pflugerville, Bastrop, College Station)',
    majorCounties: ['Travis County', 'Bastrop County', 'Lee County', 'Burleson County', 'Brazos County'],
    description: 'Stretches from northeastern Travis County through Pflugerville and Manor eastward to College Station, Bryan, and Brenham.',
    currentOfficialId: 'off-fed-mccaul',
    verifiedZipCodes: ['78660', '78653', '78621', '78753', '78754', '77840', '77845', '77801', '77802', '77803'],
  },
  {
    id: 'tx-cd-21',
    type: 'congressional',
    districtNumber: '21',
    name: 'Texas Congressional District 21',
    region: 'Texas Hill Country & North San Antonio',
    majorCounties: ['Travis County', 'Hays County', 'Comal County', 'Kendall County', 'Bexar County', 'Gillespie County', 'Kerr County'],
    description: 'Spans the Texas Hill Country from southwest Austin and Westlake through San Marcos, New Braunfels, Fredericksburg, Kerrville, and northern San Antonio.',
    currentOfficialId: 'off-fed-roy',
    verifiedZipCodes: ['78735', '78736', '78738', '78739', '78746', '78666', '78130', '78006', '78258', '78259', '78624'],
  },
  {
    id: 'tx-cd-35',
    type: 'congressional',
    districtNumber: '35',
    name: 'Texas Congressional District 35',
    region: 'I-35 Corridor (Southeast Austin to Downtown San Antonio)',
    majorCounties: ['Travis County', 'Hays County', 'Caldwell County', 'Comal County', 'Bexar County'],
    description: 'Runs along the Interstate 35 corridor, connecting southeast Austin and Del Valle through Lockhart, Kyle, Buda, and San Marcos into downtown and South San Antonio.',
    currentOfficialId: 'off-fed-casar',
    verifiedZipCodes: ['78741', '78744', '78745', '78747', '78610', '78640', '78644', '78207', '78210', '78215', '78225'],
  },
  {
    id: 'tx-cd-32',
    type: 'congressional',
    districtNumber: '32',
    name: 'Texas Congressional District 32',
    region: 'Dallas-Fort Worth Metroplex (North & East Dallas County)',
    majorCounties: ['Dallas County', 'Collin County', 'Denton County'],
    description: 'Encompasses suburban and urban Dallas County communities including North Dallas, Richardson, Garland, Rowlett, and parts of Carrollton.',
    currentOfficialId: 'off-fed-allred',
    verifiedZipCodes: ['75206', '75214', '75218', '75231', '75238', '75240', '75243', '75080', '75081', '75040', '75041', '75042'],
  },
  {
    id: 'tx-cd-02',
    type: 'congressional',
    districtNumber: '2',
    name: 'Texas Congressional District 2',
    region: 'Greater Houston (North & East Harris, Montgomery)',
    majorCounties: ['Harris County', 'Montgomery County'],
    description: 'Includes Kingwood, Atascocita, Humble, Spring, and northern portions of Harris County extending into Montgomery County.',
    currentOfficialId: 'off-fed-crenshaw',
    verifiedZipCodes: ['77338', '77339', '77345', '77346', '77373', '77379', '77388'],
  },
  {
    id: 'tx-cd-07',
    type: 'congressional',
    districtNumber: '7',
    name: 'Texas Congressional District 7',
    region: 'Houston Metro (West University, Bellaire, Southwest Houston)',
    majorCounties: ['Harris County', 'Fort Bend County'],
    description: 'Covers parts of West Houston, Bellaire, West University Place, Gulfton, Alief, and northeast Fort Bend County.',
    currentOfficialId: 'off-fed-fletcher',
    verifiedZipCodes: ['77005', '77019', '77024', '77025', '77027', '77036', '77042', '77074', '77081', '77096', '77401'],
  },
  {
    id: 'tx-cd-12',
    type: 'congressional',
    districtNumber: '12',
    name: 'Texas Congressional District 12',
    region: 'Fort Worth & Tarrant County / Parker County',
    majorCounties: ['Tarrant County', 'Parker County'],
    description: 'Spans western and northern Tarrant County including West Fort Worth, North Richland Hills, Saginaw, and eastern Parker County.',
    currentOfficialId: 'off-fed-granger',
    verifiedZipCodes: ['76102', '76107', '76109', '76116', '76135', '76179', '76086', '76087'],
  },
  {
    id: 'tx-cd-16',
    type: 'congressional',
    districtNumber: '16',
    name: 'Texas Congressional District 16',
    region: 'El Paso Metro & West Texas Border',
    majorCounties: ['El Paso County'],
    description: 'Encompasses the city of El Paso, Fort Bliss, and the surrounding Rio Grande border communities in far West Texas.',
    currentOfficialId: 'off-fed-escobar',
    verifiedZipCodes: ['79901', '79902', '79903', '79904', '79905', '79912', '79924', '79925', '79930', '79936'],
  },
  {
    id: 'tx-cd-30',
    type: 'congressional',
    districtNumber: '30',
    name: 'Texas Congressional District 30',
    region: 'Dallas Metro (South Dallas, Oak Cliff, Cedar Hill, DeSoto)',
    majorCounties: ['Dallas County', 'Tarrant County'],
    description: 'Covers South Dallas, Oak Cliff, Duncanville, DeSoto, Cedar Hill, Lancaster, and portions of downtown Dallas.',
    currentOfficialId: 'off-fed-crockett',
    verifiedZipCodes: ['75201', '75202', '75203', '75208', '75215', '75216', '75224', '75232', '75115', '75137', '75146'],
  },
  {
    id: 'tx-cd-23',
    type: 'congressional',
    districtNumber: '23',
    name: 'Texas Congressional District 23',
    region: 'South & West Texas Border Corridor (San Antonio to El Paso)',
    majorCounties: ['Bexar County', 'Medina County', 'Uvalde County', 'Val Verde County', 'Brewster County', 'Maverick County'],
    description: 'A vast swing district spanning over 800 miles of the U.S.-Mexico border from western Bexar County through Del Rio and Big Bend.',
    currentOfficialId: 'off-fed-gonzales',
    verifiedZipCodes: ['78245', '78251', '78253', '78801', '78840', '78852', '79830', '79843'],
  },
  {
    id: 'tx-cd-28',
    type: 'congressional',
    districtNumber: '28',
    name: 'Texas Congressional District 28',
    region: 'South Texas (Laredo, Rio Grande Valley, San Antonio suburbs)',
    majorCounties: ['Webb County', 'Zapata County', 'Starr County', 'Hidalgo County', 'Bexar County', 'Atascosa County'],
    description: 'Stretches from southeastern Bexar County south through Pleasanton and Laredo down into western Hidalgo and Starr counties.',
    currentOfficialId: 'off-fed-cuellar',
    verifiedZipCodes: ['78040', '78041', '78043', '78045', '78064', '78572', '78576', '78582'],
  },

  // ==================== TEXAS STATE SENATE DISTRICTS (Texas has 31) ====================
  {
    id: 'tx-sd-14',
    type: 'state_senate',
    districtNumber: '14',
    name: 'Texas Senate District 14',
    region: 'Travis County & Bastrop County',
    majorCounties: ['Travis County', 'Bastrop County'],
    description: 'Encompasses the majority of Travis County including Austin, Pflugerville, Manor, Del Valle, and neighboring Bastrop County.',
    currentOfficialId: 'off-txsen-eckhardt',
    verifiedZipCodes: ['78701', '78702', '78703', '78704', '78705', '78722', '78723', '78731', '78741', '78744', '78751', '78752', '78756', '78757', '78602', '78621'],
  },
  {
    id: 'tx-sd-25',
    type: 'state_senate',
    districtNumber: '25',
    name: 'Texas Senate District 25',
    region: 'Hill Country & I-35 (Bexar, Comal, Hays, Kendall, Travis)',
    majorCounties: ['Bexar County', 'Comal County', 'Hays County', 'Kendall County', 'Guadalupe County', 'Travis County'],
    description: 'Covers northern Bexar County, New Braunfels in Comal County, Boerne in Kendall County, San Marcos, and southwestern Travis County.',
    currentOfficialId: 'off-txsen-campbell',
    verifiedZipCodes: ['78130', '78132', '78006', '78666', '78735', '78736', '78738', '78739', '78258', '78259', '78260'],
  },
  {
    id: 'tx-sd-15',
    type: 'state_senate',
    districtNumber: '15',
    name: 'Texas Senate District 15',
    region: 'Houston / Central Harris County',
    majorCounties: ['Harris County'],
    description: 'Heart of Houston including the Houston Heights, Montrose, Downtown Houston, Midtown, and portions of north and east Harris County.',
    currentOfficialId: 'off-txsen-cook',
    verifiedZipCodes: ['77002', '77003', '77004', '77006', '77007', '77008', '77009', '77019', '77020', '77026'],
  },
  {
    id: 'tx-sd-16',
    type: 'state_senate',
    districtNumber: '16',
    name: 'Texas Senate District 16',
    region: 'North & East Dallas County',
    majorCounties: ['Dallas County'],
    description: 'Covers North Dallas, Addison, Richardson, Garland, Rowlett, Sunnyvale, and portions of Mesquite and Carrollton.',
    currentOfficialId: 'off-txsen-johnson',
    verifiedZipCodes: ['75001', '75080', '75081', '75040', '75041', '75042', '75225', '75230', '75231', '75238', '75240', '75243', '75248'],
  },
  {
    id: 'tx-sd-07',
    type: 'state_senate',
    districtNumber: '7',
    name: 'Texas Senate District 7',
    region: 'West & Northwest Harris County (Spring, Tomball, Cypress)',
    majorCounties: ['Harris County'],
    description: 'Spans western and northwestern suburban Harris County including Cypress, Spring, Klein, Tomball, and Jersey Village.',
    currentOfficialId: 'off-txsen-bettencourt',
    verifiedZipCodes: ['77375', '77377', '77379', '77429', '77433', '77064', '77065', '77070', '77095'],
  },
  {
    id: 'tx-sd-23',
    type: 'state_senate',
    districtNumber: '23',
    name: 'Texas Senate District 23',
    region: 'Central & South Dallas County',
    majorCounties: ['Dallas County'],
    description: 'Includes Downtown Dallas, Oak Cliff, South Dallas, Duncanville, Cedar Hill, DeSoto, and Lancaster.',
    currentOfficialId: 'off-txsen-west',
    verifiedZipCodes: ['75201', '75202', '75203', '75208', '75211', '75215', '75216', '75224', '75232', '75115', '75137'],
  },
  {
    id: 'tx-sd-29',
    type: 'state_senate',
    districtNumber: '29',
    name: 'Texas Senate District 29',
    region: 'El Paso County & Far West Texas Border',
    majorCounties: ['El Paso County', 'Hudspeth County', 'Culberson County', 'Jeff Davis County', 'Presidio County', 'Brewster County'],
    description: 'Covers the entirety of El Paso County and stretches east through the Trans-Pecos mountain region to Big Bend.',
    currentOfficialId: 'off-txsen-blanco',
    verifiedZipCodes: ['79901', '79902', '79903', '79904', '79905', '79912', '79924', '79925', '79930', '79936', '79830', '79843'],
  },
  {
    id: 'tx-sd-05',
    type: 'state_senate',
    districtNumber: '5',
    name: 'Texas Senate District 5',
    region: 'Central Texas (Williamson, Brazos, Robertson, Walker, Milam)',
    majorCounties: ['Williamson County', 'Brazos County', 'Robertson County', 'Milam County', 'Walker County'],
    description: 'Encompasses Round Rock, Georgetown, Cedar Park in Williamson County, stretching east to College Station and Huntsville.',
    currentOfficialId: 'off-txsen-schwertner',
    verifiedZipCodes: ['78613', '78626', '78628', '78633', '78641', '78664', '78665', '78681', '77840', '77845'],
  },

  // ==================== TEXAS STATE HOUSE DISTRICTS (Key representative areas) ====================
  {
    id: 'tx-hd-49',
    type: 'state_house',
    districtNumber: '49',
    name: 'Texas House District 49',
    region: 'Central Austin & UT Austin Campus',
    majorCounties: ['Travis County'],
    description: 'Covers the urban core of Austin, including Downtown, the Texas Capitol complex, UT Austin, West Campus, Rosedale, Hyde Park, and Brentwood.',
    currentOfficialId: 'off-txrep-hinojosa',
    verifiedZipCodes: ['78701', '78703', '78705', '78712', '78751', '78752', '78756', '78757'],
  },
  {
    id: 'tx-hd-46',
    type: 'state_house',
    districtNumber: '46',
    name: 'Texas House District 46',
    region: 'East Austin, Mueller, Manor & Del Valle',
    majorCounties: ['Travis County'],
    description: 'Covers East Austin, Del Valle, Manor, and northeast Travis County including the Austin-Bergstrom International Airport area.',
    currentOfficialId: 'off-txrep-cole',
    verifiedZipCodes: ['78702', '78721', '78723', '78724', '78725', '78742', '78653'],
  },
  {
    id: 'tx-hd-136',
    type: 'state_house',
    districtNumber: '136',
    name: 'Texas House District 136',
    region: 'Northwest Austin, Cedar Park & Round Rock',
    majorCounties: ['Williamson County', 'Travis County'],
    description: 'Includes northwest Austin, Cedar Park, Anderson Mill, and southwest Williamson County.',
    currentOfficialId: 'off-txrep-bucy',
    verifiedZipCodes: ['78613', '78641', '78717', '78726', '78729', '78750'],
  },
  {
    id: 'tx-hd-73',
    type: 'state_house',
    districtNumber: '73',
    name: 'Texas House District 73',
    region: 'Comal County & Kendall County',
    majorCounties: ['Comal County', 'Kendall County'],
    description: 'Encompasses New Braunfels, Canyon Lake, Bulverde, Boerne, and Fair Oaks Ranch.',
    currentOfficialId: 'off-txrep-isaac',
    verifiedZipCodes: ['78130', '78132', '78133', '78006', '78015'],
  },
  {
    id: 'tx-hd-108',
    type: 'state_house',
    districtNumber: '108',
    name: 'Texas House District 108',
    region: 'Dallas (Highland Park, University Park, Uptown, North Dallas)',
    majorCounties: ['Dallas County'],
    description: 'Includes the Park Cities (Highland Park, University Park), Uptown, Lower Greenville, Preston Hollow, and North Dallas.',
    currentOfficialId: 'off-txrep-meyer',
    verifiedZipCodes: ['75205', '75206', '75209', '75219', '75220', '75225', '75230', '75204'],
  },
  {
    id: 'tx-hd-134',
    type: 'state_house',
    districtNumber: '134',
    name: 'Texas House District 134',
    region: 'Houston (Texas Medical Center, West U, Bellaire, Rice U)',
    majorCounties: ['Harris County'],
    description: 'Encompasses the Texas Medical Center, Rice University, West University Place, Southside Place, Bellaire, and River Oaks.',
    currentOfficialId: 'off-txrep-johnson',
    verifiedZipCodes: ['77005', '77019', '77025', '77027', '77030', '77096', '77401'],
  },
  {
    id: 'tx-hd-21',
    type: 'state_house',
    districtNumber: '21',
    name: 'Texas House District 21',
    region: 'Southeast Texas / Golden Triangle (Jefferson, Orange, Jasper)',
    majorCounties: ['Jefferson County', 'Orange County', 'Jasper County'],
    description: 'Spans southeast Texas including Beaumont, Orange, Nederland, Port Neches, and Groves.',
    currentOfficialId: 'off-txrep-phelan',
    verifiedZipCodes: ['77701', '77702', '77705', '77706', '77630', '77632', '77627', '77651'],
  },
  {
    id: 'tx-hd-77',
    type: 'state_house',
    districtNumber: '77',
    name: 'Texas House District 77',
    region: 'Central & West El Paso / Downtown',
    majorCounties: ['El Paso County'],
    description: 'Encompasses downtown El Paso, UTEP campus, Coronado, Sunset Heights, and central border neighborhoods.',
    currentOfficialId: 'off-txrep-moody',
    verifiedZipCodes: ['79901', '79902', '79903', '79905', '79912', '79922'],
  },
  {
    id: 'tx-hd-83',
    type: 'state_house',
    districtNumber: '83',
    name: 'Texas House District 83',
    region: 'Lubbock & South Plains',
    majorCounties: ['Lubbock County', 'Borden County', 'Lynn County', 'Mitchell County', 'Scurry County'],
    description: 'Covers south and west Lubbock County, Reese Technology Center, and surrounding South Plains agricultural counties.',
    currentOfficialId: 'off-txrep-burrows',
    verifiedZipCodes: ['79407', '79414', '79416', '79423', '79424', '79382', '79512'],
  },
  {
    id: 'tx-hd-90',
    type: 'state_house',
    districtNumber: '90',
    name: 'Texas House District 90',
    region: 'Central & North Fort Worth / Historic Stockyards',
    majorCounties: ['Tarrant County'],
    description: 'Encompasses central Fort Worth, the Fort Worth Stockyards, Diamond Hill, and Northside communities.',
    currentOfficialId: 'off-txrep-romero',
    verifiedZipCodes: ['76102', '76104', '76106', '76110', '76111', '76114', '76164'],
  },
];

// Helper to look up likely districts by Texas ZIP code
export function findDistrictsByZip(zip: string): {
  congressional?: TexasDistrict;
  stateSenate?: TexasDistrict;
  stateHouse?: TexasDistrict;
  notes: string;
  matchedCounties: string[];
} {
  const cleanZip = zip.trim();

  // Direct match from verified lists
  const cdDirect = TEXAS_DISTRICTS.find(
    (d) => d.type === 'congressional' && d.verifiedZipCodes.includes(cleanZip)
  );
  const sdDirect = TEXAS_DISTRICTS.find(
    (d) => d.type === 'state_senate' && d.verifiedZipCodes.includes(cleanZip)
  );
  const hdDirect = TEXAS_DISTRICTS.find(
    (d) => d.type === 'state_house' && d.verifiedZipCodes.includes(cleanZip)
  );

  if (cdDirect && sdDirect && hdDirect) {
    return {
      congressional: cdDirect,
      stateSenate: sdDirect,
      stateHouse: hdDirect,
      notes: `Verified geographic district alignment for Texas ZIP ${cleanZip}.`,
      matchedCounties: Array.from(new Set([...cdDirect.majorCounties, ...sdDirect.majorCounties])),
    };
  }

  // Broad Texas ZIP prefix heuristic mapping for entire state of Texas
  const prefix2 = cleanZip.slice(0, 2);
  const prefix3 = cleanZip.slice(0, 3);

  let cdFallback = cdDirect;
  let sdFallback = sdDirect;
  let hdFallback = hdDirect;
  let regionName = 'Texas';

  if (!cdFallback || !sdFallback || !hdFallback) {
    // 787xx, 786xx -> Austin / Central TX
    if (prefix3 === '787' || prefix3 === '786') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-37');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-14');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49');
      regionName = 'Austin / Central Texas';
    }
    // 750xx - 753xx -> Dallas / North TX
    else if (prefix3 >= '750' && prefix3 <= '753') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-32');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-16');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-108');
      regionName = 'Dallas Metroplex';
    }
    // 760xx - 762xx -> Fort Worth / Tarrant County
    else if (prefix3 >= '760' && prefix3 <= '762') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-12');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-16');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-90');
      regionName = 'Fort Worth / Tarrant County';
    }
    // 770xx - 775xx -> Houston / Gulf Coast
    else if (prefix3 >= '770' && prefix3 <= '775') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-07');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-15');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-134');
      regionName = 'Houston Metro';
    }
    // 780xx - 782xx -> San Antonio / South Texas
    else if (prefix3 >= '780' && prefix3 <= '782') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-21');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-25');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-73');
      regionName = 'San Antonio / Bexar County';
    }
    // 798xx - 799xx -> El Paso / Far West Texas
    else if (prefix3 === '798' || prefix3 === '799') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-16');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-29');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-77');
      regionName = 'El Paso / West Texas';
    }
    // 793xx - 794xx -> Lubbock / South Plains
    else if (prefix3 === '793' || prefix3 === '794') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-23');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-25');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-83');
      regionName = 'Lubbock / South Plains';
    }
    // 776xx - 777xx -> Southeast Texas / Beaumont
    else if (prefix3 === '776' || prefix3 === '777') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-02');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-15');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-21');
      regionName = 'Southeast Texas / Beaumont';
    }
    // 785xx -> Rio Grande Valley
    else if (prefix3 === '785') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-28');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-25');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49');
      regionName = 'Rio Grande Valley';
    }
    // General Texas fallback
    else if (prefix2 >= '75' && prefix2 <= '79') {
      cdFallback = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-37');
      sdFallback = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-14');
      hdFallback = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49');
      regionName = 'Texas';
    }
  }

  const finalCd = cdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-cd-37')!;
  const finalSd = sdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-sd-14')!;
  const finalHd = hdFallback || TEXAS_DISTRICTS.find((d) => d.id === 'tx-hd-49')!;

  const counties = Array.from(new Set([...finalCd.majorCounties, ...finalSd.majorCounties]));

  return {
    congressional: finalCd,
    stateSenate: finalSd,
    stateHouse: finalHd,
    matchedCounties: counties,
    notes: cleanZip.startsWith('7')
      ? `Mapped to ${regionName} regional delegation for ZIP ${cleanZip}. Because Texas ZIP codes often cross legislative boundaries, verify your specific districts using the selectors below.`
      : `Non-Texas ZIP detected (${cleanZip}). Defaulted to Texas Capitol district delegation (Austin TX-37 / SD-14 / HD-49).`,
  };
}
