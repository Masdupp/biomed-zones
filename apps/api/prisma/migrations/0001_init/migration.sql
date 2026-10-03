-- Extensions (idempotent; the db image also creates them as superuser).
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "app_meta" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_meta_pkey" PRIMARY KEY ("key")
);
