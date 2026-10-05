import {
  cloneElement,
  isValidElement,
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { ExternalLink as ExternalIcon, Loader2 } from 'lucide-react';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-brand-ink hover:bg-brand-hover border border-transparent',
  secondary: 'border border-border-strong text-ink hover:bg-surface-hover bg-surface',
  ghost: 'border border-transparent text-ink-muted hover:text-ink hover:bg-surface-hover',
  danger: 'border border-danger/40 text-danger hover:bg-danger/10',
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: 'sm' | 'md';
    loading?: boolean;
  }
>(function Button(
  { variant = 'secondary', size = 'md', loading, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors transition-base disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-sm',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {loading && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});

export function Field({
  label,
  hint,
  error,
  children,
  id,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  id: string;
  children: ReactNode;
}) {
  // Tie the message to the control so screen readers announce it (WCAG 3.3.1, 1.3.1).
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const control = isValidElement<{ 'aria-invalid'?: boolean; 'aria-describedby'?: string }>(
    children,
  )
    ? cloneElement(children, {
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })
    : children;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-ink">
        {label}
      </label>
      {control}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Default full width unless the caller passes its own width utility. */
const width = (className?: string) => (/(^|\s)(w-|max-w-)/.test(className ?? '') ? '' : 'w-full');

const control =
  'h-8 rounded-md border border-border-strong bg-surface px-2.5 text-sm text-ink placeholder:text-ink-subtle transition-colors transition-base focus:border-brand focus:outline-none aria-[invalid=true]:border-danger';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cx(control, width(className), className)} {...rest} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...rest }, ref) {
  return (
    <textarea ref={ref} className={cx(control, 'h-auto min-h-24 py-2', className)} {...rest} />
  );
});

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx(control, width(className), 'pr-7', className)} {...rest}>
      {children}
    </select>
  );
}

type Tone = 'neutral' | 'brand' | 'accent' | 'danger' | 'success';
const TONES: Record<Tone, string> = {
  neutral: 'border-border-strong text-ink-muted',
  brand: 'border-brand/40 text-brand bg-brand-subtle',
  accent: 'border-accent/40 text-accent bg-accent-subtle',
  danger: 'border-danger/40 text-danger',
  success: 'border-success/40 text-success',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex h-5 items-center rounded-sm border px-1.5 text-xs whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  title,
  actions,
  children,
  className,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx('rounded-md border border-border bg-surface', className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          {title && (
            <h2 className="text-xs font-medium tracking-wide text-ink-muted uppercase">{title}</h2>
          )}
          {actions}
        </header>
      )}
      <div className="p-3">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  source,
  className,
}: {
  label: string;
  value: ReactNode;
  source?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-ink-subtle">{label}</dt>
      <dd className="num mt-1 text-2xl text-ink">{value}</dd>
      {source && <dd className="mt-0.5 text-xs text-ink-subtle">{source}</dd>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx('animate-pulse rounded-sm bg-bg-subtle motion-reduce:animate-none', className)}
      aria-hidden="true"
    />
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-border-strong px-4 py-6 text-center">
      <p className="text-sm text-ink">{title}</p>
      {children && <div className="mt-1 text-sm text-ink-muted">{children}</div>}
    </div>
  );
}

export function ErrorNote({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : 'Something went wrong';
  return (
    <div role="alert" className="rounded-md border border-danger/40 px-3 py-2 text-sm text-danger">
      {message}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-md border border-border-strong bg-surface p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={cx(
            'h-6 rounded-sm px-2 text-xs transition-colors transition-base',
            o.value === value
              ? 'bg-bg-subtle font-medium text-ink'
              : 'text-ink-muted hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        'inline-flex items-center gap-1 text-brand underline-offset-2 hover:underline',
        className,
      )}
    >
      {children}
      <ExternalIcon size={11} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Native <dialog> confirmation: focus trap and Escape handled by the browser. */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  onConfirm,
  onCancel,
  danger,
  busy,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
  busy?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close?.();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      className="w-[min(92vw,420px)] rounded-md border border-border bg-surface p-0 text-ink backdrop:bg-black/40"
    >
      <div className="p-4">
        <h2 id={id} className="text-base font-semibold">
          {title}
        </h2>
        <div className="mt-2 text-sm text-ink-muted">{children}</div>
      </div>
      <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={busy}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}

export function ReferenceLink({
  r,
}: {
  r: {
    doi?: string;
    url?: string;
    title?: string;
    citation?: string;
    year?: number;
    authors?: string[];
    container?: string;
    status: string;
  };
}) {
  const href = r.doi ? `https://doi.org/${r.doi}` : r.url;
  const authors = r.authors?.length
    ? `${r.authors.slice(0, 3).join(', ')}${r.authors.length > 3 ? ' et al.' : ''}`
    : null;
  return (
    <span className="text-sm">
      {authors && <span className="text-ink-muted">{authors} </span>}
      {r.year && <span className="num text-ink-muted">({r.year}) </span>}
      <span className="text-ink">{r.title ?? r.citation ?? r.doi ?? r.url}</span>
      {r.container && <span className="text-ink-muted italic">. {r.container}</span>}
      {href && (
        <>
          {' '}
          <ExternalLink href={href}>{r.doi ? `doi:${r.doi}` : 'link'}</ExternalLink>
        </>
      )}{' '}
      <Badge tone={r.status === 'verified' ? 'success' : 'accent'}>{r.status}</Badge>
    </span>
  );
}
