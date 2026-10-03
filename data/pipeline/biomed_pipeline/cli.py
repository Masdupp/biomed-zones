"""Pipeline entry point: `biomed-pipeline <command>`."""

import sys

import typer

from .db import connect, database_info
from .settings import get_settings

app = typer.Typer(no_args_is_help=True, add_completion=False)


@app.command()
def check() -> None:
    """Verify database connectivity and extensions."""
    with connect() as conn:
        info = database_info(conn)
    typer.echo(f"database ok: postgis={info['postgis']} h3={info['h3'] or 'absent'}")


@app.command("load-snapshot")
def load_snapshot() -> None:
    """Load data/snapshot into PostGIS (offline demo path, ADR-0007)."""
    settings = get_settings()
    with connect() as conn:
        info = database_info(conn)
    typer.echo(f"database ok: postgis={info['postgis']} h3={info['h3'] or 'absent'}")

    manifest = settings.snapshot_dir / "manifest.json"
    if not manifest.exists():
        # Phase 1: no snapshot has been produced yet. Say so explicitly rather than pretend.
        typer.echo(
            f"no snapshot found at {manifest} — nothing loaded "
            "(the snapshot is produced in Phase 2)",
            err=True,
        )
        return
    typer.echo("snapshot loader not implemented yet (Phase 2)", err=True)
    sys.exit(1)


if __name__ == "__main__":
    app()
