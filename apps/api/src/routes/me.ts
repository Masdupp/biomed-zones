import { Router } from 'express';
import { z } from 'zod';
import { audit } from '../lib/audit';
import { REFRESH_COOKIE, endSession, verifyPassword } from '../lib/auth';
import { prisma } from '../lib/db';
import { notFound, unauthorized } from '../lib/errors';
import { body } from '../lib/validate';
import { currentUser, requireAuth } from '../middleware/auth';
import { authed, errors, registry } from '../openapi';

export const meRouter = Router();

registry.registerPath({
  method: 'get',
  path: '/me/export',
  tags: ['Account (GDPR)'],
  summary: 'Download all personal data held about the current user (GDPR art. 15 and 20)',
  security: authed,
  responses: {
    200: {
      description: 'JSON file (attachment)',
      content: { 'application/json': { schema: z.object({}).passthrough() } },
    },
    ...errors(401),
  },
});
meRouter.get('/me/export', requireAuth, async (req, res) => {
  const id = currentUser(req).id;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      displayName: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });
  if (!user) throw notFound('User');
  const [contributions, sessions, auditEntries] = await Promise.all([
    prisma.contribution.findMany({ where: { authorId: id }, orderBy: { createdAt: 'asc' } }),
    prisma.refreshToken.findMany({
      where: { userId: id },
      select: { createdAt: true, expiresAt: true, revokedAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.auditLog.findMany({ where: { actorId: id }, orderBy: { createdAt: 'asc' } }),
  ]);
  const payload = {
    exportedAt: new Date().toISOString(),
    controller: 'BioMed Zones (demo deployment)',
    note: 'Passwords are stored only as Argon2id hashes and are not included.',
    user,
    contributions,
    sessions,
    auditLog: auditEntries.map((a) => ({ ...a, id: a.id.toString() })),
  };
  await audit(id, 'account.export', 'user', id);
  res.setHeader('Content-Disposition', `attachment; filename="biomed-zones-data-${id}.json"`);
  res.json(payload);
});

const DeleteBody = registry.register(
  'DeleteAccountBody',
  z.object({ password: z.string().min(1).max(128), confirm: z.literal('DELETE') }),
);

registry.registerPath({
  method: 'delete',
  path: '/me',
  tags: ['Account (GDPR)'],
  summary: 'Delete the current account (GDPR art. 17)',
  description:
    'Deletes the user, their sessions and their unreviewed contributions (drafts, pending). Reviewed ' +
    'contributions (approved / rejected) are kept for scientific traceability but detached from the person ' +
    '(author set to null). Audit entries keep the action but lose the actor link.',
  security: authed,
  request: { body: { content: { 'application/json': { schema: DeleteBody } } } },
  responses: { 204: { description: 'Deleted' }, ...errors(400, 401) },
});
meRouter.delete('/me', requireAuth, async (req, res) => {
  const id = currentUser(req).id;
  const input = body(req, DeleteBody);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw notFound('User');
  if (!(await verifyPassword(user.passwordHash, input.password)))
    throw unauthorized('Wrong password');
  const removed = await prisma.$transaction(async (tx) => {
    const del = await tx.contribution.deleteMany({
      where: { authorId: id, status: { in: ['DRAFT', 'PENDING'] } },
    });
    await tx.auditLog.create({
      data: {
        actorId: null,
        action: 'account.delete',
        targetType: 'user',
        targetId: null,
        detail: { removedContributions: del.count },
      },
    });
    await tx.user.delete({ where: { id } }); // cascades sessions; SetNull on reviewed contributions
    return del.count;
  });
  await endSession(res, (req.cookies as Record<string, string>)[REFRESH_COOKIE]);
  req.log.info({ removed }, 'account deleted');
  res.status(204).end();
});
