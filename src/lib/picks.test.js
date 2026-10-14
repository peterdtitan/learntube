import { describe, expect, it } from 'vitest';
import { parsePicks, parseStart, serializeStart } from './picks';

describe('landing page picks', () => {
  it('drops junk, duplicates and malformed values', () => {
    expect(parsePicks('guitar,cooking')).toEqual(['guitar', 'cooking']);
    expect(parsePicks('guitar%2CGUITAR%2C%3Cscript%3E%2Cguitar%2Ccooking')).toEqual(['guitar', 'cooking']);
    expect(parsePicks('%E0%A4%A')).toEqual([]);
    expect(parsePicks(undefined)).toEqual([]);
  });
});

describe('start answers', () => {
  it('round-trip through the cookie', () => {
    const answers = {
      interests: ['knitting', 'cooking'], goal: 'HOBBY', weeklyGoal: 4, pick: { kind: 'skill', id: 'clx1abc' },
    };
    expect(parseStart(serializeStart(answers))).toEqual(answers);
  });

  it('drops anything it doesn’t recognise', () => {
    const value = encodeURIComponent(JSON.stringify({
      i: ['knitting', '<b>', 7], g: 'RICH', d: 9, p: { k: 'course', id: 'x' },
    }));
    expect(parseStart(value)).toEqual({
      interests: ['knitting'], goal: null, weeklyGoal: null, pick: null,
    });
    expect(parseStart('not json')).toBeNull();
    expect(parseStart('%E0%A4%A')).toBeNull();
    expect(parseStart(undefined)).toBeNull();
  });
});
