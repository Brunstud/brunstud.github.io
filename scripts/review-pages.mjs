import { chromium } from '@playwright/test';
const browser = await chromium.launch();
for(const width of [1440,390,320]) {
 const page = await browser.newPage({viewport:{width,height:1000}});
 for(const route of ['/','/about','/poetry','/poetry/tong-zhou-xing','/projects/innbook','/projects/fluid-simulation','/research/organized-complexity','/projects/steins-gate']) {
  await page.goto('http://127.0.0.1:3101'+route);
  await page.locator('img').evaluateAll(images=>images.forEach(image=>image.loading='eager'));
  await page.waitForFunction(()=>Array.from(document.images).every(image=>image.complete));
  await page.screenshot({path:`qa/review-${width}-${route.replaceAll('/','_') || 'home'}.png`,fullPage:route !== '/poetry/tong-zhou-xing'});
 }
 await page.close();
}
await browser.close();
