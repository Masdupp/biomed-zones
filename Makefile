# BioMed Zones v2 — single entry point. Run `make help`.
# User-space Node 20 (ADR-0011) if present. Passing PATH through SHELL makes GNU make 3.81
# use it even for commands it executes without a shell.
export PATH := $(HOME)/.local/node20/bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash

COMPOSE := docker compose
WEB_URL := http://localhost:8080

.DEFAULT_GOAL := help
.PHONY: help install images up demo down reset logs ps health lint typecheck test build ci ingest data snapshot load-snapshot

help: ## List targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install Node and Python dependencies locally
	npm ci
	cd apps/api && npx prisma generate
	uv sync

images: ## Build all images (needs internet once; afterwards `make demo` runs offline)
	$(COMPOSE) build

up: ## Start the full stack (builds if needed)
	$(COMPOSE) up -d --build

demo: ## Offline demo: start from already-built images and the committed data/snapshot
	@if ! docker image inspect biomed-zones/web:dev >/dev/null 2>&1; then \
	  echo "Images not built yet. Run 'make images' once with internet access."; exit 1; fi
	$(COMPOSE) up -d --no-build --pull never
	@$(MAKE) --no-print-directory health
	@echo "BioMed Zones is running at $(WEB_URL)"

down: ## Stop the stack (keeps the database volume)
	$(COMPOSE) down

reset: ## Stop the stack and delete the database volume
	$(COMPOSE) down -v

logs: ## Follow logs
	$(COMPOSE) logs -f --tail=100

ps: ## Service status
	$(COMPOSE) ps -a

health: ## Wait until the gateway, API and ML service report healthy
	@for i in $$(seq 1 60); do \
	  if curl -fsS $(WEB_URL)/api/health >/dev/null 2>&1 && curl -fsS $(WEB_URL)/ml/health >/dev/null 2>&1; then \
	    echo "api:  $$(curl -fsS $(WEB_URL)/api/health)"; echo "ml:   $$(curl -fsS $(WEB_URL)/ml/health)"; exit 0; fi; \
	  sleep 2; done; echo "services did not become healthy"; $(COMPOSE) ps -a; exit 1

lint: ## ESLint + ruff
	npm run lint
	npm run format:check
	uv run ruff check .
	uv run ruff format --check .

typecheck: ## TypeScript strict checks
	npm run typecheck

test: ## Unit tests (Jest, Vitest, pytest)
	npm test
	uv run pytest -q

build: ## Production builds of the TypeScript apps
	npm run build

ci: lint typecheck test build ## Everything CI runs

# Live data pipeline. Runs on the host (uv) so raw/ and clean/ persist; needs the `db` service.
# Raw downloads are cached, so re-runs only fetch what is missing. caffeinate keeps macOS awake.
PIPELINE := $(shell command -v caffeinate >/dev/null && echo "caffeinate -dims") uv run biomed-pipeline
LOCAL_DB := DATABASE_URL=postgresql://biomed:biomed@localhost:$${DB_PORT:-5432}/biomed

ingest: ## Live ingestion of every public source (network; Copernicus credentials in .env)
	$(LOCAL_DB) $(PIPELINE) ingest

data: ## ingest → build → load → export-snapshot → report
	$(LOCAL_DB) $(PIPELINE) all

snapshot: ## Rebuild features from data/clean, load them, refresh data/snapshot and DATA_REPORT
	$(LOCAL_DB) $(PIPELINE) build
	$(LOCAL_DB) $(PIPELINE) load
	$(LOCAL_DB) $(PIPELINE) export-snapshot
	$(LOCAL_DB) $(PIPELINE) report

load-snapshot: ## Load data/snapshot into the running database (offline)
	$(COMPOSE) run --rm pipeline load-snapshot
