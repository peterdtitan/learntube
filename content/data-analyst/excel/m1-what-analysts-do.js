import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'What data analysts do',
  lessons: {
    CUBfrdDwznQ: {
      title: 'How to become a data analyst',
      try: 'Write down the three tools from the video you will learn in this program (Excel, SQL and a dashboard tool) and the kind of data you’d like to analyse.',
      minutes: 15,
      questions: [
        q.multi('Which are core tools for most entry-level data analyst jobs?', ['Excel', 'SQL', 'A dashboard tool like Power BI or Tableau', 'Photoshop'], [0, 1, 2]),
        q.single('A data analyst’s main job is to…', ['Turn data into answers that help people make decisions', 'Fix computers', 'Design logos', 'Write novels'], 0),
        q.tf('A portfolio of projects helps you get a data analyst job.', true),
      ],
    },
    'PEWMgtu-1e4': {
      title: 'What is data?',
      try: 'List five kinds of data you create in a normal day (for example messages, purchases, steps walked).',
      minutes: 10,
      questions: [
        q.single('Structured data is…', ['Organised in rows and columns, like a spreadsheet', 'Free-form, like videos and emails', 'Always numbers', 'Always secret'], 0),
        q.single('Which is unstructured data?', ['A folder of customer emails', 'A sales table with columns', 'A list of prices', 'A database of orders'], 0),
      ],
    },
    ItZlTixh6Bs: {
      title: 'KPIs and metrics',
      try: 'Pick a small business you know. Write two metrics it could track and say which one is its KPI.',
      minutes: 10,
      questions: [
        q.single('A KPI is…', ['A key metric tied directly to a business goal', 'Any number at all', 'A type of chart', 'A database'], 0),
        q.tf('Every KPI is a metric, but not every metric is a KPI.', true),
      ],
    },
    hXpt8zj_ajc: {
      title: 'Data types',
      try: 'Open any spreadsheet and label each column as text, number, date or true/false.',
      minutes: 10,
      questions: [
        q.match('Match each value to its data type.', [['“Lagos”', 'Text (string)'], ['42.5', 'Number'], ['2026-10-16', 'Date'], ['TRUE', 'Boolean']]),
        q.single('Storing numbers as text can cause…', ['Formulas and sorting to go wrong', 'Faster maths', 'Better charts', 'Nothing at all'], 0),
      ],
    },
    OcG0B4ny1cE: {
      title: 'File types',
      try: 'Save a small spreadsheet as both .xlsx and .csv, then open the CSV in a text editor to see what it really is.',
      minutes: 10,
      questions: [
        q.single('A CSV file is…', ['Plain text with values separated by commas', 'An Excel workbook with formatting', 'An image', 'A database server'], 0),
        q.single('Which file type keeps Excel formulas and formatting?', ['.xlsx', '.csv', '.txt', '.json'], 0),
      ],
    },
    cd_jj0IRmaA: {
      title: 'Data collection',
      try: 'Design a five-question survey for a real question you have, and decide whether its data will be primary or secondary.',
      minutes: 10,
      questions: [
        q.single('Primary data is…', ['Collected yourself for your own purpose', 'Downloaded from someone else', 'Always numbers', 'Always free'], 0),
        q.single('Secondary data is…', ['Collected by someone else, often for another purpose', 'Collected by you', 'Fake data', 'Only from surveys'], 0),
      ],
    },
    WpX2F2BS3Qc: {
      title: 'Data cleaning',
      try: 'Look at a messy list (names, phone numbers or prices) and list every problem you can find: duplicates, blanks, spelling, formats.',
      minutes: 10,
      questions: [
        q.multi('Which are common data cleaning tasks?', ['Removing duplicates', 'Fixing inconsistent formats', 'Handling missing values', 'Making up missing numbers'], [0, 1, 2]),
        q.tf('Analysts often spend a large share of their time cleaning data.', true),
      ],
    },
  },
  checkpoint: programExam('Data fundamentals exam', [
    q.single('A data analyst mainly…', ['Turns data into answers and insights for decisions', 'Builds websites', 'Repairs networks', 'Designs products'], 0),
    q.multi('Which are core data analyst tools?', ['Excel', 'SQL', 'Power BI or Tableau', 'A soldering iron'], [0, 1, 2]),
    q.single('Structured data is stored…', ['In rows and columns', 'As free text', 'As images', 'As audio'], 0),
    q.single('Which is an example of unstructured data?', ['Customer reviews written as free text', 'A table of orders', 'A list of dates', 'A column of prices'], 0),
    q.single('Quantitative data is…', ['Measured in numbers', 'Descriptive words', 'Always dates', 'Always images'], 0),
    q.single('Qualitative data is…', ['Descriptive, like opinions or categories', 'Always numeric', 'A file type', 'A chart'], 0),
    q.single('A KPI is…', ['A key metric tied to a goal', 'Any metric', 'A file format', 'A data type'], 0),
    q.single('For an online shop, which is most likely a KPI?', ['Monthly revenue', 'The colour of the logo', 'Number of office chairs', 'The CEO’s birthday'], 0),
    q.tf('A metric is any measured value; a KPI is a metric chosen because it tracks a key goal.', true),
    q.single('“TRUE” and “FALSE” are which data type?', ['Boolean', 'Text', 'Date', 'Number'], 0),
    q.single('A CSV file stores…', ['Plain-text values separated by commas', 'Charts and formatting', 'Images', 'Formulas'], 0),
    q.single('Which file type would an API most often return?', ['JSON', 'XLSX', 'PNG', 'MP3'], 0),
    q.single('A survey you design and run yourself produces…', ['Primary data', 'Secondary data', 'Fake data', 'Metadata only'], 0),
    q.single('Government census data you download is…', ['Secondary data', 'Primary data', 'Unstructured always', 'Not data'], 0),
    q.multi('Which are data quality problems?', ['Duplicates', 'Missing values', 'Inconsistent spelling', 'A clear header row'], [0, 1, 2]),
    q.single('Why clean data before analysing it?', ['Dirty data gives wrong answers', 'It makes files bigger', 'It is required by law always', 'It looks nicer only'], 0),
    q.order('Put a basic analysis process in order.', ['Ask a clear question', 'Collect the data', 'Clean the data', 'Analyse it', 'Share the findings']),
    q.single('Storing dates as text usually means…', ['You can’t sort or calculate with them properly', 'They sort perfectly', 'They become numbers', 'Nothing changes'], 0),
    q.tf('A portfolio of real projects helps prove your skills to employers.', true),
    q.single('Which question is best for an analysis?', ['“Which product sold most in each region last quarter?”', '“Is data good?”', '“What is Excel?”', '“Make a chart”'], 0),
  ]),
};
