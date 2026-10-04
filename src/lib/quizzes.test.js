import { describe, expect, it } from 'vitest';
import { checkpointIndex } from './quizzes';

const v = (id, url = id, startSec = null, endSec = null) => ({
  id, url, startSec, endSec,
});

describe('checkpointIndex', () => {
  it('sits after the middle lesson', () => {
    expect(checkpointIndex([v('a'), v('b'), v('c'), v('d')])).toBe(1);
  });

  it('never splits the parts of one video', () => {
    const lessons = [v('a'), v('p1', 'ports', 0, 400), v('p2', 'ports', 390, 800), v('p3', 'ports', 790, 1222), v('b'), v('c')];
    expect(checkpointIndex(lessons)).toBe(3); // middle is p2; moved to after p3
  });

  it('respects an admin’s choice, still at the end of a split video', () => {
    const lessons = [v('a'), v('p1', 'x', 0, 300), v('p2', 'x', 290, 600), v('b')];
    expect(checkpointIndex(lessons, 'p1')).toBe(2);
    expect(checkpointIndex(lessons, 'b')).toBe(3);
  });
});
