import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { RadarChart } from '@/components/charts';
import { SERIES } from '@/lib/color';
import { Badge, EmptyState, ErrorNote, Select, Skeleton } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { categoryTone } from '@/lib/color';
import { compareStore, useCompareList } from '@/lib/compare';
import { CATEGORY_LABEL } from '@/lib/color';
import { one, two, value as fmt } from '@/lib/format';
import { useCompare, useSpeciesList, type CompareResponse } from '@/lib/queries';
import { TERRITORY_NAME } from '@/lib/territories';

export function Compare() {
  const [params, setParams] = useSearchParams();
  const stored = useCompareList();
  const fromUrl = params.get('cells')?.split(',').filter(Boolean);
  const cells = fromUrl && fromUrl.length ? fromUrl.slice(0, 4) : stored;
  const species = params.get('species') ?? 'arenicola-marina';
  const list = useSpeciesList();
  const q = useCompare(species, cells);

  const axes = useMemo(
    () => q.data?.parameters.map((p) => p.label.replace(' (air-temperature proxy)', '')) ?? [],
    [q.data],
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Compare cells"
        description="Two to four cells side by side for one species: parameter fits (0–100) on the radar, values and scores in the table."
        actions={
          <label className="flex items-center gap-2 text-xs text-ink-muted">
            Species
            <Select
              value={species}
              onChange={(e) =>
                setParams({
                  species: e.target.value,
                  ...(fromUrl ? { cells: cells.join(',') } : {}),
                })
              }
              className="w-56 italic"
              aria-label="Species"
            >
              {list.data?.items.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.scientificName}
                </option>
              ))}
            </Select>
          </label>
        }
      />

      {cells.length < 2 ? (
        <div className="mt-6">
          <EmptyState title={cells.length ? 'Add at least one more cell' : 'No cells selected'}>
            Open the{' '}
            <Link to="/map" className="text-brand underline underline-offset-2">
              map
            </Link>
            , click a cell and choose “Add to comparison” (up to four).
          </EmptyState>
        </div>
      ) : q.isError ? (
        <div className="mt-6">
          <ErrorNote error={q.error} />
        </div>
      ) : !q.data ? (
        <Skeleton className="mt-6 h-80 w-full" />
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <RadarChart
              axes={axes}
              series={q.data.cells.map((c) => ({
                name: c.h3,
                values: c.parameters.map((p) => p.fit),
              }))}
            />
            <ul className="mt-3 flex flex-col gap-1 text-xs" aria-label="Legend">
              {q.data.cells.map((c, i) => (
                <li key={c.h3} className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ background: SERIES[i] }}
                    aria-hidden="true"
                  />
                  <span className="num text-ink">{c.h3}</span>
                  <span className="text-ink-subtle">{TERRITORY_NAME[c.territory]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-x-auto" role="region" aria-label="Comparison table" tabIndex={0}>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-ink-subtle">
                  <th className="py-2 pr-3 font-normal">Parameter</th>
                  {q.data.cells.map((c, i) => (
                    <th key={c.h3} className="py-2 pr-3 text-right font-normal">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="inline-block h-2 w-2 rounded-sm"
                          style={{ background: SERIES[i] }}
                          aria-hidden="true"
                        />
                        <Link
                          to={`/map?species=${species}&cell=${c.h3}`}
                          className="num text-ink hover:underline"
                        >
                          {c.h3.slice(0, 9)}…
                        </Link>
                        <button
                          type="button"
                          onClick={() => compareStore.remove(c.h3)}
                          aria-label={`Remove ${c.h3} from comparison`}
                          className="text-ink-subtle hover:text-ink"
                        >
                          <X size={12} aria-hidden="true" />
                        </button>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <th scope="row" className="py-2 pr-3 text-left font-medium text-ink">
                    Final score
                  </th>
                  {q.data.cells.map((c) => (
                    <td key={c.h3} className="py-2 pr-3 text-right">
                      {c.score ? (
                        <span className="inline-flex items-center gap-2">
                          <Badge tone={categoryTone(c.score.category)}>
                            {CATEGORY_LABEL[c.score.category]}
                          </Badge>
                          <span className="num text-base text-ink">{c.score.score.toFixed(0)}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-ink-subtle">habitat absent</span>
                      )}
                    </td>
                  ))}
                </tr>
                {(
                  [
                    ['Expert', (c) => one(c.score?.expertScore)],
                    ['ML', (c) => one(c.score?.mlScore)],
                    ['Confidence', (c) => two(c.score?.confidence)],
                    ['Regulatory ×', (c) => two(c.score?.modifiers.regulatory)],
                    ['Human pressure ×', (c) => two(c.score?.modifiers.human)],
                  ] as [string, (c: CompareResponse['cells'][number]) => string][]
                ).map(([label, get]) => (
                  <tr key={label} className="border-b border-border">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal text-ink-muted">
                      {label}
                    </th>
                    {q.data.cells.map((c) => (
                      <td key={c.h3} className="num py-1.5 pr-3 text-right">
                        {get(c)}
                      </td>
                    ))}
                  </tr>
                ))}
                {q.data.parameters.map((p, k) => (
                  <tr key={p.key} className="border-b border-border">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal text-ink">
                      {p.label}
                      <span className="block text-xs text-ink-subtle">
                        optimum {p.band?.opt_min}–{p.band?.opt_max} {p.unit}
                      </span>
                    </th>
                    {q.data.cells.map((c) => {
                      const v = c.parameters[k];
                      return (
                        <td key={c.h3} className="num py-1.5 pr-3 text-right">
                          {fmt(v?.value)}{' '}
                          <span className="text-xs text-ink-subtle">
                            fit {v?.fit === null || v?.fit === undefined ? '—' : v.fit.toFixed(0)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compare;
