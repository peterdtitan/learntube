import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Selectors and menus',
  lessons: {
    swZFmJsU54s: {
      title: 'Combinators',
      try: 'Style only the paragraphs inside your <main> with a descendant selector, and the first paragraph after each heading with h2 + p.',
      minutes: 10,
      questions: [
        q.match('Match each combinator to what it selects.', [['div p', 'Every p inside a div'], ['div > p', 'Only p that are direct children of a div'], ['h2 + p', 'The p right after an h2'], ['h2 ~ p', 'Every later p that shares the h2’s parent']]),
        q.tf('A space between selectors means “inside, at any depth”.', true),
      ],
    },
    Nrsy_2ogRfQ: {
      title: 'Pseudo-classes',
      try: 'Add :hover and :active styles to your buttons and links, and stripe your table rows with :nth-child(even).',
      minutes: 15,
      questions: [
        q.single(':hover applies when…', ['The pointer is over the element', 'The element has been clicked once', 'The page loads', 'The element is hidden'], 0),
        q.single('tr:nth-child(even) selects…', ['Every second row', 'The first row', 'The last row', 'Every row'], 0),
      ],
    },
    _LxYNxeWpBo: {
      title: 'Pseudo-elements',
      try: 'Make the first letter of a paragraph large with ::first-letter, and add a symbol before your links with ::before.',
      minutes: 10,
      questions: [
        q.single('::before and ::after only show when you set…', ['content', 'display', 'visibility', 'position'], 0),
        q.single('Pseudo-elements are written with…', ['Two colons, like ::before', 'A hash', 'A dot', 'Square brackets'], 0),
      ],
    },
    '6ff96BkWqmg': {
      title: 'Pagination',
      try: 'Build a row of page links (« 1 2 3 4 5 ») with the current page highlighted and hover effects.',
      minutes: 20,
      questions: [
        q.single('Pagination is…', ['A row of links for moving between pages of results', 'A page’s title', 'A footer', 'A form'], 0),
        q.single('Marking the current page with a class like .active helps users…', ['See where they are', 'Load faster', 'Skip pages', 'Search'], 0),
      ],
    },
    VQWu4e6agPc: {
      title: 'Dropdown menus',
      try: 'Build a dropdown that shows its links when you hover over a button, using :hover and display.',
      minutes: 15,
      questions: [
        q.single('A CSS-only dropdown usually shows its menu with…', ['.dropdown:hover .menu { display: block; }', 'onclick only', 'A table', 'position: static'], 0),
        q.single('The menu sits under its button thanks to…', ['position: absolute inside a relative parent', 'float: right', 'margin: auto', 'display: inline'], 0),
      ],
    },
    f3uCSh6LIY0: {
      title: 'Navigation bar',
      try: 'Build a navigation bar for your site: a list of links in a row, with hover colours and the current page highlighted.',
      minutes: 15,
      questions: [
        q.single('Navigation links are usually written as…', ['A <ul> of <li> with <a> inside a <nav>', 'A table', 'A row of images', 'Buttons in a form'], 0),
        q.single('list-style-type: none…', ['Removes the bullets from a list', 'Hides the list', 'Numbers the list', 'Makes it horizontal'], 0),
      ],
    },
  },
  checkpoint: programExam('Selectors and menus exam', [
    q.single('div > p selects…', ['p elements that are direct children of a div', 'Every p inside a div at any depth', 'The p after a div', 'Every div'], 0),
    q.single('h1 + p selects…', ['The p immediately after an h1', 'Every p', 'Every h1', 'A p inside an h1'], 0),
    q.single('h1 ~ p selects…', ['Every p sibling that comes after an h1', 'Only the first p', 'A p inside an h1', 'Every p on the page'], 0),
    q.single('Which selects p elements with class "note"?', ['p.note', 'p .note', 'p#note', 'p > note'], 0),
    q.single('a, button { … } means…', ['Style both links and buttons', 'Style buttons inside links', 'Style links after buttons', 'An error'], 0),
    q.match('Match each pseudo-class to when it applies.', [[':hover', 'The pointer is over it'], [':active', 'It is being clicked'], [':focus', 'It has keyboard focus'], [':visited', 'The link has been visited']]),
    q.single('li:first-child selects…', ['The li that is first among its siblings', 'Every li', 'The last li', 'A child of each li'], 0),
    q.single('li:nth-child(3) selects…', ['The li that is third among its siblings', 'Every third li', 'Three li elements', 'The li with id 3'], 0),
    q.single(':nth-child(odd) selects…', ['The 1st, 3rd, 5th… children', 'The 2nd, 4th, 6th… children', 'Only the first child', 'No children'], 0),
    q.tf('A visible :focus style helps people who use the keyboard.', true),
    q.single('::first-letter styles…', ['The first letter of a block of text', 'The first word', 'The first line', 'The first paragraph'], 0),
    q.single('::selection styles…', ['Text the user highlights', 'Ticked checkboxes', 'Dropdowns', 'Links'], 0),
    q.single('a::after { content: " →"; } will…', ['Add an arrow after every link', 'Remove links', 'Add an arrow before links', 'Do nothing'], 0),
    q.single('Pseudo-classes target a state. Pseudo-elements target…', ['A part of an element', 'A different page', 'A class', 'An id'], 0),
    q.single('In a CSS dropdown, the menu starts with…', ['display: none', 'display: block', 'visibility: visible', 'opacity: 1'], 0),
    q.single('Why put position: relative on the dropdown wrapper?', ['So the absolute menu is placed relative to it', 'To hide it', 'To make it bigger', 'It is never needed'], 0),
    q.single('To lay out nav links in a row you can use…', ['display: flex on the list, or inline-block on the items', 'float: none', 'display: block on the items', 'A <br> after each link'], 0),
    q.single('text-decoration: none on links…', ['Removes the underline', 'Removes the link', 'Makes them bold', 'Hides them'], 0),
    q.single('A class like .active on the current page’s link lets you…', ['Highlight where the user is', 'Disable every link', 'Change the URL', 'Add JavaScript'], 0),
    q.order('Put building a nav bar in order.', ['Write a <nav> with a <ul> of links', 'Remove the bullets and default spacing', 'Lay the items out in a row', 'Add hover and active styles']),
  ]),
};
