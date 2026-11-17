// Gemeinsames Diagramm für Übung 2 (u2a, u2b): Geldmarkt, r in % nach oben, Realkasse M/P nach rechts.
// Maßstabsgetreu: (M/P)^d = 1000 − 100 r, Angebot M/P = 500. make(host) baut das fertige Bild von u2a;
// die Szene entscheidet, was wann erscheint. final(D) setzt die Hervorhebungen des Schlussbilds von u2a.
V.t2u2 = {
  make(host) {
    const P = V.plot({ w: 1000, h: 764, x: [0, 1100], y: [0, 11], pad: { l: 130, r: 150, t: 80, b: 110 } });
    P.el.classList.add('big');
    host.appendChild(P.el);
    const xv = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], yv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ax = P.axes({ xl: 'M/P', yl: 'r', xt: xv.map(v => [v, v % 200 ? '' : String(v)]), yt: yv.map(v => [v, String(v)]) });
    const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
    const tk = [...ax.querySelectorAll('line.tick')], tn = [...ax.querySelectorAll('text.tickl')];
    const xTick = tk.slice(0, 10), yTick = tk.slice(10), xNum = tn.slice(0, 10), yNum = tn.slice(10);
    xNum.forEach(t => (t.style.fontSize = '28px'));
    xl.setAttribute('x', 992);
    const pct = P.add('text', { x: P.X(0) + 22, y: 66, class: 'tickl', 'text-anchor': 'start' }, 'in %');
    // Wert 500 auf der Achse (Angebot) – eigener, hervorgehobener Eintrag
    xNum[4].textContent = '500';
    Object.assign(xNum[4].style, { fill: V.C.c4, fontWeight: 800 });
    // Linien zuerst, Punkte danach (liegen oben)
    const gE = P.add('line', { x1: P.X(500), y1: P.Y(5), x2: P.X(0), y2: P.Y(5), class: 'dash c2' });
    const S1 = P.line(500, 0, 500, 10.4, { cls: 'c4' });
    const lS1 = P.text(500, 10.4, 'Angebot', { cls: 'c4', dy: -16 });
    const Dm = P.line(0, 10, 1000, 0, { cls: 'c1' });
    const lD = P.text(700, 3, 'Nachfrage L(r)', { cls: 'c1', dx: 14, dy: -30, anchor: 'start' });
    const A = P.dot(1000, 0, { cls: 'c1', r: 12 }), B = P.dot(0, 10, { cls: 'c1', r: 12 });
    const lA = P.text(1000, 0, '(1000 | 0)', { cls: 'c1', dx: 18, dy: -20, anchor: 'start' });
    const lB = P.text(0, 10, '(0 | 10)', { cls: 'c1', dx: 22, dy: -14, anchor: 'start' });
    [lA, lB].forEach(t => (t.style.fontSize = '28px'));
    const E = P.dot(500, 5, { cls: 'c2', r: 13 });
    [A, B, E].forEach(d => { d.style.stroke = '#fff'; gsap.set(d, { transformOrigin: '50% 50%' }); }); // weißer Rand (svg .cN würde ihn sonst einfärben)
    return { P, ax, xAxis, yAxis, xl, yl, pct, xTick, yTick, xNum, yNum, gE, S1, lS1, Dm, lD, A, B, lA, lB, E };
  },
  // Schlussbild von u2a: Gleichgewichtszins 5 an der Zinsachse hervorgehoben
  final(D) { gsap.set(D.yNum[4], { fill: V.C.c2, fontWeight: 800 }); },
};

// Übung 2 – Angebot und Nachfrage nach Realkasse zeichnen, Gleichgewichtszins bestimmen
V.scene('u2a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Übung 2', title: 'Den <em>Geldmarkt</em> zeichnen', src: 'Teil II · Übung 2' });
  const MP = V.frac('M', 'P');

  ctx.html(`
  <style>
    #sc-u2a .task{left:0;top:56px;width:1728px;padding:30px 40px 38px}
    #sc-u2a .giv{display:flex;gap:28px;margin-top:6px;align-items:stretch}
    #sc-u2a .g{padding:18px 30px 20px;flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between}
    #sc-u2a .g .eq{font-size:52px;font-weight:700}
    #sc-u2a .qs{display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:38px;font-size:36px;font-weight:600}
    #sc-u2a .qs div{display:flex;align-items:center;gap:18px}
    #sc-u2a .qs .step{width:50px;height:50px;font-size:26px}
    #sc-u2a .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u2a .side{left:1046px;top:0;width:682px}
    #sc-u2a .why{left:1046px;top:466px;width:682px;height:304px;padding:20px 26px}
    #sc-u2a .why p{margin:6px 0 0;font-size:31px;line-height:1.3;font-weight:500}
    #sc-u2a .why .eq{font-size:40px;font-weight:700}
    #sc-u2a .why .eq.xl{font-size:58px}
    #sc-u2a .rowi{display:flex;align-items:center;gap:18px;font-size:29px;line-height:1.25;font-weight:500;margin-top:12px}
    #sc-u2a .eqrow{display:flex;align-items:center;justify-content:space-between;gap:16px}
    #sc-u2a .wt{border-collapse:collapse;width:100%;margin-top:2px}
    #sc-u2a .wt th{font-family:var(--mono);font-size:22px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);font-weight:700;text-align:left;padding:4px 8px 8px;border-bottom:3px solid var(--ink);white-space:nowrap}
    #sc-u2a .wt td{font-family:var(--mono);font-size:29px;font-weight:500;padding:12px 8px;border-bottom:2px solid var(--line);white-space:nowrap}
    #sc-u2a .wt td b{font-weight:800;color:var(--c1)}
    #sc-u2a .wt .chip{font-size:26px;padding:2px 10px}
  </style>

  <!-- Aufgabe -->
  <div class="abs card task" id="task">
    <span class="lab">Die Aufgabe · gegeben</span>
    <div class="giv">
      <div class="card c1 g" id="g1"><span class="lab">Nachfrage nach Realkasse</span><div class="eq t-c1">(${MP})<sup>d</sup> = 1000 − 100 r</div></div>
      <div class="card c4 g" id="g2"><span class="lab">Geldangebot</span><div class="eq t-c4">M = 1000</div></div>
      <div class="card g" id="g3"><span class="lab">Preisniveau</span><div class="eq">P = 2</div></div>
    </div>
    <div class="qs">
      <div class="qi"><span class="step">1</span>Angebot und Nachfrage zeichnen</div>
      <div class="qi"><span class="step">2</span>Gleichgewichtszins bestimmen</div>
      <div class="qi"><span class="step">3</span>Geldangebot steigt auf 1200</div>
      <div class="qi"><span class="step">4</span>Zielzins 7 %: welches Geldangebot?</div>
    </div>
  </div>

  <!-- Zeichenblatt und Schritte -->
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen', 'r in % nach oben · Realkasse M/P nach rechts'],
    ['Angebot', 'senkrechte Linie bei M/P = 500'],
    ['Nachfrage', 'zwei Punkte berechnen und verbinden'],
    ['Gleichgewicht', 'Schnittpunkt markieren, Zins ablesen'],
  ])}</div>

  <!-- Rechnung zum aktuellen Schritt -->
  <div class="abs card why" id="w1">
    <span class="lab">Schritt 1 · Was steht an den Achsen?</span>
    <p id="w1a"><b class="t-c2">r</b> – Zinssatz in Prozent, Skala 0 bis 10</p>
    <p id="w1b"><b class="t-c4">M/P</b> – Realkasse, Skala 0 bis 1000</p>
    <div class="eq" id="w1c" style="font-size:34px;margin-top:12px">Realkasse = ${V.frac('Geldmenge M', 'Preisniveau P')}</div>
  </div>
  <div class="abs card why" id="w2">
    <span class="lab">Schritt 2 · Angebot an Realkasse</span>
    <div class="eqrow">
      <div class="eq" id="w2eq"><span class="t-c4">${MP}</span> = ${V.frac('1000', '2')} <span id="w2r">= <b class="t-c4">500</b></span></div>
      <span class="chip c4" id="w2c" style="font-size:26px">→ senkrecht</span>
    </div>
    <div class="rowi" id="w2b">${V.icon('bank', 70, { tone: 4 })}<span>Die Zentralbank legt die Menge fest.<br>Sie hängt <b>nicht vom Zins</b> ab.</span></div>
  </div>
  <div class="abs card why" id="w3">
    <span class="lab">Schritt 3 · Wertetabelle Nachfrage</span>
    <table class="wt">
      <tr><th>Zins r</th><th>1000 − 100 r</th><th>Punkt (M/P | r)</th></tr>
      <tr><td class="ra">0</td><td class="ra">1000 − 0 = <b>1000</b></td><td class="pa"><span class="chip c1">(1000 | 0)</span></td></tr>
      <tr><td class="rb">10</td><td class="rb">1000 − 1000 = <b>0</b></td><td class="pb"><span class="chip c1">(0 | 10)</span></td></tr>
    </table>
  </div>
  <div class="abs res why" id="w4">
    <span class="lab">Schritt 4 · Angebot = Nachfrage</span>
    <div class="eq" id="e1"><span class="t-c4">500</span> = <span class="t-c1">1000 − 100 r</span></div>
    <div class="eq" id="e2">100 r = 500</div>
    <div class="eq xl" id="e3">r* = <b>5 %</b></div>
  </div>`);

  /* ---------- Aufgabe ---------- */
  ctx.show('#task', 0.6, { y: 30 });
  ctx.pop('#g1', T('Die Nachfrage nach Realkasse'), { scale: 0.85 });
  ctx.pop('#g2', T('Das Geldangebot beträgt'), { scale: 0.85 });
  ctx.pop('#g3', T('das Preisniveau zwei'), { scale: 0.85 });
  ctx.show('.qi', T('das Preisniveau zwei') + 0.7, { x: -20, y: 0, stagger: 0.14 });

  /* ---------- Wechsel zum Zeichenblatt ---------- */
  const tS = [T('Schritt eins'), T('Schritt zwei'), T('Schritt drei'), T('Schritt vier')];
  ctx.hide('#task', tS[0] - 0.3, { y: -20, dur: 0.3 });
  ctx.show('#sheet', tS[0], { x: -40, y: 0 }).show('#side', tS[0] + 0.15, { x: 40, y: 0 });
  const D = V.t2u2.make($('#sheet')), P = D.P;
  const fade = (el, t, d = 0.3) => ctx.to(el, { autoAlpha: 1, duration: d }, t);
  gsap.set([D.xl, D.yl, D.pct, D.lS1, D.lD, D.lA, D.lB, D.A, D.B, D.E, ...D.xTick, ...D.yTick, ...D.xNum, ...D.yNum], { autoAlpha: 0 });
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });

  // Schritt 1: Achsen, Beschriftung, Skala
  ctx.show('#w1', tS[0] + 0.3, { y: 24 });
  const tY = T('nach oben der Zinssatz') - 0.2, tX = T('nach rechts die Realkasse') - 0.1;
  ctx.show('#w1a', tY + 0.2, { x: -16, y: 0 }).show('#w1b', tX + 0.2, { x: -16, y: 0 }).show('#w1c', T('also Geldmenge geteilt'), { y: 14 });
  ctx.pen(D.yAxis, tY, 0.9, { extend: true });
  fade([D.yl, D.pct], tY + 0.8);
  ctx.to([...D.yTick, ...D.yNum], { autoAlpha: 1, duration: 0.2, stagger: 0.03 }, tY + 0.95);
  ctx.pen(D.xAxis, tX, 0.9, { extend: true });
  fade(D.xl, tX + 0.85);
  ctx.to(D.xTick, { autoAlpha: 1, duration: 0.2, stagger: 0.04 }, tX + 0.95);
  ctx.to(D.xNum.filter((_, i) => i !== 4), { autoAlpha: 1, duration: 0.2, stagger: 0.04 }, tX + 0.95);

  // Schritt 2: Angebot
  ctx.hide('#w1', tS[1] - 0.1).show('#w2', tS[1] + 0.25, { y: 24 });
  ctx.show('#w2eq', T('Tausend geteilt durch zwei'), { x: -16, y: 0 });
  ctx.show('#w2r', T('ist fünfhundert'), { x: -12, y: 0 }).pulse('#w2r', T('ist fünfhundert') + 0.45, { scale: 1.12 });
  ctx.show('#w2b', T('Diese Menge legt'), { y: 16 });
  ctx.pop('#w2c', T('Deshalb ist das Angebot'));
  const tS1 = T('eine senkrechte Linie') - 0.4;
  ctx.pen(D.S1, tS1, 1.1);
  fade(D.lS1, tS1 + 1.1);
  gsap.set(D.xNum[4], { transformOrigin: '50% 50%' });
  fade(D.xNum[4], T('bei fünfhundert')).pulse(D.xNum[4], T('bei fünfhundert') + 0.3, { scale: 1.35 });

  // Schritt 3: Nachfrage aus zwei Punkten
  ctx.hide('#w2', tS[2] - 0.1).show('#w3', tS[2] + 0.25, { y: 24 });
  gsap.set($$('#w3 td'), { autoAlpha: 0 });
  const tA = T('Bei einem Zins von null'), tAp = T('das ist der Punkt auf der waagerechten Achse');
  const tB = T('Bei einem Zins von zehn'), tBp = T('das ist der Punkt auf der senkrechten Achse');
  fade($$('#w3 .ra'), tA); fade($$('#w3 .pa'), tAp);
  ctx.pop(D.A, tAp + 0.1); fade(D.lA, tAp + 0.35);
  fade($$('#w3 .rb'), tB); fade($$('#w3 .pb'), tBp);
  ctx.pop(D.B, tBp + 0.1); fade(D.lB, tBp + 0.35);
  const tV = T('Verbinden');
  ctx.pen(D.Dm, tV, 1.7);
  fade(D.lD, T('die fallende Nachfragekurve') + 0.3);

  // Schritt 4: Gleichgewicht
  ctx.hide('#w3', tS[3] - 0.1).show('#w4', tS[3] + 0.25, { y: 24 });
  ctx.show('#e1', T('Fünfhundert gleich tausend'), { x: -16, y: 0 });
  ctx.show('#e2', T('Der Zins ist also') - 0.5, { x: -16, y: 0 });
  ctx.show('#e3', T('fünf Prozent') - 0.1, { y: 0, scale: 0.7, ease: 'back.out(1.8)' });
  ctx.pop(D.E, T('Markiere den Schnittpunkt') + 0.2);
  const tG = T('zieh eine gestrichelte Linie');
  ctx.pen(D.gE, tG, 1.0);
  gsap.set(D.yNum[4], { transformOrigin: '50% 50%' });
  ctx.tint(D.yNum[4], tG + 1.0, { fill: C.c2, fontWeight: 800 }).pulse(D.yNum[4], tG + 1.05, { scale: 1.5 });
  ctx.pulse(D.E, tG + 1.4, { scale: 1.45 });
});
