import request from 'supertest';
import { app, loginAs } from './helpers/agent';
import { BAY, LAND } from './helpers/fixtures';

describe('reports', () => {
  it('generates a PDF (precomputed fallback when the ML service is down)', async () => {
    const res = await request(app)
      .get(`/reports/${BAY}/arenicola-marina`)
      .buffer(true)
      .parse((r, cb) => {
        const chunks: Buffer[] = [];
        r.on('data', (c: Buffer) => chunks.push(c));
        r.on('end', () => cb(null, Buffer.concat(chunks)));
      });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/pdf');
    expect((res.body as Buffer).subarray(0, 5).toString()).toBe('%PDF-');
    expect((res.body as Buffer).length).toBeGreaterThan(3000);
  });

  it('404s when the species does not occur in the cell', async () => {
    expect((await request(app).get(`/reports/${LAND}/arenicola-marina`)).status).toBe(404);
  });
});

describe('security and errors', () => {
  it('sets security headers', async () => {
    const res = await request(app).get('/species');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['content-security-policy']).toBeDefined();
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('blocks state-changing requests from foreign origins', async () => {
    const admin = await loginAs('admin');
    const res = await admin.post('/admin/retrain').set('Origin', 'https://evil.example');
    expect(res.status).toBe(403);
  });

  it('allows whitelisted CORS origins with credentials only', async () => {
    const ok = await request(app).get('/species').set('Origin', 'http://localhost:8080');
    expect(ok.headers['access-control-allow-origin']).toBe('http://localhost:8080');
    expect(ok.headers['access-control-allow-credentials']).toBe('true');
    const bad = await request(app).get('/species').set('Origin', 'https://evil.example');
    expect(bad.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('answers malformed JSON and unknown routes with JSON errors', async () => {
    const bad = await request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send('{"email":');
    expect(bad.status).toBe(400);
    expect(bad.body.error).toBe('invalid_json');
    expect((await request(app).get('/nope')).body).toEqual({
      error: 'not_found',
      message: 'Route not found',
    });
  });

  it('documents every route in OpenAPI', async () => {
    const res = await request(app).get('/openapi.json');
    const paths = Object.keys(res.body.paths);
    for (const p of [
      '/species',
      '/cells',
      '/cells/{h3}',
      '/compare',
      '/contributions',
      '/admin/validate',
      '/admin/retrain',
      '/sources',
      '/reports/{h3}/{species}',
      '/me/export',
      '/me',
      '/auth/login',
    ]) {
      expect(paths).toContain(p);
    }
  });
});
