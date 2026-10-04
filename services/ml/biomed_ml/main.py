"""BioMed Zones ML service (FastAPI)."""

from __future__ import annotations

import logging
import math
import threading
from contextlib import asynccontextmanager
from typing import Annotated, Literal

import numpy as np
import pandas as pd
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from pydantic import BaseModel, Field, model_validator

from biomed_pipeline.db import connect, database_info

from . import __version__, pipeline, store
from .models import registry
from .profiles import load_profiles
from .scoring import Driver, score_cell
from .settings import get_ml_settings

log = logging.getLogger("biomed_ml")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        registry.refresh()
    except Exception:  # noqa: BLE001 — the service must start even if the DB is empty
        log.warning("could not load active models at startup", exc_info=True)
    yield


app = FastAPI(
    title="BioMed Zones ML service",
    version=__version__,
    description="Hybrid expert + species-distribution suitability model with SHAP explanations.",
    lifespan=lifespan,
)


class Health(BaseModel):
    status: Literal["ok", "degraded"]
    service: Literal["ml"] = "ml"
    version: str
    database: Literal["ok", "error"]
    postgis: str | None = None
    h3: str | None = None
    active_run: str | None = None
    models_loaded: int = 0


@app.get("/health/live")
def live() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health", response_model=Health)
def health() -> Health:
    try:
        with connect() as conn:
            info = database_info(conn)
        return Health(
            status="ok",
            version=__version__,
            database="ok",
            active_run=registry.run_id,
            models_loaded=len(registry.models),
            **info,
        )
    except Exception:  # noqa: BLE001 — health must report, not raise
        return Health(status="degraded", version=__version__, database="error")


# ---------------------------------------------------------------- scoring


class Weights(BaseModel):
    expert: float = Field(0.5, ge=0, le=1)
    ml: float = Field(0.5, ge=0, le=1)


class ScoreRequest(BaseModel):
    species: str
    h3: str | None = None
    profile: dict[str, float] | None = Field(
        None, description="Custom feature values (feature key → value) instead of a cell."
    )
    territory: str | None = Field(None, description="Territory code for a custom profile.")
    weights: Weights = Weights()

    @model_validator(mode="after")
    def one_target(self):
        if (self.h3 is None) == (self.profile is None):
            raise ValueError("provide exactly one of `h3` or `profile`")
        return self


def _species(species_id: str):
    sp = load_profiles().get(species_id)
    if sp is None:
        raise HTTPException(404, f"unknown species '{species_id}'")
    return sp


def _features_for(req_h3: str | None, profile: dict | None, territory: str | None):
    if req_h3 is not None:
        cell = store.load_cell(req_h3)
        if cell is None:
            raise HTTPException(404, f"unknown cell '{req_h3}'")
        return cell, cell.get("territory_code")
    return dict(profile), territory


def _ml(species_id: str, features: dict):
    model = registry.get(species_id)
    if model is None:
        return None, None, None, []
    vals = [features.get(f) for f in model.features]
    if any(v is None or (isinstance(v, float) and math.isnan(v)) for v in vals):
        return model, None, None, []
    X = pd.DataFrame([vals], columns=model.features)
    contrib = model.shap(X)[0]
    raw = float(model.booster.predict(X.to_numpy(dtype=float))[0])
    prob = float(model.calibrator.predict(np.array([raw]))[0])
    shap = [
        {"feature": f, "value": float(v), "shap": float(c)}
        for f, v, c in zip(model.features, vals, contrib[:-1], strict=True)
    ]
    shap.sort(key=lambda d: -abs(d["shap"]))
    explain = {
        "raw_probability": raw,
        "calibrated_probability": prob,
        "expected_value_log_odds": float(contrib[-1]),
        "shap": shap,
        "auc_mean": model.metrics["cv"]["lightgbm"]["auc_mean"],
    }
    drivers = [Driver(d["feature"], round(d["value"], 3), d["shap"]) for d in shap[:3]]
    return model, prob, explain, drivers


def _check_applicable(sp, features: dict) -> None:
    col = "sea_fraction" if sp.habitat == "marine" else "land_fraction"
    if not (features.get(col) or 0) > 0:
        where = "sea" if col == "sea_fraction" else "land"
        raise HTTPException(
            422, f"{sp.scientific_name} is a {sp.habitat} species and this cell contains no {where}"
        )


def _score(species_id, h3_id, profile, territory, weights: Weights):
    sp = _species(species_id)
    features, terr = _features_for(h3_id, profile, territory)
    if h3_id is not None:
        _check_applicable(sp, features)
    model, prob, explain, drivers = _ml(species_id, features)
    auc = model.metrics["cv"]["lightgbm"]["auc_mean"] if model else None
    s = score_cell(sp, features, terr, prob, auc, drivers, (weights.expert, weights.ml))
    return s, explain, features


@app.post("/score", summary="Suitability of a cell (or a custom profile) for a species")
def score(req: ScoreRequest) -> dict:
    s, _, _ = _score(req.species, req.h3, req.profile, req.territory, req.weights)
    return {"species": req.species, "h3": req.h3, "run_id": registry.run_id, **s.to_dict()}


@app.get("/explain", summary="Full decomposition: expert parameters, modifiers and SHAP values")
def explain(
    species: Annotated[str, Query()],
    h3: Annotated[str, Query()],
    w_expert: Annotated[float, Query(ge=0, le=1)] = 0.5,
    w_ml: Annotated[float, Query(ge=0, le=1)] = 0.5,
) -> dict:
    s, ml, features = _score(species, h3, None, None, Weights(expert=w_expert, ml=w_ml))
    return {
        "species": species,
        "h3": h3,
        "run_id": registry.run_id,
        "score": s.to_dict(),
        "ml": ml,
        "formula": "final = blend(expert, ml) × regulatory × human × data; "
        "blend capped when a survival limit fails",
        "features": {
            k: (None if isinstance(v, float) and math.isnan(v) else v)
            for k, v in features.items()
            if k != "h3"
        },
    }


@app.get("/metrics", summary="Spatial-CV metrics of the active run")
def metrics() -> dict:
    run = store.active_run()
    if run is None:
        return {"run": None, "species": []}
    return {
        "run": {
            k: run[k]
            for k in (
                "id",
                "created_at",
                "finished_at",
                "status",
                "trigger",
                "params",
                "data_version",
                "message",
            )
        },
        "species": store.metrics_for(run["id"]),
    }


# ---------------------------------------------------------------- training jobs

_train_lock = threading.Lock()


def require_admin(x_admin_token: Annotated[str | None, Header()] = None) -> None:
    if x_admin_token != get_ml_settings().ml_admin_token:
        raise HTTPException(401, "admin token required")


def _run_job(run_id: str) -> None:
    try:
        pipeline.run(run_id, trigger="admin")
        registry.refresh()
    except Exception:  # noqa: BLE001 — recorded in model_run by pipeline.run
        pass
    finally:
        _train_lock.release()


@app.post(
    "/train",
    status_code=202,
    dependencies=[Depends(require_admin)],
    summary="Start an asynchronous training run (admin)",
)
def train() -> dict:
    if not _train_lock.acquire(blocking=False):
        raise HTTPException(409, "a training run is already in progress")
    run_id = pipeline.new_run_id()
    s = get_ml_settings()
    store.create_run(run_id, "admin", {"w_expert": s.w_expert, "w_ml": s.w_ml}, None)
    threading.Thread(target=_run_job, args=(run_id,), daemon=True).start()
    return {"run_id": run_id, "status": "queued"}


@app.get("/train/{run_id}", summary="Status of a training run")
def train_status(run_id: str) -> dict:
    run = store.get_run(run_id)
    if run is None:
        raise HTTPException(404, "unknown run")
    return {
        k: run[k]
        for k in (
            "id",
            "status",
            "progress",
            "message",
            "created_at",
            "started_at",
            "finished_at",
            "is_active",
        )
    }
