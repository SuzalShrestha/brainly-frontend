import NextAuth from 'next-auth';
import authConfig from './auth.config';
const { auth } = NextAuth(authConfig);
import {
    apiAuthPrefix,
    publicRoutes,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
} from './routes';
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isApiRoute) {
        return undefined;
    }
    if (nextUrl.pathname === '/' && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }
    return undefined;
});
export const config = {
    //clerk matcher expression
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
