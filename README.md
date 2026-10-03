# BioMed Zones v2

**Where in France can a medical species be cultivated sustainably, and why?**

BioMed Zones scores every H3 hexagon of Metropolitan France (land and 12 nm territorial sea) and the five overseas regions (Guadeloupe, Martinique, Guyane, Réunion, Mayotte) for 9 medical species. The score combines a transparent expert model with a species distribution model trained on GBIF/OBIS occurrences, and every value can be traced back to a public source.

> Status: **Phase 1 (skeleton) complete.** See [PLAN.md](PLAN.md) for phases and [docs/DECISIONS.md](docs/DECISIONS.md) for architecture decisions.

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

## Development

```bash
make install     # npm ci + prisma generate + uv sync
make lint        # ESLint + ruff
make typecheck   # strict TypeScript
make test        # Jest, Vitest, pytest
make ci          # all of the above + builds
```

Local dev servers (with the stack's `db` running): `npm run dev -w @biomed/api`, `npm run dev -w @biomed/web` (Vite proxies `/api` and `/ml` like the gateway), `uv run uvicorn biomed_ml.main:app --port 8001`.

## Demo accounts

Created by the seed in Phase 4.

## Licence and data

Code: to be decided by the author. Data sources and their licences are listed in [PLAN.md](PLAN.md#3-data-sources) and, once ingested, in the in-app provenance registry.
