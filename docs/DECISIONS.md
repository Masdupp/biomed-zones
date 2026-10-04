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

## ADR-0012 — TerraClimate for gridded terrestrial climate; Open-Meteo for frost days only
**Context.** The spec names Open-Meteo for air temperature, precipitation, humidity and frost days. Open-Meteo counts each two weeks of data per location as one call (free tier: 600/min, 5,000/h, 10,000/day). A 5-year daily climatology costs ~130 calls per point: ~170,000 calls for a 0.25° lattice over France, and far more for the worldwide occurrence points the SDM needs.
**Decision.** Temperature (mean, coldest-month min, warmest-month max), annual precipitation and relative humidity come from TerraClimate 2021–2025 (CC0, 1/24°, THREDDS NCSS), used for both training (global, 0.25°) and prediction (France, 1/24°). Open-Meteo (ERA5-Land) supplies frost days, which need daily data, for one cold season on a 0.5°/0.25°/0.1° lattice (~455 nodes, ~4,900 weighted calls, throttled).
**Consequences.** One consistent climate definition for train and predict. Frost days are a single-season indicator, labelled as such.

## ADR-0013 — Copernicus Marine multi-year reanalyses, 2021–2025, streamed month by month
**Decision.** GLOBAL_MULTIYEAR_PHY_001_030 (1/12°: surface temperature, bottom temperature, surface salinity) and GLOBAL_MULTIYEAR_BGC_001_029 (1/4°: O2, pH, chl-a), monthly, 2021-01 to 2025-12 (the interim extension now covers to 2026). Each global month is loaded via `open_dataset` (ARCO), accumulated into a 12-month climatology and cropped to regional raw subsets. Global climatologies are kept in `data/clean` for SDM training.
**Consequences.** Same product for training and prediction; coastal cells use the nearest valid ocean pixel within 25 km (physics) / 60 km (BGC).

## ADR-0014 — Overseas substitutes where European products stop
**Decision.** Bathymetry: EMODnet in Metropole, GMRT in the DROM. Land cover: CLC 2018 everywhere it exists (Metropole + DOM editions); ESA WorldCover 2021 for Guyane's interior, which the CLC DOM edition does not map. Provenance is recorded per value, so each cell says which product it came from.

## ADR-0015 — Protected areas from the PatriNat layers on the IGN Géoplateforme
**Context.** The INPN WFS (ws.carmencarto.fr) did not answer during development.
**Decision.** Use the same PatriNat datasets republished at data.geopf.fr (Etalab 2.0): Natura 2000 SIC/ZPS, national park cores, integral reserves, national and Corsican nature reserves, biotope orders, marine natural parks. Natura 2000 only exists in Metropole.

## ADR-0016 — Mayotte 12 nm limit derived; ports from the World Port Index
**Decision.** Mayotte is absent from Marine Regions' 12 nm layer (sovereignty disputed with the Comoros); its limit is a 22,224 m coastline buffer, provenance `derived`. Ports come from NGA World Port Index (public domain) because Natural Earth lacks the Réunion and Mayotte ports; towns are Natural Earth places with ≥ 20,000 inhabitants.

## ADR-0017 — Features computed at H3 resolution 7, aggregated to 6
**Decision.** All features are computed once at resolution 7 (~5.2 km²). Raster sources are averaged over pixels whose centre falls in the cell (cell-centroid value if no pixel centre falls inside); coarse grids use the nearest valid node. Resolution 6 values are the NaN-skipping mean of their children; their provenance is the most frequent child provenance.
**Consequences.** One definition across zoom levels; the snapshot stores both resolutions (~150k + 22k rows).

## ADR-0018 — Per-value provenance stored as a parallel table
**Decision.** Alongside each wide feature table, a same-shaped table holds the provenance id of every value (dictionary-encoded in Parquet, so it costs almost nothing). PostGIS stores the long form `cell_feature(h3, feature_key, value, provenance_id)`.

## ADR-0019 — Marine zone = territorial sea ∪ internal waters
**Context.** Marine Regions' 12 nm layer is measured from legal baselines and excludes internal waters (enclosed bays, estuaries, lagoons). A spot check found the Baie du Mont-Saint-Michel — the reference site for the regression test — outside the grid. Internal waters are 16,094 km² in Metropole, 2,792 km² in Guyane, 2,450 km² in Guadeloupe, 412 km² in Martinique.
**Decision.** The marine zone is the union of `eez_12nm` and `eez_internal_waters` (Marine Regions, CC BY 4.0). This added 4,117 resolution-7 cells (+28 % marine cells).
**Consequences.** Bays and lagoons, often the most relevant sites for marine culture, are scored.
**Addendum to ADR-0011 (P3).** LightGBM's macOS wheel needs `libomp`, absent without Homebrew. Locally, scikit-learn's bundled `libomp.dylib` is symlinked into the uv Python's `lib/` (one of LightGBM's rpath search locations). The Linux images install `libgomp1` instead.

## ADR-0020 — SDM predictors from global layers, for training and prediction alike
**Context.** SDMs are trained on worldwide occurrences; the national layers (EMODnet, Copernicus DEM, SoilGrids 500 m, CLC) do not exist globally. Training on coarse global values and predicting on fine national values would feed the model a different distribution than it learned.
**Decision.** Model predictors (`ml_*` features) come from global grids — Copernicus Marine climatologies (1/12°, 1/4°), ETOPO 2022 at 1/12° (depth, elevation), TerraClimate at 0.25°, SoilGrids at 0.1° — and are sampled the same way (nearest valid pixel) at training points and at French cell centres. The expert score keeps using the higher-resolution national features.
**Consequences.** One feature definition per model; coastal gradients are smoothed in the ML part and captured by the expert part. The `ml_*` values are stored with provenance like any other feature.

## ADR-0021 — SHAP via LightGBM's TreeSHAP, no `shap` package
**Decision.** Per-cell explanations use `Booster.predict(pred_contrib=True)`, LightGBM's implementation of exact TreeSHAP (Lundberg et al. 2020), in log-odds space.
**Consequences.** Exact Shapley values without the `shap`/numba dependency (smaller image, faster cold start). Top 3 drivers are stored with every score; `GET /explain` returns all of them.

## ADR-0022 — Honesty rules are part of the score, not of the UI
**Decision.** `score_cell` labels a cell *indoor only* and caps its open-environment score at 30 when the species is freshwater, when a marine species is outside its native territories (introduction risk), or when a temperature survival limit fails. Strict reserves (≥ 50 % of the cell) are excluded. These rules apply even when the ML model predicts high suitability.
**Consequences.** No interface can display a forced high score for *Danio rerio*, *Ambystoma mexicanum*, *Limulus polyphemus* or tropical species in Metropole.

## ADR-0023 — Species profiles are built and verified, not typed
**Decision.** Medical uses, tolerance bands and reference keys are hand-written in `data/reference/species.source.json`; `biomed-pipeline species` adds taxonomy and IUCN status from GBIF (gaps from WoRMS) and resolves every DOI with Crossref and every URL over HTTP. Unresolvable references are marked "to verify". During drafting, 9 of 27 DOIs recalled from memory resolved to unrelated papers and were replaced by Crossref-searched ones.
**Consequences.** All 34 references in `species.json` are verified; tolerance bands remain literature-derived approximations flagged for expert validation.

## ADR-0024 — Session design: short JWT access cookie + rotated opaque refresh cookie
**Decision.** Access: JWT (HS256, 15 min, issuer/audience checked) in an httpOnly `bz_access` cookie, also accepted as a Bearer token for API clients. Refresh: an opaque random value with an HMAC, 7 days, httpOnly `bz_refresh`, stored server-side only as a SHA-256 hash. Every refresh rotates the token; presenting an already-rotated token revokes its whole family (RFC 6819 §5.2.2.3 theft detection). Cookies are SameSite=Strict; state-changing requests carrying a non-whitelisted `Origin` are refused (CSRF defence in depth). `Secure` is configurable (`COOKIE_SECURE`) because the demo runs on http://localhost.
**Consequences.** Stolen access tokens expire quickly; stolen refresh tokens are detected on reuse; logout and account deletion revoke server-side.

## ADR-0025 — Passwords: Argon2id via @node-rs/argon2
**Decision.** Argon2id with OWASP parameters (m = 19 MiB, t = 2, p = 1), 12–128 character passwords without composition rules (NIST SP 800-63B). `@node-rs/argon2` ships prebuilt binaries (no node-gyp in the image). Login takes comparable time whether or not the email exists.

## ADR-0026 — GDPR: minimal data, export, erasure with scientific traceability
**Decision.** Personal data = email, display name, password hash, timestamps. `GET /me/export` returns everything held (user, contributions, sessions, own audit entries) as a JSON attachment. `DELETE /me` (password + "DELETE" confirmation) removes the user, sessions, drafts and pending contributions; reviewed contributions are kept but detached (author → null, displayed as "Deleted user"); audit entries keep the action but lose the actor. Public endpoints never expose emails.
**Consequences.** Erasure is effective for personal data while validated observations stay usable as training data.

## ADR-0027 — Contributions feed training only after validation, never as examples
**Decision.** Approved, non-example contributions are added to the next training run: presence observations and successful/partial trials as presences, absences and failed trials as background, with predictors taken from the containing cell's stored `ml_*` values (works offline). Seeded example contributions (`is_example`) are excluded from training and visibly labelled.

## ADR-0028 — API tests on a throwaway database per run
**Decision.** Jest's global setup creates `biomed_test_<timestamp>_<pid>`, applies migrations with `prisma migrate deploy`, seeds it and inserts a fixture grid; the global teardown drops only that database. Destructive commands such as `prisma migrate reset` are never used (Prisma also refuses them when run by an AI agent without explicit user consent). CI provides a PostGIS service container.
