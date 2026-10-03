import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

const Check = z.object({ status: z.enum(['ok', 'error']), error: z.string().optional() });

registry.registerPath({
  method: 'get',
  path: '/health',
  tags: ['System'],
  summary: 'Readiness check (database + ML service)',
  responses: {
    200: {
      description: 'Database reachable',
      content: {
        'application/json': {
          schema: z.object({
            status: z.enum(['ok', 'degraded']),
            service: z.literal('api'),
            version: z.string(),
            uptimeSeconds: z.number(),
            checks: z.object({
              database: Check.extend({
                postgis: z.string().optional(),
                h3: z.string().nullable().optional(),
              }),
              ml: Check,
            }),
          }),
        },
      },
    },
    503: { description: 'Database unreachable' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/health/live',
  tags: ['System'],
  summary: 'Liveness check',
  responses: { 200: { description: 'Process is up' } },
});

export function buildOpenApiDocument() {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'BioMed Zones API',
      version: '2.0.0',
      description:
        'Suitability of French territory (Metropole + DROM) for sustainably cultivating 9 medical species.',
    },
    servers: [{ url: '/api' }],
  });
}
