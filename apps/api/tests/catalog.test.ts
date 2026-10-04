import request from 'supertest';
import { latLngToCell } from 'h3-js';
import { app } from './helpers/agent';
import { BAY, BAY2, LAND } from './helpers/fixtures';

describe('species', () => {
  it('lists the nine species with model metrics', async () => {
    const res = await request(app).get('/species');
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(9);
    const aren = res.body.items.find((s: { id: string }) => s.id === 'arenicola-marina');
    expect(aren.model.aucMean).toBeCloseTo(0.989);
    expect(aren.compounds[0]).toMatch(/M101/);
    expect(aren.photo.license).toBeTruthy();
  });

  it('returns a full profile with resolved, verified references', async () => {
    const res = await request(app).get('/species/conus-magus');
    expect(res.status).toBe(200);
    expect(res.body.iucn.code).toBe('LC');
    const ref = res.body.medicalApplications[0].references[0];
    expect(ref).toMatchObject({ status: 'verified' });
    expect(ref.doi).toMatch(/^10\./);
    expect(res.body.parameters.map((p: { key: string }) => p.key)).toEqual([
      'temperature',
      'salinity',
      'ph',
      'depth',
      'oxygen',
    ]);
    expect(res.body.toleranceStatus).toMatch(/expert validation/);
  });

  it('404s on unknown species and 400s on malformed ids', async () => {
    expect((await request(app).get('/species/unknown-species')).status).toBe(404);
    expect((await request(app).get('/species/DROP%20TABLE')).status).toBe(400);
  });

  it('serves occurrences as GeoJSON', async () => {
    const res = await request(app).get('/species/arenicola-marina/occurrences');
    expect(res.body.type).toBe('FeatureCollection');
    expect(res.body.features[0].geometry.coordinates).toEqual([-1.62, 48.66]);
  });
});

describe('cells', () => {
  it('returns compact H3 rows with filters and caching', async () => {
    const url = '/cells?species=arenicola-marina&resolution=7';
    const res = await request(app).get(url);
    expect(res.status).toBe(200);
    expect(res.body.columns).toEqual(['h3', 'score', 'category', 'confidence']);
    expect(res.body.total).toBe(2);
    expect(res.headers['x-cache']).toBe('MISS');
    expect((await request(app).get(url)).headers['x-cache']).toBe('HIT');
    const filtered = await request(app).get(`${url}&minScore=50`);
    expect(filtered.body.items.map((r: string[]) => r[0])).toEqual([BAY2]);
  });

  it('excludes mostly protected cells on request', async () => {
    const res = await request(app).get(
      '/cells?species=arenicola-marina&resolution=7&excludeProtected=true',
    );
    expect(res.body.total).toBe(0); // both bay cells are 100 % Natura 2000
  });

  it('returns GeoJSON polygons inside a bbox', async () => {
    const res = await request(app).get(
      '/cells?species=arenicola-marina&resolution=7&format=geojson&bbox=-2,48.5,-1.3,48.9',
    );
    expect(res.body.type).toBe('FeatureCollection');
    expect(res.body.features[0].geometry.type).toBe('Polygon');
  });

  it('validates query parameters', async () => {
    expect((await request(app).get('/cells?species=arenicola-marina&resolution=5')).status).toBe(
      400,
    );
    expect((await request(app).get('/cells?species=arenicola-marina&bbox=1,2,3')).status).toBe(400);
    expect((await request(app).get('/cells?species=arenicola-marina&bbox=3,3,1,1')).status).toBe(
      400,
    );
    expect((await request(app).get('/cells?species=nope')).status).toBe(404);
  });

  it('returns a cell profile with provenance on every value', async () => {
    const res = await request(app).get(`/cells/${BAY}`);
    expect(res.status).toBe(200);
    const values = Object.values(res.body.features).flat() as {
      provenance: { id: string; license: string };
    }[];
    expect(values.length).toBeGreaterThan(5);
    expect(values.every((v) => v.provenance.id === 'test-source' && v.provenance.license)).toBe(
      true,
    );
    expect(res.body.scores[0]).toMatchObject({
      species: 'arenicola-marina',
      modifiers: { regulatory: 0.7 },
    });
    expect(res.body.geometry.coordinates[0].length).toBeGreaterThan(5);
  });

  it('rejects invalid H3 and 404s on unknown cells', async () => {
    expect((await request(app).get('/cells/not-a-cell')).status).toBe(400);
    expect((await request(app).get(`/cells/${latLngToCell(0, 0, 7)}`)).status).toBe(404); // valid, outside the grid
  });

  it('compares two to four cells with parameter fits', async () => {
    const res = await request(app).get(`/compare?species=arenicola-marina&cells=${BAY},${BAY2}`);
    expect(res.status).toBe(200);
    expect(res.body.cells).toHaveLength(2);
    expect(
      res.body.cells[0].parameters.find((p: { key: string }) => p.key === 'temperature').fit,
    ).toBe(100);
    expect((await request(app).get(`/compare?species=arenicola-marina&cells=${BAY}`)).status).toBe(
      400,
    );
    expect(
      (
        await request(app).get(
          `/compare?species=arenicola-marina&cells=${BAY},${LAND},${BAY2},${BAY},a,b`,
        )
      ).status,
    ).toBe(400);
  });
});

describe('sources and stats', () => {
  it('lists provenance with usage counts', async () => {
    const res = await request(app).get('/sources');
    const src = res.body.items.find((s: { id: string }) => s.id === 'test-source');
    expect(src.cellValues).toBeGreaterThan(20);
    expect((await request(app).get('/sources/test-source')).body.license).toBe('CC BY 4.0');
    expect((await request(app).get('/sources/missing')).status).toBe(404);
  });

  it('exposes headline numbers with their source', async () => {
    const res = await request(app).get('/stats');
    expect(res.body.cellsAnalysed).toMatchObject({ value: 3 });
    expect(res.body.occurrencesUsed.source).toMatch(/GBIF/);
  });
});
