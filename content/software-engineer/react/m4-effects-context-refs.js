import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Effects, context and refs',
  lessons: {
    'L-1sP3Ljhsg': {
      title: 'useEffect',
      try: 'Show the window width on the page, updated by a resize listener inside useEffect, and remove the listener in the cleanup function.',
      minutes: 20,
      questions: [
        q.single('useEffect runs…', ['After the component renders', 'Before it renders', 'Only on click', 'Never'], 0),
        q.match('Match each dependency array to when the effect runs.', [['None given', 'After every render'], ['[]', 'Only after the first render'], ['[value]', 'After the first render and whenever value changes']]),
        q.single('The function returned from useEffect…', ['Cleans up, for example by removing listeners or clearing timers', 'Renders the component', 'Is the state', 'Does nothing'], 0),
      ],
    },
    'AiQ-V_0qvRI': {
      title: 'Digital clock in React',
      try: 'Build the clock component: the time in state, updated every second by a setInterval inside useEffect and cleared in the cleanup.',
      minutes: 20,
      questions: [
        q.single('Why clear the interval in useEffect’s cleanup?', ['So it stops when the component is removed and doesn’t leak', 'To speed it up', 'To reset the time', 'It isn’t needed'], 0),
        q.tf('Calling setInterval directly in the component body would start a new timer on every render.', true),
      ],
    },
    FpNfvbNYPsg: {
      title: 'useContext',
      try: 'Share a username from a top component with a component four levels down using createContext, a Provider and useContext.',
      minutes: 15,
      questions: [
        q.single('useContext solves…', ['Passing data through many levels without prop drilling', 'Styling', 'Fetching data', 'Routing'], 0),
        q.single('A context value is provided with…', ['<UserContext.Provider value={user}>', '<UserContext user>', 'useState only', 'props.context'], 0),
      ],
    },
    'AltU-XcGvuo': {
      title: 'useRef',
      try: 'Make three inputs and three buttons, where each button focuses its input and changes its background using a ref.',
      minutes: 15,
      questions: [
        q.single('Changing ref.current…', ['Doesn’t cause a re-render', 'Re-renders the component', 'Resets state', 'Throws an error'], 0),
        q.single('A common use of useRef is…', ['Reaching a DOM element, for example to focus an input', 'Storing props', 'Creating context', 'Rendering lists'], 0),
      ],
    },
    jPo0mIcNZfM: {
      title: 'Stopwatch in React',
      try: 'Build the React stopwatch with useState, useEffect and useRef. Then put your to-do list, clock and stopwatch online (Netlify and Vercel are free) and log the links as your make.',
      minutes: 30,
      questions: [
        q.single('In the stopwatch, useRef stores…', ['The interval id and start time, without causing re-renders', 'The displayed time', 'The CSS', 'The props'], 0),
        q.single('Elapsed time is best worked out as…', ['Date.now() minus the start time', 'Adding 10 each tick', 'Counting renders', 'Math.random'], 0),
      ],
    },
  },
  checkpoint: programExam('Effects, context and refs exam', [
    q.single('Side effects in React include…', ['Timers, event listeners and fetching data', 'Returning JSX', 'Reading props', 'Declaring a variable'], 0),
    q.single('useEffect(() => { … }, []) runs…', ['Once, after the first render', 'After every render', 'Never', 'Before rendering'], 0),
    q.single('useEffect(() => { … }, [count]) runs…', ['After the first render and whenever count changes', 'Only once', 'Every second', 'Never'], 0),
    q.single('With no dependency array, useEffect runs…', ['After every render', 'Once', 'Never', 'Only when the component is removed'], 0),
    q.single('A cleanup function runs…', ['Before the effect runs again, and when the component is removed', 'Only when it first appears', 'Never', 'Every second'], 0),
    q.single('Unmounting means…', ['The component is removed from the page', 'It is styled', 'It re-renders', 'It is created'], 0),
    q.single('Fetching data when a component first appears is usually done…', ['Inside useEffect with []', 'In the return statement', 'In CSS', 'In the dependency array'], 0),
    q.single('Prop drilling means…', ['Passing props through many components that don’t need them', 'Validating props', 'Styling props', 'Deleting props'], 0),
    q.single('createContext() …', ['Makes a context object for sharing a value', 'Creates a component', 'Creates state', 'Creates a ref'], 0),
    q.single('A component reads a context with…', ['useContext(UserContext)', 'props.UserContext', 'UserContext.read()', 'useState(UserContext)'], 0),
    q.tf('Any component inside a Provider can read its value, however deep it is.', true),
    q.single('useRef(0) returns…', ['An object like { current: 0 }', 'The number 0', 'An array [0, setter]', 'A component'], 0),
    q.single('A ref is attached to an element with…', ['<input ref={inputRef} />', '<input useRef={inputRef} />', '<input id={inputRef} />', '<input current={inputRef} />'], 0),
    q.single('inputRef.current.focus() …', ['Moves the cursor into that input', 'Re-renders', 'Clears the input', 'Hides it'], 0),
    q.single('Choose state rather than a ref when…', ['The value is shown on screen and should update it', 'You need a timer id', 'You need a DOM element', 'Never'], 0),
    q.single('The stopwatch keeps isRunning in…', ['State, because the buttons and display depend on it', 'Only a ref', 'Only a context', 'A CSS variable'], 0),
    q.num('How many milliseconds are in one minute?', 60000, 0),
    q.single('Showing 7 seconds as "07" uses…', ['String(7).padStart(2, "0")', 'Math.round(7)', '(7).toFixed(2)', '"7" * 2'], 0),
    q.match('Match each hook to its job.', [['useState', 'Values that update the screen'], ['useEffect', 'Side effects after rendering'], ['useContext', 'Reading a shared value'], ['useRef', 'Values or elements that don’t trigger re-renders']]),
    q.order('Put a timer effect’s life in order.', ['The component renders', 'useEffect starts the interval', 'The interval updates state each tick', 'Cleanup clears the interval when the component is removed']),
  ]),
};
