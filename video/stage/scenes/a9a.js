// Aufgabe 9 (Teil 1) – Lückentext: LRAS/SRAS, Output und Preisniveau in kurzer und langer Frist
V.scene('a9a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 9', title: 'Lückentext: <em>AD und AS</em>', src: 'Skript II, Folien 15–22' });

  const ov = s => `<span style="text-decoration:overline;text-decoration-thickness:3px">${s}</span>`;
  const gap = (s, id) => `<span class="gp" id="${id}"><b>${s}</b></span>`;
  const QS = ['LRAS / SRAS', 'Output, Preise', 'Neutralität', 'real / nominal', 'Geldfunktionen'];
  const chk = `<svg class="chk" width="40" height="40" viewBox="0 0 40 40"><path d="M10 21l7 7 13-16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  ctx.html(`
  <style>
    #sc-a9a .qs{left:0;top:0;width:1728px;height:60px;display:flex;gap:12px}
    #sc-a9a .qc{flex:1;display:flex;align-items:center;gap:14px;padding:0 16px;border:3px solid var(--line);background:var(--panel);font-weight:700;font-size:28px;color:var(--mute);white-space:nowrap}
    #sc-a9a .qn{position:relative;flex:none;width:40px;height:40px;border-radius:50%;background:var(--soft);color:var(--mute);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:26px}
    #sc-a9a .qn .chk{position:absolute;inset:0}
    #sc-a9a .gp{display:inline-block;border-bottom:4px solid var(--ink);background:var(--soft);padding:0 14px;margin:0 2px;font-weight:800;line-height:1.22}
    #sc-a9a .gp b{display:inline-block}
    #sc-a9a .qcard{left:940px;width:788px;padding:20px 30px 22px}
    #sc-a9a .ln{font-size:38px;font-weight:600;line-height:1.62;white-space:nowrap}
    #sc-a9a .blk{margin-top:14px}
    #sc-a9a .blk .ln{font-size:38px;line-height:1.48;margin-top:6px}
    #sc-a9a .blk .chip{font-size:25px;letter-spacing:.08em}
    #sc-a9a .plotbox{left:0;top:78px}
  </style>
  <div class="abs qs">${QS.map((q, i) => `<div class="qc"><span class="qn"><span class="num">${i + 1}</span>${chk}</span><span>${q}</span></div>`).join('')}</div>
  <div class="abs plotbox" id="pb"></div>

  <div class="abs card qcard" id="q1" style="top:78px">
    <span class="lab">Frage 1 · Wie verlaufen die Angebotskurven?</span>
    <div class="ln"><b class="t-c1" id="wL">LRAS</b> verläuft ${gap('senkrecht', 'g1')} bei ${gap(ov('Y'), 'g2')}</div>
    <div class="ln"><b class="t-c2" id="wS">SRAS</b> verläuft ${gap('waagerecht', 'g3')} bei ${gap(ov('P'), 'g4')}</div>
  </div>
  <div class="abs card qcard" id="q2" style="top:320px;height:450px">
    <span class="lab">Frage 2 · Die Nachfrage geht zurück</span>
    <div class="blk" id="bk"><span class="chip c2">KURZE FRIST · A → B</span>
      <div class="ln">${gap('Output', 'g5')} reagiert,<br><span id="pk" style="display:inline-block">Preisniveau bleibt konstant</span></div></div>
    <div class="blk" id="bl"><span class="chip c1">LANGE FRIST · B → C</span>
      <div class="ln">nur das ${gap('Preisniveau', 'g6')} reagiert,<br><span id="yl" style="display:inline-block">Output = ${ov('Y')}</span></div></div>
  </div>`);

  /* ---------- Fragen-Leiste ---------- */
  const qc = $$('.qc'), qn = $$('.qn'), num = $$('.qn .num'), chks = $$('.qn .chk');
  gsap.set(chks, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' });
  const qActive = (i, t) => { ctx.tint(qc[i], t, { backgroundColor: C.ink, borderColor: C.ink, color: '#fff' }).tint(qn[i], t, { backgroundColor: '#fff', color: C.ink }).pulse(qc[i], t, { scale: 1.05 }); };
  const qDone = (i, t) => {
    ctx.tint(qc[i], t, { backgroundColor: C.c3bg, borderColor: C.c3, color: C.c3 }).tint(qn[i], t, { backgroundColor: C.c3 });
    ctx.to(num[i], { autoAlpha: 0, duration: 0.2 }, t).to(chks[i], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t + 0.1);
  };
  const fillGap = (sel, t, col, bg) => {
    const g = $(sel), b = g.querySelector('b');
    gsap.set(b, { autoAlpha: 0, y: -34, scale: 1.4 });
    ctx.to(b, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, t);
    ctx.tint(g, t, { backgroundColor: bg, borderColor: col, color: col });
  };
  ctx.pop(qc, 1.3, { stagger: 0.14 });
  ctx.pulse('.qs', T('fünf Fragen'), { scale: 1.02 });

  /* ---------- Diagramm ---------- */
  const P = V.plot({ w: 900, h: 692, x: [0, 10], y: [0, 10], pad: { l: 110, r: 70, t: 56, b: 84 } });
  $('#pb').appendChild(P.el);
  const axes = P.axes({ xl: 'Y', yl: 'P' });
  const YB = 6.5, PB = 6, K1 = YB * PB, YS = 4.3, K2 = YS * PB, PC = K2 / YB;
  const X = P.X, Y = P.Y;
  // Buchstabe mit Überstrich als Gruppe
  const obar = (x, y, ch, cls, anchor = 'middle') => {
    const g = P.g();
    P.add('text', { x, y, class: 'lbl ' + cls, 'text-anchor': anchor }, ch, g);
    const x0 = anchor === 'end' ? x - 18 : x - 9;
    P.add('line', { x1: x0 - 1, y1: y - 28, x2: x0 + 19, y2: y - 28, class: cls, 'stroke-width': 3.5 }, null, g);
    return g;
  };
  const sub = (x, y, a, b, cls, anchor = 'start') => { const t = P.add('text', { x, y, class: 'lbl ' + cls, 'text-anchor': anchor }); t.innerHTML = `${a}<tspan dy="9" style="font-size:22px">${b}</tspan>`; return t; };
  const spop = (e, t) => { gsap.set(e, { transformOrigin: '50% 50%' }); ctx.pop(e, t); };

  const adD = k => P.d(x => k / x, k / 9.4, 9.4, 80);
  const ghost = P.add('path', { d: adD(K1), class: 'curve old thin', 'stroke-dasharray': '12 10' });
  const sras = P.line(0, PB, 9.2, PB, { cls: 'c2' });
  const sras2 = P.line(0, PB, 9.2, PB, { cls: 'c2' });
  const guideB = P.add('line', { x1: X(YS), y1: Y(PB), x2: X(YS), y2: Y(0), class: 'dash c2' });
  const ad = P.add('path', { d: adD(K1), class: 'curve c3' });
  const lras = P.line(YB, 0, YB, 9.7, { cls: 'c1' });
  const lLras = P.text(YB, 9.7, 'LRAS', { cls: 'c1', dy: -12 });
  const lSras = P.text(0.3, PB, 'SRAS', { cls: 'c2', dy: -16, anchor: 'start' });
  const lSras2 = sub(X(0.3), Y(PC) - 16, 'SRAS', '2', 'c2');
  const lAd1 = sub(X(9.4) + 12, Y(K1 / 9.4) + 10, 'AD', '1', 'c3');
  const lAd2 = sub(X(9.4) + 12, Y(K2 / 9.4) + 10, 'AD', '2', 'c3');
  const tYbar = obar(X(YB), Y(0) + 50, 'Y', 'c1');
  const tPbar = obar(X(0) - 22, Y(PB) + 10, 'P', 'c2', 'end');
  const tY1 = sub(X(YS), Y(0) + 50, 'Y', '1', 'c2', 'middle');
  const tP2 = sub(X(0) - 22, Y(PC) + 10, 'P', '2', 'c1', 'end');
  const shiftArr = V.arrow(P.el, `M${X(K1 / 8.2) - 12} ${Y(8.2)}L${X(K2 / 8.2) + 20} ${Y(8.2)}`, { cls: 'c3', w: 6, head: 22 });
  const trailAB = V.arrow(P.el, `M${X(YB) - 22} ${Y(PB) - 28}L${X(YS) + 40} ${Y(PB) - 28}`, { cls: 'c2', w: 6, head: 22 });
  let dBC = ''; for (let i = 0; i <= 30; i++) { const x = 4.8 + (1.1 * i) / 30; dBC += `${i ? 'L' : 'M'}${(X(x) + 26).toFixed(1)} ${(Y(K2 / x) - 18).toFixed(1)}`; }
  const trailBC = V.arrow(P.el, dBC, { cls: 'c1', w: 6, head: 22 });
  const arrX = V.arrow(P.el, `M${X(YB) - 6} ${Y(0) + 72}L${X(YS) + 12} ${Y(0) + 72}`, { cls: 'c2', w: 6, head: 20 });
  const arrP = V.arrow(P.el, `M28 ${Y(PB) + 8}L28 ${Y(PC) - 12}`, { cls: 'c1', w: 6, head: 20 });
  const dotA = P.dot(YB, PB, { cls: 'old', r: 10 }), dotB = P.dot(YS, PB, { cls: 'old', r: 10 });
  const lA = P.text(YB, PB, 'A', { dx: 24, dy: -18 }), lB = P.text(YS, PB, 'B', { dy: -22 }), lC = P.text(YB, PC, 'C', { dx: -26, dy: 42 });
  const dot = P.dot(YB, PB, { cls: 'ink', r: 14 });

  gsap.set([ghost, sras2, guideB, lLras, lSras, lSras2, lAd1, lAd2, tYbar, tPbar, tY1, tP2, dotA, dotB, lA, lB, lC, dot, shiftArr, trailAB, trailBC, arrX, arrP], { autoAlpha: 0 });
  const fade = (e, t, d = 0.35) => ctx.to(e, { autoAlpha: 1, duration: d }, t);
  ctx.show(axes, 0.8, { y: 0 });

  /* ---------- Frage 1: LRAS / SRAS ---------- */
  const t1 = T('Erstens');
  qActive(0, t1);
  ctx.show('#q1', t1 + 0.2, { x: 40, y: 0 });
  ctx.pulse('#wL', T('Die langfristige'), { scale: 1.2 });
  fade(lLras, T('LRAS,'));
  ctx.draw(lras, T('verläuft senkrecht'), 0.9);
  fillGap('#g1', T('senkrecht'), C.c1, C.c1bg);
  spop(tYbar, T('natürlichen Output'));
  fillGap('#g2', T('natürlichen Output') + 0.15, C.c1, C.c1bg);
  ctx.pulse('#wS', T('Die kurzfristige'), { scale: 1.2 });
  fade(lSras, T('SRAS,'));
  ctx.draw(sras, T('verläuft waagerecht'), 0.9);
  fillGap('#g3', T('waagerecht'), C.c2, C.c2bg);
  spop(tPbar, T('gegebenen Preisniveau'));
  fillGap('#g4', T('gegebenen Preisniveau') + 0.15, C.c2, C.c2bg);

  /* ---------- Frage 2: Nachfragerückgang ---------- */
  const t2 = T('Zweitens');
  qDone(0, t2); qActive(1, t2 + 0.15);
  ctx.show('#q2', t2 + 0.2, { x: 40, y: 0 });
  gsap.set([$('#bk'), $('#bl')], { autoAlpha: 0, x: 30 });
  const tAd = T('Was passiert mit');
  ctx.draw(ad, tAd, 1.1);
  ctx.set(ad, { strokeDasharray: 'none' }, tAd + 1.15);
  fade(lAd1, tAd + 1.0);
  fade(dot, T('Output und Preisniveau?') + 0.6, 0.01); spop(dot, T('Output und Preisniveau?') + 0.6);
  fade(lA, T('Output und Preisniveau?') + 0.8);
  // AD verschiebt sich nach links
  const tS = T('die Nachfrage geht zurück');
  fade(ghost, tS, 0.2);
  const stK = { k: K1 };
  ctx.tl.to(stK, { k: K2, duration: 1.4, ease: 'power2.inOut', onUpdate: () => ad.setAttribute('d', adD(stK.k)) }, tS + 0.1);
  ctx.drawArrow(shiftArr, tS + 0.3, 0.8);
  ctx.tint(lAd1, tS + 0.3, { fill: C.old });
  fade(lAd2, tS + 1.4);
  // kurze Frist: A → B
  const tK = T('In der kurzen Frist');
  ctx.to($('#bk'), { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, tK);
  ctx.to(sras, { strokeWidth: 13, duration: 0.3, yoyo: true, repeat: 1 }, T('Preise starr') - 0.1);
  ctx.pulse(tPbar, T('Preise starr'), { scale: 1.3 });
  const tM = T('rutscht auf');
  fade(dotA, tM, 0.2);
  ctx.to(dot, { attr: { cx: X(YS) }, duration: 2.1, ease: 'power2.inOut' }, tM);
  ctx.drawArrow(trailAB, tM + 0.3, 1.7);
  fade(lB, tM + 2.0);
  const tO = T('Der Output sinkt');
  ctx.extend(guideB, tO, 0.5);
  spop(tY1, tO + 0.4);
  ctx.drawArrow(arrX, tO + 0.5, 0.7);
  fillGap('#g5', T('Output sinkt'), C.c2, C.c2bg);
  ctx.pulse('#pk', T('das Preisniveau bleibt gleich') + 0.2, { scale: 1.07, origin: '0% 50%' });
  ctx.pulse(tPbar, T('das Preisniveau bleibt gleich') + 0.2, { scale: 1.3 });
  // lange Frist: B → C
  const tL = T('In der langen Frist');
  ctx.to($('#bl'), { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, tL);
  const tN = T('geben die Preise nach');
  fade(sras2, tN, 0.01); fade(dotB, tN + 0.2, 0.2);
  ctx.to([sras, lSras], { opacity: 0.35, duration: 0.4 }, tN);
  const stP = { p: PB }, tArr = T('zurück,') + 0.2;
  ctx.tl.to(stP, { p: PC, duration: tArr - tN - 0.1, ease: 'power1.inOut', onUpdate: () => {
    const y = Y(stP.p); sras2.setAttribute('y1', y); sras2.setAttribute('y2', y);
    dot.setAttribute('cx', X(K2 / stP.p)); dot.setAttribute('cy', y);
  } }, tN + 0.1);
  ctx.drawArrow(trailBC, T('Die Wirtschaft kehrt'), 1.9);
  ctx.to(lras, { strokeWidth: 13, duration: 0.3, yoyo: true, repeat: 1 }, T('natürlichen Output zurück'));
  ctx.pulse('#yl', T('natürlichen Output zurück'), { scale: 1.08, origin: '0% 50%' });
  fade(lC, tArr); fade(lSras2, tArr + 0.1);
  const tP = T('niedrigeren Preisniveau');
  spop(tP2, tP);
  ctx.drawArrow(arrP, tP + 0.1, 0.7);
  fillGap('#g6', tP + 0.3, C.c1, C.c1bg);

  /* ---------- Merksatz ---------- */
  const tA = T('Kurzfristig reagiert'), tB = T('langfristig nur');
  ctx.tint('#bk', tA, { backgroundColor: C.c2bg }).pulse('#g5', T('der Output,'), { scale: 1.15 });
  ctx.to(trailAB._path, { strokeWidth: 11, duration: 0.3, yoyo: true, repeat: 1 }, tA);
  ctx.tint('#bk', tB, { backgroundColor: 'rgba(249,228,231,0)' }).tint('#bl', tB, { backgroundColor: C.c1bg }).pulse('#g6', T('nur das Preisniveau') + 0.3, { scale: 1.12 });
  ctx.to(trailBC._path, { strokeWidth: 11, duration: 0.3, yoyo: true, repeat: 1 }, tB);
  qDone(1, ctx.audioEnd + 0.1);
});
