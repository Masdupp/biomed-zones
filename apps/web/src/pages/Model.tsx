import { useEffect, useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Markdown } from '@/components/Markdown';
import { BarList, CalibrationChart, Meter, RangeChart } from '@/components/charts';
import { Badge, Panel, Skeleton } from '@/components/ui';
import { cx } from '@/lib/cx';
import { request } from '@/lib/api';
import { HARD_CAP, expertScore } from '@/lib/expert';
import { one, two } from '@/lib/format';
import { useCell, useMetrics, useSpecies, useSpeciesList } from '@/lib/queries';
import type { SpeciesDetail } from '@/lib/types';
import { asset } from '@/lib/static';

const EXAMPLE_CELL = '87186068affffff'; // intertidal flats, Baie du Mont-Saint-Michel

function WorkedExample() {
  const sp = useSpecies('arenicola-marina');
  const cell = useCell(EXAMPLE_CELL);
  const [values, setValues] = useState<Record<string, number>>({});
  const [coldest, setColdest] = useState<number>(8.1);
  const [ml, setMl] = useState(52);
  const [reg, setReg] = useState(0.7);
  const [human, setHuman] = useState(0.81);

  const cellValues = useMemo(() => {
    const m = new Map<string, number>();
    Object.values(cell.data?.features ?? {})
      .flat()
      .forEach((f) => m.set(f.key, f.value));
    return m;
  }, [cell.data]);

  const reset = () => {
    if (!sp.data) return;
    setValues(
      Object.fromEntries(
        sp.data.parameters.map((p) => [p.key, Number((cellValues.get(p.feature) ?? 0).toFixed(2))]),
      ),
    );
    setColdest(Number((cellValues.get('sst_min') ?? 8.1).toFixed(1)));
    setMl(52);
    setReg(0.7);
    setHuman(0.81);
  };
  useEffect(reset, [sp.data, cellValues]);

  if (!sp.data) return <Skeleton className="h-96 w-full" />;
  const params = sp.data.parameters.filter((p) => p.band !== null);
  const out = expertScore({
    parameters: params,
    values,
    extremes: { temperature: { low: coldest } },
  });
  const expert = out.score ?? 0;
  const blendRaw = 0.5 * expert + 0.5 * ml;
  const blend = out.violations.length ? Math.min(blendRaw, HARD_CAP) : blendRaw;
  const dataMod = 0.7 + 0.3 * out.completeness;
  const final = blend * reg * human * dataMod;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <p className="text-sm text-ink-muted">
          <span className="italic text-ink">Arenicola marina</span> (lugworm) on the intertidal
          flats of the Baie du Mont-Saint-Michel, cell{' '}
          <Link
            to={`/map?species=arenicola-marina&cell=${EXAMPLE_CELL}`}
            className="num text-brand underline underline-offset-2"
          >
            {EXAMPLE_CELL}
          </Link>
          . Values start at the cell’s real data; move the sliders to see each step recompute. This
          example is locked by a regression test.
        </p>
        <ul className="mt-4 space-y-4">
          {params.map((p, i) => {
            const b = p.band;
            if (!b) return null;
            const lo = Math.min(b.min, b.extreme_min ?? b.min) - (b.max - b.min) * 0.15;
            const hi = b.max + (b.max - b.min) * 0.15;
            const fit = out.fits[i]?.fit;
            const v = values[p.key] ?? 0;
            return (
              <li key={p.key}>
                <div className="flex items-baseline justify-between text-sm">
                  <label htmlFor={`we-${p.key}`} className="text-ink">
                    {p.label} <span className="text-xs text-ink-subtle">weight {p.weight}</span>
                  </label>
                  <span className="num text-xs">
                    {two(v)} {p.unit} → fit{' '}
                    <span className={cx((fit ?? 0) < 50 ? 'text-accent' : 'text-ink')}>
                      {one(fit)}
                    </span>
                  </span>
                </div>
                <input
                  id={`we-${p.key}`}
                  type="range"
                  min={lo}
                  max={hi}
                  step={(hi - lo) / 200}
                  value={v}
                  onChange={(e) => setValues((s) => ({ ...s, [p.key]: Number(e.target.value) }))}
                  className="w-full accent-[var(--brand)]"
                />
                <RangeChart band={b} unit={p.unit} marker={v} />
              </li>
            );
          })}
          <li>
            <div className="flex items-baseline justify-between text-sm">
              <label htmlFor="we-cold" className="text-ink">
                Coldest-month sea temperature <Badge tone="accent">survival limit 0 °C</Badge>
              </label>
              <span className="num text-xs">{one(coldest)} °C</span>
            </div>
            <input
              id="we-cold"
              type="range"
              min={-4}
              max={16}
              step={0.1}
              value={coldest}
              onChange={(e) => setColdest(Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <Panel title="1 · Expert score">
          <p className="num text-xs text-ink-muted">
            Σ weight × fit / Σ weight (available parameters)
          </p>
          <ul className="num mt-2 space-y-1 text-xs">
            {out.fits.map((f, i) => (
              <li key={f.key} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-2">
                <span className="text-ink-muted">{params[i]?.label}</span>
                <Meter value={f.fit} label={`${params[i]?.label} fit`} />
                <span className="text-right">{one(f.contribution)}</span>
              </li>
            ))}
          </ul>
          <p className="num mt-3 text-sm">
            expert = <span className="text-ink">{one(out.uncapped)}</span>
            {out.violations.length > 0 && (
              <span className="text-accent"> → capped at {HARD_CAP} (survival limit violated)</span>
            )}
          </p>
        </Panel>
        <Panel title="2 · Blend with the distribution model">
          <label htmlFor="we-ml" className="flex items-baseline justify-between text-sm text-ink">
            ML score (calibrated suitability × 100) <span className="num text-xs">{ml}</span>
          </label>
          <input
            id="we-ml"
            type="range"
            min={0}
            max={100}
            value={ml}
            onChange={(e) => setMl(Number(e.target.value))}
            className="w-full accent-[var(--brand)]"
          />
          <p className="num mt-2 text-sm">
            0.5 × {one(expert)} + 0.5 × {ml} = <span className="text-ink">{one(blendRaw)}</span>
            {blend !== blendRaw && <span className="text-accent"> → {HARD_CAP}</span>}
          </p>
        </Panel>
        <Panel title="3 · Modifiers">
          <label htmlFor="we-reg" className="flex items-baseline justify-between text-sm text-ink">
            Regulatory (Natura 2000 here) <span className="num text-xs">× {two(reg)}</span>
          </label>
          <input
            id="we-reg"
            type="range"
            min={0.6}
            max={1}
            step={0.01}
            value={reg}
            onChange={(e) => setReg(Number(e.target.value))}
            className="w-full accent-[var(--brand)]"
          />
          <label
            htmlFor="we-hum"
            className="mt-2 flex items-baseline justify-between text-sm text-ink"
          >
            Human pressure (port at 18 km) <span className="num text-xs">× {two(human)}</span>
          </label>
          <input
            id="we-hum"
            type="range"
            min={0.7}
            max={1}
            step={0.01}
            value={human}
            onChange={(e) => setHuman(Number(e.target.value))}
            className="w-full accent-[var(--brand)]"
          />
          <p className="num mt-2 text-xs text-ink-muted">data completeness × {two(dataMod)}</p>
        </Panel>
        <div className="rounded-md border border-brand/40 bg-brand-subtle px-4 py-3">
          <p className="text-xs text-ink-muted">Final score</p>
          <p className="num text-3xl text-ink">{final.toFixed(1)}</p>
          <p className="num text-xs text-ink-muted">
            {one(blend)} × {two(reg)} × {two(human)} × {two(dataMod)}
          </p>
          <button type="button" onClick={reset} className="mt-2 text-xs text-brand hover:underline">
            Reset to the cell’s data
          </button>
        </div>
      </div>
    </div>
  );
}

export function Model() {
  const metrics = useMetrics();
  const list = useSpeciesList();
  const trained = list.data?.items.filter((s) => s.model?.trained) ?? [];
  const details = useQueries({
    queries: trained.map((s) => ({
      queryKey: ['species', s.id],
      queryFn: () => request<SpeciesDetail>(`/api/species/${s.id}`),
      staleTime: 300_000,
    })),
  });
  const names = new Map(list.data?.items.map((s) => [s.id, s.scientificName]));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Model"
        description="A hybrid, decomposable suitability score: transparent expert rules blended with a species distribution model, then adjusted for protection, human pressure and data completeness."
      />

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Method">
        {[
          [
            '1',
            'Expert score',
            'Per parameter, a trapezoid fit: 100 inside the optimal band, linear to 0 at the tolerance limits. Weighted mean with habitat weights (marine: T 0.30, salinity 0.20, pH 0.20, depth 0.15, O₂ 0.15; terrestrial: T 0.30, soil pH 0.25, humidity 0.20, rain 0.15, altitude 0.10). Survival limits on monthly extremes cap the score at 25.',
          ],
          [
            '2',
            'Distribution model',
            'LightGBM per species on GBIF/OBIS presences vs. background points (half target-group to correct recording bias). Predictors from global layers, identical for training and France. Validated by 5-fold spatial block cross-validation; isotonic calibration.',
          ],
          [
            '3',
            'Final score',
            'final = (0.5·expert + 0.5·ML) × regulatory (0.6–1, strict reserves excluded) × human pressure (0.7–1) × data completeness (0.7–1). Freshwater, non-native marine and out-of-climate cases are “indoor only” and capped at 30.',
          ],
          [
            '4',
            'Explanations',
            'Each cell lists its top limiting parameters and its top SHAP drivers (exact TreeSHAP, log-odds). Confidence combines data completeness, model quality and expert/ML agreement.',
          ],
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-md border border-border bg-surface p-3">
            <p className="num text-xs text-brand">{n}</p>
            <h2 className="mt-1 text-sm font-medium text-ink">{t}</h2>
            <p className="mt-1 text-sm text-ink-muted">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="we-h">
        <h2 id="we-h" className="mb-3 text-base font-semibold text-ink">
          Worked example
        </h2>
        <WorkedExample />
      </section>

      <section className="mt-10" aria-labelledby="metrics-h">
        <h2 id="metrics-h" className="text-base font-semibold text-ink">
          Validation metrics
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Spatial block cross-validation (5° blocks, 5 folds). TSS uses a threshold chosen on the
          training folds only. Run <span className="num">{metrics.data?.run?.id ?? '—'}</span>.
        </p>
        <div
          className="mt-3 overflow-x-auto"
          role="region"
          aria-label="Validation metrics table"
          tabIndex={0}
        >
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-ink-subtle">
                <th className="py-2 pr-3 font-normal">Species</th>
                <th className="py-2 pr-3 text-right font-normal">Presences</th>
                <th className="py-2 pr-3 text-right font-normal">Background</th>
                <th className="py-2 pr-3 text-right font-normal">LightGBM AUC</th>
                <th className="py-2 pr-3 text-right font-normal">LightGBM TSS</th>
                <th className="py-2 pr-3 text-right font-normal">Baseline AUC</th>
                <th className="py-2 text-right font-normal">Baseline TSS</th>
              </tr>
            </thead>
            <tbody>
              {metrics.data?.species.map((m) => (
                <tr key={m.species_id} className="border-b border-border">
                  <td className="py-1.5 pr-3 text-ink italic">
                    {names.get(m.species_id) ?? m.species_id}
                  </td>
                  <td className="num py-1.5 pr-3 text-right">{m.n_presences}</td>
                  <td className="num py-1.5 pr-3 text-right">{m.n_background}</td>
                  {m.trained ? (
                    <>
                      <td className="num py-1.5 pr-3 text-right">
                        {two(m.auc_mean)}{' '}
                        <span className="text-ink-subtle">± {two(m.auc_std)}</span>
                      </td>
                      <td className="num py-1.5 pr-3 text-right">
                        {two(m.tss_mean)}{' '}
                        <span className="text-ink-subtle">± {two(m.tss_std)}</span>
                      </td>
                      <td className="num py-1.5 pr-3 text-right">{two(m.lr_auc_mean)}</td>
                      <td className="num py-1.5 text-right">{two(m.lr_tss_mean)}</td>
                    </>
                  ) : (
                    <td colSpan={4} className="py-1.5 text-right text-xs text-ink-subtle">
                      {m.reason}
                    </td>
                  )}
                </tr>
              ))}
              {metrics.isError && (
                <tr>
                  <td colSpan={7} className="py-2 text-sm text-ink-muted">
                    ML service unavailable: metrics are listed in the model card below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 text-sm font-medium text-ink">Calibration (out-of-fold)</h3>
        <p className="text-xs text-ink-subtle">
          Orange: raw LightGBM. Blue: after isotonic calibration (fitted on the same out-of-fold
          predictions, hence optimistic). Dashed: perfect calibration.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {details.map((d, i) =>
            d.data?.model?.calibration ? (
              <figure key={trained[i]?.id}>
                <CalibrationChart
                  raw={d.data.model.calibration.raw}
                  calibrated={d.data.model.calibration.calibrated}
                  label={d.data.scientificName}
                />
                <figcaption className="truncate text-center text-xs text-ink-muted italic">
                  {d.data.scientificName}
                </figcaption>
              </figure>
            ) : (
              <Skeleton key={trained[i]?.id ?? i} className="aspect-square w-full" />
            ),
          )}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="imp-h">
        <h2 id="imp-h" className="text-base font-semibold text-ink">
          Predictor importance
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Mean absolute SHAP value per predictor (log-odds) on the training data.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {details.map((d, i) =>
            d.data?.model?.importance ? (
              <figure
                key={trained[i]?.id}
                className="rounded-md border border-border bg-surface p-3"
              >
                <figcaption className="mb-2 text-xs text-ink italic">
                  {d.data.scientificName}
                </figcaption>
                <BarList
                  items={Object.entries(d.data.model.importance)
                    .map(([k, v]) => ({
                      label: k.replace('ml_', '').replace(/_/g, ' '),
                      value: v.mean_abs_shap,
                    }))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 6)}
                />
              </figure>
            ) : null,
          )}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="card-h">
        <h2 id="card-h" className="mb-3 text-base font-semibold text-ink">
          Model card
        </h2>
        <div className="rounded-md border border-border bg-surface p-4">
          <Markdown src={asset('/docs/MODEL_CARD.md')} />
        </div>
      </section>
    </div>
  );
}

export default Model;
