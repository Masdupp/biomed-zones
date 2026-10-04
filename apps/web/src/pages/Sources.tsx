import { Suspense, lazy, useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Markdown } from '@/components/Markdown';
import { Badge, ErrorNote, ExternalLink, Input, Skeleton } from '@/components/ui';
import { VIRIDIS_GRADIENT } from '@/lib/color';
import { date, int } from '@/lib/format';
import { useCoverage, useSources } from '@/lib/queries';
import type { CellRow } from '@/lib/types';

const MapView = lazy(() =>
  import('@/components/map/MapView').then((m) => ({ default: m.MapView })),
);

function CoverageMap() {
  const q = useCoverage();
  const rows = useMemo<CellRow[]>(
    () =>
      q.data
        ? q.data.items.map(([h, n]) => [
            h,
            (100 * n) / q.data.featureDefinitions,
            'coverage' as never,
            n,
          ])
        : [],
    [q.data],
  );
  const fmt = useMemo(
    () => (r: CellRow) => `${r[3]} of ${q.data?.featureDefinitions ?? '?'} features\n${r[0]}`,
    [q.data],
  );
  return (
    <figure>
      <Suspense fallback={<Skeleton className="h-80 w-full" />}>
        <MapView
          className="h-80 w-full rounded-md border border-border"
          cells={rows}
          formatTooltip={fmt}
          ariaLabel="Data coverage map: share of environmental features available per resolution-6 cell"
        />
      </Suspense>
      <figcaption className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span
          className="inline-block h-2 w-32 rounded-sm"
          style={{ background: VIRIDIS_GRADIENT }}
          aria-hidden="true"
        />
        Share of the {q.data?.featureDefinitions ?? '—'} environmental features available per cell
        (0–100 %). Land-only or sea-only cells hold about 22–23 of them; coastal cells hold both
        sets.
      </figcaption>
    </figure>
  );
}

const MODE_TONE = { live: 'success', 'snapshot-fallback': 'accent', derived: 'neutral' } as const;

export function Sources() {
  const q = useSources();
  const [filter, setFilter] = useState('');
  const items = (q.data?.items ?? []).filter((s) =>
    `${s.name} ${s.license} ${s.variables.join(' ')}`.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Data sources"
        description="Every value in BioMed Zones points to one of these provenance records: source, licence, resolution, period and retrieval date."
        actions={
          <Input
            type="search"
            placeholder="Filter sources"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-56"
            aria-label="Filter sources"
          />
        }
      />
      {q.isError && <ErrorNote error={q.error} />}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink-subtle">
              <th className="py-2 pr-3 font-normal">Source</th>
              <th className="py-2 pr-3 font-normal">Licence</th>
              <th className="py-2 pr-3 font-normal">Resolution</th>
              <th className="py-2 pr-3 font-normal">Period</th>
              <th className="py-2 pr-3 font-normal">Retrieved</th>
              <th className="py-2 pr-3 font-normal">Mode</th>
              <th className="py-2 text-right font-normal">Values / records</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr
                key={s.id}
                id={s.id}
                className="scroll-mt-16 border-b border-border align-top target:bg-brand-subtle"
              >
                <td className="max-w-[22rem] py-2 pr-3">
                  <ExternalLink href={s.url} className="text-ink">
                    {s.name}
                  </ExternalLink>
                  <p className="mt-0.5 text-xs text-ink-subtle">{s.variables.join(', ')}</p>
                  {s.citation && <p className="mt-0.5 text-xs text-ink-muted">{s.citation}</p>}
                  {s.notes && <p className="mt-0.5 text-xs text-accent">{s.notes}</p>}
                </td>
                <td className="py-2 pr-3 text-xs text-ink-muted">
                  {s.licenseUrl ? (
                    <ExternalLink href={s.licenseUrl}>{s.license}</ExternalLink>
                  ) : (
                    s.license
                  )}
                </td>
                <td className="py-2 pr-3 text-xs text-ink-muted">{s.spatialResolution}</td>
                <td className="py-2 pr-3 text-xs text-ink-muted">{s.temporalCoverage ?? '—'}</td>
                <td className="num py-2 pr-3 text-xs whitespace-nowrap">{date(s.retrievedAt)}</td>
                <td className="py-2 pr-3">
                  <Badge tone={MODE_TONE[s.mode]}>{s.mode}</Badge>
                </td>
                <td className="num py-2 text-right text-xs">
                  {s.cellValues > 0 && <span className="block">{int(s.cellValues)} values</span>}
                  {s.occurrences > 0 && <span className="block">{int(s.occurrences)} records</span>}
                  {s.cellValues === 0 && s.occurrences === 0 && (
                    <span className="text-ink-subtle">boundaries</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section
        className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        aria-labelledby="cov-h"
      >
        <div>
          <h2 id="cov-h" className="mb-3 text-base font-semibold text-ink">
            Coverage
          </h2>
          <CoverageMap />
        </div>
        <div>
          <h2 className="mb-3 text-base font-semibold text-ink">Data quality report</h2>
          <details className="rounded-md border border-border bg-surface p-4" open>
            <summary className="cursor-pointer text-sm text-ink">
              docs/DATA_REPORT.md (generated from the database)
            </summary>
            <div className="mt-3 max-h-[640px] overflow-y-auto">
              <Markdown src="/docs/DATA_REPORT.md" />
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}

export default Sources;
