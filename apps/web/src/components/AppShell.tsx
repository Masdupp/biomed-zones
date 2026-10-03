import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { StatusBar } from './StatusBar';

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <StatusBar />
    </div>
  );
}
