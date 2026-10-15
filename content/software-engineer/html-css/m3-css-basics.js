import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'CSS basics',
  lessons: {
    uzF1Doc3cZQ: {
      title: 'Get started with CSS',
      try: 'Style your page three ways (an inline style, a <style> block and an external style.css) and see which one wins. Keep the external stylesheet.',
      minutes: 20,
      questions: [
        q.single('CSS is used to…', ['Style how HTML looks', 'Structure content', 'Store data', 'Run on the server'], 0),
        q.single('An id selector starts with #. A class selector starts with…', ['.', '#', '*', '@'], 0),
        q.tf('An external stylesheet lets many pages share the same styles.', true),
      ],
    },
    LwbKb2J8iy8: {
      title: 'Colours',
      try: 'Set background and text colours using a colour name, an RGB value, a hex code and an HSL value.',
      minutes: 10,
      questions: [
        q.single('Which of these is a hex colour?', ['#ff6600', 'rgb(255, 102, 0)', 'hsl(24, 100%, 50%)', 'orange'], 0),
        q.single('rgb(0, 0, 0) is…', ['Black', 'White', 'Red', 'Grey'], 0),
      ],
    },
    MnyCbILmtOY: {
      title: 'Fonts',
      try: 'Pick a Google Font, add it to your page, and set font-family with fallbacks, plus font-size, font-weight and font-style.',
      minutes: 15,
      questions: [
        q.single('Why list fallbacks, as in font-family: "Inter", Arial, sans-serif?', ['If the first font isn’t available, the browser uses the next', 'To mix fonts in one word', 'To load faster', 'It’s required'], 0),
        q.single('font-weight: bold makes text…', ['Thicker', 'Larger', 'Slanted', 'Underlined'], 0),
      ],
    },
    pkNdQ7TmxIw: {
      title: 'Borders',
      try: 'Give three boxes different borders: a solid one, a dashed one with rounded corners, and one with only a bottom border.',
      minutes: 10,
      questions: [
        q.single('border: 2px solid black sets…', ['Width, style and colour', 'Margin, padding and colour', 'Height and width', 'Only the colour'], 0),
        q.single('border-radius…', ['Rounds the corners', 'Adds a shadow', 'Thickens the border', 'Removes the border'], 0),
      ],
    },
    Yqs_61ub1Ng: {
      title: 'Shadows',
      try: 'Add a text shadow to your main heading and a soft box shadow to a card.',
      minutes: 10,
      questions: [
        q.single('In box-shadow: 5px 5px 10px gray, the 10px is…', ['The blur', 'The horizontal offset', 'The vertical offset', 'The colour'], 0),
        q.single('Which property adds a shadow to text?', ['text-shadow', 'box-shadow', 'font-shadow', 'shadow'], 0),
      ],
    },
    'rBWA_t-KnKk': {
      title: 'Margins',
      try: 'Centre a box horizontally with margin: 0 auto, and change the space between your paragraphs with margins.',
      minutes: 15,
      questions: [
        q.single('Margin is…', ['Space outside an element’s border', 'Space inside the border', 'The border itself', 'The content'], 0),
        q.single('margin: 10px 20px sets…', ['10px top and bottom, 20px left and right', '10px left, 20px right', '30px on every side', '10px on top only'], 0),
      ],
    },
  },
  checkpoint: programExam('CSS basics exam', [
    q.single('In p { color: red; }, p is the…', ['Selector', 'Property', 'Value', 'Comment'], 0),
    q.single('In color: red;, color is the…', ['Property', 'Value', 'Selector', 'Class'], 0),
    q.single('Which line links an external stylesheet?', ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<css href="style.css">', '<script src="style.css">'], 0),
    q.single('Which usually wins when styles conflict?', ['An inline style', 'An external stylesheet', 'A <style> block', 'The browser default'], 0),
    q.single('To style every element with class="card" you write…', ['.card { }', '#card { }', 'card { }', '*card { }'], 0),
    q.tf('An id should be used on only one element per page.', true),
    q.single('#ffffff is…', ['White', 'Black', 'Red', 'Blue'], 0),
    q.single('rgba(0, 0, 0, 0.5) is…', ['Half-transparent black', 'Solid black', 'Grey text only', 'Invalid'], 0),
    q.match('Match each colour format to an example.', [['Name', 'tomato'], ['Hex', '#ff6347'], ['RGB', 'rgb(255, 99, 71)'], ['HSL', 'hsl(9, 100%, 64%)']]),
    q.single('A generic family like sans-serif is used…', ['As the final fallback', 'Only for headings', 'Instead of all fonts', 'For icons'], 0),
    q.single('font-style: italic makes text…', ['Slanted', 'Bold', 'Bigger', 'Underlined'], 0),
    q.single('Which property changes the size of text?', ['font-size', 'text-size', 'font-weight', 'size'], 0),
    q.single('border-style: dashed draws…', ['A line of dashes', 'A solid line', 'Dots', 'Two lines'], 0),
    q.single('To add a border to only the bottom, use…', ['border-bottom', 'border-low', 'bottom-border', 'border-under'], 0),
    q.single('box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) gives…', ['A soft shadow under the box', 'A thick border', 'A text shadow', 'No effect'], 0),
    q.order('Put the box model layers in order from inside to outside.', ['Content', 'Padding', 'Border', 'Margin']),
    q.single('margin: 0 auto on a box with a set width…', ['Centres it horizontally', 'Centres it vertically', 'Removes it', 'Doubles the margin'], 0),
    q.single('In margin: 5px 10px 15px 20px, which value is the left margin?', ['20px', '5px', '10px', '15px'], 0),
    q.single('Padding is…', ['Space between the content and the border', 'Space outside the border', 'The border', 'The background image'], 0),
    q.tf('When two rules with the same priority conflict, the one written later wins.', true),
  ]),
};
