/**
 *An array of routes that are public.
 *These do not require authentication.
 *@type {string[]}
 **/
export const publicRoutes = ['/help'];
/**
 *An array of routes that are public.
 *These do not require authentication.
 *@type {string[]}
 **/
export const authRoutes = ['/login', 'signup'];
/**
 *The prefix for the API routes.
 *@type {string}
 **/
export const apiAuthPrefix = '/api/auth';
export const DEFAULT_LOGIN_REDIRECT = '/';
