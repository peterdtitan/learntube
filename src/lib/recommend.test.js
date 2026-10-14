import { describe, expect, it } from 'vitest';
import {
  comingSoon, itemHref, recommend, startOptions, weeksToFinish,
} from './recommend';

const item = (id, overrides = {}) => ({
  id, kind: 'skill', skill: { id: 'guitar', tier: 'HAND' }, minutes: 600, learners: 0, started: false, ...overrides,
});

const guitar = item('guitar');
const knit = item('knit', { skill: { id: 'knitting', tier: 'HAND' }, learners: 40 });
const web = item('web', { skill: { id: 'software-engineering', tier: 'SCREEN' }, learners: 5 });
const cyberSkill = item('accounts', { skill: { id: 'cybersecurity', tier: 'SCREEN' }, minutes: 200 });
const cyberProgram = item('cyber', { kind: 'program', skill: { id: 'cybersecurity', tier: 'SCREEN' }, minutes: 8000 });
const all = [guitar, knit, web, cyberSkill, cyberProgram];

describe('recommend', () => {
  it('picks only items in the learner’s interests', () => {
    const { picked } = recommend(all, { interests: ['guitar', 'knitting'] });
    expect(picked.map((i) => i.id).sort()).toEqual(['guitar', 'knit']);
  });

  it('puts programs first for a career goal, short skills first otherwise', () => {
    expect(recommend(all, { interests: ['cybersecurity'], goal: 'CAREER' }).picked[0].id).toBe('cyber');
    expect(recommend(all, { interests: ['cybersecurity'], goal: 'HOBBY' }).picked[0].id).toBe('accounts');
  });

  it('puts something already started first', () => {
    const started = { ...guitar, started: true };
    const { picked } = recommend([knit, started], { interests: ['guitar', 'knitting'], goal: 'GIFTS' });
    expect(picked[0].id).toBe('guitar');
  });

  it('suggests popular skills outside the interests, never programs', () => {
    const { more } = recommend(all, { interests: ['guitar'] });
    expect(more.map((i) => i.id)).toEqual(['knit', 'web', 'accounts']);
  });

  it('still suggests something with no interests at all', () => {
    const { picked, more } = recommend(all, {});
    expect(picked).toEqual([]);
    expect(more.length).toBe(3);
  });
});

describe('comingSoon', () => {
  it('lists chosen interests that have nothing to learn yet', () => {
    const categories = [{ id: 'guitar', name: 'Guitar' }, { id: 'digital-marketing', name: 'Digital Marketing' }];
    expect(comingSoon(['guitar', 'digital-marketing'], all, categories)).toEqual([{ id: 'digital-marketing', name: 'Digital Marketing' }]);
  });
});

describe('startOptions', () => {
  it('starts with the best match, then up to two others', () => {
    const { options, fromInterests } = startOptions(all, { interests: ['cybersecurity'], goal: 'CAREER' });
    expect(fromInterests).toBe(true);
    expect(options.map((i) => i.id)).toEqual(['cyber', 'accounts', 'knit']);
  });

  it('falls back to popular skills when nothing matches the interests yet', () => {
    const { options, fromInterests } = startOptions(all, { interests: ['pottery'], goal: 'HOBBY' });
    expect(fromInterests).toBe(false);
    expect(options[0].id).toBe('knit');
    expect(options).toHaveLength(3);
  });

  it('has nothing to offer an empty catalogue', () => {
    expect(startOptions([], { interests: ['guitar'] }).options).toEqual([]);
  });
});

describe('itemHref and weeksToFinish', () => {
  it('links skills to their course and programs to their track', () => {
    expect(itemHref({ kind: 'skill', id: 'p1' })).toBe('/pathways/p1');
    expect(itemHref({ kind: 'program', id: 't1', slug: 'cybersecurity-expert' })).toBe('/tracks/cybersecurity-expert');
  });

  it('counts half-hour sessions on each practice day', () => {
    expect(weeksToFinish(360, 3)).toBe(4);
    expect(weeksToFinish(20, 5)).toBe(1);
    expect(weeksToFinish(0, 3)).toBeNull();
  });
});
