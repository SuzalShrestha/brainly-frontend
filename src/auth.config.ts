import { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import qs from 'querystring';
import { cookies } from 'next/headers';
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
                            credentials: 'include',
                        }
                    );
                    // Check if the response is ok here
                    // Parse the cookie string with querystring module
                    const setCookie = qs.decode(
                        res.headers.get('set-cookie') as string,
                        '; ',
                        '='
                    ); // cast this to a type with the structure of the cookie received from your backend

                    // Extract the cookie name and the value from the first entry in the
                    // setCookie object
                    const [cookieName, cookieValue] = Object.entries(
                        setCookie
                    )[0] as [string, string];

                    // set the values that you need for your cookie
                    cookies().set({
                        name: cookieName,
                        value: cookieValue,
                        httpOnly: true,
                        //@ts-expect-error: TypeScript does not recognize the cookie expiration format
                        maxAge: parseInt(setCookie['Max-Age']),
                        path: Array.isArray(setCookie.Path)
                            ? setCookie.Path[0]
                            : setCookie.Path || '/',
                        sameSite: 'strict',
                        //@ts-expect-error: TypeScript does not recognize the cookie expiration format
                        expires: new Date(setCookie.Expires),
                        secure: true,
                    });
                    const user = await res.json();
                    if (res.ok && user) {
                        return user;
                    }
                    return null;
                } catch (err) {
                    throw new Error('Invalid login: ' + (err as Error).message);
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
