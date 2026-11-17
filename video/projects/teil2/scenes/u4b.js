// Übung 4 b – Gleichgewicht ablesen und berechnen (beginnt mit dem Schlussbild von u4a)
V.scene('u4b', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u4;
  ctx.header({ kicker: 'Übung 4 b', title: 'Das <em>Gleichgewicht</em> ablesen und berechnen', src: 'Teil II · Übung 4' });

  ctx.html(`
  <style>${U.css('u4b')}
    #sc-u4b .calc .eq{font-size:36px;line-height:1.34}
    #sc-u4b .resb{padding:14px 24px 16px}
    #sc-u4b .resb .eq{font-size:50px;line-height:1.2;font-weight:800;display:flex;gap:44px}
    #sc-u4b .rd{font-family:var(--mono);font-weight:800;font-size:30px;padding:4px 14px;white-space:nowrap}
  </style>
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Schnittpunkt ablesen', 'Zins an der r-Achse, Einkommen an der Y-Achse'],
    ['Nachrechnen', 'IS = LM setzen und nach r auflösen'],
    ['Punkt markieren', 'gestrichelte Linien zu beiden Achsen'],
  ], { cls: 'sm' })}</div>
  <div class="abs rc card calc" id="calc"><span class="lab">Beide Gleichungen gleichsetzen</span>
    <div class="eq" id="l1"><span class="t-c1">1700 − 100 r</span> = <span class="t-c2">500 + 100 r</span></div>
    <div class="eq" id="l2">200 r = 1200</div>
    <div class="eq" id="l3">r = <b class="t-c3">6</b></div>
    <div class="eq" id="l4">Y = 1700 − 100 · 6 = <b class="t-c3">1100</b></div>
  </div>
  <div class="abs rc res resb" id="resb"><span class="lab">Gleichgewicht</span><div class="eq"><span>r* = 6</span><span>Y* = 1100</span></div></div>`);

  const top = U.layout(ctx, ['#side', '#calc']);
  $('#resb').style.top = top + 'px';
  const D = U.make($('#sheet')), B = U.base(D), P = D.P;
  // Ausgangsbild = Schlussbild von u4a: Koordinaten sichtbar, noch kein markiertes Gleichgewicht
  gsap.set([...B.coords, D.t6], { autoAlpha: 1 });
  gsap.set([B.eq, B.g.h, B.g.v, B.y6, B.x11], { autoAlpha: 0 });
  const tmp = D.guide(1100, 6, ''), ring = P.add('circle', { cx: P.X(1100), cy: P.Y(6), r: 24, fill: 'none', stroke: C.c3, 'stroke-width': 6 }, null, D.gLabel);
  gsap.set([tmp.h, tmp.v], { opacity: 0.7 });
  gsap.set(ring, { autoAlpha: 0, scale: 2.2, transformOrigin: '50% 50%' });
  const rd = V.el(`<div class="abs chip c3 rd"><span id="k1">r = 6</span><span id="k2"> · Y = 1100</span></div>`); $('#sheet').appendChild(rd);
  rd.style.left = 3 + P.X(1100) + 40 + 'px'; rd.style.top = 3 + P.Y(6) - 26 + 'px';
  gsap.set(rd.querySelector('#k2'), { autoAlpha: 0 });

  ctx.show('#side', 0.25, { x: 40, y: 0 });
  const tS = [T('In deiner Zeichnung'), T('Die Rechnung bestätigt das'), T('Markiere den Punkt')];
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });

  // Schritt 1: ablesen
  ctx.to(B.coords, { autoAlpha: 0, duration: 0.4 }, tS[0]);
  ctx.to(ring, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, T('Die Linien schneiden sich'));
  const t6 = T('bei einem Zins von sechs'), t11 = T('einem Einkommen von elfhundert');
  ctx.extend(tmp.h, t6, 0.7).pulse(D.t6, t6 + 0.7, { scale: 1.5, origin: '100% 50%' }).tint(D.t6, t6 + 0.7, { fill: C.ink });
  ctx.show(rd, t6 + 0.5, { x: -14, y: 0 });
  gsap.set(B.x11, { fill: C.mute });
  ctx.extend(tmp.v, t11, 0.7).to(B.x11, { autoAlpha: 1, duration: 0.3 }, t11 + 0.7).to(rd.querySelector('#k2'), { autoAlpha: 1, duration: 0.3 }, t11 + 0.5);

  // Schritt 2: nachrechnen
  ctx.show('#calc', tS[1], { y: 24 });
  const L = ['#l1', '#l2', '#l3', '#l4'].map(s => $(s));
  gsap.set(L, { autoAlpha: 0, x: -18 });
  const tL = [T('siebzehnhundert minus hundert mal r gleich'), T('Zweihundert mal r'), T('also ist r gleich sechs'), T('Eingesetzt ergibt sich')];
  L.forEach((e, i) => ctx.to(e, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out' }, tL[i]));
  U.thick(ctx, B.IS, tL[0] + 0.3); U.thick(ctx, B.LM, T('gleich fünfhundert plus') + 0.3);
  ctx.show('#resb', T('ein Einkommen von elfhundert') + 0.9, { y: 24 });

  // Schritt 3: Punkt markieren, Hilfslinien zu beiden Achsen
  gsap.set(B.eq, { scale: 0.2 });
  ctx.to(B.eq, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, tS[2] + 0.2).to(ring, { autoAlpha: 0, scale: 1.6, duration: 0.4 }, tS[2] + 0.3);
  const tG = T('zieh gestrichelte Linien');
  ctx.to([tmp.h, tmp.v], { autoAlpha: 0, duration: 0.3 }, tG - 0.2);
  ctx.pen(B.g.h, tG, 0.8).to(B.y6, { autoAlpha: 1, duration: 0.3 }, tG + 0.8).to(D.t6, { autoAlpha: 0, duration: 0.3 }, tG + 0.8);
  ctx.pen(B.g.v, tG + 1.1, 0.8).tint(B.x11, tG + 1.9, { fill: C.c3 }).pulse(B.x11, tG + 1.9, { scale: 1.3 });
  gsap.set(B.x11, { transformOrigin: '50% 50%' });
});
