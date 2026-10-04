import { expect, test } from './fixtures.mjs';

test('a first-time learner answers the welcome survey and gets picks', async ({ page, signInAs }) => {
  await signInAs('nia');
  await page.goto('/');
  await expect(page).toHaveURL(/\/welcome$/);
  await expect(page.getByRole('heading', { name: 'Hey star, what are your interests?' })).toBeVisible();

  const next = page.getByRole('button', { name: /^Continue/ });
  await expect(next).toBeDisabled();
  await page.getByRole('checkbox', { name: /Knitting & Crochet/ }).click();
  await next.click();

  await expect(page.getByRole('heading', { name: 'What brings you here?' })).toBeVisible();
  await page.getByRole('radio', { name: /Something fun for me/ }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('radio', { name: /4/ }).click();
  await page.getByRole('button', { name: 'Show me where to start' }).click();

  await expect(page).toHaveURL(/\/\?welcome=1$/);
  await expect(page.getByRole('heading', { name: 'You’re all set, star.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Here’s where to start' })).toBeVisible();
  await expect(page.getByText('Because you’re into Knitting & Crochet.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();

  // Answered once: the home page no longer sends them to the survey.
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome back, Nia.' })).toBeVisible();
});

test('anyone can browse short skills and filter them', async ({ page }) => {
  await page.goto('/skills');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Learn to');
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();
  await page.getByRole('button', { name: 'Knitting & Crochet' }).click();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();
  await page.getByRole('link', { name: 'Knit a swatch' }).click();
  await expect(page.getByRole('link', { name: '← All skills' })).toBeVisible();
});
