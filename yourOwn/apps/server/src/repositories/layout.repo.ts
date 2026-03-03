// src/repositories/layout.repo.ts
import { prisma } from "../lib/prisma";
// src/repositories/layout.repo.ts
import { z } from "zod";



/**
 * Find the layout for a session, or create an empty one if it doesn't exist.
 * Returns layout + its items.
 */
export async function findOrCreateLayoutForSession(sessionId: string, layoutId: string) {
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

  console.log("placement in findOrcreate  Layout repo", layout);

  return {
    id: layout.id,
    layoutName: layout.LayoutId,
    slots: layout.slots,
    // Ensure the mapped placements include both ID types
    placements: layout.placements.map(p => ({
      slotId: p.slotId,
      patternId: p.patternId,
      experienceVariantId: p.experienceVariantId, // keep existing
      profileId: p.profileId,       // ADD THIS LINE
      metadata: p.metadata,
    })),
  };
}

/**
 * Creates a new layout (tab) for an existing session.
 */
export async function createNewLayout(sessionId: string, layoutName: string, slots?: { clientSlotId: string, area: string }[]) {

  console.log("slots in createNewLayout repo", slots);
  console.log("layoutName in createNewLayout repo", layoutName);
  console.log("sessionId in createNewLayout repo", sessionId);
  return await prisma.layout.create({
    data: {
      sessionId: sessionId,
      LayoutId: layoutName,
      slots: slots && slots.length > 0 ? {
        create: slots.map(s => ({
          clientSlotId: s.clientSlotId,
          area: s.area
        }))
      } : undefined
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
  slots: { id: string, area: string }[],
  placements: { slotId: string, profileId?: string | null, experienceVariantId?: string | null, patternId: string, metadata?: any | null }[]
) {
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
    console.log("layoutId in syncLayoutState repo", layoutId);
    console.log("slots in syncLayoutState repo", slots);
    console.log("placements in syncLayoutState repo", placements);

    // 3. Create the new "Array" of Placements
    await tx.placement.createMany({
      data: placements.map(p => ({
        layoutId,
        slotId: p.slotId,
        experienceVariantId: p.experienceVariantId,
        profileId: p.profileId,
        patternId: p.patternId,
        metadata: p.metadata ?? null,
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
