import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test.describe('on a phone', () => {
  test('the lesson page fits the screen and the player is there', async ({ page, signInAs }) => {
    await signInAs('bola');
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[2]));
    await expect(page.getByRole('heading', { level: 1, name: 'Shaping a boule' })).toBeVisible();
    await expect(page.locator('iframe[title="YouTube video player"], [data-testid="player"], #player').first()).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('the menu opens and links work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pathways' }).last().click();
    await expect(page).toHaveURL(/\/pathways$/);
  });

  test('pathways and makes fit the screen', async ({ page }) => {
    for (const path of ['/', '/pathways', '/makes', '/leaderboard']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
