import { q } from '../../src/lib/content/plan';

// Kevin Stratvert's free Google Sheets tutorial, split along its own chapters.

const sheets = { id: 'TENAbUa-R-w', seconds: 2951 };

export default {
  slug: 'skill-google-sheets-basics',
  title: 'Organise anything in Google Sheets',
  description: 'Enter and format data, write formulas, sort and filter, and turn numbers into charts and pivot tables, free in your browser.',
  makeTitle: 'A monthly budget with formulas and a chart',
  skillId: 'data',
  cover: 'TENAbUa-R-w', // the video whose thumbnail is the skill's cover
  by: 'Kevin Stratvert',
  modules: [
    {
      title: 'Get started',
      lessons: [
        {
          ...sheets,
          title: 'What Google Sheets is and where to find it',
          to: 386,
          try: 'Open sheets.new in your browser and name the file "My budget".',
          minutes: 10,
          questions: [
            q.tf('Google Sheets is free with a Google account and runs in the browser.', true),
          ],
        },
        {
          ...sheets,
          title: 'Enter and format data',
          from: 386,
          to: 822,
          try: 'Make columns for Date, Item, Category and Amount, and enter ten real or made-up expenses. Format Amount as currency.',
          minutes: 25,
          questions: [
            q.single('A cell is named by…', ['Its column letter and row number, like B3', 'Its colour', 'The sheet name only', 'Its value'], 0),
          ],
        },
        {
          ...sheets,
          title: 'Conditional formatting, freezing and Explore',
          from: 822,
          to: 1194,
          try: 'Freeze your header row and add conditional formatting that turns any expense over 50 red.',
          minutes: 20,
          questions: [
            q.tf('Freezing the header row keeps it visible as you scroll down.', true),
          ],
        },
      ],
    },
    {
      title: 'Formulas',
      lessons: [
        {
          ...sheets,
          title: 'Arithmetic, functions and SUM',
          from: 1194,
          to: 1553,
          try: 'Add a total under Amount with =SUM(), and a cell that subtracts it from your monthly income.',
          minutes: 25,
          questions: [
            q.single('Every formula starts with…', ['=', '+', '#', '$'], 0),
            q.text('Write the formula that adds up cells D2 to D11.', ['=SUM(D2:D11)', '=sum(d2:d11)', 'SUM(D2:D11)']),
          ],
        },
        {
          ...sheets,
          title: 'Relative and absolute references, named ranges',
          from: 1553,
          to: 1772,
          try: 'Add a column that shows each expense as a share of the total, using $ to lock the reference to the total cell.',
          minutes: 25,
          questions: [
            q.single('In =D2/$D$12, the $ signs…', ['Keep D12 fixed when you copy the formula', 'Format the result as money', 'Make the formula faster', 'Mean nothing'], 0),
          ],
        },
      ],
    },
    {
      title: 'Find, sort and summarise',
      lessons: [
        {
          ...sheets,
          title: 'VLOOKUP, multiple sheets, sort and filter',
          from: 1772,
          to: 2199,
          try: 'Sort your expenses by amount, then add a filter to show one category at a time.',
          minutes: 25,
          questions: [
            q.tf('A filter hides rows without deleting them.', true),
          ],
        },
        {
          ...sheets,
          title: 'Charts and pivot tables',
          from: 2199,
          to: 2569,
          try: 'Make a pivot table of spending by category, then a pie or bar chart from it.',
          minutes: 30,
          questions: [
            q.single('A pivot table is good for…', ['Summarising data, like totals per category', 'Typing data faster', 'Spell checking', 'Sharing a file'], 0),
          ],
        },
        {
          ...sheets,
          title: 'Forms, sharing and version history',
          from: 2569,
          try: 'Share your budget with view-only access to someone you trust, and log a screenshot of it as your make.',
          minutes: 15,
          questions: [
            q.tf('Version history lets you go back to an earlier copy of your sheet.', true),
          ],
        },
      ],
    },
  ],
};
