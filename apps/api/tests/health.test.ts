import request from 'supertest';

jest.mock('../src/lib/db', () => ({
  prisma: { $queryRaw: jest.fn().mockResolvedValue([{ postgis: '3.6.4', h3: '4.2.3' }]) },
}));

import { createApp } from '../src/app';

describe('health endpoints', () => {
  const app = createApp();

  it('GET /health/live returns ok', async () => {
    const res = await request(app).get('/health/live');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /health reports database extensions', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.checks.database).toEqual({ status: 'ok', postgis: '3.6.4', h3: '4.2.3' });
    expect(res.body.status).toBe('ok');
  });

  it('GET /health is degraded when the ML service is down', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('ECONNREFUSED')) as unknown as typeof fetch;
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('degraded');
    expect(res.body.checks.ml.status).toBe('error');
  });

  it('serves the OpenAPI document', async () => {
    const res = await request(app).get('/openapi.json');
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.1.0');
    expect(Object.keys(res.body.paths)).toContain('/health');
  });

  it('returns JSON 404 for unknown routes', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'not_found', message: 'Route not found' });
  });
});
