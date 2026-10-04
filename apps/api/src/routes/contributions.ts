import { Router } from 'express';
import type { Contribution, Prisma, Species, User } from '@prisma/client';
import { z } from 'zod';
import { audit } from '../lib/audit';
import { prisma } from '../lib/db';
import { badRequest, conflict, forbidden, notFound } from '../lib/errors';
import { toCell } from '../lib/h3';
import { checkReference } from '../lib/references';
import { body, params, query } from '../lib/validate';
import { currentUser, requireAuth } from '../middleware/auth';
import { writeLimiter } from '../middleware/security';
import { authed, errors, json, registry } from '../openapi';

export const contributionsRouter = Router();

const OUTCOMES = {
  FIELD_OBSERVATION: ['presence', 'absence'],
  CULTIVATION_TRIAL: ['success', 'partial', 'failure'],
} as const;

const Reference = registry.register(
  'ReferenceInput',
  z
    .object({
      doi: z.string().trim().max(200).optional(),
      url: z.string().trim().url().max(500).optional(),
      citation: z.string().trim().max(500).default(''),
    })
    .refine((r) => r.doi || r.url, 'each reference needs a DOI or a URL'),
);

const ContributionFields = z.object({
  speciesId: z
    .string()
    .regex(/^[a-z-]+$/)
    .max(60),
  type: z.enum(['FIELD_OBSERVATION', 'CULTIVATION_TRIAL']),
  title: z.string().trim().min(5).max(160),
  description: z.string().trim().min(20).max(5000),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  observedAt: z.coerce
    .date()
    .refine(
      (d) => d.getTime() <= Date.now() + 86_400_000,
      'observation date cannot be in the future',
    )
    .refine((d) => d.getFullYear() >= 1970, 'observation date before 1970'),
  outcome: z.string(),
  measurements: z
    .record(z.string().max(60), z.object({ value: z.number(), unit: z.string().max(20) }))
    .refine((m) => Object.keys(m).length <= 20, 'at most 20 measurements')
    .default({}),
  references: z.array(Reference).max(10).default([]),
});

const outcomeOk = (c: { type?: string; outcome?: string }) =>
  !c.type ||
  !c.outcome ||
  (OUTCOMES[c.type as keyof typeof OUTCOMES] as readonly string[]).includes(c.outcome);
const outcomeMsg = {
  message: 'outcome must be presence|absence (observation) or success|partial|failure (trial)',
  path: ['outcome'],
};

const CreateBody = registry.register(
  'ContributionCreate',
  ContributionFields.extend({ submit: z.boolean().default(false) }).refine(outcomeOk, outcomeMsg),
);
const UpdateBody = registry.register(
  'ContributionUpdate',
  ContributionFields.partial().refine(outcomeOk, outcomeMsg),
);
const ContributionOut = registry.register('Contribution', z.object({}).passthrough());

type Full = Contribution & {
  author: Pick<User, 'id' | 'displayName'> | null;
  species: Pick<Species, 'id' | 'scientificName' | 'habitat'>;
};
const include = {
  author: { select: { id: true, displayName: true } },
  species: { select: { id: true, scientificName: true, habitat: true } },
} as const;

export function dto(c: Full, viewerId?: string, isAdmin = false) {
  const own = viewerId && c.authorId === viewerId;
  return {
    id: c.id,
    species: c.species,
    type: c.type,
    status: c.status,
    title: c.title,
    description: c.description,
    lat: c.lat,
    lon: c.lon,
    h3: c.h3,
    observedAt: c.observedAt.toISOString(),
    outcome: c.outcome,
    measurements: c.measurements,
    references: c.references,
    isExample: c.isExample,
    author: c.author ? { displayName: c.author.displayName } : { displayName: 'Deleted user' },
    mine: Boolean(own),
    review:
      c.reviewedAt && (own || isAdmin || c.status === 'APPROVED')
        ? { comment: c.reviewComment, reviewedAt: c.reviewedAt.toISOString() }
        : null,
    submittedAt: c.submittedAt?.toISOString() ?? null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

async function locate(speciesId: string, lat: number, lon: number) {
  const species = await prisma.species.findUnique({ where: { id: speciesId } });
  if (!species) throw badRequest(`Unknown species '${speciesId}'`);
  const h3 = toCell(lat, lon);
  const cell = await prisma.cell.findUnique({
    where: { h3 },
    select: { landFraction: true, seaFraction: true },
  });
  if (!cell)
    throw badRequest(
      'Location is outside the study area (Metropolitan France + DROM, land and 12 nm sea)',
    );
  const needsSea = species.habitat === 'marine';
  if (needsSea ? cell.seaFraction <= 0 : cell.landFraction <= 0) {
    throw badRequest(
      `${species.scientificName} is a ${species.habitat} species but this location has no ${needsSea ? 'sea' : 'land'}`,
    );
  }
  return h3;
}

async function checkedReferences(refs: z.infer<typeof Reference>[]) {
  const checked = await Promise.all(refs.map((r) => checkReference(r)));
  return checked as unknown as Prisma.InputJsonValue;
}

async function loadOwned(id: string, userId: string, isAdmin: boolean) {
  const c = await prisma.contribution.findUnique({ where: { id }, include });
  if (!c) throw notFound('Contribution');
  if (c.authorId !== userId && !isAdmin) throw forbidden('Not your contribution');
  return c;
}

const ListQuery = registry.register(
  'ContributionListQuery',
  z.object({
    status: z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED']).optional(),
    species: z
      .string()
      .regex(/^[a-z-]+$/)
      .max(60)
      .optional(),
    mine: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .default('false'),
    includeExamples: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .default('true'),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(200).default(50),
  }),
);

registry.registerPath({
  method: 'get',
  path: '/contributions',
  tags: ['Contributions'],
  summary: 'List contributions (public: approved only; mine=true: own; admins: any status)',
  request: { query: ListQuery },
  responses: {
    200: json(z.object({ total: z.number(), items: z.array(ContributionOut) })),
    ...errors(400, 401),
  },
});
contributionsRouter.get('/contributions', async (req, res) => {
  const q = query(req, ListQuery);
  const isAdmin = req.user?.role === 'ADMIN';
  const where: Prisma.ContributionWhereInput = {};
  if (q.mine) {
    where.authorId = currentUser(req).id;
    if (q.status) where.status = q.status;
  } else if (isAdmin) {
    if (q.status) where.status = q.status;
  } else {
    where.status = 'APPROVED';
  }
  if (q.species) where.speciesId = q.species;
  if (!q.includeExamples) where.isExample = false;
  const [total, items] = await Promise.all([
    prisma.contribution.count({ where }),
    prisma.contribution.findMany({
      where,
      include,
      orderBy: { createdAt: 'desc' },
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
    }),
  ]);
  res.json({
    total,
    page: q.page,
    pageSize: q.pageSize,
    items: items.map((c) => dto(c, req.user?.id, isAdmin)),
  });
});

const Id = z.object({ id: z.string().min(10).max(40) });
registry.registerPath({
  method: 'get',
  path: '/contributions/{id}',
  tags: ['Contributions'],
  summary: 'One contribution (approved ones are public)',
  request: { params: Id },
  responses: { 200: json(ContributionOut), ...errors(403, 404) },
});
contributionsRouter.get('/contributions/:id', async (req, res) => {
  const { id } = params(req, Id);
  const c = await prisma.contribution.findUnique({ where: { id }, include });
  if (!c) throw notFound('Contribution');
  const isAdmin = req.user?.role === 'ADMIN';
  if (c.status !== 'APPROVED' && c.authorId !== req.user?.id && !isAdmin)
    throw notFound('Contribution');
  res.json(dto(c, req.user?.id, isAdmin));
});

registry.registerPath({
  method: 'post',
  path: '/contributions',
  tags: ['Contributions'],
  summary: 'Create a contribution (draft, or submitted for review with submit=true)',
  description:
    'Submitting requires at least one reference (DOI or URL); references are checked with Crossref / HTTP.',
  security: authed,
  request: { body: { content: { 'application/json': { schema: CreateBody } } } },
  responses: { 201: json(ContributionOut, 'Created'), ...errors(400, 401, 429) },
});
contributionsRouter.post('/contributions', requireAuth, writeLimiter, async (req, res) => {
  const user = currentUser(req);
  const input = body(req, CreateBody);
  if (input.submit && input.references.length === 0)
    throw badRequest('At least one reference is required to submit');
  const h3 = await locate(input.speciesId, input.lat, input.lon);
  const c = await prisma.contribution.create({
    data: {
      authorId: user.id,
      speciesId: input.speciesId,
      type: input.type,
      status: input.submit ? 'PENDING' : 'DRAFT',
      submittedAt: input.submit ? new Date() : null,
      title: input.title,
      description: input.description,
      lat: input.lat,
      lon: input.lon,
      h3,
      observedAt: input.observedAt,
      outcome: input.outcome,
      measurements: input.measurements,
      references: input.submit
        ? await checkedReferences(input.references)
        : (input.references as Prisma.InputJsonValue),
    },
    include,
  });
  res.status(201).json(dto(c, user.id));
});

registry.registerPath({
  method: 'patch',
  path: '/contributions/{id}',
  tags: ['Contributions'],
  summary: 'Edit a draft or a rejected contribution (a rejected one returns to draft)',
  security: authed,
  request: { params: Id, body: { content: { 'application/json': { schema: UpdateBody } } } },
  responses: { 200: json(ContributionOut), ...errors(400, 401, 403, 404, 409) },
});
contributionsRouter.patch('/contributions/:id', requireAuth, writeLimiter, async (req, res) => {
  const user = currentUser(req);
  const { id } = params(req, Id);
  const input = body(req, UpdateBody);
  const c = await loadOwned(id, user.id, false);
  if (c.status !== 'DRAFT' && c.status !== 'REJECTED')
    throw conflict(`A ${c.status.toLowerCase()} contribution cannot be edited`);
  const type = input.type ?? c.type;
  const outcome = input.outcome ?? c.outcome;
  if (!(OUTCOMES[type] as readonly string[]).includes(outcome))
    throw badRequest(outcomeMsg.message);
  const speciesId = input.speciesId ?? c.speciesId;
  const lat = input.lat ?? c.lat;
  const lon = input.lon ?? c.lon;
  const h3 = await locate(speciesId, lat, lon);
  const updated = await prisma.contribution.update({
    where: { id },
    data: {
      ...input,
      references: input.references as Prisma.InputJsonValue | undefined,
      measurements: input.measurements as Prisma.InputJsonValue | undefined,
      h3,
      status: 'DRAFT',
    },
    include,
  });
  res.json(dto(updated, user.id));
});

registry.registerPath({
  method: 'post',
  path: '/contributions/{id}/submit',
  tags: ['Contributions'],
  summary: 'Submit a draft for review (requires ≥ 1 reference)',
  security: authed,
  request: { params: Id },
  responses: { 200: json(ContributionOut), ...errors(400, 401, 403, 404, 409) },
});
contributionsRouter.post(
  '/contributions/:id/submit',
  requireAuth,
  writeLimiter,
  async (req, res) => {
    const user = currentUser(req);
    const { id } = params(req, Id);
    const c = await loadOwned(id, user.id, false);
    if (c.status !== 'DRAFT' && c.status !== 'REJECTED')
      throw conflict(`A ${c.status.toLowerCase()} contribution cannot be submitted`);
    const refs = z.array(Reference).parse(c.references);
    if (refs.length === 0) throw badRequest('At least one reference is required to submit');
    const updated = await prisma.contribution.update({
      where: { id },
      data: {
        status: 'PENDING',
        submittedAt: new Date(),
        references: await checkedReferences(refs),
      },
      include,
    });
    res.json(dto(updated, user.id));
  },
);

registry.registerPath({
  method: 'delete',
  path: '/contributions/{id}',
  tags: ['Contributions'],
  summary: 'Delete a contribution (author: not yet approved; admin: any)',
  security: authed,
  request: { params: Id },
  responses: { 204: { description: 'Deleted' }, ...errors(401, 403, 404, 409) },
});
contributionsRouter.delete('/contributions/:id', requireAuth, async (req, res) => {
  const user = currentUser(req);
  const { id } = params(req, Id);
  const isAdmin = user.role === 'ADMIN';
  const c = await loadOwned(id, user.id, isAdmin);
  if (!isAdmin && c.status === 'APPROVED')
    throw conflict('Approved contributions can only be removed by an administrator');
  await prisma.contribution.delete({ where: { id } });
  if (isAdmin && c.authorId !== user.id)
    await audit(user.id, 'contribution.delete', 'contribution', id, { status: c.status });
  res.status(204).end();
});

const CheckBody = registry.register(
  'ReferenceCheckBody',
  z
    .object({
      doi: z.string().trim().max(200).optional(),
      url: z.string().trim().url().max(500).optional(),
    })
    .refine((r) => r.doi || r.url, 'doi or url required'),
);
registry.registerPath({
  method: 'post',
  path: '/contributions/references/check',
  tags: ['Contributions'],
  summary: 'Check a reference (DOI via Crossref, URL via HTTP) before submitting',
  security: authed,
  request: { body: { content: { 'application/json': { schema: CheckBody } } } },
  responses: { 200: json(z.object({}).passthrough()), ...errors(400, 401, 429) },
});
contributionsRouter.post(
  '/contributions/references/check',
  requireAuth,
  writeLimiter,
  async (req, res) => {
    const input = body(req, CheckBody);
    res.json(await checkReference(input));
  },
);
