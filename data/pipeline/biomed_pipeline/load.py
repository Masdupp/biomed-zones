"""Load clean tables into PostGIS (schema owned by Prisma, ADR-0005).

Derived tables (cell, cell_feature, territory, occurrence) are truncated and reloaded with COPY.
Reference tables (provenance, feature_def, species) are upserted, so rows that later phases
reference (contributions, scores) are never deleted.
"""

from __future__ import annotations

import io
import json
import logging
from dataclasses import asdict
from datetime import UTC, datetime

import geopandas as gpd
import h3
import pandas as pd
import shapely
from shapely.geometry import MultiPolygon, Polygon

from .build import load_tables
from .db import connect
from .features import FEATURES
from .provenance import Provenance, load_all
from .settings import get_settings
from .species import SPECIES
from .territories import TERRITORIES

log = logging.getLogger(__name__)
CHUNK = 500_000


def territory_geometries() -> gpd.GeoDataFrame:
    from .sources import marineregions, naturalearth

    land = naturalearth.load_land().set_index("territory")
    sea = marineregions.load_territorial_sea().set_index("territory")
    rows = []
    for t in TERRITORIES:
        g = shapely.union(land.loc[t.code, "geometry"], sea.loc[t.code, "geometry"])
        g = shapely.make_valid(g)
        polys = [p for p in shapely.get_parts(g) if isinstance(p, Polygon)]
        rows.append(
            {"code": t.code, "name": t.name, "kind": t.kind, "geometry": MultiPolygon(polys)}
        )
    return gpd.GeoDataFrame(rows, crs=4326)


def _ewkb(geoms) -> list[str]:
    return [shapely.to_wkb(shapely.set_srid(g, 4326), hex=True, include_srid=True) for g in geoms]


def _copy_frame(cur, table: str, columns: list[str], df: pd.DataFrame) -> None:
    cols = ", ".join(f'"{c}"' for c in columns)
    with cur.copy(f"COPY \"{table}\" ({cols}) FROM STDIN WITH (FORMAT csv, NULL '')") as cp:
        for start in range(0, len(df), CHUNK):
            buf = io.StringIO()
            df.iloc[start : start + CHUNK].to_csv(buf, header=False, index=False)
            cp.write(buf.getvalue())


def _cells_frame(feats: pd.DataFrame) -> pd.DataFrame:
    geoms = [Polygon([(lng, lat) for lat, lng in h3.cell_to_boundary(c)]) for c in feats["h3"]]
    return pd.DataFrame(
        {
            "h3": feats["h3"],
            "resolution": feats["resolution"].astype(int),
            "parent_h3": feats["parent_h3"],
            "territory_code": feats["territory"],
            "lat": feats["lat"],
            "lon": feats["lon"],
            "area_km2": feats["area_km2"],
            "land_fraction": feats["land_fraction"],
            "sea_fraction": feats["sea_fraction"],
            "geom": _ewkb(geoms),
        }
    )


def _long_values(feats: pd.DataFrame, prov: pd.DataFrame) -> pd.DataFrame:
    keys = [f.key for f in FEATURES]
    # pandas >= 3 keeps NaN in stack(); drop explicitly (no value → no row).
    v = feats.set_index("h3")[keys].stack().dropna().rename("value")
    p = prov.set_index("h3")[keys].astype(object).stack().dropna().rename("provenance_id")
    long = pd.concat([v, p], axis=1, join="inner").reset_index()
    long.columns = ["h3", "feature_key", "value", "provenance_id"]
    missing = long["provenance_id"].isna().sum()
    if missing:
        raise ValueError(f"{missing} feature values without provenance")
    return long


def load_into_db(
    tables: dict[str, pd.DataFrame],
    provenance: list[Provenance],
    territories: gpd.GeoDataFrame,
    occurrences: pd.DataFrame,
    gbif_keys: dict[str, int],
    dataset_mode: str,
    snapshot_version: str | None = None,
) -> None:
    with connect() as conn, conn.cursor() as cur:
        # Scores reference cells and are invalid once the data change: they are reloaded from
        # the snapshot or recomputed by the ML service afterwards.
        cur.execute("TRUNCATE score, cell_feature, occurrence, cell, territory")

        for p in provenance:
            d = asdict(p)
            cur.execute(
                """INSERT INTO provenance (id, source_key, name, url, license, license_url,
                     citation, spatial_resolution, temporal_coverage, temporal_resolution,
                     variables, access_method, mode, retrieved_at, raw_path, checksum,
                     record_count, notes)
                   VALUES (%(id)s, %(source_key)s, %(name)s, %(url)s, %(license)s,
                     %(license_url)s, %(citation)s, %(spatial_resolution)s,
                     %(temporal_coverage)s, %(temporal_resolution)s, %(variables)s,
                     %(access_method)s, %(mode)s, %(retrieved_at)s, %(raw_path)s,
                     %(checksum)s, %(record_count)s, %(notes)s)
                   ON CONFLICT (id) DO UPDATE SET
                     source_key = EXCLUDED.source_key, name = EXCLUDED.name, url = EXCLUDED.url,
                     license = EXCLUDED.license, license_url = EXCLUDED.license_url,
                     citation = EXCLUDED.citation, spatial_resolution = EXCLUDED.spatial_resolution,
                     temporal_coverage = EXCLUDED.temporal_coverage,
                     temporal_resolution = EXCLUDED.temporal_resolution,
                     variables = EXCLUDED.variables, access_method = EXCLUDED.access_method,
                     mode = EXCLUDED.mode, retrieved_at = EXCLUDED.retrieved_at,
                     raw_path = EXCLUDED.raw_path, checksum = EXCLUDED.checksum,
                     record_count = EXCLUDED.record_count, notes = EXCLUDED.notes""",
                d,
            )
        for f in FEATURES:
            cur.execute(
                """INSERT INTO feature_def (key, label, unit, domain, description)
                   VALUES (%s, %s, %s, %s, %s)
                   ON CONFLICT (key) DO UPDATE SET label = EXCLUDED.label, unit = EXCLUDED.unit,
                     domain = EXCLUDED.domain, description = EXCLUDED.description""",
                (f.key, f.label, f.unit, f.domain, f.description),
            )
        for s in SPECIES:
            cur.execute(
                """INSERT INTO species (id, scientific_name, habitat, gbif_taxon_key)
                   VALUES (%s, %s, %s, %s)
                   ON CONFLICT (id) DO UPDATE SET scientific_name = EXCLUDED.scientific_name,
                     habitat = EXCLUDED.habitat, gbif_taxon_key = EXCLUDED.gbif_taxon_key""",
                (s.id, s.scientific_name, s.habitat, gbif_keys.get(s.id)),
            )

        terr = pd.DataFrame(
            {
                "code": territories["code"],
                "name": territories["name"],
                "kind": territories["kind"],
                "geom": _ewkb(territories.geometry),
            }
        )
        _copy_frame(cur, "territory", list(terr.columns), terr)

        for res in ("r7", "r6"):
            cells = _cells_frame(tables[f"features_{res}"])
            _copy_frame(cur, "cell", list(cells.columns), cells)
            log.info("cells %s: %d", res, len(cells))
        for res in ("r7", "r6"):
            long = _long_values(tables[f"features_{res}"], tables[f"provenance_{res}"])
            _copy_frame(cur, "cell_feature", list(long.columns), long)
            log.info("cell_feature %s: %d values", res, len(long))

        occ_cols = [
            "species_id",
            "source",
            "source_record_id",
            "lat",
            "lon",
            "year",
            "basis_of_record",
            "coordinate_uncertainty_m",
            "country_code",
            "dataset_key",
            "license",
            "provenance_id",
        ]
        _copy_frame(cur, "occurrence", occ_cols, occurrences[occ_cols])
        log.info("occurrences: %d", len(occurrences))

        meta = {
            "dataset_mode": dataset_mode,
            "loaded_at": datetime.now(UTC).isoformat(),
            "snapshot_version": snapshot_version or "",
        }
        for k, v in meta.items():
            cur.execute(
                """INSERT INTO app_meta (key, value, updated_at) VALUES (%s, %s, now())
                   ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()""",
                (k, v),
            )
        cur.execute("ANALYZE cell; ANALYZE cell_feature; ANALYZE occurrence")
    log.info("database load complete (%s)", dataset_mode)


def load_clean() -> None:
    clean = get_settings().clean_dir
    load_into_db(
        tables=load_tables(),
        provenance=list(load_all().values()),
        territories=territory_geometries(),
        occurrences=pd.read_parquet(clean / "occurrences" / "occurrences.parquet"),
        gbif_keys=json.loads((clean / "occurrences" / "gbif_taxon_keys.json").read_text()),
        dataset_mode="live",
    )
