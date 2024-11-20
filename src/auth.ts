import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                userName: {},
                password: {},
            },
            authorize: async (credentials) => {
                // Add logic here to validate credentials
                console.log('started auth');
                const user = await fetch(
                    `${process.env.API_URL}/api/v1/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    }
                ).then((res) => {
                    if (res.ok) {
                        console.log(res.json);
                        return res.json();
                    }
                    throw new Error('Invalid login');
                });
                console.log(user);
                // return user object with their profile data
                return user;
            },
        }),
    ],
});
