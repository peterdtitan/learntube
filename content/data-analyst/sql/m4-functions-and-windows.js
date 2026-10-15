import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Functions, CASE, subqueries and windows',
  lessons: {
    KRXSJb9ql1Y: {
      title: 'String functions',
      try: 'Use UPPER, TRIM, SUBSTRING and CONCAT to build a clean “Full Name” column and pull the birth month out of a date string.',
      minutes: 20,
      questions: [
        q.single('LENGTH(\'Lagos\') returns…', ['5', '4', '6', '“Lagos”'], 0),
        q.single('CONCAT(first_name, \' \', last_name) returns…', ['The first and last names joined with a space', 'Only the first name', 'The length', 'An error'], 0),
        q.single('SUBSTRING(\'2026-10-15\', 6, 2) returns…', ['“10”', '“20”', '“15”', '“-1”'], 0),
      ],
    },
    RYIiOG4LsvQ: {
      title: 'CASE statements',
      try: 'Use CASE to label employees as “Young”, “Mid” or “Senior” by age, then calculate a raise that depends on salary band.',
      minutes: 20,
      questions: [
        q.single('A CASE statement…', ['Returns different values depending on conditions', 'Joins tables', 'Deletes rows', 'Sorts rows'], 0),
        q.single('Every CASE expression finishes with…', ['END', 'STOP', 'DONE', 'ELSE'], 0),
      ],
    },
    'Vj6RqA_X-IE': {
      title: 'Subqueries',
      try: 'Use a subquery in WHERE to find employees in departments located in a given city, then one in SELECT to compare each salary with the average.',
      minutes: 20,
      questions: [
        q.single('A subquery is…', ['A query inside another query', 'A saved table', 'A join type', 'A view'], 0),
        q.single('WHERE salary > (SELECT AVG(salary) FROM employees) finds…', ['Employees paid above the average', 'The average salary', 'All employees', 'The lowest salary'], 0),
      ],
    },
    '7NBt0V8ebGk': {
      title: 'Window functions',
      try: 'Rank employees by salary within each department using ROW_NUMBER, RANK and DENSE_RANK with PARTITION BY.',
      minutes: 25,
      questions: [
        q.single('Unlike GROUP BY, a window function…', ['Keeps every row while adding a calculated value', 'Collapses rows into groups', 'Deletes rows', 'Only counts'], 0),
        q.single('PARTITION BY department in OVER() means…', ['The calculation restarts for each department', 'Sort by department', 'Filter by department', 'Join departments'], 0),
        q.single('With ties at the top, RANK() gives 1, 1, then…', ['3', '2', '1', '4'], 0, 'RANK skips numbers after ties; DENSE_RANK would give 2.'),
      ],
    },
  },
  checkpoint: programExam('Functions and windows exam', [
    q.single('UPPER(\'abuja\') returns…', ['“ABUJA”', '“Abuja”', '“abuja”', '5'], 0),
    q.single('TRIM(\'  data  \') returns…', ['“data”', '“  data”', '“data  ”', '4'], 0),
    q.single('LEFT(\'Analyst\', 3) returns…', ['“Ana”', '“yst”', '“Anal”', '3'], 0),
    q.single('REPLACE(\'a-b-c\', \'-\', \'/\') returns…', ['“a/b/c”', '“abc”', '“a-b-c”', '“-/-”'], 0),
    q.single('LOCATE(\'y\', \'Analyst\') returns…', ['5', '1', '0', '7'], 0),
    q.single('A CASE expression uses…', ['WHEN … THEN … ELSE … END', 'IF … DO … STOP', 'SWITCH … CASE', 'WHERE … HAVING'], 0),
    q.single('If no WHEN matches and there’s no ELSE, CASE returns…', ['NULL', '0', 'An error', 'The first value'], 0),
    q.single('A subquery in the FROM clause acts like…', ['A temporary table you can select from', 'A filter only', 'A sort', 'A column'], 0),
    q.single('WHERE id IN (SELECT id FROM vip) keeps rows whose id is…', ['In the vip list', 'Not in the vip list', 'NULL', 'The largest'], 0),
    q.single('A window function is written with…', ['OVER()', 'GROUP BY', 'HAVING', 'UNION'], 0),
    q.single('ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) gives…', ['1 to the highest salary in each department, 2 to the next, and so on', 'A total salary per department', 'One row per department', 'Random numbers'], 0),
    q.single('Scores 90, 90, 80 ranked with DENSE_RANK give…', ['1, 1, 2', '1, 1, 3', '1, 2, 3', '1, 1, 1'], 0),
    q.single('Scores 90, 90, 80 ranked with RANK give…', ['1, 1, 3', '1, 1, 2', '1, 2, 3', '2, 2, 3'], 0),
    q.single('Scores 90, 90, 80 numbered with ROW_NUMBER give…', ['1, 2, 3', '1, 1, 2', '1, 1, 3', '3, 2, 1'], 0),
    q.single('SUM(salary) OVER(PARTITION BY dept) adds…', ['Each department’s total to every row in that department', 'One grand total row', 'Nothing', 'A rank'], 0),
    q.single('A rolling (running) total uses SUM(...) OVER(ORDER BY date) because…', ['It adds up values row by row in date order', 'It groups by date', 'It filters dates', 'It sorts only'], 0),
    q.tf('Window functions keep the original rows, unlike GROUP BY.', true),
    q.multi('Which are string functions?', ['LENGTH', 'CONCAT', 'SUBSTRING', 'AVG'], [0, 1, 2]),
    q.single('Which labels salaries above 70000 as “High” and the rest as “Standard”?', ['CASE WHEN salary > 70000 THEN \'High\' ELSE \'Standard\' END', 'IF salary > 70000 High', 'WHERE salary > 70000 = High', 'GROUP BY High'], 0),
    q.tf('A subquery that returns one value can be used in a comparison like salary > (subquery).', true),
  ]),
};
