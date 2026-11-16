// Aufgabe 1 c – Fall 1 von Folie 91 (Skript I): Leistungsbilanzüberschuss, S − I = NX
V.scene('a1c', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 1 c', title: 'Fall 1: <em>Leistungsbilanzüberschuss</em>', src: 'Skript I, Folie 91' });

  const upArrow = (col, rot = 0) => `<svg viewBox="0 0 100 100" width="76" height="76" style="flex:none"><circle cx="50" cy="50" r="46" fill="${col}"/><path d="M50 78V26M28 46l22-22 22 22" fill="none" stroke="#fafcfb" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="rotate(${rot} 50 50)"/></svg>`;
  // Balkenlängen im gemeinsamen Maßstab: Y = 520, C = 260, I = 90, G = 80 → S = 180, NX = 90; EX = 240, IM = 150
  const CASES = [
    { k: 1, col: 'c3', t: 'Überschuss', sub: 'Leistungsbilanzüberschuss', nx: 'NX &gt; 0', a: 'EX &gt; IM · Y &gt; C + I + G', si: 'S &gt; I', s: 330, i: 190, cap: 'Netto-Kapitalexporte', pos: 'verbessert sich', rot: 0 },
    { k: 2, col: 'mute', t: 'Ausgeglichen', sub: 'ausgeglichene Leistungsbilanz', nx: 'NX = 0', a: 'EX = IM · Y = C + I + G', si: 'S = I', s: 260, i: 260, cap: 'Netto-Kapitalexporte = 0', pos: 'bleibt unverändert', rot: 90 },
    { k: 3, col: 'c2', t: 'Defizit', sub: 'Leistungsbilanzdefizit', nx: 'NX &lt; 0', a: 'EX &lt; IM · Y &lt; C + I + G', si: 'S &lt; I', s: 190, i: 330, cap: 'Netto-Kapitalimporte', pos: 'verschlechtert sich', rot: 180 },
  ];
  const colOf = c => (c === 'mute' ? C.mute : C[c]);

  ctx.html(`
  <style>
    #sc-a1c .eqc{left:0;top:0;display:flex;align-items:flex-start;gap:26px}
    #sc-a1c .eqc .tm{text-align:center}
    #sc-a1c .eqc .sy{font-family:var(--mono);font-weight:800;font-size:76px;line-height:1}
    #sc-a1c .eqc .nm{font-size:27px;font-weight:600;color:var(--mute);margin-top:6px}
    #sc-a1c .eqc .op{font-family:var(--mono);font-weight:700;font-size:64px;line-height:1.15;color:var(--mute)}
    #sc-a1c .tabs{left:890px;top:26px;width:838px;display:flex;gap:16px;justify-content:flex-end}
    #sc-a1c .tab{font-family:var(--mono);font-weight:700;font-size:26px;padding:8px 16px;border:3px solid var(--line);background:var(--panel);color:var(--mute);white-space:nowrap}
    #sc-a1c .hint{left:0;top:440px;width:1728px;text-align:center;font-size:34px;font-weight:600;color:var(--mute)}
    #sc-a1c .land{width:250px;height:330px;top:180px;text-align:center;padding:34px 10px 0}
    #sc-a1c .land .nm{font-weight:800;font-size:38px;margin-top:14px}
    #sc-a1c .al{font-size:27px;white-space:nowrap;transform:translateX(-50%)}
    #sc-a1c .nxline{left:0;top:536px;width:1000px;text-align:center}
    #sc-a1c .pos{left:0;top:640px;width:1000px;height:130px;display:flex;align-items:center;gap:26px;padding:0 30px}
    #sc-a1c .pos .tx{font-size:40px;font-weight:800;letter-spacing:-.01em;line-height:1.1}
    #sc-a1c .st{left:1050px;width:678px;height:195px;padding:14px 24px 0}
    #sc-a1c .st .f{display:flex;align-items:baseline;justify-content:space-between}
    #sc-a1c .st text{font-size:26px;font-weight:700}
    #sc-a1c .q{font-size:50px;font-weight:800;letter-spacing:-.02em}
    #sc-a1c .col{top:150px;width:556px;height:620px;padding:18px 30px 0;border-width:4px}
    #sc-a1c .col .t{font-size:52px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
    #sc-a1c .col .sub{font-size:27px;color:var(--mute);font-weight:600;margin-bottom:8px}
    #sc-a1c .col .rowp{display:flex;align-items:center;gap:20px;margin-top:11px;border-top:2px solid var(--line);padding-top:11px}
    #sc-a1c .col .rowp .tx{font-size:34px;font-weight:800;line-height:1.12}
    #sc-a1c .col .rowp .tx small{display:block;font-size:26px;font-weight:600;color:var(--mute)}
    #sc-a1c .col text{font-size:26px;font-weight:700}
  </style>

  <!-- Gleichung -->
  <div class="abs eqc" id="eqc">
    <div class="tm" id="tS"><div class="sy">S</div><div class="nm">Ersparnis</div></div>
    <div class="op" id="tm1">−</div>
    <div class="tm" id="tI"><div class="sy t-c3">I</div><div class="nm">Investitionen</div></div>
    <div class="op" id="tm2">=</div>
    <div class="tm" id="tNX"><div class="sy t-c4">NX</div><div class="nm">Nettoexporte</div></div>
  </div>

  <!-- Reiter: die drei Fälle der Folie -->
  <div class="abs tabs" id="tabs">
    <span class="tab" id="tab1">Fall 1 · NX &gt; 0</span><span class="tab">Fall 2 · NX = 0</span><span class="tab">Fall 3 · NX &lt; 0</span>
  </div>
  <div class="abs hint" id="hint">Skript I, Folie 91 · Leistungsbilanz und internationale Kapitalströme</div>

  <!-- Bühne A: Fall 1 im Bild -->
  <div class="abs" id="sA" style="left:0;top:0;width:1728px;height:770px">
    <svg class="abs" id="wsvg" style="left:0;top:0" width="1000" height="770"></svg>
    <div class="abs card land" id="inl" style="left:0">${V.icon('factory', 130, { tone: 1 })}<div class="nm">Inland</div></div>
    <div class="abs card land" id="aus" style="left:750px">${V.icon('globe', 130, { tone: 4 })}<div class="nm">Ausland</div></div>
    <span class="abs chip c4 al" id="lEX" style="left:500px;top:176px">Exporte EX</span>
    <span class="abs chip al" id="lIM" style="left:500px;top:286px">Importe IM</span>
    <span class="abs chip c1 al" id="lK" style="left:500px;top:392px">Netto-Kapitalexporte</span>
    <div class="abs nxline eq xl" id="nxl"><span class="t-c4">NX</span> = EX − IM <span class="t-c4" id="nxpos">&gt; 0</span></div>
    <div class="abs res pos" id="pos">${upArrow(C.c3)}<div><span class="lab" style="margin:0">Folge</span><div class="tx">Netto-Auslandsposition <span class="t-c3">verbessert sich</span></div></div></div>

    <div class="abs card st" id="st1" style="top:150px"><div class="f"><span class="eq lg" style="font-weight:800">EX &gt; IM</span><span class="small">mehr Export als Import</span></div>
      <svg id="b1" width="630" height="104"></svg></div>
    <div class="abs card st" id="st2" style="top:363px"><div class="f"><span class="eq lg" style="font-weight:800">Y &gt; <span class="t-c1">C</span> + <span class="t-c3">I</span> + <span class="t-c2">G</span></span><span class="small">mehr Produktion</span></div>
      <svg id="b2" width="630" height="104"></svg></div>
    <div class="abs card st" id="st3" style="top:575px"><div class="f"><span class="eq lg" style="font-weight:800">S &gt; <span class="t-c3">I</span></span><span class="small">mehr Ersparnis</span></div>
      <svg id="b3" width="630" height="104"></svg></div>
  </div>

  <!-- Bühne B: die drei Fälle im Vergleich -->
  <div class="abs" id="sB" style="left:0;top:0;width:1728px;height:770px">
    <div class="abs q" id="qB" style="right:0;top:28px">Zur Einordnung: <span class="t-c1">drei Fälle</span></div>
    ${CASES.map((c, i) => `<div class="abs card col" id="col${c.k}" style="left:${i * 586}px;border-color:${colOf(c.col)}">
      <span class="lab" style="color:${colOf(c.col)}">Fall ${c.k}</span>
      <div class="t">${c.t}</div><div class="sub">${c.sub}</div>
      <div class="eq xl" style="color:${colOf(c.col)}">${c.nx}</div>
      <div class="eq sm" style="font-size:30px">${c.a}</div>
      <svg class="sb" width="496" height="112" style="margin-top:4px">
        <text x="0" y="36">S</text><rect class="rs" x="34" y="10" width="${c.s}" height="38" fill="${C.ink}"/>
        <text x="0" y="90" fill="${C.c3}">I</text><rect class="ri" x="34" y="64" width="${c.i}" height="38" fill="${C.c3}"/>
        <text class="sit" x="${Math.max(c.s, c.i) + 52}" y="64" style="font-size:34px;font-weight:800" fill="${colOf(c.col)}">${c.si.replace('&gt;', '>').replace('&lt;', '<')}</text>
      </svg>
      <div class="rowp"><span class="chip r1" style="font-size:28px;border-color:${colOf(c.col)};color:${colOf(c.col)}">${c.cap}</span></div>
      <div class="rowp r2">${upArrow(colOf(c.col), c.rot)}<div class="tx"><small>Netto-Auslandsposition</small>${c.pos}</div></div>
    </div>`).join('')}
  </div>`);

  /* ---------- Auftakt: drei Fälle, Fall 1 ist gefragt ---------- */
  const tabs = $('#tabs'), tab1 = $('#tab1');
  gsap.set(tabs, { transformOrigin: '100% 50%', x: -131, y: 268, scale: 1.75, autoAlpha: 0 });
  ctx.to(tabs, { autoAlpha: 1, duration: 0.5 }, 0.8);
  ctx.tint(tab1, T('Fall eins von Folie'), { backgroundColor: C.c3bg, borderColor: C.c3, color: C.c3 }).pulse(tab1, T('Fall eins von Folie'), { scale: 1.15 });
  ctx.show('#hint', T('Folie einundneunzig'), { y: 16 });
  const tW = T('Dort geht es um');
  ctx.hide('#hint', tW - 0.4);
  ctx.to(tabs, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power3.inOut' }, tW - 0.4);

  /* ---------- Weltbild: Inland und Ausland ---------- */
  const svg = $('#wsvg');
  ctx.show('#inl', tW + 0.2, { x: -40, y: 0 }).show('#aus', T('einer offenen Volkswirtschaft'), { x: 40, y: 0 });
  const aEX = V.arrow(svg, 'M268 258 H716', { cls: 'c4', w: 20, head: 46 });
  const aIM = V.arrow(svg, 'M732 364 H284', { cls: 'mute', w: 8, head: 28 });
  const aK = V.arrow(svg, 'M268 470 H716', { cls: 'c1', w: 10, head: 32 });
  gsap.set([aEX, aIM, aK], { autoAlpha: 0 });
  aIM._head.setAttribute('fill', C.mute);

  /* ---------- Gleichung S − I = NX ---------- */
  gsap.set($('#eqc'), { autoAlpha: 1 });
  ctx.pop('#tS', T('Ersparnis minus')).show('#tm1', T('Ersparnis minus') + 0.5, { y: 0 });
  ctx.pop('#tI', T('Investitionen gleich')).show('#tm2', T('Investitionen gleich') + 0.75, { y: 0 });
  ctx.pop('#tNX', T('Nettoexporte.'));

  /* ---------- Fall 1 ---------- */
  ctx.pulse(tab1, T('Fall eins ist der'), { scale: 1.15 }).pulse(ctx.$('.hd h1 em'), T('Leistungsbilanzüberschuss.'), { scale: 1.05, origin: '0% 50%' });

  // Balken-Helfer: wächst von 0 auf w
  const bar = (sv, x, y, w, fill, label, lcol = '#fafcfb') => {
    const r = V.S('rect', { x, y, width: 0, height: 34, fill }); sv.appendChild(r);
    let t = null;
    if (label) { t = V.S('text', { x: x + w / 2, y: y + 26, 'text-anchor': 'middle', fill: lcol }, label); sv.appendChild(t); gsap.set(t, { autoAlpha: 0 }); }
    return { r, t, w, grow: (at, dur = 0.6) => { ctx.to(r, { attr: { width: w }, duration: dur, ease: 'power2.out' }, at); if (t) ctx.to(t, { autoAlpha: 1, duration: 0.25 }, at + dur * 0.6); } };
  };
  const gap = (sv, x, y, w) => {
    const g = V.S('g', {}); sv.appendChild(g);
    g.appendChild(V.S('rect', { x, y, width: w, height: 34, fill: C.c4bg, stroke: C.c4, 'stroke-width': 3, 'stroke-dasharray': '8 6' }));
    g.appendChild(V.S('text', { x: x + w / 2, y: y + 26, 'text-anchor': 'middle', fill: C.c4 }, 'NX'));
    gsap.set(g, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' });
    return { g, pop: at => ctx.to(g, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, at) };
  };
  const rowLabel = (sv, y, txt, fill = C.ink) => sv.appendChild(V.S('text', { x: 0, y: y + 26, fill }, txt));
  const X0 = 64, S = 1;

  // 1) EX > IM
  const b1 = $('#b1'); rowLabel(b1, 8, 'EX', C.c4); rowLabel(b1, 58, 'IM', C.mute);
  const bEX = bar(b1, X0, 8, 240 * S, C.c4), bIM = bar(b1, X0, 58, 150 * S, C.old), g1 = gap(b1, X0 + 150, 58, 90);
  const tN = T('Die Nettoexporte sind positiv');
  ctx.show('#nxl', tN, { y: 20 });
  gsap.set($('#nxpos'), { autoAlpha: 0 });
  ctx.pulse('#tNX', tN, { scale: 1.15 });
  ctx.show('#st1', tN + 0.3, { x: 40, y: 0 });
  const tE = T('das Land exportiert'), tI = T('als es importiert');
  gsap.set([$('#lEX'), $('#lIM'), $('#lK')], { autoAlpha: 0 });
  ctx.drawArrow(aEX, tE, 0.8).to('#lEX', { autoAlpha: 1, duration: 0.3 }, tE + 0.3); bEX.grow(tE + 0.2);
  ctx.drawArrow(aIM, tI, 0.7).to('#lIM', { autoAlpha: 1, duration: 0.3 }, tI + 0.3); bIM.grow(tI + 0.2);
  g1.pop(tI + 0.8);
  ctx.to('#nxpos', { autoAlpha: 1, duration: 0.3 }, tI + 0.8).pulse('#nxl', tI + 0.9, { scale: 1.06 });

  // 2) Y > C + I + G
  const b2 = $('#b2'); rowLabel(b2, 8, 'Y');
  const bY = bar(b2, X0, 8, 520, C.ink), bC = bar(b2, X0, 58, 260, C.c1, 'C'), bI2 = bar(b2, X0 + 260, 58, 90, C.c3, 'I'), bG = bar(b2, X0 + 350, 58, 80, C.c2, 'G'), g2 = gap(b2, X0 + 430, 58, 90);
  const tP = T('Es produziert mehr');
  ctx.dim('#st1', tP, { to: 0.45 }).show('#st2', tP, { x: 40, y: 0 });
  bY.grow(tP + 0.3, 0.8); bC.grow(T('für Konsum'), 0.5); bI2.grow(T('Investitionen und Staat'), 0.4); bG.grow(T('und Staat ausgibt'), 0.4);
  g2.pop(T('und Staat ausgibt') + 0.9);

  // 3) S > I
  const b3 = $('#b3'); rowLabel(b3, 8, 'S'); rowLabel(b3, 58, 'I', C.c3);
  const bS = bar(b3, X0, 8, 180, C.ink), bI3 = bar(b3, X0, 58, 90, C.c3), g3 = gap(b3, X0 + 90, 58, 90);
  const kx = V.S('text', { x: X0 + 200, y: 84, fill: C.c1 }, '→ Kapital ins Ausland'); b3.appendChild(kx); gsap.set(kx, { autoAlpha: 0 });
  const tS = T('Und es spart mehr');
  ctx.dim('#st2', tS, { to: 0.45 }).show('#st3', tS, { x: 40, y: 0 });
  ctx.pulse('#tS', tS, { scale: 1.15 });
  bS.grow(tS + 0.3); bI3.grow(T('als es im Inland investiert') + 0.2);
  ctx.pulse('#tI', T('als es im Inland investiert') + 0.2, { scale: 1.15 });
  g3.pop(T('als es im Inland investiert') + 1.0);

  // Kapital fließt ins Ausland
  const tK = T('Die überschüssige Ersparnis');
  ctx.pulse(g3.g, tK, { scale: 1.25 }).to(kx, { autoAlpha: 1, duration: 0.3 }, tK + 0.6);
  ctx.drawArrow(aK, T('fließt ins Ausland'), 0.8);
  const coins = [0, 1, 2, 3, 4].map(() => { const g = V.S('g', {}); g.innerHTML = `<circle r="19" fill="${C.c1}" stroke="${C.ink}" stroke-width="4"/><text y="9" text-anchor="middle" style="font-size:25px;font-weight:800;fill:#fff">€</text>`; svg.appendChild(g); gsap.set(g, { autoAlpha: 0 }); return g; });
  coins.forEach((c, i) => {
    const t = T('fließt ins Ausland') + 0.5 + i * 1.25;
    ctx.to(c, { autoAlpha: 1, duration: 0.2 }, t).along(c, aK._path, t, 2.2, { from: 0.02, to: 0.9, ease: 'sine.inOut' }).to(c, { autoAlpha: 0, duration: 0.25 }, t + 2.0);
  });
  ctx.to('#lK', { autoAlpha: 1, duration: 0.3 }, T('Netto-Kapitalexporte')).pulse('#lK', T('Netto-Kapitalexporte') + 0.3, { scale: 1.12, origin: '0% 50%' });
  ctx.undim(['#st1', '#st2'].map(s => $(s)), T('Netto-Kapitalexporte') + 0.8);

  // Folge: Netto-Auslandsposition
  const tA = T('Dadurch verbessert sich');
  ctx.show('#pos', tA, { y: 26 });
  const arr = $('#pos svg path');
  ctx.tl.fromTo(arr, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tA + 0.3);
  ctx.pulse('#aus', tA + 0.4, { scale: 1.04 });

  /* ---------- Bühne B: Einordnung ---------- */
  const tB = T('Zur Einordnung'), sB = $('#sB');
  ctx.hide('#sA', tB - 0.3, { dur: 0.3 }).hide(tabs, tB - 0.3, { dur: 0.3 });
  gsap.set(sB, { autoAlpha: 0 }); ctx.to(sB, { autoAlpha: 1, duration: 0.01 }, tB - 0.05);
  ctx.show('#qB', tB, { x: 30, y: 0 });
  ctx.show('#col1', tB + 0.15, { y: 30 });
  ctx.tint('#col1', tB + 0.3, { backgroundColor: C.c3bg }, 0.5);
  const reveal = (k, t0, tSI, tCap, tPos) => {
    const col = $('#col' + k), r1 = col.querySelector('.r1'), r2 = col.querySelector('.r2'), sb = col.querySelector('.sb');
    ctx.show(col, t0, { y: 30 });
    gsap.set([sb, r1, r2], { autoAlpha: 0 });
    ctx.to(sb, { autoAlpha: 1, duration: 0.35 }, tSI).pulse(col.querySelector('.sit'), tSI + 0.4, { scale: 1.2 });
    ctx.to(r1, { autoAlpha: 1, duration: 0.35 }, tCap).to(r2, { autoAlpha: 1, duration: 0.35 }, tPos);
    ctx.pulse(r2.querySelector('svg'), tPos + 0.3, { scale: 1.2 });
  };
  reveal(2, T('In Fall zwei'), T('Ersparnis und Investitionen sind gleich'), T('sind gleich groß') + 0.9, T('sind gleich groß') + 1.3);
  reveal(3, T('In Fall drei'), T('gibt es ein Defizit') + 0.6, T('Das Land importiert Kapital'), T('und seine Auslandsposition'));
  ctx.dim('#col1', T('In Fall zwei'), { to: 0.55 }).dim('#col2', T('In Fall drei'), { to: 0.55 });
  ctx.undim(['#col1', '#col2'].map(s => $(s)), T('verschlechtert sich') + 1.1);
});
