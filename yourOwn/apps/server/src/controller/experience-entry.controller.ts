// controllers/experience-entry.controller.ts
import { Request, Response } from "express";
import {prisma } from "../lib/prisma";
import { z } from "zod";
import { ownerWhere } from "../middleware/ctx";
import * as repo from "../repositories/experience-entry.repo";

const createSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  kind: z.enum(["internship","project","job","volunteering"]).optional(),
  tags: z.array(z.string()).optional(),
});

const updateSchema = createSchema.partial();

export async function create(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const body = createSchema.parse(req.body);
  const created = await repo.create({ ...owner, ...body });
  return res.status(201).location(`/experiences/${created.id}`).json(created);
}

export async function list(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const { q, kind, limit, cursor } = req.query as any;
  const result = await repo.list({ ...owner, q, kind, limit: Number(limit) || 20, cursor });
  return res.json(result); // { items, nextCursor }
}

export async function getOne(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const item = await repo.getByIdOwned(req.params.id, owner);
  if (!item) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
  return res.json(item);
}

export async function update(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const patch = updateSchema.parse(req.body);
  const updated = await repo.updateOwned(req.params.id, owner, patch);
  if (!updated) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
  return res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const owner = ownerWhere(req.ctx!);
  const ok = await repo.removeOwned(req.params.id, owner);
  return ok ? res.status(204).end() : res.status(404).json({ error: { code: "NOT_FOUND", message: "Experience not found" }});
}
