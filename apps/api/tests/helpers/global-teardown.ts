import { PrismaClient } from '@prisma/client';

const SERVER = process.env.TEST_DATABASE_SERVER ?? 'postgresql://biomed:biomed@localhost:5432';

/** Drop the database created by global-setup for this run (and nothing else). */
export default async function globalTeardown() {
  const name = process.env.BIOMED_TEST_DB;
  if (!name || !/^biomed_test_\d+_\d+$/.test(name)) return;
  const admin = new PrismaClient({ datasourceUrl: `${SERVER}/postgres` });
  await admin.$executeRawUnsafe(`DROP DATABASE IF EXISTS "${name}" WITH (FORCE)`);
  await admin.$disconnect();
}
