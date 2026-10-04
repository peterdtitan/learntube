import { validateQuestionData } from '../quizGrade';

// Turns a pathway written as content files (see content/cybersecurity-expert) into the
// lessons, modules and quizzes to store. Pure, so it can be checked in tests before import.

export const MAX_LESSON_SECONDS = 600;
const OVERLAP_SECONDS = 10;

// Splits a video into the fewest parts of at most `max` seconds. Every part after the
// first starts a little early, so nobody joins mid-sentence.
export function splitIntoClips(seconds, max = MAX_LESSON_SECONDS, overlap = OVERLAP_SECONDS) {
  if (seconds <= max) return [{ start: 0, end: seconds }];
  const parts = Math.ceil(seconds / (max - overlap));
  const step = seconds / parts;
  return Array.from({ length: parts }, (_, i) => ({
    start: i === 0 ? 0 : Math.max(0, Math.round(i * step) - overlap),
    end: i === parts - 1 ? seconds : Math.round((i + 1) * step),
  }));
}

// "1.10" sorts after "1.9".
export function compareObjectives(a, b) {
  const [a1, a2] = a.split('.').map(Number);
  const [b1, b2] = b.split('.').map(Number);
  return a1 - b1 || a2 - b2;
}

function inRange(objective, [from, to]) {
  return compareObjectives(objective, from) >= 0 && compareObjectives(objective, to) <= 0;
}

// Short-hand used in the content files, expanded to Question rows.
export const q = {
  single: (prompt, options, answer, explanation) => ({
    type: 'SINGLE', prompt, data: { options, answer }, explanation,
  }),
  multi: (prompt, options, answers, explanation) => ({
    type: 'MULTI', prompt, data: { options, answers }, explanation,
  }),
  tf: (prompt, answer, explanation) => ({
    type: 'TRUE_FALSE', prompt, data: { answer }, explanation,
  }),
  order: (prompt, items, explanation) => ({
    type: 'ORDER', prompt, data: { items }, explanation,
  }),
  match: (prompt, pairs, explanation) => ({
    type: 'MATCH', prompt, data: { pairs }, explanation,
  }),
  num: (prompt, answer, tolerance, explanation) => ({
    type: 'NUMBER', prompt, data: { answer, tolerance }, explanation,
  }),
  text: (prompt, accepted, explanation) => ({
    type: 'TEXT', prompt, data: { accepted }, explanation,
  }),
};

const PART_TRY = 'In your notes, write the three most important terms from this part, then carry on to the next part.';

function checkQuestions(questions, where, problems) {
  return questions.map((question, i) => {
    const checked = validateQuestionData(question.type, question.data);
    if (checked.error) problems.push(`${where}, question ${i + 1}: ${checked.error}`);
    if (!question.prompt?.trim()) problems.push(`${where}, question ${i + 1}: no prompt`);
    return { ...question, data: checked.data || question.data };
  });
}

// def: { slug, title, description, makeTitle, skillId, stages: [{ exam, videos, lessons,
//   modules: [{ title, objectives: [from, to], intro?, checkpoint: { title, questions } }] }] }
// `videos` is the playlist list; `lessons` maps video id to { try, minutes, questions }.
// Returns { pathway, modules, problems }; import only when problems is empty.
export function planPathway(def) {
  const problems = [];
  const used = new Set();
  const modules = [];

  def.stages.forEach((stage) => {
    const intro = stage.videos.find((v) => !v.objective);
    stage.modules.forEach((mod, m) => {
      const videos = stage.videos
        .filter((v) => v.objective && inRange(v.objective, mod.objectives));
      if (m === 0 && intro) videos.unshift(intro);
      const lessons = [];
      videos.forEach((video) => {
        used.add(`${stage.exam}:${video.id}`);
        const authored = stage.lessons[video.id];
        if (!authored) problems.push(`${stage.exam}: no Try task or questions for "${video.title}" (${video.id})`);
        const clips = splitIntoClips(video.seconds);
        const objective = video.objective ? ` · objective ${video.objective}` : '';
        clips.forEach((clip, c) => {
          const last = c === clips.length - 1;
          const where = `${stage.exam} "${video.title}"`;
          lessons.push({
            title: clips.length > 1 ? `${video.title} (part ${c + 1} of ${clips.length})` : video.title,
            description: `${stage.exam}${objective}`,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            startSec: clips.length > 1 ? clip.start : null,
            endSec: clips.length > 1 ? clip.end : null,
            duration: clip.end - clip.start,
            tryTask: last ? authored?.try || null : PART_TRY,
            practiceMinutes: last ? authored?.minutes ?? null : 3,
            check: last && authored?.questions?.length
              ? checkQuestions(authored.questions, where, problems)
              : null,
          });
          if (clip.end - clip.start > MAX_LESSON_SECONDS) problems.push(`${where}: a part is over 10 minutes`);
        });
      });
      if (!lessons.length) problems.push(`${stage.exam} "${mod.title}": no videos in objectives ${mod.objectives.join('–')}`);
      modules.push({
        title: mod.title,
        lessons,
        checkpoint: mod.checkpoint
          ? {
            title: mod.checkpoint.title,
            timeLimitSec: mod.checkpoint.minutes ? mod.checkpoint.minutes * 60 : 900,
            questions: checkQuestions(mod.checkpoint.questions, `${mod.title} checkpoint`, problems),
          }
          : null,
      });
    });
    stage.videos.forEach((v) => {
      if (!used.has(`${stage.exam}:${v.id}`)) problems.push(`${stage.exam}: "${v.title}" isn't in any module`);
    });
  });

  return {
    pathway: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      makeTitle: def.makeTitle,
      skillId: def.skillId,
      certification: def.certification || null,
    },
    modules,
    problems,
  };
}

// A track is courses taken in order; each course is planned like a pathway.
export function planTrack(def) {
  const courses = def.courses.map((course) => planPathway(course));
  return {
    track: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      makeTitle: def.makeTitle,
      skillId: def.skillId,
    },
    courses,
    problems: courses.flatMap((c) => c.problems.map((p) => `${c.pathway.title}: ${p}`)),
  };
}

// Time to learn once imported with quizzes published: video, practice, quick checks
// (2 min each) and each module's games (5 min). Matches src/lib/estimate.js.
export function planMinutes(plan) {
  const lessons = plan.modules.flatMap((m) => m.lessons);
  return Math.round(lessons.reduce((n, l) => n + l.duration / 60 + (l.practiceMinutes ?? 5)
    + (l.check ? 2 : 0), 0)
    + plan.modules.reduce((n, m) => n + 5
      + (m.checkpoint ? Math.ceil(m.checkpoint.timeLimitSec / 60) : 0), 0));
}

// A short skill is capped so it stays something you can pick up in a few weeks.
export const MAX_SKILL_HOURS = 20;
const SKILL_PART_TRY = 'Follow along with this part as you watch, then carry on to the next part.';

// def: { slug, title, description, makeTitle, skillId, by?, modules: [{ title, lessons:
//   [{ id, title, seconds, from?, to?, by?, try, minutes, questions? }] }] }
// `seconds` is the whole video's length; from/to (seconds) use just part of it. Anything
// longer than 10 minutes is split into parts, like the courses.
export function planSkill(def) {
  const problems = [];
  const modules = def.modules.map((mod) => {
    const lessons = mod.lessons.flatMap((lesson) => {
      const where = `"${lesson.title}" (${lesson.id})`;
      if (!/^[\w-]{11}$/.test(lesson.id || '')) problems.push(`${where}: not a YouTube video id`);
      if (!lesson.try?.trim()) problems.push(`${where}: no Try task`);
      const from = lesson.from || 0;
      const to = lesson.to || lesson.seconds;
      if (!(to > from) || to > lesson.seconds) problems.push(`${where}: bad from/to`);
      const clips = splitIntoClips(to - from)
        .map((c) => ({ start: from + c.start, end: from + c.end }));
      const whole = from === 0 && to === lesson.seconds && clips.length === 1;
      return clips.map((clip, c) => {
        const last = c === clips.length - 1;
        return {
          title: clips.length > 1 ? `${lesson.title} (part ${c + 1} of ${clips.length})` : lesson.title,
          description: `Video by ${lesson.by || def.by}`,
          url: `https://www.youtube.com/watch?v=${lesson.id}`,
          startSec: whole ? null : clip.start,
          endSec: whole ? null : clip.end,
          duration: clip.end - clip.start,
          tryTask: last ? lesson.try : SKILL_PART_TRY,
          practiceMinutes: last ? lesson.minutes ?? null : 2,
          check: last && lesson.questions?.length
            ? checkQuestions(lesson.questions, where, problems)
            : null,
        };
      });
    });
    if (!lessons.length) problems.push(`"${mod.title}": no lessons`);
    if (!lessons.some((l) => l.check)) problems.push(`"${mod.title}": no questions for its games`);
    return { title: mod.title, lessons, checkpoint: null };
  });

  const plan = {
    pathway: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      makeTitle: def.makeTitle,
      skillId: def.skillId,
      certification: null,
      kind: 'SKILL',
    },
    modules,
    problems,
  };
  const hours = planMinutes(plan) / 60;
  if (hours > MAX_SKILL_HOURS) problems.push(`${def.title}: about ${Math.round(hours)} hours; a short skill is ${MAX_SKILL_HOURS} at most`);
  return plan;
}

export function planSummary(plan) {
  const lessons = plan.modules.flatMap((m) => m.lessons);
  const questions = lessons.reduce((n, l) => n + (l.check?.length || 0), 0)
    + plan.modules.reduce((n, m) => n + (m.checkpoint?.questions.length || 0), 0);
  return {
    modules: plan.modules.length,
    lessons: lessons.length,
    videoHours: Math.round(lessons.reduce((s, l) => s + l.duration, 0) / 360) / 10,
    longestLesson: Math.max(...lessons.map((l) => l.duration)),
    questions,
    hours: Math.round(planMinutes(plan) / 6) / 10,
  };
}
