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
