import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { apiClient } from '@/services/api-client';

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

                    const response = await apiClient.post('/login', {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    // The cookie will be automatically handled by axios
                    console.log(response.data);
                    const user = response.data;

                    if (!user) {
                        throw new Error('Invalid credentials');
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        accessToken: user.token,
                    };
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(
                            `Authentication failed: ${error.message}`
                        );
                    }
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
