import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { routes } from './routes';
import { AuthProvider } from './lib/auth';
import { PROVIDER_FUTURE, ROUTER_FUTURE } from './lib/router';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
});

const router = createBrowserRouter(routes, { future: ROUTER_FUTURE });

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Respect prefers-reduced-motion for every Framer Motion animation. */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} future={PROVIDER_FUTURE} />
        </MotionConfig>
      </AuthProvider>
    </QueryClientProvider>
  );
}
