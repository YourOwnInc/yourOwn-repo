import { Request, Response } from "express";
import { makeUserService } from "../services/user.service";
import { makeInMemoryUserRepo } from "../repositories/user.repo";
import { RegisterBody, LoginBody } from "../schemas/user.schema";

const service = makeUserService(makeInMemoryUserRepo());

export const register = async (req: Request, res: Response) => {
// filters the body according to schema. only give what is defined in schema.
// can allow us to shift validation logic out of controller
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  try {
    const out = await service.register(parsed.data);
    res.status(201).json(out);
  } catch (e: any) {
    if (e.message === "EMAIL_IN_USE") return res.status(409).json({ error: e.message });
    throw e;
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  try {
    const out = await service.login(parsed.data.email, parsed.data.passwordHash);
    res.json(out);
  } catch (e: any) {
    if (e.message === "BAD_CREDENTIALS") return res.status(401).json({ error: e.message });
    throw e;
  }
};

export const me = async (req: Request & { userId?: string }, res: Response) => {
  const user = req.userId ? await service.currentUser(req.userId) : null;
  if (!user) return res.status(404).json({ error: "NOT_FOUND" });
  res.json({ user });
};
