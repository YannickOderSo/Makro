// Gemeinsame Diagramme für Übung 1 (keynesianisches Kreuz): u1a, u1b, u1c.
// make(host)  = großes Kreuz, Skala 0–2000 auf beiden Achsen (gleicher Maßstab in Pixeln, damit die 45°-Linie wirklich 45° hat)
// addEq(D)    = Gleichgewicht 1300 mit Loten und Achsenwerten
// zoom(host)  = Ausschnitt 1100–1650 für die Verschiebung um ΔG = 25
V.t2u1 = {
  E1: y => 325 + 0.75 * y,
  E2: y => 350 + 0.75 * y,
  hide: els => gsap.set(els, { autoAlpha: 0 }),
  // weiche Einblendung für SVG-Teile
  fin: (ctx, els, t, dur = 0.3) => ctx.to(els, { autoAlpha: 1, duration: dur }, t),

  make(host) {
    const pad = { l: 130, r: 80, t: 70, b: 100 }, w = 1000, h = 764, yMax = 2250;
    const xMax = (yMax * (w - pad.l - pad.r)) / (h - pad.t - pad.b);
    const P = V.plot({ w, h, x: [0, xMax], y: [0, yMax], pad });
    P.el.classList.add('big');
    host.appendChild(P.el);
    const n = v => [v, String(v)];
    const ax = P.axes({ xl: 'Y', yl: 'E', xt: [500, 1000, 1500, 2000, 2500].map(n), yt: [500, 1000, 1500, 2000].map(n) });
    const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
    const tk = [...ax.querySelectorAll('line.tick')], tl = [...ax.querySelectorAll('text.tickl')];
    const xTicks = tk.slice(0, 5).map((t, i) => [t, tl[i]]), yTicks = tk.slice(5).map((t, i) => [t, tl[i + 5]]);
    const X = P.X, Y = P.Y;
    // Hilfslinien zum Punkt (2000 | 2000) und (2000 | 1825)
    const gV = P.add('line', { x1: X(2000), y1: Y(0), x2: X(2000), y2: Y(2000), class: 'dash' });
    const gH = P.add('line', { x1: X(0), y1: Y(2000), x2: X(2000), y2: Y(2000), class: 'dash' });
    const gE = P.add('line', { x1: X(2000), y1: Y(1825), x2: X(0), y2: Y(1825), class: 'dash c1' });
    // 45°-Linie
    const line45 = P.line(0, 0, 2000, 2000, { cls: 'ink' });
    const a = 74, arc = P.add('path', { d: `M${X(0) + a} ${Y(0)}A${a} ${a} 0 0 0 ${(X(0) + a * Math.SQRT1_2).toFixed(1)} ${(Y(0) - a * Math.SQRT1_2).toFixed(1)}`, class: 'curve thin mute' });
    const l45deg = P.add('text', { x: X(0) + a + 14, y: Y(0) - 22, class: 'lbl mute', style: 'font-size:30px' }, '45°');
    const l45 = P.text(2000, 2000, 'Y = E', { dx: 18, dy: -6, anchor: 'start' });
    const helpers = [500, 1000, 1500].map(v => P.dot(v, v, { cls: 'old', r: 8 }));
    const o0 = P.dot(0, 0, { cls: 'ink', r: 11 }), p45 = P.dot(2000, 2000, { cls: 'ink', r: 11 });
    // Ausgabengerade E = 325 + 0,75 Y
    const Eline = P.line(0, 325, 2000, 1825, { cls: 'c1' });
    const lE = P.add('text', { x: X(2000) + 18, y: Y(1825) + 34, class: 'lbl c1', style: 'font-size:30px' }, 'E = 325 + 0,75 Y');
    const pA = P.dot(0, 325, { cls: 'c1', r: 12 }), pB = P.dot(2000, 1825, { cls: 'c1', r: 12 });
    const mark = (v, col) => P.add('text', { x: X(0) - 22, y: Y(v) + 10, class: 'tickl', 'text-anchor': 'end', style: `fill:${col};font-weight:800` }, String(v));
    const mA = mark(325, V.C.c1), mB = mark(1825, V.C.c1);
    // Steigungsdreieck unter der Ausgabengeraden
    const tri = P.add('path', { d: `M${X(1350)} ${Y(1337.5)}L${X(1650)} ${Y(1337.5)}L${X(1650)} ${Y(1562.5)}`, class: 'curve thin c4' });
    const tri1 = P.add('text', { x: X(1500), y: Y(1337.5) + 32, class: 'lbl c4', 'text-anchor': 'middle', style: 'font-size:28px' }, '1');
    const tri2 = P.add('text', { x: X(1650) + 12, y: Y(1450) + 10, class: 'lbl c4', style: 'font-size:28px' }, '0,75');
    for (const d of [...helpers, o0, p45, pA, pB]) gsap.set(d, { transformOrigin: '50% 50%' });
    return { P, ax, xAxis, yAxis, xl, yl, xTicks, yTicks, gV, gH, gE, line45, arc, l45deg, l45, helpers, o0, p45, Eline, lE, pA, pB, mA, mB, tri, tri1, tri2 };
  },
  // Schlussbild von u1a herstellen (für u1b/u1c): Hilfslinien blass, Hilfspunkte blass
  settle(D) {
    gsap.set([D.gV, D.gH, D.gE, ...D.helpers], { opacity: 0.3 });
  },
  // Gleichgewicht bei 1300 mit Loten und Achsenwerten
  addEq(D) {
    const P = D.P, X = P.X, Y = P.Y, c = V.C.c3;
    const lotV = P.add('line', { x1: X(1300), y1: Y(1300), x2: X(1300), y2: Y(0), class: 'dash c3' });
    const lotH = P.add('line', { x1: X(1300), y1: Y(1300), x2: X(0), y2: Y(1300), class: 'dash c3' });
    const stub = P.add('line', { x1: X(1300), y1: Y(0), x2: X(1300), y2: Y(0) + 56, class: 'dash c3' });
    const mx = P.add('text', { x: X(1300), y: Y(0) + 86, class: 'tickl', 'text-anchor': 'middle', style: `fill:${c};font-weight:800` }, '1300');
    const my = P.add('text', { x: X(0) - 22, y: Y(1300) + 10, class: 'tickl', 'text-anchor': 'end', style: `fill:${c};font-weight:800` }, '1300');
    const eq = P.dot(1300, 1300, { cls: 'c3', r: 14 });
    gsap.set(eq, { transformOrigin: '50% 50%' });
    return Object.assign(D, { lotV, lotH, stub, mx, my, eq });
  },
  // Ausschnitt 1100–1650 (gleicher Maßstab auf beiden Achsen); Rückgabe enthält auch die Fensterdaten für die Lupe
  zoom(host) {
    const pad = { l: 130, r: 80, t: 70, b: 100 }, w = 1000, h = 764, lo = 1100, yHi = 1650;
    const xHi = lo + ((yHi - lo) * (w - pad.l - pad.r)) / (h - pad.t - pad.b);
    const P = V.plot({ w, h, x: [lo, xHi], y: [lo, yHi], pad });
    P.el.classList.add('big');
    host.appendChild(P.el);
    const n = v => [v, String(v)], X = P.X, Y = P.Y, E1 = this.E1, E2 = this.E2;
    const ax = P.axes({ xl: 'Y', yl: 'E', xt: [1200, 1300, 1400, 1500, 1600, 1700, 1800].map(n), yt: [1200, 1300, 1400, 1500, 1600].map(n) });
    const tl = [...ax.querySelectorAll('text.tickl')];
    const xLab = v => tl[(v - 1200) / 100], yLab = v => tl[7 + (v - 1200) / 100];
    // Bruchzeichen an beiden Achsen: Die Skala beginnt nicht bei null
    const brk = P.g({ class: 'brk' });
    for (const [x, y, dx, dy] of [[X(lo) + 34, Y(lo), 7, 12], [X(lo) + 46, Y(lo), 7, 12], [X(lo), Y(lo) - 34, 12, 7], [X(lo), Y(lo) - 46, 12, 7]])
      P.add('line', { x1: x - dx, y1: y + dy, x2: x + dx, y2: y - dy, class: 'tick', style: 'stroke-width:4' }, null, brk);
    const lot = (v, cls) => [P.add('line', { x1: X(v), y1: Y(v), x2: X(v), y2: Y(lo), class: 'dash ' + cls }), P.add('line', { x1: X(v), y1: Y(v), x2: X(lo), y2: Y(v), class: 'dash ' + cls })];
    const lot1 = lot(1300, 'c3'), lot2 = lot(1400, 'c3'), lot3 = lot(1600, 'c4');
    const line45 = P.line(lo, lo, 1640, 1640, { cls: 'ink' });
    const l45 = P.text(1640, 1640, 'Y = E', { dx: -14, dy: 6, anchor: 'end' });
    const e1 = P.line(lo, E1(lo), 1750, E1(1750), { cls: 'c1' });
    const lE1 = P.text(1750, E1(1750), 'E₁', { cls: 'c1', dx: 16, dy: 14, anchor: 'start' });
    // „Geist“ der verschobenen Geraden und die neue Gerade E₂
    const ghost = P.add('line', { x1: X(lo), y1: Y(E1(lo)), x2: X(1700), y2: Y(E1(1700)), class: 'dash c2', style: 'stroke-width:4' });
    const e2 = P.line(lo, E2(lo), 1700, E2(1700), { cls: 'c2' });
    const lE2 = P.text(1700, E2(1700), 'E₂', { cls: 'c2', dy: -22 });
    // ΔG als Klammer zwischen den Geraden, ΔY als Pfeil an der Y-Achse
    const xg = 1200, dG = P.g({ class: 'dG' });
    P.add('line', { x1: X(xg), y1: Y(E1(xg)), x2: X(xg), y2: Y(E2(xg)), stroke: V.C.c2, 'stroke-width': 7 }, null, dG);
    P.add('line', { x1: X(xg) - 11, y1: Y(E1(xg)), x2: X(xg) + 11, y2: Y(E1(xg)), stroke: V.C.c2, 'stroke-width': 4 }, null, dG);
    P.add('line', { x1: X(xg) - 11, y1: Y(E2(xg)), x2: X(xg) + 11, y2: Y(E2(xg)), stroke: V.C.c2, 'stroke-width': 4 }, null, dG);
    const ldG = P.add('text', { x: X(xg) - 8, y: Y(E2(xg)) - 30, class: 'lbl c2', 'text-anchor': 'end', style: 'font-size:32px' }, '+25');
    const dY = P.add('line', { x1: X(1300) + 10, y1: Y(1135), x2: X(1400) - 12, y2: Y(1135), stroke: V.C.c3, 'stroke-width': 6, 'marker-end': 'url(#ah-c3)' });
    const ldY = P.add('text', { x: X(1350), y: Y(1135) - 14, class: 'lbl c3', 'text-anchor': 'middle', style: 'font-size:30px' }, '+100');
    // Ziel Y = 1600: Punkt auf der 45°-Linie und die dazu nötige Gerade (gestrichelt)
    const e3 = P.add('line', { x1: X(1380), y1: Y(400 + 0.75 * 1380), x2: X(1600), y2: Y(1600), class: 'dash c4', style: 'stroke-width:5' });
    const lE3 = P.add('text', { x: X(1380) - 12, y: Y(400 + 0.75 * 1380) - 10, class: 'lbl c4', 'text-anchor': 'end', style: 'font-size:30px' }, 'G = 175');
    const eq1 = P.dot(1300, 1300, { cls: 'c3', r: 14 }), eq2 = P.dot(1400, 1400, { cls: 'c3', r: 14 }), tgt = P.dot(1600, 1600, { cls: 'c4', r: 13 });
    for (const d of [eq1, eq2, tgt]) gsap.set(d, { transformOrigin: '50% 50%' });
    for (const v of [1300]) for (const t of [xLab(v), yLab(v)]) { t.style.fill = V.C.c3; t.style.fontWeight = 800; }
    return { P, ax, brk, xLab, yLab, lot1, lot2, lot3, line45, l45, e1, lE1, ghost, e2, lE2, dG, ldG, dY, ldY, e3, lE3, eq1, eq2, tgt, win: { lo, xHi, yHi } };
  },
};

// Übung 1 – das keynesianische Kreuz zeichnen
V.scene('u1a', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u1;
  ctx.header({ kicker: 'Übung 1', title: 'Das <em>keynesianische Kreuz</em> zeichnen', src: 'Teil II · Übung 1' });

  ctx.html(`
  <style>
    #sc-u1a .given{left:0;top:0;width:1728px;height:206px;padding:20px 32px}
    #sc-u1a .tiles{display:flex;gap:18px;align-items:stretch}
    #sc-u1a .tile{display:flex;align-items:center;gap:14px;padding:12px 18px;border:3px solid var(--ink);background:#fff;font-family:var(--mono);font-weight:700;font-size:36px;white-space:nowrap}
    #sc-u1a .tile.c1{border-color:var(--c1);color:var(--c1);background:var(--c1bg)}
    #sc-u1a .tile.c3{border-color:var(--c3);color:var(--c3);background:var(--c3bg)}
    #sc-u1a .tile.c2{border-color:var(--c2);color:var(--c2);background:var(--c2bg)}
    #sc-u1a .tile.c4{border-color:var(--c4);color:var(--c4);background:var(--c4bg)}
    #sc-u1a .tile small{display:block;font-family:var(--sans);font-size:23px;font-weight:600;color:var(--mute);letter-spacing:0}
    #sc-u1a .calc{left:0;top:232px;width:1728px;height:538px;padding:22px 36px}
    #sc-u1a .calc .eq{font-size:50px;line-height:1.62;font-weight:600}
    #sc-u1a .calc .hint{font-family:var(--sans);font-size:28px;font-weight:500;color:var(--mute);margin-left:26px}
    #sc-u1a .boxed{display:inline-block;margin-top:14px;padding:6px 28px 10px;border:4px solid var(--c1);background:var(--c1bg);color:var(--c1);box-shadow:8px 8px 0 var(--line);font-family:var(--mono);font-size:64px;font-weight:800;white-space:nowrap}
    #sc-u1a .mean{display:inline-flex;flex-direction:column;gap:12px;vertical-align:top;margin:18px 0 0 44px}
    #sc-u1a .mean div{font-size:31px;font-weight:600}
    #sc-u1a .mean b{font-family:var(--mono);font-weight:800;color:var(--c1);margin-right:8px}
    #sc-u1a .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u1a .side{left:1046px;top:0;width:682px}
    #sc-u1a .fml{left:1046px;top:368px;width:682px;height:94px;padding:0 24px;display:flex;align-items:center;justify-content:space-between}
    #sc-u1a .fml .lab{margin:0;color:var(--c1);line-height:1.25}
    #sc-u1a .fml .eq{font-size:44px;font-weight:800;color:var(--c1)}
    #sc-u1a .note{left:1046px;top:480px;width:682px;height:290px;padding:16px 26px}
    #sc-u1a .note p{margin:8px 0 0;font-size:29px;line-height:1.3;font-weight:500}
    #sc-u1a .note .eq{font-size:28px;font-weight:600;line-height:1.8}
    #sc-u1a .note .eq b{text-decoration-thickness:2px;text-underline-offset:5px}
    #sc-u1a .pt{display:inline-block;min-width:44px;text-align:center;font-family:var(--mono);font-weight:800;font-size:24px;padding:0 9px;margin-right:12px;background:var(--c1);color:#fff}
  </style>

  <!-- Phase 1: Angaben und geplante Ausgaben -->
  <div class="abs card given" id="given">
    <span class="lab">Gegeben</span>
    <div class="tiles">
      <div class="tile c1" id="gC">${V.icon('cart', 70, { tone: 1 })}<span>C = 200 + 0,75 · (Y − T)<small>Konsumfunktion</small></span></div>
      <div class="tile c3" id="gI">${V.icon('factory', 70, { tone: 3 })}<span>I = 100<small>Investitionen</small></span></div>
      <div class="tile c2" id="gG">${V.icon('staat', 70, { tone: 2 })}<span>G = 100<small>Staatsausgaben</small></span></div>
      <div class="tile c4" id="gT">${V.icon('tag', 66, { tone: 4 })}<span>T = 100<small>Steuern</small></span></div>
    </div>
  </div>
  <div class="abs card calc" id="calc">
    <span class="lab">Geplante Ausgaben E</span>
    <div class="eq" id="l1"><span id="l1a">E =</span> <span class="t-c1" id="l1b">C</span> <span id="l1c">+ <span class="t-c3">I</span></span> <span id="l1d">+ <span class="t-c2">G</span></span></div>
    <div class="eq" id="l2">E = <span class="t-c1">200 + 0,75 · (Y − <span class="t-c4">100</span>)</span> + <span class="t-c3">100</span> + <span class="t-c2">100</span><span class="hint">eingesetzt</span></div>
    <div class="eq" id="l3">E = 200 − 75 + 100 + 100 + 0,75 · Y<span class="hint">zusammengefasst</span></div>
    <div class="boxed" id="l4">E = 325 + 0,75 · Y</div>
    <div class="mean"><div id="m1"><b>325</b> Achsenabschnitt: Ausgaben bei Y = 0</div><div id="m2"><b>0,75</b> Steigung: marginale Konsumneigung</div></div>
  </div>

  <!-- Phase 2: Zeichenblatt -->
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen', 'Y nach rechts · E nach oben · gleiche Skala'],
    ['45°-Linie Y = E', 'durch (0 | 0) und (2000 | 2000)'],
    ['Ausgabengerade', 'zwei Punkte berechnen und verbinden'],
  ])}</div>
  <div class="abs card c1 fml" id="fml"><span class="lab">geplante<br>Ausgaben</span><span class="eq">E = 325 + 0,75 · Y</span></div>

  <div class="abs card note" id="w1">
    <span class="lab">Achsen und Skala</span>
    <p id="w1a">→ nach rechts: Einkommen <b>Y</b></p>
    <p id="w1b">↑ nach oben: geplante Ausgaben <b>E</b></p>
    <p id="w1c">Beide Achsen gleich einteilen:<br><span class="mono" style="font-weight:700">500 · 1000 · 1500 · 2000</span></p>
  </div>
  <div class="abs card note" id="w2">
    <span class="lab">45°-Linie</span>
    <div class="eq" style="font-size:44px;font-weight:800;line-height:1.3">Y = E</div>
    <p id="w2a">Alle Punkte, an denen Einkommen und Ausgaben gleich groß sind.</p>
    <p id="w2b">Zwei Punkte: <span class="mono" style="font-weight:700">(0 | 0)</span> und <span class="mono" style="font-weight:700">(2000 | 2000)</span></p>
  </div>
  <div class="abs card note" id="w3">
    <span class="lab">Zwei Punkte der Ausgabengeraden</span>
    <div class="eq" id="r1"><span class="pt">1</span>Y = 0 → E = <b id="r1v">325</b></div>
    <div class="eq" id="r2"><span class="pt">2</span>Y = 2000 → E = 325 + 1500 <span id="r2v">= <b>1825</b></span></div>
    <p id="r3" style="margin-top:12px">Steigung = marginale Konsumneigung = <b class="t-c4">0,75</b><br>kleiner als 1 → <b>flacher als die 45°-Linie</b></p>
  </div>`);

  /* ---------- Phase 1: Angaben ---------- */
  ctx.show('#given', 0.7, { y: 26 });
  ctx.pop('#gC', T('Gegeben ist die Konsumfunktion'), { scale: 0.85 });
  ctx.pop('#gI', T('Investitionen, Staatsausgaben'), { scale: 0.85 });
  ctx.pop('#gG', T('Staatsausgaben und Steuern'), { scale: 0.85 });
  ctx.pop('#gT', T('Steuern betragen'), { scale: 0.85 });

  ctx.show('#calc', T('Zuerst brauchen wir'), { y: 26 });
  ctx.show('#l1a', T('die geplanten Ausgaben: Konsum'), { x: -16, y: 0 });
  ctx.show('#l1b', T('Konsum plus Investitionen'), { y: 14 }).pulse('#gC', T('Konsum plus Investitionen'), { scale: 1.05 });
  ctx.show('#l1c', T('plus Investitionen plus'), { y: 14 }).pulse('#gI', T('plus Investitionen plus') + 0.3, { scale: 1.07 });
  ctx.show('#l1d', T('plus Staatsausgaben.'), { y: 14 }).pulse('#gG', T('plus Staatsausgaben.') + 0.3, { scale: 1.07 });
  ctx.show('#l2', T('Eingesetzt'), { x: -20, y: 0 });
  ctx.show('#l3', T('zusammengefasst'), { x: -20, y: 0 });
  gsap.set($('#l4'), { autoAlpha: 0, scale: 0.8, transformOrigin: '0% 50%' });
  ctx.to('#l4', { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }, T('ergibt das dreihundertfünfundzwanzig') + 0.2);

  ctx.show('#m1', T('ergibt das dreihundertfünfundzwanzig') + 1.6, { x: -16, y: 0 }).show('#m2', T('null Komma sieben fünf', { n: 2 }) + 0.4, { x: -16, y: 0 });

  /* ---------- Phase 2: Zeichenblatt ---------- */
  const t0 = T('Jetzt zeichnen wir');
  ctx.hide(['#given', '#calc'].map(s => $(s)), t0 - 0.3, { y: -18, dur: 0.3 });
  ctx.show('#sheet', t0, { x: -40, y: 0 }).show('#side', t0 + 0.15, { x: 40, y: 0 }).show('#fml', t0 + 0.3, { x: 40, y: 0 });
  const D = U.make($('#sheet')), P = D.P;
  const ticks = [...D.xTicks, ...D.yTicks].flat();
  U.hide([D.xAxis, D.yAxis, D.xl, D.yl, ...ticks, D.gV, D.gH, D.gE, D.line45, D.arc, D.l45deg, D.l45, ...D.helpers, D.o0, D.p45,
    D.Eline, D.lE, D.pA, D.pB, D.mA, D.mB, D.tri, D.tri1, D.tri2]);

  const tS = [T('Schritt eins'), T('Schritt zwei'), T('Schritt drei')];
  ctx.stepsRun('#side', tS, { end: ctx.audioEnd + 0.2 });

  // Schritt 1: Achsen und Skala
  ctx.show('#w1', tS[0] + 0.1, { y: 22 });
  const tx = T('nach rechts das Einkommen'), ty = T('nach oben die geplanten');
  ctx.pen(D.xAxis, tx - 0.1, 0.9, { extend: true });
  U.fin(ctx, D.xl, tx + 0.8); ctx.show('#w1a', tx, { x: -16, y: 0 });
  ctx.pen(D.yAxis, ty - 0.1, 0.9, { extend: true });
  U.fin(ctx, D.yl, ty + 0.8); ctx.show('#w1b', ty, { x: -16, y: 0 });
  const tsk = T('Beide Achsen bekommen');
  ctx.show('#w1c', tsk, { x: -16, y: 0 });
  // Teilstriche paarweise: 500 an beiden Achsen, dann 1000 …
  D.xTicks.forEach((p, i) => U.fin(ctx, p, tsk + 0.25 + i * 0.28, 0.2));
  D.yTicks.forEach((p, i) => U.fin(ctx, p, tsk + 0.25 + i * 0.28, 0.2));

  // Schritt 2: 45°-Linie
  ctx.hide('#w1', tS[1] - 0.1).show('#w2', tS[1] + 0.2, { y: 22 });
  ctx.show('#w2a', T('Sie verbindet alle Punkte'), { x: -16, y: 0 });
  D.helpers.forEach((d, i) => ctx.pop(d, T('Sie verbindet alle Punkte') + 0.7 + i * 0.45));
  ctx.show('#w2b', T('Sie startet im Ursprung'), { x: -16, y: 0 });
  ctx.pop(D.o0, T('Sie startet im Ursprung') + 0.5);
  const tp = T('durch den Punkt zweitausend');
  ctx.pen(D.gV, tp - 0.55, 0.5).pen(D.gH, tp, 0.5);
  ctx.pop(D.p45, tp + 0.55);
  ctx.pen(D.line45, tp + 0.95, 1.5);
  ctx.draw(D.arc, tp + 2.45, 0.35); U.fin(ctx, D.l45deg, tp + 2.6); U.fin(ctx, D.l45, tp + 2.45);

  // Schritt 3: Ausgabengerade
  ctx.hide('#w2', tS[2] - 0.1).show('#w3', tS[2] + 0.2, { y: 22 });
  ctx.dim([D.gV, D.gH, ...D.helpers], tS[2], { to: 0.3 });
  gsap.set([$('#r1'), $('#r2'), $('#r3'), $('#r2v')], { autoAlpha: 0 });
  // erster Punkt: Achsenabschnitt
  const tA = T('Bei einem Einkommen von null'), tAv = T('bei dreihundertfünfundzwanzig') + 0.2;
  ctx.to('#r1', { autoAlpha: 1, duration: 0.3 }, T('Der erste ist der Achsenabschnitt'));
  gsap.set($('#r1v'), { autoAlpha: 0 });
  ctx.pulse(D.o0, tA + 0.4, { scale: 1.5 });
  ctx.to('#r1v', { autoAlpha: 1, duration: 0.3 }, tAv);
  ctx.pop(D.pA, tAv + 0.25); U.fin(ctx, D.mA, tAv + 0.45);
  // zweiter Punkt: Y = 2000
  const tB = T('Für den zweiten'), tBv = T('Das ergibt achtzehnhundertfünfundzwanzig') + 0.7;
  ctx.to('#r2', { autoAlpha: 1, duration: 0.3 }, tB);
  ctx.undim(D.gV, tB + 1.2);
  ctx.to('#r2v', { autoAlpha: 1, duration: 0.3 }, tBv);
  ctx.pop(D.pB, tBv + 0.2);
  ctx.pen(D.gE, tBv + 0.5, 0.6); U.fin(ctx, D.mB, tBv + 1.1);
  // verbinden
  const tc = T('Beide Punkte verbinden');
  ctx.pen(D.Eline, tc, 1.5);
  U.fin(ctx, D.lE, tc + 1.55);
  ctx.pulse('#fml', tc + 1.6, { scale: 1.04 });
  // Steigung
  const tf = T('flacher als die');
  ctx.dim([D.gV, D.gE], tf - 0.6, { to: 0.3 });
  ctx.to('#r3', { autoAlpha: 1, duration: 0.35 }, tf);
  ctx.draw(D.tri, T('ihre Steigung'), 0.7);
  U.fin(ctx, D.tri1, T('ihre Steigung') + 0.7);
  U.fin(ctx, D.tri2, T('null Komma sieben fünf', { n: 3 }));
});
