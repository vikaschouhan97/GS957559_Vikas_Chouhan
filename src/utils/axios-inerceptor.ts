import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // api base url
    timeout: 5000, // Set timeout
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use((config) => {
    // Modify headers or add tokens here
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle 401 errors
api.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        const currentPage = window.location.pathname;
        if (currentPage.startsWith("/dashboard")) {
            // clear data from persist
            localStorage.clear();
            // Redirect to login page
            window.location.href = "/";
        }
    }
    return Promise.reject(error);
});

export default api;
