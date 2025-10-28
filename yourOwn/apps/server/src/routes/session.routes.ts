import {Router} from 'express';
import * as SC from "../controller/session.controller";
import * as EC from "../controller/experience-entry.controller"

const router = Router();

router.post('/start',SC.startSession)
router.get('/:id', SC.getSession)
router.get('/:id/entries', EC.getExperienceEntries)
router.post('/:id/entries', EC.addExperienceEntry)
// these might be the same things
// Might take one out. you have to have a userId to save a session.
router.put('/save/:id', SC.saveSession)
router.post('/link/:userId', SC.linkSessionToUser)

export default router;