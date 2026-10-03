from collections.abc import Iterator
from contextlib import contextmanager

import psycopg

from .settings import get_settings


@contextmanager
def connect(database_url: str | None = None) -> Iterator[psycopg.Connection]:
    with psycopg.connect(database_url or get_settings().database_url, connect_timeout=5) as conn:
        yield conn


def database_info(conn: psycopg.Connection) -> dict[str, str | None]:
    """PostGIS and h3 versions; h3 is optional (ADR-0004)."""
    row = conn.execute(
        "SELECT postgis_lib_version(), (SELECT extversion FROM pg_extension WHERE extname = 'h3')"
    ).fetchone()
    assert row is not None
    return {"postgis": row[0], "h3": row[1]}
