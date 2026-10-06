import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { basemapStyle } from '@/lib/basemap';
import { useDark } from '@/lib/useDark';
import { trackContainerSize } from '@/lib/mapResize';
import { WebGLGuard } from './WebGLGuard';

/** Click-to-pick location map; the parent also offers lat/lon inputs for keyboard users. */
function LocationPickerGL({
  lat,
  lon,
  onPick,
}: {
  lat: number | null;
  lon: number | null;
  onPick: (lat: number, lon: number) => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const dark = useDark();
  const pick = useRef(onPick);
  pick.current = onPick;

  useEffect(() => {
    if (!el.current) return;
    const m = new maplibregl.Map({
      container: el.current,
      style: basemapStyle(dark),
      bounds: [
        [-5.6, 41.2],
        [9.8, 51.3],
      ],
      attributionControl: false,
      dragRotate: false,
    });
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    m.getCanvas().style.cursor = 'crosshair';
    m.on('click', (e) =>
      pick.current(Number(e.lngLat.lat.toFixed(5)), Number(e.lngLat.lng.toFixed(5))),
    );
    map.current = m;
    const untrack = trackContainerSize(m, el.current);
    return () => {
      untrack();
      m.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    map.current?.setStyle(basemapStyle(dark));
  }, [dark]);

  useEffect(() => {
    const m = map.current;
    if (!m || lat === null || lon === null) return;
    if (!marker.current) marker.current = new maplibregl.Marker({ color: '#0f766e' });
    marker.current.setLngLat([lon, lat]).addTo(m);
  }, [lat, lon]);

  return (
    <div
      ref={el}
      className="h-96 w-full rounded-md border border-border"
      role="application"
      aria-label="Location picker map: click to set the observation location"
    />
  );
}

export default function LocationPicker(props: {
  lat: number | null;
  lon: number | null;
  onPick: (lat: number, lon: number) => void;
}) {
  return (
    <WebGLGuard className="h-96 w-full rounded-md border border-border">
      <LocationPickerGL {...props} />
    </WebGLGuard>
  );
}
