// routes/formValueRoutes.js

const express = require('express');
const router = express.Router();
const FormValue = require('../models/FormValueModal.js');
const Form = require('../models/FormModal.js');

// Create form values
router.post('/', async (req, res) => {
    try {
        const { formId, values } = req.body;

        // Ensure the form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ success: false, error: 'Form not found' });
        }

        // Create form values
        const formValue = await FormValue.create({ formId, values });
        res.json({ success: true, formValueId: formValue._id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Get all form values
router.get('/', async (req, res) => {
    try {
        const formValues = await FormValue.find().populate('formId').populate('values.fieldId');
        res.json(formValues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update form values
router.put('/:formValueId', async (req, res) => {
    try {
        const { values } = req.body;

        // Update form values
        await FormValue.findByIdAndUpdate(req.params.formValueId, { values });
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


// Get form values by ID
router.get('/:formValueId', async (req, res) => {
    try {
        const formValue = await FormValue.findById(req.params.formValueId).populate('formId').populate('values.fieldId');
        if (!formValue) {
            return res.status(404).json({ error: 'Form values not found' });
        }
        res.json(formValue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete form values
router.delete('/:formValueId', async (req, res) => {
    try {
        await FormValue.findByIdAndDelete(req.params.formValueId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
