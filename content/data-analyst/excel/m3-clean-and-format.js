import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Clean and format data',
  lessons: {
    _jmiEGZ6PIY: {
      title: 'Cleaning data in Excel',
      try: 'Download the messy file from the video (or use your own). Remove duplicates, TRIM extra spaces, fix capitalisation and split one column with Text to Columns.',
      minutes: 40,
      questions: [
        q.single('=TRIM(A2) removes…', ['Extra spaces from the text', 'Duplicates', 'Numbers', 'Formatting'], 0),
        q.single('=PROPER("ada OBI") returns…', ['“Ada Obi”', '“ADA OBI”', '“ada obi”', '“Ada OBI”'], 0),
        q.single('Text to Columns is used to…', ['Split one column into several, for example by a comma', 'Join columns', 'Delete columns', 'Make a chart'], 0),
      ],
    },
    _eZRkmRfVTM: {
      title: 'Conditional formatting',
      try: 'Highlight sales over 100 in green, add data bars to the Total column, and highlight duplicate customer names.',
      minutes: 30,
      questions: [
        q.single('Conditional formatting changes a cell’s look…', ['Automatically when it meets a rule', 'Only when you click it', 'Only when printing', 'Never'], 0),
        q.multi('Which are types of conditional formatting?', ['Data bars', 'Colour scales', 'Icon sets', 'Pivot tables'], [0, 1, 2]),
        q.tf('Conditional formatting doesn’t change the values in the cells.', true),
      ],
    },
  },
  checkpoint: programExam('Cleaning and formatting exam', [
    q.single('Remove Duplicates in Excel…', ['Deletes rows that repeat in the columns you choose', 'Hides duplicates only', 'Counts duplicates', 'Highlights them'], 0),
    q.single('=TRIM(" Lagos ") returns…', ['“Lagos”', '“ Lagos ”', '“LAGOS”', 'An error'], 0),
    q.single('=UPPER("abuja") returns…', ['“ABUJA”', '“Abuja”', '“abuja”', 'An error'], 0),
    q.single('=PROPER("kano CITY") returns…', ['“Kano City”', '“KANO CITY”', '“kano city”', '“Kano city”'], 0),
    q.single('=LEFT("NG-2026",2) returns…', ['“NG”', '“26”', '“NG-”', '“2026”'], 0),
    q.single('=LEN("Excel") returns…', ['5', '4', '6', '“Excel”'], 0),
    q.single('Text to Columns can split “Obi, Ada” into…', ['Two columns using the comma as the delimiter', 'Three rows', 'One number', 'A chart'], 0),
    q.single('Find & Replace is useful for…', ['Fixing the same error everywhere at once', 'Building pivot tables', 'Making charts', 'Protecting the sheet'], 0),
    q.single('Before deleting data while cleaning, you should…', ['Keep a copy of the original', 'Delete the original', 'Close Excel', 'Print it'], 0),
    q.multi('Which are signs of dirty data?', ['“Lagos”, “lagos” and “LAGOS” in one column', 'Blank cells where values should be', 'Numbers stored as text', 'Consistent date formats'], [0, 1, 2]),
    q.single('Conditional formatting with a colour scale shows…', ['Low to high values as a colour gradient', 'Only duplicates', 'Only errors', 'Only text'], 0),
    q.single('Data bars show…', ['A bar inside each cell sized by its value', 'A separate chart', 'Errors', 'Filters'], 0),
    q.single('“Highlight Duplicate Values” helps you…', ['Spot repeated entries before removing them', 'Delete everything', 'Sum values', 'Split columns'], 0),
    q.tf('Conditional formatting can use a formula as its rule.', true),
    q.single('Filtering a column for blanks helps you…', ['Find missing values', 'Make a chart', 'Remove formatting', 'Protect the sheet'], 0),
    q.single('Consistent date formats matter because…', ['Sorting and date maths depend on real dates', 'They look prettier only', 'Excel requires one format by law', 'They make files smaller'], 0),
    q.order('Put a basic cleaning routine in order.', ['Make a copy of the raw data', 'Remove duplicates', 'Fix spacing and capitalisation', 'Split or standardise columns', 'Check for blanks and errors']),
    q.single('Icon sets in conditional formatting show…', ['Arrows, flags or symbols based on values', 'Images from the web', 'Chart icons', 'File types'], 0),
    q.single('Which keeps the original value but changes only how it looks?', ['Formatting', 'Remove Duplicates', 'Text to Columns', 'Delete'], 0),
    q.tf('Clean data is essential for accurate pivot tables and charts.', true),
  ]),
};
