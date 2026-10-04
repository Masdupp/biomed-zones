export interface TerritoryView {
  code: string;
  name: string;
  short: string;
  bounds: [[number, number], [number, number]];
}

/** Map extents (land + 12 nm sea) for one-click navigation. */
export const TERRITORY_VIEWS: TerritoryView[] = [
  {
    code: 'FXX',
    name: 'France métropolitaine',
    short: 'Metropole',
    bounds: [
      [-5.6, 41.2],
      [9.8, 51.3],
    ],
  },
  {
    code: 'GLP',
    name: 'Guadeloupe',
    short: 'Guadeloupe',
    bounds: [
      [-61.85, 15.8],
      [-60.95, 16.55],
    ],
  },
  {
    code: 'MTQ',
    name: 'Martinique',
    short: 'Martinique',
    bounds: [
      [-61.3, 14.35],
      [-60.75, 14.95],
    ],
  },
  {
    code: 'GUF',
    name: 'Guyane',
    short: 'Guyane',
    bounds: [
      [-54.7, 2.1],
      [-51.4, 6.1],
    ],
  },
  {
    code: 'REU',
    name: 'La Réunion',
    short: 'Réunion',
    bounds: [
      [55.15, -21.45],
      [55.9, -20.8],
    ],
  },
  {
    code: 'MYT',
    name: 'Mayotte',
    short: 'Mayotte',
    bounds: [
      [44.9, -13.1],
      [45.35, -12.6],
    ],
  },
];

export const TERRITORY_NAME = Object.fromEntries(TERRITORY_VIEWS.map((t) => [t.code, t.name]));
