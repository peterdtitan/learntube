import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Projects, modules and errors',
  lessons: {
    HOMu48bTzz8: {
      title: 'Formatting currency',
      try: 'Format the same price as US dollars, euros, Nigerian naira and Indian rupees with toLocaleString.',
      minutes: 10,
      questions: [
        q.single('price.toLocaleString("en-NG", { style: "currency", currency: "NGN" }) formats the price…', ['As Nigerian naira', 'As US dollars', 'As a date', 'As a percentage'], 0),
        q.single('A locale like "en-US" controls…', ['Number formats such as separators and decimal points', 'The font', 'Only the time zone', 'The page language'], 0),
      ],
    },
    pq_FYp2JSLI: {
      title: 'Compound interest calculator',
      try: 'Build the compound interest calculator: principal, interest rate and years in, total amount out, with input checks and currency formatting.',
      minutes: 30,
      questions: [
        q.single('With compound interest, A = P(1 + r)ⁿ, interest is earned on…', ['The principal plus earlier interest', 'Only the principal', 'Nothing', 'The tax'], 0),
        q.num('1,000 grows at 10% a year, compounded yearly. What is it worth after 2 years?', 1210, 0),
      ],
    },
    '2glfqa-ZbNw': {
      title: 'Digital clock',
      try: 'Build the digital clock that updates every second, with leading zeros and a 12-hour AM/PM format.',
      minutes: 20,
      questions: [
        q.single('setInterval(update, 1000) runs update…', ['Every second until it’s cleared', 'Once after a second', '1000 times', 'Only on click'], 0),
        q.single('String(5).padStart(2, "0") gives…', ['"05"', '"50"', '"5"', '"005"'], 0),
      ],
    },
    'd8-LGhKtzRw': {
      title: 'Stopwatch',
      try: 'Build the stopwatch with Start, Stop and Reset buttons, showing hours, minutes, seconds and hundredths.',
      minutes: 30,
      questions: [
        q.single('To stop a setInterval you call…', ['clearInterval(id)', 'stopInterval(id)', 'setInterval(0)', 'pauseInterval(id)'], 0),
        q.single('Date.now() gives…', ['Milliseconds since 1 January 1970', 'Today’s date as text', 'The hour', 'Seconds since midnight'], 0),
      ],
    },
    'fl-_6d18DN0': {
      title: 'ES6 modules',
      try: 'Move your maths helpers into mathUtil.js, export them, and import them into index.js (with type="module" on the script tag).',
      minutes: 15,
      questions: [
        q.single('export lets you…', ['Make functions or values available to other files', 'Download a file', 'Print a page', 'Delete a module'], 0),
        q.single('To use import in the browser, the script tag needs…', ['type="module"', 'async', 'lang="js"', 'nothing extra'], 0),
      ],
    },
    Coyy79wRz_s: {
      title: 'Asynchronous code',
      try: 'Log three messages with the middle one inside a setTimeout of 0, and write a comment explaining why the order changes.',
      minutes: 10,
      questions: [
        q.single('Asynchronous code…', ['Lets other code run while it waits', 'Always runs first', 'Freezes the page', 'Only runs on servers'], 0),
        q.tf('Synchronous code runs line by line, each line waiting for the one before.', true),
      ],
    },
    NwoAZF66_Go: {
      title: 'Error handling',
      try: 'Wrap a division function in try/catch, throw an error for dividing by zero or for non-numbers, and show a friendly message.',
      minutes: 15,
      questions: [
        q.single('The catch block runs…', ['When code in the try block throws an error', 'Always', 'Before try', 'Never'], 0),
        q.single('The finally block runs…', ['Whether or not there was an error', 'Only after an error', 'Only after success', 'Never'], 0),
      ],
    },
    'I5kj-YsmWjM': {
      title: 'Calculator',
      try: 'Build the calculator with a display, digit and operator buttons, a clear button and an equals button. Put the projects from this course online with GitHub Pages and log the links as your make.',
      minutes: 30,
      questions: [
        q.single('Why wrap the calculation in try/catch?', ['So invalid input shows “Error” instead of breaking the app', 'To make it faster', 'To style it', 'It’s required'], 0),
        q.tf('A grid or flexbox layout keeps calculator buttons evenly sized.', true),
      ],
    },
  },
  checkpoint: programExam('Projects, modules and errors exam', [
    q.single('toLocaleString and Intl.NumberFormat help you…', ['Show numbers and money the way each country expects', 'Translate text', 'Round to whole numbers only', 'Convert currencies at live rates'], 0),
    q.tf('Formatting a number as a currency doesn’t convert it at an exchange rate.', true),
    q.single('In A = P(1 + r)ⁿ, n is…', ['The number of compounding periods', 'The principal', 'The rate', 'The total'], 0),
    q.single('An interest rate of 5% goes into the formula as…', ['0.05', '5', '0.5', '50'], 0),
    q.single('Why check for NaN or negative values in a calculator?', ['So bad input doesn’t produce nonsense', 'To make it slower', 'To style errors', 'There’s no need'], 0),
    q.single('setInterval differs from setTimeout because it…', ['Repeats until it’s cleared', 'Runs once', 'Runs immediately', 'Can’t be cancelled'], 0),
    q.single('new Date().getHours() returns…', ['The hour, from 0 to 23', 'The minutes', 'The date', 'The seconds'], 0),
    q.num('In 12-hour time, what hour is 15:00?', 3, 0),
    q.single('A stopwatch that works out elapsed time from Date.now() is more accurate than adding 10ms per tick because…', ['Timers can fire late, but the clock time is exact', 'Date.now() is slower', 'It uses less memory', 'They are the same'], 0),
    q.single('export default function add() {} is imported with…', ['import add from "./math.js";', 'import { default } from "./math.js";', 'require add', 'include "math.js"'], 0),
    q.single('A named export like export const PI = 3.14; is imported with…', ['import { PI } from "./math.js";', 'import PI from "./math.js";', 'import * PI', 'get PI'], 0),
    q.single('Modules help because…', ['Code is split into reusable files with clear imports', 'Code then runs only on servers', 'HTML is no longer needed', 'Every loop runs faster'], 0),
    q.single('console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C"); prints…', ['A, C, B', 'A, B, C', 'B, A, C', 'C, B, A'], 0),
    q.single('In the browser, your JavaScript runs on…', ['One main thread, with waiting tasks queued', 'A separate thread for every line', 'The server only', 'The graphics card'], 0),
    q.single('throw new Error("Bad input") …', ['Raises an error that a catch block can handle', 'Only prints a warning', 'Closes the browser', 'Is ignored'], 0),
    q.single('Which error do you get when calling something that isn’t a function?', ['TypeError', 'SyntaxError', 'RangeError', 'MathError'], 0),
    q.single('A ReferenceError means…', ['You used a variable that doesn’t exist', 'A number is too big', 'A string has a typo', 'The server failed'], 0),
    q.order('Put the blocks in the order they’re written.', ['try', 'catch', 'finally']),
    q.single('eval() is risky in a calculator because…', ['It runs any code it’s given', 'It is slow', 'It can’t do maths', 'No browser supports it'], 0),
    q.single('Putting projects on GitHub Pages lets you…', ['Share a live link for free', 'Hide your code', 'Run a database', 'Skip HTML'], 0),
  ]),
};
