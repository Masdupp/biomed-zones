/**
 * Viridis (van der Walt & Smith, matplotlib): perceptually uniform, readable in greyscale and
 * for the common colour-vision deficiencies. 11 stops, linearly interpolated.
 */
const VIRIDIS: [number, number, number][] = [
  [68, 1, 84],
  [72, 36, 117],
  [65, 68, 135],
  [53, 95, 141],
  [42, 120, 142],
  [33, 145, 140],
  [34, 168, 132],
  [68, 191, 112],
  [122, 209, 81],
  [189, 223, 38],
  [253, 231, 37],
];

export type RGB = [number, number, number];

export function viridis(t: number): RGB {
  const x = Math.min(1, Math.max(0, t)) * (VIRIDIS.length - 1);
  const i = Math.min(VIRIDIS.length - 2, Math.floor(x));
  const f = x - i;
  const [a0, a1, a2] = VIRIDIS[i] ?? [0, 0, 0];
  const [b0, b1, b2] = VIRIDIS[i + 1] ?? [0, 0, 0];
  return [
    Math.round(a0 + (b0 - a0) * f),
    Math.round(a1 + (b1 - a1) * f),
    Math.round(a2 + (b2 - a2) * f),
  ];
}

export const toCss = ([r, g, b]: RGB) => `rgb(${r} ${g} ${b})`;

/** Map colour of a cell: viridis by score; excluded cells neutral grey. */
export function cellColor(
  score: number,
  category: string,
  alpha = 215,
): [number, number, number, number] {
  if (category === 'excluded') return [148, 152, 158, 110];
  return [...viridis(score / 100), alpha];
}

export const VIRIDIS_GRADIENT = `linear-gradient(to right, ${Array.from({ length: 11 }, (_, i) => toCss(viridis(i / 10))).join(', ')})`;

export const CATEGORY_LABEL: Record<string, string> = {
  high: 'High',
  moderate: 'Moderate',
  low: 'Low',
  unsuitable: 'Unsuitable',
  indoor_only: 'Indoor only',
  excluded: 'Excluded',
};

/** Badge tone for a score category. */
export function categoryTone(c: string) {
  if (c === 'high') return 'success' as const;
  if (c === 'moderate') return 'brand' as const;
  if (c === 'indoor_only' || c === 'excluded') return 'accent' as const;
  return 'neutral' as const;
}

/** Categorical chart series (dataviz reference palette, see tokens.css). */
export const SERIES = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)'];
