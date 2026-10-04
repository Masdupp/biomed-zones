"""Offline vector basemap for the web app (apps/web/public/basemap/*.geojson).

No tile server is needed, so the demo map works without internet:
  land.geojson         Natural Earth 10m land, clipped around the six territories, simplified
  borders.geojson      country boundaries (Natural Earth 10m map units) in the same windows
  territories.geojson  study-area outlines (land ∪ 12 nm sea ∪ internal waters), simplified
  world.geojson        Natural Earth 110m land, for world occurrence maps
"""

from __future__ import annotations

import json

import geopandas as gpd
import shapely
from shapely.geometry import box

from .http import download
from .settings import REPO_ROOT, get_settings
from .territories import TERRITORIES

OUT = REPO_ROOT / "apps" / "web" / "public" / "basemap"
WINDOWS = [
    box(-12, 35, 20, 56),
    box(-64, 13, -59, 18.5),
    box(-57, 1, -49, 7.5),
    box(43.5, -22.5, 57, -11.5),
]


def _write(gdf: gpd.GeoDataFrame, name: str, tolerance: float, precision: int = 3) -> int:
    gdf = gdf.copy()
    gdf["geometry"] = shapely.set_precision(gdf.geometry.simplify(tolerance).values, 10**-precision)
    gdf = gdf[~gdf.geometry.is_empty]
    OUT.mkdir(parents=True, exist_ok=True)
    data = json.loads(gdf.to_json(drop_id=True))
    path = OUT / f"{name}.geojson"
    path.write_text(json.dumps(data, separators=(",", ":")))
    return path.stat().st_size


def build() -> dict[str, int]:
    from .load import territory_geometries

    raw = get_settings().raw_dir / "naturalearth"
    land10 = download(
        "https://naciscdn.org/naturalearth/10m/physical/ne_10m_land.zip", raw / "ne_10m_land.zip"
    )
    land110 = download(
        "https://naciscdn.org/naturalearth/110m/physical/ne_110m_land.zip", raw / "ne_110m_land.zip"
    )
    units = gpd.read_file(f"zip://{raw / 'ne_10m_admin_0_map_units.zip'}")
    windows = gpd.GeoSeries(WINDOWS, crs=4326)

    land = gpd.read_file(f"zip://{land10}")[["geometry"]]
    land = gpd.clip(land, windows.union_all())
    borders = gpd.GeoDataFrame(geometry=units.boundary, crs=4326)
    borders = gpd.clip(borders, windows.union_all())
    terr = territory_geometries()[["code", "name", "geometry"]]
    world = gpd.read_file(f"zip://{land110}")[["geometry"]]
    sizes = {
        "land": _write(land, "land", 0.01),
        "borders": _write(borders, "borders", 0.01),
        "territories": _write(terr, "territories", 0.005),
        "world": _write(world, "world", 0.05, 2),
    }
    meta = {
        "territories": [{"code": t.code, "name": t.name, "bbox": t.bbox} for t in TERRITORIES],
        "attribution": "Natural Earth (public domain); Marine Regions (CC BY 4.0)",
    }
    (OUT / "meta.json").write_text(json.dumps(meta, indent=1))
    return sizes
