// src/repos/experience-entry.repo.ts
import { prisma } from "../lib/prisma";

// The controller guarantees exactly one of these
type Owner = { userId?: string | null; sessionId?: string | null };
const ofOwner = (o: Owner) => (o.userId ? { userId: o.userId } : { sessionId: o.sessionId });

export type CreateExperienceInput = Owner & {
  title: string;
  summary?: string | null;
  start?: Date | null;
  end?: Date | null;
  kind?: string | null; // map to your Prisma enum if you have one
};

export async function createExperience(input: CreateExperienceInput) {
  const data: any = {
    title: input.title,
    summary: input.summary ?? null,
    start: input.start ?? null,
    end: input.end ?? null,
    kind: (input.kind as any) ?? null,
  };

  if (input.userId) {
    data.userId = input.userId;
  }
  if (input.sessionId) {
    data.session = { connect: { id: input.sessionId } };
  }

  return prisma.experience.create({ data });
}

export async function listExperiences(filter: Owner & { kind?: string | null }) {
  return prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getExperienceOwned(id: string, owner: Owner) {
  return prisma.experience.findFirst({
  });
}

export async function updateExperienceOwned(
  id: string,
  owner: Owner,
  patch: {
    title?: string;
    summary?: string | null;
    start?: Date | null;      // undefined means “don’t touch”, null clears
    end?: Date | null;
    kind?: string | null;
    tags?: string[];
  }
) {
  // Build a “set only provided fields” object
  const data: any = {};
  if (typeof patch.title !== "undefined") data.title = patch.title;
  if (typeof patch.summary !== "undefined") data.summary = patch.summary;
  if (typeof patch.start !== "undefined") data.start = patch.start;
  if (typeof patch.end !== "undefined") data.end = patch.end;
  if (typeof patch.kind !== "undefined") data.kind = patch.kind as any;
  if (typeof patch.tags !== "undefined") data.tags = patch.tags;

  return prisma.experience.update({
    where: { id, ...ofOwner(owner) } as any, // Prisma doesn’t allow compound where in update without a unique; fallback to updateMany
    data,
  }).catch(async () => {
    // Fallback using updateMany (returns count) then read
    const { count } = await prisma.experience.updateMany({
      data,
    });
    if (count === 0) return null;
    return prisma.experience.findFirst();
  });
}

export async function deleteExperienceOwned(id: string, owner: Owner) {
  const { count } = await prisma.experience.deleteMany({
  });
  return count > 0;
}
