import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16">
      <p className="num text-xs text-ink-subtle">404</p>
      <h1 className="mt-1 text-xl text-ink">Page not found</h1>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-brand underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
