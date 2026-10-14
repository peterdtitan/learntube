import { expect, test } from './fixtures.mjs';

test('learners get a 404 at /admin', async ({ page, signInAs }) => {
  await signInAs('bola');
  const res = await page.goto('/admin');
  expect(res.status()).toBe(404);
});

test('an admin builds a pathway that learners can then find', async ({ page, signInAs }) => {
  await signInAs('admin');
  await page.goto('/admin/pathways/new');
  await page.getByLabel('Title').fill('Knit a Beanie');
  await page.getByLabel('Skill', { exact: true }).selectOption('knitting');
  await page.getByLabel('You\'ll make').fill('A ribbed beanie');
  await page.getByRole('button', { name: 'Create pathway' }).click();
  await expect(page).toHaveURL(/\/admin\/pathways\/[a-z0-9]+$/);

  await page.getByLabel('New module').fill('Casting on');
  await page.getByRole('button', { name: 'Add module' }).click();
  await page.getByRole('link', { name: '+ Add a lesson' }).click();

  // Typing the link fires a YouTube lookup on blur; it may fail offline, which is fine.
  await page.getByLabel('YouTube link').fill('https://youtu.be/dQw4w9WgXcQ');
  await page.getByLabel('Lesson title').fill('Long-tail cast on');
  await page.getByLabel('Length').fill('6:05');
  await page.getByLabel('Try it yourself').fill('Cast on 40 stitches');
  await page.getByRole('button', { name: 'Add lesson' }).click();
  await expect(page).toHaveURL(/\/admin\/pathways\/[a-z0-9]+$/);
  await expect(page.getByRole('link', { name: 'Long-tail cast on' })).toBeVisible();

  // Any lesson's thumbnail can be the cover.
  await page.getByLabel('Use a lesson\'s thumbnail').selectOption('dQw4w9WgXcQ');
  await expect(page.getByAltText('Cover preview')).toHaveAttribute('src', /dQw4w9WgXcQ/);
  await page.getByRole('button', { name: 'Save details' }).click();
  await expect(page.getByText('Saved.')).toBeVisible();

  await signInAs('bola');
  await page.goto('/pathways?q=beanie');
  await expect(page.getByRole('heading', { name: 'Knit a Beanie' })).toBeVisible();
});

test('an admin finds module exams in one list and publishes or unpublishes them', async ({ page, signInAs }) => {
  await signInAs('admin');
  await page.goto('/admin');
  await expect(page.getByRole('heading', { level: 1, name: 'Overview' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Needs attention' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Admin' }).getByRole('link', { name: 'Exams & quizzes' }).click();

  await expect(page).toHaveURL(/\/admin\/quizzes$/);
  const exam = page.getByRole('listitem').filter({ hasText: 'Starter exam' });
  await expect(exam).toContainText('Module exam');
  await expect(exam).toContainText('Live');
  await exam.getByRole('button', { name: /^Unpublish/ }).click();
  await expect(exam).toContainText('Draft');

  // Drafts are one click from the filter, and can be published together.
  await page.getByRole('navigation', { name: 'Status' }).getByRole('link', { name: 'Drafts' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Starter exam' })).toBeVisible();
  await page.getByRole('button', { name: /^Publish \d+ ready drafts?$/ }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Starter exam' })).toHaveCount(0);
  await page.goto('/admin/quizzes');
  await expect(page.getByRole('listitem').filter({ hasText: 'Starter exam' })).toContainText('Live');
});

test('an admin sees the library, learners and emails', async ({ page, signInAs }) => {
  await signInAs('admin');
  await page.goto('/admin/library');
  await expect(page.getByRole('heading', { name: 'Module exams' })).toBeVisible();
  await expect(page.getByRole('status').first()).toHaveText(/Up to date|Ready to add/);

  await page.goto('/admin/learners?q=bola');
  await expect(page.getByRole('cell', { name: /Bola/ })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('1 learner matching “bola”');

  await page.goto('/admin/emails');
  await expect(page.getByText('Off.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Send me a test email' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'RESEND_API_KEY' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Email' }).getByRole('link', { name: 'Log your make' }).click();
  await expect(page.getByText(/^You tried “Your first purl stitch”/)).toBeVisible();
  await page.getByRole('link', { name: 'Work it out' }).click();
  await expect(page.getByRole('status').filter({ hasText: /active learners would get one/ })).toBeVisible();
});
