// controllers/layout.controller.ts
import { Request, Response } from "express";
import { z } from "zod";
import { ownerWhere } from "../middleware/ctx";
import * as layoutRepo from "../repositories/layout.repo";
//import * as expRepo from "../repositories/experience-entry.repo";
import * as layoutService from "../services/layout.services";
import { AuthenticatedRequest } from "../middleware/auth";
// src/controllers/layout.controller.ts
import { SyncLayoutSchema } from "../repositories/layout.repo";
import { verifyLayoutOwnership } from "../services/layout.auth.service";
import { error } from "node:console";

/*
 inserts new layout data to db and returns it
 */
export async function sync(req: Request, res: Response) {

  //fetch info from api request
  const authReq = req as AuthenticatedRequest;
  const {layoutId} = req.params;
  
  try{

    // Auth check 
    // catches erros when not validated
    await verifyLayoutOwnership(layoutId, authReq.user)

    // validate request body 
    const result = SyncLayoutSchema.safeParse(req.body);
    // returns format error 
    if (!result.success) {
      return res.status(400).json({error: result.error.format()})
    }


  // fetch data from params and body 
  const { slots, placements } = result.data;
  // calls repo to sync data 
  const updated = await layoutRepo.syncLayoutState(layoutId, slots, placements);
  // returns updated info 
  return res.json(updated);
}
catch(err: any){
if (err.message === "NOT_FOUND") return res.status(404).json({ error: "Layout not found" });
 if (err.message === "FORBIDDEN") return res.status(403).json({ error: "Access denied" });
}
}

export async function createLayout(re: Request, res: Response) {

}



// // GET 
// export async function getLayout(req: Request, res: Response) {
//   const sessionId = req.header("X-Session-Id"); // sessionId 
//   if (!sessionId) return res.status(400).json({ error: { code: "MISSING_SESSION", message: "X-Session-Id header is required" }});
//   const model = await layoutRepo.findOrCreateLayoutForSession(sessionId); // returns { templateId, theme, slots, placements }
//   return res.json(model);
// }

// export async function getLayoutItems( req: Request, res: Response) {
//   try {
//       const sessionId = req.header("X-Session-Id");
//       if (!sessionId) return res.status(400).json({ error: { code: "MISSING_SESSION", message: "X-Session-Id header is required" }});
//       const layoutId = req.body
//       const items = await layoutService.getLayoutItems(layoutId)
//       return items;
//   }catch(err) {

//     return err;
//   }
 
// }


// // 
// export async function assign(req: Request, res: Response) {
//   const authReq = req as AuthenticatedRequest;
//   const role = authReq.user.role;
//   const {seesionId} = req.params;

//   try {
   
//     if (!sessionId) {
//       return res.status(400).json({ error: "X-Session-Id header required" });
//     }

//     const { layout } = req.body;
//     if (!layout) {
//       return res.status(400).json({ error: "Layout object required in body" });
//     }

//     const result = await layoutRepo.createItem(sessionId, layout);
//     return res.json({ ok: true, data: result });
//   } catch (e: any) {
//     console.error("❌ [assign] Error:", e.message);
//     if (e instanceof z.ZodError) {
//       return res.status(400).json({ error: "Invalid layout structure", details: e.errors });
//     }
//     return res.status(500).json({ error: e.message });
//   }
// }
