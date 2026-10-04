import request from 'supertest';
import { app, loginAs, newContributor, stubFetch } from './helpers/agent';

const valid = {
  speciesId: 'arenicola-marina',
  type: 'FIELD_OBSERVATION',
  title: 'Lugworm casts at low tide',
  description: 'Counted casts on three quadrats during a spring low tide.',
  lat: 48.665,
  lon: -1.615,
  observedAt: '2025-05-01',
  outcome: 'presence',
  measurements: { cast_density: { value: 40, unit: 'casts/m²' } },
};

describe('contributions', () => {
  let restore: () => void;
  beforeAll(() => {
    restore = stubFetch();
  });
  afterAll(() => restore());

  it('requires authentication to create', async () => {
    expect((await request(app).post('/contributions').send(valid)).status).toBe(401);
  });

  it('validates location, habitat, outcome and dates', async () => {
    const { agent } = await newContributor();
    const outside = await agent.post('/contributions').send({ ...valid, lat: 0, lon: 0 });
    expect(outside.status).toBe(400);
    expect(outside.body.message).toMatch(/outside the study area/);
    const wrongHabitat = await agent
      .post('/contributions')
      .send({ ...valid, speciesId: 'salix-alba' });
    expect(wrongHabitat.body.message).toMatch(/no land/);
    const badOutcome = await agent.post('/contributions').send({ ...valid, outcome: 'success' });
    expect(badOutcome.status).toBe(400);
    const future = await agent.post('/contributions').send({ ...valid, observedAt: '2099-01-01' });
    expect(future.status).toBe(400);
  });

  it('requires a reference to submit and checks it', async () => {
    const { agent } = await newContributor();
    const noRef = await agent.post('/contributions').send({ ...valid, submit: true });
    expect(noRef.status).toBe(400);
    const created = await agent.post('/contributions').send({
      ...valid,
      submit: true,
      references: [{ doi: 'https://doi.org/10.3354/meps240171' }],
    });
    expect(created.status).toBe(201);
    expect(created.body.status).toBe('PENDING');
    expect(created.body.h3).toMatch(/^87/);
    expect(created.body.references[0]).toMatchObject({
      doi: '10.3354/meps240171',
      status: 'verified',
    });
  });

  it('keeps drafts private and lets the author edit and submit them', async () => {
    const { agent } = await newContributor();
    const draft = (await agent.post('/contributions').send(valid)).body;
    expect(draft.status).toBe('DRAFT');
    expect((await request(app).get(`/contributions/${draft.id}`)).status).toBe(404);
    const other = await newContributor();
    expect(
      (await other.agent.patch(`/contributions/${draft.id}`).send({ title: 'Hijacked title' }))
        .status,
    ).toBe(403);
    const edited = await agent
      .patch(`/contributions/${draft.id}`)
      .send({ references: [{ url: 'https://example.org/report' }] });
    expect(edited.status).toBe(200);
    const submitted = await agent.post(`/contributions/${draft.id}/submit`);
    expect(submitted.body.status).toBe('PENDING');
    expect(
      (await agent.patch(`/contributions/${draft.id}`).send({ title: 'Changed after submit' }))
        .status,
    ).toBe(409);
    const mine = await agent.get('/contributions?mine=true');
    expect(mine.body.items.map((c: { id: string }) => c.id)).toContain(draft.id);
  });

  it('lists only approved contributions publicly', async () => {
    const res = await request(app).get('/contributions?pageSize=200');
    expect(res.body.items.every((c: { status: string }) => c.status === 'APPROVED')).toBe(true);
    expect(res.body.items.some((c: { isExample: boolean }) => c.isExample)).toBe(true);
    const noExamples = await request(app).get('/contributions?includeExamples=false');
    expect(noExamples.body.items.every((c: { isExample: boolean }) => !c.isExample)).toBe(true);
  });

  it('checks references on demand', async () => {
    const { agent } = await newContributor();
    const res = await agent
      .post('/contributions/references/check')
      .send({ doi: '10.1038/nature05883' });
    expect(res.body).toMatchObject({ status: 'verified', title: 'A verified paper' });
  });
});

describe('admin', () => {
  it('is restricted to administrators', async () => {
    const { agent } = await newContributor();
    expect((await agent.get('/admin/queue')).status).toBe(403);
    expect((await request(app).get('/admin/queue')).status).toBe(401);
  });

  it('shows the queue with the model view and validates with an audit trail', async () => {
    const restore = stubFetch();
    const { agent: author } = await newContributor();
    const c = (
      await author
        .post('/contributions')
        .send({ ...valid, submit: true, references: [{ doi: '10.3354/meps240171' }] })
    ).body;
    restore();
    const admin = await loginAs('admin');
    const queue = await admin.get('/admin/queue');
    const item = queue.body.items.find(
      (i: { contribution: { id: string } }) => i.contribution.id === c.id,
    );
    expect(item.model.score).toBe(43.1);
    expect(item.diff).toMatchObject({ contributionSays: 'suitable', agrees: false });

    const noComment = await admin
      .post('/admin/validate')
      .send({ contributionId: c.id, decision: 'reject' });
    expect(noComment.status).toBe(400);
    const ok = await admin
      .post('/admin/validate')
      .send({ contributionId: c.id, decision: 'approve', comment: 'Looks right' });
    expect(ok.body.status).toBe('APPROVED');
    expect(
      (await admin.post('/admin/validate').send({ contributionId: c.id, decision: 'approve' }))
        .status,
    ).toBe(409);
    expect((await request(app).get(`/contributions/${c.id}`)).status).toBe(200); // now public

    const audit = await admin.get('/admin/audit');
    expect(audit.body.items[0]).toMatchObject({ action: 'contribution.approve', targetId: c.id });
  });

  it('proxies retraining to the ML service and audits it', async () => {
    const restore = stubFetch((url) =>
      url.endsWith('/train') ? { run_id: 'run-20260102-030405', status: 'queued' } : {},
    );
    const admin = await loginAs('admin');
    const res = await admin.post('/admin/retrain');
    restore();
    expect(res.status).toBe(202);
    expect(res.body.run_id).toBe('run-20260102-030405');
    const audit = await admin.get('/admin/audit');
    expect(audit.body.items[0].action).toBe('model.retrain');
  });

  it('reports the ML service as unavailable instead of crashing', async () => {
    const admin = await loginAs('admin');
    const res = await admin.post('/admin/retrain');
    expect(res.status).toBe(502);
    expect(res.body.error).toBe('ml_unavailable');
  });
});
