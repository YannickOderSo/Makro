// Aufgabe 7 – kleine offene Volkswirtschaft: Rest der Welt senkt G (Übung 2-10 b), Vergleich mit Fall a)
V.scene('a7', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 7', title: 'Kleine <em>offene</em> Volkswirtschaft', src: 'Übung 2-10 b' });

  const row = (i, cls, txt, val) => `<div class="lk ${cls}" id="k${i}"><span class="no">${i}</span><span class="tx">${txt}</span><span class="vl">${val}</span></div>`;
  ctx.html(`
  <style>
    #sc-a7 .stage{left:0;top:0;width:1728px;height:770px}
    #sc-a7 .land{width:600px;height:330px;top:40px;text-align:center;padding:26px 20px}
    #sc-a7 .land .nm{font-size:44px;font-weight:800;letter-spacing:-.01em;line-height:1.1;margin-top:8px}
    #sc-a7 .land .sb{font-size:30px;color:var(--mute);font-weight:500}
    #sc-a7 .gdn{font-family:var(--mono);font-weight:800;font-size:46px;padding:6px 22px;border:4px solid var(--c2);background:var(--c2bg);color:var(--c2);box-shadow:6px 6px 0 var(--line)}
    #sc-a7 .ask{left:0;top:470px;width:1728px;height:150px;display:flex;align-items:center;justify-content:center;gap:22px;font-size:46px;font-weight:800;letter-spacing:-.01em}
    #sc-a7 .ask .chip{font-size:44px;padding:4px 20px}
    #sc-a7 .col{left:990px;top:0;width:738px;height:770px}
    #sc-a7 .col>*{position:absolute;left:0}
    #sc-a7 .bs{width:738px;height:168px;padding:0;display:flex;align-items:stretch;box-shadow:6px 6px 0 var(--line)}
    #sc-a7 .bs .bd{flex:none;width:150px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:50px;color:#fff}
    #sc-a7 .bs .bt{padding:0 26px;display:flex;flex-direction:column;justify-content:center}
    #sc-a7 .bs .nm{font-size:38px;font-weight:800;letter-spacing:-.01em;line-height:1.2}
    #sc-a7 .bs .ds{font-size:29px;font-weight:500;color:var(--mute);line-height:1.25;margin-top:4px}
    #sc-a7 .bs .chip{font-size:26px;margin-left:14px;vertical-align:middle}
    #sc-a7 .ev{width:738px;height:150px;padding:0 26px;display:flex;align-items:center;gap:20px;box-shadow:6px 6px 0 var(--c2bg)}
    #sc-a7 .ev .nm{font-size:40px;font-weight:800;letter-spacing:-.01em;line-height:1.1}
    #sc-a7 .ev .sb{font-size:28px;color:var(--mute);font-weight:500}
    #sc-a7 .ev .gdn{margin-left:auto;font-size:40px;box-shadow:none}
    #sc-a7 .lk{width:738px;height:78px;display:flex;align-items:center;gap:18px;padding:0 22px 0 14px;background:var(--panel);border:3px solid var(--ink);border-left-width:14px;font-size:33px;font-weight:700;white-space:nowrap}
    #sc-a7 .lk .no{flex:none;width:44px;height:44px;border-radius:50%;background:var(--ink);color:var(--bg);font-family:var(--mono);font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center}
    #sc-a7 .lk .vl{margin-left:auto;font-family:var(--mono);font-weight:800;font-size:34px}
    #sc-a7 .lk.c1{border-color:var(--c1)} #sc-a7 .lk.c1 .vl{color:var(--c1)} #sc-a7 .lk.c1 .no{background:var(--c1)}
    #sc-a7 .lk.c2{border-color:var(--c2)} #sc-a7 .lk.c2 .vl{color:var(--c2)} #sc-a7 .lk.c2 .no{background:var(--c2)}
    #sc-a7 .lk.c3{border-color:var(--c3)} #sc-a7 .lk.c3 .vl{color:var(--c3)} #sc-a7 .lk.c3 .no{background:var(--c3)}
    #sc-a7 .lk.c4{border-color:var(--c4)} #sc-a7 .lk.c4 .vl{color:var(--c4)} #sc-a7 .lk.c4 .no{background:var(--c4)}
    #sc-a7 .lk .ex{font-family:var(--mono);font-size:27px;font-weight:700;color:var(--c2);margin-left:4px}
    #sc-a7 .tagc{font-size:27px}
    #sc-a7 .tbl{width:738px;font-size:30px;box-shadow:6px 6px 0 var(--line)}
    #sc-a7 .tbl th{padding:8px 14px;font-size:26px;text-align:center;text-transform:none;letter-spacing:0;color:var(--ink)}
    #sc-a7 .tbl th:first-child{text-align:left;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
    #sc-a7 .tbl td{padding:12px 14px;text-align:center;font-weight:700;white-space:nowrap}
    #sc-a7 .tbl td:first-child{text-align:left;padding-left:18px}
    #sc-a7 .tbl tr:last-child td{border-bottom:0}
    #sc-a7 .tbl .up{font-family:var(--mono);font-weight:800;font-size:36px;color:var(--c3)}
    #sc-a7 .tbl .dn{font-family:var(--mono);font-weight:800;font-size:36px;color:var(--c2)}
    #sc-a7 .tbl .eqv{font-size:27px;font-weight:600;color:var(--mute)}
    #sc-a7 .tbl .kl{font-family:var(--mono);font-size:20px;font-weight:800;letter-spacing:.06em;color:var(--c2);border:2px solid var(--c2);padding:1px 7px;margin-left:8px;vertical-align:middle}
    #sc-a7 svg .big{font-size:38px}
    #sc-a7 svg .mid{font-size:32px}
    #sc-a7 svg .sm{font-size:28px}
    #sc-a7 .brk{fill:none;stroke:var(--c4);stroke-width:9;stroke-linecap:round}
    #sc-a7 .brk.old{stroke:var(--old);stroke-width:6}
  </style>

  <!-- Auftakt: die Frage -->
  <div class="abs stage" id="intro">
    <div class="abs card land" id="inl" style="left:60px">${V.icon('house', 130, { tone: 1 })}<div class="nm">Inland</div><div class="sb">kleine offene Volkswirtschaft</div></div>
    <div class="abs card land" id="row" style="left:1068px">${V.icon('globe', 130, { tone: 4 })}<div class="nm">Rest der Welt</div><div class="sb">bestimmt den Weltzins r*</div></div>
    <svg class="abs" id="isvg" style="left:0;top:0" width="1728" height="770"></svg>
    <div class="abs chip c1" id="lgu" style="left:792px;top:112px;font-size:30px">Güter</div>
    <div class="abs chip c3" id="lka" style="left:780px;top:252px;font-size:30px">Kapital</div>
    <div class="abs gdn" id="gdn" style="left:1420px;top:6px">G ↓</div>
    <div class="abs ask" id="ask"><span>Was passiert mit</span><span class="chip c1">S</span><span class="chip c3">I</span><span class="chip c4">NX</span><span>und</span><span class="chip c2">r</span><span>?</span></div>
  </div>

  <!-- Diagramm -->
  <div class="abs" id="plotbox" style="left:0;top:0"></div>

  <!-- Bausteine des Modells -->
  <div class="abs col" id="pb">
    <div class="card bs" id="b1" style="top:0"><div class="bd" style="background:var(--c1)">S</div><div class="bt"><div class="nm">Ersparnis</div><div class="ds">unabhängig vom Zins → senkrechte Linie</div></div></div>
    <div class="card bs" id="b2" style="top:200px"><div class="bd" style="background:var(--c3)">I(r)</div><div class="bt"><div class="nm">Investitionen</div><div class="ds">fallen mit dem Zins</div></div></div>
    <div class="card bs" id="b3" style="top:400px"><div class="bd" style="background:var(--c2)">r*</div><div class="bt"><div class="nm">Weltzins</div><div class="ds">vorgegeben: Das kleine Land nimmt ihn hin.</div></div></div>
    <div class="card bs" id="b4" style="top:600px"><div class="bd" style="background:var(--c4)">NX</div><div class="bt"><div class="nm mono" style="font-family:var(--mono)">NX = S − I(r*)<span class="chip c4" id="b4pos">anfangs &gt; 0</span></div><div class="ds">waagerechter Abstand auf Höhe von r*</div></div></div>
  </div>

  <!-- Ereignis und Wirkungskette -->
  <div class="abs col" id="pe">
    <div class="card c2 ev" id="ev" style="top:0">${V.icon('globe', 92, { tone: 4 })}${V.icon('staat', 80, { tone: 2 })}<div><div class="nm">Rest der Welt</div><div class="sb">senkt die Staatsausgaben</div></div><div class="gdn">G ↓</div></div>
    ${[row(1, '', 'Ersparnis der Welt', '↑'), row(2, 'c2', 'Weltzins r*', '↓'), row(3, 'c1', 'Ersparnis S im Inland', 'unverändert'), row(4, 'c3', 'Investitionen I', '↑'), row(5, 'c4', 'Nettoexporte NX<span class="ex" id="k5x">&lt; 0 möglich</span>', '↓'), row(6, '', 'ε ↑ · reale Aufwertung', '')].join('')}
  </div>

  <!-- Vergleich mit Fall a) und Ergebnis -->
  <div class="abs col" id="pv">
    <div class="chip ink tagc" id="vTag" style="top:0">Zum Vergleich · a) das Inland senkt G</div>
    <div id="minibox" style="top:56px"></div>
    <table class="tbl" id="vTbl" style="top:504px">
      <tr><th>Wirkung auf</th><th class="t-c1">S</th><th class="t-c3">I</th><th class="t-c4">NX</th><th class="t-c2">r</th></tr>
      <tr id="rb" style="background:var(--c4bg)"><td>b) Welt: G ↓<span class="kl">KLAUSUR</span></td><td><span class="eqv">gleich</span></td><td><span class="up">↑</span></td><td><span class="dn">↓</span></td><td><span class="dn">↓</span></td></tr>
      <tr id="ra"><td>a) Inland: G ↓</td><td><span class="up">↑</span></td><td><span class="eqv">gleich</span></td><td><span class="up">↑</span></td><td><span class="eqv">gleich</span></td></tr>
    </table>
  </div>`);

  /* =========================== Auftakt =========================== */
  const isvg = $('#isvg');
  const aG = V.arrow(isvg, 'M672 172 C800 150 930 150 1056 172', { cls: 'c1', w: 8, head: 28 });
  const aK = V.arrow(isvg, 'M1056 250 C930 272 800 272 672 250', { cls: 'c3', w: 8, head: 28 });
  ctx.pop('#inl', T('in einer kleinen offenen'), { scale: 0.85 });
  ctx.pop('#row', T('der Rest der Welt'), { scale: 0.85 });
  ctx.drawArrow(aG, T('der Rest der Welt') + 0.5, 0.6).show('#lgu', T('der Rest der Welt') + 0.8, { y: 12 });
  ctx.drawArrow(aK, T('der Rest der Welt') + 0.8, 0.6).show('#lka', T('der Rest der Welt') + 1.1, { y: -12 });
  gsap.set($('#gdn'), { autoAlpha: 0, scale: 1.8, rotation: 8 });
  ctx.to('#gdn', { autoAlpha: 1, scale: 1, rotation: 4, duration: 0.35, ease: 'power3.in' }, T('die Staatsausgaben senkt'));
  ctx.show('#ask > *', T('Das ist Übung zwei zehn'), { y: 20, stagger: 0.09 });
  ctx.pulse('#ask .chip', T('Teil b.'), { scale: 1.12 });

  /* =========================== Hauptdiagramm =========================== */
  const P = V.plot({ w: 930, h: 770, x: [0, 10], y: [0, 10], pad: { l: 110, r: 70, t: 56, b: 90 } });
  $('#plotbox').appendChild(P.el);
  const X = P.X, Y = P.Y, y0 = Y(0), x0 = X(0);
  const S0 = 5.6, R1 = 6.8, R2 = 2.4, Iof = r => 9.9 - r, I1 = Iof(R1);
  const axes = P.axes({ xl: 'S, I', yl: 'r' });
  // „vorher“ (grau)
  const oldLine = P.add('line', { x1: x0, y1: Y(R1), x2: X(9.6), y2: Y(R1), class: 'dash', style: `stroke:${C.old};stroke-width:4` });
  const oldLab = P.add('text', { x: x0 - 20, y: Y(R1) + 10, class: 'lbl old', 'text-anchor': 'end' }, 'r₁*');
  const oldBrk = P.add('path', { d: `M${X(I1)} ${Y(R1) - 34}v20M${X(I1)} ${Y(R1) - 24}H${X(S0)}M${X(S0)} ${Y(R1) - 34}v20`, class: 'brk old' });
  const oldNx = P.add('text', { x: (X(I1) + X(S0)) / 2, y: Y(R1) - 44, class: 'lbl old sm', 'text-anchor': 'middle' }, 'vorher');
  const oldDot = P.add('circle', { cx: X(I1), cy: Y(R1), r: 11, fill: C.bg, stroke: C.old, 'stroke-width': 5 });
  const oldI = P.add('text', { x: X(I1), y: y0 + 46, class: 'lbl old', 'text-anchor': 'middle' }, 'I₁');
  const oldTick = P.add('line', { x1: X(I1), y1: y0, x2: X(I1), y2: y0 + 12, class: 'tick', style: `stroke:${C.old}` });
  // Kurven
  const sL = P.line(S0, 0, S0, 9.5, { cls: 'c1' });
  const sLab = P.text(S0, 9.5, 'S', { cls: 'c1 big', dy: -14 });
  const iL = P.line(0.7, 9.2, 9.0, 0.9, { cls: 'c3' });
  const iLab = P.text(9.0, 0.9, 'I(r)', { cls: 'c3 mid', dx: 12, dy: -16, anchor: 'start' });
  const rL = P.add('line', { x1: x0, y1: Y(R1), x2: X(9.6), y2: Y(R1), class: 'curve c2' });
  const rLab = P.add('text', { x: x0 - 20, y: Y(R1) + 10, class: 'lbl c2', 'text-anchor': 'end' }, 'r₁*');
  const eqLab = P.text(7.9, 9.15, 'NX = S − I(r*)', { cls: 'c4 mid' });
  // bewegliche Teile
  const gd = P.add('line', { x1: X(I1), y1: Y(R1), x2: X(I1), y2: y0, class: 'dash c3' });
  const iAx = P.add('text', { x: X(I1), y: y0 + 46, class: 'lbl c3', 'text-anchor': 'middle' }, 'I₁');
  const iArr = P.add('line', { x1: X(I1) + 6, y1: y0 + 68, x2: X(I1) + 6, y2: y0 + 68, class: 'arrow c3', 'marker-end': 'url(#ah-c3)' });
  const iUp = P.add('text', { x: X(I1), y: y0 + 78, class: 'lbl c3 sm', 'text-anchor': 'end' }, 'I ↑');
  const brk = P.add('path', { d: '', class: 'brk' });
  const nxLab = P.add('text', { x: 0, y: 0, class: 'lbl c4 mid' }, 'NX > 0');
  const dot = P.add('circle', { cx: X(I1), cy: Y(R1), r: 13, class: 'pt c3' });
  const cl = v => Math.max(0, Math.min(1, v));
  const st = { r: R1 };
  const upd = () => {
    const r = st.r, I = Iof(r), nx = S0 - I, y = Y(r), xi = X(I), xs = X(S0), pos = nx >= 0, o = pos ? -24 : 24;
    rL.setAttribute('y1', y); rL.setAttribute('y2', y);
    rLab.setAttribute('y', y + 10); rLab.textContent = r > R1 - 0.02 ? 'r₁*' : r < R2 + 0.02 ? 'r₂*' : 'r*';
    dot.setAttribute('cx', xi); dot.setAttribute('cy', y);
    gd.setAttribute('x1', xi); gd.setAttribute('x2', xi); gd.setAttribute('y1', y);
    iAx.setAttribute('x', xi); iAx.textContent = r > R1 - 0.02 ? 'I₁' : r < R2 + 0.02 ? 'I₂' : 'I';
    iArr.setAttribute('x2', Math.max(X(I1) + 6, xi - 44)); iArr.style.opacity = cl((I - I1 - 0.9) / 0.3);
    iUp.style.opacity = cl((I - I1 - 0.9) / 0.3);
    brk.setAttribute('d', `M${xi} ${y + o - 10}v20M${xi} ${y + o}H${xs}M${xs} ${y + o - 10}v20`);
    brk.style.opacity = cl(Math.abs(nx) / 0.12);
    nxLab.textContent = pos ? 'NX > 0' : 'NX < 0';
    nxLab.setAttribute('text-anchor', pos ? 'end' : 'start');
    nxLab.setAttribute('x', pos ? xs - 16 : xs + 16);
    nxLab.setAttribute('y', pos ? y + o - 20 : y + o + 46);
    nxLab.style.opacity = pos ? cl((nx - 0.75) / 0.3) : cl((-nx - 1.65) / 0.2);
  };
  upd();
  const move = (to, t, dur, ease = 'power1.inOut') => ctx.tl.to(st, { r: to, duration: dur, ease, onUpdate: upd }, t);

  const gAll = [axes, sL, sLab, iL, iLab, rL, rLab, eqLab, gd, iAx, brk, nxLab, dot, oldLine, oldLab, oldBrk, oldNx, oldDot, oldI, oldTick, iArr, iUp];
  gsap.set(gAll, { autoAlpha: 0 });
  const fade = (els, t, a = 1, d = 0.4) => ctx.to(els, { autoAlpha: a, duration: d }, t);

  /* ---------- Modell: drei Bausteine + NX ---------- */
  const tM = T('Das Modell hat drei Bausteine');
  ctx.hide('#intro', tM - 0.35, { dur: 0.3 });
  fade(axes, tM, 1, 0.6);
  const tS = T('Die Ersparnis hängt nicht');
  ctx.show('#b1', tS, { x: 40, y: 0 });
  gsap.set(sL, { autoAlpha: 1 }); ctx.draw(sL, T('sie ist eine senkrechte Linie'), 0.9); fade(sLab, T('sie ist eine senkrechte Linie') + 0.7);
  const tI = T('Die Investitionen fallen');
  ctx.show('#b2', tI, { x: 40, y: 0 });
  ctx.draw(iL, tI + 0.4, 1.1); fade(iLab, tI + 1.3);
  const tR = T('Und der Zins selbst');
  ctx.show('#b3', tR, { x: 40, y: 0 });
  const tW = T('den Weltzins hinnehmen');
  ctx.draw(rL, tW - 0.4, 1.0); fade(rLab, tW + 0.4);
  ctx.tl.fromTo(dot, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)', immediateRender: false }, tW + 0.9);
  fade([gd, iAx], tW + 1.1);
  const tN = T('Die Nettoexporte sind Ersparnis');
  ctx.show('#b4', tN, { x: 40, y: 0 });
  gsap.set($('#b4pos'), { autoAlpha: 0 });
  fade(eqLab, tN + 0.4);
  const tA = T('der waagerechte Abstand');
  ctx.wipe(brk, tA, { dir: 'right', dur: 0.8, margin: 60 });
  ctx.pulse('#b4', tA, { scale: 1.03 });
  const tP = T('Am Anfang ist er positiv');
  fade(nxLab, tP, 1, 0.3); ctx.tl.fromTo($('#b4pos'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false }, tP + 0.2);

  /* ---------- Ereignis: Rest der Welt senkt G ---------- */
  const tE = T('Jetzt senkt der Rest der Welt');
  ctx.hide('#pb', tE - 0.35, { dur: 0.3 });
  gsap.set($('#pe'), { autoAlpha: 0 }); ctx.to('#pe', { autoAlpha: 1, duration: 0.01 }, tE - 0.05);
  ctx.show('#ev', tE, { x: 40, y: 0 });
  const ks = [1, 2, 3, 4, 5, 6].map(i => $('#k' + i));
  ks.forEach((k, i) => { k.style.top = 176 + i * 99 + 'px'; });
  gsap.set(ks, { autoAlpha: 0, x: 30 });
  ctx.to(ks, { autoAlpha: 0.28, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, tE + 0.5);
  gsap.set($('#k5x'), { autoAlpha: 0 });
  const light = (i, t) => { ctx.to(ks[i], { autoAlpha: 1, duration: 0.3 }, t); ctx.pulse(ks[i], t, { scale: 1.04 }); };
  light(0, T('steigt die Ersparnis der Welt'));
  const tDrop = T('und der Weltzins sinkt');
  light(1, tDrop);
  fade([oldLine, oldLab, oldDot, oldBrk, oldNx, oldI, oldTick], tDrop + 0.2, 1, 0.5);
  move(5.95, tDrop + 0.1, 1.9);
  const tU = T('Im Inland ändert sich');
  light(2, tU);
  ctx.to(sL, { strokeWidth: 13, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T('an der Ersparnis nichts'));
  ctx.pulse(sLab, T('an der Ersparnis nichts'), { scale: 1.4 });
  const tL = T('Aber beim niedrigeren Zins');
  move(5.3, tL, 3.6);
  light(3, T('lohnen sich mehr Investitionen'));
  const tI2 = T('Die Investitionen steigen');
  move(4.55, tI2, 2.9);
  ctx.pulse(ks[3], tI2, { scale: 1.04 });
  ctx.to(dot, { attr: { r: 19 }, duration: 0.25, yoyo: true, repeat: 1 }, tI2 + 0.1);
  light(4, T('Die Nettoexporte sinken'));
  const tNeg = T('und können sogar negativ');
  move(R2, tNeg, 2.0, 'power2.inOut');
  fade($('#k5x'), T('negativ werden'), 1, 0.3);
  light(5, T('wertet die Währung real auf'));

  /* ---------- Vergleich: Inland senkt G ---------- */
  const M = V.plot({ w: 738, h: 430, x: [0, 10], y: [0, 10], pad: { l: 84, r: 60, t: 46, b: 62 } });
  $('#minibox').appendChild(M.el);
  const mS2 = 7.5, mxi = M.X(I1), my = M.Y(R1);
  M.axes({ xl: 'S, I', yl: 'r' });
  const mOld = M.add('line', { x1: M.X(S0), y1: M.Y(0), x2: M.X(S0), y2: M.Y(9.4), class: 'dash', style: `stroke:${C.old};stroke-width:4` });
  const mOldLab = M.text(S0, 9.4, 'S₁', { cls: 'old mid', dy: -10 });
  M.line(0.7, 9.2, 9.0, 0.9, { cls: 'c3' });
  M.text(9.0, 0.9, 'I(r)', { cls: 'c3 sm', dx: 8, dy: -12, anchor: 'start' });
  const mR = M.add('line', { x1: M.X(0), y1: my, x2: M.X(9.7), y2: my, class: 'curve c2' });
  const mRLab = M.add('text', { x: M.X(0) - 16, y: my + 10, class: 'lbl c2', 'text-anchor': 'end' }, 'r*');
  const mSL = M.add('line', { x1: M.X(S0), y1: M.Y(0), x2: M.X(S0), y2: M.Y(9.4), class: 'curve c1' });
  const mSLab = M.add('text', { x: M.X(S0), y: M.Y(9.4) - 10, class: 'lbl c1 mid', 'text-anchor': 'middle' }, 'S');
  const mBrk = M.add('path', { d: '', class: 'brk' });
  const mNx = M.add('text', { x: 0, y: my - 44, class: 'lbl c4 mid', 'text-anchor': 'middle' }, 'NX');
  const mDot = M.add('circle', { cx: mxi, cy: my, r: 12, class: 'pt c3' });
  gsap.set([mOld, mOldLab], { autoAlpha: 0 });
  const ms = { s: S0 };
  const mupd = () => {
    const xs = M.X(ms.s);
    mSL.setAttribute('x1', xs); mSL.setAttribute('x2', xs); mSLab.setAttribute('x', xs);
    mSLab.textContent = ms.s > S0 + 0.05 ? 'S₂' : 'S';
    mBrk.setAttribute('d', `M${mxi} ${my - 34}v20M${mxi} ${my - 24}H${xs}M${xs} ${my - 34}v20`);
    mNx.setAttribute('x', (mxi + xs) / 2);
    mNx.textContent = ms.s > mS2 - 0.05 ? 'NX ↑' : 'NX';
  };
  mupd();

  const tV = T('Zum Vergleich');
  ctx.hide('#pe', tV - 0.35, { dur: 0.3 });
  gsap.set($('#pv'), { autoAlpha: 0 }); ctx.to('#pv', { autoAlpha: 1, duration: 0.01 }, tV - 0.05);
  ctx.show('#vTag', tV, { x: 30, y: 0 });
  ctx.show('#minibox', tV + 0.15, { y: 20 });
  ctx.show('#vTbl', tV + 0.3, { y: 24 });
  const aCells = $$('#ra td');
  gsap.set(aCells, { autoAlpha: 0 });
  fade(aCells[0], T('Senkt das Inland selbst'), 1, 0.3);
  const tS2 = T('steigt die eigene Ersparnis');
  fade([mOld, mOldLab], tS2, 1, 0.3);
  ctx.tl.to(ms, { s: mS2, duration: 1.8, ease: 'power2.inOut', onUpdate: mupd }, tS2);
  fade(aCells[1], tS2 + 0.5, 1, 0.3);
  const tZ = T('Der Zins bleibt gleich');
  ctx.to(mR, { strokeWidth: 12, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tZ);
  ctx.pulse(mRLab, tZ, { scale: 1.4 });
  fade(aCells[4], tZ + 0.3, 1, 0.3);
  const tIa = T('die Investitionen auch');
  ctx.to(mDot, { attr: { r: 18 }, duration: 0.25, yoyo: true, repeat: 1 }, tIa);
  fade(aCells[2], tIa + 0.3, 1, 0.3);
  const tNa = T('und die Nettoexporte steigen');
  ctx.to(mBrk, { strokeWidth: 15, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tNa + 0.5);
  fade(aCells[3], tNa + 0.6, 1, 0.3);
  ctx.pulse('#rb', tNa + 2.2, { scale: 1.03 });
});
