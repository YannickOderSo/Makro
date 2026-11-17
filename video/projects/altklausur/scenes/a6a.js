// Aufgabe 6 b – IS- und LM-Kurve herleiten, Gleichgewicht bestimmen (Teil II, Übung 4)
V.scene('a6a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 6 b', title: 'Das <em>IS/LM</em>-Gleichgewicht', src: 'Teil II · Übung 4' });

  ctx.html(`
  <style>
    #sc-a6a .giv{left:0;top:0;width:1728px;height:88px;padding:0 26px;display:flex;align-items:center;gap:16px;box-shadow:6px 6px 0 var(--line)}
    #sc-a6a .giv .lab{margin:0 6px 0 0;font-size:22px}
    #sc-a6a .giv .chip{font-size:26px;font-weight:700}
    #sc-a6a .ln{position:absolute;left:0;white-space:nowrap}
    #sc-a6a .eq{font-size:38px;font-weight:600}
    #sc-a6a .eq.s{font-size:30px}
    #sc-a6a .tagc{font-size:26px}
    #sc-a6a .hl{display:inline-block;padding:0 6px;border-radius:5px;line-height:1.3}
    #sc-a6a .box{position:absolute;left:0;display:flex;align-items:center;gap:14px;padding:9px 20px 10px 12px;border:4px solid var(--c1);background:var(--c1bg);box-shadow:6px 6px 0 var(--line);font-family:var(--mono);font-weight:800;font-size:32px;white-space:nowrap;transform-origin:0 0}
    #sc-a6a .box .tg{background:var(--c1);color:#fff;padding:0 10px;font-size:28px}
    #sc-a6a .box.lm{border-color:var(--c2);background:var(--c2bg)}
    #sc-a6a .box.lm .tg{background:var(--c2)}
    #sc-a6a .note{font-family:var(--sans);font-size:27px;font-weight:500;color:var(--mute);margin-left:22px}
    #sc-a6a .res{position:absolute;left:0;top:560px;width:850px;display:flex;align-items:center;justify-content:space-between;padding:18px 30px 22px}
    #sc-a6a .res .eq{font-size:52px;font-weight:800}
  </style>

  <div class="abs card giv">
    <span class="lab">Gegeben</span>
    <span class="chip c1" id="gC">C = 200 + 0,75 (Y − T)</span>
    <span class="chip c1" id="gI">I = 200 − 25 r</span>
    <span class="chip c1" id="gG">G = T = 100</span>
    <span class="chip c2" id="gL">(M/P)<sup>d</sup> = Y − 100 r</span>
    <span class="chip c2" id="gM">M = 1000 · P = 2</span>
  </div>

  <!-- IS-Herleitung -->
  <div class="ln chip c1 tagc" id="isTag" style="top:114px">IS-Kurve · Gleichgewicht am Gütermarkt</div>
  <div class="ln eq" id="is1" style="top:176px">Y = <span class="hl" style="background:var(--c1bg)">C</span> + <span class="hl" style="background:var(--c3bg)">I</span> + <span class="hl" style="background:var(--c4bg)">G</span></div>
  <div class="ln eq s" id="is2" style="top:246px">Y = <span class="hl" style="background:var(--c1bg)">200 + 0,75 (Y − 100)</span> + <span class="hl" style="background:var(--c3bg)">200 − 25 r</span> + <span class="hl" style="background:var(--c4bg)">100</span></div>
  <div class="ln eq" id="is3" style="top:306px">Y = <span class="hl" id="p425">425</span> + <span class="hl" id="p075">0,75 Y</span> − <span class="hl" id="p25">25 r</span></div>
  <div class="ln eq" id="is4" style="top:370px"><span class="hl" id="p025">0,25 Y</span> = 425 − 25 r<span class="note mono" id="div" style="font-family:var(--mono);font-weight:700;color:var(--c1)">| : 0,25</span></div>
  <div class="box" id="isBox" style="top:452px"><span class="tg">IS</span><span>Y = 1700 − 100 r</span></div>

  <!-- LM-Herleitung -->
  <div class="ln chip c2 tagc" id="lmTag" style="top:222px">LM-Kurve · Gleichgewicht am Geldmarkt</div>
  <div class="ln eq" id="lm1" style="top:286px">M / P = 1000 / 2 = <b id="lm500">500</b><span class="note">reales Geldangebot</span></div>
  <div class="ln eq" id="lm2" style="top:354px">500 = Y − 100 r<span class="note">= Geldnachfrage</span></div>
  <div class="box lm" id="lmBox" style="top:436px"><span class="tg">LM</span><span>Y = 500 + 100 r</span></div>

  <!-- Teil b -->
  <div class="ln chip ink tagc" id="bTag" style="top:222px">Teil b · beide Kurven gleichsetzen</div>
  <div class="ln eq" id="b1" style="top:284px"><span class="t-c1">1700 − 100 r</span> = <span class="t-c2">500 + 100 r</span></div>
  <div class="ln eq" id="b2" style="top:346px">200 r = 1200</div>
  <div class="ln eq" id="b3" style="top:408px">r = <b class="t-c3">6</b></div>
  <div class="ln eq" id="b4" style="top:470px">Y = 1700 − 100 · 6 = <b class="t-c3">1100</b></div>
  <div class="res" id="res"><span class="lab" style="margin:0;font-size:24px">Gleich-<br>gewicht</span><span class="eq">r* = 6</span><span class="eq">Y* = 1100</span></div>

  <div class="abs" id="plotbox" style="left:900px;top:104px"></div>`);

  /* ---------- Diagramm ---------- */
  const P = V.plot({ w: 828, h: 666, x: [0, 1900], y: [0, 9], pad: { l: 90, r: 64, t: 46, b: 92 } });
  $('#plotbox').appendChild(P.el);
  const axes = P.axes({ xl: 'Y', yl: 'r', yt: [[2, '2'], [4, '4'], [8, '8']] });
  P.add('line', { x1: P.X(0) - 12, y1: P.Y(6), x2: P.X(0), y2: P.Y(6), class: 'tick' }, null, axes);
  const m6 = P.add('text', { x: P.X(0) - 22, y: P.Y(6) + 10, class: 'tickl', 'text-anchor': 'end' }, '6', axes);
  const xtick = (v, cls) => {
    const g = P.g();
    P.add('line', { x1: P.X(v), y1: P.Y(0), x2: P.X(v), y2: P.Y(0) + 12, class: 'tick' }, null, g);
    P.add('text', { x: P.X(v), y: P.Y(0) + 48, class: 'lbl ' + cls, 'text-anchor': 'middle' }, String(v), g);
    return g;
  };
  const t500 = xtick(500, 'c2'), t1700 = xtick(1700, 'c1');
  const isL = P.line(1700, 0, 900, 8, { cls: 'c1' });
  const lmL = P.line(500, 0, 1300, 8, { cls: 'c2' });
  const isLab = P.text(900, 8, 'IS', { cls: 'c1', dx: -8, dy: -16 });
  const lmLab = P.text(1300, 8, 'LM', { cls: 'c2', dx: 8, dy: -16 });
  isLab.style.fontSize = lmLab.style.fontSize = '36px';
  const gd = P.guide(1100, 6, { cls: 'c3' });
  gd._lines.forEach(l => l.classList.add('c3'));
  const t1100 = xtick(1100, 'c3');
  const t6 = P.add('text', { x: P.X(0) - 22, y: P.Y(6) + 11, class: 'lbl c3', 'text-anchor': 'end' }, '6');
  const dot = P.dot(1100, 6, { cls: 'c3', r: 14 });
  const eLab = P.text(1100, 6, 'Gleichgewicht', { cls: 'c3', dx: 26, dy: 10, anchor: 'start' });

  /* ---------- Auftakt: Angaben + Achsen ---------- */
  ctx.show('.giv', 0.9, { y: -24 });
  ctx.show('.giv .chip', 1.3, { y: 0, scale: 0.7, stagger: 0.16, ease: 'back.out(1.6)' });
  ctx.show(axes, T('das IS-LM-Modell'), { y: 0, dur: 0.7 });

  /* ---------- IS ---------- */
  const tIS = T('Zuerst die IS-Kurve');
  ctx.show('#isTag', tIS, { x: -30, y: 0 });
  ctx.pulse(['#gC', '#gI', '#gG'].map($), tIS + 0.2, { scale: 1.08 });
  ctx.show('#is1', T('Einkommen gleich Konsum'), { x: -24, y: 0 });
  $$('#is1 .hl').forEach((e, i) => ctx.pulse(e, [T('Konsum plus'), T('Investitionen plus'), T('plus Staatsausgaben') + 0.3][i], { scale: 1.25 }));
  ctx.show('#is2', T('Wir setzen alles ein'), { x: -24, y: 0 });
  ctx.pulse(['#gC', '#gI', '#gG'].map($), T('Wir setzen alles ein') + 0.15, { scale: 1.1 });
  ctx.show('#is3', T('Rechts stehen dann'), { x: -24, y: 0 });
  [['#p425', 'vierhundertfünfundzwanzig'], ['#p075', 'null Komma sieben fünf mal Ypsilon'], ['#p25', 'minus fünfundzwanzig mal r']].forEach(([s, ph]) => {
    ctx.tint(s, T(ph), { backgroundColor: C.c1bg }).pulse(s, T(ph), { scale: 1.16 });
  });
  ctx.show('#is4', T('Wir bringen Ypsilon nach links'), { x: -24, y: 0 });
  ctx.tint('#p025', T('Wir bringen Ypsilon nach links') + 0.3, { backgroundColor: C.c1bg }).pulse('#p025', T('Wir bringen Ypsilon nach links') + 0.3, { scale: 1.12 });
  ctx.show('#div', T('teilen durch'), { x: -16, y: 0 });
  const tBox = T('Ypsilon gleich siebzehnhundert');
  gsap.set($('#isBox'), { scale: 1.3 });
  ctx.tl.fromTo($('#isBox'), { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'back.out(1.5)' }, tBox - 0.15);
  ctx.draw(isL, tBox + 0.9, 1.3).show(isLab, tBox + 2.0, { y: 14 }).show(t1700, tBox + 1.0, { y: -10 });

  /* ---------- LM ---------- */
  const tLM = T('Jetzt die LM-Kurve');
  ctx.hide(['#isTag', '#is1', '#is2', '#is3', '#is4'].map($), tLM - 0.35, { dur: 0.3 });
  ctx.to('#isBox', { y: -338, scale: 1, duration: 0.6, ease: 'power3.inOut' }, tLM - 0.3);
  ctx.show('#lmTag', tLM, { x: -30, y: 0 });
  ctx.pulse(['#gL', '#gM'].map($), tLM + 0.2, { scale: 1.08 });
  ctx.show('#lm1', T('Das reale Geldangebot ist'), { x: -24, y: 0 });
  ctx.pulse('#gM', T('tausend geteilt durch zwei'), { scale: 1.12 });
  ctx.pulse('#lm500', T('also fünfhundert'), { scale: 1.3 });
  ctx.show('#lm2', T('Das muss der Geldnachfrage'), { x: -24, y: 0 });
  ctx.pulse('#gL', T('Das muss der Geldnachfrage') + 0.2, { scale: 1.12 });
  const tBox2 = T('Ypsilon gleich fünfhundert');
  gsap.set($('#lmBox'), { scale: 1.3 });
  ctx.tl.fromTo($('#lmBox'), { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'back.out(1.5)' }, tBox2 - 0.15);
  ctx.draw(lmL, tBox2 + 0.9, 1.3).show(lmLab, tBox2 + 2.0, { y: 14 }).show(t500, tBox2 + 1.0, { y: -10 });

  /* ---------- Teil b ---------- */
  const tB = T('Teil b:');
  ctx.hide(['#lmTag', '#lm1', '#lm2'].map($), tB - 0.35, { dur: 0.3 });
  ctx.to('#lmBox', { x: 436, y: -322, scale: 1, duration: 0.6, ease: 'power3.inOut' }, tB - 0.3);
  ctx.show('#bTag', tB, { x: -30, y: 0 });
  ctx.show('#b1', T('Wir setzen beide gleich'), { x: -24, y: 0 });
  ctx.pulse(['#isBox', '#lmBox'].map($), T('Wir setzen beide gleich') + 0.1, { scale: 1.05, origin: '0 0' });
  ctx.show('#b2', T('Zweihundert mal r'), { x: -24, y: 0 });
  const tr = T('der Zins ist also sechs');
  ctx.show('#b3', tr, { x: -24, y: 0 });
  gsap.set([dot, eLab, t6, t1100], { autoAlpha: 0 });
  ctx.tl.fromTo(dot, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, tr + 0.5);
  ctx.extend(gd._lines[1], tr + 0.7, 0.6).to(t6, { autoAlpha: 1, duration: 0.3 }, tr + 1.2).to(m6, { autoAlpha: 0, duration: 0.2 }, tr + 1.2);
  const tY = T('Eingesetzt ergibt sich');
  ctx.show('#b4', tY, { x: -24, y: 0 });
  ctx.extend(gd._lines[0], T('ein Einkommen von elfhundert'), 0.6).to(t1100, { autoAlpha: 1, duration: 0.3 }, T('ein Einkommen von elfhundert') + 0.5);
  ctx.to(eLab, { autoAlpha: 1, duration: 0.4 }, T('ein Einkommen von elfhundert') + 0.6);
  ctx.show('#res', T('elfhundert.') - 0.1, { y: 30 });
  ctx.pulse(dot, T('elfhundert.') + 0.5, { scale: 1.5 });
});
