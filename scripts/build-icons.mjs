import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
const source = await fs.readFile('public/brand/01-current-sh.svg','utf8');
const content = source.slice(source.indexOf('<g'),source.lastIndexOf('</svg>')).replace('#285946','var(--mark)');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><style>:root{--mark:#285946;--paper:#fcfbf8}@media(prefers-color-scheme:dark){:root{--mark:#e0eae2;--paper:#24332b}}</style><rect width="32" height="32" rx="5" fill="var(--paper)"/>${content}</svg>`;
await fs.writeFile('src/app/icon.svg',svg);
const raster = svg.replace(/<style>.*?<\/style>/,'').replaceAll('var(--mark)','#285946').replaceAll('var(--paper)','#fcfbf8');
const browser = await chromium.launch();
for (const size of [16,32,180]) {
  const page = await browser.newPage({viewport:{width:size,height:size},deviceScaleFactor:1});
  await page.setContent(`<style>body{margin:0}svg{width:${size}px;height:${size}px}</style>${raster}`);
  await page.screenshot({path:size===180?'src/app/apple-icon.png':`public/brand/favicon-${size}.png`});
  await page.close();
}
await browser.close();
console.log('Built light/dark SVG favicon, 16/32px PNGs and 180px Apple icon.');
