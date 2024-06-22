import { Router } from "express";
const router = Router();

import { fetchIPAddress } from '../middleware/IPAddressMiddleware.js'

import {
    createFormValues,
    deleteFormValue,
    getAllFormValue,
    getFormValueId,
    updateFormValue,
    getProjectFormValues
} from "../controllers/FormValuesController.js";

router.get("/getFormValues/:projectId/:formId", getProjectFormValues);
router.post("/addFormValue", fetchIPAddress, createFormValues);
router.get("/getProjectFormValues/:projectId/:formId", getAllFormValue)
router.get('/formsValue/:id', getFormValueId);
router.delete('/deleteFormValue', deleteFormValue);
router.put('/updateFormValue/:id', updateFormValue);

export default router;
