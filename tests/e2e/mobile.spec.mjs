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

  test('a module exam doesn’t count focus changes or scrolling as leaving', async ({ page, signInAs }) => {
    await signInAs('ada');
    const { bread, quizzes } = state();
    await page.goto(`/pathways/${bread.id}/checkpoint/${quizzes.checkpoint}`);
    await expect(page.getByText('Switching to another app or tab costs')).toBeVisible();
    await page.getByRole('button', { name: 'Start the exam' }).click();
    await expect(page.getByLabel('Time left')).toBeVisible();
    // No fullscreen on phones, and pull-to-refresh is off while the clock runs.
    expect(await page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    expect(await page.evaluate(() => document.documentElement.style.overscrollBehaviorY)).toBe('none');

    // The notification shade or address bar can take focus without hiding the page.
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await page.waitForTimeout(2500);
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await page.mouse.wheel(0, -800);
    await expect(page.getByRole('alertdialog', { name: 'You left the exam' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await page.getByRole('button', { name: 'Submit anyway' }).click();
    await expect(page.getByRole('heading', { name: 'Score deductions' })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.style.overscrollBehaviorY)).toBe('');
  });
});
