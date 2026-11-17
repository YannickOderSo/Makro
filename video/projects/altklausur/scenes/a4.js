// Aufgabe 4 – Übung 2-4 a–c: Wirtschaftskreislauf, BIP auf zwei Wegen, Ersparnis, marginale Konsumneigung
V.scene('a4', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 4', title: 'Der <em>Wirtschaftskreislauf</em>', src: 'Übung 2-4 a–c' });

  const fl = (id, cls, name, x, y) => `<div class="abs fl ${cls}" id="${id}" style="left:${x}px;top:${y}px"><span>${name}</span><b>0</b></div>`;

  ctx.html(`
  <style>
    #sc-a4 .nd{width:270px;height:200px;padding:14px 8px 0;text-align:center}
    #sc-a4 .nd .nm{font-weight:800;font-size:37px;line-height:1.1;margin-top:4px}
    #sc-a4 .fl{background:var(--panel);border:3px solid var(--ink);padding:5px 16px 7px;text-align:center;line-height:1.1;white-space:nowrap}
    #sc-a4 .fl span{display:block;font-weight:700;font-size:34px}
    #sc-a4 .fl b{display:block;font-family:var(--mono);font-weight:800;font-size:46px;line-height:1.05;font-variant-numeric:tabular-nums}
    #sc-a4 .fl.c1{border-color:var(--c1);background:var(--c1bg);color:var(--c1)}
    #sc-a4 .fl.c2{border-color:var(--c2);background:var(--c2bg);color:var(--c2)}
    #sc-a4 .fl.c3{border-color:var(--c3);background:var(--c3bg);color:var(--c3)}
    #sc-a4 .fl.c4{border-color:var(--c4);background:var(--c4bg);color:var(--c4)}
    #sc-a4 .fl.m{border-color:var(--mute);background:var(--soft);color:var(--mute)}
    #sc-a4 .closed{left:0;top:0;font-size:33px;line-height:1.2;padding:8px 18px 10px;white-space:normal;width:330px}
    #sc-a4 .stg{left:900px;top:0;width:828px;height:770px}
    #sc-a4 .q{font-size:48px;font-weight:800;letter-spacing:-.02em;line-height:1.2;white-space:nowrap}
    #sc-a4 .hdl{width:320px;text-align:center;font-size:30px;padding:4px 0 5px}
    #sc-a4 .bar{width:320px;height:340px;border:3px dashed var(--line);background:rgba(250,252,251,.6)}
    #sc-a4 .bs{position:absolute;left:-3px;width:320px;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.08;border:3px solid var(--ink);margin-top:-1.5px}
    #sc-a4 .bs.row{flex-direction:row;gap:12px}
    #sc-a4 .bs span{font-weight:700;font-size:27px}
    #sc-a4 .bs b{font-family:var(--mono);font-weight:800;font-size:34px}
    #sc-a4 .op{font-family:var(--mono);font-weight:800;font-size:96px;line-height:1}
    #sc-a4 .cap{font-size:36px;font-weight:500}
    #sc-a4 .cap .cl{display:inline-block;width:250px;font-family:var(--sans);font-weight:700;font-size:32px}
    #sc-a4 .rw{left:0;width:828px;padding:10px 24px 12px}
    #sc-a4 .rw .eq{font-size:38px;line-height:1.5}
    #sc-a4 .tg{font-size:26px;margin-right:14px;position:relative;top:-4px;font-family:var(--sans)}
    #sc-a4 .sb{position:absolute;height:50px;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:32px;color:#fff}
    #sc-a4 .sl{position:absolute;left:0;width:190px;height:50px;display:flex;align-items:center;font-weight:700;font-size:30px}
    #sc-a4 .strike{position:relative;display:inline-block}
    #sc-a4 .strike i{position:absolute;left:-4px;right:-4px;top:52%;height:5px;background:var(--c2);transform-origin:0 50%}
    #sc-a4 .note{font-family:var(--sans);font-size:28px;font-weight:600;color:var(--mute);margin-left:22px}
    #sc-a4 .cseg{position:absolute;top:0;height:92px;white-space:nowrap;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:36px;color:#fff}
    #sc-a4 #fin{left:0;top:654px;width:1728px;display:flex;align-items:center;justify-content:space-between;padding:20px 34px 24px}
    #sc-a4 #fin .eq{font-size:40px;font-weight:700}
  </style>

  <!-- Kreislaufdiagramm (Originalgröße 1100 × 770, wandert später verkleinert nach links) -->
  <div class="abs" id="dia" style="left:0;top:0;width:1100px;height:770px">
    <svg class="abs" id="dsvg" width="1100" height="770" style="left:0;top:0"></svg>
    <div class="abs chip ink closed" id="closed">geschlossene Volkswirtschaft</div>
    <div class="abs card nd" id="n-st" style="left:425px;top:0">${V.icon('staat', 104, { tone: 2 })}<div class="nm">Staat</div></div>
    <div class="abs card nd" id="n-hh" style="left:0;top:300px">${V.icon('people', 104, { tone: 1 })}<div class="nm">Haushalte</div></div>
    <div class="abs card nd" id="n-un" style="left:720px;top:300px">${V.icon('factory', 104, { tone: 3 })}<div class="nm">Unternehmen</div></div>
    ${fl('f-c', 'c1', 'Konsum', 495, 400)}
    ${fl('f-w', '', 'Löhne', 493, 596)}
    ${fl('f-k', 'm', 'Kapitaleinkommen', 478, 712)}
    ${fl('f-t', 'c4', 'Steuern', 200, 176)}
    ${fl('f-g', 'c2', 'Staatsausgaben', 886, 176)}
    ${fl('f-i', 'c3', 'Investitionen', 955, 588)}
  </div>

  <!-- a) zwei Wege -->
  <div class="abs stg" id="ra">
    <div class="q">a) Das BIP auf <span class="t-c1">zwei Wegen</span></div>
    <div class="abs chip ink hdl" id="ha" style="left:0;top:76px">Einkommen</div>
    <div class="abs chip ink hdl" id="hb" style="left:508px;top:76px">Verwendung</div>
    <div class="abs bar" id="ba" style="left:0;top:134px">
      <div class="bs" id="sg-k" style="top:0;height:76px;background:var(--mute)"><span>Kapitaleinkommen</span><b>180</b></div>
      <div class="bs" id="sg-w" style="top:76px;height:264px;background:var(--ink)"><span>Löhne</span><b>620</b></div>
    </div>
    <div class="abs op" id="eqm" style="left:385px;top:250px">=</div>
    <div class="abs bar" id="bb" style="left:508px;top:134px">
      <div class="bs row" id="sg-g" style="top:0;height:55px;background:var(--c2)"><span>Staatsausgaben</span><b>130</b></div>
      <div class="bs row" id="sg-i" style="top:55px;height:47px;background:var(--c3)"><span>Investitionen</span><b>110</b></div>
      <div class="bs" id="sg-c" style="top:102px;height:238px;background:var(--c1)"><span>Konsum</span><b>560</b></div>
    </div>
    <div class="abs eq cap" id="ca" style="left:0;top:492px"><span class="cl">Einkommen:</span>620 + <span class="t-mute">180</span> <span id="ca-r">= <b>800</b></span></div>
    <div class="abs eq cap" id="cb" style="left:0;top:548px"><span class="cl">Verwendung:</span><span class="t-c1">560</span> + <span class="t-c3">110</span> + <span class="t-c2">130</span> <span id="cb-r">= <b>800</b></span></div>
    <div class="abs res" id="ra-res" style="left:0;top:628px;width:828px;display:flex;align-items:center;justify-content:space-between;padding:14px 28px 18px">
      <span class="mid" style="font-size:34px">Beide Wege liefern dasselbe:</span>
      <span class="eq lg" style="display:flex;align-items:center;gap:16px;font-weight:700">Y = <b>800</b>${V.icon('check', 54)}</span>
    </div>
  </div>

  <!-- b) Ersparnis -->
  <div class="abs stg" id="rb">
    <div class="q">b) Die <span class="t-c3">Ersparnis</span></div>
    <div class="abs card rw" id="b1" style="top:72px">
      <div class="eq"><span class="chip c1 tg">privat</span>S<sub>priv</sub> = Y − <span class="t-c4" id="b1T">T</span> − <span class="t-c1" id="b1C">C</span></div>
      <div class="eq" id="b1n">= 800 − <span class="t-c4">100</span> − <span class="t-c1">560</span> <span id="b1r">= <b>140</b></span></div>
    </div>
    <div class="abs card rw" id="b2" style="top:226px">
      <div class="eq"><span class="chip c2 tg">öffentlich</span>S<sub>öff</sub> = <span class="t-c4">T</span> − <span class="t-c2">G</span></div>
      <div class="eq" id="b2n">= <span class="t-c4">100</span> − <span class="t-c2">130</span> <span id="b2r">= <b class="t-c2">−30</b></span><span class="chip c2" id="defz" style="margin-left:26px;font-size:28px;position:relative;top:-3px">Defizit</span></div>
    </div>
    <div class="abs card rw" id="b3" style="top:380px">
      <div class="eq"><span class="chip c3 tg">gesamt</span>S = S<sub>priv</sub> + S<sub>öff</sub></div>
      <div class="eq" id="b3n" style="display:flex;align-items:center">= 140 + (<span class="t-c2">−30</span>) = <b style="margin:0 .45em">110</b><span id="b3i">= <span class="t-c3" style="font-weight:800">I</span></span><span id="b3ok" style="margin-left:18px;display:inline-flex">${V.icon('check', 50)}</span></div>
    </div>
    <div class="abs" id="sbars" style="left:0;top:556px;width:828px;height:170px">
      <div class="sl" style="top:0">privat</div><div class="sb" id="sb1" style="left:200px;top:0;width:560px;background:var(--c1)">140</div>
      <div class="sl" style="top:60px">öffentlich</div><div class="sb" id="sb2" style="left:640px;top:60px;width:120px;background:var(--c2)">−30</div>
      <div class="sl" style="top:120px">gesamt</div><div class="sb" id="sb3" style="left:200px;top:120px;width:440px;background:var(--c3)">110 = I</div>
      <svg class="abs" style="left:0;top:0" width="828" height="170"><line id="sbl" class="dash" x1="640" y1="-8" x2="640" y2="178"/></svg>
    </div>
  </div>

  <!-- c) marginale Konsumneigung -->
  <div class="abs stg" id="rc">
    <div class="q">c) Marginale <span class="t-c1">Konsumneigung</span></div>
    <div class="abs card" id="c-card" style="left:0;top:72px;width:828px;padding:10px 28px 14px">
      <div class="eq" id="c1" style="font-size:42px"><span class="t-c1">C</span> = <span class="strike" id="c0">C<sub>0</sub> +<i id="c0s"></i></span> <span id="cpart" class="hl">c · (Y − T)</span><span class="chip c2" id="c0n" style="margin-left:28px;font-size:30px;position:relative;top:-5px">C<sub>0</sub> = 0</span></div>
      <div class="eq" id="c2" style="font-size:42px"><span class="t-c1">560</span> = c · 700</div>
      <div class="eq" id="c3" style="font-size:46px;font-weight:700;margin-top:4px">c = ${V.frac('<span class="t-c1">560</span>', '700')} = <b>0,8</b></div>
    </div>
    <div class="abs" id="vb" style="left:0;top:360px;width:828px;height:110px">
      <div class="abs" id="vbl" style="left:0;top:0;font-weight:700;font-size:30px;white-space:nowrap">verfügbares Einkommen: <span class="mono" style="font-weight:500">Y − T = 800 − <span class="t-c4">100</span> = <b id="vb700" style="display:inline-block">700</b></span></div>
      <div class="abs" id="vbf" style="left:0;top:46px;width:828px;height:62px;border:3px dashed var(--line);background:rgba(250,252,251,.6)"></div>
      <div class="cseg" id="vb1" style="left:0;top:46px;width:662px;height:62px;background:var(--c1);font-size:32px">Konsum 560</div>
      <div class="cseg" id="vb2" style="left:659px;top:46px;width:169px;height:62px;background:var(--c3);font-size:32px">140</div>
    </div>
    <div class="abs" id="coinv" style="left:0;top:486px;width:828px;height:150px">
      <div class="abs" id="coin" style="left:0;top:0;display:flex;align-items:center;gap:12px">${V.icon('coin', 92, { tone: 4 })}<span style="font-family:var(--mono);font-weight:800;font-size:36px">+1 €</span></div>
      <svg class="abs" id="csvg" style="left:0;top:0" width="828" height="150"></svg>
      <div class="abs" id="cbar" style="left:300px;top:6px;width:528px;height:80px">
        <div class="cseg" id="cs1" style="left:0;width:423px;height:80px;background:var(--c1)">80 Cent</div>
        <div class="cseg" id="cs2" style="left:420px;width:108px;height:80px;background:var(--c3);font-size:28px">20 ct</div>
      </div>
      <div class="abs big t-c1" id="cl1" style="left:300px;top:92px;font-size:36px">Konsum</div>
      <div class="abs big t-c3" id="cl2" style="left:536px;top:92px;width:292px;text-align:right;font-size:36px">Ersparnis</div>
    </div>
  </div>

  <div class="abs res" id="fin">
    <span class="lab" style="margin:0;font-size:26px">Ergebnis</span>
    <span class="eq">Y = <b>800</b></span>
    <span class="eq">S<sub>priv</sub> = <b>140</b></span>
    <span class="eq">S<sub>öff</sub> = <b class="t-c2">−30</b></span>
    <span class="eq">S = <b>110</b> = I</span>
    <span class="eq">c = <b>0,8</b></span>
  </div>`);

  /* ================= Phase 1: Kreislaufdiagramm ================= */
  const dia = $('#dia'), svg = $('#dsvg');
  gsap.set(dia, { x: 314, transformOrigin: '0 0' });
  const chips = { c: $('#f-c'), w: $('#f-w'), k: $('#f-k'), t: $('#f-t'), g: $('#f-g'), i: $('#f-i') };
  for (const k in chips) gsap.set(chips[k], { xPercent: -50, yPercent: -50 });
  const arr = {
    c: V.arrow(svg, 'M278 400 L708 400', { cls: 'c1', w: 8, head: 28 }),
    w: V.arrow(svg, 'M750 508 C 690 625, 300 625, 222 516', { cls: 'ink', w: 8, head: 28 }),
    k: V.arrow(svg, 'M820 508 C 740 780, 250 780, 136 516', { cls: 'old', w: 8, head: 28 }),
    t: V.arrow(svg, 'M135 292 C 135 160, 260 98, 413 98', { cls: 'c4', w: 8, head: 28 }),
    g: V.arrow(svg, 'M683 98 C 800 98, 855 170, 855 288', { cls: 'c2', w: 8, head: 28 }),
    i: V.arrow(svg, 'M996 340 C 1104 322, 1104 478, 1006 460', { cls: 'c3', w: 8, head: 28 }),
  };
  const colOf = { c: C.c1, w: C.ink, k: C.old, t: C.c4, g: C.c2, i: C.c3 };
  // Münze, die einmal einen Strom entlangläuft
  const runCoin = (key, at, dur = 1.9) => {
    const g = V.S('g', {});
    g.innerHTML = `<circle r="17" fill="${colOf[key]}" stroke="${C.ink}" stroke-width="4"/><text y="9" text-anchor="middle" style="font-size:24px;font-weight:800;fill:#fff">€</text>`;
    svg.appendChild(g); gsap.set(g, { autoAlpha: 0 });
    ctx.to(g, { autoAlpha: 1, duration: 0.2 }, at).along(g, arr[key]._path, at, dur, { from: 0.02, to: 0.9, ease: 'sine.inOut' }).to(g, { autoAlpha: 0, duration: 0.25 }, at + dur - 0.2);
  };
  const tMove = T('Teil a') - 0.8;
  const flow = (key, tArrow, tNum, val) => {
    ctx.drawArrow(arr[key], tArrow, 0.7);
    ctx.pop(chips[key], tNum - 0.15);
    ctx.count(chips[key].querySelector('b'), val, tNum, { dur: 0.9 });
    for (let t = tArrow + 1.0; t < tMove - 1.2; t += 2.7) runCoin(key, t);
  };

  ctx.pop('#n-hh', 0.9, { scale: 0.8 }).pop('#n-un', 1.15, { scale: 0.8 }).pop('#n-st', 1.4, { scale: 0.8 });
  ctx.show('#closed', T('Eine geschlossene'), { x: -30, y: 0 });
  ctx.pulse('#n-un', T('Die Unternehmen zahlen'), { scale: 1.06 }).pulse('#n-hh', T('den Haushalten'), { scale: 1.06 });
  flow('w', T('Die Unternehmen zahlen') + 0.5, T('sechshundertzwanzig'), 620);
  flow('k', T('und hundertachtzig') - 0.3, T('hundertachtzig'), 180);
  ctx.pulse('#n-hh', T('Die Haushalte konsumieren'), { scale: 1.06 });
  flow('c', T('Die Haushalte konsumieren') + 0.3, T('fünfhundertsechzig'), 560);
  flow('t', T('und zahlen hundert') - 0.1, T('zahlen hundert') + 0.45, 100);
  ctx.pulse('#n-un', T('Die Unternehmen investieren'), { scale: 1.06 });
  flow('i', T('Die Unternehmen investieren') + 0.2, T('hundertzehn'), 110);
  ctx.pulse('#n-st', T('der Staat gibt'), { scale: 1.06 });
  flow('g', T('der Staat gibt') + 0.2, T('hundertdreißig'), 130);

  // Diagramm rückt nach links und wird kleiner
  ctx.to(dia, { x: 0, y: 24, scale: 0.8, duration: 0.8, ease: 'power3.inOut' }, tMove);
  const hit = (keys, t) => keys.forEach(k => { ctx.pulse(chips[k], t, { scale: 1.16 }); runCoin(k, t, 1.6); });

  /* ================= a) zwei Wege ================= */
  const ta = T('Teil a');
  const stage = (id, t) => { gsap.set($(id), { autoAlpha: 0 }); ctx.to(id, { autoAlpha: 1, duration: 0.01 }, t - 0.05); };
  stage('#ra', ta);
  ctx.show('#ra .q', ta, { x: -30, y: 0 });
  ctx.show(['#ba', '#bb'].map($), T('das BIP auf zwei Wegen'), { y: 20, stagger: 0.15 });
  ctx.show('#ha', T('Über die Einkommen'), { y: -16 });
  ctx.wipe('#sg-w', T('Löhne plus'), { dir: 'up', margin: 0, dur: 0.6 }); hit(['w'], T('Löhne plus'));
  ctx.wipe('#sg-k', T('plus Kapitaleinkommen'), { dir: 'up', margin: 0, dur: 0.5 }); hit(['k'], T('plus Kapitaleinkommen'));
  ctx.show('#ca', T('Löhne plus') + 0.2, { y: 14 });
  ctx.show('#ca-r', T('das sind achthundert'), { y: 0, x: -14 }).pulse('#ca-r b', T('das sind achthundert') + 0.5);
  ctx.show('#hb', T('Über die Verwendung'), { y: -16 });
  ctx.wipe('#sg-c', T('Konsum plus'), { dir: 'up', margin: 0, dur: 0.6 }); hit(['c'], T('Konsum plus'));
  ctx.wipe('#sg-i', T('plus Investitionen'), { dir: 'up', margin: 0, dur: 0.4 }); hit(['i'], T('plus Investitionen'));
  ctx.wipe('#sg-g', T('plus Staatsausgaben'), { dir: 'up', margin: 0, dur: 0.4 }); hit(['g'], T('plus Staatsausgaben'));
  ctx.show('#cb', T('Konsum plus') + 0.2, { y: 14 });
  ctx.show('#cb-r', T('ebenfalls achthundert'), { y: 0, x: -14 }).pulse('#cb-r b', T('ebenfalls achthundert') + 0.6);
  ctx.pop('#eqm', T('Beide Wege'));
  ctx.show('#ra-res', T('Beide Wege') + 0.4, { y: 26 });
  ctx.tint(['#ba', '#bb'].map($), T('Beide Wege') + 0.4, { borderColor: C.c3 });

  /* ================= b) Ersparnis ================= */
  const tb = T('Teil b');
  ctx.hide('#ra', tb - 0.3, { y: -16, dur: 0.3 });
  stage('#rb', tb);
  ctx.show('#rb .q', tb, { x: -30, y: 0 });
  ctx.show('#b1', T('Privat ist'), { x: 40, y: 0 });
  ctx.pulse('#b1T', T('minus Steuern'), { scale: 1.3 }).pulse('#b1C', T('minus Konsum'), { scale: 1.3 });
  hit(['t'], T('minus Steuern')); hit(['c'], T('minus Konsum'));
  ctx.show('#b1n', T('achthundert minus hundert'), { y: 12 });
  gsap.set($('#b1r'), { autoAlpha: 0 }); ctx.to('#b1r', { autoAlpha: 1, duration: 0.3 }, T('also hundertvierzig')).pulse('#b1r b', T('also hundertvierzig') + 0.1, { scale: 1.2 });
  ctx.wipe('#sb1', T('also hundertvierzig') + 0.3, { dir: 'right', margin: 0, dur: 0.7 });
  ctx.show($$('#sbars .sl')[0], T('also hundertvierzig') + 0.2, { y: 0, x: -16 });

  ctx.show('#b2', T('Öffentlich ist'), { x: 40, y: 0 });
  hit(['t'], T('Öffentlich ist') + 1.2); hit(['g'], T('minus Staatsausgaben'));
  ctx.show('#b2n', T('hundert minus hundertdreißig'), { y: 12 });
  gsap.set($('#b2r'), { autoAlpha: 0 }); ctx.to('#b2r', { autoAlpha: 1, duration: 0.3 }, T('also minus dreißig')).pulse('#b2r b', T('also minus dreißig') + 0.1, { scale: 1.2 });
  gsap.set($('#defz'), { autoAlpha: 0, scale: 1.6 });
  ctx.to('#defz', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, T('ein Defizit'));
  ctx.wipe('#sb2', T('also minus dreißig') + 0.3, { dir: 'left', margin: 0, dur: 0.5 });
  ctx.show($$('#sbars .sl')[1], T('also minus dreißig') + 0.2, { y: 0, x: -16 });
  ctx.extend('#sbl', T('also minus dreißig') + 0.7, 0.5);

  ctx.show('#b3', T('Zusammen sind das'), { x: 40, y: 0 });
  gsap.set($('#b3i'), { autoAlpha: 0 }); gsap.set($('#b3ok'), { autoAlpha: 0, scale: 0.4 });
  ctx.pulse('#b3n b', T('hundertzehn', { n: 2 }), { scale: 1.2 });
  ctx.wipe('#sb3', T('hundertzehn', { n: 2 }), { dir: 'right', margin: 0, dur: 0.6 });
  ctx.show($$('#sbars .sl')[2], T('hundertzehn', { n: 2 }) - 0.1, { y: 0, x: -16 });
  ctx.to('#b3i', { autoAlpha: 1, duration: 0.3 }, T('genau die Investition')); hit(['i'], T('genau die Investition'));
  ctx.pulse('#sb3', T('genau die Investition') + 0.2, { scale: 1.06 });
  ctx.to('#b3ok', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, T('Die Probe stimmt'));
  ctx.tint('#b3', T('Die Probe stimmt'), { borderColor: C.c3, boxShadow: `8px 8px 0 ${C.c3bg}` });

  /* ================= c) marginale Konsumneigung ================= */
  const tc = T('Teil c');
  ctx.hide('#rb', tc - 0.3, { y: -16, dur: 0.3 });
  stage('#rc', tc);
  ctx.show('#rc .q', tc, { x: -30, y: 0 });
  ctx.show('#c-card', T('die marginale Konsumneigung'), { y: 24 });
  gsap.set(['#c0n', '#c2', '#c3'].map($), { autoAlpha: 0 }); gsap.set($('#c0s'), { scaleX: 0 });
  ctx.pulse('#c0', T('Der autonome Konsum'), { scale: 1.15 });
  ctx.to('#c0s', { scaleX: 1, duration: 0.35, ease: 'power2.out' }, T('ist null'));
  ctx.to('#c0', { opacity: 0.4, duration: 0.3 }, T('ist null') + 0.2);
  ctx.to('#c0n', { autoAlpha: 1, duration: 0.3 }, T('ist null') + 0.1);
  ctx.tint('#cpart', T('also ist der Konsum'), { backgroundColor: C.c1bg, color: C.c1 }).pulse('#cpart', T('ein fester Anteil'), { scale: 1.1 });
  hit(['c'], T('also ist der Konsum'));
  // Balken: verfügbares Einkommen 700, davon 560 Konsum
  ctx.show(['#vbl', '#vbf'].map($), T('also ist der Konsum') + 0.3, { y: 16, stagger: 0.1 });
  ctx.wipe('#vb1', T('ein fester Anteil'), { dir: 'right', margin: 0, dur: 0.8 });
  ctx.wipe('#vb2', T('am verfügbaren Einkommen') + 0.5, { dir: 'right', margin: 0, dur: 0.4 });
  hit(['t'], T('am verfügbaren Einkommen'));
  ctx.to('#c2', { autoAlpha: 1, duration: 0.4 }, T('Fünfhundertsechzig geteilt')).pulse('#vb1', T('Fünfhundertsechzig geteilt'), { scale: 1.04 });
  ctx.pulse('#vb700', T('durch siebenhundert'), { scale: 1.3 });
  ctx.to('#c3', { autoAlpha: 1, duration: 0.4 }, T('ergibt null Komma acht')).pulse('#c3 b', T('null Komma acht') + 0.2, { scale: 1.2 });
  ctx.swap('#vb1', 'Konsum 560 = 80 %', T('null Komma acht') + 0.4).pulse('#vb1', T('null Komma acht') + 0.5, { scale: 1.04 });
  // Münze: von jedem zusätzlichen Euro 80 Cent Konsum, 20 Cent Ersparnis
  const tEuro = T('Von jedem zusätzlichen Euro');
  ctx.show('#coin', tEuro, { x: -30, y: 0 });
  const ca = V.arrow($('#csvg'), 'M214 46 L278 46', { cls: 'ink', w: 7, head: 24 });
  ctx.drawArrow(ca, tEuro + 0.5, 0.4);
  ctx.wipe('#cs1', T('achtzig Cent'), { dir: 'right', margin: 0, dur: 0.7 });
  ctx.show('#cl1', T('achtzig Cent') + 0.4, { y: -12 });
  ctx.wipe('#cs2', T('achtzig Cent') + 0.9, { dir: 'right', margin: 0, dur: 0.4 });
  ctx.show('#cl2', T('achtzig Cent') + 1.1, { y: -12 });
  ctx.show('#fin', T('achtzig Cent') + 1.5, { y: 30 });
  ctx.show('#fin .eq', T('achtzig Cent') + 1.7, { y: 12, stagger: 0.1 });
});
