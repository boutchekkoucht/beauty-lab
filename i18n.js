
(function(){
  const stored = localStorage.getItem('lang') || (navigator.language||'fr').slice(0,2);
  const lang = ['fr','en','ar'].includes(stored)?stored:'fr';
  function applyDir(l){ document.documentElement.setAttribute('lang', l); document.documentElement.setAttribute('dir', l==='ar'?'rtl':'ltr'); }
  function translate(dict){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
      const spec = el.getAttribute('data-i18n-attr');
      const [attr,key] = spec.split(':');
      if(dict[key]) el.setAttribute(attr, dict[key]);
    });
    if(window.__afterI18N){ window.__afterI18N(dict); }
  }
  function load(l){
    const dict = (window.I18N && window.I18N[l]) || (window.I18N && window.I18N['fr']) || {};
    applyDir(l);
    translate(dict);
  }
  // Language floating menu
  function setupLang(){
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    function open(){ menu.classList.add('open'); }
    function close(){ menu.classList.remove('open'); }
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); menu.classList.toggle('open'); });
    ['fr','en','ar'].forEach(code=>{
      const el = document.getElementById('lang-'+code);
      el.addEventListener('click', ()=>{
        localStorage.setItem('lang', code);
        load(code);
        close();
      });
    });
    document.addEventListener('click', close);
  }
  setupLang();
  load(lang);
  document.getElementById('year').textContent = new Date().getFullYear();
})();


    (function(){
      function ready(fn){ document.readyState!=='loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
      ready(function(){
        const I18N = window.I18N || {};
        const docLang = (document.documentElement.getAttribute('lang')||'fr').slice(0,2);
        const lang = (localStorage.getItem('lang') || docLang || 'fr').slice(0,2);
        const dict = I18N[lang] || I18N.fr || {};

        // Texte brut
        document.querySelectorAll('[data-i18n]').forEach(el=>{
          const k = el.getAttribute('data-i18n');
          if (k && dict[k] != null) el.textContent = dict[k];
        });

        // HTML riche (p, ul, a, etc.)
        document.querySelectorAll('[data-i18n-html]').forEach(el=>{
          const k = el.getAttribute('data-i18n-html');
          if (k && dict[k] != null) el.innerHTML = dict[k];
        });

        // Attributs (ex: meta description via content:meta_desc)
        document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
          const map = el.getAttribute('data-i18n-attr').split(',').map(s=>s.trim());
          map.forEach(pair=>{
            const [attr,key] = pair.split(':').map(s=>s.trim());
            if (attr && key && dict[key]!=null) el.setAttribute(attr, dict[key]);
          });
        });

        // Callback déjà prévu par ton site
        if (typeof window.__afterI18N === 'function') window.__afterI18N(dict);
      });
    })();


      // Menu mobile toggle
      document.addEventListener('DOMContentLoaded', function(){
        const btn = document.getElementById('menuBtn');
        const panel = document.getElementById('navLinks');
        if (!btn || !panel) return;
        btn.addEventListener('click', function(){
          const open = panel.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // fermer si on clique hors du menu
        document.addEventListener('click', (e)=>{
          if (!panel.contains(e.target) && e.target !== btn) {
            panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
          }
        });
      });

function markActiveNav() {
  const herePath = location.pathname.replace(/\/+$/, '') || '/index.html';
  const hereFile = herePath.split('/').pop() || 'index.html';

  document.querySelectorAll('.links a, .links .btn').forEach(a => {
    a.removeAttribute('aria-current');
    a.removeAttribute('data-selected');     // au cas où tu utilisais ça
    a.removeAttribute('aria-selected');     // idem
    const href = a.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, location.origin);
      const path = (url.pathname.replace(/\/+$/, '') || '/index.html');
      const file = path.split('/').pop() || 'index.html';

      // Match strict par chemin, sinon fallback par nom de fichier
      if (path === herePath || file === hereFile) {
        a.setAttribute('aria-current', 'page');
      }
    } catch (_) {}
  });
}

document.addEventListener('DOMContentLoaded', markActiveNav);

