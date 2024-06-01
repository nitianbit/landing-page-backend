// models/FormValue.js

const mongoose = require('mongoose');

const formValueSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    values: [
        {
            fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
            value: { type: mongoose.Schema.Types.Mixed, required: true }
        }
    ],
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormValue', formValueSchema);
