from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

from biomed_pipeline.settings import REPO_ROOT


class MlSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=REPO_ROOT / ".env", extra="ignore")

    ml_admin_token: str = "dev-ml-admin-token-change-me"
    ml_artifacts_dir: Path = REPO_ROOT / "services" / "ml" / "artifacts" / "runs"
    snapshot_model_dir: Path = REPO_ROOT / "data" / "snapshot" / "model"
    training_data: Path = REPO_ROOT / "data" / "clean" / "ml" / "training.parquet"
    snapshot_training_data: Path = REPO_ROOT / "data" / "snapshot" / "training.parquet"
    w_expert: float = 0.5
    w_ml: float = 0.5


@lru_cache
def get_ml_settings() -> MlSettings:
    return MlSettings()
