import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import {
  REFRESH_COOKIE,
  endSession,
  hashPassword,
  issueSession,
  rotateSession,
  verifyPassword,
} from '../lib/auth';
import { conflict, notFound, unauthorized } from '../lib/errors';
import { body } from '../lib/validate';
import { currentUser, requireAuth } from '../middleware/auth';
import { authLimiter, refreshLimiter } from '../middleware/security';
import { authed, errors, json, registry } from '../openapi';

export const authRouter = Router();

const Email = z.string().trim().toLowerCase().email().max(254);
// NIST SP 800-63B: length over composition rules; 12+ characters, max 128.
const Password = z.string().min(12, 'Password must be at least 12 characters').max(128);

const RegisterBody = registry.register(
  'RegisterBody',
  z.object({
    email: Email,
    password: Password,
    displayName: z.string().trim().min(2).max(80),
  }),
);
const LoginBody = registry.register(
  'LoginBody',
  z.object({ email: Email, password: z.string().min(1).max(128) }),
);
export const PublicUser = registry.register(
  'User',
  z.object({
    id: z.string(),
    email: z.string(),
    displayName: z.string(),
    role: z.enum(['CONTRIBUTOR', 'ADMIN']),
    createdAt: z.string(),
  }),
);

const publicUser = (u: {
  id: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: Date;
}) => ({
  id: u.id,
  email: u.email,
  displayName: u.displayName,
  role: u.role,
  createdAt: u.createdAt.toISOString(),
});

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: 'Create a contributor account and open a session',
  request: { body: { content: { 'application/json': { schema: RegisterBody } } } },
  responses: { 201: json(PublicUser, 'Created; session cookies set'), ...errors(400, 409, 429) },
});
authRouter.post('/auth/register', authLimiter, async (req, res) => {
  const input = body(req, RegisterBody);
  if (await prisma.user.findUnique({ where: { email: input.email } })) {
    throw conflict('An account with this email already exists');
  }
  const user = await prisma.user.create({
    data: {
      email: input.email,
      displayName: input.displayName,
      passwordHash: await hashPassword(input.password),
      role: 'CONTRIBUTOR',
    },
  });
  await issueSession(res, user);
  res.status(201).json(publicUser(user));
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'Log in (sets httpOnly access and refresh cookies)',
  request: { body: { content: { 'application/json': { schema: LoginBody } } } },
  responses: { 200: json(PublicUser), ...errors(400, 401, 429) },
});
authRouter.post('/auth/login', authLimiter, async (req, res) => {
  const input = body(req, LoginBody);
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  // Same error and similar timing whether the email exists or not.
  const ok = user
    ? await verifyPassword(user.passwordHash, input.password)
    : await hashPassword(input.password).then(() => false);
  if (!user || !ok) throw unauthorized('Invalid email or password');
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await issueSession(res, user);
  res.json(publicUser(user));
});

registry.registerPath({
  method: 'post',
  path: '/auth/refresh',
  tags: ['Auth'],
  summary: 'Rotate the refresh token and issue a new access token',
  responses: { 200: json(PublicUser), ...errors(401, 429) },
});
authRouter.post('/auth/refresh', refreshLimiter, async (req, res) => {
  const user = await rotateSession(res, (req.cookies as Record<string, string>)[REFRESH_COOKIE]);
  res.json(publicUser(user));
});

registry.registerPath({
  method: 'post',
  path: '/auth/logout',
  tags: ['Auth'],
  summary: 'Revoke the refresh token and clear cookies',
  responses: { 204: { description: 'Logged out' } },
});
authRouter.post('/auth/logout', async (req, res) => {
  await endSession(res, (req.cookies as Record<string, string>)[REFRESH_COOKIE]);
  res.status(204).end();
});

registry.registerPath({
  method: 'get',
  path: '/auth/session',
  tags: ['Auth'],
  summary: 'Current session for the web client (always 200)',
  description:
    '`user` is set when the access token is valid. `refreshable` tells the client whether a refresh cookie ' +
    'is present (the cookie itself is httpOnly), so anonymous visitors never trigger refresh attempts.',
  responses: { 200: json(z.object({ user: PublicUser.nullable(), refreshable: z.boolean() })) },
});
authRouter.get('/auth/session', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const refreshable = Boolean((req.cookies as Record<string, string>)[REFRESH_COOKIE]);
  if (!req.user) return void res.json({ user: null, refreshable });
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({ user: user ? publicUser(user) : null, refreshable });
});

registry.registerPath({
  method: 'get',
  path: '/auth/me',
  tags: ['Auth'],
  summary: 'Current user',
  security: authed,
  responses: { 200: json(PublicUser), ...errors(401) },
});
authRouter.get('/auth/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: currentUser(req).id } });
  if (!user) throw notFound('User');
  res.json(publicUser(user));
});
