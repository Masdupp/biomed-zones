import request from 'supertest';
import { createApp } from '../../src/app';
import { DEMO_ACCOUNTS } from '../../src/seed';

export const app = createApp();

export async function loginAs(kind: keyof typeof DEMO_ACCOUNTS) {
  const agent = request.agent(app);
  const { email, password } = DEMO_ACCOUNTS[kind];
  const res = await agent.post('/auth/login').send({ email, password });
  if (res.status !== 200) throw new Error(`login failed: ${res.status}`);
  return agent;
}

let n = 0;
export async function newContributor() {
  const agent = request.agent(app);
  const email = `user${Date.now()}${n++}@test.local`;
  const res = await agent
    .post('/auth/register')
    .send({ email, password: 'correct horse battery', displayName: 'Test User' });
  if (res.status !== 201)
    throw new Error(`register failed: ${res.status} ${JSON.stringify(res.body)}`);
  return { agent, email, password: 'correct horse battery', id: res.body.id as string };
}

/** Stub global fetch: Crossref answers OK, ML calls fail unless a handler is given. */
export function stubFetch(ml?: (url: string, init?: RequestInit) => unknown) {
  const original = global.fetch;
  global.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.includes('api.crossref.org')) {
      return new Response(
        JSON.stringify({
          message: { title: ['A verified paper'], issued: { 'date-parts': [[2020]] } },
        }),
        { status: 200 },
      );
    }
    if (url.startsWith('http://ml.test.invalid') && ml) {
      return new Response(JSON.stringify(ml(url, init)), { status: 202 });
    }
    throw new TypeError('fetch failed (stubbed network)');
  }) as typeof fetch;
  return () => {
    global.fetch = original;
  };
}
