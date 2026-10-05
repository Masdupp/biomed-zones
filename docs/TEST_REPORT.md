# BioMed Zones v2 — Test report

Generated 2026-10-05 10:49 UTC by `scripts/test-report.mjs` from the JUnit output of each suite (`make report`). Commit `0e85a0e`, Node v20.20.2, Python 3.11.15.

## Summary

| Layer | Tool | Tests | Passed | Failed | Skipped | Duration |
|---|---|---:|---:|---:|---:|---:|
| Web — components & logic | Vitest + React Testing Library | 33 | 33 | 0 | 0 | 0.9 s |
| API — unit & integration | Jest + Supertest (PostGIS test DB) | 45 | 45 | 0 | 0 | 0.8 s |
| Data pipeline & ML service | pytest | 85 | 85 | 0 | 0 | 0.8 s |
| End-to-end journeys & quality | Playwright + axe-core | 17 | 17 | 0 | 0 | 27.5 s |
| **Total** | | **180** | **180** | **0** | **0** | |

**Result: all 180 tests pass.**

## Performance budgets

| Budget | Target | Measured | Status | How |
|---|---:|---:|---|---|
| Map interactive | < 2000 ms | 271 ms | ✅ | navigation start → first deck.gl frame with cells (`bz:map-ready` mark), Salix alba, res 6, ~19k cells |
| Cell click → filled panel | < 300 ms | 261 ms | ✅ | `bz:cell-click` → `bz:panel-ready` marks (profile and explanation rendered) |

## Lighthouse

Desktop preset, gpu (headed), 2026-10-05, against the production build served by the nginx gateway (`make lighthouse`). Each row is the median run by performance score of 5 runs; the last column lists every run's performance score, because WebGL pages vary between identical runs. Target ≥ 90 in every category.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Performance, all runs |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `/` | 96 | 100 | 100 | 100 | 888 ms | 1292 ms | 0 ms | 0.004 | 96, 96, 96, 96, 96 |
| `/map?species=arenicola-marina` | 96 | 100 | 100 | 100 | 628 ms | 1375 ms | 0 ms | 0 | 96, 96, 96, 96, 96 |
| `/species` | 100 | 100 | 100 | 100 | 522 ms | 645 ms | 0 ms | 0.007 | 100, 100, 100, 100, 100 |
| `/species/arenicola-marina` | 99 | 100 | 100 | 100 | 523 ms | 1034 ms | 0 ms | 0.017 | 98, 98, 99, 99, 99 |
| `/model` | 99 | 100 | 100 | 100 | 575 ms | 757 ms | 0 ms | 0.032 | 99, 99, 99, 99, 100 |
| `/sources` | 95 | 100 | 100 | 100 | 612 ms | 1518 ms | 0 ms | 0.028 | 94, 95, 95, 95, 95 |
| `/compare` | 100 | 100 | 100 | 100 | 546 ms | 650 ms | 0 ms | 0 | 100, 100, 100, 100, 100 |
| `/login` | 100 | 100 | 100 | 100 | 542 ms | 605 ms | 0 ms | 0 | 100, 100, 100, 100, 100 |

Lowest score: 95 — all pages meet the ≥ 90 target.

## Test environment and limits

- Unit and integration suites run on the host. The API suite creates a throwaway PostGIS database per run (`biomed_test_<timestamp>_<pid>`) and drops it afterwards; nothing touches the demo database.
- E2E tests run in headless Chromium against the production build behind the nginx gateway (`make demo`). Chromium renders WebGL in software (SwiftShader) there, so the measured budgets are conservative for a desktop with a GPU. The cell-panel budget has the thinnest margin (about 230–260 ms against 300 ms in software rendering).
- GitHub-hosted CI runners have no GPU, so CI relaxes the two budgets by `BUDGET_FACTOR=2` (ADR-0035). Local runs use the real budgets.
- Lighthouse figures come from headed Chrome on the GPU of the development machine (Apple silicon), desktop preset with simulated throttling. Headless SwiftShader runs score lower on the two map pages.
- Offline operation is checked in the browser: no page requests a third-party host. `make demo` starts from built images with `--no-build --pull never` and the committed snapshot; it was verified healthy in about 100 s. A run with the network physically disconnected was not automated.
- The E2E journeys 3 and 4 create a contributor account and an approved contribution in the demo database on each run (titles start with "E2E"). `make reset && make demo` restores a clean database.

## Requirement traceability

| Requirement | Covered by |
|---|---|
| Journey 1 — browse map → cell detail | e2e/journeys.spec.ts › Journey 1 |
| Journey 2 — compare cells | e2e/journeys.spec.ts › Journey 2 |
| Journey 3 — contribute (register, 5-step form, DOI check) | e2e/journeys.spec.ts › Journey 3 |
| Journey 4 — admin validates, audit log, public listing | e2e/journeys.spec.ts › Journey 4 |
| Journey 5 — export PDF report | e2e/journeys.spec.ts › Journey 5 |
| Regression: Arenicola marina × Baie du Mont-Saint-Michel (cell 87186068affffff) — inputs, expert score 100, modifiers | services/ml/tests/test_worked_example.py (pytest), apps/web/src/lib/expert.test.ts (Vitest), API explain/PDF tests |
| WCAG 2.1 AA (no serious/critical axe violations) | e2e/quality.spec.ts › Accessibility |
| Offline operation (no third-party requests) | e2e/quality.spec.ts › Offline operation |
| Auth, roles, GDPR, rate limits, audit | apps/api/tests (Jest + Supertest) |
| Spatial-CV metrics, calibration, honesty caps | services/ml/tests (pytest) |

## All tests

### Web — components & logic (Vitest + React Testing Library)

**`apps/web/src/components/AppShell.test.tsx`** — 7/7 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | AppShell and Home > renders the value proposition, live numbers with sources, and the nine species | ✅ pass | 111 ms |
| 2 | AppShell and Home > shows live service status from the health endpoints | ✅ pass | 19 ms |
| 3 | AppShell and Home > shows Sign in for visitors and hides the Admin link | ✅ pass | 16 ms |
| 4 | AppShell and Home > shows the Admin link and the user name for administrators | ✅ pass | 94 ms |
| 5 | AppShell and Home > redirects anonymous visitors from protected pages to login | ✅ pass | 17 ms |
| 6 | AppShell and Home > cycles the theme and stores the preference | ✅ pass | 28 ms |
| 7 | AppShell and Home > provides a skip link to the main content | ✅ pass | 10 ms |

**`apps/web/src/components/Markdown.test.tsx`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | Markdown > rewrites relative links and wraps tables in focusable scroll regions | ✅ pass | 75 ms |
| 2 | Markdown > says so when the document cannot be loaded | ✅ pass | 5 ms |

**`apps/web/src/components/charts.test.tsx`** — 6/6 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | SVG charts > RangeChart describes the band and the cell value in its accessible name | ✅ pass | 70 ms |
| 2 | SVG charts > RangeChart omits the marker when the cell has no value | ✅ pass | 4 ms |
| 3 | SVG charts > RadarChart draws one polygon per series plus four grid rings | ✅ pass | 6 ms |
| 4 | SVG charts > ShapBars writes the sign so direction is not conveyed by colour alone | ✅ pass | 3 ms |
| 5 | SVG charts > BarList scales bars to the largest value | ✅ pass | 2 ms |
| 6 | SVG charts > Meter exposes and clamps its value | ✅ pass | 3 ms |

**`apps/web/src/lib/color.test.ts`** — 4/4 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | viridis > maps the ends of the scale to the viridis endpoints | ✅ pass | 1 ms |
| 2 | viridis > clamps out-of-range input | ✅ pass | 0 ms |
| 3 | viridis > increases monotonically in lightness proxy (R+G+B) | ✅ pass | 0 ms |
| 4 | viridis > draws excluded cells in neutral grey | ✅ pass | 0 ms |

**`apps/web/src/lib/compare.test.ts`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | compare store > keeps at most four distinct cells, dropping the oldest | ✅ pass | 1 ms |
| 2 | compare store > removes cells | ✅ pass | 0 ms |

**`apps/web/src/lib/expert.test.ts`** — 9/9 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | trapezoid > fit(15) = 100 | ✅ pass | 1 ms |
| 2 | trapezoid > fit(5) = 50 | ✅ pass | 0 ms |
| 3 | trapezoid > fit(25) = 50 | ✅ pass | 0 ms |
| 4 | trapezoid > fit(0) = 0 | ✅ pass | 0 ms |
| 5 | trapezoid > fit(35) = 0 | ✅ pass | 0 ms |
| 6 | trapezoid > returns null for missing values | ✅ pass | 0 ms |
| 7 | expertScore (worked example) > scores the bay cell 100 with full completeness | ✅ pass | 0 ms |
| 8 | expertScore (worked example) > caps the score when the coldest month falls below the survival limit | ✅ pass | 0 ms |
| 9 | expertScore (worked example) > renormalises weights over available parameters | ✅ pass | 0 ms |

**`apps/web/src/pages/Login.test.tsx`** — 3/3 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | Login page > shows the API error for wrong credentials and stays on the page | ✅ pass | 204 ms |
| 2 | Login page > maps server validation details onto the register form fields | ✅ pass | 105 ms |
| 3 | Login page > signs in and redirects to the requested page | ✅ pass | 93 ms |

### API — unit & integration (Jest + Supertest (PostGIS test DB))

**`apps/api/tests/contributions.test.ts`** — 10/10 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | requires authentication to create | ✅ pass | 13 ms |
| 2 | validates location, habitat, outcome and dates | ✅ pass | 44 ms |
| 3 | requires a reference to submit and checks it | ✅ pass | 29 ms |
| 4 | keeps drafts private and lets the author edit and submit them | ✅ pass | 64 ms |
| 5 | lists only approved contributions publicly | ✅ pass | 5 ms |
| 6 | checks references on demand | ✅ pass | 15 ms |
| 7 | is restricted to administrators | ✅ pass | 13 ms |
| 8 | shows the queue with the model view and validates with an audit trail | ✅ pass | 49 ms |
| 9 | proxies retraining to the ML service and audits it | ✅ pass | 16 ms |
| 10 | reports the ML service as unavailable instead of crashing | ✅ pass | 25 ms |

**`apps/api/tests/gdpr.test.ts`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | exports personal data as a JSON attachment without the password hash | ✅ pass | 62 ms |
| 2 | deletes the account: unreviewed work removed, reviewed work anonymised | ✅ pass | 79 ms |

**`apps/api/tests/auth.test.ts`** — 8/8 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | rejects weak registrations | ✅ pass | 7 ms |
| 2 | registers, sets httpOnly SameSite=Strict cookies and never returns the hash | ✅ pass | 30 ms |
| 3 | logs in and out | ✅ pass | 39 ms |
| 4 | stores passwords as Argon2id hashes | ✅ pass | 12 ms |
| 5 | rotates refresh tokens and revokes the family on reuse | ✅ pass | 27 ms |
| 6 | accepts Bearer tokens for API clients | ✅ pass | 2 ms |
| 7 | answers 200 for anonymous visitors without suggesting a refresh | ✅ pass | 1 ms |
| 8 | returns the user when logged in and flags refreshable sessions | ✅ pass | 11 ms |

**`apps/api/tests/system.test.ts`** — 7/7 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | generates a PDF (precomputed fallback when the ML service is down) | ✅ pass | 51 ms |
| 2 | 404s when the species does not occur in the cell | ✅ pass | 7 ms |
| 3 | sets security headers | ✅ pass | 15 ms |
| 4 | blocks state-changing requests from foreign origins | ✅ pass | 21 ms |
| 5 | allows whitelisted CORS origins with credentials only | ✅ pass | 2 ms |
| 6 | answers malformed JSON and unknown routes with JSON errors | ✅ pass | 3 ms |
| 7 | documents every route in OpenAPI | ✅ pass | 1 ms |

**`apps/api/tests/catalog.test.ts`** — 13/13 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | lists the nine species with model metrics | ✅ pass | 31 ms |
| 2 | returns a full profile with resolved, verified references | ✅ pass | 5 ms |
| 3 | 404s on unknown species and 400s on malformed ids | ✅ pass | 6 ms |
| 4 | serves occurrences as GeoJSON | ✅ pass | 4 ms |
| 5 | returns compact H3 rows with filters and caching | ✅ pass | 8 ms |
| 6 | excludes mostly protected cells on request | ✅ pass | 4 ms |
| 7 | returns GeoJSON polygons inside a bbox | ✅ pass | 14 ms |
| 8 | validates query parameters | ✅ pass | 5 ms |
| 9 | returns a cell profile with provenance on every value | ✅ pass | 5 ms |
| 10 | rejects invalid H3 and 404s on unknown cells | ✅ pass | 3 ms |
| 11 | compares two to four cells with parameter fits | ✅ pass | 6 ms |
| 12 | lists provenance with usage counts | ✅ pass | 5 ms |
| 13 | exposes headline numbers with their source | ✅ pass | 10 ms |

**`apps/api/tests/health.test.ts`** — 5/5 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | GET /health/live returns ok | ✅ pass | 4 ms |
| 2 | GET /health reports database extensions | ✅ pass | 1 ms |
| 3 | GET /health is degraded when the ML service is down | ✅ pass | 1 ms |
| 4 | serves the OpenAPI document | ✅ pass | 2 ms |
| 5 | returns JSON 404 for unknown routes | ✅ pass | 1 ms |

### Data pipeline & ML service (pytest)

**`data/pipeline/tests/test_aggregate.py`** — 4/4 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | nearest valid skips masked nodes and respects max distance | ✅ pass | 1 ms |
| 2 | nearest valid carries leading dimensions | ✅ pass | 0 ms |
| 3 | zonal stats means pixels inside cell | ✅ pass | 14 ms |
| 4 | zonal stats point fallback for cells smaller than pixels | ✅ pass | 2 ms |

**`data/pipeline/tests/test_settings.py`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | repo root points at monorepo | ✅ pass | 0 ms |
| 2 | credentials flag | ✅ pass | 1 ms |

**`data/pipeline/tests/test_snapshot.py`** — 1/1 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | verify detects tampering | ✅ pass | 2 ms |

**`data/pipeline/tests/test_snapshot_data.py`** — 34/34 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | snapshot checksums verify | ✅ pass | 26 ms |
| 2 | baie du mont saint michel is in the grid | ✅ pass | 117 ms |
| 3 | all six territories present | ✅ pass | 31 ms |
| 4 | feature coverage floor[sst mean] | ✅ pass | 3 ms |
| 5 | feature coverage floor[sst min] | ✅ pass | 2 ms |
| 6 | feature coverage floor[sst max] | ✅ pass | 2 ms |
| 7 | feature coverage floor[sbt mean] | ✅ pass | 2 ms |
| 8 | feature coverage floor[sbt min] | ✅ pass | 2 ms |
| 9 | feature coverage floor[sbt max] | ✅ pass | 1 ms |
| 10 | feature coverage floor[sss mean] | ✅ pass | 1 ms |
| 11 | feature coverage floor[sss min] | ✅ pass | 2 ms |
| 12 | feature coverage floor[o2 mean] | ✅ pass | 1 ms |
| 13 | feature coverage floor[o2 min] | ✅ pass | 1 ms |
| 14 | feature coverage floor[ph mean] | ✅ pass | 2 ms |
| 15 | feature coverage floor[chl mean] | ✅ pass | 1 ms |
| 16 | feature coverage floor[depth mean] | ✅ pass | 2 ms |
| 17 | feature coverage floor[shallow frac] | ✅ pass | 1 ms |
| 18 | feature coverage floor[intertidal frac] | ✅ pass | 2 ms |
| 19 | feature coverage floor[tair mean] | ✅ pass | 7 ms |
| 20 | feature coverage floor[tair min] | ✅ pass | 5 ms |
| 21 | feature coverage floor[tair max] | ✅ pass | 5 ms |
| 22 | feature coverage floor[precip annual] | ✅ pass | 4 ms |
| 23 | feature coverage floor[rh mean] | ✅ pass | 4 ms |
| 24 | feature coverage floor[frost days] | ✅ pass | 5 ms |
| 25 | feature coverage floor[elev mean] | ✅ pass | 4 ms |
| 26 | feature coverage floor[elev std] | ✅ pass | 4 ms |
| 27 | feature coverage floor[soil ph] | ✅ pass | 4 ms |
| 28 | feature coverage floor[soil soc] | ✅ pass | 4 ms |
| 29 | feature coverage floor[soil clay] | ✅ pass | 5 ms |
| 30 | feature coverage floor[soil sand] | ✅ pass | 5 ms |
| 31 | feature coverage floor[soil silt] | ✅ pass | 5 ms |
| 32 | every value has known provenance | ✅ pass | 230 ms |
| 33 | occurrences cover all species | ✅ pass | 12 ms |
| 34 | copernicus without credentials falls back to snapshot | ✅ pass | 148 ms |

**`data/pipeline/tests/test_sources.py`** — 8/8 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | openmeteo call weight matches documented rule | ✅ pass | 0 ms |
| 2 | openmeteo season follows hemisphere | ✅ pass | 0 ms |
| 3 | tetens saturation pressure | ✅ pass | 0 ms |
| 4 | copernicus dem tile names | ✅ pass | 0 ms |
| 5 | landcover decode maps colours and reports match rate | ✅ pass | 19 ms |
| 6 | provenance column forms | ✅ pass | 1 ms |
| 7 | gbif plan fetches small species completely | ✅ pass | 1 ms |
| 8 | gbif plan samples large species by country with sqrt weights | ✅ pass | 0 ms |

**`services/ml/tests/test_api.py`** — 6/6 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | score cell expert only | ✅ pass | 46 ms |
| 2 | score profile | ✅ pass | 18 ms |
| 3 | score requires exactly one target | ✅ pass | 2 ms |
| 4 | unknown species and cell | ✅ pass | 2 ms |
| 5 | habitat not in cell | ✅ pass | 1 ms |
| 6 | train requires admin token | ✅ pass | 2 ms |

**`services/ml/tests/test_expert.py`** — 16/16 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | trapezoid[15-100] | ✅ pass | 0 ms |
| 2 | trapezoid[10-100] | ✅ pass | 0 ms |
| 3 | trapezoid[20-100] | ✅ pass | 0 ms |
| 4 | trapezoid[5-50] | ✅ pass | 0 ms |
| 5 | trapezoid[25-50] | ✅ pass | 0 ms |
| 6 | trapezoid[0-0] | ✅ pass | 0 ms |
| 7 | trapezoid[30-0] | ✅ pass | 0 ms |
| 8 | trapezoid[-5-0] | ✅ pass | 0 ms |
| 9 | trapezoid[40-0] | ✅ pass | 0 ms |
| 10 | trapezoid missing value is nan | ✅ pass | 0 ms |
| 11 | profiles have all parameters and valid bands | ✅ pass | 0 ms |
| 12 | expert score is 100 in optimal conditions | ✅ pass | 0 ms |
| 13 | lethal extreme caps the score | ✅ pass | 0 ms |
| 14 | missing parameter reduces completeness not score | ✅ pass | 0 ms |
| 15 | frost sensitive species capped by frost days | ✅ pass | 0 ms |
| 16 | salix survives alpine winters | ✅ pass | 0 ms |

**`services/ml/tests/test_health.py`** — 3/3 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | live | ✅ pass | 1 ms |
| 2 | health ok | ✅ pass | 1 ms |
| 3 | health degraded when db down | ✅ pass | 1 ms |

**`services/ml/tests/test_scoring.py`** — 8/8 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | blend and modifiers | ✅ pass | 0 ms |
| 2 | expert only when no model | ✅ pass | 0 ms |
| 3 | strict reserve is excluded | ✅ pass | 0 ms |
| 4 | regulatory modifier bounds | ✅ pass | 0 ms |
| 5 | human modifier bounds | ✅ pass | 0 ms |
| 6 | freshwater species is indoor only and capped | ✅ pass | 0 ms |
| 7 | non native marine species is indoor only | ✅ pass | 0 ms |
| 8 | tropical species in metropole cannot score high | ✅ pass | 0 ms |

**`services/ml/tests/test_worked_example.py`** — 3/3 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | inputs have not drifted | ✅ pass | 15 ms |
| 2 | expert score worked example | ✅ pass | 0 ms |
| 3 | final score expert only | ✅ pass | 0 ms |

### End-to-end journeys & quality (Playwright + axe-core)

**`Journey 1 — browse the map and open a cell`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | selects a cell and shows its explained score with provenance | ✅ pass | 1.5 s |
| 2 | flies to an overseas region and switches to resolution 7 | ✅ pass | 2.2 s |

**`Journey 2 — compare cells`** — 1/1 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | adds two cells and compares them on a radar and a table | ✅ pass | 1.5 s |

**`Journeys 3 & 4 — contribute, then validate as administrator`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | a new contributor registers and submits an observation with a reference | ✅ pass | 1.5 s |
| 2 | the administrator reviews it against the model and approves it | ✅ pass | 458 ms |

**`Journey 5 — export a PDF report`** — 1/1 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | downloads the cell report as a PDF | ✅ pass | 916 ms |

**`Performance budgets`** — 2/2 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | map is interactive in under 2 s | ✅ pass | 1.3 s |
| 2 | cell click to filled panel in under 300 ms | ✅ pass | 1.3 s |

**`Offline operation`** — 1/1 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | no page requests a third-party host | ✅ pass | 6.8 s |

**`Accessibility (axe-core, WCAG 2.1 AA)`** — 8/8 passed

| # | Test | Result | Time |
|---:|---|---|---:|
| 1 | no serious or critical violations on / | ✅ pass | 1.5 s |
| 2 | no serious or critical violations on /species | ✅ pass | 892 ms |
| 3 | no serious or critical violations on /species/arenicola-marina | ✅ pass | 1.1 s |
| 4 | no serious or critical violations on /model | ✅ pass | 1.2 s |
| 5 | no serious or critical violations on /sources | ✅ pass | 2.3 s |
| 6 | no serious or critical violations on /login | ✅ pass | 810 ms |
| 7 | no serious or critical violations on /compare | ✅ pass | 816 ms |
| 8 | map page with an open cell panel | ✅ pass | 1.5 s |

## How to reproduce

```bash
make demo        # start the stack from the committed snapshot (offline)
make test        # Vitest, Jest (throwaway PostGIS test DB), pytest
make e2e         # Playwright journeys, budgets, axe, offline check
make lighthouse  # Lighthouse on 8 pages, median of 5 runs (LH_GPU=1: headed Chrome on the GPU)
make report      # all of the above results → docs/TEST_REPORT.md
```
