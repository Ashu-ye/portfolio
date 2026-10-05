(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body, log = document.getElementById('log'), fill = document.getElementById('fill');
  var pct = document.getElementById('pct'), state = document.getElementById('state'), nm = document.getElementById('sp-name');
  var lines = ['<b>[ALERT]</b> unauthorized access attempt detected', '<b>[ALERT]</b> 3 hosts flagged, severity high',
    '[SIEM] correlating events...', '[IR] isolating affected host', '[IR] blocking source, rotating credentials',
    '<i>[OK]</i> threat contained, loading portfolio'];
  var done = false, timers = [];
  function later(f, t) { timers.push(setTimeout(f, t)); }
  function finish() {
    if (done) return; done = true; timers.forEach(clearTimeout);
    body.classList.add('leaving');
    later(function () {
      document.getElementById('splash').style.display = 'none';
      body.classList.remove('locked'); body.classList.add('open');
      document.dispatchEvent(new Event('splash:done'));
      later(function () { body.classList.remove('leaving', 'open'); }, 800);
    }, reduce ? 0 : 520);
  }
  document.getElementById('skip').onclick = finish;
  if (reduce) return finish();
  lines.forEach(function (l, i) { later(function () { log.innerHTML += l + '\n'; }, 300 + i * 430); });
  var p = 0, iv = setInterval(function () {
    p = Math.min(100, p + 1 + Math.random() * 3); fill.style.width = p + '%'; pct.textContent = Math.floor(p) + '%';
    if (p >= 100) { clearInterval(iv); state.textContent = 'Secured'; }
  }, 45);
  timers.push(iv);
  later(function () { nm.classList.add('on'); }, 1500);
  later(finish, 3700);
})();
