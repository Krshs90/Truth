export interface ProvenanceRecord {
  id: string;
  category: 'legislation' | 'roll_call' | 'official_profile' | 'fact_check' | 'demographics';
  recordName: string;
  sourceEntity: string;
  primaryUrl: string;
  retrievalDate: string;
  verificationMethod: 'direct_official_record' | 'dual_source_crosscheck' | 'public_roll_call_journal' | 'statutory_archive';
  licenseOrTerms: string;
  coverageScope: string;
  notes: string;
}

export const DATA_PROVENANCE_LOG: ProvenanceRecord[] = [
  {
    id: 'prov-tlo-statutes',
    category: 'legislation',
    recordName: 'Texas 88th & 87th Legislature Enrolled Bills and Journals',
    sourceEntity: 'Texas Legislative Council (capitol.texas.gov)',
    primaryUrl: 'https://capitol.texas.gov/',
    retrievalDate: '2024-10-15',
    verificationMethod: 'direct_official_record',
    licenseOrTerms: 'Public Government Record - State of Texas',
    coverageScope: 'SB 2 (88-2C), SB 4 (88-4C), HB 1 (88-4C), SB 3 (87R), SB 17 (88R)',
    notes: 'Enrolled bill text, committee substitutions, and amendment votes transcribed directly from official Senate and House daily journals.',
  },
  {
    id: 'prov-senate-votes',
    category: 'roll_call',
    recordName: 'United States Senate Roll Call Votes (117th & 118th Congress)',
    sourceEntity: 'U.S. Senate Historical Office & Congress.gov',
    primaryUrl: 'https://www.senate.gov/legislative/votes_new.htm',
    retrievalDate: '2024-10-18',
    verificationMethod: 'public_roll_call_journal',
    licenseOrTerms: 'Public Domain - United States Government Work (17 U.S.C. § 105)',
    coverageScope: 'H.R. 3684 (Vote 117-1-314), H.R. 5376 (Vote 117-2-325)',
    notes: 'Individual legislator yea/nay roll call records verified via official Senate record clerks.',
  },
  {
    id: 'prov-house-votes',
    category: 'roll_call',
    recordName: 'Office of the Clerk of the U.S. House of Representatives Recorded Votes',
    sourceEntity: 'U.S. House of Representatives',
    primaryUrl: 'https://clerk.house.gov/Votes',
    retrievalDate: '2024-10-18',
    verificationMethod: 'public_roll_call_journal',
    licenseOrTerms: 'Public Domain - United States Government Work',
    coverageScope: 'H.R. 3684 (Roll 369), H.R. 5376 (Roll 420), H.R. 5 (Roll 161)',
    notes: 'Member votes transcribed from Clerk of the House electronic voting records.',
  },
  {
    id: 'prov-lbb-budget',
    category: 'legislation',
    recordName: 'Texas Legislative Budget Board Fiscal Notes & Fiscal Size-Up 2024-25',
    sourceEntity: 'Legislative Budget Board of Texas',
    primaryUrl: 'https://www.lbb.texas.gov/',
    retrievalDate: '2024-10-15',
    verificationMethod: 'direct_official_record',
    licenseOrTerms: 'State of Texas Public Information',
    coverageScope: 'SB 2 Property Tax Relief Fiscal Note, Border Security Biennial Appropriations',
    notes: 'Nonpartisan fiscal notes authored by LBB professional staff used to document fiscal allocations.',
  },
  {
    id: 'prov-census-acs',
    category: 'demographics',
    recordName: 'American Community Survey 1-Year Health Insurance Estimates',
    sourceEntity: 'U.S. Census Bureau',
    primaryUrl: 'https://www.census.gov/programs-surveys/acs',
    retrievalDate: '2024-10-15',
    verificationMethod: 'direct_official_record',
    licenseOrTerms: 'U.S. Federal Government Open Data',
    coverageScope: 'Statewide Texas uninsured population rates (Table CP03)',
    notes: 'Census Bureau annual microdata and summary tables.',
  },
  {
    id: 'prov-sos-elections',
    category: 'official_profile',
    recordName: 'Texas Election Code & Official Candidate Filings',
    sourceEntity: 'Office of the Texas Secretary of State',
    primaryUrl: 'https://www.sos.state.tx.us/elections/',
    retrievalDate: '2024-10-12',
    verificationMethod: 'direct_official_record',
    licenseOrTerms: 'Official Public State Record',
    coverageScope: 'Candidate filings, mail-in ballot eligibility rules (TEC § 82)',
    notes: 'Verified against current administrative guidelines and statutory chapters.',
  },
];
