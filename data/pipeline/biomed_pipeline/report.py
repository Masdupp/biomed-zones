"""docs/DATA_REPORT.md — data quality report generated from the loaded database."""

from __future__ import annotations

from datetime import UTC, datetime

import pandas as pd

from .db import connect
from .features import FEATURES
from .settings import REPO_ROOT
from .sources import ml_layers
from .territories import TERRITORIES

TERR = [t.code for t in TERRITORIES]

# Which cells a feature is expected to cover.
APPLICABLE = {"marine": "sea_fraction > 0", "terrestrial": "land_fraction > 0"}
LAND_PRESSURE = {"artificial_frac", "agri_frac", "natural_frac"}

LIMITS = [
    "Marine variables are model reanalyses (GLORYS12 1/12°, BGC 1/4°), not in-situ measurements. "
    "Coastal cells whose centre falls on a land-masked model pixel take the nearest ocean pixel "
    "within 25 km (physics) or 60 km (biogeochemistry).",
    "Surface values are used for salinity, oxygen, pH and chlorophyll; temperature is also "
    "given at the model bottom. Intertidal conditions (emersion, sediment) are not resolved.",
    "Bathymetry: EMODnet (~230 m, vertical datum LAT where available) in Metropole, GMRT "
    "(mean sea level) in the DROM. Pixels are restricted to the marine zone, so tidal flats "
    "count with negative depth (intertidal); low-lying land inside the 1:10M coastline can "
    "inflate the intertidal share locally (e.g. Guyane mudflats vs. mangrove margins).",
    "Terrestrial climate is TerraClimate (1/24°) instead of Open-Meteo: Open-Meteo's call "
    "weighting makes multi-year, multi-point extraction infeasible on the free tier "
    "(see ADR-0012). Open-Meteo provides frost days for a single cold season on a coarse lattice.",
    "Frost days come from ERA5-Land at 0.1°, which smooths radiative ground frost: Réunion's "
    "high plains, where frost does occur, show 0 days (coldest node minimum: 4.0 °C at 2,410 m).",
    "Mayotte's 12 nm limit is a coastline buffer (absent from Marine Regions: sovereignty "
    "disputed with the Comoros).",
    "Natura 2000 does not apply in the DROM; protection there comes from national designations.",
    "CLC 2018 covers only Guyane's coastal strip; the interior uses ESA WorldCover 2021, where "
    "grassland is counted as natural (CLC separates pastures).",
    "Andorra is outside CLC; cells straddling the border use the French side only.",
    "OBIS republishes many datasets to GBIF; records that differ slightly in rounding survive "
    "deduplication, and collapse later when presences are thinned to one per grid cell.",
    "Occurrences: LIVING_SPECIMEN records are excluded, but human observations of planted Ginkgo "
    "biloba and Catharanthus roseus remain; Limulus polyphemus is not native to Europe; "
    "Danio rerio and Ambystoma mexicanum have very few wild records.",
]


def _df(conn, sql: str, params=None) -> pd.DataFrame:
    cur = conn.execute(sql, params)
    return pd.DataFrame(cur.fetchall(), columns=[d.name for d in cur.description])


def _md(df: pd.DataFrame) -> str:
    cols = list(df.columns)
    lines = ["| " + " | ".join(map(str, cols)) + " |", "|" + "---|" * len(cols)]
    for row in df.itertuples(index=False):
        lines.append("| " + " | ".join("" if pd.isna(v) else str(v) for v in row) + " |")
    return "\n".join(lines)


def coverage(conn) -> pd.DataFrame:
    rows = []
    for f in FEATURES:
        if f.key in LAND_PRESSURE:
            cond = APPLICABLE["terrestrial"]
        elif f.domain == "model":
            cond = APPLICABLE["marine" if f.key in ml_layers.MARINE else "terrestrial"]
        else:
            cond = APPLICABLE.get(f.domain, "TRUE")
        q = f"""
          SELECT c.territory_code AS t, count(*) AS n, count(cf.value) AS ok
          FROM cell c
          LEFT JOIN cell_feature cf ON cf.h3 = c.h3 AND cf.feature_key = %s
          WHERE c.resolution = 7 AND {cond}
          GROUP BY c.territory_code"""
        d = _df(conn, q, (f.key,)).set_index("t")
        row = {
            "feature": f"`{f.key}`",
            "unit": f.unit,
            "applies to": cond.split(" ")[0].replace("_fraction", "") if cond != "TRUE" else "all",
        }
        tot_n = tot_ok = 0
        for t in TERR:
            n = int(d.loc[t, "n"]) if t in d.index else 0
            ok = int(d.loc[t, "ok"]) if t in d.index else 0
            tot_n, tot_ok = tot_n + n, tot_ok + ok
            row[t] = f"{100 * ok / n:.1f}" if n else "—"
        row["all %"] = f"{100 * tot_ok / tot_n:.1f}" if tot_n else "—"
        row["missing"] = tot_n - tot_ok
        rows.append(row)
    return pd.DataFrame(rows)


def write_report() -> str:
    with connect() as conn:
        meta = dict(conn.execute("SELECT key, value FROM app_meta").fetchall())
        cells = _df(
            conn,
            """SELECT territory_code AS territory,
              count(*) FILTER (WHERE resolution = 7) AS cells_r7,
              count(*) FILTER (WHERE resolution = 6) AS cells_r6,
              count(*) FILTER (WHERE resolution = 7 AND land_fraction > 0) AS land_r7,
              count(*) FILTER (WHERE resolution = 7 AND sea_fraction > 0) AS sea_r7
            FROM cell GROUP BY 1 ORDER BY 1""",
        )
        n_values = conn.execute("SELECT count(*) FROM cell_feature").fetchone()[0]
        prov = _df(
            conn,
            """SELECT p.id, p.name, p.license, p.spatial_resolution AS resolution,
              coalesce(p.temporal_coverage, '') AS period, p.mode,
              to_char(p.retrieved_at, 'YYYY-MM-DD') AS retrieved,
              (SELECT count(*) FROM cell_feature cf WHERE cf.provenance_id = p.id) AS cell_values,
              (SELECT count(*) FROM occurrence o WHERE o.provenance_id = p.id) AS occurrences
            FROM provenance p ORDER BY p.id""",
        )
        cov = coverage(conn)
        ranges = _df(
            conn,
            """SELECT cf.feature_key AS feature, fd.unit,
              round(min(value)::numeric, 2) AS min,
              round((percentile_cont(0.5) WITHIN GROUP (ORDER BY value))::numeric, 2) AS median,
              round(max(value)::numeric, 2) AS max
            FROM cell_feature cf JOIN cell c ON c.h3 = cf.h3 AND c.resolution = 7
            JOIN feature_def fd ON fd.key = cf.feature_key
            GROUP BY 1, 2 ORDER BY 1""",
        )
        occ = _df(
            conn,
            """SELECT s.scientific_name AS species, s.habitat,
              count(*) FILTER (WHERE o.source = 'gbif') AS gbif,
              count(*) FILTER (WHERE o.source = 'obis') AS obis,
              count(o.id) AS total,
              count(*) FILTER (WHERE EXISTS (SELECT 1 FROM territory t
                 WHERE ST_Intersects(t.geom, o.geom))) AS in_scope_territories,
              min(o.year) AS first_year, max(o.year) AS last_year
            FROM species s LEFT JOIN occurrence o ON o.species_id = s.id
            GROUP BY 1, 2 ORDER BY 1""",
        )

    ranges["feature"] = "`" + ranges["feature"] + "`"
    prov["id"] = "`" + prov["id"] + "`"
    now = datetime.now(UTC).strftime("%Y-%m-%d %H:%M UTC")
    snap = f" (snapshot {meta['snapshot_version']})" if meta.get("snapshot_version") else ""
    loaded = meta.get("loaded_at", "?")[:19]
    text = (
        f"""# Data quality report

> Generated by `biomed-pipeline report` on {now} from the loaded database. Do not edit by hand.

Dataset mode: **{meta.get("dataset_mode", "?")}**{snap}, loaded {loaded}.
{n_values:,} feature values stored, each linked to a provenance record.

## 1. Spatial units

H3 resolution 7 (~5.2 km²) is the computation unit; resolution 6 (~36 km²) is the mean of its
resolution-7 children. A cell is *land* if any part of it is land (Natural Earth 1:10M) and *sea*
if any part lies inside the 12 nm territorial sea or internal waters (bays, lagoons); coastal
cells are both.

{_md(cells)}

## 2. Sources and provenance

{_md(prov)}

## 3. Coverage per feature and territory (resolution 7, % of applicable cells with a value)

Marine features apply to cells with sea, terrestrial features and land-cover shares to cells
with land, distances and protection to all cells.

{_md(cov)}

## 4. Value ranges (resolution 7)

{_md(ranges)}

## 5. Species occurrences (training labels)

Filters: coordinates present, no geospatial issue, presence only, year ≥ 1970, coordinate
uncertainty ≤ 10 km or not reported, no living (cultivated / captive) or fossil specimens; exact
duplicates (same coordinates to 4 decimals and year) removed across GBIF and OBIS.
`in_scope_territories` counts records inside the six territories.

{_md(occ)}

## 6. Known limits and approximations

"""
        + "\n".join(f"- {line}" for line in LIMITS)
        + "\n"
    )
    path = REPO_ROOT / "docs" / "DATA_REPORT.md"
    path.write_text(text)
    return str(path)
