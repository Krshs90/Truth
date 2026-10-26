import { describe, it, expect } from 'vitest';
import {
  extractAssertions,
  retrieveEvidenceForQuery,
  investigateClaim,
} from '../services/investigationEngine';

describe('Investigation Engine - Pipeline Tests', () => {
  it('Step 1: Separates factual assertions from opinions and predictions', () => {
    const text = 'Texas passed an $18 billion property tax cut in 2023. School vouchers will destroy public schools within five years.';
    const { assertions } = extractAssertions(text);

    expect(assertions.length).toBe(2);
    expect(assertions[0].type).toBe('factual');
    expect(assertions[1].type).toBe('prediction');
  });

  it('Step 1: Detects value judgments and rhetorical expressions', () => {
    const text = 'This radical proposal is the worst legislation ever drafted.';
    const { assertions } = extractAssertions(text);

    expect(assertions.length).toBe(1);
    expect(assertions[0].type).toBe('value_judgment');
  });

  it('Step 2: Retrieves primary evidence for bill numbers and topics', () => {
    const res = retrieveEvidenceForQuery('SB 2 property tax cut');
    expect(res.matchingEvidence.length).toBeGreaterThan(0);
    expect(res.primarySources.length).toBeGreaterThan(0);
    expect(res.primarySources[0].url).toContain('capitol.texas.gov');
  });

  it('Step 3 & 4: Correctly matches pre-researched claims with full audit trail', async () => {
    const result = await investigateClaim('Texas passed an $18 billion property tax cut in 2023.');
    expect(result.claim.assessment.verdict).toBe('Mostly supported');
    expect(result.claim.assessment.supportingEvidence.length).toBeGreaterThan(0);
    expect(result.claim.assessment.primarySources.length).toBeGreaterThan(0);
  });

  it('Step 3 & 4: Correctly assigns "Unverified" when no supporting records exist', async () => {
    const result = await investigateClaim('Candidate XYZ received space alien campaign donations.');
    expect(result.claim.assessment.verdict).toBe('Unverified');
    expect(result.claim.assessment.supportingEvidence.length).toBe(0);
    expect(result.claim.assessment.verdict).not.toBe('Contradicted by available evidence');
  });

  it('Step 3 & 4: Correctly categorizes pure predictions as non-fact-checkable opinions', async () => {
    const result = await investigateClaim('Vouchers will destroy all Texas public schools within five years.');
    expect(result.claim.assessment.verdict).toBe('Opinion or prediction, not directly fact-checkable');
  });
});
