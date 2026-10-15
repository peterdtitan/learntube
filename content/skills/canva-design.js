import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/canva-design.json';

// Canva's own ten-part beginner series, the principles of design from Canva and LearnFree
// (GCFGlobal), then real projects: a flyer with Kesington Abdurrazaq and a full tour with
// Whitney Bonds and Aurelius Tjin. "Canva tutorial for beginners" and "graphic design for
// beginners" are top searches in Nigeria.

export default {
  slug: 'skill-canva-design',
  title: 'Design flyers and social posts in Canva',
  description: 'Learn your way around Canva, the design principles that make anything look professional, and design a flyer and a social media post you can actually use. Canva’s free plan is all you need.',
  makeTitle: 'A flyer and a matching social media post for a real or imagined event',
  skillId: 'design',
  cover: 'KglO4C412DA',
  by: 'Canva',
  videos,
  lessons: {
    V9LtRF6EbyY: {
      title: 'Opening Canva',
      try: 'Make a free Canva account and open a new Instagram post design. Find the editor’s side panel, toolbar and page.',
      minutes: 10,
      questions: [
        q.single('Canva’s free plan lets you…', ['Design with thousands of free templates and elements', 'Only view designs', 'Only print', 'Only edit videos'], 0),
        q.tf('Each design type in Canva (post, flyer, presentation) starts with a canvas of the right size.', true),
      ],
    },
    g7fmkpXZqzY: {
      title: 'Using templates',
      try: 'Open a flyer template you like and change its text, colours and one image to make it yours.',
      minutes: 15,
      questions: [
        q.single('A template is…', ['A ready-made design you customise', 'A blank page only', 'A font', 'A photo filter'], 0),
        q.tf('Changing a template’s text, colours and images is a fast way to make a professional design.', true),
      ],
    },
    NTJ5uZrC7B4: {
      title: 'Using search',
      try: 'Search Elements for three things for your flyer (an icon, a shape and a photo) and add them to your design.',
      minutes: 10,
      questions: [
        q.single('Where do you find icons, shapes and stickers in Canva?', ['The Elements panel', 'The Download menu', 'Account settings', 'The share button'], 0),
        q.tf('Some elements are marked as Pro and need a paid plan.', true),
      ],
    },
    TAgS7HsSEQA: {
      title: 'Upload and edit photos',
      try: 'Upload one of your own photos, crop it to fit a frame, and adjust its brightness.',
      minutes: 10,
      questions: [
        q.single('A frame in Canva…', ['Crops a photo into a shape when you drop it in', 'Adds a border only', 'Deletes the photo', 'Prints it'], 0),
        q.single('Where do your own photos go in Canva?', ['The Uploads panel', 'The Templates panel', 'The Text panel', 'The Brand panel only'], 0),
      ],
    },
    cZ43k01WH54: {
      title: 'Lines, shapes, graphics and charts',
      try: 'Add a shape behind a heading to make it stand out, and a line to separate two sections.',
      minutes: 10,
      questions: [
        q.tf('A shape placed behind text can improve contrast and make the text easier to read.', true),
        q.single('Charts in Canva are useful for…', ['Showing numbers visually', 'Writing paragraphs', 'Uploading photos', 'Changing fonts'], 0),
      ],
    },
    OQGJceRFHQ0: {
      title: 'Fonts and text',
      try: 'Pick two fonts for your flyer: one bold font for the heading and one simple font for the details.',
      minutes: 10,
      questions: [
        q.single('How many fonts should a simple flyer usually use?', ['Two, maybe three', 'As many as possible', 'One per word', 'Seven'], 0),
        q.single('Body text should be…', ['Simple and easy to read', 'Decorative script', 'All capitals', 'Very light grey on white'], 0),
      ],
    },
    DJKU3ihHH68: {
      title: 'Video and audio in Canva',
      try: 'Turn your social post into a short animated version: add one animation and, if you like, a music track.',
      minutes: 10,
      questions: [
        q.tf('Canva can make short videos and animated posts as well as still designs.', true),
        q.single('Downloading an animated design gives you…', ['An MP4 video or a GIF', 'A PDF only', 'A Word file', 'A JPG only'], 0),
      ],
    },
    hyaMhBqGT9Q: {
      title: 'Share and collaborate',
      try: 'Share your design with a friend with comment or edit access and ask for one piece of feedback.',
      minutes: 10,
      questions: [
        q.single('Sharing a design with “Can comment” access lets someone…', ['Leave comments without changing the design', 'Delete it', 'Edit everything', 'Change your account'], 0),
        q.tf('Getting feedback before you publish helps you catch mistakes.', true),
      ],
    },
    UmHMVU6dceA: {
      title: 'The principles of design',
      try: 'Look at your flyer and check one principle at a time: balance, contrast, hierarchy and white space. Fix the weakest one.',
      minutes: 20,
      questions: [
        q.single('Visual hierarchy means…', ['The most important thing is the most noticeable', 'Every element is the same size', 'Text is always on top', 'Using many colours'], 0),
        q.single('White space (empty space) helps a design…', ['Breathe and look less cluttered', 'Look unfinished', 'Use more ink', 'Hide the message'], 0),
        q.tf('Contrast (like dark text on a light background) makes things easier to read.', true),
      ],
    },
    YqQx75OPRa0: {
      title: 'Graphic design fundamentals',
      try: 'Find a poster or ad you like. Name the line, shape, colour and type choices that make it work.',
      minutes: 15,
      questions: [
        q.multi('Which are basic elements of graphic design?', ['Line', 'Shape', 'Colour', 'Wi-Fi'], [0, 1, 2]),
        q.single('Balance in a design is about…', ['How visual weight is spread across the layout', 'The number of pages', 'File size', 'Printing cost'], 0),
      ],
    },
    jzWxBuvwuwQ: {
      title: 'Master Canva in 15 minutes',
      try: 'Use the alignment guides and Position tool to line up every element on your flyer neatly.',
      minutes: 20,
      questions: [
        q.single('The pink guide lines that appear as you drag…', ['Help you align and space elements', 'Mark an error', 'Show the print area only', 'Delete elements'], 0),
        q.tf('Grouping elements lets you move them together.', true),
      ],
    },
    KglO4C412DA: {
      title: 'Design a flyer',
      try: 'Design a flyer for a real or imagined event: a clear headline, date, time, place, and how to get in touch.',
      minutes: 45,
      questions: [
        q.multi('What must an event flyer tell people?', ['What the event is', 'When it is', 'Where it is', 'Your password'], [0, 1, 2]),
        q.single('What should be the biggest text on an event flyer?', ['The event’s name or main message', 'The small print', 'The phone number', 'The designer’s name'], 0),
        q.single('For printing, which download type keeps text sharpest?', ['PDF Print', 'A small JPG', 'A GIF', 'A screenshot'], 0),
      ],
    },
    '6j5AUi2cxvs': {
      title: 'Everything you need to know, and a social post',
      try: 'Resize your flyer into a square social post (or make a matching one from scratch). Download both and log them as your make.',
      minutes: 30,
      questions: [
        q.single('Which size suits a square Instagram post?', ['1080 × 1080 pixels', '1920 × 1080 pixels', 'A4', '100 × 100 pixels'], 0),
        q.single('Keeping the same fonts and colours across your designs builds…', ['A consistent brand look', 'Bigger files', 'Slower downloads', 'Printing problems'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Find your way around Canva',
      lessons: ['V9LtRF6EbyY', 'g7fmkpXZqzY', 'NTJ5uZrC7B4', 'TAgS7HsSEQA', 'cZ43k01WH54', 'OQGJceRFHQ0', 'DJKU3ihHH68', 'hyaMhBqGT9Q'],
      checkpoint: exam('Canva basics exam', [
        q.single('Where do you start a design that is already laid out for you?', ['Templates', 'Uploads', 'Account', 'Download'], 0),
        q.single('Where do you find icons and shapes?', ['Elements', 'Projects', 'Share', 'Settings'], 0),
        q.single('Dropping a photo onto a frame…', ['Crops it into the frame’s shape', 'Deletes it', 'Turns it into text', 'Prints it'], 0),
        q.tf('You can change the colour of most text and shapes in Canva.', true),
        q.multi('Which can you upload to Canva?', ['Your photos', 'Your videos', 'Audio files', 'Your Wi-Fi'], [0, 1, 2]),
        q.single('To put an element behind another, you use…', ['Position (layers): send backward', 'Duplicate', 'Share', 'Download'], 0),
        q.single('Duplicating a page is useful for…', ['Making variations without starting over', 'Deleting work', 'Sharing', 'Printing'], 0),
        q.single('Which download type keeps a transparent background (on supported plans)?', ['PNG', 'JPG', 'MP4', 'PDF Print'], 0),
        q.tf('Changing a template’s photos, text and colours makes it your own design.', true),
        q.single('A collaborator with “Can edit” access can…', ['Change the design', 'Only look', 'Only comment', 'Nothing'], 0),
        q.single('Canva saves your designs…', ['Automatically, in Projects', 'Only when you print', 'Never', 'On a USB stick'], 0),
        q.order('Put a quick Canva workflow in order.', ['Choose a design type', 'Pick a template', 'Change text, images and colours', 'Download or share']),
      ]),
    },
    {
      title: 'Design principles',
      lessons: ['UmHMVU6dceA', 'YqQx75OPRa0', 'jzWxBuvwuwQ'],
      checkpoint: exam('Design principles exam', [
        q.single('Hierarchy tells the viewer…', ['What to look at first, second and third', 'How big the file is', 'Which font is free', 'Where to print'], 0),
        q.single('Alignment makes a design look…', ['Organised and intentional', 'Random', 'Colourful', 'Animated'], 0),
        q.single('Proximity means…', ['Grouping related items close together', 'Spreading everything out evenly', 'Using one colour', 'Making text bigger'], 0),
        q.single('Repetition (using the same colours, fonts and shapes) creates…', ['Consistency', 'Confusion', 'Clutter', 'Bigger files'], 0),
        q.tf('Too many fonts and colours on one design usually looks messy.', true),
        q.single('Light yellow text on a white background has…', ['Poor contrast and is hard to read', 'Perfect contrast', 'Good hierarchy', 'Good balance'], 0),
        q.multi('Which create contrast?', ['Size differences', 'Dark against light', 'Bold against thin type', 'Everything the same'], [0, 1, 2]),
        q.single('Symmetrical balance means…', ['Both sides of the layout mirror each other', 'Everything is on one side', 'There is no white space', 'The text is centred only'], 0),
        q.tf('White space is wasted space and should always be filled.', false, 'Space around elements helps the important parts stand out.'),
        q.single('The rule of thirds can help you…', ['Place key elements in a pleasing spot', 'Choose a font', 'Pick a file type', 'Share a design'], 0),
        q.single('Why line elements up to the same edge?', ['It looks tidy and is easier to read', 'It is required by Canva', 'It changes the colours', 'It makes the file smaller'], 0),
        q.match('Match each principle to what it does.', [['Hierarchy', 'Shows what matters most'], ['Proximity', 'Groups related items'], ['Repetition', 'Creates consistency'], ['Contrast', 'Makes things stand out']]),
      ]),
    },
    {
      title: 'Design a flyer and a social post',
      lessons: ['KglO4C412DA', '6j5AUi2cxvs'],
      checkpoint: exam('Flyer and social post exam', [
        q.single('Which is most important on an event flyer?', ['A clear headline people can read from a distance', 'Lots of small decorations', 'Every font you like', 'A long paragraph'], 0),
        q.multi('What details does an event flyer need?', ['Date and time', 'Place', 'How to get in touch or register', 'Your bank PIN'], [0, 1, 2]),
        q.single('A call to action is…', ['A line telling people what to do next, like “Register now”', 'A phone call', 'A font', 'A colour'], 0),
        q.single('Which file is best for printing a flyer?', ['PDF Print', 'GIF', 'MP4', 'A low-quality JPG'], 0),
        q.single('Which is a common size for a vertical Instagram post?', ['1080 × 1350 pixels', '1920 × 1080 pixels', '300 × 300 pixels', 'A3'], 0),
        q.tf('Using the same colours and fonts on your flyer and social post makes them look like one campaign.', true),
        q.single('Your flyer looks cluttered. What is the first fix?', ['Remove elements that don’t help the message', 'Add more icons', 'Use more fonts', 'Make everything bigger'], 0),
        q.single('Photos of real people or the actual venue usually…', ['Make a flyer more trustworthy and engaging', 'Make it harder to read', 'Must be avoided', 'Change its size'], 0),
        q.tf('Checking spelling, dates and phone numbers before sharing is part of design.', true),
        q.order('Put the steps for designing a flyer in order.', ['Write the message and details', 'Choose a template or layout', 'Set the hierarchy: headline, details, call to action', 'Add images and brand colours', 'Proofread and download']),
        q.single('Bleed, when printing, is…', ['Extra background past the trim edge so no white shows after cutting', 'Ink smudges', 'A font', 'A type of paper'], 0),
        q.single('Making a social post from your flyer is easiest by…', ['Resizing or copying the design and rearranging it', 'Starting from zero each time', 'Taking a photo of the printed flyer', 'Sending the PDF'], 0),
      ]),
    },
  ],
};
