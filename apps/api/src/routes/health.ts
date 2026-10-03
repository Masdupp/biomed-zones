import { Router } from 'express';
import { healthReport } from '../lib/health';

export const healthRouter = Router();

/** Liveness: the process is up. Used by the container healthcheck. */
healthRouter.get('/health/live', (_req, res) => {
  res.json({ status: 'ok' });
});

/** Readiness: dependencies reachable. 503 when the database is down. */
healthRouter.get('/health', async (_req, res) => {
  const report = await healthReport();
  res.status(report.checks.database.status === 'ok' ? 200 : 503).json(report);
});
