// Aufgabe 3 – Realzins über Quantitätsgleichung und Fisher-Gleichung (Übung 2-8)
V.scene('a3', ctx => {
  const { T, $, $$, tl } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 3', title: 'Der <em>Realzins</em>', src: 'Übung 2-8' });

  const g = x => `g<sub>${x}</sub>`;
  const sym = (s, l, cls = '') => `<span class="sym ${cls}"><b>${s}</b><i>${l}</i></span>`;
  const giv = (id, lab, val, cls) => `<div class="card gv ${cls}" id="${id}"><span class="lab">${lab}</span><span class="vl">${val}</span></div>`;
  const PX = 50; // Pixel pro Prozentpunkt in den Balken

  ctx.html(`
  <style>
    #sc-a3 .gvs{left:0;top:0;width:1728px;display:flex;gap:28px}
    #sc-a3 .gv{flex:1 1 0;min-width:0;height:118px;padding:12px 22px 0;box-shadow:6px 6px 0 var(--line)}
    #sc-a3 .gv .lab{font-size:21px;margin-bottom:0;white-space:nowrap}
    #sc-a3 .gv .vl{font-family:var(--mono);font-weight:800;font-size:44px;line-height:1.25;white-space:nowrap}
    #sc-a3 .gv.c1 .vl{color:var(--c1)} #sc-a3 .gv.c4 .vl{color:var(--c4)} #sc-a3 .gv.c3 .vl{color:var(--c3)}
    #sc-a3 .gv.c3{box-shadow:6px 6px 0 var(--c3bg)} #sc-a3 .gv.c3 .lab{color:var(--c3)}
    #sc-a3 .task{left:0;top:212px;width:1728px;padding:34px 44px 40px;font-size:45px;line-height:1.62;font-weight:500}
    #sc-a3 .task .lab{font-size:24px;margin-bottom:10px}
    #sc-a3 .task .h{padding:2px 8px;margin:0 -4px;border-radius:4px}
    #sc-a3 .pan{top:148px;height:500px}
    #sc-a3 .ph{display:flex;align-items:center;gap:18px;height:60px;white-space:nowrap}
    #sc-a3 .ph .tt{font-size:42px;font-weight:800;letter-spacing:-.02em}
    #sc-a3 .row{position:absolute;left:0;display:flex;align-items:center;white-space:nowrap}
    #sc-a3 .row .eq{font-size:56px;font-weight:700;line-height:1.2}
    #sc-a3 .sym{display:inline-flex;flex-direction:column;align-items:center;font-family:var(--mono)}
    #sc-a3 .sym b{font-size:70px;font-weight:800;line-height:1.1}
    #sc-a3 .sym i{font-family:var(--sans);font-style:normal;font-size:26px;font-weight:600;color:var(--mute);line-height:1.2}
    #sc-a3 .op{font-family:var(--mono);font-weight:700;font-size:60px;margin:0 22px;align-self:flex-start;line-height:1.28;display:inline-block}
    #sc-a3 .gvx{position:relative;display:inline-block}
    #sc-a3 .gvx .strk{position:absolute;left:-8px;right:-8px;top:52%;height:7px;background:var(--c2);transform:rotate(-14deg)}
    #sc-a3 .hint{font-family:var(--sans);font-size:28px;font-weight:700;margin-left:28px}
    #sc-a3 .eq .rr b{text-decoration:underline double;text-decoration-thickness:3px;text-underline-offset:8px}
    #sc-a3 .bw{position:absolute;left:0}
    #sc-a3 .bl{display:flex;justify-content:space-between;font-family:var(--mono);font-weight:700;font-size:26px;letter-spacing:.04em;margin-bottom:6px;white-space:nowrap}
    #sc-a3 .bar{position:relative;height:66px;border:4px solid var(--ink);background:var(--panel);box-shadow:6px 6px 0 var(--line)}
    #sc-a3 .seg{position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:28px;color:#fff;white-space:nowrap;overflow:hidden}
    #sc-a3 .fin{left:0;top:664px;width:1728px;height:106px;display:flex;align-items:center;gap:36px;padding:0 34px}
    #sc-a3 .fin .eq{font-size:50px;font-weight:700}
  </style>

  <div class="abs gvs">
    ${giv('gM', 'Geldmenge wächst', `${g('M')} = 14 %`, 'c4')}
    ${giv('gY', 'reales BIP wächst', `${g('Y')} = 5 %`, 'c1')}
    ${giv('gi', 'Nominalzins', 'i = 11 %', '')}
    ${giv('gV', 'Umlaufgeschw.', '<span id="gVv">V konstant</span>', '')}
    ${giv('gr', 'Gesucht: Realzins', '<span id="grv">r = ?</span>', 'c3')}
  </div>

  <div class="abs card task" id="task"><span class="lab">Die Aufgabe</span>
    „Die <span class="h" id="h4">Umlaufgeschwindigkeit des Geldes ist konstant</span>, das <span class="h" id="h2">reale BIP-Wachstum ist 0,05</span>,
    die <span class="h" id="h1">nominale Geldmenge wächst mit 0,14</span> und der <span class="h" id="h3">Nominalzins liegt bei 0,11</span>.
    <span class="h" id="h5">Bestimmen Sie den Realzins.</span>“</div>

  <!-- Schritt 1: Quantitätsgleichung -->
  <div class="abs pan" id="p1" style="left:0;width:900px">
    <div class="ph"><span class="step">1</span><span class="tt">Quantitätsgleichung</span></div>
    <div class="row" id="q1" style="top:72px">
      <span id="sM">${sym('M', 'Geldmenge', 't-c4')}</span><span class="op dot" id="d1">·</span><span id="sV">${sym('V', 'Umlaufgeschw.')}</span>
      <span class="op">=</span><span id="sP">${sym('P', 'Preisniveau', 't-c2')}</span><span class="op dot" id="d2">·</span><span id="sY">${sym('Y', 'reales BIP', 't-c1')}</span>
    </div>
    <div class="row" id="q2" style="top:208px"><span class="eq"><span class="t-c4">${g('M')}</span> <span class="pl" id="pl1">·</span> <span class="gvx" id="gvx"><span id="gvt">${g('V')}</span><span class="strk" id="strk"></span></span> = <span class="t-c2">π</span> <span class="pl" id="pl2">·</span> <span class="t-c1">${g('Y')}</span></span><span class="chip c4 hint" id="hint">Wachstumsraten: aus · wird +</span></div>
    <div class="row" id="q3" style="top:306px"><span class="eq" style="font-size:46px"><span class="t-c2">π</span> = <span class="t-c4">${g('M')}</span> − <span class="t-c1">${g('Y')}</span><span id="q3n"> = <span class="t-c4">14 %</span> − <span class="t-c1">5 %</span></span><span class="rr" id="q3r"> = <b class="t-c2" id="piv">9 %</b></span></span></div>
    <div class="bw" id="bA" style="top:388px;width:${14 * PX}px">
      <div class="bl"><span class="t-c4">GELDMENGENWACHSTUM 14 %</span></div>
      <div class="bar"><div class="seg" id="aY" style="left:0;width:${5 * PX}px;background:${C.c1}">5 % real</div><div class="seg" id="aP" style="left:${5 * PX}px;width:${9 * PX - 8}px;background:${C.c2}">9 % Inflation</div></div>
    </div>
  </div>

  <!-- Schritt 2: Fisher-Gleichung -->
  <div class="abs pan" id="p2" style="left:960px;width:768px">
    <div class="ph" id="p2h"><span class="step">2</span><span class="tt">Fisher-Gleichung</span></div>
    <div class="row" id="f1" style="top:72px">
      <span id="fi">${sym('i', 'Nominalzins')}</span><span class="op">=</span><span id="fr">${sym('r', 'Realzins', 't-c3')}</span><span class="op">+</span><span id="fp">${sym('π', 'Inflation', 't-c2')}</span>
    </div>
    <div class="row" id="f2" style="top:208px"><span class="eq"><span class="t-c3">r</span> = i − <span class="t-c2">π</span></span><span class="chip hint" id="hint2">umgestellt</span></div>
    <div class="row" id="f3" style="top:306px"><span class="eq" style="font-size:46px"><span class="t-c3">r</span> = 11 % − <span class="t-c2">9 %</span><span class="rr" id="f3r"> = <b class="t-c3" id="rv">2 %</b></span></span></div>
    <div class="bw" id="bB" style="top:388px;width:${11 * PX}px">
      <div class="bl"><span>NOMINALZINS 11 %</span><span class="t-c3" id="bBr">REAL</span></div>
      <div class="bar"><div class="seg" id="bP" style="left:0;width:${9 * PX}px;background:${C.c2}"><span id="bPt">9 % Inflation</span></div><div class="seg" id="bR" style="left:${9 * PX}px;width:${2 * PX - 8}px;background:${C.c3}">2 %</div></div>
    </div>
  </div>

  <div class="abs res fin" id="fin"><span class="lab" style="margin:0;font-size:26px">Ergebnis</span>
    <span class="eq" id="finP">Inflation <span class="t-c2">π</span> = <b class="t-c2">9 %</b></span>
    <span class="eq" id="finR" style="margin-left:60px">Realzins <span class="t-c3">r</span> = <b class="t-c3">2 %</b></span></div>`);

  /* ---------- Angaben ---------- */
  ctx.show('#task', 0.9, { y: 30 });
  const give = (card, h, t, bg) => { ctx.pop(card, t + 0.25, { scale: 0.7 }); ctx.tint(h, t, { backgroundColor: bg }); };
  give('#gr', '#h5', T('Gesucht ist der Realzins'), C.c3bg);
  give('#gM', '#h1', T('Die Geldmenge wächst'), C.c4bg);
  give('#gY', '#h2', T('das reale BIP um'), C.c1bg);
  give('#gi', '#h3', T('der Nominalzins liegt'), C.soft);
  give('#gV', '#h4', T('und die Umlaufgeschwindigkeit'), C.soft);

  /* ---------- Schritt 1: Quantitätsgleichung ---------- */
  const t0 = T('Wir brauchen zwei Gleichungen');
  ctx.hide('#task', t0 - 0.3, { dur: 0.3, y: -16 });
  gsap.set([$('#p1'), $('#p2')], { autoAlpha: 0 });
  ctx.to(['#p1', '#p2'].map(s => $(s)), { autoAlpha: 1, duration: 0.01 }, t0 - 0.05);
  // alles in den beiden Feldern zunächst unsichtbar, die Köpfe kommen bei „zwei Gleichungen“
  gsap.set($$('#p1 .row, #p2 .row, #p1 .bw, #p2 .bw'), { autoAlpha: 0 });
  ctx.show($$('#p1 .ph > *'), t0, { x: -24, y: 0, stagger: 0.08 });
  ctx.show($$('#p2 .ph > *'), t0 + 0.5, { x: -24, y: 0, stagger: 0.08 });
  ctx.dim('#p2h', T('Zuerst die Quantitätsgleichung'), { to: 0.3 });
  ctx.pulse($('#p1 .step'), T('Zuerst die Quantitätsgleichung'), { scale: 1.25 });
  // M · V = P · Y, Symbol für Symbol
  const tq = T('Geldmenge mal Umlaufgeschwindigkeit');
  tl.set($('#q1'), { autoAlpha: 1 }, tq - 0.1);
  gsap.set($$('#q1 > *'), { autoAlpha: 0 });
  const q1 = [['#sM', tq], ['#d1', T('mal Umlaufgeschwindigkeit')], ['#sV', T('mal Umlaufgeschwindigkeit') + 0.3], ['#q1 .op:not(.dot)', T('gleich Preisniveau')], ['#sP', T('gleich Preisniveau') + 0.3], ['#d2', T('mal reales BIP')], ['#sY', T('mal reales BIP') + 0.3]];
  q1.forEach(([s, t]) => { const e = $(s); gsap.set(e, { y: 18 }); tl.to(e, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, t); });
  // Wachstumsraten: aus · wird +
  const tw = T('In Wachstumsraten');
  ctx.show('#q2', tw, { y: 24 }); gsap.set($('#hint'), { autoAlpha: 0 }); gsap.set($('#strk'), { scaleX: 0, transformOrigin: '0% 50%' });
  const tp = T('aus dem Mal ein Plus');
  ctx.pulse(['#d1', '#d2'].map(s => $(s)), tp, { scale: 1.6 }).tint(['#d1', '#d2'].map(s => $(s)), tp, { color: C.c4 });
  ctx.swap(['#pl1', '#pl2'].map(s => $(s)), '+', T('ein Plus'));
  ctx.tint(['#pl1', '#pl2'].map(s => $(s)), T('ein Plus'), { color: C.c4 }).pulse(['#pl1', '#pl2'].map(s => $(s)), T('ein Plus') + 0.2, { scale: 1.5 });
  ctx.to('#hint', { autoAlpha: 1, duration: 0.35 }, T('ein Plus') + 0.2);
  // V konstant -> g_V = 0
  const tv = T('Die Umlaufgeschwindigkeit ist konstant');
  ctx.pulse('#gV', tv, { scale: 1.08 }).tint('#gV', tv, { borderColor: C.c2 }).pulse('#gvx', tv + 0.3, { scale: 1.3 }).pulse('#sV', tv + 0.3, { scale: 1.15 });
  const tz = T('ihre Wachstumsrate ist also null');
  ctx.to('#strk', { scaleX: 1, duration: 0.3, ease: 'power2.out' }, tz + 0.5);
  ctx.swap('#gVv', `${g('V')} = 0`, tz + 0.9).tint('#gV .vl', tz + 0.9, { color: C.c2 });
  ctx.to('#gvx', { opacity: 0.35, duration: 0.3 }, tz + 1.2);
  ctx.hide('#hint', tz + 1.2);
  // Übrig bleibt: π = g_M − g_Y = 14 % − 5 % = 9 %
  const tu = T('Übrig bleibt');
  gsap.set([$('#q3n'), $('#q3r')], { autoAlpha: 0 });
  ctx.show('#q3', T('Inflation gleich Geldmengenwachstum'), { y: 24 });
  ctx.pulse('#gM', T('gleich Geldmengenwachstum') + 0.4, { scale: 1.08 }).pulse('#gY', T('minus reales Wachstum'), { scale: 1.08 });
  const tn = T('Vierzehn minus fünf');
  ctx.to('#q3n', { autoAlpha: 1, duration: 0.3 }, tn);
  ctx.to('#q3r', { autoAlpha: 1, duration: 0.25 }, T('ergibt neun'));
  ctx.count('#piv', 9, T('ergibt neun'), { from: 0, dur: 0.6, suf: ' %' }).pulse('#piv', T('ergibt neun') + 0.6, { scale: 1.2 });
  // Balken A: 14 % = 5 % real + 9 % Inflation
  ctx.show('#bA', tn, { y: 24 });
  ctx.wipe('#aY', tn + 0.8, { dur: 0.5, margin: 0 });
  ctx.wipe('#aP', T('ergibt neun') + 0.1, { dur: 0.7, margin: 0 });

  /* ---------- Schritt 2: Fisher-Gleichung ---------- */
  const tf = T('Dann die Fisher-Gleichung');
  ctx.undim('#p2h', tf).pulse($('#p2 .step'), tf, { scale: 1.25 });
  ctx.dim(['#q1', '#q2', '#p1 .ph'].map(s => $(s)), tf, { to: 0.45 });
  const tn2 = T('Der Nominalzins ist');
  // Vorschau: die zweite Gleichung steht schon blass da, während Schritt 1 läuft
  tl.set($('#f1'), { autoAlpha: 1 }, t0 + 0.8);
  gsap.set($$('#f1 > *'), { autoAlpha: 0 });
  tl.to($$('#f1 > *'), { autoAlpha: 0.2, duration: 0.5 }, t0 + 0.9);
  [['#fi', tn2], ['#f1 .op', T('ist der Realzins', { n: 2 })], ['#fr', T('der Realzins plus')], ['#f1 .op + span + .op', T('plus die Inflation')], ['#fp', T('plus die Inflation') + 0.3]]
    .forEach(([s, t]) => { const e = $(s); tl.to(e, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, t); ctx.pulse(e, t, { scale: 1.18 }); });
  ctx.pulse('#gi', tn2, { scale: 1.08 }).pulse('#piv', T('plus die Inflation') + 0.3, { scale: 1.25 });
  // Balken B: 11 % = 9 % Inflation + 2 % Realzins
  gsap.set($('#bBr'), { autoAlpha: 0 });
  ctx.show('#bB', tn2 + 0.3, { y: 24 });
  ctx.wipe('#bP', T('plus die Inflation') + 0.3, { dur: 0.7, margin: 0 });
  // umstellen und einsetzen
  ctx.show('#f2', T('Umgestellt'), { y: 24 });
  gsap.set($('#f3r'), { autoAlpha: 0 });
  ctx.show('#f3', T('Realzins gleich elf'), { y: 24 });
  const tr = T('also zwei Prozent');
  ctx.to('#f3r', { autoAlpha: 1, duration: 0.25 }, tr);
  ctx.count('#rv', 2, tr, { from: 0, dur: 0.5, suf: ' %' }).pulse('#rv', tr + 0.5, { scale: 1.25 });
  ctx.wipe('#bR', tr + 0.2, { dur: 0.4, margin: 0 }).to('#bBr', { autoAlpha: 1, duration: 0.3 }, tr + 0.4);
  ctx.swap('#grv', 'r = 2 %', tr + 0.5).pulse('#gr', tr + 0.7, { scale: 1.1 }).tint('#gr', tr + 0.5, { backgroundColor: C.c3bg, borderColor: C.c3 });
  ctx.undim(['#q1', '#q2', '#p1 .ph'].map(s => $(s)), tr + 0.6);
  ctx.show('#fin', tr + 0.6, { y: 30 });
  // „frisst die Inflation neun auf, real bleiben zwei“
  const te = T('frisst die Inflation');
  ctx.pulse('#bB .bl span', T('Von elf Prozent'), { scale: 1.1, origin: '0% 50%' });
  ctx.tint('#bP', te + 0.4, { backgroundColor: C.old }, 0.6).to('#bPt', { opacity: 0.75, textDecoration: 'line-through', duration: 0.3 }, te + 0.6);
  ctx.pulse('#bP', te, { scale: 1.04 });
  const tb = T('real bleiben zwei');
  ctx.pulse('#bR', tb, { scale: 1.3 }).pulse('#finR', tb, { scale: 1.08, origin: '0% 50%' }).pulse('#rv', tb, { scale: 1.2 });
});
