"""Expert (rule-based) suitability score.

Per parameter, a trapezoid fit on the annual-mean feature: 100 inside the optimal band
[opt_min, opt_max], linear decay to 0 at the tolerance limits min / max, 0 outside. The expert
score is the weighted mean of the available parameter fits (habitat weights from the spec).

Hard constraints: for a parameter flagged ``lethal``, the lowest / highest monthly value must
stay within the survival limits (``extreme_min`` / ``extreme_max``, defaulting to min / max).
Frost-sensitive species must also have at most FROST_DAYS_MAX frost days. Any violation caps
the score at HARD_CAP, whatever the other parameters say.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field

from .profiles import Parameter, Species, Tolerance

HARD_CAP = 25.0
FROST_DAYS_MAX = 5


def trapezoid(value: float, t: Tolerance) -> float:
    """0-100 fit of ``value`` to a tolerance band."""
    if value is None or math.isnan(value):
        return math.nan
    if t.opt_min <= value <= t.opt_max:
        return 100.0
    if value <= t.min or value >= t.max:
        return 0.0
    if value < t.opt_min:
        return 100.0 * (value - t.min) / (t.opt_min - t.min)
    return 100.0 * (t.max - value) / (t.max - t.opt_max)


@dataclass
class ParameterResult:
    key: str
    label: str
    feature: str
    unit: str
    weight: float
    value: float | None
    fit: float | None
    band: dict[str, float]

    @property
    def shortfall(self) -> float:
        """Weighted points lost against a perfect score (for limiting-factor ranking)."""
        return 0.0 if self.fit is None else self.weight * (100.0 - self.fit)


@dataclass
class Violation:
    parameter: str
    feature: str
    value: float
    limit: float
    side: str  # "below" | "above"

    def describe(self) -> str:
        word = "below" if self.side == "below" else "above"
        return f"{self.feature} = {self.value:.1f} is {word} the survival limit {self.limit:g}"


@dataclass
class ExpertResult:
    score: float | None
    uncapped: float | None
    completeness: float
    parameters: list[ParameterResult]
    violations: list[Violation] = field(default_factory=list)

    @property
    def capped(self) -> bool:
        return bool(self.violations)

    def limiting_factors(self, n: int = 3) -> list[dict]:
        out = [
            {"parameter": v.parameter, "kind": "hard_constraint", "detail": v.describe()}
            for v in self.violations
        ]
        ranked = sorted(
            (p for p in self.parameters if p.fit is not None and p.fit < 100),
            key=lambda p: p.shortfall,
            reverse=True,
        )
        for p in ranked:
            if p.key in {o["parameter"] for o in out}:
                continue
            out.append(
                {
                    "parameter": p.key,
                    "kind": "suboptimal",
                    "fit": round(p.fit, 1),
                    "detail": f"{p.label} {p.value:.2f} {p.unit} vs optimum "
                    f"{p.band['opt_min']:g}–{p.band['opt_max']:g}",
                }
            )
        return out[:n]


def _val(features: dict, key: str | None) -> float | None:
    if key is None:
        return None
    v = features.get(key)
    if v is None:
        return None
    v = float(v)
    return None if math.isnan(v) else v


def _check(param: Parameter, t: Tolerance, features: dict) -> list[Violation]:
    if not t.lethal:
        return []
    out = []
    low = _val(features, param.low_extreme) if param.low_extreme else _val(features, param.feature)
    high = (
        _val(features, param.high_extreme) if param.high_extreme else _val(features, param.feature)
    )
    if low is not None and low < t.survival_min:
        out.append(
            Violation(param.key, param.low_extreme or param.feature, low, t.survival_min, "below")
        )
    if high is not None and high > t.survival_max:
        out.append(
            Violation(param.key, param.high_extreme or param.feature, high, t.survival_max, "above")
        )
    return out


def expert_score(species: Species, features: dict) -> ExpertResult:
    params, violations = [], []
    total_w = sum(p.weight for p in species.parameters)
    for p in species.parameters:
        t = species.tolerances.get(p.key)
        if t is None:
            continue
        value = _val(features, p.feature)
        fit = None if value is None else trapezoid(value, t)
        params.append(
            ParameterResult(
                key=p.key,
                label=p.label,
                feature=p.feature,
                unit=p.unit,
                weight=p.weight,
                value=value,
                fit=fit,
                band={"min": t.min, "opt_min": t.opt_min, "opt_max": t.opt_max, "max": t.max},
            )
        )
        violations += _check(p, t, features)
    if species.frost_sensitive:
        frost = _val(features, "frost_days")
        if frost is not None and frost > FROST_DAYS_MAX:
            violations.append(
                Violation("temperature", "frost_days", frost, FROST_DAYS_MAX, "above")
            )

    available = [r for r in params if r.fit is not None]
    w_avail = sum(r.weight for r in available)
    completeness = w_avail / total_w if total_w else 0.0
    if not available:
        return ExpertResult(None, None, 0.0, params, violations)
    uncapped = sum(r.weight * r.fit for r in available) / w_avail
    score = min(uncapped, HARD_CAP) if violations else uncapped
    return ExpertResult(score, uncapped, completeness, params, violations)
