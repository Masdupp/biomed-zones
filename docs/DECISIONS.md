# Architecture Decision Records

Short ADRs. Status is `accepted` unless stated otherwise. New decisions are appended.

---

## ADR-0001 — Monorepo with npm workspaces + uv workspace
**Context.** Two TypeScript apps and two Python packages that share code (`data/pipeline` is imported by `services/ml`).
**Decision.** npm workspaces (`apps/*`) for TypeScript; a uv workspace (root `pyproject.toml`) with members `data/pipeline` (`biomed_pipeline`) and `services/ml` (`biomed_ml`). A root `Makefile` is the single entry point.
**Consequences.** npm ships with Node (no extra tool). uv gives reproducible locks and fast installs in Docker. pnpm was rejected only to avoid an extra global tool.

## ADR-0002 — Compose file lives in `infra/`, root `compose.yaml` includes it
**Context.** The spec requires `infra/docker-compose.yml` and also that `docker compose up` works (from the repo root).
**Decision.** `infra/docker-compose.yml` holds the definition; root `compose.yaml` contains only `include: [infra/docker-compose.yml]` (Compose ≥ 2.20).
**Consequences.** Both `docker compose up` at the root and `docker compose -f infra/docker-compose.yml up` work.

## ADR-0003 — Custom database image instead of `postgis/postgis`
**Context.** The official `postgis/postgis` image has historically lacked arm64 builds; the dev machine is Apple Silicon. h3-pg is also wanted.
**Decision.** `infra/db/Dockerfile`: `FROM postgres:16-bookworm` + PGDG packages `postgresql-16-postgis-3` and `postgresql-16-h3`.
**Consequences.** Multi-arch, one image, both extensions. See ADR-0004 for the H3 fallback.

## ADR-0004 — H3 computed in Python; h3-pg optional
**Context.** h3-pg is convenient for SQL aggregation but must not be a hard dependency.
**Decision.** The pipeline computes H3 indexes, parents and boundaries with the `h3` Python library (v4) and stores `h3` as `TEXT` + a PostGIS `geometry(Polygon,4326)`. If the h3 extension is present, it is enabled and used only for convenience queries (`h3_cell_to_parent`), never required.
**Consequences.** Works on any PostGIS. Polygons are stored once, so the API never recomputes geometry.
**Status note (P1).** h3-pg 4.2.3 installed cleanly with PostGIS 3.6.4 on arm64 and is enabled; `/health` reports both versions.

## ADR-0005 — Prisma owns the whole schema
**Context.** Tables are written by Python (features, scores) and by Node (users, contributions). Two migration systems on one DB would drift.
**Decision.** Prisma migrations are the single source of truth for all tables. PostGIS columns are declared `Unsupported("geometry(...)")` and created in migration SQL. Python uses `psycopg` against that schema. A one-shot `migrate` service runs `prisma migrate deploy` before `pipeline`, `ml` and `api` start.
**Consequences.** One ordered history; spatial queries in the API use `$queryRaw`.

## ADR-0006 — Startup order with one-shot jobs
**Decision.** `db` (healthy) → `migrate` (completed) → `pipeline` (completed: loads snapshot) → `ml`, `api` (healthy) → `web`. One-shot jobs use `service_completed_successfully`.
**Consequences.** `docker compose up` yields a populated, healthy stack with no manual step.

## ADR-0007 — Snapshot-first, live ingestion opt-in
**Context.** The demo must run offline with no credentials; live sources need network and, for Copernicus Marine, credentials.
**Decision.** Default `pipeline` command loads `data/snapshot`. `make ingest` runs live ingestion; each source module falls back to the snapshot slice if its request fails or credentials are missing, and records `mode: live | snapshot-fallback` in provenance.
**Consequences.** Every value on screen can say whether it came from a live pull or from the committed snapshot, and when that snapshot was retrieved.

## ADR-0008 — Tailwind CSS v4 with design tokens as CSS variables
**Decision.** Tokens (colours, spacing on a 4 px grid, radius ≤ 6 px, type scale, motion durations) are CSS custom properties in `apps/web/src/styles/tokens.css`, mapped into Tailwind with `@theme`. Dark mode via `[data-theme="dark"]` + `prefers-color-scheme`.
**Consequences.** One place to change the palette; charts read the same variables.

## ADR-0009 — Self-hosted fonts
**Decision.** Inter and JetBrains Mono come from `@fontsource-variable/*` packages bundled by Vite, not Google Fonts.
**Consequences.** Works offline; no third-party request (GDPR-friendly).

## ADR-0010 — nginx inside the `web` image is the gateway
**Decision.** The `web` image builds the SPA and serves it with nginx (`infra/nginx.conf`), which also reverse-proxies `/api/` → `api:3001` and `/ml/` → `ml:8001`. Single origin → cookies are first-party and CORS stays strict.
**Consequences.** One public port (8080). In local dev, Vite's proxy mirrors the same routes.

## ADR-0011 — Local toolchain installed in user space
**Context.** The dev machine had no Node and only Python 3.9.
**Decision.** Node 20 LTS tarball in `~/.local/node20`; Python 3.11 via `uv python install`. Containers are the reference runtime; local tools only speed up lint/test loops. The Makefile prepends `~/.local/node20/bin` to `PATH` when present.
**Consequences.** No system changes; removable by deleting two directories.
