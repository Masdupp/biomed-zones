"""Data-level regression tests against the committed snapshot (skipped if absent)."""

import json

import h3
import pandas as pd
import pytest

from biomed_pipeline import snapshot
from biomed_pipeline.features import FEATURES
from biomed_pipeline.settings import get_settings

SNAP = get_settings().snapshot_dir
pytestmark = pytest.mark.skipif(
    not (SNAP / "manifest.json").exists(), reason="no data snapshot committed yet"
)

# Coverage floors (% of applicable resolution-7 cells), from docs/DATA_REPORT.md.
FLOORS = {"marine": 95.0, "terrestrial": 95.0}


@pytest.fixture(scope="module")
def r7():
    return pd.read_parquet(SNAP / "features_r7.parquet")


def test_snapshot_checksums_verify():
    snapshot.verify()


def test_baie_du_mont_saint_michel_is_in_the_grid(r7):
    # Internal waters must be part of the marine zone (ADR-0019).
    cell = h3.latlng_to_cell(48.66, -1.62, 7)
    row = r7.set_index("h3").loc[cell]
    assert row["territory"] == "FXX"
    assert row["sea_fraction"] > 0.5
    assert pd.notna(row["sst_mean"]) and pd.notna(row["depth_mean"])


def test_all_six_territories_present(r7):
    assert set(r7["territory"]) == {"FXX", "GLP", "MTQ", "GUF", "REU", "MYT"}


@pytest.mark.parametrize(
    "feature", [f for f in FEATURES if f.domain in FLOORS], ids=lambda f: f.key
)
def test_feature_coverage_floor(r7, feature):
    col = "sea_fraction" if feature.domain == "marine" else "land_fraction"
    applicable = r7[r7[col] > 0]
    coverage = 100 * applicable[feature.key].notna().mean()
    assert coverage >= FLOORS[feature.domain], f"{feature.key}: {coverage:.1f}%"


def test_every_value_has_known_provenance(r7):
    prov = pd.read_parquet(SNAP / "provenance_r7.parquet").set_index("h3")
    ids = {p["id"] for p in json.loads((SNAP / "provenance.json").read_text())}
    feats = r7.set_index("h3")
    for f in FEATURES:
        has_value = feats[f.key].notna()
        p = prov[f.key].astype(object)
        assert p[has_value].notna().all(), f"{f.key}: value without provenance"
        assert set(p[has_value].unique()) <= ids, f"{f.key}: unknown provenance id"


def test_occurrences_cover_all_species():
    occ = pd.read_parquet(SNAP / "occurrences.parquet")
    assert occ["species_id"].nunique() == 9


def test_copernicus_without_credentials_falls_back_to_snapshot(tmp_path, monkeypatch):
    """No credentials → SourceUnavailableError → snapshot values, provenance flagged."""
    from biomed_pipeline import settings
    from biomed_pipeline.cli import _run_source
    from biomed_pipeline.provenance import load_all
    from biomed_pipeline.sources.base import SourceResult

    real_grid = get_settings().clean_dir / "grid"
    monkeypatch.setenv("CLEAN_DIR", str(tmp_path))
    monkeypatch.setenv("COPERNICUSMARINE_SERVICE_USERNAME", "")
    monkeypatch.setenv("COPERNICUSMARINE_SERVICE_PASSWORD", "")
    settings.get_settings.cache_clear()
    try:
        if not real_grid.exists():
            pytest.skip("grid not built locally")
        (tmp_path / "grid").symlink_to(real_grid)
        _run_source("copernicus_marine")
        res = SourceResult.load("copernicus_marine")
        assert res.features["sst_mean"].notna().sum() > 20_000
        assert all(v.startswith("@_prov_") for v in res.provenance.values())
        modes = {p.id: p.mode for p in load_all(tmp_path / "provenance").values()}
        assert modes == {"cmems-phy": "snapshot-fallback", "cmems-bgc": "snapshot-fallback"}
    finally:
        settings.get_settings.cache_clear()
