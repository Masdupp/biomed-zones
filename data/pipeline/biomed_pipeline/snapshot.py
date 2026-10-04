"""Committed data snapshot (data/snapshot) for offline runs (ADR-0007).

Contents
  manifest.json            version, creation date, files with sha256, row counts
  features_r7.parquet      grid + features, resolution 7      (zstd)
  provenance_r7.parquet    provenance id per value, resolution 7 (dictionary-encoded)
  features_r6.parquet / provenance_r6.parquet
  provenance.json          provenance records
  territories.parquet      territory polygons (GeoParquet)
  occurrences.parquet      cleaned GBIF/OBIS presences
  gbif_taxon_keys.json
"""

from __future__ import annotations

import json
import logging
import shutil
from dataclasses import asdict
from datetime import UTC, datetime

import geopandas as gpd
import pandas as pd

from . import build
from .features import FEATURES
from .provenance import Provenance, load_all, sha256_of
from .settings import get_settings
from .sources.base import SourceResult

log = logging.getLogger(__name__)


def snapshot_dir():
    return get_settings().snapshot_dir


def manifest_path():
    return snapshot_dir() / "manifest.json"


def export() -> dict:
    from .load import territory_geometries

    out = snapshot_dir()
    out.mkdir(parents=True, exist_ok=True)
    clean = get_settings().clean_dir
    tables = build.load_tables()
    build.save_tables(tables, out)
    provs = [asdict(p) for p in load_all().values()]
    (out / "provenance.json").write_text(json.dumps(provs, indent=2, ensure_ascii=False) + "\n")
    territory_geometries().to_parquet(out / "territories.parquet", compression="zstd")
    occ = pd.read_parquet(clean / "occurrences" / "occurrences.parquet")
    occ.to_parquet(out / "occurrences.parquet", index=False, compression="zstd")
    shutil.copy(clean / "occurrences" / "gbif_taxon_keys.json", out / "gbif_taxon_keys.json")

    files = sorted(
        p for p in out.iterdir() if p.is_file() and p.name not in ("manifest.json", ".gitkeep")
    )
    manifest = {
        "version": datetime.now(UTC).strftime("%Y.%m.%d"),
        "created_at": datetime.now(UTC).isoformat(timespec="seconds"),
        "rows": {
            "cells_r7": len(tables["features_r7"]),
            "cells_r6": len(tables["features_r6"]),
            "occurrences": len(occ),
            "provenance": len(provs),
        },
        "provenance_modes": {p["id"]: p["mode"] for p in provs},
        "files": {p.name: {"bytes": p.stat().st_size, "sha256": sha256_of([p])} for p in files},
    }
    manifest_path().write_text(json.dumps(manifest, indent=2) + "\n")
    total = sum(f["bytes"] for f in manifest["files"].values())
    log.info("snapshot %s written: %.1f MB", manifest["version"], total / 1e6)
    return manifest


def verify() -> None:
    """Fail if a snapshot file is missing or its checksum differs from the manifest."""
    manifest = json.loads(manifest_path().read_text())
    for name, meta in manifest["files"].items():
        path = snapshot_dir() / name
        if not path.exists():
            raise FileNotFoundError(path)
        if sha256_of([path]) != meta["sha256"]:
            raise ValueError(f"checksum mismatch for {name}")


def load_into_db() -> None:
    from .load import load_into_db as load

    verify()
    d = snapshot_dir()
    manifest = json.loads(manifest_path().read_text())
    load(
        tables=build.load_tables(d),
        provenance=[Provenance(**p) for p in json.loads((d / "provenance.json").read_text())],
        territories=gpd.read_parquet(d / "territories.parquet"),
        occurrences=pd.read_parquet(d / "occurrences.parquet"),
        gbif_keys=json.loads((d / "gbif_taxon_keys.json").read_text()),
        dataset_mode="snapshot",
        snapshot_version=manifest["version"],
    )


def fallback_source(source: str) -> SourceResult:
    """Rebuild one source's cell features from the snapshot (live source unavailable).

    The provenance records involved are re-saved with mode ``snapshot-fallback`` so the UI can
    say that these values come from the committed snapshot and when it was retrieved.
    """
    if not manifest_path().exists():
        raise FileNotFoundError("no snapshot to fall back to")
    d = snapshot_dir()
    feats = pd.read_parquet(d / "features_r7.parquet").set_index("h3")
    prov = pd.read_parquet(d / "provenance_r7.parquet").set_index("h3")
    keys = [f.key for f in FEATURES if f.source == source]
    out = feats[keys].copy()
    mapping: dict[str, str] = {}
    for k in keys:
        out[f"_prov_{k}"] = prov[k].astype(object)
        mapping[k] = f"@_prov_{k}"
    used = set(pd.unique(prov[keys].astype(object).values.ravel())) - {None}
    records = {p["id"]: p for p in json.loads((d / "provenance.json").read_text())}
    for pid in used:
        if isinstance(pid, str) and pid in records:
            rec = Provenance(**records[pid])
            rec.mode = "snapshot-fallback"
            rec.notes = (
                (rec.notes or "") + " Live source unavailable at ingestion time; "
                "values taken from the committed snapshot."
            ).strip()
            rec.save()
    return SourceResult(source, out.dropna(subset=keys, how="all"), mapping)
