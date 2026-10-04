"""GBIF asynchronous download API (optional; needs a free GBIF account).

The search API is throttled for bulk paging; the download API returns every matching record
in one zipped SIMPLE_CSV and assigns a DOI that must be cited. Used by `occurrences` when
GBIF_USERNAME / GBIF_PASSWORD / GBIF_EMAIL are set; otherwise the search API path is used.
"""

from __future__ import annotations

import csv
import gzip
import io
import json
import logging
import time
import zipfile
from contextlib import ExitStack

from ..http import download, get_json, get_session
from ..settings import get_settings

log = logging.getLogger(__name__)

API = "https://api.gbif.org/v1/occurrence/download"
COLUMNS = {
    "gbifID": "key",
    "decimalLatitude": "decimalLatitude",
    "decimalLongitude": "decimalLongitude",
    "year": "year",
    "basisOfRecord": "basisOfRecord",
    "coordinateUncertaintyInMeters": "coordinateUncertaintyInMeters",
    "countryCode": "countryCode",
    "datasetKey": "datasetKey",
    "license": "license",
    "speciesKey": "taxonKey",
}


def predicate(taxon_keys: list[int], basis: list[str], min_year: int, max_unc: int) -> dict:
    return {
        "type": "and",
        "predicates": [
            {"type": "in", "key": "TAXON_KEY", "values": [str(k) for k in taxon_keys]},
            {"type": "equals", "key": "HAS_COORDINATE", "value": "true"},
            {"type": "equals", "key": "HAS_GEOSPATIAL_ISSUE", "value": "false"},
            {"type": "equals", "key": "OCCURRENCE_STATUS", "value": "PRESENT"},
            {"type": "in", "key": "BASIS_OF_RECORD", "values": basis},
            {"type": "greaterThanOrEquals", "key": "YEAR", "value": str(min_year)},
            {
                "type": "or",
                "predicates": [
                    {
                        "type": "lessThanOrEquals",
                        "key": "COORDINATE_UNCERTAINTY_IN_METERS",
                        "value": str(max_unc),
                    },
                    {"type": "isNull", "parameter": "COORDINATE_UNCERTAINTY_IN_METERS"},
                ],
            },
        ],
    }


def request_and_fetch(pred: dict, poll_s: int = 30, max_wait_s: int = 3 * 3600) -> tuple:
    """Submit, wait, download. Returns (zip path, download metadata incl. DOI)."""
    s = get_settings()
    body = {
        "creator": s.gbif_username,
        "notificationAddress": [s.gbif_email],
        "sendNotification": False,
        "format": "SIMPLE_CSV",
        "predicate": pred,
    }
    r = get_session().post(
        f"{API}/request", json=body, auth=(s.gbif_username, s.gbif_password), timeout=60
    )
    r.raise_for_status()
    key = r.text.strip()
    log.info("GBIF download %s requested", key)
    waited = 0
    while waited < max_wait_s:
        meta = get_json(f"{API}/{key}")
        if meta["status"] == "SUCCEEDED":
            dest = download(
                meta["downloadLink"], s.raw_dir / "occurrences" / f"gbif_{key}.zip", timeout=3600
            )
            return dest, meta
        if meta["status"] in ("FAILED", "KILLED", "CANCELLED"):
            raise RuntimeError(f"GBIF download {key} {meta['status']}")
        time.sleep(poll_s)
        waited += poll_s
    raise TimeoutError(f"GBIF download {key} not ready after {max_wait_s}s")


def split_by_species(zip_path, keys_by_species: dict[str, int]) -> dict[str, object]:
    """Write one gbif_<species>.jsonl.gz per species, same layout as the search path."""
    raw = get_settings().raw_dir / "occurrences"
    species_by_key = {v: k for k, v in keys_by_species.items()}
    counts = dict.fromkeys(keys_by_species, 0)
    with ExitStack() as stack:
        handles = {
            sid: stack.enter_context(gzip.open(raw / f"gbif_{sid}.jsonl.gz", "wt"))
            for sid in keys_by_species
        }
        with zipfile.ZipFile(zip_path) as z:
            name = next(n for n in z.namelist() if n.endswith(".csv"))
            with z.open(name) as f:
                reader = csv.DictReader(
                    io.TextIOWrapper(f, "utf-8"), delimiter="\t", quoting=csv.QUOTE_NONE
                )
                for row in reader:
                    sid = species_by_key.get(int(row["speciesKey"] or 0))
                    if sid is None:
                        continue
                    rec = {dst: (row.get(src) or None) for src, dst in COLUMNS.items()}
                    for k in (
                        "decimalLatitude",
                        "decimalLongitude",
                        "coordinateUncertaintyInMeters",
                    ):
                        rec[k] = float(rec[k]) if rec[k] else None
                    rec["year"] = int(rec["year"]) if rec["year"] else None
                    handles[sid].write(json.dumps(rec) + "\n")
                    counts[sid] += 1
    for sid, n in counts.items():
        (raw / f"gbif_{sid}.meta.json").write_text(
            json.dumps({"available": n, "fetched": n, "sampled": False}) + "\n"
        )
    return {sid: raw / f"gbif_{sid}.jsonl.gz" for sid in keys_by_species}
