/* ============================================================
   FrameTheory — shared client runtime
   - Renders nav + footer + ambient layers (so pages stay DRY)
   - Plugin card factory + Payhip helper
   - Reveal observer, counters, mobile menu, cursor glow
============================================================ */

/* ── PAYHIP ─────────────────────────────────────────────── */
const PAYHIP_PLACEHOLDER = 'PAYHIP_LINK_HERE';
function hasPayhip(plugin) {
  return !!plugin.payhipLink && plugin.payhipLink !== PAYHIP_PLACEHOLDER;
}

/* ── IMAGE LOADING ──────────────────────────────────────── */
function pluginImageSrc(plugin) {
  return `Plugin Display Images/plugin${plugin.id}.png`;
}
function pluginImageFallback() {
  return 'Plugin Display Images/placeholder.svg';
}

/* ── PLUGIN CARD ────────────────────────────────────────── */
function pluginCardHTML(p) {
  const buyDisabled = !hasPayhip(p);
  const buyAttrs = buyDisabled
    ? `class="btn-card-buy disabled" aria-disabled="true" tabindex="0"`
    : `class="btn-card-buy" href="${p.payhipLink}" target="_blank" rel="noopener noreferrer"`;
  const buyTag = buyDisabled ? 'span' : 'a';
  const buyLabel = buyDisabled ? 'Buy Now' : 'Buy Now';

  return `
    <article class="plug-card reveal">
      <div class="plug-image">
        <span class="plug-ver">v${p.version}</span>
        <img src="${pluginImageSrc(p)}"
             alt="${p.name}"
             loading="lazy"
             onerror="this.onerror=null;this.src='${pluginImageFallback()}'"/>
      </div>
      <div class="plug-body">
        <h3 class="plug-title">${p.name}</h3>
        <p class="plug-desc">${p.description}</p>
        <div class="plug-meta">
          <span class="plug-price">${p.price}</span>
        </div>
      </div>
      <div class="plug-actions">
        <a class="btn-card-ghost" href="plugin.html?id=${p.id}">
          View Details
        </a>
        <${buyTag} ${buyAttrs}>
          ${buyLabel}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </${buyTag}>
      </div>
    </article>
  `;
}

/* ── AMBIENT LAYER ──────────────────────────────────────── */
function injectAmbient() {
  const html = `
    <div class="ambient" aria-hidden="true">
      <div class="mesh"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <div class="cursor-glow" aria-hidden="true"></div>
    <div class="stars" id="ft-stars" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);

  // star field
  const el = document.getElementById('ft-stars');
  const count = window.innerWidth < 768 ? 50 : 90;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${(Math.random()*100).toFixed(2)}%;top:${(Math.random()*100).toFixed(2)}%;opacity:${(Math.random()*.45+.1).toFixed(2)};--dur:${(Math.random()*4+3).toFixed(1)}s;--del:${(Math.random()*5).toFixed(1)}s;`;
    frag.appendChild(s);
  }
  el.appendChild(frag);
}

/* ── NAVIGATION ─────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',        label: 'Home',        href: 'index.html' },
  { id: 'plugins',     label: 'Plugins',     href: 'plugins.html' },
  { id: 'marketplace', label: 'Marketplace', href: 'marketplace.html' },
  { id: 'about',       label: 'About',       href: 'about.html' },
  { id: 'contact',     label: 'Contact',     href: 'contact.html' }
];

function renderNav(activeId) {
  const links = NAV_ITEMS.map(n =>
    `<li><a href="${n.href}" class="${n.id === activeId ? 'active' : ''}">${n.label}</a></li>`
  ).join('');
  const mobLinks = NAV_ITEMS.map(n =>
    `<a href="${n.href}" class="${n.id === activeId ? 'active' : ''}" onclick="closeMobileNav()">${n.label}</a>`
  ).join('');

  const html = `
    <div class="nav-wrap">
      <nav class="glass-nav" id="ft-nav">
        <a href="index.html" class="nav-logo">
          <img src="frametheory-logo.png" alt="FrameTheory"/>
          <span class="nav-logo-text">FrameTheory</span>
        </a>
        <ul class="nav-links">${links}</ul>
        <a href="plugins.html" class="nav-cta nav-cta-desktop">
          Browse Plugins
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <button class="hamburger" id="ft-hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>
    <div class="mobile-nav" id="ft-mobile-nav" role="dialog" aria-label="Mobile navigation">
      ${mobLinks}
      <a href="plugins.html" class="mobile-cta" onclick="closeMobileNav()">Browse Plugins →</a>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);

  // mobile menu hooks
  const hb = document.getElementById('ft-hamburger');
  const mn = document.getElementById('ft-mobile-nav');
  hb.addEventListener('click', () => {
    const open = hb.classList.toggle('open');
    mn.classList.toggle('open', open);
    hb.setAttribute('aria-expanded', String(open));
  });
  window.closeMobileNav = () => {
    hb.classList.remove('open');
    mn.classList.remove('open');
    hb.setAttribute('aria-expanded', 'false');
  };
}

/* ── FOOTER ─────────────────────────────────────────────── */
function renderFooter() {
  const html = `
    <footer>
      <div class="wrap">
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="frametheory-logo.png" alt=""/>
            <span class="footer-name">FRAMETHEORY</span>
          </div>
          <span class="footer-copy">© ${new Date().getFullYear()} FrameTheory. All rights reserved.</span>
          <div class="footer-socials">
            <a href="https://www.youtube.com/@NexaMotionElite" target="_blank" rel="noopener" class="soc" aria-label="YouTube">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M13 4.4s-.1-.9-.5-1.3c-.5-.5-1.1-.5-1.4-.6C9.1 2.4 7.5 2.4 7.5 2.4S5.9 2.4 4.4 2.5c-.3 0-.9.1-1.4.6-.4.4-.5 1.3-.5 1.3S2.4 5.5 2.4 6.6v1c0 1.1.1 2.2.1 2.2s.1.9.5 1.3c.5.5 1.2.5 1.5.5 1.1.1 4.5.1 4.5.1s1.6 0 3.1-.1c.3 0 .9-.1 1.4-.6.4-.4.5-1.3.5-1.3s.1-1.1.1-2.2v-1c0-1.1-.1-2.2-.1-2.2zM6.1 8.7V4.7l3.9 2L6.1 8.7z"/></svg>
            </a>
            <a href="https://www.instagram.com/zhs.films/" target="_blank" rel="noopener" class="soc" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1.5" y="1.5" width="11" height="11" rx="3"/><circle cx="7" cy="7" r="2.7"/><circle cx="10.2" cy="3.8" r=".7" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="mailto:hello@frametheory.com" class="soc" aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="11" height="8" rx="1.5"/><path d="M2 4l5 4 5-4"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ── REVEAL OBSERVER ────────────────────────────────────── */
function initReveals() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── CURSOR GLOW ────────────────────────────────────────── */
function initCursorGlow() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;
  let tx = innerWidth/2, ty = innerHeight/2;
  let cx = tx, cy = ty;
  let raf;
  function loop() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    glow.style.setProperty('--mx', cx + 'px');
    glow.style.setProperty('--my', cy + 'px');
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      raf = requestAnimationFrame(loop);
    } else { raf = null; }
  }
  window.addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  });
}

/* ── SMOOTH SCROLL ──────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href.startsWith('#payhip')) return;
      const t = document.querySelector(href);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ── ANIMATED COUNTERS ──────────────────────────────────── */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      let start = 0;
      const dur = 1400;
      const t0 = performance.now();
      function step(now) {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = start + (target - start) * eased;
        el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)).toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ── PAGE BOOTSTRAP ─────────────────────────────────────── */
function initPage(activeNav) {
  injectAmbient();
  renderNav(activeNav);
  renderFooter();
  initReveals();
  initCursorGlow();
  initSmoothScroll();
  initCounters();

  // Trigger hero reveals on load (no scroll needed)
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal, .detail-hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('on'), i * 90);
      });
    }, 120);
  });
}

window.FT = {
  initPage,
  pluginCardHTML,
  pluginImageSrc,
  pluginImageFallback,
  hasPayhip
};
