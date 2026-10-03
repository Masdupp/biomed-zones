from biomed_pipeline.settings import REPO_ROOT, Settings


def test_repo_root_points_at_monorepo():
    assert (REPO_ROOT / "PLAN.md").exists()


def test_credentials_flag(monkeypatch):
    monkeypatch.delenv("COPERNICUSMARINE_SERVICE_USERNAME", raising=False)
    monkeypatch.delenv("COPERNICUSMARINE_SERVICE_PASSWORD", raising=False)
    assert not Settings(_env_file=None).has_copernicus_credentials
    s = Settings(
        _env_file=None,
        copernicusmarine_service_username="u",
        copernicusmarine_service_password="p",
    )
    assert s.has_copernicus_credentials
