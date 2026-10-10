import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
const root = path.resolve('out');
const args = process.argv.slice(2);
const port = Number(args[args.indexOf('--port') + 1]) || 3100;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.pdf':'application/pdf', '.xml':'application/xml', '.txt':'text/plain', '.json':'application/json' };
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { if ((await fs.stat(file)).isDirectory()) file = path.join(file,'index.html'); }
    catch { file = path.join(root,'404.html'); res.statusCode = 404; }
    const data = await fs.readFile(file);
    res.setHeader('Content-Type', pathname === '/opengraph-image' ? 'image/png' : mime[path.extname(file)] || 'application/octet-stream');
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port,'127.0.0.1',() => console.log(`Static preview at http://127.0.0.1:${port}`));
