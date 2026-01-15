// src/repositories/layout.repo.ts
import { prisma } from "../lib/prisma";
// src/repositories/layout.repo.ts
import { z } from "zod";

// 1. Validation for individual placements (Experience + Pattern + Slot)
export const PlacementSchema = z.object({
  slotId: z.string().min(1, "Slot ID is required"),
  experienceId: z.string().uuid("Invalid Experience UUID"),
  patternId: z.string().min(1, "Pattern ID is required"),
});

// 2. Validation for individual slots
export const SlotSchema = z.object({
  id: z.string().min(1, "Slot ID is required"),
  area: z.string().min(1, "Area is required"),
});

// 3. The "Sync" payload for a specific tab
export const SyncLayoutSchema = z.object({
  slots: z.array(SlotSchema),
  placements: z.array(PlacementSchema),
});

// 4. Schema for creating a new tab/page
export const CreateLayoutSchema = z.object({
  layoutName: z.string()
    .min(1)
    .max(20)
    .regex(/^[a-z0-9-]+$/, "Tab names must be lowercase, numbers, or hyphens"),
});

export type SyncLayoutInput = z.infer<typeof SyncLayoutSchema>;
/**
 * Find the layout for a session, or create an empty one if it doesn't exist.
 * Returns layout + its items.
 */
export async function findOrCreateLayoutForSession(sessionId: string, layoutId: string ) {
  let layout = await prisma.layout.findUnique({
    where: {
      sessionId_LayoutId: {
        sessionId, 
        LayoutId: layoutId
      }
    },
    include: {
      slots: true,
      placements: true,
    },
  });

  if (!layout) {
    // You can change "DEFAULT" to whatever template you’re using
    // layout = await prisma.layout.create({})
    layout = await prisma.layout.create({
      data: {
        sessionId: sessionId,
        LayoutId: "home", // Using your new default human-readable ID
      },
      include: {
        slots: true,
        placements: true,
      }
    });
  }

  console.log("slots in findOrcreate  Layout repo", layout.slots);

  return {
    id: layout.id,
    layoutName: layout.LayoutId,
    slots: layout.slots,
    placements: layout.placements,
  };
}

/**
 * Creates a new layout (tab) for an existing session.
 */
export async function createNewLayout(sessionId: string, layoutName: string ) {
  return await prisma.layout.create({
    data: {
      sessionId: sessionId,
      LayoutId: layoutName
    },
    include: {
      slots: true,
      placements: true,
    }
  })
}

/**
 * Fetches all layout names (tabs) associated with a specific session.
 */
export async function getAllSessionTabs(sessionId: string) {
  return await prisma.layout.findMany({
    where: { sessionId },
    select: {
      LayoutId: true, // The human-readable name for the tab
      id: true,       // The internal UUID
    },
  });
}

// Creates an item and associates it with a layout with given id
export async function syncLayoutState(
  layoutId: string,
  slots: { id: string , area: string}[], 
  placements: {slotId: string , experienceId: string, patternId: string}[]
  ) 
  {
  // use prisma transaction to sync layout state 
  const updatedLayout = await prisma.$transaction(async (tx) => {
 // 1. Clear existing rows for this layout
    // Cascading deletes in your schema will handle this cleanly
    await tx.slot.deleteMany({ where: { layoutId } });
    await tx.placement.deleteMany({ where: { layoutId } });

    // 2. Create the new "Array" of Slots
    await tx.slot.createMany({
      data: slots.map(s => ({
        layoutId,
        clientSlotId: s.id,
        area: s.area
      }))
    });

    // 3. Create the new "Array" of Placements
    await tx.placement.createMany({
      data: placements.map(p => ({
        layoutId,
        slotId: p.slotId,
        experienceId: p.experienceId,
        patternId: p.patternId
      }))
    });

    // 4. Return the new full state
    return tx.layout.findUnique({
      where: { id: layoutId },
      include: { slots: true, placements: true } // 'items' is the relation name in Layout
    });

  });

  return updatedLayout;
}

/**
 * Deletes a specific layout and all its associated slots/placements.
 */
export async function deleteLayout(sessionId: string, layoutName: string) {
  return await prisma.layout.delete({
    where: {
      sessionId_LayoutId: {
        sessionId,
        LayoutId: layoutName,
      }
    }
  });
}


// get layout items by layoutId
