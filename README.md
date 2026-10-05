# BioMed Zones v2

**Where in France can a medical species be cultivated sustainably, and why?**

BioMed Zones scores every H3 hexagon of Metropolitan France (land and 12 nm territorial sea) and the five overseas regions (Guadeloupe, Martinique, Guyane, Réunion, Mayotte) for 9 medical species. The score combines a transparent expert model with a species distribution model trained on GBIF/OBIS occurrences, and every value can be traced back to a public source.

> Status: **v2.0 — all phases (0–6) complete.** See [PLAN.md](PLAN.md) for the phases,
> [docs/DECISIONS.md](docs/DECISIONS.md) for architecture decisions,
> [docs/TEST_REPORT.md](docs/TEST_REPORT.md) for test results and
> [docs/DEMO.md](docs/DEMO.md) for a 2-minute demo script.

| Suitability map | Cell explanation |
|---|---|
| ![Suitability map of Salix alba over Metropolitan France](docs/screenshots/map.png) | ![Cell panel for Arenicola marina in the Bay of Mont-Saint-Michel](docs/screenshots/cell.png) |
| **Compare cells** | **Model card and metrics** |
| ![Comparison of three cells: radar chart and table](docs/screenshots/compare.png) | ![Model page with spatial cross-validation metrics](docs/screenshots/model.png) |
| **Contribute (5 steps)** | **Admin validation** |
| ![Contribution form, location step](docs/screenshots/contribute.png) | ![Admin review: contribution next to the model prediction](docs/screenshots/admin.png) |

## Quick start

Requirements: Docker with Compose ≥ 2.20.

```bash
cp .env.example .env    # optional: every variable has a demo default
docker compose up       # builds and starts db, migrate, pipeline, ml, api, web
```

Open http://localhost:8080.

| URL | What |
|-----|------|
| http://localhost:8080 | Web app (nginx gateway) |
| http://localhost:8080/api/docs | API reference (Swagger UI) |
| http://localhost:8080/api/health | API readiness (database + ML) |
| http://localhost:8080/ml/docs | ML service OpenAPI |
| http://localhost:8080/ml/health | ML readiness |

### Offline demo

```bash
make images   # once, with internet access (pulls base images, builds)
make demo     # afterwards: no internet, no credentials; loads data/snapshot
```

## Architecture

```
apps/web        React 18 + TypeScript + Vite + Tailwind v4 + Framer Motion
apps/api        Node 20 + Express 5 + TypeScript + Prisma (owns the DB schema)
services/ml     Python 3.11 + FastAPI + scikit-learn / LightGBM + SHAP
data/pipeline   Python ingestion package, shared with services/ml (uv workspace)
data/snapshot   Committed compressed data snapshot for offline runs
infra/          docker-compose.yml, db image (Postgres 16 + PostGIS 3 + h3-pg), nginx.conf
docs/           Decisions, data report, model card, API, test report, demo script
```

Startup order: `db` → `migrate` (Prisma) → `pipeline` (snapshot load) → `ml` + `api` → `web`. The architecture diagram is in [PLAN.md](PLAN.md#1-architecture).

## Data

`docker compose up` loads the committed snapshot (`data/snapshot`, 45 MB): 150,146 H3 cells at
resolution 7 and 22,030 at resolution 6 over Metropolitan France and the five DROM (land, 12 nm
territorial sea and internal waters), 38 environmental features per cell with per-value
provenance, and 278,852 quality-filtered species occurrences. See
[docs/DATA_REPORT.md](docs/DATA_REPORT.md) for coverage and limits.

Refreshing from the live sources (needs the `db` service, network, and the credentials in
`.env`: Copernicus Marine, and optionally a free GBIF account for the download API):

```bash
make ingest      # all sources; raw downloads cached in data/raw
make snapshot    # build features, load PostGIS, refresh data/snapshot and DATA_REPORT.md
```

Occurrence data: GBIF.org (4 October 2026) GBIF Occurrence Download
https://doi.org/10.15468/dl.sfc2ns, and OBIS (https://obis.org). Full source list with licences
in [PLAN.md](PLAN.md#3-data-sources) and the in-app provenance registry.

## Model

Hybrid and decomposable: a rule-based **expert score** (tolerance bands per species, habitat
weights, hard survival constraints) blended 50/50 with a **species distribution model**
(LightGBM per species, logistic-regression baseline, spatial block cross-validation, isotonic
calibration, TreeSHAP explanations), then multiplied by regulatory, human-pressure and
data-confidence modifiers. Honesty rules force *indoor only* where open culture is unrealistic
(freshwater species, non-native marine species, climate outside survival limits). Scores for all
species × cells are precomputed. Details, metrics and limits: [docs/MODEL_CARD.md](docs/MODEL_CARD.md).

| Endpoint (ML service, `/ml/…` via the gateway) | |
|---|---|
| `POST /score` | `{species, h3}` or `{species, profile, territory}` → score, confidence, limiting factors, SHAP drivers, recommendation |
| `GET /explain?species=&h3=` | full decomposition: parameter fits, modifiers, all SHAP values |
| `GET /metrics` | spatial-CV metrics of the active run |
| `POST /train` | async retraining (header `x-admin-token`), poll `GET /train/{run_id}` |

```bash
uv run biomed-pipeline training-data   # presence/background table from occurrences + global layers
uv run biomed-ml train                 # train, precompute 851k scores, activate the run
uv run biomed-ml report                # regenerate MODEL_CARD.md and docs/model/*.png
uv run biomed-ml export-snapshot && uv run biomed-pipeline export-snapshot
```

## Development

```bash
make install     # npm ci + prisma generate + uv sync
make lint        # ESLint + ruff
make typecheck   # strict TypeScript
make test        # Jest, Vitest, pytest
make ci          # all of the above + builds
```

## Testing

| Layer | Tool | Where |
|---|---|---|
| Web components and logic | Vitest + React Testing Library | `apps/web/src/**/*.test.ts(x)` |
| API unit and integration | Jest + Supertest on a throwaway PostGIS database | `apps/api/tests` |
| Pipeline and ML | pytest | `data/pipeline/tests`, `services/ml/tests` |
| End-to-end | Playwright + axe-core | `e2e/` |

The five E2E journeys are: map → cell detail, compare, contribute, admin validation, and PDF export. The E2E suite also checks:

- performance budgets: map interactive < 2 s, cell click → panel < 300 ms;
- WCAG 2.1 AA with axe on every public page;
- that no page requests a third-party host (offline operation).

The worked example *Arenicola marina* × Baie du Mont-Saint-Michel is a regression test in both Python and TypeScript.

```bash
make demo        # the E2E suite and Lighthouse run against the stack on :8080
make e2e         # Playwright (HTML report in playwright-report/)
make lighthouse  # Lighthouse on 8 pages, median of 5 runs (LH_GPU=1 → headed Chrome on the GPU)
make report      # runs every suite and writes docs/TEST_REPORT.md from the JUnit files
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests and builds. It then builds the Compose stack and runs the Playwright suite against it, uploading JUnit and HTML reports as artifacts.

Local dev servers (with the stack's `db` running): `npm run dev -w @biomed/api`, `npm run dev -w @biomed/web` (Vite proxies `/api` and `/ml` like the gateway), `uv run uvicorn biomed_ml.main:app --port 8001`.

## Demo accounts

Seeded automatically by the `migrate` job (local demo only — change or remove them in any shared deployment):

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@biomed-zones.local` | `BioMedAdmin!2026` |
| Contributor | `contributor@biomed-zones.local` | `BioMedContrib!2026` |

The seed also creates 20 example contributions, titled "[Example] …" and flagged `isExample`; they are
never used for model training.

## API

Express 5 + Prisma, documented at **http://localhost:8080/api/docs** (Swagger UI); endpoint list and auth
model in [docs/API.md](docs/API.md), OpenAPI document in [docs/API/openapi.json](docs/API/openapi.json).
Highlights: `/species`, `/cells` (compact H3 rows or GeoJSON, filters, pagination, cache), `/cells/{h3}`
(every value with its provenance), `/compare`, `/contributions` (draft → pending → approved/rejected,
references checked against Crossref), `/admin/validate`, `/admin/retrain`, `/sources`,
`/reports/{h3}/{species}` (PDF), `/me/export` and `DELETE /me` (GDPR). Cookies are httpOnly and
SameSite=Strict; passwords are hashed with Argon2id.

## Licence and data

Code: to be decided by the author. Data sources and their licences are listed in [PLAN.md](PLAN.md#3-data-sources) and, once ingested, in the in-app provenance registry.
