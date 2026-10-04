"""Bathymetry: EMODnet DTM (Metropolitan seas) and GMRT (overseas territories).

EMODnet Bathymetry Consortium (2022) EMODnet Digital Bathymetry (DTM 2022), CC BY 4.0, via WCS.
EMODnet does not cover the Caribbean, the Guiana shelf or the Indian Ocean, so the DROM use the
Global Multi-Resolution Topography synthesis (GMRT, Ryan et al. 2009), CC BY 4.0, via GridServer.

Pixels are restricted to the marine zone (territorial sea ∪ internal waters, minus Natural
Earth land), not to elevation < 0: EMODnet's vertical datum is Lowest Astronomical Tide where
available, so tidal flats such as the Baie du Mont-Saint-Michel lie *above* zero (+3 to +7 m)
and would otherwise be dropped. GMRT is referenced to mean sea level (DROM tidal ranges are
< 1 m, so the intertidal share there is close to zero by construction).

Features (marine-zone pixels):
  depth_mean       mean depth below the product's vertical datum (m, positive downward;
                   negative = above datum, i.e. intertidal flats)
  shallow_frac     share of pixels with 0 < depth <= 20 m (subtidal shallows)
  intertidal_frac  share of pixels at or above datum (depth <= 0), i.e. exposed at low tide
"""

from __future__ import annotations

import logging

import numpy as np
import pandas as pd
import rasterio
import shapely
from rasterio.features import geometry_mask

from ..aggregate import zonal_stats
from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from . import marineregions, naturalearth
from .base import SourceResult

log = logging.getLogger(__name__)

EMODNET_WCS = "https://ows.emodnet-bathymetry.eu/wcs"
GMRT = "https://www.gmrt.org/services/GridServer"
SHALLOW_M = 20.0


def _raw():
    d = get_settings().raw_dir / "bathymetry"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _tiles_for(cells: pd.DataFrame) -> list[tuple[int, int]]:
    """1°x1° tiles (lon0, lat0) that contain at least one cell centroid (padded by one cell)."""
    pad = 0.03
    keys = set()
    for dx in (-pad, pad):
        for dy in (-pad, pad):
            lon = np.floor(cells["lon"].values + dx).astype(int)
            lat = np.floor(cells["lat"].values + dy).astype(int)
            keys.update(zip(lon.tolist(), lat.tolist(), strict=True))
    return sorted(keys)


def _emodnet_tile(lon0: int, lat0: int):
    dest = _raw() / "emodnet" / f"emodnet_mean_{lat0:+03d}_{lon0:+04d}.tif"
    return download(
        EMODNET_WCS,
        dest,
        params={
            "service": "WCS",
            "version": "2.0.1",
            "request": "GetCoverage",
            "coverageId": "emodnet__mean",
            "subset": [f"Lat({lat0},{lat0 + 1})", f"Long({lon0},{lon0 + 1})"],
            "format": "image/tiff",
            "SCALEFACTOR": "0.5",  # 1/16' native → ~230 m
        },
    )


def _gmrt_territory(code: str, bbox) -> object:
    lon0, lat0, lon1, lat1 = bbox
    dest = _raw() / "gmrt" / f"gmrt_{code}.tif"
    return download(
        GMRT,
        dest,
        params={
            "minlongitude": lon0,
            "maxlongitude": lon1,
            "minlatitude": lat0,
            "maxlatitude": lat1,
            "format": "geotiff",
            "resolution": "high",
            "layer": "topo",
        },
    )


def marine_zones() -> dict[str, object]:
    land = naturalearth.load_land().set_index("territory")
    sea = marineregions.load_territorial_sea().set_index("territory")
    return {
        t.code: shapely.difference(sea.loc[t.code, "geometry"], land.loc[t.code, "geometry"])
        for t in TERRITORIES
    }


def _reduce(path, cells_idx: pd.Index, zone) -> pd.DataFrame:
    with rasterio.open(path) as r:
        elev = r.read(1).astype(float)
        if r.nodata is not None:
            elev[elev == r.nodata] = np.nan
        transform = r.transform
        if r.crs and r.crs.to_epsg() != 4326:
            raise ValueError(f"{path} is not EPSG:4326")
    outside = geometry_mask([zone], out_shape=elev.shape, transform=transform, all_touched=True)
    depth = np.where(outside, np.nan, -elev)
    valid = ~np.isnan(depth)
    shallow = np.where(valid, ((depth > 0) & (depth <= SHALLOW_M)).astype(float), np.nan)
    intertidal = np.where(valid, (depth <= 0).astype(float), np.nan)
    d = zonal_stats(depth, transform, cells_idx)
    s = zonal_stats(shallow, transform, cells_idx)
    i = zonal_stats(intertidal, transform, cells_idx)
    return pd.DataFrame(
        {"depth_mean": d["mean"], "shallow_frac": s["mean"], "intertidal_frac": i["mean"]}
    )


def ingest(cells: pd.DataFrame) -> SourceResult:
    marine = cells[cells["sea_fraction"] > 0]
    parts, prov_map, emod_files, gmrt_files = [], {}, [], []
    zones = marine_zones()
    for t in TERRITORIES:
        sel = marine[marine["territory"] == t.code]
        idx = pd.Index(sel["h3"])
        if t.code == "FXX":
            tiles = _tiles_for(sel)
            log.info("EMODnet: %d tiles", len(tiles))
            for lon0, lat0 in tiles:
                path = _emodnet_tile(lon0, lat0)
                emod_files.append(path)
                in_tile = sel[(np.floor(sel["lon"]) == lon0) & (np.floor(sel["lat"]) == lat0)]
                if len(in_tile):
                    parts.append(_reduce(path, pd.Index(in_tile["h3"]), zones[t.code]))
            prov_map[t.code] = "emodnet-bathymetry"
        else:
            path = _gmrt_territory(t.code, t.bbox)
            gmrt_files.append(path)
            parts.append(_reduce(path, idx, zones[t.code]))
            prov_map[t.code] = "gmrt"
    feats = pd.concat(parts)
    feats = feats[~feats.index.duplicated()]

    Provenance(
        id="emodnet-bathymetry",
        source_key="emodnet",
        name="EMODnet Digital Bathymetry (DTM)",
        url="https://emodnet.ec.europa.eu/en/bathymetry",
        license="CC BY 4.0",
        license_url="https://creativecommons.org/licenses/by/4.0/",
        citation="EMODnet Bathymetry Consortium (2022): EMODnet Digital Bathymetry (DTM 2022). "
        "https://doi.org/10.12770/ff3aff8a-cff1-44a3-a2c8-1910bf109f85",
        spatial_resolution="1/16 arc-minute native (~115 m), requested at ~230 m",
        variables=["elevation (mean), vertical datum LAT where available"],
        access_method="OGC WCS 2.0.1 (coverage emodnet__mean, SCALEFACTOR 0.5), 1° tiles",
        raw_path=str(_raw() / "emodnet"),
        checksum=sha256_of(emod_files),
        record_count=len(emod_files),
    ).save()
    Provenance(
        id="gmrt",
        source_key="gmrt",
        name="Global Multi-Resolution Topography (GMRT) synthesis",
        url="https://www.gmrt.org/",
        license="CC BY 4.0",
        license_url="https://creativecommons.org/licenses/by/4.0/",
        citation="Ryan, W.B.F. et al. (2009). Global Multi-Resolution Topography synthesis. "
        "Geochem. Geophys. Geosyst. 10, Q03014. https://doi.org/10.1029/2008GC002332",
        spatial_resolution="'high' GridServer resolution (~100-400 m depending on survey coverage)",
        variables=["elevation"],
        access_method="GMRT GridServer REST (GeoTIFF per territory bounding box)",
        raw_path=str(_raw() / "gmrt"),
        checksum=sha256_of(gmrt_files),
        record_count=len(gmrt_files),
        notes="Used for the DROM, which EMODnet does not cover.",
    ).save()
    keys = ("depth_mean", "shallow_frac", "intertidal_frac")
    return SourceResult("bathymetry", feats, dict.fromkeys(keys, prov_map))
