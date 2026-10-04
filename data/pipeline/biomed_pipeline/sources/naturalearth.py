"""Natural Earth 10m: land boundaries per territory, ports and populated places.

Public domain. https://www.naturalearthdata.com/
"""

from __future__ import annotations

import geopandas as gpd

from ..http import download
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES

BASE = "https://naciscdn.org/naturalearth/10m"
FILES = {
    "map_units": "cultural/ne_10m_admin_0_map_units.zip",
    "ports": "cultural/ne_10m_ports.zip",
    "places": "cultural/ne_10m_populated_places_simple.zip",
}
PROVENANCE_ID = "naturalearth-10m"


def raw_dir():
    return get_settings().raw_dir / "naturalearth"


def clean_dir():
    return get_settings().clean_dir / "naturalearth"


def ingest() -> Provenance:
    paths = [download(f"{BASE}/{rel}", raw_dir() / rel.split("/")[-1]) for rel in FILES.values()]
    out = clean_dir()
    out.mkdir(parents=True, exist_ok=True)

    mu = gpd.read_file(f"zip://{raw_dir() / 'ne_10m_admin_0_map_units.zip'}")
    codes = {t.ne_gu_a3: t.code for t in TERRITORIES}
    land = mu[mu["GU_A3"].isin(codes)].copy()
    land["territory"] = land["GU_A3"].map(codes)
    land = land[["territory", "geometry"]].dissolve("territory").reset_index()
    land.to_parquet(out / "land.parquet")

    ports = gpd.read_file(f"zip://{raw_dir() / 'ne_10m_ports.zip'}")[["name", "geometry"]]
    ports.to_parquet(out / "ports.parquet")
    places = gpd.read_file(f"zip://{raw_dir() / 'ne_10m_populated_places_simple.zip'}")
    places = places[["name", "pop_max", "adm0name", "geometry"]]
    places.to_parquet(out / "places.parquet")

    prov = Provenance(
        id=PROVENANCE_ID,
        source_key="naturalearth",
        name="Natural Earth 10m (admin 0 map units, ports, populated places)",
        url="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/",
        license="Public domain",
        license_url="https://www.naturalearthdata.com/about/terms-of-use/",
        citation="Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.",
        spatial_resolution="1:10,000,000",
        variables=["land boundaries", "ports", "populated places"],
        access_method="HTTPS download (naciscdn.org)",
        raw_path=str(raw_dir()),
        checksum=sha256_of(paths),
        record_count=len(land) + len(ports) + len(places),
    )
    prov.save()
    return prov


def load_land() -> gpd.GeoDataFrame:
    return gpd.read_parquet(clean_dir() / "land.parquet")


def load_ports() -> gpd.GeoDataFrame:
    return gpd.read_parquet(clean_dir() / "ports.parquet")


def load_places() -> gpd.GeoDataFrame:
    return gpd.read_parquet(clean_dir() / "places.parquet")
