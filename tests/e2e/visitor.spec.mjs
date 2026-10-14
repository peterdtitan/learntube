import {
  expect, lessonUrl, state, test,
} from './fixtures.mjs';

test.describe('a visitor who is not signed in', () => {
  test('sees the landing page with two ways in', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Skillreps/);
    await expect(page.getByRole('heading', { level: 1, name: 'Learn a skill by making something.' })).toBeVisible();
    const header = page.getByRole('banner');
    await expect(header.getByRole('button', { name: 'Sign in' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Start learning' })).toHaveAttribute('href', '/start');
    // No links into the app: they'd only lead to sign-in.
    await expect(header.getByRole('link', { name: 'Pathways' })).toHaveCount(0);
  });

  test('is asked to sign in for everything past the landing page, and comes back after', async ({ page, request }) => {
    const { bread } = state();
    for (const path of ['/skills', '/pathways', lessonUrl(bread.id, bread.lessons[0]), '/makes', '/leaderboard', '/settings', '/admin']) {
      await page.goto(path);
      await expect(page, path).toHaveURL(/\/auth\/signin\?callbackUrl=/);
      expect(new URL(page.url()).searchParams.get('callbackUrl'), path).toBe(path);
    }
    // A skill card on the landing leads to sign-in too, then to that skill.
    await page.goto('/');
    await page.getByRole('link', { name: 'Knit a swatch' }).click();
    await expect(page).toHaveURL(/\/auth\/signin\?callbackUrl=%2Fpathways%2F/);

    const api = await request.get('/api/pathways');
    expect(api.status()).toBe(401);
    expect(await api.json()).toEqual({ error: 'Sign in to use Skillreps.' });
  });

  test('can still read the privacy policy and terms', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy');
    await page.goto('/terms');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Terms');
  });

  test('sees why a Google sign-in failed', async ({ page }) => {
    await page.goto('/auth/signin?error=AccessDenied');
    // Next's route announcer is also an alert; ours is the one in the page.
    await expect(page.getByRole('main').getByRole('alert')).toHaveText('Sign-in was cancelled. Try again when you’re ready.');
    await page.goto('/auth/signin?error=Whatever');
    await expect(page.getByRole('main').getByRole('alert')).toHaveText('Something went wrong signing in with Google. Please try again.');
    await page.getByRole('link', { name: 'Find your first skill' }).click();
    await expect(page).toHaveURL(/\/start$/);
  });

  test('finds robots.txt, a sitemap of the public pages and share cards', async ({ page, request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Disallow: /settings');
    expect(robots).toContain('Disallow: /pathways');
    expect(robots).toMatch(/Sitemap: http.*\/sitemap\.xml/);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('/start</loc>');
    expect(sitemap).not.toContain('/pathways');

    await page.goto('/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
    expect((await request.get('/opengraph-image.png')).status()).toBe(200);
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
});

test.describe('a signed-in learner', () => {
  test.beforeEach(async ({ signInAs }) => signInAs('bola'));

  test('can browse pathways, search them and filter by skill', async ({ page }) => {
    await page.goto('/pathways');
    await expect(page.getByRole('heading', { name: 'Bake Your First Loaf' })).toBeVisible();
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

  test('loads nothing from YouTube, and gets no YouTube cookies, until play is pressed', async ({ page, context }) => {
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

  test('is kept out of admin', async ({ page }) => {
    expect((await page.goto('/admin')).status()).toBe(404);
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
    await page.goto('/terms');
    await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  });
});
