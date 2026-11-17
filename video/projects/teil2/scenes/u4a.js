// Gemeinsames IS/LM-Diagramm für Übung 4 (u4a–u4e), maßstabsgetreu:
// r von 0 bis 8 nach oben, Y von 0 bis 2000 nach rechts. IS: Y = 1700 − 100 r, LM: Y = 500 + 100 r.
// V.t2u4.make(host) baut Blatt und Achsen, V.t2u4.base(D) die Ausgangslage; die Szene entscheidet, was wann erscheint.
V.t2u4 = {
  sub: (a, b) => `${a}<tspan dy="9" style="font-size:25px">${b}</tspan>`,
  // gemeinsames, auf die Szene begrenztes CSS (rechte Spalte; die top-Werte setzt layout())
  css: id => `
    #sc-${id} .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-${id} .side{left:1046px;top:0;width:682px}
    #sc-${id} .rc{left:1046px;width:682px}
    #sc-${id} .calc{padding:12px 22px 14px}
    #sc-${id} .calc .eq{font-size:33px;font-weight:700;line-height:1.5}
    #sc-${id} .calc .eq small{font-family:var(--sans);font-size:26px;font-weight:500;color:var(--mute)}
    #sc-${id} .wt table{width:100%;font-size:35px;box-shadow:8px 8px 0 var(--line)}
    #sc-${id} .wt th{font-size:26px;padding:8px 20px;text-align:right;letter-spacing:.02em;text-transform:none}
    #sc-${id} .wt th:first-child{text-align:left}
    #sc-${id} .wt td{padding:9px 20px;font-weight:700;height:64px}
    #sc-${id} .wt td.n span{display:inline-block}
    #sc-${id} .wt .rn{font-family:var(--mono);font-weight:800}
    #sc-${id} .lupe{left:1046px;width:330px;padding:10px 0 0}
    #sc-${id} .lupe .lab{margin:0 0 2px 14px}
    #sc-${id} .rbox{left:1390px;width:338px;padding:14px 20px 16px}
    #sc-${id} .rbox .eq{font-size:46px;font-weight:800;line-height:1.3}
    #sc-${id} .rbox p{margin:10px 0 0;font-size:27px;line-height:1.26;font-weight:500}
    #sc-${id} .rbox .chip{font-size:26px;margin-top:8px;white-space:normal}`,
  // rechte Spalte von oben nach unten stapeln: layout(ctx, ['#side', '#calc', ['#lupe', '#rbox']]); Array = nebeneinander, füllt bis unten
  layout(ctx, items, gap = 12) {
    let top = 0;
    for (const it of items) {
      if (Array.isArray(it)) { for (const s of it) { const e = ctx.$(s); e.style.top = top + 'px'; e.style.height = 770 - top + 'px'; } continue; }
      const e = ctx.$(it); e.style.top = top + 'px'; top += e.offsetHeight + gap;
    }
    return top;
  },

  make(host) {
    const P = V.plot({ w: 1000, h: 764, x: [0, 2100], y: [0, 9], pad: { l: 150, r: 96, t: 66, b: 132 } });
    P.el.classList.add('big'); host.appendChild(P.el);
    const X = P.X, Y = P.Y, x0 = X(0), y0 = Y(0);
    const ax = P.axes({ xl: 'Y', yl: 'r', xt: [500, 1000, 1500, 2000].map(v => [v, String(v)]), yt: [2, 4, 6, 8].map(v => [v, String(v)]) });
    const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
    const tk = [...ax.querySelectorAll('line.tick')], tx = [...ax.querySelectorAll('text.tickl')];
    const xticks = [], yticks = [];
    for (let i = 0; i < 4; i++) xticks.push([tk[i], tx[i]]);
    // r-Achse: Teilstriche bei jeder ganzen Zahl, beschriftet sind 2, 4, 6, 8
    const lab = { 2: 0, 4: 1, 6: 2, 8: 3 };
    for (let v = 1; v <= 8; v++) yticks.push(v % 2 ? [P.add('line', { x1: x0 - 8, y1: Y(v), x2: x0, y2: Y(v), class: 'tick' }, null, ax)] : [tk[4 + lab[v]], tx[4 + lab[v]]]);
    const zero = P.add('text', { x: x0 - 20, y: y0 + 40, class: 'tickl', 'text-anchor': 'end' }, '0', ax);
    const mLine = P.g(), gRuler = P.g(), gDot = P.g(), gLabel = P.g();
    const D = { P, X, Y, ax, xAxis, yAxis, xl, yl, xticks, yticks, zero, t6: tx[6], gLabel };
    // Gerade durch zwei Punkte (Y | r); liegt über den Hilfslinien, unter Punkten und Schrift
    D.line = (xa, ya, xb, yb, cls) => { const e = P.line(xa, ya, xb, yb, { cls }); P.el.insertBefore(e, gRuler); return e; };
    D.dot = (x, y, cls, r = 9) => { const e = P.dot(x, y, { cls, r, parent: gDot }); gsap.set(e, { transformOrigin: '50% 50%' }); return e; };
    D.coord = (x, y, o = {}) => { const e = P.text(x, y, `(${x} | ${String(y).replace('.', ',')})`, { cls: o.cls || '', dx: o.dx || 0, dy: o.dy || 0, anchor: o.anchor || 'middle', parent: gLabel }); e.style.fontSize = '27px'; return e; };
    D.txt = (x, y, str, o = {}) => { const e = P.text(x, y, str, { cls: o.cls || '', dx: o.dx || 0, dy: o.dy || 0, anchor: o.anchor || 'middle', parent: gLabel }); if (o.size) e.style.fontSize = o.size + 'px'; return e; };
    // Name an der Linie: side 'l' = links der Linie, 'r' = rechts
    D.name = (a, b, x, y, side, cls) => {
      const e = P.text(x, y, '', { cls, dx: side === 'l' ? -16 : 16, dy: 12, anchor: side === 'l' ? 'end' : 'start', parent: gLabel });
      e.innerHTML = V.t2u4.sub(a, b);
      return { el: e, sub: e.querySelector('tspan') };
    };
    // gestrichelte Hilfslinien vom Punkt zur r-Achse (h) und zur Y-Achse (v)
    D.guide = (x, y, cls = '') => {
      const h = P.add('line', { x1: X(x), y1: Y(y), x2: x0, y2: Y(y), class: 'dash ' + cls }), v = P.add('line', { x1: X(x), y1: Y(y), x2: X(x), y2: y0, class: 'dash ' + cls });
      P.el.insertBefore(h, mLine); P.el.insertBefore(v, mLine);
      return { h, v };
    };
    // Werte an den Achsen: Y-Achse in Zeile 1–3 unter der Achse, r-Achse in Spalte 1 (direkt an der Achse) oder 2
    D.xval = (x, row, str, cls) => { const e = P.add('text', { x: X(x), y: y0 + [48, 84, 120][row - 1], class: 'lbl ' + cls, 'text-anchor': 'middle' }, str, gLabel); e.style.fontSize = '31px'; return e; };
    D.yval = (y, str, cls, col = 1) => { const e = P.add('text', { x: x0 - (col === 1 ? 22 : 66), y: Y(y) + 11, class: 'lbl ' + cls, 'text-anchor': 'end' }, str, gLabel); e.style.fontSize = '31px'; return e; };
    // kleiner Pfeil zwischen zwei Punkten gleicher Höhe (Verschiebung eines Randpunkts oder der Kurve)
    D.shift = (xa, xb, y, cls, o = {}) => { const s = Math.sign(xb - xa), g0 = o.gap ?? 14; return V.arrow(gLabel, `M${X(xa) + s * g0} ${Y(y)}L${X(xb) - s * (g0 + 4)} ${Y(y)}`, { cls, w: o.w ?? 5, head: o.head ?? 18 }); };
    // angedeutetes Lineal entlang der Strecke (liegt in Zeichenrichtung rechts der Linie)
    D.ruler = (xa, ya, xb, yb) => {
      const ax_ = X(xa), ay_ = Y(ya), bx = X(xb), by = Y(yb), L = Math.hypot(bx - ax_, by - ay_), ang = (Math.atan2(by - ay_, bx - ax_) * 180) / Math.PI;
      const g = P.add('g', { transform: `translate(${ax_.toFixed(1)} ${ay_.toFixed(1)}) rotate(${ang.toFixed(2)})` }, null, gRuler);
      P.add('rect', { x: -48, y: 5, width: L + 96, height: 50, rx: 4, fill: '#f0b429', 'fill-opacity': 0.24, stroke: '#15223a', 'stroke-opacity': 0.55, 'stroke-width': 2.5 }, null, g);
      for (let i = -36, k = 0; i < L + 44; i += 22, k++) P.add('line', { x1: i, y1: 5, x2: i, y2: k % 5 === 0 ? 23 : 14, stroke: '#15223a', 'stroke-opacity': 0.5, 'stroke-width': 2 }, null, g);
      gsap.set(g, { autoAlpha: 0 });
      return g;
    };
    return D;
  },

  // Ausgangslage: IS₁, LM₁, vier Randpunkte, Namen, Gleichgewicht (1100 | 6) mit Hilfslinien. Alles sichtbar außer Koordinaten und Indizes.
  base(D) {
    const B = {};
    B.g = D.guide(1100, 6, 'c3');
    B.IS = D.line(1700, 0, 900, 8, 'c1'); B.LM = D.line(500, 0, 1300, 8, 'c2');
    B.pts = [[1700, 0, 'c1'], [900, 8, 'c1'], [500, 0, 'c2'], [1300, 8, 'c2']].map(([a, b, c]) => D.dot(a, b, c));
    B.coords = [D.coord(1700, 0, { anchor: 'start', dx: 14, dy: -16, cls: 'c1' }), D.coord(900, 8, { anchor: 'end', dx: -2, dy: -24, cls: 'c1' }),
      D.coord(500, 0, { anchor: 'end', dx: -14, dy: -16, cls: 'c2' }), D.coord(1300, 8, { anchor: 'start', dx: 2, dy: -24, cls: 'c2' })];
    B.nIS = D.name('IS', '1', 1570, 1.3, 'l', 'c1'); B.nLM = D.name('LM', '1', 630, 1.3, 'l', 'c2');
    B.eq = D.dot(1100, 6, 'c3', 13);
    B.y6 = D.yval(6, '6', 'c3'); B.x11 = D.xval(1100, 2, '1100', 'c3');
    gsap.set([...B.coords, B.nIS.sub, B.nLM.sub, D.t6], { autoAlpha: 0 });
    return B;
  },
  // altes Gleichgewicht und alte Kurve ausgrauen
  greyEq(ctx, B, t) {
    const C = V.C;
    ctx.tint(B.eq, t, { fill: C.old }).tint([B.g.h, B.g.v], t, { stroke: C.old }).tint([B.y6, B.x11], t, { fill: C.old });
  },
  greyLine(ctx, line, name, t) {
    ctx.tint(line, t, { stroke: V.C.old, strokeWidth: 5 }).tint(name.el, t, { fill: V.C.old }).to(name.sub, { autoAlpha: 1, duration: 0.3 }, t);
  },
  // Linie kurz betonen
  thick(ctx, line, t, w = 7) { ctx.to(line, { strokeWidth: w + 5, duration: 0.2, ease: 'power2.out' }, t).to(line, { strokeWidth: w, duration: 0.4, ease: 'power2.inOut' }, t + 0.25); },

  // Lupe: vergrößerter Ausschnitt um die Schnittpunkte. o: {id, w, h, x:[a,b], y:[c,d]}
  lupe(host, o) {
    const P = V.plot({ w: o.w, h: o.h, x: o.x, y: o.y, pad: { l: 76, r: 12, t: 10, b: 46 } });
    host.appendChild(P.el);
    const X = P.X, Y = P.Y, [a, b] = o.x, [c, d] = o.y;
    P.add('rect', { x: X(a), y: Y(d), width: X(b) - X(a), height: Y(c) - Y(d), fill: '#fff', stroke: '#15223a', 'stroke-width': 3 });
    const cp = P.add('clipPath', { id: 'lc-' + o.id }); P.add('rect', { x: X(a), y: Y(d), width: X(b) - X(a), height: Y(c) - Y(d) }, null, cp);
    const gG = P.g({ 'clip-path': `url(#lc-${o.id})` }), gL = P.g({ 'clip-path': `url(#lc-${o.id})` }), gD = P.g(), gT = P.g();
    const L = { P, X, Y };
    // Gerade Y = y0 + m·r über den ganzen Ausschnitt (wird am Rahmen abgeschnitten)
    L.line = (f, cls) => P.line(f(c - 1), c - 1, f(d + 1), d + 1, { cls, parent: gL });
    L.dot = (x, y, cls, r = 11) => { const e = P.dot(x, y, { cls, r, parent: gD }); gsap.set(e, { transformOrigin: '50% 50%' }); return e; };
    L.guide = (x, y, cls) => ({ h: P.add('line', { x1: X(x), y1: Y(y), x2: X(a), y2: Y(y), class: 'dash ' + cls }, null, gG), v: P.add('line', { x1: X(x), y1: Y(y), x2: X(x), y2: Y(c), class: 'dash ' + cls }, null, gG) });
    const val = (attrs, str, cls) => { const e = P.add('text', Object.assign({ class: 'tickl' }, attrs), str, gT); e.style.fontWeight = 700; e.style.fill = cls === 'old' ? V.C.mute : V.C[cls]; return e; };
    L.xval = (x, str, cls) => val({ x: X(x), y: Y(c) + 34, 'text-anchor': 'middle' }, str, cls);
    L.yval = (y, str, cls) => val({ x: X(a) - 10, y: Y(y) + 9, 'text-anchor': 'end' }, str, cls);
    L.arrow = (xa, xb, y, cls) => { const s = Math.sign(xb - xa); return V.arrow(gT, `M${X(xa) + s * 14} ${Y(y)}L${X(xb) - s * 18} ${Y(y)}`, { cls, w: 4, head: 16 }); };
    L.txt = (x, y, str, cls, o2 = {}) => { const e = val({ x: X(x) + (o2.dx || 0), y: Y(y) + (o2.dy || 0), 'text-anchor': o2.anchor || 'middle' }, str, cls); return e; };
    return L;
  },
};

// Übung 4 a – IS und LM maßstabsgetreu zeichnen
V.scene('u4a', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u4;
  ctx.header({ kicker: 'Übung 4 a', title: '<em>IS und LM</em> maßstabsgetreu zeichnen', src: 'Teil II · Übung 4' });
  const mini = (cls, d) => `<svg width="150" height="130" viewBox="0 0 150 130"><path d="M24 8V112H142" fill="none" stroke="${C.ink}" stroke-width="4"/><path d="${d}" fill="none" stroke="${C[cls]}" stroke-width="7" stroke-linecap="round"/><text x="8" y="22" style="font-size:22px;font-weight:700">r</text><text x="130" y="129" style="font-size:22px;font-weight:700">Y</text></svg>`;

  ctx.html(`
  <style>${U.css('u4a')}
    #sc-u4a #pa{left:0;top:0;width:1728px;height:770px}
    #sc-u4a .given{left:0;top:0;width:1728px;padding:16px 26px 20px}
    #sc-u4a .given .row{display:flex;gap:14px;flex-wrap:nowrap}
    #sc-u4a .given .chip{font-size:28px;padding:4px 14px}
    #sc-u4a .task{left:0;top:152px;font-size:36px;font-weight:800;letter-spacing:-.01em;display:flex;align-items:center;gap:18px}
    #sc-u4a .task .chip{font-size:32px}
    #sc-u4a .ebox{top:244px;width:846px;height:440px;padding:28px 34px}
    #sc-u4a .ebox .lab{font-size:25px}
    #sc-u4a .ebox .big{display:flex;align-items:center;gap:22px;margin-top:14px}
    #sc-u4a .ebox .tg{font-family:var(--mono);font-weight:800;font-size:46px;color:#fff;padding:2px 16px}
    #sc-u4a .ebox .eq.xl{font-size:58px;font-weight:800}
    #sc-u4a .ebox .how{margin-top:34px;font-size:28px;color:var(--mute);font-weight:600}
    #sc-u4a .ebox .eq.sm{font-size:33px;font-weight:600;margin-top:4px}
    #sc-u4a .ebox .mini{position:absolute;right:28px;bottom:22px}
    #sc-u4a .ebox .shape{position:absolute;right:196px;bottom:42px;font-size:30px;font-weight:700}
    #sc-u4a .next{left:0;top:668px;width:1728px;display:flex;align-items:center;gap:20px;font-size:32px;font-weight:700}
    #sc-u4a .next .arr{font-family:var(--mono);font-weight:800;color:var(--mute)}
    #sc-u4a .eqs{display:flex;gap:14px}
    #sc-u4a .eqs .chip{font-size:26px;padding:6px 12px;flex:1;text-align:center}
    #sc-u4a .cl{display:grid;height:54px;align-items:center}
    #sc-u4a .cl>span{grid-area:1/1;font-family:var(--mono);font-size:32px;font-weight:600;white-space:nowrap}
    #sc-u4a .fly{left:0;top:0;font-family:var(--mono);font-weight:800;font-size:32px;padding:2px 12px;border:3px solid;background:#fff;white-space:nowrap}
  </style>

  <!-- Phase A: Angaben und Gleichungen -->
  <div class="abs" id="pa">
    <div class="abs card given"><span class="lab">Gegeben</span><div class="row">
      <span class="chip c1">C = 200 + 0,75 (Y − T)</span><span class="chip c1">I = 200 − 25 r</span><span class="chip c1">G = T = 100</span>
      <span class="chip c2">(M/P)<sup>d</sup> = Y − 100 r</span><span class="chip c2">M = 1000 · P = 2</span></div></div>
    <div class="abs task" id="task"><span class="chip ink">Teil a</span><span>beide Kurven zeichnen</span><span class="chip c4" id="rng">für r von 0 bis 8</span></div>
    <div class="abs card c1 ebox" id="eIS" style="left:0">
      <span class="lab t-c1">Aus dem Gütermarkt · Y = C + I + G</span>
      <div class="big" id="eISb"><span class="tg" style="background:${C.c1}">IS</span><span class="eq xl t-c1">Y = 1700 − 100 r</span></div>
      <div id="eISh"><div class="how">Herleitung in einer Zeile</div><div class="eq sm">0,25 Y = 425 − 25 r <i>| : 0,25</i></div></div>
      <div class="shape t-c1" id="eISs">fällt</div><div class="mini">${mini('c1', 'M42 22L124 98')}</div>
    </div>
    <div class="abs card c2 ebox" id="eLM" style="left:882px">
      <span class="lab t-c2">Aus dem Geldmarkt · M/P = (M/P)<sup>d</sup></span>
      <div class="big" id="eLMb"><span class="tg" style="background:${C.c2}">LM</span><span class="eq xl t-c2">Y = 500 + 100 r</span></div>
      <div id="eLMh"><div class="how">Herleitung in einer Zeile</div><div class="eq sm">1000 / 2 = 500 = Y − 100 r</div></div>
      <div class="shape t-c2" id="eLMs">steigt</div><div class="mini">${mini('c2', 'M42 98L124 22')}</div>
    </div>
  </div>

  <!-- Phase B: Zeichenblatt -->
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen', 'r von 0 bis 8 nach oben · Y nach rechts'],
    ['Wertetabelle', 'Randwerte r = 0 und r = 8 einsetzen'],
    ['Punkte eintragen, verbinden, beschriften', 'je zwei Punkte mit dem Lineal'],
  ], { cls: 'sm' })}</div>
  <div class="abs rc eqs" id="eqs"><span class="chip c1"><b>IS</b>&nbsp; Y = 1700 − 100 r</span><span class="chip c2"><b>LM</b>&nbsp; Y = 500 + 100 r</span></div>
  <div class="abs rc wt" id="wt"><table class="tbl">
    <tr><th>Wertetabelle</th><th class="n" id="h0">r = 0</th><th class="n" id="h1">r = 8</th></tr>
    <tr id="rIS"><td><span class="rn t-c1">IS</span> &nbsp;<span class="small">Y =</span></td><td class="n t-c1" id="c00"><span>1700</span></td><td class="n t-c1" id="c01"><span>900</span></td></tr>
    <tr id="rLM"><td><span class="rn t-c2">LM</span> &nbsp;<span class="small">Y =</span></td><td class="n t-c2" id="c10"><span>500</span></td><td class="n t-c2" id="c11"><span>1300</span></td></tr>
  </table></div>
  <div class="abs rc cl" id="cl">
    <span><span class="t-c1">1700 − 100 · 0</span> = <b>1700</b></span><span><span class="t-c1">1700 − 100 · 8</span> = <b>900</b></span>
    <span><span class="t-c2">500 + 100 · 0</span> = <b>500</b></span><span><span class="t-c2">500 + 100 · 8</span> = <b>1300</b></span>
  </div>`);

  U.layout(ctx, ['#side', '#eqs', '#wt', '#cl'], 14);
  const D = U.make($('#sheet')), B = U.base(D), P = D.P;
  // Zellenmitten der Wertetabelle messen (vor allen Einblend-Verschiebungen)
  const bodyR = ctx.body().getBoundingClientRect();
  const cells = ['#c00', '#c01', '#c10', '#c11'].map(s => { const r = $(s + ' span').getBoundingClientRect(); return [r.left - bodyR.left + r.width / 2, r.top - bodyR.top + r.height / 2]; });

  /* ---------- Phase A ---------- */
  ctx.show('.given', 0.6, { y: 24 });
  ctx.pop('.given .chip', T('das IS-LM-Modell mit Zahlen'), { stagger: 0.14, scale: 0.8 });
  ctx.show('#task', T('Teil a verlangt'), { x: -30, y: 0 });
  gsap.set($('#rng'), { autoAlpha: 0 });
  ctx.to('#rng', { autoAlpha: 1, duration: 0.3 }, T('für Zinsen zwischen')).pulse('#rng', T('für Zinsen zwischen') + 0.3, { scale: 1.12 });
  const box = (id, t, te) => {
    ctx.show(id, t, { y: 30 });
    gsap.set([$(id + 'b'), $(id + 'h'), $(id + 's'), $(id + ' .mini')], { autoAlpha: 0 });
    ctx.to(id + 'b', { autoAlpha: 1, duration: 0.01 }, te).wipe(id + 'b', te, { dur: 0.9 });
    ctx.to([$(id + ' .mini'), $(id + 's')], { autoAlpha: 1, duration: 0.4 }, te + 1.0);
    ctx.to(id + 'h', { autoAlpha: 1, duration: 0.4 }, te + 1.7);
  };
  box('#eIS', T('Aus dem Gütermarkt'), T('Ypsilon gleich siebzehnhundert'));
  box('#eLM', T('Aus dem Geldmarkt'), T('Ypsilon gleich fünfhundert'));

  /* ---------- Wechsel zum Zeichenblatt ---------- */
  const tS = [T('Schritt eins'), T('Schritt zwei'), T('Schritt drei')];
  ctx.hide('#pa', tS[0] - 0.3, { y: -20, dur: 0.3 });
  ctx.show('#sheet', tS[0], { x: -40, y: 0 }).show('#side', tS[0] + 0.1, { x: 40, y: 0 }).show('#eqs', tS[0] + 0.25, { x: 40, y: 0 });
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });

  // Schritt 1: Achsen mit Skala
  const tickEls = g => g.flat();
  gsap.set([D.xl, D.yl, D.zero, D.t6, ...tickEls(D.xticks), ...tickEls(D.yticks), B.IS, B.LM, ...B.pts, ...B.coords, B.nIS.el, B.nLM.el, B.eq, B.g.h, B.g.v, B.y6, B.x11], { autoAlpha: 0 });
  const tY = T('nach oben der Zins') - 0.2, tX = T('nach rechts das Einkommen') - 0.1;
  ctx.pen(D.yAxis, tY, 0.9, { extend: true });
  ctx.to([D.yl, D.zero], { autoAlpha: 1, duration: 0.3 }, tY + 0.8);
  D.yticks.forEach((g, i) => ctx.to(g, { autoAlpha: 1, duration: 0.2 }, T('von null bis acht') + i * 0.09));
  ctx.pen(D.xAxis, tX, 0.9, { extend: true });
  ctx.to(D.xl, { autoAlpha: 1, duration: 0.3 }, tX + 0.9);
  D.xticks.forEach((g, i) => ctx.to(g, { autoAlpha: 1, duration: 0.2 }, tX + 0.95 + i * 0.1));

  // Schritt 2: Wertetabelle
  ctx.show('#wt', T('eine kleine Wertetabelle'), { y: 24 });
  ctx.pulse(['#h0', '#h1'].map(s => $(s)), T('den beiden Randwerten'), { scale: 1.12, origin: '100% 50%' });
  ctx.tint(['#h0', '#h1'].map(s => $(s)), T('den beiden Randwerten'), { color: C.c4 });
  const vals = $$('#wt td.n span'), cl = $$('#cl > span');
  gsap.set(vals, { autoAlpha: 0, scale: 0.5 }); gsap.set(cl, { autoAlpha: 0 });
  gsap.set($('#cl'), { autoAlpha: 1 });
  const tV = [T('siebzehnhundert', { n: 2 }) - 0.1, T('neunhundert') - 0.1, T('bei null fünfhundert') + 0.45, T('dreizehnhundert') - 0.1];
  const tCol = [T('Bei einem Zins von null'), T('bei acht ist es'), T('bei null fünfhundert'), T('bei acht dreizehnhundert')];
  ctx.tint('#rIS', T('Für die IS-Kurve'), { backgroundColor: C.c1bg }).tint('#rIS', T('Für die LM-Kurve'), { backgroundColor: 'rgba(227,234,251,0)' });
  ctx.tint('#rLM', T('Für die LM-Kurve'), { backgroundColor: C.c2bg }).tint('#rLM', tS[2], { backgroundColor: 'rgba(249,228,231,0)' });
  tV.forEach((t, i) => {
    ctx.to(cl[i], { autoAlpha: 1, duration: 0.25 }, tCol[i] + 0.1);
    if (i < 3) ctx.to(cl[i], { autoAlpha: 0, duration: 0.2 }, tCol[i + 1] - 0.15);
    ctx.to(vals[i], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, t);
  });
  ctx.to(cl[3], { autoAlpha: 0, duration: 0.3 }, tS[2] + 0.6);

  // Schritt 3: Punkte eintragen (jeder Wert fliegt aus der Tabelle ins Diagramm) …
  const tgt = [[1700, 0], [900, 8], [500, 0], [1300, 8]], tP = T('Trage die vier Punkte ein');
  tgt.forEach(([x, y], i) => {
    const col = i < 2 ? C.c1 : C.c2, t = tP + 0.05 + i * 0.42;
    const f = V.el(`<div class="abs fly" style="color:${col};border-color:${col}">${x}</div>`); ctx.body().appendChild(f);
    gsap.set(f, { xPercent: -50, yPercent: -50, x: cells[i][0], y: cells[i][1], autoAlpha: 0 });
    ctx.to(f, { autoAlpha: 1, duration: 0.12 }, t).to(f, { x: 3 + P.X(x), y: 3 + P.Y(y), duration: 0.75, ease: 'power2.inOut' }, t + 0.1).to(f, { autoAlpha: 0, scale: 0.4, duration: 0.2 }, t + 0.85);
    gsap.set(B.pts[i], { scale: 0.2 });
    ctx.to(B.pts[i], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, t + 0.85);
    ctx.to(B.coords[i], { autoAlpha: 1, duration: 0.3 }, t + 1.0);
  });
  // … und je zwei mit dem Lineal verbinden
  const r1 = D.ruler(1700, 0, 900, 8), r2 = D.ruler(500, 0, 1300, 8);
  const tR = T('verbinde jeweils'), tIS = T('mit dem Lineal') - 0.15, tLM = T('die LM-Kurve steigt') - 0.95;
  ctx.to(r1, { autoAlpha: 1, duration: 0.3 }, Math.max(tR, tP + 2.3));
  ctx.pen(B.IS, tIS, 1.3);
  ctx.to(r1, { autoAlpha: 0, duration: 0.25 }, tLM - 0.45).to(r2, { autoAlpha: 1, duration: 0.3 }, tLM - 0.35);
  U.thick(ctx, B.IS, T('Die IS-Kurve fällt') + 0.1);
  ctx.pen(B.LM, tLM, 1.3);
  U.thick(ctx, B.LM, tLM + 1.45);
  ctx.to(r2, { autoAlpha: 0, duration: 0.3 }, tLM + 1.6);
  // Namen an die Linien
  const tN = T('Schreib die Namen') + 0.5;
  gsap.set([B.nIS.el, B.nLM.el], { transformOrigin: '50% 50%' });
  ctx.to(B.nIS.el, { autoAlpha: 1, duration: 0.3 }, tN).to(B.nLM.el, { autoAlpha: 1, duration: 0.3 }, tN + 0.45);
  ctx.tint('#eqs .chip', tN, { borderWidth: 3 });
});
