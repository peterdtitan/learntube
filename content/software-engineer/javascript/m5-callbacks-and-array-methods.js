import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Callbacks and array methods',
  lessons: {
    'i2SPq-nb3NQ': {
      title: 'Callbacks',
      try: 'Write a function that takes a callback, such as doTask(done), and call it with two different callback functions.',
      minutes: 15,
      questions: [
        q.single('A callback is…', ['A function passed to another function, to be called later', 'A phone call', 'A loop', 'A variable'], 0),
        q.tf('Callbacks let you decide what happens after a task finishes.', true),
      ],
    },
    uOZWH0KEUs4: {
      title: 'forEach()',
      try: 'Use forEach to double every number in an array and to print each name in capitals.',
      minutes: 15,
      questions: [
        q.single('arr.forEach(fn) …', ['Calls fn once for each item', 'Returns a new array', 'Sorts the array', 'Removes items'], 0),
        q.single('forEach passes its callback…', ['The item, its index and the array', 'Only the length', 'Nothing', 'A random item'], 0),
      ],
    },
    xNQH1NbZQ0E: {
      title: 'map()',
      try: 'Use map to turn an array of numbers into their squares, and an array of dates into formatted strings.',
      minutes: 15,
      questions: [
        q.single('map() returns…', ['A new array of the callback’s results', 'The original array, changed', 'One value', 'Nothing'], 0),
        q.single('[1, 2, 3].map(n => n * 2) gives…', ['[2, 4, 6]', '[1, 2, 3]', '6', '[1, 4, 9]'], 0),
      ],
    },
    VvSEKHKFvpQ: {
      title: 'filter()',
      try: 'Use filter to keep only the even numbers from one array, and only the people aged 18 or over from another.',
      minutes: 15,
      questions: [
        q.single('filter() keeps the items…', ['For which the callback returns true', 'At even positions', 'That are numbers', 'At random'], 0),
        q.single('[5, 12, 8].filter(n => n > 6) gives…', ['[12, 8]', '[5]', '[5, 12, 8]', '20'], 0),
      ],
    },
    iDWtuWkuj8g: {
      title: 'reduce()',
      try: 'Use reduce to total a shopping basket’s prices and to find the highest score in an array.',
      minutes: 15,
      questions: [
        q.single('reduce() turns an array into…', ['A single value', 'A longer array', 'Always an object', 'Nothing'], 0),
        q.num('What does [1, 2, 3, 4].reduce((total, n) => total + n, 0) return?', 10, 0),
      ],
    },
    jDqmFt03Gy0: {
      title: 'Function expressions',
      try: 'Rewrite one of your named functions as a function expression stored in a const, and pass an anonymous function to setTimeout.',
      minutes: 10,
      questions: [
        q.single('const greet = function () { … }; is…', ['A function expression', 'A class', 'An arrow function', 'A loop'], 0),
        q.tf('Functions in JavaScript are values: you can store them in variables and pass them around.', true),
      ],
    },
    fRRRkognpOs: {
      title: 'Arrow functions',
      try: 'Rewrite your map, filter and reduce callbacks as arrow functions.',
      minutes: 15,
      questions: [
        q.single('Which is an arrow function that doubles x?', ['const double = x => x * 2;', 'const double = x -> x * 2;', 'function => double(x)', 'double(x) => { x * 2 }'], 0),
        q.single('An arrow function with a single expression and no braces…', ['Returns that expression automatically', 'Returns undefined', 'Must use return', 'Can’t take parameters'], 0),
      ],
    },
  },
  checkpoint: programExam('Callbacks and array methods exam', [
    q.single('Passing a function into another function as an argument is called…', ['Using a callback', 'Recursion', 'Hoisting', 'Spreading'], 0),
    q.single('setTimeout(sayHi, 1000) calls sayHi…', ['After about 1 second', 'Immediately', '1000 times', 'Never'], 0),
    q.single('Why pass sayHi, not sayHi(), as a callback?', ['sayHi() would run it now and pass its result instead', 'They are the same', 'sayHi() is invalid', 'To make it faster'], 0),
    q.single('forEach returns…', ['undefined', 'A new array', 'The total', 'The first item'], 0),
    q.single('Which method makes a new array with every item changed?', ['map()', 'forEach()', 'filter()', 'reduce()'], 0),
    q.single('Which method makes a new array with only some of the items?', ['filter()', 'map()', 'forEach()', 'push()'], 0),
    q.single('Which method combines all the items into one value?', ['reduce()', 'map()', 'filter()', 'slice()'], 0),
    q.single('["a", "b"].map(s => s.toUpperCase()) gives…', ['["A", "B"]', '["a", "b"]', '"AB"', 'An error'], 0),
    q.single('[1, 2, 3, 4].filter(n => n % 2 === 0) gives…', ['[2, 4]', '[1, 3]', '[1, 2, 3, 4]', '6'], 0),
    q.num('What does [3, 7, 2].reduce((max, n) => (n > max ? n : max)) return?', 7, 0),
    q.single('In reduce((acc, n) => acc + n, 0), the 0 is…', ['The starting value of acc', 'The index', 'The last item', 'A limit'], 0),
    q.tf('map, filter and reduce don’t change the original array.', true),
    q.single('prices.filter(…).map(…) works because…', ['filter returns an array that map can work on', 'They are the same method', 'Chaining is automatic for everything', 'map runs first'], 0),
    q.single('A function expression stored in a const isn’t hoisted, so…', ['You must define it before you call it', 'You can call it anywhere', 'It runs at once', 'It can’t take parameters'], 0),
    q.single('An anonymous function is…', ['A function without a name', 'A broken function', 'A global function', 'A class'], 0),
    q.single('(a, b) => a + b does the same as…', ['function (a, b) { return a + b; }', 'function (a, b) { a + b; }', 'a + b', 'function add() {}'], 0),
    q.single('An arrow function with no parameters is written…', ['() => …', '=> …', '[] => …', 'nothing => …'], 0),
    q.single('With braces, as in x => { x * 2 }, the arrow function returns…', ['undefined, unless you write return', 'x * 2', 'x', 'An error'], 0),
    q.single('Which gives the total of the prices over 100?', ['prices.filter(p => p > 100).reduce((t, p) => t + p, 0)', 'prices.map(p => p > 100)', 'prices.forEach(p => p + 100)', 'prices.filter(100)'], 0),
    q.match('Match each method to what it returns.', [['forEach', 'undefined'], ['map', 'A new array of the same length'], ['filter', 'A new array that may be shorter'], ['reduce', 'One value']]),
  ]),
};
