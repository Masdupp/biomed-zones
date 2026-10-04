"""Database access for the ML service (schema owned by Prisma, ADR-0005)."""

from __future__ import annotations

import io
import json
from datetime import UTC, datetime

import pandas as pd
from psycopg.types.json import Jsonb

from biomed_pipeline.db import connect

GRID_COLS = ["h3", "resolution", "territory_code", "lat", "lon", "land_fraction", "sea_fraction"]


def load_cell_features(resolution: int, h3_ids: list[str] | None = None) -> pd.DataFrame:
    """Wide frame: grid attributes + one column per feature, indexed by h3."""
    where = "c.resolution = %s"
    params: list = [resolution]
    if h3_ids is not None:
        where += " AND c.h3 = ANY(%s)"
        params.append(h3_ids)
    with connect() as conn:
        cells = pd.DataFrame(
            conn.execute(
                f"SELECT {', '.join('c.' + c for c in GRID_COLS)} FROM cell c WHERE {where}", params
            ).fetchall(),
            columns=GRID_COLS,
        )
        cur = conn.execute(
            f"SELECT cf.h3, cf.feature_key, cf.value FROM cell_feature cf "
            f"JOIN cell c ON c.h3 = cf.h3 WHERE {where}",
            params,
        )
        long = pd.DataFrame(cur.fetchall(), columns=["h3", "feature_key", "value"])
    wide = long.pivot(index="h3", columns="feature_key", values="value")
    return cells.set_index("h3").join(wide)


def load_cell(h3_id: str) -> dict | None:
    for res in (7, 6):
        df = load_cell_features(res, [h3_id])
        if len(df):
            return df.iloc[0].to_dict() | {"h3": h3_id}
    return None


def create_run(run_id: str, trigger: str, params: dict, data_version: str | None) -> None:
    with connect() as conn:
        conn.execute(
            "INSERT INTO model_run (id, status, trigger, params, data_version, progress) "
            "VALUES (%s, 'queued', %s, %s, %s, 0)",
            (run_id, trigger, Jsonb(params), data_version),
        )


def update_run(run_id: str, **fields) -> None:
    allowed = {"status", "progress", "message", "started_at", "finished_at"}
    sets = {k: v for k, v in fields.items() if k in allowed}
    if not sets:
        return
    cols = ", ".join(f"{k} = %s" for k in sets)
    with connect() as conn:
        conn.execute(f"UPDATE model_run SET {cols} WHERE id = %s", (*sets.values(), run_id))


def get_run(run_id: str) -> dict | None:
    with connect() as conn:
        cur = conn.execute("SELECT * FROM model_run WHERE id = %s", (run_id,))
        row = cur.fetchone()
        return dict(zip([d.name for d in cur.description], row, strict=True)) if row else None


def active_run() -> dict | None:
    with connect() as conn:
        cur = conn.execute(
            "SELECT * FROM model_run WHERE is_active ORDER BY created_at DESC LIMIT 1"
        )
        row = cur.fetchone()
        return dict(zip([d.name for d in cur.description], row, strict=True)) if row else None


def activate_run(run_id: str) -> None:
    with connect() as conn:
        conn.execute("UPDATE model_run SET is_active = (id = %s)", (run_id,))


def write_metrics(run_id: str, rows: list[dict]) -> None:
    with connect() as conn:
        conn.execute("DELETE FROM species_metric WHERE run_id = %s", (run_id,))
        for r in rows:
            conn.execute(
                "INSERT INTO species_metric (run_id, species_id, trained, reason, n_presences, "
                "n_background, auc_mean, auc_std, tss_mean, tss_std, lr_auc_mean, lr_tss_mean, "
                "threshold, detail) VALUES (%(run_id)s, %(species_id)s, %(trained)s, %(reason)s, "
                "%(n_presences)s, %(n_background)s, %(auc_mean)s, %(auc_std)s, %(tss_mean)s, "
                "%(tss_std)s, %(lr_auc_mean)s, %(lr_tss_mean)s, %(threshold)s, %(detail)s)",
                r | {"run_id": run_id, "detail": Jsonb(r["detail"])},
            )


def metrics_for(run_id: str) -> list[dict]:
    with connect() as conn:
        cur = conn.execute(
            "SELECT * FROM species_metric WHERE run_id = %s ORDER BY species_id", (run_id,)
        )
        cols = [d.name for d in cur.description]
        return [dict(zip(cols, r, strict=True)) for r in cur.fetchall()]


SCORE_COLS = [
    "species_id",
    "h3",
    "resolution",
    "run_id",
    "score",
    "expert_score",
    "ml_score",
    "confidence",
    "completeness",
    "regulatory_mod",
    "human_mod",
    "data_mod",
    "category",
    "mode",
    "limiting",
    "drivers",
]


def replace_scores(scores: pd.DataFrame) -> None:
    """Swap the score table content in one transaction (readers never see a partial set)."""
    df = scores[SCORE_COLS].copy()
    for c in ("limiting", "drivers"):
        df[c] = df[c].map(lambda v: json.dumps(v, separators=(",", ":")))
    with connect() as conn, conn.cursor() as cur:
        cur.execute("TRUNCATE score")
        cols = ", ".join(SCORE_COLS)
        with cur.copy(f"COPY score ({cols}) FROM STDIN WITH (FORMAT csv, NULL '')") as cp:
            for start in range(0, len(df), 200_000):
                buf = io.StringIO()
                df.iloc[start : start + 200_000].to_csv(buf, header=False, index=False)
                cp.write(buf.getvalue())
        cur.execute("ANALYZE score")


def now() -> datetime:
    return datetime.now(UTC)
