import json

import pytest

from biomed_pipeline import snapshot
from biomed_pipeline.provenance import sha256_of


def test_verify_detects_tampering(tmp_path, monkeypatch):
    monkeypatch.setattr(snapshot, "snapshot_dir", lambda: tmp_path)
    f = tmp_path / "a.parquet"
    f.write_bytes(b"data")
    (tmp_path / "manifest.json").write_text(
        json.dumps({"files": {"a.parquet": {"bytes": 4, "sha256": sha256_of([f])}}})
    )
    snapshot.verify()
    f.write_bytes(b"tampered")
    with pytest.raises(ValueError, match="checksum"):
        snapshot.verify()
