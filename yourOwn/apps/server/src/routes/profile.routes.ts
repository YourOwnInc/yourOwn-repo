import { Router } from "express";
import { requireAuth } from "../middleware/auth";
// controller
import * as PC from "../controller/profile.controller"

const router = Router();

router.get("/",requireAuth,  PC.fetchProfile);

router.post("/:profileId", PC.handleProfileUpdate);

