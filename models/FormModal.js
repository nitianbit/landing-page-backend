import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    title: String,
    fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }],
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    showOTP: { type: Boolean, default: false }
});

const Form = mongoose.model('Form', formSchema);

export default Form;
