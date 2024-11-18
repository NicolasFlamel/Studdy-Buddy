import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAssessment = nextUrl.pathname.startsWith('/assessment');
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      const isOnChat = nextUrl.pathname.startsWith('/Chat');
      if (isOnAssessment || isOnProfile || isOnChat) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
