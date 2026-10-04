"""Copernicus Marine Service — global ocean physics and biogeochemistry reanalyses.

Products: GLOBAL_MULTIYEAR_PHY_001_030 (1/12°) and GLOBAL_MULTIYEAR_BGC_001_029 (1/4°), monthly
means, surface level (plus model bottom temperature). Climatology: 2021-01 to 2025-12.
Requires free credentials (COPERNICUSMARINE_SERVICE_USERNAME / _PASSWORD); without them the
module raises SourceUnavailableError and the snapshot values are used (ADR-0007).

Outputs:
  raw/copernicus_marine/<territory>_<var>_2021-2025.nc   monthly regional subsets
  clean/copernicus_marine/<var>_clim12.nc                global 12-month climatology
  clean/copernicus_marine/cell_features.parquet          per-cell features
"""

from __future__ import annotations

import logging
from dataclasses import dataclass

import numpy as np
import pandas as pd
import xarray as xr

from ..aggregate import nearest_valid
from ..provenance import Provenance
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult, SourceUnavailableError

log = logging.getLogger(__name__)

START, END = "2021-01-01", "2025-12-31"
PERIOD = "2021-01/2025-12"


@dataclass(frozen=True)
class Var:
    dataset_id: str
    name: str
    product: str
    provenance_id: str
    max_km: float  # nearest-valid search radius (~2.5 grid cells)
    stats: tuple[str, ...]  # subset of mean/min/max over the 12 climatological months
    prefix: str


PHY = "cmems_mod_glo_phy_my_0.083deg_P1M-m"
BGC = "cmems_mod_glo_bgc_my_0.25deg_P1M-m"

VARS: tuple[Var, ...] = (
    Var(
        PHY,
        "thetao",
        "GLOBAL_MULTIYEAR_PHY_001_030",
        "cmems-phy",
        25,
        ("mean", "min", "max"),
        "sst",
    ),
    Var(
        PHY,
        "bottomT",
        "GLOBAL_MULTIYEAR_PHY_001_030",
        "cmems-phy",
        25,
        ("mean", "min", "max"),
        "sbt",
    ),
    Var(PHY, "so", "GLOBAL_MULTIYEAR_PHY_001_030", "cmems-phy", 25, ("mean", "min"), "sss"),
    Var(BGC, "o2", "GLOBAL_MULTIYEAR_BGC_001_029", "cmems-bgc", 60, ("mean", "min"), "o2"),
    Var(BGC, "ph", "GLOBAL_MULTIYEAR_BGC_001_029", "cmems-bgc", 60, ("mean",), "ph"),
    Var(BGC, "chl", "GLOBAL_MULTIYEAR_BGC_001_029", "cmems-bgc", 60, ("mean",), "chl"),
)


def _dirs():
    s = get_settings()
    raw, clean = s.raw_dir / "copernicus_marine", s.clean_dir / "copernicus_marine"
    raw.mkdir(parents=True, exist_ok=True)
    clean.mkdir(parents=True, exist_ok=True)
    return raw, clean


def _open(var: Var) -> xr.DataArray:
    import copernicusmarine

    s = get_settings()
    kwargs = dict(
        dataset_id=var.dataset_id,
        variables=[var.name],
        start_datetime=START,
        end_datetime=END,
        username=s.copernicusmarine_service_username,
        password=s.copernicusmarine_service_password,
    )
    if var.name != "bottomT":  # 2-D field, no depth axis
        kwargs |= dict(minimum_depth=0.0, maximum_depth=1.0)
    ds = copernicusmarine.open_dataset(**kwargs)
    da = ds[var.name]
    return da.isel(depth=0) if "depth" in da.dims else da


def climatology(var: Var) -> xr.DataArray:
    """Global 12-month climatology (month, latitude, longitude), cached as netCDF.

    Months are streamed one at a time (~35 MB each at 1/12°) to bound memory; regional
    monthly subsets for each territory are written to raw/ on the way.
    """
    raw, clean = _dirs()
    path = clean / f"{var.name}_clim12.nc"
    if path.exists():
        return xr.open_dataarray(path)

    da = _open(var)
    n = da.sizes["time"]
    log.info("%s: streaming %d months", var.name, n)
    sums = np.zeros((12, da.sizes["latitude"], da.sizes["longitude"]), dtype=np.float64)
    counts = np.zeros(12, dtype=np.int32)
    regional: dict[str, list[xr.DataArray]] = {t.code: [] for t in TERRITORIES}
    for i in range(n):
        month = da.isel(time=i).load()
        m = int(month["time"].dt.month) - 1
        sums[m] += month.values
        counts[m] += 1
        for t in TERRITORIES:
            lon0, lat0, lon1, lat1 = t.bbox
            regional[t.code].append(
                month.sel(latitude=slice(lat0, lat1), longitude=slice(lon0, lon1))
            )
        if (i + 1) % 12 == 0:
            log.info("%s: %d/%d", var.name, i + 1, n)

    for code, parts in regional.items():
        xr.concat(parts, "time").to_netcdf(
            raw / f"{code}_{var.name}_2021-2025.nc",
            encoding={var.name: {"zlib": True, "complevel": 4}},
        )

    clim = xr.DataArray(
        (sums / counts[:, None, None]).astype(np.float32),
        dims=("month", "latitude", "longitude"),
        coords={"month": np.arange(1, 13), "latitude": da.latitude, "longitude": da.longitude},
        name=var.name,
        attrs={
            **da.attrs,
            "climatology_period": PERIOD,
            "months_per_calendar_month": counts.tolist(),
        },
    )
    clim.to_netcdf(path, encoding={var.name: {"zlib": True, "complevel": 4}})
    return clim


def _stat(clim: xr.DataArray, stat: str) -> xr.DataArray:
    return getattr(clim, stat)("month")


def provenances() -> list[Provenance]:
    common = dict(
        source_key="copernicus_marine",
        license="Copernicus Marine Service Licence (free, attribution required)",
        license_url="https://marine.copernicus.eu/user-corner/service-commitments-and-licence",
        temporal_coverage=PERIOD,
        temporal_resolution="monthly means → 12-month climatology",
        access_method="copernicusmarine Python toolbox (open_dataset, ARCO)",
    )
    return [
        Provenance(
            id="cmems-phy",
            name="Copernicus Marine — Global Ocean Physics Reanalysis (GLORYS12V1)",
            url="https://doi.org/10.48670/moi-00021",
            citation="E.U. Copernicus Marine Service Information (CMEMS). Global Ocean Physics "
            "Reanalysis, GLOBAL_MULTIYEAR_PHY_001_030. DOI: 10.48670/moi-00021",
            spatial_resolution="1/12° (~9 km)",
            variables=["thetao (surface)", "bottomT", "so (surface)"],
            **common,
        ),
        Provenance(
            id="cmems-bgc",
            name="Copernicus Marine — Global Ocean Biogeochemistry Hindcast",
            url="https://doi.org/10.48670/moi-00019",
            citation="E.U. Copernicus Marine Service Information (CMEMS). Global Ocean "
            "Biogeochemistry Hindcast, GLOBAL_MULTIYEAR_BGC_001_029. DOI: 10.48670/moi-00019",
            spatial_resolution="1/4° (~28 km)",
            variables=["o2 (surface)", "ph (surface)", "chl (surface)"],
            **common,
        ),
    ]


def ingest(cells: pd.DataFrame) -> SourceResult:
    if not get_settings().has_copernicus_credentials:
        raise SourceUnavailableError("Copernicus Marine credentials not set")

    marine = cells[cells["sea_fraction"] > 0]
    out = pd.DataFrame(index=pd.Index(marine["h3"], name="h3"))
    provenance: dict[str, str] = {}
    for var in VARS:
        clim = climatology(var)
        for t in TERRITORIES:
            sel = marine[marine["territory"] == t.code]
            lon0, lat0, lon1, lat1 = t.bbox
            reg = clim.sel(latitude=slice(lat0 - 1, lat1 + 1), longitude=slice(lon0 - 1, lon1 + 1))
            stats = np.stack([_stat(reg, s).values for s in var.stats])
            vals, _ = nearest_valid(
                reg.latitude.values,
                reg.longitude.values,
                stats,
                sel["lat"].values,
                sel["lon"].values,
                var.max_km,
            )
            for k, s in enumerate(var.stats):
                out.loc[sel["h3"].values, f"{var.prefix}_{s}"] = vals[k]
        for s in var.stats:
            provenance[f"{var.prefix}_{s}"] = var.provenance_id

    for p in provenances():
        p.raw_path = str(_dirs()[0])
        p.record_count = int(out.notna().any(axis=1).sum())
        p.save()
    return SourceResult("copernicus_marine", out, provenance)
