/** Small SVG charts drawn with design tokens (no chart library). */
import type { Band, CalibrationBin } from '@/lib/types';
import { value as fmtValue } from '@/lib/format';
import { SERIES } from '@/lib/color';

/** Tolerance band: full tolerance range (thin), optimal band (thick), survival limits, marker. */
export function RangeChart({
  band,
  unit,
  marker,
}: {
  band: Band;
  unit: string;
  marker?: number | null;
}) {
  const lo = Math.min(band.min, band.extreme_min ?? band.min, marker ?? band.min);
  const hi = Math.max(band.max, band.extreme_max ?? band.max, marker ?? band.max);
  const pad = (hi - lo) * 0.06 || 1;
  const d0 = lo - pad;
  const d1 = hi + pad;
  const x = (v: number) => ((v - d0) / (d1 - d0)) * 100;
  const hasMarker = marker !== undefined && marker !== null;
  const label = `Tolerance ${band.min} to ${band.max} ${unit}, optimum ${band.opt_min} to ${band.opt_max} ${unit}${
    hasMarker ? `, cell value ${fmtValue(marker)} ${unit}` : ''
  }`;
  return (
    <div role="img" aria-label={label}>
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="block h-5 w-full overflow-visible"
        aria-hidden="true"
      >
        <line
          x1={x(band.min)}
          x2={x(band.max)}
          y1={10}
          y2={10}
          stroke="var(--ink-subtle)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={x(band.opt_min)}
          width={Math.max(0.6, x(band.opt_max) - x(band.opt_min))}
          y={5}
          height={10}
          fill="var(--brand)"
          opacity={0.85}
        />
        {[band.extreme_min, band.extreme_max].map(
          (e, i) =>
            e !== undefined && (
              <line
                key={i}
                x1={x(e)}
                x2={x(e)}
                y1={2}
                y2={18}
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            ),
        )}
        {hasMarker && (
          <line
            x1={x(marker)}
            x2={x(marker)}
            y1={0}
            y2={20}
            stroke="var(--ink)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="num relative mt-0.5 h-4 text-[11px] text-ink-subtle">
        <span className="absolute -translate-x-1/2" style={{ left: `${x(band.min)}%` }}>
          {band.min}
        </span>
        <span
          className="absolute -translate-x-1/2 text-brand"
          style={{ left: `${(x(band.opt_min) + x(band.opt_max)) / 2}%` }}
        >
          {band.opt_min}–{band.opt_max}
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${x(band.max)}%` }}>
          {band.max}
        </span>
      </div>
    </div>
  );
}

/** Two lines for long axis labels ("Dissolved oxygen" → "Dissolved" / "oxygen"). */
function labelLines(label: string): string[] {
  const i = label.indexOf(' ');
  return label.length > 10 && i > 0 ? [label.slice(0, i), label.slice(i + 1)] : [label];
}

/** Radar of parameter fits (0–100) for up to four series. */
export function RadarChart({
  axes,
  series,
  size = 280,
}: {
  axes: string[];
  series: { name: string; values: (number | null)[] }[];
  size?: number;
}) {
  const c = size / 2;
  const r = c - 64;
  const n = axes.length;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [c + Math.cos(a) * r * (v / 100), c + Math.sin(a) * r * (v / 100)] as const;
  };
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full max-w-[340px]"
      role="img"
      aria-label={`Radar chart of parameter fits for ${series.map((s) => s.name).join(', ')}`}
    >
      {[25, 50, 75, 100].map((g) => (
        <polygon
          key={g}
          points={axes.map((_, i) => pt(i, g).join(',')).join(' ')}
          fill="none"
          stroke="var(--chart-grid)"
          strokeWidth={1}
        />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 100);
        const [lx, ly] = pt(i, 118);
        return (
          <g key={a}>
            <line x1={c} y1={c} x2={x} y2={y} stroke="var(--chart-grid)" />
            <text
              x={lx}
              y={ly}
              textAnchor={lx < c - 1 ? 'end' : lx > c + 1 ? 'start' : 'middle'}
              dominantBaseline="middle"
              fontSize={10}
              fill="var(--ink-muted)"
            >
              {labelLines(a).map((line, j, all) => (
                <tspan key={j} x={lx} dy={j === 0 ? `${-(all.length - 1) * 0.6}em` : '1.2em'}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      {series.map((s, k) => (
        <polygon
          key={s.name}
          points={s.values.map((v, i) => pt(i, v ?? 0).join(',')).join(' ')}
          fill={SERIES[k]}
          fillOpacity={0.12}
          stroke={SERIES[k]}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ))}
      {series.map((s, k) =>
        s.values.map((v, i) => {
          const [x, y] = pt(i, v ?? 0);
          return (
            <circle
              key={`${k}-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill={SERIES[k]}
              stroke="var(--surface)"
              strokeWidth={1.5}
            />
          );
        }),
      )}
    </svg>
  );
}

/** Reliability diagram: raw (orange) vs. calibrated (blue) against the diagonal. */
export function CalibrationChart({
  raw,
  calibrated,
  label,
}: {
  raw: CalibrationBin[];
  calibrated: CalibrationBin[];
  label: string;
}) {
  const s = 120;
  const p = 14;
  const x = (v: number) => p + v * (s - 2 * p);
  const y = (v: number) => s - p - v * (s - 2 * p);
  const path = (bins: CalibrationBin[]) =>
    bins.map((b, i) => `${i ? 'L' : 'M'}${x(b.mean_predicted)},${y(b.observed)}`).join(' ');
  return (
    <svg
      viewBox={`0 0 ${s} ${s}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Calibration curve for ${label}`}
    >
      <rect
        x={p}
        y={p}
        width={s - 2 * p}
        height={s - 2 * p}
        fill="none"
        stroke="var(--chart-grid)"
      />
      <line
        x1={x(0)}
        y1={y(0)}
        x2={x(1)}
        y2={y(1)}
        stroke="var(--ink-subtle)"
        strokeDasharray="3 3"
        strokeWidth={0.8}
      />
      <path d={path(raw)} fill="none" stroke="var(--series-2)" strokeWidth={1.6} />
      <path d={path(calibrated)} fill="none" stroke="var(--series-1)" strokeWidth={1.6} />
      <text x={s / 2} y={s - 2} textAnchor="middle" fontSize={7} fill="var(--ink-subtle)">
        predicted
      </text>
      <text
        x={4}
        y={s / 2}
        textAnchor="middle"
        fontSize={7}
        fill="var(--ink-subtle)"
        transform={`rotate(-90 4 ${s / 2})`}
      >
        observed
      </text>
    </svg>
  );
}

/** Horizontal bars, one hue, values labelled. */
export function BarList({
  items,
  format = (v: number) => v.toFixed(2),
}: {
  items: { label: string; value: number }[];
  format?: (v: number) => string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1e-9);
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((i) => (
        <li
          key={i.label}
          className="grid grid-cols-[minmax(0,10rem)_1fr_3.5rem] items-center gap-2 text-xs"
        >
          <span className="truncate text-ink-muted" title={i.label}>
            {i.label}
          </span>
          <span className="h-2 rounded-sm bg-bg-subtle">
            <span
              className="block h-2 rounded-sm"
              style={{ width: `${(i.value / max) * 100}%`, background: 'var(--series-1)' }}
            />
          </span>
          <span className="num text-right text-ink">{format(i.value)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Diverging SHAP bars around zero: blue raises, red lowers (sign also written). */
export function ShapBars({
  items,
}: {
  items: { label: string; value: number | null; shap: number }[];
}) {
  const max = Math.max(...items.map((i) => Math.abs(i.shap)), 1e-9);
  return (
    <ul className="flex flex-col gap-1.5" aria-label="SHAP contributions (log-odds)">
      {items.map((i) => {
        const w = (Math.abs(i.shap) / max) * 50;
        const pos = i.shap >= 0;
        return (
          <li
            key={i.label}
            className="grid grid-cols-[minmax(0,9.5rem)_1fr_3.5rem] items-center gap-2 text-xs"
          >
            <span className="truncate text-ink-muted" title={`${i.label}: ${fmtValue(i.value)}`}>
              {i.label} <span className="num text-ink-subtle">{fmtValue(i.value)}</span>
            </span>
            <span className="relative h-2">
              <span className="absolute top-0 left-1/2 h-2 w-px bg-border-strong" />
              <span
                className="absolute top-0 h-2 rounded-sm"
                style={{
                  left: pos ? '50%' : `${50 - w}%`,
                  width: `${w}%`,
                  background: pos ? 'var(--div-pos)' : 'var(--div-neg)',
                }}
              />
            </span>
            <span className="num text-right text-ink">
              {pos ? '+' : '−'}
              {Math.abs(i.shap).toFixed(2)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Horizontal 0–100 meter with tick. */
export function Meter({
  value,
  color = 'var(--brand)',
  label,
}: {
  value: number | null;
  color?: string;
  label: string;
}) {
  return (
    <div
      className="h-1.5 w-full rounded-sm bg-bg-subtle"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value ?? undefined}
    >
      <div
        className="h-1.5 rounded-sm"
        style={{ width: `${Math.max(0, Math.min(100, value ?? 0))}%`, background: color }}
      />
    </div>
  );
}
