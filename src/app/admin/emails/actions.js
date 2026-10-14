'use server';

import { requireAdmin } from '../../../lib/admin';
import prisma from '../../../lib/prismadb';
import { sendTestEmail } from '../../../lib/email/reminders';

export default async function sendTest() {
  const admin = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: {
      id: true, email: true, name: true, displayName: true,
    },
  });
  const result = await sendTestEmail(user);
  if (result.dryRun) return { error: 'Not sent: RESEND_API_KEY isn’t set.' };
  if (result.error) return { error: `Resend said: ${result.error}` };
  return { ok: `Sent to ${user.email}. It should arrive within a minute.` };
}
