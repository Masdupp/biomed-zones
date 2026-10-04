"""Regression test: Arenicola marina × Baie du Mont-Saint-Michel (the documented worked example).

Runs offline on the committed snapshot. Locks the inputs (to catch data drift), every
parameter fit, the modifiers and the expert-only final score. See docs/MODEL_CARD.md §2.
"""

import h3
import pandas as pd
import pytest

from biomed_ml.expert import expert_score
from biomed_ml.profiles import load_profiles
from biomed_ml.scoring import score_cell
from biomed_pipeline.settings import get_settings

SNAP = get_settings().snapshot_dir / "features_r7.parquet"
CELL = h3.latlng_to_cell(48.66, -1.62, 7)  # 87186068affffff, intertidal flats of the bay

pytestmark = pytest.mark.skipif(not SNAP.exists(), reason="snapshot not available")

EXPECTED_INPUTS = {  # value, absolute tolerance
    "sst_mean": (14.19, 0.05),
    "sss_mean": (33.85, 0.05),
    "ph_mean": (8.007, 0.005),
    "depth_mean": (-4.43, 0.05),
    "o2_mean": (267.2, 0.5),
    "sst_min": (8.10, 0.05),  # coldest month, checked against the 0 °C survival limit
    "sss_min": (33.51, 0.05),  # lowest-salinity month, checked against 12 PSU
}


@pytest.fixture(scope="module")
def features():
    row = pd.read_parquet(SNAP).set_index("h3").loc[CELL]
    return row.to_dict()


def test_inputs_have_not_drifted(features):
    assert features["territory"] == "FXX"
    for key, (value, tol) in EXPECTED_INPUTS.items():
        assert features[key] == pytest.approx(value, abs=tol), key


def test_expert_score_worked_example(features):
    r = expert_score(load_profiles()["arenicola-marina"], features)
    fits = {p.key: p.fit for p in r.parameters}
    assert fits == {
        "temperature": 100.0,
        "salinity": 100.0,
        "ph": 100.0,
        "depth": 100.0,
        "oxygen": 100.0,
    }
    assert r.violations == []
    assert r.completeness == 1.0
    assert r.score == pytest.approx(100.0, abs=0.5)


def test_final_score_expert_only(features):
    s = score_cell(load_profiles()["arenicola-marina"], features, "FXX")
    assert s.regulatory_mod == pytest.approx(0.70, abs=0.005)  # fully inside Natura 2000
    assert s.human_mod == pytest.approx(0.81, abs=0.01)  # nearest port 18.3 km
    assert s.data_mod == 1.0
    assert s.score == pytest.approx(56.7, abs=1.0)
    assert s.mode == "open"
