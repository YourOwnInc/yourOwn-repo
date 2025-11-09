import { prisma } from '../lib/prisma';

export type CreateLayoutInput = {
  sessionId?: string;
  userId?: string;
  templateId: string;
  theme?: string | null;
  slots?: Record<string, unknown>;
  placements?: Record<string, unknown>;
};

export async function createLayout(input: CreateLayoutInput) {
  return prisma.layout.create({
    data: {
      sessionId: input.sessionId ?? null,
      userId: input.userId ?? null,
      templateId: input.templateId,
      theme: input.theme ?? null,
      slots: input.slots ?? {},
      placements: input.placements ?? {},
    },
  });
}

export async function getLayoutBySession(sessionId: string) {
  return prisma.layout.findFirst({
    where: { sessionId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getLayoutByUser(userId: string) {
  return prisma.layout.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
