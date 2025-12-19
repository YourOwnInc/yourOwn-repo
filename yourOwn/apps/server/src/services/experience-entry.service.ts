// src/services/experience-entry.service.ts
import * as repo from "../repositories/experience-entry.repo";

/**
 * Exactly one of userId or sessionId must be provided by the caller (controller).
 */
export type Owner = { userId?: string | null; sessionId?: string | null };

function authenticate(o: Owner) {
  if(!o.userId && !o.sessionId) {
    throw new Error("Exactly one of userId or sessionId must be provided");
  }
}

export type CreateExperienceInput = Owner & {
  title: string;
  summary?: string | null;
  start?: Date | null;
  end?: Date | null;
  kind?: string | null; // map enums earlier; keep service generic
};

export async function createExperience(input: CreateExperienceInput) {
  authenticate(input);
  return repo.createExperience(input);
}

export async function listExperiences(filter: Owner & { kind?: string | null }) {
  authenticate(filter);
  return repo.listExperiences(filter);
}

export async function getExperienceOwned(id: string, owner: Owner) {
  authenticate(owner);
  return repo.getExperienceOwned(id, owner);
}

export async function updateExperienceOwned(
  id: string,
  owner: Owner,
  patch: {
    title?: string;
    summary?: string | null;
    start?: Date | null; // undefined = untouched; null = clear
    end?: Date | null;
    kind?: string | null;
  }
) {
  authenticate(owner);
  return repo.updateExperienceOwned(id, owner, patch);
}

export async function deleteExperienceOwned(id: string, owner: Owner) {
  authenticate(owner);
  return repo.deleteExperienceOwned(id, owner);
}
