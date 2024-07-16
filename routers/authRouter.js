import { Router } from "express";
import { register, login, getCurrentProfile } from '../controllers/AuthController.js'
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getCurrentProfile)
export default router;