import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Maths and decisions',
  lessons: {
    'uy-1WNqecnI': {
      title: 'The Math object',
      try: 'Use Math.round, Math.floor, Math.ceil, Math.max and Math.min on a few numbers and print the results.',
      minutes: 10,
      questions: [
        q.single('Math.floor(4.7) is…', ['4', '5', '4.7', '5.0'], 0),
        q.single('Math.max(3, 9, 2) is…', ['9', '3', '2', '14'], 0),
      ],
    },
    K2upGO5Bb48: {
      title: 'Random numbers',
      try: 'Make a button that rolls a random whole number from 1 to 6 and shows it on the page.',
      minutes: 15,
      questions: [
        q.single('Math.random() returns…', ['A decimal from 0 up to (but not including) 1', 'A whole number from 1 to 10', 'Exactly 0 or 1', 'A negative number'], 0),
        q.single('Which gives a whole number from 1 to 6?', ['Math.floor(Math.random() * 6) + 1', 'Math.random(6)', 'Math.round(6)', 'Math.random() * 6'], 0),
      ],
    },
    PgUXiprlg1k: {
      title: 'If statements',
      try: 'Write a program that checks an age and says whether the person can vote, using else if for under-18s and for negative numbers.',
      minutes: 20,
      questions: [
        q.single('else if runs…', ['Only if the conditions above it were false and its own is true', 'Always', 'Before the if', 'Never'], 0),
        q.single('if (age >= 18) is true when age is…', ['18 or more', 'Less than 18', 'Exactly 17', 'Any number'], 0),
      ],
    },
    SgxzJdqhyfw: {
      title: 'The checked property',
      try: 'Build a form with a subscribe checkbox and three payment radio buttons, and show a message based on which are checked.',
      minutes: 15,
      questions: [
        q.single('checkbox.checked is…', ['true when the box is ticked', 'The checkbox’s label', 'Its value text', 'Always false'], 0),
        q.tf('Radio buttons in one group should share a name so only one can be checked.', true),
      ],
    },
    atS_A9HHAVo: {
      title: 'The ternary operator',
      try: 'Rewrite two of your if/else statements as ternaries, such as a pass or fail message from a score.',
      minutes: 10,
      questions: [
        q.single('condition ? a : b gives…', ['a if the condition is true, otherwise b', 'Always a', 'Always b', 'An error'], 0),
        q.single('let msg = score >= 50 ? "Pass" : "Fail"; with score 40 makes msg…', ['"Fail"', '"Pass"', '40', 'undefined'], 0),
      ],
    },
    z2fcWdoph4U: {
      title: 'Switch statements',
      try: 'Write a switch that turns a day number (1 to 7) into a day name, with a default for anything else.',
      minutes: 10,
      questions: [
        q.single('Without break, a switch case…', ['Falls through into the next case', 'Stops', 'Throws an error', 'Repeats'], 0),
        q.single('The default case runs when…', ['No other case matches', 'Every time', 'The first case matches', 'Never'], 0),
      ],
    },
  },
  checkpoint: programExam('Maths and decisions exam', [
    q.single('Math.round(2.5) is…', ['3', '2', '2.5', '0'], 0),
    q.single('Math.ceil(4.1) is…', ['5', '4', '4.1', '4.5'], 0),
    q.single('Math.abs(-7) is…', ['7', '-7', '0', '49'], 0),
    q.num('What is Math.sqrt(81)?', 9, 0),
    q.num('What is Math.pow(2, 4)?', 16, 0),
    q.single('Math.floor(Math.random() * 10) gives…', ['A whole number from 0 to 9', 'A whole number from 1 to 10', 'A decimal', 'Always 10'], 0),
    q.single('A whole number from min to max (both included) is…', ['Math.floor(Math.random() * (max - min + 1)) + min', 'Math.random(min, max)', 'Math.round(max)', 'Math.floor(min * max)'], 0),
    q.single('Which of these compares two values?', ['>=', '=', '+=', '=>'], 0),
    q.single('In an if / else if / else chain, how many blocks run?', ['Exactly one', 'All of them', 'Two', 'None'], 0),
    q.single('Code inside if (false) { … }…', ['Never runs', 'Always runs', 'Runs twice', 'Throws an error'], 0),
    q.single('Nested if statements are…', ['If statements inside other if statements', 'Two ifs on one line', 'Loops', 'Functions'], 0),
    q.single('With let isStudent = true;, if (isStudent) runs when…', ['isStudent is true', 'isStudent is false', 'Always', 'Never'], 0),
    q.single('To find which radio button is chosen, you…', ['Check each one’s checked property', 'Read the form’s title', 'Use Math.random', 'Read the label'], 0),
    q.single('Ternary operators are best for…', ['Short choices between two values', 'Long blocks of logic', 'Loops', 'Declaring functions'], 0),
    q.single('let fee = isMember ? 0 : 500; with isMember false sets fee to…', ['500', '0', 'true', 'undefined'], 0),
    q.single('switch (true) { case score >= 90: … } is a way to…', ['Test ranges in a switch', 'Loop through scores', 'Throw errors', 'Declare variables'], 0),
    q.single('Each case in a switch usually ends with…', ['break', 'stop', 'end', 'continue'], 0),
    q.tf('A switch compares values using strict equality (===).', true),
    q.single('Which reads most clearly when checking one value against many exact options?', ['switch', 'Many nested ternaries', 'A for loop', 'Math.max'], 0),
    q.order('Put a grade checker’s conditions in the right order.', ['score >= 90 → A', 'score >= 80 → B', 'score >= 70 → C', 'else → F']),
  ]),
};
