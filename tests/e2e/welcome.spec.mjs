import { expect, test } from './fixtures.mjs';

test('a first-time learner answers the welcome survey and starts the skill it recommends', async ({ page, signInAs }) => {
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

  await expect(page.getByRole('heading', { name: 'Here’s where to start' })).toBeVisible();
  const options = page.getByRole('radiogroup', { name: 'Where to start' });
  await expect(options.getByRole('radio').first()).toContainText('Knit a swatch');
  await expect(options.getByRole('radio').first()).toHaveAttribute('aria-checked', 'true');
  await expect(options.getByRole('radio').first()).toContainText(/at 4 days a week/);
  await page.getByRole('button', { name: 'Start Knit a swatch' }).click();

  await expect(page).toHaveURL(/\/pathways\/[^/]+$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Knit a swatch' })).toBeVisible();

  // Answered once: the home page no longer sends them to the survey.
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome back, Nia.' })).toBeVisible();
});

test('a visitor answers three questions, gets a recommendation, then signs up to start it', async ({
  page, context, signInAs, baseURL,
}) => {
  // Google is out of reach in tests: NextAuth's hand-off answers with a stand-in Google page,
  // so nothing here needs the network. The callback it was asked for is what's checked.
  let callbackUrl = null;
  await context.route('**/api/auth/signin/google', (route) => {
    callbackUrl = new URLSearchParams(route.request().postData()).get('callbackUrl');
    route.fulfill({ json: { url: 'https://accounts.google.com/o/oauth2/v2/auth' } });
  });
  await context.route(/accounts\.google\.com/, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Google</h1>' }));
  await page.goto('/');
  const picker = page.getByRole('group', { name: 'What would you like to learn?' });
  await picker.getByRole('checkbox', { name: 'Knitting & Crochet' }).click();
  await page.getByRole('link', { name: 'Continue with 1 picked' }).click();

  // Interests are already answered, so the questions open on the next one.
  await expect(page).toHaveURL(/\/start\?picks=knitting$/);
  await expect(page.getByRole('heading', { name: 'What brings you here?' })).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('checkbox', { name: /Knitting & Crochet/ })).toBeChecked();
  await page.getByRole('button', { name: /^Continue/ }).click();
  await page.getByRole('radio', { name: /Make things for people I love/ }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Show me where to start' }).click();

  await expect(page.getByRole('heading', { name: 'Here’s where to start' })).toBeVisible();
  await expect(page.getByRole('radiogroup', { name: 'Where to start' }).getByRole('radio').first()).toContainText('Knit a swatch');
  await page.getByRole('button', { name: 'Sign up with Google to start' }).click();
  await page.waitForURL(/accounts\.google\.com/);
  expect(callbackUrl).toMatch(/\/welcome\/done$/);
  const saved = (await context.cookies()).find((c) => c.name === 'skillreps_start');
  expect(JSON.parse(decodeURIComponent(saved.value))).toMatchObject({
    i: ['knitting'], g: 'GIFTS', d: 3, p: { k: 'skill' },
  });

  // Back from Google as a brand-new account: the answers are saved and the skill opens.
  await signInAs('tobi');
  await context.addCookies([{ name: 'skillreps_start', value: saved.value, url: baseURL }]);
  await page.goto('/welcome/done');
  await expect(page).toHaveURL(/\/pathways\/[^/]+$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Knit a swatch' })).toBeVisible();
  expect((await context.cookies()).some((c) => c.name === 'skillreps_start')).toBe(false);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome back, Tobi.' })).toBeVisible();
});

test('signed-in learners can browse short skills and filter them', async ({ page, signInAs }) => {
  await signInAs('bola');
  await page.goto('/skills');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Learn to');
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();
  await page.getByRole('button', { name: 'Knitting & Crochet' }).click();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();
  await page.getByRole('link', { name: 'Knit a swatch' }).click();
  await expect(page.getByRole('link', { name: '← All skills' })).toBeVisible();
});

test('the skills search finds a skill, and says when we don’t have something', async ({ page, signInAs }) => {
  await signInAs('bola');
  await page.goto('/skills');
  const search = page.getByRole('searchbox', { name: 'Search skills and programs' });
  await search.fill('knitting');
  await expect(page.getByText('1 match for “knitting”')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();

  await search.fill('java');
  await expect(page.locator('strong', { hasText: 'We don’t have “java” yet.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeHidden();
  await expect(page).toHaveURL(/\/skills\?q=java$/);

  await page.reload();
  await expect(search).toHaveValue('java');
  await page.getByRole('button', { name: 'Clear search' }).first().click();
  await expect(page.getByRole('link', { name: 'Knit a swatch' })).toBeVisible();
  await expect(page).toHaveURL(/\/skills$/);
});

test('admins see what learners searched for and didn’t find', async ({ page, signInAs }) => {
  await signInAs('bola');
  await page.goto('/skills');
  const logged = page.waitForResponse((r) => r.url().endsWith('/api/search-log'));
  await page.getByRole('searchbox', { name: 'Search skills and programs' }).fill('xylophone');
  expect((await logged).status()).toBe(204);

  await signInAs('admin');
  await page.goto('/admin/searches?days=7');
  const wanted = page.getByRole('table', { name: 'Searches for things we don’t teach yet' });
  await expect(wanted.getByRole('cell', { name: 'xylophone' })).toBeVisible();
  await expect(wanted.getByRole('cell', { name: 'Nothing close' })).toBeVisible();
});
