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
