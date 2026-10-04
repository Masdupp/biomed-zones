import request from 'supertest';
import { app, newContributor } from './helpers/agent';

describe('auth', () => {
  it('rejects weak registrations', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'x@test.local', password: 'short', displayName: 'X' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('validation_error');
    expect(res.body.details.map((d: { path: string }) => d.path)).toEqual(
      expect.arrayContaining(['body.password', 'body.displayName']),
    );
  });

  it('registers, sets httpOnly SameSite=Strict cookies and never returns the hash', async () => {
    const email = `cookie${Date.now()}@test.local`;
    const res = await request(app)
      .post('/auth/register')
      .send({ email, password: 'a long enough password', displayName: 'Cookie' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ email, role: 'CONTRIBUTOR' });
    expect(res.body.passwordHash).toBeUndefined();
    const cookies = ([] as string[]).concat(res.headers['set-cookie'] ?? []);
    expect(cookies.find((c) => c.startsWith('bz_access='))).toMatch(/HttpOnly.*SameSite=Strict/);
    expect(cookies.find((c) => c.startsWith('bz_refresh='))).toMatch(/HttpOnly/);
    const dup = await request(app)
      .post('/auth/register')
      .send({ email, password: 'a long enough password', displayName: 'Cookie' });
    expect(dup.status).toBe(409);
  });

  it('logs in and out', async () => {
    const { email, password } = await newContributor();
    const agent = request.agent(app);
    expect(
      (await agent.post('/auth/login').send({ email, password: 'wrong password!!' })).status,
    ).toBe(401);
    expect((await agent.post('/auth/login').send({ email, password })).status).toBe(200);
    expect((await agent.get('/auth/me')).body.email).toBe(email);
    expect((await agent.post('/auth/logout')).status).toBe(204);
    expect((await agent.get('/auth/me')).status).toBe(401);
  });

  it('stores passwords as Argon2id hashes', async () => {
    const { email } = await newContributor();
    const { prisma } = await import('../src/lib/db');
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    expect(user.passwordHash).toMatch(/^\$argon2id\$v=19\$m=19456,t=2,p=1\$/);
  });

  it('rotates refresh tokens and revokes the family on reuse', async () => {
    const { agent } = await newContributor();
    const first = await agent.post('/auth/refresh');
    expect(first.status).toBe(200);
    const stolen =
      ([] as string[])
        .concat(first.headers['set-cookie'] ?? [])
        .find((c) => c.startsWith('bz_refresh=')) ?? '';
    // Legitimate client rotates again; the attacker then replays the previous token.
    expect((await agent.post('/auth/refresh')).status).toBe(200);
    const replay = await request(app)
      .post('/auth/refresh')
      .set('Cookie', stolen.split(';')[0] ?? '');
    expect(replay.status).toBe(401);
    expect(replay.body.message).toMatch(/reuse detected/);
    expect((await agent.post('/auth/refresh')).status).toBe(401); // whole family revoked
  });

  it('accepts Bearer tokens for API clients', async () => {
    const { signAccess } = await import('../src/lib/auth');
    const { prisma } = await import('../src/lib/db');
    const admin = await prisma.user.findUniqueOrThrow({
      where: { email: 'admin@biomed-zones.local' },
    });
    const res = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${signAccess(admin)}`);
    expect(res.body.role).toBe('ADMIN');
  });
});
