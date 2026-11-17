// Übung 2-10 b – restriktive Fiskalpolitik im Rest der Welt: Weltzins sinkt, I steigt, NX kippt (Bausteine: V.t1, V.t1x)
V.scene('u210c', ctx => {
  const { T, $, $$ } = ctx, C = V.C, X = V.t1x;
  ctx.header({ kicker: 'Übung 2-10 b', title: 'b) Der <em>Rest der Welt</em> spart mehr', src: 'Skript I, Folie 98' });

  ctx.html(`
  <style>${X.css('u210c', 372)}
    #sc-u210c .why .hd2{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:700}
    #sc-u210c .why .hd2 .chip{font-size:28px}
    #sc-u210c .why .hd2 i{font-style:normal;font-weight:500;color:var(--mute)}
    #sc-u210c .why .inl{font-size:27px;font-weight:500;color:var(--mute);margin:6px 0 0 64px}
    #sc-u210c .why .chips{margin-top:16px}
    #sc-u210c .why .chips .chip{font-size:30px;padding:5px 14px}
    #sc-u210c .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 18px;margin-top:8px}
    #sc-u210c .grid .chip{font-size:35px;padding:12px 0;text-align:center}
  </style>
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Weltzins nach unten', 'r₁* bleibt grau gestrichelt, r₂* darunter'],
    ['Auf I(r) nach rechts unten', 'neuer Punkt, I(r₂*) zur Achse loten'],
    ['Neuen Abstand einzeichnen', 'I(r₂*) liegt rechts von S: NX < 0'],
  ])}</div>

  <div class="abs card why" id="wA">
    <span class="lab">Wirkungskette</span>
    <div class="hd2" id="h0">${V.icon('globe', 50, { tone: 4 })}<span>Rest der Welt:</span><span class="chip c2" id="k1">G ↓</span><i id="ko">oder</i><span class="chip c4" id="k2">T ↑</span></div>
    <div class="inl" id="inl">Im Inland ändert sich an der Politik nichts.</div>
    <div class="chips"><span class="chip" id="c1">Weltsparen ↑</span><span class="arr" id="a1">→</span><span class="chip c2" id="c2">Weltzins r* ↓</span></div>
    <div class="chips"><span class="arr" id="a2">→</span><span class="chip c3" id="c3">Investitionen I ↑</span><span class="arr" id="a3">→</span><span class="chip c4" id="c4">NX ↓</span></div>
  </div>
  <div class="abs res why" id="wR">
    <span class="lab">Ergebnis Teil b</span>
    <div class="grid"><span class="chip c1" id="r1">S unverändert</span><span class="chip c3" id="r2">I ↑</span><span class="chip c4" id="r3">NX ↓</span><span class="chip c2" id="r4">r ↓</span></div>
    <p id="rp" style="margin-top:20px">Billigeres Kapital aus dem Ausland: Das Inland investiert mehr, als es selbst spart.</p>
  </div>`);

  /* ---------- Ausgangsbild = Schlussbild von u210a (ohne die Änderungen aus Teil a) ---------- */
  const sheet = $('#sheet'), D = V.t1.make(sheet), P = D.P, O = X.open(P);
  const R1 = X.rW1, R2 = X.rW2, S = V.t1.S1, I1 = V.t1.I(R1), I2 = V.t1.I(R2), E = V.t1.rEq;
  ctx.hide(O.extras, 1.0);

  const tDraw = T('In der Zeichnung'), tMove = T('Aber auf der Investitionskurve'), tNX = T('Der Abstand zwischen'), tRes = T('Das Ergebnis für Teil b');
  ctx.stepsRun('#side', [tDraw, tMove, tNX], { end: tRes });

  /* ---------- Wirkungskette ---------- */
  gsap.set([$('#inl')], { autoAlpha: 0 });
  ctx.show('#h0', 0.9, { y: 14 });
  ctx.pop('#k1', T('die Staatsausgaben')).show('#ko', T('oder erhöht die Steuern'), { y: 0 }).pop('#k2', T('oder erhöht die Steuern') + 0.2);
  ctx.show('#inl', T('Im Inland ändert sich'), { x: -16, y: 0 });
  ctx.pop('#c1', T('Das Weltsparen steigt'));
  ctx.show('#a1', T('deshalb sinkt der Weltzins') - 0.2, { x: -12, y: 0 }).pop('#c2', T('deshalb sinkt der Weltzins'));
  ctx.show('#a2', T('Beim niedrigeren Zins'), { x: -12, y: 0 }).pop('#c3', T('wird mehr investiert') - 0.2);
  ctx.show('#a3', T('Die Nettoexporte sinken') - 0.2, { x: -12, y: 0 }).pop('#c4', T('Die Nettoexporte sinken'));

  /* ---------- Schritt 1: Weltzins r₁* → r₂* ---------- */
  const r2line = P.line(0, R2, 9.4, R2, { cls: 'c2' });
  const tR = T('nach unten') - 0.9;
  ctx.pen(r2line, tR, 1.4);
  // alte Lage: grau und gestrichelt, samt altem Abstand
  ctx.set(O.rline, { strokeDasharray: '12 10' }, tR + 0.3).tint(O.rline, tR + 0.3, { stroke: C.old, strokeWidth: 5 });
  ctx.tint([O.nx._main, ...O.nx._ticks], tR + 0.3, { stroke: C.old }).tint(O.lNX, tR + 0.3, { fill: C.old });
  ctx.tint(O.dotI, tR + 0.3, { fill: C.old }).tint(O.dotS, tR + 0.3, { fill: C.old }).tint(O.gI, tR + 0.3, { stroke: C.old });
  const down = V.arrow(P.el, `M${P.X(0.5)} ${P.Y(R1 - 0.2)}L${P.X(0.5)} ${P.Y(R2 + 0.24)}`, { cls: 'c2', w: 6, head: 22 });
  ctx.drawArrow(down, tR + 1.5, 0.7);
  X.relabel(ctx, O.lr, 'r₁*', T('von r eins Stern'), 'old');
  const lr2 = P.text(0, R2, 'r₂*', { cls: 'c2', dx: -22, dy: 12, anchor: 'end' });
  gsap.set(lr2, { autoAlpha: 0 });
  ctx.to(lr2, { autoAlpha: 1, duration: 0.3 }, T('auf r zwei Stern'));

  /* ---------- S bleibt stehen ---------- */
  const tS = T('Die Ersparnislinie bleibt stehen');
  X.thick(ctx, D.S, tS + 0.4, 2);
  gsap.set(D.lS, { transformOrigin: '50% 50%' });
  ctx.pulse(D.lS, tS + 0.4, { scale: 1.35 });
  const dotS2 = P.dot(S, R2, { cls: 'c1', r: 11 });
  X.pop(ctx, dotS2, tS + 1.2);

  /* ---------- Schritt 2: auf der I-Kurve nach rechts unten ---------- */
  const mover = P.dot(I1, R1, { cls: 'c3', r: 13 });
  gsap.set(mover, { autoAlpha: 0 });
  ctx.set(mover, { autoAlpha: 1 }, tMove);
  ctx.to(mover, { attr: { cx: P.X(I2), cy: P.Y(R2) }, duration: 2.6, ease: 'power1.inOut' }, tMove + 0.3);
  X.thick(ctx, D.Ic, tMove + 0.2);
  const gI2 = P.add('line', { x1: P.X(I2), y1: P.Y(R2), x2: P.X(I2), y2: P.Y(0), class: 'dash c3' });
  const lI2 = P.text(I2, 0, 'I(r₂*)', { cls: 'c3', dy: 52 });
  gsap.set(lI2, { autoAlpha: 0 });
  const tI = T('Beim niedrigeren Zins');
  ctx.pen(gI2, tI + 0.3, 0.7).to(lI2, { autoAlpha: 1, duration: 0.3 }, tI + 1.0);
  X.relabel(ctx, O.lIr, 'I(r₁*)', tI + 1.0, 'old');
  const right = V.arrow(P.el, `M${P.X(I1) + 14} ${P.Y(0) + 80}L${P.X(I2) - 14} ${P.Y(0) + 80}`, { cls: 'c3', w: 5, head: 18 });
  ctx.drawArrow(right, T('wird mehr investiert'), 0.7);

  /* ---------- Schritt 3: neuer Abstand – rechts von S, also negativ ---------- */
  const nx2 = X.bracket(P, S, I2, R2 - 0.35);
  const lNX2 = P.text(S - 0.15, R2 - 0.35, 'NX < 0', { cls: 'c4', dy: 12, anchor: 'end' }); lNX2.style.fontSize = '32px';
  gsap.set([lNX2, nx2._main], { autoAlpha: 0 });
  X.drawBr(ctx, nx2, tNX + 0.4, 1.0);
  // Vergleich mit dem Schnittpunkt der beiden Kurven
  const hollow = P.add('circle', { cx: P.X(S), cy: P.Y(E), r: 12, fill: '#fff', stroke: C.ink, 'stroke-width': 5 });
  const lH = P.text(S + 0.3, E, 'Schnittpunkt', { cls: 'mute', dy: -8, anchor: 'start' }); lH.style.fontSize = '28px';
  gsap.set(lH, { autoAlpha: 0 });
  const tU = T('unter den Schnittpunkt');
  X.pop(ctx, hollow, tU - 0.2);
  ctx.to(lH, { autoAlpha: 1, duration: 0.3 }, tU);
  X.thick(ctx, r2line, tU + 0.6);
  ctx.to(lNX2, { autoAlpha: 1, duration: 0.3 }, T('sogar negativ') - 0.1);
  gsap.set(lNX2, { transformOrigin: '100% 50%' });
  ctx.pulse(lNX2, T('sogar negativ') + 0.4, { scale: 1.25, origin: '100% 50%' });
  P.el.append(dotS2, mover); // Punkte über Klammer und Hilfslinien legen

  /* ---------- Ergebnis ---------- */
  ctx.hide('#wA', tRes - 0.3, { dur: 0.3 }).show('#wR', tRes, { y: 24 });
  ctx.pop('#r1', T('Ersparnis unverändert')).pop('#r2', T('Investitionen rauf')).pop('#r3', T('Nettoexporte runter')).pop('#r4', T('Zins runter'));
  ctx.show('#rp', tRes + 0.5, { y: 14 });
});
