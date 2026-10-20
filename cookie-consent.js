/* Rib Rentals cookie consent + Google Analytics (GA4)
   Google Analytics loads only after the visitor accepts.
   Choice is stored in localStorage under "rr_consent" (granted | denied). */
(function () {
  'use strict';
  var GA_ID = 'G-KNBEJ8E3HT';
  var KEY = 'rr_consent';
  var doc = document;

  var lang = (doc.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
  if (lang !== 'nl' && lang !== 'de') lang = 'en';

  var T = {
    en: {
      title: 'Cookies',
      text: 'We use Google Analytics to see how the site is used and to improve it. This only happens if you accept. No advertising cookies.',
      accept: 'Accept', decline: 'Decline',
      more: 'Privacy policy', href: '/en/privacy-policy/',
      settings: 'Cookie settings'
    },
    nl: {
      title: 'Cookies',
      text: 'Wij gebruiken Google Analytics om te zien hoe de site wordt gebruikt en om hem te verbeteren. Dit gebeurt alleen als je akkoord gaat. Geen advertentiecookies.',
      accept: 'Accepteren', decline: 'Weigeren',
      more: 'Privacyverklaring', href: '/nl/privacyverklaring/',
      settings: 'Cookie-instellingen'
    },
    de: {
      title: 'Cookies',
      text: 'Wir nutzen Google Analytics, um zu sehen, wie die Website genutzt wird, und sie zu verbessern. Das geschieht nur mit Ihrer Zustimmung. Keine Werbe-Cookies.',
      accept: 'Akzeptieren', decline: 'Ablehnen',
      more: 'Datenschutzerklärung', href: '/de/datenschutz/',
      settings: 'Cookie-Einstellungen'
    }
  }[lang];

  /* storage helpers (may throw in private mode) */
  var mem = null;
  function getChoice() {
    try { return localStorage.getItem(KEY) || mem; } catch (e) { return mem; }
  }
  function setChoice(v) {
    mem = v;
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  /* gtag stub + consent default (denied) */
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) { window.gtag = function () { window.dataLayer.push(arguments); }; }
  var gtag = window.gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  gtag('js', new Date());
  gtag('config', GA_ID);

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    doc.head.appendChild(s);
  }

  function deleteGaCookies() {
    var names = ['_ga', '_ga_' + GA_ID.replace('G-', ''), '_gid', '_gat'];
    var host = location.hostname;
    var parts = host.split('.');
    var domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        doc.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  /* styles, in site branding */
  var css =
    '#rr-cc{position:fixed;left:0;right:0;bottom:0;z-index:100000;background:#0d1a25;color:#eef2f4;' +
    'border-top:2px solid #ff5a1f;font:400 15px/1.5 "Hanken Grotesk",system-ui,-apple-system,sans-serif;' +
    'box-shadow:0 -12px 40px #0009}' +
    '#rr-cc[hidden]{display:none}' +
    '#rr-cc .rr-in{max-width:1180px;margin:0 auto;padding:18px clamp(16px,4vw,48px);display:flex;gap:20px 32px;align-items:center;flex-wrap:wrap}' +
    '#rr-cc .rr-tx{flex:1 1 380px;min-width:0}' +
    '#rr-cc .rr-h{font:700 20px/1.1 "Barlow Condensed",Impact,sans-serif;letter-spacing:.08em;text-transform:uppercase;margin:0 0 4px}' +
    '#rr-cc .rr-p{margin:0;color:#93a4b0}' +
    '#rr-cc .rr-p a{color:#eef2f4;text-decoration:underline;text-underline-offset:3px;margin-left:6px;white-space:nowrap}' +
    '#rr-cc .rr-bt{display:flex;gap:12px;flex:0 0 auto}' +
    '#rr-cc button{font:600 18px/1 "Barlow Condensed",Impact,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:12px 26px;' +
    'border:2px solid #ff5a1f;color:#fff;background:none;cursor:pointer;border-radius:0;transition:.2s}' +
    '#rr-cc button.rr-yes{background:#ff5a1f;color:#150700}' +
    '#rr-cc button:hover{transform:translateY(-2px);box-shadow:0 8px 24px #ff5a1f55}' +
    '#rr-cc button:focus-visible,#rr-set:focus-visible{outline:2px solid #ff5a1f;outline-offset:3px}' +
    '#rr-set{background:none;border:0;padding:0;margin:0;font:inherit;color:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}' +
    '#rr-setfloat{position:fixed;left:12px;bottom:12px;z-index:99990;background:#0d1a25;color:#93a4b0;border:1px solid #1f3140;padding:6px 10px;font-size:12px}' +
    '@media (max-width:560px){#rr-cc .rr-bt{width:100%}#rr-cc .rr-bt button{flex:1}}' +
    '@media (prefers-reduced-motion:reduce){#rr-cc button{transition:none}#rr-cc button:hover{transform:none}}';

  function init() {
    var st = doc.createElement('style');
    st.id = 'rr-cc-css';
    st.appendChild(doc.createTextNode(css));
    doc.head.appendChild(st);

    var bar = doc.createElement('div');
    bar.id = 'rr-cc';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', T.title);
    bar.hidden = true;
    bar.innerHTML =
      '<div class="rr-in"><div class="rr-tx"><p class="rr-h"></p><p class="rr-p"><span class="rr-t"></span><a class="rr-l"></a></p></div>' +
      '<div class="rr-bt"><button type="button" class="rr-no"></button><button type="button" class="rr-yes"></button></div></div>';
    bar.querySelector('.rr-h').textContent = T.title;
    bar.querySelector('.rr-t').textContent = T.text;
    var a = bar.querySelector('.rr-l');
    a.textContent = T.more;
    a.href = T.href;
    bar.querySelector('.rr-no').textContent = T.decline;
    bar.querySelector('.rr-yes').textContent = T.accept;
    doc.body.appendChild(bar);

    function show() { bar.hidden = false; }
    function hide() { bar.hidden = true; }

    bar.querySelector('.rr-yes').addEventListener('click', function () {
      setChoice('granted'); hide(); loadGA();
    });
    bar.querySelector('.rr-no').addEventListener('click', function () {
      var was = getChoice();
      setChoice('denied'); hide();
      if (was === 'granted' || loaded) {
        gtag('consent', 'update', { analytics_storage: 'denied' });
        deleteGaCookies();
      }
    });

    /* persistent way to change the choice: footer link, else small floating button */
    var set = doc.createElement('button');
    set.type = 'button';
    set.id = 'rr-set';
    set.textContent = T.settings;
    set.addEventListener('click', show);
    var foot = doc.querySelector('footer');
    if (foot) {
      var wrap = doc.createElement('p');
      wrap.style.cssText = 'margin-top:10px;font-size:14px';
      wrap.appendChild(set);
      foot.appendChild(wrap);
    } else {
      set.id = 'rr-setfloat';
      doc.body.appendChild(set);
    }

    var c = getChoice();
    if (c === 'granted') loadGA();
    else if (c !== 'denied') show();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
