import { course } from '../../course';
import videos from '../videos/react.json';
import components from './m1-components-and-props';
import state from './m2-events-and-state';
import collections from './m3-objects-and-arrays';
import hooks from './m4-effects-context-refs';

// Bro Code's free React course: components and props, state and events, then the hooks most
// apps use.
export default course({
  slug: 'software-engineer-react',
  title: 'React',
  description: 'Build user interfaces with React: components, styles, props, conditional rendering and lists, then state, events, forms, updating objects and arrays, and the useEffect, useContext and useRef hooks.',
  makeTitle: 'A to-do list, digital clock and stopwatch built in React and published online',
  skillId: 'software-engineering',
  cover: 'hn80mWvP-9g',
  by: 'Bro Code',
  videos,
}, [components, state, collections, hooks]);
