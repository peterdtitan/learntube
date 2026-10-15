import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Objects and arrays in state',
  lessons: {
    YxQlt3n1ZPA: {
      title: 'Updating objects in state',
      try: 'Keep a car object (year, make, model) in state and update each field from its own input using the spread operator.',
      minutes: 15,
      questions: [
        q.single('To update one property of an object in state you…', ['Copy it with spread and change that property: setCar(c => ({ ...c, year: 2025 }))', 'Change car.year directly', 'Delete the object', 'Use document.getElementById'], 0),
        q.tf('Replacing state with a new object, rather than changing the old one, lets React see the change.', true),
      ],
    },
    A9Bz2YxhAQk: {
      title: 'Updating arrays in state',
      try: 'Keep a list of foods in state, add new ones from an input with spread, and remove one when it’s clicked using filter.',
      minutes: 15,
      questions: [
        q.single('To add an item to an array in state you…', ['setFoods(f => [...f, newFood])', 'foods.push(newFood)', 'foods[foods.length] = newFood', 'setFoods(newFood)'], 0),
        q.single('To remove the item at index i you can…', ['setFoods(f => f.filter((_, idx) => idx !== i))', 'foods.splice(i, 1) on its own', 'delete foods[i]', 'setFoods([])'], 0),
      ],
    },
    Y62mbztjmus: {
      title: 'Updating arrays of objects',
      try: 'Keep a list of car objects in state, add a car from three inputs, and remove a car when it’s clicked.',
      minutes: 20,
      questions: [
        q.single('Adding an object to an array in state looks like…', ['setCars(c => [...c, { year, make, model }])', 'cars.push({ year })', 'setCars({ year })', 'cars = [...cars]'], 0),
        q.single('The inputs are cleared after adding by…', ['Setting their state back to empty values', 'Reloading the page', 'Deleting the inputs', 'Using CSS'], 0),
      ],
    },
    '9wiWzu_tRB0': {
      title: 'To-do list app',
      try: 'Build the to-do list: add tasks, delete tasks, and move tasks up and down. Then add one feature of your own, such as marking tasks as done.',
      minutes: 30,
      questions: [
        q.single('Moving a task up means…', ['Swapping it with the one before it in a copy of the array', 'Sorting alphabetically', 'Deleting it', 'Reloading'], 0),
        q.single('Before adding a task, the app should check…', ['That the text isn’t empty', 'The time', 'The colour', 'Nothing'], 0),
      ],
    },
  },
  checkpoint: programExam('Objects and arrays in state exam', [
    q.single('Mutating state means…', ['Changing the existing object or array directly', 'Making a copy', 'Calling the setter', 'Rendering'], 0),
    q.tf('Treat objects and arrays in state as read-only.', true),
    q.single('{ ...car, make: "Ford" } …', ['Copies car and overrides make', 'Deletes car', 'Adds a car to an array', 'Throws an error'], 0),
    q.single('setCar({ make: "Ford" }) on a car that also had year and model…', ['Loses year and model', 'Keeps everything', 'Throws an error', 'Changes only make'], 0),
    q.single('With one handler for several inputs, a field is updated by its name with…', ['setCar(c => ({ ...c, [e.target.name]: e.target.value }))', 'setCar(e.target.value)', 'car[e.target.name] = e.target.value', 'setCar(e)'], 0),
    q.single('Which method returns a new array, so it’s safe for state?', ['filter', 'push', 'splice', 'sort'], 0),
    q.multi('Which methods change the original array, so you should copy first?', ['push', 'splice', 'sort', 'map'], [0, 1, 2]),
    q.single('[...foods, "pizza"] …', ['Makes a new array with pizza at the end', 'Changes foods', 'Removes pizza', 'Sorts foods'], 0),
    q.single('To update one car in an array you can…', ['Map over the cars and return a changed copy of the matching one', 'Change cars[i].year directly', 'Use push', 'Reload'], 0),
    q.single('In filter((_, i) => i !== index), the _ is…', ['A parameter you don’t use (the item)', 'undefined', 'An error', 'The index'], 0),
    q.single('Reading an input with document.getElementById in React is…', ['Possible, but controlled inputs with state are preferred', 'Required', 'Impossible', 'The only way'], 0),
    q.single('Swapping two items in a copy of an array can be done with…', ['[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]', 'arr.swap(i)', 'arr.sort()', 'arr.reverse()'], 0),
    q.single('Each to-do item rendered from an array needs…', ['A key', 'An HTML id', 'A class', 'A ref'], 0),
    q.single('Trimming the input with text.trim() before adding a task helps…', ['Stop empty or space-only tasks', 'Sort tasks', 'Speed up React', 'Style tasks'], 0),
    q.single('A task can’t move up when…', ['It’s already first', 'It’s last', 'It’s done', 'Always'], 0),
    q.single('setTasks(t => [...t, newTask]) uses an updater because…', ['It always builds on the latest tasks', 'Arrays require it', 'It sorts', 'It deletes'], 0),
    q.single('The to-do input’s text and the list of tasks are…', ['Two separate pieces of state', 'The same variable', 'Props', 'Refs'], 0),
    q.single('onKeyDown with e.key === "Enter" can be used to…', ['Add a task when the user presses Enter', 'Delete every task', 'Reload', 'Style the list'], 0),
    q.tf('Copying with spread is shallow: nested objects inside are still shared.', true),
    q.order('Put adding a to-do in order.', ['Type in the input (state updates)', 'Click Add', 'Check the text isn’t empty', 'Set tasks to a new array including the task', 'Clear the input']),
  ]),
};
