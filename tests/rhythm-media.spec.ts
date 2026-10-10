import { test, expect } from '@playwright/test';
import { getDailyRhythm } from '../src/lib/daily-rhythm';
import AxeBuilder from '@axe-core/playwright';

test('Central time boundaries, midnight and daylight saving transitions', () => {
  for (const offset of ['-06:00','-05:00']) {
    const day = offset === '-06:00' ? '2026-01-15' : '2026-07-15';
    for (const [time,phase] of [['04:29:59','night'],['04:30:00','morning'],['08:29:59','morning'],['08:30:00','daytime'],['16:29:59','daytime'],['16:30:00','evening'],['22:29:59','evening'],['22:30:00','night'],['00:00:00','night']]) {
      expect(getDailyRhythm(new Date(`${day}T${time}${offset}`)).phase.id).toBe(phase);
    }
  }
  expect(getDailyRhythm(new Date('2026-03-08T08:00:00Z')).time).toBe('03:00');
  expect(getDailyRhythm(new Date('2026-11-01T07:00:00Z')).time).toBe('01:00');
});

test('rhythm updates while open, keyboard and touch controls, homepage only', async ({page}) => {
  await page.clock.install({ time: new Date('2026-07-15T13:29:59Z') });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Typical daily rhythm/ });
  await expect(trigger).toContainText('Morning');
  await trigger.focus(); await page.keyboard.press('Enter');
  const panel = page.getByRole('region', {name:'My Daily Rhythm'});
  await expect(panel).toBeVisible();
  await page.clock.runFor(1100);
  await expect(trigger).toContainText('Daytime');
  await expect(panel.locator('[aria-current]')).toContainText('Daytime');
  await expect(panel.locator('time')).toHaveText('08:30');
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape'); await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await page.setViewportSize({width:320,height:900});
  await trigger.click(); await expect(panel).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.mouse.click(5, 500);
  await expect(panel).toBeHidden();
  await trigger.hover(); await expect(panel).toBeVisible();
  await page.mouse.move(5,500); await expect(panel).toBeHidden();
  await page.goto('/about'); await expect(trigger).toHaveCount(0);
});

test('manual galleries preserve dragon boat order and all media resolves', async ({page,request}) => {
  await page.goto('/about');
  const gallery = page.getByRole('region',{name:'Dragon boat',exact:true});
  for (let i=1;i<=9;i++) {
    await expect(gallery.locator('img')).toHaveAttribute('src',`/media/dragon-${i}.webp`);
    await gallery.getByRole('button',{name:'Next image in Dragon boat'}).click();
  }
  await gallery.focus(); await page.keyboard.press('End');
  await expect(gallery.locator('img')).toHaveAttribute('src','/media/dragon-9.webp');
  await page.keyboard.press('Home');
  await expect(gallery.locator('img')).toHaveAttribute('src','/media/dragon-1.webp');
  for (const route of ['/','/about','/poetry','/research/organized-complexity','/projects/innbook','/projects/fluid-simulation','/projects/steins-gate']) {
    await page.goto(route);
    for (const src of await page.locator('img').evaluateAll(images => images.map(i=>i.getAttribute('src')!))) expect((await request.get(src)).status(),src).toBe(200);
  }
  for(const src of ['/icon.svg','/apple-icon.png','/brand/favicon-16.png','/brand/favicon-32.png','/sitemap.xml','/robots.txt']) expect((await request.get(src)).status(),src).toBe(200);
  await page.goto('/');
  await expect(page.locator('#projects .work-row').last()).toContainText('Worldline Knot');
});
