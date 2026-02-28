import axios from "axios";

const API = axios.create({
  baseURL: "https://creditnest.onrender.com", // deployed backend
  headers: { "Content-Type": "application/json" },
});

// Optional: log every request (debugging)
API.interceptors.request.use(
  (config) => {
    console.log("Sending request:", config.method, config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;