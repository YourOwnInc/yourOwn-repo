import { prisma } from '../lib/prisma';

export async function createSession() {
  return prisma.session.create({ data: {} });
}

export async function claimSession(sessionId: string, userId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { claimedByUserId: userId },
  });
}
