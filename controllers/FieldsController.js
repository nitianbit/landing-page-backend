import Fields from '../models/FieldModal.js'


export const addFields = async (req, res) => {
    const { label,name, type, options } = req.body;
    const user = req.user;
    const field = new Fields({ label,name, type, options: options || [], companyId: user.adminOf });

    try {
        await field.save();
        res.status(201).send(field);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getFields = async (req, res) => {
    try {
        const user = req.user;
        const fields = await Fields.find({ companyId: req.user.adminOf });
        res.status(200).send(fields);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export const getFieldById = async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Fields.findById(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const editField = async (req, res) => {
    const { id } = req.params;
    const { label,name, type, options } = req.body;

    try {
        const field = await Fields.findByIdAndUpdate(id, { label,name, type, options: options || [] }, { new: true });
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        res.status(400).send(error);
    }
};


export const deleteField = async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Fields.findByIdAndDelete(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send({ message: 'Field deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
