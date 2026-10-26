export type Chamber = 'House' | 'Senate' | 'Joint' | 'Federal';

export type LegislativeStatus =
  | 'Introduced'
  | 'In Committee'
  | 'Reported by Committee'
  | 'Passed Chamber'
  | 'Passed Legislature'
  | 'Enacted'
  | 'Vetoed'
  | 'Failed';

export type VoteChoice = 'Yea' | 'Nay' | 'Present' | 'Absent' | 'Not Voting';

export type ClaimVerdict =
  | 'Supported by evidence'
  | 'Mostly supported'
  | 'Misleading or missing important context'
  | 'Mostly unsupported'
  | 'Contradicted by available evidence'
  | 'Unverified'
  | 'Unchecked'
  | 'Opinion or prediction, not directly fact-checkable';

export type SourceType =
  | 'government'
  | 'official_record'
  | 'roll_call_vote'
  | 'primary_legislation'
  | 'journalism'
  | 'fact_checker'
  | 'academic'
  | 'public_statement';

export type AssertionType = 'factual' | 'opinion' | 'prediction' | 'value_judgment';

export type AssertionStatus = 'supported' | 'misleading' | 'contradicted' | 'unverified' | 'not_applicable';

export interface SourceItem {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: SourceType;
  reliabilityNotes?: string;
  publicationDate: string;
  retrievedAt: string;
  lastCheckedAt?: string;
  isPrimarySource: boolean;
}

export interface EvidenceItem {
  id: string;
  sourceId: string;
  sourceTitle: string;
  publisher: string;
  sourceUrl: string;
  publicationDate: string;
  retrievedAt: string;
  excerpt: string;
  evidenceType: SourceType;
  relevanceExplanation: string;
  stance: 'supports' | 'qualifies' | 'contradicts' | 'neutral';
  isOfficialRecord: boolean;
}

export interface AssertionEvaluation {
  id: string;
  assertionText: string;
  assertionType: AssertionType;
  status: AssertionStatus;
  explanation: string;
  evidenceIds: string[];
}

export interface ClaimAssessment {
  id: string;
  claimId: string;
  verdict: ClaimVerdict;
  shortExplanation: string;
  keyAssertions: AssertionEvaluation[];
  supportingEvidence: EvidenceItem[];
  contradictingOrQualifyingEvidence: EvidenceItem[];
  missingContext: string[];
  remainingUncertainty: string[];
  primarySources: SourceItem[];
  factChecksAndReporting: SourceItem[];
  methodologyAndLimitations: string;
  lastAssessedAt: string;
  methodologyVersion: string;
  assessedBy: 'deterministic_engine' | 'local_ollama_verified';
}

export interface Claim {
  id: string;
  claimText: string;
  submittedContent?: string;
  speakerOrSource?: string;
  contextOrEvent?: string;
  topic: string;
  submissionDate: string;
  isDemo: boolean;
  investigationStatus: 'complete' | 'in_progress' | 'unverified';
  assessment: ClaimAssessment;
  tags: string[];
}

export interface LegislativeAction {
  date: string;
  chamber: Chamber;
  actionText: string;
  isKeyMilestone?: boolean;
}

export interface RollCallVote {
  id: string;
  billId: string;
  billNumber: string;
  chamber: Chamber;
  voteDate: string;
  rollCallNumber: string;
  motion: string;
  result: 'Passed' | 'Failed';
  yeas: number;
  nays: number;
  present: number;
  absent: number;
  officialVotes: {
    officialId: string;
    officialName: string;
    party: string;
    district: string;
    vote: VoteChoice;
  }[];
  officialJournalUrl: string;
}

export interface DynamicCampaignUpdate {
  id: string;
  raceId: string;
  candidateName: string;
  headline: string;
  publisher: string;
  sourceUrl: string;
  publicationDate: string;
  summary: string;
  impactOnStandings?: string;
}

export interface DynamicLegislativeBill {
  id: string;
  billNumber: string;
  title: string;
  session: string;
  chamber: 'Texas House' | 'Texas Senate' | 'U.S. Congress';
  author: string;
  status: string;
  topic: string;
  summary: string;
  journalUrl?: string;
  retrievedAt: string;
}

export interface Bill {
  id: string;
  officialBillNumber: string;
  title: string;
  caption: string;
  chamber: Chamber;
  session: string;
  status: LegislativeStatus;
  statusDate: string;
  author: string;
  coauthors: string[];
  summary: string;
  plainEnglishExplanation: string;
  officialUrl: string;
  lastUpdatedAt: string;
  actions: LegislativeAction[];
  keyVotes?: RollCallVote[];
  topic: string;
  isDemo?: boolean;
}

export interface Official {
  id: string;
  name: string;
  office: string;
  jurisdiction: 'Federal' | 'Texas Senate' | 'Texas House' | 'Texas Executive' | 'Texas Judicial' | 'Local';
  district: string;
  party: string;
  photoUrl?: string;
  officialWebsite: string;
  officialProfileUrl: string;
  officeAddress?: string;
  phone?: string;
  termExpires: string;
  bioSummary: string;
  recentVotes: {
    billNumber: string;
    billTitle: string;
    vote: VoteChoice;
    voteDate: string;
    sourceUrl: string;
  }[];
  sponsoredBills: {
    billNumber: string;
    billTitle: string;
    status: LegislativeStatus;
    officialUrl: string;
  }[];
  lastVerifiedAt: string;
}

export interface PolicyPosition {
  id: string;
  candidateId: string;
  issue: string;
  positionSummary: string;
  documentedStance: string;
  directQuotes?: string[];
  votingRecordContext?: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceType: SourceType;
  verificationStatus: 'Documented Action' | 'Public Stated Position' | 'Campaign Platform' | 'Insufficient Public Record';
  lastVerifiedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  officeSought: string;
  jurisdiction: 'Federal' | 'Texas Senate' | 'Texas House' | 'Texas Executive' | 'Texas Judicial';
  district: string;
  party: string;
  photoUrl?: string;
  campaignUrl: string;
  isIncumbent: boolean;
  electionId: string;
  electionName: string;
  electionDate: string;
  bioSummary: string;
  policyPositions: PolicyPosition[];
  lastVerifiedAt: string;
  campaignFinance?: {
    cashOnHand?: string;
    totalRaised?: string;
    source: string;
  };
  pollingSnapshot?: {
    estimate: string;
    trend: string;
    source: string;
  };
  careerHistory?: {
    education?: string;
    pastOffices?: string[];
    majorMilestones?: string[];
    ethicsAndLegalRecord?: string[];
    topDonorsAndPacs?: Array<{ name: string; amount: string; type: string }>;
  };
  attackAdsAndPropaganda?: Array<{
    id: string;
    sloganOrClaim: string;
    targetOrTopic: string;
    sponsoringPac: string;
    adMedium: string;
    claimedAssertion: string;
    realityCheck: string;
    verifiableSourceUrl: string;
    sourceTitle: string;
    adTitle?: string;
    videoUrl?: string;
    videoEmbedId?: string;
    airDates?: string;
    fccFileNumber?: string;
    isAutonomousDetection?: boolean;
  }>;
}

export interface CampaignRace {
  id: string;
  name: string;
  cycle: string;
  status: string;
  candidateAId: string;
  candidateBId: string;
  pollingSummary: string;
  financeSummary: string;
  keyIssues: string[];
  primaryElectionDate?: string;
  primaryRunoffDate?: string;
  generalElectionDate?: string;
}

export interface TexasDistrict {
  id: string;
  type: 'congressional' | 'state_senate' | 'state_house';
  districtNumber: string;
  name: string;
  region: string;
  majorCounties: string[];
  description: string;
  currentOfficialId: string;
  verifiedZipCodes: string[];
}

export interface UserDistrictPreference {
  congressionalDistrict: string;
  stateSenateDistrict: string;
  stateHouseDistrict: string;
  countyOrCity?: string;
  isManualSelection: boolean;
  selectedAt: string;
}

export interface OllamaConfig {
  baseUrl: string;
  model: string;
  enabled: boolean;
}
