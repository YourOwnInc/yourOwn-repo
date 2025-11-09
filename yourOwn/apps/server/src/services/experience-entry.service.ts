// src/services/experience-entry.service.ts
// Services now call the new Prisma-backed Experience repo functions.

import type { ExperienceKind } from "@prisma/client";
import * as ExperienceRepo from "../repositories/experience-entry.repo";

// If you had request-body types before, keep them here (they’re just DTOs).
export type AddExperienceEntryBody = {
  sessionId?: string;
  userId?: string;
  title: string;
  summary?: string | null;
  start?: string | null; // ISO strings are OK; convert to Date in repo if you prefer
  end?: string | null;
  kind?: ExperienceKind;
  tags?: string[];
};

export type SaveExperienceEntryBody = Partial<{
  title: string;
  summary: string | null ;
  start: string | null;
  end: string | null;
  kind: ExperienceKind;
  tags: string[];
}>;

export function makeExperienceEntryService() {
  return {
    // Create the new experience entry  (old: entries.create)
    startExperienceEntry: async (input: AddExperienceEntryBody) => {
      return ExperienceRepo.createExperience({
        sessionId: input.sessionId,
        userId: input.userId,
        title: input.title,
        summary: input.summary ?? undefined,
        start: input.start ? new Date(input.start) : undefined,
        end: input.end ? new Date(input.end) : undefined,
        kind: input.kind ?? "OTHER",
        tags: input.tags ?? [],
      });
    },

    // Get a single entry by id  (old: entries.findById)
    getExperienceEntry: async (id: string) => {
      return ExperienceRepo.getExperience(id);
    },

    // Update an entry by id  (old: entries.update)
    saveExperienceEntry: async (id: string, patch: SaveExperienceEntryBody) => {
      return ExperienceRepo.updateExperience(id, {
        title: patch.title,
        summary: patch.summary ?? undefined,
        start: patch.start ? new Date(patch.start) : undefined,
        end: patch.end ? new Date(patch.end) : undefined,
        kind: patch.kind,
        tags: patch.tags,
      });
    },

    // List entries for a session  (old: entries.findBySession)
    getEntriesBySession: async (sessionId: string) => {
      return ExperienceRepo.listExperiences({ sessionId });
    },

    // Optionally list entries for a user (handy after claim)
    getEntriesByUser: async (userId: string) => {
      return ExperienceRepo.listExperiences({ userId });
    },

    // Delete an entry  (old: entries.delete)
    delete: async (id: string) => {
      return ExperienceRepo.deleteExperience(id);
    },
  };
}
