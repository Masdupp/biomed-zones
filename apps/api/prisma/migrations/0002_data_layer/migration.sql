-- CreateTable
CREATE TABLE "provenance" (
    "id" TEXT NOT NULL,
    "source_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "license_url" TEXT,
    "citation" TEXT,
    "spatial_resolution" TEXT NOT NULL,
    "temporal_coverage" TEXT,
    "temporal_resolution" TEXT,
    "variables" TEXT[],
    "access_method" TEXT,
    "mode" TEXT NOT NULL,
    "retrieved_at" TIMESTAMP(3) NOT NULL,
    "raw_path" TEXT,
    "checksum" TEXT,
    "record_count" INTEGER,
    "notes" TEXT,

    CONSTRAINT "provenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "territory" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326),

    CONSTRAINT "territory_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "cell" (
    "h3" TEXT NOT NULL,
    "resolution" SMALLINT NOT NULL,
    "parent_h3" TEXT,
    "territory_code" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "area_km2" DOUBLE PRECISION NOT NULL,
    "land_fraction" DOUBLE PRECISION NOT NULL,
    "sea_fraction" DOUBLE PRECISION NOT NULL,
    "geom" geometry(Polygon, 4326),

    CONSTRAINT "cell_pkey" PRIMARY KEY ("h3")
);

-- CreateTable
CREATE TABLE "feature_def" (
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "feature_def_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "cell_feature" (
    "h3" TEXT NOT NULL,
    "feature_key" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "provenance_id" TEXT NOT NULL,

    CONSTRAINT "cell_feature_pkey" PRIMARY KEY ("h3","feature_key")
);

-- CreateTable
CREATE TABLE "species" (
    "id" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "gbif_taxon_key" INTEGER,
    "aphia_id" INTEGER,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occurrence" (
    "id" BIGSERIAL NOT NULL,
    "species_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "source_record_id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "year" SMALLINT,
    "basis_of_record" TEXT,
    "coordinate_uncertainty_m" DOUBLE PRECISION,
    "country_code" TEXT,
    "dataset_key" TEXT,
    "license" TEXT,
    "provenance_id" TEXT NOT NULL,
    "geom" geometry(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint("lon", "lat"), 4326)) STORED,

    CONSTRAINT "occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cell_resolution_territory_code_idx" ON "cell"("resolution", "territory_code");

-- CreateIndex
CREATE INDEX "cell_parent_h3_idx" ON "cell"("parent_h3");

-- CreateIndex
CREATE INDEX "cell_feature_feature_key_idx" ON "cell_feature"("feature_key");

-- CreateIndex
CREATE UNIQUE INDEX "species_scientific_name_key" ON "species"("scientific_name");

-- CreateIndex
CREATE INDEX "occurrence_species_id_idx" ON "occurrence"("species_id");

-- CreateIndex
CREATE UNIQUE INDEX "occurrence_source_source_record_id_key" ON "occurrence"("source", "source_record_id");

-- AddForeignKey
ALTER TABLE "cell" ADD CONSTRAINT "cell_territory_code_fkey" FOREIGN KEY ("territory_code") REFERENCES "territory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cell_feature" ADD CONSTRAINT "cell_feature_h3_fkey" FOREIGN KEY ("h3") REFERENCES "cell"("h3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cell_feature" ADD CONSTRAINT "cell_feature_feature_key_fkey" FOREIGN KEY ("feature_key") REFERENCES "feature_def"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cell_feature" ADD CONSTRAINT "cell_feature_provenance_id_fkey" FOREIGN KEY ("provenance_id") REFERENCES "provenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_provenance_id_fkey" FOREIGN KEY ("provenance_id") REFERENCES "provenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Spatial indexes (not expressible in the Prisma schema).
CREATE INDEX "cell_geom_gist" ON "cell" USING GIST ("geom");
CREATE INDEX "territory_geom_gist" ON "territory" USING GIST ("geom");
CREATE INDEX "occurrence_geom_gist" ON "occurrence" USING GIST ("geom");
