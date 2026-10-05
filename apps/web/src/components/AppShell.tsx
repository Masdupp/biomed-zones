import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { REPO_URL, STATIC } from '@/lib/static';

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      {STATIC && (
        <p className="border-b border-border bg-brand-subtle px-4 py-1.5 text-center text-xs text-ink">
          Read-only demo built from the data snapshot: map at resolution 6, explanations, species,
          model and sources. Sign-in, contributions, admin, PDF reports and resolution 7 need the
          full stack (<code>docker compose up</code>)
          {REPO_URL && (
            <>
              {' '}
              —{' '}
              <a href={REPO_URL} className="underline">
                source and instructions
              </a>
            </>
          )}
          .
        </p>
      )}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <StatusBar />
    </div>
  );
}
