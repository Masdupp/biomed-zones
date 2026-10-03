/** Thin fetch wrapper. All API calls go through the same-origin gateway (ADR-0010). */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  });
  const body: unknown = await res.json().catch(() => null);
  if (!res.ok && !(res.status === 503 && body)) {
    throw new ApiError(res.status, `${res.status} ${res.statusText}`);
  }
  return body as T;
}
