// routes/layout.routes.ts
import { Router } from "express";
import { resolveCtx } from "../middleware/ctx";
import * as ctrl from "../controller/layout.controller";

const r = Router();

r.get("/", resolveCtx, ctrl.getLayout);
r.put("/assign", resolveCtx, ctrl.assign);

export default r;
