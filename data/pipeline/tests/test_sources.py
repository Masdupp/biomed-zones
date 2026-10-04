import numpy as np
import pandas as pd
import pytest
from rasterio.io import MemoryFile

from biomed_pipeline.build import _provenance_column
from biomed_pipeline.sources import landcover, openmeteo, terraclimate
from biomed_pipeline.sources.base import SourceResult
from biomed_pipeline.sources.copernicus_dem import tile_name


def test_openmeteo_call_weight_matches_documented_rule():
    # 2 weeks for one location = 1 call; 151 days for 20 locations ≈ 215.7 calls.
    assert openmeteo.call_weight("2024-01-01", "2024-01-14", 1) == 1
    assert openmeteo.call_weight("2024-11-01", "2025-03-31", 20) == pytest.approx(20 * 151 / 14)


def test_openmeteo_season_follows_hemisphere():
    assert openmeteo.season_for(48.0) == openmeteo.NORTH
    assert openmeteo.season_for(-21.0) == openmeteo.SOUTH


def test_tetens_saturation_pressure():
    # Reference: es(20 °C) ≈ 2.338 kPa, es(0 °C) = 0.6108 kPa.
    assert terraclimate.saturation_vapour_pressure_kpa(np.array(0.0)) == pytest.approx(0.6108)
    assert terraclimate.saturation_vapour_pressure_kpa(np.array(20.0)) == pytest.approx(2.338, 1e-3)


def test_copernicus_dem_tile_names():
    assert tile_name(-2, 48) == "Copernicus_DSM_COG_30_N48_00_W002_00_DEM"
    assert tile_name(55, -21) == "Copernicus_DSM_COG_30_S21_00_E055_00_DEM"


def _png(rgba: np.ndarray, path):
    h, w, _ = rgba.shape
    with MemoryFile() as m:
        with m.open(driver="PNG", width=w, height=h, count=4, dtype="uint8") as d:
            d.write(np.moveaxis(rgba, -1, 0))
        path.write_bytes(m.read())


def test_landcover_decode_maps_colours_and_reports_match_rate(tmp_path):
    rgba = np.zeros((2, 2, 4), dtype=np.uint8)
    rgba[0, 0] = (230, 0, 77, 255)  # 111
    rgba[0, 1] = (255, 255, 168, 255)  # 211
    rgba[1, 0] = (1, 2, 3, 255)  # unknown colour
    rgba[1, 1] = (0, 0, 0, 0)  # transparent
    p = tmp_path / "t.png"
    _png(rgba, p)
    codes, matched = landcover.decode(p, {(230, 0, 77): 111, (255, 255, 168): 211})
    assert codes.tolist() == [[111, 211], [0, 0]]
    assert matched == pytest.approx(2 / 3)


def test_provenance_column_forms():
    idx = pd.Index(["a", "b"])
    terr = pd.Series({"a": "FXX", "b": "GLP"})
    feats = pd.DataFrame({"x": [1.0, 2.0], "_prov_x": ["p1", "p2"]}, index=idx)
    r = SourceResult("s", feats, {"x": "@_prov_x"})
    assert _provenance_column(r, "x", idx, terr).tolist() == ["p1", "p2"]
    r.provenance = {"x": {"FXX": "emodnet", "GLP": "gmrt"}}
    assert _provenance_column(r, "x", idx, terr).tolist() == ["emodnet", "gmrt"]
    r.provenance = {"x": "single"}
    assert _provenance_column(r, "x", idx, terr).tolist() == ["single", "single"]


def test_gbif_plan_fetches_small_species_completely():
    from biomed_pipeline.sources.occurrences import GBIF_PAGE, plan_requests

    plan = plan_requests(2626, None)
    assert sum(lim for _, _, lim in plan) == 2626
    assert all(lim <= GBIF_PAGE for _, _, lim in plan)


def test_gbif_plan_samples_large_species_by_country_with_sqrt_weights():
    from biomed_pipeline.sources.occurrences import GBIF_SAMPLE, plan_requests

    counts = {"FR": 90_000, "GB": 36_000, "BE": 17_000, "XX": 40}
    plan = plan_requests(sum(counts.values()), counts)
    per_country = {}
    for c, _, lim in plan:
        per_country[c] = per_country.get(c, 0) + lim
    assert abs(sum(per_country.values()) - GBIF_SAMPLE) < 100
    assert per_country["XX"] == 40  # small countries kept whole
    # sqrt weighting: France gets more than Britain, but far less than its 2.5x raw share.
    assert 1.2 < per_country["FR"] / per_country["GB"] < 1.8
    assert plan == plan_requests(sum(counts.values()), counts)  # seeded, reproducible
