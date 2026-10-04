"""Provenance records: one per ingested source (or source variant).

Every feature value stored in PostGIS references a provenance id, so any number on screen
can be traced to its source, licence, retrieval date and resolution.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

from .settings import REPO_ROOT, get_settings

Mode = Literal["live", "snapshot-fallback", "derived"]


@dataclass
class Provenance:
    id: str
    source_key: str
    name: str
    url: str
    license: str
    spatial_resolution: str
    license_url: str | None = None
    citation: str | None = None
    temporal_coverage: str | None = None
    temporal_resolution: str | None = None
    variables: list[str] = field(default_factory=list)
    access_method: str | None = None
    mode: Mode = "live"
    retrieved_at: str = field(
        default_factory=lambda: datetime.now(UTC).isoformat(timespec="seconds")
    )
    raw_path: str | None = None
    checksum: str | None = None
    record_count: int | None = None
    notes: str | None = None

    def __post_init__(self) -> None:
        # Store paths relative to the repository so records are portable (and committed
        # snapshots do not embed a local home directory).
        if self.raw_path:
            p = Path(self.raw_path)
            if p.is_absolute() and p.is_relative_to(REPO_ROOT):
                self.raw_path = str(p.relative_to(REPO_ROOT))

    def save(self, directory: Path | None = None) -> Path:
        directory = directory or provenance_dir()
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / f"{self.id}.json"
        path.write_text(json.dumps(asdict(self), indent=2, ensure_ascii=False) + "\n")
        return path


def provenance_dir() -> Path:
    return get_settings().clean_dir / "provenance"


def load_all(directory: Path | None = None) -> dict[str, Provenance]:
    directory = directory or provenance_dir()
    out: dict[str, Provenance] = {}
    for p in sorted(directory.glob("*.json")):
        rec = Provenance(**json.loads(p.read_text()))
        out[rec.id] = rec
    return out


def sha256_of(paths: list[Path]) -> str:
    """Checksum over one or more raw files (sorted by name) for reproducibility checks."""
    h = hashlib.sha256()
    for p in sorted(paths):
        with p.open("rb") as f:
            for chunk in iter(lambda: f.read(1 << 20), b""):
                h.update(chunk)
    return h.hexdigest()
