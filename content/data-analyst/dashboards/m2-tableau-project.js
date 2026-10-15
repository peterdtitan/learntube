import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'A full Tableau project',
  lessons: {
    'zOR0-nygfDE': {
      title: 'A full beginner project in Tableau',
      try: 'Follow the project: build each sheet, combine them into a dashboard with filters, and publish it to Tableau Public. Save the link.',
      minutes: 120,
      questions: [
        q.order('Put the Tableau project in order.', ['Connect to the data', 'Build individual sheets', 'Combine them in a dashboard', 'Add filters and actions', 'Publish to Tableau Public']),
        q.single('Publishing to Tableau Public gives you…', ['A shareable link for your portfolio', 'A paid licence', 'A database', 'A PDF only'], 0),
        q.tf('Using one filter across several sheets keeps a dashboard consistent.', true),
      ],
    },
  },
  checkpoint: programExam('Tableau project exam', [
    q.single('The first step of a Tableau project is…', ['Understanding and connecting to the data', 'Choosing colours', 'Publishing', 'Writing a résumé'], 0),
    q.single('Each chart in a Tableau dashboard lives on…', ['Its own sheet', 'One shared sheet', 'The data source', 'A filter'], 0),
    q.single('A filter applied to “All using this data source”…', ['Filters every sheet that uses that data', 'Only one sheet', 'Deletes data', 'Changes joins'], 0),
    q.single('A dashboard action lets viewers…', ['Click one chart to filter or highlight others', 'Edit the data', 'Download the workbook always', 'Change fonts'], 0),
    q.single('Fixed dashboard sizes help because…', ['The layout looks the same on every screen', 'It loads faster always', 'It is required', 'It hides data'], 0),
    q.tf('Clear titles on every sheet make a dashboard easier to read.', true),
    q.multi('Which belong on a strong dashboard?', ['Key numbers (KPIs)', 'A trend over time', 'A breakdown by category', 'Every raw row of data'], [0, 1, 2]),
    q.single('Tooltips in Tableau show…', ['Details when you hover over a mark', 'Errors', 'The data source', 'Filters'], 0),
    q.single('Sorting bars from largest to smallest helps viewers…', ['Compare quickly', 'Get confused', 'See dates', 'Find errors'], 0),
    q.single('When publishing to Tableau Public, remember that…', ['Anyone can see it, so never use private data', 'It stays private', 'It deletes your file', 'It costs money'], 0),
    q.single('Using the same colour for the same category across all sheets…', ['Keeps the dashboard consistent', 'Confuses viewers', 'Is impossible', 'Hides data'], 0),
    q.single('A KPI shown as a big number on a dashboard is often called a…', ['Card or BAN (big-ass number)', 'Join', 'Bin', 'Parameter'], 0),
    q.tf('A dashboard should answer specific questions, not show everything.', true),
    q.single('Before publishing, you should…', ['Check every filter and number makes sense', 'Delete the sheets', 'Remove titles', 'Hide the data source'], 0),
    q.single('Which chart helps compare categories across regions?', ['A bar chart, possibly coloured by region', 'A single line', 'A word cloud', 'A table of IDs'], 0),
    q.order('Put polishing a dashboard in order.', ['Arrange the sheets', 'Add titles and labels', 'Add filters and actions', 'Check it from a viewer’s point of view', 'Publish']),
    q.single('Hovering to see exact values is done with…', ['Tooltips', 'Bins', 'Joins', 'Extracts'], 0),
    q.single('A Tableau Public link on your CV shows employers…', ['Real work they can explore', 'Your password', 'Only your name', 'Nothing useful'], 0),
    q.tf('Getting feedback on your dashboard from someone else helps you spot unclear parts.', true),
    q.single('This project is a portfolio piece because it shows…', ['Building and sharing an interactive dashboard end to end', 'Only data entry', 'Only SQL', 'Nothing'], 0),
  ]),
};
