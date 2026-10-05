import { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { SpeciesPhoto } from '@/components/species/SpeciesPhoto';
import { BarList, CalibrationChart, RangeChart } from '@/components/charts';
import { Badge, ErrorNote, ExternalLink, Panel, ReferenceLink, Skeleton } from '@/components/ui';
import { int, two } from '@/lib/format';
import { useOccurrences, useSpecies, useSpeciesList } from '@/lib/queries';
import { TERRITORY_NAME } from '@/lib/territories';

const OccurrenceMap = lazy(() => import('@/components/map/OccurrenceMap'));
const HABITAT = { marine: 'Marine', freshwater: 'Freshwater', terrestrial: 'Terrestrial' } as const;
const RANKS = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus'];

export function SpeciesList() {
  const q = useSpeciesList();
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Species"
        description="Nine species with documented medical uses. Profiles combine GBIF taxonomy, IUCN status, Crossref-verified references and literature-derived tolerance bands."
      />
      {q.isError && <ErrorNote error={q.error} />}
      <div className="mt-4 overflow-x-auto" role="region" aria-label="Species table" tabIndex={0}>
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink-subtle">
              <th className="py-2 pr-3 font-normal">Species</th>
              <th className="py-2 pr-3 font-normal">Habitat</th>
              <th className="py-2 pr-3 font-normal">Medical compound</th>
              <th className="py-2 pr-3 font-normal">IUCN</th>
              <th className="py-2 pr-3 text-right font-normal">Occurrences</th>
              <th className="py-2 pr-3 text-right font-normal">Model AUC</th>
              <th className="py-2 text-right font-normal">Cells ≥ moderate</th>
            </tr>
          </thead>
          <tbody>
            {q.data?.items.map((s) => (
              <tr key={s.id} className="border-b border-border hover:bg-surface-hover">
                <td className="py-2 pr-3">
                  <Link to={`/species/${s.id}`} className="flex items-center gap-2.5">
                    <SpeciesPhoto
                      photo={s.photo}
                      name={s.scientificName}
                      className="h-9 w-9 shrink-0 rounded-sm"
                      credit={false}
                      size="thumb"
                    />
                    <span>
                      <span className="block text-ink italic">{s.scientificName}</span>
                      <span className="block text-xs text-ink-muted">{s.commonNameEn}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-2 pr-3 text-ink-muted">{HABITAT[s.habitat]}</td>
                <td
                  className="max-w-[18rem] truncate py-2 pr-3 text-ink-muted"
                  title={s.compounds.join('; ')}
                >
                  {s.compounds[0]}
                </td>
                <td className="py-2 pr-3">
                  {s.iucn && (
                    <Badge tone={['VU', 'EN', 'CR'].includes(s.iucn.code) ? 'accent' : 'neutral'}>
                      {s.iucn.code}
                    </Badge>
                  )}
                </td>
                <td className="num py-2 pr-3 text-right">{int(s.occurrences)}</td>
                <td className="num py-2 pr-3 text-right">
                  {s.model?.trained ? (
                    two(s.model.aucMean)
                  ) : (
                    <span className="text-xs text-ink-subtle">expert only</span>
                  )}
                </td>
                <td className="num py-2 text-right">
                  {int((s.cellsByCategory.high ?? 0) + (s.cellsByCategory.moderate ?? 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SpeciesDetail() {
  const { slug } = useParams();
  const q = useSpecies(slug);
  const occ = useOccurrences(slug);
  const s = q.data;
  if (q.isError)
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <ErrorNote error={q.error} />
      </div>
    );
  if (!s)
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <Skeleton className="h-64 w-full" />
      </div>
    );

  const importance = Object.entries(s.model?.importance ?? {})
    .map(([k, v]) => ({ label: k.replace('ml_', '').replace(/_/g, ' '), value: v.mean_abs_shap }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <p className="text-xs text-ink-subtle">
        <Link to="/species" className="hover:text-ink hover:underline">
          Species
        </Link>{' '}
        / {s.scientificName}
      </p>
      <div className="mt-2 grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <SpeciesPhoto
          photo={s.photo}
          name={s.scientificName}
          className="aspect-[4/3] w-full rounded-md border border-border"
        />
        <div>
          <h1 className="text-2xl text-ink">
            <span className="italic">{s.scientificName}</span>{' '}
            <span className="text-base font-normal text-ink-muted">{s.authorship}</span>
          </h1>
          <p className="text-sm text-ink-muted">
            {s.commonNameEn}
            {s.commonNameFr && ` · ${s.commonNameFr}`}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge>{HABITAT[s.habitat]}</Badge>
            {s.habitat === 'freshwater' && (
              <Badge tone="accent">Freshwater: indoor culture only</Badge>
            )}
            {s.iucn && (
              <Badge tone={['VU', 'EN', 'CR'].includes(s.iucn.code) ? 'accent' : 'neutral'}>
                IUCN {s.iucn.code} · {s.iucn.category.replace(/_/g, ' ').toLowerCase()}
              </Badge>
            )}
            {s.cultivationDifficulty && (
              <Badge>Cultivation difficulty: {s.cultivationDifficulty}</Badge>
            )}
          </div>
          <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-sm">
            {Object.entries(s.taxonomy)
              .sort(([a], [b]) => RANKS.indexOf(a) - RANKS.indexOf(b))
              .map(([rank, t]) => (
                <div key={rank} className="contents">
                  <dt className="text-ink-subtle capitalize">{rank}</dt>
                  <dd className="text-ink">
                    {t.name} <span className="text-xs text-ink-subtle">({t.source})</span>
                  </dd>
                </div>
              ))}
          </dl>
          <p className="mt-3 text-sm text-ink-muted">
            {s.cultivationNote} {s.nativeNote}
          </p>
          {s.nativeTerritories.length > 0 && (
            <p className="mt-1 text-xs text-ink-subtle">
              Native territories in scope:{' '}
              {s.nativeTerritories.map((t) => TERRITORY_NAME[t]).join(', ')}
            </p>
          )}
          <Link
            to={`/map?species=${s.id}`}
            className="mt-4 inline-flex h-8 items-center rounded-md bg-brand px-3 text-sm font-medium text-brand-ink hover:bg-brand-hover"
          >
            Open on the map
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Panel title="Medical applications">
          <ul className="space-y-4">
            {s.medicalApplications.map((m) => (
              <li key={m.compound}>
                <p className="text-sm font-medium text-ink">{m.compound}</p>
                <p className="text-sm text-ink-muted">{m.use}</p>
                <p className="mt-1 text-xs text-ink-subtle">Clinical status: {m.clinical_status}</p>
                <ul className="mt-2 space-y-1">
                  {m.references.map((r) => (
                    <li key={r.doi ?? r.url ?? r.key}>
                      <ReferenceLink r={r} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Environmental tolerance">
          <ul className="space-y-3">
            {s.parameters.map((p) =>
              p.band ? (
                <li key={p.key}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-ink">
                      {p.label} {p.band.lethal && <Badge tone="accent">survival limit</Badge>}
                    </span>
                    <span className="num text-xs text-ink-subtle">
                      weight {p.weight} · {p.unit}
                    </span>
                  </div>
                  <RangeChart band={p.band} unit={p.unit} />
                </li>
              ) : null,
            )}
          </ul>
          {s.frostSensitive && (
            <p className="mt-2 text-xs text-accent">
              Frost-sensitive: more than 5 frost days caps the score.
            </p>
          )}
          <p className="mt-3 text-xs text-ink-muted">{s.toleranceNote}</p>
          <p className="mt-1 text-xs text-ink-subtle">
            Thick bar: optimal band (fit 100). Thin line: tolerance (fit falls to 0). Dashed:
            survival limits on monthly extremes. {s.toleranceStatus}.
          </p>
          <ul className="mt-2 space-y-1">
            {s.toleranceReferences.map((r) => (
              <li key={r.doi ?? r.url ?? r.key}>
                <ReferenceLink r={r} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={`Occurrences (${int(s.occurrences.total)} records)`}>
          <Suspense fallback={<Skeleton className="h-72 w-full" />}>
            <OccurrenceMap
              data={occ.data}
              label={`World map of ${s.scientificName} occurrence records`}
            />
          </Suspense>
          <p className="mt-2 flex flex-wrap gap-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: '#eb6834' }}
                aria-hidden="true"
              />
              GBIF ({int(s.occurrences.bySource.gbif ?? 0)})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: '#2a78d6' }}
                aria-hidden="true"
              />
              OBIS ({int(s.occurrences.bySource.obis ?? 0)})
            </span>
            <span>
              Points thinned to one per 0.05°. GBIF download{' '}
              <ExternalLink href="https://doi.org/10.15468/dl.sfc2ns">
                10.15468/dl.sfc2ns
              </ExternalLink>
            </span>
          </p>
        </Panel>

        <Panel title="Distribution model">
          {s.model?.trained ? (
            <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
              <div>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-ink-subtle">AUC (spatial CV)</dt>
                    <dd className="num text-ink">
                      {two(s.model.aucMean)} ± {two(s.model.aucStd)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-subtle">TSS</dt>
                    <dd className="num text-ink">
                      {two(s.model.tssMean)} ± {two(s.model.tssStd)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-subtle">Baseline AUC (log. reg.)</dt>
                    <dd className="num text-ink">{two(s.model.baselineAucMean)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-subtle">Presences / background</dt>
                    <dd className="num text-ink">
                      {int(s.model.nPresences)} / {int(s.model.nBackground)}
                    </dd>
                  </div>
                </dl>
                {s.model.calibration && (
                  <div className="mt-3">
                    <CalibrationChart
                      raw={s.model.calibration.raw}
                      calibrated={s.model.calibration.calibrated}
                      label={s.scientificName}
                    />
                    <p className="text-[11px] text-ink-subtle">Orange raw, blue calibrated.</p>
                  </div>
                )}
              </div>
              <div>
                <p className="mb-2 text-xs text-ink-subtle">Predictor importance (mean |SHAP|)</p>
                <BarList items={importance} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">
              {s.model?.reason ?? 'No model.'} The score relies on the expert tolerance bands.
            </p>
          )}
          <p className="mt-3 text-xs text-ink-subtle">
            <Link to="/model" className="text-brand hover:underline">
              How the model works →
            </Link>
          </p>
        </Panel>
      </div>
    </div>
  );
}
