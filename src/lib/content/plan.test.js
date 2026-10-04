import { describe, expect, it } from 'vitest';
import {
  compareObjectives, planPathway, q, splitIntoClips,
} from './plan';

describe('splitIntoClips', () => {
  it('leaves videos of 10 minutes or less alone', () => {
    expect(splitIntoClips(600)).toEqual([{ start: 0, end: 600 }]);
  });

  it('cuts longer videos into the fewest parts of at most 10 minutes, overlapping slightly', () => {
    const clips = splitIntoClips(1222); // 20:22
    expect(clips).toHaveLength(3);
    expect(clips[0].start).toBe(0);
    expect(clips.at(-1).end).toBe(1222);
    clips.forEach((c) => expect(c.end - c.start).toBeLessThanOrEqual(600));
    // Each part rewinds 10 seconds into the one before.
    expect(clips[1].start).toBe(clips[0].end - 10);
  });

  it('never makes a part longer than 10 minutes, whatever the length', () => {
    for (let s = 601; s < 4000; s += 37) {
      splitIntoClips(s).forEach((c) => expect(c.end - c.start).toBeLessThanOrEqual(600));
    }
  });
});

describe('compareObjectives', () => {
  it('sorts 1.10 after 1.9', () => {
    expect(['1.10', '1.2', '1.9'].sort(compareObjectives)).toEqual(['1.2', '1.9', '1.10']);
  });
});

describe('planPathway', () => {
  const videos = [
    {
      id: 'intro000001', title: 'How to pass', objective: null, seconds: 300,
    },
    {
      id: 'aaaaaaaaaa1', title: 'OSI model', objective: '1.1', seconds: 831,
    },
    {
      id: 'aaaaaaaaaa2', title: 'Ports', objective: '1.10', seconds: 200,
    },
    {
      id: 'aaaaaaaaaa3', title: 'Routing', objective: '2.1', seconds: 400,
    },
  ];
  const lessons = {
    intro000001: { try: 'Book the exam', minutes: 5, questions: [] },
    aaaaaaaaaa1: { try: 'Draw the 7 layers', minutes: 10, questions: [q.tf('Layer 3 is the network layer', true)] },
    aaaaaaaaaa2: { try: 'List ports', minutes: 5, questions: [q.single('HTTPS?', ['80', '443'], 1)] },
    aaaaaaaaaa3: { try: 'Read a route table', minutes: 5, questions: [] },
  };
  const def = (extra = {}) => ({
    slug: 'test',
    title: 'Test',
    stages: [{
      exam: 'Network+ N10-009',
      videos,
      lessons,
      modules: [
        { title: 'Concepts', objectives: ['1.1', '1.10'], checkpoint: { title: 'CP', questions: [q.tf('x', true)] } },
        { title: 'Routing', objectives: ['2.1', '2.9'] },
      ],
      ...extra,
    }],
  });

  it('builds modules from objective ranges with the intro first', () => {
    const plan = planPathway(def());
    expect(plan.problems).toEqual([]);
    expect(plan.modules.map((m) => m.lessons.map((l) => l.title))).toEqual([
      ['How to pass', 'OSI model (part 1 of 2)', 'OSI model (part 2 of 2)', 'Ports'],
      ['Routing'],
    ]);
  });

  it('puts the Try task and quick check on the last part of a split video', () => {
    const [first, second] = planPathway(def()).modules[0].lessons.slice(1, 3);
    expect(first).toMatchObject({ check: null, practiceMinutes: 3, startSec: 0 });
    expect(second).toMatchObject({ tryTask: 'Draw the 7 layers', practiceMinutes: 10, endSec: 831 });
    expect(second.check).toHaveLength(1);
    expect(second.url).toBe('https://www.youtube.com/watch?v=aaaaaaaaaa1');
  });

  it('reports missing content, bad questions and videos left out', () => {
    const plan = planPathway(def({
      lessons: { ...lessons, aaaaaaaaaa2: { try: 'x', questions: [q.single('?', ['only one'], 0)] }, aaaaaaaaaa3: undefined },
      modules: [{ title: 'Concepts', objectives: ['1.1', '1.10'] }],
    }));
    expect(plan.problems.join('\n')).toMatch(/Ports.*two options/);
    expect(plan.problems.join('\n')).toMatch(/"Routing" isn't in any module/);
  });
});
