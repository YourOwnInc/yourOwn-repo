import {Request,Response, NextFunction} from "express";

export type RequestCtx =  { userId?: string; sessionId?: string};

declare global {
    namespace Express { interface Request { ctx?: RequestCtx }}

}

export function resolveCtx(req: Request, res: Response, next: NextFunction) {
  // If you have auth middleware, prefer its user id
  const userId = (req as any).user?.id; // e.g., set by your auth layer
  const sessionId = req.header("X-Session-Id") || undefined;

  if (!userId && !sessionId) {
    return res.status(400).json({ error: { code: "NO_CONTEXT", message: "Provide auth or X-Session-Id" }});
  }
  req.ctx = { userId, sessionId };
  next();
}

export function ownerWhere(ctx: RequestCtx) {
  if (ctx.userId)   return { userId: ctx.userId };
  if (ctx.sessionId) return { sessionId: ctx.sessionId };
  throw new Error("No owner in context");
}