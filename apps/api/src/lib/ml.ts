import { config } from '../config';
import { HttpError } from './errors';

async function call<T>(path: string, init: RequestInit = {}, timeoutMs = 10_000): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${config.ML_SERVICE_URL}${path}`, {
      ...init,
      headers: { 'content-type': 'application/json', ...init.headers },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    throw new HttpError(502, 'ml_unavailable', `ML service unreachable: ${(err as Error).message}`);
  }
  const body = (await res.json().catch(() => ({}))) as T & { detail?: unknown };
  if (!res.ok) {
    throw new HttpError(
      res.status >= 500 ? 502 : res.status,
      'ml_error',
      'ML service error',
      body.detail,
    );
  }
  return body;
}

export interface MlExplain {
  species: string;
  h3: string;
  run_id: string | null;
  score: Record<string, unknown> & { recommendation: string; score: number };
  ml: null | {
    raw_probability: number;
    calibrated_probability: number;
    expected_value_log_odds: number;
    shap: { feature: string; value: number; shap: number }[];
    auc_mean: number;
  };
}

export const ml = {
  explain: (species: string, h3: string) =>
    call<MlExplain>(`/explain?species=${encodeURIComponent(species)}&h3=${encodeURIComponent(h3)}`),
  train: () =>
    call<{ run_id: string; status: string }>('/train', {
      method: 'POST',
      headers: { 'x-admin-token': config.ML_ADMIN_TOKEN },
    }),
  trainStatus: (runId: string) =>
    call<Record<string, unknown>>(`/train/${encodeURIComponent(runId)}`),
};
