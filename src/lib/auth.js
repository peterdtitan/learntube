import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prismadb';
import { adminEmails, isAdminUser } from './roles';

const prismaAdapter = PrismaAdapter(prisma);

// Sessions live in the database, so Google's access, refresh and ID tokens aren't needed after
// sign-in and nothing calls Google later. Don't keep them.
const adapter = {
  ...prismaAdapter,
  linkAccount: (account) => prismaAdapter.linkAccount({
    ...account, access_token: null, refresh_token: null, id_token: null,
  }),
};

export const authOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      if (!session?.user) return session;
      // Promote anyone listed in ADMIN_EMAILS, so the role survives removing them from the list.
      if (user.role !== 'ADMIN' && adminEmails().includes((user.email || '').toLowerCase())) {
        await prisma.user.update({ where: { id: user.id }, data: { role: 'ADMIN' } });
      }
      return {
        ...session,
        user: { ...session.user, id: user.id, isAdmin: isAdminUser(user) },
      };
    },
  },
  pages: {
    signIn: '/auth/signin',
    // Failed sign-ins come back to the sign-in page with ?error=, instead of NextAuth's own page.
    error: '/auth/signin',
  },
};

export default authOptions;
