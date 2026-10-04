/** Expert-score parameters per habitat. Mirrors services/ml/biomed_ml/profiles.py (spec weights). */
export interface ParameterMeta {
  key: string;
  label: string;
  feature: string;
  unit: string;
  weight: number;
}

export const PARAMETERS: Record<string, ParameterMeta[]> = {
  marine: [
    { key: 'temperature', label: 'Sea temperature', feature: 'sst_mean', unit: '°C', weight: 0.3 },
    { key: 'salinity', label: 'Salinity', feature: 'sss_mean', unit: 'PSU', weight: 0.2 },
    { key: 'ph', label: 'Seawater pH', feature: 'ph_mean', unit: 'pH', weight: 0.2 },
    { key: 'depth', label: 'Depth', feature: 'depth_mean', unit: 'm', weight: 0.15 },
    { key: 'oxygen', label: 'Dissolved oxygen', feature: 'o2_mean', unit: 'mmol/m³', weight: 0.15 },
  ],
  terrestrial: [
    { key: 'temperature', label: 'Air temperature', feature: 'tair_mean', unit: '°C', weight: 0.3 },
    { key: 'soil_ph', label: 'Soil pH', feature: 'soil_ph', unit: 'pH', weight: 0.25 },
    { key: 'humidity', label: 'Relative humidity', feature: 'rh_mean', unit: '%', weight: 0.2 },
    {
      key: 'rainfall',
      label: 'Annual rainfall',
      feature: 'precip_annual',
      unit: 'mm',
      weight: 0.15,
    },
    { key: 'altitude', label: 'Altitude', feature: 'elev_mean', unit: 'm', weight: 0.1 },
  ],
  freshwater: [
    {
      key: 'temperature',
      label: 'Water temperature (air-temperature proxy)',
      feature: 'tair_mean',
      unit: '°C',
      weight: 1,
    },
  ],
};

export const parametersFor = (habitat: string): ParameterMeta[] => PARAMETERS[habitat] ?? [];
