-- Extensions are also (re)declared in the first Prisma migration; creating them here
-- lets the superuser install them before the app role runs migrations.
CREATE EXTENSION IF NOT EXISTS postgis;
-- h3 is optional (ADR-0004): do not fail init if it is unavailable.
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS h3;
  CREATE EXTENSION IF NOT EXISTS h3_postgis CASCADE;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'h3 extension unavailable, H3 will be computed in Python: %', SQLERRM;
END $$;
