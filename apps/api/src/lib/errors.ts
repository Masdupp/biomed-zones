import type { ZodError } from 'zod';

/** Error with an HTTP status and a stable machine-readable code. */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message?: string,
    public readonly details?: unknown,
  ) {
    super(message ?? code);
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new HttpError(400, 'bad_request', message, details);
export const unauthorized = (message = 'Authentication required') =>
  new HttpError(401, 'unauthorized', message);
export const forbidden = (message = 'Forbidden') => new HttpError(403, 'forbidden', message);
export const notFound = (what: string) => new HttpError(404, 'not_found', `${what} not found`);
export const conflict = (message: string) => new HttpError(409, 'conflict', message);

export function fromZod(error: ZodError, where: string): HttpError {
  return new HttpError(
    400,
    'validation_error',
    `Invalid ${where}`,
    error.issues.map((i) => ({ path: [where, ...i.path].join('.'), message: i.message })),
  );
}
