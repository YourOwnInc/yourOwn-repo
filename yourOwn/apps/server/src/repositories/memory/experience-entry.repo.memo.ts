// src/repositories/memory/experience-entry.repo.memory.ts
import { ExperienceEntryRepo, ExperienceEntry, CreateEntryInput } from "../experience-entry.repo";
import crypto from "node:crypto";


const entries = new Map<string, ExperienceEntry>();

export function makeInMemoryExperienceEntryRepo(): ExperienceEntryRepo {
  return {
    async create(input: CreateEntryInput) {
      const id = crypto.randomUUID();
      const now = new Date();
      const e: ExperienceEntry = { id, createdAt: now, updatedAt: now, ...input };
      entries.set(id, e);

      return e;
    },

    async findBySession(sessionId) {
      return [...entries.values()].filter(e => e.sessionId === sessionId);
    },

    async findById(id) {
      return entries.get(id) ?? null;
    },

    async update(id, patch) {
      const current = entries.get(id);
      if (!current) throw new Error("ENTRY_NOT_FOUND");
      const updated: ExperienceEntry = { ...current, ...patch, updatedAt: new Date() };
      entries.set(id, updated);
      return updated;
    },

    async delete(id) {
      entries.delete(id);
    }
  };
}
