import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
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
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshAccessToken = async () => {
    try {
        const response = await apiClient.post('/auth/refresh-token');
        const newAccessToken = response.data.data.accessToken;
        Cookies.set('accessToken', newAccessToken);
        if (!newAccessToken) {
            throw new Error('Invalid token');
        }
        return newAccessToken;
    } catch (error) {
        signOut();
        throw error;
    }
};
// response interceptor for unauthorized requests
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const byPassUrls = [
            '/auth/login',
            '/auth/refresh-token',
            '/auth/signup',
            '/auth/logout',
            '/auth/logout-all',
            //add more urls to bypass here
        ];
        if (!error.config || !error.config.url) {
            throw error;
        }
        const accessToken = Cookies.get('accessToken');
        if (byPassUrls.includes(error.config.url) || !accessToken) {
            throw error;
        }
        if (error.response && error.response.status >= 401) {
            const newAccessToken: string = await refreshAccessToken();
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        }
        throw error;
    }
);
