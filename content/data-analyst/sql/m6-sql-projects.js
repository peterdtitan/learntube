import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'SQL projects and interview practice',
  lessons: {
    '4UltKCnnnTA': {
      title: 'Data cleaning project',
      try: 'Follow the project: copy the raw table to a staging table, remove duplicates, standardise text, handle nulls and blanks, and drop columns you don’t need.',
      minutes: 150,
      questions: [
        q.single('Why clean data in a staging (copy) table?', ['So the raw data stays safe if something goes wrong', 'It is faster', 'Raw tables can’t be read', 'To delete the raw data'], 0),
        q.single('A common way to find duplicates in SQL is…', ['ROW_NUMBER() OVER(PARTITION BY all the key columns) and keep rows numbered 1', 'ORDER BY id', 'COUNT(*) only', 'DELETE everything'], 0),
        q.tf('Standardising values (like trimming spaces and fixing spelling variants) is part of cleaning.', true),
      ],
    },
    'QYd-RtK58VQ': {
      title: 'Exploratory data analysis project',
      try: 'Explore your cleaned data: totals by group, the biggest values, trends by year and a rolling total. Write three findings and log them with your SQL as your make.',
      minutes: 120,
      questions: [
        q.single('Exploratory data analysis (EDA) means…', ['Exploring data to find patterns, trends and questions', 'Deleting data', 'Building a database', 'Writing a report only'], 0),
        q.single('A rolling total over months shows…', ['How the total builds up month by month', 'Only the last month', 'The average', 'Duplicates'], 0),
      ],
    },
    ZHaYOC0H5KE: {
      title: 'Easy SQL interview questions',
      try: 'Solve three easy SQL practice questions on a free site before watching how they’re solved.',
      minutes: 30,
      questions: [
        q.tf('Practising interview questions builds speed and confidence for job interviews.', true),
        q.single('When an interview question is unclear, you should…', ['Ask clarifying questions about the data and expected output', 'Guess silently', 'Skip it', 'Write any query'], 0),
      ],
    },
    'fT-8mRf_-Hk': {
      title: 'Medium SQL interview questions',
      try: 'Solve two medium questions that need a join or a window function.',
      minutes: 30,
      questions: [
        q.single('Medium SQL questions often need…', ['Joins, CASE or window functions', 'Only SELECT *', 'No SQL', 'Excel'], 0),
        q.tf('Explaining your thinking out loud is valued in technical interviews.', true),
      ],
    },
  },
  checkpoint: programExam('SQL projects exam', [
    q.order('Put the data cleaning steps from the project in order.', ['Make a staging copy of the raw data', 'Remove duplicates', 'Standardise the data', 'Handle nulls and blanks', 'Remove columns and rows you don’t need']),
    q.single('TRIM in a cleaning project fixes…', ['Leading and trailing spaces', 'Duplicates', 'Nulls', 'Dates'], 0),
    q.single('Converting a text date column to a real DATE type lets you…', ['Sort and group by date correctly', 'Make it uppercase', 'Remove duplicates', 'Hide it'], 0),
    q.single('“Crypto”, “Crypto Currency” and “CryptoCurrency” in one column should be…', ['Standardised to one value', 'Left alone', 'Deleted', 'Summed'], 0),
    q.single('Rows where every important value is NULL are often…', ['Removed, after checking they can’t be filled', 'Kept as they are always', 'Duplicated', 'Renamed'], 0),
    q.single('Filling a blank industry from another row of the same company uses…', ['A self join', 'A UNION', 'A trigger', 'LIMIT'], 0),
    q.single('Before deleting rows you think are duplicates, you should…', ['SELECT them first to check', 'Delete straight away', 'Drop the table', 'Restart MySQL'], 0),
    q.single('EDA is about…', ['Finding patterns and asking questions of the data', 'Building dashboards only', 'Creating databases', 'Writing triggers'], 0),
    q.multi('Which are useful EDA queries?', ['Totals by category', 'Top 5 by a value', 'Trends by year or month', 'DROP TABLE'], [0, 1, 2]),
    q.single('To find the top 5 companies by total layoffs, you would use…', ['SUM, GROUP BY, ORDER BY … DESC and LIMIT 5', 'COUNT(*) only', 'UNION', 'A trigger'], 0),
    q.single('To rank companies by layoffs within each year, you would use…', ['DENSE_RANK() OVER(PARTITION BY year ORDER BY total DESC)', 'GROUP BY company only', 'LIMIT 5', 'A UNION'], 0),
    q.single('A rolling total uses…', ['SUM(…) OVER(ORDER BY month)', 'GROUP BY month only', 'MAX(month)', 'LIMIT'], 0),
    q.tf('Keeping the raw table untouched lets you start over if a cleaning step goes wrong.', true),
    q.single('In an interview, if you’re unsure what output is expected you should…', ['Ask clarifying questions', 'Guess', 'Stay silent', 'Give up'], 0),
    q.single('Which shows the year with the most layoffs?', ['SUM by YEAR(date), ORDER BY the sum DESC, LIMIT 1', 'MAX(date)', 'COUNT(*)', 'MIN(year)'], 0),
    q.single('A CTE is helpful in EDA because…', ['It breaks a complex query into readable steps', 'It deletes data', 'It is permanent', 'It sends emails'], 0),
    q.tf('Writing down findings in plain language is part of an analyst’s job.', true),
    q.single('A good portfolio SQL project shows…', ['Cleaning, analysis and clear findings', 'Only SELECT *', 'Only a schema', 'Nothing'], 0),
    q.single('YEAR(\'2023-03-15\') returns…', ['2023', '03', '15', '“2023-03”'], 0),
    q.single('Where should you share your SQL project for employers to see?', ['A portfolio site or GitHub, with a short write-up', 'Nowhere', 'Only on paper', 'In a private chat'], 0),
  ]),
};
