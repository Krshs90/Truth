const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'officials.ts');
let content = fs.readFileSync(filePath, 'utf8');

const executiveAndJudicial = `  {
    id: 'off-txexec-hegar',
    name: 'Glenn Hegar',
    office: 'Comptroller of Public Accounts of Texas',
    jurisdiction: 'Texas Executive',
    district: 'Statewide (Texas)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txexec-hegar.svg',
    officialWebsite: 'https://comptroller.texas.gov/',
    officialProfileUrl: 'https://comptroller.texas.gov/about/hegar/',
    officeAddress: 'Lyndon B. Johnson State Office Building, 111 E. 17th St, Austin, TX 78774',
    phone: '(512) 463-4000',
    termExpires: 'January 2027',
    bioSummary: 'Serving as Texas Comptroller of Public Accounts since 2015. Chief financial officer of Texas, responsible for constitutional revenue estimates, state tax collections, and administration of the Texas Energy Fund and Broadband Development Office.',
    recentVotes: [],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txexec-miller',
    name: 'Sid Miller',
    office: 'Commissioner of Agriculture of Texas',
    jurisdiction: 'Texas Executive',
    district: 'Statewide (Texas)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txexec-miller.svg',
    officialWebsite: 'https://www.texasagriculture.gov/',
    officialProfileUrl: 'https://www.texasagriculture.gov/About/Commissioner-Miller',
    officeAddress: '1700 N. Congress Ave, 11th Floor, Austin, TX 78701',
    phone: '(512) 463-7476',
    termExpires: 'January 2027',
    bioSummary: 'Serving as Texas Agriculture Commissioner since 2015. Former 12-year member of the Texas House of Representatives. Oversees consumer protection, weights and measures, school nutrition programs, agricultural trade promotion, and border livestock inspections.',
    recentVotes: [],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txexec-craddick',
    name: 'Christi Craddick',
    office: 'Chairman, Railroad Commission of Texas',
    jurisdiction: 'Texas Executive',
    district: 'Statewide (Texas)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txexec-craddick.svg',
    officialWebsite: 'https://www.rrc.texas.gov/',
    officialProfileUrl: 'https://www.rrc.texas.gov/about-us/commissioners/craddick/',
    officeAddress: '1701 N Congress Ave, Austin, TX 78701',
    phone: '(512) 463-7140',
    termExpires: 'January 2031 (Re-elected Nov 2024)',
    bioSummary: 'Serving on the Railroad Commission of Texas since 2012. Regulates the Texas oil and gas industry, pipeline safety, natural gas utilities, and surface coal and uranium mining.',
    recentVotes: [],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txexec-buckingham',
    name: 'Dawn Buckingham',
    office: 'Commissioner of the General Land Office of Texas',
    jurisdiction: 'Texas Executive',
    district: 'Statewide (Texas)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txexec-buckingham.svg',
    officialWebsite: 'https://www.glo.texas.gov/',
    officialProfileUrl: 'https://www.glo.texas.gov/the-glo/about/commissioner/index.html',
    officeAddress: '1700 N Congress Ave, Austin, TX 78701',
    phone: '(512) 463-5001',
    termExpires: 'January 2027',
    bioSummary: 'First woman elected Texas Land Commissioner (2022). Former Texas State Senator for District 24 (2017-2023) and oculoplastic surgeon. Oversees the Alamo complex, Permanent School Fund mineral assets, coastal erosion protection, and state disaster recovery grants.',
    recentVotes: [],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },

  // ==================== SUPREME COURT OF TEXAS (JUDICIAL BRANCH) ====================
  {
    id: 'off-txjud-blacklock',
    name: 'Jimmy Blacklock',
    office: 'Justice, Supreme Court of Texas (Place 2)',
    jurisdiction: 'Texas Judicial',
    district: 'Statewide (Texas Supreme Court)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txjud-blacklock.svg',
    officialWebsite: 'https://www.txcourts.gov/supreme/',
    officialProfileUrl: 'https://www.txcourts.gov/supreme/about-the-court/justices/justice-jimmy-blacklock/',
    officeAddress: 'Supreme Court Building, 201 W. 14th St, Austin, TX 78701',
    phone: '(512) 463-1312',
    termExpires: 'December 2030 (Re-elected Nov 2024)',
    bioSummary: 'Appointed to the Supreme Court of Texas in January 2018 by Governor Greg Abbott; elected statewide in 2018 and re-elected in 2024. Former General Counsel to Governor Abbott and Assistant Attorney General. Landmark opinions include constitutional statutory scope of state executive emergency powers under the Texas Disaster Act (In re Abbott), local election administration and mail-in ballot procedures under the Texas Election Code (State v. Hollins), and procedural limits on civil contempt.',
    recentVotes: [
      {
        billNumber: 'No. 20-0291',
        billTitle: 'In re Greg Abbott, Governor of Texas (Executive Disaster Authority)',
        vote: 'Yea',
        voteDate: '2020-04-23',
        sourceUrl: 'https://www.txcourts.gov/supreme/',
      },
      {
        billNumber: 'No. 20-0729',
        billTitle: 'State of Texas v. Chris Hollins (Texas Election Code Ballot Procedures)',
        vote: 'Yea',
        voteDate: '2020-10-07',
        sourceUrl: 'https://www.txcourts.gov/supreme/',
      },
      {
        billNumber: 'No. 23-0994',
        billTitle: 'State of Texas v. Zurawski (Texas Human Life Protection Act Medical Exceptions)',
        vote: 'Yea',
        voteDate: '2024-05-31',
        sourceUrl: 'https://www.txcourts.gov/supreme/',
      },
    ],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txjud-hecht',
    name: 'Nathan L. Hecht',
    office: 'Chief Justice, Supreme Court of Texas',
    jurisdiction: 'Texas Judicial',
    district: 'Statewide (Texas Supreme Court)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txjud-hecht.svg',
    officialWebsite: 'https://www.txcourts.gov/supreme/',
    officialProfileUrl: 'https://www.txcourts.gov/supreme/about-the-court/justices/chief-justice-nathan-l-hecht/',
    officeAddress: 'Supreme Court Building, 201 W. 14th St, Austin, TX 78701',
    phone: '(512) 463-1312',
    termExpires: 'December 2026',
    bioSummary: 'Chief Justice of the Supreme Court of Texas since 2013 and member of the Court since 1989. Longest-serving justice in Texas Supreme Court history. Former President of the national Conference of Chief Justices. Championed electronic filing in Texas courts and indigent access to civil justice.',
    recentVotes: [
      {
        billNumber: 'No. 20-0729',
        billTitle: 'State of Texas v. Chris Hollins (Texas Election Code Procedures)',
        vote: 'Yea',
        voteDate: '2020-10-07',
        sourceUrl: 'https://www.txcourts.gov/supreme/',
      },
    ],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txjud-bland',
    name: 'Jane Bland',
    office: 'Justice, Supreme Court of Texas (Place 6)',
    jurisdiction: 'Texas Judicial',
    district: 'Statewide (Texas Supreme Court)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txjud-bland.svg',
    officialWebsite: 'https://www.txcourts.gov/supreme/',
    officialProfileUrl: 'https://www.txcourts.gov/supreme/about-the-court/justices/justice-jane-bland/',
    officeAddress: 'Supreme Court Building, 201 W. 14th St, Austin, TX 78701',
    phone: '(512) 463-1312',
    termExpires: 'December 2030 (Re-elected Nov 2024)',
    bioSummary: 'Appointed to the Supreme Court of Texas in 2019 by Governor Abbott and elected statewide in 2020 and 2024. Previously served 15 years on the First Court of Appeals in Houston. Chairs the Judicial Commission on Mental Health.',
    recentVotes: [
      {
        billNumber: 'No. 23-0994',
        billTitle: 'State of Texas v. Zurawski (Texas Statutory Medical Exception Construction)',
        vote: 'Yea',
        voteDate: '2024-05-31',
        sourceUrl: 'https://www.txcourts.gov/supreme/',
      },
    ],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },`;

const gillOfficial = `  {
    id: 'off-fed-gill',
    name: 'Brandon Gill',
    office: 'U.S. Representative (TX-26)',
    jurisdiction: 'Federal',
    district: 'U.S. Congressional District 26 (Denton, Cooke, Wise)',
    party: 'Republican',
    photoUrl: '/images/officials/off-fed-gill.svg',
    officialWebsite: 'https://gill.house.gov/',
    officialProfileUrl: 'https://www.congress.gov/member/brandon-gill/G000603',
    officeAddress: 'Longworth House Office Building, Washington, DC 20515',
    phone: '(202) 225-7772',
    termExpires: 'January 2027 (119th Congress)',
    bioSummary: 'Elected in November 2024 to represent Texas\\'s 26th Congressional District encompassing Denton, Wise, and Cooke counties in the 119th Congress. Conservative news founder and member of the House Freedom Caucus. Prioritizes border enforcement, eliminating illegal immigrant federal benefits, balancing the federal budget, and domestic energy production.',
    recentVotes: [
      {
        billNumber: 'H.R. 2',
        billTitle: 'Secure the Border Act of 2023',
        vote: 'Yea',
        voteDate: '2023-05-11',
        sourceUrl: 'https://clerk.house.gov/Votes/2023209',
      },
      {
        billNumber: 'H.R. 3684',
        billTitle: 'Infrastructure Investment and Jobs Act',
        vote: 'Nay',
        voteDate: '2021-11-05',
        sourceUrl: 'https://clerk.house.gov/Votes/2021369',
      },
    ],
    sponsoredBills: [
      {
        billNumber: 'H.R. 10268',
        billTitle: 'Restricting Federal SNAP & Welfare Benefits for Non-Citizens',
        status: 'Introduced',
        officialUrl: 'https://www.congress.gov/',
      },
    ],
    lastVerifiedAt: '2026-10-24',
  },`;

const houseOfficials = `  {
    id: 'off-txhouse-talarico',
    name: 'James Talarico',
    office: 'Texas State Representative (District 50)',
    jurisdiction: 'Texas House',
    district: 'House District 50 (North Austin, Pflugerville, Round Rock)',
    party: 'Democratic',
    photoUrl: '/images/officials/off-txhouse-talarico.svg',
    officialWebsite: 'https://house.texas.gov/members/member-page/?district=50',
    officialProfileUrl: 'https://capitol.texas.gov/Members/MemberInfo.aspx?Leg=88&Chamber=H&Code=A2950',
    officeAddress: 'Capitol Extension, Room E2.818, Austin, TX 78701',
    phone: '(512) 463-0821',
    termExpires: 'January 2027',
    bioSummary: 'Serving in the Texas House of Representatives since 2018. Former public school teacher and education non-profit director. Member of the House Public Education and Juvenile Justice & Family Issues committees. Key legislative leader opposing private school voucher expansion and author of HB 102 establishing capping insulin copays.',
    recentVotes: [
      {
        billNumber: 'TX 88(4C) HB 1',
        billTitle: 'Raney Amendment Striking School Vouchers',
        vote: 'Yea',
        voteDate: '2023-11-17',
        sourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
      },
      {
        billNumber: 'TX 88(R) HB 3',
        billTitle: 'School Safety Standards & Armed Security Mandate',
        vote: 'Nay',
        voteDate: '2023-04-25',
        sourceUrl: 'https://journals.house.texas.gov/hjrnl/88r/pdf/88RHJ04-25-F.PDF',
      },
    ],
    sponsoredBills: [
      {
        billNumber: 'HB 1548',
        billTitle: 'Public School Teacher Across-the-Board $10,000 Pay Raise',
        status: 'In Committee',
        officialUrl: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB1548',
      },
    ],
    lastVerifiedAt: '2026-10-24',
  },
  {
    id: 'off-txhouse-harrison',
    name: 'Brian Harrison',
    office: 'Texas State Representative (District 10)',
    jurisdiction: 'Texas House',
    district: 'House District 10 (Ellis County)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txhouse-harrison.svg',
    officialWebsite: 'https://house.texas.gov/members/member-page/?district=10',
    officialProfileUrl: 'https://capitol.texas.gov/Members/MemberInfo.aspx?Leg=88&Chamber=H&Code=A2510',
    officeAddress: 'Capitol Extension, Room E2.716, Austin, TX 78701',
    phone: '(512) 463-0516',
    termExpires: 'January 2027',
    bioSummary: 'Serving in the Texas House since 2021. Former Chief of Staff of the U.S. Department of Health and Human Services (HHS). Texas House Freedom Caucus leader focusing on eliminating executive agency rule-making overreach, border security enforcement, and cutting state expenditures.',
    recentVotes: [
      {
        billNumber: 'TX 88(4C) HB 1',
        billTitle: 'Raney Amendment Striking School Vouchers',
        vote: 'Nay',
        voteDate: '2023-11-17',
        sourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
      },
    ],
    sponsoredBills: [],
    lastVerifiedAt: '2026-10-24',
  },`;

const paxtonId = "id: 'off-txgov-paxton'";
const paxtonIdx = content.indexOf(paxtonId);
if (paxtonIdx === -1) {
  throw new Error("Could not find Paxton");
}

const paxtonClose = content.indexOf('},', paxtonIdx);
if (paxtonClose === -1) {
  throw new Error("Could not find Paxton closing brace");
}

content = content.slice(0, paxtonClose + 2) + '\n' + executiveAndJudicial + content.slice(paxtonClose + 2);

const doggettId = "id: 'off-fed-doggett'";
const doggettIdx = content.indexOf(doggettId);
if (doggettIdx === -1) {
  throw new Error("Could not find Doggett");
}
const doggettOpen = content.lastIndexOf('{', doggettIdx);
content = content.slice(0, doggettOpen) + gillOfficial + '\n  ' + content.slice(doggettOpen);

const lastClosing = content.lastIndexOf('];');
if (lastClosing === -1) {
  throw new Error("Could not find closing bracket");
}
content = content.slice(0, lastClosing) + houseOfficials + '\n' + content.slice(lastClosing);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated officials.ts with all Texas officials!');
