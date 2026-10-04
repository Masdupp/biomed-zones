import { VIRIDIS_GRADIENT } from '@/lib/color';

export function Legend({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="rounded-md border border-border bg-surface/95 px-3 py-2 text-xs text-ink-muted"
      aria-label="Map legend"
    >
      <div className="mb-1 font-medium text-ink">Suitability score</div>
      <div
        className="h-2 w-44 rounded-sm"
        style={{ background: VIRIDIS_GRADIENT }}
        aria-hidden="true"
      />
      <div className="num mt-0.5 flex w-44 justify-between">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      {!compact && (
        <ul className="mt-2 flex flex-col gap-1">
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: 'rgb(148 152 158 / 0.45)' }}
              aria-hidden="true"
            />
            Excluded (strict reserve)
          </li>
          <li>Indoor-only cells are capped at 30</li>
        </ul>
      )}
    </div>
  );
}
