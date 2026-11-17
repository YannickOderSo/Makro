// Aufgabe 5 a, b – Übung 3-2: Solow-Modell, konstante Skalenerträge und Pro-Kopf-Funktion
V.scene('a5a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 5 a, b', title: 'Solow-Modell: <em>Skalenerträge</em>', src: 'Übung 3-2' });

  const box = (h, tone = 4) => `<svg class="ico" viewBox="0 0 100 100" height="${h}" width="${h}"><path class="a${tone}" d="M10 24h80v66H10z"/><path class="fp" d="M41 24v22h18V24z"/><path class="st" d="M4 90h92"/></svg>`;
  const gear = h => V.icon('gear', h, { tone: 3 }), pers = h => V.icon('person', h, { tone: 1 });

  ctx.html(`
  <style>
    #sc-a5a #pf{left:0;top:0;width:1728px;height:142px;padding:0 34px;display:flex;align-items:center;justify-content:space-between}
    #sc-a5a #pf .f{font-family:var(--mono);font-weight:700;font-size:58px;white-space:nowrap}
    #sc-a5a #pf .leg{display:flex;align-items:center;gap:12px;font-weight:700;font-size:32px;white-space:nowrap}
    #sc-a5a #pf .leg b{font-family:var(--mono);font-weight:800}
    #sc-a5a .ex{color:var(--c2);display:inline-block}
    #sc-a5a .intro{left:0;top:402px;width:1728px;display:flex;align-items:center;justify-content:center;gap:44px}
    #sc-a5a .intro .it{text-align:center;font-weight:800;font-size:38px;line-height:1.2}
    #sc-a5a .intro .it small{display:block;font-family:var(--mono);font-size:34px;font-weight:700;color:var(--mute)}
    #sc-a5a .intro .op{font-family:var(--mono);font-weight:800;font-size:80px;margin-top:-70px}
    #sc-a5a .q{font-size:48px;font-weight:800;letter-spacing:-.02em;line-height:1.2;white-space:nowrap}
    #sc-a5a .col{top:168px;height:602px}
    #sc-a5a .ln{left:0;font-size:41px;font-weight:500}
    #sc-a5a .z{color:var(--c2);font-weight:800}
    #sc-a5a .rz{color:var(--c2);font-weight:800;display:inline-block}
    #sc-a5a .fly{position:absolute;font-family:var(--mono);font-size:41px;font-weight:800;color:var(--c2);line-height:1.5;white-space:nowrap}
    #sc-a5a #pic{left:888px;top:168px;width:840px;height:446px;padding:18px 30px}
    #sc-a5a #pic .rowl{position:absolute;left:30px;font-size:30px;width:150px;text-align:center}
    #sc-a5a #pic .ol{position:absolute;font-family:var(--mono);font-weight:800;font-size:34px;text-align:center}
    #sc-a5a .def{display:flex;align-items:center;gap:14px;font-weight:700;font-size:29px;white-space:nowrap}
    #sc-a5a .def .chip{font-size:30px}
  </style>

  <div class="abs card" id="pf">
    <div class="f">Y = K<sup class="ex">0,5</sup> · L<sup class="ex">0,5</sup><span id="pfr"> = <span id="pfK">√K</span><span id="pfL"> · √L</span></span></div>
    <div style="display:flex;gap:40px">
      <div class="leg" id="legK">${gear(64)}<span><b>K</b> = Kapital</span></div>
      <div class="leg" id="legL">${pers(64)}<span><b>L</b> = Arbeit</span></div>
    </div>
  </div>

  <div class="abs intro" id="intro">
    <div class="it" id="i1">${gear(150)}<div>Kapital<small>K</small></div></div>
    <div class="op" id="i2">·</div>
    <div class="it" id="i3">${pers(150)}<div>Arbeit<small>L</small></div></div>
    <svg id="i4" width="170" height="60" style="margin-top:-70px"></svg>
    <div class="it" id="i5">${V.icon('boxes', 150, { tone: 4 })}<div>Output<small>Y</small></div></div>
  </div>

  <!-- Teil a: Rechenkette -->
  <div class="abs col" id="colA" style="left:0;width:840px">
    <div class="q" id="qa">a) Konstante <span class="t-c2">Skalenerträge</span>?</div>
    <div class="abs eq ln" id="l1" style="top:76px">F(<span class="z">z</span>K, <span class="z">z</span>L) = √(<span class="z">z</span>K) · √(<span class="z">z</span>L)</div>
    <div class="abs eq ln" id="l2" style="top:142px">= <span class="rz">√z</span> · √K · <span class="rz">√z</span> · √L</div>
    <div class="abs eq ln" id="l3" style="top:208px">= <span class="rz" id="rz1">√z</span> · <span class="rz" id="rz2">√z</span> · √K · √L</div>
    <div class="abs eq ln" id="l4" style="top:274px">= <span class="rz" id="zz">z</span> · √K · √L<span id="zy"> = <span class="z">z</span> · Y</span></div>
    <div class="abs res" id="resA" style="left:0;top:364px;width:800px;display:flex;align-items:center;justify-content:space-between;padding:16px 26px 20px">
      <div><span class="lab">Alle Inputs · z  →  Output · z</span><span class="big" style="font-size:44px">konstante Skalenerträge</span></div>${V.icon('check', 70)}
    </div>
    <div class="abs card soft" id="chk" style="left:0;top:518px;width:800px;padding:14px 26px 16px;display:flex;align-items:center;justify-content:space-between;border-width:3px">
      <span class="mid" style="font-size:32px">Check: Exponenten</span>
      <span class="eq" style="font-weight:700"><span class="t-c2">0,5</span> + <span class="t-c2">0,5</span> = <b>1</b></span>
    </div>
  </div>

  <!-- Bild: alles verdoppeln -->
  <div class="abs card" id="pic">
    <span class="lab">Beispiel z = 2 · alle Inputs verdoppeln</span>
    <svg class="abs" id="psvg" style="left:0;top:0" width="840" height="446"></svg>
    <div class="abs chip rowl" style="top:92px" id="r1l">K, L</div>
    <div class="abs" id="r1g" style="left:236px;top:72px">${gear(84)}</div>
    <div class="abs" id="r1p" style="left:356px;top:72px">${pers(84)}</div>
    <div class="abs" id="r1b" style="left:640px;top:72px">${box(84)}</div>
    <div class="abs ol" id="r1o" style="left:640px;top:158px;width:84px">Y</div>
    <div class="abs chip c2 rowl" style="top:252px" id="r2l">2K, 2L</div>
    <div class="abs" id="r2g" style="left:196px;top:232px;display:flex;gap:8px">${gear(84)}${gear(84)}</div>
    <div class="abs" id="r2p" style="left:392px;top:232px;display:flex;gap:6px">${pers(84)}${pers(84)}</div>
    <div class="abs ol t-c2" id="r2q" style="left:650px;top:228px;width:160px;font-size:80px;line-height:1">?</div>
    <div class="abs" id="r2b" style="left:640px;top:232px;display:flex;gap:8px">${box(84)}${box(84)}</div>
    <div class="abs ol t-c2" id="r2o" style="left:640px;top:318px;width:176px">2 · Y</div>
    <div class="abs big" id="pcap" style="left:30px;top:376px;font-size:34px">doppelte Inputs <span class="t-c2">→ doppelter Output</span></div>
  </div>

  <!-- Teil b: Pro-Kopf-Funktion -->
  <div class="abs col" id="colB" style="left:888px;width:840px">
    <div class="q" id="qb">b) Die <span class="t-c1">Pro-Kopf-Funktion</span></div>
    <div class="abs def" id="d1" style="left:0;top:76px"><span class="chip c1">y = Y/L</span>Output pro Kopf</div>
    <div class="abs def" id="d2" style="left:432px;top:76px"><span class="chip c3">k = K/L</span>Kapital pro Kopf</div>
    <div class="abs eq ln" id="m1" style="top:150px">y = ${V.frac('Y', 'L')} = ${V.frac('√K · √L', '<span class="z" id="mL">L</span>')}</div>
    <div class="abs eq ln" id="m2" style="top:276px">= ${V.frac('√K', '√L')} = √${V.frac('K', 'L')}</div>
    <div class="abs res" id="resB" style="left:0;top:412px;width:400px;padding:14px 26px 18px">
      <span class="lab">Pro-Kopf-Funktion</span>
      <div class="eq xl" style="font-size:64px;line-height:1.2"><span class="t-c1">y</span> = √<span class="t-c3">k</span></div>
    </div>
    <div class="abs" id="plotB" style="left:446px;top:136px"></div>
    <div class="abs small" id="capB" style="left:400px;top:556px;width:440px;text-align:right;font-weight:600;font-size:27px;white-space:nowrap">4-fach Kapital → 2-fach Output</div>
  </div>`);

  /* ---------- Positionen für den „√z · √z → z“-Flug messen (vor allen Transformationen) ---------- */
  const colA = $('#colA'), rA = colA.getBoundingClientRect();
  const pos = e => { const r = e.getBoundingClientRect(); return { x: r.left - rA.left, y: r.top - rA.top }; };
  const p1 = pos($('#rz1')), p2 = pos($('#rz2')), pz = pos($('#zz'));
  const fly = [p1, p2].map(p => { const e = V.el(`<span class="fly" style="left:${p.x}px;top:${p.y}px">√z</span>`); colA.appendChild(e); gsap.set(e, { autoAlpha: 0 }); return [e, p]; });

  /* ---------- Einstieg: Produktionsfunktion ---------- */
  const pf = $('#pf');
  ctx.show(['#i1', '#i2', '#i3'].map($), 1.0, { y: 30, stagger: 0.18 });
  const ia = V.arrow($('#i4'), 'M6 30 L146 30', { cls: 'ink', w: 8, head: 30 });
  ctx.drawArrow(ia, 1.7, 0.5).pop('#i5', 2.1);
  ctx.tl.fromTo(pf, { autoAlpha: 0, y: 150 }, { autoAlpha: 1, y: 190, duration: 0.6, ease: 'power3.out' }, T('Die Produktionsfunktion lautet'));
  gsap.set(['#pfK', '#pfL', '#legK', '#legL', '#pfr'].map($), { autoAlpha: 0 });
  ctx.pulse('#i5', T('Output gleich'), { scale: 1.08 });
  ctx.to(['#pfr', '#pfK'].map($), { autoAlpha: 1, duration: 0.35 }, T('Wurzel aus Kapital')).to('#legK', { autoAlpha: 1, duration: 0.35 }, T('Wurzel aus Kapital')).pulse('#i1', T('Wurzel aus Kapital'), { scale: 1.08 });
  ctx.to('#pfL', { autoAlpha: 1, duration: 0.35 }, T('mal Wurzel aus Arbeit')).to('#legL', { autoAlpha: 1, duration: 0.35 }, T('mal Wurzel aus Arbeit')).pulse('#i3', T('mal Wurzel aus Arbeit') + 0.3, { scale: 1.08 });

  /* ---------- Teil a ---------- */
  const ta = T('Teil a');
  ctx.hide('#intro', ta - 0.75, { y: 20, dur: 0.3 });
  ctx.to(pf, { y: 0, duration: 0.65, ease: 'power3.inOut' }, ta - 0.65);
  ctx.show('#qa', ta, { x: -30, y: 0 });
  // Bild: erst einfache Menge …
  const tp = T('Gibt es konstante');
  ctx.show('#pic', tp, { x: 40, y: 0 });
  const pa1 = V.arrow($('#psvg'), 'M476 114 L610 114', { cls: 'ink', w: 7, head: 26 });
  const pa2 = V.arrow($('#psvg'), 'M560 274 L616 274', { cls: 'c2', w: 7, head: 26 });
  ctx.pop(['#r1l', '#r1g', '#r1p'].map($), tp + 0.3, { stagger: 0.1 }).drawArrow(pa1, tp + 0.7, 0.4).pop(['#r1b', '#r1o'].map($), tp + 1.0, { stagger: 0.1 });
  // … dann alles mal z
  const tz = T('Wir vervielfachen');
  ctx.show('#l1', tz, { y: 16 });
  ctx.pulse($$('#l1 .z'), T('mit z'), { scale: 1.5 });
  ctx.pop('#r2l', tz + 0.3).pop($$('#r2g svg'), tz + 0.5, { stagger: 0.12 }).pop($$('#r2p svg'), tz + 0.8, { stagger: 0.12 });
  ctx.drawArrow(pa2, tz + 1.3, 0.3).pop('#r2q', tz + 1.5);
  ctx.to('#r2q', { rotation: 12, duration: 0.16, repeat: 5, yoyo: true, ease: 'sine.inOut' }, tz + 1.9);
  ctx.show('#l2', T('Aus jeder Wurzel'), { y: 16 });
  ctx.pulse($$('#l2 .rz'), T('Wurzel z herausziehen'), { scale: 1.35 });
  ctx.show('#l3', T('und Wurzel z mal'), { y: 16 });
  ctx.pulse('#rz1', T('und Wurzel z mal') + 0.25, { scale: 1.35 }).pulse('#rz2', T('mal Wurzel z ist') + 0.25, { scale: 1.35 });
  // die beiden √z fliegen zusammen und werden zu z
  const tf = T('ist z');
  gsap.set($('#l4'), { autoAlpha: 0 }); gsap.set($('#zz'), { autoAlpha: 0, scale: 0.3 }); gsap.set($('#zy'), { autoAlpha: 0 });
  ctx.to('#l4', { autoAlpha: 1, duration: 0.3 }, tf - 0.1);
  fly.forEach(([e, p]) => {
    ctx.set(e, { autoAlpha: 1 }, tf - 0.1);
    ctx.to(e, { x: pz.x - p.x, y: pz.y - p.y, duration: 0.5, ease: 'power2.in' }, tf - 0.1).to(e, { autoAlpha: 0, duration: 0.12 }, tf + 0.36);
  });
  ctx.to('#zz', { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2.6)' }, tf + 0.36);
  const to = T('Der Output wächst');
  ctx.to('#zy', { autoAlpha: 1, duration: 0.35 }, to).pulse('#zy', T('genau denselben Faktor'), { scale: 1.12, origin: '0% 50%' });
  ctx.hide('#r2q', to + 0.2).pop($$('#r2b svg'), to + 0.4, { stagger: 0.15 }).pop('#r2o', to + 0.8);
  ctx.show('#pcap', T('genau denselben Faktor'), { y: 14 });
  ctx.show('#resA', T('Ja, konstante'), { y: 26 });
  ctx.show('#chk', T('Der schnelle Check'), { y: 20 });
  ctx.pulse($$('#pf .ex'), T('Die Exponenten addieren'), { scale: 1.5 }).pulse('#chk .eq', T('zu eins'), { scale: 1.1 });

  /* ---------- Teil b ---------- */
  const tb = T('Teil b');
  ctx.hide('#pic', tb - 0.35, { y: -16, dur: 0.3 });
  ctx.show('#qb', tb, { x: -30, y: 0 });
  ctx.show(['#d1', '#d2'].map($), T('die Pro-Kopf-Funktion'), { y: 14, stagger: 0.25 });
  const P = V.plot({ w: 394, h: 420, x: [0, 18], y: [0, 4.7], pad: { l: 62, r: 40, t: 46, b: 66 } });
  $('#plotB').appendChild(P.el);
  const ax = P.axes({ xl: 'k', yl: 'y', xt: [[4, '4'], [16, '16']], yt: [[2, '2'], [4, '4']] });
  const g1 = P.guide(4, 2, { cls: 'c3' }), g2 = P.guide(16, 4, { cls: 'c3' });
  const cv = P.fn(k => Math.sqrt(k), { from: 0, to: 17.6, cls: 'c1' });
  const d1 = P.dot(4, 2, { cls: 'c1', r: 9 }), d2 = P.dot(16, 4, { cls: 'c1', r: 9 });
  const lb = P.text(11, 2.35, 'y = √k', { cls: 'c1' });
  ctx.show(ax, T('die Pro-Kopf-Funktion') + 0.5, { y: 0 });
  ctx.show('#m1', T('Wir teilen durch'), { y: 16 }).pulse('#mL', T('durch die Arbeit'), { scale: 1.5 });
  ctx.show('#m2', T('Übrig bleibt'), { y: 16 });
  const tr = T('Output pro Kopf gleich');
  ctx.show('#resB', tr, { y: 24 });
  ctx.draw(cv, tr + 0.2, 1.3).show(lb, tr + 1.2, { y: 0 });
  ctx.pulse('#resB .eq', T('Wurzel aus Kapital pro Kopf'), { scale: 1.08, origin: '0% 50%' });
  ctx.extend(g1._lines, tr + 1.7, 0.4).pop(d1, tr + 1.6).extend(g2._lines, tr + 2.2, 0.4).pop(d2, tr + 2.1);
  ctx.show('#capB', tr + 2.6, { y: 10 });
});
