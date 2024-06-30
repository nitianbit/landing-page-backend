import { Router } from "express";
const router = Router();
import { getCurrentUser } from "../controllers/UserController.js";

router.get("/getCurrentUser", getCurrentUser);

export default router;