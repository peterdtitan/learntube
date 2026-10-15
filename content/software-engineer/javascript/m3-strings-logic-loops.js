import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Strings, logic and loops',
  lessons: {
    wssvLtVSFeI: {
      title: 'String methods',
      try: 'Take a username the user types, trim the spaces, check its length, and make the first letter upper case.',
      minutes: 15,
      questions: [
        q.single('"  hi  ".trim() gives…', ['"hi"', '"  hi"', '"hi  "', '"  hi  "'], 0),
        q.single('"hello".toUpperCase() gives…', ['"HELLO"', '"Hello"', '"hello"', '"hELLO"'], 0),
        q.single('"banana".indexOf("n") is…', ['2', '1', '3', '-1'], 0),
      ],
    },
    sPPGd4Lfh3s: {
      title: 'String slicing',
      try: 'From a full name, slice out the first and last names using indexOf(" ") and slice().',
      minutes: 15,
      questions: [
        q.single('"JavaScript".slice(0, 4) gives…', ['"Java"', '"JavaS"', '"Scri"', '"ript"'], 0),
        q.single('"hello".slice(-2) gives…', ['"lo"', '"he"', '"llo"', '"o"'], 0),
      ],
    },
    J4YhlDsNqeE: {
      title: 'Method chaining',
      try: 'In one line, trim a name, take its first letter, make it upper case, and join it to the rest of the name in lower case.',
      minutes: 10,
      questions: [
        q.single('Method chaining means…', ['Calling one method after another on each result, like s.trim().toUpperCase()', 'Linking HTML pages', 'Looping', 'Nesting functions'], 0),
        q.tf('Chaining makes code shorter, but very long chains can be harder to read.', true),
      ],
    },
    ovWYhDVQiR8: {
      title: 'Logical operators',
      try: 'Check whether a temperature is in a comfortable range with &&, outside it with ||, and flip a boolean with !.',
      minutes: 10,
      questions: [
        q.single('true && false is…', ['false', 'true', 'undefined', 'An error'], 0),
        q.single('true || false is…', ['true', 'false', 'undefined', 'An error'], 0),
      ],
    },
    O7aUm0AuUy4: {
      title: 'Strict equality',
      try: 'Compare 5 == "5" and 5 === "5" in the console, then change your earlier if statements to use ===.',
      minutes: 10,
      questions: [
        q.single('5 === "5" is…', ['false', 'true', 'An error', 'undefined'], 0),
        q.single('!== means…', ['Not equal in value or type', 'Equal', 'Assign', 'Greater than'], 0),
      ],
    },
    TDUz9QcGPoE: {
      title: 'While loops',
      try: 'Keep asking for a username with a while loop until the user enters something that isn’t empty.',
      minutes: 15,
      questions: [
        q.single('A while loop repeats…', ['As long as its condition is true', 'Exactly 10 times', 'Once', 'Forever, no matter what'], 0),
        q.single('A do…while loop always runs…', ['At least once', 'Zero times', 'Twice', 'Only if its condition is true at the start'], 0),
      ],
    },
    ZOQYIWLngSU: {
      title: 'For loops',
      try: 'Use a for loop to count down from 10 to 1, then loop from 1 to 20 and skip 13 with continue.',
      minutes: 15,
      questions: [
        q.single('for (let i = 0; i < 3; i++) runs its body…', ['3 times', '2 times', '4 times', 'Forever'], 0),
        q.single('continue in a loop…', ['Skips to the next round', 'Stops the loop', 'Restarts the program', 'Does nothing'], 0),
      ],
    },
    maB0r59KOUk: {
      title: 'Number guessing game',
      try: 'Build the guessing game: a random number from 1 to 100, “too high” and “too low” hints, and a count of attempts.',
      minutes: 25,
      questions: [
        q.single('Why does the game use a loop?', ['To keep asking until the guess is right', 'To pick the number', 'To style the page', 'To end at once'], 0),
        q.single('A guess of "abc" should be handled by…', ['Checking isNaN after converting it and asking again', 'Counting it as right', 'Crashing', 'Ignoring all guesses'], 0),
      ],
    },
  },
  checkpoint: programExam('Strings, logic and loops exam', [
    q.single('"hello".length is…', ['5', '4', '6', '"hello"'], 0),
    q.single('"hello".charAt(0) is…', ['"h"', '"o"', '"e"', '0'], 0),
    q.single('"a-b-c".replaceAll("-", "/") gives…', ['"a/b/c"', '"a/b-c"', '"abc"', '"a-b-c"'], 0),
    q.single('"hello".includes("ell") is…', ['true', 'false', '1', '"ell"'], 0),
    q.single('"7".padStart(3, "0") gives…', ['"007"', '"700"', '"7"', '"0007"'], 0),
    q.single('String positions (indexes) start at…', ['0', '1', '-1', 'Any number'], 0),
    q.single('"JavaScript".slice(4) gives…', ['"Script"', '"Java"', '"aScript"', '"t"'], 0),
    q.single('In s.trim().toLowerCase(), toLowerCase runs on…', ['The trimmed string', 'The original string', 'Nothing', 'A number'], 0),
    q.single('!true is…', ['false', 'true', 'undefined', '0'], 0),
    q.single('age >= 13 && age <= 19 is true when age is…', ['From 13 to 19', 'Under 13', 'Over 19', 'Never'], 0),
    q.single('day === "Sat" || day === "Sun" is true when day is…', ['Either "Sat" or "Sun"', 'Both at once', 'Any day', 'Never'], 0),
    q.single('0 == false is true, but 0 === false is…', ['false', 'true', 'An error', 'undefined'], 0),
    q.tf('Using === avoids surprises from automatic type conversion.', true),
    q.single('A loop whose condition never becomes false is…', ['An infinite loop', 'A for loop', 'A function', 'A switch'], 0),
    q.single('break inside a loop…', ['Exits the loop immediately', 'Skips one round', 'Restarts the loop', 'Pauses the loop'], 0),
    q.num('How many times does for (let i = 1; i <= 10; i += 2) run its body?', 5, 0),
    q.single('Which loop fits “repeat until the user types quit”?', ['A while loop', 'A for loop that counts to 5', 'A switch', 'A ternary'], 0),
    q.single('In for (let i = 10; i > 0; i--), the last value of i inside the loop is…', ['1', '0', '10', '-1'], 0),
    q.order('Put a for loop’s parts in the order they first happen.', ['Start: let i = 0', 'Check: i < 5', 'Run the body', 'Step: i++']),
    q.single('In the guessing game, Math.floor(Math.random() * 100) + 1 picks…', ['A whole number from 1 to 100', 'A number from 0 to 99', 'A number from 1 to 99', 'A number from 0 to 100'], 0),
  ]),
};
