import { describe, expect, it } from 'vitest';
import { parsePicks, serializePicks, startingInterests } from './picks';

describe('landing page picks', () => {
  it('round-trips through the cookie', () => {
    expect(parsePicks(serializePicks(['guitar', 'cooking']))).toEqual(['guitar', 'cooking']);
  });

  it('drops junk, duplicates and malformed values', () => {
    expect(parsePicks('guitar%2CGUITAR%2C%3Cscript%3E%2Cguitar%2Ccooking')).toEqual(['guitar', 'cooking']);
    expect(parsePicks('%E0%A4%A')).toEqual([]);
    expect(parsePicks(undefined)).toEqual([]);
  });

  it('only fills an empty survey, with categories that exist', () => {
    expect(startingInterests([], ['guitar', 'gone'], ['guitar', 'cooking'])).toEqual(['guitar']);
    expect(startingInterests(['cooking'], ['guitar'], ['guitar', 'cooking'])).toEqual(['cooking']);
  });
});
