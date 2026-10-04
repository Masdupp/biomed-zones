"""Merge per-source cell features into one wide table per resolution.

Outputs (data/clean/features/):
  features_r7.parquet    grid attributes + one float column per feature
  provenance_r7.parquet  same shape, provenance id of every non-null value
  features_r6.parquet / provenance_r6.parquet   aggregated: mean of the resolution-7 children
                                                 (NaN-skipping), provenance = most frequent
"""

from __future__ import annotations

import logging

import pandas as pd

from . import grid
from .features import FEATURES
from .settings import get_settings
from .sources.base import SourceResult

log = logging.getLogger(__name__)

GRID_COLS = [
    "h3",
    "resolution",
    "parent_h3",
    "territory",
    "lat",
    "lon",
    "area_km2",
    "land_fraction",
    "sea_fraction",
]
TABLES = ("features_r7", "provenance_r7", "features_r6", "provenance_r6")


def features_dir():
    d = get_settings().clean_dir / "features"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _provenance_column(
    res: SourceResult, key: str, idx: pd.Index, territory: pd.Series
) -> pd.Series:
    spec = res.provenance[key]
    if isinstance(spec, str) and spec.startswith("@"):
        return res.features[spec[1:]].reindex(idx)
    if isinstance(spec, dict):
        return territory.reindex(idx).map(spec)
    return pd.Series(spec, index=idx)


def build_fine() -> tuple[pd.DataFrame, pd.DataFrame]:
    cells = grid.load(grid.FINE_RES).set_index("h3")
    feats = pd.DataFrame(index=cells.index)
    prov = pd.DataFrame(index=cells.index)
    by_source: dict[str, list[str]] = {}
    for f in FEATURES:
        by_source.setdefault(f.source, []).append(f.key)
    for source, keys in by_source.items():
        res = SourceResult.load(source)
        for key in keys:
            col = res.features[key].reindex(cells.index).astype("float32")
            feats[key] = col
            p = _provenance_column(res, key, cells.index, cells["territory"])
            prov[key] = p.where(col.notna())
    feats = cells.reset_index()[GRID_COLS].join(feats, on="h3")
    return feats, prov.reset_index()


def build_coarse(fine: pd.DataFrame, fine_prov: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    coarse = grid.load(grid.COARSE_RES)
    keys = [f.key for f in FEATURES]
    means = fine.groupby("parent_h3")[keys].mean()
    p = fine_prov[keys].astype(object).copy()
    p["parent_h3"] = fine["parent_h3"].values
    modes = p.groupby("parent_h3")[keys].agg(lambda s: s.mode().iat[0] if s.notna().any() else None)
    out = coarse[GRID_COLS].join(means.astype("float32"), on="h3")
    prov = coarse[["h3"]].join(modes, on="h3")
    prov[keys] = prov[keys].where(out[keys].notna().values)
    return out, prov


def save_tables(tables: dict[str, pd.DataFrame], directory) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    for name, df in tables.items():
        if name.startswith("provenance"):
            df = df.astype({c: "category" for c in df.columns if c != "h3"})
        df.to_parquet(directory / f"{name}.parquet", index=False, compression="zstd")


def build() -> dict[str, pd.DataFrame]:
    fine, fine_prov = build_fine()
    coarse, coarse_prov = build_coarse(fine, fine_prov)
    tables = dict(zip(TABLES, (fine, fine_prov, coarse, coarse_prov), strict=True))
    save_tables(tables, features_dir())
    log.info("features: r7 %s, r6 %s", fine.shape, coarse.shape)
    return tables


def load_tables(directory=None) -> dict[str, pd.DataFrame]:
    d = directory or features_dir()
    return {n: pd.read_parquet(d / f"{n}.parquet") for n in TABLES}
