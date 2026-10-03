import { useQuery } from '@tanstack/react-query';
import { getJson } from './api';

export interface ApiHealth {
  status: 'ok' | 'degraded';
  version: string;
  checks: {
    database: { status: 'ok' | 'error'; postgis?: string; h3?: string | null; error?: string };
    ml: { status: 'ok' | 'error'; error?: string };
  };
}

export interface MlHealth {
  status: 'ok' | 'degraded';
  service: 'ml';
  version: string;
  database: 'ok' | 'error';
}

const REFRESH_MS = 30_000;

export function useApiHealth() {
  return useQuery({
    queryKey: ['health', 'api'],
    queryFn: () => getJson<ApiHealth>('/api/health'),
    refetchInterval: REFRESH_MS,
    retry: false,
  });
}

export function useMlHealth() {
  return useQuery({
    queryKey: ['health', 'ml'],
    queryFn: () => getJson<MlHealth>('/ml/health'),
    refetchInterval: REFRESH_MS,
    retry: false,
  });
}
