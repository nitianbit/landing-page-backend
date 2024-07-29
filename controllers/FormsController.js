import Forms from '../models/FormModal.js'
import mongoose from 'mongoose';
export const addFOrmHelper = async ({ title, fields, project = "", formIndex, requiredFields = [], showOTP = false }) => {
    try {
        const formattedFields = fields.map(fieldId => new mongoose.Types.ObjectId(fieldId));
        const formattedRequiredFields = requiredFields.map(fieldId => new mongoose.Types.ObjectId(fieldId));

        // Create a new form
        const form = new Forms({
            title,
            fields: formattedFields,
            requiredFields: formattedRequiredFields,
            project: new mongoose.Types.ObjectId(project),
            formIndex,
            showOTP
        });
        await form.save();

        return form;
    } catch (error) {
        throw new Error(error.message);;
    }
}
export const addForm = async (req, res) => {
    const { title, fields, project, formIndex, requiredFields, showOTP = false } = req.body;

    try {
        const form = await addFOrmHelper({ title, fields, project, formIndex, requiredFields, showOTP })
        res.status(201).send(form);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getForm = async (req, res) => {
    try {
        const forms = await Forms.find().populate('fields');
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getFormProject = async (req, res) => {
    try {
        const forms = await Forms.find({ project: req.params.projectId }).populate('fields');
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}




export const getFormById = async (req, res) => {
    const { id } = req.params;
    try {
        const form = await Forms.findById(id).populate('fields');
        if (!form) {
            return res.status(404).send({ message: 'Form not found' });
        }
        res.status(200).send(form);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const editForm = async (req, res) => {
    const { id } = req.params;
    const { title, fields, showOTP = false, requiredFields = [] } = req.body;

    // Map fields to an array of ObjectIds
    const formattedFields = fields?.map(field => new mongoose.Types.ObjectId(field));

    try {
        const form = await Forms.findByIdAndUpdate(
            id,
            { title, fields: formattedFields, showOTP, requiredFields },
            { new: true }
        ).populate('fields');

        if (!form) {
            return res.status(404).send({ message: 'Form not found' });
        }

        res.status(200).send(form);
    } catch (error) {
        res.status(400).send(error);
    }
};