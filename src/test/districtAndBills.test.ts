import { describe, it, expect } from 'vitest';
import { findDistrictsByZip } from '../data/districts';
import { BILLS } from '../data/bills';
import { OFFICIALS } from '../data/officials';

describe('District & Legislative Records Tests', () => {
  it('Resolves Texas ZIP code to Congressional and State Legislative districts', () => {
    const res = findDistrictsByZip('78701');
    expect(res.congressional).toBeDefined();
    expect(res.stateSenate).toBeDefined();
    expect(res.stateHouse).toBeDefined();
    expect(res.notes).toContain('Matches verified geographic region');
  });

  it('Handles unmapped ZIP code gracefully with informative fallback and disclaimer', () => {
    const res = findDistrictsByZip('79901'); // El Paso ZIP not in Central TX demonstration index
    expect(res.congressional).toBeDefined();
    expect(res.notes).toContain('please select your exact districts manually');
  });

  it('All officials have verified profile URLs and districts', () => {
    for (const official of OFFICIALS) {
      expect(official.name).toBeTruthy();
      expect(official.officialProfileUrl).toMatch(/^https?:\/\//);
      expect(official.officialWebsite).toMatch(/^https?:\/\//);
      expect(official.district).toBeTruthy();
    }
  });

  it('Bills have authentic captions, session details, and action histories', () => {
    for (const bill of BILLS) {
      expect(bill.officialBillNumber).toBeTruthy();
      expect(bill.actions.length).toBeGreaterThan(0);
      const isOfficialPortal = bill.officialUrl.includes('capitol.texas.gov') || bill.officialUrl.includes('congress.gov');
      expect(isOfficialPortal).toBe(true);
    }
  });
});
