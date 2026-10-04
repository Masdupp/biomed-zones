import { useSyncExternalStore } from 'react';

const KEY = 'bz-compare';
const MAX = 4;
const listeners = new Set<() => void>();

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown;
    return Array.isArray(v)
      ? v.filter((x): x is string => typeof x === 'string').slice(0, MAX)
      : [];
  } catch {
    return [];
  }
}

let snapshot = read();

function write(next: string[]) {
  snapshot = next.slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    /* storage unavailable: list lives for this session */
  }
  listeners.forEach((l) => l());
}

export const compareStore = {
  add(h3: string) {
    if (!snapshot.includes(h3)) write([...snapshot, h3].slice(-MAX));
  },
  remove(h3: string) {
    write(snapshot.filter((x) => x !== h3));
  },
  clear() {
    write([]);
  },
  max: MAX,
};

export function useCompareList(): string[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}
