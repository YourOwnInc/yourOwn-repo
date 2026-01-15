import { Router } from "express";
import { requireAuth } from "../middleware/auth";
// controller
import * as PC from "../controller/profile.controller"

const router = Router();

router.get("/:profileId",requireAuth,  PC.handleGetProfileDetail);
router.get("",requireAuth,  PC.handleGetSummaries);


router.post("/:profileId", PC.handleProfileUpdate);
