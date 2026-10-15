import { describe, expect, it } from 'vitest';
import { LIBRARY, shortSkills } from './content/library';
import { NOT_YET, SEARCH_TERMS } from './searchTerms';
import {
  buildSearchIndex, normalise, orList, searchCatalog,
} from './skillSearch';

// The same items the skills page searches, built from the real content.
const items = [
  ...shortSkills.map((s) => ({
    key: `skill:${s.slug}`, kind: 'skill', slug: s.slug, title: s.title, category: s.skillId, description: s.description, makeTitle: s.makeTitle,
  })),
  ...Object.values(LIBRARY).flatMap((t) => [
    {
      key: `program:${t.slug}`, kind: 'program', slug: t.slug, title: t.title, category: t.skillId, description: t.description,
    },
    ...t.courses.map((c) => ({
      key: `course:${c.slug}`, kind: 'course', slug: c.slug, title: c.title, parent: t.title, description: c.description,
    })),
  ]),
];
const index = buildSearchIndex(items);
const search = (q) => searchCatalog(index, q);
const slugs = (q) => search(q).results.map((r) => r.slug);

describe('skill search', () => {
  it('shows everything for an empty search or only filler words', () => {
    expect(search('')).toBeNull();
    expect(search('   ')).toBeNull();
    expect(search('how to learn')).toBeNull();
  });

  it('finds skills, programs and courses by name, best first', () => {
    expect(slugs('guitar')).toEqual(expect.arrayContaining(['skill-guitar-four-chords', 'guitar-rockstar']));
    expect(slugs('python')[0]).toBe('skill-python-first-programs');
    expect(slugs('excel')).toEqual(expect.arrayContaining(['data-analyst-excel', 'data-analyst']));
    expect(slugs('jollof')).toEqual(['skill-nigerian-party-classics']);
    expect(slugs('chess')[0]).toBe('skill-play-chess');
    expect(search('guitar').missing).toBeNull();
  });

  it('forgives typos and spacing', () => {
    expect(slugs('guiter')).toContain('skill-guitar-four-chords');
    expect(slugs('pyhton')[0]).toBe('skill-python-first-programs');
    expect(slugs('crotchet')[0]).toBe('skill-crochet-granny-square');
    expect(slugs('make up')[0]).toBe('skill-everyday-makeup');
    expect(slugs('makup')[0]).toBe('skill-everyday-makeup');
    expect(slugs('java script')).toContain('software-engineer-javascript');
    expect(slugs('Power BI')[0]).toBe('data-analyst-dashboards');
    expect(slugs('ChatGPT')[0]).toBe('skill-chatgpt-work');
  });

  it('ignores filler words and finds things as you type', () => {
    expect(slugs('learn to play the piano')[0]).toBe('skill-piano-first-songs');
    expect(slugs('how to braid my hair')[0]).toBe('skill-braid-your-hair');
    expect(slugs('gui')).toContain('skill-guitar-four-chords');
    expect(search('gui').missing).toBeNull();
  });

  it('says when we don’t have something and suggests the closest', () => {
    const java = search('java');
    expect(java.missing.text).toBe('java');
    expect(java.missing.suggestions.map((s) => s.label)).toEqual(['JavaScript', 'Software Engineer']);
    expect(java.results[0].slug).toBe('software-engineer-javascript');

    expect(search('Photoshop').missing.suggestions[0].item.slug).toBe('skill-canva-design');
    expect(search('c++').missing.suggestions[0].item.slug).toBe('skill-python-first-programs');
    expect(search('drums').missing.suggestions[0].item.slug).toBe('skill-first-beat-bandlab');
    expect(search('egusi soup').missing.suggestions[0].item.slug).toBe('skill-nigerian-party-classics');
    expect(search('react native').missing.suggestions[0].item.slug).toBe('software-engineer-react');
  });

  it('still shows what matches the rest of a search', () => {
    const r = search('java programming');
    expect(r.missing.suggestions.map((s) => s.label)).toEqual(['JavaScript', 'Software Engineer']);
    expect(r.results.map((x) => x.slug)).toContain('skill-python-first-programs');
  });

  it('has nothing to suggest for things far from what we teach', () => {
    expect(search('french').missing).toEqual({ text: 'french', suggestions: [] });
    expect(search('xylophone').missing.suggestions).toEqual([]);
    expect(search('xylophone').results).toEqual([]);
  });
});

describe('search vocabulary', () => {
  const tokens = new Set(index.flatMap((e) => e.tokens.filter(([, w]) => w >= 6).map(([t]) => t)));

  it('describes only skills, programs and courses that exist', () => {
    const known = new Set(items.map((i) => i.slug));
    expect(Object.keys(SEARCH_TERMS).filter((slug) => !known.has(slug))).toEqual([]);
    expect(NOT_YET.flatMap((t) => t.try).filter((slug) => !known.has(slug))).toEqual([]);
  });

  it('lists not-yet topics by words that survive search, and that we don’t teach', () => {
    NOT_YET.flatMap((t) => t.names).forEach((name) => {
      const words = normalise(name).split(' ');
      expect(words.every((w) => w.length > 1 || /[+#]/.test(w)), name).toBe(true);
      expect(search(name)?.missing, name).toBeTruthy();
      if (words.length === 1) expect(tokens.has(words[0]), name).toBe(false);
    });
  });

  it('joins suggestion names into a sentence', () => {
    expect(orList(['A'])).toBe('A');
    expect(orList(['A', 'B'])).toBe('A or B');
    expect(orList(['A', 'B', 'C'])).toBe('A, B or C');
  });
});
