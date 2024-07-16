import { Router } from "express";
const router = Router();

import {
    createProject,
    getProjectById,
    getAllProject,
    updateProject,
    deleteProjectById,
    getProjectByDomain
} from "../controllers/ProjectController.js";
import { verifyToken, isValidAdmin } from "../middleware/authMiddleware.js";

router.get("/getProjects", verifyToken, isValidAdmin, getAllProject);
router.post("/addProject", verifyToken, isValidAdmin, createProject);
router.get('/project/:id', getProjectById);
router.get('/projectDomain', getProjectByDomain);
router.delete('/project/:id', verifyToken, isValidAdmin, deleteProjectById);
router.put('/project/:id', verifyToken, isValidAdmin, updateProject);

export default router;
