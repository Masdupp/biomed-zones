"""`biomed-ml train | precompute | report`."""

from __future__ import annotations

import logging

import typer

from . import pipeline, store

app = typer.Typer(no_args_is_help=True, add_completion=False)


@app.callback()
def _setup() -> None:
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s"
    )


@app.command()
def train(trigger: str = "cli") -> None:
    """Train all species, precompute scores and activate the run."""
    from .settings import get_ml_settings

    s = get_ml_settings()
    run_id = pipeline.new_run_id()
    store.create_run(run_id, trigger, {"w_expert": s.w_expert, "w_ml": s.w_ml}, None)
    pipeline.run(run_id, trigger)
    typer.echo(run_id)


@app.command()
def precompute() -> None:
    """Recompute scores for the active run (e.g. after changing weights)."""
    run = store.active_run()
    if run is None:
        raise typer.BadParameter("no active run")
    pipeline.precompute(run["id"])


@app.command("export-snapshot")
def export_snapshot() -> None:
    """Copy the active run's artifacts, metrics and scores into data/snapshot."""
    from .export import export_active_run

    typer.echo(export_active_run())


@app.command()
def report() -> None:
    """Write docs/MODEL_CARD.md metrics tables and calibration plots."""
    from .report import write

    typer.echo(write())


if __name__ == "__main__":
    app()
