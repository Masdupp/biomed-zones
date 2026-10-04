# syntax=docker/dockerfile:1.7
# Build context: repository root (uv workspace shares one lockfile with data/pipeline).
FROM python:3.11-slim-bookworm
# LightGBM needs the OpenMP runtime; rasterio's wheel needs expat.
RUN apt-get update && apt-get install -y --no-install-recommends libgomp1 libexpat1 \
 && rm -rf /var/lib/apt/lists/*
COPY --from=ghcr.io/astral-sh/uv:0.11 /uv /usr/local/bin/uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PROJECT_ENVIRONMENT=/opt/venv PATH=/opt/venv/bin:$PATH \
    PYTHONUNBUFFERED=1
WORKDIR /repo

COPY pyproject.toml uv.lock ./
COPY data/pipeline/pyproject.toml data/pipeline/
COPY services/ml/pyproject.toml services/ml/
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-install-workspace --package biomed-ml

COPY data/pipeline data/pipeline
COPY services/ml services/ml
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --package biomed-ml

# Species profiles, the active model run and the training table (offline retraining).
COPY data/reference data/reference
COPY data/snapshot/model data/snapshot/model
COPY data/snapshot/training.parquet data/snapshot/training.parquet

RUN useradd --system --uid 10001 app \
 && mkdir -p /repo/services/ml/artifacts/runs && chown -R app /repo/services/ml/artifacts
USER app
EXPOSE 8001
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8001/health/live', timeout=2).status == 200 else 1)"
CMD ["uvicorn", "biomed_ml.main:app", "--host", "0.0.0.0", "--port", "8001", "--proxy-headers"]
