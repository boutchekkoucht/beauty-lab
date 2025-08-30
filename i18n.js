
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
