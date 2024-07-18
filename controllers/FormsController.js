import Forms from '../models/FormModal.js'
import mongoose from 'mongoose';
export const addFOrmHelper = async (title, fields, project) => {
    try {
        const formattedFields = fields.map(field => ({
            field: field._id,
            required: field.required
        }));
        const form = new Forms({ title, fields: formattedFields, project: new mongoose.Types.ObjectId(project) });
        await form.save();
        return form;
    } catch (error) {

    }
}
export const addForm = async (req, res) => {
    const { title, fields, project } = req.body;

    // Map fields to an array of ObjectIds
    // const formattedFields = fields.map(field => new mongoose.Types.ObjectId(field));
    // const formattedFields = fields.map(field => ({
    //     field: field._id,
    //     required: field.required
    // }));

    // const form = new Forms({ title, fields: formattedFields, project: new mongoose.Types.ObjectId(project) });

    try {
        // await form.save();
        const form = await addFOrmHelper(title, fields, project)
        res.status(201).send(form);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getForm = async (req, res) => {
    try {
        const forms = await Forms.find().populate('fields.field');
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getFormProject = async (req, res) => {
    try {
        const forms = await Forms.find({ project: req.params.projectId }).populate('fields.field');
        console.log('Fetched forms with populated fields:', JSON.stringify(forms, null, 2));
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send(error);
    }
}




export const getFormById = async (req, res) => {
    const { id } = req.params;
    try {
        const form = await Forms.findById(id).populate('fields.field');
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
    const { title, fields, showOTP = false } = req.body;

    // Map fields to an array of ObjectIds
    // const formattedFields = fields?.map(field => new mongoose.Types.ObjectId(field));
    const formattedFields = fields?.map(field => ({
        fields: new mongoose.Types.ObjectId(field._id),
        required: field.required
    }));

    try {
        const form = await Forms.findByIdAndUpdate(
            id,
            { title, fields: formattedFields, showOTP },
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