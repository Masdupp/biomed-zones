import { Router } from 'express';
import { z } from 'zod';
import { audit } from '../lib/audit';
import { invalidateRunCache } from '../lib/cache';
import { prisma } from '../lib/db';
import { badRequest, conflict, notFound } from '../lib/errors';
import { ml } from '../lib/ml';
import { body, params, query } from '../lib/validate';
import { currentUser, requireRole } from '../middleware/auth';
import { authed, errors, json, registry } from '../openapi';
import { dto } from './contributions';

export const adminRouter = Router();
adminRouter.use('/admin', requireRole('ADMIN'));

const include = {
  author: { select: { id: true, displayName: true } },
  species: { select: { id: true, scientificName: true, habitat: true } },
} as const;

registry.registerPath({
  method: 'get',
  path: '/admin/queue',
  tags: ['Admin'],
  summary: 'Pending contributions with the model’s current view of the same cell (diff view)',
  security: authed,
  responses: { 200: json(z.object({}).passthrough()), ...errors(401, 403) },
});
adminRouter.get('/admin/queue', async (req, res) => {
  const pending = await prisma.contribution.findMany({
    where: { status: 'PENDING' },
    include,
    orderBy: { submittedAt: 'asc' },
  });
  const scores = await prisma.score.findMany({
    where: { OR: pending.map((c) => ({ speciesId: c.speciesId, h3: c.h3 })) },
  });
  const byKey = new Map(scores.map((s) => [`${s.speciesId}:${s.h3}`, s]));
  res.json({
    total: pending.length,
    items: pending.map((c) => {
      const s = byKey.get(`${c.speciesId}:${c.h3}`);
      const claimsSuitable = ['presence', 'success'].includes(c.outcome);
      const modelSuitable = s ? s.score >= 50 : null;
      return {
        contribution: dto(c, req.user?.id, true),
        model: s
          ? {
              score: s.score,
              category: s.category,
              mode: s.mode,
              expertScore: s.expertScore,
              mlScore: s.mlScore,
              confidence: s.confidence,
              limiting: s.limiting,
            }
          : null,
        diff: {
          contributionSays: claimsSuitable
            ? 'suitable'
            : c.outcome === 'partial'
              ? 'partly suitable'
              : 'unsuitable',
          modelSays:
            modelSuitable === null
              ? 'no score'
              : modelSuitable
                ? 'suitable (score ≥ 50)'
                : 'not suitable (score < 50)',
          agrees: modelSuitable === null ? null : modelSuitable === claimsSuitable,
        },
      };
    }),
  });
});

const ValidateBody = registry.register(
  'ValidateBody',
  z
    .object({
      contributionId: z.string().min(10).max(40),
      decision: z.enum(['approve', 'reject']),
      comment: z.string().trim().max(2000).optional(),
    })
    .refine((b) => b.decision === 'approve' || (b.comment && b.comment.length >= 5), {
      message: 'a comment (≥ 5 characters) is required to reject',
      path: ['comment'],
    }),
);

registry.registerPath({
  method: 'post',
  path: '/admin/validate',
  tags: ['Admin'],
  summary: 'Approve or reject a pending contribution (audited)',
  description:
    'Approved field observations of presence and successful / partial trials become training presences in the next model run.',
  security: authed,
  request: { body: { content: { 'application/json': { schema: ValidateBody } } } },
  responses: { 200: json(z.object({}).passthrough()), ...errors(400, 401, 403, 404, 409) },
});
adminRouter.post('/admin/validate', async (req, res) => {
  const admin = currentUser(req);
  const input = body(req, ValidateBody);
  const c = await prisma.contribution.findUnique({ where: { id: input.contributionId } });
  if (!c) throw notFound('Contribution');
  if (c.status !== 'PENDING')
    throw conflict(`Only pending contributions can be reviewed (status: ${c.status})`);
  const updated = await prisma.contribution.update({
    where: { id: c.id },
    data: {
      status: input.decision === 'approve' ? 'APPROVED' : 'REJECTED',
      reviewerId: admin.id,
      reviewComment: input.comment ?? null,
      reviewedAt: new Date(),
    },
    include,
  });
  await audit(admin.id, `contribution.${input.decision}`, 'contribution', c.id, {
    species: c.speciesId,
    comment: input.comment ?? null,
  });
  res.json(dto(updated, admin.id, true));
});

registry.registerPath({
  method: 'post',
  path: '/admin/retrain',
  tags: ['Admin'],
  summary: 'Start an asynchronous model retraining (proxied to the ML service, audited)',
  security: authed,
  responses: {
    202: json(z.object({ run_id: z.string(), status: z.string() })),
    ...errors(401, 403, 409, 502),
  },
});
adminRouter.post('/admin/retrain', async (req, res) => {
  const admin = currentUser(req);
  const approved = await prisma.contribution.count({ where: { status: 'APPROVED' } });
  const job = await ml.train();
  await audit(admin.id, 'model.retrain', 'model_run', job.run_id, {
    approvedContributions: approved,
  });
  res.status(202).json({ ...job, approvedContributions: approved });
});

const RunId = z.object({ runId: z.string().regex(/^run-\d{8}-\d{6}$/) });
registry.registerPath({
  method: 'get',
  path: '/admin/retrain/{runId}',
  tags: ['Admin'],
  summary: 'Status of a retraining job',
  security: authed,
  request: { params: RunId },
  responses: { 200: json(z.object({}).passthrough()), ...errors(401, 403, 404, 502) },
});
adminRouter.get('/admin/retrain/:runId', async (req, res) => {
  const { runId } = params(req, RunId);
  const status = await ml.trainStatus(runId);
  if (status.status === 'succeeded') invalidateRunCache();
  res.json(status);
});

const AuditQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});
registry.registerPath({
  method: 'get',
  path: '/admin/audit',
  tags: ['Admin'],
  summary: 'Audit log of administrative and account actions',
  security: authed,
  request: { query: AuditQuery },
  responses: { 200: json(z.object({}).passthrough()), ...errors(401, 403) },
});
adminRouter.get('/admin/audit', async (req, res) => {
  const q = query(req, AuditQuery);
  const [total, rows] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
      include: { actor: { select: { displayName: true, email: true } } },
    }),
  ]);
  res.json({
    total,
    items: rows.map((r) => ({ ...r, id: r.id.toString(), createdAt: r.createdAt.toISOString() })),
  });
});

registry.registerPath({
  method: 'get',
  path: '/admin/stats',
  tags: ['Admin'],
  summary: 'Contribution counts by status and the active model run',
  security: authed,
  responses: { 200: json(z.object({}).passthrough()), ...errors(401, 403) },
});
adminRouter.get('/admin/stats', async (_req, res) => {
  const [byStatus, runs] = await Promise.all([
    prisma.contribution.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.modelRun.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ]);
  if (!runs) throw badRequest('no runs');
  res.json({
    contributions: Object.fromEntries(byStatus.map((b) => [b.status, b._count._all])),
    runs: runs.map((r) => ({
      id: r.id,
      status: r.status,
      trigger: r.trigger,
      isActive: r.isActive,
      progress: r.progress,
      message: r.message,
      createdAt: r.createdAt,
      finishedAt: r.finishedAt,
    })),
  });
});
