// src/routes/experience-entry.routes.ts
import { Router } from "express";
import { resolveCtx } from "../middleware/ctx";
import * as ctrl from "../controller/experience-entry.controller";

const r = Router();

// Resource-first, context via header/auth middleware
r.post("/experiences", resolveCtx, ctrl.createExperience);
r.get("/experiences", resolveCtx, ctrl.listExperiences);
r.get("/experiences/:id", resolveCtx, ctrl.getExperience);
r.put("/experiences/:id", resolveCtx, ctrl.updateExperience);
r.patch("/experiences/:id", resolveCtx, ctrl.updateExperience);
r.delete("/experiences/:id", resolveCtx, ctrl.deleteExperience);

export default r;
