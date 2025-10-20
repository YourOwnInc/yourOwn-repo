import * as UC from "../controller/user.controller";
import { Router } from "express";
const router = Router();

//import { requireAuth } from "../middleware/";
// Where we will import controller functions for user routes
// follow this pattern for rest of objects 
router.post("/register", UC.register);
router.post("/login", UC.login);
router.get("/me",  UC.me);

export default router;
