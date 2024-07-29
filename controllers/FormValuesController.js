// routes/formValueRoutes.js

import FormValue from '../models/FormValueModal.js'
import Form from '../models/FormModal.js'
import { sendOtp, verifyOtp } from '../utils/helper.js';

// Create form values
export const createFormValues = async (req, res) => {
    try {
        const { formId, values, projectId,refererId=null, utmParameters, phone } = req.body;

        // Ensure the form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ success: false, error: 'Form not found' });
        }

        //TODO
        // if (form.showOTP && !phone) {
        //     return res.status(400).json({ success: false, error: 'Please provide phone number' });
        // }

        if (form?.showOTP && phone) {
            const otpResponse = await sendOtp(phone);
            if (otpResponse?.result !== 'success') {
                return res.status(400).json({ success: false, error: 'Failed to send OTP' });
            }
        }


        const formValue = await FormValue.create({ formId, values, projectId, utmParameters, ipAddress: req?.clientIp ,...(refererId && { refererId }) });
        res.json({ success: true, formValueId: formValue._id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const verifyOtpForFormValues = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        // Verify OTP
        const otpVerification = await verifyOtp(phone, otp);

        if (otpVerification?.result !== 'success') {
            return res.status(400).json({ success: false, error: 'OTP verification failed' });
        }

        // Continue with your logic here after OTP verification (e.g., update form values, etc.)
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getProjectFormValues = async (req, res) => {
    try {
        const { projectId, formId, } = req?.params;
        const {refererId=""}=req.query;
        const response = await FormValue?.find({
            projectId,
            formId,
            ...(refererId && { refererId: { $in: [refererId] } })
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

