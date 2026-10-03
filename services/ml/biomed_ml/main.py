from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel

from biomed_pipeline.db import connect, database_info

from . import __version__

app = FastAPI(
    title="BioMed Zones ML service",
    version=__version__,
    description="Expert + species-distribution suitability model with SHAP explanations.",
)


class Health(BaseModel):
    status: Literal["ok", "degraded"]
    service: Literal["ml"] = "ml"
    version: str
    database: Literal["ok", "error"]
    postgis: str | None = None
    h3: str | None = None


@app.get("/health/live")
def live() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health", response_model=Health)
def health() -> Health:
    try:
        with connect() as conn:
            info = database_info(conn)
        return Health(status="ok", version=__version__, database="ok", **info)
    except Exception:  # noqa: BLE001 — health must report, not raise
        return Health(status="degraded", version=__version__, database="error")
