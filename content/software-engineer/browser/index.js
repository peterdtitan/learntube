import { course } from '../../course';
import videos from '../videos/browser.json';
import dom from './m1-the-dom';
import events from './m2-events';
import asyncCode from './m3-async-and-apis';

// The second part of Bro Code's free JavaScript course: the DOM, events, promises and
// fetching data from real APIs.
export default course({
  slug: 'software-engineer-browser',
  title: 'JavaScript in the Browser',
  description: 'Make web pages interactive: select and change elements, handle clicks and key presses, then work with promises, async/await, JSON, cookies and fetch to pull live data from APIs.',
  makeTitle: 'A rock paper scissors game, an image slider and a weather app that fetches live data',
  skillId: 'software-engineering',
  cover: 'NO5kUNxGIu0',
  by: 'Bro Code',
  videos,
}, [dom, events, asyncCode]);
