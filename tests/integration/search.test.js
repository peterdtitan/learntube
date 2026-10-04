import { describe, expect, it } from 'vitest';
import { call, makeCourse } from './helpers.mjs';
import * as pathways from '../../src/app/api/pathways/route.js';

const titles = async (query) => (await call(pathways.GET, { query })).data.pathways.map((p) => p.title);

describe('pathway search', () => {
  it('finds pathways by title, lesson title, skill and outcome, any case', async () => {
    await makeCourse();
    expect(await titles('')).toHaveLength(2);
    expect(await titles('?q=LOAF')).toEqual(['Bake Your First Loaf']);
    expect(await titles('?q=autolyse')).toEqual(['Bake Your First Loaf']);
    expect(await titles('?q=cooking')).toEqual(['Bake Your First Loaf']);
    expect(await titles('?q=sourdough')).toEqual(['Bake Your First Loaf']);
    expect(await titles('?q=tags')).toEqual(['Your First Web Page']);
  });

  it('needs every word to match and narrows by skill', async () => {
    await makeCourse();
    expect(await titles('?q=first')).toHaveLength(2);
    expect(await titles('?q=first+html')).toEqual(['Your First Web Page']);
    expect(await titles('?q=first&skill=cooking')).toEqual(['Bake Your First Loaf']);
    expect(await titles('?q=zzz')).toEqual([]);
  });

  it('treats SQL-looking and huge input as plain text', async () => {
    await makeCourse();
    expect(await titles('?q=%27%3B%20DROP%20TABLE%20%22Pathway%22%3B--')).toEqual([]);
    expect(await titles(`?q=${'a'.repeat(5000)}`)).toEqual([]);
    expect(await titles('?q=%25')).toEqual([]);
  });
});
