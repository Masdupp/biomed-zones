import { execSync } from 'node:child_process';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

/**
 * Each test run creates its own empty database (never resets an existing one), applies the
 * migrations with `prisma migrate deploy`, seeds it and inserts a small fixture grid. The global
 * teardown drops only the database created by this run.
 */
const SERVER = process.env.TEST_DATABASE_SERVER ?? 'postgresql://biomed:biomed@localhost:5432';

export default async function globalSetup() {
  const name = `biomed_test_${Date.now()}_${process.pid}`;
  const url = `${SERVER}/${name}`;
  const admin = new PrismaClient({ datasourceUrl: `${SERVER}/postgres` });
  await admin.$executeRawUnsafe(`CREATE DATABASE "${name}"`);
  await admin.$disconnect();
  process.env.TEST_DATABASE_URL = url; // inherited by the test workers
  process.env.BIOMED_TEST_DB = name;

  const cwd = path.resolve(__dirname, '../..');
  execSync('npx prisma migrate deploy', {
    cwd,
    env: { ...process.env, DATABASE_URL: url },
    stdio: 'pipe',
  });

  process.env.DATABASE_URL = url;
  process.env.LOG_LEVEL = 'silent';
  const { seed } = await import('../../src/seed');
  await seed();
  const { insertFixtures } = await import('./fixtures');
  await insertFixtures();
  const { prisma } = await import('../../src/lib/db');
  await prisma.$disconnect();
}
