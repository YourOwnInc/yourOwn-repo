// routes/layout.routes.ts
import { Router } from "express";

import { requireAuth} from  "../middleware/auth"
import * as ctrl from "../controller/layout.controller";

const r = Router();
r.post("/newTab", requireAuth,ctrl.createNewTab );
r.get("/hydrate/:layoutName",requireAuth, ctrl.getHydratedPage );
r.put("/:layoutId/sync", requireAuth,  ctrl.sync);

export default r;
