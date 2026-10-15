import { describe, expect, it } from 'vitest';
import {
  call, makeUser, prisma, signIn,
} from './helpers.mjs';
import { POST } from '../../src/app/api/search-log/route.js';
import { recordSearch } from '../../src/lib/searchLog.js';
import { searchInsights, getOverview } from '../../src/lib/adminData.js';
import { runRetention } from '../../src/lib/retention.js';
import { deleteAccount, exportUserData } from '../../src/lib/account.js';

const java = {
  query: '  Java ', results: 2, missing: true, suggested: ['JavaScript', 'Software Engineer'],
};
const guitar = {
  query: 'guitar', results: 5, missing: false, suggested: [],
};

describe('logging skills searches', () => {
  it('keeps one row per learner, search and day, and marks what they opened', async () => {
    signIn(await makeUser());
    expect((await call(POST, { body: java })).status).toBe(204);
    expect((await call(POST, { body: { ...java, clicked: 'JavaScript Fundamentals' } })).status).toBe(204);
    expect((await call(POST, { body: java })).status).toBe(204);

    const rows = await prisma.searchLog.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      query: 'java', results: 2, missing: true, suggested: ['JavaScript', 'Software Engineer'], clicked: 'JavaScript Fundamentals',
    });
  });

  it('turns away bad input, signed-out visitors, and doesn’t count admins', async () => {
    expect((await call(POST, { body: guitar })).status).toBe(401);
    signIn(await makeUser());
    expect((await call(POST, { body: { query: 'g', results: 1, missing: false } })).status).toBe(400);
    expect((await call(POST, { body: { query: 'guitar', results: -1, missing: false } })).status).toBe(400);
    expect((await call(POST, { body: { query: 'guitar', results: 1 } })).status).toBe(400);
    expect((await call(POST, { body: 'not json' })).status).toBe(400);

    signIn(await makeUser({ admin: true }));
    expect((await call(POST, { body: guitar })).status).toBe(204);
    expect(await prisma.searchLog.count()).toBe(0);
  });

  it('shows admins what people want, as totals', async () => {
    const now = new Date('2026-10-15T12:00:00Z');
    const people = await Promise.all([1, 2, 3].map(() => makeUser()));
    await recordSearch(people[0].id, { ...java, query: 'java', clicked: 'JavaScript Fundamentals' }, now);
    await recordSearch(people[1].id, { ...java, query: 'java', clicked: null }, now);
    await recordSearch(people[2].id, { ...guitar, clicked: 'Guitar Rockstar' }, now);
    // Old enough to fall outside a week, but inside 30 days.
    await recordSearch(people[2].id, { ...java, query: 'java', clicked: null }, new Date('2026-09-30T12:00:00Z'));

    const week = await searchInsights(7, now);
    expect(week).toMatchObject({ total: 3, found: 1 });
    expect(week.wanted).toEqual([{
      query: 'java', searches: 2, results: 2, suggested: ['JavaScript', 'Software Engineer'], opened: 1, topOpened: 'JavaScript Fundamentals',
    }]);
    expect(week.popular.map((r) => [r.query, r.searches])).toEqual([['java', 2], ['guitar', 1]]);
    expect((await searchInsights(30, now)).wanted[0].searches).toBe(3);

    const { attention } = await getOverview(now);
    expect(attention.find((a) => a.href === '/admin/searches?days=7')?.text)
      .toBe('2 searches this week for things we don’t teach yet');
  });

  it('is in Download my data, goes with the account, and is cleared after a year', async () => {
    const user = await makeUser();
    await recordSearch(user.id, { ...guitar, clicked: 'Guitar Rockstar' }, new Date('2026-10-15T12:00:00Z'));
    expect((await exportUserData(user.id)).searches).toEqual([
      { search: 'guitar', day: new Date('2026-10-15T00:00:00Z'), opened: 'Guitar Rockstar' },
    ]);

    const other = await makeUser();
    await recordSearch(other.id, guitar, new Date('2025-09-01T12:00:00Z'));
    expect(await runRetention(new Date('2026-10-15T12:00:00Z'))).toMatchObject({ oldSearchLogs: 1 });

    await deleteAccount(user.id);
    expect(await prisma.searchLog.count()).toBe(0);
  });
});
