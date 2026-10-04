"""H3 grid over land + 12 nm territorial sea for each territory (ADR-0004).

Features are computed at resolution 7 (~5.2 km²) and aggregated to resolution 6 (~36 km²)
by averaging children, so both resolutions share one definition.
"""

from __future__ import annotations

import logging

import geopandas as gpd
import h3
import numpy as np
import pandas as pd
import shapely
from shapely.geometry import Polygon

from .settings import get_settings
from .sources import marineregions, naturalearth
from .territories import TERRITORIES

log = logging.getLogger(__name__)

FINE_RES = 7
COARSE_RES = 6
EQUAL_AREA = 6933  # WGS 84 / NSIDC EASE-Grid 2.0 Global (equal area)


def _cell_polygon(cell: str) -> Polygon:
    # h3 returns (lat, lng); shapely wants (x=lng, y=lat).
    return Polygon([(lng, lat) for lat, lng in h3.cell_to_boundary(cell)])


def _fraction(cells_geom: np.ndarray, target, cell_area: np.ndarray) -> np.ndarray:
    """Share of each cell's area covered by `target` (computed in an equal-area CRS)."""
    prepared = shapely.prepare(target) or target
    inside = shapely.contains(prepared, cells_geom)
    touches = shapely.intersects(prepared, cells_geom) & ~inside
    frac = inside.astype(float)
    if touches.any():
        inter = shapely.intersection(cells_geom[touches], target)
        frac[touches] = shapely.area(inter) / cell_area[touches]
    return np.clip(frac, 0.0, 1.0)


def build_fine_grid() -> pd.DataFrame:
    land = naturalearth.load_land().set_index("territory")
    sea = marineregions.load_territorial_sea().set_index("territory")
    frames = []
    for t in TERRITORIES:
        land_geom = land.loc[t.code, "geometry"]
        sea_geom = shapely.difference(sea.loc[t.code, "geometry"], land_geom)
        zone = shapely.union(land_geom, sea_geom)
        cells = sorted(h3.geo_to_cells(zone, FINE_RES))
        polys = gpd.GeoSeries([_cell_polygon(c) for c in cells], crs=4326)
        ea = polys.to_crs(EQUAL_AREA).values._data  # shapely array
        cell_area = shapely.area(ea)
        land_ea = gpd.GeoSeries([land_geom], crs=4326).to_crs(EQUAL_AREA).iloc[0]
        sea_ea = gpd.GeoSeries([sea_geom], crs=4326).to_crs(EQUAL_AREA).iloc[0]
        land_frac = _fraction(ea, land_ea, cell_area)
        sea_frac = _fraction(ea, sea_ea, cell_area)
        latlng = np.array([h3.cell_to_latlng(c) for c in cells])
        frames.append(
            pd.DataFrame(
                {
                    "h3": cells,
                    "resolution": FINE_RES,
                    "parent_h3": [h3.cell_to_parent(c, COARSE_RES) for c in cells],
                    "territory": t.code,
                    "lat": latlng[:, 0],
                    "lon": latlng[:, 1],
                    "area_km2": cell_area / 1e6,
                    "land_fraction": land_frac,
                    "sea_fraction": sea_frac,
                }
            )
        )
        log.info("%s: %d cells at res %d", t.code, len(cells), FINE_RES)
    df = pd.concat(frames, ignore_index=True)
    # A cell on a shared boundary could appear twice only across territories, which are far
    # apart; guard anyway.
    return df.drop_duplicates("h3").reset_index(drop=True)


def build_coarse_grid(fine: pd.DataFrame) -> pd.DataFrame:
    g = fine.groupby("parent_h3")
    coarse = pd.DataFrame(
        {
            "territory": g["territory"].agg(lambda s: s.mode().iat[0]),
            "n_children": g.size(),
            # Missing children lie outside the zone: count them as neither land nor sea.
            "land_fraction": g["land_fraction"].sum() / 7.0,
            "sea_fraction": g["sea_fraction"].sum() / 7.0,
        }
    ).reset_index(names="h3")
    latlng = np.array([h3.cell_to_latlng(c) for c in coarse["h3"]])
    coarse["lat"], coarse["lon"] = latlng[:, 0], latlng[:, 1]
    coarse["area_km2"] = [h3.cell_area(c, unit="km^2") for c in coarse["h3"]]
    coarse["resolution"] = COARSE_RES
    coarse["parent_h3"] = None
    return coarse[fine.columns.tolist() + ["n_children"]]


def grid_dir():
    return get_settings().clean_dir / "grid"


def build() -> tuple[pd.DataFrame, pd.DataFrame]:
    fine = build_fine_grid()
    coarse = build_coarse_grid(fine)
    out = grid_dir()
    out.mkdir(parents=True, exist_ok=True)
    fine.to_parquet(out / f"cells_r{FINE_RES}.parquet", index=False)
    coarse.to_parquet(out / f"cells_r{COARSE_RES}.parquet", index=False)
    return fine, coarse


def load(resolution: int = FINE_RES) -> pd.DataFrame:
    return pd.read_parquet(grid_dir() / f"cells_r{resolution}.parquet")
