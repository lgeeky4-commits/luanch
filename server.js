'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT) || 3000;
const files = {
  '/': ['public/index.html', 'text/html; charset=utf-8'],
  '/index.html': ['public/index.html', 'text/html; charset=utf-8'],
  '/hub.css': ['public/hub.css', 'text/css; charset=utf-8'],
  '/hub.js': ['public/hub.js', 'text/javascript; charset=utf-8'],
  '/role-config': ['role-config.json', 'application/json; charset=utf-8'],
};

http.createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {'Content-Type':'text/plain; charset=utf-8', 'Allow':'GET, HEAD'});
    res.end('Method not allowed');
    return;
  }
  let pathname;
  try { pathname = new URL(req.url, 'http://localhost').pathname; }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  if (pathname === '/health') {
    res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
    res.end(req.method === 'HEAD' ? undefined : 'OK');
    return;
  }
  const file = files[pathname];
  if (!file) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');return; }
  fs.readFile(path.join(__dirname,file[0]), (error,data) => {
    if(error) {res.writeHead(500);res.end('Server error');return;}
    res.writeHead(200, {
      'Content-Type': file[1],
      'Cache-Control': pathname === '/role-config' ? 'no-store' : 'public, max-age=120'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(port, '0.0.0.0', () => console.log(`ASE RP Launcher running on port ${port}`));
