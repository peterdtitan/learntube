'use server';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { GOAL_IDS } from '../../lib/recommend';

const MAX_INTERESTS = 20;

async function signedInUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/welcome');
  return session.user.id;
}

export async function saveWelcome(form) {
  const userId = await signedInUserId();
  const known = new Set((await prisma.skill.findMany({ select: { id: true } })).map((s) => s.id));
  const interests = [...new Set(form.getAll('interest').map(String))]
    .filter((id) => known.has(id))
    .slice(0, MAX_INTERESTS);
  const goal = String(form.get('goal') || '');
  const days = Number(form.get('weeklyGoal'));
  await prisma.user.update({
    where: { id: userId },
    data: {
      interests,
      learningGoal: GOAL_IDS.includes(goal) ? goal : null,
      onboardedAt: new Date(),
      ...(Number.isInteger(days) && days >= 2 && days <= 5 ? { weeklyGoal: days } : {}),
    },
  });
  revalidatePath('/', 'layout');
  redirect('/?welcome=1');
}

// "Skip for now": don't ask again on sign-in. The survey stays at /welcome to fill in later.
export async function skipWelcome() {
  const userId = await signedInUserId();
  await prisma.user.update({ where: { id: userId }, data: { onboardedAt: new Date() } });
  revalidatePath('/', 'layout');
  redirect('/');
}
