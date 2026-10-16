import { expect, state, test } from './fixtures.mjs';

test('kudos, comments and follows reach the maker as notifications', async ({ page, signInAs }) => {
  const { people } = state();

  await signInAs('ada');
  const res = await page.request.post('/api/makes', { data: { title: 'Plaited loaf' } });
  expect(res.status()).toBe(201);
  const { make } = await res.json();

  await signInAs('bola');
  await page.goto(`/makes/${make.id}`);
  // Both buttons change before the request finishes; leaving the page too soon can cancel it.
  const saved = (path) => page.waitForResponse(
    (r) => r.url().endsWith(path) && r.request().method() === 'POST',
  );
  await Promise.all([saved('/kudos'), page.getByRole('button', { name: 'Give kudos' }).click()]);
  await expect(page.getByRole('button', { name: 'Remove kudos' })).toBeVisible();
  const preset = page.getByRole('button', { name: 'Love the colours', exact: true });
  await Promise.all([saved('/comments'), preset.click()]);
  await expect(preset).toBeDisabled();
  await page.goto(`/learners/${people.ada.id}`);
  await page.getByRole('button', { name: 'Follow' }).click();
  await expect(page.getByRole('button', { name: /Following/ })).toBeVisible();

  await signInAs('ada');
  await page.goto('/');
  const bell = page.getByRole('link', { name: /^Notifications/ });
  await expect(bell).toHaveAccessibleName('Notifications, 3 new');
  await bell.click();
  await expect(page.getByText('gave kudos to “Plaited loaf”')).toBeVisible();
  await expect(page.getByText('said “Love the colours” on “Plaited loaf”')).toBeVisible();
  await expect(page.getByText('started following you')).toBeVisible();
  await expect(page.getByRole('main').getByText('Bola A.').first()).toBeVisible();

  await page.goto('/makes');
  await expect(page.getByRole('link', { name: /^Notifications/ })).toHaveAccessibleName('Notifications');
});

test('kudos works before the page has finished checking who you are', async ({ page, signInAs }) => {
  await signInAs('ada');
  const res = await page.request.post('/api/makes', { data: { title: 'Quick tap' } });
  const { make } = await res.json();

  // A slow phone: the session check is still out when the learner taps.
  await signInAs('bola');
  await page.route('**/api/auth/session', async (route) => {
    await new Promise((resolve) => { setTimeout(resolve, 1500); });
    await route.continue();
  });
  await page.goto(`/makes/${make.id}`);
  const kudos = page.waitForResponse((r) => r.url().endsWith('/kudos') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Give kudos' }).click();
  expect((await kudos).status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`/makes/${make.id}$`));
  await expect(page.getByRole('button', { name: 'Remove kudos' })).toBeVisible();
});
