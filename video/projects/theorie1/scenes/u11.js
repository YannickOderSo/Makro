// Übung 1-1 – Ökonomische Modelle, exogene und endogene Variablen
V.scene('u11', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '1-1', title: 'Ökonomische <em>Modelle</em>', src: 'Skript I, Folien 14–20',
    question: 'Was sind ökonomische Modelle und welche Variablen werden in ihnen verwendet?',
  });
  const L = V.th.lines(F.ans, [
    'Modelle sind <b>vereinfachte Theorien</b> und zeigen die wesentlichen Beziehungen zwischen ökonomischen Variablen.',
    '<b>Exogene Variablen</b> werden außerhalb des Modells bestimmt.',
    '<b>Endogene Variablen</b> werden durch das Modell erklärt.',
    'Das Modell zeigt, wie Änderungen der exogenen Variablen auf die endogenen wirken.',
  ]);

  const mini = inner => `<svg viewBox="0 0 150 96" width="150" height="96"><path d="M14 6V84H144" fill="none" stroke="${C.ink}" stroke-width="3.5"/>${inner}</svg>`;
  F.stage.innerHTML = `
  <style>
    #sc-u11 .bx{top:0;height:230px;padding:16px 6px 0;text-align:center}
    #sc-u11 .bt{font-size:29px;font-weight:800;letter-spacing:-.015em;line-height:1.15;white-space:nowrap}
    #sc-u11 .bs{font-size:26px;color:var(--mute);font-weight:500;margin-top:2px}
    #sc-u11 .slot{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:12px}
    #sc-u11 .dl{font-size:28px;padding:5px 16px}
    #sc-u11 .cs{left:664px;width:384px;height:186px;padding:16px 18px 0}
    #sc-u11 .cs .r{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:28px;font-weight:700;white-space:nowrap}
    #sc-u11 .cs .ar{font-family:var(--mono);font-weight:800;color:var(--mute)}
    #sc-u11 .mk{padding:18px 22px 0}
    #sc-u11 .mk .h{font-size:32px;font-weight:800;letter-spacing:-.01em}
    #sc-u11 .mk p{margin:6px 0 0;font-size:28px;line-height:1.25;font-weight:500}
    #sc-u11 .mt{width:186px;height:250px;padding:14px 10px 0;text-align:center;top:250px}
    #sc-u11 .mt .n{font-size:27px;font-weight:700;line-height:1.15;margin-top:2px}
  </style>

  <!-- Schema von Folie 14 -->
  <div class="abs" id="sch" style="left:0;top:0;width:1056px;height:330px">
    <svg class="abs" id="schsvg" style="left:0;top:0" width="1056" height="230"></svg>
    <div class="abs card bx" id="bx1" style="left:0;width:312px"><div class="bt">Exogene Variablen</div><div class="bs">Vorgabe von außen</div>
      <div class="slot"><span class="chip c4" id="e1">Einkommen Y</span><span class="chip c4" id="e2">Mehlpreis P<sub>m</sub></span></div></div>
    <div class="abs card bx" id="bx2" style="left:370px;width:316px;padding-top:12px"><span id="gear" style="display:inline-block">${V.icon('gear', 66, { tone: 1 })}</span><div class="bt">Modell</div><div class="bs">vereinfachte Theorie</div>
      <div class="slot" style="margin-top:6px"><span class="chip c1" id="mb">Markt für Brot</span></div></div>
    <div class="abs card bx" id="bx3" style="left:744px;width:312px"><div class="bt">Endogene Variablen</div><div class="bs">Ergebnis des Modells</div>
      <div class="slot"><span class="chip c3" id="n1">Brotpreis P</span><span class="chip c3" id="n2">Menge Q</span></div></div>
    <div class="abs chip c4 dl" id="d1" style="left:0;top:264px">Vorgabe ändert sich …</div>
    <div class="abs chip c3 dl" id="d2" style="left:700px;top:264px">… Ergebnis ändert sich</div>
  </div>

  <!-- Beispiel: Markt für Brot -->
  <div class="abs sheet" id="dg" style="left:0;top:250px;width:640px;height:398px"></div>
  <div class="abs card cs" id="cA" style="top:250px">
    <div class="r" id="a1"><span class="chip ink">1</span><span class="chip c4">Einkommen Y ↑</span></div>
    <div class="r" id="a2"><span class="ar">→</span><span class="t-c1">Nachfrage nach rechts</span></div>
    <div class="r" id="a3"><span class="ar">→</span><span class="chip c3">P ↑</span><span class="chip c3">Q ↑</span></div>
  </div>
  <div class="abs card cs" id="cB" style="top:462px">
    <div class="r" id="b1"><span class="chip ink">2</span><span class="chip c4">Mehlpreis P<sub>m</sub> ↑</span></div>
    <div class="r" id="b2"><span class="ar">→</span><span class="t-c2">Angebot nach links</span></div>
    <div class="r" id="b3"><span class="ar">→</span><span class="chip c3">P ↑</span><span class="chip c2">Q ↓</span></div>
  </div>

  <!-- Warum vereinfachen? -->
  <div class="abs card mk" id="m1" style="left:0;top:250px;width:420px;height:250px">
    <div class="h">Ein Modell für alles?</div>
    <svg width="372" height="98" viewBox="0 0 372 132" preserveAspectRatio="none" style="margin-top:6px"><path id="tangle" d="M8 60C50 -10 90 130 130 50S40 120 180 96S150 -6 226 30S170 140 262 88S250 0 318 34S270 126 362 70M20 100C90 60 150 20 230 104S300 20 356 18" fill="none" stroke="${C.mute}" stroke-width="4" stroke-linecap="round"/></svg>
    <p id="m1p" class="t-c2" style="font-weight:800;margin-top:10px">erklärt nichts mehr</p>
    <span class="abs" id="m1x" style="right:16px;top:14px">${V.icon('cross', 48)}</span>
  </div>
  <div class="abs card mt" style="left:450px">${mini(`<path d="M30 16L130 74" stroke="${C.c1}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 74L130 16" stroke="${C.c2}" stroke-width="5" fill="none" stroke-linecap="round"/>`)}<div class="n">Markt<br>für Brot</div><span class="abs ck" style="left:73px;bottom:12px">${V.icon('check', 40)}</span></div>
  <div class="abs card mt" style="left:660px">${mini(`<path d="M30 14L132 76" stroke="${C.c3}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M92 8V84" stroke="${C.c1}" stroke-width="5" fill="none" stroke-linecap="round"/>`)}<div class="n">Finanz-<br>markt</div><span class="abs ck" style="left:73px;bottom:12px">${V.icon('check', 40)}</span></div>
  <div class="abs card mt" style="left:870px">${mini(`<path d="M30 14L130 76" stroke="${C.c1}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M30 78L124 14" stroke="${C.c2}" stroke-width="5" fill="none" stroke-linecap="round"/>`)}<div class="n">IS/LM-<br>Modell</div><span class="abs ck" style="left:73px;bottom:12px">${V.icon('check', 40)}</span></div>
  <div class="abs res" id="m2" style="left:0;top:528px;width:1048px;height:112px;display:flex;align-items:center;padding:0 28px">
    <span style="font-size:36px;font-weight:800;letter-spacing:-.015em">Für verschiedene Fragen <span class="t-c3">verschiedene Modelle</span>.</span></div>`;

  /* ---------- Antwort ---------- */
  ctx.show(L[0], T('Die Antwort'), { x: -20, y: 0 });
  ctx.show(L[1], T('Exogene Variablen werden'), { x: -20, y: 0 });
  ctx.show(L[2], T('Endogene Variablen werden'), { x: -20, y: 0 });
  ctx.show(L[3], T('Das Modell zeigt also'), { x: -20, y: 0 });

  /* ---------- Schema ---------- */
  const sch = $('#sch'), bx = [$('#bx1'), $('#bx2'), $('#bx3')];
  const ar1 = V.arrow($('#schsvg'), 'M326 115H360', { cls: 'ink', w: 7, head: 26 }), ar2 = V.arrow($('#schsvg'), 'M700 115H734', { cls: 'ink', w: 7, head: 26 });
  gsap.set(sch, { autoAlpha: 0, y: 150 });
  gsap.set([$('#e1'), $('#e2'), $('#mb'), $('#n1'), $('#n2'), $('#d1'), $('#d2')], { autoAlpha: 0 });
  ctx.to(sch, { autoAlpha: 1, duration: 0.5 }, 1.0);
  ctx.drawArrow(ar1, 1.4, 0.4).drawArrow(ar2, 1.7, 0.4);
  const lit = (el, t, col, bg) => ctx.tint(el, t, { borderColor: col, boxShadow: `8px 8px 0 ${bg}` }).pulse(el, t, { scale: 1.05 });
  lit(bx[1], T('Modelle sind vereinfachte'), C.c1, C.c1bg);
  ctx.pulse([bx[0], bx[2]], T('zwei Arten von Variablen'), { scale: 1.05 });
  lit(bx[0], T('Exogene Variablen werden'), C.c4, C.c4bg);
  lit(bx[2], T('Endogene Variablen werden'), C.c3, C.c3bg);
  // „… wie sich Änderungen der exogenen Variablen auf die endogenen auswirken“
  const tW = T('Das Modell zeigt also');
  ctx.to('#d1', { autoAlpha: 1, duration: 0.3 }, T('Änderungen der exogenen')).pulse(bx[0], T('Änderungen der exogenen'), { scale: 1.05 });
  ctx.to('#gear', { rotation: 360, duration: 3.2, ease: 'power1.inOut' }, tW + 0.4);
  ctx.pulse(ar1, T('Änderungen der exogenen') + 0.5, { scale: 1.3 });
  ctx.pulse(ar2, T('auf die endogenen') - 0.2, { scale: 1.3 });
  ctx.to('#d2', { autoAlpha: 1, duration: 0.3 }, T('auf die endogenen')).pulse(bx[2], T('auf die endogenen'), { scale: 1.05 });
  gsap.set([ar1, ar2], { transformOrigin: '50% 50%' });

  /* ---------- Beispiel: Markt für Brot ---------- */
  const t2 = T('Das Beispiel aus dem Skript');
  ctx.hide(['#d1', '#d2'].map(s => $(s)), t2 - 0.5);
  ctx.to(sch, { y: 0, duration: 0.6, ease: 'power3.inOut' }, t2 - 0.45);
  ctx.show('#dg', t2 + 0.1, { y: 30 });
  ctx.to('#mb', { autoAlpha: 1, duration: 0.3 }, T('der Markt für Brot'));
  ctx.to('#e1', { autoAlpha: 1, duration: 0.3 }, T('das Einkommen der Haushalte')).to('#e2', { autoAlpha: 1, duration: 0.3 }, T('der Mehlpreis'));
  ctx.to('#n1', { autoAlpha: 1, duration: 0.3 }, T('der Brotpreis')).to('#n2', { autoAlpha: 1, duration: 0.3 }, T('die gehandelte Menge'));

  const P = V.plot({ w: 634, h: 392, x: [0, 10], y: [0, 10], pad: { l: 84, r: 64, t: 46, b: 70 } });
  $('#dg').appendChild(P.el);
  const ax = P.axes({ xl: 'Q', yl: 'P' }), [xl, yl] = ax.querySelectorAll('text.axl');
  const D = P.line(1, 9, 9, 1, { cls: 'c1' }), S = P.line(1, 1, 9, 9, { cls: 'c2' });
  const lD = P.text(9, 1, 'D', { cls: 'c1', dx: 14, dy: 10, anchor: 'start' }), lD1 = P.text(9, 1, 'D₁', { cls: 'old', dx: 14, dy: 10, anchor: 'start' });
  const lS = P.text(9, 9, 'S', { cls: 'c2', dx: 14, dy: 8, anchor: 'start' }), lS1 = P.text(9, 9, 'S₁', { cls: 'old', dx: 14, dy: 8, anchor: 'start' });
  const g0 = P.g();
  const gv = P.add('line', { x1: P.X(5), y1: P.Y(5), x2: P.X(5), y2: P.Y(0), class: 'dash' }, null, g0), gh = P.add('line', { x1: P.X(5), y1: P.Y(5), x2: P.X(0), y2: P.Y(5), class: 'dash' }, null, g0);
  const lP1 = P.text(0, 5, 'P₁', { cls: 'mute', dx: -14, dy: 10, anchor: 'end', parent: g0 }), lQ1 = P.text(5, 0, 'Q₁', { cls: 'mute', dy: 38, parent: g0 });
  const dot = P.dot(5, 5, { cls: 'ink', r: 11 });
  gsap.set([lD, lD1, lS, lS1, lP1, lQ1], { autoAlpha: 0 });
  gsap.set(dot, { transformOrigin: '50% 50%' });
  ctx.draw(D, t2 + 0.5, 0.6).to(lD, { autoAlpha: 1, duration: 0.25 }, t2 + 1.0);
  ctx.draw(S, t2 + 1.0, 0.6).to(lS, { autoAlpha: 1, duration: 0.25 }, t2 + 1.5);
  ctx.pop(dot, t2 + 1.7);
  ctx.extend([gv, gh], t2 + 1.9, 0.5).to([lP1, lQ1], { autoAlpha: 1, duration: 0.25 }, t2 + 2.3);
  // endogen: Preis und Menge stehen an den Achsen
  ctx.tint(yl, T('der Brotpreis'), { fill: C.c3 }).tint(xl, T('die gehandelte Menge'), { fill: C.c3 });
  gsap.set([xl, yl], { transformOrigin: '50% 50%' });
  ctx.pulse(yl, T('der Brotpreis'), { scale: 1.5 }).pulse(xl, T('die gehandelte Menge'), { scale: 1.5 });

  // Bausteine eines Falls: neue Kurve, neuer Punkt, Hilfslinien, Pfeile an den Achsen
  const mkCase = (o) => {
    const g = P.g();
    const ln = P.line(...o.line, { cls: o.cls, parent: g });
    const ll = P.text(o.lab[0], o.lab[1], o.lab[2], { cls: o.cls, dx: o.lab[3], dy: o.lab[4], anchor: o.lab[5] || 'start', parent: g });
    const sh = V.arrow(g, `M${P.X(o.shift[0])} ${P.Y(o.shift[2])}H${P.X(o.shift[1])}`, { cls: o.cls, w: 6, head: 22 });
    const v = P.add('line', { x1: P.X(o.eq[0]), y1: P.Y(o.eq[1]), x2: P.X(o.eq[0]), y2: P.Y(0), class: 'dash c3' }, null, g), h = P.add('line', { x1: P.X(o.eq[0]), y1: P.Y(o.eq[1]), x2: P.X(0), y2: P.Y(o.eq[1]), class: 'dash c3' }, null, g);
    const lp = P.text(0, o.eq[1], 'P₂', { cls: 'c3', dx: -14, dy: 10, anchor: 'end', parent: g }), lq = P.text(o.eq[0], 0, 'Q₂', { cls: 'c3', dy: 38, parent: g });
    const d = P.dot(o.eq[0], o.eq[1], { cls: 'c3', r: 12, parent: g });
    const aP = V.arrow(g, `M${P.X(0) + 20} ${P.Y(5.25)}V${P.Y(6.25)}`, { cls: 'c3', w: 6, head: 20 });
    const aQ = V.arrow(g, `M${P.X(o.q[0])} ${P.Y(0) - 18}H${P.X(o.q[1])}`, { cls: o.qcls, w: 6, head: 20 });
    gsap.set([ll, lp, lq, sh, aP, aQ], { autoAlpha: 0 });
    gsap.set(d, { transformOrigin: '50% 50%' });
    return { g, ln, ll, sh, v, h, lp, lq, d, aP, aQ };
  };
  const play = (K, t, tRes) => {
    ctx.pen(K.ln, t + 0.5, 1.0);
    ctx.drawArrow(K.sh, t + 1.3, 0.4);
    ctx.to(K.ll, { autoAlpha: 1, duration: 0.25 }, t + 1.5);
    ctx.pop(K.d, tRes - 0.9);
    ctx.extend([K.v, K.h], tRes - 0.5, 0.45);
    ctx.to([K.lp, K.lq], { autoAlpha: 1, duration: 0.25 }, tRes);
    ctx.drawArrow(K.aP, tRes, 0.35).drawArrow(K.aQ, tRes + 0.5, 0.35);
  };
  gsap.set(['#a1', '#a2', '#a3', '#b1', '#b2', '#b3'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([$('#cA'), $('#cB')], { autoAlpha: 0 });

  // Fall 1: Einkommen steigt -> Nachfrage nach rechts
  const tA = T('Steigt das Einkommen'), tAr = T('Preis und Menge steigen');
  const KA = mkCase({ line: [4, 9, 9.6, 3.4], cls: 'c1', lab: [9.6, 3.4, 'D₂', 8, -12, 'middle'], shift: [2.9, 5.2, 7.5], eq: [6.5, 6.5], q: [5.25, 6.25], qcls: 'c3' });
  ctx.to('#cA', { autoAlpha: 1, duration: 0.3 }, tA - 0.1).to('#a1', { autoAlpha: 1, duration: 0.3 }, tA);
  ctx.pulse('#e1', tA, { scale: 1.12 });
  ctx.tint(D, tA + 0.4, { stroke: C.old }).to(lD, { autoAlpha: 0, duration: 0.2 }, tA + 0.4).to(lD1, { autoAlpha: 1, duration: 0.2 }, tA + 0.5);
  ctx.to('#a2', { autoAlpha: 1, duration: 0.3 }, T('verschiebt sich die Nachfragekurve'));
  play(KA, T('verschiebt sich die Nachfragekurve') - 0.5, tAr);
  ctx.to('#a3', { autoAlpha: 1, duration: 0.3 }, tAr).pulse(['#n1', '#n2'].map(s => $(s)), tAr, { scale: 1.1 });

  // Fall 2: Mehlpreis steigt -> Angebot nach links
  const tB = T('Steigt dagegen'), tBr = T('Der Preis steigt, die Menge sinkt');
  const KB = mkCase({ line: [1, 4, 6, 9], cls: 'c2', lab: [6, 9, 'S₂', 0, -14, 'middle'], shift: [7.2, 4.9, 7.5], eq: [3.5, 6.5], q: [4.75, 3.75], qcls: 'c2' });
  ctx.to(KA.g, { autoAlpha: 0, duration: 0.3 }, tB - 0.35).tint(D, tB - 0.35, { stroke: C.c1 }).to(lD1, { autoAlpha: 0, duration: 0.2 }, tB - 0.35).to(lD, { autoAlpha: 1, duration: 0.2 }, tB - 0.2);
  ctx.dim('#cA', tB - 0.2, { to: 0.5 });
  ctx.to('#cB', { autoAlpha: 1, duration: 0.3 }, tB - 0.1).to('#b1', { autoAlpha: 1, duration: 0.3 }, tB);
  ctx.pulse('#e2', T('der Mehlpreis', { n: 2 }), { scale: 1.12 });
  ctx.tint(S, tB + 0.6, { stroke: C.old }).to(lS, { autoAlpha: 0, duration: 0.2 }, tB + 0.6).to(lS1, { autoAlpha: 1, duration: 0.2 }, tB + 0.7);
  ctx.to('#b2', { autoAlpha: 1, duration: 0.3 }, T('verschiebt sich die Angebotskurve'));
  play(KB, T('verschiebt sich die Angebotskurve') - 0.5, tBr);
  ctx.to('#b3', { autoAlpha: 1, duration: 0.3 }, tBr).pulse(['#n1', '#n2'].map(s => $(s)), tBr, { scale: 1.1 });

  /* ---------- Warum vereinfachen? ---------- */
  const t3 = T('Und warum vereinfachen');
  ctx.hide(['#dg', '#cA', '#cB'].map(s => $(s)), t3 - 0.35, { dur: 0.3 });
  const mts = $$('.mt'), cks = $$('.mt .ck');
  gsap.set([$('#m1p'), $('#m1x')], { autoAlpha: 0 });
  ctx.show('#m1', t3, { y: 26 });
  ctx.draw($('#tangle'), T('Ein Modell, das alles'), 2.6, { ease: 'none' });
  ctx.to('#m1p', { autoAlpha: 1, duration: 0.3 }, T('wäre so kompliziert'));
  ctx.pop('#m1x', T('dass es nichts mehr erklärt'));
  const t4 = T('Deshalb gibt es');
  ctx.show('#m2', t4, { y: 24 });
  ctx.pop(mts, T('für verschiedene Fragen') - 0.2, { stagger: 0.25, scale: 0.8 });
  ctx.pop(cks, T('verschiedene Modelle') + 0.2, { stagger: 0.2 });
});
