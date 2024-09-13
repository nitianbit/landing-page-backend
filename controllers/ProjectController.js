import mongoose from 'mongoose';
import Project from '../models/ProjectModal.js';
import { addFOrmHelper } from './FormsController.js';

export const createProject = async (req, res) => {
    try {
        const { name, domain, description = "" } = req.body;
        const user = req.user;
        const project = await new Project({ name, domain, description, companyId: user.adminOf }).save();

        // await addFOrmHelper({ title: "FollowUp Form",type:"Form", fields: [], project: project?._id })
        await addFOrmHelper({ title: "Contact Us Form", type:"contact",fields: [], project: project?._id })
        await addFOrmHelper({ title: "Client Form",type:"client", fields: [], project: project?._id })

        // await addFOrmHelper("", [], new mongoose.Types.ObjectId(project?._id), 2)

        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getAllProject = async (req, res) => {
    try {
        const user = req.user;
        const projects = await Project.find({ companyId: user.adminOf, parent: null });
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send();
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getProjectByDomain = async (req, res) => {
    try {
        const project = await Project.findOne({ domain: req.query?.domain });
        if (!project) {
            return res.status(404).send();
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateProject = async (req, res) => {
    const { id } = req?.params;
    const updates = req?.body
    try {
        if (!id || !updates) {
            return res.status(400).send({
                message: " project Id or updates data must be provided"
            })
        }
        const project = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).send({ message: "project not found" });
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const deleteProjectById = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send();
        }
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send(error);
    }
}
