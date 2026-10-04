"""Loading trained models of the active run (artifacts dir first, then the snapshot)."""

from __future__ import annotations

import logging
import time
from pathlib import Path

from . import store
from .sdm import TrainedSpecies
from .settings import get_ml_settings

log = logging.getLogger(__name__)


def run_dir(run_id: str) -> Path | None:
    s = get_ml_settings()
    for base in (s.ml_artifacts_dir, s.snapshot_model_dir):
        d = base / run_id
        if d.exists():
            return d
    return None


def load_run_models(run_id: str) -> dict[str, TrainedSpecies]:
    d = run_dir(run_id)
    if d is None:
        log.warning("artifacts for run %s not found", run_id)
        return {}
    return {
        p.name: TrainedSpecies.load(p)
        for p in sorted(d.iterdir())
        if p.is_dir() and (p / "model.txt").exists()
    }


class ModelRegistry:
    """In-process cache of the active run's models, re-checked at most every TTL seconds."""

    TTL = 30.0

    def __init__(self) -> None:
        self.run_id: str | None = None
        self.models: dict[str, TrainedSpecies] = {}
        self._checked = 0.0

    def maybe_refresh(self) -> None:
        if time.monotonic() - self._checked > self.TTL:
            try:
                self.refresh()
            except Exception:  # noqa: BLE001 — keep serving the cached models
                log.warning("active run check failed", exc_info=True)

    def refresh(self) -> None:
        self._checked = time.monotonic()
        run = store.active_run()
        if run is None:
            self.run_id, self.models = None, {}
            return
        if run["id"] != self.run_id:
            self.models = load_run_models(run["id"])
            self.run_id = run["id"]
            log.info("loaded %d models from run %s", len(self.models), self.run_id)

    def get(self, species_id: str) -> TrainedSpecies | None:
        self.maybe_refresh()
        return self.models.get(species_id)


registry = ModelRegistry()
