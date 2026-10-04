import path from 'node:path';
import { z } from 'zod';

const bool = z.enum(['true', 'false', '1', '0']).transform((v) => v === 'true' || v === '1');

const Env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().url().default('postgresql://biomed:biomed@localhost:5432/biomed'),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:8080,http://localhost:5173')
    .transform((v) =>
      v
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean),
    ),
  ML_SERVICE_URL: z.string().url().default('http://localhost:8001'),
  ML_ADMIN_TOKEN: z.string().min(8).default('dev-ml-admin-token-change-me'),
  JWT_ACCESS_SECRET: z.string().min(16).default('dev-access-secret-change-me'),
  JWT_REFRESH_SECRET: z.string().min(16).default('dev-refresh-secret-change-me'),
  ACCESS_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60),
  REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(7),
  // Secure cookies need HTTPS; the local demo runs on http://localhost.
  COOKIE_SECURE: bool.default('false'),
  RATE_LIMIT_ENABLED: bool.default('true'),
  SPECIES_PROFILES: z
    .string()
    .default(path.resolve(__dirname, '../../../data/reference/species.json')),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

export type Config = z.infer<typeof Env>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return Env.parse(env);
}

export const config = loadConfig();

export const DEFAULT_SECRETS =
  config.JWT_ACCESS_SECRET.startsWith('dev-') || config.JWT_REFRESH_SECRET.startsWith('dev-');
