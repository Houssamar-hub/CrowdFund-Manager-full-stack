<<<<<<< HEAD
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
=======
// import api from "./api";

// const projectService = {
//     getAllProjects: async () => {
//         const response = await api.get("/projects");
//         return response.data;
//     },

//     getProjectById: async (id) => {
//         const response = await api.get(`/projects/${id}`);
//         return response.data;
//     },

//     createProject: async (projectData) => {
//         const response = await api.post("/projects", projectData);
//         return response.data;
//     },


// };
>>>>>>> f007301275f37080fbfbd8fc8073737b29d81c58
