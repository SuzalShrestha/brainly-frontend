import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials.email || !credentials.password) {
                        throw new Error(
                            'Please enter a valid email and password'
                        );
                    }

                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    );
                    const user = await response.data.data.user;
                    if (!user || !user.token) {
                        throw new Error('Invalid credentials');
                    }
                    return user;
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // When user signs in, add token to JWT
                token.token = user.token;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add token to session
            if (token) {
                session.token = token.token as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    trustHost: true,
} satisfies NextAuthConfig;
