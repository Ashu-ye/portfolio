(function () {
   if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);
  var D = DATA, $ = function (id) { return document.getElementById(id); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }

  /* ---- render content from data.js ---- */
  $('status').textContent = D.status; $('lede').textContent = D.lede;
  $('contact-text').textContent = D.contact.text; $('footer').textContent = D.footer;
  $('resume-top').href = D.contact.resume;
  D.about.forEach(function (t) { $('about-text').appendChild(el('p', '', t)); });
  D.facts.forEach(function (f) { $('facts').appendChild(el('div', '', '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>')); });
  D.stats.forEach(function (s) { $('stats').appendChild(el('div', '', '<b data-n="' + s.n + '" data-d="' + (s.dec || 0) + '" data-s="' + s.suffix + '">0</b><span>' + s.label + '</span>')); });
  var tools = []; D.skills.forEach(function (g) { g.items.forEach(function (i) { if (tools.indexOf(i) < 0) tools.push(i); }); });
  $('marquee').innerHTML = tools.concat(tools).map(function (t) { return '<span>' + t + '</span>'; }).join('');
  D.skills.forEach(function (g) {
    $('skill-grid').appendChild(el('div', 'skill rv', '<h3>' + g.group + '</h3><div class="chips">' + g.items.map(function (i) { return '<span>' + i + '</span>'; }).join('') + '</div>'));
  });
  D.certs.forEach(function (c) { $('cert-grid').appendChild(el('div', 'cert rv', '<i>✓</i><div><b>' + c.name + '</b><span>' + c.by + '</span><span>' + c.meta + '</span></div>')); });
  D.projects.forEach(function (p) {
    $('cards').appendChild(el('article', 'card rv', '<div class="meta"><span class="sev ' + p.sev + '">Severity: ' + p.sev + '</span><span>' + p.result + '</span></div>' +
      '<h3>' + p.title + '</h3><p class="sum">' + p.summary + '</p><ul>' + p.points.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<div class="chips">' + p.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div>' +
      '<a class="go" href="' + p.url + '" target="_blank" rel="noopener">View on GitHub</a>')).dataset.type = p.type;
  });
  var c = D.contact, L = [['solid', 'mailto:' + c.email, 'Email me'], ['', c.linkedin, 'LinkedIn'], ['', c.github, 'GitHub'], ['', c.resume, 'Download resume'], ['', 'tel:' + c.phone.replace(/\s/g, ''), c.phone]];
  L.forEach(function (l) { var a = el('a', 'btn ' + l[0], l[2]); a.href = l[1]; if (l[1].indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; } $('links').appendChild(a); });

  /* ---- project filters ---- */
  var types = ['All'].concat(D.projects.map(function (p) { return p.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
  types.forEach(function (t, i) {
    var b = el('button', '', t); b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0);
    b.onclick = function () {
      document.querySelectorAll('#filters button').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      document.querySelectorAll('.card').forEach(function (cd) {
        var show = t === 'All' || cd.dataset.type === t; cd.classList.toggle('hide', !show);
        if (show) { cd.classList.remove('pop'); void cd.offsetWidth; cd.classList.add('pop'); }
      });
    };
    $('filters').appendChild(b);
  });

  /* ---- reveal, counters, progress ---- */
  var rv = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  rv.forEach(function (e, i) { e.querySelector && (e.style.setProperty('--d', (i % 3) * 90 + 'ms')); });
  function reveal() {
    rv = rv.filter(function (e) {
      if (e.getBoundingClientRect().top < innerHeight * 0.9) { e.classList.add('in'); return false; }
      return true;
    });
  }
  addEventListener('scroll', reveal, { passive: true }); addEventListener('resize', reveal); addEventListener('load', reveal); reveal();
  function count() {
    document.querySelectorAll('.stats b').forEach(function (b) {
      var n = +b.dataset.n, d = +b.dataset.d, s = b.dataset.s, t0 = performance.now();
      (function step(t) { var k = reduce ? 1 : Math.min(1, (t - t0) / 1400), v = n * (1 - Math.pow(1 - k, 3));
        b.textContent = v.toFixed(d) + s; if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }
  addEventListener('scroll', function () { var h = document.documentElement; $('progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });

  /* ---- card tilt + spotlight ---- */
  document.querySelectorAll('.card').forEach(function (cd) {
    cd.addEventListener('mousemove', function (e) {
      var r = cd.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      cd.style.setProperty('--mx', x + 'px'); cd.style.setProperty('--my', y + 'px');
      if (!reduce) cd.style.transform = 'perspective(900px) rotateX(' + ((y / r.height - .5) * -5) + 'deg) rotateY(' + ((x / r.width - .5) * 5) + 'deg)';
    });
    cd.addEventListener('mouseleave', function () { cd.style.transform = ''; });
  });

  /* ---- hero: decrypt name, typed roles, network canvas ---- */
  function startHero() {
    var e = $('name'), txt = 'Ashray Yenpreddiwar', ch = '01#%&@$<>/\\|';
    if (!reduce) { var f = 0, t = setInterval(function () {
      e.textContent = txt.split('').map(function (c, i) { return c === ' ' ? ' ' : (i < f / 1.5 ? c : ch[Math.floor(Math.random() * ch.length)]); }).join('');
      if (++f > txt.length * 1.5 + 2) { clearInterval(t); e.textContent = txt; } }, 40); }
    var ri = 0, ci = 0, del = false, r = $('role');
    (function tick() {
      var w = D.roles[ri]; r.textContent = w.slice(0, ci);
      if (!del && ci === w.length) { del = true; return setTimeout(tick, 1500); }
      if (del && ci === 0) { del = false; ri = (ri + 1) % D.roles.length; }
      ci += del ? -1 : 1; setTimeout(tick, del ? 30 : 70);
    })();
    count();
  }
  document.addEventListener('splash:done', startHero);

  var cv = $('net'), cx = cv.getContext('2d'), W, H, nodes = [], mx = -999, my = -999;
  function size() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; nodes = [];
    for (var i = 0, n = Math.min(60, Math.floor(W / 22)); i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 }); }
  size(); addEventListener('resize', size);
  document.addEventListener('mousemove', function (e) { var b = cv.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top;
    var g = $('glow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
  (function draw() {
    cx.clearRect(0, 0, W, H);
    nodes.forEach(function (a, i) {
      a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
      for (var j = i + 1; j < nodes.length; j++) { var b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { cx.strokeStyle = 'rgba(141,151,176,' + (.28 * (1 - d / 130)) + ')'; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); } }
      var dm = Math.hypot(a.x - mx, a.y - my), hot = dm < 150;
      if (hot) { cx.strokeStyle = 'rgba(255,46,59,' + (.8 * (1 - dm / 150)) + ')'; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mx, my); cx.stroke(); }
      cx.fillStyle = hot ? '#ff2e3b' : 'rgba(141,151,176,.7)'; cx.beginPath(); cx.arc(a.x, a.y, hot ? 3 : 2, 0, 7); cx.fill();
    });
    if (!reduce) requestAnimationFrame(draw);
  })();
})();
