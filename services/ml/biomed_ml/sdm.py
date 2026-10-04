"""Species distribution models: LightGBM (production) and logistic regression (baseline).

Validation is spatial block cross-validation (5° blocks assigned to 5 folds, see
biomed_pipeline.sdm_data). Per fold and model:
  AUC  area under the ROC curve on the held-out blocks;
  TSS  sensitivity + specificity - 1 on the held-out blocks, at the threshold that maximises
       TSS on inner out-of-fold predictions of the training folds (leave-one-block-fold-out
       inside the training set). Using the training predictions themselves would pick an
       over-confident threshold for flexible models; the test fold is never used.
Out-of-fold LightGBM predictions are calibrated with isotonic regression; the reliability
curve (10 bins) is reported before and after calibration. Presence/background models estimate
*relative* environmental suitability: calibration aligns scores with the presence share of the
training design (balanced weights), not with an absolute probability of occurrence.

Explanations use LightGBM's TreeSHAP (``pred_contrib=True``, Lundberg et al. 2020), which
gives exact Shapley values in log-odds space.
"""

from __future__ import annotations

import json
import logging
from dataclasses import asdict, dataclass, field
from pathlib import Path

import joblib
import lightgbm as lgb
import numpy as np
import pandas as pd
from sklearn.isotonic import IsotonicRegression
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler

log = logging.getLogger(__name__)

SEED = 20261004
LGBM_PARAMS = dict(
    objective="binary",
    n_estimators=400,
    learning_rate=0.03,
    num_leaves=15,
    min_child_samples=20,
    subsample=0.8,
    subsample_freq=1,
    colsample_bytree=0.8,
    reg_lambda=1.0,
    random_state=SEED,
    n_jobs=4,
    verbose=-1,
)


def balanced_weights(y: np.ndarray) -> np.ndarray:
    pos = y.sum()
    neg = len(y) - pos
    return np.where(y == 1, 0.5 / pos, 0.5 / neg) * len(y)


def make_lgbm() -> lgb.LGBMClassifier:
    return lgb.LGBMClassifier(**LGBM_PARAMS)


def make_logreg():
    # Quadratic terms let the baseline express unimodal (niche-like) responses.
    return make_pipeline(
        StandardScaler(),
        PolynomialFeatures(degree=2, include_bias=False),
        LogisticRegression(C=0.5, max_iter=5000, class_weight="balanced"),
    )


def best_tss_threshold(y: np.ndarray, p: np.ndarray) -> tuple[float, float]:
    fpr, tpr, thr = roc_curve(y, p)
    tss = tpr - fpr
    i = int(np.argmax(tss))
    return float(thr[i]), float(tss[i])


def tss_at(y: np.ndarray, p: np.ndarray, threshold: float) -> float:
    pred = p >= threshold
    sens = (pred & (y == 1)).sum() / max((y == 1).sum(), 1)
    spec = (~pred & (y == 0)).sum() / max((y == 0).sum(), 1)
    return float(sens + spec - 1)


def reliability(y: np.ndarray, p: np.ndarray, bins: int = 10) -> list[dict]:
    edges = np.linspace(0, 1, bins + 1)
    idx = np.clip(np.digitize(p, edges) - 1, 0, bins - 1)
    out = []
    for b in range(bins):
        m = idx == b
        if m.any():
            out.append(
                {
                    "bin": b,
                    "lo": float(edges[b]),
                    "hi": float(edges[b + 1]),
                    "mean_predicted": float(p[m].mean()),
                    "observed": float(y[m].mean()),
                    "n": int(m.sum()),
                }
            )
    return out


@dataclass
class FoldResult:
    fold: int
    n_train: int
    n_test: int
    n_test_presences: int
    auc: float
    tss: float
    threshold: float


@dataclass
class ModelMetrics:
    model: str
    folds: list[FoldResult] = field(default_factory=list)

    def summary(self) -> dict:
        auc = [f.auc for f in self.folds]
        tss = [f.tss for f in self.folds]
        return {
            "model": self.model,
            "auc_mean": float(np.mean(auc)) if auc else None,
            "auc_std": float(np.std(auc)) if auc else None,
            "tss_mean": float(np.mean(tss)) if tss else None,
            "tss_std": float(np.std(tss)) if tss else None,
            "n_folds": len(self.folds),
            "folds": [asdict(f) for f in self.folds],
        }


@dataclass
class TrainedSpecies:
    species_id: str
    features: list[str]
    booster: lgb.Booster
    calibrator: IsotonicRegression
    threshold: float
    metrics: dict

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        raw = self.booster.predict(X[self.features].to_numpy(dtype=float))
        return self.calibrator.predict(raw)

    def shap(self, X: pd.DataFrame) -> np.ndarray:
        """TreeSHAP contributions (n, n_features + 1); last column is the expected value."""
        return self.booster.predict(X[self.features].to_numpy(dtype=float), pred_contrib=True)

    def save(self, directory: Path) -> None:
        directory.mkdir(parents=True, exist_ok=True)
        self.booster.save_model(str(directory / "model.txt"))
        joblib.dump(self.calibrator, directory / "calibrator.joblib")
        (directory / "metrics.json").write_text(
            json.dumps(
                {
                    "species_id": self.species_id,
                    "features": self.features,
                    "threshold": self.threshold,
                    **self.metrics,
                },
                indent=2,
            )
            + "\n"
        )

    @classmethod
    def load(cls, directory: Path) -> TrainedSpecies:
        meta = json.loads((directory / "metrics.json").read_text())
        return cls(
            species_id=meta["species_id"],
            features=meta["features"],
            booster=lgb.Booster(model_file=str(directory / "model.txt")),
            calibrator=joblib.load(directory / "calibrator.joblib"),
            threshold=meta["threshold"],
            metrics={
                k: v for k, v in meta.items() if k not in ("species_id", "features", "threshold")
            },
        )


def _fit(name: str, X: np.ndarray, y: np.ndarray):
    if name == "lightgbm":
        return make_lgbm().fit(X, y, sample_weight=balanced_weights(y))
    return make_logreg().fit(X, y)


def inner_threshold(name: str, X: np.ndarray, y: np.ndarray, folds: np.ndarray) -> float:
    """Max-TSS threshold from inner out-of-fold predictions over the training folds."""
    p = np.full(len(y), np.nan)
    for k in np.unique(folds):
        te = folds == k
        if len(np.unique(y[~te])) < 2:
            continue
        p[te] = _fit(name, X[~te], y[~te]).predict_proba(X[te])[:, 1]
    ok = ~np.isnan(p)
    if len(np.unique(y[ok])) < 2:
        return 0.5
    return best_tss_threshold(y[ok], p[ok])[0]


def cross_validate(data: pd.DataFrame, features: list[str]) -> tuple[dict, np.ndarray]:
    """Spatial block CV for both models. Returns metrics and LightGBM out-of-fold scores."""
    X = data[features].to_numpy(dtype=float)
    y = data["label"].to_numpy(dtype=int)
    folds = data["fold"].to_numpy()
    oof = np.full(len(y), np.nan)
    results = {"lightgbm": ModelMetrics("lightgbm"), "logreg": ModelMetrics("logreg")}
    for k in sorted(np.unique(folds)):
        test = folds == k
        train = ~test
        if len(np.unique(y[test])) < 2 or len(np.unique(y[train])) < 2:
            continue  # a fold without presences (or background) cannot be scored
        for name in ("lightgbm", "logreg"):
            m = _fit(name, X[train], y[train])
            p_test = m.predict_proba(X[test])[:, 1]
            thr = inner_threshold(name, X[train], y[train], folds[train])
            results[name].folds.append(
                FoldResult(
                    fold=int(k),
                    n_train=int(train.sum()),
                    n_test=int(test.sum()),
                    n_test_presences=int(y[test].sum()),
                    auc=float(roc_auc_score(y[test], p_test)),
                    tss=tss_at(y[test], p_test, thr),
                    threshold=thr,
                )
            )
            if name == "lightgbm":
                oof[test] = p_test
    return {name: r.summary() for name, r in results.items()}, oof


def train_species(species_id: str, data: pd.DataFrame, features: list[str]) -> TrainedSpecies:
    data = data.dropna(subset=features).reset_index(drop=True)
    y = data["label"].to_numpy(dtype=int)
    cv, oof = cross_validate(data, features)

    scored = ~np.isnan(oof)
    calibrator = IsotonicRegression(out_of_bounds="clip", y_min=0.0, y_max=1.0)
    calibrator.fit(oof[scored], y[scored])
    calibrated = calibrator.predict(oof[scored])
    threshold, _ = best_tss_threshold(y[scored], calibrated)

    final = make_lgbm().fit(
        data[features].to_numpy(dtype=float), y, sample_weight=balanced_weights(y)
    )
    booster = final.booster_
    contrib = booster.predict(data[features].to_numpy(dtype=float), pred_contrib=True)[:, :-1]
    importance = {
        f: {
            "mean_abs_shap": float(np.abs(contrib[:, i]).mean()),
            "gain": float(booster.feature_importance("gain")[i]),
        }
        for i, f in enumerate(features)
    }
    metrics = {
        "n_presences": int(y.sum()),
        "n_background": int((y == 0).sum()),
        "n_blocks": int(data["block"].nunique()),
        "cv": cv,
        "calibration": {
            "raw": reliability(y[scored], oof[scored]),
            "calibrated": reliability(y[scored], calibrated),
        },
        "importance": importance,
    }
    log.info(
        "%s: LGBM AUC %.3f±%.3f TSS %.3f | LR AUC %.3f TSS %.3f",
        species_id,
        cv["lightgbm"]["auc_mean"],
        cv["lightgbm"]["auc_std"],
        cv["lightgbm"]["tss_mean"],
        cv["logreg"]["auc_mean"],
        cv["logreg"]["tss_mean"],
    )
    return TrainedSpecies(species_id, features, booster, calibrator, threshold, metrics)
