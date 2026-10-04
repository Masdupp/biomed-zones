"""Export the active run (artifacts, metrics, scores) into data/snapshot for offline demos."""

from __future__ import annotations

import json
import shutil

import pandas as pd

from biomed_pipeline.db import connect
from biomed_pipeline.settings import get_settings

from . import store
from .models import run_dir


def _jsonable(row: dict) -> dict:
    return {k: (v.isoformat() if hasattr(v, "isoformat") else v) for k, v in row.items()}


def export_active_run() -> str:
    run = store.active_run()
    if run is None:
        raise RuntimeError("no active run to export")
    snap = get_settings().snapshot_dir
    model_root = snap / "model"
    if model_root.exists():
        shutil.rmtree(model_root)
    src = run_dir(run["id"])
    if src is None:
        raise FileNotFoundError(f"artifacts for {run['id']} not found")
    shutil.copytree(src, model_root / run["id"])
    (model_root / "run.json").write_text(
        json.dumps(
            {
                "run": _jsonable(run),
                "species_metric": [_jsonable(m) for m in store.metrics_for(run["id"])],
            },
            indent=1,
            default=str,
        )
        + "\n"
    )
    with connect() as conn:
        cur = conn.execute(f"SELECT {', '.join(store.SCORE_COLS)} FROM score")
        scores = pd.DataFrame(cur.fetchall(), columns=store.SCORE_COLS)
    # Mixed-type JSON arrays are stored as JSON text (Parquet lists must be homogeneous).
    for c in ("limiting", "drivers"):
        scores[c] = scores[c].map(lambda v: json.dumps(v, separators=(",", ":")))
    scores.to_parquet(snap / "scores.parquet", index=False, compression="zstd")
    return run["id"]
