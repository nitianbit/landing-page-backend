import express from 'express';
import Project from '../models/ProjectModal.js';
const router = express.Router();


export const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        const project = new Project({ name });
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getAllProject = async (req, res) => {
    try {
        const projects = await Project.find();
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

export const updateProject = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send();
        }

        updates.forEach(update => project[update] = req.body[update]);
        await project.save();
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


export default router;
