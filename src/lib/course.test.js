import { describe, expect, it } from 'vitest';
import { pathwaySearchWhere } from './course';

describe('pathwaySearchWhere', () => {
  it('matches everything when empty', () => {
    expect(pathwaySearchWhere({ q: '  ' })).toEqual({});
  });

  it('needs every word to match somewhere', () => {
    const where = pathwaySearchWhere({ q: 'sourdough  bread' });
    expect(where.AND).toHaveLength(2);
    expect(where.AND[0].OR[0]).toEqual({ title: { contains: 'sourdough', mode: 'insensitive' } });
    expect(where.AND[1].OR[0].title.contains).toBe('bread');
  });

  it('narrows to a skill', () => {
    expect(pathwaySearchWhere({ skillId: 'knitting' })).toEqual({ AND: [{ skillId: 'knitting' }] });
  });

  it('ignores runaway queries past six words', () => {
    expect(pathwaySearchWhere({ q: 'a b c d e f g h' }).AND).toHaveLength(6);
  });

  it('escapes LIKE wildcards so % and _ match themselves', () => {
    const where = pathwaySearchWhere({ q: '100%_done' });
    expect(where.AND[0].OR[0].title.contains).toBe('100\\%\\_done');
  });
});
