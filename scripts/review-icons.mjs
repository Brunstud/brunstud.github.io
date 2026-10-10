import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 570 } });
let html = '<style>body{background:#fcfbf8;color:#292d29;font:15px Georgia;padding:32px}section{display:flex;align-items:center;gap:45px;margin:26px 0}h2{font-size:18px;width:190px;font-weight:normal}.swatch{display:flex;gap:28px;align-items:center;padding:25px;background:#fff}.dark{background:#242d28}span{display:grid;gap:10px;text-align:center;font:11px Arial;color:#69716a}.dark span{color:#d4dfd5}</style><h1>Three marks · actual favicon sizes</h1>';
for (const [file, title] of [['01-current-sh','01 / Current · SH'], ['02-paired-strokes','02 / Paired strokes'], ['03-confluence','03 / Confluence']]) {
 const svg = await fs.readFile(`public/brand/${file}.svg`, 'utf8');
 html += `<section><h2>${title}</h2>`;
 for (const dark of [false,true]) { html += `<div class="swatch ${dark?'dark':''}">`; for (const size of [16,32,64]) html += `<span>${svg.replace('<svg ', `<svg width="${size}" height="${size}" `).replaceAll('#285946', dark?'#d8e4db':'#285946')}${size}px</span>`; html += '</div>'; }
 html += '</section>';
}
await fs.mkdir('qa',{recursive:true});
await fs.writeFile('qa/icon-candidates.html', html);
await page.setContent(html);
await page.screenshot({path:'qa/icon-candidates.png'});
await browser.close();
