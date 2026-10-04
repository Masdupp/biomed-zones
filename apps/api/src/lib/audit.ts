import type { Prisma } from '@prisma/client';
import { prisma } from './db';

export function audit(
  actorId: string | null,
  action: string,
  targetType: string,
  targetId: string | null,
  detail: Prisma.InputJsonValue = {},
) {
  return prisma.auditLog.create({ data: { actorId, action, targetType, targetId, detail } });
}
