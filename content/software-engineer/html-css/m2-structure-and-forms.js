import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Structure, tables and forms',
  lessons: {
    urT4pdM3sr4: {
      title: 'Text formatting',
      try: 'Write a short paragraph about yourself that uses bold, italic, a highlighted phrase, small print, a subscript (H₂O) and a superscript (x²).',
      minutes: 10,
      questions: [
        q.match('Match each tag to its effect.', [['<b>', 'Bold'], ['<i>', 'Italic'], ['<mark>', 'Highlighted'], ['<sup>', 'Superscript']]),
        q.single('Which tag would you use for the 2 in H₂O?', ['<sub>', '<sup>', '<small>', '<del>'], 0),
      ],
    },
    WbnCll6vvw4: {
      title: 'Span and div',
      try: 'Wrap three sections of your page in <div>s and highlight a few words inside a paragraph with a <span>.',
      minutes: 10,
      questions: [
        q.single('A <div> is…', ['A block-level container that starts on a new line', 'An inline container', 'A link', 'An image'], 0),
        q.single('A <span> is…', ['An inline container for part of a line', 'A block container', 'A table', 'A list'], 0),
      ],
    },
    oUm7rvMUNq8: {
      title: 'Lists',
      try: 'Make an ordered list of steps for a recipe, an unordered shopping list, and a description list of three terms.',
      minutes: 15,
      questions: [
        q.match('Match each list to its tag.', [['Numbered list', '<ol>'], ['Bulleted list', '<ul>'], ['Description list', '<dl>']]),
        q.single('Each item in <ol> or <ul> goes in…', ['<li>', '<item>', '<dt>', '<p>'], 0),
      ],
    },
    aNC6LY34yVM: {
      title: 'Tables',
      try: 'Build a table of your weekly timetable with a header row of <th> cells and at least four rows.',
      minutes: 15,
      questions: [
        q.order('Put the table tags from outermost to innermost.', ['<table>', '<tr>', '<td>']),
        q.single('<th> is used for…', ['Header cells', 'Table rows', 'The table title only', 'Footnotes'], 0),
      ],
    },
    tDqTXipQmBU: {
      title: 'Buttons',
      try: 'Add a button that runs a tiny bit of JavaScript with onclick (for example changing a heading’s text), and style it a little.',
      minutes: 15,
      questions: [
        q.single('Which element makes a clickable button?', ['<button>', '<btn>', '<click>', '<input type="click">'], 0),
        q.tf('A <button> inside a form submits the form by default.', true),
      ],
    },
    zIN54lhJtQU: {
      title: 'Forms',
      try: 'Build a sign-up form with text, email, password and date inputs, a dropdown, radio buttons, a checkbox and a submit button. Give every input a <label>.',
      minutes: 30,
      questions: [
        q.single('Why give every input a <label>?', ['It tells users and screen readers what the field is, and clicking it focuses the input', 'It makes inputs bigger', 'Forms won’t submit without it', 'It styles the input'], 0),
        q.single('Radio buttons that share the same name let the user…', ['Pick only one option', 'Pick many options', 'Type text', 'Upload a file'], 0),
        q.single('The required attribute…', ['Stops the form submitting while the field is empty', 'Makes the field bold', 'Hides the field', 'Clears the field'], 0),
      ],
    },
    JNFdCgmMkPk: {
      title: 'Headers and footers',
      try: 'Give your page a <header> with a title and <nav> links, a <main> section, and a <footer> with a copyright line.',
      minutes: 15,
      questions: [
        q.multi('Which are semantic HTML elements?', ['<header>', '<nav>', '<footer>', '<div>'], [0, 1, 2]),
        q.single('Semantic elements help because…', ['They say what each part is, which helps accessibility and search engines', 'They load faster', 'They add colour', 'Browsers require them'], 0),
      ],
    },
  },
  checkpoint: programExam('Structure, tables and forms exam', [
    q.single('<strong> differs from <b> because it also…', ['Marks the text as important for screen readers', 'Makes it bigger', 'Makes it a link', 'Makes it italic'], 0),
    q.single('Which tag shows deleted text with a line through it?', ['<del>', '<ins>', '<mark>', '<small>'], 0),
    q.single('Block elements like <div>…', ['Start on a new line and take the full width', 'Sit inside a line of text', 'Can’t hold other elements', 'Are invisible'], 0),
    q.single('Inline elements like <span>…', ['Only take as much width as their content', 'Always start on a new line', 'Can’t be styled', 'Are tables'], 0),
    q.single('Which list suits steps that must happen in order?', ['<ol>', '<ul>', '<dl>', '<li>'], 0),
    q.single('In a description list, the term goes in <dt> and its description in…', ['<dd>', '<dl>', '<li>', '<td>'], 0),
    q.single('A table row is made with…', ['<tr>', '<td>', '<th>', '<row>'], 0),
    q.single('A normal table cell is made with…', ['<td>', '<tr>', '<tc>', '<cell>'], 0),
    q.tf('Tables are for tabular data, not for laying out a whole page.', true),
    q.single('onclick on a button…', ['Runs JavaScript when it’s clicked', 'Changes the font', 'Emails the form', 'Adds a link'], 0),
    q.single('The action attribute on a <form>…', ['Says where the form data is sent', 'Styles the form', 'Validates the email', 'Names the form'], 0),
    q.match('Match each input type to what it collects.', [['email', 'An email address'], ['password', 'Hidden text'], ['date', 'A date from a picker'], ['checkbox', 'A yes or no choice']]),
    q.single('A dropdown list is made with…', ['<select> and <option>', '<input type="list">', '<ol>', '<dropdown>'], 0),
    q.single('A <label> is tied to its input by…', ['A for attribute that matches the input’s id', 'A name on the label', 'An href on the label', 'A class on the input'], 0),
    q.single('placeholder="Your name"…', ['Shows hint text inside an empty field', 'Fills in the value', 'Makes the field required', 'Replaces the label'], 0),
    q.multi('Which attributes add built-in browser validation?', ['required', 'minlength', 'pattern', 'title'], [0, 1, 2]),
    q.single('Which input lets users pick a whole number with up and down arrows?', ['type="number"', 'type="text"', 'type="digit"', 'type="count"'], 0),
    q.single('The <nav> element holds…', ['The main navigation links', 'The footer text', 'Images', 'Forms only'], 0),
    q.single('<main> should contain…', ['The page’s main content, once per page', 'The navigation', 'The footer', 'Scripts'], 0),
    q.order('Put a typical page layout in order from top to bottom.', ['<header>', '<main>', '<footer>']),
  ]),
};
