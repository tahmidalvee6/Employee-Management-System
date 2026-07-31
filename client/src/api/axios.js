import axios from "axios";
const api = axios.create({
    baseURL: (import.meta.env.VITE_BASE_URL || "https://employee-management-system-0gu1.onrender.com") + "/api",
    });

    // attach the token to every request if it exists
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

export default api;
