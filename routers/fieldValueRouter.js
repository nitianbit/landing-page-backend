import { Router } from "express";
const router = Router();

import { fetchIPAddress } from '../middleware/IPAddressMiddleware.js'

import {
    createFormValues,
    deleteFormValue,
    getAllFormValue,
    getFormValueId,
    updateFormValue,
    getProjectFormValues,
    verifyOtpForFormValues,
    sendOTP
} from "../controllers/FormValuesController.js";
import { isValidAdmin, verifyToken } from "../middleware/authMiddleware.js";

router.get("/getFormValues", verifyToken, isValidAdmin, getProjectFormValues);
router.post("/addFormValue", fetchIPAddress, createFormValues);
router.post("/verifyOtp", verifyOtpForFormValues);
router.post("/sendOTP", sendOTP);
router.get("/getProjectFormValues/:projectId/:formId", verifyToken, isValidAdmin, getAllFormValue)
router.get('/formsValue/:id', verifyToken, isValidAdmin, getFormValueId);
router.delete('/deleteFormValue', verifyToken, isValidAdmin, deleteFormValue);
router.put('/updateFormValue/:id', verifyToken, isValidAdmin, updateFormValue);

export default router;
