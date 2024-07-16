import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    domain: String,
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
