"""Global environmental layers for the species distribution models (SDM).

The SDMs are trained on worldwide occurrences, so their predictors must exist globally. French
cells are sampled from the *same* global grids (not from the higher-resolution national
features), so training and prediction share one feature definition (ADR-0020).

Layers
  Copernicus Marine climatologies 2021-2025 (global, from copernicus_marine)  1/12°, 1/4°
  NOAA ETOPO 2022 bed elevation (bedrock under ice), 1/12° via OPeNDAP          depth / elevation
  TerraClimate 2021-2025 features, global at 0.25° (stride 6)                  climate
  SoilGrids 2.0 5-15 cm pH, organic carbon, clay, global at 0.1° via WCS       soil

Model features (prefix ml_)
  marine:      sst_mean/min/max, sbt_mean, sss_mean, o2_mean, ph_mean, chl_log, depth_log
  terrestrial: tair_mean/min/max, precip_log, rh_mean, elev, soil_ph, soil_soc, soil_clay
"""

from __future__ import annotations

import logging
from functools import cache

import numpy as np
import pandas as pd
import rasterio
import xarray as xr

from ..aggregate import nearest_valid
from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from . import copernicus_marine, terraclimate
from .base import SourceResult

log = logging.getLogger(__name__)

ETOPO_URL = (
    "https://www.ngdc.noaa.gov/thredds/dodsC/global/ETOPO2022/60s/60s_bed_elev_netcdf/"
    "ETOPO_2022_v1_60s_N90W180_bed.nc"
)
ETOPO_STRIDE = 5  # 60 arc-seconds x 5 = 1/12°
SOILGRIDS = "https://maps.isric.org/mapserv"
SOIL_PROPS = {
    "phh2o": ("ml_soil_ph", 0.1),
    "soc": ("ml_soil_soc", 0.1),
    "clay": ("ml_soil_clay", 0.1),
}
SOIL_RES = 0.1

MARINE = [
    "ml_sst_mean",
    "ml_sst_min",
    "ml_sst_max",
    "ml_sbt_mean",
    "ml_sss_mean",
    "ml_o2_mean",
    "ml_ph_mean",
    "ml_chl_log",
    "ml_depth_log",
]
TERRESTRIAL = [
    "ml_tair_mean",
    "ml_tair_min",
    "ml_tair_max",
    "ml_precip_log",
    "ml_rh_mean",
    "ml_elev",
    "ml_soil_ph",
    "ml_soil_soc",
    "ml_soil_clay",
]

PROVENANCE = {
    "ml_sst_mean": "cmems-phy",
    "ml_sst_min": "cmems-phy",
    "ml_sst_max": "cmems-phy",
    "ml_sbt_mean": "cmems-phy",
    "ml_sss_mean": "cmems-phy",
    "ml_o2_mean": "cmems-bgc",
    "ml_ph_mean": "cmems-bgc",
    "ml_chl_log": "cmems-bgc",
    "ml_depth_log": "etopo-2022",
    "ml_tair_mean": "terraclimate-global",
    "ml_tair_min": "terraclimate-global",
    "ml_tair_max": "terraclimate-global",
    "ml_precip_log": "terraclimate-global",
    "ml_rh_mean": "terraclimate-global",
    "ml_elev": "etopo-2022",
    "ml_soil_ph": "soilgrids-global",
    "ml_soil_soc": "soilgrids-global",
    "ml_soil_clay": "soilgrids-global",
}


def _clean():
    d = get_settings().clean_dir / "ml_layers"
    d.mkdir(parents=True, exist_ok=True)
    return d


@cache
def etopo() -> xr.DataArray:
    path = _clean() / "etopo2022_bed_1-12deg.nc"
    if not path.exists():
        log.info("ETOPO 2022: reading global grid at 1/12° via OPeNDAP")
        z = xr.open_dataset(ETOPO_URL)["z"][::ETOPO_STRIDE, ::ETOPO_STRIDE].load()
        # Drop the source encoding (packing / scale factor): written as plain float32.
        z = xr.DataArray(z.values.astype("float32"), coords=z.coords, dims=z.dims, name="z")
        z.to_netcdf(path, encoding={"z": {"zlib": True, "complevel": 4, "dtype": "float32"}})
    z = xr.open_dataarray(path).rename({"lat": "latitude", "lon": "longitude"})
    if float(abs(z).max()) == 0:
        raise ValueError(f"{path} contains only zeros; delete it and re-download")
    return z


@cache
def soil(prop: str) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    w, h = round(360 / SOIL_RES), round(144 / SOIL_RES)
    path = download(
        SOILGRIDS,
        get_settings().raw_dir / "ml_layers" / f"soilgrids_{prop}_5-15cm_global_0.1.tif",
        params={
            "map": f"/map/{prop}.map",
            "SERVICE": "WCS",
            "VERSION": "2.0.1",
            "REQUEST": "GetCoverage",
            "COVERAGEID": f"{prop}_5-15cm_mean",
            "FORMAT": "GEOTIFF_INT16",
            "SUBSET": ["long(-180,180)", "lat(-60,84)"],
            "SUBSETTINGCRS": "http://www.opengis.net/def/crs/EPSG/0/4326",
            "OUTPUTCRS": "http://www.opengis.net/def/crs/EPSG/0/4326",
            "SCALESIZE": f"long({w}),lat({h})",
        },
        timeout=600,
    )
    with rasterio.open(path) as r:
        a = r.read(1).astype(float)
        t = r.transform
    a[a <= 0] = np.nan
    lat = t.f + t.e * (np.arange(a.shape[0]) + 0.5)
    lon = t.c + t.a * (np.arange(a.shape[1]) + 0.5)
    return lat, lon, a * SOIL_PROPS[prop][1]


@cache
def cmems_stats() -> dict[str, tuple[np.ndarray, np.ndarray, np.ndarray]]:
    out = {}
    for var in copernicus_marine.VARS:
        clim = copernicus_marine.climatology(var)
        lat, lon = clim.latitude.values, clim.longitude.values
        for stat in var.stats:
            out[f"{var.prefix}_{stat}"] = (lat, lon, getattr(clim, stat)("month").values)
    return out


@cache
def terraclimate_global() -> xr.Dataset:
    return terraclimate.global_climatology(stride=6)


def _nearest(grid: tuple, lat: np.ndarray, lon: np.ndarray, max_km: float) -> np.ndarray:
    glat, glon, values = grid
    v, _ = nearest_valid(glat, glon, values, lat, lon, max_km)
    return v


def _subset(grid: tuple, lat: np.ndarray, lon: np.ndarray, pad: float = 1.0) -> tuple:
    """Crop a global grid to the points' bounding box (keeps KD-trees small)."""
    glat, glon, values = grid
    ly = (glat >= lat.min() - pad) & (glat <= lat.max() + pad)
    lx = (glon >= lon.min() - pad) & (glon <= lon.max() + pad)
    return glat[ly], glon[lx], values[np.ix_(ly, lx)]


def sample_marine(lat: np.ndarray, lon: np.ndarray) -> pd.DataFrame:
    s = cmems_stats()
    out = {}
    pairs = {
        "ml_sst_mean": "sst_mean",
        "ml_sst_min": "sst_min",
        "ml_sst_max": "sst_max",
        "ml_sbt_mean": "sbt_mean",
        "ml_sss_mean": "sss_mean",
        "ml_o2_mean": "o2_mean",
        "ml_ph_mean": "ph_mean",
    }
    for key, src in pairs.items():
        max_km = 25 if src[:2] in ("ss", "sb") else 60
        out[key] = _nearest(_subset(s[src], lat, lon), lat, lon, max_km)
    out["ml_chl_log"] = np.log10(_nearest(_subset(s["chl_mean"], lat, lon), lat, lon, 60))
    z = etopo()
    sea = np.where(z.values < 0, -z.values, np.nan)
    grid = (z.latitude.values, z.longitude.values, sea)
    out["ml_depth_log"] = np.log10(1 + _nearest(_subset(grid, lat, lon), lat, lon, 25))
    return pd.DataFrame(out)


def sample_terrestrial(lat: np.ndarray, lon: np.ndarray) -> pd.DataFrame:
    tc = terraclimate_global()
    tgrid = lambda f: (tc.lat.values, tc.lon.values, tc[f].values)  # noqa: E731
    out = {
        "ml_tair_mean": _nearest(_subset(tgrid("tair_mean"), lat, lon), lat, lon, 40),
        "ml_tair_min": _nearest(_subset(tgrid("tair_min"), lat, lon), lat, lon, 40),
        "ml_tair_max": _nearest(_subset(tgrid("tair_max"), lat, lon), lat, lon, 40),
        "ml_precip_log": np.log10(
            1 + _nearest(_subset(tgrid("precip_annual"), lat, lon), lat, lon, 40)
        ),
        "ml_rh_mean": _nearest(_subset(tgrid("rh_mean"), lat, lon), lat, lon, 40),
    }
    z = etopo()
    land = np.where(z.values >= -5, z.values, np.nan)
    out["ml_elev"] = _nearest(
        _subset((z.latitude.values, z.longitude.values, land), lat, lon), lat, lon, 25
    )
    for prop, (key, _) in SOIL_PROPS.items():
        out[key] = _nearest(_subset(soil(prop), lat, lon), lat, lon, 30)
    return pd.DataFrame(out)


def provenances() -> list[Provenance]:
    raw = get_settings().raw_dir / "ml_layers"
    soil_files = sorted(raw.glob("soilgrids_*_global_0.1.tif"))
    return [
        Provenance(
            id="etopo-2022",
            source_key="etopo",
            name="NOAA ETOPO 2022 Global Relief Model (bed elevation)",
            url="https://doi.org/10.25921/fd45-gt74",
            license="Public domain (US Government)",
            citation="NOAA National Centers for Environmental Information (2022). ETOPO 2022 "
            "15 Arc-Second Global Relief Model. https://doi.org/10.25921/fd45-gt74",
            spatial_resolution="60 arc-second product read at 1/12° (OPeNDAP stride 5)",
            variables=["bed elevation → depth (sea), elevation (land)"],
            access_method="OPeNDAP www.ngdc.noaa.gov/thredds",
            mode="live",
            raw_path=str(_clean() / "etopo2022_bed_1-12deg.nc"),
            notes="Global layer used only for SDM training and prediction.",
        ),
        Provenance(
            id="terraclimate-global",
            source_key="terraclimate",
            name="TerraClimate monthly climate — global 0.25° subsample",
            url="https://www.climatologylab.org/terraclimate.html",
            license="CC0 1.0",
            citation="Abatzoglou, J.T. et al. (2018). Scientific Data 5, 170191. "
            "https://doi.org/10.1038/sdata.2017.191",
            spatial_resolution="1/24° read with stride 6 (0.25°)",
            temporal_coverage="2021-01/2025-12",
            temporal_resolution="monthly → climatology",
            variables=["tmax", "tmin", "ppt", "vap"],
            access_method="THREDDS NetCDF Subset Service (horizStride=6)",
            raw_path=str(get_settings().raw_dir / "terraclimate" / "global_s6"),
            notes="Global layer used only for SDM training and prediction.",
        ),
        Provenance(
            id="soilgrids-global",
            source_key="soilgrids",
            name="ISRIC SoilGrids 2.0 — global 0.1° (5-15 cm)",
            url="https://soilgrids.org",
            license="CC BY 4.0",
            license_url="https://creativecommons.org/licenses/by/4.0/",
            citation="Poggio, L. et al. (2021). SOIL 7, 217-240. "
            "https://doi.org/10.5194/soil-7-217-2021",
            spatial_resolution="250 m native, requested at 0.1° in EPSG:4326",
            variables=["phh2o 5-15 cm", "soc 5-15 cm", "clay 5-15 cm"],
            access_method="OGC WCS 2.0.1 maps.isric.org (global extent)",
            raw_path=str(raw),
            checksum=sha256_of(soil_files) if soil_files else None,
            notes="Global layer used only for SDM training and prediction.",
        ),
    ]


def ingest(cells: pd.DataFrame) -> SourceResult:
    """Model features for the French cells (sampled from the global layers)."""
    sea = cells[cells["sea_fraction"] > 0]
    land = cells[cells["land_fraction"] > 0]
    m = sample_marine(sea["lat"].to_numpy(), sea["lon"].to_numpy())
    m.index = pd.Index(sea["h3"], name="h3")
    t = sample_terrestrial(land["lat"].to_numpy(), land["lon"].to_numpy())
    t.index = pd.Index(land["h3"], name="h3")
    feats = m.join(t, how="outer")
    for p in provenances():
        p.save()
    return SourceResult("ml_layers", feats.astype("float32"), dict(PROVENANCE))
