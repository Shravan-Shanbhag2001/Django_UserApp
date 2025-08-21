import axios from "axios";

const API = axios.create({
  baseURL: "https://django-userapp.onrender.com", // Django Render URL
  withCredentials: true,
});

export default API;
