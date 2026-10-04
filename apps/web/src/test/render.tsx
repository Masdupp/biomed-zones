import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { PROVIDER_FUTURE, ROUTER_FUTURE } from '@/lib/router';

export function renderRoutes(routes: RouteObject[], initialPath = '/') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter(routes, {
    initialEntries: [initialPath],
    future: ROUTER_FUTURE,
  });
  return render(
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} future={PROVIDER_FUTURE} />
      </AuthProvider>
    </QueryClientProvider>,
  );
}
