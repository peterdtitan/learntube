import excel from './excel';
import sql from './sql';
import dashboards from './dashboards';

// "Data Analyst": Alex The Analyst's free Data Analyst Bootcamp, one of the most popular free
// routes into data analysis, arranged into three courses.
export default {
  slug: 'data-analyst',
  cover: 'opJgMj1IUrc',
  title: 'Data Analyst',
  description: 'Learn the tools entry-level data analysts use every day: Excel, SQL, and Tableau and Power BI. Clean messy data, find answers, build dashboards, and finish with a portfolio you can show employers.',
  makeTitle: 'A portfolio of an Excel dashboard, a SQL analysis and Tableau and Power BI dashboards',
  skillId: 'data',
  courses: [excel, sql, dashboards],
};
