// src/services/layout.services.ts
import type { UpdateLayoutInput } from "../schemas/layout.schema";
import {
  normalizeLayoutItems,
  assertNoDuplicateExperiences,
} from "../domain/layoutModel";
import * as layoutRepo from "../repositories/layout.repo";
import * as sessionRepo from "../repositories/session.repo";
import * as experienceRepo from "../";
import {prisma } from "../lib/prisma"


type OwnerWhere = { userId: string };

/**
 * Initializes a session with its first "home" tab.
 * Called by startSession in the sessionController.
 */
export async function initializeSessionLayout(sessionId: string) {
  // Ensure the primary "home" layout exists
  const layout = await layoutRepo.findOrCreateLayoutForSession(sessionId, "home");
  
  if (!layout) {
    throw new Error("FAILED_TO_INITIALIZE_LAYOUT");
  }
  return layout;
}

/**
 * Logic for creating a new tab/page.
 * Service layer enforces unique naming or limits.
 */
export async function addNewTabPage(sessionId: string, layoutName: string) {
  // Business Rule: Check if user already has a tab with this name
  const existingTabs = await layoutRepo.getAllSessionTabs(sessionId);
  const exists = existingTabs.some(t => t.LayoutId === layoutName);
  
  if (exists) {
    const err = new Error("TAB_ALREADY_EXISTS");
    (err as any).code = 409;
    throw err;
  }

  // Use repo to create the new layout
  return await layoutRepo.createNewLayout(sessionId, layoutName);
}

// src/services/layout.services.ts

/**
 * Fetches a layout and "hydrates" it by attaching all referenced experiences.
 * Optimized for single-page rendering.
 */
export async function getHydratedLayout(sessionId: string, layoutName: string) {
  // 1. Fetch layout with its slots and placements
  const layout = await layoutRepo.findOrCreateLayoutForSession(sessionId, layoutName);

  console.log("layout obj in hydrateLyaout service ", layout );

  // 2. Extract unique experience IDs from the placements
  const experienceIds = [...new Set(layout.placements.map(p => p.experienceId))];

  const profileIds = [
    ...new Set(
      layout.placements
        .map(p => p.patternId)
        .filter((id): id is string => id != null)
    )
  ]

  
// 3. Fetch content in parallel for better performance
  const [experiences, profiles] = await Promise.all([
    prisma.experience.findMany({
      where: { id: { in: experienceIds } }
    }),
    prisma.profile.findMany({
      where: { id: { in: profileIds } }
    })
  ]);

  return {
    ...layout,
    // The "Library" approach allows the client to look up content by ID
    // regardless of which slot it sits in.
    experienceLibrary: experiences,
    profileLibrary: profiles 
  };
}