'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createApp } = require('../server');

let server;
let base;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('sirve la guía en /', async () => {
  const res = await fetch(base + '/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.match(await res.text(), /CNA Sistemas · Guía de configuración/);
  assert.ok(res.headers.get('content-security-policy'));
});

test('healthcheck', async () => {
  const res = await fetch(base + '/healthz');
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('todas las capturas del contenido existen y se sirven', async () => {
  const src = fs.readFileSync(path.join(__dirname, '../public/js/content.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);
  const guide = sandbox.window.GUIDE;

  assert.equal(guide.steps.length, 11);
  const images = [guide.cover.image];
  for (const s of guide.steps) images.push(...(s.images || [s.image]));

  for (const img of images) {
    const res = await fetch(`${base}/${img.src}`);
    assert.equal(res.status, 200, img.src);
    assert.match(res.headers.get('content-type'), /image\/jpeg/);
  }
});

test('rutas desconocidas devuelven la guía con 404', async () => {
  const res = await fetch(base + '/no-existe');
  assert.equal(res.status, 404);
  assert.match(await res.text(), /<div class="stage"/);
});
