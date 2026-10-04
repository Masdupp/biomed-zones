-- Generated with prisma migrate diff; the spurious "occurrence.geom DROP DEFAULT" (generated
-- column, see 0003) is removed.
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CONTRIBUTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "ContributionType" AS ENUM ('FIELD_OBSERVATION', 'CULTIVATION_TRIAL');

-- CreateEnum
CREATE TYPE "ContributionStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');


-- AlterTable
ALTER TABLE "species" ADD COLUMN     "authorship" TEXT,
ADD COLUMN     "common_name_en" TEXT,
ADD COLUMN     "common_name_fr" TEXT,
ADD COLUMN     "cultivation_difficulty" TEXT,
ADD COLUMN     "cultivation_note" TEXT,
ADD COLUMN     "frost_sensitive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "iucn" JSONB,
ADD COLUMN     "medical_applications" JSONB,
ADD COLUMN     "native_note" TEXT,
ADD COLUMN     "native_territories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "photo" JSONB,
ADD COLUMN     "profile_updated_at" TIMESTAMP(3),
ADD COLUMN     "references" JSONB,
ADD COLUMN     "taxonomy" JSONB,
ADD COLUMN     "tolerance_note" TEXT,
ADD COLUMN     "tolerance_references" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tolerances" JSONB;

-- CreateTable
CREATE TABLE "app_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CONTRIBUTOR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "app_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contribution" (
    "id" TEXT NOT NULL,
    "author_id" TEXT,
    "species_id" TEXT NOT NULL,
    "type" "ContributionType" NOT NULL,
    "status" "ContributionStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "h3" TEXT NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL,
    "outcome" TEXT NOT NULL,
    "measurements" JSONB NOT NULL DEFAULT '{}',
    "references" JSONB NOT NULL DEFAULT '[]',
    "is_example" BOOLEAN NOT NULL DEFAULT false,
    "reviewer_id" TEXT,
    "review_comment" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" BIGSERIAL NOT NULL,
    "actor_id" TEXT,
    "action" TEXT NOT NULL,
    "target_type" TEXT NOT NULL,
    "target_id" TEXT,
    "detail" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_user_email_key" ON "app_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_token_hash_key" ON "refresh_token"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_token_user_id_idx" ON "refresh_token"("user_id");

-- CreateIndex
CREATE INDEX "refresh_token_family_idx" ON "refresh_token"("family");

-- CreateIndex
CREATE INDEX "contribution_status_idx" ON "contribution"("status");

-- CreateIndex
CREATE INDEX "contribution_species_id_status_idx" ON "contribution"("species_id", "status");

-- CreateIndex
CREATE INDEX "contribution_author_id_idx" ON "contribution"("author_id");

-- CreateIndex
CREATE INDEX "audit_log_actor_id_idx" ON "audit_log"("actor_id");

-- CreateIndex
CREATE INDEX "audit_log_created_at_idx" ON "audit_log"("created_at");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

