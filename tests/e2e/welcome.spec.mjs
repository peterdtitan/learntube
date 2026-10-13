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

test('interests ticked on the landing page carry through sign-in into the survey', async ({
  page, context, signInAs, baseURL,
}) => {
  // Google itself is out of reach in tests; a stand-in page marks the hand-off.
  await context.route(/accounts\.google\.com/, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Google</h1>' }));
  await page.goto('/');
  const picker = page.getByRole('group', { name: 'What would you like to learn?' });
  await picker.getByRole('checkbox', { name: 'Knitting & Crochet' }).click();
  await page.getByRole('button', { name: 'Start with 1 picked' }).click();
  await page.waitForURL(/accounts\.google\.com/);
  expect((await context.cookies()).find((c) => c.name === 'skillreps_picks')?.value).toBe('knitting');

  await signInAs('tobi');
  await context.addCookies([{ name: 'skillreps_picks', value: 'knitting', url: baseURL }]);
  await page.goto('/');
  await expect(page).toHaveURL(/\/welcome$/);
  // Interests are already answered, so the survey opens on the next question.
  await expect(page.getByRole('heading', { name: 'What brings you here?' })).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('checkbox', { name: /Knitting & Crochet/ })).toBeChecked();
  await page.getByRole('button', { name: /^Continue/ }).click();
  await page.getByRole('radio', { name: /Something fun for me/ }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Show me where to start' }).click();
  await expect(page.getByText('Because you’re into Knitting & Crochet.')).toBeVisible();
  expect((await context.cookies()).some((c) => c.name === 'skillreps_picks')).toBe(false);
});
