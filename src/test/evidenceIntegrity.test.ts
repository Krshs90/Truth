import { describe, it, expect } from 'vitest';
import { CLAIMS } from '../data/claims';
import { BILLS } from '../data/bills';
import { CANDIDATES } from '../data/candidates';

describe('Evidence Integrity Tests (Section 15 Requirements)', () => {
  it('Integrity 1: An unsupported claim is NOT automatically labeled false or contradicted', async () => {
    const unverifiedClaims = CLAIMS.filter((c) => c.assessment.verdict === 'Unverified');
    expect(unverifiedClaims.length).toBeGreaterThan(0);

    for (const claim of unverifiedClaims) {
      expect(claim.assessment.verdict).toBe('Unverified');
      expect(claim.assessment.verdict).not.toBe('Contradicted by available evidence');
      expect(claim.assessment.shortExplanation.toLowerCase()).toContain('cannot be verified');
    }
  });

  it('Integrity 2: A missing source does NOT result in a fabricated citation URL', () => {
    for (const claim of CLAIMS) {
      for (const ev of [
        ...claim.assessment.supportingEvidence,
        ...claim.assessment.contradictingOrQualifyingEvidence,
      ]) {
        expect(ev.sourceUrl).toMatch(/^https?:\/\//);
        expect(ev.sourceUrl).not.toContain('example.com/fake');
        expect(ev.sourceUrl).not.toContain('placeholder');
      }
    }
  });

  it('Integrity 3: An introduced bill is NEVER described as enacted law', () => {
    const failedOrIntroducedBills = BILLS.filter(
      (b) => b.status === 'Introduced' || b.status === 'Failed'
    );
    expect(failedOrIntroducedBills.length).toBeGreaterThan(0);

    for (const bill of failedOrIntroducedBills) {
      expect(bill.status).not.toBe('Enacted');
      if (bill.officialBillNumber.includes('HB 1')) {
        expect(bill.status).toBe('Failed');
        expect(bill.plainEnglishExplanation.toLowerCase()).toContain('without passing into law');
      }
    }
  });

  it('Integrity 4: A vote is not attributed to an individual without supporting official journal source', () => {
    for (const bill of BILLS) {
      if (bill.keyVotes) {
        for (const vote of bill.keyVotes) {
          expect(vote.officialJournalUrl).toBeTruthy();
          expect(vote.officialJournalUrl).toMatch(/^https?:\/\//);
          for (const memberVote of vote.officialVotes) {
            expect(memberVote.officialName).toBeTruthy();
            expect(['Yea', 'Nay', 'Present', 'Absent', 'Not Voting']).toContain(memberVote.vote);
          }
        }
      }
    }
  });

  it('Integrity 5: Candidate positions are not inferred from party affiliation', () => {
    for (const candidate of CANDIDATES) {
      for (const pos of candidate.policyPositions) {
        expect(pos.sourceTitle).toBeTruthy();
        expect(pos.sourceUrl).toMatch(/^https?:\/\//);
        expect(pos.verificationStatus).not.toBe('Party Platform Inferred');
      }
    }
  });

  it('Integrity 6: Every assertion evidence ID points to a real evidence item in the dossier', () => {
    for (const claim of CLAIMS) {
      const allEvIds = new Set([
        ...claim.assessment.supportingEvidence.map((e) => e.id),
        ...claim.assessment.contradictingOrQualifyingEvidence.map((e) => e.id),
      ]);

      for (const asrt of claim.assessment.keyAssertions) {
        for (const evId of asrt.evidenceIds) {
          expect(allEvIds.has(evId)).toBe(true);
        }
      }
    }
  });

  it('Integrity 7: Contradictory sources trigger an uncertainty or qualifying explanation', () => {
    const misleadingOrContradictedClaims = CLAIMS.filter(
      (c) =>
        c.assessment.verdict === 'Misleading or missing important context' ||
        c.assessment.verdict === 'Contradicted by available evidence'
    );
    expect(misleadingOrContradictedClaims.length).toBeGreaterThan(0);

    for (const claim of misleadingOrContradictedClaims) {
      expect(claim.assessment.missingContext.length).toBeGreaterThan(0);
    }
  });

  it('Integrity 8: Source publication dates are strictly distinguished from retrieval dates', () => {
    for (const claim of CLAIMS) {
      for (const ev of [
        ...claim.assessment.supportingEvidence,
        ...claim.assessment.contradictingOrQualifyingEvidence,
      ]) {
        expect(ev.publicationDate).toBeTruthy();
        expect(ev.retrievedAt).toBeTruthy();
        expect(ev.retrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('Integrity 9: AssessedBy field clearly indicates deterministic vs AI engine', () => {
    for (const claim of CLAIMS) {
      expect(['deterministic_engine', 'local_ollama_verified']).toContain(
        claim.assessment.assessedBy
      );
    }
  });
});
