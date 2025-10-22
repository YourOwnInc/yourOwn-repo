// import domain, schema, repo
// src/services/session.service.ts
import { SessionRepo, SessionUpdate } from "../repositories/session.repo";
import { ExperienceEntryRepo } from "../repositories/experience-entry.repo";
import { LinkSessionToUserBody,StartSessionBody, SaveSessionBody, SelectTemplateBody, AddExperienceEntryBody } from "../schemas/session.schema";

export function makeSessionService(deps: {
  sessions: SessionRepo;
  entries: ExperienceEntryRepo;
}) {
  const { sessions, entries } = deps;

  return {
    startSession: async (userId: string | null) => {
      return sessions.create({ userId, startedAt: new Date() });
    },

    saveSession: async (id: string, body: SaveSessionBody) => {
      const patch: SessionUpdate = {};
  if (body.status !== undefined) patch.status = body.status as any; // ideally same enum type
  if (body.userId !== undefined) patch.userId = body.userId;        // only if you allow this

  return sessions.update(id, patch);
    },

    //addExperienceEntry: async (sessionId: string, userId: string | null, body: AddExperienceEntryBody) => {
      //return entries.create({ sessionId, userId, ...body });
    //},
    linkSessionToUser: async (sessionId: string, userId: string) => {
      return sessions.linkToUser(sessionId, userId);
    },

    completeSession: async (sessionId: string) => {
      return sessions.complete(sessionId, new Date());
    },

    getSession: async (sessionId: string) => {
      const s = await sessions.findById(sessionId);
      if (!s) throw new Error("SESSION_NOT_FOUND");
      const entriesCount = await sessions.countEntries(sessionId);
      return { ...s, entriesCount };
    }
  };
}
