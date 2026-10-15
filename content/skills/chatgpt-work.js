import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/chatgpt-work.json';

// "How to use ChatGPT", "AI course for beginners" and "how to learn AI" are among the top
// learning searches in the US and Nigeria. Practical tutorials from Kevin Stratvert, Jeff Su,
// Anson Alexander and AI Mastermind, Tina Huang's summary of Google's prompting course, then
// IBM on why AI makes things up and David Bombal on keeping your data private.

export default {
  slug: 'skill-chatgpt-work',
  title: 'Get real work done with ChatGPT',
  description: 'Use ChatGPT to write, plan, study and summarise; write prompts that get useful answers the first time; and know when not to trust it or share with it. The free plan is enough.',
  makeTitle: 'A real piece of work made with ChatGPT and checked by you: a CV, study guide, business plan or lesson plan',
  skillId: 'ai',
  cover: 'KmcTu2EigTs',
  by: 'Kevin Stratvert',
  videos,
  lessons: {
    'mqDn-h0PJnA': {
      title: 'ChatGPT for work, the basics',
      try: 'Make a free ChatGPT account. Ask it to draft an email you actually need to send, then ask it to make the email shorter and friendlier.',
      minutes: 15,
      questions: [
        q.single('After ChatGPT answers, the best way to improve the answer is to…', ['Reply in the same chat asking for the changes you want', 'Start over every time', 'Copy it exactly', 'Close the app'], 0),
        q.tf('ChatGPT remembers what you said earlier in the same conversation.', true),
      ],
    },
    hOe0maWOhp8: {
      title: 'A full beginner’s tour',
      try: 'Try three features from the video: upload a document or photo and ask about it, use voice, and organise chats into a project or folder.',
      minutes: 20,
      questions: [
        q.multi('What can you give ChatGPT besides typed text?', ['Files like PDFs', 'Photos', 'Your voice', 'Your bank card PIN'], [0, 1, 2]),
        q.single('Starting a new chat for a new topic helps because…', ['Old context won’t confuse the new task', 'It costs less', 'It makes answers longer', 'It is required'], 0),
      ],
    },
    KmcTu2EigTs: {
      title: '95% of ChatGPT work in 20 minutes',
      try: 'Pick a real task (a study plan, meal plan or work report) and get ChatGPT to produce a first draft using a framework from the video.',
      minutes: 25,
      questions: [
        q.single('Giving ChatGPT a role, like “You are an experienced career coach”, mainly…', ['Shapes the style and focus of the answer', 'Makes it always correct', 'Unlocks paid features', 'Changes the language'], 0),
        q.tf('Asking for a specific format (a table, bullet points, a word limit) usually makes answers more useful.', true),
        q.single('Custom instructions let you…', ['Tell ChatGPT things about you and how to answer, for every chat', 'Delete your account', 'Share chats publicly', 'Speed up the internet'], 0),
      ],
    },
    '8yqcDL4TmzM': {
      title: 'Master prompting in minutes',
      try: 'Rewrite a vague prompt (“write about marketing”) into a specific one with a goal, audience, context and format. Compare the two answers.',
      minutes: 15,
      questions: [
        q.single('Which prompt will get a better answer?', ['“Write a 150-word Instagram caption for my Lagos bakery’s new chin chin, friendly tone, with 3 hashtags”', '“Write a caption”', '“Bakery”', '“Help”'], 0),
        q.multi('What makes a strong prompt?', ['A clear task', 'Context about you or the situation', 'The format you want', 'As few words as possible, always'], [0, 1, 2]),
      ],
    },
    p09yRj47kNM: {
      title: 'Google’s prompting course in 20 minutes',
      try: 'Use a few-shot prompt: give ChatGPT two examples of what you want, then ask for a third in the same style.',
      minutes: 25,
      questions: [
        q.single('Few-shot prompting means…', ['Giving examples of what you want in the prompt', 'Asking very short questions', 'Using few words', 'Asking several times'], 0),
        q.single('Breaking a big task into smaller prompts (prompt chaining) helps because…', ['Each step gets focused attention and you can check it', 'It is cheaper', 'ChatGPT can only answer one word', 'It hides the task'], 0),
        q.tf('Iterating (refining your prompt based on the answer) is a normal part of prompting.', true),
      ],
    },
    poM2n8fBcag: {
      title: 'Actually get work done with AI',
      try: 'Use ChatGPT on your make: draft it, ask ChatGPT to critique its own draft, then improve it yourself.',
      minutes: 30,
      questions: [
        q.single('Asking ChatGPT to critique its own draft is useful because…', ['It often spots gaps and weak points you can then fix', 'It makes the draft longer only', 'It is always right', 'It saves the file'], 0),
        q.tf('You are still responsible for anything you send or submit that ChatGPT helped write.', true),
      ],
    },
    cfqtFvWOfg0: {
      title: 'Why AI makes things up',
      try: 'Ask ChatGPT for three sources on a topic you know. Check whether each one really exists and says what it claims.',
      minutes: 15,
      questions: [
        q.single('A “hallucination” is when an AI…', ['Gives false information confidently', 'Refuses to answer', 'Answers slowly', 'Shows an image'], 0),
        q.single('The best defence against hallucinations is to…', ['Check important facts with reliable sources', 'Ask the same question louder', 'Trust longer answers more', 'Use more emojis'], 0),
        q.tf('Language models predict likely words; they don’t look up a guaranteed-correct answer each time.', true),
      ],
    },
    '57wFvOqzBvg': {
      title: 'Protect your privacy',
      try: 'Open ChatGPT’s data controls and decide whether your chats can be used to train models. Write your own rule for what you will never paste in.',
      minutes: 15,
      questions: [
        q.multi('Which should you never paste into ChatGPT?', ['Passwords', 'Your bank or card details', 'Other people’s private data', 'A public news article'], [0, 1, 2]),
        q.single('Turning off model training in ChatGPT’s settings means…', ['Your chats aren’t used to train future models', 'Your chats are deleted instantly', 'ChatGPT stops working', 'Nobody can ever see anything'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Get started',
      lessons: ['mqDn-h0PJnA', 'hOe0maWOhp8', 'KmcTu2EigTs'],
      checkpoint: exam('Getting started exam', [
        q.single('ChatGPT is…', ['An AI chatbot that generates text from your prompts', 'A search engine that only lists links', 'A calculator', 'A social network'], 0),
        q.single('A prompt is…', ['What you type or say to ChatGPT', 'ChatGPT’s answer', 'A setting', 'A paid plan'], 0),
        q.tf('Follow-up messages in the same chat build on the earlier conversation.', true),
        q.single('You want a shorter version of an answer. The fastest way is to…', ['Reply “Make that half as long”', 'Copy it into Word and delete words', 'Start a new account', 'Ask a different AI'], 0),
        q.multi('Which tasks is ChatGPT good at helping with?', ['Drafting emails', 'Summarising long text', 'Brainstorming ideas', 'Guaranteeing medical diagnoses'], [0, 1, 2]),
        q.single('Uploading a PDF lets you…', ['Ask questions about its contents', 'Print it', 'Sign it legally', 'Edit the original file'], 0),
        q.single('Custom instructions are useful for…', ['Telling ChatGPT your background and preferred style once, for all chats', 'Sharing chats', 'Deleting history', 'Paying'], 0),
        q.tf('ChatGPT can make mistakes, so you should check anything important.', true),
        q.single('Asking ChatGPT to answer “as a table with columns for task, deadline and owner” is an example of…', ['Specifying the format', 'Giving a role', 'A hallucination', 'Few-shot prompting'], 0),
        q.single('Starting a new chat is a good idea when…', ['You switch to an unrelated task', 'You want it to remember the last task', 'The answer is good', 'Never'], 0),
        q.single('Voice mode lets you…', ['Talk to ChatGPT and hear it reply', 'Record a song', 'Call a person', 'Translate your phone'], 0),
        q.order('Put a simple ChatGPT workflow in order.', ['Write a clear prompt', 'Read the answer', 'Ask for changes', 'Check facts', 'Use or adapt the result']),
      ]),
    },
    {
      title: 'Prompt well',
      lessons: ['8yqcDL4TmzM', 'p09yRj47kNM', 'poM2n8fBcag'],
      checkpoint: exam('Prompting exam', [
        q.multi('Which parts make a strong prompt?', ['The task', 'Context', 'Examples', 'The format you want'], [0, 1, 2, 3]),
        q.single('“You are a secondary-school maths teacher” is giving ChatGPT…', ['A role', 'An example', 'A format', 'A constraint on length'], 0),
        q.single('“Use no more than 100 words” is…', ['A constraint', 'A role', 'An example', 'A hallucination'], 0),
        q.single('Few-shot prompting is…', ['Including examples of the output you want', 'Asking only one question', 'Using short prompts', 'Asking in several chats'], 0),
        q.single('Prompt chaining means…', ['Splitting a big job into a sequence of prompts', 'Repeating one prompt', 'Linking to websites', 'Using emojis'], 0),
        q.tf('If the first answer misses the mark, refining the prompt is better than giving up.', true),
        q.single('Which is the most specific prompt?', ['“Make a 5-day study plan for WAEC biology, 2 hours a day, as a table”', '“Help me study”', '“Biology”', '“Plan”'], 0),
        q.single('Asking ChatGPT to “think step by step” can help with…', ['Problems that need reasoning, like maths or planning', 'Making answers shorter', 'Making images', 'Translating names'], 0),
        q.single('Giving ChatGPT a sample of your writing helps it…', ['Match your tone and style', 'Check spelling only', 'Find your location', 'Shorten its answer'], 0),
        q.tf('Telling ChatGPT who the audience is (for example, “for a 10-year-old”) changes how it explains things.', true),
        q.single('After getting a draft, a strong next prompt is…', ['“What’s weak or missing in this draft?”', '“Thanks”', '“Start again with no context”', '“Make it longer”, every time'], 0),
        q.order('Put a good prompting cycle in order.', ['Write a specific prompt with context', 'Review the answer', 'Refine the prompt or ask for changes', 'Check facts and finish it yourself']),
      ]),
    },
    {
      title: 'Use it safely',
      lessons: ['cfqtFvWOfg0', '57wFvOqzBvg'],
      checkpoint: exam('Safe use exam', [
        q.single('ChatGPT confidently gives you a statistic. What should you do before using it?', ['Find and check the original source', 'Use it straight away', 'Ask it to say it again', 'Add more decimal places'], 0),
        q.single('Why do language models sometimes hallucinate?', ['They generate likely-sounding text, which isn’t always true', 'They are broken', 'They copy one website', 'They want to trick you'], 0),
        q.multi('Which are good habits for using AI at work or school?', ['Check important facts', 'Follow your school or employer’s rules on AI', 'Paste customers’ private data', 'Say when work was AI-assisted if required'], [0, 1, 3]),
        q.tf('Fake references and quotes are a common kind of hallucination.', true),
        q.single('Which is safe to paste into ChatGPT?', ['A public article you want summarised', 'Your password', 'A client’s medical records', 'Your card number'], 0),
        q.single('Turning off “improve the model for everyone” (training) in settings…', ['Stops your chats being used for training', 'Deletes your account', 'Makes answers better', 'Turns off the internet'], 0),
        q.tf('Anything you type into an online AI tool could be stored by the company that runs it.', true),
        q.single('A temporary chat is useful when…', ['You don’t want the chat saved to your history', 'You want ChatGPT to remember it forever', 'You want to share it', 'You want longer answers'], 0),
        q.single('ChatGPT gives medical advice. You should…', ['Treat it as general information and see a professional for real decisions', 'Follow it exactly', 'Share it as fact', 'Ignore all doctors'], 0),
        q.multi('Which can reduce hallucinations?', ['Giving it the source text to work from', 'Asking it to say when it isn’t sure', 'Asking for more creativity', 'Checking answers yourself'], [0, 1, 3]),
        q.single('Who is responsible for work you hand in that ChatGPT helped write?', ['You', 'ChatGPT', 'OpenAI', 'Nobody'], 0),
        q.order('Put the steps for checking an AI answer in order.', ['Spot the key claims', 'Find a reliable source for each', 'Fix anything wrong', 'Use the corrected version']),
      ]),
    },
  ],
};
