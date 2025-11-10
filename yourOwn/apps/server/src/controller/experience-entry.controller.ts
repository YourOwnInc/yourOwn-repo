// src/controllers/experience-entry.controller.ts
import { Request, Response } from "express";
import { ExperienceCreateSchema, ExperienceUpdateSchema } from "../schemas/experience.schema";
import { ownerWhere } from "../middleware/ctx";
import * as svc from "../services/experience-entry.service";
import { randomUUID } from "crypto";


// optional mapper if your Prisma enum differs from client strings
function mapKind(k?: string | null) { return k ?? null; }

export async function createExperience(
  req: Request,
  res: Response,
  next: import("express").NextFunction
) {
  // local interfaces for typing
  interface OwnerWhere { [key: string]: any }
  interface ExperienceCreateBody {
    title: string;
    summary?: string | null;
    start?: Date | null;
    end?: Date | null;
    kind?: string | null;
    tags?: string[] | null;
    [key: string]: any;
  }
  interface CreatedExperience { id: string; [key: string]: any }

  try {
    const owner: OwnerWhere = ownerWhere(req.ctx!);
    const body: ExperienceCreateBody = ExperienceCreateSchema.parse(req.body);

    const created: CreatedExperience = await svc.createExperience({
      ...owner,
      title: body.title,
      summary: body.summary ?? null,
      start: body.start ?? null, // zod already transformed ISO -> Date|null
      end: body.end ?? null,
      kind: mapKind(body.kind),
    });

    return res.status(201)
      .location(`/experiences/${created.id}`)
      .json(created);
  } catch (err) {
    next(err);
  }
}

export async function listExperiences(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const { kind } = req.query as any;

  const items = await svc.listExperiences({
    ...owner,
    kind: mapKind(kind),
  });

  return res.json(items);
}

export async function getExperience(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const id = req.params.id;

  const item = await svc.getExperienceOwned(id, owner);
  if (!item) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
  return res.json(item);
}

export async function updateExperience(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const id = req.params.id;
  const patch = ExperienceUpdateSchema.parse(req.body);

  const updated = await svc.updateExperienceOwned(id, owner, {
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
