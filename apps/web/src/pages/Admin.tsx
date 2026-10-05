import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import {
  Badge,
  Button,
  EmptyState,
  ErrorNote,
  Field,
  ReferenceLink,
  Segmented,
  Skeleton,
  Textarea,
} from '@/components/ui';
import { cx } from '@/lib/cx';
import { Meter } from '@/components/charts';
import { categoryTone } from '@/lib/color';
import { ApiError, request } from '@/lib/api';
import { CATEGORY_LABEL } from '@/lib/color';
import { date, int, one, two } from '@/lib/format';
import { useAdminStats, useAudit, useInvalidate, useQueue, type QueueItem } from '@/lib/queries';

function Diff({ item }: { item: QueueItem }) {
  const c = item.contribution;
  const m = item.model;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-md border border-border p-3">
        <p className="text-xs text-ink-subtle">Contribution says</p>
        <p className="mt-1 text-sm font-medium text-ink capitalize">{item.diff.contributionSays}</p>
        <p className="text-xs text-ink-muted">
          {c.type === 'FIELD_OBSERVATION' ? 'Observation' : 'Trial'} · outcome “{c.outcome}” ·{' '}
          {date(c.observedAt)}
        </p>
        {Object.keys(c.measurements).length > 0 && (
          <ul className="num mt-2 space-y-0.5 text-xs">
            {Object.entries(c.measurements).map(([k, v]) => (
              <li key={k}>
                {k}: {v.value} {v.unit}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-md border border-border p-3">
        <p className="text-xs text-ink-subtle">Model says (active run)</p>
        {m ? (
          <>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-ink">
              <span className="num">{one(m.score)}</span>
              <Badge tone={categoryTone(m.category)}>{CATEGORY_LABEL[m.category]}</Badge>
            </p>
            <dl className="num mt-2 grid grid-cols-[5rem_1fr_2.5rem] items-center gap-x-2 gap-y-1 text-xs">
              <dt className="text-ink-muted">Expert</dt>
              <dd>
                <Meter value={m.expertScore} label="Expert" />
              </dd>
              <dd className="text-right">{one(m.expertScore)}</dd>
              <dt className="text-ink-muted">ML</dt>
              <dd>
                <Meter value={m.mlScore} color="var(--series-1)" label="ML" />
              </dd>
              <dd className="text-right">{one(m.mlScore)}</dd>
            </dl>
            {m.limiting.length > 0 && (
              <p className="mt-1 text-xs text-ink-muted">
                Limiting: {[...new Set(m.limiting.map((l) => l[0]))].join(', ')}
              </p>
            )}
          </>
        ) : (
          <p className="mt-1 text-sm text-ink-muted">No score for this cell.</p>
        )}
      </div>
      <p className="text-sm sm:col-span-2">
        {item.diff.agrees === null ? (
          <Badge>no comparison</Badge>
        ) : item.diff.agrees ? (
          <Badge tone="success">Agrees with the model</Badge>
        ) : (
          <Badge tone="accent">Disagrees with the model: check carefully</Badge>
        )}
      </p>
    </div>
  );
}

function Queue() {
  const q = useQueue();
  const invalidate = useInvalidate();
  const [selected, setSelected] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState<'approve' | 'reject' | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const items = q.data?.items ?? [];
  const current = items.find((i) => i.contribution.id === selected) ?? items[0];

  useEffect(() => {
    setComment('');
    setError(null);
  }, [current?.contribution.id]);

  const decide = async (decision: 'approve' | 'reject') => {
    if (!current) return;
    setBusy(decision);
    setError(null);
    try {
      await request('/api/admin/validate', {
        method: 'POST',
        body: {
          contributionId: current.contribution.id,
          decision,
          ...(comment ? { comment } : {}),
        },
      });
      setSelected(null);
      await invalidate(['admin'], ['contributions']);
    } catch (e) {
      setError(e instanceof ApiError ? e : null);
    } finally {
      setBusy(null);
    }
  };

  if (q.isPending) return <Skeleton className="h-80 w-full" />;
  if (q.isError) return <ErrorNote error={q.error} />;
  if (!items.length)
    return (
      <EmptyState title="The queue is empty">No contribution is waiting for review.</EmptyState>
    );

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <ul
        className="divide-y divide-border rounded-md border border-border bg-surface"
        aria-label="Pending contributions"
      >
        {items.map((i) => (
          <li key={i.contribution.id}>
            <button
              type="button"
              onClick={() => setSelected(i.contribution.id)}
              aria-current={current?.contribution.id === i.contribution.id}
              className={cx(
                'w-full px-3 py-2.5 text-left hover:bg-surface-hover',
                current?.contribution.id === i.contribution.id && 'bg-bg-subtle',
              )}
            >
              <p className="truncate text-sm text-ink">{i.contribution.title}</p>
              <p className="text-xs text-ink-subtle">
                <span className="italic">{i.contribution.species.scientificName}</span> ·{' '}
                {i.contribution.author.displayName}
                {i.diff.agrees === false && <span className="text-accent"> · disagrees</span>}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {current && (
        <article className="rounded-md border border-border bg-surface p-4" aria-label="Review">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-ink">{current.contribution.title}</h2>
              <p className="text-xs text-ink-subtle">
                by {current.contribution.author.displayName} · submitted{' '}
                {date(current.contribution.submittedAt)} ·{' '}
                <Link
                  to={`/map?species=${current.contribution.species.id}&cell=${current.contribution.h3}`}
                  className="num text-brand hover:underline"
                >
                  {current.contribution.h3}
                </Link>{' '}
                ({current.contribution.lat}, {current.contribution.lon})
              </p>
            </div>
            {current.contribution.isExample && <Badge tone="accent">example data</Badge>}
          </div>
          <p className="mt-3 text-sm whitespace-pre-line text-ink">
            {current.contribution.description}
          </p>
          <div className="mt-4">
            <Diff item={current} />
          </div>
          <div className="mt-4">
            <p className="text-xs text-ink-subtle">References</p>
            <ul className="mt-1 space-y-1">
              {current.contribution.references.map((r, k) => (
                <li key={k}>
                  <ReferenceLink r={r} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Field
              label="Review comment"
              id="review-comment"
              hint="Required to reject; shown to the contributor."
              error={error?.details?.[0]?.message}
            >
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-16"
              />
            </Field>
          </div>
          {error && !error.details && (
            <div className="mt-2">
              <ErrorNote error={error} />
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <Button
              variant="primary"
              onClick={() => decide('approve')}
              loading={busy === 'approve'}
            >
              Approve
            </Button>
            <Button variant="danger" onClick={() => decide('reject')} loading={busy === 'reject'}>
              Reject
            </Button>
          </div>
        </article>
      )}
    </div>
  );
}

function ModelTab() {
  const [job, setJob] = useState<{ run_id: string } | null>(null);
  const [status, setStatus] = useState<{
    status: string;
    progress: number;
    message: string | null;
  } | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const stats = useAdminStats(
    Boolean(job && status?.status !== 'succeeded' && status?.status !== 'failed'),
  );
  const invalidate = useInvalidate();

  useEffect(() => {
    if (!job) return;
    let alive = true;
    const tick = async () => {
      try {
        const s = await request<{ status: string; progress: number; message: string | null }>(
          `/api/admin/retrain/${job.run_id}`,
        );
        if (!alive) return;
        setStatus(s);
        if (s.status === 'succeeded')
          await invalidate(['cells'], ['species'], ['metrics'], ['stats'], ['admin']);
        if (s.status !== 'succeeded' && s.status !== 'failed') setTimeout(tick, 3000);
      } catch (e) {
        if (alive) setError(e instanceof ApiError ? e : null);
      }
    };
    void tick();
    return () => {
      alive = false;
    };
  }, [job]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = async () => {
    setError(null);
    setStatus(null);
    try {
      setJob(await request<{ run_id: string }>('/api/admin/retrain', { method: 'POST' }));
    } catch (e) {
      setError(e instanceof ApiError ? e : null);
    }
  };
  const running = job && status && !['succeeded', 'failed'].includes(status.status);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="rounded-md border border-border bg-surface p-4">
        <h2 className="text-sm font-medium text-ink">Retrain the model</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Trains every species with spatial cross-validation, adds approved non-example
          contributions to the training data, precomputes all scores and activates the new run.
          Takes a few minutes.
        </p>
        <dl className="num mt-3 grid grid-cols-2 gap-2 text-xs">
          {(['PENDING', 'APPROVED', 'REJECTED', 'DRAFT'] as const).map((k) => (
            <div key={k}>
              <dt className="text-ink-subtle capitalize">{k.toLowerCase()}</dt>
              <dd className="text-ink">{int(stats.data?.contributions[k] ?? 0)}</dd>
            </div>
          ))}
        </dl>
        <Button variant="primary" className="mt-4" onClick={start} disabled={Boolean(running)}>
          {running ? 'Training…' : 'Start retraining'}
        </Button>
        {job && (
          <div className="mt-4" aria-live="polite">
            <p className="num text-xs text-ink-muted">
              {job.run_id} · {status?.status ?? 'queued'}
            </p>
            <div className="mt-1">
              <Meter value={(status?.progress ?? 0) * 100} label="Training progress" />
            </div>
            <p className="mt-1 text-xs text-ink-subtle">{status?.message}</p>
          </div>
        )}
        {error && (
          <div className="mt-3">
            <ErrorNote error={error} />
          </div>
        )}
      </div>
      <div className="overflow-x-auto" role="region" aria-label="Model runs" tabIndex={0}>
        <h2 className="mb-2 text-sm font-medium text-ink">Runs</h2>
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink-subtle">
              <th className="py-2 pr-3 font-normal">Run</th>
              <th className="py-2 pr-3 font-normal">Status</th>
              <th className="py-2 pr-3 font-normal">Trigger</th>
              <th className="py-2 pr-3 font-normal">Finished</th>
              <th className="py-2 font-normal">Message</th>
            </tr>
          </thead>
          <tbody>
            {stats.data?.runs.map((r) => (
              <tr key={r.id} className="border-b border-border">
                <td className="num py-1.5 pr-3">
                  {r.id} {r.isActive && <Badge tone="brand">active</Badge>}
                </td>
                <td className="py-1.5 pr-3">
                  <Badge
                    tone={
                      r.status === 'succeeded'
                        ? 'success'
                        : r.status === 'failed'
                          ? 'danger'
                          : 'accent'
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="py-1.5 pr-3 text-ink-muted">{r.trigger}</td>
                <td className="num py-1.5 pr-3 text-xs">{date(r.finishedAt)}</td>
                <td className="py-1.5 text-xs text-ink-muted">
                  {r.message ?? (r.status === 'running' ? `${two(r.progress)}` : '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditTab() {
  const q = useAudit();
  if (q.isPending) return <Skeleton className="h-60 w-full" />;
  if (q.isError) return <ErrorNote error={q.error} />;
  return (
    <div className="overflow-x-auto" role="region" aria-label="Audit log" tabIndex={0}>
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-ink-subtle">
            <th className="py-2 pr-3 font-normal">When</th>
            <th className="py-2 pr-3 font-normal">Actor</th>
            <th className="py-2 pr-3 font-normal">Action</th>
            <th className="py-2 pr-3 font-normal">Target</th>
            <th className="py-2 font-normal">Detail</th>
          </tr>
        </thead>
        <tbody>
          {q.data.items.map((a) => (
            <tr key={a.id} className="border-b border-border">
              <td className="num py-1.5 pr-3 text-xs whitespace-nowrap">
                {new Date(a.createdAt).toLocaleString('en-GB')}
              </td>
              <td className="py-1.5 pr-3 text-ink-muted">
                {a.actor?.displayName ?? 'deleted user'}
              </td>
              <td className="num py-1.5 pr-3 text-xs">{a.action}</td>
              <td className="num py-1.5 pr-3 text-xs text-ink-muted">
                {a.targetType} {a.targetId}
              </td>
              <td
                className="num max-w-[24rem] truncate py-1.5 text-xs text-ink-subtle"
                title={JSON.stringify(a.detail)}
              >
                {JSON.stringify(a.detail)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Admin() {
  const [tab, setTab] = useState<'queue' | 'model' | 'audit'>('queue');
  const q = useQueue();
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <PageHeader
        title="Administration"
        description="Review contributions, retrain the model and inspect the audit log."
        actions={
          <Segmented
            label="Admin section"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'queue', label: `Queue${q.data ? ` (${q.data.total})` : ''}` },
              { value: 'model', label: 'Model' },
              { value: 'audit', label: 'Audit log' },
            ]}
          />
        }
      />
      <div className="mt-6">
        {tab === 'queue' && <Queue />}
        {tab === 'model' && <ModelTab />}
        {tab === 'audit' && <AuditTab />}
      </div>
    </div>
  );
}

export default Admin;
