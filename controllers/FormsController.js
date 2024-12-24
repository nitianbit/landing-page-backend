import Forms from '../models/FormModal.js'
import mongoose from 'mongoose';
import { pagination, sendResponse } from '../utils/helper.js';
export const addFOrmHelper = async ({ title,type, fields, project = "", requiredFields = [], showOTP = false }) => {
    try {
        const formattedFields = fields.map(fieldId => new mongoose.Types.ObjectId(fieldId));
        const formattedRequiredFields = requiredFields.map(fieldId => new mongoose.Types.ObjectId(fieldId));

        // Create a new form
        const form = new Forms({
            title,
            type,
            fields: formattedFields,
            requiredFields: formattedRequiredFields,
            project: new mongoose.Types.ObjectId(project),
            showOTP
        });
        await form.save();

        return form;
    } catch (error) {
        throw new Error(error.message);;
    }
}
export const addForm = async (req, res) => {
    const { title, fields, project, formIndex, requiredFields, showOTP = false, type } = req.body;

    try {
        const form = await addFOrmHelper({ title, fields,type, project, formIndex, requiredFields, showOTP })
        return sendResponse(res, 200, "Form Create Successfully", form)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};


export const getAllForms = async (req, res) => {
    try {
        const forms =  Forms.find().populate('fields');
        const {page=1, rows=10} = req.body;
        const response = await pagination(Forms, forms, Number(page), Number(rows))
        return sendResponse(res, 200, "", response)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
}


export const getForm = async (req, res) => {
    const { id, projectId, type } = req.query;
    const filter = {
        ...(id && { _id: id }),
        ...(projectId && { project: projectId }),
        ...(type&&{type:{$in:type.includes("in")?type.substring(3,type.length-1).split(","):[type]}}),
    };
    try {
        const form = await Forms.find(filter).populate("fields");
        if (!form) {
             return sendResponse(res, 404, "Form not found")
        }
         return sendResponse(res, 200, "", form)
    } catch (error) {
         return sendResponse(res, 500, error)
    }
};
export const editForm = async (req, res) => {
    const { id } = req.params;
    const { title, fields, showOTP = false, requiredFields = [], utmParameters } = req.body;

    // Map fields to an array of ObjectIds
    const formattedFields = fields?.map(field => new mongoose.Types.ObjectId(field?._id));

    try {
        const form = await Forms.findByIdAndUpdate(
            id,
            { title, fields: formattedFields, showOTP, requiredFields, utmParameters },
            { new: true }
        ).populate('fields');

        if (!form) {
            return sendResponse(res, 404, "Form not found")
        }
        return sendResponse(res, 200, "Form Updated Successfully", form)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};
export const deleteForm = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return sendResponse(res, 404, "Form id not found")
    }
    try {
        const form = await Forms.findByIdAndDelete(id);
        if (!form) {
            return sendResponse(res, 404, "Form not found", form)
        }
        return sendResponse(res, 200, "Form Deleted Successfully", form)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};
