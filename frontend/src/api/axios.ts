import axios, { type AxiosError } from 'axios';

const API_URL = '/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
