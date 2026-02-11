import { Router } from 'express';
import * as SC from "../controller/session.controller";
import { migrateSession } from "../controller/migration.controller";
import * as EC from "../controller/experience-entry.controller"
import { requireAuth } from "../middleware/auth"
import * as LC from "../controller/layout.controller"
import { lchown } from 'node:fs';


const router = Router();

router.post('/start', SC.startSession)
router.post('/migrate', migrateSession)
router.get('/:id', SC.getSession)
router.get('/', SC.getAllSessions)

router.post("/:sessionId/experiences", requireAuth, EC.createExperience);
router.get("/:sessionId/experiences", requireAuth, EC.listExperiences);
router.get("/:sessionId/experiences/:id", requireAuth, EC.getExperience);
router.put("/:sessionId/experiences/:id", requireAuth, EC.updateExperience);
router.patch("/:sessionId/experiences/:id", requireAuth, EC.updateExperience);
router.delete("/:sessionId/experiences/:id", requireAuth, EC.deleteExperience);

router.get("/:sessionId/manifest", requireAuth, LC.getPreviewManifest);
router.post("/:sessionId/layouts", requireAuth, LC.createNewTab)

// these might be the same things
// Might take one out. you have to have a userId to save a session.
router.put('/save/:id/claim', SC.claim)

export default router;