import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter, type RouteObject } from 'react-router-dom';
import { PROVIDER_FUTURE, ROUTER_FUTURE } from '@/lib/router';

export function renderRoutes(routes: RouteObject[], initialPath = '/') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter(routes, {
    initialEntries: [initialPath],
    future: ROUTER_FUTURE,
  });
  return render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} future={PROVIDER_FUTURE} />
    </QueryClientProvider>,
  );
}

export function renderWithClient(ui: ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}
