import { validateQuestionData } from '../quizGrade';
import { thumbnailUrl } from '../covers';

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

// The module exam, ready to import. Shared by courses and short skills.
function planExam(exam, where, problems) {
  if (!exam) return null;
  const questions = checkQuestions(exam.questions, `${where} exam`, problems);
  const prompts = new Set();
  questions.forEach((qn) => {
    if (prompts.has(qn.prompt)) problems.push(`${where} exam: "${qn.prompt}" is in the bank twice`);
    prompts.add(qn.prompt);
  });
  if (exam.draw && exam.draw > questions.length) problems.push(`${where} exam: draws ${exam.draw} from only ${questions.length}`);
  return {
    title: exam.title,
    timeLimitSec: exam.minutes ? exam.minutes * 60 : 900,
    drawCount: exam.draw || null,
    questions,
  };
}

// def: { slug, title, description, makeTitle, skillId, stages: [{ exam, videos, lessons,
//   modules: [{ title, objectives: [from, to], intro?, checkpoint: { title, minutes?, draw?,
//   questions } }] }] }. A checkpoint is the module exam: `draw` questions per attempt from
//   its bank of `questions`.
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
        checkpoint: planExam(mod.checkpoint, mod.title, problems),
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
      imageUrl: def.cover ? thumbnailUrl(def.cover) : null,
    },
    modules,
    problems,
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

// A module's lessons, written either inline ({ id, title, seconds, ... }) or as video ids.
// Ids are looked up in def.videos (fetched from YouTube: id, title, seconds, by) and
// def.lessons (what we wrote: title, try, minutes, questions, from/to), so titles and
// lengths come from YouTube and only the teaching is typed by hand.
function resolveLessons(def, mod, problems) {
  return mod.lessons.map((entry) => {
    if (typeof entry !== 'string') return entry;
    const video = def.videos?.find((v) => v.id === entry);
    const authored = def.lessons?.[entry];
    if (!video) problems.push(`"${mod.title}": video ${entry} isn't in the video list`);
    if (!authored) problems.push(`"${mod.title}": nothing written for "${video?.title || entry}" (${entry})`);
    return {
      id: entry, title: video?.title, seconds: video?.seconds, by: video?.by, ...authored,
    };
  });
}

// def: { slug, title, description, makeTitle, skillId, by?, cover?, videos?, lessons?,
//   modules: [{ title, lessons: [lesson or video id], checkpoint? }] }
// A lesson is { id, title, seconds, from?, to?, by?, try, minutes, questions? }; checkpoint
// is the module exam, as for courses. `seconds` is the whole video's length; from/to
// (seconds) use just part of it. Anything longer than 10 minutes is split into parts.
function planAuthored(def, { kind, maxHours }) {
  const problems = [];
  const seen = new Set();
  const modules = def.modules.map((mod) => {
    const lessons = resolveLessons(def, mod, problems).flatMap((lesson) => {
      const where = `"${lesson.title}" (${lesson.id})`;
      if (!/^[\w-]{11}$/.test(lesson.id || '')) problems.push(`${where}: not a YouTube video id`);
      const key = `${lesson.id}:${lesson.from || 0}`;
      if (seen.has(key)) problems.push(`${where}: used twice`);
      seen.add(key);
      if (!lesson.title?.trim()) problems.push(`${where}: no title`);
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
    return { title: mod.title, lessons, checkpoint: planExam(mod.checkpoint, `"${mod.title}"`, problems) };
  });

  const used = new Set(def.modules.flatMap((m) => m.lessons.map((l) => (typeof l === 'string' ? l : l.id))));
  Object.keys(def.lessons || {}).forEach((id) => {
    if (!used.has(id)) problems.push(`${def.title}: lesson ${id} is written but in no module`);
  });
  if (def.cover && !used.has(def.cover)) problems.push(`${def.title}: the cover isn't one of its videos`);
  const plan = {
    pathway: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      makeTitle: def.makeTitle,
      skillId: def.skillId,
      certification: def.certification || null,
      kind,
      imageUrl: def.cover ? thumbnailUrl(def.cover) : null,
    },
    modules,
    problems,
  };
  const hours = planMinutes(plan) / 60;
  if (maxHours && hours > maxHours) problems.push(`${def.title}: about ${Math.round(hours)} hours; a short skill is ${maxHours} at most`);
  return plan;
}

export function planSkill(def) {
  return planAuthored(def, { kind: 'SKILL', maxHours: MAX_SKILL_HOURS });
}

// A course in a track, written like a short skill but with no time cap.
export function planCourse(def) {
  return planAuthored(def, { kind: 'COURSE' });
}

// A track is courses taken in order. A course is either built from exam objectives
// (`stages`, see planPathway) or written module by module like a short skill (planCourse).
export function planTrack(def) {
  const courses = def.courses
    .map((course) => (course.stages ? planPathway(course) : planCourse(course)));
  return {
    track: {
      slug: def.slug,
      title: def.title,
      description: def.description,
      makeTitle: def.makeTitle,
      skillId: def.skillId,
      imageUrl: def.cover ? thumbnailUrl(def.cover) : null,
    },
    courses,
    problems: courses.flatMap((c) => c.problems.map((p) => `${c.pathway.title}: ${p}`)),
  };
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
