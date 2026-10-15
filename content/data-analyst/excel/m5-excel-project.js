import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Your first Excel project',
  lessons: {
    opJgMj1IUrc: {
      title: 'A full project in Excel',
      try: 'Follow the full project: clean the data, build pivot tables and charts, and arrange them into a dashboard with slicers. Save it and log a screenshot as your make.',
      minutes: 120,
      questions: [
        q.order('Put the project steps in order.', ['Clean the raw data', 'Build pivot tables', 'Create pivot charts', 'Arrange a dashboard', 'Add slicers to filter it']),
        q.single('A dashboard is…', ['A single view of key charts and numbers', 'A raw data sheet', 'A formula', 'A database'], 0),
        q.tf('Connecting one slicer to several pivot tables filters them all together.', true),
      ],
    },
  },
  checkpoint: programExam('Excel project exam', [
    q.single('The first step in an Excel analysis project is usually…', ['Cleaning and understanding the data', 'Making charts', 'Adding colours', 'Writing a report'], 0),
    q.single('A dashboard should show…', ['The few numbers and charts that answer the key questions', 'Every column of data', 'Only raw data', 'Decorations'], 0),
    q.single('Slicers on a dashboard let the viewer…', ['Filter the charts interactively', 'Edit the raw data', 'Delete charts', 'Change fonts'], 0),
    q.single('To make one slicer control several pivot tables, use…', ['Report Connections', 'Remove Duplicates', 'Text to Columns', 'Freeze Panes'], 0),
    q.tf('Keeping raw data, pivot tables and the dashboard on separate sheets keeps a workbook organised.', true),
    q.single('Before you build charts, columns should have…', ['Consistent types and clean values', 'Merged cells', 'Blank rows', 'Random formats'], 0),
    q.multi('Which belong on a sales dashboard?', ['Total revenue', 'Sales by product or region', 'A trend over time', 'Every individual order'], [0, 1, 2]),
    q.single('Which chart suits revenue by month on a dashboard?', ['A line or column chart', 'A pie with 12 slices', 'A table of every order', 'A word cloud'], 0),
    q.single('Hiding gridlines and headings on the dashboard sheet makes it…', ['Look cleaner, like an app', 'Calculate faster', 'Bigger', 'Locked'], 0),
    q.single('A KPI card on a dashboard shows…', ['One important number, like total revenue', 'A full table', 'A chart legend', 'A filter'], 0),
    q.tf('A good dashboard answers specific questions rather than showing everything.', true),
    q.single('You change the raw data. To update the dashboard you…', ['Refresh all pivot tables', 'Rebuild every chart', 'Restart Excel', 'Do nothing'], 0),
    q.single('Colour on a dashboard should be…', ['Used consistently and sparingly to highlight what matters', 'Different on every chart', 'As bright as possible everywhere', 'Avoided entirely'], 0),
    q.order('Put the analysis steps in order.', ['Define the questions', 'Clean the data', 'Summarise with pivot tables', 'Visualise with charts', 'Share the dashboard']),
    q.single('Why add a clear title to every chart on a dashboard?', ['So viewers instantly know what it shows', 'To make it bigger', 'Excel requires it', 'To slow it down'], 0),
    q.single('Freeze Panes is useful on the raw data sheet to…', ['Keep headers visible while scrolling', 'Stop calculation', 'Protect cells', 'Remove duplicates'], 0),
    q.tf('Saving versions of your project protects you from losing work.', true),
    q.single('Which is the best way to share a finished dashboard with someone who doesn’t have Excel?', ['Export it as a PDF or share it via Excel on the web', 'Email the raw CSV only', 'Print the formulas', 'Send a voice note'], 0),
    q.single('Grouping order dates by month in a pivot table lets you…', ['Show monthly totals', 'Delete dates', 'Change time zones', 'Sort alphabetically only'], 0),
    q.single('This project is a good portfolio piece because…', ['It shows cleaning, analysis and visualisation together', 'It uses only one formula', 'It has no data', 'It took no time'], 0),
  ]),
};
