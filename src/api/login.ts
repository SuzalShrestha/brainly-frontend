import axios from 'axios';
import { cookies } from 'next/headers';
export const loginServerClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
export const login = async (credentials) => {
    const response = loginServerClient.post('/login', credentials);
    const cookiesStore = await cookies();
    response.then((res) => {
        cookiesStore.set('accessToken', res.data.data.user.accessToken, {
            secure: process.env.NODE_ENV === 'production',
        });
        cookiesStore.set('refreshToken', res.data.data.user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    });
    return response;
};
