// Übung 4 e – Preisniveau steigt: LM nach links; am Ende die Ergebnistabelle der ganzen Übung
V.scene('u4e', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u4;
  ctx.header({ kicker: 'Übung 4 e', title: '<em>Preisniveau</em> steigt: LM nach links', src: 'Teil II · Übung 4' });
  const zx = [920, 1160], zy = [5.6, 7.6];

  ctx.html(`<style>${U.css('u4e')}
    #sc-u4e .merk{padding:14px 22px 16px;font-size:31px;font-weight:700;line-height:1.3}
    #sc-u4e .sum table{width:100%;font-size:31px;box-shadow:8px 8px 0 var(--line)}
    #sc-u4e .sum th{font-size:24px;padding:7px 18px}
    #sc-u4e .sum td{padding:7px 18px;font-weight:700;height:54px}
    #sc-u4e .sum td.n{font-size:34px}
  </style>` + U.sideHTML({
    cls: 'c2',
    steps: [
      ['Neue Randpunkte berechnen', 'Y = 250 + 100 r: (250 | 0) und (1050 | 8)'],
      ['Punkte verbinden', 'LM₃ liegt links von LM₁'],
      ['Neuen Schnittpunkt ablesen', 'LM₃ mit der ursprünglichen IS'],
    ],
    calc: `<div class="eq" id="l1">P: 2 → <b id="pv">4</b> &nbsp;<small>M = 1000 bleibt</small></div>
           <div class="eq" id="l2"><span class="t-c2">M/P</span> = 1000 / 4 = <b class="t-c2">250</b><span id="l2b"> &nbsp;<small>statt 500:</small> <b class="t-c2">−250</b></span></div>`,
    old: ['LM₁', '500', '1300'], neu: ['LM₃', '250', '1050'],
    res: `<span class="lab">Neues Gleichgewicht</span>
          <div class="eq" id="e1">r = <b>7,25</b></div><div class="eq" id="e2">Y = <b>975</b></div>
          <p id="p1">Der Zins steigt <b class="t-c3">(6 → 7,25)</b>.</p><p id="p2">Das Einkommen fällt <b class="t-c3">(−125)</b>.</p>`,
  }) + `
  <div class="abs rc card c4 merk" id="merk">Höheres P wirkt wie kleineres M:<br><span class="t-c2" id="m1">Zins r ↑</span> &nbsp;·&nbsp; <span class="t-c1" id="m2">Einkommen Y ↓</span></div>
  <div class="abs rc sum" id="sum"><table class="tbl">
    <tr><th>Übung 4 · Ergebnisse</th><th class="n">r</th><th class="n">Y</th></tr>
    <tr><td>b) Ausgangslage</td><td class="n">6</td><td class="n">1100</td></tr>
    <tr><td>c) G = 150 <span class="small">IS rechts</span></td><td class="n">7</td><td class="n">1200</td></tr>
    <tr><td>d) M = 1200 <span class="small">LM rechts</span></td><td class="n">5,5</td><td class="n">1150</td></tr>
    <tr id="re"><td>e) P = 4 <span class="small">LM links</span></td><td class="n" id="re1">7,25</td><td class="n" id="re2">975</td></tr>
  </table></div>`);

  const L = U.sideSetup(ctx, { x: zx, y: zy });
  { const side = $('#side'), top = side.offsetHeight + 12; $('#merk').style.top = top + 'px'; $('#sum').style.top = top + $('#merk').offsetHeight + 12 + 'px'; }
  const D = U.make($('#sheet')), B = U.base(D), P = D.P;
  const g2 = D.guide(975, 7.25, 'c3');
  const LM3 = D.line(250, 0, 1050, 8, 'c2'), rul = D.ruler(250, 0, 1050, 8);
  const pB = D.dot(250, 0, 'c2'), pT = D.dot(1050, 8, 'c2'), eq2 = D.dot(975, 7.25, 'c3', 13);
  const aB = D.shift(500, 250, 0, 'c2'), aT = D.shift(1300, 1050, 8, 'c2'), aM = D.shift(800, 550, 3, 'c2', { gap: 9 });
  const lM = D.txt(550, 3, '−250', { cls: 'c2', anchor: 'end', dx: -18, dy: 11, size: 32 });
  const vB = D.xval(250, 2, '250', 'c2'), vT = D.txt(1050, 8, '1050', { cls: 'c2', dy: -22, size: 30 });
  const nLM3 = D.name('LM', '3', 380, 1.3, 'l', 'c2');
  // der Name der alten Kurve wechselt auf die rechte Seite, damit LM₃ ihn nicht kreuzt
  const nLM1r = D.name('LM', '1', 630, 1.3, 'r', 'old');
  const y725 = D.yval(7.25, '7,25', 'c3'), x975 = D.xval(975, 3, '975', 'c3');
  const zr = U.zoomRect(D, zx, zy);
  const up = V.arrow(D.gLabel, `M${P.X(0) + 22} ${P.Y(6) - 6}L${P.X(0) + 22} ${P.Y(7.25) + 12}`, { cls: 'c3', w: 5, head: 18 });
  gsap.set([pB, pT, eq2, aB, aT, aM, lM, vB, vT, nLM3.el, nLM1r.el, y725, x975, zr, up], { autoAlpha: 0 });
  // Lupe
  L.line(r => 500 + 100 * r, 'old'); L.line(r => 250 + 100 * r, 'c2'); L.line(r => 1700 - 100 * r, 'c1');
  const lg1 = L.guide(1100, 6, ''), lg2 = L.guide(975, 7.25, 'c3');
  L.dot(1100, 6, 'old'); const ld2 = L.dot(975, 7.25, 'c3', 13);
  L.yval(6, '6', 'old'); L.xval(1100, '1100', 'old');
  const ly = L.yval(7.25, '7,25', 'c3'), lx = L.xval(975, '975', 'c3');
  gsap.set([lg2.h, lg2.v, ld2, ly, lx], { autoAlpha: 0 });

  /* ---------- Rechnung ---------- */
  ctx.show('#side', 0.25, { x: 40, y: 0 });
  gsap.set(['#l1', '#l2', '#l2b', '#lupe', '#rbox', '#e1', '#e2', '#p1', '#p2', '#merk', '#sum'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([$('#n0'), $('#n8')], { autoAlpha: 0, scale: 0.5 });
  const tP = T('Diesmal steigt das Preisniveau');
  ctx.show('#calc', tP - 0.2, { y: 20 }).to('#l1', { autoAlpha: 1, duration: 0.3 }, tP);
  ctx.count('#pv', 4, T('von zwei auf vier') + 0.4, { from: 2, dur: 0.6 });
  ctx.to('#l2', { autoAlpha: 1, duration: 0.3 }, T('halbiert sich die Realkasse')).to('#l2b', { autoAlpha: 1, duration: 0.3 }, T('auf zweihundertfünfzig') + 0.6);
  const tL = T('Die LM-Kurve verschiebt sich deshalb');
  U.thick(ctx, B.LM, tL + 0.2);
  ctx.to(aM, { autoAlpha: 1, duration: 0.01 }, T('nach links')).drawArrow(aM, T('nach links'), 0.5).to(lM, { autoAlpha: 1, duration: 0.3 }, T('nach links') + 0.4);

  /* ---------- Zeichenschritte ---------- */
  const tS = [T('Die neuen Randpunkte'), T('tausendfünfzig') + 1.15, T('Im neuen Schnittpunkt')];
  ctx.stepsRun('#side', tS, {});
  ctx.show('#wt', tS[0] + 0.2, { y: 20 });
  const move = (t, tv, arr, dot, val, cell) => {
    ctx.to(arr, { autoAlpha: 1, duration: 0.01 }, t).drawArrow(arr, t, 0.5);
    gsap.set(dot, { scale: 0.2 });
    ctx.to(dot, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, tv);
    ctx.to(val, { autoAlpha: 1, duration: 0.3 }, tv).to(cell, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, tv);
  };
  move(T('bei einem Zins von null'), T('zweihundertfünfzig', { n: 2 }) - 0.1, aB, pB, vB, '#n0');
  move(T('bei acht tausendfünfzig'), T('tausendfünfzig') - 0.1, aT, pT, vT, '#n8');
  // Schritt 2: verbinden (ohne eigenen Satz im Text, deshalb zügig)
  U.greyLine(ctx, B.LM, B.nLM, tS[1]);
  ctx.to(B.nLM.el, { autoAlpha: 0, duration: 0.25 }, tS[1]).to(nLM1r.el, { autoAlpha: 1, duration: 0.25 }, tS[1] + 0.1);
  ctx.tint([B.pts[2], B.pts[3]], tS[1], { fill: C.old });
  ctx.to(rul, { autoAlpha: 1, duration: 0.2 }, tS[1] - 0.2);
  ctx.pen(LM3, tS[1] + 0.1, 1.0);
  ctx.to(rul, { autoAlpha: 0, duration: 0.25 }, tS[1] + 1.2);
  ctx.to(nLM3.el, { autoAlpha: 1, duration: 0.3 }, tS[1] + 1.15);
  ctx.hide([aB, aT], tS[1] + 1.4);
  // Schritt 3: neuer Schnittpunkt (Lupe)
  ctx.hide(['#calc', '#wt'].map(s => $(s)), tS[2] - 0.3, { dur: 0.3 });
  ctx.show('#lupe', tS[2], { y: 24 }).show('#rbox', tS[2] + 0.1, { y: 24 });
  ctx.to(zr, { autoAlpha: 1, duration: 0.3 }, tS[2] + 0.2);
  U.greyEq(ctx, B, tS[2] + 0.3);
  gsap.set([eq2, ld2], { scale: 0.2 });
  ctx.to([eq2, ld2], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, tS[2] + 0.5);
  const tr = T('sieben Komma zwei fünf') - 0.3, ty = T('und das Einkommen fällt') + 0.2, tyv = T('neunhundertfünfundsiebzig');
  ctx.pen(g2.h, tr, 0.7).to(y725, { autoAlpha: 1, duration: 0.3 }, tr + 0.7).to('#e1', { autoAlpha: 1, duration: 0.3 }, tr + 0.2);
  ctx.extend(lg2.h, tr, 0.7).to(ly, { autoAlpha: 1, duration: 0.3 }, tr + 0.7);
  ctx.to(up, { autoAlpha: 1, duration: 0.01 }, tr + 0.9).drawArrow(up, tr + 0.9, 0.4).to('#p1', { autoAlpha: 1, duration: 0.3 }, tr + 1.1);
  ctx.pen(g2.v, ty, 0.7).to(x975, { autoAlpha: 1, duration: 0.3 }, tyv).to('#e2', { autoAlpha: 1, duration: 0.3 }, tyv);
  ctx.extend(lg2.v, ty, 0.7).to(lx, { autoAlpha: 1, duration: 0.3 }, tyv);
  ctx.to('#p2', { autoAlpha: 1, duration: 0.3 }, tyv + 1.2);

  /* ---------- Merksatz und Ergebnistabelle der ganzen Übung ---------- */
  const tM = T('Ein höheres Preisniveau wirkt');
  ctx.to($$('#side li')[2], { backgroundColor: 'rgba(246,236,217,0)', borderColor: 'rgba(184,110,0,0)', duration: 0.3 }, tM).to($$('#side li .n')[2], { backgroundColor: C.c3, duration: 0.3 }, tM);
  ctx.hide(['#lupe', '#rbox'].map(s => $(s)), tM - 0.3, { dur: 0.3 });
  ctx.to(zr, { autoAlpha: 0, duration: 0.3 }, tM - 0.3);
  ctx.show('#merk', tM, { y: 24 });
  gsap.set([$('#m1'), $('#m2')], { opacity: 0.25 });
  ctx.show('#sum', T('wie ein kleineres Geldangebot') - 0.2, { y: 24 });
  const rows = $$('#sum tr').slice(1);
  gsap.set(rows, { opacity: 0 });
  rows.forEach((r, i) => ctx.to(r, { opacity: 1, duration: 0.35 }, T('wie ein kleineres Geldangebot') + 0.1 + i * 0.4));
  ctx.tint('#re', T('wie ein kleineres Geldangebot') + 1.7, { backgroundColor: C.c4bg });
  const t1 = T('Der Zins steigt'), t2 = T('das Einkommen sinkt');
  ctx.to('#m1', { opacity: 1, duration: 0.3 }, t1).pulse('#re1', t1, { scale: 1.3, origin: '100% 50%' }).tint('#re1', t1, { color: C.c2 });
  U.thick(ctx, g2.h, t1, 3);
  ctx.to('#m2', { opacity: 1, duration: 0.3 }, t2).pulse('#re2', t2, { scale: 1.3, origin: '100% 50%' }).tint('#re2', t2, { color: C.c1 });
  U.thick(ctx, g2.v, t2, 3);
});
