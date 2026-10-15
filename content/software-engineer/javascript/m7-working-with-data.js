import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Working with data and time',
  lessons: {
    UHZcJyVXtLo: {
      title: 'Destructuring',
      try: 'Swap two variables with array destructuring, and pull name and age out of a person object in a function’s parameters.',
      minutes: 15,
      questions: [
        q.single('const [a, b] = [1, 2]; sets…', ['a to 1 and b to 2', 'a to [1, 2]', 'b to 1', 'Nothing'], 0),
        q.single('const { name } = person; is the same as…', ['const name = person.name;', 'const person = name;', 'const name = person;', 'person.name = name;'], 0),
      ],
    },
    b8gwYQ_V4K4: {
      title: 'Nested objects',
      try: 'Make a person object with an address object inside it, and print the city using dot notation.',
      minutes: 15,
      questions: [
        q.single('person.address.city reads…', ['The city inside the address object inside person', 'A city variable on person', 'The address array', 'Always an error'], 0),
        q.tf('Objects can contain other objects and arrays.', true),
      ],
    },
    w9078dAjcrY: {
      title: 'Arrays of objects',
      try: 'Make an array of fruit objects with a name, colour and calories, then use filter, map and reduce on it.',
      minutes: 20,
      questions: [
        q.single('fruits.map(f => f.name) gives…', ['An array of the fruits’ names', 'The first fruit', 'The total calories', 'An object'], 0),
        q.single('fruits.find(f => f.name === "apple") returns…', ['The first matching object', 'Every matching object', 'true or false', 'The index'], 0),
      ],
    },
    'CTHhlx25X-U': {
      title: 'Sorting',
      try: 'Sort an array of numbers properly with a compare function, then sort an array of people by age and by name.',
      minutes: 15,
      questions: [
        q.single('[10, 2, 33].sort() gives…', ['[10, 2, 33], because it sorts as text', '[2, 10, 33]', '[33, 10, 2]', 'An error'], 0),
        q.single('nums.sort((a, b) => a - b) sorts…', ['Smallest to largest', 'Largest to smallest', 'Alphabetically', 'Randomly'], 0),
      ],
    },
    FGAUekwri1Q: {
      title: 'Shuffling an array',
      try: 'Write a shuffle function using the Fisher–Yates method and shuffle a deck of cards.',
      minutes: 10,
      questions: [
        q.single('The Fisher–Yates shuffle works by…', ['Swapping each item, from the end, with a random item at or before it', 'Sorting randomly with sort()', 'Reversing the array', 'Removing items'], 0),
        q.tf('arr.sort(() => Math.random() - 0.5) shuffles unevenly.', true),
      ],
    },
    LwYwz67l1lA: {
      title: 'Dates',
      try: 'Show today’s date and time on your page, then make a date for your next birthday and work out how many days away it is.',
      minutes: 15,
      questions: [
        q.single('new Date() gives…', ['The current date and time', '1 January 1970', 'An empty string', 'Tomorrow'], 0),
        q.single('For a date in January, date.getMonth() returns…', ['0', '1', '"January"', '12'], 0),
      ],
    },
    beZfCfiuIkA: {
      title: 'Closures',
      try: 'Write a createCounter() function that returns an increment function with its own private count, and make two separate counters.',
      minutes: 15,
      questions: [
        q.single('A closure is…', ['A function that remembers the variables from where it was created', 'A closed browser tab', 'A finished loop', 'A class'], 0),
        q.single('Closures are useful for…', ['Keeping data private', 'Styling pages', 'Sorting arrays', 'Making web requests'], 0),
      ],
    },
    shWr5DNVeCI: {
      title: 'setTimeout()',
      try: 'Show a message 3 seconds after a button is clicked, and add a second button that cancels it with clearTimeout.',
      minutes: 10,
      questions: [
        q.single('setTimeout(fn, 3000) runs fn…', ['Once, after about 3 seconds', 'Every 3 seconds', '3000 times', 'Immediately'], 0),
        q.single('clearTimeout(id) …', ['Cancels a timeout that hasn’t run yet', 'Runs it now', 'Repeats it', 'Clears the console'], 0),
      ],
    },
    '9amAW_qXv84': {
      title: 'console.time()',
      try: 'Time how long a loop of a million additions takes with console.time and console.timeEnd.',
      minutes: 10,
      questions: [
        q.single('console.time("x") and console.timeEnd("x") …', ['Measure how long the code between them takes', 'Show the clock', 'Pause the code', 'Set a timeout'], 0),
        q.tf('The labels given to console.time and console.timeEnd must match.', true),
      ],
    },
  },
  checkpoint: programExam('Working with data exam', [
    q.single('After let a = 1, b = 2; [a, b] = [b, a];, a is…', ['2', '1', '[2, 1]', 'undefined'], 0),
    q.single('const [first, ...others] = [1, 2, 3]; makes others…', ['[2, 3]', '[1, 2, 3]', '2', '3'], 0),
    q.single('const { age = 18 } = {}; makes age…', ['18, the default', 'undefined', 'null', 'An error'], 0),
    q.single('function show({ name, age }) { … } expects…', ['An object with name and age properties', 'Two separate arguments', 'An array', 'No arguments'], 0),
    q.single('To loop over the keys of an object you can use…', ['for…in', 'for…of directly on the object', 'map()', 'reduce() only'], 0),
    q.single('people.filter(p => p.age >= 18).map(p => p.name) gives…', ['The names of people aged 18 or over', 'Everyone’s ages', 'One name', 'A count'], 0),
    q.single('Which returns the first object that matches?', ['find()', 'filter()', 'map()', 'forEach()'], 0),
    q.num('What does [{ c: 50 }, { c: 30 }].reduce((t, f) => t + f.c, 0) return?', 80, 0),
    q.single('people.sort((a, b) => a.age - b.age) sorts by…', ['Age, youngest first', 'Age, oldest first', 'Name', 'Nothing'], 0),
    q.single('To sort by name alphabetically you can use…', ['(a, b) => a.name.localeCompare(b.name)', '(a, b) => a.name - b.name', 'sort(name)', 'reverse()'], 0),
    q.single('sort() changes…', ['The original array', 'Only a copy', 'Nothing', 'Only strings'], 0),
    q.single('A random index from 0 to i (both included) is…', ['Math.floor(Math.random() * (i + 1))', 'Math.random(i)', 'i * Math.random', 'Math.round(i)'], 0),
    q.single('new Date(2026, 0, 1) is…', ['1 January 2026', '1 February 2026', '0 January 2026', 'An error'], 0),
    q.single('date.getDay() returns…', ['The day of the week, 0 (Sunday) to 6', 'The day of the month', 'The year', 'The hour'], 0),
    q.single('Subtracting one date from another gives…', ['The difference in milliseconds', 'The number of days', 'A new date', 'An error'], 0),
    q.num('How many milliseconds are there in one second?', 1000, 0),
    q.single('In a closure counter, count stays private because…', ['Only the returned function can reach it', 'It is a const', 'It is global', 'It is deleted'], 0),
    q.single('setTimeout returns…', ['An id you can pass to clearTimeout', 'The callback’s result', 'Nothing', 'The time'], 0),
    q.tf('Code after a setTimeout call keeps running without waiting for the timeout.', true),
    q.single('console.time is useful for…', ['Comparing how fast two pieces of code run', 'Showing the date', 'Delaying code', 'Logging errors'], 0),
  ]),
};
