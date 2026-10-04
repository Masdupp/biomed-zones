"""Spatial aggregation of gridded data onto the H3 grid.

Two strategies, chosen per source:

* ``zonal_stats``: high-resolution rasters (DEM, bathymetry, soil, land cover). Every pixel
  centre is assigned to its resolution-7 H3 cell and pixel values are averaged per cell.
  Cells smaller than a pixel fall back to the value at the cell centroid.
* ``nearest_valid``: coarse model grids (ocean models, climate grids). Each cell takes the value
  of the nearest grid node that has data, within ``max_km``. This fills coastal cells that
  fall on land-masked ocean pixels (and vice versa) without inventing values far from data.
"""

from __future__ import annotations

from collections.abc import Callable

import h3
import numpy as np
import pandas as pd
from scipy.spatial import cKDTree

EARTH_RADIUS_KM = 6371.0088


def _to_xyz(lat: np.ndarray, lon: np.ndarray) -> np.ndarray:
    la, lo = np.radians(lat), np.radians(lon)
    return np.column_stack((np.cos(la) * np.cos(lo), np.cos(la) * np.sin(lo), np.sin(la)))


def chord_to_km(chord: np.ndarray) -> np.ndarray:
    return 2 * EARTH_RADIUS_KM * np.arcsin(np.clip(chord / 2, 0, 1))


def nearest_valid(
    grid_lat: np.ndarray,
    grid_lon: np.ndarray,
    values: np.ndarray,
    cell_lat: np.ndarray,
    cell_lon: np.ndarray,
    max_km: float,
) -> tuple[np.ndarray, np.ndarray]:
    """Value of the nearest non-NaN grid node for each cell, NaN beyond ``max_km``.

    ``grid_lat``/``grid_lon`` are 1-D axes of a regular grid; ``values`` has shape
    (..., len(grid_lat), len(grid_lon)) and leading dims are carried through.
    Returns (values with shape (..., n_cells), distance_km).
    """
    lon2d, lat2d = np.meshgrid(grid_lon, grid_lat)
    valid = ~np.isnan(values.reshape(-1, *lon2d.shape)).any(axis=0)
    if not valid.any():
        shape = (*values.shape[:-2], len(cell_lat))
        return np.full(shape, np.nan), np.full(len(cell_lat), np.inf)
    tree = cKDTree(_to_xyz(lat2d[valid], lon2d[valid]))
    chord, idx = tree.query(_to_xyz(cell_lat, cell_lon))
    dist_km = chord_to_km(chord)
    flat = values.reshape(*values.shape[:-2], -1)[..., valid.ravel()]
    out = flat[..., idx].astype(float)
    out[..., dist_km > max_km] = np.nan
    return out, dist_km


def pixel_centres(transform, width: int, height: int) -> tuple[np.ndarray, np.ndarray]:
    """Lat/lon of pixel centres for a north-up affine transform (rasterio.Affine)."""
    xs = transform.c + transform.a * (np.arange(width) + 0.5)
    ys = transform.f + transform.e * (np.arange(height) + 0.5)
    return ys, xs


def cells_for_points(lat: np.ndarray, lon: np.ndarray, res: int) -> np.ndarray:
    f = h3.latlng_to_cell
    return np.fromiter(
        (f(a, b, res) for a, b in zip(lat, lon, strict=True)), dtype=object, count=len(lat)
    )


def zonal_stats(
    array: np.ndarray,
    transform,
    cells: pd.Index,
    res: int = 7,
    nodata: float | None = None,
    reducers: dict[str, Callable | str] | None = None,
    point_fallback: bool = True,
) -> pd.DataFrame:
    """Aggregate a 2-D raster (EPSG:4326) onto H3 cells in ``cells``.

    Returns a frame indexed by h3 with one column per reducer plus ``n_pixels``.
    """
    reducers = reducers or {"mean": "mean"}
    lat_axis, lon_axis = pixel_centres(transform, array.shape[1], array.shape[0])
    data = array.astype(float)
    if nodata is not None:
        data[data == nodata] = np.nan
    lon2d, lat2d = np.meshgrid(lon_axis, lat_axis)
    ok = ~np.isnan(data)
    lat_v, lon_v, val_v = lat2d[ok], lon2d[ok], data[ok]
    # Restrict to pixels near the requested cells' extent before the (slow) H3 lookup.
    ids = cells_for_points(lat_v, lon_v, res)
    df = pd.DataFrame({"h3": ids, "v": val_v})
    df = df[df["h3"].isin(cells)]
    g = df.groupby("h3")["v"]
    out = g.agg(list(reducers.values()))
    out.columns = list(reducers.keys())
    out["n_pixels"] = g.size()

    if point_fallback:
        missing = cells.difference(out.index)
        if len(missing):
            latlng = np.array([h3.cell_to_latlng(c) for c in missing])
            col = np.floor((latlng[:, 1] - transform.c) / transform.a).astype(int)
            row = np.floor((latlng[:, 0] - transform.f) / transform.e).astype(int)
            inside = (row >= 0) & (row < data.shape[0]) & (col >= 0) & (col < data.shape[1])
            vals = np.full(len(missing), np.nan)
            vals[inside] = data[row[inside], col[inside]]
            fb = pd.DataFrame({k: vals for k in reducers}, index=missing)
            fb["n_pixels"] = 0
            fb = fb.dropna(subset=[next(iter(reducers))])
            out = pd.concat([out, fb])
    out.index.name = "h3"
    return out
