import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Joins and unions',
  lessons: {
    lXQzD09BOH0: {
      title: 'Joins',
      try: 'Join the employee and salary tables on employee_id with an INNER JOIN, then try a LEFT JOIN and spot the difference.',
      minutes: 30,
      questions: [
        q.single('An INNER JOIN returns…', ['Only rows with a match in both tables', 'Every row from both tables', 'Only the left table', 'Nothing'], 0),
        q.single('A LEFT JOIN returns…', ['All rows from the left table, plus matches from the right', 'Only matches', 'All rows from the right table', 'No rows'], 0),
        q.single('Unmatched columns from the right table in a LEFT JOIN show…', ['NULL', '0', 'An error', 'The left value'], 0),
      ],
    },
    iTQW_nDp938: {
      title: 'Unions',
      try: 'Use UNION to make one list of “old employees” and “highly paid employees” with a label column saying which is which.',
      minutes: 15,
      questions: [
        q.single('UNION…', ['Stacks the rows of two queries into one result', 'Joins columns side by side', 'Deletes duplicates in a table', 'Sorts rows'], 0),
        q.single('UNION removes duplicates; to keep them, use…', ['UNION ALL', 'UNION KEEP', 'JOIN', 'DISTINCT'], 0),
        q.tf('Both queries in a UNION must return the same number of columns.', true),
      ],
    },
  },
  checkpoint: programExam('Joins and unions exam', [
    q.single('A join combines tables…', ['Side by side, matching rows on a related column', 'By stacking rows', 'By deleting duplicates', 'By sorting'], 0),
    q.single('The ON clause in a join says…', ['Which columns must match', 'Which rows to delete', 'How to sort', 'How many rows'], 0),
    q.single('INNER JOIN keeps…', ['Only rows that match in both tables', 'All rows from the left', 'All rows from the right', 'Every combination'], 0),
    q.single('LEFT JOIN keeps…', ['All rows from the left table', 'Only matches', 'All rows from the right table', 'Nothing'], 0),
    q.single('RIGHT JOIN keeps…', ['All rows from the right table', 'All rows from the left table', 'Only matches', 'Nothing'], 0),
    q.single('A self join is…', ['A table joined to itself', 'Two databases joined', 'A union', 'A subquery'], 0),
    q.single('After a LEFT JOIN, right-table columns with no match contain…', ['NULL', 'Zero', 'The left values', 'Errors'], 0),
    q.single('To find customers who have never ordered, you could…', ['LEFT JOIN orders and keep rows where the order id IS NULL', 'INNER JOIN and count', 'UNION the tables', 'ORDER BY customer'], 0),
    q.single('Table aliases like e and s in FROM employees e JOIN salaries s…', ['Shorten column references like e.employee_id', 'Rename the stored tables', 'Filter rows', 'Create new tables'], 0),
    q.single('UNION stacks…', ['Rows from two queries', 'Columns from two tables', 'Charts', 'Databases'], 0),
    q.single('UNION ALL differs from UNION by…', ['Keeping duplicate rows', 'Removing duplicates', 'Joining columns', 'Sorting'], 0),
    q.tf('Queries combined with UNION need matching column counts and compatible types.', true),
    q.single('Joining on a column that isn’t unique in either table can…', ['Multiply rows unexpectedly', 'Remove all rows', 'Sort the data', 'Do nothing'], 0),
    q.single('A primary key is…', ['A column that uniquely identifies each row', 'Any text column', 'A password', 'A sort order'], 0),
    q.single('A foreign key is…', ['A column that refers to a primary key in another table', 'A duplicate key', 'An encrypted key', 'An index only'], 0),
    q.multi('Which are join types?', ['INNER', 'LEFT', 'RIGHT', 'STACKED'], [0, 1, 2]),
    q.single('Which would you use to combine this year’s and last year’s sales tables with the same columns?', ['UNION ALL', 'INNER JOIN', 'GROUP BY', 'HAVING'], 0),
    q.single('Joining employees to departments on department_id lets you…', ['Show each employee’s department name', 'Delete departments', 'Count only departments', 'Stack the tables'], 0),
    q.order('Put writing a join in order.', ['SELECT the columns you need', 'FROM the first table', 'JOIN the second table', 'ON the matching columns']),
    q.tf('You can join more than two tables in one query.', true),
  ]),
};
