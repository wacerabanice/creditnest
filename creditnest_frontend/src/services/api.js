import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000/api", // backend baseURL
  //baseURL: "https://https://creditnest.onrender.com/api"
  baseURL: process.env.REACT_APP_API_URL,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;