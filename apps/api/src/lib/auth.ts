import crypto from 'node:crypto';
import { hash, verify, Algorithm } from '@node-rs/argon2';
import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { Role, User } from '@prisma/client';
import { config } from '../config';
import { prisma } from './db';
import { unauthorized } from './errors';

// OWASP Password Storage Cheat Sheet (2024): Argon2id, m=19 MiB, t=2, p=1.
const ARGON2 = { algorithm: Algorithm.Argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 };

export const hashPassword = (password: string) => hash(password, ARGON2);
export const verifyPassword = (digest: string, password: string) =>
  verify(digest, password).catch(() => false);

export const ACCESS_COOKIE = 'bz_access';
export const REFRESH_COOKIE = 'bz_refresh';

export interface AuthUser {
  id: string;
  role: Role;
}

interface AccessClaims {
  sub: string;
  role: Role;
}

export function signAccess(user: Pick<User, 'id' | 'role'>): string {
  return jwt.sign(
    { role: user.role } satisfies Omit<AccessClaims, 'sub'>,
    config.JWT_ACCESS_SECRET,
    {
      subject: user.id,
      expiresIn: config.ACCESS_TTL_SECONDS,
      issuer: 'biomed-zones',
      audience: 'biomed-zones-web',
    },
  );
}

export function verifyAccess(token: string): AuthUser {
  try {
    const claims = jwt.verify(token, config.JWT_ACCESS_SECRET, {
      issuer: 'biomed-zones',
      audience: 'biomed-zones-web',
    }) as jwt.JwtPayload & AccessClaims;
    return { id: claims.sub, role: claims.role };
  } catch {
    throw unauthorized('Invalid or expired access token');
  }
}

const sha256 = (v: string) => crypto.createHash('sha256').update(v).digest('hex');

/** Opaque refresh token: random value + HMAC, stored hashed so a DB leak cannot be replayed. */
function newRefreshValue(): string {
  const raw = crypto.randomBytes(32).toString('base64url');
  const mac = crypto
    .createHmac('sha256', config.JWT_REFRESH_SECRET)
    .update(raw)
    .digest('base64url');
  return `${raw}.${mac}`;
}

function validMac(value: string): boolean {
  const [raw, mac] = value.split('.');
  if (!raw || !mac) return false;
  const expected = crypto
    .createHmac('sha256', config.JWT_REFRESH_SECRET)
    .update(raw)
    .digest('base64url');
  return (
    expected.length === mac.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(mac))
  );
}

const cookieBase = () => ({
  httpOnly: true,
  secure: config.COOKIE_SECURE,
  sameSite: 'strict' as const,
  path: '/',
});

export async function issueSession(
  res: Response,
  user: Pick<User, 'id' | 'role'>,
  family?: string,
) {
  const value = newRefreshValue();
  const expiresAt = new Date(Date.now() + config.REFRESH_TTL_DAYS * 86_400_000);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(value),
      family: family ?? crypto.randomUUID(),
      expiresAt,
    },
  });
  res.cookie(ACCESS_COOKIE, signAccess(user), {
    ...cookieBase(),
    maxAge: config.ACCESS_TTL_SECONDS * 1000,
  });
  res.cookie(REFRESH_COOKIE, value, { ...cookieBase(), expires: expiresAt });
}

/**
 * Rotate a refresh token. Reusing an already-rotated token revokes its whole family
 * (token theft detection, OWASP / RFC 6819 §5.2.2.3).
 */
export async function rotateSession(res: Response, value: string | undefined) {
  if (!value || !validMac(value)) throw unauthorized('Invalid refresh token');
  const token = await prisma.refreshToken.findUnique({
    where: { tokenHash: sha256(value) },
    include: { user: true },
  });
  if (!token) throw unauthorized('Invalid refresh token');
  if (token.revokedAt) {
    await prisma.refreshToken.updateMany({
      where: { family: token.family, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw unauthorized('Refresh token reuse detected; session revoked');
  }
  if (token.expiresAt < new Date()) throw unauthorized('Refresh token expired');
  await prisma.refreshToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
  await issueSession(res, token.user, token.family);
  return token.user;
}

export async function endSession(res: Response, value: string | undefined) {
  if (value) {
    await prisma.refreshToken.updateMany({
      where: { tokenHash: sha256(value), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  res.clearCookie(ACCESS_COOKIE, cookieBase());
  res.clearCookie(REFRESH_COOKIE, cookieBase());
}
