import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from './api';
import type {
  CellProfile,
  CellsResponse,
  Contribution,
  Explain,
  Source,
  SpeciesDetail,
  SpeciesSummary,
} from './types';

export interface Stats {
  cellsAnalysed: { value: number; resolution6: number; source: string };
  occurrencesUsed: { value: number; source: string };
  dataSources: { value: number; source: string };
  dataset: { mode: string | null; snapshotVersion: string | null; loadedAt: string | null };
  model: { runId: string; finishedAt: string } | null;
}

export const useStats = () =>
  useQuery({ queryKey: ['stats'], queryFn: () => request<Stats>('/api/stats') });

export const useSpeciesList = () =>
  useQuery({
    queryKey: ['species'],
    queryFn: () => request<{ runId: string | null; items: SpeciesSummary[] }>('/api/species'),
    staleTime: 5 * 60_000,
  });

export const useSpecies = (id: string | undefined) =>
  useQuery({
    queryKey: ['species', id],
    queryFn: () => request<SpeciesDetail>(`/api/species/${id}`),
    enabled: Boolean(id),
    staleTime: 5 * 60_000,
  });

export interface CellFilters {
  species: string;
  resolution: 6 | 7;
  bbox?: string;
  excludeProtected?: boolean;
  territory?: string;
}

export function cellsUrl(f: CellFilters): string {
  const p = new URLSearchParams({
    species: f.species,
    resolution: String(f.resolution),
    pageSize: '50000',
  });
  if (f.bbox) p.set('bbox', f.bbox);
  if (f.excludeProtected) p.set('excludeProtected', 'true');
  if (f.territory) p.set('territory', f.territory);
  return `/api/cells?${p.toString()}`;
}

export const useCells = (f: CellFilters | null) =>
  useQuery({
    queryKey: ['cells', f],
    queryFn: ({ signal }) => request<CellsResponse>(cellsUrl(f as CellFilters), { signal }),
    enabled: Boolean(f),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
  });

export const useCell = (h3: string | null) =>
  useQuery({
    queryKey: ['cell', h3],
    queryFn: () => request<CellProfile>(`/api/cells/${h3}`),
    enabled: Boolean(h3),
  });

export const useExplain = (species: string | null, h3: string | null) =>
  useQuery({
    queryKey: ['explain', species, h3],
    queryFn: () => request<Explain>(`/ml/explain?species=${species}&h3=${h3}`),
    enabled: Boolean(species && h3),
    retry: false,
  });

export interface CompareResponse {
  species: { id: string; scientificName: string; habitat: string };
  parameters: SpeciesDetail['parameters'];
  cells: {
    h3: string;
    territory: string;
    centroid: { lat: number; lon: number };
    score: null | {
      score: number;
      category: string;
      mode: string;
      expertScore: number | null;
      mlScore: number | null;
      confidence: number;
      modifiers: { regulatory: number; human: number; data: number };
    };
    parameters: { key: string; value: number | null; fit: number | null }[];
    features: Record<string, number>;
  }[];
}

export const useCompare = (species: string, cells: string[]) =>
  useQuery({
    queryKey: ['compare', species, cells],
    queryFn: () =>
      request<CompareResponse>(`/api/compare?species=${species}&cells=${cells.join(',')}`),
    enabled: cells.length >= 2,
  });

export const useSources = () =>
  useQuery({ queryKey: ['sources'], queryFn: () => request<{ items: Source[] }>('/api/sources') });

export const useCoverage = () =>
  useQuery({
    queryKey: ['coverage'],
    queryFn: () =>
      request<{ featureDefinitions: number; items: [string, number][] }>(
        '/api/coverage?resolution=6',
      ),
    staleTime: Infinity,
  });

export const useOccurrences = (id: string | undefined) =>
  useQuery({
    queryKey: ['occurrences', id],
    queryFn: () => request<GeoJSON.FeatureCollection>(`/api/species/${id}/occurrences?limit=8000`),
    enabled: Boolean(id),
    staleTime: Infinity,
  });

export interface MetricsResponse {
  run: { id: string; created_at: string; finished_at: string; message: string } | null;
  species: {
    species_id: string;
    trained: boolean;
    reason: string | null;
    n_presences: number;
    n_background: number;
    auc_mean: number | null;
    auc_std: number | null;
    tss_mean: number | null;
    tss_std: number | null;
    lr_auc_mean: number | null;
    lr_tss_mean: number | null;
  }[];
}

export const useMetrics = () =>
  useQuery({
    queryKey: ['metrics'],
    queryFn: () => request<MetricsResponse>('/ml/metrics'),
    retry: false,
  });

export const useContributions = (mine: boolean) =>
  useQuery({
    queryKey: ['contributions', { mine }],
    queryFn: () =>
      request<{ total: number; items: Contribution[] }>(
        `/api/contributions?pageSize=200${mine ? '&mine=true' : ''}`,
      ),
  });

export interface QueueItem {
  contribution: Contribution;
  model: null | {
    score: number;
    category: string;
    mode: string;
    expertScore: number | null;
    mlScore: number | null;
    confidence: number;
    limiting: [string, string][];
  };
  diff: { contributionSays: string; modelSays: string; agrees: boolean | null };
}

export const useQueue = () =>
  useQuery({
    queryKey: ['admin', 'queue'],
    queryFn: () => request<{ total: number; items: QueueItem[] }>('/api/admin/queue'),
  });

export interface AdminStats {
  contributions: Partial<Record<Contribution['status'], number>>;
  runs: {
    id: string;
    status: string;
    trigger: string;
    isActive: boolean;
    progress: number;
    message: string | null;
    createdAt: string;
    finishedAt: string | null;
  }[];
}

export const useAdminStats = (poll = false) =>
  useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => request<AdminStats>('/api/admin/stats'),
    refetchInterval: poll ? 3000 : false,
  });

export const useAudit = () =>
  useQuery({
    queryKey: ['admin', 'audit'],
    queryFn: () =>
      request<{
        total: number;
        items: {
          id: string;
          action: string;
          targetType: string;
          targetId: string | null;
          detail: Record<string, unknown>;
          createdAt: string;
          actor: { displayName: string } | null;
        }[];
      }>('/api/admin/audit?pageSize=50'),
  });

export function useInvalidate() {
  const qc = useQueryClient();
  return (...keys: unknown[][]) =>
    Promise.all(keys.map((k) => qc.invalidateQueries({ queryKey: k })));
}

export { useMutation };
