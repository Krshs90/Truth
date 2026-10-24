import {
  AssertionEvaluation,
  AssertionType,
  Claim,
  ClaimVerdict,
  EvidenceItem,
  SourceItem,
} from '../types';
import { BILLS } from '../data/bills';
import { CLAIMS } from '../data/claims';
import { OFFICIALS } from '../data/officials';
import { TRUSTED_SOURCES } from '../data/sources';

export interface InvestigationResult {
  claim: Claim;
  isAiEnhanced: boolean;
  retrievalSummary: {
    sourcesScanned: number;
    primaryEvidenceFound: number;
    corroboratingReportsFound: number;
  };
}

/**
 * Stage 1: Extract individual assertions from user input text.
 * Distinguishes factual assertions, predictions, opinions, and value judgments.
 */
export function extractAssertions(inputText: string): {
  assertions: { text: string; type: AssertionType; rationale: string }[];
} {
  const clean = inputText.trim();
  const sentences = clean
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);

  if (sentences.length === 0) {
    sentences.push(clean);
  }

  const assertions: { text: string; type: AssertionType; rationale: string }[] = [];

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();

    // Check for future predictions
    if (
      lower.includes('will destroy') ||
      lower.includes('will bankrupt') ||
      lower.includes('will collapse') ||
      lower.includes('will lead to') ||
      lower.includes('in the future') ||
      lower.includes('will cause')
    ) {
      assertions.push({
        text: sentence,
        type: 'prediction',
        rationale: 'Speculates on future outcomes rather than verifiable historical actions.',
      });
    }
    // Check for subjective value judgments / rhetoric
    else if (
      lower.includes('corrupt') ||
      lower.includes('worst') ||
      lower.includes('radical') ||
      lower.includes('evil') ||
      lower.includes('terrible') ||
      lower.includes('heroic') ||
      lower.includes('patriot') ||
      lower.includes('disgrace')
    ) {
      assertions.push({
        text: sentence,
        type: 'value_judgment',
        rationale: 'Expresses rhetorical appraisal or normative judgment.',
      });
    }
    // Check for stated beliefs / candidate intent
    else if (
      lower.includes('wants to') ||
      lower.includes('believes that') ||
      lower.includes('plans to') ||
      lower.includes('hopes to')
    ) {
      assertions.push({
        text: sentence,
        type: 'opinion',
        rationale: 'Characterizes legislative intent or personal ambition rather than an enacted vote.',
      });
    }
    // Default to verifiable factual assertion
    else {
      assertions.push({
        text: sentence,
        type: 'factual',
        rationale: 'Asserts a specific past vote, statutory enactment, appropriation, or empirical statistic.',
      });
    }
  }

  return { assertions };
}

/**
 * Stage 2: Retrieve relevant primary evidence from indexed repository.
 */
export function retrieveEvidenceForQuery(query: string): {
  primarySources: SourceItem[];
  matchingEvidence: EvidenceItem[];
  exactMatchClaim?: Claim;
} {
  const qLower = query.toLowerCase();

  // 1. Check for close pre-researched claim match
  const exactMatch = CLAIMS.find((c) => {
    const claimLower = c.claimText.toLowerCase();
    const words = qLower.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = words.filter((w) => claimLower.includes(w)).length;
    return matchCount >= Math.min(3, words.length) || claimLower.includes(qLower) || qLower.includes(claimLower);
  });

  if (exactMatch) {
    return {
      primarySources: exactMatch.assessment.primarySources,
      matchingEvidence: [
        ...exactMatch.assessment.supportingEvidence,
        ...exactMatch.assessment.contradictingOrQualifyingEvidence,
      ],
      exactMatchClaim: exactMatch,
    };
  }

  // 2. Scan bills for references
  const matchedBills = BILLS.filter((b) => {
    const numLower = b.officialBillNumber.toLowerCase();
    const titleLower = b.title.toLowerCase();
    const sumLower = b.summary.toLowerCase();
    return (
      qLower.includes(numLower) ||
      (qLower.includes('sb 2') && numLower.includes('sb 2')) ||
      (qLower.includes('sb 4') && numLower.includes('sb 4')) ||
      (qLower.includes('sb 3') && numLower.includes('sb 3')) ||
      (qLower.includes('sb 17') && numLower.includes('sb 17')) ||
      (qLower.includes('voucher') && (numLower.includes('hb 1') || titleLower.includes('voucher'))) ||
      (qLower.includes('infrastructure') && b.id.includes('hr3684')) ||
      wordsOverlap(qLower, titleLower) ||
      wordsOverlap(qLower, sumLower)
    );
  });

  const matchingEvidence: EvidenceItem[] = [];
  const primarySources: SourceItem[] = [];

  for (const bill of matchedBills) {
    primarySources.push({
      id: `src-${bill.id}`,
      title: `${bill.officialBillNumber}: ${bill.title}`,
      publisher: 'Texas Legislature Online / Congress.gov',
      url: bill.officialUrl,
      sourceType: 'primary_legislation',
      publicationDate: bill.statusDate,
      retrievedAt: new Date().toISOString().split('T')[0],
      isPrimarySource: true,
      reliabilityNotes: 'Official statutory repository document.',
    });

    matchingEvidence.push({
      id: `ev-${bill.id}-summary`,
      sourceId: `src-${bill.id}`,
      sourceTitle: `${bill.officialBillNumber} Official Summary`,
      publisher: 'Legislative Record',
      sourceUrl: bill.officialUrl,
      publicationDate: bill.statusDate,
      retrievedAt: new Date().toISOString().split('T')[0],
      excerpt: bill.summary,
      evidenceType: 'primary_legislation',
      relevanceExplanation: `Official text and status of ${bill.officialBillNumber}. Status: ${bill.status}.`,
      stance: 'supports',
      isOfficialRecord: true,
    });

    if (bill.keyVotes) {
      for (const vote of bill.keyVotes) {
        matchingEvidence.push({
          id: `ev-vote-${vote.id}`,
          sourceId: `src-${bill.id}`,
          sourceTitle: `${vote.billNumber} - ${vote.rollCallNumber}`,
          publisher: `${vote.chamber} Journal`,
          sourceUrl: vote.officialJournalUrl,
          publicationDate: vote.voteDate,
          retrievedAt: new Date().toISOString().split('T')[0],
          excerpt: `Motion: ${vote.motion}. Result: ${vote.result} (Yeas: ${vote.yeas}, Nays: ${vote.nays}).`,
          evidenceType: 'roll_call_vote',
          relevanceExplanation: `Official roll-call record from ${vote.chamber} proceedings.`,
          stance: 'supports',
          isOfficialRecord: true,
        });
      }
    }
  }

  // 3. Scan officials for name match
  const matchedOfficials = OFFICIALS.filter((o) => qLower.includes(o.name.toLowerCase()));
  for (const off of matchedOfficials) {
    primarySources.push({
      id: `src-${off.id}`,
      title: `${off.name} - Official Legislative Profile`,
      publisher: off.jurisdiction === 'Federal' ? 'Congress.gov' : 'Texas Legislature',
      url: off.officialProfileUrl,
      sourceType: 'government',
      publicationDate: 'Official Directory',
      retrievedAt: new Date().toISOString().split('T')[0],
      isPrimarySource: true,
    });
  }

  return { primarySources, matchingEvidence };
}

function wordsOverlap(a: string, b: string): boolean {
  const wordsA = a.split(/\s+/).filter((w) => w.length > 4);
  return wordsA.some((w) => b.includes(w));
}

/**
 * Stage 3 & 4: Evaluate Evidence and Produce Transparent Report
 */
export async function investigateClaim(
  inputText: string,
  options?: {
    speakerOrSource?: string;
    contextOrEvent?: string;
    useOllama?: boolean;
    ollamaEndpoint?: string;
    ollamaModel?: string;
  }
): Promise<InvestigationResult> {
  const { assertions } = extractAssertions(inputText);
  const retrieval = retrieveEvidenceForQuery(inputText);

  // If there is an exact verified match in our research library, return it directly
  if (retrieval.exactMatchClaim) {
    return {
      claim: retrieval.exactMatchClaim,
      isAiEnhanced: false,
      retrievalSummary: {
        sourcesScanned: TRUSTED_SOURCES.length + BILLS.length,
        primaryEvidenceFound: retrieval.exactMatchClaim.assessment.supportingEvidence.length,
        corroboratingReportsFound: retrieval.exactMatchClaim.assessment.primarySources.length,
      },
    };
  }

  // Otherwise, construct a grounded assessment from retrieved evidence
  const evaluatedAssertions: AssertionEvaluation[] = assertions.map((a, idx) => {
    if (a.type === 'prediction' || a.type === 'value_judgment') {
      return {
        id: `asrt-eval-${idx}`,
        assertionText: a.text,
        assertionType: a.type,
        status: 'not_applicable',
        explanation: a.rationale,
        evidenceIds: [],
      };
    }

    // Check if evidence exists
    const matchingEv = retrieval.matchingEvidence.filter((ev) =>
      ev.excerpt.toLowerCase().includes(a.text.toLowerCase().substring(0, 15)) ||
      wordsOverlap(a.text.toLowerCase(), ev.excerpt.toLowerCase())
    );

    if (matchingEv.length > 0) {
      return {
        id: `asrt-eval-${idx}`,
        assertionText: a.text,
        assertionType: a.type,
        status: 'supported',
        explanation: `Corroborated by ${matchingEv[0].sourceTitle}.`,
        evidenceIds: matchingEv.map((e) => e.id),
      };
    }

    return {
      id: `asrt-eval-${idx}`,
      assertionText: a.text,
      assertionType: a.type,
      status: 'unverified',
      explanation: 'No primary legislative roll call or official agency document in the indexed repository confirms or disproves this specific assertion.',
      evidenceIds: [],
    };
  });

  // Determine Verdict strictly by analytical rubric
  let verdict: ClaimVerdict = 'Unverified';
  let shortExplanation = 'The available primary records in the demonstration index are insufficient to substantiate or refute this claim.';

  const hasPredictionsOnly = evaluatedAssertions.every(
    (a) => a.assertionType === 'prediction' || a.assertionType === 'value_judgment'
  );

  if (hasPredictionsOnly) {
    verdict = 'Opinion or prediction, not directly fact-checkable';
    shortExplanation = 'This statement consists of political rhetoric or future predictions rather than an empirical factual assertion.';
  } else if (retrieval.matchingEvidence.length > 0) {
    const supportedCount = evaluatedAssertions.filter((a) => a.status === 'supported').length;
    const totalFactual = evaluatedAssertions.filter((a) => a.assertionType === 'factual').length;

    if (supportedCount === totalFactual && totalFactual > 0) {
      verdict = 'Supported by evidence';
      shortExplanation = 'Primary legislative and government records confirm the factual assertions made in this statement.';
    } else if (supportedCount > 0) {
      verdict = 'Misleading or missing important context';
      shortExplanation = 'Certain elements align with official records, but key qualifiers or contextual limits are omitted.';
    }
  }

  // Check if Ollama AI enhancement is requested and available
  let isAiEnhanced = false;
  if (options?.useOllama && retrieval.matchingEvidence.length > 0) {
    try {
      const aiResponse = await fetch('/api/ai/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimText: inputText,
          retrievedEvidence: retrieval.matchingEvidence,
          model: options.ollamaModel || 'llama3',
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        if (aiData?.explanation) {
          shortExplanation = aiData.explanation;
          isAiEnhanced = true;
        }
      }
    } catch {
      // Gracefully fall back to deterministic assessment without failing
      isAiEnhanced = false;
    }
  }

  const newClaim: Claim = {
    id: `claim-user-${Date.now()}`,
    claimText: inputText,
    submittedContent: inputText,
    speakerOrSource: options?.speakerOrSource || 'User Submitted Claim',
    contextOrEvent: options?.contextOrEvent || 'Direct Workspace Submission',
    topic: 'User Investigation',
    submissionDate: new Date().toISOString().split('T')[0],
    isDemo: true,
    investigationStatus: 'complete',
    tags: ['User Submission', 'Direct Analysis'],
    assessment: {
      id: `assess-${Date.now()}`,
      claimId: `claim-user-${Date.now()}`,
      verdict,
      shortExplanation,
      keyAssertions: evaluatedAssertions,
      supportingEvidence: retrieval.matchingEvidence.filter((e) => e.stance === 'supports'),
      contradictingOrQualifyingEvidence: retrieval.matchingEvidence.filter(
        (e) => e.stance === 'qualifies' || e.stance === 'contradicts'
      ),
      missingContext:
        retrieval.matchingEvidence.length === 0
          ? [
              'No official bill number or official roll call was explicitly referenced in the input text.',
              'Independent review of Texas Legislature Online (capitol.texas.gov) is recommended to find primary bill files.',
            ]
          : [
              'Review the official bill history on Texas Legislature Online to confirm current legislative status.',
            ],
      remainingUncertainty:
        verdict === 'Unverified'
          ? ['Primary government documentation could not be automatically located in the demonstration repository.']
          : [],
      primarySources: retrieval.primarySources,
      factChecksAndReporting: [],
      methodologyAndLimitations:
        'Evaluated via Truth Deterministic Verification Pipeline against official Texas and Federal public records. Adheres to Section 6 nonpartisan evidential rubrics.',
      lastAssessedAt: new Date().toISOString().split('T')[0],
      methodologyVersion: 'Truth-v1.2',
      assessedBy: isAiEnhanced ? 'local_ollama_verified' : 'deterministic_engine',
    },
  };

  return {
    claim: newClaim,
    isAiEnhanced,
    retrievalSummary: {
      sourcesScanned: TRUSTED_SOURCES.length + BILLS.length,
      primaryEvidenceFound: retrieval.matchingEvidence.length,
      corroboratingReportsFound: retrieval.primarySources.length,
    },
  };
}
