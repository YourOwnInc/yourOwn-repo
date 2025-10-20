// import domain, schema, repo
// src/services/session.service.ts
import { SessionRepo } from "../repositories/session.repo";
import { ExperienceEntryRepo } from "../repositories/experiEnce-entry.repo";
import { LinkSessionToUserBody, SaveSessionBody, SelectTemplateBody, AddExperienceEntryBody } from "../schemas/session.schema";

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
      return sessions.update(id, { ...body });
    },

    addExperienceEntry: async (sessionId: string, userId: string | null, body: AddExperienceEntryBody) => {
      return entries.create({ sessionId, userId, ...body });
    },

    selectTemplate: async (sessionId: string, body: SelectTemplateBody) => {
      return sessions.update(sessionId, { templateVariantId: body.templateVariantId });
    },

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
