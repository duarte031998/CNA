'use strict';

// Recreaciones de las pantallas de configuración (OOBE) de Windows 11.
// Cada pantalla se renderiza a public/img/screens/<id>.png con `npm run screens`.
// La clase "hl" resalta el elemento que el usuario debe elegir.

const icon = {
  globe: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><circle cx="60" cy="60" r="46" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="3" opacity=".9"><ellipse cx="60" cy="60" rx="20" ry="46"/><path d="M14 60h92M20 38h80M20 82h80"/></g></svg>`,
  flag: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><circle cx="60" cy="60" r="46" fill="url(#g)"/><path d="M60 24c-14 0-25 11-25 25 0 19 25 45 25 45s25-26 25-45c0-14-11-25-25-25z" fill="#fff"/><circle cx="60" cy="49" r="9" fill="#0078d4"/></svg>`,
  keyboard: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><rect x="10" y="32" width="100" height="58" rx="10" fill="url(#g)"/><g fill="#fff">${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5, 6].map(c => `<rect x="${20 + c * 12}" y="${42 + r * 12}" width="8" height="8" rx="2"/>`).join('')).join('')}<rect x="32" y="78" width="56" height="6" rx="3"/></g></svg>`,
  wifi: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><g fill="none" stroke="url(#g)" stroke-width="10" stroke-linecap="round"><path d="M14 48a66 66 0 0 1 92 0"/><path d="M30 64a43 43 0 0 1 60 0"/><path d="M46 80a20 20 0 0 1 28 0"/></g><circle cx="60" cy="94" r="7" fill="#0063b1"/></svg>`,
  doc: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><path d="M30 12h42l22 22v74H30z" fill="url(#g)"/><path d="M72 12v22h22" fill="#9fd8ff"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M42 54h40M42 68h40M42 82h26"/></g></svg>`,
  person: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><circle cx="60" cy="42" r="22" fill="url(#g)"/><path d="M20 104c4-24 20-36 40-36s36 12 40 36z" fill="url(#g)"/></svg>`,
  lock: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><path d="M38 54V40a22 22 0 0 1 44 0v14" fill="none" stroke="#0063b1" stroke-width="9"/><rect x="26" y="52" width="68" height="54" rx="10" fill="url(#g)"/><circle cx="60" cy="76" r="7" fill="#fff"/><rect x="57" y="78" width="6" height="14" rx="3" fill="#fff"/></svg>`,
  shield: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><path d="M60 10l40 14v30c0 28-18 46-40 56-22-10-40-28-40-56V24z" fill="url(#g)"/><path d="M42 60l13 13 24-26" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  key: `<svg viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#0063b1"/></linearGradient></defs><circle cx="40" cy="60" r="24" fill="url(#g)"/><circle cx="34" cy="60" r="7" fill="#fff"/><path d="M60 54h46v12h-8v12H86V66H60z" fill="#0063b1"/></svg>`
};

const wifiBars = `<svg class="wifi-ico" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9.5a13 13 0 0 1 18 0"/><path d="M6.5 13a8 8 0 0 1 11 0"/><path d="M10 16.5a3 3 0 0 1 4 0"/></g><circle cx="12" cy="19.5" r="1.3" fill="currentColor"/></svg>`;
const ethIco = `<svg class="wifi-ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 16v4M8 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const lockSm = `<svg class="lock-ico" viewBox="0 0 24 24"><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="6" y="11" width="12" height="9" rx="2" fill="currentColor"/></svg>`;
const chevron = `<svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

function list(items, selected, highlight) {
  return `<ul class="list">${items.map((t, i) => {
    const cls = [i === selected ? 'sel' : '', i === highlight ? 'hl' : ''].join(' ').trim();
    return `<li${cls ? ` class="${cls}"` : ''}>${t}</li>`;
  }).join('')}</ul>`;
}

function screen({ icon: ic, title, sub = '', body, buttons = '', left = '' }) {
  return `<div class="card">
    <div class="left">${ic ? `<div class="illus">${icon[ic]}</div>` : ''}<h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}${left}</div>
    <div class="right"><div class="content">${body}</div><div class="buttons">${buttons}</div></div>
  </div>`;
}

const btn = (t, extra = '') => `<span class="btn ${extra}">${t}</span>`;

const networks = [
  ['Oficina-5G', true], ['Red invitados', false], ['HOGAR-2.4', true], ['Galaxy A54', true], ['MOVISTAR_8F21', true]
];
const netList = (selectedFirst) => `<ul class="list nets">${networks.map(([n, sec], i) =>
  `<li class="${selectedFirst && i === 0 ? 'sel' : ''}">${wifiBars}<span class="net-name">${n}<small>${sec ? 'Segura' : 'Abierta'}</small></span>${sec ? lockSm : ''}${selectedFirst && i === 0 ? `<span class="btn small">Conectar</span>` : ''}</li>`).join('')}</ul>`;

const networkScreen = (noInternet) => screen({
  icon: 'wifi',
  title: 'Vamos a conectarte a una red',
  sub: 'Necesitarás una conexión a Internet para continuar con la configuración del dispositivo.',
  left: noInternet ? `<span class="link hl">No tengo Internet</span>` : '',
  body: `<div class="eth">${ethIco}<span>Ethernet<small>No conectado</small></span></div>${netList(true)}`,
  buttons: btn('Siguiente', 'primary disabled')
});

module.exports = [
  {
    id: 'idioma',
    html: screen({
      icon: 'globe',
      title: 'Selecciona tu idioma',
      sub: 'Elige el idioma que quieres usar durante la configuración.',
      body: list(['English (United States)', 'español (España)', 'español (México)', 'español (Estados Unidos)', 'français (France)', 'português (Brasil)'], 2, 2),
      buttons: btn('Sí', 'primary')
    })
  },
  {
    id: 'pais',
    html: screen({
      icon: 'flag',
      title: '¿Es este el país o región correcto?',
      body: list(['Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador'], 2, 2),
      buttons: btn('Sí', 'primary')
    })
  },
  {
    id: 'teclado',
    html: screen({
      icon: 'keyboard',
      title: '¿Es esta la distribución del teclado o el método de entrada correctos?',
      sub: 'Si también usas otra distribución del teclado, puedes agregarla a continuación.',
      body: list(['Latinoamericano', 'Español', 'Estados Unidos (internacional)', 'EE. UU.', 'Canadiense multilingüe estándar'], 0, 0),
      buttons: btn('Sí', 'primary')
    })
  },
  {
    id: 'segunda-distribucion',
    html: screen({
      icon: 'keyboard',
      title: '¿Quieres agregar una segunda distribución del teclado?',
      body: `<div class="empty"><p>Si usas más de un idioma o distribución, puedes agregarla ahora. También puedes hacerlo más tarde desde Configuración.</p></div>`,
      buttons: btn('Agregar distribución') + btn('Omitir', 'primary hl')
    })
  },
  { id: 'red', html: networkScreen(false) },
  {
    id: 'comando',
    html: networkScreen(false) + `<div class="cmd">
      <div class="cmd-bar"><span class="cmd-ico">C:\\</span>Administrador: C:\\Windows\\system32\\cmd.exe<span class="cmd-ctrls">—&nbsp;&nbsp;☐&nbsp;&nbsp;✕</span></div>
      <pre>Microsoft Windows [Versión 10.0.26100]
(c) Microsoft Corporation. Todos los derechos reservados.

C:\\Windows\\system32&gt;<b class="typed">oobe\\bypassnro</b><span class="caret"></span></pre></div>`
  },
  { id: 'sin-internet', html: networkScreen(true) },
  {
    id: 'licencia',
    html: screen({
      icon: 'doc',
      title: 'Revisa el Contrato de licencia',
      sub: 'Lee el contrato de licencia del software de Microsoft.',
      body: `<div class="eula"><b>CONTRATO DE LICENCIA DEL SOFTWARE DE MICROSOFT</b><p>SISTEMA OPERATIVO WINDOWS</p><p>Gracias por elegir Microsoft. Este contrato describe tus derechos y las condiciones en las que puedes usar el software de Windows. Debes revisar el contrato completo, incluidas las condiciones de licencia complementarias…</p><p>1. Información general del contrato. a. Aplicabilidad. Este contrato rige el uso del software de Windows…</p><p>2. Instalación y derechos de uso. a. Licencia. El software se concede bajo licencia, no se vende. Según este contrato, te otorgamos el derecho a instalar y ejecutar una instancia del software en tu dispositivo…</p><p>3. Privacidad; consentimiento para el uso de datos…</p><div class="scroll"></div></div>`,
      buttons: btn('Rechazar') + btn('Aceptar', 'primary hl')
    })
  },
  {
    id: 'nombre',
    html: screen({
      icon: 'person',
      title: '¿Quién va a usar este dispositivo?',
      sub: '¿Qué nombre quieres usar?',
      body: `<div class="field"><span class="input hl">HI<span class="caret dark"></span></span></div>`,
      buttons: btn('Siguiente', 'primary')
    })
  },
  {
    id: 'contrasena',
    html: screen({
      icon: 'lock',
      title: 'Crea una contraseña fácil de recordar',
      sub: 'Asegúrate de elegir algo que puedas recordar fácilmente.',
      body: `<div class="field"><span class="input hl dots">••••••••<span class="caret dark"></span></span></div>`,
      buttons: btn('Siguiente', 'primary')
    })
  },
  {
    id: 'preguntas',
    html: screen({
      icon: 'key',
      title: 'Ahora agrega preguntas de seguridad',
      sub: 'Si olvidas tu contraseña, estas preguntas de seguridad te ayudarán a recuperar el acceso.',
      body: `<div class="field"><span class="select">¿Cuál fue el nombre de tu primera mascota?${chevron}</span><span class="input hl">1<span class="caret dark"></span></span><p class="note">Pregunta 1 de 3</p></div>`,
      buttons: btn('Siguiente', 'primary')
    })
  },
  {
    id: 'privacidad',
    html: screen({
      icon: 'shield',
      title: 'Elige la configuración de privacidad para tu dispositivo',
      sub: 'Microsoft te permite elegir. Selecciona la configuración y después elige Aceptar.',
      body: ['Ubicación', 'Encontrar mi dispositivo', 'Datos de diagnóstico', 'Entrada manuscrita y escritura', 'Experiencias personalizadas'].map(t =>
        `<div class="toggle-row"><span>${t}</span><span class="toggle"><i></i>Sí</span></div>`).join(''),
      buttons: btn('Aceptar', 'primary hl')
    })
  }
];
