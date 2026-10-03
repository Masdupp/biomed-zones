import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { logger } from './lib/logger';
import { healthRouter } from './routes/health';
import { buildOpenApiDocument } from './openapi';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, cb) => cb(null, !origin || config.CORS_ORIGINS.includes(origin)),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(
    pinoHttp({ logger, autoLogging: { ignore: (req) => req.url?.startsWith('/health') ?? false } }),
  );

  app.use(healthRouter);

  const openapi = buildOpenApiDocument();
  app.get('/openapi.json', (_req, res) => {
    res.json(openapi);
  });
  // Swagger UI ships inline scripts/styles; relax CSP for /docs only.
  app.use(
    '/docs',
    helmet({ contentSecurityPolicy: false }),
    swaggerUi.serve,
    swaggerUi.setup(openapi, { customSiteTitle: 'BioMed Zones API' }),
  );

  app.use((_req, res) => {
    res.status(404).json({ error: 'not_found' });
  });

  const onError: ErrorRequestHandler = (err, req, res, _next) => {
    req.log.error({ err }, 'unhandled error');
    res.status(500).json({ error: 'internal_error' });
  };
  app.use(onError);

  return app;
}
