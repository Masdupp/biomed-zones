import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, FileDown, Plus, X } from 'lucide-react';
import { Badge, Button, ErrorNote, Skeleton } from '@/components/ui';
import { cx } from '@/lib/cx';
import { Meter, ShapBars } from '@/components/charts';
import { compareStore, useCompareList } from '@/lib/compare';
import { CATEGORY_LABEL, categoryTone } from '@/lib/color';
import { date, one, two, value as fmt } from '@/lib/format';
import { useCell, useExplain, useSpeciesList } from '@/lib/queries';
import type { Category, FeatureValue } from '@/lib/types';

const DOMAIN_LABEL: Record<string, string> = {
  marine: 'Marine environment',
  terrestrial: 'Terrestrial environment',
  pressure: 'Human pressure',
  regulatory: 'Protection',
  model: 'Model predictors (global layers)',
};

export function CellPanel({
  h3,
  species,
  onClose,
  onSpecies,
}: {
  h3: string;
  species: string;
  onClose: () => void;
  onSpecies: (id: string) => void;
}) {
  const cell = useCell(h3);
  const explain = useExplain(species, h3);
  const list = useSpeciesList();
  const compare = useCompareList();
  const [copied, setCopied] = useState(false);
  const names = useMemo(
    () => new Map(list.data?.items.map((s) => [s.id, s.scientificName])),
    [list.data],
  );
  const labels = useMemo(() => {
    const m = new Map<string, string>();
    Object.values(cell.data?.features ?? {})
      .flat()
      .forEach((f) => m.set(f.key, f.label));
    return m;
  }, [cell.data]);

  const stored = cell.data?.scores.find((s) => s.species === species) ?? null;

  // Performance budget hook (e2e/perf.spec.ts): cell profile rendered after a click.
  useEffect(() => {
    if (cell.data) performance.mark(`bz:panel-ready:${h3}`);
  }, [cell.data, h3]);
  const ex = explain.data?.score;
  const score = ex?.score ?? stored?.score ?? null;
  const category = (ex?.category ?? stored?.category) as Category | undefined;
  const inCompare = compare.includes(h3);

  const copyLink = async () => {
    await navigator.clipboard?.writeText(`${location.origin}/map?species=${species}&cell=${h3}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <aside
      aria-label="Cell details"
      data-testid="cell-panel"
      className="flex h-full flex-col overflow-hidden border-l border-border bg-surface"
    >
      <header className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-ink-subtle">{cell.data?.territory.name ?? '…'}</p>
          <h2 className="num truncate text-sm text-ink">{h3}</h2>
          {cell.data && (
            <p className="num text-xs text-ink-subtle">
              {/* Non-breaking spaces keep each value with its unit when the line wraps. */}
              {`${cell.data.centroid.lat.toFixed(4)}°, ${cell.data.centroid.lon.toFixed(4)}° · res\u00a0${cell.data.resolution} · ${one(cell.data.areaKm2)}\u00a0km² · land\u00a0${Math.round(cell.data.landFraction * 100)}\u00a0% / sea\u00a0${Math.round(cell.data.seaFraction * 100)}\u00a0%`}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cell details"
          className="rounded-sm p-1 text-ink-muted hover:bg-surface-hover hover:text-ink"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {cell.isError && <ErrorNote error={cell.error} />}
        {!stored && cell.data && (
          <p className="text-sm text-ink-muted">
            {names.get(species) ?? species} has no score here: its habitat does not occur in this
            cell.
          </p>
        )}

        {(stored || ex) && (
          <section aria-labelledby="score-h">
            <h3 id="score-h" className="sr-only">
              Score
            </h3>
            <div className="flex items-end gap-3">
              <span className="num text-4xl leading-none text-ink">
                {score === null ? '—' : score.toFixed(0)}
              </span>
              <span className="pb-1 text-xs text-ink-subtle">/ 100</span>
              {category && <Badge tone={categoryTone(category)}>{CATEGORY_LABEL[category]}</Badge>}
            </div>
            <dl className="mt-3 grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-x-2 gap-y-1.5 text-xs">
              <dt className="text-ink-muted">Expert score</dt>
              <dd>
                <Meter
                  value={ex?.expert_score ?? stored?.expertScore ?? null}
                  label="Expert score"
                />
              </dd>
              <dd className="num text-right">{one(ex?.expert_score ?? stored?.expertScore)}</dd>
              <dt className="text-ink-muted">ML score</dt>
              <dd>
                <Meter
                  value={ex?.ml_score ?? stored?.mlScore ?? null}
                  color="var(--series-1)"
                  label="ML score"
                />
              </dd>
              <dd className="num text-right">{one(ex?.ml_score ?? stored?.mlScore)}</dd>
              <dt className="text-ink-muted">Confidence</dt>
              <dd>
                <Meter
                  value={(ex?.confidence ?? stored?.confidence ?? 0) * 100}
                  color="var(--ink-subtle)"
                  label="Confidence"
                />
              </dd>
              <dd className="num text-right">{two(ex?.confidence ?? stored?.confidence)}</dd>
            </dl>
            <p className="num mt-3 rounded-sm bg-bg-subtle px-2 py-1.5 text-[11px] leading-relaxed text-ink-muted">
              blend({one(ex?.expert_score ?? stored?.expertScore)},{' '}
              {one(ex?.ml_score ?? stored?.mlScore)}) × reg{' '}
              {two(ex?.regulatory_mod ?? stored?.modifiers.regulatory)} × human{' '}
              {two(ex?.human_mod ?? stored?.modifiers.human)} × data{' '}
              {two(ex?.data_mod ?? stored?.modifiers.data)} = {one(score)}
            </p>
            {ex?.recommendation && (
              <p className="mt-3 text-sm leading-relaxed text-ink">{ex.recommendation}</p>
            )}
            {explain.isError && (
              <p className="mt-2 text-xs text-ink-subtle">
                ML service unavailable: showing the precomputed score.
              </p>
            )}
          </section>
        )}

        {ex && ex.parameters.length > 0 && (
          <section className="mt-5" aria-labelledby="params-h">
            <h3
              id="params-h"
              className="text-xs font-medium tracking-wide text-ink-muted uppercase"
            >
              Expert parameters
            </h3>
            <table className="mt-2 w-full text-xs">
              <thead className="text-left text-ink-subtle">
                <tr>
                  <th className="py-1 font-normal">Parameter</th>
                  <th className="py-1 text-right font-normal">Value</th>
                  <th className="py-1 text-right font-normal">Optimum</th>
                  <th className="w-16 py-1 text-right font-normal">Fit</th>
                </tr>
              </thead>
              <tbody>
                {ex.parameters.map((p) => (
                  <tr key={p.key} className="border-t border-border">
                    <td className="py-1.5 text-ink">
                      {p.label} <span className="text-ink-subtle">×{p.weight}</span>
                    </td>
                    <td className="num py-1.5 text-right">
                      {fmt(p.value)} <span className="text-ink-subtle">{p.unit}</span>
                    </td>
                    <td className="num py-1.5 text-right text-ink-muted">
                      {p.band.opt_min}–{p.band.opt_max}
                    </td>
                    <td
                      className={cx(
                        'num py-1.5 text-right',
                        (p.fit ?? 0) < 50 ? 'text-accent' : 'text-ink',
                      )}
                    >
                      {p.fit === null ? '—' : p.fit.toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ex.violations.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-accent">
                {ex.violations.map((v) => (
                  <li key={`${v.feature}-${v.side}`}>
                    Survival limit: {labels.get(v.feature) ?? v.feature} {fmt(v.value)} is {v.side}{' '}
                    {v.limit} (score capped)
                  </li>
                ))}
              </ul>
            )}
            {ex.limiting.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-ink-subtle">Top limiting factors</p>
                <ol className="mt-1 list-decimal space-y-0.5 pl-4 text-xs text-ink">
                  {ex.limiting.map((l) => (
                    <li key={l.parameter + l.kind}>{l.detail}</li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {explain.data?.ml && (
          <section className="mt-5" aria-labelledby="shap-h">
            <h3 id="shap-h" className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Model drivers (SHAP, log-odds)
            </h3>
            <p className="mt-1 text-xs text-ink-subtle">
              Calibrated suitability {two(explain.data.ml.calibrated_probability)} · spatial-CV AUC{' '}
              {explain.data.ml.auc_mean.toFixed(3)}. Blue raises, red lowers.
            </p>
            <div className="mt-2">
              <ShapBars
                items={explain.data.ml.shap.slice(0, 6).map((d) => ({
                  label: (labels.get(d.feature) ?? d.feature).replace(' (global layer)', ''),
                  value: d.value,
                  shap: d.shap,
                }))}
              />
            </div>
          </section>
        )}

        {cell.data && (
          <section className="mt-5" aria-labelledby="raw-h">
            <h3 id="raw-h" className="text-xs font-medium tracking-wide text-ink-muted uppercase">
              Raw values and sources
            </h3>
            {Object.entries(cell.data.features).map(([domain, items]) => (
              <details
                key={domain}
                className="mt-2 rounded-sm border border-border"
                open={domain !== 'model'}
              >
                <summary className="cursor-pointer px-2 py-1.5 text-xs text-ink">
                  {DOMAIN_LABEL[domain] ?? domain}
                </summary>
                <ul className="divide-y divide-border border-t border-border">
                  {items.map((f: FeatureValue) => (
                    <li
                      key={f.key}
                      className="grid grid-cols-[1fr_auto] gap-x-2 px-2 py-1.5 text-xs"
                    >
                      <span className="text-ink" title={f.description}>
                        {f.label}
                      </span>
                      <span className="num text-right text-ink">
                        {fmt(f.value)} <span className="text-ink-subtle">{f.unit}</span>
                      </span>
                      <span
                        className="col-span-2 truncate text-[11px] text-ink-subtle"
                        title={`${f.provenance.name} · ${f.provenance.license} · ${f.provenance.spatialResolution}`}
                      >
                        <Link
                          to={`/sources#${f.provenance.id}`}
                          className="underline decoration-border-strong underline-offset-2 hover:text-ink"
                        >
                          {f.provenance.name}
                        </Link>{' '}
                        · retrieved {date(f.provenance.retrievedAt)}
                        {f.provenance.mode !== 'live' && ` · ${f.provenance.mode}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
        )}

        {cell.data && cell.data.scores.length > 1 && (
          <section className="mt-5" aria-labelledby="others-h">
            <h3
              id="others-h"
              className="text-xs font-medium tracking-wide text-ink-muted uppercase"
            >
              Other species in this cell
            </h3>
            <ul className="mt-2 divide-y divide-border">
              {cell.data.scores
                .filter((s) => s.species !== species)
                .map((s) => (
                  <li key={s.species}>
                    <button
                      type="button"
                      onClick={() => onSpecies(s.species)}
                      className="flex w-full items-center justify-between py-1.5 text-left text-xs hover:bg-surface-hover"
                    >
                      <span className="text-ink italic">{names.get(s.species) ?? s.species}</span>
                      <span className="flex items-center gap-2">
                        <Badge tone={categoryTone(s.category)}>{CATEGORY_LABEL[s.category]}</Badge>
                        <span className="num w-6 text-right">{s.score.toFixed(0)}</span>
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {cell.isPending && (
          <div className="space-y-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        )}
      </div>

      <footer className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
        <Button
          size="sm"
          onClick={() => (inCompare ? compareStore.remove(h3) : compareStore.add(h3))}
          aria-pressed={inCompare}
        >
          {inCompare ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Plus size={14} aria-hidden="true" />
          )}
          {inCompare ? 'In comparison' : 'Add to comparison'}
        </Button>
        {stored && (
          <a
            href={`/api/reports/${h3}/${species}`}
            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border-strong px-2.5 text-xs font-medium text-ink hover:bg-surface-hover"
          >
            <FileDown size={14} aria-hidden="true" /> Export PDF
          </a>
        )}
        <Button size="sm" variant="ghost" onClick={copyLink}>
          <Copy size={14} aria-hidden="true" /> {copied ? 'Copied' : 'Copy link'}
        </Button>
        {compare.length >= 2 && (
          <Link
            to={`/compare?species=${species}`}
            className="ml-auto self-center text-xs text-brand hover:underline"
          >
            Compare {compare.length} cells →
          </Link>
        )}
      </footer>
    </aside>
  );
}
