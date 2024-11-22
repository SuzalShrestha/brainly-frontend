import NextAuth from 'next-auth';
import authConfig from './auth.config';
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    events: {},
    callbacks: {
        async session({ session }) {
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
    adapter: {},
    session: {
        strategy: 'jwt',
    },
});
