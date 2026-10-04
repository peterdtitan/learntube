import { describe, expect, it } from 'vitest';
import { draftQuestions, toQuestion } from './quizDraft';

const blank = {
  options: [], answer: 0, answers: [], isTrue: false, items: [], pairs: [], accepted: [], number: 0, tolerance: 0, explanation: '',
};

describe('toQuestion', () => {
  it('turns the model’s flat shape into question data', () => {
    expect(toQuestion({
      ...blank, type: 'MATCH', prompt: 'Match the stitch', pairs: [{ left: 'K', right: 'Knit' }, { left: 'P', right: 'Purl' }],
    })).toEqual({
      type: 'MATCH', prompt: 'Match the stitch', data: { pairs: [['K', 'Knit'], ['P', 'Purl']] }, explanation: null,
    });
    expect(toQuestion({
      ...blank, type: 'TRUE_FALSE', prompt: 'Salt slows yeast', isTrue: true, explanation: 'It does.',
    }).data).toEqual({ answer: true });
  });

  it('drops questions that fail the same checks as the admin form', () => {
    expect(toQuestion({
      ...blank, type: 'SINGLE', prompt: 'x', options: ['only'], answer: 0,
    })).toBeNull();
    expect(toQuestion({ ...blank, type: 'TEXT', prompt: '  ' })).toBeNull();
    expect(toQuestion({ ...blank, type: 'POKE', prompt: 'x' })).toBeNull();
  });
});

describe('draftQuestions', () => {
  it('explains what’s missing instead of calling the API', async () => {
    const before = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    expect((await draftQuestions({ kind: 'LESSON_CHECK', lessons: [] })).error).toMatch(/ANTHROPIC_API_KEY/);
    process.env.ANTHROPIC_API_KEY = 'test';
    expect((await draftQuestions({ kind: 'LESSON_CHECK', lessons: [{ title: 'A' }] })).error).toMatch(/transcript/);
    if (before === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = before;
  });
});
