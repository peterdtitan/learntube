import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

// Every game question here is true/false: lesson one's check plus the game's own.
async function answerRight(page) {
  const prompt = await page.locator('p.text-\\[19px\\]').innerText();
  await page.getByLabel(/freezer/.test(prompt) ? 'False' : 'True', { exact: true }).check();
  await page.getByRole('button', { name: 'Check' }).click();
  await expect(page.getByText('Right! Another block.')).toBeVisible();
}

// Where the scene's pixels are inside the tower's frame, as fractions of its width and
// height. The frame's gradient only changes top to bottom, so a pixel that differs from
// the start of its row is part of the scene.
async function sceneBounds(page) {
  const shot = await page.getByRole('img', { name: /^Your tower is/ }).screenshot({ scale: 'css' });
  return page.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const ctx = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height })
      .getContext('2d');
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);
    const edge = 16; // clear of the rounded corners
    const box = {
      left: width, right: 0, top: height, bottom: 0,
    };
    for (let y = edge; y < height - edge; y += 1) {
      const bg = (y * width + edge) * 4;
      for (let x = edge; x < width - edge; x += 1) {
        const p = (y * width + x) * 4;
        const diff = [0, 1, 2].reduce((sum, c) => sum + Math.abs(data[p + c] - data[bg + c]), 0);
        if (diff > 30) {
          box.left = Math.min(box.left, x);
          box.right = Math.max(box.right, x + 1);
          box.top = Math.min(box.top, y);
          box.bottom = Math.max(box.bottom, y + 1);
        }
      }
    }
    return {
      left: box.left / width, right: box.right / width, top: box.top / height, bottom: box.bottom / height,
    };
  }, `data:image/png;base64,${shot.toString('base64')}`);
}

test.describe('quizzes and games', () => {
  test.beforeEach(async ({ signInAs }) => signInAs('bola'));

  test('the pathway page shows time to learn, modules, the checkpoint and the games', async ({ page }) => {
    const { bread } = state();
    await page.goto(`/pathways/${bread.id}`);
    await expect(page.getByRole('heading', { level: 1, name: 'Bake Your First Loaf' })).toBeVisible();
    await expect(page.getByText(/^≈ \d/).first()).toBeVisible();
    await expect(page.getByText(/^That’s about \d+ /)).toBeVisible();
    await expect(page.getByText('Week 1')).toBeVisible();
    await expect(page.getByRole('link', { name: /Starter checkpoint/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Module games/ })).toBeVisible();
  });

  test('a quick check after a lesson grades and pays XP', async ({ page }) => {
    const { bread } = state();
    await page.goto(lessonUrl(bread.id, bread.lessons[0]));
    const check = page.getByRole('region', { name: 'Quick check' });
    await check.getByRole('button', { name: 'Start' }).click();
    await check.getByRole('group').nth(0).getByLabel('True').check();
    await check.getByRole('group').nth(1).getByLabel('False').check();
    await check.getByRole('button', { name: 'Check my answers' }).click();
    await expect(check.getByText('100%')).toBeVisible();
    // The header shows what it's worth; the results show what was earned.
    await expect(check.getByText('+15 XP').last()).toBeVisible();
  });

  test('the checkpoint tracks leaving and copying, then reports the deductions', async ({ page }) => {
    const { bread, quizzes } = state();
    await page.goto(`/pathways/${bread.id}/checkpoint/${quizzes.checkpoint}`);
    await expect(page.getByRole('heading', { name: 'Before you start' })).toBeVisible();
    await page.getByRole('button', { name: 'Start the checkpoint' }).click();
    await expect(page.getByLabel('Time left')).toHaveText(/^[45]:\d\d$/);

    await page.getByLabel('True').check();
    await page.getByLabel('Resting flour and water').check();

    // Copy the question text.
    await page.getByText('2. What does autolyse mean?').selectText();
    await page.keyboard.press('Control+C');

    // Leave for a couple of seconds. Playwright keeps every tab "visible", so send the
    // same signal a browser sends when you switch tabs or apps.
    const setVisibility = (state) => page.evaluate((s) => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => s });
      document.dispatchEvent(new Event('visibilitychange'));
    }, state);
    await setVisibility('hidden');
    await page.waitForTimeout(2500);
    await setVisibility('visible');
    const warning = page.getByRole('alertdialog', { name: 'You left the quiz' });
    await expect(warning).toBeVisible();
    await expect(warning).toContainText(/away for [2-9] seconds/);
    await warning.getByRole('button', { name: 'Back to the quiz' }).click();

    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Score deductions' })).toBeVisible();
    await expect(page.getByText('Leaving the quiz × 1')).toBeVisible();
    await expect(page.getByText('Copying × 1')).toBeVisible();
    await page.getByText('What was copied or pasted (1)').click();
    await expect(page.getByText('What does autolyse mean?', { exact: false }).last()).toBeVisible();
    // Both answers were right, so only the deductions came off.
    await expect(page.getByText(/You answered 100% correctly; \d+ points came off/)).toBeVisible();
  });

  test('the 3D tower game stacks a block for each right answer', async ({ page }) => {
    const { bread, quizzes } = state();
    await page.goto(`/pathways/${bread.id}/modules/${quizzes.unit}/game`);
    await page.getByRole('button', { name: /^Tower/ }).click();
    await expect(page.locator('canvas')).toBeVisible();

    for (let i = 0; i < 3; i += 1) {
      await answerRight(page);
      await page.getByRole('button', { name: /Next|See how you did/ }).click();
    }
    await expect(page.getByText('Your tower is 3 blocks tall.')).toBeVisible();
    await expect(page.getByText('+30 XP')).toBeVisible();
  });

  test('extra time can be switched on in settings', async ({ page }) => {
    await page.goto('/settings');
    const box = page.getByLabel('Extra time on timed quizzes (1.5×)');
    await box.check();
    await page.reload();
    await expect(page.getByLabel('Extra time on timed quizzes (1.5×)')).toBeChecked();
    await page.getByLabel('Extra time on timed quizzes (1.5×)').uncheck();
  });
});

// three.js draws at up to twice the CSS size on dense screens. The canvas must still be
// laid out at its frame's size, or learners see only its top-left quarter.
[1, 2, 3].forEach((deviceScaleFactor) => {
  test.describe(`the tower at ${deviceScaleFactor}× pixel density`, () => {
    test.use({ deviceScaleFactor });
    test.beforeEach(async ({ signInAs }) => signInAs('bola'));

    test('fills its frame, with the tower centred and in view', async ({ page }) => {
      const { bread, quizzes } = state();
      await page.goto(`/pathways/${bread.id}/modules/${quizzes.unit}/game`);
      await page.getByRole('button', { name: /^Tower/ }).click();
      await answerRight(page);
      await page.getByRole('button', { name: 'Next' }).click();
      await answerRight(page);
      await page.getByRole('button', { name: 'Next' }).click();
      await answerRight(page);

      const size = await page.locator('canvas').evaluate((canvas) => {
        const box = canvas.getBoundingClientRect();
        const frame = canvas.parentElement.getBoundingClientRect();
        return {
          width: box.width, height: box.height, frame, density: canvas.width / box.width,
        };
      });
      expect(size.width).toBeCloseTo(size.frame.width, 0);
      expect(size.height).toBeCloseTo(size.frame.height, 0);
      expect(size.density).toBeCloseTo(Math.min(deviceScaleFactor, 2), 1);

      // Retried until the blocks have landed and the camera has settled.
      await expect(async () => {
        const box = await sceneBounds(page);
        expect(Math.abs((box.left + box.right) / 2 - 0.5)).toBeLessThan(0.05);
        expect(box.left).toBeGreaterThan(0.05);
        expect(box.right).toBeLessThan(0.95);
        expect(box.top).toBeGreaterThan(0.05);
        expect(box.bottom).toBeLessThan(0.95);
      }).toPass({ timeout: 10000 });
    });
  });
});

test('an admin adds a quick check with a question and publishes it', async ({ page, signInAs }) => {
  await signInAs('admin');
  const { code } = state();
  await page.goto(`/admin/pathways/${code.id}`);
  await page.getByRole('button', { name: 'Quick check (add)' }).click();
  await expect(page.getByRole('heading', { name: 'Lesson quick check' })).toBeVisible();

  const add = page.locator('div').filter({ has: page.getByRole('heading', { name: 'Add a question' }) }).last();
  await add.getByLabel('Type').selectOption('ORDER');
  await add.getByLabel('Question').fill('Put the parts of a page in order');
  await add.getByRole('textbox', { name: 'Step 1' }).fill('<html>');
  await add.getByRole('textbox', { name: 'Step 2' }).fill('<head>');
  await add.getByRole('textbox', { name: 'Step 3' }).fill('<body>');
  await add.getByRole('button', { name: 'Add question' }).click();
  await expect(page.getByText('Question added.')).toBeVisible();
  await expect(page.getByText('Answer: <html> → <head> → <body>')).toBeVisible();

  await page.getByLabel('Published (learners can see it)').check();
  await page.getByRole('button', { name: 'Save settings' }).click();
  await expect(page.getByText('Saved. Learners can see it.')).toBeVisible();

  await signInAs('bola');
  await page.goto(`/pathways/${code.id}/learn/${code.lesson}`);
  await expect(page.getByRole('heading', { name: 'Quick check' })).toBeVisible();
});
