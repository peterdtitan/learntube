import { expect, state, test } from './fixtures.mjs';

test('kudos, comments and follows reach the maker as notifications', async ({ page, signInAs }) => {
  const { people } = state();

  await signInAs('ada');
  const res = await page.request.post('/api/makes', { data: { title: 'Plaited loaf' } });
  expect(res.status()).toBe(201);
  const { make } = await res.json();

  await signInAs('bola');
  await page.goto(`/makes/${make.id}`);
  await page.getByRole('button', { name: 'Give kudos' }).click();
  await expect(page.getByRole('button', { name: 'Remove kudos' })).toBeVisible();
  await page.getByRole('button', { name: 'Love the colours' }).click();
  await expect(page.getByRole('button', { name: 'Love the colours' })).toBeDisabled();
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
