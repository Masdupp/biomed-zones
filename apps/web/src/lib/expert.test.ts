import { HARD_CAP, expertScore, trapezoid } from './expert';
import type { Parameter } from './types';

const band = { min: 0, opt_min: 10, opt_max: 20, max: 30 };

describe('trapezoid', () => {
  it.each([
    [15, 100],
    [5, 50],
    [25, 50],
    [0, 0],
    [35, 0],
  ])('fit(%d) = %d', (v, expected) => expect(trapezoid(v, band)).toBeCloseTo(expected));
  it('returns null for missing values', () => expect(trapezoid(null, band)).toBeNull());
});

// Arenicola marina bands and the Baie du Mont-Saint-Michel values (mirrors the Python regression test).
const P: Parameter[] = [
  {
    key: 'temperature',
    label: 'T',
    feature: 'sst_mean',
    unit: '°C',
    weight: 0.3,
    band: { min: 0, opt_min: 8, opt_max: 18, max: 26, lethal: true },
  },
  {
    key: 'salinity',
    label: 'S',
    feature: 'sss_mean',
    unit: 'PSU',
    weight: 0.2,
    band: { min: 12, opt_min: 25, opt_max: 35, max: 40, lethal: true },
  },
  {
    key: 'ph',
    label: 'pH',
    feature: 'ph_mean',
    unit: 'pH',
    weight: 0.2,
    band: { min: 7.4, opt_min: 7.8, opt_max: 8.3, max: 8.7 },
  },
  {
    key: 'depth',
    label: 'D',
    feature: 'depth_mean',
    unit: 'm',
    weight: 0.15,
    band: { min: -8, opt_min: -6, opt_max: 2, max: 15 },
  },
  {
    key: 'oxygen',
    label: 'O2',
    feature: 'o2_mean',
    unit: 'mmol/m³',
    weight: 0.15,
    band: { min: 60, opt_min: 180, opt_max: 350, max: 450, lethal: true },
  },
];
const BAY = { temperature: 14.19, salinity: 33.85, ph: 8.007, depth: -4.43, oxygen: 267.2 };

describe('expertScore (worked example)', () => {
  it('scores the bay cell 100 with full completeness', () => {
    const r = expertScore({ parameters: P, values: BAY, extremes: { temperature: { low: 8.1 } } });
    expect(r.score).toBeCloseTo(100);
    expect(r.completeness).toBe(1);
    expect(r.violations).toEqual([]);
  });

  it('caps the score when the coldest month falls below the survival limit', () => {
    const r = expertScore({ parameters: P, values: BAY, extremes: { temperature: { low: -1 } } });
    expect(r.uncapped).toBeCloseTo(100);
    expect(r.score).toBe(HARD_CAP);
    expect(r.violations[0]).toMatchObject({ key: 'temperature', side: 'below', limit: 0 });
  });

  it('renormalises weights over available parameters', () => {
    const r = expertScore({ parameters: P, values: { ...BAY, depth: 15 } });
    expect(r.score).toBeCloseTo(85); // depth fit 0 × 0.15
    const missing = expertScore({ parameters: P, values: { ...BAY, ph: null } });
    expect(missing.completeness).toBeCloseTo(0.8);
    expect(missing.score).toBeCloseTo(100);
  });
});
