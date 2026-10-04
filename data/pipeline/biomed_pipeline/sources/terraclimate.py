"""TerraClimate — monthly terrestrial climate, 1/24° (~4.6 km), 2021-2025.

Abatzoglou, J.T. et al. (2018) TerraClimate, a high-resolution global dataset of monthly climate
and climatic water balance from 1958-2015. Sci. Data 5, 170191. Public domain (CC0).

Chosen over Open-Meteo for the gridded climate features because Open-Meteo counts every two
weeks of data per location as one API call: a 5-year daily climatology costs ~130 calls per
point, which makes global training extraction impossible within the free quota (ADR-0012).
The same TerraClimate product is used for training (global, 0.25°) and prediction (France,
1/24°), so the model sees one consistent feature definition.

Features:
  tair_mean      mean air temperature, (tmax + tmin) / 2 (°C)
  tair_min       mean daily minimum of the coldest month (°C)
  tair_max       mean daily maximum of the warmest month (°C)
  precip_annual  mean annual precipitation (mm)
  rh_mean        mean relative humidity from vapour pressure and saturation pressure at
                 mean temperature (Tetens), (%)
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor

import numpy as np
import pandas as pd
import xarray as xr

from ..aggregate import nearest_valid
from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult

log = logging.getLogger(__name__)

NCSS = "http://thredds.northwestknowledge.net:8080/thredds/ncss/TERRACLIMATE_ALL/data"
YEARS = tuple(range(2021, 2026))
VARS = ("tmax", "tmin", "ppt", "vap")
PROVENANCE_ID = "terraclimate"
FEATURES = ("tair_mean", "tair_min", "tair_max", "precip_annual", "rh_mean")


def _raw():
    d = get_settings().raw_dir / "terraclimate"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _fetch(var: str, year: int, tag: str, bbox, stride: int = 1):
    lon0, lat0, lon1, lat1 = bbox
    return download(
        f"{NCSS}/TerraClimate_{var}_{year}.nc",
        _raw() / tag / f"{var}_{year}.nc",
        params={
            "var": var,
            "north": lat1,
            "south": lat0,
            "west": lon0,
            "east": lon1,
            "horizStride": stride,
            "temporal": "all",
            "accept": "netcdf",
        },
        timeout=900,
    )


def saturation_vapour_pressure_kpa(t_c: np.ndarray) -> np.ndarray:
    """Tetens formula (kPa)."""
    return 0.6108 * np.exp(17.27 * t_c / (t_c + 237.3))


def climatology(files: dict[tuple[str, int], object]) -> xr.Dataset:
    """12-month climatology of the four variables from per-year files."""
    out = {}
    for var in VARS:
        da = xr.concat([xr.open_dataset(files[(var, y)])[var] for y in YEARS], "time")
        out[var] = da.groupby("time.month").mean("time")
    return xr.Dataset(out)


def features_from_climatology(clim: xr.Dataset) -> xr.Dataset:
    tmean = (clim.tmax + clim.tmin) / 2
    es = saturation_vapour_pressure_kpa(tmean)
    rh = (100 * clim.vap / es).clip(0, 100)
    return xr.Dataset(
        {
            "tair_mean": tmean.mean("month"),
            "tair_min": clim.tmin.min("month"),
            "tair_max": clim.tmax.max("month"),
            "precip_annual": clim.ppt.sum("month", min_count=12),
            "rh_mean": rh.mean("month"),
        }
    )


def global_climatology(stride: int = 6) -> xr.Dataset:
    """Global features at 1/24° x stride (0.25° by default) for SDM training."""
    path = get_settings().clean_dir / "terraclimate" / f"global_features_s{stride}.nc"
    if path.exists():
        return xr.open_dataset(path)
    jobs = [(v, y) for v in VARS for y in YEARS]
    with ThreadPoolExecutor(4) as pool:
        files = dict(
            zip(
                jobs,
                pool.map(
                    lambda j: _fetch(j[0], j[1], f"global_s{stride}", (-180, -90, 180, 90), stride),
                    jobs,
                ),
                strict=True,
            )
        )
    feats = features_from_climatology(climatology(files))
    path.parent.mkdir(parents=True, exist_ok=True)
    feats.astype("float32").to_netcdf(path)
    return feats


def ingest(cells: pd.DataFrame) -> SourceResult:
    land = cells[cells["land_fraction"] > 0]
    jobs = [(v, y, t) for t in TERRITORIES for v in VARS for y in YEARS]
    with ThreadPoolExecutor(4) as pool:
        paths = list(pool.map(lambda j: _fetch(j[0], j[1], j[2].code, j[2].bbox), jobs))
    files_by_t: dict[str, dict] = {}
    for (v, y, t), p in zip(jobs, paths, strict=True):
        files_by_t.setdefault(t.code, {})[(v, y)] = p

    parts = []
    for t in TERRITORIES:
        sel = land[land["territory"] == t.code]
        feats = features_from_climatology(climatology(files_by_t[t.code]))
        stack = np.stack([feats[f].values for f in FEATURES])
        vals, _ = nearest_valid(
            feats.lat.values, feats.lon.values, stack, sel["lat"].values, sel["lon"].values, 12
        )
        parts.append(pd.DataFrame(vals.T, index=pd.Index(sel["h3"], name="h3"), columns=FEATURES))
    out = pd.concat(parts)

    Provenance(
        id=PROVENANCE_ID,
        source_key="terraclimate",
        name="TerraClimate monthly climate",
        url="https://www.climatologylab.org/terraclimate.html",
        license="CC0 1.0 (public domain)",
        license_url="https://creativecommons.org/publicdomain/zero/1.0/",
        citation="Abatzoglou, J.T., Dobrowski, S.Z., Parks, S.A., Hegewisch, K.C. (2018). "
        "TerraClimate, a high-resolution global dataset of monthly climate and climatic water "
        "balance from 1958-2015. Scientific Data 5, 170191. https://doi.org/10.1038/sdata.2017.191",
        spatial_resolution="1/24° (~4.6 km)",
        temporal_coverage="2021-01/2025-12",
        temporal_resolution="monthly → 12-month climatology",
        variables=list(VARS),
        access_method="THREDDS NetCDF Subset Service (per year, per territory bbox)",
        raw_path=str(_raw()),
        checksum=sha256_of(paths),
        record_count=len(paths),
    ).save()
    return SourceResult("terraclimate", out, {f: PROVENANCE_ID for f in FEATURES})
