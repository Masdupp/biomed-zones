import { LRUCache } from 'lru-cache';
import { prisma } from './db';

/** Response cache for heavy read endpoints. Keys embed the active model run, so a retrain
 *  naturally invalidates every cached score response. */
export const responseCache = new LRUCache<string, object>({ max: 300, ttl: 10 * 60 * 1000 });

let activeRun: { id: string | null; at: number } = { id: null, at: 0 };

export async function activeRunId(): Promise<string | null> {
  if (Date.now() - activeRun.at < 30_000) return activeRun.id;
  const run = await prisma.modelRun.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  });
  activeRun = { id: run?.id ?? null, at: Date.now() };
  return activeRun.id;
}

export function invalidateRunCache() {
  activeRun = { id: null, at: 0 };
  responseCache.clear();
}
