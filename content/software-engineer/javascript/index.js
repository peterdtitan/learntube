import { course } from '../../course';
import videos from '../videos/javascript.json';
import firstSteps from './m1-first-steps';
import decisions from './m2-maths-and-decisions';
import loops from './m3-strings-logic-loops';
import functions from './m4-functions-and-arrays';
import arrayMethods from './m5-callbacks-and-array-methods';
import classes from './m6-objects-and-classes';
import data from './m7-working-with-data';
import projects from './m8-projects-modules-errors';

// The first part of Bro Code's free JavaScript course: the language itself, with a small
// project after most topics.
export default course({
  slug: 'software-engineer-javascript',
  title: 'JavaScript Fundamentals',
  description: 'Learn to program in JavaScript: variables, maths, decisions, strings, loops, functions, arrays, callbacks, map, filter and reduce, objects and classes, dates, closures, modules and error handling, building a small app after most topics.',
  makeTitle: 'A set of working JavaScript apps: a counter, guessing game, converter, dice roller, password generator, clock, stopwatch and calculator',
  skillId: 'software-engineering',
  cover: 'Ihy0QziLDf0',
  by: 'Bro Code',
  videos,
}, [firstSteps, decisions, loops, functions, arrayMethods, classes, data, projects]);
