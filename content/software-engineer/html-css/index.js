import { course } from '../../course';
import videos from '../videos/html-css.json';
import htmlBasics from './m1-html-basics';
import structure from './m2-structure-and-forms';
import cssBasics from './m3-css-basics';
import sizing from './m4-size-display-position';
import selectors from './m5-selectors-and-menus';
import layouts from './m6-layouts-and-animation';

// Bro Code's free HTML & CSS series: short, hands-on videos from a first page to flexbox and
// animation.
export default course({
  slug: 'software-engineer-html-css',
  title: 'HTML and CSS',
  description: 'Build web pages from scratch: links, images, media, lists, tables and forms in HTML, then colours, fonts, the box model, positioning, menus, flexbox, responsive layouts and animation in CSS.',
  makeTitle: 'A responsive multi-page website, published online',
  skillId: 'software-engineering',
  cover: '2oCN2q1x3c4',
  by: 'Bro Code',
  videos,
}, [htmlBasics, structure, cssBasics, sizing, selectors, layouts]);
