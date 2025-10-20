import { Response, Request, NextFunction } from "express";

import { verifyJwt } from "../utils/jwt";

export function requireAuth(req: Request & { userId?: string }, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization;
  const token = hdr?.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "MISSING_TOKEN" });
  try {
    const payload = verifyJwt(token) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "INVALID_TOKEN" });
  }
}