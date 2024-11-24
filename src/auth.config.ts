import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
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
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(credentials),
                        }
                    );
                    const user = await res.json();
                    if (res.ok && user) {
                        return user;
                    }
                    return null;
                } catch (err) {
                    throw new Error('Invalid login: ' + err.message);
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
