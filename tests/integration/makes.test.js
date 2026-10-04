import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { put } from '@vercel/blob';
import {
  call, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as makes from '../../src/app/api/makes/route.js';
import * as uploads from '../../src/app/api/uploads/route.js';
import * as kudos from '../../src/app/api/makes/[makeId]/kudos/route.js';
import * as comments from '../../src/app/api/makes/[makeId]/comments/route.js';
import * as comment from '../../src/app/api/makes/[makeId]/comments/[commentId]/route.js';
import * as report from '../../src/app/api/makes/[makeId]/report/route.js';
import { getMake, listMakes } from '../../src/lib/makes.js';

async function makeBy(user, title = 'Scarf') {
  return prisma.make.create({ data: { userId: user.id, title } });
}

describe('logging a make', () => {
  it('only accepts photos uploaded to our Blob store', async () => {
    signIn(await makeUser());
    const foreign = await call(makes.POST, { body: { title: 'x', imageUrl: 'https://evil.example/a.png' } });
    expect(foreign.status).toBe(400);
    const http = await call(makes.POST, { body: { title: 'x', imageUrl: 'http://a.public.blob.vercel-storage.com/a.png' } });
    expect(http.status).toBe(400);
    const ok = await call(makes.POST, { body: { title: 'x', imageUrl: 'https://a.public.blob.vercel-storage.com/a.png' } });
    expect(ok.status).toBe(201);
  });

  it('trims and caps title and note', async () => {
    signIn(await makeUser());
    const res = await call(makes.POST, { body: { title: `  ${'t'.repeat(500)}`, note: 'n'.repeat(5000) } });
    expect(res.data.make.title).toHaveLength(120);
    expect(res.data.make.note).toHaveLength(2000);
  });
});

describe('photo uploads', () => {
  const file = (type, bytes = 10) => new File([new Uint8Array(bytes)], 'photo', { type });
  const form = (f) => { const fd = new FormData(); if (f) fd.append('file', f); return fd; };

  it('stores a re-encoded copy with the location and other metadata removed', async () => {
    signIn(await makeUser());
    const withGpsAndName = await sharp({
      create: {
        width: 64, height: 48, channels: 3, background: '#82B0A2',
      },
    }).jpeg().withExif({ IFD0: { Artist: 'Ada Lovelace', Copyright: 'taken at home' } }).toBuffer();
    const res = await call(uploads.POST, {
      form: form(new File([withGpsAndName], 'IMG_0001.jpg', { type: 'image/jpeg' })),
    });
    expect(res.status).toBe(201);
    expect(res.data.url).toMatch(/\.public\.blob\.vercel-storage\.com\/makes\/.*\.jpg$/);

    const [, stored, options] = put.mock.calls.at(-1);
    expect(options.contentType).toBe('image/jpeg');
    expect((await sharp(stored).metadata()).exif).toBeUndefined();
  });

  it('judges the file by its contents, not the type the browser claims', async () => {
    signIn(await makeUser());
    const res = await call(uploads.POST, { form: form(file('image/png')) });
    expect(res.status).toBe(400);
  });

  it('refuses other types, big files and empty forms', async () => {
    signIn(await makeUser());
    expect((await call(uploads.POST, { form: form(file('image/gif')) })).status).toBe(400);
    expect((await call(uploads.POST, { form: form(file('image/png', 8 * 1024 * 1024 + 1)) })).status).toBe(400);
    expect((await call(uploads.POST, { form: form(null) })).status).toBe(400);
  });
});

describe('kudos', () => {
  it('counts once per learner and never for your own make', async () => {
    const [ada, bola, chi] = await Promise.all([makeUser(), makeUser(), makeUser()]);
    const make = await makeBy(bola);
    signIn(bola);
    expect((await call(kudos.POST, { params: { makeId: make.id } })).status).toBe(400);
    signIn(ada);
    await call(kudos.POST, { params: { makeId: make.id } });
    const twice = await call(kudos.POST, { params: { makeId: make.id } });
    expect(twice.data.kudosCount).toBe(1);
    signIn(chi);
    expect((await call(kudos.POST, { params: { makeId: make.id } })).data.kudosCount).toBe(2);
    expect((await call(kudos.DELETE, { params: { makeId: make.id } })).data.kudosCount).toBe(1);
  });
});

describe('comments', () => {
  it('allows only the preset phrases, once each', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await makeBy(bola);
    signIn(ada);
    const free = await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'you are bad' } });
    expect(free.status).toBe(400);
    await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'nice-work' } });
    const res = await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'nice-work' } });
    expect(res.status).toBe(201);
    expect(res.data.comments).toHaveLength(1);
    expect(res.data.comments[0].text).toBe('Nice work!');
  });

  it('lets only the author delete a comment', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await makeBy(bola);
    signIn(ada);
    const posted = await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'keep-going' } });
    const commentId = posted.data.comments[0].id;
    signIn(bola);
    expect((await call(comment.DELETE, { params: { makeId: make.id, commentId } })).status).toBe(404);
    signIn(ada);
    expect((await call(comment.DELETE, { params: { makeId: make.id, commentId } })).status).toBe(200);
  });
});

describe('reports', () => {
  it('hides a make after three reports, except from its author and admins', async () => {
    const author = await makeUser();
    const admin = await makeUser({ admin: true });
    const reporters = await Promise.all([makeUser(), makeUser(), makeUser()]);
    const make = await makeBy(author, 'Questionable');

    signIn(author);
    expect((await call(report.POST, { params: { makeId: make.id }, body: { reason: 'spam' } })).status).toBe(400);

    for (const [i, r] of reporters.entries()) {
      signIn(r);
      // eslint-disable-next-line no-await-in-loop
      const res = await call(report.POST, { params: { makeId: make.id }, body: { reason: 'spam' } });
      expect(res.status).toBe(200);
      // eslint-disable-next-line no-await-in-loop
      const row = await prisma.make.findUnique({ where: { id: make.id } });
      expect(Boolean(row.hiddenAt)).toBe(i === 2);
    }

    expect(await getMake(make.id, reporters[0].id)).toBeNull();
    expect((await getMake(make.id, author.id)).hidden).toBe(true);
    expect(await getMake(make.id, admin.id, { viewerIsAdmin: true })).not.toBeNull();
    expect((await listMakes({ viewerId: reporters[0].id, scope: 'recent', limit: 20 })).map((m) => m.id))
      .not.toContain(make.id);

    signIn(reporters[0]);
    expect((await call(kudos.POST, { params: { makeId: make.id } })).status).toBe(404);
    expect((await call(comments.POST, { params: { makeId: make.id }, body: { preset: 'nice-work' } })).status).toBe(404);
  });

  it('needs a listed reason', async () => {
    const [a, b] = await Promise.all([makeUser(), makeUser()]);
    const make = await makeBy(b);
    signIn(a);
    expect((await call(report.POST, { params: { makeId: make.id }, body: { reason: 'meh' } })).status).toBe(400);
  });
});
