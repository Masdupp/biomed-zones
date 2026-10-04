"""docs/MODEL_CARD.md and docs/model/*.png, generated from the active run in the database.

Chart colours: reference categorical slots 1-2 (blue #2a78d6, orange #eb6834), validated with
the dataviz palette checker on the app surface #FAFAF9 (lightness, chroma, CVD, contrast pass).
"""

from __future__ import annotations

from datetime import UTC, datetime

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

from biomed_pipeline.features import BY_KEY  # noqa: E402
from biomed_pipeline.sdm_data import MIN_PRESENCES  # noqa: E402
from biomed_pipeline.settings import REPO_ROOT  # noqa: E402

from . import store  # noqa: E402
from .profiles import load_profiles  # noqa: E402

BLUE, ORANGE = "#2a78d6", "#eb6834"
INK, INK2, GRID, SURFACE = "#0C1116", "#52514e", "#e7e5e4", "#FAFAF9"
DOCS = REPO_ROOT / "docs"
IMG = DOCS / "model"


def _style(ax) -> None:
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    for s in ("left", "bottom"):
        ax.spines[s].set_color(GRID)
    ax.tick_params(colors=INK2, labelsize=8)
    ax.grid(color=GRID, linewidth=0.6)
    ax.set_axisbelow(True)


def _fig(w, h):
    fig = plt.figure(figsize=(w, h), dpi=160, facecolor=SURFACE)
    plt.rcParams.update({"font.size": 8, "text.color": INK, "axes.labelcolor": INK2})
    return fig


def plot_metrics(rows: list[dict], names: dict) -> str:
    trained = [r for r in rows if r["trained"]]
    fig = _fig(6.4, 0.45 * len(trained) + 1.2)
    ax = fig.add_subplot(111)
    _style(ax)
    ys = range(len(trained))
    for offset, key, std, color, label in (
        (-0.12, "lr_auc_mean", None, ORANGE, "Logistic regression (baseline)"),
        (0.12, "auc_mean", "auc_std", BLUE, "LightGBM"),
    ):
        xs = [r[key] for r in trained]
        err = [r[std] for r in trained] if std else None
        ax.errorbar(
            xs,
            [y + offset for y in ys],
            xerr=err,
            fmt="o",
            ms=6,
            color=color,
            ecolor=color,
            elinewidth=1.5,
            capsize=0,
            label=label,
        )
    for y, r in zip(ys, trained, strict=True):
        ax.annotate(
            f"{r['auc_mean']:.2f}",
            (r["auc_mean"], y + 0.12),
            xytext=(6, -3),
            textcoords="offset points",
            color=INK,
            fontsize=7,
        )
    ax.set_yticks(list(ys), [names[r["species_id"]] for r in trained], fontstyle="italic")
    ax.set_xlim(0.5, 1.0)
    ax.set_xlabel("AUC, spatial block cross-validation (mean ± 1 SD over folds)")
    ax.legend(loc="lower left", frameon=False, fontsize=7)
    fig.tight_layout()
    IMG.mkdir(parents=True, exist_ok=True)
    fig.savefig(IMG / "metrics.png", facecolor=SURFACE)
    plt.close(fig)
    return "model/metrics.png"


def plot_calibration(rows: list[dict], names: dict) -> str:
    trained = [r for r in rows if r["trained"]]
    n = len(trained)
    cols = 3
    rows_n = (n + cols - 1) // cols
    fig = _fig(7.2, 2.3 * rows_n)
    for i, r in enumerate(trained):
        ax = fig.add_subplot(rows_n, cols, i + 1)
        _style(ax)
        ax.plot([0, 1], [0, 1], color=INK2, linewidth=1, linestyle=(0, (3, 3)))
        cal = r["detail"]["calibration"]
        for key, color, label in (
            ("raw", ORANGE, "Raw LightGBM"),
            ("calibrated", BLUE, "Isotonic"),
        ):
            pts = cal[key]
            ax.plot(
                [p["mean_predicted"] for p in pts],
                [p["observed"] for p in pts],
                "-o",
                color=color,
                linewidth=2,
                ms=4,
                label=label,
            )
        ax.set_title(names[r["species_id"]], fontsize=8, fontstyle="italic", color=INK)
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        if i % cols == 0:
            ax.set_ylabel("Observed presence share")
        if i >= n - cols:
            ax.set_xlabel("Predicted suitability")
        if i == 0:
            ax.legend(frameon=False, fontsize=6.5, loc="upper left")
    fig.tight_layout()
    fig.savefig(IMG / "calibration.png", facecolor=SURFACE)
    plt.close(fig)
    return "model/calibration.png"


def plot_importance(rows: list[dict], names: dict) -> str:
    trained = [r for r in rows if r["trained"]]
    n = len(trained)
    cols = 3
    rows_n = (n + cols - 1) // cols
    fig = _fig(7.2, 2.4 * rows_n)
    for i, r in enumerate(trained):
        ax = fig.add_subplot(rows_n, cols, i + 1)
        _style(ax)
        imp = sorted(r["detail"]["importance"].items(), key=lambda kv: kv[1]["mean_abs_shap"])
        labels = [k.removeprefix("ml_").replace("_", " ") for k, _ in imp]
        vals = [v["mean_abs_shap"] for _, v in imp]
        ax.barh(labels, vals, color=BLUE, height=0.6)
        ax.set_title(names[r["species_id"]], fontsize=8, fontstyle="italic", color=INK)
        ax.tick_params(axis="y", labelsize=6.5)
        if i >= n - cols:
            ax.set_xlabel("mean |SHAP| (log-odds)")
    fig.tight_layout()
    fig.savefig(IMG / "importance.png", facecolor=SURFACE)
    plt.close(fig)
    return "model/importance.png"


def _fmt(v, d=3):
    return "—" if v is None else f"{v:.{d}f}"


def write() -> str:
    run = store.active_run()
    if run is None:
        raise RuntimeError("no active run")
    rows = store.metrics_for(run["id"])
    profiles = load_profiles()
    names = {k: v.scientific_name for k, v in profiles.items()}
    m_img, c_img, i_img = (
        plot_metrics(rows, names),
        plot_calibration(rows, names),
        plot_importance(rows, names),
    )

    table = [
        "| Species | Habitat | Presences | Background | LightGBM AUC | LightGBM TSS | "
        "Baseline AUC | Baseline TSS | Status |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    for r in rows:
        sp = profiles[r["species_id"]]
        status = "trained" if r["trained"] else f"expert only — {r['reason']}"
        auc = f"{_fmt(r['auc_mean'])} ± {_fmt(r['auc_std'])}" if r["trained"] else "—"
        tss = f"{_fmt(r['tss_mean'])} ± {_fmt(r['tss_std'])}" if r["trained"] else "—"
        table.append(
            f"| *{sp.scientific_name}* | {sp.habitat} | {r['n_presences']} | "
            f"{r['n_background']} | {auc} | {tss} | {_fmt(r['lr_auc_mean'])} | "
            f"{_fmt(r['lr_tss_mean'])} | {status} |"
        )

    top = []
    for r in rows:
        if not r["trained"]:
            continue
        imp = sorted(r["detail"]["importance"].items(), key=lambda kv: -kv[1]["mean_abs_shap"])
        top.append(
            f"| *{names[r['species_id']]}* | "
            + ", ".join(BY_KEY[k].label.replace(" (global layer)", "") for k, _ in imp[:3])
            + " |"
        )

    now = datetime.now(UTC).strftime("%Y-%m-%d")
    text = f"""# Model card — BioMed Zones suitability model

> Tables and figures generated by `biomed-ml report` on {now} from run `{run["id"]}`
> ({run["message"]}). Narrative sections are maintained by hand in
> `services/ml/biomed_ml/report.py`.

## 1. Intended use

Screening tool to answer *"where in France (Metropole + DROM) could species X be cultivated
sustainably, and why?"*. Outputs are a 0–100 score per H3 cell, a 0–1 confidence, the limiting
factors and the model drivers. Intended users: researchers, aquaculture and agriculture
planners, students. **Not** intended for licensing decisions, site approval or any use without
field validation; protected-area rules must be checked with the managing authority.

## 2. Method (hybrid and decomposable)

1. **Expert score** (rule-based). Per parameter a trapezoid fit: 100 inside the optimal band,
   linear decay to 0 at the tolerance limits, 0 outside. Habitat weights — marine: temperature
   0.30, salinity 0.20, pH 0.20, depth 0.15, O₂ 0.15; terrestrial: temperature 0.30, soil pH
   0.25, humidity 0.20, rainfall 0.15, altitude 0.10; freshwater: water temperature (air proxy)
   1.0. Hard constraints: lethal parameters are checked on monthly extremes (coldest/warmest
   month, lowest salinity or oxygen month, frost days for frost-sensitive plants); a violation
   caps the score at 25.
2. **ML score** (species distribution model). LightGBM per species on GBIF/OBIS presences vs.
   background points, logistic regression with quadratic terms as baseline. Predictors come from
   global layers (Copernicus Marine, ETOPO 2022, TerraClimate, SoilGrids) so that training and
   prediction share one definition. Presences are thinned to one per environmental pixel.
   Background: accessible area of 1,000 km around presences; half target-group background
   (records of the other species of the same group, which share the recording bias — spatial
   bias correction), half area-weighted random points; ratio 3:1 (1,000–10,000 points).
   Validation: **spatial block cross-validation** (5° blocks, 5 folds); TSS uses the threshold
   that maximises TSS on the training folds. Out-of-fold predictions are calibrated with
   isotonic regression. Species with fewer than {MIN_PRESENCES} thinned presences get no model.
3. **Final score**: `final = (0.5·expert + 0.5·ml) × regulatory × human × data`, the blend being
   capped when a hard constraint fails. Regulatory 0.6–1.0 (national park core, Natura 2000,
   marine park; ≥ 50 % strict protection ⇒ excluded), human pressure 0.7–1.0 (artificial land
   share, or distance to port at sea), data 0.7–1.0 (completeness of expert inputs). Confidence
   = completeness × (0.4 + 0.6 × model quality × expert/ML agreement).
4. **Explanations**: exact TreeSHAP values from LightGBM (`pred_contrib`), top 3 per cell.

## 3. Training data

Occurrences: GBIF download https://doi.org/10.15468/dl.sfc2ns and OBIS, filtered (coordinates,
no geospatial issue, ≥ 1970, uncertainty ≤ 10 km or unreported, no living or fossil specimens).
Environmental layers and their provenance: see `docs/DATA_REPORT.md`.

## 4. Metrics (spatial block cross-validation)

{chr(10).join(table)}

![AUC per species]({m_img})

Calibration of the out-of-fold predictions, before (orange) and after (blue) isotonic
regression. The blue curve is evaluated on the same out-of-fold predictions the isotonic map was
fitted on, so its closeness to the diagonal is optimistic; the orange curve is the honest view of
the raw model.

![Calibration]({c_img})

Most influential predictors (mean |SHAP|):

| Species | Top 3 predictors |
|---|---|
{chr(10).join(top)}

![Feature importance]({i_img})

## 5. Honesty rules built into the score

- **Freshwater species** (*Danio rerio*, *Ambystoma mexicanum*): no freshwater layer is in
  scope and both species are non-native; the output is always "controlled indoor cultivation
  only", with the open-environment score capped at 30.
- **Marine species outside their native range** (*Limulus polyphemus* everywhere in France,
  *Conus magus* outside the Indian Ocean territories): open-water culture would be a biological
  introduction; same indoor-only rule.
- **Climate outside survival limits** (e.g. tropical species in Metropole): the hard constraint
  caps the expert score and the cell is labelled indoor-only, even if the ML model disagrees.

## 6. Known limits and biases

- Presence/background SDMs estimate **relative** environmental suitability, not probability of
  occurrence or yield. Calibration aligns scores with the training design, not with prevalence.
- Occurrences of *Ginkgo biloba* and *Catharanthus roseus* are dominated by planted individuals
  (urban trees, gardens): their models describe where the species is *grown*, which is close to
  the question asked but not the natural niche. *Salix alba* records concentrate in Western
  Europe (France alone holds a third).
- *Limulus polyphemus* training data cover only North America; transferring to French waters is
  extrapolation (and the species is non-native). Its LightGBM model is unstable across spatial
  folds (AUC SD ≈ 0.19) and the logistic baseline scores higher; LightGBM is kept for
  consistency of explanations, and every French cell is indoor-only for this species anyway.
- *Danio rerio* (104 thinned presences) has a weak, unstable model (AUC ≈ 0.76).
- *Conus magus* has few records; its tolerance bands are generic tropical-reef ranges.
- Global predictors are coarse (0.083–0.25°): coastal gradients and microclimates are smoothed in
  the ML part; the expert part uses the national higher-resolution layers.
- Tolerance bands are literature-derived approximations (references in
  `data/reference/species.json`) and require validation by domain experts.
- Surface ocean values are used for O₂ and pH; benthic conditions may differ.
- Regulatory modifiers simplify management rules that are site-specific.

## 7. Versioning and retraining

Each run is stored in `model_run` with per-species metrics in `species_metric`; scores of the
active run are precomputed in `score`. Administrators retrain through `POST /admin/retrain`
(API) → `POST /train` (ML service); validated field observations are added to the training data
in the next run (Phase 4).
"""
    path = DOCS / "MODEL_CARD.md"
    path.write_text(text)
    return str(path)
