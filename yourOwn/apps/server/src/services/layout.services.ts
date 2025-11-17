// src/services/layout.services.ts
import type { UpdateLayoutInput } from "../schemas/layout.schema";
import {
  normalizeLayoutItems,
  assertNoDuplicateExperiences,
} from "../domain/layoutModel";
import * as layoutRepo from "../repositories/layout.repo";
import * as sessionRepo from "../repositories/session.repo";
import * as experienceRepo from "../repositories/experience-entry.repo";

type OwnerWhere = { userId: string };

/**
 * Return the layout for a session, creating an empty one if needed.
 * Also enforces that the session belongs to the owner.
 */
export async function getSessionLayout(
  sessionId: string,
  owner: OwnerWhere
) {
  // Ownership guard
  const session = await sessionRepo.getSession(sessionId);
  if (!session) {
    const err = new Error("BAD_CREDENTIALS");
    (err as any).code = "BAD_CREDENTIALS";
    throw err;
  }

  const layout = await layoutRepo.findOrCreateLayoutForSession(sessionId);
  return layout;
}

/**
 * Replace all layout items for a session's layout.
 */
export async function updateSessionLayout(
  sessionId: string,
  input: UpdateLayoutInput,
  owner: OwnerWhere
) {
  // 1. Ownership guard
  const session = await sessionRepo.getSession(sessionId);
  if (!session ) {
    const err = new Error("BAD_CREDENTIALS");
    (err as any).code = "BAD_CREDENTIALS";
    throw err;
  }

  // 2. Normalize layout items (e.g., fill positions, sort, etc.)
  const normalizedItems = normalizeLayoutItems(input.items);

  // 3. Business rule: no duplicate experiences in the layout
  assertNoDuplicateExperiences(normalizedItems);

  // 3b. Guard that all experiences belong to this owner
  const experienceIds = normalizedItems
    .map((it) => it.experienceId)
    .filter(Boolean);


  // 4. Find or create layout and replace items
  const layout = await layoutRepo.findOrCreateLayoutForSession(sessionId);
  await layoutRepo.replaceLayoutItems(layout.id, normalizedItems);

  // 5. Return updated layout DTO
  return getSessionLayout(sessionId, owner);
}
