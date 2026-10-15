// Helpers for programs (tracks) written module by module, like content/guitar-rockstar.

// A program's module exam: 12 questions drawn from a bank of 20, in 20 minutes.
export const programExam = (title, questions) => ({
  title, minutes: 20, draw: 12, questions,
});

// Builds a course from its module files. Each module is { title, lessons, checkpoint }, where
// `lessons` maps video id to what we wrote for it, in the order they're taught. Video ids
// always contain letters, so the object keeps that order.
export function course(def, modules) {
  return {
    ...def,
    lessons: Object.assign({}, ...modules.map((m) => m.lessons)),
    modules: modules.map((m) => ({
      title: m.title, lessons: Object.keys(m.lessons), checkpoint: m.checkpoint,
    })),
  };
}
