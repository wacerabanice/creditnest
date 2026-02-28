import axios from "axios";

const API = axios.create({
  baseURL: "https://creditnest.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default API;