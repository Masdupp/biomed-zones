import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { latLngToCell } from 'h3-js';
import { Check, Plus, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorNote,
  Field,
  Input,
  Select,
  Skeleton,
  Textarea,
} from '@/components/ui';
import { cx } from '@/lib/cx';
import { ApiError, request } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { date } from '@/lib/format';
import { useCell, useContributions, useInvalidate, useSpeciesList } from '@/lib/queries';
import type { Contribution, Reference } from '@/lib/types';

const LocationPicker = lazy(() => import('@/components/map/LocationPicker'));
const DRAFT_KEY = 'bz-contribution-draft';
const STEPS = ['What', 'Where', 'Details', 'References', 'Review'] as const;
const OUTCOMES = {
  FIELD_OBSERVATION: [
    ['presence', 'Presence observed'],
    ['absence', 'Searched, not found'],
  ],
  CULTIVATION_TRIAL: [
    ['success', 'Success'],
    ['partial', 'Partial success'],
    ['failure', 'Failure'],
  ],
} as const;

interface Measurement {
  key: string;
  value: string;
  unit: string;
}
interface RefInput {
  doi: string;
  url: string;
  citation: string;
  check?: Reference & { title?: string };
}
interface Form {
  id?: string;
  speciesId: string;
  type: 'FIELD_OBSERVATION' | 'CULTIVATION_TRIAL';
  outcome: string;
  lat: number | null;
  lon: number | null;
  title: string;
  description: string;
  observedAt: string;
  measurements: Measurement[];
  references: RefInput[];
}

const EMPTY: Form = {
  speciesId: 'arenicola-marina',
  type: 'FIELD_OBSERVATION',
  outcome: 'presence',
  lat: null,
  lon: null,
  title: '',
  description: '',
  observedAt: new Date().toISOString().slice(0, 10),
  measurements: [],
  references: [{ doi: '', url: '', citation: '' }],
};

function loadLocal(): Form {
  try {
    const v = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null') as Form | null;
    return v ? { ...EMPTY, ...v } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function toPayload(f: Form) {
  return {
    speciesId: f.speciesId,
    type: f.type,
    outcome: f.outcome,
    lat: f.lat ?? 0,
    lon: f.lon ?? 0,
    title: f.title,
    description: f.description,
    observedAt: f.observedAt,
    measurements: Object.fromEntries(
      f.measurements
        .filter((m) => m.key && m.value !== '' && !Number.isNaN(Number(m.value)))
        .map((m) => [m.key, { value: Number(m.value), unit: m.unit }]),
    ),
    references: f.references
      .filter((r) => r.doi.trim() || r.url.trim())
      .map((r) => ({
        ...(r.doi.trim() ? { doi: r.doi.trim() } : {}),
        ...(r.url.trim() ? { url: r.url.trim() } : {}),
        citation: r.citation,
      })),
  };
}

function fromContribution(c: Contribution): Form {
  return {
    id: c.id,
    speciesId: c.species.id,
    type: c.type,
    outcome: c.outcome,
    lat: c.lat,
    lon: c.lon,
    title: c.title,
    description: c.description,
    observedAt: c.observedAt.slice(0, 10),
    measurements: Object.entries(c.measurements).map(([key, m]) => ({
      key,
      value: String(m.value),
      unit: m.unit,
    })),
    references: c.references.length
      ? c.references.map((r) => ({
          doi: r.doi ?? '',
          url: r.url ?? '',
          citation: r.citation ?? '',
        }))
      : EMPTY.references,
  };
}

const STATUS_TONE = {
  DRAFT: 'neutral',
  PENDING: 'accent',
  APPROVED: 'success',
  REJECTED: 'danger',
} as const;

export function Contribute() {
  const { user } = useAuth();
  const species = useSpeciesList();
  const mine = useContributions(true);
  const invalidate = useInvalidate();
  const [form, setForm] = useState<Form>(loadLocal);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState<'draft' | 'submit' | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Contribution | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* private mode: no local autosave */
    }
  }, [form]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const sp = species.data?.items.find((s) => s.id === form.speciesId);
  const h3 = form.lat !== null && form.lon !== null ? latLngToCell(form.lat, form.lon, 7) : null;
  const cell = useCell(h3);
  const habitatOk =
    cell.data && sp
      ? sp.habitat === 'marine'
        ? cell.data.seaFraction > 0
        : cell.data.landFraction > 0
      : null;
  const fieldErrors = useMemo(
    () =>
      Object.fromEntries(
        (error?.details ?? []).map((d) => [d.path.replace('body.', ''), d.message]),
      ),
    [error],
  );

  const valid = [
    Boolean(form.speciesId && form.outcome),
    Boolean(h3 && cell.data && habitatOk),
    form.title.trim().length >= 5 &&
      form.description.trim().length >= 20 &&
      Boolean(form.observedAt),
    true,
    true,
  ];
  const hasRef = form.references.some((r) => r.doi.trim() || r.url.trim());

  const save = async (submit: boolean) => {
    setBusy(submit ? 'submit' : 'draft');
    setError(null);
    setNotice(null);
    try {
      const body = toPayload(form);
      let c: Contribution;
      if (form.id) {
        c = await request<Contribution>(`/api/contributions/${form.id}`, { method: 'PATCH', body });
        if (submit)
          c = await request<Contribution>(`/api/contributions/${form.id}/submit`, {
            method: 'POST',
          });
      } else {
        c = await request<Contribution>('/api/contributions', {
          method: 'POST',
          body: { ...body, submit },
        });
      }
      await invalidate(['contributions']);
      if (submit) {
        setForm(EMPTY);
        setStep(0);
        setNotice('Submitted for review. An administrator will validate it.');
      } else {
        setForm(fromContribution(c));
        setNotice('Draft saved on the server.');
      }
    } catch (e) {
      setError(e instanceof ApiError ? e : new ApiError(0, 'error', String(e)));
    } finally {
      setBusy(null);
    }
  };

  const checkRef = async (i: number) => {
    const r = form.references[i];
    if (!r) return;
    try {
      const res = await request<Reference & { title?: string }>(
        '/api/contributions/references/check',
        {
          method: 'POST',
          body: {
            ...(r.doi.trim() ? { doi: r.doi.trim() } : {}),
            ...(r.url.trim() ? { url: r.url.trim() } : {}),
          },
        },
      );
      setForm((f) => ({
        ...f,
        references: f.references.map((x, k) =>
          k === i ? { ...x, check: res, citation: x.citation || res.title || x.citation } : x,
        ),
      }));
    } catch (e) {
      setError(e instanceof ApiError ? e : null);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await request(`/api/contributions/${toDelete.id}`, { method: 'DELETE' });
    if (form.id === toDelete.id) setForm(EMPTY);
    setToDelete(null);
    await invalidate(['contributions']);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Contribute"
        description="Submit a field observation or a cultivation trial result. Every submission needs at least one reference and is reviewed by an administrator; approved ones become training data for the next model run."
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section aria-label="Contribution form">
          <ol className="flex flex-wrap gap-1" aria-label="Steps">
            {STEPS.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={i === step ? 'step' : undefined}
                  className={cx(
                    'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors transition-base',
                    i === step
                      ? 'bg-bg-subtle font-medium text-ink'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  <span className="num text-ink-subtle">{i + 1}</span> {s}
                  {i < step && valid[i] && (
                    <Check size={12} className="text-success" aria-label="complete" />
                  )}
                </button>
              </li>
            ))}
          </ol>
          {form.id && (
            <p className="mt-2 text-xs text-ink-subtle">
              Editing server draft <span className="num">{form.id}</span>.
            </p>
          )}

          <div className="mt-4 rounded-md border border-border bg-surface p-4">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Species" id="c-species">
                  <Select
                    id="c-species"
                    value={form.speciesId}
                    onChange={(e) => set('speciesId', e.target.value)}
                    className="italic"
                  >
                    {species.data?.items.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.scientificName}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Type" id="c-type">
                  <Select
                    id="c-type"
                    value={form.type}
                    onChange={(e) => {
                      const type = e.target.value as Form['type'];
                      setForm((f) => ({ ...f, type, outcome: OUTCOMES[type][0][0] }));
                    }}
                  >
                    <option value="FIELD_OBSERVATION">Field observation</option>
                    <option value="CULTIVATION_TRIAL">Cultivation trial</option>
                  </Select>
                </Field>
                <fieldset className="sm:col-span-2">
                  <legend className="text-xs font-medium text-ink">Outcome</legend>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {OUTCOMES[form.type].map(([v, label]) => (
                      <label key={v} className="flex items-center gap-1.5 text-sm">
                        <input
                          type="radio"
                          name="outcome"
                          value={v}
                          checked={form.outcome === v}
                          onChange={() => set('outcome', v)}
                          className="accent-[var(--brand)]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3">
                <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                  <LocationPicker
                    lat={form.lat}
                    lon={form.lon}
                    onPick={(lat, lon) => setForm((f) => ({ ...f, lat, lon }))}
                  />
                </Suspense>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Latitude" id="c-lat" error={fieldErrors.lat}>
                    <Input
                      id="c-lat"
                      type="number"
                      step="0.00001"
                      min={-90}
                      max={90}
                      value={form.lat ?? ''}
                      onChange={(e) =>
                        set('lat', e.target.value === '' ? null : Number(e.target.value))
                      }
                    />
                  </Field>
                  <Field label="Longitude" id="c-lon" error={fieldErrors.lon}>
                    <Input
                      id="c-lon"
                      type="number"
                      step="0.00001"
                      min={-180}
                      max={180}
                      value={form.lon ?? ''}
                      onChange={(e) =>
                        set('lon', e.target.value === '' ? null : Number(e.target.value))
                      }
                    />
                  </Field>
                </div>
                <p className="text-xs" aria-live="polite">
                  {!h3 && (
                    <span className="text-ink-subtle">Click the map or enter coordinates.</span>
                  )}
                  {h3 && cell.isPending && (
                    <span className="text-ink-subtle">Checking cell {h3}…</span>
                  )}
                  {h3 && cell.isError && (
                    <span className="text-danger">
                      Outside the study area (Metropolitan France and DROM, land and 12 nm sea).
                    </span>
                  )}
                  {h3 && cell.data && (
                    <span className={habitatOk ? 'text-success' : 'text-danger'}>
                      Cell <span className="num">{h3}</span> · {cell.data.territory.name} ·{' '}
                      {habitatOk
                        ? 'habitat matches'
                        : `${sp?.scientificName} is ${sp?.habitat}; this cell has no ${sp?.habitat === 'marine' ? 'sea' : 'land'}`}
                    </span>
                  )}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <Field label="Title" id="c-title" hint="5–160 characters" error={fieldErrors.title}>
                  <Input
                    id="c-title"
                    value={form.title}
                    maxLength={160}
                    onChange={(e) => set('title', e.target.value)}
                  />
                </Field>
                <Field
                  label="Description"
                  id="c-desc"
                  hint="Method, effort, conditions (20 characters minimum)"
                  error={fieldErrors.description}
                >
                  <Textarea
                    id="c-desc"
                    value={form.description}
                    maxLength={5000}
                    onChange={(e) => set('description', e.target.value)}
                  />
                </Field>
                <Field label="Observation date" id="c-date" error={fieldErrors.observedAt}>
                  <Input
                    id="c-date"
                    type="date"
                    value={form.observedAt}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => set('observedAt', e.target.value)}
                    className="w-44"
                  />
                </Field>
                <fieldset>
                  <legend className="text-xs font-medium text-ink">Measurements (optional)</legend>
                  <ul className="mt-1 space-y-2">
                    {form.measurements.map((m, i) => (
                      <li key={i} className="grid grid-cols-[1fr_7rem_6rem_auto] gap-2">
                        <Input
                          aria-label={`Measurement ${i + 1} name`}
                          placeholder="e.g. water_temperature"
                          value={m.key}
                          onChange={(e) =>
                            set(
                              'measurements',
                              form.measurements.map((x, k) =>
                                k === i ? { ...x, key: e.target.value } : x,
                              ),
                            )
                          }
                        />
                        <Input
                          aria-label={`Measurement ${i + 1} value`}
                          type="number"
                          placeholder="value"
                          value={m.value}
                          onChange={(e) =>
                            set(
                              'measurements',
                              form.measurements.map((x, k) =>
                                k === i ? { ...x, value: e.target.value } : x,
                              ),
                            )
                          }
                        />
                        <Input
                          aria-label={`Measurement ${i + 1} unit`}
                          placeholder="unit"
                          value={m.unit}
                          onChange={(e) =>
                            set(
                              'measurements',
                              form.measurements.map((x, k) =>
                                k === i ? { ...x, unit: e.target.value } : x,
                              ),
                            )
                          }
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove measurement ${i + 1}`}
                          onClick={() =>
                            set(
                              'measurements',
                              form.measurements.filter((_, k) => k !== i),
                            )
                          }
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      set('measurements', [...form.measurements, { key: '', value: '', unit: '' }])
                    }
                  >
                    <Plus size={14} aria-hidden="true" /> Add measurement
                  </Button>
                </fieldset>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <p className="text-sm text-ink-muted">
                  At least one reference (DOI or URL) is required to submit. DOIs are checked
                  against Crossref.
                </p>
                {form.references.map((r, i) => (
                  <div key={i} className="grid gap-2 rounded-md border border-border p-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Field label="DOI" id={`r-doi-${i}`}>
                        <Input
                          id={`r-doi-${i}`}
                          placeholder="10.xxxx/…"
                          value={r.doi}
                          onChange={(e) =>
                            set(
                              'references',
                              form.references.map((x, k) =>
                                k === i ? { ...x, doi: e.target.value, check: undefined } : x,
                              ),
                            )
                          }
                        />
                      </Field>
                      <Field label="or URL" id={`r-url-${i}`}>
                        <Input
                          id={`r-url-${i}`}
                          type="url"
                          placeholder="https://…"
                          value={r.url}
                          onChange={(e) =>
                            set(
                              'references',
                              form.references.map((x, k) =>
                                k === i ? { ...x, url: e.target.value, check: undefined } : x,
                              ),
                            )
                          }
                        />
                      </Field>
                    </div>
                    <Field label="Citation" id={`r-cit-${i}`}>
                      <Input
                        id={`r-cit-${i}`}
                        value={r.citation}
                        onChange={(e) =>
                          set(
                            'references',
                            form.references.map((x, k) =>
                              k === i ? { ...x, citation: e.target.value } : x,
                            ),
                          )
                        }
                      />
                    </Field>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => checkRef(i)}
                        disabled={!r.doi.trim() && !r.url.trim()}
                      >
                        Check reference
                      </Button>
                      {r.check && (
                        <Badge tone={r.check.status === 'verified' ? 'success' : 'accent'}>
                          {r.check.status}
                        </Badge>
                      )}
                      {r.check?.title && (
                        <span className="truncate text-xs text-ink-muted">{r.check.title}</span>
                      )}
                      {form.references.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() =>
                            set(
                              'references',
                              form.references.filter((_, k) => k !== i),
                            )
                          }
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  onClick={() =>
                    set('references', [...form.references, { doi: '', url: '', citation: '' }])
                  }
                  className="justify-self-start"
                >
                  <Plus size={14} aria-hidden="true" /> Add reference
                </Button>
              </div>
            )}

            {step === 4 && (
              <dl className="grid grid-cols-[9rem_1fr] gap-x-3 gap-y-2 text-sm">
                <dt className="text-ink-subtle">Species</dt>
                <dd className="italic">{sp?.scientificName}</dd>
                <dt className="text-ink-subtle">Type · outcome</dt>
                <dd>
                  {form.type === 'FIELD_OBSERVATION' ? 'Field observation' : 'Cultivation trial'} ·{' '}
                  {form.outcome}
                </dd>
                <dt className="text-ink-subtle">Location</dt>
                <dd className="num">
                  {form.lat ?? '—'}, {form.lon ?? '—'} {h3 && `(${h3})`}
                </dd>
                <dt className="text-ink-subtle">Title</dt>
                <dd>{form.title || '—'}</dd>
                <dt className="text-ink-subtle">Date</dt>
                <dd className="num">{form.observedAt}</dd>
                <dt className="text-ink-subtle">Measurements</dt>
                <dd>
                  {form.measurements
                    .filter((m) => m.key)
                    .map((m) => `${m.key} ${m.value} ${m.unit}`)
                    .join('; ') || '—'}
                </dd>
                <dt className="text-ink-subtle">References</dt>
                <dd>
                  {form.references
                    .filter((r) => r.doi || r.url)
                    .map((r) => r.doi || r.url)
                    .join('; ') || <span className="text-danger">none (required to submit)</span>}
                </dd>
              </dl>
            )}
          </div>

          {error && (
            <div className="mt-3">
              <ErrorNote error={error} />
              {error.details && (
                <ul className="mt-1 list-disc pl-5 text-xs text-danger">
                  {error.details.map((d) => (
                    <li key={d.path}>
                      {d.path.replace('body.', '')}: {d.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {notice && (
            <p role="status" className="mt-3 text-sm text-success">
              {notice}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!valid[step]}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => save(true)}
                loading={busy === 'submit'}
                disabled={!hasRef || !valid.slice(0, 3).every(Boolean)}
              >
                Submit for review
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => save(false)}
              loading={busy === 'draft'}
              disabled={!valid[0] || !valid[1] || !valid[2]}
            >
              Save draft
            </Button>
            <span className="ml-auto text-xs text-ink-subtle">
              Signed in as {user?.displayName} · autosaved in this browser
            </span>
          </div>
        </section>

        <section aria-labelledby="mine-h">
          <h2 id="mine-h" className="text-sm font-medium text-ink">
            My contributions
          </h2>
          {mine.isPending && <Skeleton className="mt-3 h-40 w-full" />}
          {mine.data?.items.length === 0 && (
            <div className="mt-3">
              <EmptyState title="Nothing yet">Your drafts and submissions appear here.</EmptyState>
            </div>
          )}
          <ul className="mt-3 divide-y divide-border rounded-md border border-border bg-surface">
            {mine.data?.items.map((c) => (
              <li key={c.id} className="px-3 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-ink">{c.title}</p>
                  <Badge tone={STATUS_TONE[c.status]}>{c.status.toLowerCase()}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-subtle">
                  <span className="italic">{c.species.scientificName}</span> · {date(c.observedAt)}
                  {c.isExample && ' · example'}
                </p>
                {c.review?.comment && (
                  <p className="mt-1 text-xs text-ink-muted">Reviewer: {c.review.comment}</p>
                )}
                {(c.status === 'DRAFT' || c.status === 'REJECTED') && !c.isExample && (
                  <div className="mt-1.5 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setForm(fromContribution(c));
                        setStep(0);
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setToDelete(c)}>
                      Delete
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this contribution?"
        confirmLabel="Delete"
        danger
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      >
        “{toDelete?.title}” will be removed permanently.
      </ConfirmDialog>
    </div>
  );
}

export default Contribute;
