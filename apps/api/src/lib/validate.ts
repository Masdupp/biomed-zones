import type { Request } from 'express';
import type { z, ZodTypeAny } from 'zod';
import { fromZod } from './errors';

/** Parse and validate one part of a request; throws a 400 with zod issues on failure. */
export function parse<S extends ZodTypeAny>(
  schema: S,
  data: unknown,
  where: 'body' | 'query' | 'params',
): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) throw fromZod(result.error, where);
  return result.data;
}

export const body = <S extends ZodTypeAny>(req: Request, s: S) => parse(s, req.body, 'body');
export const query = <S extends ZodTypeAny>(req: Request, s: S) => parse(s, req.query, 'query');
export const params = <S extends ZodTypeAny>(req: Request, s: S) => parse(s, req.params, 'params');
