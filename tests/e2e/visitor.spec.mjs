import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test.describe('a visitor who is not signed in', () => {
  test('can browse the home page and pathways', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LearnTube/);
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

    await page.goto('/pathways');
    await expect(page.getByRole('heading', { name: 'Bake Your First Loaf' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your First Web Page' })).toBeVisible();
  });

  test('can search pathways and filter by skill', async ({ page }) => {
    await page.goto('/pathways');
    await page.getByRole('searchbox', { name: 'Search pathways' }).fill('autolyse');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveURL(/q=autolyse/);
    await expect(page.getByRole('status')).toHaveText(/1 pathway matching “autolyse”/);
    await expect(page.getByRole('heading', { name: 'Your First Web Page' })).toHaveCount(0);

    await page.goto('/pathways');
    await page.getByRole('navigation', { name: 'Filter by skill' }).getByRole('link', { name: 'Software Engineering' }).click();
    await expect(page.getByRole('heading', { name: 'Bake Your First Loaf' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Your First Web Page' })).toBeVisible();
  });

  test('can watch a lesson and is asked to sign in to save', async ({ page }) => {
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[0]));
    await expect(page.getByRole('heading', { level: 1, name: 'Feeding a starter' })).toBeVisible();
    await expect(page.getByText('Sign in to save your place')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in to track practice' })).toBeVisible();
  });

  test('gets a real 404 for pages that do not exist', async ({ page }) => {
    const res = await page.goto('/pathways/nope');
    expect(res.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'We couldn’t find that page.' })).toBeVisible();
  });

  test('is sent to sign in for settings and kept out of admin', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL(/\/auth\/signin/);
    const admin = await page.goto('/admin');
    expect(admin.status()).toBe(404);
  });
});
