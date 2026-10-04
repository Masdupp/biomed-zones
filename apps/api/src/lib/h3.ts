import { cellToBoundary, isValidCell, latLngToCell } from 'h3-js';

export const CONTRIBUTION_RES = 7;

export const toCell = (lat: number, lon: number) => latLngToCell(lat, lon, CONTRIBUTION_RES);
export const validCell = (h: string) => isValidCell(h);

/** GeoJSON polygon ring ([lng, lat]) of an H3 cell. */
export function cellPolygon(h: string): number[][][] {
  const ring = cellToBoundary(h, true);
  return [ring];
}
