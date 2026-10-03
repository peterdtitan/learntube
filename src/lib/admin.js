import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';
import prisma from './prismadb';
import { isAdminUser } from './roles';

// The signed-in admin, or null. Pages call notFound() on null so /admin doesn't advertise itself.
export async function getAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, email: true, role: true, name: true,
    },
  });
  return isAdminUser(user) ? user : null;
}

// For server actions: throws so a forged request can't run admin code.
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error('Admins only.');
  return admin;
}
