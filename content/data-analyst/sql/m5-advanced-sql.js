import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Advanced SQL',
  lessons: {
    UC7uvOqcUTs: {
      title: 'CTEs',
      try: 'Rewrite one of your subquery answers as a CTE with WITH … AS, and notice which is easier to read.',
      minutes: 20,
      questions: [
        q.single('A CTE (common table expression) is…', ['A named temporary result defined with WITH, used in the next query', 'A permanent table', 'A join type', 'A function'], 0),
        q.tf('CTEs often make long queries easier to read than nested subqueries.', true),
      ],
    },
    uEk07jXdKOo: {
      title: 'Temp tables',
      try: 'Create a temporary table of high earners, insert data into it, and query it.',
      minutes: 15,
      questions: [
        q.single('A temporary table lasts…', ['Until your session ends', 'Forever', 'One query only', 'One minute'], 0),
        q.single('Temp tables are handy for…', ['Storing intermediate results you’ll query several times', 'Backing up a database', 'Sending emails', 'Drawing charts'], 0),
      ],
    },
    '7vnxpcqmqNQ': {
      title: 'Stored procedures',
      try: 'Create a stored procedure that returns employees above a salary you pass in as a parameter, then CALL it.',
      minutes: 20,
      questions: [
        q.single('A stored procedure is…', ['Saved SQL you can run again by name', 'A table', 'A chart', 'A row'], 0),
        q.single('You run a stored procedure in MySQL with…', ['CALL', 'RUN', 'EXECUTE NOW', 'START'], 0),
        q.tf('Stored procedures can take parameters.', true),
      ],
    },
    QMUZ5HfWMRc: {
      title: 'Triggers and events',
      try: 'Create a trigger that copies a new salary row into the employee table, then insert a row and check it worked.',
      minutes: 20,
      questions: [
        q.single('A trigger runs…', ['Automatically when a row is inserted, updated or deleted', 'On a schedule', 'Only when you CALL it', 'Never'], 0),
        q.single('A MySQL event runs…', ['On a schedule', 'When a row changes', 'Only once ever', 'When you open Workbench'], 0),
      ],
    },
  },
  checkpoint: programExam('Advanced SQL exam', [
    q.single('A CTE starts with the keyword…', ['WITH', 'CTE', 'TEMP', 'DECLARE'], 0),
    q.single('A CTE can be used…', ['In the query that immediately follows it', 'Forever', 'In any later session', 'Only in a trigger'], 0),
    q.single('A temporary table is removed…', ['When the session ends', 'Never', 'After one query', 'When you restart Excel'], 0),
    q.single('Which creates a temporary table in MySQL?', ['CREATE TEMPORARY TABLE', 'CREATE TEMP VIEW FOREVER', 'NEW TABLE', 'MAKE TEMP'], 0),
    q.single('Stored procedures help by…', ['Reusing complex SQL with one call', 'Making tables bigger', 'Drawing charts', 'Hiding data permanently'], 0),
    q.single('In MySQL Workbench, DELIMITER is changed when writing a procedure so that…', ['Semicolons inside it don’t end the CREATE statement early', 'It runs faster', 'It becomes a trigger', 'It is encrypted'], 0),
    q.single('A trigger AFTER INSERT ON salaries fires…', ['After each new row is added to salaries', 'Before any query', 'Every hour', 'When a table is dropped'], 0),
    q.single('An event is best for…', ['Scheduled jobs, like deleting old rows every day', 'Reacting to each insert', 'Joining tables', 'Formatting'], 0),
    q.multi('Which run automatically without you calling them?', ['Triggers', 'Events', 'Stored procedures', 'CTEs'], [0, 1]),
    q.single('Inside a trigger, NEW refers to…', ['The row being inserted or updated', 'A new table', 'The newest database', 'A function'], 0),
    q.tf('CTEs can make a query’s steps easier to follow than nested subqueries.', true),
    q.single('Which is permanent until you drop it?', ['A stored procedure', 'A CTE', 'A temporary table', 'A subquery'], 0),
    q.single('Which is best for a calculation you’ll query several times in one session?', ['A temporary table', 'A trigger', 'An event', 'A comment'], 0),
    q.single('CALL top_earners(80000); passes 80000 as…', ['A parameter', 'A table name', 'A delimiter', 'A trigger'], 0),
    q.order('Put creating a CTE in order.', ['WITH name AS', '( the query that builds the result )', 'SELECT … FROM name']),
    q.tf('A recursive CTE can refer to itself, useful for hierarchies like org charts.', true),
    q.single('Before running a trigger-heavy workflow on real data you should…', ['Test it on a copy', 'Run it on production first', 'Delete backups', 'Skip testing'], 0),
    q.single('Which statement removes a stored procedure?', ['DROP PROCEDURE', 'DELETE PROCEDURE ROWS', 'REMOVE', 'TRUNCATE'], 0),
    q.single('Events must be enabled with…', ['The event scheduler', 'A trigger', 'A CTE', 'A view'], 0),
    q.single('Which is NOT stored in the database after your session?', ['A CTE', 'A stored procedure', 'A trigger', 'An event'], 0),
  ]),
};
