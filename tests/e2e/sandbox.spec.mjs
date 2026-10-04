import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test('the code sandbox runs code and shows console output', async ({ page, signInAs }) => {
  await signInAs('ada');
  const { code } = state();
  await page.goto(lessonUrl(code.id, code.lesson));
  await page.getByRole('tab', { name: 'Code sandbox' }).click();

  const consoleBox = page.locator('pre[aria-live]');
  await expect(consoleBox).toContainText('Scripts run too');

  const editor = page.getByLabel('Code');
  await editor.fill('<h2 id="out">Hi</h2><script>console.log("sum", 2 + 3); document.cookie;</script>');
  await editor.press('Control+Enter');
  await expect(consoleBox).toContainText('sum 5');
  // Learner code runs in an opaque origin, so LearnTube's cookies are out of reach.
  await expect(consoleBox).toContainText('SecurityError');
  await expect(page.frameLocator('iframe[title="Code preview"]').locator('#out')).toHaveText('Hi');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(editor).toHaveValue(/Edit this, then press Run/);
});
