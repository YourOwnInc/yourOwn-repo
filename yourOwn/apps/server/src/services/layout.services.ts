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

  //Business Rule: Check if tab name exisits in layout registry. Cannot have unique tab
  
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
  const layout = await layoutRepo.findOrCreateLayoutForSession(sessionId, layoutName);

  // 1. Collect all unique IDs from placements
  const experienceIds = [...new Set(layout.placements.map(p => p.experienceId).filter(Boolean))] as string[];
  const profileIds = [...new Set(layout.placements.map(p => p.profileId).filter(Boolean))] as string[];

  // 2. Fetch both types in parallel
  // Use destructuring [experiences, profiles] to keep the result flat
  const [experiences, profiles] = await Promise.all([
    prisma.experience.findMany({ where: { id: { in: experienceIds } } }),
    prisma.profile.findMany({ where: { id: { in: profileIds } } }),
  ]);

  // 3. Add a "kind" property to Profiles if they don't have one in the DB
  // This helps your Pattern components distinguish data types
  const mappedProfiles = profiles.map(p => ({ ...p, kind: 'profile' }));

  return {
    ...layout,
    experienceLibrary: [...experiences, ...mappedProfiles], // Returns a single flat array
  };
}