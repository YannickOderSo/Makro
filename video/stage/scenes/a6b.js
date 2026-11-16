// Aufgabe 6 c, d – Fiskalpolitik (G ↑) und Geldpolitik (M ↑) im IS/LM-Diagramm (Teil II, Übung 4)
V.scene('a6b', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 6 c, d', title: '<em>Fiskal-</em> und Geldpolitik', src: 'Teil II · Übung 4' });

  ctx.html(`
  <style>
    #sc-a6b .col{left:1040px;top:0;width:688px;height:770px}
    #sc-a6b .col>*{position:absolute;left:0}
    #sc-a6b .tagc{font-size:27px}
    #sc-a6b .chg{width:688px;height:108px;padding:0 22px;display:flex;align-items:center;gap:20px;box-shadow:6px 6px 0 var(--line)}
    #sc-a6b .chg .eq{font-size:44px;font-weight:700}
    #sc-a6b .chg .chip{font-size:26px;margin-left:auto}
    #sc-a6b .eq{font-size:38px;font-weight:600}
    #sc-a6b .box{display:flex;align-items:center;gap:14px;padding:8px 20px 9px 12px;border:4px solid var(--c1);background:var(--c1bg);box-shadow:6px 6px 0 var(--line);font-family:var(--mono);font-weight:800;font-size:32px;white-space:nowrap}
    #sc-a6b .box .tg{background:var(--c1);color:#fff;padding:0 10px;font-size:28px}
    #sc-a6b .box.lm{border-color:var(--c2);background:var(--c2bg)}
    #sc-a6b .box.lm .tg{background:var(--c2)}
    #sc-a6b .note{font-family:var(--sans);font-size:27px;font-weight:500;color:var(--mute)}
    #sc-a6b .res{width:688px;height:108px;padding:0 24px;display:flex;align-items:center;justify-content:space-between}
    #sc-a6b .res .lab{margin:0;font-size:22px}
    #sc-a6b .res .eq{font-size:40px;font-weight:800}
    #sc-a6b .co{width:688px;padding:14px 24px 16px;box-shadow:6px 6px 0 var(--c2bg)}
    #sc-a6b .co .eq{font-size:36px;font-weight:800}
    #sc-a6b .co .row{display:flex;align-items:center;gap:14px;margin-top:8px;font-size:27px;font-weight:600;white-space:nowrap}
    #sc-a6b .co .chip{font-size:27px;padding:2px 10px}
    #sc-a6b .chain{display:flex;align-items:center;gap:12px;font-family:var(--mono);font-weight:800;font-size:30px}
    #sc-a6b .chain .chip{font-size:30px}
    #sc-a6b .tbl{width:688px;font-size:30px;box-shadow:6px 6px 0 var(--line)}
    #sc-a6b .tbl th{padding:7px 20px;font-size:22px}
    #sc-a6b .tbl td{padding:7px 20px;font-weight:600;white-space:nowrap}
    #sc-a6b .tbl td.n{font-weight:800}
    #sc-a6b .tbl tr:last-child td{border-bottom:0}
    #sc-a6b .plot .big{font-size:36px}
    #sc-a6b .plot .sm{font-size:27px}
  </style>

  <div class="abs" id="plotbox" style="left:0;top:0"></div>

  <!-- Teil c -->
  <div class="abs col" id="pc">
    <div class="chip ink tagc" id="cTag" style="top:0">Teil c · Staatsausgaben steigen</div>
    <div class="card chg" id="cG" style="top:60px">${V.icon('staat', 70, { tone: 1 })}<span class="eq">G: 100 → <b class="t-c1" id="cGv">150</b></span><span class="chip c1" id="cDG">ΔG = +50</span></div>
    <div class="lab" id="cLab" style="top:192px;font-size:23px">IS-Kurve verschiebt sich nach rechts um</div>
    <div class="eq" id="cShift" style="top:226px;display:flex;align-items:center;white-space:nowrap">
      <span id="cF1">${V.frac('ΔG', '1 − MPC')}</span><span id="cF2">&nbsp;=&nbsp;${V.frac('50', '0,25')}</span><span id="cF3">&nbsp;=&nbsp;<b class="t-c1" style="font-size:48px">200</b></span>
    </div>
    <div class="box" id="cBox" style="top:348px"><span class="tg">IS<sub>2</sub></span><span>Y = 1900 − 100 r</span></div>
    <div class="res" id="cRes" style="top:428px"><span class="lab">Neues Gleich-<br>gewicht</span><span class="eq" id="cR">r = 7</span><span class="eq" id="cY">Y = 1200</span></div>
    <div class="card c2 co" id="cCo" style="top:560px">
      <div class="eq" id="co1">ΔY = <span class="t-c3">+100</span> <span id="co1b">statt <span class="t-old">+200</span></span></div>
      <div class="row" id="co2"><span class="chip c2" id="coChip">Crowding-out</span><span>Zins ↑ verdrängt Investitionen</span></div>
      <div class="row mono" id="co3" style="font-size:28px;font-weight:700">I = 200 − 25 r:&nbsp; 50 → <span class="t-c2">25</span></div>
    </div>
  </div>

  <!-- Teil d -->
  <div class="abs col" id="pd">
    <div class="chip ink tagc" id="dTag" style="top:0">Teil d · Geldangebot steigt</div>
    <div class="card chg" id="dM" style="top:60px">${V.icon('note', 62, { tone: 2 })}<span class="eq">M: 1000 → <b class="t-c2" id="dMv">1200</b></span><span class="chip" id="dG">G = 100</span></div>
    <div class="eq" id="dMP" style="top:186px;white-space:nowrap">M / P = 1200 / 2 = <b class="t-c2" id="d600">600</b></div>
    <div id="dBoxRow" style="top:254px;display:flex;align-items:center;gap:18px"><div class="box lm" id="dBox"><span class="tg">LM<sub>2</sub></span><span>Y = 600 + 100 r</span></div><span class="note" id="dNote">+100 nach rechts</span></div>
    <div class="res" id="dRes" style="top:334px"><span class="lab">Neues Gleich-<br>gewicht</span><span class="eq" id="dR">r = 5,5</span><span class="eq" id="dY">Y = 1150</span></div>
    <div class="chain" id="dChain" style="top:462px"><span class="chip c2">M ↑</span><span>→</span><span class="chip c2">r ↓</span><span>→</span><span class="chip c3">I ↑</span><span>→</span><span class="chip c3">Y ↑</span></div>
    <table class="tbl" id="dTbl" style="top:534px">
      <tr><th>Überblick</th><th class="n">r</th><th class="n">Y</th></tr>
      <tr><td>Ausgangslage</td><td class="n">6</td><td class="n">1100</td></tr>
      <tr><td><span class="t-c1">c)</span> G ↑ auf 150</td><td class="n">7</td><td class="n">1200</td></tr>
      <tr id="dRow"><td><span class="t-c2">d)</span> M ↑ auf 1200</td><td class="n t-c3">5,5</td><td class="n t-c3">1150</td></tr>
    </table>
  </div>`);

  /* ---------- Diagramm (Ausschnitt um das Gleichgewicht) ---------- */
  const P = V.plot({ w: 1000, h: 770, x: [600, 1800], y: [2, 9], pad: { l: 100, r: 70, t: 56, b: 96 } });
  P.el.classList.add('plot');
  $('#plotbox').appendChild(P.el);
  const X = P.X, Y = P.Y, y0 = Y(2), x0 = X(600), u = X(700) - X(600); // u = Pixel je 100 Einheiten Y
  const axes = P.axes({ xl: 'Y', yl: 'r', xt: [[800, '800'], [1400, '1400'], [1700, '1700']], yt: [[3, '3'], [4, '4'], [5, '5'], [8, '8']] });
  // Achsen sind gekappt (Ausschnitt): kleine Bruchzeichen
  P.add('path', { d: `M${x0 + 22} ${y0 + 9}l7 -18m6 18l7 -18`, class: 'tick' }, null, axes);
  P.add('path', { d: `M${x0 - 9} ${y0 - 22}l18 -7m-18 -6l18 -7`, class: 'tick' }, null, axes);
  P.add('text', { x: X(1800) + 20, y: Y(9) - 4, class: 'tickl', 'text-anchor': 'end' }, 'Ausschnitt', axes);
  const rTick = (v, txt, cls) => P.add('text', { x: x0 - 22, y: Y(v) + 10, class: cls, 'text-anchor': 'end' }, txt);
  const yTick = (v, txt, cls, row = 0) => P.add('text', { x: X(v), y: y0 + 48 + row * 38, class: cls, 'text-anchor': 'middle' }, txt);
  [6, 7].forEach(v => P.add('line', { x1: x0 - 12, y1: Y(v), x2: x0, y2: Y(v), class: 'tick' }, null, axes));
  P.add('line', { x1: X(1100), y1: y0, x2: X(1100), y2: y0 + 12, class: 'tick' }, null, axes);
  const m7 = rTick(7, '7', 'tickl');

  // alte Lagen (grau), zunächst unsichtbar
  const isOld = P.line(1500, 2, 800, 9, { cls: 'old' }), lmOld = P.line(700, 2, 1400, 9, { cls: 'old' });
  const isOldLab = P.text(800, 9, 'IS₁', { cls: 'old big', dy: -16 }), lmOldLab = P.text(1400, 9, 'LM₁', { cls: 'old big', dy: -16, dx: -6 });
  // Ausgangsgleichgewicht
  const g0 = P.guide(1100, 6);
  const lm = P.line(700, 2, 1400, 9, { cls: 'c2' }), is = P.line(1500, 2, 800, 9, { cls: 'c1' });
  const mkLab = (x, a, b, cls) => {
    const g = P.g();
    const ta = P.add('text', { x: X(x), y: Y(9) - 16, class: 'lbl big ' + cls, 'text-anchor': 'middle' }, a, g);
    const tb = P.add('text', { x: X(x), y: Y(9) - 16, class: 'lbl big ' + cls, 'text-anchor': 'middle' }, b, g);
    gsap.set(tb, { autoAlpha: 0 });
    return { g, ta, tb };
  };
  const isLab = mkLab(800, 'IS', 'IS₂', 'c1'), lmLab = mkLab(1400, 'LM', 'LM₂', 'c2');
  const t6 = rTick(6, '6', 'lbl'), t1100 = yTick(1100, '1100', 'lbl');
  const e0 = P.dot(1100, 6, { cls: 'ink', r: 13 });
  // Teil c
  const shiftC = V.arrow(P.el, `M${X(1380) + 10} ${Y(3.2)}L${X(1580) - 16} ${Y(3.2)}`, { cls: 'c1', w: 6, head: 22 });
  const shiftCLab = P.text(1480, 3.2, '+200', { cls: 'c1', dy: -18 });
  const g1 = P.guide(1200, 7, { cls: 'c3' }); g1._lines.forEach(l => l.classList.add('c3'));
  const t7 = rTick(7, '7', 'lbl c3'), t1200 = yTick(1200, '1200', 'lbl c3', 1);
  const tk1200 = P.add('line', { x1: X(1200), y1: y0, x2: X(1200), y2: y0 + 16, class: 'tick', style: `stroke:${C.c3}` });
  const e1 = P.dot(1200, 7, { cls: 'c3', r: 14 });
  const hyp = P.add('line', { x1: X(1100) + 16, y1: Y(6), x2: X(1300) - 16, y2: Y(6), class: 'dash', style: `stroke:${C.old};stroke-width:4` });
  const hypDot = P.add('circle', { cx: X(1300), cy: Y(6), r: 12, fill: C.bg, stroke: C.old, 'stroke-width': 5 });
  const hypLab = P.text(1300, 6, '1300 bei r = 6', { cls: 'old sm', dx: 24, dy: 10, anchor: 'start' });
  const dY = V.arrow(P.el, `M${X(1100) + 8} ${Y(2.5)}L${X(1200) - 14} ${Y(2.5)}`, { cls: 'c3', w: 6, head: 20 });
  const dYLab = P.text(1200, 2.5, '+100', { cls: 'c3', dx: 14, dy: 10, anchor: 'start' });
  const rUp = V.arrow(P.el, `M${X(670)} ${Y(6) - 8}L${X(670)} ${Y(7) + 16}`, { cls: 'c2', w: 6, head: 22 });
  const rUpLab = P.text(670, 6.5, 'r ↑', { cls: 'c2', dx: 20, dy: 10, anchor: 'start' });
  // Teil d
  const shiftD = V.arrow(P.el, `M${X(830) + 8} ${Y(3.3)}L${X(930) - 14} ${Y(3.3)}`, { cls: 'c2', w: 6, head: 20 });
  const shiftDLab = P.text(930, 3.3, '+100', { cls: 'c2', dx: 20, dy: 10, anchor: 'start' });
  const g2 = P.guide(1150, 5.5, { cls: 'c3' }); g2._lines.forEach(l => l.classList.add('c3'));
  const t55 = rTick(5.5, '5,5', 'lbl c3'), t1150 = yTick(1150, '1150', 'lbl c3', 1);
  const tk1150 = P.add('line', { x1: X(1150), y1: y0, x2: X(1150), y2: y0 + 16, class: 'tick', style: `stroke:${C.c3}` });
  const e2 = P.dot(1150, 5.5, { cls: 'c3', r: 14 });
  const rDn = V.arrow(P.el, `M${X(670)} ${Y(6) + 6}L${X(670)} ${Y(5.5) - 12}`, { cls: 'c2', w: 6, head: 20 });
  const rDnLab = P.text(670, 5.75, 'r ↓', { cls: 'c2', dx: 20, dy: 10, anchor: 'start' });
  // Punkte über die Linien legen
  [e0, e1, e2].forEach(e => P.el.appendChild(e));

  const hidden = [isOld, lmOld, isOldLab, lmOldLab, shiftCLab, t7, t1200, tk1200, e1, hyp, hypDot, hypLab, dYLab, rUpLab, shiftDLab, t55, t1150, tk1150, e2, rDnLab, shiftC, dY, rUp, shiftD, rDn];
  gsap.set(hidden, { autoAlpha: 0 });
  const fade = (els, t, a = 1, d = 0.35) => ctx.to(els, { autoAlpha: a, duration: d }, t);
  const popDot = (e, t) => ctx.tl.fromTo(e, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', immediateRender: false }, t);
  const arrowIn = (a, t, d = 0.5) => { ctx.set(a, { autoAlpha: 1 }, t); ctx.drawArrow(a, t, d); gsap.set(a, { autoAlpha: 0 }); };

  /* ---------- Teil c ---------- */
  ctx.show('#cTag', 0.5, { x: 30, y: 0 });
  ctx.pulse(e0, 0.9, { scale: 1.5 });
  const tG = T('Die Staatsausgaben steigen');
  ctx.show('#cG', tG, { x: 40, y: 0 });
  ctx.count('#cGv', 150, T('auf hundertfünfzig'), { from: 100, dur: 0.8, tsep: false });
  ctx.pop('#cDG', T('auf hundertfünfzig') + 0.8);
  // IS wandert nach rechts, alte Lage bleibt grau stehen
  const tS = T('verschiebt sich nach rechts');
  ctx.show('#cLab', T('Die IS-Kurve verschiebt') - 0.1, { x: 30, y: 0 });
  fade([isOld, isOldLab], tS, 1, 0.3);
  ctx.to([is, isLab.g], { x: 2 * u, duration: 2.0, ease: 'power2.inOut' }, tS);
  fade(isLab.ta, tS + 0.4, 0, 0.3); fade(isLab.tb, tS + 0.6, 1, 0.3);
  ctx.show('#cF1', T('um den Anstieg mal den Multiplikator'), { y: 16 });
  ctx.show('#cF2', T('fünfzig geteilt durch'), { y: 16 });
  const t200 = T('das sind zweihundert');
  ctx.show('#cF3', t200 + 0.3, { y: 0, scale: 0.6, ease: 'back.out(1.8)' });
  arrowIn(shiftC, t200 + 0.3); fade(shiftCLab, t200 + 0.6);
  ctx.show('#cBox', t200 + 1.2, { x: 30, y: 0 });
  // neues Gleichgewicht
  const tE = T('Im neuen Schnittpunkt');
  popDot(e1, tE + 0.2);
  ctx.show('#cRes', tE + 0.2, { y: 24 });
  gsap.set([$('#cR'), $('#cY')], { autoAlpha: 0 });
  const t7s = T('der Zins bei sieben'), t12 = T('das Einkommen bei zwölfhundert');
  ctx.extend(g1._lines[1], t7s + 0.3, 0.6); fade(t7, t7s + 0.8); fade(m7, t7s + 0.8, 0, 0.2); fade($('#cR'), t7s + 0.5);
  ctx.extend(g1._lines[0], t12 + 0.5, 0.6); fade([t1200, tk1200], t12 + 1.0); fade($('#cY'), t12 + 0.8);
  // Einordnung: nur +100 statt +200
  const tN = T('Das Einkommen steigt also nur');
  ctx.show('#cCo', tN, { y: 24 });
  gsap.set([$('#co1b'), $('#co2'), $('#co3')], { autoAlpha: 0 });
  arrowIn(dY, T('nur um hundert') + 0.1, 0.4); fade(dYLab, T('nur um hundert') + 0.3);
  const tH = T('statt um zweihundert');
  fade($('#co1b'), tH); ctx.extend(hyp, tH, 0.6); fade([hypDot, hypLab], tH + 0.5);
  const tW = T('Der höhere Zins verdrängt');
  arrowIn(rUp, tW, 0.5); fade(rUpLab, tW + 0.3);
  fade($('#co2'), tW + 0.2);
  fade($('#co3'), T('private Investitionen'));
  gsap.set($('#coChip'), { scale: 1 });
  ctx.pulse('#coChip', T('Crowding-out'), { scale: 1.2 });

  /* ---------- Teil d ---------- */
  const tD = T('Teil d:');
  ctx.hide('#pc', tD - 0.3, { dur: 0.3 });
  gsap.set($('#pd'), { autoAlpha: 0 }); ctx.to('#pd', { autoAlpha: 1, duration: 0.01 }, tD - 0.05);
  ctx.show('#dTag', tD, { x: 30, y: 0 });
  ctx.show('#dTbl', tD + 0.5, { y: 24 });
  gsap.set($('#dRow'), { autoAlpha: 0 });
  // Diagramm zurück auf die Ausgangslage
  const tZ = T('Zurück zum Ausgangspunkt');
  fade([e1, t7, t1200, tk1200, hyp, hypDot, hypLab, dY, dYLab, rUp, rUpLab, shiftC, shiftCLab, ...g1._lines], tZ, 0, 0.4);
  fade(m7, tZ + 0.2, 1, 0.3);
  ctx.to([is, isLab.g], { x: 0, duration: 1.0, ease: 'power2.inOut' }, tZ);
  fade(isLab.tb, tZ + 0.3, 0, 0.3); fade(isLab.ta, tZ + 0.5, 1, 0.3);
  fade([isOld, isOldLab], tZ + 0.7, 0, 0.3);
  ctx.pulse(e0, tZ + 1.0, { scale: 1.5 });
  const tM = T('Jetzt steigt das Geldangebot');
  ctx.show('#dM', tM, { x: 40, y: 0 });
  ctx.count('#dMv', 1200, T('tausend auf zwölfhundert') + 0.5, { from: 1000, dur: 0.8, tsep: false });
  ctx.show('#dMP', T('Das reale Geldangebot wächst'), { x: 30, y: 0 });
  ctx.pulse('#d600', T('auf sechshundert') + 0.3, { scale: 1.3 });
  const tL = T('die LM-Kurve verschiebt sich');
  fade([lmOld, lmOldLab], tL, 1, 0.3);
  ctx.to([lm, lmLab.g], { x: u, duration: 1.8, ease: 'power2.inOut' }, tL);
  ctx.to(lmLab.g, { x: u + 14, duration: 1.8, ease: 'power2.inOut' }, tL);
  fade(lmLab.ta, tL + 0.4, 0, 0.3); fade(lmLab.tb, tL + 0.6, 1, 0.3);
  ctx.show('#dBox', tL + 0.5, { x: 30, y: 0 });
  const t100 = T('um hundert nach rechts');
  arrowIn(shiftD, t100, 0.4); fade(shiftDLab, t100 + 0.3); ctx.show('#dNote', t100 + 0.2, { x: 16, y: 0 });
  const tE2 = T('Im neuen Gleichgewicht');
  popDot(e2, tE2 + 0.2);
  ctx.show('#dRes', tE2 + 0.2, { y: 24 });
  gsap.set([$('#dR'), $('#dY')], { autoAlpha: 0 });
  const t55s = T('fünf Komma fünf'), t115 = T('elfhundertfünfzig');
  ctx.extend(g2._lines[1], t55s - 0.4, 0.6); fade(t55, t55s + 0.1); fade($('#dR'), t55s - 0.1);
  arrowIn(rDn, t55s + 0.3, 0.4); fade(rDnLab, t55s + 0.5);
  ctx.extend(g2._lines[0], t115 - 0.4, 0.6); fade([t1150, tk1150], t115 + 0.1); fade($('#dY'), t115 - 0.1);
  fade($('#dRow'), t115 + 0.6); ctx.tint('#dRow', t115 + 0.6, { backgroundColor: C.c3bg });
  // Wirkungskette
  const ch = $$('#dChain > *');
  gsap.set(ch, { autoAlpha: 0 });
  const tc = [T('Mehr Geld'), T('senkt den Zins'), T('senkt den Zins') + 0.25, T('regt die Investitionen'), T('regt die Investitionen') + 0.3, T('Investitionen an') + 0.3, T('Investitionen an') + 0.6];
  ch.forEach((c, i) => fade(c, tc[i], 1, 0.3));
});
