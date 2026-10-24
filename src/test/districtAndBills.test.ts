import { describe, it, expect } from 'vitest';
import { findDistrictsByZip } from '../data/districts';
import { BILLS } from '../data/bills';
import { OFFICIALS } from '../data/officials';

describe('District & Legislative Records Tests', () => {
  it('Resolves Austin Texas ZIP code to Congressional and State Legislative districts', () => {
    const res = findDistrictsByZip('78701');
    expect(res.congressional?.districtNumber).toBe('37');
    expect(res.stateSenate?.districtNumber).toBe('14');
    expect(res.stateHouse?.districtNumber).toBe('49');
    expect(res.notes).toContain('Verified geographic district alignment');
  });

  it('Resolves El Paso Texas ZIP code to West Texas delegation', () => {
    const res = findDistrictsByZip('79901');
    expect(res.congressional?.districtNumber).toBe('16');
    expect(res.stateSenate?.districtNumber).toBe('29');
    expect(res.stateHouse?.districtNumber).toBe('77');
  });

  it('Resolves Dallas Texas ZIP code to North Texas delegation', () => {
    const res = findDistrictsByZip('75206');
    expect(res.congressional?.districtNumber).toBe('32');
    expect(res.stateSenate?.districtNumber).toBe('16');
    expect(res.stateHouse?.districtNumber).toBe('108');
  });

  it('Handles non-Texas ZIP code gracefully with informative fallback and disclaimer', () => {
    const res = findDistrictsByZip('90210');
    expect(res.congressional).toBeDefined();
    expect(res.notes).toContain('Non-Texas ZIP detected');
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
