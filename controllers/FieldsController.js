import Fields from '../models/FieldModal.js'
import { pagination, sendResponse } from '../utils/helper.js';


export const addFields = async (req, res) => {
    const { label,name, type, options } = req.body;
    const user = req.user;
    const field = new Fields({ label,name, type, options: options || [], companyId: user.adminOf });

    try {
        await field.save();
        return sendResponse(res, 200, "Field Created Successfully", field)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};

export const getFields = async (req, res) => {
    try {
        const user = req.user;
        const filters = { companyId: req.user.adminOf };
        const {page=1, rows=10} = req.query;
        const fields =  Fields.find(filters);
        const response = await pagination(Fields, fields, Number(page), Number(rows), filters)
        return sendResponse(res, 200, "", response)
    } catch (error) {
        console.log(error)
        return sendResponse(res, 500, error)
    }
}

export const getFieldById = async (req, res) => {
    const { id } = req.query;
    try {
        const field = await Fields.findById(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        return sendResponse(res, 200, "", field)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};


export const editField = async (req, res) => {
    const { id } = req.params;
    const { label,name, type, options } = req.body;

    try {
        const field = await Fields.findByIdAndUpdate(id, { label,name, type, options: options || [] }, { new: true });
        if (!field) {
            return sendResponse(res, 404, "Field not found")
        }
        return sendResponse(res, 200, "Form Updated Successfully", field)
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};


export const deleteField = async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Fields.findByIdAndDelete(id);
        if (!field) {
            return sendResponse(res, 404, "Field not found")
        }
        return sendResponse(res, 200, "Form Deleted Successfully")
    } catch (error) {
        return sendResponse(res, 500, error)
    }
};
