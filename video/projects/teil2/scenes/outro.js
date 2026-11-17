// Outro – die Zeichen-Checkliste, an einem Beispielblatt vorgeführt
V.scene('outro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Zusammenfassung', title: 'Die <em>Zeichen-Checkliste</em>' });
  ctx.html(`
  <style>
    #sc-outro .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-outro .side{left:1046px;top:0;width:682px}
    #sc-outro .luck{position:absolute;left:1066px;top:560px;width:640px;text-align:center;font-weight:900;font-size:104px;letter-spacing:-.03em;color:var(--c2);border:8px solid var(--c2);outline:4px solid var(--c2);outline-offset:8px;background:rgba(250,252,251,.94);padding:14px 0 22px;line-height:1}
  </style>
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen beschriften', 'Größe und Einheit an jede Achse'],
    ['Zwei Punkte je Gerade berechnen', 'am besten die Randwerte'],
    ['Punkte verbinden', 'Namen direkt an die Linie'],
    ['Schnittpunkt markieren', 'Hilfslinien zu beiden Achsen'],
    ['Verschiebung parallel einzeichnen', 'alte Linie stehen lassen, Pfeil dazu'],
  ], { title: 'Immer dieselbe Reihenfolge' })}</div>
  <div class="luck" id="luck">Viel Erfolg!</div>`);

  const P = V.plot({ w: 1000, h: 764, x: [0, 10], y: [0, 10], pad: { l: 120, r: 100, t: 76, b: 104 } });
  P.el.classList.add('big'); $('#sheet').appendChild(P.el);
  const ax = P.axes({ xl: 'Y', yl: 'r' });
  const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
  const pts = [[1.6, 8.6], [8.4, 1.8], [1.6, 1.8], [7.6, 8.6]].map(([x, y], i) => P.dot(x, y, { cls: i < 2 ? 'c1' : 'c2', r: 11 }));
  const IS = P.line(1.6, 8.6, 8.4, 1.8, { cls: 'c1' }), LM = P.line(1.6, 1.8, 7.6, 8.6, { cls: 'c2' });
  const lIS = P.text(8.4, 1.8, 'IS', { cls: 'c1', dx: 26, dy: 12, anchor: 'start' }), lLM = P.text(7.6, 8.6, 'LM', { cls: 'c2', dx: 24, dy: 6, anchor: 'start' });
  // Schnittpunkt: 10,2 − x = 0,2 + 1,1333·(x − 1,6) … numerisch
  const xe = (10.2 - 1.8 + 1.6 * (6.8 / 6)) / (1 + 6.8 / 6), ye = 10.2 - xe;
  const g1 = P.add('line', { x1: P.X(xe), y1: P.Y(ye), x2: P.X(xe), y2: P.Y(0), class: 'dash' }), g2 = P.add('line', { x1: P.X(xe), y1: P.Y(ye), x2: P.X(0), y2: P.Y(ye), class: 'dash' });
  const dot = P.dot(xe, ye, { cls: 'c3', r: 14 });
  const IS2 = P.line(3.2, 8.6, 9.6, 2.2, { cls: 'c1' });
  const arr = V.arrow(P.el, `M${P.X(4.4)} ${P.Y(7.9)}H${P.X(5.5)}`, { cls: 'c1', w: 6 });
  const lIS2 = P.text(9.6, 2.2, 'IS₂', { cls: 'c1', dx: 8, dy: -16, anchor: 'start' });
  gsap.set([xl, yl, lIS, lLM, lIS2, xAxis, yAxis, IS, LM, IS2, g1, g2, arr], { autoAlpha: 0 });
  gsap.set([...pts, dot], { transformOrigin: '50% 50%' });

  ctx.show('#sheet', 0.6, { x: -40, y: 0 }).show('#side', 0.8, { x: 40, y: 0 });
  const ts = [T('Achsen beschriften'), T('zwei Punkte je Gerade'), T('verbinden'), T('den Schnittpunkt markieren'), T('Verschiebungen parallel')];
  ctx.stepsRun('#side', ts, { end: T('Viel Erfolg') - 0.2 });
  // 1 Achsen
  ctx.pen(yAxis, ts[0] - 0.1, 0.6, { extend: true }).pen(xAxis, ts[0] + 0.55, 0.6, { extend: true });
  ctx.to([yl, xl], { autoAlpha: 1, duration: 0.3 }, ts[0] + 1.1);
  // 2 Punkte
  ctx.pop(pts, ts[1] + 0.2, { stagger: 0.22 });
  // 3 verbinden
  ctx.pen(IS, ts[2] - 0.1, 0.55).pen(LM, ts[2] + 0.5, 0.55);
  ctx.to([lIS, lLM], { autoAlpha: 1, duration: 0.3 }, ts[2] + 1.0);
  // 4 Schnittpunkt
  ctx.pop(dot, ts[3] + 0.1);
  ctx.pen(g1, ts[3] + 0.5, 0.45).pen(g2, ts[3] + 0.95, 0.45);
  // 5 Verschiebung
  ctx.tint(IS, ts[4], { stroke: C.old }).tint(lIS, ts[4], { fill: C.old });
  ctx.pen(IS2, ts[4] + 0.2, 0.7);
  ctx.drawArrow(arr, ts[4] + 0.9, 0.4);
  ctx.to(lIS2, { autoAlpha: 1, duration: 0.3 }, ts[4] + 1.0);
  // Stempel
  const luck = $('#luck'), tE = T('Viel Erfolg');
  gsap.set(luck, { autoAlpha: 0, scale: 2.2, rotation: -14 });
  ctx.to(luck, { autoAlpha: 1, scale: 1, rotation: -4, duration: 0.32, ease: 'power4.in' }, tE);
  ctx.to(luck, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tE + 0.32);
});
