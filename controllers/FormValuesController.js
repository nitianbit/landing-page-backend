// routes/formValueRoutes.js

import FormValue from '../models/FormValueModal.js'
import Form from '../models/FormModal.js'

// Create form values
export const createFormValues = async (req, res) => {
    try {
        const { formId, values, projectId } = req.body;

        // Ensure the form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ success: false, error: 'Form not found' });
        }

        // Create form values
        const formValue = await FormValue.create({ formId, values, projectId });
        res.json({ success: true, formValueId: formValue._id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

export const getProjectFormValues = async (req, res) => {
    try {
        const { projectId, formId } = req?.params;
        const response = await FormValue?.find({
            projectId,
            formId
        })
        return res.status(200).send(response)
    } catch (error) {

    }
}

// Get all form values
export const getAllFormValue = async (req, res) => {
    try {
        const formValues = await FormValue.find().populate('formId').populate('values.fieldId');
        res.json(formValues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Update form values
export const updateFormValue = async (req, res) => {
    try {
        const { values } = req.body;

        // Update form values
        await FormValue.findByIdAndUpdate(req.params.formValueId, { values });
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}


// Get form values by ID
export const getFormValueId = async (req, res) => {
    try {
        const formValue = await FormValue.findById(req.params.formValueId).populate('formId').populate('values.fieldId');
        if (!formValue) {
            return res.status(404).json({ error: 'Form values not found' });
        }
        res.json(formValue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete form values
export const deleteFormValue = async (req, res) => {
    try {
        await FormValue.findByIdAndDelete(req.params.formValueId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

