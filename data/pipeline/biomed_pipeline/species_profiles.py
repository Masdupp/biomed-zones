"""Build data/reference/species.json from species.source.json.

* taxonomy and IUCN Red List category from the GBIF species API (backbone + IUCN checklist);
  missing ranks are filled from WoRMS when available, with the source recorded per rank;
* every DOI is resolved with Crossref and every URL is fetched: a reference is "verified" only
  if it resolves; otherwise its status is "to verify" (never silently kept as if checked).
"""

from __future__ import annotations

import json
import logging
import time
from datetime import UTC, datetime

import requests

from .http import get_session
from .settings import REPO_ROOT

log = logging.getLogger(__name__)

SOURCE = REPO_ROOT / "data" / "reference" / "species.source.json"
OUTPUT = REPO_ROOT / "data" / "reference" / "species.json"
GBIF = "https://api.gbif.org/v1"
WORMS = "https://www.marinespecies.org/rest"
CROSSREF = "https://api.crossref.org/works"
RANKS = ("kingdom", "phylum", "class", "order", "family", "genus")
UA = {"User-Agent": "BioMedZones/2.0 (https://github.com/; mailto:research@biomed-zones.invalid)"}


def _get(url: str, params=None, timeout=30):
    for attempt in range(4):
        try:
            r = get_session().get(url, params=params, headers=UA, timeout=timeout)
            if r.status_code == 429:
                time.sleep(5 * (attempt + 1))
                continue
            return r
        except requests.RequestException:
            time.sleep(3 * (attempt + 1))
    return None


def gbif_profile(name: str, kingdom: str) -> dict:
    m = _get(f"{GBIF}/species/match", {"name": name, "kingdom": kingdom, "rank": "SPECIES"}).json()
    key = int(m.get("acceptedUsageKey") or m["usageKey"])
    sp = _get(f"{GBIF}/species/{key}").json()
    iucn_r = _get(f"{GBIF}/species/{key}/iucnRedListCategory")
    iucn = iucn_r.json() if iucn_r is not None and iucn_r.status_code == 200 and iucn_r.text else {}
    taxonomy = {r: {"name": sp.get(r), "source": "GBIF Backbone"} for r in RANKS if sp.get(r)}
    return {
        "gbif_taxon_key": key,
        "authorship": (sp.get("authorship") or "").strip(),
        "taxonomy": taxonomy,
        "iucn": {
            "category": iucn.get("category", "NOT_EVALUATED"),
            "code": iucn.get("code", "NE"),
            "source": "IUCN Red List via GBIF (species/{key}/iucnRedListCategory)",
        },
    }


def fill_from_worms(name: str, taxonomy: dict) -> None:
    missing = [r for r in RANKS if r not in taxonomy]
    if not missing:
        return
    r = _get(f"{WORMS}/AphiaIDByName/{requests.utils.quote(name)}", {"marine_only": "false"})
    if r is None or r.status_code != 200:
        return
    aphia = r.json()
    c = _get(f"{WORMS}/AphiaClassificationByAphiaID/{aphia}")
    if c is None or c.status_code != 200:
        return
    node, found = c.json(), {}
    while node:
        rank = (node.get("rank") or "").lower()
        if rank in RANKS:
            found[rank] = node.get("scientificname")
        node = node.get("child")
    for rank in missing:
        if found.get(rank):
            taxonomy[rank] = {"name": found[rank], "source": f"WoRMS (AphiaID {aphia})"}


def _strip_html(text: str | None) -> str | None:
    import re

    return " ".join(re.sub(r"<[^>]+>", " ", text).split()) if text else None


def wikimedia_photo(name: str) -> dict | None:
    """Lead image of the English Wikipedia article, with Commons author and licence."""
    r = _get(
        "https://en.wikipedia.org/w/api.php",
        {
            "action": "query",
            "format": "json",
            "prop": "pageimages",
            "piprop": "name",
            "titles": name,
            "redirects": 1,
        },
    )
    if r is None or r.status_code != 200:
        return None
    pages = r.json().get("query", {}).get("pages", {})
    file = next((p.get("pageimage") for p in pages.values() if p.get("pageimage")), None)
    if not file:
        return None
    r = _get(
        "https://commons.wikimedia.org/w/api.php",
        {
            "action": "query",
            "format": "json",
            "prop": "imageinfo",
            "titles": f"File:{file}",
            "iiprop": "url|extmetadata",
            "iiurlwidth": 960,
        },
    )
    if r is None or r.status_code != 200:
        return None
    info = next(iter(r.json()["query"]["pages"].values())).get("imageinfo", [{}])[0]
    meta = info.get("extmetadata", {})
    value = lambda k: _strip_html(meta.get(k, {}).get("value"))  # noqa: E731
    license_name = value("LicenseShortName")
    if not license_name or not any(
        x in license_name.lower() for x in ("cc", "public domain", "pd", "free use")
    ):
        return None  # only openly licensed images
    return {
        "file": file,
        "url": info.get("thumburl") or info.get("url"),
        "source_page": info.get("descriptionurl"),
        "author": value("Artist") or "Unknown author",
        "license": license_name,
        "license_url": value("LicenseUrl"),
        "credit": value("Credit"),
    }


def verify_reference(key: str, ref: dict) -> dict:
    out = {"key": key, **ref}
    if "doi" in ref:
        r = _get(f"{CROSSREF}/{ref['doi']}")
        if r is not None and r.status_code == 200:
            m = r.json()["message"]
            out |= {
                "title": (m.get("title") or [""])[0],
                "authors": [
                    f"{a.get('family', '')} {a.get('given', '')[:1]}".strip()
                    for a in m.get("author", [])
                ][:6],
                "year": (m.get("issued", {}).get("date-parts") or [[None]])[0][0],
                "container": (m.get("container-title") or [""])[0],
                "url": f"https://doi.org/{ref['doi']}",
                "status": "verified",
                "verified_with": "Crossref",
            }
        else:
            out["status"] = "to verify"
        time.sleep(0.3)
    elif "url" in ref:
        r = _get(ref["url"])
        out["status"] = "verified" if r is not None and r.status_code == 200 else "to verify"
        out["verified_with"] = "HTTP GET"
    else:
        out["status"] = "to verify"
    return out


def build() -> dict:
    src = json.loads(SOURCE.read_text())
    refs = {k: verify_reference(k, v) for k, v in src["references"].items()}
    species = []
    for s in src["species"]:
        kingdom = "Plantae" if s["habitat"] == "terrestrial" else "Animalia"
        prof = gbif_profile(s["scientific_name"], kingdom)
        fill_from_worms(s["scientific_name"], prof["taxonomy"])
        prof["taxonomy"] = {r: prof["taxonomy"][r] for r in RANKS if r in prof["taxonomy"]}
        prof["photo"] = wikimedia_photo(s["scientific_name"]) or wikimedia_photo(
            s["common_name_en"]
        )
        used = {k for m in s["medical_applications"] for k in m["references"]}
        used |= set(s.get("tolerance_references", []))
        unknown = used - refs.keys()
        if unknown:
            raise ValueError(f"{s['id']}: unknown reference keys {sorted(unknown)}")
        species.append(s | prof)
        log.info(
            "%s: taxonomy %s, IUCN %s",
            s["id"],
            "/".join(v["name"] for v in prof["taxonomy"].values()),
            prof["iucn"]["code"],
        )
    out = {
        "generated_at": datetime.now(UTC).isoformat(timespec="seconds"),
        "parameter_semantics": src["parameter_semantics"],
        "species": species,
        "references": refs,
    }
    OUTPUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    bad = [k for k, v in refs.items() if v["status"] != "verified"]
    log.info("references: %d verified, %d to verify %s", len(refs) - len(bad), len(bad), bad)
    return out
