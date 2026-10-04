"""Species occurrences (SDM training labels) from GBIF and OBIS, worldwide.

Quality filters
  GBIF: hasCoordinate, no geospatial issue, occurrenceStatus PRESENT, coordinate uncertainty
        <= 10 km (or unknown), year >= 1970, basis of record excludes LIVING_SPECIMEN
        (zoo / botanical garden / aquarium) and FOSSIL_SPECIMEN.
  OBIS: records that pass OBIS QC (dropped records excluded by default), presences only,
        year >= 1970, coordinate uncertainty <= 10 km when given.
  Both: coordinates in range and not (0, 0); exact duplicates (species, lat/lon to 4 decimals,
        year) removed across sources, GBIF record kept first.

GBIF access: the search API throttles bulk paging (bursts of ~40 pages of 300 records, then
responses delayed by minutes). Without a GBIF account, each species is fetched completely when
it has at most 6,000 filtered records; above that, a sample of 6,000 records is drawn: records
are split by country, each country gets a share proportional to the square root of its record
count (geographic spread, softer weight for heavily recorded countries) and pages are taken at
seeded random offsets. The SDM thins presences to one per environmental grid cell, so the sample
loses little. The available total is stored in the provenance notes. With GBIF_USERNAME /
PASSWORD / EMAIL set, the download API returns every record and a citable DOI instead.
(The maps "adhoc" density API was evaluated and rejected: its binning resolution varies with
zoom and data density, so it is not a reproducible spatial unit.)

Licences are kept per record (CC0 / CC BY / CC BY-NC).
"""

from __future__ import annotations

import gzip
import json
import logging
from concurrent.futures import ThreadPoolExecutor

import numpy as np
import pandas as pd

from ..http import get_json
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..species import SPECIES, Species

log = logging.getLogger(__name__)

GBIF = "https://api.gbif.org/v1"
OBIS = "https://api.obis.org/v3"
GBIF_PAGE = 300
GBIF_OFFSET_CAP = 100_000
GBIF_SAMPLE = 6_000
GBIF_THREADS = 2
SEED = 20261004
OBIS_PAGE = 10_000
MIN_YEAR = 1970
MAX_UNCERTAINTY_M = 10_000
BASIS = [
    "HUMAN_OBSERVATION",
    "OBSERVATION",
    "PRESERVED_SPECIMEN",
    "MACHINE_OBSERVATION",
    "MATERIAL_SAMPLE",
    "OCCURRENCE",
]
GBIF_FIELDS = [
    "key",
    "decimalLatitude",
    "decimalLongitude",
    "year",
    "basisOfRecord",
    "coordinateUncertaintyInMeters",
    "countryCode",
    "datasetKey",
    "license",
]
OBIS_FIELDS = [
    "id",
    "decimalLatitude",
    "decimalLongitude",
    "date_year",
    "basisOfRecord",
    "coordinateUncertaintyInMeters",
    "dataset_id",
    "license",
]


def _raw():
    d = get_settings().raw_dir / "occurrences"
    d.mkdir(parents=True, exist_ok=True)
    return d


def gbif_taxon_key(sp: Species) -> int:
    m = get_json(
        f"{GBIF}/species/match",
        {"name": sp.scientific_name, "kingdom": sp.gbif_kingdom, "rank": "SPECIES"},
    )
    return int(m.get("acceptedUsageKey") or m["usageKey"])


def _gbif_params(taxon_key: int) -> dict:
    return {
        "taxonKey": taxon_key,
        "hasCoordinate": "true",
        "hasGeospatialIssue": "false",
        "occurrenceStatus": "PRESENT",
        "basisOfRecord": BASIS,
        "coordinateUncertaintyInMeters": f"0,{MAX_UNCERTAINTY_M}",
        "year": f"{MIN_YEAR},2026",
    }


def _count(params: dict) -> int:
    return int(
        get_json(f"{GBIF}/occurrence/search", {**params, "limit": 0}, timeout=(10, 60))["count"]
    )


def _page(params: dict, offset: int, limit: int) -> list[dict]:
    page = get_json(
        f"{GBIF}/occurrence/search", {**params, "limit": limit, "offset": offset}, timeout=(10, 120)
    )
    return page["results"]


def plan_requests(total: int, country_counts: dict[str, int] | None) -> list[tuple]:
    """(country or None, offset, limit) requests: everything, or a stratified sample."""
    rng = np.random.default_rng(SEED)

    def pages_for(n: int, want: int) -> list[tuple[int, int]]:
        n = min(n, GBIF_OFFSET_CAP)
        if want >= n:
            return [(o, min(GBIF_PAGE, n - o)) for o in range(0, n, GBIF_PAGE)]
        k = int(np.ceil(want / GBIF_PAGE))
        size = int(np.ceil(want / k))
        starts = rng.choice(np.arange(0, n - size + 1, size), size=k, replace=False)
        return [(int(o), size) for o in sorted(starts)]

    if total <= GBIF_SAMPLE or not country_counts:
        return [(None, o, lim) for o, lim in pages_for(total, GBIF_SAMPLE)]
    weights = {c: np.sqrt(n) for c, n in country_counts.items()}
    norm = sum(weights.values())
    out = []
    for c, n in sorted(country_counts.items()):
        want = max(1, min(n, round(GBIF_SAMPLE * weights[c] / norm)))
        out += [(c, o, lim) for o, lim in pages_for(n, want)]
    return out


def fetch_gbif(sp: Species) -> object:
    """GBIF records for one species via the search API (complete or stratified sample)."""
    dest = _raw() / f"gbif_{sp.id}.jsonl.gz"
    if dest.exists():
        return dest
    key = gbif_taxon_key(sp)
    base = _gbif_params(key)
    total = _count(base)
    countries = None
    if total > GBIF_SAMPLE:
        facets = get_json(
            f"{GBIF}/occurrence/search", {**base, "limit": 0, "facet": "country", "facetLimit": 300}
        )
        countries = {f["name"]: f["count"] for f in facets["facets"][0]["counts"]}
    plan = plan_requests(total, countries)
    log.info("GBIF %s: %d available, %d requests", sp.id, total, len(plan))

    def one(req):
        country, offset, limit = req
        params = base | ({"country": country} if country else {})
        return _page(params, offset, limit)

    n = 0
    with gzip.open(dest.with_suffix(".part"), "wt") as f, ThreadPoolExecutor(GBIF_THREADS) as pool:
        for results in pool.map(one, plan):
            for rec in results:
                f.write(json.dumps({k: rec.get(k) for k in GBIF_FIELDS} | {"taxonKey": key}) + "\n")
            n += len(results)
    dest.with_suffix(".part").rename(dest)
    (_raw() / f"gbif_{sp.id}.meta.json").write_text(
        json.dumps({"available": total, "fetched": n, "sampled": total > GBIF_SAMPLE}) + "\n"
    )
    log.info("GBIF %s: %d records fetched", sp.id, n)
    return dest


def fetch_obis(sp: Species) -> object:
    dest = _raw() / f"obis_{sp.id}.jsonl.gz"
    if dest.exists():
        return dest
    after, n = None, 0
    with gzip.open(dest.with_suffix(".part"), "wt") as f:
        while True:
            params = {
                "scientificname": sp.scientific_name,
                "size": OBIS_PAGE,
                "absence": "false",
                "startdate": f"{MIN_YEAR}-01-01",
                "fields": ",".join(OBIS_FIELDS),
            }
            if after:
                params["after"] = after
            page = get_json(f"{OBIS}/occurrence", params, timeout=(10, 300))
            results = page.get("results", [])
            for rec in results:
                f.write(json.dumps({k: rec.get(k) for k in OBIS_FIELDS}) + "\n")
            n += len(results)
            if len(results) < OBIS_PAGE:
                break
            after = results[-1]["id"]
    dest.with_suffix(".part").rename(dest)
    log.info("OBIS %s: %d records", sp.id, n)
    return dest


def _read(path) -> pd.DataFrame:
    with gzip.open(path, "rt") as f:
        return pd.DataFrame([json.loads(line) for line in f])


def clean(sp: Species, gbif_path, obis_path) -> pd.DataFrame:
    frames = []
    g = _read(gbif_path)
    if len(g):
        g = g.reindex(columns=GBIF_FIELDS)
        frames.append(
            pd.DataFrame(
                {
                    "source": "gbif",
                    "source_record_id": g["key"].astype(str),
                    "lat": g["decimalLatitude"],
                    "lon": g["decimalLongitude"],
                    "year": g["year"],
                    "basis_of_record": g["basisOfRecord"],
                    "coordinate_uncertainty_m": g["coordinateUncertaintyInMeters"],
                    "country_code": g["countryCode"],
                    "dataset_key": g["datasetKey"],
                    "license": g["license"],
                    "provenance_id": "gbif",
                }
            )
        )
    o = _read(obis_path) if obis_path else pd.DataFrame()
    if len(o):
        o = o.reindex(columns=OBIS_FIELDS)
        frames.append(
            pd.DataFrame(
                {
                    "source": "obis",
                    "source_record_id": o["id"].astype(str),
                    "lat": o["decimalLatitude"],
                    "lon": o["decimalLongitude"],
                    "year": pd.to_numeric(o["date_year"], errors="coerce"),
                    "basis_of_record": o["basisOfRecord"],
                    "coordinate_uncertainty_m": pd.to_numeric(
                        o["coordinateUncertaintyInMeters"], errors="coerce"
                    ),
                    "country_code": None,
                    "dataset_key": o["dataset_id"],
                    "license": o["license"],
                    "provenance_id": "obis",
                }
            )
        )
    df = pd.concat(frames, ignore_index=True)
    n0 = len(df)
    df = df[
        df["lat"].between(-90, 90)
        & df["lon"].between(-180, 180)
        & ~((df["lat"] == 0) & (df["lon"] == 0))
    ]
    df = df[(df["year"].isna()) | (df["year"] >= MIN_YEAR)]
    df = df[
        df["coordinate_uncertainty_m"].isna()
        | (df["coordinate_uncertainty_m"] <= MAX_UNCERTAINTY_M)
    ]
    df = df[
        ~df["basis_of_record"]
        .fillna("")
        .str.upper()
        .isin(["LIVING_SPECIMEN", "FOSSIL_SPECIMEN", "LIVINGSPECIMEN", "FOSSILSPECIMEN"])
    ]
    df = df.assign(
        _k=list(zip(df["lat"].round(4), df["lon"].round(4), df["year"].fillna(-1), strict=True))
    )
    df = df.drop_duplicates("_k").drop(columns="_k")
    df["species_id"] = sp.id
    df["year"] = df["year"].astype("Int16")
    log.info(
        "%s: %d raw → %d clean (gbif %d, obis %d)",
        sp.id,
        n0,
        len(df),
        (df.source == "gbif").sum(),
        (df.source == "obis").sum(),
    )
    return df.reset_index(drop=True)


def _gbif_via_download_api() -> str | None:
    """Fetch all species in one GBIF download when credentials exist. Returns the DOI."""
    from . import gbif_download

    if not get_settings().has_gbif_credentials:
        return None
    if all((_raw() / f"gbif_{sp.id}.jsonl.gz").exists() for sp in SPECIES):
        return None
    keys = {sp.id: gbif_taxon_key(sp) for sp in SPECIES}
    pred = gbif_download.predicate(list(keys.values()), BASIS, MIN_YEAR, MAX_UNCERTAINTY_M)
    zip_path, meta = gbif_download.request_and_fetch(pred)
    gbif_download.split_by_species(zip_path, keys)
    return meta.get("doi")


def _sampling_summary() -> str:
    parts = []
    for sp in SPECIES:
        meta = _raw() / f"gbif_{sp.id}.meta.json"
        if meta.exists():
            m = json.loads(meta.read_text())
            parts.append(f"{sp.scientific_name} {m['available']:,}/{m['fetched']:,}")
    return "; ".join(parts) + "."


def ingest() -> pd.DataFrame:
    frames, files = [], []
    doi = _gbif_via_download_api()
    for sp in SPECIES:
        gp = fetch_gbif(sp)
        op = fetch_obis(sp) if sp.habitat == "marine" else None
        files += [p for p in (gp, op) if p]
        frames.append(clean(sp, gp, op))
    occ = pd.concat(frames, ignore_index=True)
    out = get_settings().clean_dir / "occurrences"
    out.mkdir(parents=True, exist_ok=True)
    occ.to_parquet(out / "occurrences.parquet", index=False)

    taxon_keys = {sp.id: gbif_taxon_key(sp) for sp in SPECIES}
    (out / "gbif_taxon_keys.json").write_text(json.dumps(taxon_keys, indent=2) + "\n")
    common = dict(
        spatial_resolution="point (coordinate uncertainty <= 10 km)",
        temporal_coverage=f"{MIN_YEAR}-2026",
        raw_path=str(_raw()),
    )
    gbif_files = [f for f in files if "gbif_" in f.name]
    obis_files = [f for f in files if "obis_" in f.name]
    Provenance(
        id="gbif",
        source_key="gbif",
        name="GBIF occurrence download" if doi else "GBIF occurrence search API",
        url="https://www.gbif.org/",
        license="Per record: CC0 1.0, CC BY 4.0 or CC BY-NC 4.0 (stored with each record)",
        license_url="https://www.gbif.org/terms",
        citation=(
            f"GBIF.org (2026). GBIF Occurrence Download. https://doi.org/{doi}"
            if doi
            else "GBIF.org (2026). GBIF Occurrence Search, filtered as documented in "
            "docs/DATA_REPORT.md. https://www.gbif.org"
        ),
        variables=["presence records"],
        access_method=(
            "GBIF download API (SIMPLE_CSV)"
            if doi
            else "REST api.gbif.org/v1/occurrence/search (stratified sample above "
            f"{GBIF_SAMPLE:,} records per species)"
        ),
        checksum=sha256_of(gbif_files),
        record_count=int((occ.source == "gbif").sum()),
        notes="Excludes LIVING_SPECIMEN (cultivated / captive) and FOSSIL_SPECIMEN. Human "
        "observations of planted Ginkgo and Catharanthus can remain. Available / fetched per "
        "species: " + _sampling_summary(),
        **common,
    ).save()
    Provenance(
        id="obis",
        source_key="obis",
        name="OBIS occurrence API",
        url="https://obis.org/",
        license="Per dataset: CC0 1.0, CC BY 4.0 or CC BY-NC 4.0 (stored with each record)",
        license_url="https://obis.org/data/access/",
        citation="OBIS (2026). Ocean Biodiversity Information System. Intergovernmental "
        "Oceanographic Commission of UNESCO. https://obis.org",
        variables=["presence records"],
        access_method="REST api.obis.org/v3/occurrence",
        checksum=sha256_of(obis_files),
        record_count=int((occ.source == "obis").sum()),
        notes="Marine species only; OBIS QC-dropped records excluded.",
        **common,
    ).save()
    return occ
