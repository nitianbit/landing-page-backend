import { Router } from "express";
const router = Router();

import {
    addFields,
    getFields,
    getFieldById,
    editField,
    deleteField
} from "../controllers/FieldsController.js";

router.get("/getFields", getFields);
router.post("/addField", addFields)
router.get('/field/:id', getFieldById);
router.put('/field/:id', editField);
router.delete('/field/:id', deleteField);

export default router;
