import { Router } from "express";
const router = Router();

import {
    createProduct,
    getProductsByProject,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/ProductController.js'
import { verifyToken, isValidAdmin } from "../middleware/authMiddleware.js";

router.post('/addProduct', verifyToken, isValidAdmin, createProduct);
router.get('/getProductsByProject/:id', getProductsByProject);
router.get('/product/:productId', getProductById);
router.put('/product/:productId', verifyToken, isValidAdmin, updateProduct);
router.delete('/product/:productId', verifyToken, isValidAdmin, deleteProduct);

export default router;
