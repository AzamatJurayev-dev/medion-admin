import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default request;
