// src/repositories/layout.repo.ts
import { prisma } from "../lib/prisma";
import { z } from "zod";

// Schema for validation
const PlacementSchema = z.object({
  slotId: z.string().min(1),
  experienceId: z.string().min(1),
  patternId: z.string().min(1),
});

const SlotSchema = z.object({
  id: z.string().min(1),
  area: z.string().min(1),
});

const LayoutInputSchema = z.object({
  id: z.string().min(1),
  slots: z.array(SlotSchema),
  placements: z.array(PlacementSchema),
});

export type LayoutInput = z.infer<typeof LayoutInputSchema>;

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
    // layout = await prisma.layout.create({})
  }

  return layout;
}

// Creates an item and associates it with a layout with given id
export async function syncLayoutState(layoutId: string,
   slots: { id: string , area: string}[], placements: {slotId: string , experienceId: string, patternId: string}[]) {
  // use prisma transaction to sync layout state 
  const updatedLayout = await prisma.$transaction(async (tx) => {
 // 1. Clear existing rows for this layout
    // Cascading deletes in your schema will handle this cleanly
    await tx.slot.deleteMany({ where: { layoutId } });
    await tx.placemnt.deleteMany({ where: { layoutId } });

    // 2. Create the new "Array" of Slots
    await tx.slot.createMany({
      data: data.slots.map(s => ({
        layoutId,
        clientSlotId: s.id,
        area: s.area
      }))
    });

    // 3. Create the new "Array" of Placements
    await tx.placemnt.createMany({
      data: data.placements.map(p => ({
        layoutId,
        slotId: p.slotId,
        experienceId: p.experienceId,
        patternId: p.patternId
      }))
    });

    // 4. Return the new full state
    return tx.layout.findUnique({
      where: { id: layoutId },
      include: { slots: true, items: true } // 'items' is the relation name in Layout
    });
  });
}

export async function fetchLayoutBySessionId(sessionId: string) {
  let layout = await prisma.layout.findUnique({
    where: {
      sessionId,
    },
  });
  return layout;
}

// get layout items by layoutId

export async function fetchItems(layoutId: string) {
  let items = await prisma.layout.findUnique({
    where: {
      id: layoutId,
    },
    select: {
      items: true,
    },
  });
  return items;
}
