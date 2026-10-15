import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/python-first-programs.json';

// "Python for beginners" is one of YouTube's top course searches. Bro Code's free series
// teaches one idea per short video and builds a small program after almost every one.

export default {
  slug: 'skill-python-first-programs',
  title: 'Write your first Python programs',
  description: 'Learn variables, input, maths, decisions, loops, lists, dictionaries and functions by building small programs: a calculator, a shopping cart, a countdown timer and a game.',
  makeTitle: 'A number-guessing or quiz game you coded yourself in Python',
  skillId: 'software-engineering',
  cover: 'Sg4GMVMdOPo',
  by: 'Bro Code',
  videos,
  lessons: {
    Sg4GMVMdOPo: {
      title: 'Start coding with Python',
      try: 'Install Python and a code editor (PyCharm or VS Code, both free), or use an online editor. Run a program that prints your name and your favourite food.',
      minutes: 20,
      questions: [
        q.single('Which line prints Hello in Python?', ['print("Hello")', 'echo "Hello"', 'console.log("Hello")', 'say Hello'], 0),
        q.single('A line starting with # in Python is…', ['A comment that Python ignores', 'An error', 'A print statement', 'A variable'], 0),
      ],
    },
    '7IoQ5BGkTJo': {
      title: 'Variables',
      try: 'Make four variables about yourself: a string (name), an int (age), a float (height) and a boolean (is_student). Print a sentence using them with an f-string.',
      minutes: 15,
      questions: [
        q.match('Match each value to its type.', [['"Ada"', 'str'], ['25', 'int'], ['1.75', 'float'], ['True', 'bool']]),
        q.single('What does print(f"I am {age}") do when age = 30?', ['Prints I am 30', 'Prints I am {age}', 'Causes an error', 'Prints f"I am 30"'], 0),
        q.tf('Variable names in Python can’t contain spaces.', true),
      ],
    },
    Qtq83lAoogM: {
      title: 'Type casting',
      try: 'Convert the string "19.99" to a float, the float 3.7 to an int, and the int 5 to a string. Print each result and its type().',
      minutes: 10,
      questions: [
        q.single('What is int(3.9)?', ['3', '4', '3.9', 'An error'], 0, 'int() cuts off the decimal part; it doesn’t round.'),
        q.single('What is str(5) + str(5)?', ['"55"', '10', '"10"', 'An error'], 0),
      ],
    },
    nMCOB8KElwo: {
      title: 'User input',
      try: 'Write a program that asks for the length and width of a rectangle and prints its area. Remember input() gives you text.',
      minutes: 20,
      questions: [
        q.single('input() always returns…', ['A string', 'An int', 'A float', 'A boolean'], 0),
        q.single('To use typed-in numbers in maths, you…', ['Convert them with int() or float()', 'Leave them as strings', 'Use print() first', 'Add quotes'], 0),
      ],
    },
    jc7TBgMS_kw: {
      title: 'Math in Python',
      try: 'Write a program that asks for a circle’s radius and prints its area rounded to 2 decimal places, using the math module’s pi.',
      minutes: 20,
      questions: [
        q.num('What does 7 // 2 give in Python?', 3, 0, '// is floor division: it drops the remainder.'),
        q.num('What does 7 % 2 give?', 1, 0, '% gives the remainder.'),
        q.num('What does 2 ** 3 give?', 8, 0, '** is “to the power of”.'),
      ],
    },
    FvMPfrgGeKs: {
      title: 'If, elif and else',
      try: 'Ask for an age. Print "child" under 13, "teen" from 13 to 19, and "adult" otherwise.',
      minutes: 15,
      questions: [
        q.single('Which keyword checks another condition after if?', ['elif', 'elseif', 'else if', 'then'], 0),
        q.single('== in Python means…', ['Is equal to', 'Assign a value', 'Not equal', 'Greater than'], 0),
        q.tf('Python uses indentation (spaces) to show which lines belong to an if block.', true),
      ],
    },
    yUrYouDQZL8: {
      title: 'Build a calculator',
      try: 'Build the calculator from the video, then add a check that stops division by zero.',
      minutes: 20,
      questions: [
        q.single('Dividing by zero in Python…', ['Raises a ZeroDivisionError', 'Returns 0', 'Returns infinity', 'Is fine'], 0),
        q.single('Which operator divides and always returns a float?', ['/', '//', '%', '**'], 0),
      ],
    },
    W7luvtXeQTA: {
      title: 'Logical operators',
      try: 'Write a check that prints "nice day" only if the temperature is between 20 and 30 and it is not raining.',
      minutes: 10,
      questions: [
        q.single('True and False is…', ['False', 'True', 'An error', 'None'], 0),
        q.single('True or False is…', ['True', 'False', 'An error', 'None'], 0),
        q.single('not True is…', ['False', 'True', 'None', '0'], 0),
      ],
    },
    tb6EYiHtcXU: {
      title: 'String methods',
      try: 'Ask for a username. Reject it if it is over 12 characters, has spaces, or contains digits, using len() and string methods.',
      minutes: 20,
      questions: [
        q.single('What does "hello".upper() return?', ['"HELLO"', '"Hello"', '"hello"', 'An error'], 0),
        q.single('len("Python") is…', ['6', '5', '7', '0'], 0),
      ],
    },
    '7pXf1DUuaIo': {
      title: 'String indexing and slicing',
      try: 'Ask for an email address and print the part before the @ and the part after it, using find() and slicing.',
      minutes: 15,
      questions: [
        q.single('In Python, the first character of a string is at index…', ['0', '1', '-1', 'Any'], 0),
        q.single('"Python"[-1] is…', ['"n"', '"P"', '"o"', 'An error'], 0),
        q.single('"Python"[0:3] is…', ['"Pyt"', '"Pyth"', '"yth"', '"Py"'], 0),
      ],
    },
    rRTjPnVooxE: {
      title: 'While loops',
      try: 'Keep asking for a name until the user types something that isn’t empty, then greet them.',
      minutes: 15,
      questions: [
        q.single('A while loop runs…', ['As long as its condition is True', 'Exactly once', 'A fixed number of times always', 'Only if the condition is False'], 0),
        q.tf('A while loop whose condition never becomes False runs forever.', true),
      ],
    },
    KWgYha0clzw: {
      title: 'For loops',
      try: 'Use a for loop with range() to print the numbers 1 to 10, then only the even numbers from 2 to 20.',
      minutes: 15,
      questions: [
        q.single('range(1, 5) gives…', ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '5, 4, 3, 2, 1'], 0),
        q.single('Which keyword skips to the next loop round?', ['continue', 'break', 'pass', 'skip'], 0),
        q.single('Which keyword leaves a loop completely?', ['break', 'continue', 'exit', 'stop'], 0),
      ],
    },
    APWy6Pc83gE: {
      title: 'Nested loops',
      try: 'Ask for rows, columns and a symbol, and print a rectangle of that symbol with nested loops.',
      minutes: 15,
      questions: [
        q.single('With an outer loop of 3 rounds and an inner loop of 4, the inner body runs…', ['12 times', '7 times', '4 times', '3 times'], 0),
        q.tf('print("*", end="") prints without moving to a new line.', true),
      ],
    },
    KseiSR0MCTI: {
      title: 'A countdown timer',
      try: 'Build the countdown timer, then make it print minutes and seconds like 01:05.',
      minutes: 20,
      questions: [
        q.single('time.sleep(1) makes the program…', ['Wait one second', 'Stop forever', 'Count to one', 'Print 1'], 0),
        q.single('Which module do you import for sleep()?', ['time', 'math', 'random', 'sys'], 0),
      ],
    },
    'gOMW_n2-2Mw': {
      title: 'Lists, sets and tuples',
      try: 'Make a list of five foods. Add one, remove one, sort the list and print it. Then turn it into a set and see what changes.',
      minutes: 20,
      questions: [
        q.match('Match each collection to what makes it different.', [['List', 'Ordered and changeable'], ['Tuple', 'Ordered and unchangeable'], ['Set', 'Unordered with no duplicates']]),
        q.single('Which adds an item to the end of a list?', ['append()', 'add()', 'push()', 'insert_end()'], 0),
        q.single('Which brackets make a list?', ['[ ]', '( )', '{ }', '< >'], 0),
      ],
    },
    kbyHLU9JqjE: {
      title: 'A shopping cart program',
      try: 'Build the shopping cart: keep asking for items and prices until the user types q, then print the items and the total.',
      minutes: 20,
      questions: [
        q.single('sum([2, 3, 5]) is…', ['10', '235', '3', '[2, 3, 5]'], 0),
        q.tf('Two lists can hold matching data, like item names and their prices, at the same positions.', true),
      ],
    },
    MZZSMaEAC2g: {
      title: 'Dictionaries',
      try: 'Make a dictionary of three countries and their capitals. Print each pair with a loop over .items().',
      minutes: 15,
      questions: [
        q.single('A dictionary stores…', ['Key–value pairs', 'Only numbers', 'Only one value', 'Files'], 0),
        q.single('capitals["Nigeria"] returns…', ['The value stored under the key "Nigeria"', 'The key', 'The number of keys', 'An empty string always'], 0),
      ],
    },
    piJc18hcH0Y: {
      title: 'Random numbers',
      try: 'Simulate rolling two dice 10 times with random.randint and print each total.',
      minutes: 10,
      questions: [
        q.single('random.randint(1, 6) can return…', ['Any whole number from 1 to 6, including 6', '0 to 5', 'Only 1 or 6', 'A decimal'], 0),
        q.single('random.choice(list) returns…', ['A random item from the list', 'The first item', 'The list shuffled', 'The list’s length'], 0),
      ],
    },
    '89cGQjB5R4M': {
      title: 'Functions',
      try: 'Write a function that takes a price and a discount percent and returns the new price. Call it three times with different values.',
      minutes: 20,
      questions: [
        q.single('Which keyword defines a function?', ['def', 'func', 'function', 'define'], 0),
        q.single('return in a function…', ['Sends a value back to where the function was called', 'Prints a value', 'Restarts the program', 'Ends Python'], 0),
        q.tf('A function only runs when it is called.', true),
      ],
    },
    jcKe13D6bao: {
      title: 'A number guessing game',
      try: 'Build the number guessing game. Add a limit of 7 guesses and tell the player how many they used.',
      minutes: 30,
      questions: [
        q.single('In the guessing game, what tells the player to go higher or lower?', ['Comparing the guess with the secret number', 'Printing the secret number', 'A random choice', 'A for loop over 1 to 100'], 0),
        q.tf('Checking that the guess is a number before converting it avoids crashes.', true),
      ],
    },
    zehwgTB0vV8: {
      title: 'A quiz game',
      try: 'Build a quiz or finish your guessing game with your own twist. Run it, share it, and log the code (or a screenshot) as your make.',
      minutes: 45,
      questions: [
        q.single('A good way to store quiz questions and answers is…', ['Lists or a dictionary', 'Separate variables named q1 to q100', 'Comments', 'One long string'], 0),
        q.single('To show the score as a percentage, you…', ['Divide correct answers by questions and multiply by 100', 'Add the scores', 'Use random', 'Print the list'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Variables, input and maths',
      lessons: ['Sg4GMVMdOPo', '7IoQ5BGkTJo', 'Qtq83lAoogM', 'nMCOB8KElwo', 'jc7TBgMS_kw'],
      checkpoint: exam('Variables and input exam', [
        q.single('What does type(3.0) show?', ['float', 'int', 'str', 'bool'], 0),
        q.single('What is the result of "3" + "4"?', ['"34"', '7', '"7"', 'An error'], 0),
        q.single('What is the result of int("3") + int("4")?', ['7', '"34"', '34', 'An error'], 0),
        q.single('What does round(3.14159, 2) give?', ['3.14', '3.1', '3', '3.142'], 0),
        q.num('What does 17 % 5 give?', 2, 0),
        q.num('What does 10 // 3 give?', 3, 0),
        q.single('Which is a valid variable name?', ['first_name', 'first name', '1st_name', 'first-name'], 0),
        q.tf('Python is case-sensitive: Age and age are different variables.', true),
        q.single('Which line asks the user for their name?', ['name = input("Name: ")', 'name = print("Name: ")', 'input = name', 'name == input()'], 0),
        q.single('What is bool(0)?', ['False', 'True', '0', 'None'], 0),
        q.single('After x = 5 then x += 2, x is…', ['7', '5', '2', '52'], 0),
        q.order('Put the steps of a simple input program in order.', ['Ask for input', 'Convert it to a number', 'Do the calculation', 'Print the result']),
      ]),
    },
    {
      title: 'Decisions and text',
      lessons: ['FvMPfrgGeKs', 'yUrYouDQZL8', 'W7luvtXeQTA', 'tb6EYiHtcXU', '7pXf1DUuaIo'],
      checkpoint: exam('Decisions and strings exam', [
        q.single('If age = 15, which branch runs? if age >= 18 … elif age >= 13 … else …', ['The elif branch', 'The if branch', 'The else branch', 'None of them'], 0),
        q.single('!= means…', ['Not equal to', 'Equal to', 'Assign', 'Greater or equal'], 0),
        q.single('What is (5 > 3) and (2 > 4)?', ['False', 'True', 'An error', 'None'], 0),
        q.single('What is (5 > 3) or (2 > 4)?', ['True', 'False', 'An error', 'None'], 0),
        q.single('"Lagos".lower() returns…', ['"lagos"', '"LAGOS"', '"Lagos"', 'An error'], 0),
        q.single('"banana".count("a") returns…', ['3', '2', '1', '6'], 0),
        q.single('"Hello World"[6:] is…', ['"World"', '"Hello"', '" World"', '"W"'], 0),
        q.single('"abc".isdigit() returns…', ['False', 'True', '"abc"', 'An error'], 0),
        q.tf('Strings in Python can’t be changed in place; methods like upper() return a new string.', true),
        q.single('What does "a,b,c".split(",") return?', ['["a", "b", "c"]', '"abc"', '"a b c"', '3'], 0),
        q.single('A conditional expression (ternary) looks like…', ['x if condition else y', 'if x then y', 'condition ? x : y', 'x when y'], 0),
        q.single('Which checks that a string has text in it before using it?', ['if name:', 'if name == None:', 'if len(name) < 0:', 'if not True:'], 0),
      ]),
    },
    {
      title: 'Loops',
      lessons: ['rRTjPnVooxE', 'KWgYha0clzw', 'APWy6Pc83gE', 'KseiSR0MCTI'],
      checkpoint: exam('Loops exam', [
        q.single('How many times does for i in range(5): run?', ['5', '4', '6', '0'], 0),
        q.single('range(0, 10, 2) gives…', ['0, 2, 4, 6, 8', '0, 2, 4, 6, 8, 10', '2, 4, 6, 8, 10', '0 to 10'], 0),
        q.single('range(10, 0, -1) counts…', ['From 10 down to 1', 'From 0 up to 10', 'From 10 down to 0', 'Nothing'], 0),
        q.single('Which loop suits “keep asking until the answer is valid”?', ['while', 'for with range(3)', 'Neither', 'A nested for'], 0),
        q.single('Which loop suits “do this for every item in a list”?', ['for', 'while True with no break', 'Neither', 'if'], 0),
        q.single('break inside a loop…', ['Stops the loop immediately', 'Skips one round', 'Restarts the loop', 'Pauses for a second'], 0),
        q.single('continue inside a loop…', ['Skips the rest of this round and starts the next', 'Stops the loop', 'Ends the program', 'Prints a blank line'], 0),
        q.tf('A for loop can go over the letters of a string.', true),
        q.num('A 4-row by 5-column rectangle printed with nested loops has how many symbols?', 20, 0),
        q.single('An infinite loop happens when…', ['The while condition never becomes False', 'The loop has a break', 'You use range()', 'The list is empty'], 0),
        q.single('Which module gives you sleep() for a countdown?', ['time', 'random', 'math', 'string'], 0),
        q.order('Put the countdown timer’s steps in order.', ['Ask how many seconds', 'Loop from that number down to 1', 'Print the time left and sleep one second', 'Print “Time’s up”']),
      ]),
    },
    {
      title: 'Collections, functions and games',
      lessons: ['gOMW_n2-2Mw', 'kbyHLU9JqjE', 'MZZSMaEAC2g', 'piJc18hcH0Y', '89cGQjB5R4M', 'jcKe13D6bao', 'zehwgTB0vV8'],
      checkpoint: exam('Collections and functions exam', [
        q.single('After foods = ["rice", "beans"] and foods.append("yam"), foods is…', ['["rice", "beans", "yam"]', '["yam", "rice", "beans"]', '["rice", "beans"]', 'An error'], 0),
        q.single('len(["a", "b", "c"]) is…', ['3', '2', '"abc"', '0'], 0),
        q.single('Which collection can’t contain duplicates?', ['A set', 'A list', 'A tuple', 'A string'], 0),
        q.single('Which collection can’t be changed after it is made?', ['A tuple', 'A list', 'A dictionary', 'A set'], 0),
        q.single('person = {"name": "Ada", "age": 30}. person["age"] is…', ['30', '"age"', '"Ada"', 'An error'], 0),
        q.single('Which gives all the keys of a dictionary?', ['.keys()', '.values()', '.items()', '.all()'], 0),
        q.tf('random.randint(1, 10) can return 10.', true, 'Unlike range(), randint includes both ends.'),
        q.single('def greet(name): return f"Hi {name}". What does greet("Tobi") return?', ['"Hi Tobi"', '"Hi name"', 'None', 'An error'], 0),
        q.single('A function with no return statement returns…', ['None', '0', 'An empty string', 'True'], 0),
        q.tf('Parameters let one function work with different values each time it is called.', true),
        q.multi('What does a guessing game need?', ['A random secret number', 'A loop that keeps asking', 'Higher/lower feedback', 'A dictionary of capitals'], [0, 1, 2]),
        q.order('Put the guessing game’s steps in order.', ['Pick a random secret number', 'Ask for a guess', 'Say higher or lower', 'Repeat until correct', 'Print the number of guesses']),
      ]),
    },
  ],
};
