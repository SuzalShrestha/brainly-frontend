import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { cookies } from 'next/headers';
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    events: {
        signOut: async () => {
            //remove cookies from the browser
            cookies().delete('accessToken');
            cookies().delete('refreshToken');
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
});
