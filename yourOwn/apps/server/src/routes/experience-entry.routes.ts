import {Router} from 'express';
import * as EC from "../controller/experience-entry.controller"

const router = Router();

router.get('/:id', EC.getExperienceEntry)
router.patch('/:id', EC.saveExperienceEntry)
router.delete('/:id', EC.deleteExperienceEntry)

export default router;