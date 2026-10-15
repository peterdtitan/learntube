import { course } from '../../course';
import videos from '../videos/sql.json';
import firstQueries from './m1-select-and-where';
import groupAndSort from './m2-group-and-sort';
import joins from './m3-joins-and-unions';
import functions from './m4-functions-and-windows';
import advanced from './m5-advanced-sql';
import projects from './m6-sql-projects';

// The MySQL part of Alex The Analyst's free Data Analyst Bootcamp: beginner to advanced
// queries, two full projects, and interview practice.
export default course({
  slug: 'data-analyst-sql',
  title: 'SQL for Data Analysis',
  description: 'Query databases with MySQL: SELECT and WHERE, grouping and sorting, joins and unions, string functions, CASE, subqueries, window functions, CTEs, stored procedures and triggers, then a full cleaning project and exploratory analysis.',
  makeTitle: 'A cleaned dataset and an exploratory analysis written in SQL, with your findings',
  skillId: 'data',
  cover: 'lXQzD09BOH0',
  by: 'Alex The Analyst',
  videos,
}, [firstQueries, groupAndSort, joins, functions, advanced, projects]);
