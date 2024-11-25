import type { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const protectedRoutes = ['/assessment', '/profile', '/chat'];
// const publicRoutes = ['/', '/login'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user?.id) return token;

      const newToken: JWT = { ...token, userId: user.id };

      return newToken;
    },
    async session({ session, token }) {
      if (!session.user || !token.userId) return session;

      const newSession: Session = {
        ...session,
        user: { ...session.user, id: token.userId },
      };
      return newSession;
    },
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
