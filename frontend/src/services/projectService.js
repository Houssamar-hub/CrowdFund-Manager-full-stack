import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/projects";

const getMyProjects = async () => {
  const response = await axios.get(`${API_URL}/mine`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};

const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/${id}`, projectData);
  return response.data;
};

const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const closeProject = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/close`, {});
  return response.data;
};

const projectService = {
  getMyProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  closeProject,
};

export default projectService;
