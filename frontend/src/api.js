import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // change to Render backend URL later
  withCredentials: true, // allow session cookies
});

export default api;
