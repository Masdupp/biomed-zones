import { Link } from 'react-router-dom';
import { MapView } from './MapView';
import { Legend } from './Legend';
import { useCells, useSpeciesList } from '@/lib/queries';

/** Non-interactive live preview of one species' resolution-6 scores (lazy-loaded on Home). */
export default function MiniMap({ species }: { species: string }) {
  const cells = useCells({ species, resolution: 6 });
  const list = useSpeciesList();
  const name = list.data?.items.find((s) => s.id === species)?.scientificName ?? species;
  return (
    <figure className="relative overflow-hidden rounded-md border border-border">
      <MapView
        className="aspect-[4/3] w-full"
        cells={cells.data?.items ?? []}
        interactive={false}
        ariaLabel={`Preview: suitability of ${name} over Metropolitan France`}
      />
      <div className="absolute bottom-2 left-2">
        <Legend compact />
      </div>
      <figcaption className="absolute top-2 left-2 rounded-sm border border-border bg-surface/95 px-2 py-1 text-xs text-ink-muted">
        Live: <span className="italic text-ink">{name}</span>, resolution 6 ·{' '}
        <Link to={`/map?species=${species}`} className="text-brand hover:underline">
          open map
        </Link>
      </figcaption>
      <p className="absolute right-2 bottom-2 rounded-sm bg-surface/90 px-1.5 py-0.5 text-[10px] text-ink-subtle">
        Basemap: Natural Earth, Marine Regions
      </p>
    </figure>
  );
}
