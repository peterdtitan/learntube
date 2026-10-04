import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test.describe.serial('a learner working through a lesson', () => {
  test.beforeEach(async ({ signInAs }) => signInAs('ada'));

  test('earns XP for trying the step', async ({ page }) => {
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[0]));
    await page.getByRole('button', { name: 'I tried it' }).click();
    await expect(page.getByText('+25 XP')).toBeVisible();
    await expect(page.getByText('Done. That counts as a practice day this week.')).toBeVisible();
    await expect(page.getByRole('banner').getByText('25 XP')).toBeVisible();
  });

  test('logs what they made and finds it on Makes', async ({ page }) => {
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[0]));
    await page.getByLabel('What did you make?').fill('My first bubbly starter');
    await page.getByRole('button', { name: 'Log it' }).click();
    await expect(page.getByText('+40 XP')).toBeVisible();
    await expect(page.getByRole('banner').getByText('65 XP')).toBeVisible();

    await page.goto('/makes');
    await expect(page.getByText('My first bubbly starter')).toBeVisible();
  });

  test('keeps notes between visits', async ({ page }) => {
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[1]));
    const notes = page.getByLabel('Notes for this lesson');
    await notes.fill('Use 75% hydration');
    await expect(page.getByText(/^Saved/)).toBeVisible();
    await page.reload();
    await expect(page.getByLabel('Notes for this lesson')).toHaveValue('Use 75% hydration');
  });

  test('picks a display name that others see', async ({ page }) => {
    await page.goto('/settings');
    await page.getByLabel('Display name').fill('Ada the Baker');
    await page.getByRole('button', { name: 'Save', exact: true }).first().click();
    await expect(page.getByRole('status').filter({ hasText: 'Saved.' })).toBeVisible();

    await page.goto('/leaderboard');
    await expect(page.getByText('Ada the Baker (you)')).toBeVisible();
  });
});
