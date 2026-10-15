import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Layouts, flexbox and animation',
  lessons: {
    Hsu8uqQTSV8: {
      title: 'A website layout',
      try: 'Lay out a page with a header, nav, main section, sidebar and footer, and make the sidebar move under the main section on small screens.',
      minutes: 25,
      questions: [
        q.single('@media (max-width: 600px) { … } applies its styles…', ['Only on screens 600px wide or less', 'By setting the page to 600px', 'To videos', 'Never'], 0),
        q.tf('Responsive design means the layout adapts to the screen size.', true),
      ],
    },
    uu0lOX6Ot3s: {
      title: 'Image gallery',
      try: 'Make a gallery of six images as equal-sized cards with captions and a hover effect.',
      minutes: 15,
      questions: [
        q.single('object-fit: cover on images…', ['Fills the box and crops instead of stretching', 'Stretches the image', 'Shows the whole image with gaps', 'Hides the image'], 0),
        q.single('Wrapping an image and caption in <figure> and <figcaption>…', ['Groups them meaningfully', 'Makes the image load faster', 'Adds a border', 'Is required for images'], 0),
      ],
    },
    k3AJx11k9QY: {
      title: 'Icons',
      try: 'Add a free icon set such as Font Awesome to your page and put icons beside your nav and footer links.',
      minutes: 15,
      questions: [
        q.single('Icon fonts like Font Awesome are added with…', ['A link to their stylesheet or script, then elements with their classes', 'An <img> for every icon only', 'A table', 'Nothing: they’re built into HTML'], 0),
        q.single('Icon fonts are resized and recoloured with…', ['font-size and color', 'width and height only', 'src', 'alt'], 0),
      ],
    },
    GteJWhCikCk: {
      title: 'Flexbox',
      try: 'Rebuild your nav bar and a row of cards with flexbox, using justify-content, align-items, gap and flex-wrap.',
      minutes: 25,
      questions: [
        q.single('display: flex on a container…', ['Lays its children out in a row by default', 'Always stacks children', 'Hides children', 'Makes a table'], 0),
        q.match('Match each flexbox property to what it controls.', [['justify-content', 'Spacing along the main axis'], ['align-items', 'Alignment across the cross axis'], ['flex-direction', 'Row or column'], ['flex-wrap', 'Whether items wrap onto new lines']]),
      ],
    },
    qdeIy9_fbxE: {
      title: 'Transformations',
      try: 'Make your gallery cards grow slightly on hover with transform: scale(), and rotate an icon with rotate().',
      minutes: 15,
      questions: [
        q.single('transform: translateX(50px)…', ['Moves the element 50px to the right', 'Rotates it 50 degrees', 'Scales it', 'Skews it'], 0),
        q.single('transform: rotate(45deg)…', ['Turns the element 45 degrees clockwise', 'Moves it', 'Grows it', 'Flips it'], 0),
      ],
    },
    u_GIT5MJAtc: {
      title: 'Animations',
      try: 'Animate something with @keyframes, like a bouncing arrow or a heading that fades in. Then publish your finished multi-page site for free on GitHub Pages or Netlify, and log the link as your make.',
      minutes: 30,
      questions: [
        q.single('@keyframes defines…', ['The steps of an animation', 'A font', 'A media query', 'A variable'], 0),
        q.single('animation-iteration-count: infinite…', ['Repeats the animation forever', 'Plays it once', 'Stops it', 'Reverses it'], 0),
        q.tf('A transition animates between two states, such as normal and :hover.', true),
      ],
    },
  },
  checkpoint: programExam('Layouts and animation exam', [
    q.single('Responsive design means…', ['A layout that adapts to different screen sizes', 'A fast server', 'A site with animations', 'A dark theme'], 0),
    q.single('<meta name="viewport" content="width=device-width, initial-scale=1">…', ['Makes phones lay the page out at their real width', 'Adds a favicon', 'Sets the language', 'Loads CSS'], 0),
    q.single('Styles inside @media (max-width: 768px) apply…', ['On screens 768px wide or narrower', 'On screens wider than 768px', 'Only when printing', 'Always'], 0),
    q.single('With flex-direction: row, the main axis runs…', ['Horizontally', 'Vertically', 'Diagonally', 'Nowhere'], 0),
    q.single('justify-content: space-between…', ['Puts equal space between items and none at the ends', 'Centres all items', 'Stacks items', 'Adds margins'], 0),
    q.single('align-items: center in a row flex container…', ['Centres items vertically', 'Centres items horizontally', 'Wraps items', 'Reverses items'], 0),
    q.single('gap: 1rem on a flex container…', ['Adds space between items', 'Adds padding inside each item', 'Adds a border', 'Shrinks the items'], 0),
    q.single('flex-wrap: wrap…', ['Lets items move onto new lines when there’s no room', 'Prevents wrapping', 'Wraps text', 'Hides overflow'], 0),
    q.single('flex: 1 on every item…', ['Makes them share the space equally', 'Makes them 1px wide', 'Hides them', 'Puts them in a column'], 0),
    q.single('To centre one item both ways inside a box you can use…', ['display: flex; justify-content: center; align-items: center', 'margin: 0 auto only', 'text-align: center only', 'float: center'], 0),
    q.single('object-fit: cover…', ['Crops an image to fill its box without stretching', 'Stretches it', 'Hides it', 'Adds a border'], 0),
    q.single('transform: scale(1.1)…', ['Makes the element 10% bigger', 'Moves it 1.1px', 'Rotates it', 'Makes it 10% smaller'], 0),
    q.single('Which transform slants an element?', ['skew()', 'scale()', 'translate()', 'zoom()'], 0),
    q.single('transition: transform 0.3s…', ['Animates changes to transform over 0.3 seconds', 'Delays the page by 0.3 seconds', 'Rotates by 0.3 degrees', 'Does nothing'], 0),
    q.single('In @keyframes, 0% and 100% are…', ['The start and end of the animation', 'Opacity values', 'Sizes', 'Delays'], 0),
    q.match('Match each animation property to what it sets.', [['animation-duration', 'How long one cycle takes'], ['animation-delay', 'How long before it starts'], ['animation-iteration-count', 'How many times it runs'], ['animation-direction', 'Forwards, backwards or alternating']]),
    q.tf('Respecting prefers-reduced-motion helps people who feel unwell from movement on screen.', true),
    q.single('Icon fonts are styled like…', ['Text, with font-size and color', 'Images, with src', 'Tables', 'Forms'], 0),
    q.single('A sidebar that drops under the main content on phones is usually done with…', ['A media query that changes the layout', 'JavaScript only', 'Deleting the sidebar', 'A table'], 0),
    q.order('Put building a responsive page in order.', ['Write semantic HTML', 'Add base styles', 'Lay out sections with flexbox', 'Add media queries for small screens', 'Test on a phone and a desktop']),
  ]),
};
