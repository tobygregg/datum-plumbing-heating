/* ============================================================
   Datum Plumbing & Heating Ltd. — site behaviour
   Sections: header · mobile menu · scroll reveal · nav highlight
             counters · hero parallax · plant-room hotspots
             gallery filter + lightbox · quote form
   ============================================================ */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Reduced motion: freeze SVG (SMIL) animation ---------- */
  if (reduceMotion) $$('svg').forEach((s) => { if (s.pauseAnimations) s.pauseAnimations(); });

  /* ---------- Header: solid + slimmer once you scroll ---------- */
  const header = $('#site-header');
  const inner = $('#header-inner');
  const onScroll = () => {
    const solid = window.scrollY > 40;
    header.classList.toggle('bg-navy-950/90', solid);
    header.classList.toggle('backdrop-blur-md', solid);
    header.classList.toggle('shadow-[0_10px_30px_-18px_rgba(0,0,0,.8)]', solid);
    inner.classList.toggle('!h-[60px]', solid);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menu-btn');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Active section in nav ---------- */
  const links = $$('[data-nav]');
  const sections = links.map((l) => document.getElementById(l.dataset.nav)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.dataset.nav === e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navIO.observe(s));
  }

  /* ---------- Counters (real numbers only) ---------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const to = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = to; return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 1200);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Hero: gentle scroll parallax ---------- */
  const heroImg = $('#hero-img');
  if (heroImg && !reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.translate = `0 ${y * 0.18}px`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Plant-room hotspots ---------- */
  const hsData = [
    ['Controls', 'Timers, zone controls and the distribution board that keep each part of the system running when it should.'],
    ['Circulation pumps', 'The green pumps move hot water round each heating loop, so every circuit gets its share.'],
    ['Manifold', 'The manifold splits the flow into separate circuits, the way underfloor heating loops are fed one by one.'],
    ['Boilers', 'Four floor-standing boilers in a row, each with its own flue.'],
    ['Expansion vessels', 'The orange vessels soak up the pressure as the water heats, so the system stays safe and steady.'],
    ['Hot water cylinder', 'A large unvented cylinder supplies mains-pressure hot water. A pressurised cylinder needs servicing once a year for the warranty, and sometimes for house insurance.'],
  ];
  const spots = $$('.hotspot');
  let hsIndex = 5;
  const showSpot = (i) => {
    hsIndex = (i + spots.length) % spots.length;
    spots.forEach((s, n) => s.setAttribute('aria-pressed', String(n === hsIndex)));
    const box = $('#hs-title').parentElement;
    $('#hs-num').textContent = hsIndex + 1;
    $('#hs-title').textContent = hsData[hsIndex][0];
    $('#hs-text').textContent = hsData[hsIndex][1];
    if (!reduceMotion) {
      box.animate([{ opacity: 0.2, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
    }
  };
  spots.forEach((s, i) => s.addEventListener('click', () => showSpot(i)));
  const hp = $('#hs-prev'), hn = $('#hs-next');
  if (hp) hp.addEventListener('click', () => showSpot(hsIndex - 1));
  if (hn) hn.addEventListener('click', () => showSpot(hsIndex + 1));

  /* ---------- "Ask about this" links pre-fill the form ---------- */
  const serviceSel = $('#f-service');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-service]');
    if (!a || !serviceSel) return;
    const opt = [...serviceSel.options].find((o) => o.text === a.dataset.service);
    if (opt) serviceSel.value = opt.value || opt.text;
  });

  /* ---------- Gallery: filter + show more ---------- */
  const tiles = $$('#grid .tile');
  const filters = $$('#filters .chip');
  const moreBtn = $('#more');
  const LIMIT = 12;
  let current = 'all';
  let expanded = false;
  const applyFilter = () => {
    const match = tiles.filter((t) => current === 'all' || t.dataset.cat === current);
    tiles.forEach((t) => t.classList.add('is-hidden'));
    match.forEach((t, i) => {
      const show = expanded || i < LIMIT;
      t.classList.toggle('is-hidden', !show);
      if (show) {
        t.classList.add('is-in');
        if (!reduceMotion) { t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop'); }
      }
    });
    const hidden = match.length - Math.min(match.length, expanded ? match.length : LIMIT);
    moreBtn.parentElement.hidden = hidden <= 0;
    $('#more-n').textContent = match.length;
  };
  filters.forEach((f) => f.addEventListener('click', () => {
    current = f.dataset.filter;
    expanded = false;
    filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
    applyFilter();
  }));
  moreBtn.addEventListener('click', () => { expanded = true; applyFilter(); });
  applyFilter();

  /* ---------- Lightbox ---------- */
  const lb = $('#lb');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  let list = [];
  let idx = 0;
  let opener = null;
  const visibleTiles = () => tiles.filter((t) => !t.classList.contains('is-hidden'));
  const show = (i) => {
    idx = (i + list.length) % list.length;
    const t = list[idx];
    const small = $('img', t);
    lbImg.style.opacity = '0';
    const next = new Image();
    next.onload = () => { lbImg.src = next.src; lbImg.alt = small.alt; lbImg.style.opacity = '1'; };
    next.src = t.getAttribute('href');
    lbCap.textContent = t.dataset.caption || small.alt;
    $('#lb-n').textContent = idx + 1;
    $('#lb-t').textContent = list.length;
  };
  const openLb = (tile) => {
    list = visibleTiles();
    opener = tile;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    show(list.indexOf(tile));
    $('#lb-close').focus();
  };
  const closeLb = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  };
  tiles.forEach((t) => t.addEventListener('click', (e) => { e.preventDefault(); openLb(t); }));
  $('#lb-close').addEventListener('click', closeLb);
  $('#lb-prev').addEventListener('click', () => show(idx - 1));
  $('#lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.id === 'lb-stage') closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'Tab') { // focus trap
      const f = $$('button', lb);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // swipe
  let sx = 0, sy = 0;
  const stage = $('#lb-stage');
  stage.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ---------- Quote form ---------- */
  const form = $('#quote-form');
  if (form) {
    const fields = $$('.field', form);
    const check = (f) => {
      const bad = !f.checkValidity() || (f.required && !f.value.trim());
      f.classList.toggle('is-bad', bad);
      f.setAttribute('aria-invalid', String(bad));
      return !bad;
    };
    fields.forEach((f) => {
      f.addEventListener('blur', () => check(f));
      f.addEventListener('input', () => { if (f.classList.contains('is-bad')) check(f); });
    });
    form.addEventListener('submit', (e) => {
      const ok = fields.map(check).every(Boolean);
      if (!ok) {
        e.preventDefault();
        const first = $('.is-bad', form);
        if (first) first.focus();
        return;
      }
      const btn = $('#f-submit');
      btn.disabled = true;
      $('.label', btn).classList.add('hidden');
      $('.sending', btn).classList.remove('hidden');
      $('.sending', btn).classList.add('inline-flex');
    });
  }
})();
