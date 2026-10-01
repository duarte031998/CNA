'use strict';

const path = require('node:path');
const express = require('express');

const PUBLIC_DIR = path.join(__dirname, 'public');

function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': [
        "default-src 'self'",
        "style-src 'self' https://fonts.googleapis.com",
        "font-src https://fonts.gstatic.com",
        "img-src 'self' data:",
        "script-src 'self'",
        "frame-ancestors 'self'"
      ].join('; ')
    });
    next();
  });

  app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

  app.use(express.static(PUBLIC_DIR, {
    extensions: ['html'],
    setHeaders(res, filePath) {
      // Las capturas cambian poco; el HTML/JS/CSS se revalida siempre.
      if (/\.(jpe?g|png|svg)$/.test(filePath)) res.set('Cache-Control', 'public, max-age=604800');
      else res.set('Cache-Control', 'no-cache');
    }
  }));

  app.use((req, res) => res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html')));

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => {
    console.log(`Guía CNA disponible en http://localhost:${port}`);
  });
}

module.exports = { createApp };
