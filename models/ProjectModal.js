import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    domain: String
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
