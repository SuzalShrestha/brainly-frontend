import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from './api/login';

export default {
    providers: [
        Credentials({
            credentials: {
                email: { type: 'text', placeholder: '' },
                password: { type: 'password', placeholder: '' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await login({
                        email: credentials.email as string,
                        password: credentials.password as string,
                    });
                    if (!user || !user.accessToken) {
                        return null;
                    }
                    return user;
                } catch {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // When user signs in, add token to JWT
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add token to session
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    trustHost: true,
} satisfies NextAuthConfig;
