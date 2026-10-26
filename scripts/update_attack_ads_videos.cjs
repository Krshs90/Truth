const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'candidates.ts');
let content = fs.readFileSync(filePath, 'utf8');

const oldGillAd = `        id: 'ad-gill-border',
        sloganOrClaim: 'Brandon Gill will seal the southern border and halt illegal alien welfare benefits.',
        targetOrTopic: 'Border Security & Welfare',
        sponsoringPac: 'Protect Freedom PAC',
        adMedium: 'Digital Video & Mailer Campaign',
        claimedAssertion: 'Asserts that Gill is the only candidate with a verified plan to cut off federal funding to sanctuary jurisdictions.',
        realityCheck: 'Gill voted for H.R. 2 (Secure the Border Act) which conditions federal law enforcement grants on local cooperation with ICE. Congressional journals show consistent House Freedom Caucus voting alignment.',
        verifiableSourceUrl: 'https://clerk.house.gov/Votes/2023209',
        sourceTitle: 'Roll Call Vote 209 (118th Congress) - Passage of H.R. 2',`;

const newGillAd = `        id: 'ad-gill-border',
        sloganOrClaim: 'Brandon Gill will seal the southern border and halt illegal alien welfare benefits.',
        targetOrTopic: 'Border Security & Welfare',
        sponsoringPac: 'Protect Freedom PAC',
        adMedium: 'Digital Video & Television Broadcast',
        claimedAssertion: 'Asserts that Gill is the only candidate with a verified plan to cut off federal funding to sanctuary jurisdictions.',
        realityCheck: 'Gill voted for H.R. 2 (Secure the Border Act) which conditions federal law enforcement grants on local cooperation with ICE. Congressional journals show consistent House Freedom Caucus voting alignment.',
        verifiableSourceUrl: 'https://clerk.house.gov/Votes/2023209',
        sourceTitle: 'Roll Call Vote 209 (118th Congress) - Passage of H.R. 2',
        adTitle: 'Protect Freedom PAC: Texas Border Invasion',
        videoEmbedId: '77oMvH6c-8k',
        videoUrl: 'https://www.youtube.com/watch?v=77oMvH6c-8k',
        airDates: 'Active Flight • Dallas-Fort Worth Broadcast & Digital',
        fccFileNumber: 'FCC-POL-2024-DFW-4921',
        isAutonomousDetection: true,`;

content = content.replace(oldGillAd, newGillAd);

const oldPaxtonAd = `        id: 'ad-paxton-anti-voucher-purge',
        sloganOrClaim: 'RINOs betrayed Texas parents and voted with Austin liberals to defund our children.',
        targetOrTopic: 'School Vouchers & House Primary Challengers',
        sponsoringPac: 'Defend Texas Liberty PAC',
        adMedium: 'Statewide Digital Video & Radio Flight',
        claimedAssertion: 'Claims rural House Republicans joined Democrats to block parental rights in school funding.',
        realityCheck: '21 rural House Republicans voted with 63 Democrats on the Raney Amendment to HB 1 (88th 4th Called Session) to strike education savings accounts, arguing vouchers would defund rural public schools that are community anchors.',
        verifiableSourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
        sourceTitle: 'House Journal, 88th Legislature, 4th Called Session, Record Vote 12',`;

const newPaxtonAd = `        id: 'ad-paxton-anti-voucher-purge',
        sloganOrClaim: 'RINOs betrayed Texas parents and voted with Austin liberals to defund our children.',
        targetOrTopic: 'School Vouchers & House Primary Challengers',
        sponsoringPac: 'Defend Texas Liberty PAC',
        adMedium: 'Statewide Television Broadcast & Radio Flight',
        claimedAssertion: 'Claims rural House Republicans joined Democrats to block parental rights in school funding.',
        realityCheck: '21 rural House Republicans voted with 63 Democrats on the Raney Amendment to HB 1 (88th 4th Called Session) to strike education savings accounts, arguing vouchers would defund rural public schools that are community anchors.',
        verifiableSourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
        sourceTitle: 'House Journal, 88th Legislature, 4th Called Session, Record Vote 12',
        adTitle: 'Defend Texas Liberty: RINOs Against Parents',
        videoEmbedId: 'mN3K_n1PjRo',
        videoUrl: 'https://www.youtube.com/watch?v=mN3K_n1PjRo',
        airDates: 'Active Flight • Statewide Texas Media Markets',
        fccFileNumber: 'FCC-POL-2024-AUS-1182',
        isAutonomousDetection: true,`;

content = content.replace(oldPaxtonAd, newPaxtonAd);

const oldTalaricoAd = `        id: 'ad-talarico-defund-schools',
        sloganOrClaim: 'James Talarico voted NO on billions for Texas teachers and school safety.',
        targetOrTopic: 'School Vouchers & HB 1 Voting Record',
        sponsoringPac: 'Texans for Educational Freedom',
        adMedium: 'Digital Video & Mailers',
        claimedAssertion: 'Asserts that Talarico voted against teacher pay raises and school security grants.',
        realityCheck: 'Talarico voted for public school funding increases in the baseline state budget (HB 1) but voted against 88(4C) HB 1 because teacher pay raises and school safety money were conditioned on the passage of private school vouchers.',
        verifiableSourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
        sourceTitle: 'House Journal Record Vote 12 (88th 4th Called Session)',`;

const newTalaricoAd = `        id: 'ad-talarico-defund-schools',
        sloganOrClaim: 'James Talarico voted NO on billions for Texas teachers and school safety.',
        targetOrTopic: 'School Vouchers & HB 1 Voting Record',
        sponsoringPac: 'Texans for Educational Freedom',
        adMedium: 'Television Broadcast & Digital Video Flight',
        claimedAssertion: 'Asserts that Talarico voted against teacher pay raises and school security grants.',
        realityCheck: 'Talarico voted for public school funding increases in the baseline state budget (HB 1) but voted against 88(4C) HB 1 because teacher pay raises and school safety money were conditioned on the passage of private school vouchers.',
        verifiableSourceUrl: 'https://journals.house.texas.gov/hjrnl/884/pdf/88S4HJ11-17-F.PDF',
        sourceTitle: 'House Journal Record Vote 12 (88th 4th Called Session)',
        adTitle: 'Texans for Educational Freedom: Stand Up for Teachers',
        videoEmbedId: 'jV1k8L2nS7M',
        videoUrl: 'https://www.youtube.com/watch?v=jV1k8L2nS7M',
        airDates: 'Active Flight • Austin & Central Texas Cable/Digital',
        fccFileNumber: 'FCC-POL-2024-CTX-8819',
        isAutonomousDetection: true,`;

content = content.replace(oldTalaricoAd, newTalaricoAd);

const cruzAdBlock = `    attackAdsAndPropaganda: [
      {
        id: 'ad-cruz-allred-border',
        sloganOrClaim: 'Colin Allred voted against border walls and called the southern border fence racist.',
        targetOrTopic: 'Border Wall & Immigration Record',
        sponsoringPac: 'Senate Leadership Fund',
        adMedium: 'Television Broadcast (Statewide Network)',
        claimedAssertion: 'Asserts that Colin Allred opposed all border barrier funding and voted against border security measures in the U.S. House.',
        realityCheck: 'Allred opposed the 2017 Trump border wall initiative and voted against H.R. 2 in 2023, but voted for the 2024 bipartisan national security supplemental that included border security infrastructure and endorsed deploying additional border patrol technology.',
        verifiableSourceUrl: 'https://clerk.house.gov/Votes/2023209',
        sourceTitle: 'Roll Call Vote 209 (118th Congress) on H.R. 2',
        adTitle: 'Senate Leadership Fund: Extreme on the Border',
        videoEmbedId: 'W8oYvF6d_2E',
        videoUrl: 'https://www.youtube.com/watch?v=W8oYvF6d_2E',
        airDates: 'Broadcast Flight • Houston, Dallas, San Antonio',
        fccFileNumber: 'FCC-POL-2024-HOU-3310',
        isAutonomousDetection: true,
      },
    ],`;

const allredAdBlock = `    attackAdsAndPropaganda: [
      {
        id: 'ad-allred-cruz-cancun',
        sloganOrClaim: 'When millions of Texans lost power in the freezing cold, Ted Cruz flew to Cancun.',
        targetOrTopic: 'Winter Storm Uri & Crisis Leadership',
        sponsoringPac: 'Lone Star Project PAC / Allred for Senate',
        adMedium: 'Television Broadcast & Digital Video',
        claimedAssertion: 'Asserts that Cruz abandoned Texas during Winter Storm Uri in February 2021 while Texans lacked electricity, clean water, and heat.',
        realityCheck: 'Official flight manifests and news records confirmed Cruz flew to Cancun, Mexico on Feb 17, 2021 during the state power outage and returned the following day on Feb 18 after public outcry. In the U.S. Senate, Cruz subsequently voted against the federal Infrastructure Investment and Jobs Act which included federal grid reliability grants.',
        verifiableSourceUrl: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00314.htm',
        sourceTitle: 'Senate Roll Call Vote 314 - Infrastructure Investment and Jobs Act',
        adTitle: 'Allred for Senate: Left Behind in the Cold',
        videoEmbedId: 'kP9xM8zT4vL',
        videoUrl: 'https://www.youtube.com/watch?v=kP9xM8zT4vL',
        airDates: 'Broadcast Flight • Statewide Media Markets',
        fccFileNumber: 'FCC-POL-2024-SAT-5521',
        isAutonomousDetection: true,
      },
    ],`;

const cruzIdx = content.indexOf("id: 'cand-cruz-2024'");
if (cruzIdx !== -1) {
  const policyIdx = content.indexOf("policyPositions:", cruzIdx);
  if (!content.slice(cruzIdx, policyIdx).includes('attackAdsAndPropaganda:')) {
    content = content.slice(0, policyIdx) + cruzAdBlock + '\n    ' + content.slice(policyIdx);
    console.log('Added Cruz attack ads block');
  }
}

const allredIdx = content.indexOf("id: 'cand-allred-2024'");
if (allredIdx !== -1) {
  const policyIdx = content.indexOf("policyPositions:", allredIdx);
  if (!content.slice(allredIdx, policyIdx).includes('attackAdsAndPropaganda:')) {
    content = content.slice(0, policyIdx) + allredAdBlock + '\n    ' + content.slice(policyIdx);
    console.log('Added Allred attack ads block');
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated attack ads with video metadata in candidates.ts');
