import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prismadb';
import { adminEmails, isAdminUser } from './roles';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
  },
};

export default authOptions;
