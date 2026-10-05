import { STATIC, staticRequest } from './static';

/** Fetch wrapper for the same-origin gateway (/api, /ml). Refreshes the session once on 401. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: { path: string; message: string }[],
  ) {
    super(message);
  }
}

type Json = Record<string, unknown> | unknown[];

interface Options {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Json;
  signal?: AbortSignal;
  /** Internal: prevents refresh loops. */
  retried?: boolean;
}

let refreshing: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  refreshing ??= fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      setTimeout(() => (refreshing = null), 0);
    });
  return refreshing;
}

export async function request<T>(path: string, opts: Options = {}): Promise<T> {
  if (STATIC) {
    try {
      return (await staticRequest(path, opts.method)) as T;
    } catch (e) {
      const err = e as Error & { status?: number; code?: string };
      throw new ApiError(err.status ?? 503, err.code ?? 'static_demo', err.message);
    }
  }
  const res = await fetch(path, {
    method: opts.method ?? 'GET',
    credentials: 'include',
    signal: opts.signal,
    headers: {
      Accept: 'application/json',
      ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (res.status === 401 && !opts.retried && !path.startsWith('/api/auth/')) {
    if (await refreshSession()) return request<T>(path, { ...opts, retried: true });
  }
  if (res.status === 204) return undefined as T;
  const body = (await res.json().catch(() => null)) as
    | (T & { error?: string; message?: string; details?: ApiError['details']; detail?: unknown })
    | null;
  if (!res.ok) {
    const message =
      body?.message ??
      (typeof body?.detail === 'string' ? body.detail : `${res.status} ${res.statusText}`);
    throw new ApiError(res.status, body?.error ?? 'http_error', message, body?.details);
  }
  return body as T;
}

/** Back-compat helper used by the status bar. Accepts 503 bodies (degraded health). */
export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (STATIC) return (await staticRequest(path)) as T;
  const res = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  });
  const body: unknown = await res.json().catch(() => null);
  if (!res.ok && !(res.status === 503 && body))
    throw new ApiError(res.status, 'http_error', `${res.status} ${res.statusText}`);
  return body as T;
}
