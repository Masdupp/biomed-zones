"""Protected areas — PatriNat (OFB / MNHN / CNRS) layers published on the IGN Géoplateforme.

The INPN WFS (ws.carmencarto.fr) was unreachable during development; the same PatriNat
datasets are republished on data.geopf.fr and cover Metropole and the DROM. Etalab Open
Licence 2.0. Natura 2000 (SIC/ZPS) only exists in Metropole: the Habitats and Birds directives
do not apply in the French outermost regions.

Features (share of cell area, 0-1):
  n2k_frac        Natura 2000 (SIC ∪ ZPS)
  pn_core_frac    national park core zones ("cœur")
  pnm_frac        marine natural parks
  strict_frac     integral reserves, national and Corsican nature reserves, biotope orders
  protected_frac  union of all the above
"""

from __future__ import annotations

import json
import logging

import geopandas as gpd
import numpy as np
import pandas as pd
import shapely

from ..grid import EQUAL_AREA, _cell_polygon
from ..http import get_session
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from .base import SourceResult

log = logging.getLogger(__name__)

WFS = "https://data.geopf.fr/wfs/ows"
LAYERS = {
    "sic": "patrinat_sic:sic",
    "zps": "patrinat_zps:zps",
    "pn": "patrinat_pn:parc_national",
    "ripn": "patrinat_ripn:ripn",
    "rnn": "patrinat_rnn:rnn",
    "rnc": "patrinat_rnc:pnm",  # the Corsican reserves layer is published under this name
    "apb": "patrinat_apb:apb",
    "pnm": "patrinat_pnm:pnm",
}
CATEGORIES = {
    "n2k_frac": ["sic", "zps"],
    "pn_core_frac": ["pn_core"],
    "pnm_frac": ["pnm"],
    "strict_frac": ["ripn", "rnn", "rnc", "apb"],
}
PROVENANCE_ID = "patrinat-protected-areas"
PAGE = 500


def _raw():
    d = get_settings().raw_dir / "protected_areas"
    d.mkdir(parents=True, exist_ok=True)
    return d


def fetch_layer(key: str):
    dest = _raw() / f"{key}.geojson"
    if dest.exists():
        return dest
    features, start = [], 0
    while True:
        r = get_session().get(
            WFS,
            params={
                "SERVICE": "WFS",
                "VERSION": "2.0.0",
                "REQUEST": "GetFeature",
                "TYPENAMES": LAYERS[key],
                "OUTPUTFORMAT": "application/json",
                "SRSNAME": "EPSG:4326",
                "COUNT": PAGE,
                "STARTINDEX": start,
                "SORTBY": "id_mnhn",
            },
            timeout=600,
        )
        r.raise_for_status()
        page = r.json()["features"]
        features += page
        log.info("%s: %d features", key, len(features))
        if len(page) < PAGE:
            break
        start += PAGE
    dest.write_text(json.dumps({"type": "FeatureCollection", "features": features}))
    return dest


def _load(key: str) -> gpd.GeoDataFrame:
    g = gpd.read_file(_raw() / f"{key}.geojson")
    g = g.set_crs(4326, allow_override=True)
    g["geometry"] = shapely.make_valid(g.geometry.values)
    return g


def area_fraction(cells: pd.DataFrame, geoms: gpd.GeoSeries) -> pd.Series:
    """Share of each cell covered by the union of ``geoms`` (equal-area computation)."""
    if geoms.empty:
        return pd.Series(0.0, index=cells["h3"])
    union = shapely.union_all(geoms.to_crs(EQUAL_AREA).values)
    parts = shapely.get_parts(union)
    hexes = gpd.GeoSeries([_cell_polygon(c) for c in cells["h3"]], crs=4326).to_crs(EQUAL_AREA)
    hex_arr = hexes.values._data if hasattr(hexes.values, "_data") else np.asarray(hexes.values)
    tree = shapely.STRtree(hex_arr)
    part_idx, hex_idx = tree.query(parts, predicate="intersects")
    inter = shapely.area(shapely.intersection(parts[part_idx], hex_arr[hex_idx]))
    covered = np.bincount(hex_idx, weights=inter, minlength=len(hex_arr))
    frac = np.clip(covered / shapely.area(hex_arr), 0, 1)
    return pd.Series(frac, index=cells["h3"].values)


def ingest(cells: pd.DataFrame) -> SourceResult:
    files = [fetch_layer(k) for k in LAYERS]
    layers = {k: _load(k) for k in LAYERS}
    pn = layers.pop("pn")
    layers["pn_core"] = pn[pn["zone"].fillna("").str.lower().str.startswith("c")]

    out = pd.DataFrame(index=pd.Index(cells["h3"], name="h3"))
    all_geoms = []
    for feature, keys in CATEGORIES.items():
        geoms = gpd.GeoSeries(
            pd.concat([layers[k].geometry for k in keys], ignore_index=True), crs=4326
        )
        all_geoms.append(geoms)
        out[feature] = area_fraction(cells, geoms)
        log.info("%s: %d cells > 0", feature, int((out[feature] > 0).sum()))
    out["protected_frac"] = area_fraction(
        cells, gpd.GeoSeries(pd.concat(all_geoms, ignore_index=True), crs=4326)
    )

    Provenance(
        id=PROVENANCE_ID,
        source_key="patrinat",
        name="INPN / PatriNat protected areas (Natura 2000, national parks, reserves, "
        "biotope orders, marine natural parks)",
        url="https://inpn.mnhn.fr/telechargement/cartes-et-information-geographique",
        license="Licence Ouverte / Etalab Open Licence 2.0",
        license_url="https://www.etalab.gouv.fr/licence-ouverte-open-licence/",
        citation="PatriNat (OFB-MNHN-CNRS-IRD). Espaces protégés et Natura 2000, Inventaire "
        "National du Patrimoine Naturel. Diffusion IGN Géoplateforme.",
        spatial_resolution="vector (source scales 1:5,000 to 1:100,000)",
        variables=[f"{k} ({v})" for k, v in LAYERS.items()],
        access_method="OGC WFS 2.0 data.geopf.fr (patrinat_* layers), paged GeoJSON",
        raw_path=str(_raw()),
        checksum=sha256_of(files),
        record_count=int(sum(len(v) for v in layers.values()) + len(pn)),
        notes="INPN carmencarto WFS unreachable at retrieval time; Géoplateforme mirror used. "
        "Natura 2000 does not apply in the DROM.",
    ).save()
    feats = list(CATEGORIES) + ["protected_frac"]
    return SourceResult("protected_areas", out, {f: PROVENANCE_ID for f in feats})
