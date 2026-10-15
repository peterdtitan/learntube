import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Power BI basics',
  lessons: {
    'g0m5sEHPU-s': {
      title: 'Install Power BI and build your first visual',
      try: 'Install Power BI Desktop (free, on Windows), load the practice data, and build a column chart.',
      minutes: 25,
      questions: [
        q.single('Power BI Desktop is…', ['A free Microsoft app for building reports and dashboards', 'A database', 'A spreadsheet', 'A web browser'], 0),
        q.single('In Power BI, you build visuals on…', ['The report canvas', 'The data source', 'Power Query only', 'A slicer'], 0),
      ],
    },
    'gP-AxNi6uxo': {
      title: 'Power Query',
      try: 'Open Transform Data, fix data types, remove an unneeded column, and split a column. Look at the Applied Steps list.',
      minutes: 25,
      questions: [
        q.single('Power Query is used to…', ['Clean and transform data before it reaches the report', 'Draw charts', 'Publish reports', 'Write DAX only'], 0),
        q.single('Applied Steps in Power Query…', ['Record every change so they repeat on refresh', 'Delete data', 'Are charts', 'Are filters on visuals'], 0),
        q.tf('Changes in Power Query don’t alter your original source file.', true),
      ],
    },
    sW5LoDA1ssM: {
      title: 'Relationships',
      try: 'In Model view, connect two tables with a relationship on their shared column, and check the cardinality (one-to-many).',
      minutes: 15,
      questions: [
        q.single('A relationship in Power BI links tables…', ['On a shared column so visuals can use both', 'By stacking rows', 'By deleting duplicates', 'By sorting'], 0),
        q.single('A one-to-many relationship means…', ['Each value in one table matches many rows in the other', 'Every row matches every row', 'No rows match', 'Only one row exists'], 0),
      ],
    },
    vcijg0gUXSg: {
      title: 'DAX',
      try: 'Create a measure for total sales and one for profit margin, and use them in a card and a table.',
      minutes: 25,
      questions: [
        q.single('DAX is…', ['The formula language of Power BI', 'A chart type', 'A database', 'A file type'], 0),
        q.single('A measure in Power BI…', ['Is calculated on the fly for whatever the visual is showing', 'Is stored for every row', 'Is a table', 'Is a filter'], 0),
        q.tf('A calculated column is computed for each row and stored in the table.', true),
      ],
    },
  },
  checkpoint: programExam('Power BI basics exam', [
    q.single('Power BI Desktop runs on…', ['Windows', 'Only Mac', 'Only phones', 'Only Linux'], 0),
    q.order('Put the Power BI workflow in order.', ['Get data', 'Transform it in Power Query', 'Model relationships', 'Build visuals', 'Publish and share']),
    q.single('Power Query is where you…', ['Clean and shape the data', 'Draw visuals', 'Publish reports', 'Write emails'], 0),
    q.single('Applied Steps repeat when you…', ['Refresh the data', 'Close Power BI', 'Add a visual', 'Change colour'], 0),
    q.single('Setting the correct data type (number, date, text) in Power Query…', ['Lets calculations and sorting work properly', 'Is cosmetic only', 'Deletes data', 'Changes the source file'], 0),
    q.single('Model view shows…', ['Tables and the relationships between them', 'The report canvas', 'Raw data only', 'DAX code only'], 0),
    q.single('Most relationships in a sales model are…', ['One-to-many, from a lookup table to a fact table', 'Many-to-many', 'None', 'One-to-one always'], 0),
    q.single('A fact table usually holds…', ['Transactions, like each sale', 'Product descriptions only', 'Colours', 'Report titles'], 0),
    q.single('A dimension (lookup) table usually holds…', ['Descriptive details, like product names or regions', 'Every sale', 'Measures', 'Charts'], 0),
    q.single('DAX stands for…', ['Data Analysis Expressions', 'Data And eXcel', 'Dynamic Axis', 'Database Access'], 0),
    q.single('Total Sales = SUM(Sales[Amount]) is…', ['A DAX measure', 'A Power Query step', 'A relationship', 'A visual'], 0),
    q.single('Measures differ from calculated columns because they…', ['Calculate in the context of each visual, not stored per row', 'Are stored per row', 'Cannot sum', 'Are only text'], 0),
    q.single('CALCULATE in DAX…', ['Evaluates an expression with changed filters', 'Deletes data', 'Draws charts', 'Imports files'], 0),
    q.tf('Relationships let one visual use fields from several tables.', true),
    q.multi('Which are Power BI views?', ['Report', 'Data (table)', 'Model', 'Slides'], [0, 1, 2]),
    q.single('Removing unneeded columns in Power Query…', ['Makes the model smaller and faster', 'Deletes them from the source file', 'Breaks every report', 'Is impossible'], 0),
    q.single('A card visual shows…', ['A single number, like total sales', 'A full table', 'A map', 'A trend'], 0),
    q.single('Which DAX divides safely, avoiding divide-by-zero errors?', ['DIVIDE()', 'SAFE()', '/ only', 'SPLIT()'], 0),
    q.tf('Power BI and Excel both use Power Query.', true),
    q.single('A star schema has…', ['One fact table connected to several dimension tables', 'One giant table', 'No relationships', 'Only measures'], 0),
  ]),
};
