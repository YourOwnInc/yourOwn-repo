import { prisma } from '../lib/prisma';
import { ExperienceKind, Prisma } from '@prisma/client';

export type CreateExperienceInput = {
  sessionId?: string;
  userId?: string;
  title: string;
  summary?: string;
  start?: Date | null;
  end?: Date | null;
  kind?: ExperienceKind;
  tags?: string[];
};

export async function createExperience(input: CreateExperienceInput) {
  return prisma.experience.create({
    data: {
      sessionId: input.sessionId ?? null,
      userId: input.userId ?? null,
      title: input.title,
      summary: input.summary ?? null,
      start: input.start ?? null,
      end: input.end ?? null,
      kind: input.kind ?? 'OTHER',
      tags: input.tags ?? [],
    },
  });
}

export async function listExperiences(filter: {
  sessionId?: string;
  userId?: string;
  kind?: ExperienceKind;
}) {
  return prisma.experience.findMany({
    where: {
      sessionId: filter.sessionId,
      userId: filter.userId,
      kind: filter.kind,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getExperience(id: string) {
  return prisma.experience.findUnique({ where: { id } });
}

export async function updateExperience(
  id: string,
  patch: Partial<Omit<CreateExperienceInput, 'sessionId' | 'userId'>> & {
    tags?: string[];
    summary?: string
  },
) {
  return prisma.experience.update({
    where: { id },
    data: {
      title: patch.title,
      summary: patch.summary,
      start: patch.start ?? undefined,
      end: patch.end ?? undefined,
      kind: patch.kind,
      tags: patch.tags,
    },
  });
}

export async function deleteExperience(id: string) {
  return prisma.experience.delete({ where: { id } });
}
