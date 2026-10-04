-- Note: `prisma migrate diff` proposes "ALTER COLUMN geom DROP DEFAULT" on occurrence because
-- it reads the generated column (0002) as a default. That statement is removed on purpose.
-- DropIndex
DROP INDEX "cell_geom_gist";

-- DropIndex
DROP INDEX "occurrence_geom_gist";

-- DropIndex
DROP INDEX "territory_geom_gist";


-- CreateTable
CREATE TABLE "model_run" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "params" JSONB NOT NULL,
    "data_version" TEXT,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "message" TEXT,

    CONSTRAINT "model_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species_metric" (
    "run_id" TEXT NOT NULL,
    "species_id" TEXT NOT NULL,
    "trained" BOOLEAN NOT NULL,
    "reason" TEXT,
    "n_presences" INTEGER NOT NULL,
    "n_background" INTEGER NOT NULL,
    "auc_mean" DOUBLE PRECISION,
    "auc_std" DOUBLE PRECISION,
    "tss_mean" DOUBLE PRECISION,
    "tss_std" DOUBLE PRECISION,
    "lr_auc_mean" DOUBLE PRECISION,
    "lr_tss_mean" DOUBLE PRECISION,
    "threshold" DOUBLE PRECISION,
    "detail" JSONB NOT NULL,

    CONSTRAINT "species_metric_pkey" PRIMARY KEY ("run_id","species_id")
);

-- CreateTable
CREATE TABLE "score" (
    "species_id" TEXT NOT NULL,
    "h3" TEXT NOT NULL,
    "resolution" SMALLINT NOT NULL,
    "run_id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "expert_score" DOUBLE PRECISION,
    "ml_score" DOUBLE PRECISION,
    "confidence" DOUBLE PRECISION NOT NULL,
    "completeness" DOUBLE PRECISION NOT NULL,
    "regulatory_mod" DOUBLE PRECISION NOT NULL,
    "human_mod" DOUBLE PRECISION NOT NULL,
    "data_mod" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "limiting" JSONB NOT NULL,
    "drivers" JSONB NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("species_id","h3")
);

-- CreateIndex
CREATE INDEX "score_species_id_resolution_score_idx" ON "score"("species_id", "resolution", "score");

-- AddForeignKey
ALTER TABLE "species_metric" ADD CONSTRAINT "species_metric_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "model_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "species_metric" ADD CONSTRAINT "species_metric_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_h3_fkey" FOREIGN KEY ("h3") REFERENCES "cell"("h3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "model_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

