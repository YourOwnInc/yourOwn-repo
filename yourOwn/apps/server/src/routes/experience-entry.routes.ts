import {Router} from 'express';
import * as EC from "../controller/experience-entry.controller"

const entryRouter = Router();

entryRouter.get('/:id', EC.getExperienceEntry)
entryRouter.patch('/:id', EC.saveExperienceEntry)
entryRouter.delete('/:id', EC.deleteExperienceEntry)

export default entryRouter;