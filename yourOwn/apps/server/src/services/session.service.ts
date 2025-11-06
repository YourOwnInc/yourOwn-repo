// import domain, schema, repo
// src/services/session.service.ts
import { SessionRepo, SessionUpdate } from "../repositories/session.repo";
import { ExperienceEntryRepo } from "../repositories/experience-entry.repo";
import { LinkSessionToUserBody,StartSessionBody, SaveSessionBody, SelectTemplateBody, AddExperienceEntryBody } from "../schemas/session.schema";

type StartSessionInput = {
  userId: string | null;
  metadata?: Record<string, any>;
}
export function makeSessionService(deps: {
  sessions: SessionRepo;
  entries: ExperienceEntryRepo;
}) {

  const { sessions, entries } = deps;


  return {
   startSession: async ({ userId, metadata }: StartSessionInput) => {
      return sessions.create({
        userId, 
        metadata: metadata ?? {},
        startedAt: new Date(),
        updatedAt: new Date(),
      });
    },
     getSession: (id: string) => sessions.findById(id),
    saveSession: async (id: string, body: SaveSessionBody) => {
        const patch: SessionUpdate = {};
        if (body.status !== undefined) patch.status = body.status as any; // ideally same enum type
      if (body.userId !== undefined) patch.userId = body.userId;        // only if you allow this

      return sessions.update(id, patch);
    },
/*
    addExperienceEntry: (sessionId: string, body: { title: string; description?: string; tags?: string[] }) =>
      entries.create(sessionId, { ...body, createdAt: new Date() }),

    selectTemplate: (id: string, templateVariantId: string | null) =>
      sessions.update(id, { templateVariantId, updatedAt: new Date() }),

  */

    linkSessionToUser: async (sessionId: string, userId: string) => {
      return sessions.linkToUser(sessionId, userId);
    },

    completeSession: async (sessionId: string) => {
      return sessions.complete(sessionId, new Date());
    },

    getNumberEntries: async (sessionId: string) => {
      return sessions.countEntries(sessionId);
    }
  };
}
