import { useEffect, useState } from 'react';
import { isDarkTheme } from './basemap';

/** Tracks the effective theme (data-theme attribute or system preference). */
export function useDark(): boolean {
  const [dark, setDark] = useState(isDarkTheme);
  useEffect(() => {
    const update = () => setDark(isDarkTheme());
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener('change', update);
    return () => {
      obs.disconnect();
      mq?.removeEventListener('change', update);
    };
  }, []);
  return dark;
}
