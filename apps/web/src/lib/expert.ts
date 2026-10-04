/**
 * Expert score in the browser, for the interactive worked example. Mirrors
 * services/ml/biomed_ml/expert.py (trapezoid fits, habitat weights, hard constraints).
 */
import type { Band, Parameter } from './types';

export const HARD_CAP = 25;

export function trapezoid(value: number | null, b: Band): number | null {
  if (value === null || Number.isNaN(value)) return null;
  if (value >= b.opt_min && value <= b.opt_max) return 100;
  if (value <= b.min || value >= b.max) return 0;
  if (value < b.opt_min) return (100 * (value - b.min)) / (b.opt_min - b.min);
  return (100 * (b.max - value)) / (b.max - b.opt_max);
}

export interface ExpertInput {
  parameters: Parameter[];
  values: Record<string, number | null>;
  /** Lowest / highest monthly values for lethal parameters, keyed by parameter. */
  extremes?: Record<string, { low?: number | null; high?: number | null }>;
}

export interface ExpertOutput {
  score: number | null;
  uncapped: number | null;
  completeness: number;
  fits: { key: string; fit: number | null; weight: number; contribution: number }[];
  violations: { key: string; side: 'below' | 'above'; value: number; limit: number }[];
}

export function expertScore({ parameters, values, extremes = {} }: ExpertInput): ExpertOutput {
  const fits = parameters.map((p) => {
    const fit = p.band ? trapezoid(values[p.key] ?? null, p.band) : null;
    return { key: p.key, fit, weight: p.weight, contribution: 0 };
  });
  const violations: ExpertOutput['violations'] = [];
  for (const p of parameters) {
    const b = p.band;
    if (!b?.lethal) continue;
    const low = extremes[p.key]?.low ?? values[p.key] ?? null;
    const high = extremes[p.key]?.high ?? values[p.key] ?? null;
    const minLimit = b.extreme_min ?? b.min;
    const maxLimit = b.extreme_max ?? b.max;
    if (low !== null && low < minLimit)
      violations.push({ key: p.key, side: 'below', value: low, limit: minLimit });
    if (high !== null && high > maxLimit)
      violations.push({ key: p.key, side: 'above', value: high, limit: maxLimit });
  }
  const total = parameters.reduce((s, p) => s + p.weight, 0);
  const available = fits.filter((f) => f.fit !== null);
  const wAvail = available.reduce((s, f) => s + f.weight, 0);
  if (!available.length) return { score: null, uncapped: null, completeness: 0, fits, violations };
  for (const f of available) f.contribution = (f.weight * (f.fit ?? 0)) / wAvail;
  const uncapped = available.reduce((s, f) => s + f.contribution, 0);
  const score = violations.length ? Math.min(uncapped, HARD_CAP) : uncapped;
  return { score, uncapped, completeness: total ? wAvail / total : 0, fits, violations };
}
