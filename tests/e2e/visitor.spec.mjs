import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test.describe('a visitor who is not signed in', () => {
  test('can browse the home page and pathways', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Skillreps/);
    await expect(page.getByRole('heading', { level: 1, name: 'Learn a skill by making something.' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    // Skill cards on the landing open the real skill, no account needed.
    await page.getByRole('link', { name: 'Knit a swatch' }).click();
    await expect(page.getByRole('link', { name: '← All skills' })).toBeVisible();

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

  test('nothing loads from YouTube, and no YouTube cookies are set, until play is pressed', async ({ page, context }) => {
    const { bread } = state();
    const youtubeRequests = [];
    page.on('request', (r) => { if (/youtube\.com|youtube-nocookie\.com|ytimg\.com/.test(new URL(r.url()).hostname)) youtubeRequests.push(r.url()); });
    await page.goto(lessonUrl(bread.id, bread.lessons[0]));
    await expect(page.getByRole('button', { name: /Play the lesson video/ })).toBeVisible();
    await page.waitForTimeout(1500);
    expect(youtubeRequests).toEqual([]);
    expect((await context.cookies()).filter((c) => c.domain.includes('youtube'))).toEqual([]);

    await page.getByRole('button', { name: /Play the lesson video/ }).click();
    await expect(page.locator('iframe[title="YouTube video player"]')).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
  });

  test('gets a real 404 for pages that do not exist', async ({ page }) => {
    const res = await page.goto('/pathways/nope');
    expect(res.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'We couldn’t find that page.' })).toBeVisible();
  });

  test('sees why a Google sign-in failed', async ({ page }) => {
    await page.goto('/auth/signin?error=AccessDenied');
    // Next's route announcer is also an alert; ours is the one in the page.
    await expect(page.getByRole('main').getByRole('alert')).toHaveText('Sign-in was cancelled. Try again when you’re ready.');
    await page.goto('/auth/signin?error=Whatever');
    await expect(page.getByRole('main').getByRole('alert')).toHaveText('Something went wrong signing in with Google. Please try again.');
  });

  test('finds robots.txt, a sitemap and share cards', async ({ page, request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Disallow: /settings');
    expect(robots).toMatch(/Sitemap: http.*\/sitemap\.xml/);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('/skills</loc>');
    expect(sitemap).toContain('/pathways/');
    expect(sitemap).not.toContain('/learners/');

    await page.goto('/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^http:\/\/localhost:\d+\/?$/);
    await page.goto('/auth/signin');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('gets security headers', async ({ request }) => {
    const res = await request.get('/');
    expect(res.headers()['x-frame-options']).toBe('DENY');
    expect(res.headers()['x-content-type-options']).toBe('nosniff');
    expect(res.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(res.headers()['x-powered-by']).toBeUndefined();
  });

  test('is sent to sign in for settings and kept out of admin', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL(/\/auth\/signin/);
    const admin = await page.goto('/admin');
    expect(admin.status()).toBe(404);
  });
});

test.describe('the cookie notice', () => {
  test.use({ cookieNotice: true });

  test('shows once, links to the policy, and stays dismissed', async ({ page }) => {
    await page.goto('/');
    const notice = page.getByRole('region', { name: 'Cookies' });
    await expect(notice).toContainText('No ads, no tracking.');
    await expect(notice.getByRole('link', { name: 'How we use them' })).toHaveAttribute('href', '/privacy#cookies');
    await notice.getByRole('button', { name: 'Got it' }).click();
    await expect(notice).toHaveCount(0);
    await page.goto('/skills');
    await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  });
});
