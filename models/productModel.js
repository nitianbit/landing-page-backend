import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
