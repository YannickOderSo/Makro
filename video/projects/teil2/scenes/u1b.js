// Übung 1 – Gleichgewicht im keynesianischen Kreuz (Diagramm aus u1a.js: V.t2u1)
V.scene('u1b', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u1;
  ctx.header({ kicker: 'Übung 1', title: 'Das <em>Gleichgewicht</em> finden', src: 'Teil II · Übung 1' });

  ctx.html(`
  <style>
    #sc-u1b .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u1b .calc{left:1046px;top:0;width:682px;height:300px;padding:16px 26px}
    #sc-u1b .calc .eq{font-size:39px;font-weight:600;line-height:1.42}
    #sc-u1b .calc .hint{font-family:var(--sans);font-size:25px;font-weight:500;color:var(--mute);margin-left:18px}
    #sc-u1b .side{left:1046px;top:318px;width:682px}
    #sc-u1b .out{left:1046px;top:606px;width:682px;height:164px;padding:14px 26px}
    #sc-u1b .out .eq{font-size:54px;font-weight:800;line-height:1.22}
    #sc-u1b .out p{margin:2px 0 0;font-size:27px;font-weight:500}
    #sc-u1b .why{position:absolute;padding:12px 16px 14px;border:3px solid var(--ink);background:var(--panel);box-shadow:6px 6px 0 var(--line)}
    #sc-u1b .why .hd2{font-family:var(--mono);font-weight:800;font-size:30px;white-space:nowrap}
    #sc-u1b .why .ln{display:flex;align-items:center;gap:12px;font-size:27px;font-weight:600;line-height:1.2;margin-top:8px;white-space:nowrap}
    #sc-u1b .why.a{border-color:var(--c2);box-shadow:6px 6px 0 var(--c2bg)} #sc-u1b .why.a .hd2{color:var(--c2)}
    #sc-u1b .why.b{border-color:var(--c4);box-shadow:6px 6px 0 var(--c4bg)} #sc-u1b .why.b .hd2{color:var(--c4)}
  </style>

  <div class="abs sheet" id="sheet">
    <div class="why b" id="cb" style="left:168px;top:84px">
      <div class="hd2">links: E &gt; Y</div>
      <div class="ln" id="cb1">${V.icon('boxes', 44, { tone: 4 })}<span>Lager leeren sich</span></div>
      <div class="ln" id="cb2"><span class="t-c4" style="font-family:var(--mono);font-weight:800">→</span><span>Produktion steigt</span></div>
    </div>
    <div class="why a" id="ca" style="left:566px;top:400px">
      <div class="hd2">rechts: Y &gt; E</div>
      <div class="ln" id="ca1">${V.icon('boxes', 44, { tone: 2 })}<span>Lager füllen sich</span></div>
      <div class="ln" id="ca2"><span class="t-c2" style="font-family:var(--mono);font-weight:800">←</span><span>Produktion wird gedrosselt</span></div>
    </div>
  </div>

  <div class="abs card calc" id="calc">
    <span class="lab">Rechnerisch: Einkommen = Ausgaben</span>
    <div class="eq" id="e1">Y = <span class="t-c1">E</span></div>
    <div class="eq" id="e2">Y = <span class="t-c1">325 + 0,75 · Y</span></div>
    <div class="eq" id="e3">0,25 · Y = 325<span class="hint">ein Viertel von Y</span></div>
    <div class="eq" id="e4">Y = 325 / 0,25 = <b class="t-c3">1300</b></div>
  </div>
  <div class="abs side" id="side">${V.steps([
    'Schnittpunkt markieren',
    'Lot auf beide Achsen fällen',
    'An beiden Achsen ablesen: 1300',
  ])}</div>
  <div class="abs res out" id="out">
    <span class="lab">Gleichgewicht</span>
    <div class="eq">Y* = 1300</div>
    <p>Einkommen = geplante Ausgaben = 1300</p>
  </div>`);

  /* ---------- Diagramm: Schlussbild von u1a ---------- */
  const D = U.addEq(U.make($('#sheet'))), P = D.P, X = P.X, Y = P.Y;
  U.settle(D);
  U.hide([D.lotV, D.lotH, D.stub, D.mx, D.my, D.eq]);
  // Hilfslinien, Hilfspunkte und Steigungsdreieck haben ausgedient
  ctx.to([D.tri, D.tri1, D.tri2, D.gV, D.gH, D.gE, ...D.helpers, D.mB], { autoAlpha: 0, duration: 0.5 }, 0.5);
  ctx.show('#side', 0.3, { x: 40, y: 0 });

  // „… wo sich beide Linien schneiden“
  const ring = P.add('circle', { cx: X(1300), cy: Y(1300), r: 34, fill: 'none', stroke: C.c3, 'stroke-width': 6 });
  gsap.set(ring, { autoAlpha: 0, scale: 2.4, transformOrigin: '50% 50%' });
  const tX = T('wo sich beide Linien');
  ctx.to(ring, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, tX);
  for (const l of [D.line45, D.Eline]) { ctx.to(l, { strokeWidth: 12, duration: 0.2 }, tX + 0.5); ctx.to(l, { strokeWidth: 7, duration: 0.4 }, tX + 0.75); }

  /* ---------- Rechnung ---------- */
  ctx.show('#calc', 0.45, { x: 40, y: 0 });
  gsap.set($$('#calc .eq'), { autoAlpha: 0 });
  const line = (id, t) => ctx.tl.fromTo($(id), { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out', immediateRender: false }, t);
  line('#e1', T('Einkommen gleich Ausgaben'));
  line('#e2', T('Ypsilon gleich dreihundertfünfundzwanzig'));
  line('#e3', T('Ein Viertel von Ypsilon'));
  line('#e4', T('und Ypsilon ist dreizehnhundert') + 0.2);
  ctx.pulse('#e4 b', T('und Ypsilon ist dreizehnhundert') + 1.0, { scale: 1.2 });

  /* ---------- Zeichnen: Schnittpunkt, Lote, Werte ---------- */
  const tS = [T('In der Zeichnung'), T('fällst das Lot'), T('An beiden steht')];
  ctx.stepsRun('#side', tS, { end: T('Warum landet') - 0.1 });
  const tDot = T('den Schnittpunkt und');
  ctx.pop(D.eq, tDot);
  ctx.to(ring, { autoAlpha: 0, scale: 1.6, duration: 0.4 }, tDot + 0.1);
  ctx.pen(D.lotV, tS[1] + 0.25, 0.7).pen(D.lotH, tS[1] + 1.05, 0.7);
  const tV = T('An beiden steht dreizehnhundert') + 0.75;
  U.fin(ctx, [D.stub, D.mx, D.my], tV);
  gsap.set([D.mx, D.my], { transformOrigin: '50% 50%' });
  ctx.pulse([D.mx, D.my], tV + 0.35, { scale: 1.3 });
  ctx.show('#out', tV + 0.2, { y: 22 });

  /* ---------- Warum genau dort? ---------- */
  // rechts vom Schnittpunkt: Y > E
  const gapA = P.add('line', { x1: X(1900), y1: Y(1900), x2: X(1900), y2: Y(U.E1(1900)), stroke: C.c2, 'stroke-width': 9, 'stroke-linecap': 'round' });
  const leadA = P.add('line', { x1: X(1900), y1: Y(U.E1(1900)) + 8, x2: X(1900), y2: 398, class: 'dash c2' });
  const arrA = P.add('line', { x1: X(1900), y1: Y(0) - 30, x2: X(1300) + 20, y2: Y(0) - 30, stroke: C.c2, 'stroke-width': 7, 'marker-end': 'url(#ah-c2)' });
  // links vom Schnittpunkt: E > Y
  const gapB = P.add('line', { x1: X(700), y1: Y(700), x2: X(700), y2: Y(U.E1(700)), stroke: C.c4, 'stroke-width': 9, 'stroke-linecap': 'round' });
  const leadB = P.add('line', { x1: X(700), y1: Y(U.E1(700)) - 8, x2: X(700), y2: 232, class: 'dash c4' });
  const arrB = P.add('line', { x1: X(700), y1: Y(0) - 30, x2: X(1300) - 20, y2: Y(0) - 30, stroke: C.c4, 'stroke-width': 7, 'marker-end': 'url(#ah-c4)' });
  U.hide([gapA, leadA, arrA, gapB, leadB, arrB]);
  gsap.set([$('#ca'), $('#cb'), $('#ca1'), $('#ca2'), $('#cb1'), $('#cb2')], { autoAlpha: 0 });

  const tA = T('Rechts vom Schnittpunkt');
  ctx.extend(gapA, tA, 0.45).extend(leadA, tA + 0.45, 0.4);
  ctx.to('#ca', { autoAlpha: 1, duration: 0.35 }, tA + 0.6);
  ctx.to('#ca1', { autoAlpha: 1, duration: 0.3 }, T('Die Lager füllen sich'));
  ctx.to('#ca2', { autoAlpha: 1, duration: 0.3 }, T('drosseln die Produktion') - 0.3);
  ctx.extend(arrA, T('drosseln die Produktion'), 0.8);

  const tB = T('Links davon');
  ctx.extend(gapB, tB, 0.45).extend(leadB, tB + 0.45, 0.4);
  ctx.to('#cb', { autoAlpha: 1, duration: 0.35 }, tB + 0.6);
  ctx.to('#cb1', { autoAlpha: 1, duration: 0.3 }, T('Die Lager leeren sich'));
  ctx.to('#cb2', { autoAlpha: 1, duration: 0.3 }, T('und die Produktion steigt') - 0.1);
  ctx.extend(arrB, T('und die Produktion steigt') + 0.2, 0.8);
  ctx.pulse(D.eq, T('und die Produktion steigt') + 1.1, { scale: 1.5 });
});
