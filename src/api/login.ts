import axios from 'axios';
import { cookies } from 'next/headers';
export const loginServerClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await loginServerClient.post('/login', credentials);
    const cookiesStore = await cookies();
    const user = response.data.data.user;
    cookiesStore.set('accessToken', user.accessToken, {
        secure: process.env.NODE_ENV === 'production',
    });
    cookiesStore.set('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    return user;
};
