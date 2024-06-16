import { Router } from "express";
const router = Router();

import {
    createFormValues,
    deleteFormValue,
    getAllFormValue,
    getFormValueId,
    updateFormValue
} from "../controllers/FormValuesController.js";

router.get("/getFormValues", getAllFormValue);
router.post("/addFormValue", createFormValues);
router.get('/formsValue/:id', getFormValueId);
router.delete('/deleteFormValue', deleteFormValue);
router.put('/updateFormValue/:id', updateFormValue);

export default router;
