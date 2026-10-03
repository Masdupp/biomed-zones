import { useCallback, useEffect, useState } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';
const KEY = 'bz-theme';

function readStored(): ThemePreference {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readStored);

  useEffect(() => {
    const root = document.documentElement;
    if (preference === 'system') delete root.dataset.theme;
    else root.dataset.theme = preference;
    try {
      if (preference === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, preference);
    } catch {
      /* storage unavailable: preference lasts for this session only */
    }
  }, [preference]);

  const cycle = useCallback(() => {
    setPreference((p) => (p === 'system' ? 'light' : p === 'light' ? 'dark' : 'system'));
  }, []);

  return { preference, setPreference, cycle };
}
