import { course } from '../../course';
import videos from '../videos/excel.json';
import whatAnalystsDo from './m1-what-analysts-do';
import formulas from './m2-formulas-and-lookups';
import cleaning from './m3-clean-and-format';
import pivots from './m4-pivots-and-charts';
import project from './m5-excel-project';

// Alex The Analyst's Data Fundamentals and the Excel part of his free Data Analyst Bootcamp,
// with a complete Excel basics course from Technology for Teachers and Students first.
export default course({
  slug: 'data-analyst-excel',
  title: 'Excel and Data Foundations',
  description: 'What analysts do and the basics of data, then Excel: formulas, XLOOKUP, cleaning messy data, conditional formatting, pivot tables, charts and a full dashboard project.',
  makeTitle: 'An interactive Excel dashboard built from a messy dataset you cleaned',
  skillId: 'data',
  cover: 'opJgMj1IUrc',
  by: 'Alex The Analyst',
  videos,
}, [whatAnalystsDo, formulas, cleaning, pivots, project]);
