import { Request, Response, NextFunction } from "express";
import { jwt, z } from "zod";
import * as svc from "../services/session.service";
import * as layoutService from "../services/layout.services"
import * as sessionRepo from "../repositories/session.repo"
import { JwtEngine}  from "../lib/auth/jwt.engine";

const StartSessionBody = z.object({
  metadata: z.record(z.string(), z.unknown()).optional().default({}),
});




const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function startSession(req: Request, res: Response, next: NextFunction) {
  try {
    
    const session = await svc.startSession();
    // create Jwt token
    const token = JwtEngine.sign({sub: session.id, sessionId: session.id, role: 'GUEST'});

    if(!session) throw new Error("could not create session");

    
    // create a layout with the assoicated sessionId 
    let sessionId = session.id;
    const newLayout = await layoutService.createLayout(sessionId);

    // return the generated UUID to the client
    res.status(201).json({token, newLayout});
  } catch (err) {
    next(err);
  }
}

// TODO: 
// new function to create a new session with an existing user


export async function getSession(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!UUID_RE.test(id)) return res.status(400).json({ error: { code: "BAD_ID", message: "Session id must be a UUID" }});
    const s = await svc.readSession(id);
    if (!s) return res.status(404).json({ error: { code: "NOT_FOUND", message: "Session not found" }});
    res.json(s);
  } catch (err) {
    next(err);
  }
}

export async function getAllSessions(req: Request, res: Response) {
  try {
    const sessions = await sessionRepo.listSessions();

    return res.json(sessions);
  }
  catch(err) {

  }
}

export async function claim(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // session id
    const userId = (req as any).user?.id; // from auth middleware
    if (!UUID_RE.test(id)) return res.status(400).json({ error: { code: "BAD_ID", message: "Session id must be a UUID" }});
    if (!UUID_RE.test(userId)) return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Valid user id required" }});
    await svc.claimSession(id, userId);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}