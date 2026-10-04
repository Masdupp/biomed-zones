"""Common contract for source modules."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

import pandas as pd

from ..settings import get_settings


class SourceUnavailableError(RuntimeError):
    """Raised when a live source cannot be used (no credentials, service down)."""


@dataclass
class SourceResult:
    """Per-cell features from one source.

    ``features`` is indexed by resolution-7 H3 id. ``provenance`` maps each feature column to:
      * a provenance id (one product everywhere),
      * {territory_code: provenance_id} when territories use different products
        (e.g. EMODnet in Metropole, GMRT overseas), or
      * "@<column>" naming a column of ``features`` that holds a per-cell provenance id
        (e.g. CLC where it exists, WorldCover elsewhere). Such columns start with "_prov".
    """

    source_key: str
    features: pd.DataFrame
    provenance: dict[str, str | dict[str, str]] = field(default_factory=dict)

    def save(self) -> Path:
        out = get_settings().clean_dir / self.source_key
        out.mkdir(parents=True, exist_ok=True)
        self.features.to_parquet(out / "cell_features.parquet")
        (out / "feature_provenance.json").write_text(json.dumps(self.provenance, indent=2) + "\n")
        return out

    @classmethod
    def load(cls, source_key: str) -> SourceResult:
        out = get_settings().clean_dir / source_key
        return cls(
            source_key=source_key,
            features=pd.read_parquet(out / "cell_features.parquet"),
            provenance=json.loads((out / "feature_provenance.json").read_text()),
        )

    @classmethod
    def exists(cls, source_key: str) -> bool:
        return (get_settings().clean_dir / source_key / "cell_features.parquet").exists()
