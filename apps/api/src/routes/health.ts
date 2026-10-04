import { Router } from 'express';
import { z } from 'zod';
import { healthReport } from '../lib/health';
import { json, registry } from '../openapi';

export const healthRouter = Router();

const Check = z.object({ status: z.enum(['ok', 'error']), error: z.string().optional() });

registry.registerPath({
  method: 'get',
  path: '/health/live',
  tags: ['System'],
  summary: 'Liveness check',
  responses: { 200: json(z.object({ status: z.literal('ok') })) },
});
healthRouter.get('/health/live', (_req, res) => {
  res.json({ status: 'ok' });
});

registry.registerPath({
  method: 'get',
  path: '/health',
  tags: ['System'],
  summary: 'Readiness check (database + ML service)',
  responses: {
    200: json(
      z.object({
        status: z.enum(['ok', 'degraded']),
        service: z.literal('api'),
        version: z.string(),
        uptimeSeconds: z.number(),
        checks: z.object({
          database: Check.extend({
            postgis: z.string().optional(),
            h3: z.string().nullable().optional(),
          }),
          ml: Check,
        }),
      }),
      'Database reachable',
    ),
    503: { description: 'Database unreachable' },
  },
});
healthRouter.get('/health', async (_req, res) => {
  const report = await healthReport();
  res.status(report.checks.database.status === 'ok' ? 200 : 503).json(report);
});
