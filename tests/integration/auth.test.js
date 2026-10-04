import { describe, expect, it } from 'vitest';
import { call, makeUser, signIn } from './helpers.mjs';
import * as progress from '../../src/app/api/progress/route.js';
import * as notes from '../../src/app/api/notes/route.js';
import * as tryStep from '../../src/app/api/lessons/[videoId]/try/route.js';
import * as makes from '../../src/app/api/makes/route.js';
import * as uploads from '../../src/app/api/uploads/route.js';
import * as kudos from '../../src/app/api/makes/[makeId]/kudos/route.js';
import * as comments from '../../src/app/api/makes/[makeId]/comments/route.js';
import * as report from '../../src/app/api/makes/[makeId]/report/route.js';
import * as follow from '../../src/app/api/learners/[userId]/follow/route.js';
import * as cheer from '../../src/app/api/milestones/[milestoneId]/cheer/route.js';
import * as me from '../../src/app/api/me/route.js';
import * as feed from '../../src/app/api/feed/route.js';
import * as notifications from '../../src/app/api/notifications/route.js';
import * as unread from '../../src/app/api/notifications/unread/route.js';
import * as markRead from '../../src/app/api/notifications/read/route.js';
import * as youtube from '../../src/app/api/admin/youtube/route.js';

const P = {
  makeId: 'x', userId: 'x', milestoneId: 'x', videoId: 'x',
};

describe('signed-out visitors', () => {
  it.each([
    ['POST /api/progress', progress.POST, {}],
    ['GET /api/progress', progress.GET, {}],
    ['POST /api/notes', notes.POST, {}],
    ['POST try', tryStep.POST, {}],
    ['POST /api/makes', makes.POST, {}],
    ['POST /api/uploads', uploads.POST, {}],
    ['POST kudos', kudos.POST, {}],
    ['DELETE kudos', kudos.DELETE, {}],
    ['POST comment', comments.POST, {}],
    ['POST report', report.POST, {}],
    ['POST follow', follow.POST, {}],
    ['DELETE follow', follow.DELETE, {}],
    ['POST cheer', cheer.POST, {}],
    ['GET /api/me', me.GET, {}],
    ['PATCH /api/me', me.PATCH, { body: { weeklyGoal: 3 } }],
    ['DELETE /api/me', me.DELETE, { body: { confirm: 'DELETE' } }],
    ['GET /api/feed', feed.GET, {}],
    ['GET /api/notifications', notifications.GET, {}],
    ['GET unread count', unread.GET, {}],
    ['POST mark read', markRead.POST, {}],
  ])('%s needs sign-in', async (_, handler, opts) => {
    const res = await call(handler, { params: P, ...opts });
    expect(res.status).toBe(401);
  });

  it('can still read public makes', async () => {
    const res = await call(makes.GET);
    expect(res.status).toBe(200);
    expect(res.data.makes).toEqual([]);
  });

  it('cannot list "my" makes', async () => {
    expect((await call(makes.GET, { query: '?scope=mine' })).status).toBe(401);
  });
});

describe('admin-only API', () => {
  it('hides the video check from learners', async () => {
    signIn(await makeUser());
    const res = await call(youtube.GET, { query: '?url=https://youtu.be/aaaaaaaaaaa' });
    expect(res.status).toBe(404);
  });
});
