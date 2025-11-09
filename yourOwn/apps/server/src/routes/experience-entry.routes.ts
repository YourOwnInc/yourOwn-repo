// routes/experience-entry.routes.ts
import { Router } from "express";
import { resolveCtx } from "../middleware/ctx";
import * as ctrl from "../controller/experience-entry.controller";

const r = Router();

r.post("/experiences", resolveCtx, ctrl.create);
r.get("/experiences", resolveCtx, ctrl.list);
r.get("/experiences/:id", resolveCtx, ctrl.getOne);
r.put("/experiences/:id", resolveCtx, ctrl.update);
r.patch("/experiences/:id", resolveCtx, ctrl.update);
r.delete("/experiences/:id", resolveCtx, ctrl.remove);

export default r;
