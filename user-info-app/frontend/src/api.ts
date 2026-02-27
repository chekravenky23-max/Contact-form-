import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // adjust this for production as needed
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
