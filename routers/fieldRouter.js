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

router.get("/field/grid", verifyToken, isValidAdmin, getFields);
router.post("/field/create", verifyToken, isValidAdmin, addFields)
router.get('/field/detail', verifyToken, isValidAdmin, getFieldById);
router.put('/field/update/:id', verifyToken, isValidAdmin, editField);
router.delete('/field/delete/:id', verifyToken, isValidAdmin, deleteField);

export default router;
