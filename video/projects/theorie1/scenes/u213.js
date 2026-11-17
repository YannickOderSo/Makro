// Übung 2-13 – Produktivität sinkt: Arbeitsnachfrage, Gleichgewicht und starrer Reallohn (Skript I, Folien 54, 114–115)
V.scene('u213', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '2-13', title: 'Produktivität sinkt: der <em>Arbeitsmarkt</em>', src: 'Skript I, Folien 54, 114–115',
    question: 'Die Produktivität sinkt plötzlich: Arbeitsnachfrage? Gleichgewicht? Starrer Reallohn?',
  });
  const L = V.th.lines(F.ans, [
    '<span class="k">Frage 1 · Arbeitsnachfrage</span><b>MPL sinkt</b> → Arbeitsnachfragekurve verschiebt sich nach <b>unten/links</b>.',
    '<span class="k">Frage 2 · Markt im Gleichgewicht</span>Flexibler Reallohn: <b>Reallohn sinkt</b>, Beschäftigung bleibt gleich, <b>keine Arbeitslosigkeit</b>.',
    '<span class="k">Frage 3 · Gewerkschaften</span>Starrer Reallohn: bleibt über dem Gleichgewicht → <b>Arbeitslosigkeit <span style="white-space:nowrap">= L<sup>s</sup> − L<sup>d</sup></span></b>.',
  ], 'sm');

  F.stage.innerHTML = `
  <style>
    #sc-u213 .thq .qt{font-size:34px}
    #sc-u213 .al.sm{font-size:30px;margin-bottom:22px}
    #sc-u213 .sheet{position:absolute;left:0;top:0;width:700px;height:648px}
    #sc-u213 .col{position:absolute;left:716px;width:340px}
    #sc-u213 .shock{top:0;height:96px;padding:0 14px;display:flex;align-items:center;gap:12px;font-size:27px;font-weight:800;line-height:1.1}
    #sc-u213 .qt3{height:74px;padding:0 8px 0 10px;display:flex;align-items:center;gap:10px;font-size:26px;font-weight:700;line-height:1.1}
    #sc-u213 .qt3 .step{width:42px;height:42px;font-size:23px}
    #sc-u213 .qt3 .ok{margin-left:auto}
    #sc-u213 .note{top:366px;height:88px;padding:8px 12px 0;text-align:center}
    #sc-u213 .note .eq{font-size:30px;font-weight:700}
    #sc-u213 .merk{top:466px;height:182px;padding:12px 16px 0}
    #sc-u213 .merk p{margin:2px 0 0;font-size:27px;font-weight:700;line-height:1.22}
    #sc-u213 .merk .lab{font-size:21px}
    #sc-u213 .tagc{position:absolute;font-family:var(--sans);font-weight:800;font-size:26px;padding:3px 8px;white-space:nowrap}
    #sc-u213 svg text.s30{font-size:30px}
    #sc-u213 svg text.s26{font-size:26px}
  </style>
  <div class="sheet" id="sheet"></div>
  <div class="card c2 col shock" id="shock">${V.icon('gear', 62, { tone: 2 })}<span>Produktivität <span class="t-c2">sinkt ↓</span></span></div>
  <div class="card col qt3" id="q1" style="top:110px"><span class="step">1</span><span>Arbeitsnachfrage</span><span class="ok">${V.icon('check', 32)}</span></div>
  <div class="card col qt3" id="q2" style="top:194px"><span class="step">2</span><span>flexibler Reallohn</span><span class="ok">${V.icon('check', 32)}</span></div>
  <div class="card col qt3" id="q3" style="top:278px"><span class="step">3</span><span>starrer Reallohn</span><span class="ok">${V.icon('check', 32)}</span></div>
  <div class="card soft col note" id="note"><span class="lab" style="margin:0;font-size:21px">Einstellen, bis gilt</span><div class="eq"><span class="t-c3">MPL</span> = W/P</div></div>
  <div class="res col merk" id="merk"><span class="lab">Klassische Erklärung</span><p>Arbeitslosigkeit entsteht durch einen <span class="t-c2">zu hohen Reallohn</span>.</p></div>`;

  /* ---------- Diagramm ---------- */
  const LS = 6.5, d1 = x => 11.4 - x, d2 = x => 9.0 - x, w1 = d1(LS), w2 = d2(LS), LD = 9.0 - w1;
  const P = V.plot({ w: 700, h: 640, x: [0, 10], y: [0, 10], pad: { l: 124, r: 70, t: 70, b: 96 } });
  $('#sheet').appendChild(P.el);
  const ax = P.axes({ xl: 'L', yl: 'W/P' });
  const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
  const tx = (x, y, html, o = {}) => { const e = P.add('text', { x: P.X(x) + (o.dx || 0), y: P.Y(y) + (o.dy || 0), class: 'lbl ' + (o.cls || ''), 'text-anchor': o.anchor || 'middle' }); e.innerHTML = html; return e; };
  const sup = (b, s, sub = '') => `${b}<tspan dy="-13" style="font-size:22px">${s}</tspan>${sub ? `<tspan dy="21" style="font-size:22px">${sub}</tspan>` : ''}`;
  const capY = tx(0, 10, 'Reallohn', { cls: 'mute s26', dx: 22, dy: -22, anchor: 'start' });
  const capX = tx(10, 0, 'Arbeit', { cls: 'mute s26', dx: 30, dy: 82, anchor: 'end' });
  // Linien (unter Punkten und Schrift)
  const g1 = P.add('line', { x1: P.X(LS), y1: P.Y(w1), x2: P.X(0), y2: P.Y(w1), class: 'dash' });
  const g2 = P.add('line', { x1: P.X(LS), y1: P.Y(w2), x2: P.X(0), y2: P.Y(w2), class: 'dash c3' });
  const lot = P.add('line', { x1: P.X(LD), y1: P.Y(w1), x2: P.X(LD), y2: P.Y(0), class: 'dash c4' });
  const Ls = P.line(LS, 0, LS, 9.4, { cls: 'c1' });
  const Ld1 = P.line(2.0, d1(2.0), 9.6, d1(9.6), { cls: 'c3' });
  const Ld2 = P.line(1.0, d2(1.0), 8.2, d2(8.2), { cls: 'c3' });
  const rigid = P.line(0, w1, 9.2, w1, { cls: 'c2' });
  const gap = P.add('path', { d: `M${P.X(LD)} ${P.Y(w1) - 16}v32M${P.X(LD)} ${P.Y(w1)}H${P.X(LS)}M${P.X(LS)} ${P.Y(w1) - 16}v32`, class: 'curve c4', style: 'stroke-width:11px' });
  const lLs = tx(LS, 9.4, sup('L', 's'), { cls: 'c1 s30', dy: -18 });
  const lLd = tx(9.6, d1(9.6), sup('L', 'd'), { cls: 'c3 s30', dx: 12, dy: 12, anchor: 'start' });
  const lLd1 = tx(9.6, d1(9.6), sup('L', 'd', '1'), { cls: 'old s30', dx: 12, dy: 12, anchor: 'start' });
  const lLd2 = tx(8.2, d2(8.2), sup('L', 'd', '2'), { cls: 'c3 s30', dx: 12, dy: 12, anchor: 'start' });
  const lw1 = tx(0, w1, '(W/P)₁', { cls: 's26', dx: -16, dy: 9, anchor: 'end' });
  const lw2 = tx(0, w2, '(W/P)₂', { cls: 'c3 s26', dx: -16, dy: 9, anchor: 'end' });
  const lst = tx(0.35, w1, 'starr', { cls: 'c2 s30', dy: -16, anchor: 'start' });
  const aLs = tx(LS, 0, sup('L', 's'), { cls: 'c1 s30', dy: 46 });
  const aLd = tx(LD, 0, sup('L', 'd'), { cls: 'c4 s30', dy: 46 });
  const shift = V.arrow(P.el, `M${P.X(8.05)} ${P.Y(3.15)}L${P.X(7.3)} ${P.Y(2.0)}`, { cls: 'c3', w: 6, head: 22 });
  const wdown = V.arrow(P.el, `M${P.X(0.45)} ${P.Y(w1 - 0.35)}V${P.Y(w2 + 0.45)}`, { cls: 'c3', w: 6, head: 22 });
  const e1 = P.dot(LS, w1, { cls: 'ink', r: 13 }), e2 = P.dot(LS, w2, { cls: 'c3', r: 13 }), e3 = P.dot(LD, w1, { cls: 'c4', r: 13 });
  gsap.set([e1, e2, e3], { transformOrigin: '50% 50%' });
  const tagU = V.el('<div class="chip c4 tagc">Arbeitslosigkeit</div>'); $('#sheet').appendChild(tagU);
  tagU.style.left = (P.X(LS) + 8) + 'px'; tagU.style.top = (P.Y(w1) - 62) + 'px';
  gsap.set([xl, yl, capX, capY, lLs, lLd, lLd1, lLd2, lw1, lw2, lst, aLs, aLd, xAxis, yAxis, g1, g2, lot, Ls, Ld1, Ld2, rigid, gap, shift, wdown, e1, e2, e3, tagU], { autoAlpha: 0 });
  gsap.set(Ls, { attr: { y1: P.Y(0), y2: P.Y(9.4) } });

  const qs = ['#q1', '#q2', '#q3'].map(s => $(s)), oks = $$('.qt3 .ok');
  gsap.set(oks, { autoAlpha: 0 });
  gsap.set(['#note', '#merk'].map(s => $(s)), { autoAlpha: 0 });
  const qOn = (i, t) => { ctx.to(qs[i], { opacity: 1, duration: 0.3 }, t).tint(qs[i], t, { borderColor: C.c4, boxShadow: `8px 8px 0 ${C.c4bg}`, backgroundColor: C.c4bg }).pulse(qs[i], t, { scale: 1.05 }); };
  const qDone = (i, t) => { ctx.tint(qs[i], t, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}`, backgroundColor: C.panel }); ctx.pop(oks[i], t); };
  const thick = (el, t) => { ctx.to(el, { strokeWidth: 12, duration: 0.2, ease: 'power2.out' }, t).to(el, { strokeWidth: 7, duration: 0.45, ease: 'power2.inOut' }, t + 0.25); };
  const on = (el, t) => ctx.to(el, { autoAlpha: 1, duration: 0.3 }, t);

  /* ---------- Auftakt ---------- */
  ctx.show('#sheet', 0.9, { x: -30, y: 0 });
  ctx.pop('#shock', T('Die Produktivität eines Landes'), { scale: 0.8 });
  ctx.pop(qs, T('Dazu gibt es drei Fragen'), { stagger: 0.18, scale: 0.85 });
  ctx.dim(qs, T('Zuerst das Diagramm'), { to: 0.5 });

  /* ---------- Diagramm zeichnen ---------- */
  const ty = T('nach oben der Reallohn'), tX = T('nach rechts die Arbeit');
  ctx.pen(yAxis, ty - 0.2, 0.8, { extend: true }); on([yl, capY], ty + 0.6);
  ctx.pen(xAxis, tX - 0.1, 0.8, { extend: true }); on([xl, capX], tX + 0.7);
  const ts = T('eine senkrechte Linie') - 0.5;
  ctx.pen(Ls, ts, 1.0); on(lLs, ts + 1.0);
  const td = T('Die Arbeitsnachfrage fällt');
  ctx.pen(Ld1, td, 1.3); on(lLd, td + 1.3);
  ctx.show('#note', T('Grenzprodukt der Arbeit'), { y: 16 });
  const te = T('bis das Grenzprodukt so groß ist');
  ctx.pop(e1, te);
  ctx.pen(g1, te + 0.3, 0.8); on(lw1, te + 1.1);
  ctx.pulse('#note', T('wie der Reallohn'), { scale: 1.06 });

  /* ---------- Frage 1: Arbeitsnachfragekurve ---------- */
  qOn(0, T('Frage eins'));
  const t1 = T('dann sinkt das Grenzprodukt');
  ctx.show(L[0], t1, { x: -20, y: 0 });
  ctx.pulse('#shock', T('Sinkt die Produktivität'), { scale: 1.06 });
  thick(Ld1, T('Jede Arbeitskraft bringt weniger ein'));
  const tv = T('verschiebt sich deshalb nach unten') - 0.3;
  ctx.tint(Ld1, tv, { stroke: C.old }).to(lLd, { autoAlpha: 0, duration: 0.2 }, tv); on(lLd1, tv + 0.1);
  ctx.pen(Ld2, tv + 0.2, 1.3); on(lLd2, tv + 1.5);
  ctx.drawArrow(shift, T('also nach links') - 0.2, 0.5);
  qDone(0, T('Frage zwei'));

  /* ---------- Frage 2: flexibler Reallohn ---------- */
  qOn(1, T('Frage zwei'));
  const t2 = T('Dann sinkt der Reallohn');
  ctx.show(L[1], t2, { x: -20, y: 0 });
  ctx.drawArrow(wdown, t2 + 0.1, 0.8);
  ctx.tint(e1, t2 + 0.3, { fill: C.old });
  ctx.pop(e2, T('bis Angebot und Nachfrage') + 0.3);
  ctx.pen(g2, T('bis Angebot und Nachfrage') + 0.6, 0.8); on(lw2, T('bis Angebot und Nachfrage') + 1.4);
  const tb = T('Die Beschäftigung bleibt gleich');
  thick(Ls, tb); on(aLs, tb + 0.2);
  ctx.pulse(L[1], T('keine Arbeitslosigkeit', { n: 1 }), { scale: 1.03, origin: '0% 50%' });
  qDone(1, T('Frage drei'));

  /* ---------- Frage 3: starrer Reallohn ---------- */
  qOn(2, T('Frage drei'));
  const t3 = T('Dann bleibt der Reallohn auf dem alten Niveau');
  ctx.show(L[2], t3, { x: -20, y: 0 });
  ctx.dim([wdown, g2, lw2, e2], t3, { to: 0.35 });
  ctx.pen(rigid, t3 + 0.2, 1.2); on(lst, t3 + 1.3);
  ctx.tint(lw1, t3 + 0.6, { fill: C.c2 });
  ctx.pulse(e2, T('über dem neuen Gleichgewicht'), { scale: 1.5 });
  const tl = T('fragen die Unternehmen weniger Arbeit nach');
  ctx.pop(e3, tl);
  ctx.pen(lot, tl + 0.4, 0.8); on(aLd, tl + 1.2);
  thick(Ls, T('als angeboten wird'));
  const tg = T('Die Lücke dazwischen');
  ctx.draw(gap, tg, 0.7);
  ctx.pop(tagU, T('ist Arbeitslosigkeit') + 0.1);
  ctx.pulse(L[2], T('ist Arbeitslosigkeit') + 0.3, { scale: 1.03, origin: '0% 50%' });
  const tm = T('Das ist die klassische Erklärung');
  qDone(2, tm);
  ctx.undim(qs, tm);
  ctx.show('#merk', tm + 0.2, { y: 20 });
  ctx.pulse('#merk', T('durch einen zu hohen Reallohn'), { scale: 1.04 });
  thick(rigid, T('durch einen zu hohen Reallohn'));
  // Punkte und Marken liegen über den zuletzt gezeichneten Linien
  P.el.append(e1, e2, e3);
});
