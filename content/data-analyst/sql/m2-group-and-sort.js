import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Group, sort and filter',
  lessons: {
    zgYqUP_PhQo: {
      title: 'GROUP BY and ORDER BY',
      try: 'Find the average salary per gender with GROUP BY, then order the results from highest to lowest.',
      minutes: 20,
      questions: [
        q.single('GROUP BY gender with AVG(age) returns…', ['One row per gender with its average age', 'Every row', 'One total row', 'An error'], 0),
        q.single('ORDER BY salary DESC sorts…', ['From highest to lowest salary', 'From lowest to highest', 'Alphabetically', 'Randomly'], 0),
        q.tf('ORDER BY sorts ascending (smallest first) by default.', true),
      ],
    },
    dCNjUOc1cBY: {
      title: 'HAVING vs WHERE',
      try: 'Write a query that shows only occupations whose average salary is over 75,000, using HAVING.',
      minutes: 15,
      questions: [
        q.single('HAVING filters…', ['Groups, after aggregation', 'Rows, before grouping', 'Columns', 'Tables'], 0),
        q.single('Which can use an aggregate like AVG(salary) in its condition?', ['HAVING', 'WHERE', 'FROM', 'LIMIT'], 0),
      ],
    },
    ZnAydTqCtFU: {
      title: 'LIMIT and aliasing',
      try: 'Find the three oldest employees with ORDER BY and LIMIT, and rename a calculated column with AS.',
      minutes: 15,
      questions: [
        q.single('LIMIT 3 returns…', ['At most three rows', 'Three columns', 'Every third row', 'Three tables'], 0),
        q.single('AS in SELECT AVG(age) AS avg_age…', ['Gives the column a name (alias)', 'Filters rows', 'Sorts rows', 'Joins tables'], 0),
      ],
    },
  },
  checkpoint: programExam('Grouping and sorting exam', [
    q.multi('Which are aggregate functions?', ['COUNT', 'SUM', 'AVG', 'UPPER'], [0, 1, 2]),
    q.single('SELECT COUNT(*) FROM orders returns…', ['The number of rows in orders', 'The sum of all values', 'The first row', 'An error'], 0),
    q.single('SELECT department, COUNT(*) FROM employees GROUP BY department returns…', ['How many employees each department has', 'Every employee', 'The total for all departments only', 'An error'], 0),
    q.single('Which keyword sorts results from largest to smallest?', ['DESC', 'ASC', 'DOWN', 'REVERSE'], 0),
    q.single('WHERE filters…', ['Rows before grouping', 'Groups after aggregation', 'Columns', 'The final sort'], 0),
    q.single('HAVING filters…', ['Groups after aggregation', 'Rows before grouping', 'Tables', 'Joins'], 0),
    q.single('Which is valid?', ['HAVING AVG(salary) > 50000', 'WHERE AVG(salary) > 50000', 'LIMIT AVG(salary)', 'FROM AVG(salary)'], 0),
    q.order('Put the clauses in the order you write them.', ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT']),
    q.order('Put the clauses in the order the database actually runs them.', ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY']),
    q.single('LIMIT 5 with ORDER BY salary DESC returns…', ['The five highest salaries', 'The five lowest salaries', 'Five random rows', 'Five columns'], 0),
    q.single('An alias created with AS…', ['Renames a column or table in the query results', 'Changes the stored data', 'Deletes a column', 'Creates a new table'], 0),
    q.single('Columns in SELECT that aren’t aggregated should usually also appear in…', ['GROUP BY', 'LIMIT', 'HAVING only', 'Nowhere'], 0),
    q.single('ORDER BY department, salary DESC sorts by…', ['Department first, then salary high to low within each department', 'Salary only', 'Department only', 'Random'], 0),
    q.tf('COUNT(column) ignores NULL values, while COUNT(*) counts every row.', true),
    q.single('MAX(salary) returns…', ['The highest salary', 'The lowest salary', 'The average', 'The count'], 0),
    q.single('Which returns the second page of 10 rows in MySQL?', ['LIMIT 10, 10', 'LIMIT 2', 'LIMIT 20', 'PAGE 2'], 0, 'LIMIT offset, count: skip 10 rows, then return 10.'),
    q.single('SELECT gender, AVG(age) FROM employees GROUP BY gender HAVING AVG(age) > 40 shows…', ['Genders whose average age is over 40', 'Employees over 40', 'All genders', 'An error'], 0),
    q.tf('ORDER BY can use a column alias defined in SELECT.', true),
    q.single('To find the total sales per region you would use…', ['SUM(sales) with GROUP BY region', 'COUNT(region)', 'ORDER BY sales', 'LIMIT region'], 0),
    q.single('Without ORDER BY, the order of rows returned is…', ['Not guaranteed', 'Always alphabetical', 'Always by id', 'Always newest first'], 0),
  ]),
};
