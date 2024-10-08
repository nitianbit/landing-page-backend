// models/FormValue.js

import mongoose from "mongoose";

const formValueSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    values: [
        {
            fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
            value: { type: mongoose.Schema.Types.Mixed, required: true }
        }
    ],
    utmParameters: { type: Map, of: String },
    ipAddress: { type: String },
    isOTPValidate: { type: Boolean, default: false },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    refererId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    submittedAt: { type: Date, default: Date.now }
});

const FormValue = mongoose.model('FormValue', formValueSchema);
export default FormValue
