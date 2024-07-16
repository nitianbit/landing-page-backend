import { Router } from "express";
const router = Router();

import {
    addForm,
    getForm,
    editForm,
    getFormById,
    getFormProject
} from "../controllers/FormsController.js";
import { isValidAdmin, verifyToken } from "../middleware/authMiddleware.js";

router.get("/getForms", getForm);
router.post("/addForm", verifyToken, isValidAdmin, addForm);
router.get('/form/:id', getFormById);
router.get('/project/:projectId/forms', getFormProject);
router.put('/form/:id', verifyToken, isValidAdmin, editForm);

export default router;
