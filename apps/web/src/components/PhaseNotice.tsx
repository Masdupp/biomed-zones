/** Explicit marker for features not built yet — never a silent stub. */
export function PhaseNotice({ phase, children }: { phase: number; children: string }) {
  return (
    <div
      role="note"
      className="mt-6 rounded-md border border-dashed border-border-strong px-4 py-3 text-sm text-ink-muted"
    >
      <span className="num mr-2 text-xs text-ink-subtle">P{phase}</span>
      {children}
    </div>
  );
}
