import { course } from '../../course';
import videos from '../videos/dashboards.json';
import tableauBasics from './m1-tableau-basics';
import tableauProject from './m2-tableau-project';
import powerBiBasics from './m3-power-bi-basics';
import powerBiVisuals from './m4-power-bi-visuals';
import powerBiProject from './m5-power-bi-project';
import getHired from './m6-get-hired';

// The Tableau, Power BI and career parts of Alex The Analyst's free Data Analyst Bootcamp.
export default course({
  slug: 'data-analyst-dashboards',
  title: 'Dashboards with Tableau and Power BI',
  description: 'Turn data into interactive dashboards in Tableau and Power BI: charts, calculated fields, Power Query, relationships, DAX and two full projects. Then build your portfolio, CV and LinkedIn to get hired.',
  makeTitle: 'Two published dashboards and a portfolio site with your projects',
  skillId: 'data',
  cover: 'pixlHHe_lNQ',
  by: 'Alex The Analyst',
  videos,
}, [tableauBasics, tableauProject, powerBiBasics, powerBiVisuals, powerBiProject, getHired]);
