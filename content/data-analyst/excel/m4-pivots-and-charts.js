import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Pivot tables and charts',
  lessons: {
    lH7HfwUFnYA: {
      title: 'Pivot tables',
      try: 'Insert a pivot table from your sales table: products in Rows, sum of Total in Values, and a region or month in Columns.',
      minutes: 30,
      questions: [
        q.single('A pivot table…', ['Summarises large data quickly, like totals per category', 'Draws pictures', 'Cleans data', 'Deletes rows'], 0),
        q.single('In a pivot table, the numbers you want to summarise go in…', ['Values', 'Rows', 'Filters', 'Columns only'], 0),
        q.tf('After the source data changes, you need to refresh the pivot table.', true),
      ],
    },
    gMAHXrty6wI: {
      title: 'Charts in Excel',
      try: 'Make a column chart of sales by product and a line chart of sales by month. Give each a clear title.',
      minutes: 25,
      questions: [
        q.single('Which chart best shows a trend over time?', ['A line chart', 'A pie chart', 'A table', 'A donut'], 0),
        q.single('Which chart best compares categories?', ['A column or bar chart', 'A line chart of one point', 'A scatter plot', 'No chart'], 0),
        q.tf('A clear title and labelled axes make a chart easier to understand.', true),
      ],
    },
  },
  checkpoint: programExam('Pivot tables and charts exam', [
    q.multi('Which are the four areas of a pivot table?', ['Rows', 'Columns', 'Values', 'Filters'], [0, 1, 2, 3]),
    q.single('To see total sales per product, put Product in Rows and Sales in…', ['Values', 'Filters', 'Columns only', 'Nowhere'], 0),
    q.single('By default, a pivot table summarises numbers by…', ['Sum', 'Average', 'Max', 'Count of text'], 0),
    q.single('To show how many orders each product had, set the value to…', ['Count', 'Sum', 'Max', 'Min'], 0),
    q.single('A slicer lets you…', ['Filter a pivot table with clickable buttons', 'Delete rows', 'Create a formula', 'Change fonts'], 0),
    q.tf('A pivot table doesn’t change the original data.', true),
    q.single('After adding new rows to the source table, the pivot table needs…', ['Refreshing', 'Deleting', 'Nothing ever', 'Printing'], 0),
    q.single('A pivot chart is…', ['A chart linked to a pivot table that updates with it', 'A chart drawn by hand', 'An image', 'A table'], 0),
    q.single('Which chart shows parts of a whole with a few categories?', ['Pie chart', 'Line chart', 'Scatter plot', 'Histogram'], 0),
    q.single('Which chart shows the relationship between two numeric variables?', ['Scatter plot', 'Pie chart', 'Bar chart', 'Table'], 0),
    q.single('Which chart shows monthly revenue over two years?', ['Line chart', 'Pie chart', 'Donut', 'Map'], 0),
    q.single('Long category names often fit better on…', ['A horizontal bar chart', 'A pie chart', 'A line chart', 'A gauge'], 0),
    q.single('A pie chart with 15 slices is…', ['Hard to read; use a bar chart instead', 'Ideal', 'Required', 'The clearest option'], 0),
    q.multi('Which make a chart clear?', ['A descriptive title', 'Labelled axes', 'Sorted bars', 'Lots of 3D effects'], [0, 1, 2]),
    q.single('Grouping dates in a pivot table lets you summarise by…', ['Month, quarter or year', 'Colour', 'Font', 'Formula'], 0),
    q.tf('Pivot tables can show percentages of the total instead of raw numbers.', true),
    q.order('Put building a pivot table in order.', ['Make sure the data is a clean table', 'Insert a pivot table', 'Drag fields into Rows and Values', 'Add filters or slicers', 'Build a chart from it']),
    q.single('Starting a column chart’s axis at zero helps…', ['Show differences honestly', 'Exaggerate changes', 'Hide data', 'Make it colourful'], 0),
    q.single('A pivot table is best built from…', ['A clean table with one header row', 'Merged cells', 'Blank columns', 'Multiple header rows'], 0),
    q.single('What is the main benefit of pivot tables?', ['Fast summaries without writing formulas', 'They clean data', 'They delete duplicates', 'They send emails'], 0),
  ]),
};
