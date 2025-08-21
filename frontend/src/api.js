import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend.onrender.com", // Django Render URL
});

export default API;
