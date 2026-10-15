import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Events and interactive pages',
  lessons: {
    g_vXSKbfUiQ: {
      title: 'Mouse events',
      try: 'Make a box that changes colour and text on click, on mouseover and on mouseout, using addEventListener.',
      minutes: 15,
      questions: [
        q.single('element.addEventListener("click", fn) …', ['Runs fn each time the element is clicked', 'Clicks the element', 'Runs fn once on load', 'Removes clicks'], 0),
        q.single('event.target is…', ['The element the event happened on', 'The window', 'The listener function', 'The time of the event'], 0),
      ],
    },
    q32skvBgxo4: {
      title: 'Key events',
      try: 'Move a box around the page with the arrow keys using a keydown listener on the document.',
      minutes: 15,
      questions: [
        q.single('event.key for the up arrow is…', ['"ArrowUp"', '"Up"', '"38"', '"KeyUp"'], 0),
        q.single('keydown fires…', ['When a key is pressed down', 'When the mouse moves', 'Only when a key is released', 'When the page loads'], 0),
      ],
    },
    MkvHPOT4RS8: {
      title: 'Hide and show HTML',
      try: 'Make a button that hides and shows an image, and switches its own text between “Hide” and “Show”.',
      minutes: 10,
      questions: [
        q.single('element.style.display = "none" …', ['Hides the element and removes its space', 'Hides it but keeps its space', 'Deletes it', 'Shows it'], 0),
        q.tf('visibility: hidden hides an element but keeps its space.', true),
      ],
    },
    '5n3qPKgLEDc': {
      title: 'NodeLists',
      try: 'Select all your buttons with querySelectorAll, give each a click listener with forEach, then add and remove a button and see what the NodeList holds.',
      minutes: 15,
      questions: [
        q.single('A NodeList from querySelectorAll is static, which means…', ['It doesn’t update when elements are added or removed', 'It can’t be looped over', 'It is always empty', 'It changes constantly'], 0),
        q.single('You can loop over a NodeList with…', ['forEach', 'map, directly', 'reduce, directly', 'Only a while loop'], 0),
      ],
    },
    '62qN2RcpIAE': {
      title: 'classList',
      try: 'Write a CSS class like .active and toggle it on buttons when they’re clicked with classList.toggle.',
      minutes: 15,
      questions: [
        q.match('Match each classList method to what it does.', [['add', 'Adds a class'], ['remove', 'Removes a class'], ['toggle', 'Adds it if missing, removes it if present'], ['contains', 'Checks whether the class is there']]),
        q.tf('Toggling classes keeps your styles in CSS instead of in JavaScript.', true),
      ],
    },
    '3uKdQx-SZ5A': {
      title: 'Rock paper scissors game',
      try: 'Build rock paper scissors: three buttons, a random computer choice, the result, and a running score.',
      minutes: 25,
      questions: [
        q.single('The computer’s choice is picked with…', ['A random index into ["rock", "paper", "scissors"]', 'The player’s choice', 'A switch with no input', 'The date'], 0),
        q.single('Rock beats…', ['Scissors', 'Paper', 'Rock', 'Nothing'], 0),
      ],
    },
    '749ta0nvj8s': {
      title: 'Image slider',
      try: 'Build the image slider with next and previous buttons, plus automatic sliding every 5 seconds.',
      minutes: 25,
      questions: [
        q.single('To go from the last slide back to the first, the slider…', ['Sets the index to 0 when it passes the end', 'Reloads the page', 'Stops', 'Adds a new image'], 0),
        q.single('setInterval(nextSlide, 5000) …', ['Moves to the next slide every 5 seconds', 'Moves once', 'Stops the slider', 'Waits 5 minutes'], 0),
      ],
    },
  },
  checkpoint: programExam('Events exam', [
    q.single('Which adds a click handler without replacing other handlers?', ['addEventListener("click", fn)', 'onclick = fn', 'click(fn)', 'listen("click")'], 0),
    q.single('removeEventListener needs…', ['The same function that was added', 'Any function', 'No arguments', 'The element’s id'], 0),
    q.single('mouseover fires when…', ['The pointer moves onto the element', 'The element is clicked', 'A key is pressed', 'The page scrolls'], 0),
    q.single('mouseout fires when…', ['The pointer leaves the element', 'The pointer enters it', 'The mouse is clicked', 'The page loads'], 0),
    q.single('The event object passed to a listener holds…', ['Details like the target and which key or button was used', 'The whole page', 'Only the time', 'Nothing'], 0),
    q.single('keyup fires when…', ['A key is released', 'A key is pressed down', 'The mouse moves', 'A form submits'], 0),
    q.single('Key events for a whole game are usually listened for on…', ['The document', 'An image', 'A stylesheet', 'A comment'], 0),
    q.single('event.preventDefault() …', ['Stops the browser’s default action, like submitting a form', 'Stops all JavaScript', 'Removes the listener', 'Reloads the page'], 0),
    q.single('Setting element.style.display = "block" after "none" …', ['Shows the element again', 'Deletes it', 'Hides it', 'Moves it'], 0),
    q.single('Which hides an element but keeps its space?', ['style.visibility = "hidden"', 'style.display = "none"', 'remove()', 'innerHTML = ""'], 0),
    q.single('A NodeList is…', ['A list-like collection of nodes', 'Always a true array', 'A string', 'A set of CSS rules'], 0),
    q.single('To use map on a NodeList, first…', ['Convert it with Array.from() or [...list]', 'Call list.map directly', 'Sort it', 'Nothing'], 0),
    q.single('element.classList.toggle("dark") …', ['Adds "dark" if it’s missing and removes it if present', 'Always adds it', 'Always removes it', 'Only checks for it'], 0),
    q.single('classList.replace("old", "new") …', ['Swaps one class for another', 'Removes every class', 'Adds both', 'Renames the element'], 0),
    q.single('classList.contains("active") returns…', ['true or false', 'The class name', 'An array', 'undefined'], 0),
    q.tf('Switching CSS classes with classList is usually cleaner than setting many style properties in JavaScript.', true),
    q.single('In rock paper scissors, a tie happens when…', ['Both choices are the same', 'Rock meets paper', 'Paper meets scissors', 'Scissors meet rock'], 0),
    q.single('The slider shows only the current image by…', ['Adding a class like .displaySlide to it and hiding the rest', 'Deleting the other images', 'Reloading the page', 'Using a table'], 0),
    q.single('Going back from the first slide, the index should become…', ['The last slide’s index', '0', '-1', '1'], 0),
    q.order('Put handling a click in order.', ['Select the element', 'Add an event listener', 'Read the event details in the handler', 'Update the page']),
  ]),
};
