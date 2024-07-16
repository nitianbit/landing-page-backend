import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
    label: String,
    type: String,
    options: [String],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

const Field = mongoose.model('Field', fieldSchema);

export default Field
