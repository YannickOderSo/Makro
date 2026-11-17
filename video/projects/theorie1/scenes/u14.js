// Übung 1-4 – Nachfragekomponenten / Ausgabenkategorien des BIP
V.scene('u14', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '1-4', title: 'Die <em>Nachfragekomponenten</em>', src: 'Skript I, Folien 33–34',
    question: 'Was sind die Nachfragekomponenten/Ausgabenkategorien des BIP?',
  });
  F.ans.innerHTML = `<div class="geq"><span id="gY">Y =</span> <span id="gC" class="t-c1">C</span> <span id="gp1">+</span> <span id="gI" class="t-c3">I</span> <span id="gp2">+</span> <span id="gG" class="t-c2">G</span> <span id="gp3">+</span> <span id="gN" class="t-c4">NX</span></div>`;
  const L = V.th.lines(F.ans, [
    '<b class="t-c1">C</b><span>Konsum der privaten Haushalte</span>',
    '<b class="t-c3">I</b><span>Investitionen<br>(nur neues Kapital)</span>',
    '<b class="t-c2">G</b><span>Staatsausgaben<br>(Käufe des Staates)</span>',
    '<b class="t-c4">NX</b><span>Nettoexporte<br>= Exporte − Importe</span>',
  ], 'row');

  const ex = (icon, tone, txt, id) => `<div class="ex" id="${id}">${V.icon(icon, 84, { tone })}<span>${txt}</span></div>`;
  F.stage.innerHTML = `
  <style>
    #sc-u14 .geq{font-family:var(--mono);font-weight:800;font-size:52px;white-space:nowrap;margin:6px 0 22px}
    #sc-u14 .al.row{display:flex;gap:16px;align-items:flex-start;font-size:30px;line-height:1.22;margin-bottom:16px}
    #sc-u14 .al.row b{font-family:var(--mono);font-size:36px;flex:none;width:62px;line-height:1.05}
    #sc-u14 .bar{left:0;top:0;width:1048px;height:84px;display:flex;border:3px solid var(--ink);box-shadow:8px 8px 0 var(--line);background:var(--soft)}
    #sc-u14 .bar>div{height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:38px;color:#fff;border-right:3px solid var(--ink)}
    #sc-u14 .bar>div:last-child{border-right:0}
    #sc-u14 .bcap{left:0;top:0;width:1048px;height:84px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:34px;letter-spacing:.04em}
    #sc-u14 .tl{top:110px;width:246px;height:136px;padding:12px 16px 0}
    #sc-u14 .tl .tr{display:flex;gap:14px;align-items:center}
    #sc-u14 .tl .lt{font-family:var(--mono);font-weight:800;font-size:54px;line-height:1}
    #sc-u14 .tl .nm{font-size:26px;font-weight:700;line-height:1.12;margin-top:8px;white-space:nowrap;letter-spacing:-.01em}
    #sc-u14 .dt{left:0;top:276px;width:1048px;height:364px;padding:20px 28px 0}
    #sc-u14 .dt .h{font-size:38px;font-weight:900;letter-spacing:-.02em;display:flex;align-items:baseline;gap:16px}
    #sc-u14 .dt .h small{font-size:29px;font-weight:500;color:var(--mute);letter-spacing:0}
    #sc-u14 .exs{display:flex;gap:10px;margin-top:20px}
    #sc-u14 .ex{width:190px;text-align:center;font-size:26px;font-weight:700;line-height:1.15}
    #sc-u14 .ex span{display:block;margin-top:6px}
    #sc-u14 .no{position:absolute;right:26px;top:86px;width:392px;padding:14px 18px;border:3px solid var(--c2);background:var(--c2bg)}
    #sc-u14 .no .nh{font-size:28px;font-weight:800;line-height:1.15}
    #sc-u14 .no .nr{display:flex;align-items:center;gap:12px;font-size:28px;font-weight:700;margin-top:10px}
    #sc-u14 .no .nu{font-family:var(--mono);font-size:26px;font-weight:700;color:var(--c2);margin-top:10px}
    #sc-u14 .fx{font-family:var(--mono);font-weight:800;font-size:46px;margin-top:14px;display:flex;align-items:center;gap:18px}
    #sc-u14 .ib{position:absolute;left:28px;top:186px;width:992px}
    #sc-u14 .ib .cap{font-size:27px;font-weight:600;color:var(--mute);margin-bottom:6px}
    #sc-u14 .ib .b{height:66px;display:flex;border:3px solid var(--ink)}
    #sc-u14 .ib .b>div{display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:28px}
    #sc-u14 .ib .im{background:repeating-linear-gradient(45deg,var(--c2bg),var(--c2bg) 10px,#fff 10px,#fff 20px);color:var(--c2);border-left:3px solid var(--ink)}
    #sc-u14 .ib .nt{font-size:27px;font-weight:700;margin-top:10px;display:flex;gap:26px}
  </style>

  <!-- Balken: Y zerfällt in vier Teile -->
  <div class="abs bar" id="bar"><div id="sC" style="width:52%;background:var(--c1)">C</div><div id="sI" style="width:20%;background:var(--c3)">I</div><div id="sG" style="width:20%;background:var(--c2)">G</div><div id="sN" style="width:8%;background:var(--c4)">NX</div></div>
  <div class="abs bcap" id="bcap">Y · das BIP von der Ausgabenseite</div>

  <!-- vier Kacheln -->
  <div class="abs card tl c1" id="tC" style="left:0"><div class="tr">${V.icon('cart', 58, { tone: 1 })}<div class="lt t-c1">C</div></div><div class="nm">Konsum</div></div>
  <div class="abs card tl c3" id="tI" style="left:268px"><div class="tr">${V.icon('factory', 58, { tone: 3 })}<div class="lt t-c3">I</div></div><div class="nm">Investitionen</div></div>
  <div class="abs card tl c2" id="tG" style="left:536px"><div class="tr">${V.icon('staat', 58, { tone: 2 })}<div class="lt t-c2">G</div></div><div class="nm">Staatsausgaben</div></div>
  <div class="abs card tl c4" id="tN" style="left:804px;width:244px"><div class="tr">${V.icon('globe', 58, { tone: 4 })}<div class="lt t-c4">NX</div></div><div class="nm">Nettoexporte</div></div>

  <!-- Erklärung je Komponente -->
  <div class="abs card dt c1" id="dC">
    <div class="h"><span class="t-c1">Konsum C</span><small>Ausgaben der privaten Haushalte</small></div>
    <div class="exs" style="align-items:center;gap:40px;margin-top:34px">${V.icon('people', 150, { tone: 1 })}<span style="font:800 60px var(--mono);color:var(--mute)">→</span>${V.icon('cart', 150, { tone: 1 })}
      <div style="font-size:30px;font-weight:600;line-height:1.3">Haushalte kaufen Waren und Dienstleistungen –<br>zum Beispiel <b>Nahrung</b> und <b>Kleidung</b>.</div></div>
  </div>
  <div class="abs card dt c3" id="dI">
    <div class="h"><span class="t-c3">Investitionen I</span><small>Ausgaben für neues Kapital</small></div>
    <div class="exs">${ex('gear', 3, 'Maschinen und Gebäude', 'i1')}${ex('house', 3, 'Wohnungsbau', 'i2')}${ex('boxes', 3, 'Lagerbestände', 'i3')}</div>
    <div class="no" id="iNo"><div class="nh" id="iN0">Nur <span class="t-c3">neu geschaffenes</span> Kapital!</div>
      <div class="nr" id="iN1">${V.icon('cross', 38)}<span>alte Villa kaufen</span></div>
      <div class="nr" id="iN2">${V.icon('cross', 38)}<span>Aktien an der Börse</span></div>
      <div class="nu" id="iN3">→ nur Umverteilung</div></div>
  </div>
  <div class="abs card dt c2" id="dG">
    <div class="h"><span class="t-c2">Staatsausgaben G</span><small>Käufe von Gütern und Dienstleistungen</small></div>
    <div class="exs" style="align-items:center;gap:36px;margin-top:30px">${V.icon('staat', 150, { tone: 2 })}<span style="font:800 60px var(--mono);color:var(--mute)">→</span>
      ${ex('shield', 2, 'Polizei', 'g1')}${ex('van', 2, 'Fahrzeuge', 'g2')}${ex('computer', 2, 'Ausstattung', 'g3')}</div>
  </div>
  <div class="abs card dt c4" id="dN">
    <div class="h"><span class="t-c4">Nettoexporte NX</span><small>Güterverkehr mit dem Ausland</small></div>
    <div class="fx" id="nF">${V.icon('plane', 58, { tone: 4 })}<span><span class="t-c4">NX</span> = Exporte − <span class="t-c2">Importe</span></span></div>
    <div class="ib" id="nB"><div class="cap" id="nCap">Die Käufe C, I und G enthalten auch Güter aus dem Ausland:</div>
      <div class="b"><div style="width:78%;background:var(--soft)">C + I + G · im Inland produziert</div><div class="im" id="nIm" style="width:22%">Importe</div></div>
      <div class="nt"><span id="nT1">${V.icon('check', 30)} in C, I, G schon enthalten</span><span id="nT2" class="t-c2">${V.icon('cross', 30)} nicht im Inland produziert → abziehen</span></div></div>
  </div>`;

  /* ---------- Antwort: die Gleichung ---------- */
  const tQ = { gY: T('Die Antwort ist'), gC: T('Konsum plus'), gI: T('Investitionen plus'), gG: T('Staatsausgaben plus'), gN: T('Nettoexporte.') };
  for (const id in tQ) { gsap.set($('#' + id), { autoAlpha: 0 }); ctx.to('#' + id, { autoAlpha: 1, duration: 0.3 }, tQ[id]); }
  [['gp1', 'gI'], ['gp2', 'gG'], ['gp3', 'gN']].forEach(([p, n]) => { gsap.set($('#' + p), { autoAlpha: 0 }); ctx.to('#' + p, { autoAlpha: 1, duration: 0.3 }, tQ[n] - 0.25); });
  const tL = [T('Der Konsum sind'), T('Investitionen sind Ausgaben'), T('Staatsausgaben sind'), T('Und die Nettoexporte')];
  L.forEach((l, i) => ctx.show(l, tL[i], { x: -20, y: 0 }));

  /* ---------- Balken und Kacheln ---------- */
  const seg = [$('#sC'), $('#sI'), $('#sG'), $('#sN')], tile = [$('#tC'), $('#tI'), $('#tG'), $('#tN')], tS = [tQ.gC, tQ.gI, tQ.gG, tQ.gN];
  gsap.set(seg, { autoAlpha: 0 });
  ctx.show('#bar', 1.0, { y: 20 }).show('#bcap', 1.2, { y: 0 });
  ctx.hide('#bcap', tS[0] - 0.3);
  seg.forEach((s, i) => { ctx.to(s, { autoAlpha: 1, duration: 0.35 }, tS[i]); ctx.pop(tile[i], tS[i], { scale: 0.8 }); });

  /* ---------- Erklärungen ---------- */
  const det = [$('#dC'), $('#dI'), $('#dG'), $('#dN')];
  gsap.set(det, { autoAlpha: 0 });
  const focus = (i, t) => {
    tile.forEach((tl, k) => { ctx.to(tl, { opacity: k === i ? 1 : 0.4, duration: 0.3 }, t); ctx.to(seg[k], { opacity: k === i ? 1 : 0.4, duration: 0.3 }, t); });
    ctx.pulse(tile[i], t, { scale: 1.06 });
    if (i > 0) ctx.to(det[i - 1], { autoAlpha: 0, duration: 0.25 }, t - 0.3);
    ctx.to(det[i], { autoAlpha: 1, duration: 0.35 }, t);
  };
  focus(0, tL[0]);
  // Investitionen
  focus(1, tL[1]);
  gsap.set(['#i1', '#i2', '#i3', '#iNo', '#iN1', '#iN2', '#iN3'].map(s => $(s)), { autoAlpha: 0 });
  ctx.pop('#i1', T('Maschinen und Gebäude')).pop('#i2', T('der Wohnungsbau')).pop('#i3', T('die Lagerbestände'));
  ctx.to('#iNo', { autoAlpha: 1, duration: 0.35 }, T('Wichtig'));
  ctx.pulse('#iN0', T('nur neu geschaffenes'), { scale: 1.06 });
  ctx.to('#iN1', { autoAlpha: 1, duration: 0.3 }, T('Wer eine alte Villa')).to('#iN2', { autoAlpha: 1, duration: 0.3 }, T('Aktien an der Börse'));
  ctx.to('#iN3', { autoAlpha: 1, duration: 0.3 }, T('investiert im Sinne'));
  // Staatsausgaben
  focus(2, tL[2]);
  gsap.set(['#g1', '#g2', '#g3'].map(s => $(s)), { autoAlpha: 0 });
  ctx.pop(['#g1', '#g2', '#g3'].map(s => $(s)), T('die Käufe des Staates'), { stagger: 0.45 });
  // Nettoexporte
  focus(3, tL[3]);
  gsap.set(['#nB', '#nT1', '#nT2'].map(s => $(s)), { autoAlpha: 0 });
  ctx.pulse('#nF', T('Exporte minus Importe'), { scale: 1.05, origin: '0% 50%' });
  const tI = T('Die Importe werden abgezogen');
  ctx.to('#nB', { autoAlpha: 1, duration: 0.4 }, tI);
  ctx.to('#nT1', { autoAlpha: 1, duration: 0.3 }, T('schon enthalten sind') - 0.6);
  ctx.to('#nT2', { autoAlpha: 1, duration: 0.3 }, T('aber nicht im Inland'));
  ctx.tint('#nIm', T('aber nicht im Inland'), { color: C.c2 }).pulse('#nIm', T('aber nicht im Inland'), { scale: 1.08 });
  // Schlussbild: alle vier Kacheln wieder hell
  ctx.to([...tile, ...seg], { opacity: 1, duration: 0.4 }, ctx.audioEnd + 0.2);
});
