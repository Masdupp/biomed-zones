/** Opt into React Router v7 behaviour now so the later upgrade is a no-op. */
export const ROUTER_FUTURE = {
  v7_relativeSplatPath: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_skipActionErrorRevalidation: true,
} as const;

export const PROVIDER_FUTURE = { v7_startTransition: true } as const;
