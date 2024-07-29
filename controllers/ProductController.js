import Project from '../models/ProjectModal.js';
import Product from '../models/productModel.js';

// Create a product
export const createProduct = async (req, res) => {
    try {
        const { name, description = "", projectId } = req.body;
        const user = req.user;
        const product = new Project({ name, description, companyId: user.adminOf, parent: projectId });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
export const getProductsByProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ProjectId is required' });
        }

        const products = await Project.find({ parent: id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        // const product = await Project.findById(req.params.productId).populate("forms")
        const product = await Project.findById(req.params.productId)
            .populate({
                path: 'forms',
                populate: {
                    path: 'fields'
                }
            });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { name, description, useParentForms = true, forms = [] } = req.body;
        const product = await Project.findByIdAndUpdate(
            req.params.productId,
            { name, description, forms },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Project.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
