import { q } from '../../src/lib/content/plan';

// HTML from Kevin Stratvert, CSS concepts from Kevin Powell, then a personal site from
// Coding2GO. Lessons follow each video's own chapters.

const html = { id: 'FQdaUv95mR8', by: 'Kevin Stratvert', seconds: 2345 };
const css = { id: 'JnTPd9G6hoY', by: 'Kevin Powell', seconds: 1738 };
const site = { id: 'ZPMtug9qExk', by: 'Coding2GO', seconds: 1560 };

export default {
  slug: 'skill-first-web-page',
  title: 'Build your first web page',
  description: 'Write HTML and CSS from scratch in a free code editor and build a personal web page that works on phones.',
  makeTitle: 'Your own personal web page',
  skillId: 'software-engineering',
  cover: 'ZPMtug9qExk', // the video whose thumbnail is the skill's cover
  by: 'Kevin Stratvert',
  modules: [
    {
      title: 'HTML',
      lessons: [
        {
          ...html,
          title: 'Your first HTML file',
          to: 550,
          try: 'Install VS Code (free). Create index.html with a heading and a paragraph and open it in your browser.',
          minutes: 20,
          questions: [
            q.single('HTML is used to…', ['Describe the structure and content of a page', 'Style colours and layout', 'Store data in a database', 'Run a server'], 0),
          ],
        },
        {
          ...html,
          title: 'Headings, paragraphs and lists',
          from: 550,
          to: 1196,
          try: 'Add a section about you with a heading, a paragraph, and an unordered list of three things you like.',
          minutes: 25,
          questions: [
            q.match('Match the tag to what it makes.', [['<h1>', 'The main heading'], ['<p>', 'A paragraph'], ['<ul>', 'A bulleted list'], ['<li>', 'One list item']]),
          ],
        },
        {
          ...html,
          title: 'Links, images and media',
          from: 1196,
          to: 1772,
          try: 'Add a link to a site you like and an image (with alt text) to your page.',
          minutes: 25,
          questions: [
            q.single('Which attribute sets where a link goes?', ['href', 'src', 'alt', 'class'], 0),
            q.tf('The alt attribute describes an image for people who can’t see it.', true),
          ],
        },
        {
          ...html,
          title: 'Tables, forms and page structure',
          from: 1772,
          try: 'Wrap your content in header, main and footer elements, and add a simple contact form with a name field and a button.',
          minutes: 25,
          questions: [
            q.tf('The <head> holds information about the page, such as its title; the <body> holds what is shown.', true),
          ],
        },
      ],
    },
    {
      title: 'CSS',
      lessons: [
        {
          ...css,
          title: 'Inheritance and the cascade',
          to: 729,
          try: 'Create style.css, link it to your page, and set a font and colour on the body. Watch it apply everywhere.',
          minutes: 25,
          questions: [
            q.tf('Text styles like colour and font set on the body are inherited by the elements inside it.', true),
            q.single('If two rules with the same specificity set the same property, which wins?', ['The one that comes later', 'The first one', 'Neither', 'The shorter one'], 0),
          ],
        },
        {
          ...css,
          title: 'The box model and specificity',
          from: 729,
          to: 1258,
          try: 'Give your sections padding, a border and margin. Use the browser’s DevTools to inspect the box model.',
          minutes: 25,
          questions: [
            q.order('Order the box model from the inside out.', ['Content', 'Padding', 'Border', 'Margin']),
          ],
        },
        {
          ...css,
          title: 'Layouts, naming and content',
          from: 1258,
          try: 'Lay out your list of likes in a row with display: flex and a gap.',
          minutes: 25,
          questions: [
            q.single('display: flex is used to…', ['Lay out children in a row or column', 'Make text bold', 'Add a link', 'Load an image'], 0),
          ],
        },
      ],
    },
    {
      title: 'Build your page',
      lessons: [
        {
          ...site,
          title: 'Set up the project and header',
          to: 852,
          try: 'Follow along: set up the project and build the header section of your own personal page.',
          minutes: 45,
          questions: [
            q.tf('Keeping HTML and CSS in separate files makes a site easier to change.', true),
          ],
        },
        {
          ...site,
          title: 'Services, gallery and FAQ',
          from: 852,
          to: 1340,
          try: 'Add a section about what you do, a small image gallery with CSS grid, and an FAQ.',
          minutes: 45,
          questions: [
            q.single('CSS grid is especially good for…', ['Two-dimensional layouts like galleries', 'Changing fonts', 'Adding links', 'Animations only'], 0),
          ],
        },
        {
          ...site,
          title: 'Make it mobile friendly',
          from: 1340,
          try: 'Add a media query so your page works on a phone. Publish it free on GitHub Pages or Netlify and log the link as your make.',
          minutes: 60,
          questions: [
            q.single('A media query lets you…', ['Apply styles only at certain screen sizes', 'Add videos', 'Query a database', 'Load fonts'], 0),
            q.tf('The viewport meta tag helps a page display at the right size on phones.', true),
          ],
        },
      ],
    },
  ],
};
