import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUser, getUserScores } from 'drizzle';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { username, password } = parsedCredentials.data;
        const user = await getUser(username);

        if (!user) return null;

        const [scores, passwordsMatch] = await Promise.all([
          getUserScores(user.id),
          bcrypt.compare(password, user.password),
        ]);

        if (passwordsMatch) {
          const userData = {
            id: user.id,
            name: user.username,
            scores,
          };
          return userData;
        }
        return null;
      },
    }),
  ],
});
