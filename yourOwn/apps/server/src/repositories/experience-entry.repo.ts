// src/repos/experience-entry.repo.ts
import { fi } from "zod/v4/locales";
import { prisma } from "../lib/prisma";
import { FullExperienceInput } from "../services/experience-entry.service";
import { ExperienceCreateBody } from "../schemas/experience.schema";
// The controller guarantees exactly one of these





// The controller guarantees exactly one of these
type Owner = { userId?: string | null; sessionId?: string | null };
const ofOwner = (o: Owner) => (o.userId ? { userId: o.userId } : { sessionId: o.sessionId });


export async function createExperience(input: FullExperienceInput) {
  // 1. Separate ownership from data
  const { userId, sessionId, ...rest } = input;

  // 2. Prisma data object
  const data: any = {
    ...rest, // This spreads title, type, startDate, impactBullets, etc.
    ...(userId ? { userId } : { session: { connect: { id: sessionId! } } })
  };

  return prisma.experience.create({ data });
}

// ...

export async function listExperiences(filter: Owner & { kind?: string | null }) {
  const { kind, ...owner } = filter;

  // base where is "owned by this user or this session"
  const where: any = ofOwner(owner);

  // optional filter by kind
  if (typeof kind !== "undefined" && kind !== null) {
    where.kind = kind;
  }

  return prisma.experience.findMany({
    where,
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
  patch: Partial<ExperienceCreateBody>
) {

  
return prisma.experience.update({
    where: { id, ...ofOwner(owner) } as any,
    data: patch as any, // Spreading the patch directly
  });
}

export async function deleteExperienceOwned(id: string, owner: Owner) {
  const { count } = await prisma.experience.deleteMany({
  });
  return count > 0;
}
