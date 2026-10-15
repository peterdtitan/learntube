import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Your first queries',
  lessons: {
    wgRwITQHszU: {
      title: 'Install MySQL and create a database',
      try: 'Install MySQL Community Server and MySQL Workbench (free), then create the practice database from the video.',
      minutes: 30,
      questions: [
        q.single('MySQL is…', ['A relational database management system', 'A spreadsheet', 'A programming language for websites only', 'A chart tool'], 0),
        q.single('MySQL Workbench is…', ['A program for writing and running queries against MySQL', 'A database itself', 'A web browser', 'An Excel add-in'], 0),
        q.tf('A database can hold many tables.', true),
      ],
    },
    HYD8KjPB9F8: {
      title: 'The SELECT statement',
      try: 'Write queries that select all columns from a table, then just two columns, then a calculated column (like age + 10).',
      minutes: 20,
      questions: [
        q.single('SELECT * FROM employees returns…', ['Every column of every row in employees', 'Only the first row', 'Only the column names', 'Nothing'], 0),
        q.single('SELECT DISTINCT gender FROM employees returns…', ['Each different gender once', 'Every row', 'The count of genders', 'An error'], 0),
        q.tf('You can do arithmetic in a SELECT, like SELECT salary * 1.1.', true),
      ],
    },
    MARn_mssG4A: {
      title: 'The WHERE clause',
      try: 'Filter a table with WHERE using =, >, AND, OR and a LIKE pattern (for example names starting with “A”).',
      minutes: 20,
      questions: [
        q.single('WHERE salary > 50000 keeps…', ['Rows where salary is more than 50000', 'All rows', 'Columns named salary', 'The top 50000 rows'], 0),
        q.single('In LIKE patterns, % matches…', ['Any number of characters', 'Exactly one character', 'Only numbers', 'Nothing'], 0),
        q.single('In LIKE patterns, _ matches…', ['Exactly one character', 'Any number of characters', 'A space only', 'Nothing'], 0),
      ],
    },
  },
  checkpoint: programExam('First queries exam', [
    q.single('SQL stands for…', ['Structured Query Language', 'Simple Question Language', 'Sorted Query List', 'System Quality Logic'], 0),
    q.single('A table in a relational database is made of…', ['Rows (records) and columns (fields)', 'Slides', 'Charts', 'Files only'], 0),
    q.single('Which clause names the table to read from?', ['FROM', 'WHERE', 'SELECT', 'ORDER'], 0),
    q.single('SELECT first_name, age FROM employees returns…', ['Only those two columns', 'All columns', 'Only first_name', 'An error'], 0),
    q.single('Which removes duplicate rows from the results?', ['DISTINCT', 'UNIQUE ROWS', 'DELETE', 'LIMIT'], 0),
    q.single('WHERE city = \'Lagos\' AND age > 30 keeps rows where…', ['Both conditions are true', 'Either is true', 'Neither is true', 'Only the city matches'], 0),
    q.single('WHERE city = \'Lagos\' OR city = \'Abuja\' keeps rows where…', ['City is Lagos or Abuja', 'City is both', 'City is neither', 'All rows'], 0),
    q.single('WHERE name LIKE \'A%\' matches names that…', ['Start with A', 'End with A', 'Contain only A', 'Are exactly “A%”'], 0),
    q.single('WHERE name LIKE \'%son\' matches names that…', ['End with “son”', 'Start with “son”', 'Are exactly “son”', 'Contain no “son”'], 0),
    q.single('WHERE code LIKE \'A_1\' matches…', ['“AB1” but not “ABC1”', '“ABC1”', '“A1”', 'Anything'], 0),
    q.single('Text values in SQL are usually written in…', ['Single quotes', 'Square brackets', 'No quotes', 'Curly braces'], 0),
    q.single('Which finds rows where a value is missing?', ['WHERE col IS NULL', 'WHERE col = NULL', 'WHERE col == ""', 'WHERE NULL'], 0),
    q.tf('SQL keywords are not case-sensitive, but writing them in capitals makes queries easier to read.', true),
    q.single('!= or <> in SQL means…', ['Not equal to', 'Equal to', 'Greater than', 'Assign'], 0),
    q.single('A database management system (DBMS) like MySQL…', ['Stores data and runs queries on it', 'Only draws charts', 'Is a spreadsheet', 'Is an email server'], 0),
    q.multi('Which are comparison operators in SQL?', ['=', '>', '<=', '&&&'], [0, 1, 2]),
    q.single('A semicolon at the end of a query…', ['Marks where the statement ends', 'Comments it out', 'Repeats it', 'Is an error'], 0),
    q.order('Put the clauses in the order you write them.', ['SELECT', 'FROM', 'WHERE']),
    q.single('WHERE age BETWEEN 20 AND 30 includes…', ['Ages 20 to 30, including both ends', 'Only 21 to 29', 'Only 20', 'Everything'], 0),
    q.single('WHERE department IN (\'Sales\', \'HR\') keeps…', ['Rows in Sales or HR', 'Rows in neither', 'Only Sales', 'All rows'], 0),
  ]),
};
