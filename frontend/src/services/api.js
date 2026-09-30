import axios from "axios"

const api = axios.create({
    baseURL: "https://taskflow-s8ld.onrender.com/api",
    withCredentials: true
});

export default api;