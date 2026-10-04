import type { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { config } from '../config';
import { forbidden } from '../lib/errors';

const limiter = (windowMs: number, limit: number, name: string) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skip: () => !config.RATE_LIMIT_ENABLED,
    handler: (_req, res) => {
      res.status(429).json({ error: 'rate_limited', message: `Too many ${name} requests` });
    },
  });

/** Whole API: generous, protects against scraping loops. */
export const globalLimiter = limiter(15 * 60 * 1000, 1500, 'API');
/** Login / register: brute-force protection. */
export const authLimiter = limiter(15 * 60 * 1000, 20, 'authentication');
/** Token refresh: legitimate clients refresh every 15 min per tab; still bounded. */
export const refreshLimiter = limiter(15 * 60 * 1000, 120, 'refresh');
/** Contribution writes and reference checks (which call external services). */
export const writeLimiter = limiter(60 * 60 * 1000, 120, 'write');
/** PDF generation is CPU-bound. */
export const reportLimiter = limiter(60 * 1000, 20, 'report');

const UNSAFE = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * CSRF defence in depth (cookies are already SameSite=Strict): state-changing requests that
 * carry an Origin header must come from a whitelisted origin.
 */
export function originCheck(req: Request, _res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (UNSAFE.has(req.method) && origin && !config.CORS_ORIGINS.includes(origin)) {
    return next(forbidden('Origin not allowed'));
  }
  next();
}
