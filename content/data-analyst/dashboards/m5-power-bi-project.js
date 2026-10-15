import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'A full Power BI project',
  lessons: {
    pixlHHe_lNQ: {
      title: 'A full guided Power BI project',
      try: 'Follow the guided project: clean the survey data in Power Query, build the visuals and arrange the dashboard. Export a PDF or screenshot and log it as your make.',
      minutes: 120,
      questions: [
        q.order('Put the Power BI project in order.', ['Load the data', 'Clean it in Power Query', 'Build the visuals', 'Arrange the dashboard', 'Share it']),
        q.single('Cleaning survey data often means…', ['Splitting combined answers and fixing inconsistent text', 'Deleting every answer', 'Adding fake answers', 'Changing the questions'], 0),
        q.tf('A finished dashboard is a strong portfolio piece.', true),
      ],
    },
  },
  checkpoint: programExam('Power BI project exam', [
    q.single('Messy survey answers like “Other (please specify): Python” are best fixed in…', ['Power Query', 'A card visual', 'A slicer', 'Model view'], 0),
    q.single('Splitting a column by a delimiter in Power Query…', ['Turns one column into several', 'Deletes the column', 'Creates a measure', 'Makes a chart'], 0),
    q.single('Replacing values in Power Query…', ['Swaps one value for another in every row', 'Deletes rows', 'Changes data types', 'Adds visuals'], 0),
    q.single('Which visual shows the average salary by job title?', ['A bar chart', 'A card', 'A slicer', 'A textbox'], 0),
    q.single('Which visual shows how many people took the survey?', ['A card', 'A line chart', 'A map', 'A matrix'], 0),
    q.single('A gauge visual shows…', ['A value against a target or range', 'A trend', 'A list', 'A hierarchy'], 0),
    q.tf('A dashboard’s layout should guide the eye from key numbers to details.', true),
    q.multi('Which are good habits for a portfolio dashboard?', ['A clear title and purpose', 'Consistent colours', 'A short write-up of findings', 'Every possible visual'], [0, 1, 2]),
    q.single('Publishing to the Power BI service needs…', ['A Microsoft work or school account', 'No account', 'A Tableau licence', 'MySQL'], 0),
    q.single('If you can’t publish, you can still share your work by…', ['Exporting a PDF or screenshots with a write-up', 'Deleting it', 'Emailing the raw data', 'Nothing'], 0),
    q.single('A text box on a dashboard is useful for…', ['Titles and short explanations', 'Calculations', 'Relationships', 'Data cleaning'], 0),
    q.single('Which question could a survey dashboard answer?', ['Which tools do respondents use most?', 'What is DAX?', 'How do I install MySQL?', 'What is a join?'], 0),
    q.single('Averages can mislead when…', ['A few extreme values skew them', 'Data is clean', 'There are many rows', 'Values are similar'], 0),
    q.tf('Checking totals in your dashboard against the raw data helps catch errors.', true),
    q.order('Put presenting your findings in order.', ['State the question', 'Show the key numbers', 'Explain the patterns', 'Give a recommendation']),
    q.single('Using a consistent theme in Power BI…', ['Keeps every visual matching', 'Changes the data', 'Breaks slicers', 'Removes titles'], 0),
    q.single('A donut chart is a variant of…', ['A pie chart', 'A bar chart', 'A table', 'A map'], 0),
    q.single('Treemaps show…', ['Parts of a whole as nested rectangles', 'Trends over time', 'One number', 'Relationships between two numbers'], 0),
    q.tf('Describing what you found in plain language makes a project far more useful to employers.', true),
    q.single('This project shows you can…', ['Take raw data all the way to a shareable dashboard', 'Only import data', 'Only write SQL', 'Only make one chart'], 0),
  ]),
};
