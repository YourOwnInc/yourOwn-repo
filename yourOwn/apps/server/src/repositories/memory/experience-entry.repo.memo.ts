// src/repositories/memory/experience-entry.repo.memory.ts
import { 
  ExperienceEntryRepo, 
  ExperienceEntry, 
  AddExperienceEntryBody 
} from "../experience-entry.repo";
import crypto from "node:crypto";
import { 
  incrementSessionEntryCount,
  decrementSessionEntryCount
} from "./session.repo.memo";

const entries = new Map<string, ExperienceEntry>();

export function makeInMemoryExperienceEntryRepo(): ExperienceEntryRepo {
  return {
    // Create the new experience entry
    async create(input: AddExperienceEntryBody) {
      const id = crypto.randomUUID();
      const now = new Date();
      const createdEntry: ExperienceEntry = { 
        id, 
        createdAt: now, 
        updatedAt: now, 
        ...input 
      };
      entries.set(id, createdEntry);
      // Setup the connection between session and entry
      incrementSessionEntryCount(createdEntry.sessionId);
      return createdEntry;
    },

    // Find the list of entries of the given session
    async findBySession(sessionId) {
      return [...entries.values()].filter(entry => 
        entry.sessionId === sessionId
      );
    },

    // Find the experience entry with given id
    async findById(id) {
      return entries.get(id) ?? null;
    },

    // Update the entry with given id and new data
    async update(id, patch) {
      const currentEntry = entries.get(id);
      if (!currentEntry) throw new Error("ENTRY_NOT_FOUND");
      const updated: ExperienceEntry = { 
        ...currentEntry, 
        ...patch, 
        updatedAt: new Date() 
      };
      entries.set(id, updated);
      return updated;
    },

    // Delete the entry with given id
    async delete(id) {
      const sessionId = entries.get(id)?.sessionId;
      if (sessionId) decrementSessionEntryCount(sessionId)
      entries.delete(id);
    }
  };
}