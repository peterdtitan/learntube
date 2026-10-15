// Module exams for short skills: 8 questions drawn from a bank of 12, in 10 minutes.
export const exam = (title, questions) => ({
  title, minutes: 10, draw: 8, questions,
});

// Gives each module its exam, matched by module title, so a renamed module can't pick up
// the wrong one. An exam whose module isn't there stops the content loading.
export function withExams(def, exams) {
  const titles = new Set(def.modules.map((m) => m.title));
  const stray = Object.keys(exams).filter((title) => !titles.has(title));
  if (stray.length) throw new Error(`${def.title}: no module called ${stray.join(', ')}`);
  return {
    ...def,
    modules: def.modules.map((m) => (exams[m.title] ? { ...m, checkpoint: exams[m.title] } : m)),
  };
}
