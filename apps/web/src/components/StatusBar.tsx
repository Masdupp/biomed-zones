import { useApiHealth, useMlHealth } from '@/lib/health';
import { StatusDot } from './StatusDot';

/** Footer strip showing live service health; every value comes from /api/health and /ml/health. */
export function StatusBar() {
  const api = useApiHealth();
  const ml = useMlHealth();

  const apiState = api.isPending
    ? 'pending'
    : api.isError
      ? 'error'
      : api.data.checks.database.status === 'ok'
        ? 'ok'
        : 'error';
  const mlState = ml.isPending ? 'pending' : ml.isError ? 'error' : ml.data.status;
  const db = api.data?.checks.database;

  return (
    <footer
      className="border-t border-border bg-bg text-xs text-ink-subtle"
      aria-label="Service status"
    >
      <div className="mx-auto flex h-[var(--statusbar-h)] max-w-[1440px] items-center gap-4 px-4 num">
        <span className="flex items-center gap-1.5" title={api.error?.message}>
          <StatusDot state={apiState} /> api {apiState}
        </span>
        <span className="flex items-center gap-1.5" title={ml.error?.message}>
          <StatusDot state={mlState} /> ml {mlState}
        </span>
        {db?.postgis && <span className="hidden sm:inline">postgis {db.postgis}</span>}
        {db?.h3 && <span className="hidden sm:inline">h3 {db.h3}</span>}
        <span className="ml-auto hidden sm:inline">v{api.data?.version ?? '2.0.0'}</span>
      </div>
    </footer>
  );
}
