// routes/experience-entry.routes.ts
import { Router } from "express";
import * as ctrl from '../controller/export.controller'

const r = Router();

r.post("/", ctrl.zipTemplate)
export default r;