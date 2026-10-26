import { TEXAS_254_COUNTIES } from './texas254CountiesData';
import { TEXAS_SENATE_DISTRICTS, TexasSenateDistrict } from './texasSenateData';
export { TEXAS_SENATE_DISTRICTS };
export type { TexasSenateDistrict };

export interface TexasMapDistrict {
  id: string;
  code: string;
  name: string;
  representative: string;
  party: 'Republican' | 'Democratic';
  region: string;
  counties: string[];
  majorCities: string[];
  population: number;
  registeredVoters: number;
  turnoutRate2024: string;
  svgX: number;
  svgY: number;
  votes: {
    hb1Vouchers: 'Yea' | 'Nay' | 'Sponsor';
    sb2PropertyTax: 'Yea' | 'Nay';
    sb4Border: 'Yea' | 'Nay';
    hr2SecureBorder: 'Yea' | 'Nay';
  };
  website: string;
  officialRole: string;
  bioExcerpt: string;
}

export const TEXAS_SVG_BOUNDARY_PATH =
  'm 573.98015,536.93549 -4.65902,-17.56842 0,3.30015 4.65902,14.26827 z m -1.06769,-30.86607 -3.30015,6.21204 -0.38825,2.03833 3.6884,-8.25037 z m 2.6207,-4.56196 3.10602,-4.07666 -2.23245,1.35889 -0.87357,2.71777 z m 10.96814,-9.90044 -7.27974,3.78546 2.03833,-0.38825 5.24141,-3.39721 z m 0.97063,-1.35889 2.03832,-1.65007 -0.7765,0.19413 -1.26182,1.45594 z m -115.11686,-162.87191 -0.67944,-0.0971 -3.30015,91.0452 -19.2185,-0.87357 -30.76901,-1.74713 -12.32701,-0.87357 2.42658,4.75609 0.0971,0.0971 10.48282,10.48281 6.01791,7.08561 7.95917,5.92085 5.62967,10.28869 2.13538,10.77401 4.56197,3.00895 3.59134,3.97959 5.14434,1.8442 7.47386,4.75609 3.39721,1.26183 4.65903,-4.65903 1.45595,-4.95022 2.42658,-4.7561 7.57092,-3.00895 2.91189,1.45594 8.44449,0.67945 7.66799,4.75609 5.24141,0.97063 -1.45595,2.71777 3.00896,1.94126 2.81483,3.39721 0.58238,3.59133 1.8442,2.42658 4.27077,10.28869 4.27078,3.59134 3.30015,5.43553 4.17371,4.27078 1.8442,0.58238 1.55301,11.06519 4.56197,2.52365 0.19412,3.49427 1.16476,-0.29119 7.95918,9.70631 3.97959,0.87357 5.04728,3.00896 7.76505,0 5.62966,3.10601 6.69735,-1.45594 -3.00895,-2.81483 -2.71777,-8.1533 -1.06769,-7.08561 -1.55301,-2.32952 0.67944,-4.75609 -2.03833,-0.19413 -2.71777,-4.4649 3.10602,3.30015 3.59134,-1.26182 1.94126,-5.14435 -3.88252,-5.24141 5.82378,0.67944 2.71777,-4.17371 -0.38825,-1.45595 2.42658,-3.20308 -0.58238,2.81483 2.71777,-2.13539 -1.0677,-3.78546 3.49427,1.8442 4.46491,-2.52364 -4.36784,-4.56197 2.71776,1.0677 5.04729,0.29119 6.60029,-1.45595 7.3768,-4.95022 4.4649,-3.6884 0.67944,-2.71777 2.71777,-2.81483 -1.45595,-4.65903 0.29119,-2.91189 4.85316,-2.13539 -0.38826,5.14435 2.9119,0 -3.20308,2.71776 12.90939,-6.79441 2.13539,-0.0971 1.35888,-6.21204 0.38826,0 1.45594,-3.59133 0.67944,-11.0652 0.87357,-4.4649 -2.52364,-7.95918 -3.10602,-5.43553 -0.0971,-2.62071 -3.20309,-4.4649 -1.94126,-18.73318 -0.0971,-2.32952 -0.19413,-2.42658 -0.58238,-8.54155 -5.82378,0.19413 -1.45595,-1.55301 -0.29119,-0.0971 -0.0971,0 -3.78546,-0.67944 -4.36784,-2.81483 -4.85316,-2.03832 -9.12393,2.6207 -2.42658,-0.58238 -3.00896,1.16476 -3.6884,3.00895 -9.90044,-4.65902 -3.10601,4.27077 -4.56197,-1.65007 -4.85316,-3.10602 -2.6207,2.23245 -2.52364,0.0971 0,-1.84419 -6.79442,-3.20309 -2.71777,1.26182 -1.35888,-1.55301 -7.47386,-0.7765 -5.72673,-5.24141 -0.87356,1.74714 -4.17372,-0.19413 -3.88252,-3.6884 -1.74714,-5.82379 -0.29119,-33.19558 -24.84816,-0.29119 -23.48927,-0.58238 -0.58238,0 z';

export const TEXAS_MAP_DISTRICTS: TexasMapDistrict[] = [
  {
    "id": "tx-cd-01",
    "code": "TX-01",
    "name": "East Texas & Piney Woods",
    "representative": "Nathaniel Moran",
    "party": "Republican",
    "region": "East Texas",
    "counties": [
      "Smith",
      "Gregg",
      "Harrison",
      "Bowie",
      "Cass",
      "Marion",
      "Panola",
      "Rusk",
      "Shelby",
      "Upshur"
    ],
    "majorCities": [
      "Tyler",
      "Longview",
      "Texarkana",
      "Marshall",
      "Henderson"
    ],
    "population": 777900,
    "registeredVoters": 493400,
    "turnoutRate2024": "64.5%",
    "svgX": 595,
    "svgY": 388,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://moran.house.gov/",
    "officialRole": "U.S. Representative (House Judiciary & Education Committees)",
    "bioExcerpt": "Former Smith County Judge and attorney. Represents deep East Texas on House Judiciary Committee with emphasis on constitutional rights and rural broadband expansion."
  },
  {
    "id": "tx-cd-02",
    "code": "TX-02",
    "name": "Houston Metro (Kingwood, Spring, Montgomery County)",
    "representative": "Dan Crenshaw",
    "party": "Republican",
    "region": "Houston Metro",
    "counties": [
      "Harris (North/East)",
      "Montgomery (portion)"
    ],
    "majorCities": [
      "Kingwood",
      "Humble",
      "Atascocita",
      "Spring (part)",
      "The Woodlands (part)"
    ],
    "population": 779300,
    "registeredVoters": 498700,
    "turnoutRate2024": "63.9%",
    "svgX": 574,
    "svgY": 456,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://crenshaw.house.gov/",
    "officialRole": "U.S. Representative (Energy & Commerce Committee)",
    "bioExcerpt": "Former Navy SEAL lieutenant commander. Serves on House Energy & Commerce and Select Intelligence committees, championing domestic oil & gas and mental health reform."
  },
  {
    "id": "tx-cd-03",
    "code": "TX-03",
    "name": "Collin County Suburban Core",
    "representative": "Keith Self",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Collin County (McKinney, Frisco, Plano)",
      "Hunt County (part)"
    ],
    "majorCities": [
      "McKinney",
      "Frisco",
      "Plano (part)",
      "Allen",
      "Princeton"
    ],
    "population": 792400,
    "registeredVoters": 538900,
    "turnoutRate2024": "68.2%",
    "svgX": 544,
    "svgY": 372,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://self.house.gov/",
    "officialRole": "U.S. Representative (Foreign Affairs & Veterans Affairs)",
    "bioExcerpt": "Former Collin County Judge and retired U.S. Army lieutenant colonel. Staunch fiscal conservative focused on border enforcement, veterans healthcare, and deregulation."
  },
  {
    "id": "tx-cd-04",
    "code": "TX-04",
    "name": "Northeast Texas & Red River",
    "representative": "Pat Fallon",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Grayson",
      "Fannin",
      "Lamar",
      "Delta",
      "Hopkins",
      "Hunt (part)",
      "Rockwall",
      "Collin (part)"
    ],
    "majorCities": [
      "Sherman",
      "Denison",
      "Rockwall",
      "Greenville",
      "Paris"
    ],
    "population": 784200,
    "registeredVoters": 504300,
    "turnoutRate2024": "65.4%",
    "svgX": 565,
    "svgY": 365,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://fallon.house.gov/",
    "officialRole": "U.S. Representative (Armed Services & Oversight Committees)",
    "bioExcerpt": "Former Texas State Senator and Air Force officer. Active member of Armed Services Committee championing defense manufacturing and border infrastructure."
  },
  {
    "id": "tx-cd-05",
    "code": "TX-05",
    "name": "Dallas-East Texas Corridor",
    "representative": "Lance Gooden",
    "party": "Republican",
    "region": "East Texas",
    "counties": [
      "Dallas (East)",
      "Kaufman",
      "Van Zandt",
      "Henderson",
      "Anderson",
      "Cherokee"
    ],
    "majorCities": [
      "Mesquite (part)",
      "Forney",
      "Terrell",
      "Athens",
      "Palestine"
    ],
    "population": 778100,
    "registeredVoters": 486200,
    "turnoutRate2024": "61.7%",
    "svgX": 555,
    "svgY": 395,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://gooden.house.gov/",
    "officialRole": "U.S. Representative (Financial Services & Judiciary)",
    "bioExcerpt": "Former member of the Texas House of Representatives. Serves on House Financial Services and Judiciary Committees with strong focus on immigration deterrence."
  },
  {
    "id": "tx-cd-06",
    "code": "TX-06",
    "name": "South DFW & Ellis/Navarro Counties",
    "representative": "Jake Ellzey",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Ellis",
      "Navarro",
      "Dallas (South/West)",
      "Johnson (part)"
    ],
    "majorCities": [
      "Waxahachie",
      "Corsicana",
      "Ennis",
      "Mansfield (part)",
      "Midlothian"
    ],
    "population": 780400,
    "registeredVoters": 497100,
    "turnoutRate2024": "63.4%",
    "svgX": 542,
    "svgY": 404,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://ellzey.house.gov/",
    "officialRole": "U.S. Representative (House Appropriations Committee)",
    "bioExcerpt": "Decorated U.S. Navy fighter pilot and former Texas state representative. Serves on House Appropriations Committee, securing defense and agricultural funding."
  },
  {
    "id": "tx-cd-07",
    "code": "TX-07",
    "name": "West Houston & Fort Bend",
    "representative": "Lizzie Fletcher",
    "party": "Democratic",
    "region": "Houston Metro",
    "counties": [
      "Harris (West)",
      "Fort Bend (part)"
    ],
    "majorCities": [
      "Houston (Westchase, Memorial, Galleria)",
      "Bellaire",
      "Sugar Land (part)"
    ],
    "population": 771900,
    "registeredVoters": 489500,
    "turnoutRate2024": "64.8%",
    "svgX": 572,
    "svgY": 466,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://fletcher.house.gov/",
    "officialRole": "U.S. Representative (Energy & Commerce Committee)",
    "bioExcerpt": "Commercial litigation attorney elected in 2018. Member of Energy & Commerce Committee championing flood mitigation infrastructure and healthcare access."
  },
  {
    "id": "tx-cd-08",
    "code": "TX-08",
    "name": "Montgomery County & North Houston Exurbs",
    "representative": "Morgan Luttrell",
    "party": "Republican",
    "region": "Houston Metro",
    "counties": [
      "Montgomery",
      "Walker",
      "San Jacinto",
      "Harris (part)"
    ],
    "majorCities": [
      "Conroe",
      "Huntsville",
      "The Woodlands",
      "Magnolia",
      "Willis"
    ],
    "population": 788200,
    "registeredVoters": 529100,
    "turnoutRate2024": "67.8%",
    "svgX": 572,
    "svgY": 448,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://luttrell.house.gov/",
    "officialRole": "U.S. Representative (Armed Services & Homeland Security)",
    "bioExcerpt": "Former Navy SEAL with two master degrees in cognitive neuroscience. Focuses on veteran mental health, energy resilience, and federal border security."
  },
  {
    "id": "tx-cd-09",
    "code": "TX-09",
    "name": "South Houston & Missouri City",
    "representative": "Al Green",
    "party": "Democratic",
    "region": "Houston Metro",
    "counties": [
      "Harris (South)",
      "Fort Bend (part)"
    ],
    "majorCities": [
      "Houston (Alief, Meyerland, Astrodome area)",
      "Missouri City",
      "Stafford"
    ],
    "population": 769500,
    "registeredVoters": 442100,
    "turnoutRate2024": "55.2%",
    "svgX": 574,
    "svgY": 470,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://algreen.house.gov/",
    "officialRole": "Senior U.S. Representative (Financial Services & Homeland Security)",
    "bioExcerpt": "Longtime civil rights leader and former Justice of the Peace. Senior member of Financial Services Committee advocating for affordable housing and fair banking."
  },
  {
    "id": "tx-cd-10",
    "code": "TX-10",
    "name": "Central Texas & Brazos Valley",
    "representative": "Michael McCaul",
    "party": "Republican",
    "region": "Central Texas",
    "counties": [
      "Travis (part)",
      "Bastrop",
      "Lee",
      "Burleson",
      "Washington",
      "Brazos",
      "Waller",
      "Austin"
    ],
    "majorCities": [
      "Katy (part)",
      "Bryan-College Station",
      "Brenham",
      "Pflugerville (part)"
    ],
    "population": 789100,
    "registeredVoters": 521800,
    "turnoutRate2024": "65.1%",
    "svgX": 538,
    "svgY": 438,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://mccaul.house.gov/",
    "officialRole": "U.S. Representative (House Foreign Affairs Chairman)",
    "bioExcerpt": "Chairman of the House Foreign Affairs Committee and former federal prosecutor. Author of the CHIPS for America Act and key national security architect."
  },
  {
    "id": "tx-cd-11",
    "code": "TX-11",
    "name": "Permian Basin & Concho Valley",
    "representative": "August Pfluger",
    "party": "Republican",
    "region": "West Texas & El Paso",
    "counties": [
      "Midland",
      "Ector (Odessa)",
      "Tom Green (San Angelo)",
      "Brown",
      "Callahan",
      "Coke",
      "Coleman",
      "Concho",
      "Glasscock",
      "Irion",
      "Kimble",
      "Llano",
      "Mason",
      "McCulloch",
      "Menard",
      "Runnels",
      "San Saba",
      "Sterling"
    ],
    "majorCities": [
      "Midland",
      "Odessa",
      "San Angelo",
      "Brownwood"
    ],
    "population": 782900,
    "registeredVoters": 489200,
    "turnoutRate2024": "61.8%",
    "svgX": 480,
    "svgY": 418,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://pfluger.house.gov/",
    "officialRole": "U.S. Representative (Energy & Commerce Committee)",
    "bioExcerpt": "Decorated U.S. Air Force fighter pilot with two decades of service. Represents the heart of American oil and gas production in the Permian Basin."
  },
  {
    "id": "tx-cd-12",
    "code": "TX-12",
    "name": "Fort Worth & Parker County",
    "representative": "Craig Goldman",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Tarrant (West/North)",
      "Parker (East)"
    ],
    "majorCities": [
      "Fort Worth (West)",
      "North Richland Hills",
      "Saginaw",
      "Weatherford",
      "Benbrook"
    ],
    "population": 782400,
    "registeredVoters": 508200,
    "turnoutRate2024": "63.1%",
    "svgX": 522,
    "svgY": 386,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://goldman.house.gov/",
    "officialRole": "U.S. Representative (119th Congress / fmr House Majority Leader)",
    "bioExcerpt": "Former Texas House Republican Caucus Chair and Majority Leader who authored landmark Texas real estate and infrastructure legislation before winning TX-12."
  },
  {
    "id": "tx-cd-13",
    "code": "TX-13",
    "name": "Texas Panhandle & Wichita Falls",
    "representative": "Ronny Jackson",
    "party": "Republican",
    "region": "Panhandle & South Plains",
    "counties": [
      "Potter",
      "Randall",
      "Wichita",
      "Wilbarger",
      "Archer",
      "Moore",
      "Dallam",
      "Sherman",
      "Hansford",
      "Ochiltree"
    ],
    "majorCities": [
      "Amarillo",
      "Wichita Falls",
      "Borger",
      "Dumas",
      "Pampa"
    ],
    "population": 780600,
    "registeredVoters": 472500,
    "turnoutRate2024": "59.8%",
    "svgX": 498,
    "svgY": 340,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://jackson.house.gov/",
    "officialRole": "U.S. Representative (Armed Services & Foreign Affairs)",
    "bioExcerpt": "Retired U.S. Navy rear admiral and former White House Physician. Represents 41 rural Panhandle and North Texas counties on House Armed Services Committee."
  },
  {
    "id": "tx-cd-14",
    "code": "TX-14",
    "name": "Gulf Coast, Galveston & Golden Triangle",
    "representative": "Randy Weber",
    "party": "Republican",
    "region": "East Texas",
    "counties": [
      "Galveston",
      "Jefferson",
      "Orange",
      "Brazoria (part)"
    ],
    "majorCities": [
      "Galveston",
      "Beaumont",
      "Port Arthur",
      "League City",
      "Texas City"
    ],
    "population": 779800,
    "registeredVoters": 499100,
    "turnoutRate2024": "62.4%",
    "svgX": 585,
    "svgY": 480,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://weber.house.gov/",
    "officialRole": "U.S. Representative (Energy & Commerce and Science Committees)",
    "bioExcerpt": "Air conditioning business owner and former Texas House member. Champion of coastal storm surge protection (Ike Dike) and petrochemical energy refining."
  },
  {
    "id": "tx-cd-15",
    "code": "TX-15",
    "name": "Rio Grande Valley & Guadalupe Valley",
    "representative": "Monica De La Cruz",
    "party": "Republican",
    "region": "Rio Grande Valley",
    "counties": [
      "Hidalgo",
      "Brooks",
      "Jim Wells",
      "Kleberg",
      "Live Oak",
      "Karnes",
      "Wilson",
      "Guadalupe"
    ],
    "majorCities": [
      "McAllen",
      "Edinburg",
      "Alice",
      "Seguin",
      "Floresville"
    ],
    "population": 778500,
    "registeredVoters": 438900,
    "turnoutRate2024": "49.8%",
    "svgX": 518,
    "svgY": 515,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://delacruz.house.gov/",
    "officialRole": "U.S. Representative (Financial Services & Agriculture)",
    "bioExcerpt": "First Republican Latina to represent the 15th Congressional District since its creation. Serves on House Financial Services and Agriculture committees."
  },
  {
    "id": "tx-cd-16",
    "code": "TX-16",
    "name": "El Paso Metro & Far West Texas Border",
    "representative": "Veronica Escobar",
    "party": "Democratic",
    "region": "West Texas & El Paso",
    "counties": [
      "El Paso County"
    ],
    "majorCities": [
      "El Paso",
      "Socorro",
      "Horizon City",
      "Anthony",
      "Fort Bliss"
    ],
    "population": 768900,
    "registeredVoters": 495600,
    "turnoutRate2024": "51.4%",
    "svgX": 412,
    "svgY": 412,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://escobar.house.gov/",
    "officialRole": "U.S. Representative (Armed Services & Judiciary Committees)",
    "bioExcerpt": "First of two Latina women elected to Congress from Texas. Serves on House Armed Services and Judiciary committees with central focus on binational trade and immigration reform."
  },
  {
    "id": "tx-cd-17",
    "code": "TX-17",
    "name": "Central Texas, Waco & Brazos Valley",
    "representative": "Pete Sessions",
    "party": "Republican",
    "region": "Central Texas",
    "counties": [
      "McLennan (Waco)",
      "Brazos (part)",
      "Falls",
      "Freestone",
      "Hill",
      "Leon",
      "Limestone",
      "Milam",
      "Robertson"
    ],
    "majorCities": [
      "Waco",
      "College Station (part)",
      "Hillsboro",
      "Cameron"
    ],
    "population": 781200,
    "registeredVoters": 496300,
    "turnoutRate2024": "62.8%",
    "svgX": 534,
    "svgY": 418,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://sessions.house.gov/",
    "officialRole": "Senior U.S. Representative (Financial Services Committee)",
    "bioExcerpt": "Former Chairman of the House Rules Committee with over two decades of congressional service. Represents Waco and Central Texas on Financial Services."
  },
  {
    "id": "tx-cd-18",
    "code": "TX-18",
    "name": "Central Houston & Harris County",
    "representative": "Sylvester Turner",
    "party": "Democratic",
    "region": "Houston Metro",
    "counties": [
      "Harris (Central/Downtown)"
    ],
    "majorCities": [
      "Houston (Downtown, Third Ward, Fifth Ward, Acres Homes, Spring Branch)"
    ],
    "population": 771200,
    "registeredVoters": 461500,
    "turnoutRate2024": "56.1%",
    "svgX": 576,
    "svgY": 464,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://turner.house.gov/",
    "officialRole": "U.S. Representative (119th Congress / fmr Houston Mayor)",
    "bioExcerpt": "Former two-term Mayor of Houston and 27-year Texas House representative who succeeded the late Rep. Sheila Jackson Lee in the historic 18th Congressional seat."
  },
  {
    "id": "tx-cd-19",
    "code": "TX-19",
    "name": "South Plains & West Central Texas",
    "representative": "Jodey Arrington",
    "party": "Republican",
    "region": "Panhandle & South Plains",
    "counties": [
      "Lubbock",
      "Taylor",
      "Jones",
      "Hockley",
      "Lamb",
      "Castro",
      "Bailey",
      "Cochran",
      "Lynn",
      "Terry"
    ],
    "majorCities": [
      "Lubbock",
      "Abilene",
      "Levelland",
      "Plainview",
      "Slaton"
    ],
    "population": 783100,
    "registeredVoters": 481000,
    "turnoutRate2024": "61.4%",
    "svgX": 490,
    "svgY": 375,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://arrington.house.gov/",
    "officialRole": "U.S. Representative (House Budget Committee Chairman)",
    "bioExcerpt": "Chairman of the House Budget Committee. Former Texas Tech University vice chancellor leading federal fiscal blueprint and agricultural farm bill negotiations."
  },
  {
    "id": "tx-cd-20",
    "code": "TX-20",
    "name": "San Antonio Urban Core & Westside",
    "representative": "Joaquin Castro",
    "party": "Democratic",
    "region": "San Antonio & Hill Country",
    "counties": [
      "Bexar (Central/West)"
    ],
    "majorCities": [
      "San Antonio (Downtown, Westside, Southtown, Lackland AFB)"
    ],
    "population": 769100,
    "registeredVoters": 458700,
    "turnoutRate2024": "54.7%",
    "svgX": 506,
    "svgY": 472,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://castro.house.gov/",
    "officialRole": "U.S. Representative (Foreign Affairs & Intelligence Committees)",
    "bioExcerpt": "Former Texas State Representative and House Intelligence member. Champion of educational access, immigration reform, and international human rights."
  },
  {
    "id": "tx-cd-21",
    "code": "TX-21",
    "name": "Hill Country & North San Antonio",
    "representative": "Chip Roy",
    "party": "Republican",
    "region": "San Antonio & Hill Country",
    "counties": [
      "Bexar (North)",
      "Comal",
      "Hays",
      "Kendall",
      "Gillespie",
      "Kerr",
      "Blanco",
      "Bandera",
      "Real"
    ],
    "majorCities": [
      "North San Antonio",
      "New Braunfels",
      "San Marcos",
      "Boerne",
      "Fredericksburg",
      "Kerrville"
    ],
    "population": 781900,
    "registeredVoters": 548900,
    "turnoutRate2024": "67.4%",
    "svgX": 508,
    "svgY": 452,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://roy.house.gov/",
    "officialRole": "U.S. Representative (House Rules & Judiciary Committees)",
    "bioExcerpt": "Prominent House Freedom Caucus leader and member of House Rules and Judiciary Committees. Focuses heavily on federal spending cuts and border enforcement."
  },
  {
    "id": "tx-cd-22",
    "code": "TX-22",
    "name": "Fort Bend & South Houston Suburbs",
    "representative": "Troy Nehls",
    "party": "Republican",
    "region": "Houston Metro",
    "counties": [
      "Fort Bend",
      "Brazoria (part)",
      "Harris (part)",
      "Matagorda"
    ],
    "majorCities": [
      "Sugar Land",
      "Pearland (part)",
      "Richmond",
      "Rosenberg",
      "Missouri City (part)"
    ],
    "population": 791400,
    "registeredVoters": 524100,
    "turnoutRate2024": "66.1%",
    "svgX": 568,
    "svgY": 475,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://nehls.house.gov/",
    "officialRole": "U.S. Representative (Transportation & Judiciary Committees)",
    "bioExcerpt": "Former Fort Bend County Sheriff and U.S. Army veteran. Focuses on law enforcement support, maritime commerce, and transportation infrastructure."
  },
  {
    "id": "tx-cd-23",
    "code": "TX-23",
    "name": "South & West Texas Border Corridor",
    "representative": "Tony Gonzales",
    "party": "Republican",
    "region": "West Texas & El Paso",
    "counties": [
      "Bexar (West)",
      "Medina",
      "Uvalde",
      "Val Verde",
      "Maverick",
      "Brewster",
      "Presidio",
      "Pecos",
      "Terrell"
    ],
    "majorCities": [
      "San Antonio (Far West)",
      "Del Rio",
      "Eagle Pass",
      "Uvalde",
      "Fort Stockton",
      "Marfa"
    ],
    "population": 784300,
    "registeredVoters": 462100,
    "turnoutRate2024": "54.9%",
    "svgX": 465,
    "svgY": 450,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://gonzales.house.gov/",
    "officialRole": "U.S. Representative (House Appropriations Committee)",
    "bioExcerpt": "20-year U.S. Navy master chief. Represents over 800 miles of border on House Appropriations Committee, securing critical border infrastructure and school safety funding."
  },
  {
    "id": "tx-cd-24",
    "code": "TX-24",
    "name": "DFW Airport Corridor (Irving, Coppell, Carrollton)",
    "representative": "Beth Van Duyne",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Dallas (Northwest)",
      "Tarrant (Northeast)",
      "Denton (part)"
    ],
    "majorCities": [
      "Irving",
      "Coppell",
      "Carrollton (part)",
      "Grapevine",
      "Colleyville",
      "Southlake"
    ],
    "population": 787200,
    "registeredVoters": 519400,
    "turnoutRate2024": "66.9%",
    "svgX": 530,
    "svgY": 382,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://vanduyne.house.gov/",
    "officialRole": "U.S. Representative (Ways & Means and Small Business)",
    "bioExcerpt": "Former Mayor of Irving and regional HUD Administrator. Serves on Ways and Means Committee championing corporate tax cuts and trade competitiveness."
  },
  {
    "id": "tx-cd-25",
    "code": "TX-25",
    "name": "Central Texas & Hill Country Gateway",
    "representative": "Roger Williams",
    "party": "Republican",
    "region": "Central Texas",
    "counties": [
      "Johnson",
      "Somervell",
      "Erath",
      "Hood",
      "Bosque",
      "Comanche",
      "Eastland",
      "Jack",
      "Palo Pinto",
      "Stephens",
      "Young",
      "Tarrant (part)"
    ],
    "majorCities": [
      "Cleburne",
      "Stephenville",
      "Granbury",
      "Weatherford (part)",
      "Mineral Wells"
    ],
    "population": 783500,
    "registeredVoters": 512100,
    "turnoutRate2024": "64.9%",
    "svgX": 518,
    "svgY": 410,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://williams.house.gov/",
    "officialRole": "Chairman of the House Small Business Committee",
    "bioExcerpt": "Chairman of House Small Business Committee and former Texas Secretary of State. Focuses on small business capital access, deregulation, and military base readiness."
  },
  {
    "id": "tx-cd-26",
    "code": "TX-26",
    "name": "North Texas (Denton, Cooke, Wise Counties)",
    "representative": "Brandon Gill",
    "party": "Republican",
    "region": "North Texas",
    "counties": [
      "Denton County",
      "Cooke County",
      "Wise County",
      "Tarrant (portion)"
    ],
    "majorCities": [
      "Denton",
      "Gainesville",
      "Decatur",
      "Lewisville (part)",
      "Flower Mound (part)"
    ],
    "population": 785420,
    "registeredVoters": 512400,
    "turnoutRate2024": "64.8%",
    "svgX": 526,
    "svgY": 368,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://gill.house.gov/",
    "officialRole": "U.S. Representative (119th Congress)",
    "bioExcerpt": "Elected in 2024 to succeed veteran Rep. Michael Burgess. Serves on House Judiciary and Oversight committees with emphasis on border security and deregulation."
  },
  {
    "id": "tx-cd-27",
    "code": "TX-27",
    "name": "Coastal Bend & Victoria Gateway",
    "representative": "Michael Cloud",
    "party": "Republican",
    "region": "East Texas",
    "counties": [
      "Nueces (Corpus Christi)",
      "Victoria",
      "Aransas",
      "Calhoun",
      "Jackson",
      "Lavaca",
      "Matagorda (part)",
      "Refugio",
      "San Patricio (part)",
      "Wharton"
    ],
    "majorCities": [
      "Corpus Christi",
      "Victoria",
      "Port Lavaca",
      "El Campo",
      "Bay City"
    ],
    "population": 778900,
    "registeredVoters": 488300,
    "turnoutRate2024": "60.3%",
    "svgX": 540,
    "svgY": 488,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://cloud.house.gov/",
    "officialRole": "U.S. Representative (House Appropriations & Oversight)",
    "bioExcerpt": "Former Victoria County GOP Chairman. Represents Texas Coastal Bend with legislative priorities in port expansion, naval aviation bases, and fiscal constraint."
  },
  {
    "id": "tx-cd-28",
    "code": "TX-28",
    "name": "South Texas, Laredo & San Antonio South",
    "representative": "Henry Cuellar",
    "party": "Democratic",
    "region": "Rio Grande Valley",
    "counties": [
      "Webb (Laredo)",
      "Zapata",
      "Starr",
      "Atascosa",
      "Bexar (South)",
      "Guadalupe (part)",
      "McMullen"
    ],
    "majorCities": [
      "Laredo",
      "Pleasanton",
      "Rio Grande City",
      "San Antonio (South)"
    ],
    "population": 775200,
    "registeredVoters": 449600,
    "turnoutRate2024": "47.8%",
    "svgX": 498,
    "svgY": 498,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://cuellar.house.gov/",
    "officialRole": "Senior U.S. Representative (House Appropriations Committee)",
    "bioExcerpt": "Senior member of House Appropriations Committee representing the busiest inland port in the Americas (Laredo). Moderate Democrat supporting border security funding."
  },
  {
    "id": "tx-cd-29",
    "code": "TX-29",
    "name": "East Houston & Pasadena",
    "representative": "Sylvia Garcia",
    "party": "Democratic",
    "region": "Houston Metro",
    "counties": [
      "Harris (East/North)"
    ],
    "majorCities": [
      "Houston (East End, Northside)",
      "Pasadena (part)",
      "South Houston",
      "Galena Park",
      "Jacinto City"
    ],
    "population": 768400,
    "registeredVoters": 412500,
    "turnoutRate2024": "45.2%",
    "svgX": 578,
    "svgY": 465,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://sylviagarcia.house.gov/",
    "officialRole": "U.S. Representative (Financial Services & Armed Services)",
    "bioExcerpt": "First Hispanic woman elected to Harris County Commissioners Court and former state senator. Focuses on Port of Houston labor, immigration, and civil rights."
  },
  {
    "id": "tx-cd-30",
    "code": "TX-30",
    "name": "Dallas Urban Core & South Dallas County",
    "representative": "Jasmine Crockett",
    "party": "Democratic",
    "region": "North Texas",
    "counties": [
      "Dallas (Central/South)",
      "Tarrant (part)"
    ],
    "majorCities": [
      "Dallas (Downtown, Oak Cliff, South Dallas)",
      "Cedar Hill",
      "DeSoto",
      "Duncanville",
      "Lancaster"
    ],
    "population": 772400,
    "registeredVoters": 471200,
    "turnoutRate2024": "58.9%",
    "svgX": 538,
    "svgY": 390,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://crockett.house.gov/",
    "officialRole": "U.S. Representative (Oversight & Agriculture Committees)",
    "bioExcerpt": "Civil rights attorney and former Texas House member. High-profile member of House Oversight Committee championing voting rights and criminal justice reform."
  },
  {
    "id": "tx-cd-31",
    "code": "TX-31",
    "name": "Round Rock, Georgetown & Fort Cavazos",
    "representative": "John Carter",
    "party": "Republican",
    "region": "Central Texas",
    "counties": [
      "Williamson",
      "Bell",
      "Coryell (Fort Cavazos)"
    ],
    "majorCities": [
      "Round Rock",
      "Georgetown",
      "Killeen",
      "Temple",
      "Copperas Cove"
    ],
    "population": 789400,
    "registeredVoters": 531200,
    "turnoutRate2024": "64.2%",
    "svgX": 526,
    "svgY": 428,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://carter.house.gov/",
    "officialRole": "Senior U.S. Representative (Defense Appropriations Chairman)",
    "bioExcerpt": "Senior member and Military Construction & Defense Appropriations leader. Instrumental in securing modern armored cavalry assets and housing for Fort Cavazos."
  },
  {
    "id": "tx-cd-32",
    "code": "TX-32",
    "name": "North Dallas County & Richardson",
    "representative": "Julie Johnson",
    "party": "Democratic",
    "region": "North Texas",
    "counties": [
      "Dallas County (North/East)",
      "Collin (portion)",
      "Denton (portion)"
    ],
    "majorCities": [
      "North Dallas",
      "Richardson",
      "Garland",
      "Addison",
      "Farmers Branch",
      "Carrollton"
    ],
    "population": 776200,
    "registeredVoters": 489300,
    "turnoutRate2024": "62.7%",
    "svgX": 536,
    "svgY": 384,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://johnson.house.gov/",
    "officialRole": "U.S. Representative (119th Congress / fmr Texas House member)",
    "bioExcerpt": "Trial attorney and former Texas House representative elected in 2024. Priorities include consumer protections, public school funding, and bipartisan healthcare access."
  },
  {
    "id": "tx-cd-33",
    "code": "TX-33",
    "name": "Dallas-Fort Worth Metroplex Corridor",
    "representative": "Marc Veasey",
    "party": "Democratic",
    "region": "North Texas",
    "counties": [
      "Dallas (West)",
      "Tarrant (East)"
    ],
    "majorCities": [
      "Fort Worth (East/Southeast)",
      "Dallas (West Dallas)",
      "Grand Prairie (part)",
      "Arlington (part)"
    ],
    "population": 768100,
    "registeredVoters": 421800,
    "turnoutRate2024": "48.9%",
    "svgX": 534,
    "svgY": 388,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://veasey.house.gov/",
    "officialRole": "U.S. Representative (Energy & Commerce and Armed Services)",
    "bioExcerpt": "Former Texas House member and founder of the Congressional Voting Rights Caucus. Focuses on aerospace manufacturing, clean energy jobs, and voting access."
  },
  {
    "id": "tx-cd-34",
    "code": "TX-34",
    "name": "Lower Rio Grande Valley & Coastal Bend",
    "representative": "Vicente Gonzalez",
    "party": "Democratic",
    "region": "Rio Grande Valley",
    "counties": [
      "Cameron",
      "Willacy",
      "Kenedy",
      "Kleberg",
      "San Patricio",
      "Bee",
      "DeWitt",
      "Goliad"
    ],
    "majorCities": [
      "Brownsville",
      "Harlingen",
      "San Benito",
      "Port Isabel",
      "Corpus Christi (parts)"
    ],
    "population": 773400,
    "registeredVoters": 450200,
    "turnoutRate2024": "48.6%",
    "svgX": 534,
    "svgY": 532,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://gonzalez.house.gov/",
    "officialRole": "U.S. Representative (Financial Services Committee)",
    "bioExcerpt": "Former trial attorney representing Cameron and South Texas coastal communities. Moderate Democrat focusing on cross-border trade, port expansion, and veteran care."
  },
  {
    "id": "tx-cd-35",
    "code": "TX-35",
    "name": "I-35 Corridor (East Austin to Downtown San Antonio)",
    "representative": "Greg Casar",
    "party": "Democratic",
    "region": "Central Texas",
    "counties": [
      "Travis (East)",
      "Hays",
      "Comal",
      "Bexar (Downtown/East)"
    ],
    "majorCities": [
      "East Austin",
      "San Marcos",
      "Downtown San Antonio",
      "Lockhart"
    ],
    "population": 774800,
    "registeredVoters": 445200,
    "turnoutRate2024": "58.3%",
    "svgX": 516,
    "svgY": 458,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://casar.house.gov/",
    "officialRole": "U.S. Representative (Congressional Progressive Caucus Whip)",
    "bioExcerpt": "Former Austin City Council member and labor organizer. Serves as Progressive Caucus whip with legislative priorities in worker rights, climate, and affordable housing."
  },
  {
    "id": "tx-cd-36",
    "code": "TX-36",
    "name": "Southeast Texas, Chambers & Orange Counties",
    "representative": "Brian Babin",
    "party": "Republican",
    "region": "Houston Metro",
    "counties": [
      "Chambers",
      "Hardin",
      "Jasper",
      "Liberty",
      "Newton",
      "Polk",
      "Tyler",
      "Harris (part)"
    ],
    "majorCities": [
      "Baytown",
      "Deer Park",
      "La Porte",
      "Liberty",
      "Cleveland"
    ],
    "population": 785100,
    "registeredVoters": 518200,
    "turnoutRate2024": "65.7%",
    "svgX": 598,
    "svgY": 460,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://babin.house.gov/",
    "officialRole": "U.S. Representative (Science & Transportation Committees)",
    "bioExcerpt": "Dentist, former Mayor of Woodville, and veteran. Chairman of the Space and Aeronautics Subcommittee, overseeing NASA and commercial spaceflight programs."
  },
  {
    "id": "tx-cd-37",
    "code": "TX-37",
    "name": "Austin Metro & Travis County",
    "representative": "Lloyd Doggett",
    "party": "Democratic",
    "region": "Central Texas",
    "counties": [
      "Travis County",
      "Williamson (portion)"
    ],
    "majorCities": [
      "Austin (Downtown, Central, South)",
      "Pflugerville (part)"
    ],
    "population": 772100,
    "registeredVoters": 534200,
    "turnoutRate2024": "71.2%",
    "svgX": 522,
    "svgY": 442,
    "votes": {
      "hb1Vouchers": "Yea",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Nay",
      "hr2SecureBorder": "Nay"
    },
    "website": "https://doggett.house.gov/",
    "officialRole": "Senior U.S. Representative (Ways & Means Committee)",
    "bioExcerpt": "Longest-serving Texas Democratic member of Congress. Senior member of Ways and Means Committee and ranking member on the Health Subcommittee."
  },
  {
    "id": "tx-cd-38",
    "code": "TX-38",
    "name": "West Houston & Northwest Harris County",
    "representative": "Wesley Hunt",
    "party": "Republican",
    "region": "Houston Metro",
    "counties": [
      "Harris (West/Northwest)"
    ],
    "majorCities": [
      "Houston (Memorial, Spring Branch, Energy Corridor)",
      "Jersey Village",
      "Tomball (part)"
    ],
    "population": 786900,
    "registeredVoters": 529400,
    "turnoutRate2024": "68.9%",
    "svgX": 568,
    "svgY": 462,
    "votes": {
      "hb1Vouchers": "Nay",
      "sb2PropertyTax": "Yea",
      "sb4Border": "Yea",
      "hr2SecureBorder": "Yea"
    },
    "website": "https://hunt.house.gov/",
    "officialRole": "U.S. Representative (Judiciary & Small Business Committees)",
    "bioExcerpt": "West Point graduate and Apache helicopter pilot with combat tours in Iraq. Focuses on domestic energy independence, judicial constitutionalism, and national defense."
  }
];

export const TEXAS_MAP_REGIONS = [
  'All Texas',
  'North Texas',
  'Central Texas',
  'Houston Metro',
  'San Antonio & Hill Country',
  'Rio Grande Valley',
  'West Texas & El Paso',
  'Panhandle & South Plains',
  'East Texas',
] as const;

export type TexasMapRegion = (typeof TEXAS_MAP_REGIONS)[number];

export interface TexasMapCounty {
  id: string;
  name: string;
  cleanName?: string;
  fips?: string;
  countySeat: string;
  region: TexasMapRegion;
  population: number;
  registeredVoters: number;
  turnout2024: string;
  majorityParty?: string;
  politicalLean: 'Strong GOP' | 'Lean GOP' | 'Competitive / Swing' | 'Lean Dem' | 'Strong Dem';
  partyColor: string;
  margin2024?: string;
  svgX?: number;
  svgY?: number;
  densityType: 'Urban Core' | 'Suburban Ring' | 'Rural & Exurban';
  keyElectoralDriver: string;
  congressionalDistricts: string[];
  keyOfficials: string[];
  voucherStance: 'Anti-Voucher Coalition' | 'Pro-ESA Voucher';
  borderStance: 'Strong Border Enforcement' | 'Constitutional Scrutiny';
}

export interface TexasMapPolitician {
  id: string;
  name: string;
  role: string;
  party: 'Republican' | 'Democratic' | 'Nonpartisan';
  districtCode: string;
  photoUrl: string;
  svgX: number;
  svgY: number;
  region: TexasMapRegion;
  countiesServed: string[];
  keyVotes: {
    vouchers: 'Yea' | 'Nay' | 'Sponsor';
    border: 'Yea' | 'Nay';
    propertyTax: 'Yea' | 'Nay';
  };
  officeAddress: string;
  officialWebsite: string;
  bioSummary: string;
}

export const TEXAS_MAP_COUNTIES: TexasMapCounty[] = TEXAS_254_COUNTIES as unknown as TexasMapCounty[];

export const TEXAS_MAP_POLITICIANS: TexasMapPolitician[] = [
  {
    id: 'pol-gill',
    name: 'Brandon Gill',
    role: 'U.S. Representative (TX-26)',
    party: 'Republican',
    districtCode: 'TX-26',
    photoUrl: '/images/officials/off-fed-gill.jpg',
    svgX: 526,
    svgY: 368,
    region: 'North Texas',
    countiesServed: ['Denton County', 'Cooke County', 'Wise County'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: '119th U.S. Congress, Longworth HOB, Washington, DC 20515',
    officialWebsite: 'https://gill.house.gov/',
    bioSummary: 'Represents District 26 covering Denton, Wise, and Cooke counties. Conservative author and financial analyst focused on federal spending restraint and southern border wall construction.',
  },
  {
    id: 'pol-mccaul',
    name: 'Michael McCaul',
    role: 'U.S. Representative (TX-10)',
    party: 'Republican',
    districtCode: 'TX-10',
    photoUrl: '/images/officials/off-fed-mccaul.jpg',
    svgX: 546,
    svgY: 442,
    region: 'Central Texas',
    countiesServed: ['Travis County (part)', 'Bastrop County', 'Lee County', 'Burleson County', 'Brazos County'],
    keyVotes: {
      vouchers: 'Nay',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: '2300 Rayburn HOB, Washington, DC 20515',
    officialWebsite: 'https://mccaul.house.gov/',
    bioSummary: 'Serving since 2005. Chairman of House Foreign Affairs Committee and lead sponsor of the CHIPS and Science Act of 2022.',
  },
  {
    id: 'pol-doggett',
    name: 'Lloyd Doggett',
    role: 'U.S. Representative (TX-37)',
    party: 'Democratic',
    districtCode: 'TX-37',
    photoUrl: '/images/officials/off-fed-doggett.jpg',
    svgX: 522,
    svgY: 446,
    region: 'Central Texas',
    countiesServed: ['Travis County', 'Williamson County (part)'],
    keyVotes: {
      vouchers: 'Nay',
      border: 'Nay',
      propertyTax: 'Yea',
    },
    officeAddress: '2307 Rayburn HOB, Washington, DC 20515',
    officialWebsite: 'https://doggett.house.gov/',
    bioSummary: 'Dean of the Texas Congressional delegation. Senior member of Ways and Means Committee championing healthcare access, climate initiatives, and public education funding.',
  },
  {
    id: 'pol-roy',
    name: 'Chip Roy',
    role: 'U.S. Representative (TX-21)',
    party: 'Republican',
    districtCode: 'TX-21',
    photoUrl: '/images/officials/off-fed-roy.jpg',
    svgX: 512,
    svgY: 456,
    region: 'San Antonio & Hill Country',
    countiesServed: ['Travis (part)', 'Hays', 'Comal', 'Kendall', 'Bexar (part)', 'Gillespie', 'Kerr'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: '1005 Longworth HOB, Washington, DC 20515',
    officialWebsite: 'https://roy.house.gov/',
    bioSummary: 'Former Chief of Staff to Ted Cruz and Texas First Assistant Attorney General. High-profile fiscal conservative leader in the House Freedom Caucus.',
  },
  {
    id: 'pol-casar',
    name: 'Greg Casar',
    role: 'U.S. Representative (TX-35)',
    party: 'Democratic',
    districtCode: 'TX-35',
    photoUrl: '/images/officials/off-fed-casar.jpg',
    svgX: 516,
    svgY: 462,
    region: 'Central Texas',
    countiesServed: ['Travis (part)', 'Hays (part)', 'Caldwell', 'Comal (part)', 'Bexar (part)'],
    keyVotes: {
      vouchers: 'Nay',
      border: 'Nay',
      propertyTax: 'Yea',
    },
    officeAddress: '1339 Longworth HOB, Washington, DC 20515',
    officialWebsite: 'https://casar.house.gov/',
    bioSummary: 'Former Austin City Council member. Whip of the Congressional Progressive Caucus, advocating for labor organizing rights, voting rights, and federal housing funding.',
  },
  {
    id: 'pol-crenshaw',
    name: 'Dan Crenshaw',
    role: 'U.S. Representative (TX-02)',
    party: 'Republican',
    districtCode: 'TX-02',
    photoUrl: '/images/officials/off-fed-crenshaw.jpg',
    svgX: 574,
    svgY: 456,
    region: 'Houston Metro',
    countiesServed: ['Harris County (North)', 'Montgomery County (part)'],
    keyVotes: {
      vouchers: 'Nay',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: '413 Cannon HOB, Washington, DC 20515',
    officialWebsite: 'https://crenshaw.house.gov/',
    bioSummary: 'Former Navy SEAL lieutenant commander. Serves on Energy & Commerce and House Intelligence committees focusing on national defense and domestic energy security.',
  },
  {
    id: 'pol-crockett',
    name: 'Jasmine Crockett',
    role: 'U.S. Representative (TX-30)',
    party: 'Democratic',
    districtCode: 'TX-30',
    photoUrl: '/images/officials/off-fed-crockett.jpg',
    svgX: 538,
    svgY: 392,
    region: 'North Texas',
    countiesServed: ['Dallas County (South / Downtown)', 'Tarrant County (part)'],
    keyVotes: {
      vouchers: 'Nay',
      border: 'Nay',
      propertyTax: 'Yea',
    },
    officeAddress: '1607 Longworth HOB, Washington, DC 20515',
    officialWebsite: 'https://crockett.house.gov/',
    bioSummary: 'Former Texas State Representative and civil rights attorney. Prominent member of House Oversight Committee focusing on judicial ethics and criminal justice reform.',
  },
  {
    id: 'pol-abbott',
    name: 'Greg Abbott',
    role: 'Governor of Texas',
    party: 'Republican',
    districtCode: 'Statewide',
    photoUrl: '/images/officials/off-txgov-abbott.jpg',
    svgX: 520,
    svgY: 442,
    region: 'Central Texas',
    countiesServed: ['All 254 Texas Counties'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: 'Texas State Capitol, 1100 Congress Ave, Austin, TX 78701',
    officialWebsite: 'https://gov.texas.gov/',
    bioSummary: '48th Governor of Texas serving third term. Former Texas Attorney General and Texas Supreme Court Justice. Champion of Operation Lone Star and universal school choice ESA legislation.',
  },
  {
    id: 'pol-paxton',
    name: 'Ken Paxton',
    role: 'Texas Attorney General',
    party: 'Republican',
    districtCode: 'Statewide',
    photoUrl: '/images/officials/off-txgov-paxton.jpg',
    svgX: 524,
    svgY: 444,
    region: 'Central Texas',
    countiesServed: ['All 254 Texas Counties'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: '300 W. 15th St, Austin, TX 78701',
    officialWebsite: 'https://www.texasattorneygeneral.gov/',
    bioSummary: 'Serving third term as Attorney General. Litigated major federal challenges regarding state border authority, Title IX enforcement, and federal regulatory mandates.',
  },
  {
    id: 'pol-patrick',
    name: 'Dan Patrick',
    role: 'Lieutenant Governor of Texas',
    party: 'Republican',
    districtCode: 'Statewide',
    photoUrl: '/images/officials/off-txgov-patrick.jpg',
    svgX: 522,
    svgY: 440,
    region: 'Central Texas',
    countiesServed: ['All 254 Texas Counties'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: 'Texas Senate, 1100 Congress Ave, Austin, TX 78701',
    officialWebsite: 'https://www.ltgov.texas.gov/',
    bioSummary: 'President of the Texas Senate presiding over 31 state senators. Sets legislative priorities including property tax compression, school safety, and energy fund expansion.',
  },
  {
    id: 'pol-blacklock',
    name: 'Jimmy Blacklock',
    role: 'Texas Supreme Court Justice',
    party: 'Republican',
    districtCode: 'Statewide',
    photoUrl: '/images/officials/off-txjud-blacklock.jpg',
    svgX: 526,
    svgY: 442,
    region: 'Central Texas',
    countiesServed: ['All 254 Texas Counties'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: 'Supreme Court Building, 201 W. 14th St, Austin, TX 78701',
    officialWebsite: 'https://www.txcourts.gov/supreme/',
    bioSummary: 'Appointed in 2018; former General Counsel to Governor Greg Abbott. Specializes in administrative law, separation of powers, and constitutional statutory interpretation.',
  },
  {
    id: 'pol-parker',
    name: 'Tan Parker',
    role: 'Texas State Senator (SD-12)',
    party: 'Republican',
    districtCode: 'SD-12',
    photoUrl: '/images/officials/off-txsen-parker.jpg',
    svgX: 530,
    svgY: 376,
    region: 'North Texas',
    countiesServed: ['Denton County', 'Tarrant County (part)', 'Wise County'],
    keyVotes: {
      vouchers: 'Yea',
      border: 'Yea',
      propertyTax: 'Yea',
    },
    officeAddress: 'Texas State Capitol, Room E1.708, Austin, TX 78701',
    officialWebsite: 'https://senate.texas.gov/member.php?d=12',
    bioSummary: 'State Senator representing Senate District 12 across Denton, Wise, and northern Tarrant counties. Former House member championing artificial intelligence governance and financial technology.',
  },
];

export interface TexasMapSection {
  id: string;
  name: string;
  code: string;
  path: string;
  center: { x: number; y: number };
  districts: string[];
  counties: string[];
  party: string;
  turnout: string;
  vouchers: string;
  border: string;
  propertyTax: string;
}

export const TEXAS_MAP_SECTIONS: TexasMapSection[] = [
  {
    "id": "panhandle",
    "name": "Panhandle & South Plains",
    "code": "PANHANDLE",
    "path": "M 460 320 L 526 320 L 526 392 L 460 392 Z",
    "center": {
      "x": 495,
      "y": 355
    },
    "districts": [
      "TX-13",
      "TX-19"
    ],
    "counties": [
      "Potter",
      "Randall",
      "Lubbock",
      "Moore",
      "Dallam",
      "Hutchinson"
    ],
    "party": "Republican",
    "turnout": "61.2%",
    "vouchers": "Pro-ESA Voucher",
    "border": "Strong Border Enforcement",
    "propertyTax": "Yea"
  },
  {
    "id": "west_texas",
    "name": "West Texas & El Paso",
    "code": "WEST_TX",
    "path": "M 395 392 L 482 392 L 482 460 L 440 470 L 395 430 Z",
    "center": {
      "x": 445,
      "y": 425
    },
    "districts": [
      "TX-16",
      "TX-23",
      "TX-11"
    ],
    "counties": [
      "El Paso",
      "Midland",
      "Ector",
      "Tom Green",
      "Pecos",
      "Brewster"
    ],
    "party": "Competitive / Swing",
    "turnout": "58.4%",
    "vouchers": "Anti-Voucher Coalition",
    "border": "Strong Border Enforcement",
    "propertyTax": "Yea"
  },
  {
    "id": "north_texas",
    "name": "North Texas & DFW Metroplex",
    "code": "NORTH_TX",
    "path": "M 515 350 L 572 350 L 572 408 L 515 408 Z",
    "center": {
      "x": 538,
      "y": 380
    },
    "districts": [
      "TX-26",
      "TX-12",
      "TX-24",
      "TX-30",
      "TX-32",
      "TX-33"
    ],
    "counties": [
      "Dallas",
      "Tarrant",
      "Denton",
      "Collin",
      "Wise",
      "Cooke",
      "Parker"
    ],
    "party": "Competitive / Swing",
    "turnout": "65.8%",
    "vouchers": "Pro-ESA Voucher",
    "border": "Strong Border Enforcement",
    "propertyTax": "Yea"
  },
  {
    "id": "east_texas",
    "name": "East Texas & Piney Woods",
    "code": "EAST_TX",
    "path": "M 572 350 L 640 350 L 640 435 L 572 435 Z",
    "center": {
      "x": 598,
      "y": 395
    },
    "districts": [
      "TX-01",
      "TX-04"
    ],
    "counties": [
      "Smith",
      "Gregg",
      "Harrison",
      "Bowie",
      "Rusk",
      "Upshur"
    ],
    "party": "Republican",
    "turnout": "63.9%",
    "vouchers": "Pro-ESA Voucher",
    "border": "Strong Border Enforcement",
    "propertyTax": "Yea"
  },
  {
    "id": "central_texas",
    "name": "Central Texas & Capital Metro",
    "code": "CENTRAL_TX",
    "path": "M 505 408 L 560 408 L 560 460 L 505 460 Z",
    "center": {
      "x": 532,
      "y": 434
    },
    "districts": [
      "TX-10",
      "TX-37",
      "TX-35",
      "TX-17"
    ],
    "counties": [
      "Travis",
      "Williamson",
      "Bastrop",
      "Brazos",
      "Lee",
      "Burleson",
      "Bell",
      "McLennan"
    ],
    "party": "Democratic",
    "turnout": "69.4%",
    "vouchers": "Anti-Voucher Coalition",
    "border": "Constitutional Scrutiny",
    "propertyTax": "Yea"
  },
  {
    "id": "houston_metro",
    "name": "Houston Metro & Upper Gulf Coast",
    "code": "HOUSTON_METRO",
    "path": "M 560 415 L 640 415 L 640 495 L 560 495 Z",
    "center": {
      "x": 585,
      "y": 458
    },
    "districts": [
      "TX-02",
      "TX-07",
      "TX-08",
      "TX-09",
      "TX-18",
      "TX-29",
      "TX-36",
      "TX-38"
    ],
    "counties": [
      "Harris",
      "Fort Bend",
      "Montgomery",
      "Galveston",
      "Brazoria",
      "Jefferson"
    ],
    "party": "Democratic",
    "turnout": "62.7%",
    "vouchers": "Anti-Voucher Coalition",
    "border": "Constitutional Scrutiny",
    "propertyTax": "Yea"
  },
  {
    "id": "hill_country",
    "name": "San Antonio & Texas Hill Country",
    "code": "HILL_COUNTRY",
    "path": "M 465 440 L 515 440 L 515 492 L 465 492 Z",
    "center": {
      "x": 495,
      "y": 466
    },
    "districts": [
      "TX-21",
      "TX-20",
      "TX-28"
    ],
    "counties": [
      "Bexar",
      "Comal",
      "Kendall",
      "Kerr",
      "Gillespie",
      "Hays",
      "Medina"
    ],
    "party": "Republican",
    "turnout": "64.1%",
    "vouchers": "Anti-Voucher Coalition",
    "border": "Strong Border Enforcement",
    "propertyTax": "Yea"
  },
  {
    "id": "south_texas",
    "name": "South Texas & Rio Grande Valley",
    "code": "SOUTH_TX",
    "path": "M 465 490 L 585 490 L 585 550 L 465 550 Z",
    "center": {
      "x": 525,
      "y": 518
    },
    "districts": [
      "TX-15",
      "TX-27",
      "TX-34"
    ],
    "counties": [
      "Hidalgo",
      "Cameron",
      "Webb",
      "Nueces",
      "Starr",
      "Willacy"
    ],
    "party": "Competitive / Swing",
    "turnout": "54.6%",
    "vouchers": "Anti-Voucher Coalition",
    "border": "Constitutional Scrutiny",
    "propertyTax": "Yea"
  }
];
