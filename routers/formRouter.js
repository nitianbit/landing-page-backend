import { Router } from "express";
const router = Router();

import {
    addForm,
    getForm,
    editForm,
    getFormById
} from "../controllers/FormsController.js";

router.get("/getForm", getForm);
router.post("/addForm", addForm);
router.get('/Forms/:id', getFormById);
router.put('/Forms/:id', editForm);

export default router;
