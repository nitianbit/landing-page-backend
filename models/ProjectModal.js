import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    domain: { type: String, unique: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
