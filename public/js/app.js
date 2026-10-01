(function () {
  'use strict';

  var G = window.GUIDE;
  var TOTAL = G.steps.length;
  var stage = document.getElementById('stage');

  // Orden de páginas: portada, índice, pasos 1..N, final. Los ids coinciden con el diseño.
  var ids = ['p-0', 'p-indice'];
  for (var i = 1; i <= TOTAL; i++) ids.push('p-' + i);
  ids.push('p-fin');

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === 'class') el.className = attrs[k];
        else if (k === 'text') el.textContent = attrs[k];
        else if (k === 'html') el.innerHTML = attrs[k];
        else el.setAttribute(k, attrs[k]);
      }
    }
    for (var j = 2; j < arguments.length; j++) {
      var c = arguments[j];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) el.appendChild(x); });
      else el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }

  function page(id, label) {
    return h('section', { id: id, class: 'page', 'aria-label': label });
  }

  function brand(tag) {
    return h('div', { class: 'brand' },
      h('div', { class: 'brand-name', text: G.brand }),
      h('div', { class: 'brand-sep' }),
      h('div', { class: 'brand-tag', text: tag }));
  }

  function progress(current) {
    var bar = h('nav', { class: 'progress', 'aria-label': 'Progreso' });
    for (var n = 1; n <= TOTAL; n++) {
      var cls = n < current ? 'done' : n === current ? 'current' : '';
      bar.appendChild(h('a', {
        href: '#p-' + n, class: cls,
        'aria-label': 'Paso ' + n + ': ' + G.steps[n - 1].short,
        title: 'Paso ' + n + ': ' + G.steps[n - 1].short
      }));
    }
    return bar;
  }

  function header(current) {
    return h('div', { class: 'header' }, brand(G.headerTag), progress(current));
  }

  function laptop(img) {
    return h('figure', { class: 'laptop' },
      h('div', { class: 'laptop-screen' }, h('img', { src: img.src, alt: img.caption })),
      h('div', { class: 'laptop-base' }),
      h('figcaption', { text: img.caption }));
  }

  function portrait(img) {
    return h('figure', { class: 'portrait' },
      h('div', { class: 'portrait-frame' }, h('img', { src: img.src, alt: img.caption })),
      h('figcaption', { text: img.caption }));
  }

  function shots(imgs) {
    return h('div', { class: 'shots' }, imgs.map(function (img) {
      return h('figure', { class: 'shot' },
        h('div', { class: 'shot-frame' }, h('img', { src: img.src, alt: img.caption })),
        h('figcaption', { text: img.caption }));
    }));
  }

  function value(v) {
    var btn = h('button', {
      type: 'button', class: 'value' + (v.mono ? ' mono' : ''),
      'data-copy': v.text, title: 'Clic para copiar'
    }, h('span', { text: v.text }), h('span', { class: 'copy-hint', text: 'Copiar' }));
    return h('div', { class: 'field' }, h('div', { class: 'field-label', text: v.label }), btn);
  }

  function keys(k) {
    var row = h('div', { class: 'keys' });
    k.keys.forEach(function (key, idx) {
      if (idx) row.appendChild(h('span', { class: 'plus', text: '+' }));
      row.appendChild(h('kbd', { class: 'key', text: key }));
    });
    return h('div', { class: 'keys-card' },
      h('div', { class: 'field-label', text: k.label }), row,
      h('div', { class: 'keys-hint', text: k.hint }));
  }

  function warning(text) {
    return h('div', { class: 'warning', role: 'note' },
      h('span', { class: 'warning-icon', 'aria-hidden': 'true', text: '!' }),
      h('div', { class: 'warning-text', text: text }));
  }

  function footer(prev, next, nextLabel) {
    return h('div', { class: 'footer' },
      h('a', { href: '#' + prev, class: 'btn', text: '← Anterior' }),
      h('a', { href: '#p-indice', class: 'footer-link', text: 'Ver todos los pasos' }),
      h('a', { href: '#' + next, class: 'btn btn-primary', text: nextLabel }));
  }

  function renderCover() {
    var c = G.cover;
    var p = page('p-0', 'Portada');
    p.append(
      h('div', { class: 'header' }, brand(G.coverTag)),
      h('div', { class: 'hero' },
        h('div', { class: 'hero-text' },
          h('div', { class: 'pill', text: c.pill }),
          h('h1', { class: 'display', text: c.title }),
          h('p', { class: 'lead', text: c.lead }),
          h('div', { class: 'btn-row' },
            h('a', { href: '#p-1', class: 'btn btn-primary', text: 'Iniciar configuración →' }),
            h('a', { href: '#p-indice', class: 'btn', text: 'Ver todos los pasos' }))),
        h('div', { class: 'hero-media' }, laptop(c.image))));
    return p;
  }

  function renderIndex() {
    var p = page('p-indice', 'Índice');
    var grid = h('div', { class: 'index-grid' });
    G.steps.forEach(function (s, idx) {
      grid.appendChild(h('a', { href: '#p-' + (idx + 1), class: 'index-item' },
        h('span', { class: 'num', text: String(idx + 1) }),
        h('span', { class: 'label', text: s.short })));
    });
    grid.appendChild(h('a', { href: '#p-fin', class: 'index-item finish' },
      h('span', { class: 'num', text: '✓' }),
      h('span', { class: 'label', text: 'Finalizar' })));
    p.append(header(0), h('div', { class: 'index-body' },
      h('h2', { class: 'h2', text: 'Los ' + TOTAL + ' pasos' }), grid));
    return p;
  }

  function renderStep(s, n) {
    var p = page('p-' + n, 'Paso ' + n + ' · ' + s.short);
    var text = h('div', { class: 'step-text' },
      h('div', { class: 'step-head' },
        h('div', { class: 'badge', text: String(n) }),
        h('div', { class: 'step-count', text: 'Paso ' + n + ' de ' + TOTAL })),
      h('h2', { class: 'h2', text: s.title }),
      s.body.map(function (t) { return h('p', { class: 'lead', text: t }); }),
      s.keys && keys(s.keys),
      s.value && value(s.value),
      s.warning && warning(s.warning));
    var media = s.images ? shots(s.images) : s.image.portrait ? portrait(s.image) : laptop(s.image);
    var prev = n === 1 ? 'p-indice' : 'p-' + (n - 1);
    var last = n === TOTAL;
    p.append(
      header(n),
      h('div', { class: 'step-body' + (s.compact ? ' compact' : '') }, text, h('div', { class: 'step-media' }, media)),
      footer(prev, last ? 'p-fin' : 'p-' + (n + 1), last ? 'Finalizar →' : 'Siguiente →'));
    return p;
  }

  function renderFinish() {
    var f = G.finish;
    var p = page('p-fin', 'Finalizar');
    var list = h('ol', { class: 'todo' });
    f.items.forEach(function (item, idx) {
      list.appendChild(h('li', null,
        h('span', { class: 'dot', text: String(idx + 1) }),
        h('span', { class: 'txt', html: item })));
    });
    p.append(header(TOTAL + 1), h('div', { class: 'finish-body' },
      h('div', { class: 'finish-text' },
        h('div', { class: 'check', 'aria-hidden': 'true', text: '✓' }),
        h('h2', { class: 'display', text: f.title }),
        h('p', { class: 'lead', text: f.lead }),
        h('div', { class: 'btn-row' }, h('a', { href: '#p-0', class: 'btn', text: 'Volver a empezar' }))),
      list));
    return p;
  }

  stage.append(renderCover(), renderIndex());
  G.steps.forEach(function (s, idx) { stage.appendChild(renderStep(s, idx + 1)); });
  stage.appendChild(renderFinish());

  // --- Navegación por hash ---
  function currentIndex() {
    var idx = ids.indexOf(location.hash.slice(1));
    return idx === -1 ? 0 : idx;
  }

  function show() {
    var idx = currentIndex();
    var active = document.getElementById(ids[idx]);
    Array.prototype.forEach.call(stage.children, function (el) {
      el.classList.toggle('is-active', el === active);
    });
    document.title = (idx === 0 ? '' : active.getAttribute('aria-label') + ' · ') + 'CNA Sistemas · Guía de configuración';
    try { localStorage.setItem('cna-guide-page', ids[idx]); } catch (e) { /* almacenamiento no disponible */ }
  }

  function go(delta) {
    var idx = Math.max(0, Math.min(ids.length - 1, currentIndex() + delta));
    location.hash = ids[idx];
  }

  // Si no hay hash, retoma donde se quedó el usuario.
  if (!location.hash) {
    var saved = null;
    try { saved = localStorage.getItem('cna-guide-page'); } catch (e) { /* ignorar */ }
    if (saved && ids.indexOf(saved) > 0) history.replaceState(null, '', '#' + saved);
  }

  window.addEventListener('hashchange', show);
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    else if (e.key === 'Home') { e.preventDefault(); location.hash = ids[0]; }
    else if (e.key === 'End') { e.preventDefault(); location.hash = ids[ids.length - 1]; }
  });

  // Gestos táctiles: deslizar a izquierda/derecha.
  var touchX = null;
  document.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  // --- Copiar valores (comando, nombre, contraseña, respuesta) ---
  stage.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var text = btn.getAttribute('data-copy');
    var hint = btn.querySelector('.copy-hint');
    var done = function () {
      btn.classList.add('copied');
      hint.textContent = 'Copiado ✓';
      setTimeout(function () { btn.classList.remove('copied'); hint.textContent = 'Copiar'; }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else {
      fallbackCopy(text); done();
    }
  });

  function fallbackCopy(text) {
    var ta = h('textarea', { 'aria-hidden': 'true' });
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignorar */ }
    ta.remove();
  }

  // --- Escalado del escenario 1920×1080 a la ventana ---
  function fit() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  fit();
  show();
})();
