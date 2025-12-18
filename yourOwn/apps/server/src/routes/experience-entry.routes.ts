// src/routes/experience-entry.routes.ts
import { Router } from "express";
import { resolveCtx } from "../middleware/ctx";
import * as ctrl from "../controller/experience-entry.controller";
import { requireAuth } from "../middleware/auth";


const r = Router();

// Resource-first, context via header/auth middleware
r.post("/experiences", requireAuth, ctrl.createExperience);
r.get("/experiences", requireAuth, ctrl.listExperiences);
r.get("/experiences/:id", requireAuth, ctrl.getExperience);
r.put("/experiences/:id", requireAuth, ctrl.updateExperience);
r.patch("/experiences/:id", requireAuth, ctrl.updateExperience);
r.delete("/experiences/:id", requireAuth, ctrl.deleteExperience);

export default r;
