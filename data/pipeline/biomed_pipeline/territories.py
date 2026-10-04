"""The six territories in scope and their identifiers in the boundary datasets."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Territory:
    code: str  # ISO-like code used throughout the database
    name: str
    kind: str  # "metropole" | "drom"
    ne_gu_a3: str  # Natural Earth admin_0_map_units GU_A3
    mr_iso_ter: str | None  # Marine Regions eez_12nm iso_ter1 (None: not published)
    utm_epsg: int  # local metric CRS for buffers / areas
    bbox: tuple[float, float, float, float]  # lon_min, lat_min, lon_max, lat_max (incl. 12 nm)


TERRITORIES: tuple[Territory, ...] = (
    Territory(
        "FXX", "France métropolitaine", "metropole", "FXX", "FRA", 2154, (-6.0, 41.0, 10.0, 51.6)
    ),
    Territory("GLP", "Guadeloupe", "drom", "GLP", "GLP", 32620, (-62.0, 15.6, -60.8, 16.8)),
    Territory("MTQ", "Martinique", "drom", "MTQ", "MTQ", 32620, (-61.5, 14.1, -60.5, 15.2)),
    Territory("GUF", "Guyane", "drom", "GUF", "GUF", 32622, (-54.8, 2.0, -51.2, 6.3)),
    Territory("REU", "La Réunion", "drom", "REU", "REU", 32740, (54.9, -21.7, 56.1, -20.5)),
    Territory("MYT", "Mayotte", "drom", "MYT", None, 32738, (44.7, -13.3, 45.6, -12.4)),
)

BY_CODE = {t.code: t for t in TERRITORIES}

# 12 nautical miles in metres.
TWELVE_NM_M = 12 * 1852.0
