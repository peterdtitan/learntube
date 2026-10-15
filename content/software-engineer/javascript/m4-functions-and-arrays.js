import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Functions and arrays',
  lessons: {
    HFaxylC7bUc: {
      title: 'Functions',
      try: 'Write functions that add two numbers, check whether a number is even, and check whether an email contains "@", then call each one.',
      minutes: 20,
      questions: [
        q.single('return in a function…', ['Sends a value back to where the function was called', 'Prints to the console', 'Restarts the function', 'Deletes the function'], 0),
        q.single('In function greet(name) { … }, name is a…', ['Parameter', 'Return value', 'Global variable', 'Loop'], 0),
        q.tf('A function’s code runs only when the function is called.', true),
      ],
    },
    KyqmbIkZGIo: {
      title: 'Variable scope',
      try: 'Declare the same variable name inside two different functions and once globally, and log each one to see which is used where.',
      minutes: 10,
      questions: [
        q.single('A variable declared with let inside a function is…', ['Only usable inside that function (local)', 'Usable everywhere', 'A constant', 'Deleted at once'], 0),
        q.single('Global variables can cause problems because…', ['Any code can change them, which causes clashes', 'They are slow', 'They can’t hold numbers', 'They don’t exist'], 0),
      ],
    },
    '6xrTdpIAsb0': {
      title: 'Temperature conversion program',
      try: 'Build the converter: a number box, Celsius and Fahrenheit radio buttons, and a Convert button that shows the result to one decimal place.',
      minutes: 25,
      questions: [
        q.single('Celsius converts to Fahrenheit with…', ['F = C × 9 / 5 + 32', 'F = C + 32', 'F = (C − 32) × 5 / 9', 'F = C × 2'], 0),
        q.single('number.toFixed(1) gives…', ['The number rounded to 1 decimal place, as a string', 'A whole number', 'The number times 10', 'An array'], 0),
      ],
    },
    yQ1fz8LY354: {
      title: 'Arrays',
      try: 'Make an array of fruits, add one with push, remove one with pop, find one with indexOf, and loop through them with for…of.',
      minutes: 15,
      questions: [
        q.single('fruits[0] gets…', ['The first item', 'The last item', 'The array’s length', 'Nothing'], 0),
        q.match('Match each array method to what it does.', [['push()', 'Adds to the end'], ['pop()', 'Removes from the end'], ['unshift()', 'Adds to the start'], ['shift()', 'Removes from the start']]),
      ],
    },
    SmJNeJuLmVo: {
      title: '2D arrays',
      try: 'Make a 3×3 grid as a 2D array (like a noughts and crosses board) and print each row.',
      minutes: 10,
      questions: [
        q.single('In grid[1][2], the 1 picks the…', ['Row, and the 2 picks the column', 'Column, and the 2 picks the row', 'Length', 'Value'], 0),
        q.tf('A 2D array is an array whose items are arrays.', true),
      ],
    },
    RuDdltsfaVc: {
      title: 'The spread operator',
      try: 'Combine two arrays into one with spread, and find the largest number in an array with Math.max(...nums).',
      minutes: 10,
      questions: [
        q.single('[...a, ...b] …', ['Makes a new array with the items of a, then b', 'Adds the arrays as numbers', 'Nests b inside a', 'Throws an error'], 0),
        q.single('Math.max(...[3, 8, 1]) is…', ['8', '3', '1', 'NaN'], 0),
      ],
    },
    ahwR1D_GAfc: {
      title: 'Rest parameters',
      try: 'Write a function sum(...numbers) that adds any amount of numbers, and an average function that uses it.',
      minutes: 15,
      questions: [
        q.single('In function sum(...numbers), numbers is…', ['An array of all the arguments passed', 'Only the first argument', 'A number', 'undefined'], 0),
        q.tf('Rest gathers values into an array; spread unpacks an array into values.', true),
      ],
    },
    PXilNmL9U80: {
      title: 'Dice roller program',
      try: 'Build the dice roller: choose how many dice, roll them, and show the numbers and dice images.',
      minutes: 25,
      questions: [
        q.single('To roll several dice, the program…', ['Loops once per die and stores each roll in an array', 'Calls Math.random once', 'Uses a switch only', 'Rolls them in CSS'], 0),
        q.single('values.join(", ") gives…', ['One string like "3, 6, 1"', 'An array of arrays', 'The total', 'An error'], 0),
      ],
    },
    '1cdXwYEFDAg': {
      title: 'Random password generator',
      try: 'Build the password generator with options for length, lower case, upper case, numbers and symbols.',
      minutes: 20,
      questions: [
        q.single('A random character from the string chars is…', ['chars[Math.floor(Math.random() * chars.length)]', 'chars.random()', 'chars[chars.length]', 'Math.random(chars)'], 0),
        q.tf('Longer passwords that mix character types are harder to guess.', true),
      ],
    },
  },
  checkpoint: programExam('Functions and arrays exam', [
    q.single('Which defines a function?', ['function add(a, b) { return a + b; }', 'add = function[a, b]', 'def add(a, b):', 'function: add(a, b)'], 0),
    q.single('In add(2, 3), the 2 and 3 are…', ['Arguments', 'Parameters', 'Return values', 'Constants'], 0),
    q.single('A function with no return statement returns…', ['undefined', '0', 'null', 'An error'], 0),
    q.single('Code after return in the same block…', ['Doesn’t run', 'Runs first', 'Runs twice', 'Throws an error'], 0),
    q.single('A variable declared outside every function is…', ['Global', 'Local', 'Constant', 'Hidden'], 0),
    q.single('let and const variables are scoped to…', ['The nearest block { }', 'The whole file, always', 'The whole page, always', 'Nothing'], 0),
    q.num('Convert 100 °C to Fahrenheit.', 212, 0),
    q.single('fruits.length for ["apple", "banana", "cherry"] is…', ['3', '2', '4', '"cherry"'], 0),
    q.single('The last item of an array arr is…', ['arr[arr.length - 1]', 'arr[arr.length]', 'arr.last', 'arr[0]'], 0),
    q.single('arr.indexOf("x") returns -1 when…', ['"x" isn’t in the array', '"x" is first', '"x" is last', 'The array is sorted'], 0),
    q.single('for (const fruit of fruits) gives fruit…', ['Each item in turn', 'Each index', 'The array’s length', 'Only the last item'], 0),
    q.single('["pear", "apple", "fig"].sort() gives…', ['["apple", "fig", "pear"]', '["pear", "fig", "apple"]', '["fig", "apple", "pear"]', 'An error'], 0),
    q.single('For a 2D array, matrix.length gives…', ['The number of rows', 'The number of columns', 'The total number of cells', 'The first value'], 0),
    q.single('Visiting every cell of a 2D array needs…', ['A loop inside a loop', 'One loop', 'A switch', 'No loop'], 0),
    q.single('const copy = [...original]; makes…', ['A new (shallow) copy of the array', 'A second name for the same array', 'A string', 'An error'], 0),
    q.single('[..."hi"] gives…', ['["h", "i"]', '["hi"]', '"hi"', 'An error'], 0),
    q.single('function f(first, ...rest) called as f(1, 2, 3) makes rest…', ['[2, 3]', '[1, 2, 3]', '3', '[1]'], 0),
    q.tf('A rest parameter must be the last parameter.', true),
    q.single('To make a random password, the generator…', ['Picks random characters from the allowed set in a loop', 'Shuffles the alphabet once', 'Uses the date', 'Asks the user for one'], 0),
    q.order('Put writing and using a function in order.', ['Declare it with its parameters', 'Write the body', 'Return a result', 'Call it with arguments']),
  ]),
};
