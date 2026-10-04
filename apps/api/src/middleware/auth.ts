import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@prisma/client';
import { ACCESS_COOKIE, type AuthUser, verifyAccess } from '../lib/auth';
import { forbidden, unauthorized } from '../lib/errors';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

/** Attach req.user from the access cookie (browser) or a Bearer token (API clients). */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token =
    (req.cookies as Record<string, string> | undefined)?.[ACCESS_COOKIE] ??
    (header?.startsWith('Bearer ') ? header.slice(7) : undefined);
  if (token) {
    try {
      req.user = verifyAccess(token);
    } catch {
      // Expired or invalid: continue anonymously; protected routes answer 401 and the client
      // calls /auth/refresh.
    }
  }
  next();
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(unauthorized());
  next();
}

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role))
      return next(forbidden(`Requires role ${roles.join(' or ')}`));
    next();
  };

export function currentUser(req: Request): AuthUser {
  if (!req.user) throw unauthorized();
  return req.user;
}
