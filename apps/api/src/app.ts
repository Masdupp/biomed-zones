import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { logger } from './lib/logger';
import { authenticate } from './middleware/auth';
import { errorHandler, notFoundHandler } from './middleware/errors';
import { globalLimiter, originCheck } from './middleware/security';
import { buildOpenApiDocument } from './openapi';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { cellsRouter } from './routes/cells';
import { contributionsRouter } from './routes/contributions';
import { healthRouter } from './routes/health';
import { meRouter } from './routes/me';
import { reportsRouter } from './routes/reports';
import { sourcesRouter } from './routes/sources';
import { speciesRouter } from './routes/species';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1); // behind the nginx gateway: client IP for rate limiting

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, cb) => cb(null, !origin || config.CORS_ORIGINS.includes(origin)),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '256kb' }));
  app.use(cookieParser());
  app.use(
    pinoHttp({
      logger,
      autoLogging: { ignore: (req) => req.url?.startsWith('/health') ?? false },
    }),
  );
  app.use(healthRouter);
  app.use(globalLimiter);
  app.use(originCheck);
  app.use(authenticate);

  app.use(authRouter);
  app.use(meRouter);
  app.use(speciesRouter);
  app.use(cellsRouter);
  app.use(contributionsRouter);
  app.use(adminRouter);
  app.use(sourcesRouter);
  app.use(reportsRouter);

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

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
