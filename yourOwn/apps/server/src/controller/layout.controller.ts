// controllers/layout.controller.ts
import { Request, Response } from "express";
import { z } from "zod";
import { ownerWhere } from "../middleware/ctx";
import * as layoutRepo from "../repositories/layout.repo";
//import * as expRepo from "../repositories/experience-entry.repo";
import * as layoutService from "../services/layout.services";

const assignSchema = z.object({
  position: z.string().min(1),
  experienceId: z.string().min(1),
  patternId: z.string().min(1),
  sessionId: z.string().min(1),
});

// GET 
export async function getLayout(req: Request, res: Response) {
  const sessionId = req.header("X-Session-Id"); // sessionId 
  if (!sessionId) return res.status(400).json({ error: { code: "MISSING_SESSION", message: "X-Session-Id header is required" }});
  const model = await layoutRepo.findOrCreateLayoutForSession(sessionId); // returns { templateId, theme, slots, placements }
  return res.json(model);
}

export async function getLayoutItems( req: Request, res: Response) {
  try {
      const sessionId = req.header("X-Session-Id");
      if (!sessionId) return res.status(400).json({ error: { code: "MISSING_SESSION", message: "X-Session-Id header is required" }});
      const layoutId = req.body
      const items = await layoutService.getLayoutItems(layoutId)
      return items;
  }catch(err) {

    return err;
  }
 
}


export async function assign(req: Request, res: Response) {
  try {
  const owner = req.header("X-Session-Id");
  // Data to make LayoutItem
  const experienceId = req.body;
  const {sessionId, position, patternId, layoutId} = req.body;  // parses body to make sure its the right content
  if(!owner) throw new Error("Onwer not found ");

  // creates an item and assigns it to layoutId
  await layoutRepo.createItem(experienceId, patternId, sessionId,position );
  return res.json({ ok: true });
  }
  catch(e: any ) {
    if (e.message === "BAD_CREDENTIALS") return res.status(401).json({ error: e.message });
  }

}
