import { describe, expect, it } from 'vitest';
import {
  cleanEvents, gradeQuestion, gradeQuiz, integrityPenalty, publicQuestion, secondsLeft,
  drawQuestions, seededShuffle, summarizeEvents, validateQuestionData,
} from './quizGrade';

const q = (type, data, extra = {}) => ({
  id: `q-${type}`, type, prompt: 'P', data, ...extra,
});

describe('validateQuestionData', () => {
  it('accepts well-formed questions and tidies them', () => {
    expect(validateQuestionData('SINGLE', { options: [' Salt ', '', 'Sugar'], answer: 1 }))
      .toEqual({ data: { options: ['Salt', 'Sugar'], answer: 1 } });
    expect(validateQuestionData('MULTI', { options: ['a', 'b', 'c'], answers: ['2', 0, 0, 9] }))
      .toEqual({ data: { options: ['a', 'b', 'c'], answers: [0, 2] } });
    expect(validateQuestionData('NUMBER', { answer: '180', tolerance: '-5' })).toEqual({ data: { answer: 180, tolerance: 5 } });
  });

  it('explains what is missing', () => {
    expect(validateQuestionData('SINGLE', { options: ['only one'], answer: 0 }).error).toMatch(/two options/);
    expect(validateQuestionData('SINGLE', { options: ['a', 'b'], answer: 5 }).error).toMatch(/right option/);
    expect(validateQuestionData('TRUE_FALSE', { answer: 'yes' }).error).toMatch(/true or false/);
    expect(validateQuestionData('ORDER', { items: ['a', 'a'] }).error).toMatch(/different/);
    expect(validateQuestionData('MATCH', { pairs: [['a', 'x'], ['b', 'x']] }).error).toMatch(/different/);
    expect(validateQuestionData('POKE', {}).error).toMatch(/Unknown/);
  });
});

describe('publicQuestion', () => {
  it('never includes the answer', () => {
    const shown = [
      publicQuestion(q('SINGLE', { options: ['a', 'b'], answer: 1 })),
      publicQuestion(q('TRUE_FALSE', { answer: true })),
      publicQuestion(q('TEXT', { accepted: ['secret'] })),
      publicQuestion(q('NUMBER', { answer: 42, tolerance: 0 })),
    ];
    const json = JSON.stringify(shown);
    expect(json).not.toMatch(/answer|accepted|secret|42/);
  });

  it('shows options in a fair, repeatable order, keeping each option’s index', () => {
    const options = ['a', 'b', 'c', 'd'];
    const where = [0, 0, 0, 0];
    for (let k = 0; k < 2000; k += 1) {
      const shown = publicQuestion(q('SINGLE', { options, answer: 0 }), `attempt-${k}`);
      expect([...shown.order].sort()).toEqual([0, 1, 2, 3]);
      where[shown.order.indexOf(0)] += 1;
    }
    where.forEach((n) => expect(n).toBeGreaterThan(400));
    const once = publicQuestion(q('MULTI', { options, answers: [0, 1] }), 'same');
    expect(publicQuestion(q('MULTI', { options, answers: [0, 1] }), 'same').order).toEqual(once.order);
  });

  it('shuffles steps so the order is never given away', () => {
    const items = ['Mix', 'Knead', 'Proof', 'Bake'];
    ['a', 'b', 'c', 'attempt-1'].forEach((seed) => {
      const shown = publicQuestion(q('ORDER', { items }), seed).items;
      expect([...shown].sort()).toEqual([...items].sort());
      expect(shown).not.toEqual(items);
    });
    expect(seededShuffle(items, 'x')).toEqual(seededShuffle(items, 'x'));
  });
});

describe('gradeQuestion', () => {
  it('marks each type', () => {
    expect(gradeQuestion(q('SINGLE', { options: ['a', 'b'], answer: 1 }), 1)).toBe(1);
    expect(gradeQuestion(q('SINGLE', { options: ['a', 'b'], answer: 0 }), null)).toBe(0);
    expect(gradeQuestion(q('MULTI', { options: ['a', 'b', 'c'], answers: [0, 2] }), [0])).toBe(0.5);
    expect(gradeQuestion(q('MULTI', { options: ['a', 'b', 'c'], answers: [0, 2] }), [0, 1, 2])).toBe(0.5);
    expect(gradeQuestion(q('MULTI', { options: ['a', 'b', 'c'], answers: [0] }), [1, 2])).toBe(0);
    expect(gradeQuestion(q('TRUE_FALSE', { answer: false }), false)).toBe(1);
    expect(gradeQuestion(q('ORDER', { items: ['a', 'b', 'c', 'd'] }), ['a', 'b', 'd', 'c'])).toBe(0.5);
    expect(gradeQuestion(q('MATCH', { pairs: [['x', '1'], ['y', '2']] }), ['1', '2'])).toBe(1);
    expect(gradeQuestion(q('TEXT', { accepted: ['Bain-marie'] }), '  bain-marie. ')).toBe(1);
    expect(gradeQuestion(q('TEXT', { accepted: ['x'] }), '')).toBe(0);
    expect(gradeQuestion(q('NUMBER', { answer: 180, tolerance: 5 }), '184')).toBe(1);
    expect(gradeQuestion(q('NUMBER', { answer: 180, tolerance: 5 }), '')).toBe(0);
  });
});

describe('gradeQuiz', () => {
  it('averages credit into a percentage and explains each answer', () => {
    const qs = [
      q('TRUE_FALSE', { answer: true }, { id: 'a', explanation: 'Because.' }),
      q('SINGLE', { options: ['x', 'y'], answer: 0 }, { id: 'b' }),
    ];
    const { score, results } = gradeQuiz(qs, { a: true, b: 1 });
    expect(score).toBe(50);
    expect(results[0]).toMatchObject({ correct: true, answer: 'True', explanation: 'Because.' });
    expect(results[1]).toMatchObject({ correct: false, answer: 'x' });
  });
});

describe('integrity', () => {
  const quiz = {
    leavePenalty: 3, awayPenalty: 1, copyPenalty: 2, maxPenalty: 50,
  };

  it('cleans and counts the browser’s log', () => {
    const events = cleanEvents([
      { type: 'leave', seconds: 25.4, at: 1000 },
      { type: 'copy', text: 'x'.repeat(900), at: 2000 },
      { type: 'paste', text: 'answer', at: 3000 },
      { type: 'leave', seconds: -4, at: 4000 },
      { type: 'hack' },
    ]);
    expect(events).toHaveLength(4);
    expect(events[1].text).toHaveLength(500);
    expect(summarizeEvents(events)).toEqual({
      leaveCount: 2, awaySeconds: 25, copyCount: 1, pasteCount: 1,
    });
  });

  it('logs the device and blips, but only real leaves count against the learner', () => {
    const events = cleanEvents([
      { type: 'device', kind: 'phone', at: 0 },
      {
        type: 'blip', seconds: 1, via: 'tab', at: 500,
      },
      {
        type: 'leave', seconds: 12, via: 'tab', at: 9000,
      },
      {
        type: 'leave', seconds: 3, via: 'satellite', at: 12000,
      },
      { type: 'device', kind: 'toaster', at: 0 },
    ]);
    expect(events[0]).toEqual({ type: 'device', kind: 'phone', at: 0 });
    expect(events[1]).toEqual({
      type: 'blip', seconds: 1, via: 'tab', at: 500,
    });
    expect(events[3]).not.toHaveProperty('via');
    expect(events[4].kind).toBe('desktop');
    expect(summarizeEvents(events)).toEqual({
      leaveCount: 2, awaySeconds: 15, copyCount: 0, pasteCount: 0,
    });
  });

  it('adds up penalties with a breakdown and a cap', () => {
    const p = integrityPenalty(quiz, {
      leaveCount: 2, awaySeconds: 25, copyCount: 1, pasteCount: 1,
    });
    expect(p.total).toBe(6 + 2 + 2 + 2);
    expect(p.parts.map((x) => x.reason)).toEqual(['Leaving the quiz', 'Time away (per 10 seconds)', 'Copying', 'Pasting']);
    expect(integrityPenalty(quiz, {
      leaveCount: 40, awaySeconds: 0, copyCount: 0, pasteCount: 0,
    }).total).toBe(50);
    expect(integrityPenalty(quiz, {
      leaveCount: 0, awaySeconds: 0, copyCount: 0, pasteCount: 0,
    })).toEqual({ total: 0, parts: [] });
  });

  it('takes time away off the clock', () => {
    const now = Date.parse('2026-10-04T10:00:00Z');
    const deadlineAt = new Date(now + 600000);
    expect(secondsLeft({ deadlineAt, now })).toBe(600);
    expect(secondsLeft({
      deadlineAt, awaySeconds: 30, timePenalty: 2, now,
    })).toBe(540);
    expect(secondsLeft({ deadlineAt: null, now })).toBeNull();
  });
});

describe('drawing exam questions from a bank', () => {
  const bank = Array.from({ length: 25 }, (_, i) => ({ id: `q${i}` }));

  it('asks everything when there is no draw, or the bank is small', () => {
    expect(drawQuestions(bank, null, 's')).toBe(bank);
    expect(drawQuestions(bank, 30, 's')).toBe(bank);
  });

  it('takes one question from each part of the bank, in module order', () => {
    const drawn = drawQuestions(bank, 5, 'attempt-1').map((q) => Number(q.id.slice(1)));
    expect(drawn).toHaveLength(5);
    drawn.forEach((n, i) => expect(Math.floor(n / 5)).toBe(i));
    expect(drawQuestions(bank, 5, 'attempt-1')).toEqual(drawQuestions(bank, 5, 'attempt-1'));
  });

  it('gives different attempts different questions, using the whole bank', () => {
    const seen = new Set();
    const sets = new Set();
    for (let i = 0; i < 40; i += 1) {
      const ids = drawQuestions(bank, 15, `attempt-${i}`).map((q) => q.id);
      ids.forEach((id) => seen.add(id));
      sets.add(ids.join());
    }
    expect(seen.size).toBe(25);
    expect(sets.size).toBeGreaterThan(30);
  });
});
