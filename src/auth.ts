import NextAuth from 'next-auth';
import authConfig from './auth.config';
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            console.log(token);
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.accessToken = token.accessToken;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
});
