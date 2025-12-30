// routes/experience-entry.routes.ts
import { Router } from "express";
import * as ctrl from '../controller/export.controller'

const r = Router();

r.post('', ctrl.startExportJob);
r.get('/:exportId', ctrl.getExportStatus);
r.get('/:exportId/download', ctrl.downloadExport);

export default r;