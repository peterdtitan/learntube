import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Components, styles and props',
  lessons: {
    'hn80mWvP-9g': {
      title: 'Set up React and your first components',
      try: 'Install Node.js, create a React app with Vite (npm create vite@latest), and build Header, Food and Footer components that you render in App.',
      minutes: 30,
      questions: [
        q.single('A React component is…', ['A function that returns JSX describing part of the page', 'A CSS file', 'A database', 'An HTML file'], 0),
        q.single('JSX lets you…', ['Write HTML-like markup inside JavaScript', 'Write CSS in HTML', 'Run Python', 'Skip JavaScript'], 0),
        q.tf('Component names must start with a capital letter.', true),
      ],
    },
    yYiwxYqQ9vg: {
      title: 'Card components',
      try: 'Make a profile Card component with an image, a name and a short bio, and render it three times.',
      minutes: 15,
      questions: [
        q.single('In JSX, the HTML class attribute is written…', ['className', 'class', 'cssClass', 'styleClass'], 0),
        q.single('A component must return…', ['One parent element, or a fragment <>…</>', 'Several siblings with no wrapper', 'A string of CSS', 'Nothing'], 0),
      ],
    },
    r3SMd0YTSZs: {
      title: 'Adding CSS styles',
      try: 'Style one component three ways (a global stylesheet, a CSS module and inline styles) and note the trade-offs.',
      minutes: 15,
      questions: [
        q.single('CSS modules (Button.module.css) …', ['Scope class names to one component so they don’t clash', 'Make CSS global', 'Replace JSX', 'Are inline styles'], 0),
        q.single('Inline styles in JSX are written as…', ['An object, like style={{ color: "red" }}', 'A string, like style="color: red"', 'A class', 'A CSS file'], 0),
      ],
    },
    uvEAvxWvwOs: {
      title: 'Props',
      try: 'Make a Student component that takes name, age and isStudent as props, with propTypes and default values, and render several students.',
      minutes: 15,
      questions: [
        q.single('Props are…', ['Values passed from a parent component into a child', 'Global variables', 'CSS properties', 'Database rows'], 0),
        q.single('<Student name="Ada" age={36} /> passes age as…', ['The number 36', 'The string "36"', 'undefined', 'An array'], 0),
      ],
    },
    XvURBpFxdGw: {
      title: 'Conditional rendering',
      try: 'Make a UserGreeting component that shows “Welcome back” when isLoggedIn is true and “Please log in” otherwise, using a ternary.',
      minutes: 15,
      questions: [
        q.single('{isLoggedIn ? <Welcome /> : <Login />} …', ['Shows Welcome when isLoggedIn is true, otherwise Login', 'Shows both', 'Shows neither', 'Throws an error'], 0),
        q.single('{hasItems && <List />} shows List…', ['Only when hasItems is true', 'Always', 'Never', 'When hasItems is false'], 0),
      ],
    },
    fkl1Kn_QWCI: {
      title: 'Rendering lists',
      try: 'Render a list of fruits from an array of objects with map, give each item a key, then sort and filter the list before rendering it.',
      minutes: 25,
      questions: [
        q.single('Lists in React are usually rendered with…', ['array.map(), returning an element for each item', 'A for loop inside JSX', 'document.createElement', 'CSS'], 0),
        q.single('Each list item needs a key that is…', ['Unique and stable, like an id', 'The same for every item', 'Random on every render', 'Optional and ignored'], 0),
      ],
    },
  },
  checkpoint: programExam('Components and props exam', [
    q.single('React is…', ['A JavaScript library for building user interfaces', 'A database', 'A CSS framework', 'A programming language'], 0),
    q.single('Vite is used to…', ['Create and run a fast development setup for your app', 'Host databases', 'Write CSS', 'Test APIs'], 0),
    q.single('npm run dev …', ['Starts the development server', 'Deletes the project', 'Publishes to the web', 'Installs Node.js'], 0),
    q.single('In JSX, JavaScript expressions go inside…', ['Curly braces { }', 'Square brackets [ ]', 'Quotes " "', 'Angle brackets < >'], 0),
    q.single('Which is a valid component?', ['function Header() { return <h1>Hi</h1>; }', 'function header() { return "<h1>"; }', 'component Header = <h1>', 'Header => h1'], 0),
    q.single('A fragment <>…</> lets you…', ['Return several elements without adding a wrapper to the DOM', 'Hide elements', 'Style elements', 'Make a list'], 0),
    q.single('Components are reusable because…', ['You can render the same one many times with different props', 'They are global variables', 'You copy them by hand', 'They run once'], 0),
    q.single('To use an image file in a component you can…', ['Import it, like import pic from "./pic.png", and use src={pic}', 'Only use CSS backgrounds', 'Put it in package.json', 'Use <image file>'], 0),
    q.single('Inline styles in JSX use property names like…', ['backgroundColor', 'background-color', 'bg-color', 'BACKGROUND'], 0),
    q.single('A class from a CSS module is used as…', ['className={styles.button}', 'className="styles.button"', 'class={button}', 'style={styles}'], 0),
    q.single('Props flow…', ['From parent to child', 'From child to parent', 'Between any two components automatically', 'Into the CSS'], 0),
    q.tf('A component should never change its own props.', true),
    q.single('propTypes are used to…', ['Check that props have the expected types while developing', 'Style props', 'Pass props', 'Speed up rendering'], 0),
    q.single('A default prop value is used when…', ['That prop isn’t passed', 'The prop is wrong', 'Always', 'Never'], 0),
    q.single('Returning which value renders nothing?', ['null', '"nothing"', 'false as text', '"empty"'], 0),
    q.single('Conditional rendering means…', ['Showing different output depending on a condition', 'Rendering twice', 'Using CSS conditions', 'Loading a page'], 0),
    q.single('fruits.map(f => <li key={f.id}>{f.name}</li>) …', ['Makes one <li> per fruit', 'Makes one <li> in total', 'Changes the array', 'Throws an error'], 0),
    q.single('Using the array index as a key causes problems when…', ['Items can be reordered, added or removed', 'The list is short', 'Items are strings', 'Never'], 0),
    q.single('To show only the low-calorie fruits you…', ['Filter the array before mapping it', 'Hide them with CSS', 'Use propTypes', 'Use a fragment'], 0),
    q.order('Put building a list component in order.', ['Define the array of data', 'Filter or sort it if needed', 'Map each item to JSX with a key', 'Render the list in the component']),
  ]),
};
