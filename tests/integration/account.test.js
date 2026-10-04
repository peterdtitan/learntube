import { describe, expect, it } from 'vitest';
import { del } from '@vercel/blob';
import {
  call, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as me from '../../src/app/api/me/route.js';

describe('settings', () => {
  it('validates each setting', async () => {
    signIn(await makeUser());
    expect((await call(me.PATCH, { body: {} })).status).toBe(400);
    expect((await call(me.PATCH, { body: { weeklyGoal: 7 } })).status).toBe(400);
    expect((await call(me.PATCH, { body: { timeZone: 'Mars/Olympus' } })).status).toBe(400);
    expect((await call(me.PATCH, { body: { showOnLeaderboard: 'yes' } })).status).toBe(400);
    expect((await call(me.PATCH, { body: { displayName: '<script>' } })).status).toBe(400);

    const ok = await call(me.PATCH, {
      body: {
        weeklyGoal: 4, timeZone: 'Africa/Lagos', displayName: '  Ada   the Baker ', showOnLeaderboard: false,
      },
    });
    expect(ok.status).toBe(200);
    expect(ok.data).toMatchObject({ weeklyGoal: 4, timeZone: 'Africa/Lagos' });
  });

  it('stores a tidied display name and clears it with an empty string', async () => {
    const user = await makeUser();
    signIn(user);
    await call(me.PATCH, { body: { displayName: '  Ada   the Baker ' } });
    expect((await prisma.user.findUnique({ where: { id: user.id } })).displayName).toBe('Ada the Baker');
    await call(me.PATCH, { body: { displayName: '' } });
    expect((await prisma.user.findUnique({ where: { id: user.id } })).displayName).toBeNull();
  });
});

describe('deleting an account', () => {
  it('needs DELETE typed out', async () => {
    signIn(await makeUser());
    expect((await call(me.DELETE, { body: { confirm: 'delete' } })).status).toBe(400);
  });

  it('removes the learner, their makes and photos, but keeps pathways they wrote', async () => {
    const admin = await makeUser({ admin: true });
    const other = await makeUser();
    const pathway = await prisma.pathway.create({ data: { title: 'Kept', ownerId: admin.id } });
    await prisma.make.create({ data: { userId: admin.id, title: 'P', imageUrl: 'https://s.public.blob.vercel-storage.com/p.png' } });
    await prisma.follow.create({ data: { followerId: other.id, followingId: admin.id } });
    await prisma.session.create({ data: { sessionToken: 'tok', userId: admin.id, expires: new Date(Date.now() + 1e6) } });

    signIn(admin);
    expect((await call(me.DELETE, { body: { confirm: 'DELETE' } })).status).toBe(200);
    expect(del).toHaveBeenCalledWith(['https://s.public.blob.vercel-storage.com/p.png']);
    expect(await prisma.user.findUnique({ where: { id: admin.id } })).toBeNull();
    expect(await prisma.make.count()).toBe(0);
    expect(await prisma.session.count()).toBe(0);
    expect(await prisma.follow.count()).toBe(0);
    expect((await prisma.pathway.findUnique({ where: { id: pathway.id } })).ownerId).toBeNull();
  });
});
