<<<<<<< HEAD
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;
=======
import Projects from "../UI/pages/Projects";
import api from "./api";

const authService = {
    register: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get("/auth/me");
        return response.data;
    },

    logout : async()=>{
        const  response = await api.post('/auth/logout')
    }

};

export default authService
>>>>>>> f007301275f37080fbfbd8fc8073737b29d81c58
