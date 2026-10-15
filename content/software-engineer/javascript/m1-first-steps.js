import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'First steps in JavaScript',
  lessons: {
    Ihy0QziLDf0: {
      title: 'Set up and say hello',
      try: 'Install VS Code with the Live Server extension, make index.html and index.js, link the script, and print a message to the console and onto the page.',
      minutes: 20,
      questions: [
        q.single('console.log("Hi") prints Hi to…', ['The browser’s developer console', 'The web page', 'A pop-up', 'A file'], 0),
        q.single('Which tag links a JavaScript file to an HTML page?', ['<script src="index.js"></script>', '<link href="index.js">', '<js src="index.js">', '<style src="index.js">'], 0),
        q.single('A single-line comment in JavaScript starts with…', ['//', '#', '<!--', '--'], 0),
      ],
    },
    'nbX0MIV7-Ek': {
      title: 'Variables',
      try: 'Make variables for your name, your age and whether you’re a student, and show them in one sentence using a template literal.',
      minutes: 15,
      questions: [
        q.single('let age = 25; creates…', ['A variable called age holding 25', 'A constant', 'A function', 'A string'], 0),
        q.single('A template literal is written with…', ['Backticks, with ${} around values', 'Double quotes only', 'Single quotes and +', 'Brackets'], 0),
        q.match('Match each value to its type.', [['"Hello"', 'String'], ['42', 'Number'], ['true', 'Boolean']]),
      ],
    },
    FyGIKD2fxIo: {
      title: 'Arithmetic operators',
      try: 'Work out the total of a few prices, their average, and whether a number is even using %.',
      minutes: 15,
      questions: [
        q.num('What is 10 % 3?', 1, 0),
        q.single('x += 5 means…', ['x = x + 5', 'x = 5', 'Is x equal to 5?', 'x = x * 5'], 0),
        q.single('Following operator precedence, 2 + 3 * 4 is…', ['14', '20', '24', '9'], 0),
      ],
    },
    JeXqaKeJSRI: {
      title: 'Accepting user input',
      try: 'Ask for the user’s name two ways: with window.prompt(), and with an input box and a button that reads its value.',
      minutes: 15,
      questions: [
        q.single('window.prompt() returns…', ['What the user typed, as a string', 'Always a number', 'Nothing', 'true or false'], 0),
        q.single('document.getElementById("name").value gives…', ['The text in the input with id "name"', 'The input’s id', 'The page title', 'The button'], 0),
      ],
    },
    jLRnuVHwHKk: {
      title: 'Type conversion',
      try: 'Ask for the user’s age, convert it with Number(), and add 1 to it. Then see what happens if you don’t convert it.',
      minutes: 10,
      questions: [
        q.single('"5" + 1 in JavaScript gives…', ['"51"', '6', 'An error', 'NaN'], 0),
        q.single('Number("hello") gives…', ['NaN', '0', '"hello"', 'An error'], 0),
        q.single('Boolean("") is…', ['false', 'true', '""', 'undefined'], 0),
      ],
    },
    '3M53uhj0D4k': {
      title: 'Constants',
      try: 'Write a program that works out a circle’s circumference from a radius the user enters, keeping PI in a const.',
      minutes: 15,
      questions: [
        q.single('A const variable…', ['Can’t be reassigned', 'Can be changed any time', 'Is always a number', 'Is always global'], 0),
        q.tf('Use const by default, and let when the value needs to change.', true),
      ],
    },
    uSJXZ3LkABE: {
      title: 'Counter program',
      try: 'Build the counter: a number on the page with Decrease, Reset and Increase buttons.',
      minutes: 25,
      questions: [
        q.single('button.onclick = function () { … } runs the code…', ['When the button is clicked', 'Only when the page loads', 'Every second', 'Never'], 0),
        q.single('element.textContent = count…', ['Puts the value of count into the element as text', 'Reads the element', 'Deletes the element', 'Styles the element'], 0),
      ],
    },
  },
  checkpoint: programExam('First steps exam', [
    q.single('On a web page, JavaScript is mainly used to…', ['Make it interactive', 'Structure the content', 'Choose fonts', 'Host files'], 0),
    q.single('Where is the <script> tag usually placed?', ['At the end of the <body>, so the page loads first', 'Before <html>', 'Inside <title>', 'In the CSS file'], 0),
    q.single('Which declares a variable you plan to change?', ['let score = 0;', 'const score = 0;', 'variable score = 0;', 'score := 0;'], 0),
    q.single('typeof 42 is…', ['"number"', '"string"', '"boolean"', '"integer"'], 0),
    q.single('typeof "42" is…', ['"string"', '"number"', '"boolean"', '"text"'], 0),
    // eslint-disable-next-line no-template-curly-in-string
    q.single('With let name = "Ada";, which gives the text Hello Ada?', ['`Hello ${name}`', '"Hello " - name', '"Hello name"', 'Hello + name'], 0),
    q.num('What is 7 % 2?', 1, 0),
    q.num('What is 2 ** 3?', 8, 0),
    q.single('After let x = 10; x -= 3;, x is…', ['7', '13', '3', '10'], 0),
    q.single('x++ …', ['Adds 1 to x', 'Doubles x', 'Sets x to 1', 'Subtracts 1 from x'], 0),
    q.num('What is (2 + 3) * 4?', 20, 0),
    q.single('Input from a text box or prompt arrives as…', ['A string', 'A number', 'A boolean', 'An array'], 0),
    q.single('To turn "21" into the number 21 you can use…', ['Number("21")', 'String(21)', 'Boolean("21")', '"21".number'], 0),
    q.single('String(99) gives…', ['"99"', '99', 'NaN', 'true'], 0),
    q.single('NaN means…', ['Not a Number: a failed numeric conversion', 'A null value', 'Zero', 'A negative number'], 0),
    q.single('Trying to reassign a const…', ['Throws an error', 'Silently works', 'Creates a new variable', 'Sets it to undefined'], 0),
    q.single('A value that never changes, like PI, is often named…', ['In capitals', 'In lowercase only', 'With a $ sign', 'With numbers'], 0),
    q.single('document.getElementById("count") returns…', ['The element with id "count"', 'The number of elements', 'The text "count"', 'A list of ids'], 0),
    q.tf('JavaScript is case-sensitive: myName and myname are different variables.', true),
    q.order('Put the counter program’s logic in order.', ['Find the buttons and the label', 'Start count at 0', 'Change count when a button is clicked', 'Show the new count on the page']),
  ]),
};
