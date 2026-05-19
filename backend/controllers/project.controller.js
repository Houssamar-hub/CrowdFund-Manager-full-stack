import { Project } from "../models/project.model.js";
import { Investment } from "../models/investment.model.js";

export const createProject = async (req, res) => {
  const { title, description, capital, maxInvestmentPercent } = req.body;
  const project = await Project.create({
    title,
    description,
    capital,
    owner: req.user._id,
    maxInvestmentPercent,
  });
  res.status(201).json(project);
};

export const getMyProjects = async (req, res) => {
  console.log(req.name);
  const projects = await Project.find({ owner: req.user._id }).populate({
    path: "investments",
    populate: { path: "investorId", select: "name" },
  });
  res.json(projects);
};

export const getOpenProjects = async (req, res) => {
  const projects = await Project.find({ status: "open" });
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate({
    path: "investments",
    populate: { path: "investorId", select: "name" },
  });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.json(project);
};

export const updateProject = async (req, res) => {
  const { title, description, capital, maxInvestmentPercent } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (project.status === "closed") {
    return res.status(400).json({ message: "Cannot update a closed project" });
  }

  project.title = title || project.title;
  project.description = description || project.description;
  project.capital = capital || project.capital;
  project.maxInvestmentPercent =
    maxInvestmentPercent || project.maxInvestmentPercent;

  await project.save();
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await project.deleteOne();
  res.json({ message: "Project removed" });
};

export const closeProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  project.status = "closed";
  await project.save();
  res.json(project);
};
