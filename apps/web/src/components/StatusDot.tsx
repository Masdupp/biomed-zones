type State = 'ok' | 'degraded' | 'error' | 'pending';

const COLORS: Record<State, string> = {
  ok: 'bg-success',
  degraded: 'bg-accent',
  error: 'bg-danger',
  pending: 'bg-border-strong',
};

export function StatusDot({ state }: { state: State }) {
  return (
    <span className={`inline-block h-1.5 w-1.5 rounded-full ${COLORS[state]}`} aria-hidden="true" />
  );
}
