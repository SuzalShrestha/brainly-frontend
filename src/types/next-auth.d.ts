import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        token?: string;
        user: {
            id: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        email: string;
        name: string;
        token: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        token?: string;
        id: string;
    }
}
