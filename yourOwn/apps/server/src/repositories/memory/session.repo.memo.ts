// src/repositories/memory/session.repo.memory.ts
import { Session, SessionId, SessionStatus } from "../../domain/session";
import { SessionRepo } from "../session.repo";
import crypto from "node:crypto";

const sessions = new Map<string, Session>();
const sessionEntriesCount = new Map<string, number>(); // quick count cache

export function makeInMemorySessionRepo(): SessionRepo {
  return {
    async create({ userId, startedAt }) {
      const id = crypto.randomUUID();
      const s: Session = {
        id,
        userId,
        status: SessionStatus.Active,
        startedAt,
        lastSavedAt: startedAt,
        completedAt: null 
      };
      sessions.set(id, s);
      sessionEntriesCount.set(id, 0);
      return s;
    },

    async update(id, patch) {
       const current = sessions.get(id);
        if (!current) throw new Error("SESSION_NOT_FOUND");

        const updated: Session = { ...current, lastSavedAt: new Date() };

        if (patch.status !== undefined) {
          updated.status = patch.status; // same enum type → no mismatch
        }
        if (patch.userId !== undefined) {
          updated.userId = patch.userId;
        }

        sessions.set(id, updated);
        return updated;
    },

    async findById(id) {
      return sessions.get(id) ?? null;
    },

    async linkToUser(id, userId) {
      const s = sessions.get(id);
      if (!s) throw new Error("SESSION_NOT_FOUND");
      const updated = { ...s, userId, lastSavedAt: new Date() };
      sessions.set(id, updated);
      return updated;
    },

    async complete(id, completedAt) {
      const s = sessions.get(id);
      if (!s) throw new Error("SESSION_NOT_FOUND");
      const updated = { ...s, status: SessionStatus.Completed, completedAt, lastSavedAt: new Date() };
      sessions.set(id, updated);
      return updated;
    },

    async countEntries(id) {
      return sessionEntriesCount.get(id) ?? 0;
    },
  };
}

// helper for entry repo to increment counts
export function incrementSessionEntryCount(sessionId: string) {
  sessionEntriesCount.set(
    sessionId, 
    (sessionEntriesCount.get(sessionId) ?? 0) + 1
  );
}

// decrements counts 
// (used for when an experience entry is deleted)
export function decrementSessionEntryCount(sessionId: string) {
  const count = sessionEntriesCount.get(sessionId) ?? 0;
  sessionEntriesCount.set(
    sessionId, 
    count - 1 < 0 ? 0 : count - 1
  );
}
