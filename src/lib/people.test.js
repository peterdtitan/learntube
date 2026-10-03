import { describe, expect, it } from 'vitest';
import { publicName, validateDisplayName } from './people';

describe('publicName', () => {
  it('prefers a chosen display name', () => {
    expect(publicName({ name: 'Ada Lovelace', displayName: 'adacodes' })).toBe('adacodes');
  });
  it('falls back to first name and last initial', () => {
    expect(publicName({ name: 'Ada King Lovelace' })).toBe('Ada L.');
    expect(publicName({ name: 'Peter okorafor' })).toBe('Peter O.');
    expect(publicName({ name: 'Cher' })).toBe('Cher');
  });
  it('never returns an empty string', () => {
    expect(publicName({ name: '  ' })).toBe('A learner');
    expect(publicName(null)).toBe('A learner');
    expect(publicName({ name: 'Ada Lovelace', displayName: '   ' })).toBe('Ada L.');
  });
});

describe('validateDisplayName', () => {
  it('trims and collapses spaces', () => {
    expect(validateDisplayName('  Ada   L.  ')).toEqual({ name: 'Ada L.' });
  });
  it('accepts non-English letters', () => {
    expect(validateDisplayName('Ṣèdá Àdùnní')).toEqual({ name: 'Ṣèdá Àdùnní' });
  });
  it('rejects too short, too long and symbols', () => {
    expect(validateDisplayName('A').error).toBeTruthy();
    expect(validateDisplayName('x'.repeat(41)).error).toBeTruthy();
    expect(validateDisplayName('<script>').error).toBeTruthy();
    expect(validateDisplayName('https://spam.example').error).toBeTruthy();
  });
});
