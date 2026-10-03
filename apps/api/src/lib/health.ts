import { prisma } from './db';
import { config } from '../config';

export type CheckStatus = 'ok' | 'error';

export interface HealthReport {
  status: 'ok' | 'degraded';
  service: 'api';
  version: string;
  uptimeSeconds: number;
  checks: {
    database: { status: CheckStatus; postgis?: string; h3?: string | null; error?: string };
    ml: { status: CheckStatus; error?: string };
  };
}

async function checkDatabase(): Promise<HealthReport['checks']['database']> {
  try {
    const rows = await prisma.$queryRaw<{ postgis: string; h3: string | null }[]>`
      SELECT postgis_lib_version() AS postgis,
             (SELECT extversion FROM pg_extension WHERE extname = 'h3') AS h3`;
    const row = rows[0];
    return { status: 'ok', postgis: row?.postgis, h3: row?.h3 ?? null };
  } catch (err) {
    return { status: 'error', error: (err as Error).message.split('\n')[0] };
  }
}

async function checkMl(): Promise<HealthReport['checks']['ml']> {
  try {
    const res = await fetch(`${config.ML_SERVICE_URL}/health`, {
      signal: AbortSignal.timeout(2000),
    });
    return res.ok ? { status: 'ok' } : { status: 'error', error: `HTTP ${res.status}` };
  } catch (err) {
    return { status: 'error', error: (err as Error).message };
  }
}

export async function healthReport(): Promise<HealthReport> {
  const [database, ml] = await Promise.all([checkDatabase(), checkMl()]);
  return {
    // The API is "ok" when its own dependency (database) is up; ML down only degrades it.
    status: database.status === 'ok' && ml.status === 'ok' ? 'ok' : 'degraded',
    service: 'api',
    version: process.env.npm_package_version ?? '2.0.0',
    uptimeSeconds: Math.round(process.uptime()),
    checks: { database, ml },
  };
}
