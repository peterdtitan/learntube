import AxeBuilder from '@axe-core/playwright';
import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

// WCAG 2.2 A and AA plus axe's best practices (heading order, landmarks), in both themes.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

async function scan(page, path) {
  const found = [];
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    violations.forEach((v) => v.nodes.forEach((n) => {
      found.push(`${colorScheme} ${path} ${v.id}: ${n.target.join(' ')} ${n.failureSummary.split('\n')[1] || ''}`.trim());
    }));
  }
  return found;
}

test.describe('accessibility', () => {
  test.describe('as a visitor', () => {
    // Scanned with the cookie notice showing, as a first visit sees it.
    test.use({ cookieNotice: true });

    test('pages a visitor can open', async ({ page }) => {
      const found = [];
      for (const path of ['/', '/start', '/privacy', '/terms', '/auth/signin']) {
        found.push(...await scan(page, path));
      }
      expect(found).toEqual([]);
    });
  });

  test('pages a signed-in learner opens', async ({ page, signInAs }) => {
    test.slow(); // many pages, each in two themes
    const {
      bread, code, people, quizzes,
    } = state();
    await signInAs('ada');
    const found = [];
    for (const path of [
      '/', '/skills', '/pathways', `/pathways/${bread.id}`, lessonUrl(code.id, code.lesson), '/makes',
      '/leaderboard', '/nope', '/dashboard', '/settings', '/notifications', `/learners/${people.ada.id}`,
      '/welcome', lessonUrl(bread.id, bread.lessons[0]), `/pathways/${bread.id}/modules/${quizzes.unit}/game`,
    ]) found.push(...await scan(page, path));
    expect(found).toEqual([]);
  });

  test('admin pages', async ({ page, signInAs }) => {
    test.slow();
    const { bread, quizzes } = state();
    await signInAs('admin');
    const found = [];
    for (const path of [
      '/admin', '/admin/pathways', `/admin/pathways/${bread.id}`, '/admin/quizzes?kind=all', `/admin/quizzes/${quizzes.check}`,
      '/admin/library', '/admin/learners', '/admin/searches', '/admin/emails', '/admin/reports',
    ]) {
      found.push(...await scan(page, path));
    }
    expect(found).toEqual([]);
  });
});
