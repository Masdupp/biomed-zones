import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'cookieAuth', {
  type: 'apiKey',
  in: 'cookie',
  name: 'bz_access',
  description: 'httpOnly access-token cookie set by POST /auth/login (15 min).',
});
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

export const ErrorSchema = registry.register(
  'Error',
  z.object({
    error: z.string().openapi({ example: 'validation_error' }),
    message: z.string(),
    details: z.unknown().optional(),
  }),
);

export const errors = (...codes: number[]) =>
  Object.fromEntries(
    codes.map((c) => [
      c,
      {
        description:
          c === 401
            ? 'Not authenticated'
            : c === 403
              ? 'Forbidden'
              : c === 404
                ? 'Not found'
                : c === 429
                  ? 'Rate limited'
                  : 'Error',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    ]),
  );

export const json = (schema: z.ZodTypeAny, description = 'OK') => ({
  description,
  content: { 'application/json': { schema } },
});

export const authed: Record<string, string[]>[] = [{ cookieAuth: [] }, { bearerAuth: [] }];

export function buildOpenApiDocument() {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'BioMed Zones API',
      version: '2.0.0',
      description:
        'Suitability of French territory (Metropole + DROM) for sustainably cultivating 9 medical species. ' +
        'Every value is traceable to a provenance record (`/sources`). Authentication uses httpOnly cookies ' +
        '(SameSite=Strict); state-changing requests from browsers must come from a whitelisted Origin.',
    },
    servers: [
      { url: '/api', description: 'Through the nginx gateway' },
      { url: '/', description: 'Direct' },
    ],
    tags: [
      { name: 'System' },
      { name: 'Auth' },
      { name: 'Species' },
      { name: 'Cells' },
      { name: 'Contributions' },
      { name: 'Admin' },
      { name: 'Sources' },
      { name: 'Reports' },
      { name: 'Account (GDPR)' },
    ],
  });
}
