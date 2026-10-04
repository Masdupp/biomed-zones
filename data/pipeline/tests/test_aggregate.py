import h3
import numpy as np
import pandas as pd
from rasterio.transform import from_origin

from biomed_pipeline.aggregate import nearest_valid, zonal_stats


def test_nearest_valid_skips_masked_nodes_and_respects_max_distance():
    lat = np.array([0.0, 1.0])
    lon = np.array([0.0, 1.0])
    values = np.array([[np.nan, 5.0], [7.0, np.nan]])
    out, dist = nearest_valid(lat, lon, values, np.array([0.0, 0.0]), np.array([0.1, 50.0]), 200)
    assert out[0] in (5.0, 7.0)  # equidistant valid neighbours; masked node never used
    assert np.isnan(out[1])  # 50 degrees away: beyond max_km
    assert dist[1] > 200


def test_nearest_valid_carries_leading_dimensions():
    lat, lon = np.array([0.0, 1.0]), np.array([0.0, 1.0])
    stack = np.stack([np.full((2, 2), 1.0), np.full((2, 2), 2.0)])
    out, _ = nearest_valid(lat, lon, stack, np.array([0.5]), np.array([0.5]), 500)
    assert out.shape == (2, 1)
    assert out[:, 0].tolist() == [1.0, 2.0]


def test_zonal_stats_means_pixels_inside_cell():
    cell = h3.latlng_to_cell(45.0, 5.0, 7)
    # 0.005 deg pixels around the cell; constant value 10 except a nodata hole.
    transform = from_origin(4.95, 45.05, 0.005, 0.005)
    arr = np.full((20, 20), 10.0)
    arr[0, 0] = -9999
    out = zonal_stats(arr, transform, pd.Index([cell]), nodata=-9999)
    assert out.loc[cell, "mean"] == 10.0
    assert out.loc[cell, "n_pixels"] > 0


def test_zonal_stats_point_fallback_for_cells_smaller_than_pixels():
    cell = h3.latlng_to_cell(45.0, 5.0, 7)
    transform = from_origin(4.6, 45.6, 1.0, 1.0)  # pixel (0, 0) holds the cell centroid
    arr = np.array([[3.0, 4.0], [5.0, 6.0]])
    out = zonal_stats(arr, transform, pd.Index([cell]))
    assert out.loc[cell, "mean"] == 3.0
    assert out.loc[cell, "n_pixels"] == 0
