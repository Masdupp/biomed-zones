import type { Map as MapLibreMap } from 'maplibre-gl';

/**
 * MapLibre only tracks window resizes. Keep the canvas matched to its container when the layout
 * changes size (lazy content above, panels opening, fonts loading). Returns a cleanup function.
 */
export function trackContainerSize(map: MapLibreMap, container: HTMLElement): () => void {
  if (typeof ResizeObserver === 'undefined') return () => {};
  const observer = new ResizeObserver(() => map.resize());
  observer.observe(container);
  return () => observer.disconnect();
}
