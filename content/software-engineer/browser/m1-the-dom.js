import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Find and change elements',
  lessons: {
    NO5kUNxGIu0: {
      title: 'What the DOM is',
      try: 'Open the console on any web page, type document and explore it, then change document.title and the page’s background colour from JavaScript.',
      minutes: 10,
      questions: [
        q.single('The DOM is…', ['The browser’s tree of objects for the page, which JavaScript can change', 'A CSS framework', 'A database', 'A server'], 0),
        q.tf('Changing the DOM with JavaScript updates the page without reloading it.', true),
      ],
    },
    FQtjI1PC5Z0: {
      title: 'Element selectors',
      try: 'Select elements five ways (getElementById, getElementsByClassName, getElementsByTagName, querySelector and querySelectorAll) and change their styles.',
      minutes: 20,
      questions: [
        q.single('document.querySelector(".card") returns…', ['The first element with class card', 'Every element with class card', 'An element with id card', 'Always null'], 0),
        q.single('querySelectorAll returns…', ['A NodeList of every match', 'Only the first match', 'A string', 'A number'], 0),
      ],
    },
    RKXIMnSwUcg: {
      title: 'DOM navigation',
      try: 'Starting from one list item, reach its parent, its siblings, and the list’s first and last children, and style each one differently.',
      minutes: 20,
      questions: [
        q.single('element.parentElement gives…', ['The element that contains it', 'Its first child', 'Its next sibling', 'The document'], 0),
        q.single('element.nextElementSibling gives…', ['The next element at the same level', 'The parent', 'The first child', 'The last element on the page'], 0),
      ],
    },
    WCRi7y6aNrQ: {
      title: 'Add and change HTML',
      try: 'Create a heading and some list items with createElement, set their text and styles, add them with append and prepend, then remove one.',
      minutes: 20,
      questions: [
        q.order('Put adding a new element to the page in order.', ['document.createElement("li")', 'Set its textContent', 'Append it to a parent element']),
        q.single('element.remove()…', ['Takes the element off the page', 'Hides it with CSS', 'Empties its text', 'Reloads the page'], 0),
      ],
    },
  },
  checkpoint: programExam('Find and change elements exam', [
    q.single('DOM stands for…', ['Document Object Model', 'Data Object Method', 'Digital Output Mode', 'Document Order Map'], 0),
    q.single('Scripts usually start from which object to find elements?', ['document', 'window.style', 'body.parent', 'html.root'], 0),
    q.single('document.getElementById("title") returns…', ['One element, or null if none matches', 'A list', 'A string', 'Always an error'], 0),
    q.single('getElementsByClassName returns…', ['An HTMLCollection of matches', 'One element', 'A string', 'A number'], 0),
    q.single('Which selects the element with id "main"?', ['document.querySelector("#main")', 'document.querySelector("main.id")', 'document.querySelector(".main")', 'document.getElement("main")'], 0),
    q.single('document.querySelectorAll("li") returns…', ['A NodeList of every <li>', 'The first <li>', 'An array of strings', 'A number'], 0),
    q.single('element.style.color = "red"; …', ['Sets an inline colour on that element', 'Changes the stylesheet file', 'Changes every element', 'Does nothing'], 0),
    q.single('In JavaScript, the CSS property background-color is written…', ['style.backgroundColor', 'style.background-color', 'style.bg', 'style.BackgroundColor'], 0),
    q.single('element.firstElementChild gives…', ['Its first child element', 'Its parent', 'Its next sibling', 'The document'], 0),
    q.single('element.children gives…', ['A collection of its child elements', 'Its text', 'Its parent', 'Its id'], 0),
    q.single('element.previousElementSibling gives…', ['The element just before it at the same level', 'Its parent', 'Its first child', 'Always null'], 0),
    q.single('textContent differs from innerHTML because…', ['textContent treats everything as plain text', 'textContent runs HTML', 'They are identical', 'innerHTML is read-only'], 0),
    q.tf('Putting user input into innerHTML can let someone inject harmful code.', true),
    q.single('parent.append(child) adds child…', ['At the end of parent', 'At the start of parent', 'Before parent', 'Instead of parent'], 0),
    q.single('parent.prepend(child) adds child…', ['At the start of parent', 'At the end of parent', 'After parent', 'Nowhere'], 0),
    q.single('parent.insertBefore(newEl, refEl) puts newEl…', ['Just before refEl, inside parent', 'At the end', 'Always at the start', 'Outside parent'], 0),
    q.single('element.id = "intro"; …', ['Sets the element’s id', 'Finds the element', 'Deletes the id', 'Adds a class'], 0),
    q.single('Scripts that change the DOM should run…', ['After the elements exist, such as at the end of <body> or with defer', 'Before <html>', 'Inside <title>', 'Only on a server'], 0),
    q.match('Match each property to what it gives.', [['parentElement', 'The containing element'], ['children', 'All child elements'], ['nextElementSibling', 'The next element at the same level'], ['lastElementChild', 'The last child element']]),
    q.order('Put changing an element in order.', ['Select it', 'Change its text, attributes or style', 'Check the result in the browser']),
  ]),
};
