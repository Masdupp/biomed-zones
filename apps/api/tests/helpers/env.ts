// Loaded before every test file (and before src/config.ts reads the environment).
process.env.NODE_ENV = 'test';
// TEST_DATABASE_URL is set by global-setup (a fresh database per run).
if (!process.env.TEST_DATABASE_URL)
  throw new Error('TEST_DATABASE_URL missing: run tests through jest');
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.RATE_LIMIT_ENABLED = 'false';
process.env.ML_SERVICE_URL = 'http://ml.test.invalid';
process.env.LOG_LEVEL = 'silent';
