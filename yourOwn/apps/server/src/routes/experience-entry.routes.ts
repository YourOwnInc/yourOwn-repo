// src/routes/experience-entry.routes.ts
import { Router } from "express";
import { resolveCtx } from "../middleware/ctx";
import * as ctrl from "../controller/experience-entry.controller";
import { requireAuth } from "../middleware/auth";


const r = Router();

// Resource-first, context via header/auth middleware
r.post(":sessionId/experiences", requireAuth, ctrl.createExperience);
r.get("/", requireAuth, ctrl.listExperiences);
r.get("/:id", requireAuth, ctrl.getExperience);
r.put("/:id", requireAuth, ctrl.updateExperience);
r.patch("/:id", requireAuth, ctrl.updateExperience);
r.delete("/:id", requireAuth, ctrl.deleteExperience);

export default r;
