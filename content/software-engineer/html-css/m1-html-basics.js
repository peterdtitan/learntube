import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'HTML basics',
  lessons: {
    '2oCN2q1x3c4': {
      title: 'Your first web page',
      try: 'Install VS Code (free), create index.html, add a heading, two paragraphs and a line break, and open it in your browser.',
      minutes: 20,
      questions: [
        q.single('HTML is used to…', ['Structure the content of a web page', 'Style a page with colours', 'Run a database', 'Edit photos'], 0),
        q.single('Which tag makes the largest heading?', ['<h1>', '<h6>', '<head>', '<p>'], 0),
        q.tf('Most HTML elements have an opening tag and a closing tag, like <p> and </p>.', true),
      ],
    },
    ZOI7Tq5Zq2s: {
      title: 'Hyperlinks',
      try: 'Add three links to your page: one to another website that opens in a new tab, one to a second page of your own, and one email link.',
      minutes: 15,
      questions: [
        q.single('Which attribute sets where a link goes?', ['href', 'src', 'alt', 'link'], 0),
        q.single('target="_blank" makes a link…', ['Open in a new tab', 'Turn blue', 'Download a file', 'Disappear'], 0),
      ],
    },
    sm5hTFzSs5Y: {
      title: 'Images',
      try: 'Add an image to your page with alt text, set its height, and make the image a link.',
      minutes: 15,
      questions: [
        q.single('The alt attribute on an image…', ['Describes the image for screen readers and when it fails to load', 'Sets its size', 'Sets its border', 'Makes it a link'], 0),
        q.text('Which attribute on <img> gives the path to the image file?', ['src']),
      ],
    },
    uof_zYxtnp0: {
      title: 'Audio',
      try: 'Add an audio file to your page with controls, then try the autoplay, muted and loop attributes.',
      minutes: 10,
      questions: [
        q.single('The controls attribute on <audio>…', ['Shows play, pause and volume buttons', 'Plays it louder', 'Hides it', 'Downloads it'], 0),
        q.tf('Browsers often block autoplay with sound unless the audio is muted.', true),
      ],
    },
    BAx2GaMW2qA: {
      title: 'Video',
      try: 'Add a video with controls and a poster image, and give a fallback message for browsers that can’t play it.',
      minutes: 10,
      questions: [
        q.single('Which element embeds a video file?', ['<video>', '<movie>', '<media>', '<film>'], 0),
        q.single('Listing more than one <source> lets the browser…', ['Pick the first format it can play', 'Play them all at once', 'Show a gallery', 'Skip the video'], 0),
      ],
    },
    '8iXHciqlAdA': {
      title: 'Favicons',
      try: 'Make a small square icon and add it to your page as a favicon with a <link> tag in the <head>.',
      minutes: 10,
      questions: [
        q.single('A favicon is…', ['The small icon in the browser tab', 'A large banner', 'A font', 'A button'], 0),
        q.single('Where does the favicon <link> tag go?', ['In the <head>', 'At the end of the <body>', 'Inside an <img>', 'In a <footer>'], 0),
      ],
    },
  },
  checkpoint: programExam('HTML basics exam', [
    q.single('HTML stands for…', ['HyperText Markup Language', 'HighText Machine Language', 'Hyperlink and Text Markup Logic', 'Home Tool Markup Language'], 0),
    q.single('Which part of the page holds the title, stylesheet links and the favicon?', ['<head>', '<body>', '<footer>', '<main>'], 0),
    q.single('What appears on the page goes inside…', ['<body>', '<head>', '<title>', '<meta>'], 0),
    q.order('Put these headings from largest to smallest.', ['<h1>', '<h2>', '<h3>', '<h6>']),
    q.single('Which tag makes a paragraph?', ['<p>', '<para>', '<text>', '<pg>'], 0),
    q.single('Which tag adds a line break?', ['<br>', '<lb>', '<break>', '<newline>'], 0),
    q.single('An HTML comment looks like…', ['<!-- note -->', '// note', '/* note */', '# note'], 0),
    q.single('Which makes a link to example.com?', ['<a href="https://example.com">Example</a>', '<link src="https://example.com">', '<a src="https://example.com">', '<href>https://example.com</href>'], 0),
    q.single('To link to about.html in the same folder you write…', ['href="about.html"', 'href="https://about"', 'src="about.html"', 'href="#about.html"'], 0),
    q.single('A link with href="mailto:hello@example.com"…', ['Starts an email to that address', 'Downloads a file', 'Opens a map', 'Calls a phone'], 0),
    q.single('Which attribute makes a link open in a new tab?', ['target="_blank"', 'new="tab"', 'open="new"', 'href="_blank"'], 0),
    q.multi('Which are good alt text practices?', ['Describe what the image shows', 'Keep it short', 'Use alt="" for purely decorative images', 'Write “image” for every picture'], [0, 1, 2]),
    q.single('An <img> tag…', ['Has no closing tag', 'Must wrap text', 'Needs </img>', 'Only works with PNGs'], 0),
    q.single('To make an image clickable you…', ['Put the <img> inside an <a>', 'Add href to the <img>', 'Add click to the image', 'Use <button src>'], 0),
    q.match('Match each attribute to what it does on <audio> or <video>.', [['controls', 'Shows play and pause buttons'], ['autoplay', 'Starts playing when the page loads'], ['loop', 'Starts again when it finishes'], ['muted', 'Plays without sound']]),
    q.single('The poster attribute on <video>…', ['Shows an image before the video plays', 'Adds subtitles', 'Sets the volume', 'Loops the video'], 0),
    q.single('Why list several <source> files in <audio> or <video>?', ['Different browsers support different formats', 'To play them in order', 'To make it louder', 'It is required'], 0),
    q.single('A favicon is added with…', ['<link rel="icon" href="favicon.ico">', '<img favicon>', '<icon src="favicon.ico">', '<meta icon>'], 0),
    q.tf('A path like images/cat.jpg is relative to the HTML file’s folder.', true),
    q.tf('Indenting nested elements makes HTML easier to read but doesn’t change how it displays.', true),
  ]),
};
