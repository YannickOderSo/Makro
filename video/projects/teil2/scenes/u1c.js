// Übung 1 – Staatsausgaben steigen: Verschiebung und Multiplikator (Diagramme aus u1a.js: V.t2u1)
V.scene('u1c', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u1;
  ctx.header({ kicker: 'Übung 1', title: '<em>Staatsausgaben</em> steigen: der Multiplikator', src: 'Teil II · Übung 1' });

  ctx.html(`
  <style>
    #sc-u1c .sheet{left:0;top:0;width:1010px;height:770px;overflow:hidden}
    #sc-u1c .sheet svg{position:absolute;left:0;top:0}
    #sc-u1c .bigp line,#sc-u1c .bigp path{vector-effect:non-scaling-stroke}
    #sc-u1c .lupe{position:absolute;left:150px;top:84px;font-size:25px;padding:3px 12px}
    #sc-u1c .gcard{left:1046px;top:0;width:682px;height:104px;padding:0 22px;display:flex;align-items:center;gap:18px}
    #sc-u1c .gcard .eq{font-size:42px;font-weight:700}
    #sc-u1c .gcard .chip{margin-left:auto;font-size:30px}
    #sc-u1c .side{left:1046px;top:122px;width:682px}
    #sc-u1c .calc{left:1046px;top:398px;width:682px;height:372px;padding:16px 26px}
    #sc-u1c .calc .eq{font-size:35px;font-weight:600;line-height:1.5}
    #sc-u1c .calc .lab{margin-top:6px}
    #sc-u1c .calc .hint{font-family:var(--sans);font-size:24px;font-weight:500;color:var(--mute);margin-left:14px}
    #sc-u1c .rev{left:1046px;top:0;width:682px;height:336px;padding:16px 26px}
    #sc-u1c .rev .ttl{font-size:33px;font-weight:800;line-height:1.15;margin-bottom:8px}
    #sc-u1c .rev .eq{font-size:36px;font-weight:600;line-height:1.5}
    #sc-u1c .all{left:1046px;top:354px;width:682px;height:416px;padding:16px 24px}
    #sc-u1c .row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:11px 0;border-top:2px solid rgba(10,118,93,.25)}
    #sc-u1c .row:first-of-type{border-top:none}
    #sc-u1c .row span{font-size:27px;font-weight:600;white-space:nowrap}
    #sc-u1c .row .eq{font-size:35px;font-weight:800;line-height:1.2}
  </style>

  <div class="abs sheet" id="sheet"><span class="chip ink lupe" id="lupe">Ausschnitt · Skala ab 1100</span></div>

  <!-- Zustand A: Verschiebung zeichnen -->
  <div class="abs card c2 gcard" id="gcard">${V.icon('staat', 64, { tone: 2 })}<span class="eq">G: 100 → <b class="t-c2" id="gval">100</b></span><span class="chip c2" id="dg">ΔG = +25</span></div>
  <div class="abs side" id="side">${V.steps([
    'Neue Gerade parallel, um 25 nach oben',
    'Neuen Schnittpunkt markieren',
    'Anstieg von Y an der Achse ablesen',
  ])}</div>
  <div class="abs card calc" id="calc">
    <span class="lab">Neue Ausgabengerade</span>
    <div class="eq" id="c1"><span class="t-c2">E₂ = 350 + 0,75 · Y</span><span class="hint">325 + 25 · Steigung gleich</span></div>
    <span class="lab" id="c2l">Multiplikator</span>
    <div class="eq" id="c2">${V.frac('1', '1 − MPC')} <span id="c2b">= ${V.frac('1', '0,25')}</span> <span id="c2c">= <b>4</b></span></div>
    <div class="eq" id="c3"><span class="t-c3">ΔY</span> = 4 · <span class="t-c2">25</span> <span id="c3b">= <b class="t-c3">100</b></span></div>
  </div>

  <!-- Zustand B: die Umkehrfrage und alle Antworten -->
  <div class="abs card c4 rev" id="rev">
    <div class="ttl">Umgekehrt: Welches <span class="t-c2">G</span> für <span class="t-c4">Y = 1600</span>?</div>
    <div class="eq" id="r1">ΔY = 1600 − 1300 = <b>300</b></div>
    <div class="eq" id="r2">ΔG = 300 / 4 <span id="r2b">= <b>75</b></span></div>
    <div class="eq" id="r3">G = 100 + 75 <span id="r3b">= <b class="t-c4">175</b></span></div>
  </div>
  <div class="abs res all" id="all">
    <span class="lab">Alle Antworten zu Übung 1</span>
    <div class="row"><span>Geplante Ausgaben</span><span class="eq">E = 325 + 0,75 · Y</span></div>
    <div class="row"><span>Gleichgewicht</span><span class="eq">Y* = 1300</span></div>
    <div class="row"><span>mit G = 125</span><span class="eq">Y* = 1400</span></div>
    <div class="row"><span>für Y* = 1600</span><span class="eq">G = <span id="ans">?</span></span></div>
  </div>`);

  const sheet = $('#sheet');
  /* ---------- großes Kreuz: Schlussbild von u1b ---------- */
  const D = U.addEq(U.make(sheet)), B = D.P;
  D.P.el.classList.add('bigp');
  U.settle(D);
  U.hide([D.tri, D.tri1, D.tri2, D.gV, D.gH, D.gE, ...D.helpers, D.mB]);
  /* ---------- Ausschnitt ---------- */
  const Z = U.zoom(sheet), P = Z.P, X = P.X, Y = P.Y;
  U.hide([Z.P.el, Z.ghost, Z.e2, Z.lE2, Z.dG, Z.ldG, Z.dY, Z.ldY, Z.e3, Z.lE3, Z.eq2, Z.tgt, ...Z.lot2, ...Z.lot3]);
  gsap.set($('#lupe'), { autoAlpha: 0 });

  // Staatsausgaben steigen
  ctx.show('#gcard', 0.4, { x: 40, y: 0 }).show('#side', 0.55, { x: 40, y: 0 });
  gsap.set($('#dg'), { autoAlpha: 0, scale: 0.6 });
  ctx.count('#gval', 125, T('auf hundertfünfundzwanzig'), { from: 100, dur: 0.9 });
  ctx.to('#dg', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, T('auf hundertfünfundzwanzig') + 0.9);

  // Lupe: Bereich im großen Diagramm markieren und hineinzoomen
  const w = Z.win, rx = B.X(w.lo), ry = B.Y(w.yHi), rw = B.X(w.xHi) - rx, rh = B.Y(w.lo) - ry;
  const rect = B.add('rect', { x: rx, y: ry, width: rw, height: rh, fill: 'rgba(184,110,0,.10)', stroke: C.c4, 'stroke-width': 4, 'stroke-dasharray': '12 8' });
  gsap.set(rect, { autoAlpha: 0 });
  ctx.to(rect, { autoAlpha: 1, duration: 0.4 }, 1.6);
  const s = (P.X(w.xHi) - P.X(w.lo)) / rw, tz = 3.3;
  gsap.set(B.el, { transformOrigin: '0 0' });
  ctx.to(B.el, { x: P.X(w.lo) - s * rx, y: P.Y(w.yHi) - s * ry, scale: s, duration: 1.3, ease: 'power2.inOut' }, tz);
  ctx.to(B.el, { autoAlpha: 0, duration: 0.5 }, tz + 0.8);
  ctx.to(Z.P.el, { autoAlpha: 1, duration: 0.5 }, tz + 0.8);
  ctx.to('#lupe', { autoAlpha: 1, duration: 0.3 }, tz + 1.2);

  const tS = [T('Die Ausgabengerade verschiebt'), T('und markiere den neuen'), T('Das Einkommen steigt also')];
  ctx.stepsRun('#side', tS, { end: T('Das ist der Multiplikator') - 0.2 });

  // Schritt 1: Parallelverschiebung um 25
  const tg = T('verschiebt sich parallel');
  ctx.to(Z.ghost, { autoAlpha: 1, duration: 0.2 }, tg);
  ctx.to(Z.ghost, { attr: { y1: Y(U.E2(w.lo)), y2: Y(U.E2(1700)) }, duration: 1.2, ease: 'power2.inOut' }, tg + 0.2);
  U.fin(ctx, Z.dG, T('genau um diese'));
  U.fin(ctx, Z.ldG, T('genau um diese') + 0.5);
  ctx.pulse('#dg', T('genau um diese') + 0.6, { scale: 1.15 });
  ctx.show('#calc', T('Der neue Achsenabschnitt') - 0.2, { y: 22 });
  gsap.set([$('#c2l'), $('#c2'), $('#c2b'), $('#c2c'), $('#c3'), $('#c3b')], { autoAlpha: 0 });
  ctx.show('#c1', T('Der neue Achsenabschnitt') + 0.2, { x: -16, y: 0 });
  // „Zeichne die neue Gerade in einer zweiten Farbe“
  const td = T('Zeichne die neue Gerade') + 0.2;
  ctx.pen(Z.e2, td, 1.6);
  ctx.to(Z.ghost, { autoAlpha: 0, duration: 0.3 }, td + 1.5);
  U.fin(ctx, Z.lE2, td + 1.6);

  // Schritt 2: neuer Schnittpunkt bei 1400
  ctx.pop(Z.eq2, T('den neuen Schnittpunkt') + 0.3);
  ctx.to(Z.eq1, { fill: C.old, duration: 0.3 }, T('den neuen Schnittpunkt') + 0.3);
  const tl2 = T('Er liegt bei');
  ctx.pen(Z.lot2[0], tl2, 0.6).pen(Z.lot2[1], tl2 + 0.7, 0.6);
  for (const t of [Z.xLab(1400), Z.yLab(1400)]) { gsap.set(t, { transformOrigin: '50% 50%' }); ctx.to(t, { fill: C.c3, fontWeight: 800, duration: 0.3 }, tl2 + 1.0).pulse(t, tl2 + 1.1, { scale: 1.3 }); }

  // Schritt 3: ΔY ablesen
  const ty = T('steigt also um hundert');
  ctx.extend(Z.dY, ty, 0.6); U.fin(ctx, Z.ldY, ty + 0.5);
  gsap.set(Z.ldG, { transformOrigin: '100% 50%' });
  ctx.pulse(Z.ldG, T('nur fünfundzwanzig'), { scale: 1.3 }).pulse('#dg', T('nur fünfundzwanzig'), { scale: 1.15 });

  // Multiplikator
  const fin = (id, t) => ctx.to(id, { autoAlpha: 1, duration: 0.3 }, t);
  fin('#c2l', T('Das ist der Multiplikator')); fin('#c2', T('eins geteilt durch'));
  fin('#c2b', T('also eins durch null')); fin('#c2c', T('gleich vier') - 0.1);
  fin('#c3', T('Vier mal fünfundzwanzig')); fin('#c3b', T('ergibt hundert'));
  ctx.pulse('#c3b', T('ergibt hundert') + 0.4, { scale: 1.2 });
  gsap.set(Z.ldY, { transformOrigin: '50% 50%' });
  ctx.pulse(Z.ldY, T('ergibt hundert') + 0.4, { scale: 1.3 });

  /* ---------- Zustand B: Umkehrfrage ---------- */
  const tb = T('Die letzte Frage');
  ctx.hide(['#gcard', '#side', '#calc'].map(q => $(q)), tb - 0.3, { dur: 0.3 });
  ctx.show('#rev', tb, { y: 22 }).show('#all', tb + 0.25, { y: 22 });
  gsap.set([$('#r1'), $('#r2'), $('#r2b'), $('#r3'), $('#r3b')], { autoAlpha: 0 });
  // Ziel im Diagramm: Punkt (1600 | 1600) auf der 45°-Linie
  const tt = T('ein Einkommen von sechzehnhundert') + 0.7;
  ctx.pop(Z.tgt, tt);
  ctx.pen(Z.lot3[0], tt + 0.2, 0.6);
  for (const t of [Z.xLab(1600)]) { gsap.set(t, { transformOrigin: '50% 50%' }); ctx.to(t, { fill: C.c4, fontWeight: 800, duration: 0.3 }, tt + 0.8).pulse(t, tt + 0.9, { scale: 1.3 }); }
  fin('#r1', T('muss um dreihundert') - 0.3);
  fin('#r2', T('Geteilt durch den Multiplikator')); fin('#r2b', T('sind das fünfundsiebzig') + 0.2);
  ctx.pen(Z.e3, T('sind das fünfundsiebzig') + 0.6, 1.0);
  fin('#r3', T('insgesamt also')); fin('#r3b', T('also hundertfünfundsiebzig') + 0.3);
  U.fin(ctx, Z.lE3, T('also hundertfünfundsiebzig') + 0.4);
  const ta = T('also hundertfünfundsiebzig') + 0.6;
  ctx.swap('#ans', '175', ta);
  ctx.pulse('#ans', ta + 0.4, { scale: 1.25 });
});
