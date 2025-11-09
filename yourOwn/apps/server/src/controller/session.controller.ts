import { Request, Response, Router } from "express";
import { z } from "zod";
import { makeSessionService } from "../services/session.service";
import { makeInMemorySessionRepo } from "../repositories/memory/session.repo.memo";
import { makeInMemoryExperienceEntryRepo } from "../repositories/memory/experience-entry.repo.memo";
import {
  StartSessionBody,
  SaveSessionBody,
  SelectTemplateBody,
  LinkSessionToUserBody,
  AddExperienceEntryBody,
} from "../schemas/session.schema";
import * as sessions from "../repositories/session.repo";

// NOTE: In real app, inject via DI container. For now, wire in-memory repos.
const service = makeSessionService({
  sessions: makeInMemorySessionRepo(),
  entries: makeInMemoryExperienceEntryRepo(),
});

/**
 * Helper to wrap async route handlers and forward errors.
 */
export const ah =
  <T extends (req: Request, res: Response) => Promise<any>>(fn: T) =>
  (req: Request, res: Response) =>
    fn(req, res).catch((err) => {
      // Centralized minimal error handling; expand as needed.
      const status = (err as any)?.statusCode ?? 500;
      res.status(status).json({ error: (err as any)?.message ?? "Internal error" });
    });

/**
 * POST /sessions
 * Starts a new session (anonymous or linked to a user).
 * Accepts { userId?: string | null, metadata?: {...} }.
 *
 * IMPORTANT FIX:
 * - We allow userId to be undefined in the body. We coalesce to null BEFORE
 *   passing to the service so TypeScript never complains that userId is possibly undefined.
 */
export const startSession = ah(async (req, res) => {
  const parsed = StartSessionBody.parse(req.body);
  const userId = parsed.userId ?? null; // <- fix: coalesce undefined to null
  const metadata = parsed.metadata ?? {};
  const session = await service.startSession({ userId, metadata });
  res.status(201).json(safeSession(session));
});

/**
 * GET /sessions/:id
 * Fetch a session by id
 */
export const getSession = ah(async (req, res) => {
  const id = req.params.id;
  const s = await service.getSession(id);
  if (!s) return res.status(404).json({ error: "Session not found" });
  res.json(await safeSessionWithCounts(s));
});

/**
 * PATCH /sessions/:id
 * Save/update session core fields (e.g., title, metadata).
 */
export const saveSession = ah(async (req, res) => {
  const id = req.params.id;
  const body = SaveSessionBody.parse(req.body);
  const updated = await service.saveSession(id, body);
  res.json(safeSession(updated));
});



// POST /sessions/:id/claim  (requires auth; userId from req.user.id)
export async function claim(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Login required" }});

  const sessionId = req.params.id;
  await sessions.claimSession({ sessionId, userId }); // moves experiences/layout/placements ownership
  return res.json({ ok: true });
}

/**
 * POST /sessions/:id/entries
 * Add a new ExperienceEntry to the session
 
export const addExperienceEntry = ah(async (req, res) => {
  const id = req.params.id;
  const body = AddExperienceEntryBody.parse(req.body);
  const entry = await service.addExperienceEntry(id, body);
  res.status(201).json(entry);
});
*/
/**
 * POST /sessions/:id/template
 * Select/clear a template variant

export const selectTemplate = ah(async (req, res) => {
  const id = req.params.id;
  const body = SelectTemplateBody.parse(req.body);
  const updated = await service.selectTemplate(id, body.templateVariantId ?? null);
  res.json(safeSession(updated));
});

*/
/**
 * POST /sessions/:id/link-user
 * Link a session to a user (or create one)
 */
export const linkSessionToUser = ah(async (req, res) => {
  const id = req.params.id;
  const body = LinkSessionToUserBody.parse(req.body);
  const linked = await service.linkSessionToUser(id, body.userId);
  res.json(safeSession(linked));
});

/**
 * Minimal response shaping: never leak internal fields.
 * Expand as your Session grows (e.g., add `status`, `progress`, etc.).
 */
function safeSession(s: any) {
  const { id, userId, startedAt, updatedAt, metadata, templateVariantId } = s;
  return { id, userId, startedAt, updatedAt, metadata, templateVariantId };
}

async function safeSessionWithCounts(s: any) {
  const base = safeSession(s);
  // If service decorates with counts, include them. Otherwise default 0.
  return { 
    ...base, 
    entriesCount: await service.getNumberEntries(s.id)
  };
}

/**
 * Optional: Router factory to mount quickly.
 */
export function makeSessionRouter() {
  const r = Router();
  r.post("/sessions", startSession);
  r.get("/sessions/:id", getSession);
  r.patch("/sessions/:id", saveSession);
  //r.post("/sessions/:id/entries", addExperienceEntry);
  //r.post("/sessions/:id/template", selectTemplate);
  r.post("/sessions/:id/link-user", linkSessionToUser);
  return r;
}
