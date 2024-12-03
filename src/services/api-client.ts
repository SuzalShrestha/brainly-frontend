import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const apiClient = axios.create({
    baseURL: baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.token) {
            config.headers['Authorization'] = `Bearer ${session.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(message);
    }
);
