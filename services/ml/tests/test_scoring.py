import pytest

from biomed_ml.profiles import load_profiles
from biomed_ml.scoring import INDOOR_CAP, human_modifier, regulatory_modifier, score_cell

P = load_profiles()
ARENICOLA = {
    "sst_mean": 13,
    "sst_min": 8,
    "sst_max": 19,
    "sss_mean": 34,
    "sss_min": 33,
    "ph_mean": 8.05,
    "depth_mean": -2,
    "o2_mean": 250,
    "o2_min": 220,
    "dist_port_km": 100,
}


def test_blend_and_modifiers():
    s = score_cell(P["arenicola-marina"], ARENICOLA, "FXX", ml_probability=0.6, model_auc=0.9)
    assert s.expert_score == 100 and s.ml_score == 60
    assert s.score == pytest.approx(80)  # (0.5·100 + 0.5·60) × 1 × 1 × 1
    assert s.mode == "open" and s.category == "high"


def test_expert_only_when_no_model():
    s = score_cell(P["arenicola-marina"], ARENICOLA, "FXX")
    assert s.ml_score is None and s.weights[1] == 0
    assert s.score == pytest.approx(100)
    assert "No distribution model" in s.to_dict()["recommendation"]


def test_strict_reserve_is_excluded():
    s = score_cell(P["arenicola-marina"], ARENICOLA | {"strict_frac": 0.8}, "FXX", 0.9, 0.9)
    assert s.score == 0 and s.category == "excluded"


def test_regulatory_modifier_bounds():
    assert regulatory_modifier({"n2k_frac": 1.0})[0] == pytest.approx(0.7)
    assert regulatory_modifier({"pn_core_frac": 1.0, "n2k_frac": 1.0})[0] == pytest.approx(0.6)
    assert regulatory_modifier({})[0] == 1.0


def test_human_modifier_bounds():
    assert human_modifier(P["salix-alba"], {"artificial_frac": 1.0}) == pytest.approx(0.7)
    assert human_modifier(P["arenicola-marina"], {"dist_port_km": 0}) == pytest.approx(0.7)
    assert human_modifier(P["arenicola-marina"], {"dist_port_km": 80}) == 1.0


def test_freshwater_species_is_indoor_only_and_capped():
    f = {"tair_mean": 27, "tair_min": 22, "tair_max": 32}
    s = score_cell(P["danio-rerio"], f, "GUF", ml_probability=0.95, model_auc=0.9)
    assert s.mode == "indoor_only" and s.score <= INDOOR_CAP
    assert "indoor" in s.to_dict()["recommendation"]


def test_non_native_marine_species_is_indoor_only():
    s = score_cell(P["limulus-polyphemus"], ARENICOLA, "FXX", 0.9, 0.9)
    assert s.mode == "indoor_only" and s.score <= INDOOR_CAP


def test_tropical_species_in_metropole_cannot_score_high():
    cold = {
        "sst_mean": 15,
        "sst_min": 10,
        "sst_max": 21,
        "sss_mean": 35,
        "sss_min": 34,
        "ph_mean": 8.05,
        "depth_mean": 10,
        "o2_mean": 240,
        "o2_min": 220,
    }
    s = score_cell(P["conus-magus"], cold, "REU", ml_probability=0.99, model_auc=0.95)
    assert s.mode == "indoor_only" and s.score <= INDOOR_CAP
    assert any(x["parameter"] == "temperature" for x in s.limiting)
