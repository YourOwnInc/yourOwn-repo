// src/repositories/layout.repo.ts
import { prisma } from "../lib/prisma";
import { layoutItemInput } from "../schemas/layout.schema";

export type CreateLayoutInput = {
  sessionId: string;
  patternId: string;
  experienceId: string;
  position: number;
};

/**
 * Find the layout for a session, or create an empty one if it doesn't exist.
 * Returns layout + its items.
 */
export async function findOrCreateLayoutForSession(sessionId: string) {
  let layout = await prisma.layout.findUnique({
    where: { sessionId },
    include: {
      items: true,
    },
  });

  if (!layout) {
    // You can change "DEFAULT" to whatever template you’re using
    layout = await prisma.layout.create({
      data: {
        sessionId,
        templateId: "DEFAULT",
      },
      include: {
        items: true,
      },
    });
  }

  return layout;
}

/**
 * Replace all layout items for a given layout with the provided list.
 */
export async function replaceLayoutItems(
  layoutId: string,
  items: layoutItemInput[]
) {
  // 1. Clear all existing items for this layout
  await prisma.layoutItem.deleteMany({
    where: { layoutId },
  });

  // 2. If there are no new items, we’re done
  if (!items.length) return;

  // 3. Insert the new items
  await prisma.layoutItem.createMany({
    // TS can be picky here, so we cast to any to match Prisma's expected shape
    data: items.map((item) => ({
      layoutId,
      experienceId: item.experienceId,
      position: item.position,
      patternId: item.patternId ?? null,
      patternProps: (item.patternProps ?? null) as any,
    })) as any,
    skipDuplicates: true,
  });
}

export async function createLayoutItemForSession(
  input: CreateLayoutInput
) {
  const { sessionId, experienceId, position, patternId} = input;

  const layout = await findOrCreateLayoutForSession(sessionId)

   // Just CREATE — do not update existing items or move anything.
  // If a (layoutId, experienceId) already exists, Prisma will throw because of @@unique([layoutId, experienceId]).
  const item = await prisma.layoutItem.create({
    data: {
      layoutId: layout.id,
      experienceId,
      position,
      patternId: patternId ?? null,
    },
    include: {
      experience: true,
    },
  });

  return item;
}
