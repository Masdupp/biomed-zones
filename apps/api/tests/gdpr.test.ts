import request from 'supertest';
import { app, loginAs, newContributor, stubFetch } from './helpers/agent';
import { prisma } from '../src/lib/db';

const contribution = {
  speciesId: 'arenicola-marina',
  type: 'FIELD_OBSERVATION',
  title: 'Observation to be kept',
  description: 'Field observation used to test account deletion.',
  lat: 48.665,
  lon: -1.615,
  observedAt: '2025-05-01',
  outcome: 'presence',
  references: [{ doi: '10.3354/meps240171' }],
};

describe('GDPR', () => {
  it('exports personal data as a JSON attachment without the password hash', async () => {
    const { agent, email } = await newContributor();
    await agent.post('/contributions').send(contribution);
    const res = await agent.get('/me/export');
    expect(res.status).toBe(200);
    expect(res.headers['content-disposition']).toMatch(/attachment/);
    expect(res.body.user.email).toBe(email);
    expect(res.body.contributions).toHaveLength(1);
    expect(JSON.stringify(res.body)).not.toMatch(/argon2/);
  });

  it('deletes the account: unreviewed work removed, reviewed work anonymised', async () => {
    const restore = stubFetch();
    const { agent, email, password, id } = await newContributor();
    const kept = (await agent.post('/contributions').send({ ...contribution, submit: true })).body;
    const dropped = (
      await agent.post('/contributions').send({ ...contribution, title: 'Draft to be removed' })
    ).body;
    restore();
    const admin = await loginAs('admin');
    await admin.post('/admin/validate').send({ contributionId: kept.id, decision: 'approve' });

    expect(
      (await agent.delete('/me').send({ password: 'wrong password', confirm: 'DELETE' })).status,
    ).toBe(401);
    expect((await agent.delete('/me').send({ password })).status).toBe(400); // missing confirm
    expect((await agent.delete('/me').send({ password, confirm: 'DELETE' })).status).toBe(204);

    expect(await prisma.user.findUnique({ where: { id } })).toBeNull();
    expect(await prisma.contribution.findUnique({ where: { id: dropped.id } })).toBeNull();
    const anon = await prisma.contribution.findUniqueOrThrow({ where: { id: kept.id } });
    expect(anon.authorId).toBeNull();
    expect((await request(app).get(`/contributions/${kept.id}`)).body.author.displayName).toBe(
      'Deleted user',
    );
    expect(await prisma.refreshToken.count({ where: { userId: id } })).toBe(0);
    expect((await request(app).post('/auth/login').send({ email, password })).status).toBe(401);
    const log = await prisma.auditLog.findFirst({
      where: { action: 'account.delete' },
      orderBy: { createdAt: 'desc' },
    });
    expect(log?.actorId).toBeNull();
  });
});
