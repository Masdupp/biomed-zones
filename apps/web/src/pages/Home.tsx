import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SPECIES } from '@/lib/species';
import { PhaseNotice } from '@/components/PhaseNotice';

const KEY_NUMBERS = [
  { label: 'H3 cells analysed', source: 'cells table' },
  { label: 'Occurrences used for training', source: 'GBIF + OBIS' },
  { label: 'Public data sources', source: 'provenance registry' },
];

const HABITAT_LABEL = {
  marine: 'Marine',
  freshwater: 'Freshwater',
  terrestrial: 'Terrestrial',
} as const;

export function Home() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12">
      <section aria-labelledby="value-prop" className="max-w-[60ch]">
        <h1 id="value-prop" className="text-2xl leading-tight text-ink md:text-3xl">
          Where in France can a medical species be cultivated sustainably, and why.
        </h1>
        <p className="mt-3 text-base text-ink-muted">
          Hexagonal suitability scores for Metropolitan France and the five overseas regions, built
          from public environmental data and an explainable model you can inspect cell by cell.
        </p>
        <div className="mt-6 flex gap-2">
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

      <section aria-labelledby="key-numbers" className="mt-12">
        <h2 id="key-numbers" className="sr-only">
          Key numbers
        </h2>
        <dl className="grid grid-cols-1 border-y border-border sm:grid-cols-3">
          {KEY_NUMBERS.map((k, i) => (
            <div
              key={k.label}
              className={`px-0 py-4 sm:px-4 ${i > 0 ? 'border-t border-border sm:border-t-0 sm:border-l' : ''}`}
            >
              <dt className="text-xs text-ink-subtle">{k.label}</dt>
              <dd className="num mt-1 text-2xl text-ink" aria-label="not available yet">
                —
              </dd>
              <dd className="text-xs text-ink-subtle">source: {k.source}</dd>
            </div>
          ))}
        </dl>
        <PhaseNotice phase={2}>
          Key numbers are computed from the database once data is loaded. The live mini-map arrives
          in Phase 5.
        </PhaseNotice>
      </section>

      <section aria-labelledby="species-heading" className="mt-12">
        <h2 id="species-heading" className="text-sm font-medium text-ink">
          Species in scope
        </h2>
        <ul className="mt-3 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {SPECIES.map((s) => (
            <li key={s.slug} className="border-b border-border">
              <Link
                to={`/species/${s.slug}`}
                className="flex items-center justify-between px-1 py-3 text-sm transition-colors transition-base hover:bg-surface-hover"
              >
                <span className="italic text-ink">{s.scientificName}</span>
                <span className="text-xs text-ink-subtle">{HABITAT_LABEL[s.habitat]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
