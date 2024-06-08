import { Router } from "express";
const router = Router();

import {
    createProject,
    getProjectById,
    getAllProject,
    updateProject,
    deleteProjectById
} from "../controllers/ProjectController.js";

router.get("/getProjects", getAllProject);
router.post("/addProject", createProject);
router.get('/project/:id', getProjectById);
router.delete('/project/:id', deleteProjectById);
router.put('/project/:id', updateProject);

export default router;
