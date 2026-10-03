from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    """Runtime configuration, read from the environment (and .env at the repo root)."""

    model_config = SettingsConfigDict(env_file=REPO_ROOT / ".env", extra="ignore")

    database_url: str = "postgresql://biomed:biomed@localhost:5432/biomed"
    snapshot_dir: Path = REPO_ROOT / "data" / "snapshot"
    raw_dir: Path = REPO_ROOT / "data" / "raw"
    clean_dir: Path = REPO_ROOT / "data" / "clean"

    copernicusmarine_service_username: str | None = None
    copernicusmarine_service_password: str | None = None

    @property
    def has_copernicus_credentials(self) -> bool:
        return bool(
            self.copernicusmarine_service_username and self.copernicusmarine_service_password
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
