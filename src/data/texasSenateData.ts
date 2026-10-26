export interface TexasSenateDistrict {
  id: string;
  districtNumber: number;
  code: string;
  name: string;
  senator: string;
  party: 'Republican' | 'Democratic';
  lat: number;
  lng: number;
  region: string;
  majorCounties: string[];
  keyCities: string[];
  keyVotes: {
    vouchers: 'Yea' | 'Nay';
    border: 'Yea' | 'Nay';
    propertyTax: 'Yea' | 'Nay';
  };
  bioExcerpt: string;
  website: string;
}

export const TEXAS_SENATE_DISTRICTS: TexasSenateDistrict[] = [
  {
    "id": "tx-sd-01",
    "districtNumber": 1,
    "code": "SD-01",
    "name": "Senate District 1: Northeast Texas & Sabine Basin",
    "senator": "Bryan Hughes",
    "party": "Republican",
    "lat": 32.85,
    "lng": -94.75,
    "region": "East Texas",
    "majorCounties": [
      "Smith",
      "Bowie",
      "Harrison",
      "Gregg",
      "Cass",
      "Upshur",
      "Rusk",
      "Panola",
      "Red River",
      "Camp",
      "Titus",
      "Franklin",
      "Morris",
      "Marion",
      "Wood",
      "Shelby"
    ],
    "keyCities": [
      "Tyler",
      "Longview",
      "Texarkana",
      "Marshall",
      "Mount Pleasant"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairman of the Senate Committee on State Affairs. Champions traditional conservative judicial reforms, property tax relief, and strong border defense.",
    "website": "https://senate.texas.gov/member.php?d=1"
  },
  {
    "id": "tx-sd-02",
    "districtNumber": 2,
    "code": "SD-02",
    "name": "Senate District 2: East DFW & Upper Sabine",
    "senator": "Bob Hall",
    "party": "Republican",
    "lat": 32.88,
    "lng": -95.95,
    "region": "North Texas",
    "majorCounties": [
      "Dallas (part)",
      "Rockwall",
      "Kaufman",
      "Van Zandt",
      "Hopkins",
      "Rains",
      "Fannin",
      "Hunt"
    ],
    "keyCities": [
      "Rockwall",
      "Greenville",
      "Terrell",
      "Canton",
      "Sulphur Springs"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Electrical engineer and U.S. Air Force veteran. Focuses on electrical grid hardening, healthcare freedom, and strict fiscal discipline.",
    "website": "https://senate.texas.gov/member.php?d=2"
  },
  {
    "id": "tx-sd-03",
    "districtNumber": 3,
    "code": "SD-03",
    "name": "Senate District 3: Deep East Texas & Piney Woods",
    "senator": "Robert Nichols",
    "party": "Republican",
    "lat": 31.5,
    "lng": -94.7,
    "region": "East Texas",
    "majorCounties": [
      "Nacogdoches",
      "Angelina",
      "Cherokee",
      "Houston",
      "Jasper",
      "Newton",
      "Polk",
      "Sabine",
      "San Augustine",
      "San Jacinto",
      "Trinity",
      "Tyler",
      "Anderson",
      "Henderson"
    ],
    "keyCities": [
      "Lufkin",
      "Nacogdoches",
      "Palestine",
      "Jasper",
      "Livingston"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Licensed professional engineer and longtime Chairman of Senate Transportation. Notable for protecting rural public school district funding.",
    "website": "https://senate.texas.gov/member.php?d=3"
  },
  {
    "id": "tx-sd-04",
    "districtNumber": 4,
    "code": "SD-04",
    "name": "Senate District 4: Montgomery & Upper Gulf Coast",
    "senator": "Brandon Creighton",
    "party": "Republican",
    "lat": 30.15,
    "lng": -94.95,
    "region": "Houston Metro",
    "majorCounties": [
      "Montgomery (part)",
      "Chambers",
      "Jefferson (part)",
      "Galveston (part)"
    ],
    "keyCities": [
      "The Woodlands",
      "Conroe",
      "Beaumont (part)",
      "Port Arthur"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairman of Senate Education Committee. Lead architect of Senate universal education freedom accounts and higher education DEI reforms.",
    "website": "https://senate.texas.gov/member.php?d=4"
  },
  {
    "id": "tx-sd-05",
    "districtNumber": 5,
    "code": "SD-05",
    "name": "Senate District 5: Central Texas & Brazos Valley",
    "senator": "Charles Schwertner",
    "party": "Republican",
    "lat": 30.7,
    "lng": -96.9,
    "region": "Central Texas",
    "majorCounties": [
      "Williamson (part)",
      "Brazos",
      "Milam",
      "Robertson",
      "Walker",
      "Grimes",
      "Madison",
      "Leon"
    ],
    "keyCities": [
      "Georgetown",
      "Round Rock (part)",
      "College Station",
      "Bryan",
      "Huntsville"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Orthopedic surgeon and Chairman of Senate Business & Commerce. Champion of competitive power grid expansion and medical tort reform.",
    "website": "https://senate.texas.gov/member.php?d=5"
  },
  {
    "id": "tx-sd-06",
    "districtNumber": 6,
    "code": "SD-06",
    "name": "Senate District 6: East Houston & Ship Channel",
    "senator": "Carol Alvarado",
    "party": "Democratic",
    "lat": 29.74,
    "lng": -95.25,
    "region": "Houston Metro",
    "majorCounties": [
      "Harris (East)"
    ],
    "keyCities": [
      "Houston (East End)",
      "Pasadena",
      "Baytown",
      "Galena Park",
      "Jacinto City"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Leader of the Senate Democratic Caucus. Champion of port infrastructure, environmental protection in petrochemical corridors, and voting rights.",
    "website": "https://senate.texas.gov/member.php?d=6"
  },
  {
    "id": "tx-sd-07",
    "districtNumber": 7,
    "code": "SD-07",
    "name": "Senate District 7: West & Northwest Harris County",
    "senator": "Paul Bettencourt",
    "party": "Republican",
    "lat": 29.95,
    "lng": -95.6,
    "region": "Houston Metro",
    "majorCounties": [
      "Harris (West & Northwest)"
    ],
    "keyCities": [
      "Spring",
      "Tomball",
      "Cypress",
      "Jersey Village",
      "Katy (part)"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairman of Senate Local Government Committee. Primary author of Texas SB 2 historic  property tax compression and homestead exemptions.",
    "website": "https://senate.texas.gov/member.php?d=7"
  },
  {
    "id": "tx-sd-08",
    "districtNumber": 8,
    "code": "SD-08",
    "name": "Senate District 8: Collin & North Dallas Suburbs",
    "senator": "Angela Paxton",
    "party": "Republican",
    "lat": 33.15,
    "lng": -96.7,
    "region": "North Texas",
    "majorCounties": [
      "Collin (part)",
      "Dallas (part)"
    ],
    "keyCities": [
      "McKinney",
      "Plano (part)",
      "Frisco (part)",
      "Allen",
      "Prosper"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Former public high school math and guidance educator. Focuses on tech innovation, parental rights in education, and human trafficking prevention.",
    "website": "https://senate.texas.gov/member.php?d=8"
  },
  {
    "id": "tx-sd-09",
    "districtNumber": 9,
    "code": "SD-09",
    "name": "Senate District 9: Tarrant & Dallas Mid-Cities",
    "senator": "Kelly Hancock",
    "party": "Republican",
    "lat": 32.85,
    "lng": -97.15,
    "region": "North Texas",
    "majorCounties": [
      "Tarrant (Northeast)",
      "Dallas (Northwest)"
    ],
    "keyCities": [
      "Fort Worth (part)",
      "North Richland Hills",
      "Euless",
      "Bedford",
      "Hurst",
      "Southlake",
      "Grapevine"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Senate President Pro Tempore and small business owner. Focused on free-market deregulation, constitutional protections, and corporate tax reform.",
    "website": "https://senate.texas.gov/member.php?d=9"
  },
  {
    "id": "tx-sd-10",
    "districtNumber": 10,
    "code": "SD-10",
    "name": "Senate District 10: Tarrant South & West Suburbs",
    "senator": "Phil King",
    "party": "Republican",
    "lat": 32.65,
    "lng": -97.55,
    "region": "North Texas",
    "majorCounties": [
      "Tarrant (South & West)",
      "Parker",
      "Johnson",
      "Palo Pinto",
      "Stephens"
    ],
    "keyCities": [
      "Weatherford",
      "Cleburne",
      "Fort Worth (part)",
      "Arlington (part)",
      "Burleson"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Former police officer and attorney. Vice Chairman of Senate Border Security and advocate for law enforcement resources and grid reliability.",
    "website": "https://senate.texas.gov/member.php?d=10"
  },
  {
    "id": "tx-sd-11",
    "districtNumber": 11,
    "code": "SD-11",
    "name": "Senate District 11: Galveston County & Brazoria Coast",
    "senator": "Mayes Middleton",
    "party": "Republican",
    "lat": 29.4,
    "lng": -95.05,
    "region": "Houston Metro",
    "majorCounties": [
      "Galveston",
      "Brazoria (part)",
      "Harris (southeast)"
    ],
    "keyCities": [
      "Galveston",
      "League City",
      "Pearland (part)",
      "Friendswood",
      "Texas City"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairman of Senate Administration. Staunch advocate for constitutional liberties, energy industry deregulation, and coastal spine storm surge barriers.",
    "website": "https://senate.texas.gov/member.php?d=11"
  },
  {
    "id": "tx-sd-12",
    "districtNumber": 12,
    "code": "SD-12",
    "name": "Senate District 12: Denton & Northern Tarrant County",
    "senator": "Tan Parker",
    "party": "Republican",
    "lat": 33.05,
    "lng": -97.1,
    "region": "North Texas",
    "majorCounties": [
      "Denton (part)",
      "Tarrant (north)",
      "Wise (part)"
    ],
    "keyCities": [
      "Denton",
      "Flower Mound",
      "Lewisville",
      "Highland Village",
      "Carrollton (part)"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Former Texas Sunset Advisory Commission Chairman. Champion of digital economy legislation, cybersecurity infrastructure, and economic freedom.",
    "website": "https://senate.texas.gov/member.php?d=12"
  },
  {
    "id": "tx-sd-13",
    "districtNumber": 13,
    "code": "SD-13",
    "name": "Senate District 13: Central & South Houston",
    "senator": "Borris Miles",
    "party": "Democratic",
    "lat": 29.68,
    "lng": -95.4,
    "region": "Houston Metro",
    "majorCounties": [
      "Harris (South & Central)",
      "Fort Bend (part)"
    ],
    "keyCities": [
      "Houston (Third Ward, Sunnyside, Medical Center)",
      "Missouri City"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Senior member of Senate Finance. Dedicated advocate for urban public healthcare, flood prevention infrastructure, and historically underserved neighborhoods.",
    "website": "https://senate.texas.gov/member.php?d=13"
  },
  {
    "id": "tx-sd-14",
    "districtNumber": 14,
    "code": "SD-14",
    "name": "Senate District 14: Austin & Travis County Core",
    "senator": "Sarah Eckhardt",
    "party": "Democratic",
    "lat": 30.28,
    "lng": -97.72,
    "region": "Central Texas",
    "majorCounties": [
      "Travis (Central & East)",
      "Bastrop"
    ],
    "keyCities": [
      "Austin",
      "Pflugerville",
      "Manor",
      "Bastrop"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Former Travis County Judge. Expert in county governance, progressive criminal justice reform, clean energy, and robust funding for public schools.",
    "website": "https://senate.texas.gov/member.php?d=14"
  },
  {
    "id": "tx-sd-15",
    "districtNumber": 15,
    "code": "SD-15",
    "name": "Senate District 15: Central & North Harris County",
    "senator": "Molly Cook",
    "party": "Democratic",
    "lat": 29.8,
    "lng": -95.38,
    "region": "Houston Metro",
    "majorCounties": [
      "Harris (North & Central)"
    ],
    "keyCities": [
      "Houston (Montrose, Heights, Near Northside, Acres Homes)"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Emergency room nurse and community organizer. First openly LGBTQ+ member of the Texas Senate, focusing on healthcare access, worker safety, and public transit.",
    "website": "https://senate.texas.gov/member.php?d=15"
  },
  {
    "id": "tx-sd-16",
    "districtNumber": 16,
    "code": "SD-16",
    "name": "Senate District 16: North & East Dallas County",
    "senator": "Nathan Johnson",
    "party": "Democratic",
    "lat": 32.92,
    "lng": -96.75,
    "region": "North Texas",
    "majorCounties": [
      "Dallas (North & East)"
    ],
    "keyCities": [
      "North Dallas",
      "Richardson",
      "Garland",
      "Rowlett",
      "Addison"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Commercial attorney and music composer. Focuses on pragmatic bipartisan policymaking, electric grid reform, healthcare access, and water infrastructure.",
    "website": "https://senate.texas.gov/member.php?d=16"
  },
  {
    "id": "tx-sd-17",
    "districtNumber": 17,
    "code": "SD-17",
    "name": "Senate District 17: Southwest Houston, Fort Bend & Brazoria",
    "senator": "Joan Huffman",
    "party": "Republican",
    "lat": 29.55,
    "lng": -95.45,
    "region": "Houston Metro",
    "majorCounties": [
      "Harris (part)",
      "Fort Bend (part)",
      "Brazoria (part)"
    ],
    "keyCities": [
      "Sugar Land (part)",
      "Pearland (part)",
      "West University Place",
      "Bellaire",
      "Lake Jackson"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairwoman of the Senate Finance Committee and former state district court judge. Chief author of state budget, redistricting maps, and judicial reforms.",
    "website": "https://senate.texas.gov/member.php?d=17"
  },
  {
    "id": "tx-sd-18",
    "districtNumber": 18,
    "code": "SD-18",
    "name": "Senate District 18: Coastal Bend & Rural Gulf Corridor",
    "senator": "Lois Kolkhorst",
    "party": "Republican",
    "lat": 29.15,
    "lng": -96.5,
    "region": "Central Texas",
    "majorCounties": [
      "Washington",
      "Austin",
      "Colorado",
      "Fayette",
      "Lavaca",
      "Wharton",
      "Matagorda",
      "Jackson",
      "Victoria",
      "Calhoun",
      "Aransas",
      "Refugio",
      "Goliad",
      "DeWitt",
      "Gonzales",
      "Waller"
    ],
    "keyCities": [
      "Brenham",
      "Victoria",
      "Bay City",
      "Port Lavaca",
      "Columbus",
      "El Campo"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Chairwoman of Senate Health & Human Services Committee. Champion of private property rights, agricultural heritage, and rural hospital solvency.",
    "website": "https://senate.texas.gov/member.php?d=18"
  },
  {
    "id": "tx-sd-19",
    "districtNumber": 19,
    "code": "SD-19",
    "name": "Senate District 19: Far West Texas & South Texas Border",
    "senator": "Roland Gutierrez",
    "party": "Democratic",
    "lat": 29.5,
    "lng": -101.5,
    "region": "West Texas & El Paso",
    "majorCounties": [
      "Bexar (South)",
      "Maverick",
      "Val Verde",
      "Brewster",
      "Presidio",
      "Jeff Davis",
      "Pecos",
      "Terrell",
      "Crockett",
      "Kinney",
      "Uvalde",
      "Zavala",
      "Dimmit",
      "Frio",
      "Medina",
      "Real",
      "Edwards"
    ],
    "keyCities": [
      "San Antonio (South Side)",
      "Del Rio",
      "Eagle Pass",
      "Uvalde",
      "Alpine",
      "Marfa"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Immigration attorney and advocate for public school safety reforms, gun violence prevention, and expanded healthcare access along the border.",
    "website": "https://senate.texas.gov/member.php?d=19"
  },
  {
    "id": "tx-sd-20",
    "districtNumber": 20,
    "code": "SD-20",
    "name": "Senate District 20: Coastal Bend & Lower Rio Grande Valley",
    "senator": "Juan Hinojosa",
    "party": "Democratic",
    "lat": 27.2,
    "lng": -97.8,
    "region": "Rio Grande Valley",
    "majorCounties": [
      "Nueces",
      "Jim Wells",
      "Brooks",
      "Hidalgo (part)"
    ],
    "keyCities": [
      "Corpus Christi",
      "McAllen (part)",
      "Edinburg (part)",
      "Alice",
      "Falfurrias"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "U.S. Marine Corps Vietnam veteran and Vice Chairman of Senate Finance. Proven bipartisan leader securing major funding for UTRGV and Coastal Bend ports.",
    "website": "https://senate.texas.gov/member.php?d=20"
  },
  {
    "id": "tx-sd-21",
    "districtNumber": 21,
    "code": "SD-21",
    "name": "Senate District 21: Laredo & Central-South Corridor",
    "senator": "Judith Zaffirini",
    "party": "Democratic",
    "lat": 28.5,
    "lng": -98.8,
    "region": "South Texas / RGV",
    "majorCounties": [
      "Webb",
      "Zapata",
      "Starr",
      "Duval",
      "Jim Hogg",
      "Karnes",
      "Atascosa",
      "Wilson",
      "Bee",
      "Live Oak",
      "McMullen",
      "La Salle",
      "Caldwell",
      "Travis (part)",
      "Hays (part)"
    ],
    "keyCities": [
      "Laredo",
      "Rio Grande City",
      "Lockhart",
      "San Marcos (part)",
      "Pleasanton"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Dean of the Texas Senate and the first Hispanic woman elected to the Texas Senate. Holds an unbroken 100% voting attendance record spanning over 70,000 votes.",
    "website": "https://senate.texas.gov/member.php?d=21"
  },
  {
    "id": "tx-sd-22",
    "districtNumber": 22,
    "code": "SD-22",
    "name": "Senate District 22: Central Texas Heart & Brazos Corridor",
    "senator": "Brian Birdwell",
    "party": "Republican",
    "lat": 31.8,
    "lng": -97.4,
    "region": "Central Texas",
    "majorCounties": [
      "McLennan",
      "Ellis (part)",
      "Navarro",
      "Hill",
      "Bosque",
      "Somervell",
      "Hood (part)",
      "Erath",
      "Hamilton",
      "Falls",
      "Limestone"
    ],
    "keyCities": [
      "Waco",
      "Corsicana",
      "Hillsboro",
      "Stephenville",
      "Granbury"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Decorated U.S. Army veteran and survivor of the 9/11 Pentagon attack. Chairman of Senate Natural Resources & Economic Development.",
    "website": "https://senate.texas.gov/member.php?d=22"
  },
  {
    "id": "tx-sd-23",
    "districtNumber": 23,
    "code": "SD-23",
    "name": "Senate District 23: Central & South Dallas County",
    "senator": "Royce West",
    "party": "Democratic",
    "lat": 32.7,
    "lng": -96.82,
    "region": "North Texas",
    "majorCounties": [
      "Dallas (Central, South & West)"
    ],
    "keyCities": [
      "Dallas (Downtown, Oak Cliff, Fair Park)",
      "DeSoto",
      "Cedar Hill",
      "Duncanville",
      "Lancaster"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Senior Texas legislator serving since 1993. Champion for higher education access, juvenile justice reform, and economic revitalization of southern Dallas.",
    "website": "https://senate.texas.gov/member.php?d=23"
  },
  {
    "id": "tx-sd-24",
    "districtNumber": 24,
    "code": "SD-24",
    "name": "Senate District 24: Texas Hill Country & Highland Lakes",
    "senator": "Pete Flores",
    "party": "Republican",
    "lat": 31,
    "lng": -98.7,
    "region": "Central Texas",
    "majorCounties": [
      "Bell (part)",
      "Coryell",
      "Lampasas",
      "Burnet",
      "Llano",
      "San Saba",
      "Mills",
      "McCulloch",
      "Concho",
      "Coleman",
      "Brown",
      "Callahan",
      "Bandera",
      "Medina (part)",
      "Gillespie",
      "Kerr (part)"
    ],
    "keyCities": [
      "Killeen",
      "Temple",
      "Brownwood",
      "Burnet",
      "Marble Falls",
      "Gatesville"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "First Hispanic Republican elected to the Texas Senate. Former Colonel and Game Warden Director with 27 years of state conservation service.",
    "website": "https://senate.texas.gov/member.php?d=24"
  },
  {
    "id": "tx-sd-25",
    "districtNumber": 25,
    "code": "SD-25",
    "name": "Senate District 25: Bexar North & I-35 Hill Country",
    "senator": "Donna Campbell",
    "party": "Republican",
    "lat": 29.8,
    "lng": -98.3,
    "region": "San Antonio & Hill Country",
    "majorCounties": [
      "Bexar (North)",
      "Comal",
      "Guadalupe",
      "Kendall",
      "Hays (part)",
      "Travis (part)"
    ],
    "keyCities": [
      "San Antonio (North)",
      "New Braunfels",
      "Seguin",
      "Boerne"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Board-certified emergency room physician. Chairwoman of Senate Nominations Committee, championing veteran benefits and conservative fiscal reforms.",
    "website": "https://senate.texas.gov/member.php?d=25"
  },
  {
    "id": "tx-sd-26",
    "districtNumber": 26,
    "code": "SD-26",
    "name": "Senate District 26: San Antonio & Bexar County Heart",
    "senator": "Jose Menendez",
    "party": "Democratic",
    "lat": 29.44,
    "lng": -98.52,
    "region": "San Antonio & Hill Country",
    "majorCounties": [
      "Bexar (Central, West & Northwest)"
    ],
    "keyCities": [
      "San Antonio (Downtown, Westside, Medical Center)",
      "Leon Valley",
      "Helotes"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Legislator since 2001. Champion of the Texas Compassionate Use Act (medical cannabis), public school finance reform, and small business support.",
    "website": "https://senate.texas.gov/member.php?d=26"
  },
  {
    "id": "tx-sd-27",
    "districtNumber": 27,
    "code": "SD-27",
    "name": "Senate District 27: Cameron County & Lower Rio Grande Valley",
    "senator": "Adam Hinojosa",
    "party": "Republican",
    "lat": 26.15,
    "lng": -97.55,
    "region": "Rio Grande Valley",
    "majorCounties": [
      "Cameron",
      "Willacy",
      "Kenedy",
      "Kleberg",
      "San Patricio (part)",
      "Hidalgo (part)"
    ],
    "keyCities": [
      "Brownsville",
      "Harlingen",
      "San Benito",
      "Raymondville",
      "Kingsville"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Small business owner and historic conservative elected to represent the Rio Grande Valley. Emphasizes economic diversification and cross-border trade security.",
    "website": "https://senate.texas.gov/member.php?d=27"
  },
  {
    "id": "tx-sd-28",
    "districtNumber": 28,
    "code": "SD-28",
    "name": "Senate District 28: South Plains & Permian Basin",
    "senator": "Charles Perry",
    "party": "Republican",
    "lat": 33.4,
    "lng": -101.9,
    "region": "Panhandle & South Plains",
    "majorCounties": [
      "Lubbock",
      "Hale",
      "Floyd",
      "Crosby",
      "Dickens",
      "Garza",
      "Lynn",
      "Terry",
      "Hockley",
      "Cochran",
      "Lamb",
      "Castro",
      "Swisher",
      "Taylor (part)",
      "Mitchell",
      "Nolan",
      "Fisher",
      "Scurry",
      "Jones",
      "Kent",
      "Stonewall",
      "Haskell",
      "Knox",
      "King",
      "Childress",
      "Cottle",
      "Foard",
      "Hardeman"
    ],
    "keyCities": [
      "Lubbock",
      "Sweetwater",
      "Plainview",
      "Snyder",
      "Levelland"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Certified Public Accountant and Chairman of Senate Water, Agriculture & Rural Affairs. Key protector of Texas rural groundwater supplies and ag economy.",
    "website": "https://senate.texas.gov/member.php?d=28"
  },
  {
    "id": "tx-sd-29",
    "districtNumber": 29,
    "code": "SD-29",
    "name": "Senate District 29: El Paso County & Trans-Pecos",
    "senator": "Cesar Blanco",
    "party": "Democratic",
    "lat": 31.75,
    "lng": -106.35,
    "region": "West Texas & El Paso",
    "majorCounties": [
      "El Paso",
      "Hudspeth",
      "Culberson"
    ],
    "keyCities": [
      "El Paso",
      "Socorro",
      "Horizon City",
      "Van Horn",
      "Fabens"
    ],
    "keyVotes": {
      "vouchers": "Nay",
      "border": "Nay",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "U.S. Navy veteran and attorney. Champion for binational trade logistics, veteran healthcare, cybersecurity workforce initiatives, and renewable energy.",
    "website": "https://senate.texas.gov/member.php?d=29"
  },
  {
    "id": "tx-sd-30",
    "districtNumber": 30,
    "code": "SD-30",
    "name": "Senate District 30: North Texas Red River & Upper Cross Timbers",
    "senator": "Brent Hagenbuch",
    "party": "Republican",
    "lat": 33.6,
    "lng": -97.4,
    "region": "North Texas",
    "majorCounties": [
      "Denton (part)",
      "Collin (part)",
      "Cooke",
      "Grayson",
      "Montague",
      "Clay",
      "Archer",
      "Wichita",
      "Young",
      "Jack",
      "Parker (part)"
    ],
    "keyCities": [
      "Wichita Falls",
      "Sherman",
      "Denison",
      "Gainesville",
      "Decatur (part)"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "U.S. Navy Civil Engineer Corps officer and transportation logistics CEO. Focuses on infrastructure funding, school choice, and lowering local property taxes.",
    "website": "https://senate.texas.gov/member.php?d=30"
  },
  {
    "id": "tx-sd-31",
    "districtNumber": 31,
    "code": "SD-31",
    "name": "Senate District 31: Texas Panhandle & Permian Energy Basin",
    "senator": "Kevin Sparks",
    "party": "Republican",
    "lat": 34,
    "lng": -102.3,
    "region": "Panhandle & South Plains",
    "majorCounties": [
      "Midland",
      "Ector",
      "Andrews",
      "Gaines",
      "Dawson",
      "Martin",
      "Howard",
      "Glasscock",
      "Upton",
      "Crane",
      "Winkler",
      "Loving",
      "Ward",
      "Reeves (part)",
      "Potter",
      "Randall",
      "Armstrong",
      "Carson",
      "Collingsworth",
      "Dallam",
      "Deaf Smith",
      "Donley",
      "Gray",
      "Hall",
      "Hansford",
      "Hartley",
      "Hemphill",
      "Hutchinson",
      "Lipscomb",
      "Moore",
      "Ochiltree",
      "Oldham",
      "Parmer",
      "Roberts",
      "Sherman",
      "Wheeler"
    ],
    "keyCities": [
      "Midland",
      "Odessa",
      "Amarillo",
      "Borger",
      "Pampa",
      "Hereford"
    ],
    "keyVotes": {
      "vouchers": "Yea",
      "border": "Yea",
      "propertyTax": "Yea"
    },
    "bioExcerpt": "Independent oil and natural gas producer from Midland. Leading conservative advocate for American energy independence and agricultural water rights.",
    "website": "https://senate.texas.gov/member.php?d=31"
  }
];
