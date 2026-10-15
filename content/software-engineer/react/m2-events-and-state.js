import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Events and state',
  lessons: {
    KpiiKuqNlYw: {
      title: 'Click events',
      try: 'Make a button that says “Ouch!” when clicked, counts how many times it’s been clicked, and hides an emoji on double-click.',
      minutes: 15,
      questions: [
        q.single('In React, a click handler is added with…', ['onClick={handleClick}', 'onclick="handleClick()"', 'click={handleClick()}', 'addEventListener inside JSX'], 0),
        q.single('onClick={() => handleClick("Ada")} is used to…', ['Pass an argument without calling the function straight away', 'Call it while rendering', 'Remove the click', 'Double-click'], 0),
      ],
    },
    SpDG283b4bw: {
      title: 'useState',
      try: 'Build a counter component with useState, with Increment, Decrement and Reset buttons, plus a name that changes when you click a button.',
      minutes: 20,
      questions: [
        q.single('In const [count, setCount] = useState(0);, setCount…', ['Updates count and re-renders the component', 'Reads count', 'Resets the app', 'Is a constant'], 0),
        q.single('Why not change a state variable directly, as in count = 5?', ['React won’t know to re-render', 'It’s faster', 'It works the same', 'It deletes the state'], 0),
      ],
    },
    JhIbXor84Wc: {
      title: 'The onChange event',
      try: 'Make a form with a text input, a number input, a textarea, a select and radio buttons, each controlled by state and shown below as you type.',
      minutes: 20,
      questions: [
        q.single('onChange on an input runs…', ['Every time its value changes', 'Only on submit', 'Once on load', 'Never'], 0),
        q.single('event.target.value inside onChange is…', ['The input’s current value', 'The input’s id', 'The old value', 'The event type'], 0),
      ],
    },
    '3hCN3dLHV24': {
      title: 'Colour picker app',
      try: 'Build the colour picker: an <input type="color"> controlled by state that changes a big colour box and shows the hex code.',
      minutes: 15,
      questions: [
        q.single('A controlled input…', ['Has its value set by state and updated with onChange', 'Has no value', 'Is read-only', 'Is only styled by CSS'], 0),
        q.single('<input type="color"> gives a value like…', ['"#ff0000"', '"red"', 'rgb(255, 0, 0)', 'A number'], 0),
      ],
    },
    nbAaUpNDhRY: {
      title: 'Updater functions',
      try: 'Call setCount three times in one click, first with count + 1 and then with c => c + 1, and compare the results.',
      minutes: 10,
      questions: [
        q.single('setCount(c => c + 1) beats setCount(count + 1) when…', ['Several updates happen before the next render', 'Never', 'The count is a string', 'Styling'], 0),
        q.num('count is 0. One click runs setCount(c => c + 1) three times. What is count afterwards?', 3, 0),
      ],
    },
  },
  checkpoint: programExam('Events and state exam', [
    q.single('React event names are written in…', ['camelCase, like onClick', 'lowercase, like onclick', 'UPPERCASE', 'kebab-case'], 0),
    q.single('onClick={handleClick()}, with brackets, …', ['Calls handleClick while rendering, which is usually a bug', 'Waits for a click', 'Passes the function', 'Is the same as onClick={handleClick}'], 0),
    q.single('The event object in a handler gives you…', ['Details like the target element', 'The state', 'The props', 'The CSS'], 0),
    q.single('onDoubleClick fires…', ['When the element is double-clicked', 'On every click', 'On hover', 'On load'], 0),
    q.single('useState is a…', ['Hook', 'Component', 'Prop', 'Class'], 0),
    q.single('Hooks must be called…', ['At the top level of a component, not inside loops or conditions', 'Inside loops', 'Only in classes', 'Anywhere'], 0),
    q.single('When state changes, React…', ['Re-renders the component', 'Reloads the page', 'Deletes the component', 'Does nothing'], 0),
    q.single('In useState(0), the 0 is…', ['The initial value', 'The update function', 'The maximum', 'The key'], 0),
    q.single('Which handles a text input correctly?', ['<input value={name} onChange={e => setName(e.target.value)} />', '<input value={name} />', '<input onChange={setName} value="name" />', '<input name={setName} />'], 0),
    q.single('For a checkbox, you read…', ['e.target.checked', 'Only e.target.value', 'e.checked', 'e.target.id'], 0),
    q.single('State created with useState is…', ['Separate for each copy of the component', 'Shared by every component', 'Stored in the URL', 'Global'], 0),
    q.tf('State updates are batched, so the new value isn’t available until the next render.', true),
    q.single('An updater function receives…', ['The latest pending state', 'The props', 'The event', 'Nothing'], 0),
    q.num('count is 0. One click runs setCount(count + 1) three times. What is count afterwards?', 1, 0),
    q.single('By convention, an updater’s parameter is named after the state, like…', ['c or prevCount', 'event', 'props', 'this'], 0),
    q.single('A controlled component is…', ['One whose form values come from React state', 'A component without state', 'A component that controls the browser', 'A CSS component'], 0),
    q.single('In the colour picker, the box’s colour is set with…', ['style={{ backgroundColor: color }}', 'className={color}', 'color="box"', 'document.body.style'], 0),
    q.single('Which select is controlled?', ['<select value={choice} onChange={e => setChoice(e.target.value)}>', '<select>', '<select value="x">', '<select onClick={setChoice}>'], 0),
    q.single('Why keep form data in state?', ['So the screen always matches the data and you can validate it', 'To make the page reload', 'Because HTML can’t hold values', 'For CSS'], 0),
    q.order('Put a state update in order.', ['The user clicks or types', 'The handler calls the setter', 'React re-renders the component', 'The new value appears on screen']),
  ]),
};
