import type { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <h1 className="text-xl text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-[72ch] text-sm text-ink-muted">{description}</p>}
      </div>
      {actions}
    </div>
  );
}
