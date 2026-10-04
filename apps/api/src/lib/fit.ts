/** Trapezoid fit, identical to services/ml/biomed_ml/expert.py::trapezoid. */
export interface Band {
  min: number;
  opt_min: number;
  opt_max: number;
  max: number;
}

export function trapezoid(value: number | null | undefined, b: Band): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  if (value >= b.opt_min && value <= b.opt_max) return 100;
  if (value <= b.min || value >= b.max) return 0;
  if (value < b.opt_min) return (100 * (value - b.min)) / (b.opt_min - b.min);
  return (100 * (b.max - value)) / (b.max - b.opt_max);
}
