"""Pipeline entry point: `biomed-pipeline <command>`.

Typical runs
  biomed-pipeline ingest            live ingestion of every source (cached raw files reused)
  biomed-pipeline ingest -s terraclimate -s soilgrids
  biomed-pipeline build             merge sources into wide H3 tables
  biomed-pipeline load              write clean tables into PostGIS
  biomed-pipeline export-snapshot   refresh data/snapshot from clean tables
  biomed-pipeline load-snapshot     offline path: load data/snapshot into PostGIS
  biomed-pipeline report            regenerate docs/DATA_REPORT.md from the database
  biomed-pipeline all               ingest → build → load → export-snapshot → report
"""

from __future__ import annotations

import logging
import sys
from typing import Annotated

import typer

from .db import connect, database_info

app = typer.Typer(no_args_is_help=True, add_completion=False)
log = logging.getLogger("biomed_pipeline")

BOUNDARY_SOURCES = ("naturalearth", "marineregions")
CELL_SOURCES = (
    "copernicus_marine",
    "bathymetry",
    "copernicus_dem",
    "soilgrids",
    "terraclimate",
    "openmeteo",
    "protected_areas",
    "landcover",
    "pressure",
    "ml_layers",  # last: samples the global Copernicus / TerraClimate layers built above
)
ALL_SOURCES = (*BOUNDARY_SOURCES, "grid", *CELL_SOURCES, "occurrences")


@app.callback()
def _setup(verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("copernicusmarine").setLevel(logging.WARNING)


@app.command()
def check() -> None:
    """Verify database connectivity and extensions."""
    with connect() as conn:
        info = database_info(conn)
    typer.echo(f"database ok: postgis={info['postgis']} h3={info['h3'] or 'absent'}")


def _run_source(name: str) -> None:
    import importlib

    from . import grid
    from .sources.base import SourceUnavailableError

    if name == "grid":
        grid.build()
        return
    mod = importlib.import_module(f".sources.{name}", __package__)
    if name in BOUNDARY_SOURCES or name == "occurrences":
        mod.ingest()
        return
    try:
        result = mod.ingest(grid.load(grid.FINE_RES))
    except SourceUnavailableError as exc:
        from .snapshot import fallback_source

        log.warning("%s unavailable (%s): using snapshot values", name, exc)
        result = fallback_source(name)
    result.save()


@app.command()
def ingest(
    source: Annotated[list[str] | None, typer.Option("--source", "-s")] = None,
) -> None:
    """Live ingestion. Each source writes raw/, clean/ and a provenance record."""
    names = source or list(ALL_SOURCES)
    unknown = set(names) - set(ALL_SOURCES)
    if unknown:
        raise typer.BadParameter(f"unknown sources: {sorted(unknown)}")
    failed = []
    for name in names:
        log.info("=== %s", name)
        try:
            _run_source(name)
        except Exception:  # noqa: BLE001 — keep going, report at the end
            log.exception("%s failed", name)
            failed.append(name)
    if failed:
        typer.echo(f"failed sources: {', '.join(failed)}", err=True)
        sys.exit(1)


@app.command()
def build() -> None:
    """Merge per-source features into wide H3 tables (res 7 and 6)."""
    from .build import build as run

    run()


@app.command()
def load() -> None:
    """Load clean tables (data/clean) into PostGIS."""
    from .load import load_clean

    load_clean()


@app.command("export-snapshot")
def export_snapshot() -> None:
    """Write data/snapshot from data/clean."""
    from .snapshot import export

    export()


@app.command("load-snapshot")
def load_snapshot() -> None:
    """Load data/snapshot into PostGIS (offline demo path, ADR-0007)."""
    from .snapshot import load_into_db, manifest_path

    if not manifest_path().exists():
        typer.echo(f"no snapshot found at {manifest_path()} — nothing loaded", err=True)
        sys.exit(1)
    load_into_db()


@app.command("training-data")
def training_data() -> None:
    """Build the SDM presence/background table (data/clean/ml/training.parquet)."""
    from .sdm_data import build as run

    run()


@app.command()
def species() -> None:
    """Build data/reference/species.json (GBIF taxonomy + IUCN, Crossref-verified references)."""
    from .species_profiles import build as run

    run()


@app.command()
def report() -> None:
    """Regenerate docs/DATA_REPORT.md from the database."""
    from .report import write_report

    path = write_report()
    typer.echo(f"wrote {path}")


@app.command("all")
def run_all() -> None:
    """ingest → build → load → export-snapshot → report."""
    ingest(None)
    build()
    load()
    export_snapshot()
    report()


if __name__ == "__main__":
    app()
