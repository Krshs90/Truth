const fs = require('fs');

let content = fs.readFileSync('src/data/officials.ts', 'utf8');
const target = '// ==================== TEXAS STATE HOUSE OF REPRESENTATIVES ====================';
const addition = `  {
    id: 'off-txsen-parker',
    name: 'Tan Parker',
    office: 'Texas State Senator (District 12)',
    jurisdiction: 'Texas Senate',
    district: 'Senate District 12 (Denton, Tarrant & Wise Counties)',
    party: 'Republican',
    photoUrl: '/images/officials/off-txsen-parker.svg',
    officialWebsite: 'https://senate.texas.gov/member.php?d=12',
    officialProfileUrl: 'https://capitol.texas.gov/Members/MemberInfo.aspx?Leg=88&Chamber=S&Code=A1205',
    officeAddress: 'Capitol Extension, Room E1.712, Austin, TX 78701',
    phone: '(512) 463-0112',
    termExpires: 'January 2027',
    bioSummary: 'Serving Senate District 12 since 2023; previously served in the Texas House (2007-2023) representing District 63. Former Chair of Texas House Investments & Financial Services. Focuses on economic competitiveness, infrastructure, parental empowerment in education, and public safety.',
    recentVotes: [
      {
        billNumber: 'TX 88(2C) SB 2',
        billTitle: 'Property Tax Relief Act',
        vote: 'Yea',
        voteDate: '2023-07-12',
        sourceUrl: 'https://journals.senate.texas.gov/sjrnl/882/pdf/88S2SJ07-12-F.PDF',
      },
      {
        billNumber: 'TX 88(4C) SB 4',
        billTitle: 'Illegal Border Entry State Enforcement',
        vote: 'Yea',
        voteDate: '2023-11-14',
        sourceUrl: 'https://journals.senate.texas.gov/sjrnl/884/pdf/88S4SJ11-14-F.PDF',
      },
    ],
    sponsoredBills: [
      {
        billNumber: 'SB 1057',
        billTitle: 'Project Financing and Economic Development Zones',
        status: 'Enacted',
        officialUrl: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=SB1057',
      },
    ],
    lastVerifiedAt: '2024-11-15',
  },

  `;

if (!content.includes('off-txsen-parker')) {
  content = content.replace(target, addition + target);
  fs.writeFileSync('src/data/officials.ts', content, 'utf8');
  console.log('Successfully added Tan Parker to officials.ts');
} else {
  console.log('Tan Parker already in officials.ts');
}
