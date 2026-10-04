import { cellToBoundary, cellToLatLng, cellToParent, latLngToCell } from 'h3-js';
import { prisma } from '../../src/lib/db';

/** Real H3 cells: two marine cells in the Baie du Mont-Saint-Michel, one land cell near Tours. */
export const BAY = '87186068affffff';
export const BAY2 = '871860689ffffff';
export const LAND = latLngToCell(47.39, 0.69, 7); // Loire valley near Tours
export const RUN = 'run-20260101-000000';

const wkt = (h: string) =>
  `POLYGON((${cellToBoundary(h, true)
    .map(([lng, lat]) => `${lng} ${lat}`)
    .join(', ')}))`;

const MARINE = {
  sst_mean: 14.19,
  sst_min: 8.1,
  sst_max: 20.9,
  sss_mean: 33.85,
  sss_min: 33.5,
  ph_mean: 8.01,
  depth_mean: -4.43,
  o2_mean: 267.2,
  o2_min: 230.6,
  n2k_frac: 1,
  protected_frac: 1,
  dist_port_km: 18.3,
};
const LANDF = {
  tair_mean: 12.4,
  tair_min: 1.5,
  tair_max: 26.5,
  precip_annual: 690,
  rh_mean: 76,
  soil_ph: 6.8,
  elev_mean: 60,
  frost_days: 30,
  artificial_frac: 0.4,
  protected_frac: 0.6,
};

export async function insertFixtures() {
  await prisma.provenance.create({
    data: {
      id: 'test-source',
      sourceKey: 'test',
      name: 'Test source',
      url: 'https://example.org',
      license: 'CC BY 4.0',
      spatialResolution: 'test',
      variables: ['all'],
      mode: 'live',
      retrievedAt: new Date('2026-01-01'),
    },
  });
  const keys = [...new Set([...Object.keys(MARINE), ...Object.keys(LANDF)])];
  for (const key of keys) {
    await prisma.featureDef.create({
      data: { key, label: key, unit: '-', domain: 'marine', description: key },
    });
  }
  await prisma.$executeRawUnsafe(
    `INSERT INTO territory (code, name, kind, geom) VALUES ('FXX', 'France métropolitaine', 'metropole',
     ST_Multi(ST_GeomFromText('POLYGON((-6 41, 10 41, 10 51.6, -6 51.6, -6 41))', 4326)))`,
  );
  const cells: [string, number, number][] = [
    [BAY, 0, 1],
    [BAY2, 0, 1],
    [LAND, 1, 0],
  ];
  for (const [h3, land, sea] of cells) {
    const [lat, lon] = cellToLatLng(h3);
    await prisma.$executeRawUnsafe(
      `INSERT INTO cell (h3, resolution, parent_h3, territory_code, lat, lon, area_km2, land_fraction, sea_fraction, geom)
       VALUES ($1, 7, $2, 'FXX', $3, $4, 5.1, $5, $6, ST_GeomFromText($7, 4326))`,
      h3,
      cellToParent(h3, 6),
      lat,
      lon,
      land,
      sea,
      wkt(h3),
    );
    const feats = sea ? MARINE : LANDF;
    for (const [k, v] of Object.entries(feats)) {
      await prisma.cellFeature.create({
        data: { h3, featureKey: k, value: v, provenanceId: 'test-source' },
      });
    }
  }
  await prisma.modelRun.create({
    data: {
      id: RUN,
      status: 'succeeded',
      trigger: 'seed',
      isActive: true,
      params: {},
      progress: 1,
      message: 'fixture',
    },
  });
  const score = (speciesId: string, h3: string, value: number, category: string) =>
    prisma.score.create({
      data: {
        speciesId,
        h3,
        resolution: 7,
        runId: RUN,
        score: value,
        expertScore: 100,
        mlScore: 52,
        confidence: 0.7,
        completeness: 1,
        regulatoryMod: 0.7,
        humanMod: 0.81,
        dataMod: 1,
        category,
        mode: 'open',
        limiting: [],
        drivers: [['ml_chl_log', -0.01, 1.69]],
      },
    });
  await score('arenicola-marina', BAY, 43.1, 'low');
  await score('arenicola-marina', BAY2, 75, 'high');
  await score('salix-alba', LAND, 61, 'moderate');
  await prisma.speciesMetric.create({
    data: {
      runId: RUN,
      speciesId: 'arenicola-marina',
      trained: true,
      nPresences: 3085,
      nBackground: 9189,
      aucMean: 0.989,
      aucStd: 0.005,
      tssMean: 0.915,
      tssStd: 0.02,
      lrAucMean: 0.985,
      lrTssMean: 0.907,
      threshold: 0.4,
      detail: { cv: {}, calibration: {}, importance: {} },
    },
  });
  await prisma.occurrence.create({
    data: {
      speciesId: 'arenicola-marina',
      source: 'gbif',
      sourceRecordId: 't1',
      lat: 48.66,
      lon: -1.62,
      year: 2020,
      provenanceId: 'test-source',
    },
  });
}
