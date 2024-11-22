import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
export default {
    providers: [
        Credentials({
            credentials: {
                userName: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    }
                ).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error('Invalid login');
                });
                return res.data.user;
            },
        }),
    ],
} satisfies NextAuthConfig;
