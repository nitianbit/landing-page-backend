import { Router } from "express"; 
import { downloadFile } from "../controllers/FileController.js";
const router = Router();

router.get("/file/download", downloadFile);
export default router;
