"""Copernicus DEM GLO-90 — land elevation.

Public COG tiles on the AWS Open Data registry (no key). Each 1°x1° tile is read at a 4x
decimated overview (~360 m), saved to raw/ and averaged per H3 cell.
Licence: © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under
COPERNICUS by the European Union and ESA; free of charge, attribution required.
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor

import numpy as np
import pandas as pd
import rasterio
from rasterio.enums import Resampling

from ..aggregate import zonal_stats
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult
from .bathymetry import _tiles_for

log = logging.getLogger(__name__)

BUCKET = "https://copernicus-dem-90m.s3.amazonaws.com"
DECIMATION = 4
PROVENANCE_ID = "copernicus-dem-glo90"


def tile_name(lon0: int, lat0: int) -> str:
    ns = f"N{lat0:02d}" if lat0 >= 0 else f"S{-lat0:02d}"
    ew = f"E{lon0:03d}" if lon0 >= 0 else f"W{-lon0:03d}"
    return f"Copernicus_DSM_COG_30_{ns}_00_{ew}_00_DEM"


def _raw():
    d = get_settings().raw_dir / "copernicus_dem"
    d.mkdir(parents=True, exist_ok=True)
    return d


def fetch_tile(lon0: int, lat0: int):
    """Decimated local copy of one tile, or None where the tile does not exist (open sea)."""
    name = tile_name(lon0, lat0)
    dest = _raw() / f"{name}_x{DECIMATION}.tif"
    missing = dest.with_suffix(".missing")
    if dest.exists():
        return dest
    if missing.exists():
        return None
    url = f"/vsicurl/{BUCKET}/{name}/{name}.tif"
    try:
        with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR"), rasterio.open(url) as src:
            h, w = src.height // DECIMATION, src.width // DECIMATION
            data = src.read(1, out_shape=(h, w), resampling=Resampling.average)
            transform = src.transform * src.transform.scale(src.width / w, src.height / h)
            profile = src.profile | {
                "height": h,
                "width": w,
                "transform": transform,
                "driver": "GTiff",
                "compress": "deflate",
                "tiled": False,
            }
            profile.pop("blockxsize", None)
            profile.pop("blockysize", None)
    except rasterio.errors.RasterioIOError:
        missing.touch()
        return None
    with rasterio.open(dest, "w", **profile) as dst:
        dst.write(data, 1)
    return dest


def ingest(cells: pd.DataFrame) -> SourceResult:
    land = cells[cells["land_fraction"] > 0]
    parts, files = [], []
    for t in TERRITORIES:
        sel = land[land["territory"] == t.code]
        tiles = _tiles_for(sel)
        log.info("%s: %d DEM tiles", t.code, len(tiles))
        with ThreadPoolExecutor(8) as pool:
            paths = list(pool.map(lambda xy: fetch_tile(*xy), tiles))
        for (lon0, lat0), path in zip(tiles, paths, strict=True):
            if path is None:
                continue
            files.append(path)
            in_tile = sel[(np.floor(sel["lon"]) == lon0) & (np.floor(sel["lat"]) == lat0)]
            if len(in_tile) == 0:
                continue
            with rasterio.open(path) as r:
                arr, tr = r.read(1), r.transform
            z = zonal_stats(
                arr, tr, pd.Index(in_tile["h3"]), reducers={"elev_mean": "mean", "elev_std": "std"}
            )
            parts.append(z[["elev_mean", "elev_std"]])
    feats = pd.concat(parts)
    feats = feats[~feats.index.duplicated()]

    Provenance(
        id=PROVENANCE_ID,
        source_key="copernicus_dem",
        name="Copernicus DEM GLO-90",
        url="https://registry.opendata.aws/copernicus-dem/",
        license="Copernicus DEM licence (free of charge, attribution required)",
        license_url="https://spacedata.copernicus.eu/documents/20123/121286/CSCDA_ESA_Mission-specific+Annex_31_Oct_22.pdf",
        citation="© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided "
        "under COPERNICUS by the European Union and ESA; all rights reserved. "
        "https://doi.org/10.5270/ESA-c5d3d65",
        spatial_resolution="3 arc-second (~90 m) native, read at 4x decimated overview (~360 m)",
        temporal_coverage="2011-2015 acquisitions (TanDEM-X)",
        variables=["elevation (mean, std)"],
        access_method="Cloud-optimised GeoTIFF over HTTPS (AWS Open Data, no key)",
        raw_path=str(_raw()),
        checksum=sha256_of(files),
        record_count=len(files),
    ).save()
    return SourceResult(
        "copernicus_dem", feats, {"elev_mean": PROVENANCE_ID, "elev_std": PROVENANCE_ID}
    )
