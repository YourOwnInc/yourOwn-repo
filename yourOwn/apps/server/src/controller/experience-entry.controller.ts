// src/controllers/experience-entry.controller.ts

import { Request, Response, NextFunction } from "express";
import { ExperienceCreateSchema, ExperienceUpdateSchema, ExperienceCreateBody } from "../schemas/experience.schema";
import * as svc from "../services/experience-entry.service";
import { AuthenticatedRequest } from "../middleware/auth";
import { ownerWhere } from "../middleware/ctx";
// optional mapper if your Prisma enum differs from client strings
function mapKind(k?: string | null) { return k ?? null; }
// src/controllers/experience-entry.controller.ts


export async function createExperience(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const { role, sessionId: userSessionId } = authReq.user;
  const { sessionId } = req.params;

  try {
    // 1. Auth Logic: Check if GUEST is accessing their own session
    if (role === 'GUEST' && sessionId !== userSessionId) {
      return res.status(403).json({ 
        error: { code: "FORBIDDEN", message: "You do not have permission for this session" }
      });
    }
    
    // 2. Validation: The Body is now automatically typed as ExperienceCreateBody
    const body = ExperienceCreateSchema.parse(req.body);

    // 3. Service Call: Pass the whole body object + session context
    const created = await svc.createExperience({
      ...body,
      sessionId,
    });

    return res.status(201).location(`/experiences/${created.id}`).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateExperience(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const { sessionId, id } = req.params; // id = experience ID
  
  try {
    const patch = ExperienceUpdateSchema.parse(req.body);

    const updated = await svc.updateExperienceOwned(id, { sessionId }, patch);

    if (!updated) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
    return res.json(updated);
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

export async function deleteExperience(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const id = req.params.id;

  const ok = await svc.deleteExperienceOwned(id, owner);
  return ok ? res.status(204).end() : res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
}
