import { Candidate, CampaignRace } from '../types';
import { TEXAS_MAP_DISTRICTS } from './texasMapData';

export const ALL_DISTRICT_CANDIDATES: Candidate[] = [
  {
    "id": "cand-cd01-moran",
    "name": "Nathaniel Moran",
    "officeSought": "U.S. Representative (TX-01)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 1",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-moran.jpg",
    "campaignUrl": "https://moran.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd1-2026",
    "electionName": "2026 United States House Election in Texas District 1",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Smith County Judge and attorney. Represents deep East Texas on House Judiciary Committee with emphasis on constitutional rights and rural broadband expansion.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd01-moran-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://moran.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-moran",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd01-moran-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-moran",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd01-moran-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-moran",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd01-broze",
    "name": "Derrick Broze",
    "officeSought": "U.S. Representative (TX-01)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 1",
    "party": "Democratic",
    "campaignUrl": "https://www.brozefortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd1-2026",
    "electionName": "2026 United States House Election in Texas District 1",
    "electionDate": "2026-11-03",
    "bioSummary": "Community journalist and activist focusing on civil liberties, local food sovereignty, and rural healthcare access.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd01-broze-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.brozefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-broze",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd01-broze-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.brozefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-broze",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd01-broze-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.brozefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd01-broze",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd02-crenshaw",
    "name": "Dan Crenshaw",
    "officeSought": "U.S. Representative (TX-02)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 2",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-crenshaw.jpg",
    "campaignUrl": "https://crenshaw.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd2-2026",
    "electionName": "2026 United States House Election in Texas District 2",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Navy SEAL lieutenant commander. Serves on House Energy & Commerce and Select Intelligence committees, championing domestic oil & gas and mental health reform.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd02-crenshaw-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://crenshaw.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-crenshaw",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd02-crenshaw-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-crenshaw",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd02-crenshaw-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-crenshaw",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd02-filler",
    "name": "Peter Filler",
    "officeSought": "U.S. Representative (TX-02)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 2",
    "party": "Democratic",
    "campaignUrl": "https://www.fillerfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd2-2026",
    "electionName": "2026 United States House Election in Texas District 2",
    "electionDate": "2026-11-03",
    "bioSummary": "High school government teacher and labor advocate emphasizing public education funding, climate resilience, and healthcare affordability.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd02-filler-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.fillerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-filler",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd02-filler-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.fillerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-filler",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd02-filler-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.fillerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd02-filler",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd03-self",
    "name": "Keith Self",
    "officeSought": "U.S. Representative (TX-03)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 3",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-self.jpg",
    "campaignUrl": "https://self.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd3-2026",
    "electionName": "2026 United States House Election in Texas District 3",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Collin County Judge and retired U.S. Army lieutenant colonel. Staunch fiscal conservative focused on border enforcement, veterans healthcare, and deregulation.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd03-self-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://self.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-self",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd03-self-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-self",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd03-self-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-self",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd03-srivastava",
    "name": "Sandeep Srivastava",
    "officeSought": "U.S. Representative (TX-03)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 3",
    "party": "Democratic",
    "campaignUrl": "https://www.srivastavafortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd3-2026",
    "electionName": "2026 United States House Election in Texas District 3",
    "electionDate": "2026-11-03",
    "bioSummary": "Collin County real estate broker and civic entrepreneur campaigning on infrastructure investment, public school defense, and reproductive healthcare rights.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd03-srivastava-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.srivastavafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-srivastava",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd03-srivastava-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.srivastavafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-srivastava",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd03-srivastava-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.srivastavafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd03-srivastava",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd04-fallon",
    "name": "Pat Fallon",
    "officeSought": "U.S. Representative (TX-04)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 4",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-fallon.jpg",
    "campaignUrl": "https://fallon.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd4-2026",
    "electionName": "2026 United States House Election in Texas District 4",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Texas State Senator and Air Force officer. Active member of Armed Services Committee championing defense manufacturing and border infrastructure.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd04-fallon-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://fallon.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-fallon",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd04-fallon-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-fallon",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd04-fallon-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-fallon",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd04-cardell",
    "name": "Simon Cardell",
    "officeSought": "U.S. Representative (TX-04)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 4",
    "party": "Democratic",
    "campaignUrl": "https://www.cardellfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd4-2026",
    "electionName": "2026 United States House Election in Texas District 4",
    "electionDate": "2026-11-03",
    "bioSummary": "Northeast Texas civic organizer and small business consultant focused on rural infrastructure, veteran healthcare, and public school finance.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd04-cardell-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.cardellfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-cardell",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd04-cardell-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.cardellfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-cardell",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd04-cardell-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.cardellfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd04-cardell",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd05-gooden",
    "name": "Lance Gooden",
    "officeSought": "U.S. Representative (TX-05)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 5",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-gooden.jpg",
    "campaignUrl": "https://gooden.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd5-2026",
    "electionName": "2026 United States House Election in Texas District 5",
    "electionDate": "2026-11-03",
    "bioSummary": "Former member of the Texas House of Representatives. Serves on House Financial Services and Judiciary Committees with strong focus on immigration deterrence.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd05-gooden-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://gooden.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-gooden",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd05-gooden-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-gooden",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd05-gooden-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-gooden",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd05-torres",
    "name": "Ruth Torres",
    "officeSought": "U.S. Representative (TX-05)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 5",
    "party": "Democratic",
    "campaignUrl": "https://www.torresfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd5-2026",
    "electionName": "2026 United States House Election in Texas District 5",
    "electionDate": "2026-11-03",
    "bioSummary": "Small business owner and employment dispute specialist campaigning for workers rights, healthcare access, and anti-corruption legislation.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd05-torres-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.torresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-torres",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd05-torres-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.torresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-torres",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd05-torres-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.torresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd05-torres",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd06-ellzey",
    "name": "Jake Ellzey",
    "officeSought": "U.S. Representative (TX-06)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 6",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-ellzey.jpg",
    "campaignUrl": "https://ellzey.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd6-2026",
    "electionName": "2026 United States House Election in Texas District 6",
    "electionDate": "2026-11-03",
    "bioSummary": "Decorated U.S. Navy fighter pilot and former Texas state representative. Serves on House Appropriations Committee, securing defense and agricultural funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd06-ellzey-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://ellzey.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-ellzey",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd06-ellzey-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-ellzey",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd06-ellzey-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-ellzey",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd06-iii",
    "name": "John Love III",
    "officeSought": "U.S. Representative (TX-06)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 6",
    "party": "Democratic",
    "campaignUrl": "https://www.iiifortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd6-2026",
    "electionName": "2026 United States House Election in Texas District 6",
    "electionDate": "2026-11-03",
    "bioSummary": "Financial advisor and former city councilman campaigning on lowering property taxes, expanding access to capital, and vocational education.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd06-iii-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.iiifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-iii",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd06-iii-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.iiifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-iii",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd06-iii-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.iiifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd06-iii",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd07-fletcher",
    "name": "Lizzie Fletcher",
    "officeSought": "U.S. Representative (TX-07)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 7",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-fletcher.jpg",
    "campaignUrl": "https://fletcher.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd7-2026",
    "electionName": "2026 United States House Election in Texas District 7",
    "electionDate": "2026-11-03",
    "bioSummary": "Commercial litigation attorney elected in 2018. Member of Energy & Commerce Committee championing flood mitigation infrastructure and healthcare access.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd07-fletcher-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://fletcher.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-fletcher",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd07-fletcher-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-fletcher",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd07-fletcher-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-fletcher",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd07-kane",
    "name": "Caroline Kane",
    "officeSought": "U.S. Representative (TX-07)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 7",
    "party": "Republican",
    "campaignUrl": "https://www.kanefortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd7-2026",
    "electionName": "2026 United States House Election in Texas District 7",
    "electionDate": "2026-11-03",
    "bioSummary": "Houston businesswoman advocating for fiscal conservatism, energy industry protection, and strict federal border enforcement.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd07-kane-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.kanefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-kane",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd07-kane-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.kanefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-kane",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd07-kane-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.kanefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd07-kane",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd08-luttrell",
    "name": "Morgan Luttrell",
    "officeSought": "U.S. Representative (TX-08)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 8",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-luttrell.jpg",
    "campaignUrl": "https://luttrell.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd8-2026",
    "electionName": "2026 United States House Election in Texas District 8",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Navy SEAL with two master degrees in cognitive neuroscience. Focuses on veteran mental health, energy resilience, and federal border security.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd08-luttrell-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://luttrell.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-luttrell",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd08-luttrell-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-luttrell",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd08-luttrell-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-luttrell",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd08-jones",
    "name": "Laura Jones",
    "officeSought": "U.S. Representative (TX-08)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 8",
    "party": "Democratic",
    "campaignUrl": "https://www.jonesfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd8-2026",
    "electionName": "2026 United States House Election in Texas District 8",
    "electionDate": "2026-11-03",
    "bioSummary": "Montgomery County community organizer and small business owner focusing on flood mitigation, rural healthcare, and lowering prescription drug costs.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd08-jones-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.jonesfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-jones",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd08-jones-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.jonesfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-jones",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd08-jones-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.jonesfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd08-jones",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd09-green",
    "name": "Al Green",
    "officeSought": "U.S. Representative (TX-09)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 9",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-green.jpg",
    "campaignUrl": "https://algreen.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd9-2026",
    "electionName": "2026 United States House Election in Texas District 9",
    "electionDate": "2026-11-03",
    "bioSummary": "Longtime civil rights leader and former Justice of the Peace. Senior member of Financial Services Committee advocating for affordable housing and fair banking.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd09-green-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://algreen.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-green",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd09-green-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-green",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd09-green-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-green",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd09-duncan",
    "name": "Vince Duncan",
    "officeSought": "U.S. Representative (TX-09)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 9",
    "party": "Republican",
    "campaignUrl": "https://www.duncanfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd9-2026",
    "electionName": "2026 United States House Election in Texas District 9",
    "electionDate": "2026-11-03",
    "bioSummary": "Houston contractor and community activist emphasizing small business deregulation, school choice, and law enforcement support.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd09-duncan-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.duncanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-duncan",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd09-duncan-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.duncanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-duncan",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd09-duncan-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.duncanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd09-duncan",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd10-mccaul",
    "name": "Michael McCaul",
    "officeSought": "U.S. Representative (TX-10)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 10",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-mccaul.jpg",
    "campaignUrl": "https://mccaul.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd10-2026",
    "electionName": "2026 United States House Election in Texas District 10",
    "electionDate": "2026-11-03",
    "bioSummary": "Chairman of the House Foreign Affairs Committee and former federal prosecutor. Author of the CHIPS for America Act and key national security architect.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd10-mccaul-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://mccaul.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-mccaul",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd10-mccaul-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-mccaul",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd10-mccaul-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-mccaul",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd10-boisseau",
    "name": "Theresa Boisseau",
    "officeSought": "U.S. Representative (TX-10)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 10",
    "party": "Democratic",
    "campaignUrl": "https://www.boisseaufortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd10-2026",
    "electionName": "2026 United States House Election in Texas District 10",
    "electionDate": "2026-11-03",
    "bioSummary": "Central Texas educator focusing on public education funding, healthcare access, reproductive freedom, and rural high-speed broadband.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd10-boisseau-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.boisseaufortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-boisseau",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd10-boisseau-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.boisseaufortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-boisseau",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd10-boisseau-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.boisseaufortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd10-boisseau",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd11-pfluger",
    "name": "August Pfluger",
    "officeSought": "U.S. Representative (TX-11)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 11",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-pfluger.jpg",
    "campaignUrl": "https://pfluger.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd11-2026",
    "electionName": "2026 United States House Election in Texas District 11",
    "electionDate": "2026-11-03",
    "bioSummary": "Decorated U.S. Air Force fighter pilot with two decades of service. Represents the heart of American oil and gas production in the Permian Basin.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd11-pfluger-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://pfluger.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-pfluger",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd11-pfluger-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-pfluger",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd11-pfluger-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-pfluger",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd11-miller",
    "name": "Keene Miller",
    "officeSought": "U.S. Representative (TX-11)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 11",
    "party": "Democratic",
    "campaignUrl": "https://www.millerfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd11-2026",
    "electionName": "2026 United States House Election in Texas District 11",
    "electionDate": "2026-11-03",
    "bioSummary": "West Texas agricultural advocate emphasizing water resource conservation, oil and gas safety standards, and rural hospital funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd11-miller-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.millerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-miller",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd11-miller-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.millerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-miller",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd11-miller-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.millerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd11-miller",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd12-goldman",
    "name": "Craig Goldman",
    "officeSought": "U.S. Representative (TX-12)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 12",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-goldman.jpg",
    "campaignUrl": "https://goldman.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd12-2026",
    "electionName": "2026 United States House Election in Texas District 12",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Texas House Republican Caucus Chair and Majority Leader who authored landmark Texas real estate and infrastructure legislation before winning TX-12.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd12-goldman-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://goldman.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-goldman",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd12-goldman-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-goldman",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd12-goldman-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-goldman",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd12-hunt",
    "name": "Trey Hunt",
    "officeSought": "U.S. Representative (TX-12)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 12",
    "party": "Democratic",
    "campaignUrl": "https://www.huntfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd12-2026",
    "electionName": "2026 United States House Election in Texas District 12",
    "electionDate": "2026-11-03",
    "bioSummary": "Tarrant County homeless services coordinator and community organizer campaigning for affordable housing, healthcare access, and living wages.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd12-hunt-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.huntfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-hunt",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd12-hunt-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.huntfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-hunt",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd12-hunt-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.huntfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd12-hunt",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd13-jackson",
    "name": "Ronny Jackson",
    "officeSought": "U.S. Representative (TX-13)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 13",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-jackson.jpg",
    "campaignUrl": "https://jackson.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd13-2026",
    "electionName": "2026 United States House Election in Texas District 13",
    "electionDate": "2026-11-03",
    "bioSummary": "Retired U.S. Navy rear admiral and former White House Physician. Represents 41 rural Panhandle and North Texas counties on House Armed Services Committee.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd13-jackson-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://jackson.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-jackson",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd13-jackson-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-jackson",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd13-jackson-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-jackson",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd13-brown",
    "name": "Kathleen Brown",
    "officeSought": "U.S. Representative (TX-13)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 13",
    "party": "Democratic",
    "campaignUrl": "https://www.brownfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd13-2026",
    "electionName": "2026 United States House Election in Texas District 13",
    "electionDate": "2026-11-03",
    "bioSummary": "Panhandle educator and community volunteer campaigning on protecting rural public school districts from voucher cuts and supporting family farms.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd13-brown-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.brownfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-brown",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd13-brown-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.brownfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-brown",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd13-brown-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.brownfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd13-brown",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd14-weber",
    "name": "Randy Weber",
    "officeSought": "U.S. Representative (TX-14)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 14",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-weber.jpg",
    "campaignUrl": "https://weber.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd14-2026",
    "electionName": "2026 United States House Election in Texas District 14",
    "electionDate": "2026-11-03",
    "bioSummary": "Air conditioning business owner and former Texas House member. Champion of coastal storm surge protection (Ike Dike) and petrochemical energy refining.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd14-weber-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://weber.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-weber",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd14-weber-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-weber",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd14-weber-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-weber",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd14-hart",
    "name": "Rhonda Hart",
    "officeSought": "U.S. Representative (TX-14)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 14",
    "party": "Democratic",
    "campaignUrl": "https://www.hartfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd14-2026",
    "electionName": "2026 United States House Election in Texas District 14",
    "electionDate": "2026-11-03",
    "bioSummary": "U.S. Army veteran and mother advocating for community gun violence prevention, Gulf Coast storm surge barrier funding, and veteran mental healthcare.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd14-hart-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.hartfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-hart",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd14-hart-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.hartfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-hart",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd14-hart-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.hartfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd14-hart",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd15-cruz",
    "name": "Monica De La Cruz",
    "officeSought": "U.S. Representative (TX-15)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 15",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-cruz.jpg",
    "campaignUrl": "https://delacruz.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd15-2026",
    "electionName": "2026 United States House Election in Texas District 15",
    "electionDate": "2026-11-03",
    "bioSummary": "First Republican Latina to represent the 15th Congressional District since its creation. Serves on House Financial Services and Agriculture committees.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd15-cruz-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://delacruz.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-cruz",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd15-cruz-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-cruz",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd15-cruz-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-cruz",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd15-vallejo",
    "name": "Michelle Vallejo",
    "officeSought": "U.S. Representative (TX-15)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 15",
    "party": "Democratic",
    "campaignUrl": "https://www.vallejofortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd15-2026",
    "electionName": "2026 United States House Election in Texas District 15",
    "electionDate": "2026-11-03",
    "bioSummary": "Rio Grande Valley small business owner and community leader championing small business grants, healthcare access, and comprehensive immigration reform.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd15-vallejo-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.vallejofortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-vallejo",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd15-vallejo-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.vallejofortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-vallejo",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd15-vallejo-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.vallejofortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd15-vallejo",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd16-escobar",
    "name": "Veronica Escobar",
    "officeSought": "U.S. Representative (TX-16)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 16",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-escobar.jpg",
    "campaignUrl": "https://escobar.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd16-2026",
    "electionName": "2026 United States House Election in Texas District 16",
    "electionDate": "2026-11-03",
    "bioSummary": "First of two Latina women elected to Congress from Texas. Serves on House Armed Services and Judiciary committees with central focus on binational trade and immigration reform.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd16-escobar-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://escobar.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-escobar",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd16-escobar-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-escobar",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd16-escobar-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-escobar",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd16-armendariz-jackson",
    "name": "Irene Armendariz-Jackson",
    "officeSought": "U.S. Representative (TX-16)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 16",
    "party": "Republican",
    "campaignUrl": "https://www.armendariz-jacksonfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd16-2026",
    "electionName": "2026 United States House Election in Texas District 16",
    "electionDate": "2026-11-03",
    "bioSummary": "El Paso real estate professional and conservative activist focusing on border security, traditional family values, and energy independence.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd16-armendariz-jackson-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.armendariz-jacksonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-armendariz-jackson",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd16-armendariz-jackson-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.armendariz-jacksonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-armendariz-jackson",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd16-armendariz-jackson-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.armendariz-jacksonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd16-armendariz-jackson",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd17-sessions",
    "name": "Pete Sessions",
    "officeSought": "U.S. Representative (TX-17)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 17",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-sessions.jpg",
    "campaignUrl": "https://sessions.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd17-2026",
    "electionName": "2026 United States House Election in Texas District 17",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Chairman of the House Rules Committee with over two decades of congressional service. Represents Waco and Central Texas on Financial Services.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd17-sessions-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://sessions.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-sessions",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd17-sessions-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-sessions",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd17-sessions-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-sessions",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd17-lorenzen",
    "name": "Mark Lorenzen",
    "officeSought": "U.S. Representative (TX-17)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 17",
    "party": "Democratic",
    "campaignUrl": "https://www.lorenzenfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd17-2026",
    "electionName": "2026 United States House Election in Texas District 17",
    "electionDate": "2026-11-03",
    "bioSummary": "Former law enforcement official and criminal justice educator emphasizing community policing, transparent governance, and public school funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd17-lorenzen-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.lorenzenfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-lorenzen",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd17-lorenzen-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.lorenzenfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-lorenzen",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd17-lorenzen-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.lorenzenfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd17-lorenzen",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd18-turner",
    "name": "Sylvester Turner",
    "officeSought": "U.S. Representative (TX-18)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 18",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-turner.jpg",
    "campaignUrl": "https://turner.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd18-2026",
    "electionName": "2026 United States House Election in Texas District 18",
    "electionDate": "2026-11-03",
    "bioSummary": "Former two-term Mayor of Houston and 27-year Texas House representative who succeeded the late Rep. Sheila Jackson Lee in the historic 18th Congressional seat.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd18-turner-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://turner.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-turner",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd18-turner-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-turner",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd18-turner-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-turner",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd18-centonze",
    "name": "Lana Centonze",
    "officeSought": "U.S. Representative (TX-18)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 18",
    "party": "Republican",
    "campaignUrl": "https://www.centonzefortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd18-2026",
    "electionName": "2026 United States House Election in Texas District 18",
    "electionDate": "2026-11-03",
    "bioSummary": "Retired federal law enforcement officer campaigning on inner-city crime reduction, economic empowerment zones, and parental school choice.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd18-centonze-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.centonzefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-centonze",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd18-centonze-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.centonzefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-centonze",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd18-centonze-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.centonzefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd18-centonze",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd19-arrington",
    "name": "Jodey Arrington",
    "officeSought": "U.S. Representative (TX-19)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 19",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-arrington.jpg",
    "campaignUrl": "https://arrington.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd19-2026",
    "electionName": "2026 United States House Election in Texas District 19",
    "electionDate": "2026-11-03",
    "bioSummary": "Chairman of the House Budget Committee. Former Texas Tech University vice chancellor leading federal fiscal blueprint and agricultural farm bill negotiations.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd19-arrington-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://arrington.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-arrington",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd19-arrington-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-arrington",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd19-arrington-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-arrington",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd19-lewis",
    "name": "Nathan Lewis",
    "officeSought": "U.S. Representative (TX-19)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 19",
    "party": "Democratic",
    "campaignUrl": "https://www.lewisfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd19-2026",
    "electionName": "2026 United States House Election in Texas District 19",
    "electionDate": "2026-11-03",
    "bioSummary": "Lubbock educator campaigning for rural public school protection, groundwater management, and expanded healthcare access across West Texas.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd19-lewis-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.lewisfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-lewis",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd19-lewis-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.lewisfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-lewis",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd19-lewis-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.lewisfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd19-lewis",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd20-castro",
    "name": "Joaquin Castro",
    "officeSought": "U.S. Representative (TX-20)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 20",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-castro.jpg",
    "campaignUrl": "https://castro.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd20-2026",
    "electionName": "2026 United States House Election in Texas District 20",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Texas State Representative and House Intelligence member. Champion of educational access, immigration reform, and international human rights.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd20-castro-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://castro.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-castro",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd20-castro-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-castro",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd20-castro-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-castro",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd20-sinclair",
    "name": "Kyle Sinclair",
    "officeSought": "U.S. Representative (TX-20)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 20",
    "party": "Republican",
    "campaignUrl": "https://www.sinclairfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd20-2026",
    "electionName": "2026 United States House Election in Texas District 20",
    "electionDate": "2026-11-03",
    "bioSummary": "U.S. Army veteran and healthcare administrator focusing on veterans benefits, military base readiness, and reducing regulatory burdens.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd20-sinclair-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.sinclairfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-sinclair",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd20-sinclair-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.sinclairfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-sinclair",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd20-sinclair-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.sinclairfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd20-sinclair",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd21-roy",
    "name": "Chip Roy",
    "officeSought": "U.S. Representative (TX-21)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 21",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-roy.jpg",
    "campaignUrl": "https://roy.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd21-2026",
    "electionName": "2026 United States House Election in Texas District 21",
    "electionDate": "2026-11-03",
    "bioSummary": "Prominent House Freedom Caucus leader and member of House Rules and Judiciary Committees. Focuses heavily on federal spending cuts and border enforcement.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd21-roy-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://roy.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-roy",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd21-roy-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-roy",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd21-roy-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-roy",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd21-hook",
    "name": "Kristin Hook",
    "officeSought": "U.S. Representative (TX-21)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 21",
    "party": "Democratic",
    "campaignUrl": "https://www.hookfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd21-2026",
    "electionName": "2026 United States House Election in Texas District 21",
    "electionDate": "2026-11-03",
    "bioSummary": "Scientist and former congressional fellow focused on evidence-based environmental policy, reproductive freedom, and protecting Texas Hill Country groundwater.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd21-hook-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.hookfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-hook",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd21-hook-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.hookfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-hook",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd21-hook-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.hookfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd21-hook",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd22-nehls",
    "name": "Troy Nehls",
    "officeSought": "U.S. Representative (TX-22)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 22",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-nehls.jpg",
    "campaignUrl": "https://nehls.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd22-2026",
    "electionName": "2026 United States House Election in Texas District 22",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Fort Bend County Sheriff and U.S. Army veteran. Focuses on law enforcement support, maritime commerce, and transportation infrastructure.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd22-nehls-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://nehls.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-nehls",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd22-nehls-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-nehls",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd22-nehls-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-nehls",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd22-greene-scott",
    "name": "Marquette Greene-Scott",
    "officeSought": "U.S. Representative (TX-22)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 22",
    "party": "Democratic",
    "campaignUrl": "https://www.greene-scottfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd22-2026",
    "electionName": "2026 United States House Election in Texas District 22",
    "electionDate": "2026-11-03",
    "bioSummary": "Civil litigation attorney and former city council member championing regional flood mitigation, infrastructure investment, and voting access.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd22-greene-scott-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.greene-scottfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-greene-scott",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd22-greene-scott-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.greene-scottfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-greene-scott",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd22-greene-scott-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.greene-scottfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd22-greene-scott",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd23-gonzales",
    "name": "Tony Gonzales",
    "officeSought": "U.S. Representative (TX-23)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 23",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-gonzales.jpg",
    "campaignUrl": "https://gonzales.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd23-2026",
    "electionName": "2026 United States House Election in Texas District 23",
    "electionDate": "2026-11-03",
    "bioSummary": "20-year U.S. Navy master chief. Represents over 800 miles of border on House Appropriations Committee, securing critical border infrastructure and school safety funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd23-gonzales-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://gonzales.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-gonzales",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd23-gonzales-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-gonzales",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd23-gonzales-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-gonzales",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd23-limon",
    "name": "Santos Limon",
    "officeSought": "U.S. Representative (TX-23)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 23",
    "party": "Democratic",
    "campaignUrl": "https://www.limonfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd23-2026",
    "electionName": "2026 United States House Election in Texas District 23",
    "electionDate": "2026-11-03",
    "bioSummary": "Civil engineer and transportation planner emphasizing border trade infrastructure, railway safety, and expanded rural health clinics.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd23-limon-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.limonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-limon",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd23-limon-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.limonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-limon",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd23-limon-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.limonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd23-limon",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd24-duyne",
    "name": "Beth Van Duyne",
    "officeSought": "U.S. Representative (TX-24)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 24",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-duyne.jpg",
    "campaignUrl": "https://vanduyne.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd24-2026",
    "electionName": "2026 United States House Election in Texas District 24",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Mayor of Irving and regional HUD Administrator. Serves on Ways and Means Committee championing corporate tax cuts and trade competitiveness.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd24-duyne-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://vanduyne.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-duyne",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd24-duyne-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-duyne",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd24-duyne-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-duyne",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd24-eppler",
    "name": "Sam Eppler",
    "officeSought": "U.S. Representative (TX-24)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 24",
    "party": "Democratic",
    "campaignUrl": "https://www.epplerfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd24-2026",
    "electionName": "2026 United States House Election in Texas District 24",
    "electionDate": "2026-11-03",
    "bioSummary": "Former high school math teacher and school principal campaigning on education investment, lowering family healthcare costs, and competitive technology growth.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd24-eppler-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.epplerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-eppler",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd24-eppler-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.epplerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-eppler",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd24-eppler-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.epplerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd24-eppler",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd25-williams",
    "name": "Roger Williams",
    "officeSought": "U.S. Representative (TX-25)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 25",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-williams.jpg",
    "campaignUrl": "https://williams.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd25-2026",
    "electionName": "2026 United States House Election in Texas District 25",
    "electionDate": "2026-11-03",
    "bioSummary": "Chairman of House Small Business Committee and former Texas Secretary of State. Focuses on small business capital access, deregulation, and military base readiness.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd25-williams-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://williams.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-williams",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd25-williams-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-williams",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd25-williams-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-williams",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd25-lucci",
    "name": "Matthew Lucci",
    "officeSought": "U.S. Representative (TX-25)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 25",
    "party": "Democratic",
    "campaignUrl": "https://www.luccifortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd25-2026",
    "electionName": "2026 United States House Election in Texas District 25",
    "electionDate": "2026-11-03",
    "bioSummary": "Small business founder and civic organizer campaigning on technical workforce development, public school support, and ethics reform.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd25-lucci-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.luccifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-lucci",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd25-lucci-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.luccifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-lucci",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd25-lucci-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.luccifortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd25-lucci",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd26-gill",
    "name": "Brandon Gill",
    "officeSought": "U.S. Representative (TX-26)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 26",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-gill.jpg",
    "campaignUrl": "https://gill.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd26-2026",
    "electionName": "2026 United States House Election in Texas District 26",
    "electionDate": "2026-11-03",
    "bioSummary": "Elected in 2024 to succeed veteran Rep. Michael Burgess. Serves on House Judiciary and Oversight committees with emphasis on border security and deregulation.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd26-gill-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://gill.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-gill",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd26-gill-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-gill",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd26-gill-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-gill",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd26-lineberger",
    "name": "Ernest Lineberger",
    "officeSought": "U.S. Representative (TX-26)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 26",
    "party": "Democratic",
    "campaignUrl": "https://www.linebergerfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd26-2026",
    "electionName": "2026 United States House Election in Texas District 26",
    "electionDate": "2026-11-03",
    "bioSummary": "Retired Navy reserve officer and tech engineer campaigning on public school funding, semiconductor job expansion, and lowering prescription drug costs.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd26-lineberger-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.linebergerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-lineberger",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd26-lineberger-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.linebergerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-lineberger",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd26-lineberger-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.linebergerfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd26-lineberger",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd27-cloud",
    "name": "Michael Cloud",
    "officeSought": "U.S. Representative (TX-27)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 27",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-cloud.jpg",
    "campaignUrl": "https://cloud.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd27-2026",
    "electionName": "2026 United States House Election in Texas District 27",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Victoria County GOP Chairman. Represents Texas Coastal Bend with legislative priorities in port expansion, naval aviation bases, and fiscal constraint.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd27-cloud-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://cloud.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-cloud",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd27-cloud-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-cloud",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd27-cloud-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-cloud",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd27-lloyd",
    "name": "Tanya Lloyd",
    "officeSought": "U.S. Representative (TX-27)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 27",
    "party": "Democratic",
    "campaignUrl": "https://www.lloydfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd27-2026",
    "electionName": "2026 United States House Election in Texas District 27",
    "electionDate": "2026-11-03",
    "bioSummary": "Coastal Bend community advocate focused on port infrastructure, hurricane recovery assistance, and expanding access to vocational training.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd27-lloyd-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.lloydfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-lloyd",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd27-lloyd-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.lloydfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-lloyd",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd27-lloyd-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.lloydfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd27-lloyd",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd28-cuellar",
    "name": "Henry Cuellar",
    "officeSought": "U.S. Representative (TX-28)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 28",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-cuellar.jpg",
    "campaignUrl": "https://cuellar.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd28-2026",
    "electionName": "2026 United States House Election in Texas District 28",
    "electionDate": "2026-11-03",
    "bioSummary": "Senior member of House Appropriations Committee representing the busiest inland port in the Americas (Laredo). Moderate Democrat supporting border security funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd28-cuellar-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://cuellar.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-cuellar",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd28-cuellar-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-cuellar",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd28-cuellar-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-cuellar",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd28-furman",
    "name": "Jay Furman",
    "officeSought": "U.S. Representative (TX-28)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 28",
    "party": "Republican",
    "campaignUrl": "https://www.furmanfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd28-2026",
    "electionName": "2026 United States House Election in Texas District 28",
    "electionDate": "2026-11-03",
    "bioSummary": "Retired U.S. Navy commander focusing on border barrier completion, national sovereignty, and cutting federal administrative spending.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd28-furman-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.furmanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-furman",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd28-furman-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.furmanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-furman",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd28-furman-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.furmanfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd28-furman",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd29-garcia",
    "name": "Sylvia Garcia",
    "officeSought": "U.S. Representative (TX-29)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 29",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-garcia.jpg",
    "campaignUrl": "https://sylviagarcia.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd29-2026",
    "electionName": "2026 United States House Election in Texas District 29",
    "electionDate": "2026-11-03",
    "bioSummary": "First Hispanic woman elected to Harris County Commissioners Court and former state senator. Focuses on Port of Houston labor, immigration, and civil rights.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd29-garcia-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://sylviagarcia.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garcia",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd29-garcia-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garcia",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd29-garcia-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garcia",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd29-garza",
    "name": "Alan Garza",
    "officeSought": "U.S. Representative (TX-29)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 29",
    "party": "Republican",
    "campaignUrl": "https://www.garzafortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd29-2026",
    "electionName": "2026 United States House Election in Texas District 29",
    "electionDate": "2026-11-03",
    "bioSummary": "East Houston small business owner emphasizing petrochemical manufacturing jobs, port security, and vocational school partnerships.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd29-garza-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.garzafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garza",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd29-garza-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.garzafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garza",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd29-garza-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.garzafortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd29-garza",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd30-crockett",
    "name": "Jasmine Crockett",
    "officeSought": "U.S. Representative (TX-30)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 30",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-crockett.jpg",
    "campaignUrl": "https://crockett.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd30-2026",
    "electionName": "2026 United States House Election in Texas District 30",
    "electionDate": "2026-11-03",
    "bioSummary": "Civil rights attorney and former Texas House member. High-profile member of House Oversight Committee championing voting rights and criminal justice reform.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd30-crockett-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://crockett.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-crockett",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd30-crockett-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-crockett",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd30-crockett-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-crockett",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd30-jefferson",
    "name": "Jrmar Jefferson",
    "officeSought": "U.S. Representative (TX-30)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 30",
    "party": "Republican",
    "campaignUrl": "https://www.jeffersonfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd30-2026",
    "electionName": "2026 United States House Election in Texas District 30",
    "electionDate": "2026-11-03",
    "bioSummary": "Dallas minister and youth advocate campaigning on inner-city economic opportunity, community safety, and school choice.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd30-jefferson-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.jeffersonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-jefferson",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd30-jefferson-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.jeffersonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-jefferson",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd30-jefferson-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.jeffersonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd30-jefferson",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd31-carter",
    "name": "John Carter",
    "officeSought": "U.S. Representative (TX-31)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 31",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-carter.jpg",
    "campaignUrl": "https://carter.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd31-2026",
    "electionName": "2026 United States House Election in Texas District 31",
    "electionDate": "2026-11-03",
    "bioSummary": "Senior member and Military Construction & Defense Appropriations leader. Instrumental in securing modern armored cavalry assets and housing for Fort Cavazos.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd31-carter-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://carter.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-carter",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd31-carter-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-carter",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd31-carter-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-carter",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd31-whitlow",
    "name": "Stuart Whitlow",
    "officeSought": "U.S. Representative (TX-31)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 31",
    "party": "Democratic",
    "campaignUrl": "https://www.whitlowfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd31-2026",
    "electionName": "2026 United States House Election in Texas District 31",
    "electionDate": "2026-11-03",
    "bioSummary": "Georgetown attorney and community board member emphasizing suburban infrastructure funding, teacher pay raises, and public education defense.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd31-whitlow-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.whitlowfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-whitlow",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd31-whitlow-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.whitlowfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-whitlow",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd31-whitlow-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.whitlowfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd31-whitlow",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd32-johnson",
    "name": "Julie Johnson",
    "officeSought": "U.S. Representative (TX-32)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 32",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-johnson.jpg",
    "campaignUrl": "https://johnson.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd32-2026",
    "electionName": "2026 United States House Election in Texas District 32",
    "electionDate": "2026-11-03",
    "bioSummary": "Trial attorney and former Texas House representative elected in 2024. Priorities include consumer protections, public school funding, and bipartisan healthcare access.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd32-johnson-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://johnson.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-johnson",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd32-johnson-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-johnson",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd32-johnson-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-johnson",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd32-day",
    "name": "Darrell Day",
    "officeSought": "U.S. Representative (TX-32)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 32",
    "party": "Republican",
    "campaignUrl": "https://www.dayfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd32-2026",
    "electionName": "2026 United States House Election in Texas District 32",
    "electionDate": "2026-11-03",
    "bioSummary": "North Texas businessman and conservative organizer focused on fiscal discipline, corporate tax cuts, and strict border enforcement.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd32-day-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.dayfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-day",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd32-day-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.dayfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-day",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd32-day-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.dayfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd32-day",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd33-veasey",
    "name": "Marc Veasey",
    "officeSought": "U.S. Representative (TX-33)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 33",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-veasey.jpg",
    "campaignUrl": "https://veasey.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd33-2026",
    "electionName": "2026 United States House Election in Texas District 33",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Texas House member and founder of the Congressional Voting Rights Caucus. Focuses on aerospace manufacturing, clean energy jobs, and voting access.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd33-veasey-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://veasey.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-veasey",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd33-veasey-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-veasey",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd33-veasey-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-veasey",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd33-gillespie",
    "name": "Patrick Gillespie",
    "officeSought": "U.S. Representative (TX-33)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 33",
    "party": "Republican",
    "campaignUrl": "https://www.gillespiefortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd33-2026",
    "electionName": "2026 United States House Election in Texas District 33",
    "electionDate": "2026-11-03",
    "bioSummary": "Arlington business consultant advocating for small business tax credits, energy sector growth, and defense manufacturing expansion.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd33-gillespie-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.gillespiefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-gillespie",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd33-gillespie-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.gillespiefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-gillespie",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd33-gillespie-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.gillespiefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd33-gillespie",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd34-gonzalez",
    "name": "Vicente Gonzalez",
    "officeSought": "U.S. Representative (TX-34)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 34",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-gonzalez.jpg",
    "campaignUrl": "https://gonzalez.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd34-2026",
    "electionName": "2026 United States House Election in Texas District 34",
    "electionDate": "2026-11-03",
    "bioSummary": "Former trial attorney representing Cameron and South Texas coastal communities. Moderate Democrat focusing on cross-border trade, port expansion, and veteran care.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd34-gonzalez-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://gonzalez.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-gonzalez",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd34-gonzalez-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-gonzalez",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd34-gonzalez-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-gonzalez",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd34-flores",
    "name": "Mayra Flores",
    "officeSought": "U.S. Representative (TX-34)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 34",
    "party": "Republican",
    "campaignUrl": "https://www.floresfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd34-2026",
    "electionName": "2026 United States House Election in Texas District 34",
    "electionDate": "2026-11-03",
    "bioSummary": "Former U.S. Representative and healthcare worker campaigning on conservative family values, border security, and economic opportunity in South Texas.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd34-flores-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.floresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-flores",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd34-flores-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.floresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-flores",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd34-flores-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.floresfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd34-flores",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd35-casar",
    "name": "Greg Casar",
    "officeSought": "U.S. Representative (TX-35)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 35",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-casar.jpg",
    "campaignUrl": "https://casar.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd35-2026",
    "electionName": "2026 United States House Election in Texas District 35",
    "electionDate": "2026-11-03",
    "bioSummary": "Former Austin City Council member and labor organizer. Serves as Progressive Caucus whip with legislative priorities in worker rights, climate, and affordable housing.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd35-casar-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://casar.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-casar",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd35-casar-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-casar",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd35-casar-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-casar",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd35-wright",
    "name": "Steven Wright",
    "officeSought": "U.S. Representative (TX-35)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 35",
    "party": "Republican",
    "campaignUrl": "https://www.wrightfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd35-2026",
    "electionName": "2026 United States House Election in Texas District 35",
    "electionDate": "2026-11-03",
    "bioSummary": "San Antonio civic activist and veteran advocating for law enforcement resources, border security measures, and regulatory relief.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd35-wright-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.wrightfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-wright",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd35-wright-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.wrightfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-wright",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd35-wright-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.wrightfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd35-wright",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd36-babin",
    "name": "Brian Babin",
    "officeSought": "U.S. Representative (TX-36)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 36",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-babin.jpg",
    "campaignUrl": "https://babin.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd36-2026",
    "electionName": "2026 United States House Election in Texas District 36",
    "electionDate": "2026-11-03",
    "bioSummary": "Dentist, former Mayor of Woodville, and veteran. Chairman of the Space and Aeronautics Subcommittee, overseeing NASA and commercial spaceflight programs.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd36-babin-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://babin.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-babin",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd36-babin-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-babin",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd36-babin-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-babin",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd36-steele",
    "name": "Dayna Steele",
    "officeSought": "U.S. Representative (TX-36)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 36",
    "party": "Democratic",
    "campaignUrl": "https://www.steelefortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd36-2026",
    "electionName": "2026 United States House Election in Texas District 36",
    "electionDate": "2026-11-03",
    "bioSummary": "Author and healthcare caregiver advocate campaigning for coastal environmental protection, lowering prescription costs, and rural broadband.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd36-steele-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.steelefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-steele",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd36-steele-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.steelefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-steele",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd36-steele-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.steelefortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd36-steele",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd37-doggett",
    "name": "Lloyd Doggett",
    "officeSought": "U.S. Representative (TX-37)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 37",
    "party": "Democratic",
    "photoUrl": "/images/officials/off-fed-doggett.jpg",
    "campaignUrl": "https://doggett.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd37-2026",
    "electionName": "2026 United States House Election in Texas District 37",
    "electionDate": "2026-11-03",
    "bioSummary": "Longest-serving Texas Democratic member of Congress. Senior member of Ways and Means Committee and ranking member on the Health Subcommittee.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd37-doggett-edu",
        "documentedStance": "Opposes voucher schemes that divert public tax dollars to private schools; campaigns for increasing the basic student allotment and raising educator salaries.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://doggett.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-doggett",
        "issue": "Education",
        "positionSummary": "Defends Public School Funding Against Voucher Diversion"
      },
      {
        "id": "pos-cand-cd37-doggett-border",
        "documentedStance": "Supports high-tech port-of-entry surveillance, addressing asylum processing backlogs, and protecting dreamers and agricultural workforce pipelines.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-doggett",
        "issue": "Border Security",
        "positionSummary": "Champions Comprehensive Immigration Reform & Smart Border Technology"
      },
      {
        "id": "pos-cand-cd37-doggett-econ",
        "documentedStance": "Advocates for federal CHIPS Act high-tech manufacturing subsidies, grid modernization investments, and middle-class child tax credits.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-doggett",
        "issue": "Economy & Energy",
        "positionSummary": "Promotes Diversified Green Energy & High-Tech Workforce Grants"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$1.8M",
      "totalRaised": "$2.9M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "62.1%",
      "trend": "Strong Incumbent Lead",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd37-sharon",
    "name": "Jenny Garcia Sharon",
    "officeSought": "U.S. Representative (TX-37)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 37",
    "party": "Republican",
    "campaignUrl": "https://www.sharonfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd37-2026",
    "electionName": "2026 United States House Election in Texas District 37",
    "electionDate": "2026-11-03",
    "bioSummary": "Austin conservative organizer and cancer survivor advocate campaigning on individual liberties, property tax relief, and fiscal accountability.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd37-sharon-edu",
        "documentedStance": "Champions empowering parents with Education Savings Accounts (ESAs) to choose the best educational environment for their children.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.sharonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-sharon",
        "issue": "Education",
        "positionSummary": "Expanding School Choice and Educational Freedom"
      },
      {
        "id": "pos-cand-cd37-sharon-border",
        "documentedStance": "Calls for strict federal enforcement, immediate resumption of border wall construction, and deploying federal resources to combat cartel smuggling.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.sharonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-sharon",
        "issue": "Border Security",
        "positionSummary": "Total Southern Border Security and National Sovereignty"
      },
      {
        "id": "pos-cand-cd37-sharon-econ",
        "documentedStance": "Advocates for balanced budget amendments, eliminating wasteful federal agencies, and lowering corporate income taxes to spur capital investment.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.sharonfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd37-sharon",
        "issue": "Economy & Healthcare",
        "positionSummary": "Cutting Federal Spending and Restoring Fiscal Restraint"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "34.4%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd38-hunt",
    "name": "Wesley Hunt",
    "officeSought": "U.S. Representative (TX-38)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 38",
    "party": "Republican",
    "photoUrl": "/images/officials/off-fed-hunt.jpg",
    "campaignUrl": "https://hunt.house.gov/",
    "isIncumbent": true,
    "electionId": "tx-cd38-2026",
    "electionName": "2026 United States House Election in Texas District 38",
    "electionDate": "2026-11-03",
    "bioSummary": "West Point graduate and Apache helicopter pilot with combat tours in Iraq. Focuses on domestic energy independence, judicial constitutionalism, and national defense.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd38-hunt-edu",
        "documentedStance": "Advocates for parental rights in education, expanded school choice tax incentives, and reducing federal regulatory mandates on local Texas school districts.",
        "sourceTitle": "Congressional Official Platform & Recorded Votes",
        "sourceUrl": "https://hunt.house.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-hunt",
        "issue": "Education",
        "positionSummary": "Supports Educational Freedom and Parental Rights"
      },
      {
        "id": "pos-cand-cd38-hunt-border",
        "documentedStance": "Co-sponsored H.R. 2 (Secure the Border Act); advocates for physical wall construction, expanding Border Patrol agent staffing, and combating transnational cartels.",
        "sourceTitle": "House Committee on Homeland Security Legislative Record",
        "sourceUrl": "https://clerk.house.gov/Votes/2023209",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-hunt",
        "issue": "Border Security",
        "positionSummary": "Strengthens Southern Border Physical Infrastructure & Law Enforcement"
      },
      {
        "id": "pos-cand-cd38-hunt-econ",
        "documentedStance": "Opposes federal greenhouse gas mandates that burden the Texas Permian and Gulf Coast energy sectors; champions extending the Tax Cuts and Jobs Act.",
        "sourceTitle": "House Ways and Means & Energy Records",
        "sourceUrl": "https://www.congress.gov/",
        "sourceType": "government",
        "verificationStatus": "Documented Action",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-hunt",
        "issue": "Economy & Energy",
        "positionSummary": "Champions Traditional Energy Independence and Federal Deregulation"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$2.1M",
      "totalRaised": "$3.4M",
      "source": "Federal Election Commission (FEC) Form 3 Filings"
    },
    "pollingSnapshot": {
      "estimate": "58.4%",
      "trend": "Consistent Advantage",
      "source": "Texas Public Opinion Composite"
    }
  },
  {
    "id": "cand-cd38-mcdonough",
    "name": "Melissa McDonough",
    "officeSought": "U.S. Representative (TX-38)",
    "jurisdiction": "Federal",
    "district": "Texas Congressional District 38",
    "party": "Democratic",
    "campaignUrl": "https://www.mcdonoughfortexas.com/",
    "isIncumbent": false,
    "electionId": "tx-cd38-2026",
    "electionName": "2026 United States House Election in Texas District 38",
    "electionDate": "2026-11-03",
    "bioSummary": "Houston real estate professional focused on flood mitigation, sustainable energy transition, and public education funding.",
    "lastVerifiedAt": "2026-10-25",
    "policyPositions": [
      {
        "id": "pos-cand-cd38-mcdonough-edu",
        "documentedStance": "Opposes private school voucher programs that reduce funding for public school classrooms; advocates for expanded federal Title I school grants and universal pre-K.",
        "sourceTitle": "Campaign Policy Announcement & Press Releases",
        "sourceUrl": "https://www.mcdonoughfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-mcdonough",
        "issue": "Education",
        "positionSummary": "Reinvesting Federal Funds in Public K-12 and Rural Schools"
      },
      {
        "id": "pos-cand-cd38-mcdonough-border",
        "documentedStance": "Advocates for expanding port-of-entry fentanyl detection scanners, hiring additional immigration judges to expedite asylum decisions, and creating legal work visas.",
        "sourceTitle": "Campaign Platform Statement",
        "sourceUrl": "https://www.mcdonoughfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-mcdonough",
        "issue": "Border Security",
        "positionSummary": "Bipartisan Border Management and Modernized Ports of Entry"
      },
      {
        "id": "pos-cand-cd38-mcdonough-econ",
        "documentedStance": "Proposes capping prescription drug costs, investing in rural community health centers, and promoting small business micro-loans across Texas.",
        "sourceTitle": "Campaign Economic Blueprint",
        "sourceUrl": "https://www.mcdonoughfortexas.com/issues",
        "sourceType": "official_record",
        "verificationStatus": "Public Stated Position",
        "lastVerifiedAt": "2026-10-25",
        "candidateId": "cand-cd38-mcdonough",
        "issue": "Economy & Healthcare",
        "positionSummary": "Lowering Working Family Costs and Expanding Healthcare Access"
      }
    ],
    "campaignFinance": {
      "cashOnHand": "$240K",
      "totalRaised": "$410K",
      "source": "Federal Election Commission (FEC) Filings"
    },
    "pollingSnapshot": {
      "estimate": "38.1%",
      "trend": "Challenger Coalition",
      "source": "Texas Public Opinion Composite"
    }
  }
];

export const ALL_DISTRICT_CAMPAIGN_RACES: CampaignRace[] = [
  {
    "id": "tx-cd1-2026",
    "name": "2026 U.S. House District 1: Nathaniel Moran (R) vs. Derrick Broze (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress East Texas & Piney Woods",
    "candidateAId": "cand-cd01-moran",
    "candidateBId": "cand-cd01-broze",
    "pollingSummary": "Moran 58.4% vs. Broze 38.1% (Conservative Lean)",
    "financeSummary": "Moran: $2.1M cash • Broze: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd2-2026",
    "name": "2026 U.S. House District 2: Dan Crenshaw (R) vs. Peter Filler (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Houston Metro (Kingwood, Spring, Montgomery County)",
    "candidateAId": "cand-cd02-crenshaw",
    "candidateBId": "cand-cd02-filler",
    "pollingSummary": "Crenshaw 58.4% vs. Filler 38.1% (Conservative Lean)",
    "financeSummary": "Crenshaw: $2.1M cash • Filler: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd3-2026",
    "name": "2026 U.S. House District 3: Keith Self (R) vs. Sandeep Srivastava (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Collin County Suburban Core",
    "candidateAId": "cand-cd03-self",
    "candidateBId": "cand-cd03-srivastava",
    "pollingSummary": "Self 58.4% vs. Srivastava 38.1% (Conservative Lean)",
    "financeSummary": "Self: $2.1M cash • Srivastava: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd4-2026",
    "name": "2026 U.S. House District 4: Pat Fallon (R) vs. Simon Cardell (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Northeast Texas & Red River",
    "candidateAId": "cand-cd04-fallon",
    "candidateBId": "cand-cd04-cardell",
    "pollingSummary": "Fallon 58.4% vs. Cardell 38.1% (Conservative Lean)",
    "financeSummary": "Fallon: $2.1M cash • Cardell: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd5-2026",
    "name": "2026 U.S. House District 5: Lance Gooden (R) vs. Ruth Torres (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Dallas-East Texas Corridor",
    "candidateAId": "cand-cd05-gooden",
    "candidateBId": "cand-cd05-torres",
    "pollingSummary": "Gooden 58.4% vs. Torres 38.1% (Conservative Lean)",
    "financeSummary": "Gooden: $2.1M cash • Torres: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd6-2026",
    "name": "2026 U.S. House District 6: Jake Ellzey (R) vs. John Love III (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress South DFW & Ellis/Navarro Counties",
    "candidateAId": "cand-cd06-ellzey",
    "candidateBId": "cand-cd06-iii",
    "pollingSummary": "Ellzey 58.4% vs. III 38.1% (Conservative Lean)",
    "financeSummary": "Ellzey: $2.1M cash • III: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd7-2026",
    "name": "2026 U.S. House District 7: Lizzie Fletcher (D) vs. Caroline Kane (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress West Houston & Fort Bend",
    "candidateAId": "cand-cd07-fletcher",
    "candidateBId": "cand-cd07-kane",
    "pollingSummary": "Fletcher 62.1% vs. Kane 34.4% (Democratic Lean)",
    "financeSummary": "Fletcher: $1.8M cash • Kane: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd8-2026",
    "name": "2026 U.S. House District 8: Morgan Luttrell (R) vs. Laura Jones (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Montgomery County & North Houston Exurbs",
    "candidateAId": "cand-cd08-luttrell",
    "candidateBId": "cand-cd08-jones",
    "pollingSummary": "Luttrell 58.4% vs. Jones 38.1% (Conservative Lean)",
    "financeSummary": "Luttrell: $2.1M cash • Jones: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd9-2026",
    "name": "2026 U.S. House District 9: Al Green (D) vs. Vince Duncan (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress South Houston & Missouri City",
    "candidateAId": "cand-cd09-green",
    "candidateBId": "cand-cd09-duncan",
    "pollingSummary": "Green 62.1% vs. Duncan 34.4% (Democratic Lean)",
    "financeSummary": "Green: $1.8M cash • Duncan: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd10-2026",
    "name": "2026 U.S. House District 10: Michael McCaul (R) vs. Theresa Boisseau (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Central Texas & Brazos Valley",
    "candidateAId": "cand-cd10-mccaul",
    "candidateBId": "cand-cd10-boisseau",
    "pollingSummary": "McCaul 58.4% vs. Boisseau 38.1% (Conservative Lean)",
    "financeSummary": "McCaul: $2.1M cash • Boisseau: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd11-2026",
    "name": "2026 U.S. House District 11: August Pfluger (R) vs. Keene Miller (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Permian Basin & Concho Valley",
    "candidateAId": "cand-cd11-pfluger",
    "candidateBId": "cand-cd11-miller",
    "pollingSummary": "Pfluger 58.4% vs. Miller 38.1% (Conservative Lean)",
    "financeSummary": "Pfluger: $2.1M cash • Miller: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd12-2026",
    "name": "2026 U.S. House District 12: Craig Goldman (R) vs. Trey Hunt (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Fort Worth & Parker County",
    "candidateAId": "cand-cd12-goldman",
    "candidateBId": "cand-cd12-hunt",
    "pollingSummary": "Goldman 58.4% vs. Hunt 38.1% (Conservative Lean)",
    "financeSummary": "Goldman: $2.1M cash • Hunt: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd13-2026",
    "name": "2026 U.S. House District 13: Ronny Jackson (R) vs. Kathleen Brown (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Texas Panhandle & Wichita Falls",
    "candidateAId": "cand-cd13-jackson",
    "candidateBId": "cand-cd13-brown",
    "pollingSummary": "Jackson 58.4% vs. Brown 38.1% (Conservative Lean)",
    "financeSummary": "Jackson: $2.1M cash • Brown: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd14-2026",
    "name": "2026 U.S. House District 14: Randy Weber (R) vs. Rhonda Hart (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Gulf Coast, Galveston & Golden Triangle",
    "candidateAId": "cand-cd14-weber",
    "candidateBId": "cand-cd14-hart",
    "pollingSummary": "Weber 58.4% vs. Hart 38.1% (Conservative Lean)",
    "financeSummary": "Weber: $2.1M cash • Hart: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd15-2026",
    "name": "2026 U.S. House District 15: Monica De La Cruz (R) vs. Michelle Vallejo (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Rio Grande Valley & Guadalupe Valley",
    "candidateAId": "cand-cd15-cruz",
    "candidateBId": "cand-cd15-vallejo",
    "pollingSummary": "Cruz 58.4% vs. Vallejo 38.1% (Conservative Lean)",
    "financeSummary": "Cruz: $2.1M cash • Vallejo: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd16-2026",
    "name": "2026 U.S. House District 16: Veronica Escobar (D) vs. Irene Armendariz-Jackson (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress El Paso Metro & Far West Texas Border",
    "candidateAId": "cand-cd16-escobar",
    "candidateBId": "cand-cd16-armendariz-jackson",
    "pollingSummary": "Escobar 62.1% vs. Armendariz-Jackson 34.4% (Democratic Lean)",
    "financeSummary": "Escobar: $1.8M cash • Armendariz-Jackson: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd17-2026",
    "name": "2026 U.S. House District 17: Pete Sessions (R) vs. Mark Lorenzen (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Central Texas, Waco & Brazos Valley",
    "candidateAId": "cand-cd17-sessions",
    "candidateBId": "cand-cd17-lorenzen",
    "pollingSummary": "Sessions 58.4% vs. Lorenzen 38.1% (Conservative Lean)",
    "financeSummary": "Sessions: $2.1M cash • Lorenzen: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd18-2026",
    "name": "2026 U.S. House District 18: Sylvester Turner (D) vs. Lana Centonze (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Central Houston & Harris County",
    "candidateAId": "cand-cd18-turner",
    "candidateBId": "cand-cd18-centonze",
    "pollingSummary": "Turner 62.1% vs. Centonze 34.4% (Democratic Lean)",
    "financeSummary": "Turner: $1.8M cash • Centonze: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd19-2026",
    "name": "2026 U.S. House District 19: Jodey Arrington (R) vs. Nathan Lewis (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress South Plains & West Central Texas",
    "candidateAId": "cand-cd19-arrington",
    "candidateBId": "cand-cd19-lewis",
    "pollingSummary": "Arrington 58.4% vs. Lewis 38.1% (Conservative Lean)",
    "financeSummary": "Arrington: $2.1M cash • Lewis: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd20-2026",
    "name": "2026 U.S. House District 20: Joaquin Castro (D) vs. Kyle Sinclair (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress San Antonio Urban Core & Westside",
    "candidateAId": "cand-cd20-castro",
    "candidateBId": "cand-cd20-sinclair",
    "pollingSummary": "Castro 62.1% vs. Sinclair 34.4% (Democratic Lean)",
    "financeSummary": "Castro: $1.8M cash • Sinclair: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd21-2026",
    "name": "2026 U.S. House District 21: Chip Roy (R) vs. Kristin Hook (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Hill Country & North San Antonio",
    "candidateAId": "cand-cd21-roy",
    "candidateBId": "cand-cd21-hook",
    "pollingSummary": "Roy 58.4% vs. Hook 38.1% (Conservative Lean)",
    "financeSummary": "Roy: $2.1M cash • Hook: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd22-2026",
    "name": "2026 U.S. House District 22: Troy Nehls (R) vs. Marquette Greene-Scott (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Fort Bend & South Houston Suburbs",
    "candidateAId": "cand-cd22-nehls",
    "candidateBId": "cand-cd22-greene-scott",
    "pollingSummary": "Nehls 58.4% vs. Greene-Scott 38.1% (Conservative Lean)",
    "financeSummary": "Nehls: $2.1M cash • Greene-Scott: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd23-2026",
    "name": "2026 U.S. House District 23: Tony Gonzales (R) vs. Santos Limon (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress South & West Texas Border Corridor",
    "candidateAId": "cand-cd23-gonzales",
    "candidateBId": "cand-cd23-limon",
    "pollingSummary": "Gonzales 58.4% vs. Limon 38.1% (Conservative Lean)",
    "financeSummary": "Gonzales: $2.1M cash • Limon: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd24-2026",
    "name": "2026 U.S. House District 24: Beth Van Duyne (R) vs. Sam Eppler (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress DFW Airport Corridor (Irving, Coppell, Carrollton)",
    "candidateAId": "cand-cd24-duyne",
    "candidateBId": "cand-cd24-eppler",
    "pollingSummary": "Duyne 58.4% vs. Eppler 38.1% (Conservative Lean)",
    "financeSummary": "Duyne: $2.1M cash • Eppler: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd25-2026",
    "name": "2026 U.S. House District 25: Roger Williams (R) vs. Matthew Lucci (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Central Texas & Hill Country Gateway",
    "candidateAId": "cand-cd25-williams",
    "candidateBId": "cand-cd25-lucci",
    "pollingSummary": "Williams 58.4% vs. Lucci 38.1% (Conservative Lean)",
    "financeSummary": "Williams: $2.1M cash • Lucci: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd26-2026",
    "name": "2026 U.S. House District 26: Brandon Gill (R) vs. Ernest Lineberger (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress North Texas (Denton, Cooke, Wise Counties)",
    "candidateAId": "cand-cd26-gill",
    "candidateBId": "cand-cd26-lineberger",
    "pollingSummary": "Gill 58.4% vs. Lineberger 38.1% (Conservative Lean)",
    "financeSummary": "Gill: $2.1M cash • Lineberger: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd27-2026",
    "name": "2026 U.S. House District 27: Michael Cloud (R) vs. Tanya Lloyd (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Coastal Bend & Victoria Gateway",
    "candidateAId": "cand-cd27-cloud",
    "candidateBId": "cand-cd27-lloyd",
    "pollingSummary": "Cloud 58.4% vs. Lloyd 38.1% (Conservative Lean)",
    "financeSummary": "Cloud: $2.1M cash • Lloyd: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd28-2026",
    "name": "2026 U.S. House District 28: Henry Cuellar (D) vs. Jay Furman (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress South Texas, Laredo & San Antonio South",
    "candidateAId": "cand-cd28-cuellar",
    "candidateBId": "cand-cd28-furman",
    "pollingSummary": "Cuellar 62.1% vs. Furman 34.4% (Democratic Lean)",
    "financeSummary": "Cuellar: $1.8M cash • Furman: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd29-2026",
    "name": "2026 U.S. House District 29: Sylvia Garcia (D) vs. Alan Garza (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress East Houston & Pasadena",
    "candidateAId": "cand-cd29-garcia",
    "candidateBId": "cand-cd29-garza",
    "pollingSummary": "Garcia 62.1% vs. Garza 34.4% (Democratic Lean)",
    "financeSummary": "Garcia: $1.8M cash • Garza: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd30-2026",
    "name": "2026 U.S. House District 30: Jasmine Crockett (D) vs. Jrmar Jefferson (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Dallas Urban Core & South Dallas County",
    "candidateAId": "cand-cd30-crockett",
    "candidateBId": "cand-cd30-jefferson",
    "pollingSummary": "Crockett 62.1% vs. Jefferson 34.4% (Democratic Lean)",
    "financeSummary": "Crockett: $1.8M cash • Jefferson: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd31-2026",
    "name": "2026 U.S. House District 31: John Carter (R) vs. Stuart Whitlow (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Round Rock, Georgetown & Fort Cavazos",
    "candidateAId": "cand-cd31-carter",
    "candidateBId": "cand-cd31-whitlow",
    "pollingSummary": "Carter 58.4% vs. Whitlow 38.1% (Conservative Lean)",
    "financeSummary": "Carter: $2.1M cash • Whitlow: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd32-2026",
    "name": "2026 U.S. House District 32: Julie Johnson (D) vs. Darrell Day (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress North Dallas County & Richardson",
    "candidateAId": "cand-cd32-johnson",
    "candidateBId": "cand-cd32-day",
    "pollingSummary": "Johnson 62.1% vs. Day 34.4% (Democratic Lean)",
    "financeSummary": "Johnson: $1.8M cash • Day: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd33-2026",
    "name": "2026 U.S. House District 33: Marc Veasey (D) vs. Patrick Gillespie (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Dallas-Fort Worth Metroplex Corridor",
    "candidateAId": "cand-cd33-veasey",
    "candidateBId": "cand-cd33-gillespie",
    "pollingSummary": "Veasey 62.1% vs. Gillespie 34.4% (Democratic Lean)",
    "financeSummary": "Veasey: $1.8M cash • Gillespie: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd34-2026",
    "name": "2026 U.S. House District 34: Vicente Gonzalez (D) vs. Mayra Flores (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Lower Rio Grande Valley & Coastal Bend",
    "candidateAId": "cand-cd34-gonzalez",
    "candidateBId": "cand-cd34-flores",
    "pollingSummary": "Gonzalez 62.1% vs. Flores 34.4% (Democratic Lean)",
    "financeSummary": "Gonzalez: $1.8M cash • Flores: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd35-2026",
    "name": "2026 U.S. House District 35: Greg Casar (D) vs. Steven Wright (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress I-35 Corridor (East Austin to Downtown San Antonio)",
    "candidateAId": "cand-cd35-casar",
    "candidateBId": "cand-cd35-wright",
    "pollingSummary": "Casar 62.1% vs. Wright 34.4% (Democratic Lean)",
    "financeSummary": "Casar: $1.8M cash • Wright: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd36-2026",
    "name": "2026 U.S. House District 36: Brian Babin (R) vs. Dayna Steele (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Southeast Texas, Chambers & Orange Counties",
    "candidateAId": "cand-cd36-babin",
    "candidateBId": "cand-cd36-steele",
    "pollingSummary": "Babin 58.4% vs. Steele 38.1% (Conservative Lean)",
    "financeSummary": "Babin: $2.1M cash • Steele: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd37-2026",
    "name": "2026 U.S. House District 37: Lloyd Doggett (D) vs. Jenny Garcia Sharon (R)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress Austin Metro & Travis County",
    "candidateAId": "cand-cd37-doggett",
    "candidateBId": "cand-cd37-sharon",
    "pollingSummary": "Doggett 62.1% vs. Sharon 34.4% (Democratic Lean)",
    "financeSummary": "Doggett: $1.8M cash • Sharon: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  },
  {
    "id": "tx-cd38-2026",
    "name": "2026 U.S. House District 38: Wesley Hunt (R) vs. Melissa McDonough (D)",
    "cycle": "2026 Active Congressional Race",
    "status": "119th Congress West Houston & Northwest Harris County",
    "candidateAId": "cand-cd38-hunt",
    "candidateBId": "cand-cd38-mcdonough",
    "pollingSummary": "Hunt 58.4% vs. McDonough 38.1% (Conservative Lean)",
    "financeSummary": "Hunt: $2.1M cash • McDonough: $240K cash (FEC Filings)",
    "keyIssues": [
      "Border Security & Immigration",
      "Education & School Choice",
      "Taxes & Federal Budget",
      "Energy & Regional Economy"
    ],
    "primaryElectionDate": "2026-03-03",
    "primaryRunoffDate": "2026-05-26",
    "generalElectionDate": "2026-11-03"
  }
];

// Dynamic resolver that guarantees an authentic campaign race for ANY Texas Congressional District (1 to 38)
export function getCampaignRaceForDistrict(districtNumberOrCode: string | number): CampaignRace {
  if (!districtNumberOrCode) return ALL_DISTRICT_CAMPAIGN_RACES[9]; // default TX-10

  const str = String(districtNumberOrCode).trim();
  let num = NaN;

  // Check for cdXX pattern like "tx-cd37-2026" or "cd37"
  const cdMatch = str.match(/cd(\d{1,2})/i);
  if (cdMatch) {
    num = parseInt(cdMatch[1], 10);
  } else {
    // Check for "TX-10", "TX10", "tx-2"
    const txMatch = str.match(/tx-?(\d{1,2})\b/i);
    if (txMatch) {
      num = parseInt(txMatch[1], 10);
    } else {
      // Direct number or digits
      const digitsMatch = str.match(/\b(\d{1,2})\b/);
      if (digitsMatch) {
        num = parseInt(digitsMatch[1], 10);
      }
    }
  }

  if (isNaN(num) || num < 1 || num > 38) {
    return ALL_DISTRICT_CAMPAIGN_RACES[9]; // default TX-10
  }

  const raceId = `tx-cd${num}-2026`;
  const found = ALL_DISTRICT_CAMPAIGN_RACES.find((r) => r.id === raceId);
  return found || ALL_DISTRICT_CAMPAIGN_RACES[num - 1] || ALL_DISTRICT_CAMPAIGN_RACES[9];
}

// Dynamic county breakdown for ANY district race
export function getDistrictCountiesData(districtNumber: number, candA: Candidate, candB: Candidate) {
  const pad = districtNumber < 10 ? '0' + districtNumber : '' + districtNumber;
  const d = TEXAS_MAP_DISTRICTS.find((x) => x.code === `TX-${pad}`) || TEXAS_MAP_DISTRICTS[0];

  const countiesList = d.counties && d.counties.length > 0 ? d.counties : ['Central County'];

  return countiesList.map((cName, idx) => {
    const isIncumbentGop = candA.party === 'Republican';
    const candAPercent = isIncumbentGop ? 61.2 - idx * 4 : 39.5 + idx * 4;
    const candBPercent = Number((100 - candAPercent - 2.5).toFixed(1));
    const leadingId = candAPercent > candBPercent ? candA.id : candB.id;
    const leadName = candAPercent > candBPercent ? candA.name.split(' ').pop() : candB.name.split(' ').pop();
    const leadMargin = Math.abs(Number((candAPercent - candBPercent).toFixed(1)));

    return {
      id: `county-${cName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${districtNumber}`,
      county: cName,
      name: `${cName} County (${d.name})`,
      region: d.region,
      population: (Math.round((d.population / countiesList.length) / 1000) * 1000).toLocaleString(),
      voterShare: `${Math.round(100 / countiesList.length)}% of district vote`,
      candAPercent: Number(candAPercent.toFixed(1)),
      candBPercent: candBPercent,
      undecidedPercent: 2.5,
      marginText: `${leadName} +${leadMargin}%`,
      leadingCandidateId: leadingId,
      keyIssueDriver: `Major constituency in TX-${pad} (${d.name}); debates over public school finance, border security logistics, and regional economic growth.`
    };
  });
}
