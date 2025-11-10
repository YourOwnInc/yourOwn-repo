// controllers/layout.controller.ts
import { Request, Response } from "express";
import { z } from "zod";
import { ownerWhere } from "../middleware/ctx";
import * as layoutRepo from "../repositories/layout.repo";
import * as expRepo from "../repositories/experience-entry.repo";

const assignSchema = z.object({
  slotId: z.string().min(1),
  experienceId: z.string().min(1),
  patternId: z.string().min(1),
  props: z.record(z.unknown()).optional(),
});

export async function getLayout(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const model = await layoutRepo.getOrSeed(owner); // returns { templateId, theme, slots, placements }
  return res.json(model);
}

export async function assign(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const a = assignSchema.parse(req.body);

  // guard: experience must belong to same owner
  const ok = await expRepo.existsOwned(a.experienceId, owner);
  if (!ok) return res.status(400).json({ error: { code: "FOREIGN_OWNERSHIP", message: "Experience not owned by requester" }});

  await layoutRepo.upsertPlacement(owner, a);
  return res.json({ ok: true });
}
