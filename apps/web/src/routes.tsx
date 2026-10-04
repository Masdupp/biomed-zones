import { Suspense, lazy, type ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Skeleton } from './components/ui';
import { RequireAuth } from './lib/auth';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { SpeciesList } from './pages/Species';

// Heavy pages (MapLibre / deck.gl) are split out of the initial bundle.
const MapPage = lazy(() => import('./pages/MapPage'));
const Compare = lazy(() => import('./pages/Compare'));
const SpeciesDetail = lazy(() =>
  import('./pages/Species').then((m) => ({ default: m.SpeciesDetail })),
);
const Model = lazy(() => import('./pages/Model'));
const Sources = lazy(() => import('./pages/Sources'));
const Contribute = lazy(() => import('./pages/Contribute'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));

const page = (node: ReactNode) => (
  <Suspense
    fallback={
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-64 w-full" />
      </div>
    }
  >
    {node}
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'map', element: page(<MapPage />) },
      { path: 'species', element: <SpeciesList /> },
      { path: 'species/:slug', element: page(<SpeciesDetail />) },
      { path: 'compare', element: page(<Compare />) },
      { path: 'model', element: page(<Model />) },
      { path: 'sources', element: page(<Sources />) },
      {
        path: 'contribute',
        element: page(
          <RequireAuth>
            <Contribute />
          </RequireAuth>,
        ),
      },
      {
        path: 'admin',
        element: page(
          <RequireAuth requiredRole="ADMIN">
            <Admin />
          </RequireAuth>,
        ),
      },
      { path: 'login', element: page(<Login />) },
      {
        path: 'account',
        element: page(
          <RequireAuth>
            <Account />
          </RequireAuth>,
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
