import math

import pytest

from biomed_ml.expert import HARD_CAP, expert_score, trapezoid
from biomed_ml.profiles import Tolerance, load_profiles

T = Tolerance(min=0, opt_min=10, opt_max=20, max=30, lethal=True)


@pytest.mark.parametrize(
    ("value", "expected"),
    [(15, 100), (10, 100), (20, 100), (5, 50), (25, 50), (0, 0), (30, 0), (-5, 0), (40, 0)],
)
def test_trapezoid(value, expected):
    assert trapezoid(value, T) == pytest.approx(expected)


def test_trapezoid_missing_value_is_nan():
    assert math.isnan(trapezoid(float("nan"), T))


def test_profiles_have_all_parameters_and_valid_bands():
    profiles = load_profiles()
    assert len(profiles) == 9
    for sp in profiles.values():
        assert {p.key for p in sp.parameters} == set(sp.tolerances), sp.id
        assert abs(sum(p.weight for p in sp.parameters) - 1) < 1e-9
        for k, t in sp.tolerances.items():
            assert t.min <= t.opt_min <= t.opt_max <= t.max, (sp.id, k)


def _arenicola_optimal():
    return {
        "sst_mean": 13,
        "sst_min": 8,
        "sst_max": 19,
        "sss_mean": 34,
        "sss_min": 33,
        "ph_mean": 8.05,
        "depth_mean": -2,
        "o2_mean": 250,
        "o2_min": 220,
    }


def test_expert_score_is_100_in_optimal_conditions():
    r = expert_score(load_profiles()["arenicola-marina"], _arenicola_optimal())
    assert r.score == pytest.approx(100)
    assert r.completeness == 1
    assert not r.violations


def test_lethal_extreme_caps_the_score():
    f = _arenicola_optimal() | {"sss_min": 8}  # brackish month below the 12 PSU limit
    r = expert_score(load_profiles()["arenicola-marina"], f)
    assert r.uncapped == pytest.approx(100)
    assert r.score == HARD_CAP
    assert r.limiting_factors()[0]["kind"] == "hard_constraint"


def test_missing_parameter_reduces_completeness_not_score():
    f = _arenicola_optimal()
    del f["ph_mean"]
    r = expert_score(load_profiles()["arenicola-marina"], f)
    assert r.score == pytest.approx(100)
    assert r.completeness == pytest.approx(0.8)


def test_frost_sensitive_species_capped_by_frost_days():
    sp = load_profiles()["catharanthus-roseus"]
    f = {
        "tair_mean": 22,
        "tair_min": 12,
        "tair_max": 30,
        "soil_ph": 6,
        "rh_mean": 70,
        "precip_annual": 1500,
        "elev_mean": 100,
        "frost_days": 0,
    }
    assert expert_score(sp, f).score == pytest.approx(100)
    assert expert_score(sp, f | {"frost_days": 20}).score == HARD_CAP


def test_salix_survives_alpine_winters():
    sp = load_profiles()["salix-alba"]
    f = {
        "tair_mean": 8,
        "tair_min": -12,
        "tair_max": 24,
        "soil_ph": 6.5,
        "rh_mean": 75,
        "precip_annual": 900,
        "elev_mean": 600,
    }
    r = expert_score(sp, f)
    assert not r.violations
    assert r.score == pytest.approx(100)
