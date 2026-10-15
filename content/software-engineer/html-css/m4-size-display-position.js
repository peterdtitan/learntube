import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Size, display and position',
  lessons: {
    oJe8G5XT_v4: {
      title: 'Float',
      try: 'Float an image to the left of a paragraph so the text wraps around it, then clear the float for the next section.',
      minutes: 10,
      questions: [
        q.single('float: left on an image makes…', ['Text wrap around it on the right', 'The image disappear', 'The image centre', 'The image fill the page'], 0),
        q.single('clear: both…', ['Moves an element below any floats', 'Removes all styles', 'Clears the page', 'Deletes the floats'], 0),
      ],
    },
    d7cH8geV2dY: {
      title: 'Overflow',
      try: 'Put long text in a small fixed-height box and try overflow: hidden, scroll and auto.',
      minutes: 10,
      questions: [
        q.single('overflow: auto…', ['Adds scrollbars only when the content is too big', 'Always shows scrollbars', 'Hides extra content', 'Lets content spill out'], 0),
        q.single('overflow: hidden…', ['Cuts off content that doesn’t fit', 'Adds scrollbars', 'Makes the box grow', 'Hides the whole box'], 0),
      ],
    },
    '9T8uxp5hQ60': {
      title: 'The display property',
      try: 'Turn a vertical list of links into a horizontal row with display: inline-block, and hide one element with display: none.',
      minutes: 10,
      questions: [
        q.match('Match each display value to its behaviour.', [['block', 'Starts on a new line, full width'], ['inline', 'Sits in the line and ignores width and height'], ['inline-block', 'Sits in the line but accepts width and height'], ['none', 'Removed from the page']]),
        q.tf('display: none removes the element from the layout entirely.', true),
      ],
    },
    'QctF-i4-GuM': {
      title: 'Height and width',
      try: 'Make a box that is 50% of the page wide with a max-width of 600px, and watch how it behaves as you resize the window.',
      minutes: 15,
      questions: [
        q.single('width: 50% is relative to…', ['The parent element’s width', 'The screen height', 'The font size', 'The image size'], 0),
        q.single('max-width: 600px means…', ['The element never grows wider than 600px', 'It is always 600px', 'It is at least 600px', 'It has a 600px margin'], 0),
      ],
    },
    'G4AWXOr4W-k': {
      title: 'Position',
      try: 'Make a header that stays at the top while you scroll, and place a badge in the corner of a card using absolute inside relative.',
      minutes: 15,
      questions: [
        q.match('Match each position value to its behaviour.', [['static', 'The default, in normal flow'], ['relative', 'Offset from where it would normally be'], ['absolute', 'Placed relative to the nearest positioned ancestor'], ['fixed', 'Stays put on screen while you scroll']]),
        q.single('position: sticky…', ['Scrolls normally until it reaches its offset, then sticks', 'Never moves', 'Hides on scroll', 'Is the same as static'], 0),
      ],
    },
    _oFWg_NlKdo: {
      title: 'Background images',
      try: 'Give a section a background image that fills it with background-size: cover, and make sure the text on top stays readable.',
      minutes: 10,
      questions: [
        q.single('background-size: cover…', ['Scales the image to fill the box, cropping if needed', 'Shows the whole image with gaps', 'Repeats the image', 'Hides the image'], 0),
        q.single('background-repeat: no-repeat…', ['Shows the image only once', 'Tiles the image', 'Stretches it', 'Removes it'], 0),
      ],
    },
  },
  checkpoint: programExam('Size, display and position exam', [
    q.single('Floats were first meant for…', ['Wrapping text around images', 'Whole page layouts', 'Animations', 'Forms'], 0),
    q.single('Which stops an element sitting beside floated elements?', ['clear: both', 'overflow: none', 'display: float', 'position: static'], 0),
    q.single('overflow: scroll…', ['Always shows scrollbars', 'Shows scrollbars only when needed', 'Hides extra content', 'Lets content spill out'], 0),
    q.single('By default, content that doesn’t fit its box…', ['Spills outside it (visible)', 'Is hidden', 'Scrolls', 'Is deleted'], 0),
    q.single('Which is a block element by default?', ['<div>', '<span>', '<a>', '<strong>'], 0),
    q.single('Which is an inline element by default?', ['<span>', '<div>', '<p>', '<h1>'], 0),
    q.single('Inline elements ignore…', ['width and height', 'color', 'font-size', 'text-decoration'], 0),
    q.single('visibility: hidden differs from display: none because…', ['The element is invisible but still takes up space', 'It removes the element', 'It deletes the HTML', 'Nothing differs'], 0),
    q.single('width: 100vw means…', ['The full width of the viewport (browser window)', '100 pixels', 'The parent’s width', 'Half the screen'], 0),
    q.single('Which unit is relative to the root font size?', ['rem', 'px', 'vh', '%'], 0),
    q.single('height: 100vh means…', ['The full height of the viewport', '100 pixels', 'The parent’s height', 'Automatic height'], 0),
    q.tf('max-width helps a layout work on both big and small screens.', true),
    q.single('position: absolute places an element relative to…', ['The nearest ancestor that isn’t static', 'Always the whole page', 'The previous sibling', 'The mouse'], 0),
    q.single('position: fixed elements…', ['Stay in the same place on screen as you scroll', 'Scroll with the page', 'Are hidden', 'Become inline'], 0),
    q.single('top, right, bottom and left have no effect on…', ['position: static elements', 'Fixed elements', 'Absolute elements', 'Relative elements'], 0),
    q.single('z-index controls…', ['Which positioned element appears on top', 'Font size', 'Opacity', 'Zoom'], 0),
    q.single('To place a badge in a card’s corner you usually…', ['Make the card relative and the badge absolute', 'Float the badge', 'Use display: none', 'Use a table'], 0),
    q.single('background-attachment: fixed…', ['Keeps the background still while the page scrolls', 'Repeats it', 'Crops it', 'Removes it'], 0),
    q.single('background-position: center…', ['Centres the background image', 'Centres the text', 'Centres the box', 'Repeats the image'], 0),
    q.tf('Text over a background image needs enough contrast to stay readable.', true),
  ]),
};
