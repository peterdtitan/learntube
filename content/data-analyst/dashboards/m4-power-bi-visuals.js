import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Power BI visuals',
  lessons: {
    ulFY20KTzFQ: {
      title: 'Drill down',
      try: 'Build a date hierarchy (year, quarter, month) on a chart and drill down through it.',
      minutes: 15,
      questions: [
        q.single('Drill down lets viewers…', ['Move from a summary level to more detail, like year to month', 'Edit data', 'Export to Excel only', 'Change colours'], 0),
        q.tf('Drill down works with hierarchies like Year > Quarter > Month.', true),
      ],
    },
    m0h3Ghl6mgY: {
      title: 'Conditional formatting in Power BI',
      try: 'Add colour scales and data bars to a table visual, and colour bars in a chart by a rule.',
      minutes: 15,
      questions: [
        q.single('Conditional formatting in a table can add…', ['Background colours, font colours, data bars and icons', 'New data', 'Relationships', 'Pages'], 0),
        q.single('Colour scales help viewers…', ['Spot high and low values quickly', 'Edit values', 'Hide data', 'Load faster'], 0),
      ],
    },
    '9j_EBt3RNrs': {
      title: 'Bins and lists',
      try: 'Group ages into bins of 10 years and group several categories into one list group.',
      minutes: 15,
      questions: [
        q.single('Binning a numeric field…', ['Groups values into ranges', 'Deletes outliers', 'Sorts values', 'Creates relationships'], 0),
        q.single('A list group combines…', ['Several category values into one group', 'Two tables', 'Two reports', 'Measures'], 0),
      ],
    },
    '3NV5Jtbhfcw': {
      title: 'Popular visualisations',
      try: 'Build a bar chart, line chart, card, matrix and slicer on one page and arrange them neatly.',
      minutes: 20,
      questions: [
        q.single('A slicer…', ['Lets viewers filter the report page', 'Shows a single number', 'Draws a map', 'Writes DAX'], 0),
        q.single('A matrix visual is like…', ['A pivot table', 'A pie chart', 'A slicer', 'A map'], 0),
        q.tf('Too many visuals on one page makes a report harder to read.', true),
      ],
    },
  },
  checkpoint: programExam('Power BI visuals exam', [
    q.single('Drill down moves from…', ['Summary to detail', 'Detail to deletion', 'One report to another always', 'Colour to size'], 0),
    q.single('A date hierarchy usually goes…', ['Year > Quarter > Month > Day', 'Day > Year', 'Month only', 'Random'], 0),
    q.single('Which visual filters other visuals on the page?', ['Slicer', 'Card', 'Textbox', 'Image'], 0),
    q.single('Which visual shows one key number?', ['Card', 'Matrix', 'Line chart', 'Scatter'], 0),
    q.single('Which visual is like an Excel pivot table?', ['Matrix', 'Card', 'Slicer', 'Gauge'], 0),
    q.single('Which visual best shows a trend over time?', ['Line chart', 'Pie chart', 'Card', 'Table'], 0),
    q.single('Which visual compares categories?', ['Bar or column chart', 'Card', 'Gauge', 'Textbox'], 0),
    q.single('Data bars in a table…', ['Show a bar in each cell sized by its value', 'Add new rows', 'Filter data', 'Link tables'], 0),
    q.single('Binning ages by 10 gives groups like…', ['0–9, 10–19, 20–29', 'Male and female', 'January to December', 'High and low only'], 0),
    q.tf('Clicking a bar in one visual can cross-filter the other visuals on the page.', true),
    q.multi('Which make a report page easy to read?', ['A clear title', 'Aligned visuals', 'Consistent colours', 'Ten pie charts'], [0, 1, 2]),
    q.single('Conditional formatting by rules lets you…', ['Colour values that meet conditions, like negative profit in red', 'Change the data', 'Create measures', 'Add pages'], 0),
    q.single('A scatter chart shows…', ['The relationship between two measures', 'A single number', 'A filter', 'A hierarchy'], 0),
    q.single('A map visual needs…', ['A location field, like country or city', 'Only dates', 'A slicer', 'A measure only'], 0),
    q.single('Sorting a bar chart by value helps viewers…', ['See the largest and smallest quickly', 'Hide data', 'Change totals', 'Edit labels'], 0),
    q.order('Put building a report page in order.', ['Decide the questions it answers', 'Add the key visuals', 'Add slicers', 'Align and format', 'Check interactions']),
    q.single('Edit interactions lets you control…', ['How visuals filter or highlight each other', 'Data types', 'Relationships', 'Power Query steps'], 0),
    q.tf('Tooltips can show extra details when hovering over a visual.', true),
    q.single('A list group of “Lagos”, “Abuja” and “Port Harcourt” could be named…', ['Major cities', 'Measures', 'Bins', 'Dates'], 0),
    q.single('This module’s skills help you…', ['Make reports interactive and readable', 'Write SQL', 'Clean data in Excel', 'Install MySQL'], 0),
  ]),
};
