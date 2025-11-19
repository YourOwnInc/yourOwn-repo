// src/services/experience-entry.service.ts
import * as repo from "../repositories/experience-entry.repo";

/**
 * Exactly one of userId or sessionId must be provided by the caller (controller).
 */
export type Owner = { userId?: string | null; sessionId?: string | null };

function ensureOwner(o: Owner) {
  const hasUser = !!o.userId;
  const hasSess = !!o.sessionId;
  if (hasUser === hasSess) {
    throw new Error("Exactly one of userId or sessionId must be set.");
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
  ensureOwner(input);
  return repo.createExperience(input);
}

export async function listExperiences(filter: Owner & { kind?: string | null }) {
  ensureOwner(filter);
  return repo.listExperiences(filter);
}

export async function getExperienceOwned(id: string, owner: Owner) {
  ensureOwner(owner);
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
  ensureOwner(owner);
  return repo.updateExperienceOwned(id, owner, patch);
}

export async function deleteExperienceOwned(id: string, owner: Owner) {
  ensureOwner(owner);
  return repo.deleteExperienceOwned(id, owner);
}
