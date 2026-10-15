import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Tableau basics',
  lessons: {
    '6xv1KvCMF1Q': {
      title: 'Install Tableau and make your first chart',
      try: 'Install Tableau Public (free), connect to the practice dataset from the video, and build your first bar chart.',
      minutes: 30,
      questions: [
        q.single('Tableau Public is…', ['A free version of Tableau that saves work publicly online', 'A spreadsheet', 'A database', 'A paid-only tool'], 0),
        q.single('In Tableau, fields like Region or Product are usually…', ['Dimensions (categories)', 'Measures (numbers)', 'Filters only', 'Calculations'], 0),
        q.single('In Tableau, fields like Sales or Profit are usually…', ['Measures', 'Dimensions', 'Sheets', 'Dashboards'], 0),
      ],
    },
    f6qxxtWkaUg: {
      title: 'Calculated fields and bins',
      try: 'Create a calculated field (like profit margin = Profit / Sales) and bin a numeric field to build a histogram.',
      minutes: 15,
      questions: [
        q.single('A calculated field…', ['Creates a new field from a formula', 'Deletes a field', 'Renames a sheet', 'Joins tables'], 0),
        q.single('Bins group a numeric field into…', ['Ranges, for example for a histogram', 'Colours', 'Sheets', 'Joins'], 0),
      ],
    },
    ebjDwX8sUMk: {
      title: 'Create visualisations',
      try: 'Build a line chart over time, a map and a stacked bar chart from the same data.',
      minutes: 25,
      questions: [
        q.single('Dragging a date field to Columns and a measure to Rows usually makes…', ['A line chart over time', 'A pie chart', 'A table only', 'A map'], 0),
        q.single('The Marks card controls…', ['Colour, size, labels and detail of the marks', 'The data source', 'The file name', 'Joins'], 0),
      ],
    },
    'A4SVUF-fTwc': {
      title: 'Joins in Tableau',
      try: 'Join two tables in the data source pane and check how the row count changes with inner and left joins.',
      minutes: 25,
      questions: [
        q.single('Joins in Tableau are set up in…', ['The data source pane', 'The Marks card', 'The dashboard', 'Filters'], 0),
        q.tf('Tableau joins follow the same ideas as SQL joins: inner, left, right and full outer.', true),
      ],
    },
  },
  checkpoint: programExam('Tableau basics exam', [
    q.single('Dimensions in Tableau are…', ['Qualitative fields used to group and slice data', 'Numbers you aggregate', 'Charts', 'Filters only'], 0),
    q.single('Measures in Tableau are…', ['Numeric fields you aggregate, like SUM(Sales)', 'Categories', 'Sheets', 'Colours'], 0),
    q.single('By default, Tableau aggregates a measure using…', ['SUM', 'COUNT', 'AVG', 'MAX'], 0),
    q.single('The Rows and Columns shelves decide…', ['The structure of the view', 'The data source', 'The file name', 'The colour palette only'], 0),
    q.single('Show Me suggests…', ['Chart types that fit the fields you’ve selected', 'Joins', 'Data sources', 'Formulas'], 0),
    q.single('A calculated field like [Profit] / [Sales] gives…', ['Profit margin', 'Total sales', 'A count', 'A date'], 0),
    q.single('A histogram is built from…', ['Bins of a numeric field', 'A date only', 'A pie chart', 'Joins'], 0),
    q.single('A map in Tableau needs…', ['A geographic field like country or city', 'Only numbers', 'A join', 'A calculated field always'], 0),
    q.single('Putting a dimension on Colour in the Marks card…', ['Colours the marks by category', 'Filters the view', 'Joins a table', 'Changes the data type'], 0),
    q.single('A dashboard in Tableau combines…', ['Several sheets into one view', 'Data sources', 'Joins only', 'Calculated fields only'], 0),
    q.single('A LEFT join in Tableau keeps…', ['All rows from the left table', 'Only matches', 'All rows from the right table', 'Nothing'], 0),
    q.tf('Tableau Public saves your work to the public web, so don’t use private data in it.', true),
    q.multi('Which can go on the Marks card?', ['Colour', 'Size', 'Label', 'Data source'], [0, 1, 2]),
    q.single('A green pill in Tableau means the field is…', ['Continuous', 'Discrete', 'Broken', 'Hidden'], 0),
    q.single('A blue pill in Tableau means the field is…', ['Discrete', 'Continuous', 'An error', 'A filter only'], 0),
    q.single('Filters in Tableau…', ['Limit which data appears in the view', 'Delete data', 'Change the source file', 'Create joins'], 0),
    q.order('Put building a Tableau chart in order.', ['Connect to the data', 'Drag fields to Rows and Columns', 'Refine with the Marks card', 'Add filters and titles']),
    q.single('Which chart is best for sales across months?', ['Line chart', 'Pie chart', 'Map', 'Histogram'], 0),
    q.tf('Calculated fields don’t change your original data file.', true),
    q.single('Joining two tables on a non-unique key can…', ['Duplicate rows and inflate totals', 'Remove all rows', 'Fix errors', 'Do nothing'], 0),
  ]),
};
