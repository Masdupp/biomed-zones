"""Human-pressure proxies: distance to ports and to towns.

Used mainly at sea, where no land-cover equivalent exists; also computed on land.

Ports: NGA World Port Index, Pub. 150 (public domain, US Government; ~3,800 ports). Natural
Earth's port layer was tried first but lacks e.g. Le Port (Réunion) and Longoni/Dzaoudzi
(Mayotte). Towns: Natural Earth populated places with pop_max >= 20,000 (the 50,000 threshold
left Mayotte without any town).

Features:
  dist_port_km   great-circle distance from the cell centroid to the nearest WPI port
  dist_town_km   distance to the nearest populated place with pop_max >= 20,000
"""

from __future__ import annotations

import numpy as np
import pandas as pd
from scipy.spatial import cKDTree

from ..aggregate import _to_xyz, chord_to_km
from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from .base import SourceResult
from .naturalearth import PROVENANCE_ID as NE_PROVENANCE_ID
from .naturalearth import load_places

WPI_URL = "https://msi.nga.mil/api/publications/download?type=view&key=16920959/SFH00000/UpdatedPub150.csv"
WPI_PROVENANCE_ID = "nga-world-port-index"
TOWN_MIN_POP = 20_000


def nearest_km(lat: np.ndarray, lon: np.ndarray, plat: np.ndarray, plon: np.ndarray) -> np.ndarray:
    chord, _ = cKDTree(_to_xyz(plat, plon)).query(_to_xyz(lat, lon))
    return chord_to_km(chord)


def load_ports() -> pd.DataFrame:
    raw = download(WPI_URL, get_settings().raw_dir / "wpi" / "UpdatedPub150.csv")
    wpi = pd.read_csv(raw, encoding="utf-8-sig")
    ports = wpi[["Main Port Name", "Country Code", "Latitude", "Longitude"]].dropna()
    out = get_settings().clean_dir / "wpi"
    out.mkdir(parents=True, exist_ok=True)
    ports.to_parquet(out / "ports.parquet", index=False)
    Provenance(
        id=WPI_PROVENANCE_ID,
        source_key="wpi",
        name="World Port Index (Pub. 150)",
        url="https://msi.nga.mil/Publications/WPI",
        license="Public domain (US Government work)",
        citation="National Geospatial-Intelligence Agency. World Port Index, Pub. 150.",
        spatial_resolution="point locations",
        variables=["port locations"],
        access_method="HTTPS CSV download (msi.nga.mil)",
        raw_path=str(raw),
        checksum=sha256_of([raw]),
        record_count=len(ports),
    ).save()
    return ports


def ingest(cells: pd.DataFrame) -> SourceResult:
    ports = load_ports()
    places = load_places()
    towns = places[places["pop_max"] >= TOWN_MIN_POP]
    lat, lon = cells["lat"].to_numpy(), cells["lon"].to_numpy()
    out = pd.DataFrame(
        {
            "dist_port_km": nearest_km(
                lat, lon, ports["Latitude"].to_numpy(), ports["Longitude"].to_numpy()
            ),
            "dist_town_km": nearest_km(lat, lon, towns.geometry.y.values, towns.geometry.x.values),
        },
        index=pd.Index(cells["h3"], name="h3"),
    )
    return SourceResult(
        "pressure", out, {"dist_port_km": WPI_PROVENANCE_ID, "dist_town_km": NE_PROVENANCE_ID}
    )
