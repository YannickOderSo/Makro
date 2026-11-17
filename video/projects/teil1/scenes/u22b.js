// Gemeinsame Bausteine der Szenen u22b, u210a, u210b, u210c (ergänzt V.t1 aus u22a.js).
// Alle Elemente entstehen sichtbar; die Szene blendet aus oder animiert, was sie braucht.
V.t1x = {
  rW1: 6.2,   // Weltzins (Ausgangslage)  → I(r*) = 4,0, NX = 2 > 0
  rW2: 2.8,   // Weltzins nach dem Schock im Ausland → I = 7,4 > S, NX < 0
  S2a: 7.7,   // Ersparnis nach restriktiver Fiskalpolitik im Inland (Übung 2-10 a)
  S2c: 4.4,   // Ersparnis nach dem Konsumschub (Übung 2-2)
  // gemeinsames Layout: Zeichenblatt links, Schrittliste rechts oben, Karte rechts unten (ab top)
  css: (id, top = 466) => `
    #sc-${id} .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-${id} .side{left:1046px;top:0;width:682px}
    #sc-${id} .why{left:1046px;top:${top}px;width:682px;height:${770 - top}px;padding:20px 26px}
    #sc-${id} .why .eq{font-size:44px;font-weight:700}
    #sc-${id} .why p{margin:8px 0 0;font-size:29px;line-height:1.3;font-weight:500}
    #sc-${id} .tagc{font-family:var(--mono);font-weight:700;font-size:26px;padding:3px 12px;position:absolute;white-space:nowrap}
    #sc-${id} .chips{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
    #sc-${id} .chips .chip{font-size:30px}
    #sc-${id} .chips .arr{font-family:var(--mono);font-weight:800;font-size:34px;color:var(--mute)}`,
  // Klammer/Strecke auf Höhe y zwischen xa und xb (Linie + zwei Endstriche)
  bracket(P, xa, xb, y, cls = 'c4') {
    const g = P.g({ class: 'br' });
    const main = P.add('line', { x1: P.X(xa), y1: P.Y(y), x2: P.X(xb), y2: P.Y(y), class: 'curve ' + cls }, null, g);
    main.style.strokeWidth = '9px';
    const tk = x => P.add('line', { x1: P.X(x), y1: P.Y(y) - 15, x2: P.X(x), y2: P.Y(y) + 15, class: 'curve ' + cls }, null, g);
    g._main = main; g._ticks = [tk(xa), tk(xb)];
    return g;
  },
  // Klammer mit dem Stift zeichnen
  drawBr(ctx, g, t, dur = 1) {
    gsap.set(g._ticks, { autoAlpha: 0 });
    ctx.to(g._ticks[0], { autoAlpha: 1, duration: 0.15 }, t);
    ctx.pen(g._main, t, dur);
    ctx.to(g._ticks[1], { autoAlpha: 1, duration: 0.15 }, t + dur);
  },
  // Beschriftung austauschen (weich überblendet); liefert das neue <text>
  relabel(ctx, el, text, t, cls) {
    const n = el.cloneNode(false); n.textContent = text; n.removeAttribute('style');
    if (cls != null) n.setAttribute('class', 'lbl ' + cls);
    el.parentNode.appendChild(n);
    gsap.set(n, { autoAlpha: 0 });
    ctx.to(el, { autoAlpha: 0, duration: 0.25 }, t).to(n, { autoAlpha: 1, duration: 0.3 }, t + 0.15);
    return n;
  },
  // Linie kurz betonen (dicker und zurück)
  thick(ctx, el, t, n = 1) {
    for (let k = 0; k < n; k++) { ctx.to(el, { strokeWidth: 14, duration: 0.22, ease: 'power2.out' }, t + k * 0.7).to(el, { strokeWidth: 7, duration: 0.4, ease: 'power2.inOut' }, t + k * 0.7 + 0.22); }
  },
  // SVG-Element aufpoppen lassen (Skalierung um die eigene Mitte)
  pop(ctx, el, t, o = {}) { gsap.set(el, { transformOrigin: '50% 50%' }); ctx.pop(el, t, o); },
  // Schlussbild von u22a: Schnittpunkt, Hilfslinie zur Zinsachse, r*, dazu die beiden Schilder
  closed(P, sheet) {
    const E = V.t1.rEq, S = V.t1.S1;
    const guide = P.add('line', { x1: P.X(S), y1: P.Y(E), x2: P.X(0), y2: P.Y(E), class: 'dash' });
    const dot = P.dot(S, E, { cls: 'ink', r: 13 });
    const lr = P.text(0, E, 'r*', { cls: 'c2', dx: -22, dy: 12, anchor: 'end' });
    const tagS = V.el('<div class="chip c1 tagc">Kreditangebot</div>'), tagI = V.el('<div class="chip c3 tagc">Kreditnachfrage</div>');
    sheet.append(tagS, tagI);
    tagS.style.left = P.X(6) + 22 + 'px'; tagS.style.top = P.Y(8.4) + 'px';
    tagI.style.left = P.X(0.5) + 'px'; tagI.style.top = P.Y(5.9) + 'px';
    return { guide, dot, lr, tagS, tagI };
  },
  // Schlussbild von u210a: Weltzins, I(r*), NX-Strecke, Vergleich mit der geschlossenen Volkswirtschaft
  open(P) {
    const R = this.rW1, S = V.t1.S1, I1 = V.t1.I(R), E = V.t1.rEq;
    const gCl = P.add('line', { x1: P.X(S), y1: P.Y(E), x2: P.X(0), y2: P.Y(E), class: 'dash old' });
    const lCl = P.text(0.22, E, 'geschlossene VW', { cls: 'mute', dy: -12, anchor: 'start' }); lCl.style.fontSize = '26px';
    const rline = P.line(0, R, 9.4, R, { cls: 'c2' });
    const lr = P.text(0, R, 'r*', { cls: 'c2', dx: -22, dy: 12, anchor: 'end' });
    const gI = P.add('line', { x1: P.X(I1), y1: P.Y(R), x2: P.X(I1), y2: P.Y(0), class: 'dash c3' });
    const lIr = P.text(I1, 0, 'I(r*)', { cls: 'c3', dy: 52 });
    const nx = this.bracket(P, I1, S, R + 0.35);
    const lNX = P.text((I1 + S) / 2, R + 0.35, 'NX > 0', { cls: 'c4', dy: -24 });
    const dotS = P.dot(S, R, { cls: 'c1', r: 11 });
    const dotI = P.dot(I1, R, { cls: 'c3', r: 13 });
    const hollow = P.add('circle', { cx: P.X(S), cy: P.Y(E), r: 12, fill: '#fff', stroke: V.C.old, 'stroke-width': 5 });
    const up = V.arrow(P.el, `M${P.X(3.6)} ${P.Y(E + 0.15)}L${P.X(3.6)} ${P.Y(R - 0.22)}`, { cls: 'c2', w: 5, head: 20 });
    return { gCl, lCl, rline, lr, gI, lIr, nx, lNX, dotS, dotI, hollow, up, extras: [gCl, lCl, hollow, up] };
  },
};

// Übung 2-2 – der Konsumschub: Ersparnislinie nach links, Zins rauf, Investitionen runter
V.scene('u22b', ctx => {
  const { T, $, $$ } = ctx, C = V.C, X = V.t1x;
  ctx.header({ kicker: 'Übung 2-2', title: 'Mehr Konsum, <em>weniger Ersparnis</em>', src: 'Skript I, Folie 70' });
  const ov = s => `<span style="text-decoration:overline">${s}</span>`;

  ctx.html(`
  <style>${X.css('u22b')}
    #sc-u22b .why .row{display:flex;align-items:center;gap:14px;margin-top:12px}
    #sc-u22b .ans .chip{font-size:40px;padding:4px 20px}
    #sc-u22b .ans p{font-size:27px}
  </style>
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Ersparnislinie nach links', 'S₁ bleibt grau stehen, S₂ parallel daneben'],
    ['Neuer Schnittpunkt', 'Lücke bei r₁ → Zins steigt bis S₂ = I(r)'],
    ['Werte an die Achsen', 'I₁, I₂ waagerecht · r₁, r₂ senkrecht'],
    ['Ergebnis ablesen', 'Zins höher, Investitionen kleiner'],
  ])}</div>

  <div class="abs card why" id="wA">
    <span class="lab">Was ändert sich?</span>
    <div class="eq"><span class="t-c1">S</span> = ${ov('Y')} − C − G</div>
    <div class="row chips"><span class="chip ink" id="cC">C ↑</span><span class="chip" id="cY">${ov('Y')} fest</span><span class="chip" id="cG">G fest</span><span class="arr" id="cA">→</span><span class="chip c1" id="cS">S ↓</span></div>
    <p id="pA">Die Ersparnis sinkt genau um den zusätzlichen Konsum: <b>ΔS = −ΔC</b></p>
  </div>
  <div class="abs card why" id="wB">
    <span class="lab">Beim alten Zins r<sub>1</sub></span>
    <div class="eq"><span class="t-c3">I(r<sub>1</sub>)</span> &gt; <span class="t-c1">S<sub>2</sub></span></div>
    <p id="pB1">Kreditnachfrage &gt; Kreditangebot</p>
    <p id="pB2">→ der <b class="t-c2">Zins steigt</b> von r<sub>1</sub> auf r<sub>2</sub></p>
    <p id="pB3">→ die <b class="t-c3">Investitionen sinken</b> von I<sub>1</sub> auf I<sub>2</sub></p>
  </div>
  <div class="abs res why ans" id="wC">
    <span class="lab">Antwort</span>
    <div class="row chips" style="margin-top:2px"><span class="chip c2" id="aR">r ↑</span><span class="chip c3" id="aI">I ↓</span></div>
    <p id="pC1">Der zusätzliche Konsum verdrängt Investitionen in gleicher Höhe: <b>ΔI = −ΔC</b></p>
    <p id="pC2">${ov('Y')} unverändert, nur die Verwendung ändert sich.</p>
  </div>`);

  /* ---------- Ausgangsbild = Schlussbild von u22a ---------- */
  const sheet = $('#sheet'), D = V.t1.make(sheet), P = D.P, B = X.closed(P, sheet);
  const S1 = V.t1.S1, S2 = X.S2c, r1 = V.t1.rEq, r2 = 10.2 - S2;
  ctx.hide([B.tagS, B.tagI], 1.0);

  const tDraw = T('In der Zeichnung'), tGap = T('Beim alten Zins'), tVal = T('Mit dem höheren Zins'), tAns = T('Die Antwort lautet');
  ctx.stepsRun('#side', [tDraw, tGap, tVal, tAns], { end: ctx.audioEnd + 0.2 });

  /* ---------- Karte: S = Y − C − G ---------- */
  ctx.show('#cC', T('Die Haushalte konsumieren mehr') + 0.3, { y: 0, scale: 0.6, ease: 'back.out(1.8)' });
  ctx.show('#cY', T('Das Einkommen bleibt gleich') + 0.2, { y: 14 }).show('#cG', T('die Staatsausgaben auch') + 0.1, { y: 14 });
  ctx.show('#cA', T('Also sinkt die Ersparnis') - 0.1, { x: -14, y: 0 }).show('#cS', T('Also sinkt die Ersparnis') + 0.1, { y: 0, scale: 0.6, ease: 'back.out(1.8)' });
  ctx.show('#pA', T('genau um den zusätzlichen Konsum') - 0.2, { x: -16, y: 0 });
  X.thick(ctx, D.S, T('Also sinkt die Ersparnis') + 0.3);

  /* ---------- Schritt 1: S₁ → S₂ ---------- */
  const S2l = P.line(S2, 0, S2, 9.3, { cls: 'c1' });
  const tS2 = T('nach links') - 1.0;
  ctx.pen(S2l, tS2, 1.2);
  const arr = V.arrow(P.el, `M${P.X(S1 - 0.18)} ${P.Y(8.7)}L${P.X(S2 + 0.26)} ${P.Y(8.7)}`, { cls: 'c1', w: 6, head: 22 });
  gsap.set(arr, { autoAlpha: 0 });
  ctx.drawArrow(arr, tS2 + 1.25, 0.5);
  ctx.tint(D.S, T('Die alte Linie bleibt stehen'), { stroke: C.old });
  const lS1 = X.relabel(ctx, D.lS, 'S₁', T('beschrifte sie mit S eins') + 0.3, 'old');
  const lS2 = P.text(S2, 9.3, 'S₂', { cls: 'c1', dy: -20 });
  gsap.set(lS2, { autoAlpha: 0 });
  ctx.to(lS2, { autoAlpha: 1, duration: 0.3 }, T('die neue mit S zwei') + 0.5);

  /* ---------- Schritt 2: Lücke beim alten Zins, Zins steigt, neuer Schnittpunkt ---------- */
  ctx.hide('#wA', tGap - 0.3, { dur: 0.3 }).show('#wB', tGap, { y: 24 });
  const lr1 = X.relabel(ctx, B.lr, 'r₁', tGap, 'c2');
  const gap = X.bracket(P, S2, S1, r1);
  const lGap = P.text((S1 + S2) / 2, r1, 'Lücke', { cls: 'c4', dy: 46 }); lGap.style.fontSize = '32px';
  gsap.set([gap._main, lGap], { autoAlpha: 0 });
  X.drawBr(ctx, gap, T('mehr Kredite') - 0.3, 0.9);
  ctx.to(lGap, { autoAlpha: 1, duration: 0.3 }, T('mehr Kredite') + 0.7);
  ctx.show('#pB1', T('Die Kreditnachfrage ist größer'), { x: -16, y: 0 });
  ctx.show('#pB2', T('deshalb steigt der Zins') - 0.1, { x: -16, y: 0 });
  const up = V.arrow(P.el, `M${P.X(0.5)} ${P.Y(r1 + 0.15)}L${P.X(0.5)} ${P.Y(r2 - 0.2)}`, { cls: 'c2', w: 6, head: 22 });
  gsap.set(up, { autoAlpha: 0 });
  ctx.drawArrow(up, T('deshalb steigt der Zins'), 0.7);
  const tNew = T('Der neue Schnittpunkt');
  const dot2 = P.dot(S2, r2, { cls: 'ink', r: 13 });
  X.pop(ctx, dot2, tNew + 0.3);
  ctx.hide([gap, lGap], tNew + 0.1);
  ctx.tint(B.dot, tNew + 0.3, { fill: C.old });
  X.thick(ctx, D.Ic, T('weiter oben auf der Investitionskurve'));

  /* ---------- Schritt 3: Werte an den Achsen ---------- */
  ctx.show('#pB3', tVal, { x: -16, y: 0 });
  const lI1 = P.text(S1, 0, 'I₁', { cls: 'old', dy: 52 }), lI2 = P.text(S2, 0, 'I₂', { cls: 'c3', dy: 52 });
  gsap.set([lI1, lI2], { autoAlpha: 0 });
  ctx.to(lI1, { autoAlpha: 1, duration: 0.3 }, T('von I eins')).to(lI2, { autoAlpha: 1, duration: 0.3 }, T('auf I zwei'));
  const left = V.arrow(P.el, `M${P.X(S1) - 30} ${P.Y(0) + 40}L${P.X(S2) + 36} ${P.Y(0) + 40}`, { cls: 'c3', w: 5, head: 18 });
  gsap.set(left, { autoAlpha: 0 });
  ctx.drawArrow(left, T('auf I zwei') + 0.4, 0.5);
  gsap.set([lI1, lI2], { transformOrigin: '50% 50%' });
  ctx.pulse([lI1, lI2], T('Trag beide Werte') + 0.6, { scale: 1.3 });
  const g2 = P.add('line', { x1: P.X(S2), y1: P.Y(r2), x2: P.X(0), y2: P.Y(r2), class: 'dash' });
  const lr2 = P.text(0, r2, 'r₂', { cls: 'c2', dx: -22, dy: 12, anchor: 'end' });
  gsap.set(lr2, { autoAlpha: 0 });
  P.el.appendChild(dot2); // Punkt über die Hilfslinie legen
  const tR = T('den alten und neuen Zins');
  ctx.pen(g2, tR, 0.9);
  ctx.to(lr2, { autoAlpha: 1, duration: 0.3 }, tR + 0.9);
  gsap.set([lr1, lr2], { transformOrigin: '100% 50%' });
  ctx.pulse([lr1, lr2], tR + 1.5, { scale: 1.3, origin: '100% 50%' });

  /* ---------- Schritt 4: Ergebnis ---------- */
  ctx.hide('#wB', tAns - 0.3, { dur: 0.3 }).show('#wC', tAns, { y: 24 });
  ctx.pop('#aR', T('Der Realzins steigt')).pop('#aI', T('die Investitionen sinken'));
  ctx.pulse([lr2], T('Der Realzins steigt') + 0.2, { scale: 1.35, origin: '100% 50%' });
  ctx.pulse([lI2], T('die Investitionen sinken') + 0.2, { scale: 1.35 });
  ctx.show('#pC1', T('Der zusätzliche Konsum verdrängt'), { x: -16, y: 0 }).show('#pC2', T('Das Einkommen selbst'), { x: -16, y: 0 });
});
