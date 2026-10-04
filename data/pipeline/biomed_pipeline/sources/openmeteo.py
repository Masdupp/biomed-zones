"""Open-Meteo Historical Weather API (ERA5-Land) — frost days.

Frost needs daily minimum temperature, which monthly grids cannot give. Open-Meteo counts each
two weeks of data per location as one call (free tier: 600/min, 5,000/h, 10,000/day), so the
module queries a coarse lattice for one cold season and caches every response:

  * cold season 2024-11-01 → 2025-03-31 in the northern hemisphere,
    2025-05-01 → 2025-09-30 in the southern hemisphere (Réunion, Mayotte);
  * lattice: 0.5° in Metropole and Guyane, 0.1° in Réunion (highland frost), 0.25° elsewhere.

Feature:
  frost_days   days with daily minimum 2 m temperature < 0 °C during that cold season.

Data: Copernicus C3S ERA5-Land (Muñoz Sabater, 2019) served by Open-Meteo, CC BY 4.0.
"""

from __future__ import annotations

import json
import logging
import math
import time
from collections import deque

import numpy as np
import pandas as pd
from scipy.spatial import cKDTree

from ..http import _retry_transient, get_session
from ..provenance import Provenance, sha256_of
from ..settings import get_settings
from ..territories import TERRITORIES
from .base import SourceResult

log = logging.getLogger(__name__)

API = "https://archive-api.open-meteo.com/v1/archive"
SPACING = {"FXX": 0.5, "GUF": 0.5, "REU": 0.1, "GLP": 0.25, "MTQ": 0.25, "MYT": 0.25}
NORTH = ("2024-11-01", "2025-03-31")
SOUTH = ("2025-05-01", "2025-09-30")
BATCH = 20
PER_MINUTE = 550  # stay under the 600/min limit
PER_HOUR = 4900
PROVENANCE_ID = "openmeteo-era5land"


def season_for(lat: float) -> tuple[str, str]:
    return NORTH if lat >= 0 else SOUTH


def call_weight(start: str, end: str, n_locations: int) -> float:
    days = (pd.Timestamp(end) - pd.Timestamp(start)).days + 1
    return n_locations * max(1.0, days / 14)


class Throttle:
    """Rolling-window limiter on Open-Meteo's weighted call count."""

    def __init__(self) -> None:
        self.events: deque[tuple[float, float]] = deque()

    def _used(self, window: float, now: float) -> float:
        return sum(w for t, w in self.events if now - t < window)

    def wait(self, weight: float) -> None:
        while True:
            now = time.monotonic()
            while self.events and now - self.events[0][0] > 3600:
                self.events.popleft()
            if (
                self._used(60, now) + weight <= PER_MINUTE
                and self._used(3600, now) + weight <= PER_HOUR
            ):
                self.events.append((now, weight))
                return
            time.sleep(5)


def lattice(cells: pd.DataFrame) -> pd.DataFrame:
    rows = []
    land = cells[cells["land_fraction"] > 0]
    for t in TERRITORIES:
        s = SPACING[t.code]
        sel = land[land["territory"] == t.code]
        lon0, lat0, lon1, lat1 = t.bbox
        gx, gy = np.meshgrid(
            np.arange(math.floor(lon0 / s) * s, lon1 + s, s),
            np.arange(math.floor(lat0 / s) * s, lat1 + s, s),
        )
        pts = np.c_[gx.ravel(), gy.ravel()]
        d, _ = cKDTree(np.c_[sel["lon"], sel["lat"]]).query(pts)
        keep = pts[d <= s * 0.75]
        rows += [(t.code, round(y, 4), round(x, 4)) for x, y in keep]
    return pd.DataFrame(rows, columns=["territory", "lat", "lon"])


def _raw():
    d = get_settings().raw_dir / "openmeteo"
    d.mkdir(parents=True, exist_ok=True)
    return d


@_retry_transient
def _get(url: str, params: dict, timeout: float):
    return get_session().get(url, params=params, timeout=timeout)


def fetch(nodes: pd.DataFrame) -> list:
    throttle, files = Throttle(), []
    for code, grp in nodes.groupby("territory"):
        start, end = season_for(float(grp["lat"].iloc[0]))
        for i in range(0, len(grp), BATCH):
            chunk = grp.iloc[i : i + BATCH]
            dest = _raw() / f"{code}_{start}_{end}_{i:04d}.json"
            files.append(dest)
            if dest.exists():
                continue
            throttle.wait(call_weight(start, end, len(chunk)))
            r = _get(
                API,
                params={
                    "latitude": ",".join(map(str, chunk["lat"])),
                    "longitude": ",".join(map(str, chunk["lon"])),
                    "start_date": start,
                    "end_date": end,
                    "daily": "temperature_2m_min",
                    "models": "era5_land",
                    "timezone": "GMT",
                },
                timeout=120,
            )
            r.raise_for_status()
            body = r.json()
            body = body if isinstance(body, list) else [body]
            for req, loc in zip(chunk.itertuples(), body, strict=True):
                loc["requested"] = {"lat": req.lat, "lon": req.lon}
            dest.write_text(json.dumps(body))
            log.info("open-meteo %s batch %d (%d locations)", code, i // BATCH, len(chunk))
    return files


def frost_days(files: list) -> pd.DataFrame:
    rows = []
    for f in files:
        for loc in json.loads(f.read_text()):
            tmin = np.array(loc["daily"]["temperature_2m_min"], dtype=float)
            n_valid = int(np.isfinite(tmin).sum())
            rows.append(
                {
                    "lat": loc["requested"]["lat"],
                    "lon": loc["requested"]["lon"],
                    "frost_days": float(np.nansum(tmin < 0)) if n_valid else np.nan,
                    "n_days": n_valid,
                }
            )
    return pd.DataFrame(rows)


def ingest(cells: pd.DataFrame) -> SourceResult:
    nodes = lattice(cells)
    log.info("open-meteo lattice: %d nodes", len(nodes))
    files = fetch(nodes)
    fd = frost_days(files)
    land = cells[cells["land_fraction"] > 0]
    parts = []
    for t in TERRITORIES:
        sel = land[land["territory"] == t.code]
        sub = fd.merge(nodes[nodes["territory"] == t.code], on=["lat", "lon"])
        # ERA5-Land is land-only: coastal nodes over the sea return no data, so cells are
        # matched to the nearest node that has data.
        sub = sub.dropna(subset=["frost_days"])
        # Lattice is irregular after filtering, so search nearest node directly.
        tree = cKDTree(np.c_[sub["lon"], sub["lat"]])
        d, idx = tree.query(np.c_[sel["lon"], sel["lat"]])
        vals = sub["frost_days"].to_numpy()[idx]
        vals[d > SPACING[t.code] * 2] = np.nan
        parts.append(pd.DataFrame({"frost_days": vals}, index=pd.Index(sel["h3"], name="h3")))
    out = pd.concat(parts)

    Provenance(
        id=PROVENANCE_ID,
        source_key="openmeteo",
        name="Open-Meteo Historical Weather API — ERA5-Land daily minimum temperature",
        url="https://open-meteo.com/en/docs/historical-weather-api",
        license="CC BY 4.0",
        license_url="https://open-meteo.com/en/license",
        citation="Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. "
        "https://doi.org/10.5281/zenodo.7970649 ; Muñoz Sabater, J. (2019). ERA5-Land hourly "
        "data from 1950 to present. C3S CDS. https://doi.org/10.24381/cds.e2161bac",
        spatial_resolution="ERA5-Land 0.1°, sampled on a 0.5° (Metropole, Guyane), 0.25° "
        "(Guadeloupe, Martinique, Mayotte) or 0.1° (Réunion) lattice",
        temporal_coverage="cold season 2024-11/2025-03 (north), 2025-05/2025-09 (south)",
        temporal_resolution="daily",
        variables=["temperature_2m_min → frost_days"],
        access_method="REST archive-api.open-meteo.com, multi-location batches, cached JSON",
        raw_path=str(_raw()),
        checksum=sha256_of(files),
        record_count=len(fd),
        notes="Single cold season because of the free-tier call weighting; frost days are a "
        "hard-constraint indicator, not a long-term normal. Nearest lattice node, so mountain "
        "cells can differ from their node's elevation.",
    ).save()
    return SourceResult("openmeteo", out, {"frost_days": PROVENANCE_ID})
