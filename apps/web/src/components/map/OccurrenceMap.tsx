import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { basemapStyle } from '@/lib/basemap';
import { useDark } from '@/lib/useDark';
import { trackContainerSize } from '@/lib/mapResize';

/** World map of occurrence points (GeoJSON, thinned server-side). */
export default function OccurrenceMap({
  data,
  label,
}: {
  data: GeoJSON.FeatureCollection | undefined;
  label: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const dark = useDark();
  const dataRef = useRef(data);
  dataRef.current = data;

  const addLayers = (m: maplibregl.Map) => {
    if (!dataRef.current || m.getSource('occ')) return;
    m.addSource('occ', { type: 'geojson', data: dataRef.current });
    m.addLayer({
      id: 'occ',
      type: 'circle',
      source: 'occ',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.6, 6, 3.5],
        'circle-color': ['match', ['get', 'source'], 'obis', '#2a78d6', '#eb6834'],
        'circle-opacity': 0.8,
        'circle-stroke-width': 0,
      },
    });
  };

  useEffect(() => {
    if (!el.current) return;
    const m = new maplibregl.Map({
      container: el.current,
      style: basemapStyle(dark, 'world'),
      center: [10, 25],
      zoom: 0.8,
      attributionControl: false,
      dragRotate: false,
      renderWorldCopies: false,
    });
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    m.addControl(
      new maplibregl.AttributionControl({
        compact: true,
        customAttribution: 'Natural Earth · GBIF · OBIS',
      }),
    );
    m.on('style.load', () => addLayers(m));
    map.current = m;
    const untrack = trackContainerSize(m, el.current);
    return () => {
      untrack();
      m.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    map.current?.setStyle(basemapStyle(dark, 'world'));
  }, [dark]);

  useEffect(() => {
    const m = map.current;
    if (!m || !data) return;
    const src = m.getSource('occ') as maplibregl.GeoJSONSource | undefined;
    if (src) src.setData(data);
    else if (m.isStyleLoaded()) addLayers(m);
  }, [data]);

  return (
    <div
      ref={el}
      className="h-72 w-full rounded-md border border-border"
      role="region"
      aria-label={label}
    />
  );
}
