"""Corine Land Cover 2018 — human footprint on land.

EEA / Copernicus Land Monitoring Service, CLC2018 (100 m raster, Metropole and the five DROM).
The EEA discomap MapServer exposes the raster through `export`; tiles are requested as PNG in
EPSG:4326 and decoded back to CLC codes using the service legend (one colour per class, nearest
neighbour rendering). The decoder reports the share of pixels that match a legend colour; it is
stored in the provenance notes (expected: 100 %).

CLC's French Guiana edition only maps the coastal strip. Guyane cells without CLC data use
ESA WorldCover 2021 v200 (10 m, CC BY 4.0, AWS Open Data) read at a 20x decimated overview with
nearest-neighbour resampling; provenance is recorded per cell.

Features (share of classified pixels in the cell, sea / open water excluded):
  artificial_frac   CLC 1xx artificial surfaces
  agri_frac         CLC 2xx agricultural areas
  natural_frac      CLC 3xx-4xx forests, semi-natural areas and wetlands
"""

from __future__ import annotations

import base64
import logging

import numpy as np
import pandas as pd
from rasterio.io import MemoryFile
from rasterio.transform import from_bounds

from ..aggregate import zonal_stats
from ..http import download, get_json
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult
from .bathymetry import _tiles_for

log = logging.getLogger(__name__)

SERVICE = "https://image.discomap.eea.europa.eu/arcgis/rest/services/Corine/CLC2018_WM/MapServer"
RES_DEG = 0.002
TILE_DEG = 1
# Raster layer per territory (Metropole = Europe-wide raster), and the vector layer whose legend
# carries "code: label" pairs.
RASTER_LAYER = {"FXX": 1, "REU": 9, "MYT": 10, "MTQ": 11, "GUF": 12, "GLP": 13}
VECTOR_LEGEND_LAYER = {"FXX": 0, "REU": 3, "MYT": 4, "MTQ": 5, "GUF": 6, "GLP": 7}
SEA = 523
PROVENANCE_ID = "corine-land-cover-2018"
WORLDCOVER_PROVENANCE_ID = "esa-worldcover-2021"
WORLDCOVER = "https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map"
WORLDCOVER_DECIMATION = 20
# WorldCover class → CLC level-1 group (1 artificial, 2 agricultural, 3 natural, 0 excluded).
WORLDCOVER_GROUP = {10: 3, 20: 3, 30: 3, 40: 2, 50: 1, 60: 3, 70: 3, 80: 0, 90: 3, 95: 3, 100: 3}


def _raw():
    d = get_settings().raw_dir / "landcover"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _png(content: bytes) -> np.ndarray:
    with MemoryFile(content) as m, m.open() as d:
        return np.moveaxis(d.read(), 0, -1)


def palettes() -> dict[int, dict[tuple[int, int, int], int]]:
    leg = get_json(f"{SERVICE}/legend", params={"f": "json"})
    by_layer = {x["layerId"]: x["legend"] for x in leg["layers"]}
    out = {}
    for code, raster in RASTER_LAYER.items():
        labels = {}
        for item in by_layer[VECTOR_LEGEND_LAYER[code]]:
            num, _, label = item["label"].partition(": ")
            labels[label] = int(num)
        pal = {}
        for item in by_layer[raster]:
            if item["label"] not in labels:
                continue  # NODATA swatch
            sw = _png(base64.b64decode(item["imageData"]))
            h, w = sw.shape[:2]
            pal[tuple(int(v) for v in sw[h // 2, w // 2, :3])] = labels[item["label"]]
        out[raster] = pal
    return out


def _export(layer: int, bbox: tuple[float, float, float, float], name: str):
    lon0, lat0, lon1, lat1 = bbox
    w, h = round((lon1 - lon0) / RES_DEG), round((lat1 - lat0) / RES_DEG)
    return (
        download(
            f"{SERVICE}/export",
            _raw() / f"{name}.png",
            params={
                "bbox": f"{lon0},{lat0},{lon1},{lat1}",
                "bboxSR": 4326,
                "imageSR": 4326,
                "size": f"{w},{h}",
                "format": "png32",
                "transparent": "true",
                "layers": f"show:{layer}",
                "f": "image",
            },
        ),
        w,
        h,
    )


def decode(path, pal: dict) -> tuple[np.ndarray, float]:
    im = _png(path.read_bytes())
    rgb = im[..., :3].astype(np.int32)
    key = (rgb[..., 0] << 16) | (rgb[..., 1] << 8) | rgb[..., 2]
    lut = {(r << 16) | (g << 8) | b: c for (r, g, b), c in pal.items()}
    codes = np.zeros(key.shape, dtype=np.int16)
    for k, c in lut.items():
        codes[key == k] = c
    opaque = im[..., 3] > 0
    matched = float((codes[opaque] > 0).mean()) if opaque.any() else 1.0
    codes[~opaque] = 0
    return codes, matched


def _group_fractions(group: np.ndarray, valid: np.ndarray, tr, idx: pd.Index) -> pd.DataFrame:
    cols = {}
    for feat, cond in (
        ("artificial_frac", group == 1),
        ("agri_frac", group == 2),
        ("natural_frac", group == 3),
    ):
        arr = np.where(valid, cond.astype(float), np.nan)
        cols[feat] = zonal_stats(arr, tr, idx, point_fallback=False)["mean"]
    return pd.DataFrame(cols)


def _worldcover_tile(lon0: int, lat0: int):
    import rasterio
    from rasterio.enums import Resampling

    ns = f"N{lat0:02d}" if lat0 >= 0 else f"S{-lat0:02d}"
    ew = f"E{lon0:03d}" if lon0 >= 0 else f"W{-lon0:03d}"
    name = f"ESA_WorldCover_10m_2021_v200_{ns}{ew}_Map"
    dest = _raw() / f"{name}_x{WORLDCOVER_DECIMATION}.tif"
    if not dest.exists():
        with rasterio.open(f"/vsicurl/{WORLDCOVER}/{name}.tif") as src:
            h, w = src.height // WORLDCOVER_DECIMATION, src.width // WORLDCOVER_DECIMATION
            data = src.read(1, out_shape=(h, w), resampling=Resampling.nearest)
            tr = src.transform * src.transform.scale(src.width / w, src.height / h)
            prof = {
                "driver": "GTiff",
                "height": h,
                "width": w,
                "count": 1,
                "dtype": "uint8",
                "crs": src.crs,
                "transform": tr,
                "compress": "deflate",
                "nodata": 0,
            }
        with rasterio.open(dest, "w", **prof) as dst:
            dst.write(data, 1)
    return dest


def worldcover_fractions(cells: pd.DataFrame) -> tuple[pd.DataFrame, list]:
    import rasterio

    tiles = sorted(
        {
            (int(np.floor(lo / 3) * 3), int(np.floor(la / 3) * 3))
            for lo, la in zip(cells["lon"], cells["lat"], strict=True)
        }
    )
    parts, files = [], []
    for lon0, lat0 in tiles:
        path = _worldcover_tile(lon0, lat0)
        files.append(path)
        with rasterio.open(path) as r:
            cls, tr = r.read(1), r.transform
        sel = cells[
            (cells["lon"] >= lon0)
            & (cells["lon"] < lon0 + 3)
            & (cells["lat"] >= lat0)
            & (cells["lat"] < lat0 + 3)
        ]
        if sel.empty:
            continue
        lut = np.zeros(256, dtype=np.int8)
        for k, g in WORLDCOVER_GROUP.items():
            lut[k] = g
        group = lut[cls]
        parts.append(_group_fractions(group, group > 0, tr, pd.Index(sel["h3"])))
    return pd.concat(parts), files


def ingest(cells: pd.DataFrame) -> SourceResult:
    land = cells[cells["land_fraction"] > 0]
    pals = palettes()
    parts, files, match = [], [], []
    for t in TERRITORIES:
        sel = land[land["territory"] == t.code]
        layer = RASTER_LAYER[t.code]
        if t.code == "FXX":
            boxes = [(x, y, x + TILE_DEG, y + TILE_DEG) for x, y in _tiles_for(sel)]
        else:
            lon0, lat0, lon1, lat1 = t.bbox
            boxes = [(lon0, lat0, lon1, lat1)]
        for box in boxes:
            name = f"clc2018_{t.code}_{box[1]:+.0f}_{box[0]:+.0f}"
            path, w, h = _export(layer, box, name)
            files.append(path)
            codes, m = decode(path, pals[layer])
            match.append(m)
            tr = from_bounds(*box, w, h)
            in_box = sel[
                (sel["lon"] >= box[0])
                & (sel["lon"] < box[2])
                & (sel["lat"] >= box[1])
                & (sel["lat"] < box[3])
            ]
            if in_box.empty:
                continue
            valid = (codes > 0) & (codes != SEA)
            group = np.minimum(codes // 100, 3)  # wetlands (4xx) count as natural
            parts.append(_group_fractions(group, valid, tr, pd.Index(in_box["h3"])))
        log.info("%s: %d tiles", t.code, len(boxes))
    feats = pd.concat(parts)
    feats = feats[~feats.index.duplicated()].dropna(how="all")
    feats["_prov_landcover"] = PROVENANCE_ID

    # Guyane interior: outside the CLC DOM coverage.
    guf = land[(land["territory"] == "GUF") & ~land["h3"].isin(feats.index)]
    wc, wc_files = worldcover_fractions(guf)
    wc["_prov_landcover"] = WORLDCOVER_PROVENANCE_ID
    feats = pd.concat([feats, wc])
    log.info("WorldCover filled %d Guyane cells", len(wc))

    Provenance(
        id=PROVENANCE_ID,
        source_key="corine",
        name="CORINE Land Cover 2018 (Metropole + French DOMs)",
        url="https://land.copernicus.eu/en/products/corine-land-cover/clc2018",
        license="Copernicus Land Monitoring Service data policy (free, attribution required)",
        license_url="https://land.copernicus.eu/en/data-policy",
        citation="European Union, Copernicus Land Monitoring Service 2018, European Environment "
        "Agency (EEA). CORINE Land Cover 2018. https://doi.org/10.2909/960998c1-1870-4e82-8051-6485205ebbac",
        spatial_resolution="100 m raster (25 ha MMU), exported at 0.002° (~200 m)",
        temporal_coverage="2017-2018 reference year",
        variables=["CLC level-1 classes → artificial / agricultural / natural shares"],
        access_method="EEA discomap ArcGIS MapServer export (PNG) decoded with the legend palette",
        raw_path=str(_raw()),
        checksum=sha256_of(files),
        record_count=len(files),
        notes=f"Legend colour match rate over opaque pixels: min {min(match):.4f}, "
        f"mean {np.mean(match):.4f}.",
    ).save()
    Provenance(
        id=WORLDCOVER_PROVENANCE_ID,
        source_key="worldcover",
        name="ESA WorldCover 10 m 2021 v200",
        url="https://esa-worldcover.org/",
        license="CC BY 4.0",
        license_url="https://creativecommons.org/licenses/by/4.0/",
        citation="Zanaga, D. et al. (2022). ESA WorldCover 10 m 2021 v200. "
        "https://doi.org/10.5281/zenodo.7254221",
        spatial_resolution="10 m native, read at 20x decimated overview (~200 m, nearest)",
        temporal_coverage="2021",
        variables=["land cover class → artificial / agricultural / natural shares"],
        access_method="Cloud-optimised GeoTIFF over HTTPS (AWS Open Data, no key)",
        raw_path=str(_raw()),
        checksum=sha256_of(wc_files),
        record_count=len(wc_files),
        notes="Used only for Guyane cells outside the CLC DOM coverage (coastal strip). "
        "WorldCover grassland is mapped to 'natural', whereas CLC separates pastures (2xx).",
    ).save()
    feats_keys = ["artificial_frac", "agri_frac", "natural_frac"]
    return SourceResult("landcover", feats, {f: "@_prov_landcover" for f in feats_keys})
