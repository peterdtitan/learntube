import { describe, expect, it } from 'vitest';
import {
  call, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as follow from '../../src/app/api/learners/[userId]/follow/route.js';
import * as feed from '../../src/app/api/feed/route.js';
import * as cheer from '../../src/app/api/milestones/[milestoneId]/cheer/route.js';
import * as kudos from '../../src/app/api/makes/[makeId]/kudos/route.js';
import * as comments from '../../src/app/api/makes/[makeId]/comments/route.js';
import * as comment from '../../src/app/api/makes/[makeId]/comments/[commentId]/route.js';
import * as notifications from '../../src/app/api/notifications/route.js';
import * as unread from '../../src/app/api/notifications/unread/route.js';
import * as markRead from '../../src/app/api/notifications/read/route.js';
import * as leaderboard from '../../src/app/api/leaderboard/route.js';
import * as tryStep from '../../src/app/api/lessons/[videoId]/try/route.js';

const count = async () => (await call(unread.GET)).data.unread;

describe('follows and the feed', () => {
  it('shows makes from people you follow', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    await prisma.make.create({ data: { userId: bola.id, title: 'Granny square' } });
    signIn(ada);
    expect((await call(follow.POST, { params: { userId: ada.id } })).status).toBe(400);
    expect((await call(follow.POST, { params: { userId: 'nobody' } })).status).toBe(404);

    expect((await call(feed.GET)).data).toEqual({ following: 0, items: [] });
    const res = await call(follow.POST, { params: { userId: bola.id } });
    expect(res.data).toEqual({ following: true, followers: 1 });
    const { items } = (await call(feed.GET)).data;
    expect(items.map((i) => i.title)).toContain('Granny square');

    await call(follow.DELETE, { params: { userId: bola.id } });
    expect((await call(feed.GET)).data.following).toBe(0);
  });
});

describe('cheers', () => {
  it('cheers someone else’s milestone once', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const m = await prisma.milestone.create({ data: { userId: bola.id, kind: 'FIRST_MAKE', key: 'first-make' } });
    signIn(bola);
    expect((await call(cheer.POST, { params: { milestoneId: m.id } })).status).toBe(400);
    signIn(ada);
    await call(cheer.POST, { params: { milestoneId: m.id } });
    expect((await call(cheer.POST, { params: { milestoneId: m.id } })).data.cheerCount).toBe(1);
  });
});

describe('notifications', () => {
  it('tells the maker about kudos, comments, follows and cheers', async () => {
    const [ada, bola] = await Promise.all([makeUser({ name: 'Ada Lovelace' }), makeUser()]);
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'Loaf' } });
    const m = await prisma.milestone.create({
      data: {
        userId: bola.id, kind: 'XP', key: 'xp:100', value: 100,
      },
    });

    signIn(ada);
    await call(kudos.POST, { params: { makeId: make.id } });
    await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'nice-work' } });
    await call(follow.POST, { params: { userId: bola.id } });
    await call(cheer.POST, { params: { milestoneId: m.id } });

    signIn(bola);
    expect(await count()).toBe(4);
    const list = (await call(notifications.GET)).data.notifications;
    expect(list.map((n) => n.kind).sort()).toEqual(['CHEER', 'COMMENT', 'FOLLOW', 'KUDOS']);
    expect(list.every((n) => n.actor.name === 'Ada L.')).toBe(true);
    expect(list.find((n) => n.kind === 'CHEER').text).toBe('cheered you for: reached 100 XP');

    await call(markRead.POST);
    expect(await count()).toBe(0);
  });

  it('withdraws unseen ones when the action is undone, and never repeats seen ones', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'Loaf' } });

    signIn(ada);
    await call(kudos.POST, { params: { makeId: make.id } });
    const posted = await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'how-long' } });
    await call(kudos.DELETE, { params: { makeId: make.id } });
    await call(comment.DELETE, { params: { makeId: make.id, commentId: posted.data.comments[0].id } });
    signIn(bola);
    expect(await count()).toBe(0);

    signIn(ada);
    await call(kudos.POST, { params: { makeId: make.id } });
    signIn(bola);
    await call(markRead.POST);
    signIn(ada);
    await call(kudos.DELETE, { params: { makeId: make.id } });
    await call(kudos.POST, { params: { makeId: make.id } });
    signIn(bola);
    expect(await count()).toBe(0);
    expect((await call(notifications.GET)).data.notifications).toHaveLength(1);
  });

  it('never notifies you about yourself, and only you see yours', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await prisma.make.create({ data: { userId: ada.id, title: 'Mine' } });
    signIn(ada);
    await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'nice-work' } });
    expect(await count()).toBe(0);
    signIn(bola);
    await call(kudos.POST, { params: { makeId: make.id } });
    expect(await count()).toBe(0);
  });
});

describe('leaderboard', () => {
  it('ranks by XP this week, per skill, and respects the opt-out', async () => {
    const { lessons, codeLesson } = await makeCourse();
    const [ada, bola, shy] = await Promise.all([
      makeUser(), makeUser(), makeUser({ showOnLeaderboard: false }),
    ]);
    signIn(ada);
    await call(tryStep.POST, { params: { videoId: lessons[0].id } });
    await call(tryStep.POST, { params: { videoId: lessons[1].id } });
    signIn(bola);
    await call(tryStep.POST, { params: { videoId: codeLesson.id } });
    signIn(shy);
    for (const l of lessons) {
      // eslint-disable-next-line no-await-in-loop
      await call(tryStep.POST, { params: { videoId: l.id } });
    }

    signIn(ada);
    const all = (await call(leaderboard.GET)).data;
    expect(all.entries.map((e) => [e.userId, e.xp])).toEqual([[ada.id, 50], [bola.id, 25]]);
    expect(all.entries[0].isViewer).toBe(true);

    const cooking = (await call(leaderboard.GET, { query: '?scope=skill&id=cooking' })).data;
    expect(cooking.entries.map((e) => e.userId)).toEqual([ada.id]);

    const following = (await call(leaderboard.GET, { query: '?audience=following' })).data;
    expect(following.entries.map((e) => e.userId)).toEqual([ada.id]);

    signIn(shy);
    expect((await call(leaderboard.GET)).data.viewerHidden).toBe(true);
  });
});
