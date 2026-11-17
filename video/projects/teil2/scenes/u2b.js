// Übung 2 – das Geldangebot ändert sich: M = 1200 (Zins sinkt auf 4 %) und Zielzins 7 % (M = 600).
// Startet mit dem fertigen Schlussbild von u2a (Diagramm aus V.t2u2, siehe u2a.js).
V.scene('u2b', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Übung 2', title: 'Das <em>Geldangebot</em> ändert sich', src: 'Teil II · Übung 2' });

  ctx.html(`
  <style>
    #sc-u2b .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u2b .side{left:1046px;top:0;width:682px}
    #sc-u2b .box{left:1046px;width:682px;padding:18px 26px}
    #sc-u2b .box .eq{font-size:34px;font-weight:700;line-height:1.42}
    #sc-u2b .cells{display:grid;grid-template-columns:1fr 30px 1fr;gap:10px 8px;align-items:center;margin-top:2px}
    #sc-u2b .cell{display:flex;align-items:center;gap:12px;height:72px;padding:4px 12px;border:3px solid var(--line);background:var(--panel);font-size:26px;font-weight:700;line-height:1.14}
    #sc-u2b .cells .ar{font-family:var(--mono);font-weight:800;font-size:30px;color:var(--mute);text-align:center}
    #sc-u2b .gl{flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 28px/1 var(--mono);color:#fff}
    #sc-u2b .rows{display:grid;grid-template-columns:auto 1fr;gap:6px 26px;align-items:baseline;margin-top:2px}
    #sc-u2b .rows .k{font-size:30px;font-weight:600}
    #sc-u2b .rows .v{font-family:var(--mono);font-size:36px;font-weight:800;text-align:right;white-space:nowrap}
  </style>

  <div class="abs sheet" id="sheet"></div>

  <div class="abs side" id="side1">${V.steps([
    ['Neue Realkasse berechnen', 'M / P = 1200 / 2 = 600'],
    ['Angebotslinie nach rechts', 'alte Linie grau stehen lassen'],
    ['Neuen Zins ablesen', 'Schnittpunkt mit der Nachfragekurve'],
  ], { title: 'Geldangebot steigt auf 1200', cls: 'sm' })}</div>
  <div class="abs side" id="side2">${V.steps([
    ['Zielzins markieren', 'r = 7 % auf der Zinsachse'],
    ['Waagerecht zur Nachfragekurve', 'gestrichelte Hilfslinie'],
    ['Lot nach unten', '= benötigte Realkasse, dort die Angebotslinie'],
  ], { title: 'Zielzins 7 % · welches Geldangebot?', cls: 'sm' })}</div>

  <div class="abs card box" id="calc1" style="top:342px;height:176px">
    <span class="lab">Rechnung</span>
    <div class="eq" id="c1a"><span class="t-c4">M/P</span> = 1200 / 2 <span id="c1b">= <b class="t-c4">600</b></span></div>
    <div class="eq" id="c1c"><span class="t-c4">600</span> = <span class="t-c1">1000 − 100 r</span> <span id="c1d">→ r = <b class="t-c3">4 %</b></span></div>
  </div>
  <div class="abs card box" id="chain" style="top:534px;height:236px">
    <span class="lab">Der Mechanismus</span>
    <div class="cells">
      <div class="cell">${V.icon('coin', 44, { tone: 4 })}<span>mehr Geld als gewünscht</span></div><span class="ar">→</span>
      <div class="cell">${V.icon('note', 38, { tone: 3 })}<span>Wertpapierkäufe</span></div>
      <div class="cell"><span class="gl" style="background:var(--c3)">↑</span><span>Kurse steigen</span></div><span class="ar">→</span>
      <div class="cell"><span class="gl" style="background:var(--c2)">↓</span><span>Zins sinkt</span></div>
    </div>
  </div>

  <div class="abs card box" id="calc2" style="top:342px;height:176px">
    <span class="lab">Rechnung</span>
    <div class="eq" id="c2a">r = 7: <span class="t-c1">M/P = 1000 − 700</span> <span id="c2b">= <b class="t-c1">300</b></span></div>
    <div class="eq" id="c2c"><span class="t-c4">M</span> = 300 · 2 <span id="c2d">= <b class="t-c4">600</b></span></div>
  </div>
  <div class="abs res box" id="fin" style="top:534px;height:236px">
    <span class="lab">Ergebnis Übung 2</span>
    <div class="rows">
      <span class="k">Gleichgewicht</span><span class="v">r* = 5 %</span>
      <span class="k">Geldangebot M = 1200</span><span class="v t-c3">r = 4 %</span>
      <span class="k">Zielzins r = 7 %</span><span class="v t-c4" id="finM">M = ?</span>
    </div>
  </div>`);

  /* ---------- Diagramm: Schlussbild von u2a ---------- */
  const D = V.t2u2.make($('#sheet')), P = D.P, X = P.X, Y = P.Y;
  V.t2u2.final(D);
  const sm = (t, px = 32) => { t.style.fontSize = px + 'px'; return t; };
  // neue Teile zuerst alle anlegen (Linien vor Punkten), dann animieren
  const lS1b = sm(P.text(500, 10.4, '(M/P)₁', { cls: 'old', dy: -16 }));
  const ex = P.add('line', { x1: X(500), y1: Y(5), x2: X(600), y2: Y(5), stroke: C.c4, 'stroke-width': 14, opacity: 0.5 });
  P.el.insertBefore(ex, D.E);
  const lex = sm(P.text(600, 5, 'zu viel Geld', { cls: 'c4', dx: 18, dy: -16, anchor: 'start' }), 28);
  const gE2 = P.add('line', { x1: X(600), y1: Y(4), x2: X(0), y2: Y(4), class: 'dash c3' });
  const g7h = P.add('line', { x1: X(0), y1: Y(7), x2: X(300), y2: Y(7), class: 'dash c2' });
  const g7v = P.add('line', { x1: X(300), y1: Y(7), x2: X(300), y2: Y(0), class: 'dash c2' });
  const S2 = P.line(600, 0, 600, 10.4, { cls: 'c4' });
  const l2 = sm(P.text(600, 9.7, '(M/P)₂', { cls: 'c4', dx: 14, dy: 12, anchor: 'start' }));
  const S3 = P.line(300, 0, 300, 10.4, { cls: 'c4' });
  const l3 = sm(P.text(300, 10.4, '(M/P)₃', { cls: 'c4', dy: -16 }));
  const a1 = V.arrow(P.el, `M${X(500) + 10} ${Y(8.5)}L${X(600) - 13} ${Y(8.5)}`, { cls: 'c4', w: 5, head: 18 });
  const a2 = V.arrow(P.el, `M${X(500) - 10} ${Y(8.5)}L${X(300) + 14} ${Y(8.5)}`, { cls: 'c4', w: 5, head: 18 });
  const zDown = V.arrow(P.el, `M${X(0) + 32} ${Y(5) + 9}L${X(0) + 32} ${Y(4) - 11}`, { cls: 'c3', w: 5, head: 18 });
  const zUp = V.arrow(P.el, `M${X(0) + 62} ${Y(5) - 9}L${X(0) + 62} ${Y(7) + 13}`, { cls: 'c2', w: 5, head: 18 });
  const mover = P.add('circle', { cx: X(600), cy: Y(5), r: 10, fill: C.c4, stroke: '#fff', 'stroke-width': 4 });
  const E2 = P.dot(600, 4, { cls: 'c3', r: 13 }), E3 = P.dot(300, 7, { cls: 'c2', r: 13 }), Z7 = P.dot(0, 7, { cls: 'c2', r: 9 });
  D.xNum[2].textContent = '300';
  Object.assign(D.xNum[2].style, { fill: C.c4, fontWeight: 800 });
  [E2, E3, Z7].forEach(d => (d.style.stroke = '#fff'));
  [E2, E3, Z7, D.yNum[3], D.yNum[6], D.xNum[2], D.xNum[5]].forEach(e => gsap.set(e, { transformOrigin: '50% 50%' }));
  gsap.set([lS1b, lex, l2, l3, mover, E2, E3, Z7, D.xNum[2], ex], { autoAlpha: 0 });
  const fade = (el, t, d = 0.3) => ctx.to(el, { autoAlpha: 1, duration: d }, t);
  const gone = (el, t, d = 0.3) => ctx.to(el, { autoAlpha: 0, duration: d }, t);

  /* ---------- Teil 1: M steigt auf 1200 ---------- */
  const t0 = T('Jetzt erhöht'), tZ = T('In der Zeichnung rückt'), tN = T('Der neue Schnittpunkt'), tMe = T('Der Mechanismus dahinter');
  ctx.show('#side1', 0.15, { x: 40, y: 0 });
  ctx.stepsRun('#side1', [t0, tZ, tN], { end: tMe });
  ctx.show('#calc1', T('das Geldangebot von tausend') - 0.2, { y: 24 });
  ctx.show('#c1a', T('auf zwölfhundert') - 0.2, { x: -16, y: 0 });
  ctx.show('#c1b', T('steigt auf sechshundert'), { x: -12, y: 0 }).pulse('#c1b', T('steigt auf sechshundert') + 0.5, { scale: 1.12 });
  ctx.tint(D.xNum[5], T('steigt auf sechshundert') + 0.3, { fill: C.c4, fontWeight: 800 }).pulse(D.xNum[5], T('steigt auf sechshundert') + 0.35, { scale: 1.35 });
  // alte Lage wird grau, Hilfsbeschriftungen der Konstruktion treten zurück
  gone([D.lA, D.lB, D.lS1], tZ - 0.1);
  ctx.to([D.A, D.B], { opacity: 0.3, duration: 0.3 }, tZ - 0.1);
  fade(lS1b, tZ + 0.1);
  ctx.tint([D.S1, D.gE], tZ, { stroke: C.old }).tint([D.E, D.yNum[4], D.xNum[4]], tZ, { fill: C.old });
  // neue Angebotslinie bei 600
  const tL = T('die senkrechte Angebotslinie');
  ctx.pen(S2, tL, 1.1);
  fade(l2, tL + 1.1);
  ctx.drawArrow(a1, T('nach rechts') - 0.1, 0.4);
  // neuer Schnittpunkt, Zins 4 %
  ctx.pop(E2, tN + 0.3);
  ctx.show('#c1c', T('Sechshundert gleich'), { x: -16, y: 0 });
  const tV = T('ergibt einen Zins');
  ctx.pen(gE2, tV, 0.9);
  ctx.show('#c1d', T('von vier Prozent') - 0.1, { x: -12, y: 0 }).pulse('#c1d', T('von vier Prozent') + 0.5, { scale: 1.1 });
  ctx.tint(D.yNum[3], tV + 0.9, { fill: C.c3, fontWeight: 800 }).pulse(D.yNum[3], tV + 0.95, { scale: 1.5 });
  ctx.drawArrow(zDown, tV + 1.1, 0.35);

  /* ---------- Mechanismus ---------- */
  ctx.show('#chain', tMe, { y: 24 });
  const cells = $$('#chain .cell'), ars = $$('#chain .ar');
  gsap.set([...cells, ...ars], { opacity: 0.25 });
  const cue = [T('mehr Geld, als die Leute'), T('kaufen sie Wertpapiere'), T('Die Kurse steigen'), T('und der Zins sinkt')];
  cells.forEach((c, i) => {
    ctx.to(c, { opacity: 1, backgroundColor: C.c4bg, borderColor: C.c4, duration: 0.3 }, cue[i]).pulse(c, cue[i], { scale: 1.05 });
    if (i < 3) ctx.to(c, { backgroundColor: C.panel, borderColor: C.ink, duration: 0.3 }, cue[i + 1]);
  });
  ctx.to(ars[0], { opacity: 1, duration: 0.3 }, cue[1] - 0.2).to(ars[1], { opacity: 1, duration: 0.3 }, cue[3] - 0.2);
  // im Bild: beim alten Zins (5 %) ist das Angebot (600) größer als die Nachfrage (500)
  const tAlt = T('Beim alten Zins');
  gsap.set(ex, { attr: { x2: X(500) } });
  ctx.set(ex, { autoAlpha: 1 }, tAlt).to(ex, { attr: { x2: X(600) }, duration: 0.6, ease: 'power2.out' }, tAlt);
  fade(lex, tAlt + 0.5);
  fade(mover, tAlt + 0.3);
  ctx.to(mover, { attr: { cy: Y(4) }, duration: 1.0, ease: 'power2.inOut' }, cue[3]);
  gone([ex, lex], cue[3] + 0.6);
  gone(mover, cue[3] + 1.0).pulse(E2, cue[3] + 1.0, { scale: 1.5 });

  /* ---------- Teil 2: Zielzins 7 % ---------- */
  const tq = T('Die letzte Frage'), t7 = T('für einen Zins von sieben'), tB7 = T('Bei sieben Prozent wird'), tLot = T('eine Realkasse von dreihundert');
  const tLi = T('Die Angebotslinie rückt also');
  ctx.hide(['#side1', '#calc1', '#chain'].map(s => $(s)), tq - 0.3, { dur: 0.3 });
  ctx.show('#side2', tq, { x: 40, y: 0 }).show('#fin', tq + 0.15, { y: 24 }).show('#calc2', tB7 - 0.2, { y: 24 });
  ctx.stepsRun('#side2', [t7, tB7, tLot], { end: tLi });
  ctx.to([S2, l2, a1, E2, gE2, zDown], { opacity: 0.28, duration: 0.4 }, tq);
  ctx.tint([D.xNum[5], D.yNum[3]], tq, { fill: C.mute, fontWeight: 500 });
  // 1 Zielzins auf der Achse
  ctx.tint(D.yNum[6], t7 + 0.5, { fill: C.c2, fontWeight: 800 }).pulse(D.yNum[6], t7 + 0.55, { scale: 1.5 });
  ctx.pop(Z7, t7 + 0.6);
  // 2 waagerecht zur Nachfragekurve
  ctx.pen(g7h, tB7, 1.0);
  ctx.pop(E3, tB7 + 1.0);
  ctx.show('#c2a', tB7 + 0.3, { x: -16, y: 0 });
  // 3 Lot nach unten = benötigte Realkasse
  ctx.pen(g7v, tLot, 0.9);
  ctx.show('#c2b', T('von dreihundert') - 0.1, { x: -12, y: 0 });
  fade(D.xNum[2], tLot + 0.9).pulse(D.xNum[2], tLot + 0.95, { scale: 1.4 });
  // Geldangebot M = 300 · 2 = 600
  ctx.show('#c2c', T('Mal Preisniveau zwei'), { x: -16, y: 0 });
  const t600 = T('ein Geldangebot von sechshundert');
  ctx.show('#c2d', t600 + 0.3, { x: -12, y: 0 }).pulse('#c2d', t600 + 0.8, { scale: 1.12 });
  ctx.swap('#finM', 'M = 600', t600 + 0.5);
  ctx.pulse('#finM', t600 + 1.0, { scale: 1.15, origin: '100% 50%' });
  // neue Angebotslinie bei 300, Pfeil nach links
  ctx.pen(S3, tLi, 1.1);
  fade(l3, tLi + 1.1);
  ctx.drawArrow(a2, T('nach links') - 0.1, 0.5);
  const tUp = T('und der Schnittpunkt wandert');
  ctx.drawArrow(zUp, tUp, 0.6);
  ctx.pulse(E3, tUp + 0.6, { scale: 1.5 });
});
