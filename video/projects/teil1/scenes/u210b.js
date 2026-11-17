// Übung 2-10 a – restriktive Fiskalpolitik im Inland: S nach rechts, NX wächst (Bausteine: V.t1, V.t1x)
V.scene('u210b', ctx => {
  const { T, $, $$ } = ctx, C = V.C, X = V.t1x;
  ctx.header({ kicker: 'Übung 2-10 a', title: 'a) Das <em>Inland</em> spart mehr', src: 'Skript I, Folie 97' });
  const ov = s => `<span style="text-decoration:overline">${s}</span>`;

  ctx.html(`
  <style>${X.css('u210b', 372)}
    #sc-u210b .why .ln{display:flex;align-items:center;gap:14px;font-size:29px;font-weight:600;line-height:1.2;margin-top:12px;white-space:nowrap}
    #sc-u210b .why .ln .chip{font-size:28px;flex:none;width:92px;text-align:center;padding:3px 0}
    #sc-u210b .why .ln.ind{padding-left:106px;font-weight:500;color:var(--mute)}
    #sc-u210b .why .sum{margin-top:16px;padding-top:12px;border-top:3px solid var(--line);display:flex;align-items:baseline;gap:18px}
    #sc-u210b .why .sum small{font-family:var(--sans);font-size:27px;font-weight:600;color:var(--mute)}
    #sc-u210b .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 18px;margin-top:8px}
    #sc-u210b .grid .chip{font-size:35px;padding:12px 0;text-align:center}
  </style>
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Ersparnislinie nach rechts', 'S₁ bleibt grau stehen, S₂ parallel daneben'],
    ['r* und I(r*) bleiben', 'hier ist nichts neu zu zeichnen'],
    ['Beide Abstände einzeichnen', 'NX₁ (alt) und NX₂ (neu, länger)'],
  ])}</div>

  <div class="abs card why" id="wA">
    <span class="lab">Warum steigt die Ersparnis?</span>
    <div class="ln" id="l1"><span class="chip c2" id="k1">G ↓</span><span id="l1t">öffentliches Sparen T − G <b class="t-c1">↑</b></span></div>
    <div class="ln" id="l2"><span class="chip c4" id="k2">T ↑</span><span id="l2t">öffentliches Sparen T − G <b class="t-c1">↑</b></span></div>
    <div class="ln ind" id="l3"><span>privates Sparen ↓ – aber Konsum C ↓</span></div>
    <div class="sum" id="sum"><span class="eq"><span class="t-c1">S</span> = ${ov('Y')} − C − G <span class="t-c1">↑</span></span><small>in beiden Fällen</small></div>
  </div>
  <div class="abs res why" id="wR">
    <span class="lab">Ergebnis Teil a</span>
    <div class="grid"><span class="chip c1" id="r1">S ↑</span><span class="chip c3" id="r2">I unverändert</span><span class="chip c4" id="r3">NX ↑</span><span class="chip c2" id="r4">r unverändert</span></div>
    <p id="rp" style="margin-top:20px">Das Inland spart mehr, investiert gleich viel – der größere Überschuss fließt ins Ausland.</p>
  </div>`);

  /* ---------- Ausgangsbild = Schlussbild von u210a ---------- */
  const sheet = $('#sheet'), D = V.t1.make(sheet), P = D.P, O = X.open(P);
  const R = X.rW1, S1 = V.t1.S1, S2 = X.S2a, I1 = V.t1.I(R);
  ctx.hide(O.extras, 1.0);

  const tDraw = T('In der Zeichnung'), tStay = T('Der Weltzins bleibt'), tNX = T('Der waagerechte Abstand'), tRes = T('Das Ergebnis für Teil a');
  ctx.stepsRun('#side', [tDraw, tStay, tNX], { end: tRes });

  /* ---------- Begründung ---------- */
  gsap.set([$('#l1t'), $('#l2t'), $('#l3'), $('#sum')], { autoAlpha: 0 });
  ctx.pop('#k1', T('senkt die Staatsausgaben')).pop('#k2', T('erhöht die Steuern'));
  ctx.show('#sum', T('In beiden Fällen steigt'), { y: 16 });
  ctx.show('#l1t', T('Bei niedrigeren Staatsausgaben') + 0.4, { x: -16, y: 0 }).pulse('#k1', T('Bei niedrigeren Staatsausgaben'), { scale: 1.15 });
  ctx.show('#l2t', T('Bei höheren Steuern') + 0.4, { x: -16, y: 0 }).pulse('#k2', T('Bei höheren Steuern'), { scale: 1.15 });
  ctx.show('#l3', T('Zwar sparen die Haushalte'), { x: -16, y: 0 });
  ctx.pulse('#sum', T('Unter dem Strich'), { scale: 1.06, origin: '0% 50%' });
  X.thick(ctx, D.S, T('Unter dem Strich') + 0.6);

  /* ---------- Schritt 1: S₁ → S₂ ---------- */
  const S2l = P.line(S2, 0, S2, 9.3, { cls: 'c1' });
  const tS2 = T('nach rechts') - 0.9;
  ctx.pen(S2l, tS2, 1.2);
  ctx.tint(D.S, tS2 + 0.3, { stroke: C.old }).tint(O.dotS, tS2 + 0.3, { fill: C.old });
  const arr = V.arrow(P.el, `M${P.X(S1 + 0.18)} ${P.Y(8.7)}L${P.X(S2 - 0.26)} ${P.Y(8.7)}`, { cls: 'c1', w: 6, head: 22 });
  ctx.drawArrow(arr, tS2 + 1.25, 0.5);
  X.relabel(ctx, D.lS, 'S₁', T('von S eins'), 'old');
  const lS2 = P.text(S2, 9.3, 'S₂', { cls: 'c1', dy: -20 });
  gsap.set(lS2, { autoAlpha: 0 });
  ctx.to(lS2, { autoAlpha: 1, duration: 0.3 }, T('nach S zwei'));
  const dotS2 = P.dot(S2, R, { cls: 'c1', r: 11 });
  X.pop(ctx, dotS2, T('nach S zwei') + 0.4);

  /* ---------- Schritt 2: Weltzins und Investitionen bleiben ---------- */
  X.thick(ctx, O.rline, tStay + 0.3, 2);
  gsap.set(O.lr, { transformOrigin: '100% 50%' });
  ctx.pulse(O.lr, tStay + 0.3, { scale: 1.35, origin: '100% 50%' });
  const tIs = T('die Investitionen unverändert');
  gsap.set([O.dotI, O.lIr], { transformOrigin: '50% 50%' });
  ctx.pulse(O.dotI, tIs, { scale: 1.6 }).pulse(O.lIr, tIs + 0.2, { scale: 1.25 });

  /* ---------- Schritt 3: beide Abstände ---------- */
  const up = P.add('line', { x1: P.X(I1), y1: P.Y(R + 0.55), x2: P.X(I1), y2: P.Y(R + 1.35), class: 'dash c4' });
  const nx2 = X.bracket(P, I1, S2, R + 1.35);
  const lNX2 = P.text((I1 + S1) / 2, R + 1.35, 'NX₂', { cls: 'c4', dy: -24 });
  gsap.set([up, lNX2, nx2._main], { autoAlpha: 0 });
  ctx.extend(up, tNX, 0.4);
  X.drawBr(ctx, nx2, tNX + 0.35, 1.4);
  ctx.to(lNX2, { autoAlpha: 1, duration: 0.3 }, T('Die Nettoexporte steigen'));
  const tag = V.el('<div class="chip c4 tagc">Netto-Exporte ↑</div>'); sheet.appendChild(tag);
  tag.style.left = P.X(0.35) + 'px'; tag.style.top = P.Y(2.6) + 'px';
  ctx.show(tag, T('Die Nettoexporte steigen') + 0.2, { x: -14, y: 0 });
  const lNX1 = X.relabel(ctx, O.lNX, 'NX₁', T('den alten und den neuen') - 0.2, 'c4');
  gsap.set([lNX1, lNX2], { transformOrigin: '50% 50%' });
  X.thick(ctx, O.nx._main, T('den alten und den neuen') + 0.1);
  ctx.pulse(lNX1, T('den alten und den neuen') + 0.1, { scale: 1.25 });
  X.thick(ctx, nx2._main, T('und den neuen') + 0.4);
  ctx.pulse(lNX2, T('und den neuen') + 0.4, { scale: 1.25 });

  /* ---------- Ergebnis ---------- */
  ctx.hide('#wA', tRes - 0.3, { dur: 0.3 }).show('#wR', tRes, { y: 24 });
  ctx.pop('#r1', T('Ersparnis rauf')).pop('#r2', T('Investitionen unverändert', { n: 2 })).pop('#r3', T('Nettoexporte rauf')).pop('#r4', T('Zins unverändert'));
  ctx.show('#rp', tRes + 0.5, { y: 14 });
});
