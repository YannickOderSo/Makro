/* Bühne und Zeitsteuerung des Erklärvideos.
 *
 * Jede Szene registriert sich mit V.scene(id, ctx => {...}) und baut ihr Bild plus eine GSAP-Timeline.
 * Die Zeitmarken kommen aus der Sprachaufnahme: ctx.T('Textstelle') liefert die Sekunde (ab Szenenbeginn),
 * in der diese Stelle gesprochen wird. window.seek(t) stellt das gesamte Video auf die Zeit t.
 */
(function () {
  const TIMING = window.TIMING;
  const builders = {};
  const V = (window.V = {});
  const NS = 'http://www.w3.org/2000/svg';

  V.C = {
    bg: '#f1f5f4', panel: '#fafcfb', ink: '#15223a', mute: '#566779', line: '#c3d0d0', soft: '#e6eeec',
    grid: '#d9e6e2', c1: '#1c4bcf', c2: '#c5263f', c3: '#0a765d', c4: '#b86e00', old: '#8d9aa8',
    c1bg: '#e3eafb', c2bg: '#f9e4e7', c3bg: '#e2f1ea', c4bg: '#f6ecd9',
  };

  V.scene = (id, fn) => { builders[id] = fn; };

  /* ---------- kleine DOM-Helfer ---------- */
  V.el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  V.S = (tag, attrs = {}, text) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  };
  // Zahl im deutschen Format: 1.234,5 und echtes Minuszeichen
  V.fmt = (v, dec = 0, tsep = true) => {
    const neg = v < 0 || Object.is(v, -0) ? (Math.abs(v) < 0.5 * Math.pow(10, -dec) ? '' : '−') : '';
    let [i, f] = Math.abs(v).toFixed(dec).split('.');
    if (tsep) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return neg + i + (f ? ',' + f : '');
  };
  V.frac = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;

  // Pfeil als Gruppe aus Pfad + eigener Spitze (damit er sich mit ctx.drawArrow sauber zeichnen lässt).
  // d = SVG-Pfad in Pixelkoordinaten des übergebenen <svg>; o: {cls:'c1', w:6, head:24, dash:'14 10'}
  V.arrow = (svg, d, o = {}) => {
    const cls = o.cls ?? 'ink', g = V.S('g', { class: 'arr' });
    const p = V.S('path', { d, class: 'arrow ' + cls, 'stroke-width': o.w ?? 6, 'stroke-dasharray': o.dash ?? null });
    g.appendChild(p); svg.appendChild(g);
    const L = p.getTotalLength(), a = p.getPointAtLength(L), b = p.getPointAtLength(Math.max(0, L - 4));
    const ang = (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI, hs = o.head ?? 24;
    const hg = V.S('g', { transform: `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})` });
    const head = V.S('path', { d: `M${hs * 0.45} 0L${-hs * 0.75} ${hs * 0.6}L${-hs * 0.75} ${-hs * 0.6}Z`, class: 'f-' + cls });
    hg.appendChild(head); g.appendChild(hg);
    g._path = p; g._head = head;
    return g;
  };

  // Liste „So zeichnest du es“: V.steps(['Achsen: r nach oben, Y nach rechts', ['Kurve', 'kleiner Zusatz'], …], {title})
  V.steps = (items, o = {}) => `<div class="todo ${o.cls || ''}"><span class="lab">${o.title ?? 'So zeichnest du es'}</span><ol>${items.map((it, i) => { const [a, b] = Array.isArray(it) ? it : [it]; return `<li><span class="n">${i + 1}</span><span>${a}${b ? `<small>${b}</small>` : ''}</span></li>`; }).join('')}</ol></div>`;

  /* ---------- Diagramm-Helfer (SVG, Datenkoordinaten) ---------- */
  V.plot = o => {
    const pad = Object.assign({ l: 100, r: 60, t: 40, b: 90 }, o.pad || {});
    const { w, h } = o, [x0, x1] = o.x, [y0, y1] = o.y;
    const X = v => pad.l + ((v - x0) / (x1 - x0)) * (w - pad.l - pad.r);
    const Y = v => h - pad.b - ((v - y0) / (y1 - y0)) * (h - pad.t - pad.b);
    const svg = V.S('svg', { viewBox: `0 0 ${w} ${h}`, width: w, height: h, class: 'plot' });
    const P = { el: svg, X, Y, w, h, pad, x0, x1, y0, y1 };
    P.add = (tag, attrs, text, parent) => { const e = V.S(tag, attrs, text); (parent || svg).appendChild(e); return e; };
    P.g = (attrs = {}) => P.add('g', attrs);
    // Achsen mit Pfeilspitzen; xt/yt = [[wert, 'Beschriftung'], ...]
    P.axes = ({ xl = '', yl = '', xt = [], yt = [] } = {}) => {
      const g = P.g({ class: 'axes' });
      P.add('line', { x1: X(x0), y1: Y(y0), x2: w - pad.r + 34, y2: Y(y0), class: 'ax', 'marker-end': 'url(#ah-ink)' }, null, g);
      P.add('line', { x1: X(x0), y1: Y(y0), x2: X(x0), y2: pad.t - 34, class: 'ax', 'marker-end': 'url(#ah-ink)' }, null, g);
      if (xl) P.add('text', { x: w - pad.r + 30, y: Y(y0) + 52, class: 'axl', 'text-anchor': 'end' }, xl, g);
      if (yl) P.add('text', { x: X(x0) - 26, y: pad.t - 14, class: 'axl', 'text-anchor': 'end' }, yl, g);
      for (const [v, l] of xt) {
        P.add('line', { x1: X(v), y1: Y(y0), x2: X(v), y2: Y(y0) + 12, class: 'tick' }, null, g);
        P.add('text', { x: X(v), y: Y(y0) + 48, class: 'tickl', 'text-anchor': 'middle' }, l ?? V.fmt(v), g);
      }
      for (const [v, l] of yt) {
        P.add('line', { x1: X(x0) - 12, y1: Y(v), x2: X(x0), y2: Y(v), class: 'tick' }, null, g);
        P.add('text', { x: X(x0) - 22, y: Y(v) + 10, class: 'tickl', 'text-anchor': 'end' }, l ?? V.fmt(v), g);
      }
      return g;
    };
    P.d = (f, from = x0, to = x1, n = 96) => {
      let d = '';
      for (let i = 0; i <= n; i++) { const x = from + ((to - from) * i) / n; d += (i ? 'L' : 'M') + X(x).toFixed(2) + ' ' + Y(f(x)).toFixed(2); }
      return d;
    };
    P.fn = (f, { from = x0, to = x1, n = 96, cls = 'c1', parent } = {}) => P.add('path', { d: P.d(f, from, to, n), class: 'curve ' + cls }, null, parent);
    P.line = (xa, ya, xb, yb, { cls = 'c1', parent, arrow } = {}) =>
      P.add('line', { x1: X(xa), y1: Y(ya), x2: X(xb), y2: Y(yb), class: 'curve ' + cls, 'marker-end': arrow ? `url(#ah-${arrow})` : null }, null, parent);
    P.dot = (x, y, { cls = 'ink', r = 11, parent } = {}) => P.add('circle', { cx: X(x), cy: Y(y), r, class: 'pt ' + cls }, null, parent);
    P.text = (x, y, str, { cls = '', dx = 0, dy = 0, anchor = 'middle', parent } = {}) =>
      P.add('text', { x: X(x) + dx, y: Y(y) + dy, class: 'lbl ' + cls, 'text-anchor': anchor }, str, parent);
    // gestrichelte Hilfslinien vom Punkt zu beiden Achsen (zwei <line>, mit ctx.extend animierbar)
    P.guide = (x, y, { cls = '', parent } = {}) => {
      const g = P.add('g', { class: 'guide ' + cls }, null, parent);
      const v = P.add('line', { x1: X(x), y1: Y(y), x2: X(x), y2: Y(y0), class: 'dash' }, null, g);
      const hl = P.add('line', { x1: X(x), y1: Y(y), x2: X(x0), y2: Y(y), class: 'dash' }, null, g);
      g._lines = [v, hl];
      return g;
    };
    return P;
  };

  /* ---------- Kontext, den jede Szene bekommt ---------- */
  function makeCtx(sc, root, tl) {
    const ctx = { id: sc.id, el: root, tl, dur: sc.dur, audioAt: sc.audioAt, audioEnd: sc.audioAt + sc.audioDur };
    const idxOf = (phrase, n = 1) => {
      let i = -1;
      for (let k = 0; k < n; k++) { i = sc.chars.indexOf(phrase, i + 1); if (i < 0) throw new Error(`[${sc.id}] Textstelle nicht gefunden (${k + 1}. Vorkommen): "${phrase}"`); }
      return i;
    };
    // Sekunde (ab Szenenbeginn), in der die Textstelle beginnt bzw. endet
    ctx.T = (phrase, o = {}) => sc.audioAt + sc.starts[idxOf(phrase, o.n)] + (o.off || 0);
    ctx.Te = (phrase, o = {}) => sc.audioAt + sc.ends[idxOf(phrase, o.n) + phrase.length - 1] + (o.off || 0);

    ctx.$ = s => { const e = root.querySelector(s); if (!e) throw new Error(`[${sc.id}] Element fehlt: ${s}`); return e; };
    ctx.$$ = s => [...root.querySelectorAll(s)];
    const els = t => (typeof t === 'string' ? ctx.$$(t) : t instanceof Element ? [t] : [...t]);
    ctx.html = str => { const b = root.querySelector('.body'); b.innerHTML = str; return b; };
    ctx.body = () => root.querySelector('.body');

    ctx.header = ({ kicker, title, src, at = 0.15 }) => {
      const hd = V.el(`<header class="hd"><div class="hd-l"><span class="kick">${kicker}</span><h1>${title}</h1></div>${src ? `<div class="stamp">${src}</div>` : ''}</header>`);
      root.insertBefore(hd, root.firstChild);
      ctx.show(hd.querySelector('.kick'), at, { x: -30, y: 0 });
      ctx.show(hd.querySelector('h1'), at + 0.12, { y: 26 });
      if (src) {
        gsap.set(hd.querySelector('.stamp'), { autoAlpha: 0, scale: 1.5, rotation: -8 });
        tl.to(hd.querySelector('.stamp'), { autoAlpha: 1, scale: 1, rotation: -2.2, duration: 0.35, ease: 'power3.in' }, at + 0.55);
      }
      return hd;
    };

    // einblenden (mit leichtem Versatz); o.stagger für Listen
    ctx.show = (target, at, o = {}) => {
      const e = els(target);
      const from = { autoAlpha: 0, x: o.x ?? 0, y: o.y ?? 22, scale: o.scale ?? 1 };
      gsap.set(e, from);
      tl.to(e, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: o.dur ?? 0.5, ease: o.ease ?? 'power3.out', stagger: o.stagger ?? 0 }, at);
      return ctx;
    };
    ctx.pop = (target, at, o = {}) => ctx.show(target, at, Object.assign({ y: 0, scale: 0.55, ease: 'back.out(1.8)', dur: 0.45 }, o));
    ctx.hide = (target, at, o = {}) => { tl.to(els(target), { autoAlpha: 0, y: o.y ?? 0, duration: o.dur ?? 0.35, ease: 'power2.in', stagger: o.stagger ?? 0 }, at); return ctx; };
    ctx.dim = (target, at, o = {}) => { tl.to(els(target), { opacity: o.to ?? 0.28, duration: o.dur ?? 0.4, ease: 'power2.out' }, at); return ctx; };
    ctx.undim = (target, at, o = {}) => { tl.to(els(target), { opacity: 1, duration: o.dur ?? 0.4, ease: 'power2.out' }, at); return ctx; };
    ctx.to = (target, vars, at) => { tl.to(els(target), vars, at); return ctx; };
    ctx.set = (target, vars, at) => { tl.set(els(target), vars, at); return ctx; };

    // durchgezogene Linie/Kurve zeichnen (stroke). Nicht für gestrichelte Linien – dafür extend/wipe.
    ctx.draw = (target, at, dur = 0.9, o = {}) => {
      for (const e of els(target)) {
        const L = e.getTotalLength() + 2;
        gsap.set(e, { strokeDasharray: L, strokeDashoffset: L, autoAlpha: 0 });
        tl.set(e, { autoAlpha: 1 }, at);
        tl.to(e, { strokeDashoffset: 0, duration: dur, ease: o.ease ?? 'power2.inOut' }, at);
      }
      return ctx;
    };
    // <line> vom Startpunkt aus wachsen lassen (funktioniert auch gestrichelt und mit Pfeilspitze)
    ctx.extend = (target, at, dur = 0.6, o = {}) => {
      for (const e of els(target)) {
        const x2 = e.getAttribute('x2'), y2 = e.getAttribute('y2');
        gsap.set(e, { attr: { x2: e.getAttribute('x1'), y2: e.getAttribute('y1') }, autoAlpha: 0 });
        tl.set(e, { autoAlpha: 1 }, at);
        tl.to(e, { attr: { x2, y2 }, duration: dur, ease: o.ease ?? 'power2.out' }, at);
      }
      return ctx;
    };
    // von einer Seite her aufdecken (clip-path); dir: 'right' | 'left' | 'down' | 'up'
    ctx.wipe = (target, at, o = {}) => {
      const dir = o.dir ?? 'right', m = -(o.margin ?? 40);
      const from = { right: `inset(${m}px 100% ${m}px ${m}px)`, left: `inset(${m}px ${m}px ${m}px 100%)`, down: `inset(${m}px ${m}px 100% ${m}px)`, up: `inset(100% ${m}px ${m}px ${m}px)` }[dir];
      const e = els(target);
      gsap.set(e, { clipPath: from, autoAlpha: 1 });
      tl.to(e, { clipPath: `inset(${m}px ${m}px ${m}px ${m}px)`, duration: o.dur ?? 0.7, ease: o.ease ?? 'power2.inOut', stagger: o.stagger ?? 0 }, at);
      return ctx;
    };
    // Pfeil aus V.arrow(): Linie zeichnen, Spitze am Ende einblenden
    ctx.drawArrow = (target, at, dur = 0.7, o = {}) => {
      for (const g of els(target)) {
        gsap.set(g, { autoAlpha: 1 });
        ctx.draw(g._path, at, dur, o);
        gsap.set(g._head, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' });
        tl.to(g._head, { autoAlpha: 1, scale: 1, duration: 0.22, ease: 'back.out(2)' }, at + dur * 0.82);
      }
      return ctx;
    };
    // Linie/Kurve „mit dem Bleistift“ zeichnen: der Stift fährt an der Spitze der entstehenden Linie mit.
    // Durchgezogene Linien werden gezeichnet (draw), gestrichelte (.dash) wachsen (extend). o: {ease, hold, extend}
    ctx.pen = (target, at, dur = 1, o = {}) => {
      for (const e of els(target)) {
        const L = e.getTotalLength(), N = 120, pts = [];
        for (let i = 0; i <= N; i++) { const q = e.getPointAtLength((L * i) / N); pts.push([q.x, q.y]); }
        const pen = V.S('g', { class: 'pen' });
        pen.innerHTML = '<g transform="rotate(35)"><path d="M0 0L-9 -22L9 -22Z" fill="#f2d7a8" stroke="#15223a" stroke-width="3" stroke-linejoin="round"/><path d="M0 0L-3.4 -8.4L3.4 -8.4Z" fill="#15223a"/><rect x="-9" y="-92" width="18" height="70" fill="#f0b429" stroke="#15223a" stroke-width="3"/><rect x="-9" y="-106" width="18" height="14" fill="#c5263f" stroke="#15223a" stroke-width="3"/></g>';
        e.parentNode.appendChild(pen);
        gsap.set(pen, { autoAlpha: 0 });
        const ease = o.ease ?? 'power1.inOut';
        if (o.extend || e.classList.contains('dash')) ctx.extend(e, at, dur, { ease }); else ctx.draw(e, at, dur, { ease });
        const st = { p: 0 };
        const put = () => { const f = st.p * N, i = Math.min(N - 1, Math.floor(f)), u = f - i; gsap.set(pen, { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u }); };
        put();
        tl.to(pen, { autoAlpha: 1, duration: 0.15 }, Math.max(0, at - 0.15));
        tl.to(st, { p: 1, duration: dur, ease, onUpdate: put }, at);
        tl.to(pen, { autoAlpha: 0, duration: 0.2 }, at + dur + (o.hold ?? 0.15));
      }
      return ctx;
    };
    // Zeichenschritte (Markup aus V.steps): zum Zeitpunkt times[i] wird Schritt i aktiv, der vorige gilt als erledigt.
    ctx.stepsRun = (root, times, o = {}) => {
      const li = [...(typeof root === 'string' ? ctx.$(root) : root).querySelectorAll('li')];
      gsap.set(li, { opacity: 0.3 });
      times.forEach((t, i) => {
        if (t == null) return;
        tl.to(li[i], { opacity: 1, backgroundColor: V.C.c4bg, borderColor: V.C.c4, duration: 0.3 }, t);
        if (i > 0) { tl.to(li[i - 1], { backgroundColor: 'rgba(246,236,217,0)', borderColor: 'rgba(184,110,0,0)', duration: 0.3 }, t); tl.to(li[i - 1].querySelector('.n'), { backgroundColor: V.C.c3, duration: 0.3 }, t); }
      });
      if (o.end != null) { const k = times.length - 1; tl.to(li[k], { backgroundColor: 'rgba(246,236,217,0)', borderColor: 'rgba(184,110,0,0)', duration: 0.3 }, o.end); tl.to(li[k].querySelector('.n'), { backgroundColor: V.C.c3, duration: 0.3 }, o.end); }
      return ctx;
    };
    // Element entlang eines SVG-Pfads bewegen (x/y = Pfadkoordinaten). o: {from, to, ease, repeat, dx, dy}
    ctx.along = (target, path, at, dur, o = {}) => {
      const L = path.getTotalLength(), st = { p: o.from ?? 0 }, e = els(target);
      const put = () => { const pt = path.getPointAtLength(st.p * L); gsap.set(e, { x: pt.x + (o.dx ?? 0), y: pt.y + (o.dy ?? 0) }); };
      put();
      tl.to(st, { p: o.to ?? 1, duration: dur, ease: o.ease ?? 'power1.inOut', repeat: o.repeat ?? 0, onUpdate: put }, at);
      return ctx;
    };
    // „fließende“ Strichelung auf einer Linie (für Geld- und Güterströme). Linie braucht stroke-dasharray.
    ctx.flow = (target, at, dur, o = {}) => {
      tl.fromTo(els(target), { strokeDashoffset: 0 }, { strokeDashoffset: -(o.speed ?? 60) * dur, duration: dur, ease: 'none', immediateRender: false }, at);
      return ctx;
    };
    // Zahl hochzählen. o: {from, dur, dec, pre, suf, tsep}
    ctx.count = (target, to, at, o = {}) => {
      for (const e of els(target)) {
        const st = { v: o.from ?? 0 };
        const put = () => { e.textContent = (o.pre ?? '') + V.fmt(st.v, o.dec ?? 0, o.tsep ?? true) + (o.suf ?? ''); };
        put();
        tl.to(st, { v: to, duration: o.dur ?? 0.8, ease: o.ease ?? 'power2.out', onUpdate: put }, at);
      }
      return ctx;
    };
    // kurz betonen (aufpumpen und zurück)
    ctx.pulse = (target, at, o = {}) => {
      tl.to(els(target), { scale: o.scale ?? 1.14, duration: 0.18, ease: 'power2.out', transformOrigin: o.origin ?? '50% 50%' }, at);
      tl.to(els(target), { scale: 1, duration: 0.4, ease: 'power2.inOut' }, at + 0.18);
      return ctx;
    };
    // Farben umfärben, z. B. ctx.tint(el, t, {backgroundColor: V.C.c3bg, borderColor: V.C.c3})
    ctx.tint = (target, at, vars, dur = 0.35) => { tl.to(els(target), Object.assign({ duration: dur, ease: 'power2.out' }, vars), at); return ctx; };
    // Textinhalt zu einem Zeitpunkt austauschen (weich überblendet)
    ctx.swap = (target, html, at) => {
      for (const e of els(target)) {
        const a = V.el(`<span class="swap-a">${e.innerHTML}</span>`), b = V.el(`<span class="swap-b">${html}</span>`);
        e.innerHTML = ''; e.classList.add('swap'); e.append(a, b);
        gsap.set(b, { autoAlpha: 0 });
        tl.to(a, { autoAlpha: 0, duration: 0.25 }, at);
        tl.to(b, { autoAlpha: 1, duration: 0.3 }, at + 0.15);
      }
      return ctx;
    };
    return ctx;
  }

  /* ---------- Aufbau ---------- */
  let master, chrome;
  V.boot = async () => {
    await Promise.all(['400', '600', '800', '900'].map(w => document.fonts.load(`${w} 40px "Schibsted Grotesk"`))
      .concat(['400', '500', '700', '800'].map(w => document.fonts.load(`${w} 40px "JetBrains Mono"`, 'Δπ→√'))));
    await document.fonts.ready;
    const stage = document.getElementById('stage');
    master = gsap.timeline({ paused: true });
    const only = new URLSearchParams(location.search).get('only'); // nur diese Szenen bauen (schneller beim Entwickeln)
    const onlySet = only ? new Set(only.split(',')) : null;
    for (const sc of TIMING.scenes) {
      const root = V.el(`<section class="scene" id="sc-${sc.id}"><div class="body"></div></section>`);
      stage.appendChild(root);
      const tl = gsap.timeline();
      const ctx = makeCtx(sc, root, tl);
      if (builders[sc.id] && (!onlySet || onlySet.has(sc.id))) builders[sc.id](ctx);
      else { ctx.header({ kicker: 'Platzhalter', title: sc.label }); }
      // leeres Tween, damit die Szenen-Timeline exakt die Szenenlänge hat
      tl.to({}, { duration: 0.001 }, sc.dur - 0.001);
      gsap.set(root, { autoAlpha: 0 });
      master.to(root, { autoAlpha: 1, duration: sc.start === 0 ? 0.01 : 0.4, ease: 'power1.out' }, sc.start);
      const last = sc === TIMING.scenes[TIMING.scenes.length - 1];
      master.to(root, { autoAlpha: 0, duration: last ? 0.8 : 0.35, ease: 'power1.in' }, sc.start + sc.dur - (last ? 0.8 : 0.35));
      master.add(tl, sc.start);
    }
    buildChrome(stage);
    window.TOTAL = TIMING.total;
    window.seek(0);
    document.documentElement.classList.add('ready');
  };

  /* ---------- Fortschrittsleiste unten ---------- */
  function buildChrome(stage) {
    // Abschnitte der Fortschrittsleiste: TIMING.sections = Beschriftungen, Szenenfeld sec = Abschnittsnummer (0 = keiner)
    const tasks = [];
    (TIMING.sections || []).forEach((label, i) => {
      const ss = TIMING.scenes.filter(s => s.sec === i + 1);
      if (ss.length) tasks.push({ k: label, from: ss[0].start, to: ss[ss.length - 1].start + ss[ss.length - 1].dur });
    });
    chrome = V.el(`<footer class="chrome"><span class="brand">${TIMING.brand || 'MAKRO'}</span><div class="segs">${tasks.map(t => `<div class="seg" style="flex:${(t.to - t.from).toFixed(2)}"><i></i><b>${t.k}</b></div>`).join('')}</div><span class="clock"></span></footer>`);
    stage.appendChild(chrome);
    chrome._tasks = tasks;
    chrome._fills = [...chrome.querySelectorAll('.seg i')];
    chrome._segs = [...chrome.querySelectorAll('.seg')];
    chrome._clock = chrome.querySelector('.clock');
    const dbg = new URLSearchParams(location.search).has('debug');
    if (dbg) { chrome._dbg = V.el('<div class="debug"></div>'); stage.appendChild(chrome._dbg); }
  }
  const mmss = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  function updateChrome(t) {
    chrome._tasks.forEach((tk, i) => {
      const f = Math.max(0, Math.min(1, (t - tk.from) / (tk.to - tk.from)));
      chrome._fills[i].style.transform = `scaleX(${f.toFixed(4)})`;
      chrome._segs[i].className = 'seg' + (f >= 1 ? ' done' : f > 0 ? ' on' : '');
    });
    chrome._clock.textContent = `${mmss(t)} / ${mmss(TIMING.total)}`;
    if (chrome._dbg) {
      const sc = TIMING.scenes.find(s => t >= s.start && t < s.start + s.dur) || TIMING.scenes[TIMING.scenes.length - 1];
      const lt = t - sc.start, at = lt - sc.audioAt;
      let i = sc.starts.findIndex(x => x > at); if (i < 0) i = sc.chars.length;
      chrome._dbg.textContent = `${sc.id} +${lt.toFixed(2)}s  │ …${sc.chars.slice(Math.max(0, i - 46), i).replace(/\n/g, ' ')}▮${sc.chars.slice(i, i + 26).replace(/\n/g, ' ')}`;
    }
  }

  window.seek = t => {
    t = Math.max(0, Math.min(TIMING.total, t));
    master.time(t, false);
    updateChrome(t);
    return t;
  };
  // Vorschau im Browser: index.html?play=1 (optional &t=120 als Startzeit)
  V.play = (from = 0) => {
    const t0 = performance.now();
    const step = () => { const t = from + (performance.now() - t0) / 1000; window.seek(t); if (t < TIMING.total) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
})();
