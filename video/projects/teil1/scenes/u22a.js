// Gemeinsames Diagramm aller Szenen dieses Videos: r nach oben, S und I nach rechts.
// Datenkoordinaten 0…10 (ohne Zahlen an den Achsen). V.t1.make(host) baut alles auf; die Szene entscheidet, was wann erscheint.
V.t1 = {
  S1: 6,                  // Ersparnis (Ausgangslage)
  I: r => 10.2 - r,       // Investitionen beim Zins r
  rEq: 4.2,               // Zins im Schnittpunkt von S und I(r) (geschlossene Volkswirtschaft)
  make(host) {
    const P = V.plot({ w: 1000, h: 764, x: [0, 10], y: [0, 10], pad: { l: 120, r: 100, t: 76, b: 104 } });
    P.el.classList.add('big');
    host.appendChild(P.el);
    const ax = P.axes({ xl: 'S, I', yl: 'r' });
    const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
    const S = P.line(this.S1, 0, this.S1, 9.3, { cls: 'c1' });
    const Ic = P.line(1.0, 9.2, 9.4, 0.8, { cls: 'c3' });
    const lS = P.text(this.S1, 9.3, 'S', { cls: 'c1', dy: -20 });
    const lI = P.text(9.4, 0.8, 'I(r)', { cls: 'c3', dx: 18, dy: 10, anchor: 'start' });
    return { P, ax, xAxis, yAxis, xl, yl, S, Ic, lS, lI };
  },
};

// Übung 2-2 – das Modell der geschlossenen Volkswirtschaft zeichnen
V.scene('u22a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Übung 2-2', title: 'Der <em>Finanzmarkt</em> – Schritt für Schritt', src: 'Skript I, Folien 67–70' });
  const ov = s => `<span style="text-decoration:overline">${s}</span>`;

  ctx.html(`
  <style>
    #sc-u22a .task{left:0;top:0;width:1728px;padding:30px 40px 34px}
    #sc-u22a .task .q{font-size:42px;font-weight:600;line-height:1.38}
    #sc-u22a .task .row{display:flex;align-items:center;gap:26px;margin-top:30px}
    #sc-u22a .bub{display:flex;align-items:center;gap:16px;padding:14px 22px;font-size:34px;font-weight:700}
    #sc-u22a .arr{font-family:var(--mono);font-weight:800;font-size:54px;color:var(--mute)}
    #sc-u22a .ask{margin-left:auto;display:flex;gap:18px}
    #sc-u22a .ask .chip{font-size:44px;padding:8px 24px}
    #sc-u22a .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u22a .side{left:1046px;top:0;width:682px}
    #sc-u22a .why{left:1046px;top:466px;width:682px;height:304px;padding:20px 26px}
    #sc-u22a .why .eq{font-size:44px;font-weight:700}
    #sc-u22a .why p{margin:8px 0 0;font-size:29px;line-height:1.3;font-weight:500}
    #sc-u22a .tagc{font-family:var(--mono);font-weight:700;font-size:26px;padding:3px 12px;position:absolute;white-space:nowrap}
  </style>

  <!-- Aufgabe -->
  <div class="abs card task" id="task">
    <span class="lab">Die Aufgabe</span>
    <div class="q">„Nehmen Sie an, dass die Konsumenten mehr <span class="hl b-c4" id="h1">Vertrauen in die Zukunft</span> gewinnen, ein höheres Einkommen erwarten und deshalb <span class="hl b-c1" id="h2">schon heute mehr konsumieren</span>. Welche Wirkungen ergeben sich für die <span class="hl b-c3" id="h3">Investitionen</span> und den <span class="hl b-c2" id="h4">Realzins</span>?“</div>
    <div class="row">
      <div class="card soft bub" id="b1">${V.icon('people', 76, { tone: 4 })}<span>Zuversicht ↑</span></div>
      <span class="arr" id="ar1">→</span>
      <div class="card c1 bub" id="b2">${V.icon('cart', 76, { tone: 1 })}<span class="t-c1">Konsum C ↑</span></div>
      <div class="ask"><span class="chip c3" id="q1">I = ?</span><span class="chip c2" id="q2">r = ?</span></div>
    </div>
  </div>

  <!-- Zeichenblatt -->
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen', 'r nach oben · S und I nach rechts'],
    ['Ersparnis S', 'senkrechte Linie = Kreditangebot'],
    ['Investitionen I(r)', 'fallende Linie = Kreditnachfrage'],
    ['Gleichgewicht', 'Schnittpunkt markieren, Zins r* ablesen'],
  ])}</div>

  <!-- Begründung zum aktuellen Schritt -->
  <div class="abs card why" id="w2">
    <span class="lab">Warum senkrecht?</span>
    <div class="eq"><span class="t-c1">S</span> = ${ov('Y')} − C − G</div>
    <p id="w2a">${ov('Y')} ist langfristig fest (Kapital, Arbeit).</p>
    <p id="w2b">C hängt von Y − T ab, <b>nicht vom Zins</b>.</p>
  </div>
  <div class="abs card why" id="w3">
    <span class="lab">Warum fallend?</span>
    <div class="eq">r ↑ &nbsp;→&nbsp; <span class="t-c3">I ↓</span></div>
    <p>Je höher der Zins, desto teurer sind Kredite – es wird weniger investiert.</p>
  </div>
  <div class="abs res why" id="w4">
    <span class="lab">Gleichgewicht am Finanzmarkt</span>
    <div class="eq"><span class="t-c1">S</span> = <span class="t-c3">I(r*)</span></div>
    <p>Kreditangebot = Kreditnachfrage. Der Zins r* räumt den Markt.</p>
  </div>`);

  /* ---------- Aufgabe ---------- */
  ctx.show('#task', 0.7, { y: 30 });
  gsap.set($$('#task .hl'), { backgroundColor: 'rgba(0,0,0,0)' });
  const mark = (id, t, col) => ctx.tint(id, t, { backgroundColor: col });
  mark('#h1', T('Vertrauen in die Zukunft'), C.c4bg); ctx.pop('#b1', T('Vertrauen in die Zukunft') + 0.2);
  mark('#h2', T('konsumieren schon heute'), C.c1bg); ctx.show('#ar1', T('konsumieren schon heute'), { x: -16, y: 0 }); ctx.pop('#b2', T('konsumieren schon heute') + 0.15);
  mark('#h3', T('mit den Investitionen'), C.c3bg); ctx.pop('#q1', T('mit den Investitionen'));
  mark('#h4', T('mit dem Realzins'), C.c2bg); ctx.pop('#q2', T('mit dem Realzins'));

  /* ---------- Wechsel zum Zeichenblatt ---------- */
  const t0 = T('Dafür brauchen wir');
  ctx.hide('#task', t0 - 0.3, { y: -20, dur: 0.3 });
  ctx.show('#sheet', t0, { x: -40, y: 0 }).show('#side', t0 + 0.15, { x: 40, y: 0 });
  const D = V.t1.make($('#sheet')), P = D.P;
  gsap.set([D.xl, D.yl, D.lS, D.lI], { autoAlpha: 0 });
  gsap.set([D.xAxis, D.yAxis, D.S, D.Ic], { autoAlpha: 0 });

  const tS = [T('Schritt eins'), T('Schritt zwei'), T('Schritt drei'), T('Schritt vier')];
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });

  // Schritt 1: Achsen
  ctx.pen(D.yAxis, T('nach oben der Realzins') - 0.2, 0.9, { extend: true });
  ctx.to(D.yl, { autoAlpha: 1, duration: 0.3 }, T('nach oben der Realzins') + 0.7);
  ctx.pen(D.xAxis, T('nach rechts Ersparnis'), 0.9, { extend: true });
  ctx.to(D.xl, { autoAlpha: 1, duration: 0.3 }, T('nach rechts Ersparnis') + 0.9);

  // Schritt 2: Ersparnis
  ctx.show('#w2', tS[1] + 0.2, { y: 24 });
  ctx.show('#w2a', T('Das Einkommen ist langfristig fest'), { x: -16, y: 0 }).show('#w2b', T('Und der Konsum hängt'), { x: -16, y: 0 });
  const tS2 = T('eine senkrechte Linie') - 0.4;
  gsap.set(D.S, { attr: { y1: P.Y(0), y2: P.Y(9.3) } });
  ctx.pen(D.S, tS2, 1.1);
  ctx.to(D.lS, { autoAlpha: 1, duration: 0.3 }, tS2 + 1.1);
  const tagS = V.el('<div class="chip c1 tagc">Kreditangebot</div>'); $('#sheet').appendChild(tagS);
  tagS.style.left = P.X(6) + 22 + 'px'; tagS.style.top = P.Y(8.4) + 'px';
  ctx.show(tagS, T('Sie ist das Kreditangebot'), { x: -14, y: 0 });

  // Schritt 3: Investitionen
  ctx.hide('#w2', tS[2] - 0.1).show('#w3', tS[2] + 0.2, { y: 24 });
  const tI = T('fällt also von links oben') - 0.2;
  ctx.pen(D.Ic, tI, 1.5);
  ctx.to(D.lI, { autoAlpha: 1, duration: 0.3 }, tI + 1.5);
  const tagI = V.el('<div class="chip c3 tagc">Kreditnachfrage</div>'); $('#sheet').appendChild(tagI);
  tagI.style.left = P.X(0.5) + 'px'; tagI.style.top = P.Y(5.9) + 'px';
  ctx.show(tagI, T('Sie ist die Kreditnachfrage'), { x: -14, y: 0 });

  // Schritt 4: Gleichgewicht
  ctx.hide('#w3', tS[3] - 0.1).show('#w4', tS[3] + 0.2, { y: 24 });
  const dot = P.dot(6, V.t1.rEq, { cls: 'ink', r: 13 });
  gsap.set(dot, { transformOrigin: '50% 50%' });
  ctx.pop(dot, T('Im Schnittpunkt'));
  const g = P.add('line', { x1: P.X(6), y1: P.Y(V.t1.rEq), x2: P.X(0), y2: P.Y(V.t1.rEq), class: 'dash' });
  const lr = P.text(0, V.t1.rEq, 'r*', { cls: 'c2', dx: -22, dy: 12, anchor: 'end' });
  gsap.set(lr, { autoAlpha: 0 });
  ctx.pen(g, T('Dort lesen wir'), 0.9);
  ctx.to(lr, { autoAlpha: 1, duration: 0.3 }, T('Dort lesen wir') + 0.9);
  ctx.pulse(dot, T('Dort lesen wir') + 1.3, { scale: 1.5 });
});
