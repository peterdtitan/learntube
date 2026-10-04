import { describe, expect, it } from 'vitest';
import {
  formData, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as actions from '../../src/app/admin/actions.js';
import * as reportActions from '../../src/app/admin/reports/actions.js';

// Server actions throw Next's redirect error on success; this returns where it went.
async function redirectOf(promise) {
  try {
    await promise;
  } catch (err) {
    if (err.redirectTo) return err.redirectTo;
    throw err;
  }
  return null;
}

describe('admin server actions', () => {
  it('set a pathway cover from a lesson, back to automatic, or keep it', async () => {
    signIn(await makeUser({ admin: true }));
    const pathway = await prisma.pathway.create({ data: { title: 'Knit a Hat' } });
    const save = (cover) => actions.updatePathway(null, formData({
      id: pathway.id, title: 'Knit a Hat', skillId: '', description: '', makeTitle: '', cover,
    }));
    const stored = async () => (await prisma.pathway.findUnique({ where: { id: pathway.id } })).imageUrl;

    expect(await save('QkrIZBLZEXw')).toEqual({ ok: 'Saved.' });
    expect(await stored()).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(await save('keep')).toEqual({ ok: 'Saved.' });
    expect(await stored()).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(await save('https://evil.example/x.jpg')).toHaveProperty('error');
    expect(await stored()).toBe('https://i.ytimg.com/vi/QkrIZBLZEXw/hqdefault.jpg');
    expect(await save('auto')).toEqual({ ok: 'Saved.' });
    expect(await stored()).toBeNull();
  });

  it('refuse learners, even if they forge the request', async () => {
    signIn(await makeUser());
    await expect(actions.createPathway(null, formData({ title: 'Hack' }))).rejects.toThrow('Admins only.');
    await expect(reportActions.hideMake(formData({ makeId: 'x' }))).rejects.toThrow('Admins only.');
    expect(await prisma.pathway.count()).toBe(0);
  });

  it('build a pathway: pathway, unit, lessons, reorder, delete', async () => {
    signIn(await makeUser({ admin: true }));
    const to = await redirectOf(actions.createPathway(null, formData({
      title: 'Knit a Hat', skillId: 'knitting', description: '', makeTitle: 'A hat',
    })));
    const pathwayId = to.split('/').pop();
    expect(await prisma.pathway.findUnique({ where: { id: pathwayId } })).toMatchObject({ title: 'Knit a Hat', skillId: 'knitting' });

    expect(await actions.createUnit(null, formData({ pathwayId, title: '' }))).toHaveProperty('error');
    await actions.createUnit(null, formData({ pathwayId, title: 'Casting on' }));
    const unit = await prisma.unit.findFirst({ where: { pathwayId } });

    const lesson = (title, url, extra = {}) => formData({
      unitId: unit.id, url, title, duration: '6:05', tryTask: 'Cast on 20', ...extra,
    });
    expect(await actions.saveLesson(null, lesson('Bad', 'https://vimeo.com/1'))).toEqual({ error: 'Paste a YouTube video link.' });
    expect(await actions.saveLesson(null, lesson('No length', 'https://youtu.be/aaaaaaaaaaa', { duration: 'soon' })))
      .toHaveProperty('error');
    await redirectOf(actions.saveLesson(null, lesson('One', 'https://youtu.be/aaaaaaaaaaa')));
    await redirectOf(actions.saveLesson(null, lesson('Two', 'https://www.youtube.com/watch?v=bbbbbbbbbbb', { starterCode: '<p>hi</p>' })));

    let videos = await prisma.video.findMany({ where: { unitId: unit.id }, orderBy: { order: 'asc' } });
    expect(videos.map((v) => [v.title, v.duration])).toEqual([['One', 365], ['Two', 365]]);
    expect(videos[1].starterCode).toBe('<p>hi</p>');
    expect(videos[0].url).toBe('https://www.youtube.com/watch?v=aaaaaaaaaaa');

    await actions.moveLesson(formData({ id: videos[1].id, direction: '-1' }));
    videos = await prisma.video.findMany({ where: { unitId: unit.id }, orderBy: { order: 'asc' } });
    expect(videos.map((v) => v.title)).toEqual(['Two', 'One']);

    // A unit with lessons can't be deleted; an empty one can.
    await actions.deleteUnit(formData({ id: unit.id }));
    expect(await prisma.unit.count({ where: { id: unit.id } })).toBe(1);

    await redirectOf(actions.deletePathway(formData({ id: pathwayId })));
    expect(await prisma.pathway.count()).toBe(0);
    expect(await prisma.video.count()).toBe(0);
  });

  it('resolve reports by keeping, hiding or deleting the make', async () => {
    signIn(await makeUser({ admin: true }));
    const author = await makeUser();
    const reporter = await makeUser();
    const make = await prisma.make.create({ data: { userId: author.id, title: 'x', hiddenAt: new Date() } });
    await prisma.report.create({ data: { makeId: make.id, reporterId: reporter.id, reason: 'spam' } });

    await reportActions.keepVisible(formData({ makeId: make.id }));
    expect((await prisma.make.findUnique({ where: { id: make.id } })).hiddenAt).toBeNull();
    expect((await prisma.report.findFirst()).resolvedAt).not.toBeNull();

    await reportActions.deleteMake(formData({ makeId: make.id }));
    expect(await prisma.make.count()).toBe(0);
  });
});
