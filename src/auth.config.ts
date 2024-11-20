import type { NextAuthConfig } from 'next-auth';

const protectedRoutes = ['/assessment', '/profile', '/chat'];
// const publicRoutes = ['/', '/login'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      const isLoginRoute = path === '/login';
      const isProtectedRoute = protectedRoutes.includes(path);

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
