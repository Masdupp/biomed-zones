# BioMed Zones v2 — 2-minute demo script

A timed walkthrough for a live presentation. Every step works offline from the committed data
snapshot. Total: about 2 minutes, plus an optional 30-second extension.

## Before you start (5 minutes ahead)

```bash
make demo                                   # starts the stack offline; waits until healthy
open http://localhost:8080                  # or any browser
```

- Use a desktop browser window of about 1440 × 900, light theme, zoom at 100 %.
- Open these tabs ahead of time, in this order:
  1. `/`
  2. `/map?species=arenicola-marina`
  3. `/login`
- In a private window, sign in as `admin@biomed-zones.local` / `BioMedAdmin!2026` (needed only for the optional extension).
- Optional safety net: `make e2e` replays the five journeys in about 35 seconds. Run it once before the talk to confirm everything works.

## Script

| Time | Screen | Do | Say |
|---|---|---|---|
| 0:00–0:15 | **Home** `/` | Point at the live numbers and the mini-map. | "BioMed Zones answers one question: where in France can a medical species be cultivated sustainably, and why? We score 150,000 hexagons across mainland France and the five overseas regions, for nine species, using only public data: Copernicus, GBIF, OBIS, Natura 2000 and others. Every number here comes from the database." |
| 0:15–0:35 | **Map** (tab 2) | Show the viridis hexagons over France. Click **Réunion** in the toolbar, then **Metropole**. | "This is the score for the lugworm, *Arenicola marina*, used for its oxygen-carrying haemoglobin. Yellow is better. When you zoom in, the map switches from 22,000 coarse cells to 150,000 fine cells. The overseas territories use the same model." |
| 0:35–1:05 | **Cell panel** | Load `/map?species=arenicola-marina&cell=87186068affffff` (Baie du Mont-Saint-Michel). Scroll the panel slowly. | "Here is a cell in the Bay of Mont-Saint-Michel. The expert model gives 100: temperature, salinity and sediment all sit in the optimal band. The machine-learning model, trained with spatial cross-validation, gives 52. The final score is 43, and the panel says why: the cell is inside Natura 2000, which multiplies by 0.70, and the port distance by 0.81. Every value links to its source, licence and retrieval date." |
| 1:05–1:20 | **PDF** | Click **Export PDF** in the panel and open the file. | "Everything on screen exports as a citable PDF report: the score decomposition, model drivers and data provenance." |
| 1:20–1:40 | **Compare** | Back on the map, click **Add to comparison**. Pick a second cell from **Best cells in view**, add it, then click **Compare 2 cells**. | "To choose a site, compare cells side by side: a radar chart of each parameter's fit and a table, final score first." |
| 1:40–2:00 | **Model** `/model` | Scroll to the metrics table and the calibration chart. | "We are honest about limits. This page shows each species' cross-validated accuracy and calibration. Where open cultivation is unrealistic, for example freshwater species or non-native marine species, the app says *indoor only* and caps the score at 30, instead of showing a misleading map." |

## Optional extension (+30 s): contribution workflow

| Screen | Do | Say |
|---|---|---|
| `/contribute` (signed in) | Show the 5-step form: What, Where, Details, References, Review. Put the map pin on the Bay. Point at **habitat matches**. | "Field researchers contribute observations. Each one needs a reference, and the DOI is checked against Crossref." |
| `/admin` (admin window) | Open a pending item. Show **Contribution says** next to **Model says**, then click **Approve** and open the **Audit log**. | "An administrator validates against the model's prediction. Every action is audited. Contributions are stored for the next retraining." |

## If something goes wrong

| Symptom | Fix |
|---|---|
| Map stays blank | The browser has WebGL disabled. Use Chrome or Firefox with hardware acceleration on. |
| "Services did not become healthy" | Run `make ps`. If `pipeline` is still loading the snapshot (about 1 minute on first start), wait. |
| Login refused after many attempts | The auth rate limit is 20 attempts per 15 minutes per IP. Run `docker compose restart api` to reset it. |
| Port 8080 busy | Run `WEB_PORT=8090 make demo`, then open http://localhost:8090. |

## Key facts to quote

- 150,146 cells at H3 resolution 7 (about 5 km²), and 22,030 at resolution 6.
- 6 territories, 9 species, 38 environmental variables, 20 provenance-tracked sources.
- 278,852 quality-filtered occurrences (GBIF download [10.15468/dl.sfc2ns](https://doi.org/10.15468/dl.sfc2ns), plus OBIS).
- Final score = blend(expert, ML) × regulatory × human × data confidence. The method is in [MODEL_CARD.md](MODEL_CARD.md).
- Quality figures are in [TEST_REPORT.md](TEST_REPORT.md): all tests, the performance budgets and the Lighthouse scores.
