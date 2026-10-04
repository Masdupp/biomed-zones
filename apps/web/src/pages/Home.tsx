import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge, Skeleton, Stat } from '@/components/ui';
import { SpeciesPhoto } from '@/components/species/SpeciesPhoto';
import { int } from '@/lib/format';
import { useSpeciesList, useStats } from '@/lib/queries';

const MiniMap = lazy(() => import('@/components/map/MiniMap'));
const HABITAT_LABEL = {
  marine: 'Marine',
  freshwater: 'Freshwater',
  terrestrial: 'Terrestrial',
} as const;

export function Home() {
  const stats = useStats();
  const species = useSpeciesList();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section aria-labelledby="value-prop" className="max-w-[60ch]">
          <h1 id="value-prop" className="text-2xl leading-tight text-ink md:text-3xl">
            Where in France can a medical species be cultivated sustainably, and why.
          </h1>
          <p className="mt-3 text-base text-ink-muted">
            Hexagonal suitability scores for Metropolitan France and the five overseas regions,
            built from public environmental data and an explainable model you can inspect cell by
            cell.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/map"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-brand px-4 text-sm font-medium text-brand-ink transition-colors transition-base hover:bg-brand-hover"
            >
              Open the map <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              to="/model"
              className="inline-flex h-9 items-center rounded-md border border-border-strong px-4 text-sm text-ink transition-colors transition-base hover:bg-surface-hover"
            >
              How the score works
            </Link>
          </div>
        </section>
        <Suspense fallback={<Skeleton className="aspect-[4/3] w-full" />}>
          <MiniMap species="salix-alba" />
        </Suspense>
      </div>

      <section aria-labelledby="key-numbers" className="mt-12">
        <h2 id="key-numbers" className="sr-only">
          Key numbers
        </h2>
        <dl className="grid grid-cols-1 border-y border-border sm:grid-cols-3">
          <Stat
            className="py-4 sm:px-4"
            label="H3 cells analysed (resolution 7)"
            value={stats.data ? int(stats.data.cellsAnalysed.value) : '—'}
            source={
              stats.data
                ? `+ ${int(stats.data.cellsAnalysed.resolution6)} at resolution 6 · source: cell table`
                : 'loading'
            }
          />
          <Stat
            className="border-t border-border py-4 sm:border-t-0 sm:border-l sm:px-4"
            label="Occurrences used for training"
            value={stats.data ? int(stats.data.occurrencesUsed.value) : '—'}
            source={stats.data?.occurrencesUsed.source}
          />
          <Stat
            className="border-t border-border py-4 sm:border-t-0 sm:border-l sm:px-4"
            label="Public data sources"
            value={stats.data ? int(stats.data.dataSources.value) : '—'}
            source={
              <Link to="/sources" className="hover:text-ink hover:underline">
                provenance registry →
              </Link>
            }
          />
        </dl>
        {stats.data?.dataset.mode && (
          <p className="mt-2 text-xs text-ink-subtle">
            Dataset: {stats.data.dataset.mode}
            {stats.data.dataset.snapshotVersion &&
              ` snapshot ${stats.data.dataset.snapshotVersion}`}{' '}
            · model run <span className="num">{stats.data.model?.runId ?? '—'}</span>
          </p>
        )}
      </section>

      <section aria-labelledby="species-heading" className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 id="species-heading" className="text-sm font-medium text-ink">
            Species in scope
          </h2>
          <Link to="/species" className="text-xs text-brand hover:underline">
            All profiles →
          </Link>
        </div>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(species.data?.items ?? Array.from({ length: 9 }, () => null)).map((s, i) =>
            s ? (
              <li key={s.id}>
                <Link
                  to={`/species/${s.id}`}
                  className="group grid grid-cols-[84px_1fr] gap-3 rounded-md border border-border bg-surface p-2 transition-colors transition-base hover:border-border-strong"
                >
                  <SpeciesPhoto
                    photo={s.photo}
                    name={s.scientificName}
                    className="h-[84px] w-[84px] rounded-sm"
                    credit={false}
                    size="thumb"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink italic">{s.scientificName}</p>
                    <p className="truncate text-xs text-ink-muted">{s.commonNameEn}</p>
                    <p className="mt-1 truncate text-xs text-ink-subtle">{s.compounds[0]}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <Badge>{HABITAT_LABEL[s.habitat]}</Badge>
                      {s.iucn && (
                        <Badge
                          tone={['VU', 'EN', 'CR'].includes(s.iucn.code) ? 'accent' : 'neutral'}
                        >
                          IUCN {s.iucn.code}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ) : (
              <li key={i}>
                <Skeleton className="h-[102px] w-full" />
              </li>
            ),
          )}
        </ul>
        <p className="mt-2 text-xs text-ink-subtle">
          Photos: Wikimedia Commons, credited on each species page.
        </p>
      </section>
    </div>
  );
}
