export type Habitat = 'marine' | 'freshwater' | 'terrestrial';
export type Category = 'high' | 'moderate' | 'low' | 'unsuitable' | 'indoor_only' | 'excluded';
export type Role = 'CONTRIBUTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  createdAt: string;
}

export interface Reference {
  key?: string;
  doi?: string;
  url?: string;
  title?: string;
  authors?: string[];
  year?: number;
  container?: string;
  status: 'verified' | 'to verify' | 'unverified';
  citation?: string;
}

export interface Photo {
  url: string;
  /** Vendored copy for offline use (see species_profiles.vendor_photo). */
  local_path?: string | null;
  source_page: string;
  author: string;
  license: string;
  license_url?: string | null;
}

export interface ModelSummary {
  runId: string;
  trained: boolean;
  reason: string | null;
  nPresences: number;
  nBackground: number;
  aucMean: number | null;
  aucStd: number | null;
  tssMean: number | null;
  tssStd: number | null;
  baselineAucMean: number | null;
  baselineTssMean: number | null;
}

export interface SpeciesSummary {
  id: string;
  scientificName: string;
  commonNameEn: string | null;
  commonNameFr: string | null;
  habitat: Habitat;
  iucn: { category: string; code: string; source: string } | null;
  photo: Photo | null;
  compounds: string[];
  cultivationDifficulty: string | null;
  occurrences: number;
  model: ModelSummary | null;
  cellsByCategory: Partial<Record<Category, number>>;
}

export interface Band {
  min: number;
  opt_min: number;
  opt_max: number;
  max: number;
  lethal?: boolean;
  extreme_min?: number;
  extreme_max?: number;
}

export interface Parameter {
  key: string;
  label: string;
  feature: string;
  unit: string;
  weight: number;
  band: Band | null;
}

export interface CalibrationBin {
  mean_predicted: number;
  observed: number;
  n: number;
}

export interface SpeciesDetail extends Omit<
  SpeciesSummary,
  'compounds' | 'occurrences' | 'model' | 'cellsByCategory'
> {
  authorship: string | null;
  taxonomy: Record<string, { name: string; source: string }>;
  gbifTaxonKey: number | null;
  medicalApplications: {
    compound: string;
    use: string;
    clinical_status: string;
    references: Reference[];
  }[];
  parameters: Parameter[];
  frostSensitive: boolean;
  toleranceNote: string | null;
  toleranceReferences: Reference[];
  toleranceStatus: string;
  cultivationNote: string | null;
  nativeTerritories: string[];
  nativeNote: string | null;
  occurrences: { total: number; bySource: Record<string, number> };
  model:
    | (ModelSummary & {
        calibration?: { raw: CalibrationBin[]; calibrated: CalibrationBin[] };
        importance?: Record<string, { mean_abs_shap: number; gain: number }>;
      })
    | null;
}

export type CellRow = [h3: string, score: number, category: Category, confidence: number];

export interface CellsResponse {
  species: string;
  runId: string | null;
  resolution: 6 | 7;
  total: number;
  items: CellRow[];
}

export interface ProvenanceRef {
  id: string;
  name: string;
  license: string;
  retrievedAt: string;
  mode: 'live' | 'snapshot-fallback' | 'derived';
  spatialResolution: string;
  temporalCoverage: string | null;
}

export interface FeatureValue {
  key: string;
  label: string;
  unit: string;
  value: number;
  description: string;
  provenance: ProvenanceRef;
}

export interface CellScore {
  species: string;
  score: number;
  category: Category;
  mode: 'open' | 'indoor_only' | 'excluded';
  expertScore: number | null;
  mlScore: number | null;
  confidence: number;
  completeness: number;
  modifiers: { regulatory: number; human: number; data: number };
  limiting: [string, string][];
  drivers: [string, number, number][];
  runId: string;
}

export interface CellProfile {
  h3: string;
  resolution: number;
  territory: { code: string; name: string; kind: string };
  centroid: { lat: number; lon: number };
  areaKm2: number;
  landFraction: number;
  seaFraction: number;
  parent: string | null;
  children: string[];
  features: Record<string, FeatureValue[]>;
  scores: CellScore[];
}

export interface ExplainParameter {
  key: string;
  label: string;
  feature: string;
  unit: string;
  weight: number;
  value: number | null;
  fit: number | null;
  band: Band;
}

export interface Explain {
  species: string;
  h3: string;
  run_id: string | null;
  score: {
    score: number;
    expert_score: number | null;
    ml_score: number | null;
    confidence: number;
    completeness: number;
    regulatory_mod: number;
    human_mod: number;
    data_mod: number;
    category: Category;
    mode: 'open' | 'indoor_only' | 'excluded';
    mode_reasons: string[];
    limiting: { parameter: string; kind: string; detail: string; fit?: number }[];
    drivers: { feature: string; value: number; shap: number; direction: string }[];
    parameters: ExplainParameter[];
    violations: {
      parameter: string;
      feature: string;
      value: number;
      limit: number;
      side: string;
    }[];
    recommendation: string;
    weights: [number, number];
  };
  ml: null | {
    raw_probability: number;
    calibrated_probability: number;
    expected_value_log_odds: number;
    shap: { feature: string; value: number; shap: number }[];
    auc_mean: number;
  };
}

export interface Source {
  id: string;
  sourceKey: string;
  name: string;
  url: string;
  license: string;
  licenseUrl: string | null;
  citation: string | null;
  spatialResolution: string;
  temporalCoverage: string | null;
  temporalResolution: string | null;
  variables: string[];
  accessMethod: string | null;
  mode: 'live' | 'snapshot-fallback' | 'derived';
  retrievedAt: string;
  recordCount: number | null;
  notes: string | null;
  cellValues: number;
  occurrences: number;
  features: string[];
}

export interface Contribution {
  id: string;
  species: { id: string; scientificName: string; habitat: Habitat };
  type: 'FIELD_OBSERVATION' | 'CULTIVATION_TRIAL';
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  title: string;
  description: string;
  lat: number;
  lon: number;
  h3: string;
  observedAt: string;
  outcome: string;
  measurements: Record<string, { value: number; unit: string }>;
  references: Reference[];
  isExample: boolean;
  author: { displayName: string };
  mine: boolean;
  review: { comment: string | null; reviewedAt: string } | null;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
