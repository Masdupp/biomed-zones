"""Final suitability score: expert ⊕ ML, then regulatory, human-pressure and data modifiers.

    blend = (w_e·expert + w_m·ml) / (w_e + w_m)          (w_m = 0 when no model is available)
    blend = min(blend, HARD_CAP) if a survival limit is violated
    final = blend × regulatory × human × data
    regulatory = 1 − max(0.40·pn_core, 0.30·n2k, 0.25·pnm, 0.40·strict)   ∈ [0.6, 1]
                 excluded (score 0) when strict protection covers ≥ 50 % of the cell
    human      = 1 − 0.30·artificial_frac (land)  |  1 − 0.30·max(0, 1 − dist_port_km/50) (sea)
    data       = 0.7 + 0.3·completeness          (share of expert weights with data)
    confidence = completeness × (0.4 + 0.6·model_quality·agreement)
                 model_quality = clip((AUC − 0.5)/0.4, 0.3, 1), 0.6 without model
                 agreement     = 1 − |expert − ml| / 100, 1 without model

Honesty rules: freshwater species, marine species outside their native range (introduction
risk) and cells where a temperature survival limit fails are labelled "indoor only" and their
open-environment score is capped at INDOOR_CAP.
"""

from __future__ import annotations

import math
from dataclasses import asdict, dataclass, field

from .expert import HARD_CAP, ExpertResult, expert_score
from .profiles import Species

INDOOR_CAP = 30.0
STRICT_EXCLUSION = 0.5
DEFAULT_WEIGHTS = (0.5, 0.5)


def _f(features: dict, key: str, default: float = 0.0) -> float:
    v = features.get(key)
    if v is None:
        return default
    v = float(v)
    return default if math.isnan(v) else v


def regulatory_modifier(features: dict) -> tuple[float, bool, list[str]]:
    strict = _f(features, "strict_frac")
    if strict >= STRICT_EXCLUSION:
        return 0.0, True, ["strict protection (reserve or biotope order) covers most of the cell"]
    terms = {
        "national park core": 0.40 * _f(features, "pn_core_frac"),
        "Natura 2000": 0.30 * _f(features, "n2k_frac"),
        "marine natural park": 0.25 * _f(features, "pnm_frac"),
        "strict protection (partial)": 0.40 * strict,
    }
    name, penalty = max(terms.items(), key=lambda kv: kv[1])
    notes = [f"{name} overlap" for n, p in terms.items() if p > 0 and n == name]
    return max(0.6, 1.0 - penalty), False, notes


def human_modifier(species: Species, features: dict) -> float:
    if species.habitat == "marine":
        d = features.get("dist_port_km")
        if d is None or math.isnan(float(d)):
            return 1.0
        pressure = max(0.0, 1.0 - float(d) / 50.0)
    else:
        pressure = _f(features, "artificial_frac")
    return max(0.7, 1.0 - 0.3 * pressure)


def category_for(score: float) -> str:
    if score >= 70:
        return "high"
    if score >= 50:
        return "moderate"
    if score >= 30:
        return "low"
    return "unsuitable"


@dataclass
class Driver:
    feature: str
    value: float | None
    shap: float

    @property
    def direction(self) -> str:
        return "raises" if self.shap > 0 else "lowers"


@dataclass
class CellScore:
    species_id: str
    score: float
    expert_score: float | None
    ml_score: float | None
    confidence: float
    completeness: float
    regulatory_mod: float
    human_mod: float
    data_mod: float
    category: str
    mode: str  # "open" | "indoor_only" | "excluded"
    mode_reasons: list[str]
    limiting: list[dict]
    drivers: list[Driver] = field(default_factory=list)
    expert: ExpertResult | None = None
    weights: tuple[float, float] = DEFAULT_WEIGHTS

    def to_dict(self, include_breakdown: bool = True) -> dict:
        d = {k: v for k, v in asdict(self).items() if k not in ("expert", "drivers")}
        d["drivers"] = [
            {
                "feature": x.feature,
                "value": x.value,
                "shap": round(x.shap, 4),
                "direction": x.direction,
            }
            for x in self.drivers
        ]
        if include_breakdown and self.expert:
            d["parameters"] = [asdict(p) for p in self.expert.parameters]
            d["violations"] = [asdict(v) for v in self.expert.violations]
        d["recommendation"] = recommendation(self)
        return d


def score_cell(
    species: Species,
    features: dict,
    territory: str | None,
    ml_probability: float | None = None,
    model_auc: float | None = None,
    drivers: list[Driver] | None = None,
    weights: tuple[float, float] = DEFAULT_WEIGHTS,
) -> CellScore:
    ex = expert_score(species, features)
    expert = ex.score if ex.score is not None else 0.0
    ml = None if ml_probability is None else 100.0 * float(ml_probability)
    w_e, w_m = weights
    if ml is None:
        w_m = 0.0
    blend = (w_e * expert + w_m * (ml or 0.0)) / (w_e + w_m) if (w_e + w_m) else expert
    if ex.capped:
        blend = min(blend, HARD_CAP)

    reg, excluded, reg_notes = regulatory_modifier(features)
    hum = human_modifier(species, features)
    data_mod = 0.7 + 0.3 * ex.completeness
    final = blend * reg * hum * data_mod

    quality = (
        0.6 if model_auc is None or ml is None else min(1.0, max(0.3, (model_auc - 0.5) / 0.4))
    )
    agreement = 1.0 if ml is None else 1.0 - abs(expert - ml) / 100.0
    confidence = ex.completeness * (0.4 + 0.6 * quality * agreement)

    mode, reasons = "open", list(reg_notes)
    if excluded:
        mode, final = "excluded", 0.0
    else:
        if species.habitat == "freshwater":
            reasons.append(
                "freshwater species: no open freshwater layer, and release of a "
                "non-native species is not acceptable"
            )
        elif (
            species.habitat == "marine"
            and territory
            and territory not in species.native_territories
        ):
            reasons.append(
                "outside the native range: open-water culture would be an introduction risk"
            )
        if any(v.parameter == "temperature" for v in ex.violations):
            reasons.append("climate outside the survival range (temperature or frost)")
        if len(reasons) > len(reg_notes):
            mode = "indoor_only"
            final = min(final, INDOOR_CAP)
    category = (
        "excluded"
        if mode == "excluded"
        else ("indoor_only" if mode == "indoor_only" else category_for(final))
    )
    return CellScore(
        species_id=species.id,
        score=round(final, 2),
        expert_score=None if ex.score is None else round(ex.score, 2),
        ml_score=None if ml is None else round(ml, 2),
        confidence=round(confidence, 3),
        completeness=round(ex.completeness, 3),
        regulatory_mod=round(reg, 3),
        human_mod=round(hum, 3),
        data_mod=round(data_mod, 3),
        category=category,
        mode=mode,
        mode_reasons=reasons,
        limiting=ex.limiting_factors(3),
        drivers=drivers or [],
        expert=ex,
        weights=(w_e, w_m),
    )


LABELS = {
    "high": "highly suitable",
    "moderate": "moderately suitable",
    "low": "marginal",
    "unsuitable": "unsuitable",
}


def recommendation(s: CellScore) -> str:
    name = s.species_id.replace("-", " ").capitalize()
    if s.mode == "excluded":
        return (
            f"Excluded: this cell is mostly under strict protection, where cultivation of "
            f"{name} is not permitted."
        )
    parts = []
    if s.mode == "indoor_only":
        parts.append(
            f"Only controlled indoor cultivation of {name} is realistic here "
            f"({'; '.join(r for r in s.mode_reasons if 'overlap' not in r)})."
        )
    else:
        parts.append(
            f"{name}: {LABELS[s.category]} for open cultivation "
            f"(score {s.score:.0f}/100, confidence {s.confidence:.2f})."
        )
    if s.limiting:
        parts.append("Main limiting factors: " + "; ".join(x["detail"] for x in s.limiting) + ".")
    if s.regulatory_mod < 1:
        parts.append(
            f"Protected-area overlap reduces the score (×{s.regulatory_mod:.2f}); "
            f"check site management rules before any project."
        )
    if s.ml_score is None:
        parts.append(
            "No distribution model is available for this species; the score relies "
            "on expert tolerance bands only."
        )
    elif s.expert_score is not None and abs(s.expert_score - s.ml_score) > 40:
        parts.append(
            "Expert bands and the occurrence-based model disagree strongly; treat "
            "this cell with caution."
        )
    return " ".join(parts)
