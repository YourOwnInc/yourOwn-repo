// controllers/layout.controller.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ownerWhere } from "../middleware/ctx";
import * as layoutRepo from "../repositories/layout.repo";
//import * as expRepo from "../repositories/experience-entry.repo";
import * as layoutService from "../services/layout.services";
import { AuthenticatedRequest } from "../middleware/auth";
// src/controllers/layout.controller.ts
import { SyncLayoutSchema } from "../repositories/layout.repo";
import { verifyLayoutOwnership, verifyLayoutNameOwnership } from "../services/layout.auth.service";
import { error } from "node:console";
import {prisma } from "../lib/prisma"

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

export async function createNewTab(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { role, sessionId,userId } = authReq.user;

  const { layoutName } = req.body; // Ensure this is validated by Zod
  const targetSessionId = req.params.sessionId || sessionId;

  try {


// 2. Ownership Guard: Ensure the user actually owns the session they are targeting
    const session = await prisma.session.findUnique({
      where: { id: targetSessionId },
      select: { claimedByUserId: true }
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // If User, check if the session belongs to them
    if (role === 'USER' && session.claimedByUserId !== userId) {
      return res.status(403).json({ error: "You do not own this session" });
    }
    
    // If Guest, ensure they aren't trying to access a different session
    if (role === 'GUEST' && targetSessionId !== sessionId) {
       return res.status(403).json({ error: "Access denied" });
    }

    // 3. Logic: Proceed to create the new tab
    const newTab = await layoutService.addNewTabPage(targetSessionId, layoutName);
    return res.status(201).json(newTab);

  } catch (err: any) {
    if (err.message === "TAB_ALREADY_EXISTS") {
      return res.status(409).json({ error: "A tab with this name already exists" });
    }
    
  }
}


export async function getHydratedPage(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const { layoutName } = req.params; // e.g., /layouts/hydrate/projects

  try {
    // 1. Verify ownership based on human-readable layoutName
    // This helper should resolve the layout to get the correct sessionId
    const verifiedLayout = await verifyLayoutNameOwnership(layoutName, authReq.user);

    

    // 2. Call the service to get Layout + Slots + Placements + Experience objects
    const hydratedData = await layoutService.getHydratedLayout(
      verifiedLayout.sessionId, 
      layoutName
    );

    return res.json(hydratedData);
  } catch (err: any) {
    if (err.message === "FORBIDDEN") return res.status(403).json({ error: "Access denied" });
    next(err);
  }
}

export async function removeLayout(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { layoutName } = req.body; 

  try {
    // 1. Verify ownership and get the actual DB record simultaneously
    const layout = await verifyLayoutNameOwnership(layoutName, authReq.user);

    // 2. Perform the deletion using the verified data
    // We use layout.sessionId from the DB to ensure absolute safety
    await layoutRepo.deleteLayout(layout.sessionId, layoutName);

    return res.status(204).send(); // Successful deletion, no content to return
  } catch (err: any) {
    if (err.message === "FORBIDDEN") {
      return res.status(403).json({ error: "You do not own this layout" });
    }
  }
   
}


export async function getPreviewManifest(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const { sessionId, role, userId } = authReq.user;

  try {
    // 1. Fetch the session with the profile attached
    // This uses the session identity established in your auth middleware
    const sessionData = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { 
        profile: true,
        // We only fetch the ID and Name of layouts to keep the manifest light
        layouts: {
          select: {
            id: true,
            LayoutId: true,
          }
        }
      }
    });

    if (!sessionData) {
      return res.status(404).json({ error: "Session not found" });
    }

    // 2. Return the "Skeleton" for the client to start rendering
    return res.json({
      profile: sessionData.profile,
      tabs: sessionData.layouts.map(l => ({
        id: l.id,
        name: l.LayoutId
      })),
      role: role // Useful for the client to show/hide "Edit" buttons
    });
  } catch (err) {
    next(err);
  }
}


