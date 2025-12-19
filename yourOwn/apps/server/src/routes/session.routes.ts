import {Router} from 'express';
import * as SC from "../controller/session.controller";
import * as EC from "../controller/experience-entry.controller"
import { requireAuth} from  "../middleware/auth"


const router = Router();

router.post('/start',SC.startSession)
router.get('/:id', SC.getSession)
router.get('/',SC.getAllSessions)

router.post("/:sessionId/experiences", requireAuth, EC.createExperience);
router.get("/:sessionId/experiences", requireAuth, EC.listExperiences);
router.get("/:sessionId/experiences/:id", requireAuth, EC.getExperience);
router.put("/:sessionId/experiences/:id", requireAuth, EC.updateExperience);
router.patch("/:sessionId/experiences/:id", requireAuth, EC.updateExperience);
router.delete("/:sessionId/experiences/:id", requireAuth, EC.deleteExperience);

// these might be the same things
// Might take one out. you have to have a userId to save a session.
router.put('/save/:id/claim', SC.claim)

export default router;