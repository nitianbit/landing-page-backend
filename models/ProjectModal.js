import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    domain: { type: String},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],//childforms
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
