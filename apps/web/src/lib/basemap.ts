import type { StyleSpecification } from 'maplibre-gl';

/** Offline basemap style from local GeoJSON (no tile server, no glyphs). */
export function basemapStyle(
  dark: boolean,
  extent: 'regional' | 'world' = 'regional',
): StyleSpecification {
  const c = dark
    ? { sea: '#0e141a', land: '#161d24', border: '#2f3b47', outline: '#2bb3a6' }
    : { sea: '#e8edef', land: '#f7f7f5', border: '#cfcac4', outline: '#0f766e' };
  const land = extent === 'world' ? '/basemap/world.geojson' : '/basemap/land.geojson';
  return {
    version: 8,
    sources: {
      land: { type: 'geojson', data: land },
      ...(extent === 'regional'
        ? {
            borders: { type: 'geojson', data: '/basemap/borders.geojson' },
            territories: { type: 'geojson', data: '/basemap/territories.geojson' },
          }
        : {}),
    },
    layers: [
      { id: 'sea', type: 'background', paint: { 'background-color': c.sea } },
      { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': c.land } },
      ...(extent === 'regional'
        ? ([
            {
              id: 'borders',
              type: 'line',
              source: 'borders',
              paint: { 'line-color': c.border, 'line-width': 0.6 },
            },
            {
              id: 'territories',
              type: 'line',
              source: 'territories',
              paint: { 'line-color': c.outline, 'line-width': 0.8, 'line-opacity': 0.55 },
            },
          ] as StyleSpecification['layers'])
        : []),
    ],
  };
}

export function isDarkTheme(): boolean {
  const t = document.documentElement.dataset.theme;
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}
