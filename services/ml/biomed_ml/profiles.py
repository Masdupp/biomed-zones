"""Species profiles (data/reference/species.json) and habitat parameter definitions."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from functools import cache
from pathlib import Path

from biomed_pipeline.settings import REPO_ROOT

PROFILES_PATH = REPO_ROOT / "data" / "reference" / "species.json"


@dataclass(frozen=True)
class Parameter:
    """One expert-score parameter: the feature it is scored on and its extreme-value checks."""

    key: str
    label: str
    feature: str
    weight: float
    unit: str
    low_extreme: str | None = None  # feature holding the lowest monthly value
    high_extreme: str | None = None  # feature holding the highest monthly value


# Weights from the specification (sum to 1 per habitat).
MARINE_PARAMETERS = (
    Parameter("temperature", "Sea temperature", "sst_mean", 0.30, "°C", "sst_min", "sst_max"),
    Parameter("salinity", "Salinity", "sss_mean", 0.20, "PSU", "sss_min", None),
    Parameter("ph", "Seawater pH", "ph_mean", 0.20, "pH"),
    Parameter("depth", "Depth", "depth_mean", 0.15, "m"),
    Parameter("oxygen", "Dissolved oxygen", "o2_mean", 0.15, "mmol/m³", "o2_min", None),
)
TERRESTRIAL_PARAMETERS = (
    Parameter("temperature", "Air temperature", "tair_mean", 0.30, "°C", "tair_min", "tair_max"),
    Parameter("soil_ph", "Soil pH", "soil_ph", 0.25, "pH"),
    Parameter("humidity", "Relative humidity", "rh_mean", 0.20, "%"),
    Parameter("rainfall", "Annual rainfall", "precip_annual", 0.15, "mm"),
    Parameter("altitude", "Altitude", "elev_mean", 0.10, "m"),
)
# Freshwater species: no freshwater layer is in scope; water temperature is proxied by air
# temperature and the only realistic mode is controlled indoor culture.
FRESHWATER_PARAMETERS = (
    Parameter(
        "temperature",
        "Water temperature (air-temperature proxy)",
        "tair_mean",
        1.0,
        "°C",
        "tair_min",
        "tair_max",
    ),
)

PARAMETERS = {
    "marine": MARINE_PARAMETERS,
    "terrestrial": TERRESTRIAL_PARAMETERS,
    "freshwater": FRESHWATER_PARAMETERS,
}


@dataclass(frozen=True)
class Tolerance:
    min: float
    opt_min: float
    opt_max: float
    max: float
    lethal: bool = False
    extreme_min: float | None = None  # survival limit for the lowest monthly value
    extreme_max: float | None = None

    @property
    def survival_min(self) -> float:
        return self.min if self.extreme_min is None else self.extreme_min

    @property
    def survival_max(self) -> float:
        return self.max if self.extreme_max is None else self.extreme_max


@dataclass(frozen=True)
class Species:
    id: str
    scientific_name: str
    habitat: str
    tolerances: dict[str, Tolerance]
    native_territories: tuple[str, ...] = ()
    frost_sensitive: bool = False
    raw: dict = field(default_factory=dict, compare=False, hash=False, repr=False)

    @property
    def parameters(self) -> tuple[Parameter, ...]:
        return PARAMETERS[self.habitat]


def _species(d: dict) -> Species:
    return Species(
        id=d["id"],
        scientific_name=d["scientific_name"],
        habitat=d["habitat"],
        tolerances={k: Tolerance(**v) for k, v in d["tolerances"].items()},
        native_territories=tuple(d.get("native_territories", [])),
        frost_sensitive=bool(d.get("frost_sensitive", False)),
        raw=d,
    )


@cache
def load_profiles(path: Path = PROFILES_PATH) -> dict[str, Species]:
    data = json.loads(path.read_text())
    return {d["id"]: _species(d) for d in data["species"]}
