/* Roofex — minimal, dependency-free front-end behaviour.
   Everything here is progressive enhancement: with JS disabled the site is
   fully visible, fully navigable and fully crawlable. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('primaryNav');
  var toggle = document.getElementById('navToggle');
  var closeBtn = document.getElementById('navClose');
  var toTop = document.getElementById('toTop');

  /* ---------------- Sticky / compact header ---------------- */
  if (header) {
    var onScrollHeader = function () {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 8);
      header.classList.toggle('is-scrolled', y > 120);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  /* ---------------- Mobile drawer ---------------- */
  if (nav && toggle) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open && closeBtn) {
        closeBtn.focus({ preventScroll: true });
      } else if (!open) {
        toggle.focus({ preventScroll: true });
        collapseServices();
      }
    };

    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () { setNav(false); });
    }

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setNav(false);
    });
  }

  /* ---------------- Services accordion (drawer) ---------------- */
  function collapseServices() {
    document.querySelectorAll('.nav__sub-toggle').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.dropdown.is-open').forEach(function (m) {
      m.classList.remove('is-open');
    });
  }

  document.querySelectorAll('.nav__sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var item = btn.closest('.nav__item--has-menu');
      var menu = item && item.querySelector('.dropdown');
      if (!menu) return;
      var open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------------- Back to top ---------------- */
  if (toTop) {
    var onScrollTop = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    onScrollTop();
    window.addEventListener('scroll', onScrollTop, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var reveals = document.querySelectorAll('.reveal');

  // Stagger siblings inside common containers for a cascading effect.
  document.querySelectorAll('.grid, .steps, .stats, .area-list, .mini-grid').forEach(function (group) {
    var kids = group.querySelectorAll(':scope > .reveal');
    for (var i = 0; i < kids.length; i++) {
      kids[i].style.setProperty('--d', Math.min(i * 70, 420) + 'ms');
    }
  });

  if (!reveals.length) {
    /* nothing to do */
  } else if (!('IntersectionObserver' in window) || reduceMotion) {
    for (var r = 0; r < reveals.length; r++) {
      reveals[r].classList.add('is-visible', 'is-done');
    }
    runCounters();
  } else {
    // Drop the animation once it has played so animation-fill-mode stops
    // overriding the element's own hover transforms.
    var settle = function (el) {
      el.classList.add('is-done');
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (!entry.isIntersecting) return;
        el.classList.add('is-visible');
        io.unobserve(el);

        el.addEventListener('animationend', function onEnd(e) {
          if (e.target !== el) return;
          el.removeEventListener('animationend', onEnd);
          settle(el);
        });
        // Safety net in case animationend never fires.
        setTimeout(function () { settle(el); }, 1700);

        if (el.hasAttribute('data-count-group')) runCounters(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    for (var j = 0; j < reveals.length; j++) io.observe(reveals[j]);
  }

  /* ---------------- Animated stat counters ---------------- */
  function runCounters(scope) {
    var nodes = (scope || document).querySelectorAll('[data-count]');
    for (var i = 0; i < nodes.length; i++) animateCount(nodes[i]);
  }

  function animateCount(el) {
    if (el.dataset.counted === '1') return;
    el.dataset.counted = '1';

    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = target.toLocaleString('en-US') + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    var step = function (ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo for a snappy finish
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.round(target * eased);
      el.textContent = current.toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Contact form: light client-side guard ---------------- */
  document.querySelectorAll('form.form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var invalid = false;
      form.querySelectorAll('[required]').forEach(function (field) {
        var empty = !field.value.trim();
        var badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) {
          invalid = true;
          field.style.borderColor = '#FF6B00';
        } else {
          field.style.borderColor = '';
        }
      });
      if (invalid) {
        e.preventDefault();
        var first = form.querySelector('[required]:invalid, [required]');
        if (first) first.focus();
      }
    });
    form.querySelectorAll('.form__input').forEach(function (field) {
      field.addEventListener('input', function () { field.style.borderColor = ''; });
    });
  });
})();
