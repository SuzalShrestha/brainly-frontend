import NextAuth from 'next-auth';
import authConfig from './auth.config';
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
    },
});
