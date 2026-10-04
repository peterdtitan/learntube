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
  await page.getByLabel('Skill').selectOption('knitting');
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
