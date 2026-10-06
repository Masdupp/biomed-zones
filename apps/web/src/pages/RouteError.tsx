import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

/** Replaces React Router's raw "Unexpected Application Error" screen. */
export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : String(error);
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="text-xl text-ink">Something went wrong on this page</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Reload the page, or go back to the home page. If it keeps happening, please report the
        details below.
      </p>
      <div className="mt-4 flex gap-4 text-sm">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-brand underline underline-offset-4"
        >
          Reload
        </button>
        <Link to="/" className="text-brand underline underline-offset-4">
          Home
        </Link>
      </div>
      <details className="mt-6 text-xs text-ink-subtle">
        <summary className="cursor-pointer">Technical details</summary>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">{message.slice(0, 2000)}</pre>
      </details>
    </div>
  );
}
