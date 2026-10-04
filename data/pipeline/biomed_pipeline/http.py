"""HTTP helpers: retries with back-off and on-disk caching of raw downloads."""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import requests
from requests.adapters import HTTPAdapter
from tenacity import (
    before_sleep_log,
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)
from urllib3.util.retry import Retry

log = logging.getLogger(__name__)

USER_AGENT = "BioMedZones/2.0 (academic research; contact: repository maintainer)"


def session() -> requests.Session:
    s = requests.Session()
    retry = Retry(
        total=5,
        backoff_factor=1.5,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET", "POST"),
        respect_retry_after_header=True,
    )
    s.mount("https://", HTTPAdapter(max_retries=retry, pool_maxsize=16))
    s.mount("http://", HTTPAdapter(max_retries=retry, pool_maxsize=16))
    s.headers["User-Agent"] = USER_AGENT
    return s


_SESSION: requests.Session | None = None


def get_session() -> requests.Session:
    global _SESSION
    if _SESSION is None:
        _SESSION = session()
    return _SESSION


# urllib3's Retry covers status codes and connect errors, not a body cut mid-stream or a read
# timeout (e.g. after the laptop sleeps). Those are retried here around the whole request.
TRANSIENT = (
    requests.exceptions.ConnectionError,
    requests.exceptions.ChunkedEncodingError,
    requests.exceptions.Timeout,
)
_retry_transient = retry(
    retry=retry_if_exception_type(TRANSIENT),
    stop=stop_after_attempt(6),
    wait=wait_exponential(multiplier=2, max=120),
    before_sleep=before_sleep_log(log, logging.WARNING),
    reraise=True,
)


@_retry_transient
def download(
    url: str,
    dest: Path,
    params: dict[str, Any] | None = None,
    *,
    force: bool = False,
    timeout: float = 300,
) -> Path:
    """Download to `dest` unless it already exists (raw files are immutable once fetched)."""
    if dest.exists() and dest.stat().st_size > 0 and not force:
        log.debug("cached %s", dest)
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    log.info("GET %s", url)
    with get_session().get(url, params=params, stream=True, timeout=timeout) as r:
        r.raise_for_status()
        with tmp.open("wb") as f:
            for chunk in r.iter_content(1 << 20):
                f.write(chunk)
    tmp.rename(dest)
    return dest


@_retry_transient
def get_json(
    url: str, params: dict[str, Any] | None = None, timeout: float | tuple[float, float] = 120
) -> Any:
    r = get_session().get(url, params=params, timeout=timeout)
    r.raise_for_status()
    return r.json()
