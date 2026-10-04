import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cellToLatLng } from 'h3-js';
import { Loader2 } from 'lucide-react';
import { CellPanel } from '@/components/cell/CellPanel';
import { Legend } from '@/components/map/Legend';
import { MapView, type ViewState } from '@/components/map/MapView';
import { Select } from '@/components/ui';
import { cx } from '@/lib/cx';
import { CATEGORY_LABEL } from '@/lib/color';
import { useCells, useSpeciesList } from '@/lib/queries';
import { TERRITORY_VIEWS } from '@/lib/territories';

const FINE_ZOOM = 7.5;
const round = (v: number, d = 1) => Math.round(v * 10 ** d) / 10 ** d;

/** Viewport bbox, padded 25 % and rounded so small pans reuse cached responses. */
function paddedBbox([w, s, e, n]: ViewState['bbox']): string {
  const dx = (e - w) * 0.25;
  const dy = (n - s) * 0.25;
  return [round(w - dx), round(s - dy), round(e + dx), round(n + dy)].join(',');
}

export function MapPage() {
  const [params, setParams] = useSearchParams();
  const species = params.get('species') ?? 'arenicola-marina';
  const selected = params.get('cell');
  const minScore = Number(params.get('min') ?? 0);
  const excludeProtected = params.get('protected') === 'exclude';
  const [view, setView] = useState<ViewState | null>(null);
  const [focus, setFocus] = useState<{
    bounds: [[number, number], [number, number]];
    key: string;
  } | null>(null);
  const list = useSpeciesList();

  const fine = (view?.zoom ?? 0) >= FINE_ZOOM;
  const bbox = fine && view ? paddedBbox(view.bbox) : undefined;
  const coarse = useCells({ species, resolution: 6, excludeProtected });
  const detail = useCells(fine ? { species, resolution: 7, bbox, excludeProtected } : null);
  const active = fine && detail.data ? detail.data : coarse.data;
  const loading = coarse.isFetching || (fine && detail.isFetching);

  const cells = useMemo(
    () => (active?.items ?? []).filter((r) => r[1] >= minScore || r[2] === 'excluded'),
    [active, minScore],
  );

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [k, v] of Object.entries(patch)) {
            if (v === null || v === '') next.delete(k);
            else next.set(k, v);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  const topInView = useMemo(() => {
    if (!view) return [];
    const [w, s, e, n] = view.bbox;
    return cells
      .filter((r) => r[2] !== 'excluded')
      .filter((r) => {
        const [lat, lon] = cellToLatLng(r[0]);
        return lon >= w && lon <= e && lat >= s && lat <= n;
      })
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [cells, view]);

  const current = list.data?.items.find((s) => s.id === species);
  useEffect(() => {
    document.title = `${current?.scientificName ?? 'Map'} · BioMed Zones`;
  }, [current]);

  return (
    <div className="flex h-[calc(100dvh-var(--header-h)-var(--statusbar-h))] flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2">
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          Species
          <Select
            value={species}
            onChange={(e) => update({ species: e.target.value })}
            className="h-7 w-52 text-xs italic"
            aria-label="Species"
          >
            {list.data?.items.map((s) => (
              <option key={s.id} value={s.id}>
                {s.scientificName}
              </option>
            ))}
          </Select>
        </label>
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          Min score
          <input
            type="range"
            min={0}
            max={90}
            step={5}
            value={minScore}
            onChange={(e) => update({ min: e.target.value === '0' ? null : e.target.value })}
            className="w-28 accent-[var(--brand)]"
            aria-valuetext={`${minScore}`}
          />
          <span className="num w-6 text-ink">{minScore}</span>
        </label>
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={excludeProtected}
            onChange={(e) => update({ protected: e.target.checked ? 'exclude' : null })}
            className="accent-[var(--brand)]"
          />
          Exclude protected areas
        </label>
        <nav aria-label="Territories" className="flex flex-wrap items-center gap-1">
          {TERRITORY_VIEWS.map((t) => (
            <button
              key={t.code}
              type="button"
              onClick={() => setFocus({ bounds: t.bounds, key: `${t.code}-${Date.now()}` })}
              className="h-7 rounded-md px-2 text-xs text-ink-muted transition-colors transition-base hover:bg-surface-hover hover:text-ink"
            >
              {t.short}
            </button>
          ))}
        </nav>
        <span
          className="num ml-auto flex items-center gap-1.5 text-xs text-ink-subtle"
          aria-live="polite"
        >
          {loading && <Loader2 size={12} className="animate-spin" aria-hidden="true" />}
          res {fine && detail.data ? 7 : 6} · {cells.length.toLocaleString('en-GB')} cells
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <div className="relative min-w-0 flex-1">
          <MapView
            className="absolute inset-0"
            cells={cells}
            selected={selected}
            onSelect={(h3) => update({ cell: h3 })}
            onView={setView}
            focus={focus}
            ariaLabel={`Suitability map for ${current?.scientificName ?? species}. Use the list of best cells for keyboard access.`}
          />
          <div className="pointer-events-none absolute bottom-8 left-3 flex flex-col gap-2">
            <div className="pointer-events-auto">
              <Legend />
            </div>
          </div>
          <details className="absolute top-3 left-3 w-64 rounded-md border border-border bg-surface/95 text-xs">
            <summary className="cursor-pointer px-3 py-2 text-ink">Best cells in view</summary>
            <ol className="max-h-72 overflow-y-auto border-t border-border">
              {topInView.length === 0 && (
                <li className="px-3 py-2 text-ink-subtle">No scored cell in view.</li>
              )}
              {topInView.map((r) => (
                <li key={r[0]}>
                  <button
                    type="button"
                    onClick={() => update({ cell: r[0] })}
                    className={cx(
                      'flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-surface-hover',
                      r[0] === selected && 'bg-bg-subtle',
                    )}
                  >
                    <span className="num text-ink-muted">{r[0]}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-ink-subtle">{CATEGORY_LABEL[r[2]]}</span>
                      <span className="num w-6 text-right text-ink">{r[1].toFixed(0)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </details>
          {!loading && active && cells.length === 0 && (
            <p
              role="status"
              className="absolute top-3 left-1/2 -translate-x-1/2 rounded-md border border-border bg-surface/95 px-3 py-2 text-xs text-ink-muted"
            >
              No {current?.habitat === 'marine' ? 'sea' : 'land'} cell for{' '}
              <span className="italic">{current?.scientificName}</span> in view
              {minScore > 0 && ` with a score of ${minScore} or more`}.
            </p>
          )}
          {coarse.isError && (
            <div
              role="alert"
              className="absolute top-3 right-14 rounded-md border border-danger/40 bg-surface px-3 py-2 text-xs text-danger"
            >
              Could not load scores: {coarse.error.message}
            </div>
          )}
        </div>
        {selected && (
          <div className="absolute inset-0 z-10 md:static md:z-auto md:w-[400px] md:shrink-0">
            <CellPanel
              h3={selected}
              species={species}
              onClose={() => update({ cell: null })}
              onSpecies={(id) => update({ species: id })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MapPage;
