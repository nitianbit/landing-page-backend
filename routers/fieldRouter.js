import { Router } from "express";
const router = Router();

import {
    addFields,
    getFields,
    getFieldById,
    editField,
    deleteField
} from "../controllers/FieldsController.js";
import { isValidAdmin, verifyToken } from "../middleware/authMiddleware.js";

router.get("/getFields", verifyToken, isValidAdmin, getFields);
router.post("/addField", verifyToken, isValidAdmin, addFields)
router.get('/field/:id', verifyToken, isValidAdmin, getFieldById);
router.put('/field/:id', verifyToken, isValidAdmin, editField);
router.delete('/field/:id', verifyToken, isValidAdmin, deleteField);

export default router;
