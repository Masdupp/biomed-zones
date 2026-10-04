"""Training run orchestration and score precomputation.

run(run_id): train every species with enough presences → save artifacts → precompute scores for
all species × cells (resolutions 7 and 6) → write metrics → activate the run. Progress and errors
are written to model_run so POST /train can be polled.
"""

from __future__ import annotations

import logging
import math
import time
from datetime import UTC, datetime

import numpy as np
import pandas as pd

from biomed_pipeline.sdm_data import MIN_PRESENCES, features_for

from . import store
from .models import load_run_models
from .profiles import load_profiles
from .scoring import Driver, score_cell
from .sdm import TrainedSpecies, train_species
from .settings import get_ml_settings

log = logging.getLogger(__name__)
RESOLUTIONS = (7, 6)


def new_run_id() -> str:
    return datetime.now(UTC).strftime("run-%Y%m%d-%H%M%S")


def training_table() -> pd.DataFrame:
    s = get_ml_settings()
    path = s.training_data if s.training_data.exists() else s.snapshot_training_data
    return pd.read_parquet(path)


def metric_row(
    species_id: str, model: TrainedSpecies | None, n_pres: int, n_bg: int, reason: str | None
) -> dict:
    if model is None:
        return dict(
            species_id=species_id,
            trained=False,
            reason=reason,
            n_presences=n_pres,
            n_background=n_bg,
            auc_mean=None,
            auc_std=None,
            tss_mean=None,
            tss_std=None,
            lr_auc_mean=None,
            lr_tss_mean=None,
            threshold=None,
            detail={},
        )
    cv = model.metrics["cv"]
    return dict(
        species_id=species_id,
        trained=True,
        reason=None,
        n_presences=model.metrics["n_presences"],
        n_background=model.metrics["n_background"],
        auc_mean=cv["lightgbm"]["auc_mean"],
        auc_std=cv["lightgbm"]["auc_std"],
        tss_mean=cv["lightgbm"]["tss_mean"],
        tss_std=cv["lightgbm"]["tss_std"],
        lr_auc_mean=cv["logreg"]["auc_mean"],
        lr_tss_mean=cv["logreg"]["tss_mean"],
        threshold=model.threshold,
        detail=model.metrics | {"features": model.features},
    )


def train_all(run_id: str, progress=lambda f, m: None) -> tuple[dict, list[dict]]:
    data = training_table()
    out_dir = get_ml_settings().ml_artifacts_dir / run_id
    profiles = load_profiles()
    models, metrics = {}, []
    for i, sp in enumerate(profiles.values()):
        d = data[data["species_id"] == sp.id]
        n_pres, n_bg = int((d.label == 1).sum()), int((d.label == 0).sum())
        progress(0.6 * i / len(profiles), f"training {sp.id}")
        if n_pres < MIN_PRESENCES:
            reason = (
                f"{n_pres} thinned presences (< {MIN_PRESENCES}): no distribution model; "
                "expert score only"
            )
            metrics.append(metric_row(sp.id, None, n_pres, n_bg, reason))
            log.info("%s: skipped (%s)", sp.id, reason)
            continue
        model = train_species(sp.id, d, features_for(sp.habitat))
        model.save(out_dir / sp.id)
        models[sp.id] = model
        metrics.append(metric_row(sp.id, model, n_pres, n_bg, None))
    return models, metrics


def top_drivers(model: TrainedSpecies, X: pd.DataFrame, n: int = 3) -> list[list[Driver]]:
    contrib = model.shap(X)[:, :-1]
    vals = X[model.features].to_numpy(dtype=float)
    order = np.argsort(-np.abs(contrib), axis=1)[:, :n]
    return [
        [
            Driver(model.features[j], round(float(vals[i, j]), 3), float(contrib[i, j]))
            for j in order[i]
        ]
        for i in range(len(X))
    ]


def score_frame(
    run_id: str, models: dict, cells: pd.DataFrame, resolution: int, weights: tuple[float, float]
) -> pd.DataFrame:
    rows = []
    for sp in load_profiles().values():
        col = "sea_fraction" if sp.habitat == "marine" else "land_fraction"
        sub = cells[cells[col] > 0]
        model = models.get(sp.id)
        probs = [None] * len(sub)
        drivers = [[] for _ in range(len(sub))]
        auc = None
        if model is not None:
            ok = sub[model.features].notna().all(axis=1).to_numpy()
            if ok.any():
                X = sub.loc[ok, model.features]
                p = model.predict(X)
                d = top_drivers(model, X)
                idx = np.flatnonzero(ok)
                for k, i in enumerate(idx):
                    probs[i] = float(p[k])
                    drivers[i] = d[k]
            auc = model.metrics["cv"]["lightgbm"]["auc_mean"]
        records = sub.to_dict("records")
        for h3_id, feats, prob, drv in zip(sub.index, records, probs, drivers, strict=True):
            s = score_cell(sp, feats, feats["territory_code"], prob, auc, drv, weights)
            rows.append(
                {
                    "species_id": sp.id,
                    "h3": h3_id,
                    "resolution": resolution,
                    "run_id": run_id,
                    "score": s.score,
                    "expert_score": s.expert_score,
                    "ml_score": s.ml_score,
                    "confidence": s.confidence,
                    "completeness": s.completeness,
                    "regulatory_mod": s.regulatory_mod,
                    "human_mod": s.human_mod,
                    "data_mod": s.data_mod,
                    "category": s.category,
                    "mode": s.mode,
                    "limiting": [[x["parameter"], x["kind"]] for x in s.limiting],
                    "drivers": [[x.feature, x.value, round(x.shap, 4)] for x in s.drivers],
                }
            )
        log.info("scored %s at res %d: %d cells", sp.id, resolution, len(sub))
    return pd.DataFrame(rows)


def precompute(run_id: str, models: dict | None = None, progress=lambda f, m: None) -> pd.DataFrame:
    s = get_ml_settings()
    models = load_run_models(run_id) if models is None else models
    frames = []
    for k, res in enumerate(RESOLUTIONS):
        progress(0.6 + 0.35 * k / len(RESOLUTIONS), f"scoring resolution {res}")
        cells = store.load_cell_features(res)
        frames.append(score_frame(run_id, models, cells, res, (s.w_expert, s.w_ml)))
    scores = pd.concat(frames, ignore_index=True)
    store.replace_scores(scores)
    return scores


def run(run_id: str, trigger: str = "cli") -> None:
    def progress(frac: float, msg: str) -> None:
        store.update_run(run_id, progress=round(frac, 3), message=msg)

    t0 = time.time()
    store.update_run(run_id, status="running", started_at=store.now())
    try:
        models, metrics = train_all(run_id, progress)
        store.write_metrics(run_id, metrics)
        scores = precompute(run_id, models, progress)
        store.activate_run(run_id)
        msg = (
            f"trained {len(models)}/{len(metrics)} species, {len(scores):,} scores in "
            f"{math.ceil(time.time() - t0)} s"
        )
        store.update_run(
            run_id, status="succeeded", progress=1.0, message=msg, finished_at=store.now()
        )
        log.info("run %s: %s", run_id, msg)
    except Exception as exc:
        log.exception("run %s failed", run_id)
        store.update_run(
            run_id, status="failed", message=f"{type(exc).__name__}: {exc}", finished_at=store.now()
        )
        raise
