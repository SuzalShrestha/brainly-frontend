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
            cookies().delete('token');
        },
    },
    session: {
        strategy: 'jwt',
    },
});
