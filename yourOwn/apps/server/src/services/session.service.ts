// src/services/session.service.ts
// Services now call the new Prisma-backed Session + Experience repos.

import * as SessionRepo from "../repositories/session.repo";
import * as ExperienceRepo from "../repositories/experience-entry.repo";

export type StartSessionBody = {
  userId?: string | null;
  metadata?: Record<string, unknown>; // keep if you used it earlier
};

export type LinkSessionToUserBody = {
  sessionId: string;
  userId: string;
};

// If you previously allowed patching a session, define the fields here
export type SaveSessionBody = Partial<{
  // add fields only if they actually exist in your schema
  // e.g., completedAt?: string | null; // if you decide to add it
}>;

export function makeSessionService() {
  return {
    // Create a session; if userId is provided, we immediately claim it.
    startSession: async (input: StartSessionBody) => {
      const session = await SessionRepo.createSession();

      if (input?.userId) {
        await SessionRepo.claimSession(session.id, input.userId);
        // return claimed session for convenience

        //TODO: add getSession to repo  id SessionRepo.getSession?.(session.id) ?? session;
      }
      return session;
    },

    // Link an existing anonymous session to a user
    linkSessionToUser: async (sessionId: string, userId: string) => {
      return SessionRepo.claimSession(sessionId, userId);
    },

    // (Optional) Save/patch a session
    // Only implement fields you actually modeled. If you don’t have any, this can be a no-op or removed.
    saveSession: async (_id: string, _patch: SaveSessionBody) => {
      // Example if you add "completedAt" later:
      // return prisma.session.update({ where: { id }, data: { completedAt: patch.completedAt ? new Date(patch.completedAt) : null } });
      throw new Error("saveSession not implemented: no mutable fields on Session in the current schema.");
    },


    /*
    // Mark as complete – only if you add a completedAt column to Session.
    completeSession: async (sessionId: string) => {
      // If you add `completedAt DateTime?` to schema:
      // return prisma.session.update({ where: { id: sessionId }, data: { completedAt: new Date() } });
      // For now (no completedAt in schema), just return the current session:
      if (SessionRepo.getSession) return SessionRepo.getSession(sessionId);
      return { id: sessionId };
    },

    */

    // Count how many experiences belong to this session
    getNumberEntries: async (sessionId: string) => {
      // If you add a `countBySession(sessionId)` to ExperienceRepo, call it here.
      const list = await ExperienceRepo.listExperiences({ sessionId });
      return list.length;
    },
  };
}
