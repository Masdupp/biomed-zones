# syntax=docker/dockerfile:1.7
# Build context: repository root. One-shot job: loads data/snapshot (default) or runs live ingestion.
FROM python:3.11-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:0.11 /uv /usr/local/bin/uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PROJECT_ENVIRONMENT=/opt/venv PATH=/opt/venv/bin:$PATH \
    PYTHONUNBUFFERED=1
WORKDIR /repo

COPY pyproject.toml uv.lock ./
COPY data/pipeline/pyproject.toml data/pipeline/
COPY services/ml/pyproject.toml services/ml/
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-install-workspace --package biomed-pipeline

COPY data/pipeline data/pipeline
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --package biomed-pipeline

# PLAN.md marks the repo root for settings.REPO_ROOT; the snapshot is baked in for offline runs.
COPY PLAN.md ./
COPY data/snapshot data/snapshot

RUN useradd --system --uid 10001 app && mkdir -p data/raw data/clean data/cache && chown -R app data
USER app
ENTRYPOINT ["biomed-pipeline"]
CMD ["load-snapshot"]
