"""API contract tests without a database (store and registry are stubbed)."""

import pytest
from fastapi.testclient import TestClient

import biomed_ml.main as main
from biomed_ml.models import ModelRegistry

CELL = {
    "h3": "87186068affffff",
    "territory_code": "FXX",
    "land_fraction": 0.0,
    "sea_fraction": 1.0,
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


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setattr(main, "registry", ModelRegistry())
    monkeypatch.setattr(main.store, "load_cell", lambda h: CELL if h == CELL["h3"] else None)
    return TestClient(main.app)


def test_score_cell_expert_only(client):
    r = client.post("/score", json={"species": "arenicola-marina", "h3": CELL["h3"]})
    assert r.status_code == 200
    body = r.json()
    assert body["expert_score"] == 100 and body["ml_score"] is None
    assert body["mode"] == "open"
    assert {p["key"] for p in body["parameters"]} == {
        "temperature",
        "salinity",
        "ph",
        "depth",
        "oxygen",
    }
    assert "recommendation" in body


def test_score_profile(client):
    profile = {
        "tair_mean": 24,
        "tair_min": 16,
        "tair_max": 31,
        "soil_ph": 6,
        "rh_mean": 75,
        "precip_annual": 1600,
        "elev_mean": 120,
        "frost_days": 0,
    }
    r = client.post(
        "/score", json={"species": "catharanthus-roseus", "profile": profile, "territory": "REU"}
    )
    assert r.status_code == 200 and r.json()["category"] == "high"


def test_score_requires_exactly_one_target(client):
    assert client.post("/score", json={"species": "salix-alba"}).status_code == 422
    both = {"species": "salix-alba", "h3": CELL["h3"], "profile": {"tair_mean": 10}}
    assert client.post("/score", json=both).status_code == 422


def test_unknown_species_and_cell(client):
    assert client.post("/score", json={"species": "nope", "h3": CELL["h3"]}).status_code == 404
    r = client.post("/score", json={"species": "salix-alba", "h3": "870000000ffffff"})
    assert r.status_code == 404


def test_habitat_not_in_cell(client):
    r = client.post("/score", json={"species": "salix-alba", "h3": CELL["h3"]})
    assert r.status_code == 422
    assert "no land" in r.json()["detail"]


def test_train_requires_admin_token(client):
    assert client.post("/train").status_code == 401
    assert client.post("/train", headers={"x-admin-token": "wrong"}).status_code == 401
