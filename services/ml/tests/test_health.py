from contextlib import contextmanager

from fastapi.testclient import TestClient

import biomed_ml.main as main


def test_live():
    assert TestClient(main.app).get("/health/live").json() == {"status": "ok"}


def test_health_ok(monkeypatch):
    @contextmanager
    def fake_connect():
        yield object()

    monkeypatch.setattr(main, "connect", fake_connect)
    monkeypatch.setattr(main, "database_info", lambda _c: {"postgis": "3.6.4", "h3": "4.2.3"})
    body = TestClient(main.app).get("/health").json()
    assert body["status"] == "ok"
    assert body["postgis"] == "3.6.4"


def test_health_degraded_when_db_down(monkeypatch):
    @contextmanager
    def broken_connect():
        raise ConnectionError("db down")
        yield

    monkeypatch.setattr(main, "connect", broken_connect)
    body = TestClient(main.app).get("/health").json()
    assert body == {
        "status": "degraded",
        "service": "ml",
        "version": "2.0.0",
        "database": "error",
        "postgis": None,
        "h3": None,
        "active_run": None,
        "models_loaded": 0,
    }
