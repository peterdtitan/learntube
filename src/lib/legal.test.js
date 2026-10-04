import { describe, expect, it } from 'vitest';
import { LEGAL, placeholders } from './legal';

describe('legal details', () => {
  it('finds bracketed placeholders', () => {
    expect(placeholders({ a: '[email]', b: 'done', c: 13 })).toEqual(['a']);
  });

  // Fails on purpose until the real company details are filled in, so the privacy policy
  // and terms can't go live as a draft.
  it('has every placeholder filled in', () => {
    expect(placeholders(LEGAL), 'fill these in src/lib/legal.js').toEqual([]);
  });
});
