/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  clearMocks: true,
  // Integration tests share one PostGIS test database: run files serially.
  maxWorkers: 1,
  setupFiles: ['<rootDir>/tests/helpers/env.ts'],
  globalSetup: '<rootDir>/tests/helpers/global-setup.ts',
  globalTeardown: '<rootDir>/tests/helpers/global-teardown.ts',
  testTimeout: 30000,
};
