import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Get hired',
  lessons: {
    ocdwh0KYeUs: {
      title: 'Build a free portfolio website',
      try: 'Make a free portfolio site (GitHub Pages or a similar free builder) with your Excel, SQL and dashboard projects, each with a short write-up.',
      minutes: 120,
      questions: [
        q.multi('What should each portfolio project include?', ['The question you answered', 'The tools you used', 'Your findings, with a link or screenshots', 'Your home address'], [0, 1, 2]),
        q.single('GitHub Pages lets you…', ['Host a simple website for free', 'Run SQL databases', 'Edit videos', 'Make Power BI reports'], 0),
      ],
    },
    WizLaDdsHUs: {
      title: 'Write a data analyst CV',
      try: 'Write a one-page CV with a skills section (Excel, SQL, Power BI or Tableau) and your three projects, each with one result in numbers.',
      minutes: 60,
      questions: [
        q.single('A strong project bullet on a CV…', ['Shows the tool, the action and a result, ideally with a number', 'Lists only the tool', 'Is a paragraph long', 'Avoids specifics'], 0),
        q.tf('Tailoring your CV to each job description improves your chances.', true),
      ],
    },
    '7uH7_DThtX0': {
      title: 'Use LinkedIn to land a job',
      try: 'Update your LinkedIn headline and About section, add your projects, and post about one thing you learned. Log your portfolio link as your make.',
      minutes: 30,
      questions: [
        q.single('A clear LinkedIn headline for a new analyst might be…', ['“Data Analyst | Excel, SQL, Power BI”', '“Looking for anything”', '“Hi”', '“Student”'], 0),
        q.tf('Sharing your projects publicly helps recruiters find you.', true),
      ],
    },
  },
  checkpoint: programExam('Getting hired exam', [
    q.single('A portfolio matters because…', ['It proves your skills with real work', 'It replaces your CV entirely', 'Employers never look at it', 'It is required by law'], 0),
    q.multi('Which belong in a data analyst portfolio?', ['An Excel dashboard', 'A SQL cleaning or analysis project', 'A Power BI or Tableau dashboard', 'Your passwords'], [0, 1, 2]),
    q.single('A good project write-up starts with…', ['The question or problem', 'Your life story', 'The colour scheme', 'A list of software versions'], 0),
    q.single('A data analyst CV should usually be…', ['One page, focused and specific', 'Five pages', 'A video only', 'Handwritten'], 0),
    q.single('Which CV bullet is strongest?', ['“Built a Power BI dashboard that cut monthly reporting time by 50%”', '“Used Power BI”', '“Good with data”', '“Hard worker”'], 0),
    q.single('Applicant tracking systems (ATS) scan CVs for…', ['Keywords that match the job description', 'Colours', 'Photos', 'Fonts only'], 0),
    q.tf('Copying keywords honestly from the job description into your CV helps it get past ATS filters.', true),
    q.single('A strong LinkedIn headline…', ['Names your role and key skills', 'Is left blank', 'Says “unemployed”', 'Is a joke'], 0),
    q.single('Posting about what you’re learning on LinkedIn…', ['Shows initiative and helps people find you', 'Hurts your chances', 'Is not allowed', 'Has no effect'], 0),
    q.single('Before an interview, it helps to…', ['Practise explaining your projects clearly', 'Memorise random facts', 'Avoid preparing', 'Learn a new tool that day'], 0),
    q.single('In an interview, explain a project using…', ['The problem, what you did, and the result', 'Only the tools', 'Only the result', 'Only the dataset size'], 0),
    q.multi('Which skills do entry-level analyst jobs commonly ask for?', ['Excel', 'SQL', 'A BI tool like Power BI or Tableau', 'Video editing'], [0, 1, 2]),
    q.tf('Networking and referrals are a common way people get hired.', true),
    q.single('A portfolio website should be…', ['Simple, easy to navigate and link to each project', 'Full of animations', 'Private', 'Only text with no links'], 0),
    q.single('When applying, tailoring means…', ['Adjusting your CV to match each job', 'Using the same CV for everything', 'Leaving out skills', 'Adding fake jobs'], 0),
    q.order('Put the job search steps in order.', ['Finish your portfolio projects', 'Write your CV', 'Update LinkedIn', 'Apply and network', 'Prepare for interviews']),
    q.single('A GitHub repository is useful for…', ['Sharing your SQL scripts and project files', 'Hosting videos', 'Running Power BI', 'Sending emails'], 0),
    q.single('Quantifying results means…', ['Using numbers to show impact', 'Using adjectives', 'Listing tools', 'Writing longer'], 0),
    q.tf('It’s fine to apply for jobs before you feel 100% ready.', true),
    q.single('This module turns your skills into…', ['A portfolio, CV and profile employers can see', 'A database', 'A certification exam', 'A new tool'], 0),
  ]),
};
