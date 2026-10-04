"""Training data for the species distribution models (presence / background).

Per species:
1. Presences: cleaned GBIF/OBIS occurrences, thinned to one per environmental pixel
   (1/12° for marine species, 0.25° for terrestrial and freshwater species) and kept only
   where the habitat's global layers have data (marine records on land are dropped, etc.).
2. Accessible area M: pixels within ACCESSIBLE_KM of a presence (BAM framework).
3. Background (pseudo-absences), BG_RATIO x presences, clipped to [BG_MIN, BG_MAX]:
   * half target-group background: thinned records of the other species of the same group
     inside M. They carry the same recording bias (coasts, Europe, North America), which
     corrects sampling bias (Phillips et al. 2009, Ecol. Appl. 19:181);
   * half random pixels in M, area-weighted (cos latitude).
   Background pixels that hold a presence are excluded.
4. Spatial blocks: 5° x 5° grid squares, randomly assigned (seeded) to 5 folds, so that
   cross-validation never tests on pixels adjacent to training pixels.
"""

from __future__ import annotations

import json
import logging

import numpy as np
import pandas as pd
from scipy.spatial import cKDTree

from .aggregate import _to_xyz, chord_to_km
from .settings import get_settings
from .sources import ml_layers
from .species import SPECIES

log = logging.getLogger(__name__)

SEED = 20261004
ACCESSIBLE_KM = 1000
BG_RATIO, BG_MIN, BG_MAX = 3, 1000, 10_000
BLOCK_DEG = 5
N_FOLDS = 5
MIN_PRESENCES = 30
THIN_DEG = {"marine": 1 / 12, "terrestrial": 0.25, "freshwater": 0.25}


def group(habitat: str) -> str:
    return "marine" if habitat == "marine" else "land"


def features_for(habitat: str) -> list[str]:
    return ml_layers.MARINE if habitat == "marine" else ml_layers.TERRESTRIAL


def thin(df: pd.DataFrame, deg: float) -> pd.DataFrame:
    key = (
        np.floor(df["lat"] / deg).astype(int).astype(str)
        + "_"
        + np.floor(df["lon"] / deg).astype(int).astype(str)
    )
    return df.assign(pixel=key.values).drop_duplicates("pixel")


def sample(habitat: str, lat: np.ndarray, lon: np.ndarray) -> pd.DataFrame:
    fn = ml_layers.sample_marine if habitat == "marine" else ml_layers.sample_terrestrial
    return fn(lat, lon)


def candidate_pixels(habitat: str) -> tuple[np.ndarray, np.ndarray]:
    """Centres of habitat-valid pixels at the thinning resolution (global)."""
    if habitat == "marine":
        lat, lon, sst = ml_layers.cmems_stats()["sst_mean"]
        lon2, lat2 = np.meshgrid(lon, lat)
        ok = ~np.isnan(sst)
    else:
        tc = ml_layers.terraclimate_global()
        lon2, lat2 = np.meshgrid(tc.lon.values, tc.lat.values)
        ok = ~np.isnan(tc["tair_mean"].values)
    return lat2[ok], lon2[ok]


def within(lat, lon, plat, plon, km) -> np.ndarray:
    chord, _ = cKDTree(_to_xyz(plat, plon)).query(_to_xyz(lat, lon))
    return chord_to_km(chord) <= km


def build_species(sp, occ: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    deg = THIN_DEG[sp.habitat]
    feats = features_for(sp.habitat)
    pres = thin(occ[occ["species_id"] == sp.id], deg)
    X = sample(sp.habitat, pres["lat"].to_numpy(), pres["lon"].to_numpy())
    pres = pres.reset_index(drop=True).join(X)
    pres = pres.dropna(subset=feats)
    n_pres = len(pres)
    if n_pres == 0:
        return pd.DataFrame()

    n_bg = int(np.clip(BG_RATIO * n_pres, BG_MIN, BG_MAX))
    taken = set(pres["pixel"])

    # Target-group background.
    others = [s.id for s in SPECIES if s.id != sp.id and group(s.habitat) == group(sp.habitat)]
    tgb = thin(occ[occ["species_id"].isin(others)], deg)
    tgb = tgb[~tgb["pixel"].isin(taken)]
    if len(tgb):
        tgb = tgb[
            within(
                tgb["lat"].to_numpy(),
                tgb["lon"].to_numpy(),
                pres["lat"].to_numpy(),
                pres["lon"].to_numpy(),
                ACCESSIBLE_KM,
            )
        ]
    tgb = tgb.sample(n=min(len(tgb), n_bg // 2), random_state=SEED)
    taken |= set(tgb["pixel"])

    # Random background in M, area-weighted.
    clat, clon = candidate_pixels(sp.habitat)
    inside = within(clat, clon, pres["lat"].to_numpy(), pres["lon"].to_numpy(), ACCESSIBLE_KM)
    clat, clon = clat[inside], clon[inside]
    w = np.cos(np.radians(clat))
    n_rand = n_bg - len(tgb)
    idx = rng.choice(
        len(clat), size=min(len(clat), int(n_rand * 1.2)), replace=False, p=w / w.sum()
    )
    rnd = thin(pd.DataFrame({"lat": clat[idx], "lon": clon[idx]}), deg)
    rnd = rnd[~rnd["pixel"].isin(taken)].head(n_rand)

    bg = pd.concat(
        [tgb[["lat", "lon", "pixel"]].assign(kind="target_group"), rnd.assign(kind="random")],
        ignore_index=True,
    )
    bg = bg.join(sample(sp.habitat, bg["lat"].to_numpy(), bg["lon"].to_numpy()))
    bg = bg.dropna(subset=feats)

    out = pd.concat(
        [
            pres[["lat", "lon", "pixel", *feats]].assign(kind="presence", label=1),
            bg[["lat", "lon", "pixel", "kind", *feats]].assign(label=0),
        ],
        ignore_index=True,
    )
    out["species_id"] = sp.id
    out["block"] = (
        np.floor(out["lat"] / BLOCK_DEG).astype(int).astype(str)
        + "_"
        + np.floor(out["lon"] / BLOCK_DEG).astype(int).astype(str)
    )
    blocks = np.array(sorted(out["block"].unique()))
    perm = np.random.default_rng(SEED).permutation(len(blocks))
    fold_of = {b: int(i % N_FOLDS) for b, i in zip(blocks, perm, strict=True)}
    out["fold"] = out["block"].map(fold_of)
    log.info(
        "%s: %d presences, %d background (%d target-group), %d blocks",
        sp.id,
        n_pres,
        len(bg),
        int((bg["kind"] == "target_group").sum()),
        len(blocks),
    )
    return out


def build(occurrences: pd.DataFrame | None = None) -> pd.DataFrame:
    if occurrences is None:
        occurrences = pd.read_parquet(
            get_settings().clean_dir / "occurrences" / "occurrences.parquet"
        )
    rng = np.random.default_rng(SEED)
    frames = [build_species(sp, occurrences, rng) for sp in SPECIES]
    data = pd.concat([f for f in frames if len(f)], ignore_index=True)
    out = get_settings().clean_dir / "ml"
    out.mkdir(parents=True, exist_ok=True)
    data.to_parquet(out / "training.parquet", index=False, compression="zstd")
    summary = {
        sp.id: {
            "presences": int(((data.species_id == sp.id) & (data.label == 1)).sum()),
            "background": int(((data.species_id == sp.id) & (data.label == 0)).sum()),
            "trainable": bool(
                ((data.species_id == sp.id) & (data.label == 1)).sum() >= MIN_PRESENCES
            ),
        }
        for sp in SPECIES
    }
    meta = {
        "seed": SEED,
        "accessible_km": ACCESSIBLE_KM,
        "bg_ratio": BG_RATIO,
        "bg_min": BG_MIN,
        "bg_max": BG_MAX,
        "block_deg": BLOCK_DEG,
        "n_folds": N_FOLDS,
        "min_presences": MIN_PRESENCES,
        "thin_deg": THIN_DEG,
        "species": summary,
    }
    (out / "training_meta.json").write_text(json.dumps(meta, indent=2) + "\n")
    return data
