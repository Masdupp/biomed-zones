const nf0 = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export const int = (v: number | null | undefined) =>
  v === null || v === undefined ? '—' : nf0.format(v);
export const one = (v: number | null | undefined) =>
  v === null || v === undefined ? '—' : nf1.format(v);
export const two = (v: number | null | undefined) =>
  v === null || v === undefined ? '—' : nf2.format(v);

/** Sensible precision for an environmental value given its magnitude. */
export function value(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const a = Math.abs(v);
  if (a >= 100) return nf0.format(v);
  if (a >= 10) return nf1.format(v);
  return nf2.format(v);
}

export const date = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

export const pct = (v: number | null | undefined) =>
  v === null || v === undefined ? '—' : `${nf0.format(v * 100)} %`;
