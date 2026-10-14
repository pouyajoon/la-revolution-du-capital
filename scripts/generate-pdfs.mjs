import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const distDir = join(root, 'dist');
const pdfDirs = [join(distDir, 'pdf'), join(root, 'public', 'pdf')];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
};

function startStaticServer(dir) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      try {
        const url = new URL(req.url ?? '/', 'http://127.0.0.1');
        let pathname = decodeURIComponent(url.pathname);
        let filePath = join(dir, pathname);
        if (pathname.endsWith('/')) {
          filePath = join(dir, pathname, 'index.html');
        } else if (!extname(pathname)) {
          const asIndex = join(dir, pathname, 'index.html');
          const asHtml = join(dir, `${pathname}.html`);
          if (existsSync(asIndex)) filePath = asIndex;
          else if (existsSync(asHtml)) filePath = asHtml;
        }
        if (!filePath.startsWith(dir) || !existsSync(filePath)) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const body = readFileSync(filePath);
        res.writeHead(200, {
          'Content-Type': mime[extname(filePath)] ?? 'application/octet-stream',
        });
        res.end(body);
      } catch {
        res.writeHead(500);
        res.end('Error');
      }
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

const targets = [
  { path: '/livre', file: 'la-revolution-du-capital-fr.pdf' },
  { path: '/fa/livre', file: 'la-revolution-du-capital-fa.pdf' },
];

if (!existsSync(distDir)) {
  console.error('dist/ missing — run astro build first');
  process.exit(1);
}

for (const dir of pdfDirs) mkdirSync(dir, { recursive: true });

const { server, port } = await startStaticServer(distDir);
const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const page = await browser.newPage();
    const url = `http://127.0.0.1:${port}${target.path}`;
    console.log(`Rendering ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '16mm',
        bottom: '18mm',
        left: '16mm',
        right: '16mm',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="width:100%;font-size:8px;color:#666;padding:0 12mm;display:flex;justify-content:flex-end;font-family:serif;">
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>
      `,
    });
    for (const dir of pdfDirs) {
      const out = join(dir, target.file);
      writeFileSync(out, pdf);
      console.log(`Wrote ${out} (${pdf.length} bytes)`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
