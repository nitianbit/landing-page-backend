import { Router } from "express";
const router = Router();

import {
    addForm,
    getForm,
    editForm,
    getFormById,
    getFormProject
} from "../controllers/FormsController.js";

router.get("/getForms", getForm);
router.post("/addForm", addForm);
router.get('/form/:id', getFormById);
router.get('/project/:projectId/forms', getFormProject);
router.put('/form/:id', editForm);

export default router;
