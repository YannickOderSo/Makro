// Übung 4 d – Geldangebot steigt: LM nach rechts
V.scene('u4d', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u4;
  ctx.header({ kicker: 'Übung 4 d', title: '<em>Geldangebot</em> steigt: LM nach rechts', src: 'Teil II · Übung 4' });
  const zx = [1060, 1220], zy = [5.2, 6.3];

  ctx.html(`<style>${U.css('u4d')}</style>` + U.sideHTML({
    cls: 'c2',
    steps: [
      ['Randpunkte verschieben', 'beide Punkte der LM um 100 nach rechts'],
      ['Neue Punkte verbinden', 'LM₂ liegt parallel rechts von LM₁'],
      ['Neuen Schnittpunkt ablesen', 'LM₂ mit der ursprünglichen IS'],
    ],
    calc: `<div class="eq" id="l1">M: 1000 → <b id="mv">1200</b> &nbsp;<small>P = 2 bleibt</small></div>
           <div class="eq" id="l2"><span class="t-c2">M/P</span> = 1200 / 2 = <b class="t-c2">600</b><span id="l2b"> &nbsp;<small>statt 500:</small> <b class="t-c2">+100</b></span></div>`,
    old: ['LM₁', '500', '1300'], neu: ['LM₂', '600', '1400'],
    res: `<span class="lab">Neues Gleichgewicht</span>
          <div class="eq" id="e1">r = <b>5,5</b></div><div class="eq" id="e2">Y = <b>1150</b></div>
          <p id="p1">Mehr Geld senkt den Zins <b class="t-c3">(6 → 5,5)</b>.</p><p id="p2">Das Einkommen steigt <b class="t-c3">(+50)</b>.</p>`,
  }));

  const L = U.sideSetup(ctx, { x: zx, y: zy });
  const D = U.make($('#sheet')), B = U.base(D), P = D.P;
  const g2 = D.guide(1150, 5.5, 'c3');
  const LM2 = D.line(600, 0, 1400, 8, 'c2'), rul = D.ruler(600, 0, 1400, 8);
  const pB = D.dot(600, 0, 'c2'), pT = D.dot(1400, 8, 'c2'), eq2 = D.dot(1150, 5.5, 'c3', 13);
  const aB = D.shift(500, 600, 0, 'c2', { gap: 11, head: 14 }), aT = D.shift(1300, 1400, 8, 'c2', { gap: 11, head: 14 }), aM = D.shift(730, 830, 2.3, 'c2', { gap: 7, head: 14 });
  const lM = D.txt(830, 2.3, '+100', { cls: 'c2', anchor: 'start', dx: 16, dy: 11, size: 30 });
  const vB = D.xval(600, 2, '600', 'c2'), vT = D.txt(1400, 8, '1400', { cls: 'c2', dy: -22, size: 30 });
  const nLM2 = D.name('LM', '2', 730, 1.3, 'r', 'c2');
  const y55 = D.yval(5.5, '5,5', 'c3', 2), x115 = D.xval(1150, 3, '1150', 'c3');
  const zr = U.zoomRect(D, zx, zy);
  const dn = V.arrow(D.gLabel, `M${P.X(0) + 22} ${P.Y(6) + 4}L${P.X(0) + 22} ${P.Y(5.5) - 8}`, { cls: 'c3', w: 5, head: 16 });
  gsap.set([pB, pT, eq2, aB, aT, aM, lM, vB, vT, nLM2.el, y55, x115, zr, dn], { autoAlpha: 0 });
  // Lupe
  L.line(r => 500 + 100 * r, 'old'); L.line(r => 600 + 100 * r, 'c2'); L.line(r => 1700 - 100 * r, 'c1');
  const lg1 = L.guide(1100, 6, ''), lg2 = L.guide(1150, 5.5, 'c3');
  L.dot(1100, 6, 'old'); const ld2 = L.dot(1150, 5.5, 'c3', 13);
  L.yval(6, '6', 'old'); L.xval(1100, '1100', 'old');
  const ly = L.yval(5.5, '5,5', 'c3'), lx = L.xval(1150, '1150', 'c3');
  const la = L.arrow(1100, 1200, 6, 'c2'), lat = L.txt(1152, 6, '+100', 'c2', { dy: -14 });
  gsap.set([lg2.h, lg2.v, ld2, ly, lx], { autoAlpha: 0 });

  /* ---------- Rechnung ---------- */
  ctx.show('#side', 0.25, { x: 40, y: 0 });
  gsap.set(['#l1', '#l2', '#l2b', '#lupe', '#rbox', '#e1', '#e2', '#p1', '#p2'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([$('#n0'), $('#n8')], { autoAlpha: 0, scale: 0.5 });
  const tM = T('Jetzt steigt das Geldangebot');
  ctx.show('#calc', tM - 0.2, { y: 20 }).to('#l1', { autoAlpha: 1, duration: 0.3 }, tM);
  ctx.count('#mv', 1200, T('auf zwölfhundert') - 0.2, { from: 1000, dur: 0.8, tsep: false });
  ctx.to('#l2', { autoAlpha: 1, duration: 0.3 }, T('Die Realkasse wächst'));
  const tL = T('und die LM-Kurve verschiebt sich');
  U.thick(ctx, B.LM, tL + 0.2);
  ctx.to('#l2b', { autoAlpha: 1, duration: 0.3 }, T('um hundert nach rechts'));
  ctx.to(aM, { autoAlpha: 1, duration: 0.01 }, T('um hundert nach rechts')).drawArrow(aM, T('um hundert nach rechts'), 0.4).to(lM, { autoAlpha: 1, duration: 0.3 }, T('um hundert nach rechts') + 0.3);

  /* ---------- Zeichenschritte ---------- */
  const tS = [T('Wieder verschiebst du'), T('Die neue LM-Kurve liegt') - 0.5, T('Der neue Schnittpunkt')];
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });
  ctx.show('#wt', tS[0] + 0.2, { y: 20 });
  const move = (t, tv, arr, dot, val, cell) => {
    ctx.to(arr, { autoAlpha: 1, duration: 0.01 }, t).drawArrow(arr, t, 0.4);
    gsap.set(dot, { scale: 0.2 });
    ctx.to(dot, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, t + 0.4);
    ctx.to(val, { autoAlpha: 1, duration: 0.3 }, tv).to(cell, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, tv);
  };
  move(T('aus fünfhundert wird'), T('wird sechshundert') + 0.3, aB, pB, vB, '#n0');
  move(T('aus dreizehnhundert wird'), T('vierzehnhundert') - 0.1, aT, pT, vT, '#n8');
  // Schritt 2: verbinden
  U.greyLine(ctx, B.LM, B.nLM, tS[1]);
  ctx.tint([B.pts[2], B.pts[3]], tS[1], { fill: C.old });
  ctx.to(rul, { autoAlpha: 1, duration: 0.3 }, tS[1]);
  ctx.pen(LM2, tS[1] + 0.5, 1.3);
  ctx.to(rul, { autoAlpha: 0, duration: 0.3 }, tS[1] + 2.0);
  ctx.to(nLM2.el, { autoAlpha: 1, duration: 0.3 }, T('parallel rechts neben') - 0.2);
  ctx.hide([aB, aT], tS[1] + 2.2);
  // Schritt 3: neuer Schnittpunkt (Lupe)
  ctx.hide(['#calc', '#wt'].map(s => $(s)), tS[2] - 0.3, { dur: 0.3 });
  ctx.show('#lupe', tS[2], { y: 24 }).show('#rbox', tS[2] + 0.1, { y: 24 });
  ctx.to(zr, { autoAlpha: 1, duration: 0.3 }, tS[2] + 0.2);
  U.greyEq(ctx, B, tS[2] + 0.3);
  gsap.set([eq2, ld2], { scale: 0.2 });
  ctx.to([eq2, ld2], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, T('mit der ursprünglichen IS-Kurve'));
  const tr = T('Zins fünf Komma fünf'), ty = T('Einkommen elfhundertfünfzig');
  ctx.pen(g2.h, tr, 0.7).to(y55, { autoAlpha: 1, duration: 0.3 }, tr + 0.7).to('#e1', { autoAlpha: 1, duration: 0.3 }, tr + 0.2);
  ctx.extend(lg2.h, tr, 0.7).to(ly, { autoAlpha: 1, duration: 0.3 }, tr + 0.7);
  ctx.to(dn, { autoAlpha: 1, duration: 0.01 }, tr + 0.9).drawArrow(dn, tr + 0.9, 0.4).to('#p1', { autoAlpha: 1, duration: 0.3 }, tr + 1.1);
  ctx.pen(g2.v, ty, 0.7).to(x115, { autoAlpha: 1, duration: 0.3 }, ty + 0.7).to('#e2', { autoAlpha: 1, duration: 0.3 }, ty + 0.2);
  ctx.extend(lg2.v, ty, 0.7).to(lx, { autoAlpha: 1, duration: 0.3 }, ty + 0.7);
  ctx.to('#p2', { autoAlpha: 1, duration: 0.3 }, ty + 1.6);
});
