// src/controllers/experience-entry.controller.ts
import { Request, Response } from "express";
import { ExperienceCreateSchema, ExperienceUpdateSchema } from "../schemas/experience.schema";
import { ownerWhere } from "../middleware/ctx";
import * as svc from "../services/experience-entry.service";
import { randomUUID } from "crypto";
import express from "express";
import { AuthenticatedRequest } from "../middleware/auth";


// optional mapper if your Prisma enum differs from client strings
function mapKind(k?: string | null) { return k ?? null; }

export async function createExperience(
  req: Request,
  res: Response,
  next: express.NextFunction
) {

  interface ExperienceCreateBody {
    title: string;
    summary?: string | null;
    start?: Date | null;
    end?: Date | null;
    kind?: string | null;
    tags?: string[] | null;
    [key: string]: any;
    content?:  any;
  }
  interface CreatedExperience { id: string; [key: string]: any }

  const authReq = req as AuthenticatedRequest;
  const role = authReq.user.role;
  const {sessionId} = req.params;

  try {
    // Check if user is a guest
    // Check if sessionId mattches 
    if(role === 'GUEST'){
      if( sessionId !== authReq.user.sessionId) {
        return res.status(403).json({ error: { code: "FORBIDDEN", message: "You do not have permission to create experience for this session" }});
      }
    }
    
    const body: ExperienceCreateBody = ExperienceCreateSchema.parse(req.body);

    console.log("body content", body);

    const created: CreatedExperience = await svc.createExperience({
      sessionId,
      title: body.title,
      summary: body.summary ?? null,
      start: body.start ?? null, // zod already transformed ISO -> Date|null
      end: body.end ?? null,
      kind: mapKind(body.kind),
      content: body.content,
    });

    return res.status(201)
      .location(`/experiences/${created.id}`)
      .json(created);
  } catch (err) {
    next(err);
  }
}

export async function listExperiences(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const {sessionId} = req.params;
  const role = authReq.user.role;
  const userId = authReq.user.userId;


  const { kind } = req.query as any;
  try {
    if(role == "GUEST") {
      if( sessionId !== authReq.user.sessionId) {
        return res.status(403).json({ error: { code: "FORBIDDEN", message: "You do not have permission to create experience for this session" }});
      }
    }
    
  const items = await svc.listExperiences({
    sessionId,
    kind: mapKind(kind),
  });

  return res.json(items);

  }catch(error) {

  }

}

export async function getExperience(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const {sessionId, id} = req.params;


  const item = await svc.getExperienceOwned(id,{sessionId});
  if (!item) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
  return res.json(item);
}

export async function updateExperience(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user.userId;
  const {sessionId, experienceId}  = req.params;
  const id = req.params.id; // experince ID 
  const patch = ExperienceUpdateSchema.parse(req.body);

  const updated = await svc.updateExperienceOwned(id, {sessionId, userId}, {
    title: patch.title,
    summary: patch.summary ?? null,
    start: typeof patch.start === "undefined" ? undefined : (patch.start ?? null),
    end:   typeof patch.end   === "undefined" ? undefined : (patch.end   ?? null),
    kind:  typeof patch.kind  === "undefined" ? undefined : mapKind(patch.kind),
    });

  if (!updated) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
  return res.json(updated);
}

export async function deleteExperience(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const id = req.params.id;

  const ok = await svc.deleteExperienceOwned(id, owner);
  return ok ? res.status(204).end() : res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
}
