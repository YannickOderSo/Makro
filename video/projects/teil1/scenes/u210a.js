// Übung 2-10 – das Modell der kleinen offenen Volkswirtschaft zeichnen (Bausteine: V.t1 aus u22a.js, V.t1x aus u22b.js)
V.scene('u210a', ctx => {
  const { T, $, $$ } = ctx, C = V.C, X = V.t1x;
  ctx.header({ kicker: 'Übung 2-10', title: 'Die <em>kleine offene</em> Volkswirtschaft', src: 'Skript I, Folien 93–96' });
  const sub = (a, b) => `${a}<sub>${b}</sub>`;

  ctx.html(`
  <style>${X.css('u210a')}
    #sc-u210a .task{left:0;top:0;width:1728px;padding:26px 40px 30px}
    #sc-u210a .task .q{font-size:37px;font-weight:600;line-height:1.36}
    #sc-u210a .task .q b{font-family:var(--mono);font-weight:800}
    #sc-u210a .ask{display:flex;align-items:center;gap:16px;margin-top:20px;font-size:30px;font-weight:700}
    #sc-u210a .ask .chip{font-size:38px;padding:5px 20px}
    #sc-u210a .an{top:412px;width:852px;height:300px;padding:24px 32px;display:flex;gap:28px;align-items:center}
    #sc-u210a .an .big{font-size:42px;line-height:1.16}
    #sc-u210a .an svg{flex:none}
    #sc-u210a .why .rw{display:flex;align-items:center;gap:16px;font-size:28px;font-weight:600;line-height:1.2;margin-top:10px}
    #sc-u210a .why .rw svg{flex:none}
    #sc-u210a .why .eq small{font-family:var(--sans);font-size:28px;font-weight:600;color:var(--mute);margin-left:18px}
    #sc-u210a .dotc{display:inline-block;width:22px;height:22px;border-radius:50%;margin-right:12px;vertical-align:-2px}
  </style>

  <!-- Aufgabe und Annahmen -->
  <div class="abs card task" id="task">
    <span class="lab">Die Aufgabe</span>
    <div class="q">„Betrachten Sie das Finanzmarktmodell für eine <span class="hl b-c4">kleine, offene Volkswirtschaft</span>. Was passiert mit <b>S</b>, <b>I</b>, <b>NX</b> und <b>r</b>, wenn<br>a) die Fiskalpolitik <u>zuhause</u> entweder G senkt oder T erhöht?<br>b) die Fiskalpolitik im <u>Rest der Welt</u> entweder G senkt oder T erhöht?“</div>
    <div class="ask"><span>Gefragt:</span><span class="chip c1">S ?</span><span class="chip c3">I ?</span><span class="chip c4">NX ?</span><span class="chip c2">r ?</span></div>
  </div>
  <div class="abs card c1 an" id="an1" style="left:0">
    <svg width="150" height="170" viewBox="0 0 150 170"><path d="M34 8V150H146" fill="none" stroke="${C.ink}" stroke-width="5"/><path d="M100 20V150" fill="none" stroke="${C.c1}" stroke-width="9" stroke-linecap="round"/><text x="6" y="26" style="font-size:26px;font-weight:700">r</text><text x="112" y="40" style="font-size:26px;font-weight:800;fill:${C.c1}">S</text></svg>
    <div><span class="lab">Annahme 1</span><div class="big">Die Ersparnis ist <span class="t-c1">unabhängig vom Realzins</span>.</div></div>
  </div>
  <div class="abs card c4 an" id="an2" style="left:876px">
    <span class="chip c4" style="font-size:44px;padding:10px 22px;flex:none">NX &gt; 0</span>
    <div><span class="lab">Annahme 2</span><div class="big">Die Netto-Exporte sind <span class="t-c4">anfänglich positiv</span>.</div></div>
  </div>

  <!-- Zeichenblatt -->
  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen, S und I(r)', 'genau wie in Übung 2-2'],
    ['Weltzins r*', 'waagerechte Linie'],
    ['I(r*) ablesen', 'Punkt auf der I-Kurve, Lot zur Achse'],
    ['NX einzeichnen', 'Abstand zwischen I(r*) und S auf Höhe r*'],
  ])}</div>

  <div class="abs card why" id="wA">
    <span class="lab">Wie in Übung 2-2</span>
    <div class="rw" id="a1" style="font-size:32px"><span><span class="dotc" style="background:${C.c1}"></span>Ersparnis S: senkrechte Linie</span></div>
    <div class="rw" id="a2" style="font-size:32px"><span><span class="dotc" style="background:${C.c3}"></span>Investitionen I(r): fallende Linie</span></div>
  </div>
  <div class="abs card why" id="wB">
    <span class="lab">Warum ist der Zins vorgegeben?</span>
    <div class="rw" id="b1">${V.icon('globe', 50, { tone: 4 })}<span>Kleines Land: kein Einfluss auf den Weltmarkt</span></div>
    <div class="rw" id="b2">${V.icon('coin', 50, { tone: 4 })}<span>Kapital fließt frei über die Grenzen</span></div>
    <div class="eq" id="b3" style="margin-top:10px"><span class="t-c2">r = r*</span><small>im Inland gilt der Weltzins</small></div>
  </div>
  <div class="abs card why" id="wC">
    <span class="lab">Der entscheidende Punkt</span>
    <div class="eq" id="c1"><span class="t-c1">S</span> ≠ <span class="t-c3">I(r*)</span></div>
    <div class="eq" id="c2"><span class="t-c4">NX</span> = <span class="t-c1">S</span> − <span class="t-c3">I(r*)</span></div>
    <p id="c3">Netto-Exporte = Ersparnis − Investitionen</p>
  </div>
  <div class="abs res why" id="wD">
    <span class="lab">Damit NX &gt; 0 ist</span>
    <p id="d1" style="margin-top:0">Der Weltzins r* liegt <b>über</b> dem Schnittpunkt von S und I(r).</p>
    <div class="eq" id="d2" style="margin-top:6px"><span class="t-c3">I(r*)</span> &lt; <span class="t-c1">S</span></div>
    <p id="d3">Der Überschuss fließt ins Ausland.</p>
  </div>`);

  /* ---------- Aufgabe und Annahmen ---------- */
  ctx.show('#task', 0.7, { y: 30 });
  ctx.show($$('#task .ask > *'), 2.6, { y: 14, stagger: 0.12 });
  const tAn = T('Zwei Annahmen');
  ctx.show('#an1', tAn, { y: 30 }).show('#an2', tAn + 0.15, { y: 30 });
  ctx.dim(['#an1', '#an2'].map(s => $(s)), tAn + 0.5, { to: 0.45, dur: 0.01 });
  ctx.undim('#an1', T('Die Ersparnis hängt nicht')).pulse('#an1', T('Die Ersparnis hängt nicht'), { scale: 1.03 });
  ctx.undim('#an2', T('die Nettoexporte sind am Anfang')).pulse('#an2', T('die Nettoexporte sind am Anfang'), { scale: 1.03 });

  /* ---------- Wechsel zum Zeichenblatt ---------- */
  const t0 = T('Das Diagramm startet');
  ctx.hide(['#task', '#an1', '#an2'].map(s => $(s)), t0 - 0.3, { y: -20, dur: 0.3 });
  ctx.show('#sheet', t0, { x: -40, y: 0 }).show('#side', t0 + 0.15, { x: 40, y: 0 });
  const D = V.t1.make($('#sheet')), P = D.P, O = X.open(P);
  const R = X.rW1, S = V.t1.S1, I1 = V.t1.I(R);
  gsap.set([D.xl, D.yl, D.lS, D.lI, D.xAxis, D.yAxis, D.S, D.Ic], { autoAlpha: 0 });
  gsap.set([O.gCl, O.lCl, O.rline, O.lr, O.gI, O.lIr, O.lNX, O.dotS, O.dotI, O.hollow, O.up, O.nx._main], { autoAlpha: 0 });

  const tW = T('Neu ist der Zins'), tP = T('Und jetzt kommt der entscheidende'), tI = T('Ersparnis und Investitionen müssen'), tNX = T('In der Zeichnung ist das'), tEnd = T('Damit die Nettoexporte positiv');
  ctx.stepsRun('#side', [t0, tW, tI, tNX], { end: tEnd });

  // Schritt 1: Achsen, S, I(r) – zügig, wie eben
  ctx.show('#wA', t0 + 0.3, { y: 24 });
  const tY = T('nach oben der Realzins') - 0.2, tXa = T('nach rechts Ersparnis') - 0.1;
  ctx.pen(D.yAxis, tY, 0.8, { extend: true }).to(D.yl, { autoAlpha: 1, duration: 0.3 }, tY + 0.7);
  ctx.pen(D.xAxis, tXa, 0.8, { extend: true }).to(D.xl, { autoAlpha: 1, duration: 0.3 }, tXa + 0.8);
  const tS = T('Die Ersparnis ist wieder') + 0.3, tIc = T('die Investitionskurve fällt') - 0.1;
  ctx.pen(D.S, tS, 1.0).to(D.lS, { autoAlpha: 1, duration: 0.3 }, tS + 1.0).show('#a1', tS, { x: -16, y: 0 });
  ctx.pen(D.Ic, tIc, 1.3).to(D.lI, { autoAlpha: 1, duration: 0.3 }, tIc + 1.3).show('#a2', tIc, { x: -16, y: 0 });

  // Schritt 2: Weltzins
  ctx.hide('#wA', tW - 0.3, { dur: 0.3 }).show('#wB', tW, { y: 24 });
  ctx.show('#b1', T('Ein kleines Land'), { x: -16, y: 0 }).show('#b2', T('Kapital kann frei'), { x: -16, y: 0 });
  ctx.show('#b3', T('Deshalb gilt im Inland'), { y: 0, scale: 0.8, ease: 'back.out(1.6)' });
  const tR = T('Du zeichnest ihn') + 0.2;
  ctx.pen(O.rline, tR, 1.4).to(O.lr, { autoAlpha: 1, duration: 0.3 }, tR + 0.2);

  // Schritt 3: S und I(r*) sind nicht mehr gleich
  ctx.hide('#wB', tP - 0.3, { dur: 0.3 }).show('#wC', tP, { y: 24 });
  gsap.set([$('#c1'), $('#c2'), $('#c3')], { autoAlpha: 0 });
  ctx.show('#c1', tI, { x: -16, y: 0 });
  X.pop(ctx, O.dotS, tI + 0.2); X.pop(ctx, O.dotI, tI + 0.9);
  ctx.pen(O.gI, tI + 1.4, 0.8).to(O.lIr, { autoAlpha: 1, duration: 0.3 }, tI + 2.2);
  ctx.show('#c2', T('Die Differenz sind die Nettoexporte'), { x: -16, y: 0 }).show('#c3', T('Ersparnis minus Investitionen'), { x: -16, y: 0 });

  // Schritt 4: NX als waagerechter Abstand auf Höhe des Weltzinses
  const tB = T('der waagerechte Abstand') - 0.2;
  X.drawBr(ctx, O.nx, tB, 1.2);
  X.thick(ctx, D.Ic, T('zwischen der Investitionskurve') + 0.2); X.thick(ctx, D.S, T('und der Ersparnislinie') + 0.2); X.thick(ctx, O.rline, T('gemessen auf Höhe'));
  ctx.to(O.lNX, { autoAlpha: 1, duration: 0.3 }, T('gemessen auf Höhe') + 0.9);

  // Schluss: r* muss über dem Schnittpunkt liegen
  ctx.hide('#wC', tEnd - 0.3, { dur: 0.3 }).show('#wD', tEnd, { y: 24 });
  gsap.set([$('#d1'), $('#d2'), $('#d3')], { autoAlpha: 0 });
  ctx.show('#d1', T('muss der Weltzins über') - 0.2, { x: -16, y: 0 });
  X.pop(ctx, O.hollow, T('über dem Schnittpunkt') - 0.3);
  ctx.pen(O.gCl, T('über dem Schnittpunkt'), 0.8).to(O.lCl, { autoAlpha: 1, duration: 0.3 }, T('über dem Schnittpunkt') + 0.8);
  ctx.drawArrow(O.up, T('über dem Schnittpunkt') + 1.3, 0.6);
  ctx.show('#d2', T('Dann wird im Inland'), { x: -16, y: 0 }).show('#d3', T('der Überschuss fließt'), { x: -16, y: 0 });
  gsap.set(O.lNX, { transformOrigin: '50% 50%' });
  ctx.pulse(O.lNX, T('der Überschuss fließt') + 0.5, { scale: 1.2 });
});
