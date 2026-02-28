import axios from 'axios';

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_BACKEND_URL;
    if (!envUrl) return 'http://localhost:5000/api';
    return envUrl.endsWith('/') ? `${envUrl}api` : `${envUrl}/api`;
};

const api = axios.create({
    baseURL: getBaseUrl(), // adjust this for production as needed
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
