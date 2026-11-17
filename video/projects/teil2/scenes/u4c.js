// Gemeinsamer Aufbau der rechten Spalte für die Verschiebungs-Szenen u4c, u4d, u4e:
// Schrittliste · Rechnung · Tabelle der Randpunkte, später Lupe + Ergebnis.
V.t2u4.sideHTML = c => `
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps(c.steps, { cls: 'sm' })}</div>
  <div class="abs rc card calc" id="calc">${c.calc}</div>
  <div class="abs rc wt" id="wt"><table class="tbl">
    <tr><th>Randpunkte</th><th class="n">r = 0</th><th class="n">r = 8</th></tr>
    <tr><td><span class="rn t-old">${c.old[0]}</span> &nbsp;<span class="small">Y =</span></td><td class="n t-old">${c.old[1]}</td><td class="n t-old">${c.old[2]}</td></tr>
    <tr id="rn"><td><span class="rn t-${c.cls}">${c.neu[0]}</span> &nbsp;<span class="small">Y =</span></td><td class="n t-${c.cls}"><span id="n0">${c.neu[1]}</span></td><td class="n t-${c.cls}"><span id="n8">${c.neu[2]}</span></td></tr>
  </table></div>
  <div class="abs card lupe" id="lupe"><span class="lab">Lupe · Ausschnitt</span></div>
  <div class="abs res rbox" id="rbox">${c.res}</div>`;
// Lupe (o: Ausschnitt) in die Lupen-Karte setzen und rechte Spalte anordnen
V.t2u4.sideSetup = (ctx, o) => {
  const U = V.t2u4;
  U.layout(ctx, ['#side', '#calc', '#wt']);
  U.layout(ctx, ['#side', ['#lupe', '#rbox']]);
  const card = ctx.$('#lupe');
  return U.lupe(card, { id: ctx.id, w: 324, h: card.offsetHeight - 52, x: o.x, y: o.y });
};
// gestrichelter Rahmen im Hauptdiagramm, der den Lupen-Ausschnitt zeigt
V.t2u4.zoomRect = (D, x, y) => D.P.add('rect', { x: D.X(x[0]), y: D.Y(y[1]), width: D.X(x[1]) - D.X(x[0]), height: D.Y(y[0]) - D.Y(y[1]), fill: 'none', stroke: V.C.mute, 'stroke-width': 3, 'stroke-dasharray': '6 7', rx: 6 }, null, D.gLabel);

// Übung 4 c – Staatsausgaben steigen: IS nach rechts
V.scene('u4c', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u4;
  ctx.header({ kicker: 'Übung 4 c', title: '<em>Staatsausgaben</em> steigen: IS nach rechts', src: 'Teil II · Übung 4' });
  const zx = [1050, 1350], zy = [5.5, 7.5];

  ctx.html(`<style>${U.css('u4c')}</style>` + U.sideHTML({
    cls: 'c1',
    steps: [
      ['Randpunkte verschieben', 'beide Punkte der IS um 200 nach rechts'],
      ['Neue Punkte verbinden', 'IS₂ liegt parallel zu IS₁'],
      ['Neuen Schnittpunkt ablesen', 'IS₂ mit LM'],
    ],
    calc: `<div class="eq" id="l1">G: 100 → <b id="gv">150</b> &nbsp;<small>also ΔG = 50</small></div>
           <div class="eq" id="l2"><span class="t-c1">ΔG · Multiplikator</span> = 50 · 4<span id="l2b"> = <b class="t-c1">200</b></span></div>`,
    old: ['IS₁', '1700', '900'], neu: ['IS₂', '1900', '1100'],
    res: `<span class="lab">Neues Gleichgewicht</span>
          <div class="eq" id="e1">r = <b>7</b></div><div class="eq" id="e2">Y = <b>1200</b></div>
          <p id="p1"><b class="t-c2">nur +100</b> statt +200</p><p id="p2">Der höhere Zins verdrängt Investitionen.</p>`,
  }));

  const L = U.sideSetup(ctx, { x: zx, y: zy });
  const D = U.make($('#sheet')), B = U.base(D), P = D.P;
  // neue Elemente (in Zeichenreihenfolge)
  const g2 = D.guide(1200, 7, 'c3');
  const IS2 = D.line(1900, 0, 1100, 8, 'c1'), rul = D.ruler(1900, 0, 1100, 8);
  const pB = D.dot(1900, 0, 'c1'), pT = D.dot(1100, 8, 'c1'), eq2 = D.dot(1200, 7, 'c3', 13);
  const aB = D.shift(1700, 1900, 0, 'c1'), aT = D.shift(900, 1100, 8, 'c1'), aM = D.shift(1400, 1600, 3, 'c1', { gap: 9 });
  const lM = D.txt(1600, 3, '+200', { cls: 'c1', anchor: 'start', dx: 20, dy: 11, size: 32 });
  const vB = D.xval(1900, 2, '1900', 'c1'), vT = D.txt(1100, 8, '1100', { cls: 'c1', dy: -22, size: 30 });
  const nIS2 = D.name('IS', '2', 1770, 1.3, 'r', 'c1');
  const y7 = D.yval(7, '7', 'c3'), x12 = D.xval(1200, 3, '1200', 'c3');
  const zr = U.zoomRect(D, zx, zy);
  const up = V.arrow(D.gLabel, `M${P.X(0) + 22} ${P.Y(6) - 6}L${P.X(0) + 22} ${P.Y(7) + 12}`, { cls: 'c3', w: 5, head: 18 });
  gsap.set([pB, pT, eq2, aB, aT, aM, lM, vB, vT, nIS2.el, y7, x12, zr, up], { autoAlpha: 0 });
  // Lupe: alte Lage grau, neue farbig
  L.line(r => 1700 - 100 * r, 'old'); const lIS2 = L.line(r => 1900 - 100 * r, 'c1'); L.line(r => 500 + 100 * r, 'c2');
  const lg1 = L.guide(1100, 6, ''), lg2 = L.guide(1200, 7, 'c3');
  L.dot(1100, 6, 'old'); const ld2 = L.dot(1200, 7, 'c3', 13);
  L.yval(6, '6', 'old'); L.xval(1100, '1100', 'old');
  const ly = L.yval(7, '7', 'c3'), lx = L.xval(1200, '1200', 'c3');
  const la = L.arrow(1100, 1300, 6, 'old'), lat = L.txt(1255, 6, '+200', 'old', { dy: 32 });
  gsap.set([lg2.h, lg2.v, ld2, ly, lx, la, lat], { autoAlpha: 0 });

  /* ---------- Rechnung ---------- */
  ctx.show('#side', 0.25, { x: 40, y: 0 });
  gsap.set(['#l1', '#l2', '#l2b', '#lupe', '#rbox', '#e1', '#e2', '#p1', '#p2'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([$('#n0'), $('#n8')], { autoAlpha: 0, scale: 0.5 });
  const tG = T('Die Staatsausgaben steigen');
  ctx.show('#calc', tG - 0.2, { y: 20 }).to('#l1', { autoAlpha: 1, duration: 0.3 }, tG);
  ctx.count('#gv', 150, T('auf hundertfünfzig') - 0.2, { from: 100, dur: 0.8 });
  U.thick(ctx, B.IS, T('Die IS-Kurve verschiebt sich'));
  ctx.to(aM, { autoAlpha: 1, duration: 0.01 }, T('nach rechts')).drawArrow(aM, T('nach rechts'), 0.5);
  ctx.to('#l2', { autoAlpha: 1, duration: 0.3 }, T('um fünfzig mal'));
  ctx.to('#l2b', { autoAlpha: 1, duration: 0.3 }, T('also um zweihundert')).to(lM, { autoAlpha: 1, duration: 0.3 }, T('also um zweihundert') + 0.2);

  /* ---------- Zeichenschritte ---------- */
  const tS = [T('So zeichnest du das'), T('Verbinde die neuen Punkte'), T('Der neue Schnittpunkt')];
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });
  // Schritt 1: Randpunkte um 200 nach rechts
  ctx.show('#wt', tS[0] + 0.2, { y: 20 });
  const move = (t, tv, arr, dot, val, cell) => {
    ctx.to(arr, { autoAlpha: 1, duration: 0.01 }, t).drawArrow(arr, t, 0.5);
    gsap.set(dot, { scale: 0.2 });
    ctx.to(dot, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, t + 0.45);
    ctx.to(val, { autoAlpha: 1, duration: 0.3 }, tv).to(cell, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, tv);
  };
  move(T('Aus siebzehnhundert wird'), T('neunzehnhundert') - 0.1, aB, pB, vB, '#n0');
  move(T('aus neunhundert wird'), T('elfhundert') - 0.1, aT, pT, vT, '#n8');
  // Schritt 2: neue Punkte verbinden
  U.greyLine(ctx, B.IS, B.nIS, tS[1]);
  ctx.tint([B.pts[0], B.pts[1]], tS[1], { fill: C.old });
  ctx.to(rul, { autoAlpha: 1, duration: 0.3 }, tS[1]);
  ctx.pen(IS2, tS[1] + 0.5, 1.3);
  ctx.to(rul, { autoAlpha: 0, duration: 0.3 }, tS[1] + 2.0);
  ctx.to(nIS2.el, { autoAlpha: 1, duration: 0.3 }, T('parallel zur alten') - 0.3);
  ctx.hide([aB, aT], tS[1] + 2.2);
  // Schritt 3: neuer Schnittpunkt (Lupe)
  ctx.hide(['#calc', '#wt'].map(s => $(s)), tS[2] - 0.3, { dur: 0.3 });
  ctx.show('#lupe', tS[2], { y: 24 }).show('#rbox', tS[2] + 0.1, { y: 24 });
  ctx.to(zr, { autoAlpha: 1, duration: 0.3 }, tS[2] + 0.2);
  U.greyEq(ctx, B, tS[2] + 0.3);
  gsap.set([eq2, ld2], { scale: 0.2 });
  ctx.to([eq2, ld2], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, T('mit der LM-Kurve'));
  const tr = T('Zins sieben'), ty = T('Einkommen zwölfhundert');
  ctx.pen(g2.h, tr, 0.7).to(y7, { autoAlpha: 1, duration: 0.3 }, tr + 0.7).to('#e1', { autoAlpha: 1, duration: 0.3 }, tr + 0.2);
  ctx.extend(lg2.h, tr, 0.7).to(ly, { autoAlpha: 1, duration: 0.3 }, tr + 0.7);
  ctx.pen(g2.v, ty, 0.7).to(x12, { autoAlpha: 1, duration: 0.3 }, ty + 0.7).to('#e2', { autoAlpha: 1, duration: 0.3 }, ty + 0.2);
  ctx.extend(lg2.v, ty, 0.7).to(lx, { autoAlpha: 1, duration: 0.3 }, ty + 0.7);
  // Einordnung: nur +100 statt +200
  const tn = T('Das Einkommen steigt nur um hundert');
  ctx.to('#p1', { autoAlpha: 1, duration: 0.3 }, tn);
  ctx.to(la, { autoAlpha: 1, duration: 0.01 }, T('nicht um zweihundert')).drawArrow(la, T('nicht um zweihundert'), 0.5).to(lat, { autoAlpha: 1, duration: 0.3 }, T('nicht um zweihundert') + 0.3);
  const tz = T('weil der höhere Zins');
  ctx.to('#p2', { autoAlpha: 1, duration: 0.3 }, tz);
  ctx.to(up, { autoAlpha: 1, duration: 0.01 }, tz).drawArrow(up, tz, 0.5);
  gsap.set(y7, { transformOrigin: '100% 50%' });
  ctx.pulse(y7, tz + 0.3, { scale: 1.4, origin: '100% 50%' });
});
