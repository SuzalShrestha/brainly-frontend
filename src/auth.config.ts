import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { login } from './api/login';
import { cookies } from 'next/headers';

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
                    return {
                        id: user.id,
                        name: user.userName,
                        email: user.email,
                    };
                } catch {
                    return null;
                }
            },
        }),
        Google({
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session }) {
            return session;
        },
        async signIn({ account }) {
            if (account?.provider === 'google') {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google-login?accessToken=${account.access_token}`
                );
                if (!res.ok) {
                    return false;
                }
                const data = await res.json();
                const cookiesStore = await cookies();
                const user = data.data.user;
                cookiesStore.set('accessToken', user.accessToken, {
                    sameSite:
                        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    priority: 'high',
                    //max age of 1 hour
                    maxAge: 1000 * 60 * 60,
                });
                cookiesStore.set('refreshToken', user.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    priority: 'high',
                    sameSite:
                        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    //max age of 1 week
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                return true;
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
    trustHost: true,
} satisfies NextAuthConfig;
