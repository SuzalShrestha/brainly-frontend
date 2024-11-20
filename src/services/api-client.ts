import axios from 'axios';
const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
export const apiClient = axios.create({
    baseURL: baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;

        return Promise.reject(message);
    }
);
