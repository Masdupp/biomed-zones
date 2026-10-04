"""ISRIC SoilGrids 2.0 — topsoil properties (0-30 cm), via OGC WCS.

Poggio, L. et al. (2021) SoilGrids 2.0. SOIL 7, 217-240. https://doi.org/10.5194/soil-7-217-2021
CC BY 4.0. Native 250 m (Homolosine); requested reprojected to EPSG:4326 at 0.005° (~500 m).

Features (thickness-weighted mean of 0-5, 5-15, 15-30 cm):
  soil_ph    pH in water
  soil_soc   soil organic carbon (g/kg)
  soil_clay, soil_sand, soil_silt   texture fractions (%)
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass

import numpy as np
import pandas as pd
import rasterio

from ..aggregate import zonal_stats
from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult

log = logging.getLogger(__name__)

WCS = "https://maps.isric.org/mapserv"
EPSG4326 = "http://www.opengis.net/def/crs/EPSG/0/4326"
RES_DEG = 0.005
DEPTHS = (("0-5cm", 5), ("5-15cm", 10), ("15-30cm", 15))
PROVENANCE_ID = "soilgrids-2"


@dataclass(frozen=True)
class Prop:
    name: str
    feature: str
    scale: float  # stored integer → physical unit


PROPS = (
    Prop("phh2o", "soil_ph", 0.1),  # pH x10
    Prop("soc", "soil_soc", 0.1),  # dg/kg → g/kg
    Prop("clay", "soil_clay", 0.1),  # g/kg → %
    Prop("sand", "soil_sand", 0.1),
    Prop("silt", "soil_silt", 0.1),
)


def _raw():
    d = get_settings().raw_dir / "soilgrids"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _fetch(prop: Prop, depth: str, code: str, bbox) -> object:
    lon0, lat0, lon1, lat1 = bbox
    w, h = round((lon1 - lon0) / RES_DEG), round((lat1 - lat0) / RES_DEG)
    return download(
        WCS,
        _raw() / f"{code}_{prop.name}_{depth}_mean.tif",
        params={
            "map": f"/map/{prop.name}.map",
            "SERVICE": "WCS",
            "VERSION": "2.0.1",
            "REQUEST": "GetCoverage",
            "COVERAGEID": f"{prop.name}_{depth}_mean",
            "FORMAT": "GEOTIFF_INT16",
            "SUBSET": [f"long({lon0},{lon1})", f"lat({lat0},{lat1})"],
            "SUBSETTINGCRS": EPSG4326,
            "OUTPUTCRS": EPSG4326,
            "SCALESIZE": f"long({w}),lat({h})",
        },
        timeout=600,
    )


def _weighted(prop: Prop, code: str, paths: dict) -> tuple[np.ndarray, object]:
    acc, wsum, transform = None, None, None
    for depth, thickness in DEPTHS:
        with rasterio.open(paths[(prop.name, depth, code)]) as r:
            a = r.read(1).astype(float)
            transform = r.transform
        # 0 and negative values are nodata (water, built-up, outside coverage).
        valid = a > 0
        a = np.where(valid, a * prop.scale, 0.0)
        acc = a * thickness if acc is None else acc + a * thickness
        wsum = valid * thickness if wsum is None else wsum + valid * thickness
    with np.errstate(invalid="ignore", divide="ignore"):
        out = np.where(wsum > 0, acc / wsum, np.nan)
    return out, transform


def ingest(cells: pd.DataFrame) -> SourceResult:
    land = cells[cells["land_fraction"] > 0]
    jobs = [(p, d, t.code, t.bbox) for t in TERRITORIES for p in PROPS for d, _ in DEPTHS]
    log.info("SoilGrids: %d coverages", len(jobs))
    with ThreadPoolExecutor(4) as pool:
        files = list(pool.map(lambda j: _fetch(*j), jobs))
    paths = {(p.name, d, c): f for (p, d, c, _), f in zip(jobs, files, strict=True)}

    parts = []
    for t in TERRITORIES:
        idx = pd.Index(land.loc[land["territory"] == t.code, "h3"])
        cols = {}
        for p in PROPS:
            arr, tr = _weighted(p, t.code, paths)
            cols[p.feature] = zonal_stats(arr, tr, idx)["mean"]
        parts.append(pd.DataFrame(cols))
    feats = pd.concat(parts)

    Provenance(
        id=PROVENANCE_ID,
        source_key="soilgrids",
        name="ISRIC SoilGrids 2.0",
        url="https://soilgrids.org",
        license="CC BY 4.0",
        license_url="https://creativecommons.org/licenses/by/4.0/",
        citation="Poggio, L. et al. (2021). SoilGrids 2.0: producing soil information for the "
        "globe with quantified spatial uncertainty. SOIL 7, 217-240. "
        "https://doi.org/10.5194/soil-7-217-2021",
        spatial_resolution="250 m native, requested at 0.005° (~500 m) in EPSG:4326",
        variables=[f"{p.name} (0-30 cm, thickness-weighted)" for p in PROPS],
        access_method="OGC WCS 2.0.1 maps.isric.org (mean predictions)",
        raw_path=str(_raw()),
        checksum=sha256_of(list(files)),
        record_count=len(files),
    ).save()
    return SourceResult("soilgrids", feats, {p.feature: PROVENANCE_ID for p in PROPS})
