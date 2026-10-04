"""Marine Regions (VLIZ) 12 nm territorial seas and internal waters.

The 12 nm layer starts at the legal baselines, so waters landward of them (enclosed bays such
as the Baie du Mont-Saint-Michel, the Golfe du Morbihan or the Arcachon basin) are a separate
"internal waters" layer. The marine zone in scope is the union of both.

CC BY 4.0. Flanders Marine Institute (2023). Maritime Boundaries Geodatabase, version 12.
Mayotte is not published in the 12 nm layer (sovereignty disputed with the Comoros); its limit
is derived by buffering the Natural Earth coastline by 12 nm and labelled as derived.
"""

from __future__ import annotations

import json

import geopandas as gpd
import pandas as pd

from ..http import get_session
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES, TWELVE_NM_M
from . import naturalearth

WFS = "https://geo.vliz.be/geoserver/MarineRegions/wfs"
PROVENANCE_ID = "marineregions-12nm"
DERIVED_PROVENANCE_ID = "derived-12nm-buffer"


LAYERS = ("eez_12nm", "eez_internal_waters")


def _fetch(layer: str):
    raw = get_settings().raw_dir / "marineregions" / f"{layer}_france.geojson"
    raw.parent.mkdir(parents=True, exist_ok=True)
    if not raw.exists():
        r = get_session().get(
            WFS,
            params={
                "service": "WFS",
                "version": "1.1.0",
                "request": "GetFeature",
                "typeName": f"MarineRegions:{layer}",
                "outputFormat": "application/json",
                "srsName": "EPSG:4326",
                "CQL_FILTER": "sovereign1='France'",
            },
            timeout=300,
        )
        r.raise_for_status()
        raw.write_text(json.dumps(r.json()))
    return raw


def ingest() -> list[Provenance]:
    raws = [_fetch(layer) for layer in LAYERS]
    gdf = gpd.GeoDataFrame(pd.concat([gpd.read_file(p) for p in raws], ignore_index=True))
    parts = []
    for t in TERRITORIES:
        if t.mr_iso_ter is None:
            continue
        sel = gdf[gdf["iso_ter1"] == t.mr_iso_ter]
        parts.append(
            gpd.GeoDataFrame({"territory": [t.code]}, geometry=[sel.union_all()], crs=4326)
        )
        parts[-1]["provenance_id"] = PROVENANCE_ID

    # Derived limits for territories absent from the layer.
    land = naturalearth.load_land().set_index("territory")
    for t in TERRITORIES:
        if t.mr_iso_ter is not None:
            continue
        geom = gpd.GeoSeries([land.loc[t.code, "geometry"]], crs=4326).to_crs(t.utm_epsg)
        buffered = geom.buffer(TWELVE_NM_M).to_crs(4326).iloc[0]
        parts.append(
            gpd.GeoDataFrame(
                {"territory": [t.code], "provenance_id": [DERIVED_PROVENANCE_ID]},
                geometry=[buffered],
                crs=4326,
            )
        )

    seas = gpd.GeoDataFrame(pd.concat(parts, ignore_index=True), crs=4326)
    out = get_settings().clean_dir / "marineregions"
    out.mkdir(parents=True, exist_ok=True)
    seas.to_parquet(out / "territorial_sea.parquet")

    provs = [
        Provenance(
            id=PROVENANCE_ID,
            source_key="marineregions",
            name="Marine Regions — territorial seas (12 NM) and internal waters",
            url="https://www.marineregions.org/downloads.php",
            license="CC BY 4.0",
            license_url="https://creativecommons.org/licenses/by/4.0/",
            citation="Flanders Marine Institute (2023). Maritime Boundaries Geodatabase: "
            "Territorial Seas (12NM), version 4 (https://doi.org/10.14284/632) and Internal "
            "Waters, version 4 (https://doi.org/10.14284/631).",
            spatial_resolution="vector",
            variables=["12 nm territorial sea", "internal waters"],
            access_method="OGC WFS geo.vliz.be (MarineRegions:eez_12nm, eez_internal_waters)",
            raw_path=str(raws[0].parent),
            checksum=sha256_of(raws),
            record_count=int((seas["provenance_id"] == PROVENANCE_ID).sum()),
        ),
        Provenance(
            id=DERIVED_PROVENANCE_ID,
            source_key="derived",
            name="12 nm buffer of Natural Earth coastline (Mayotte)",
            url="https://www.naturalearthdata.com/",
            license="Public domain (derived from Natural Earth)",
            spatial_resolution="vector, 1:10M coastline",
            variables=["12 nm territorial sea limit (approximation)"],
            access_method="Computed: buffer 22,224 m in UTM 38S",
            mode="derived",
            notes="Mayotte is absent from the Marine Regions 12 nm layer (sovereignty disputed "
            "with the Comoros). A coastline buffer ignores straight baselines, so it slightly "
            "underestimates the legal limit in bays.",
        ),
    ]
    for p in provs:
        p.save()
    return provs


def load_territorial_sea() -> gpd.GeoDataFrame:
    return gpd.read_parquet(get_settings().clean_dir / "marineregions" / "territorial_sea.parquet")
