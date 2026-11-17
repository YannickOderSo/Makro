// Aufgabe 5 c – Übung 3-2: Steady State für Land A (s = 0,1) und Land B (s = 0,2), δ = 0,05
V.scene('a5b', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 5 c', title: 'Der <em>Steady State</em>', src: 'Übung 3-2' });

  const cell = (id, cal, val, col) => `<td><div class="cl"><span class="cal" id="${id}c">${cal}</span><b class="val t-${col}" id="${id}v">${val}</b></div></td>`;
  const par = s => `<span class="par">(</span>${s}<span class="par">)</span>`;

  ctx.html(`
  <style>
    #sc-a5b .giv{left:0;top:0;display:flex;gap:18px}
    #sc-a5b .giv .chip{font-size:30px;padding:5px 16px 6px}
    #sc-a5b #drv{left:920px;top:0;width:808px;height:252px;padding:12px 28px}
    #sc-a5b #drv .eq{font-size:44px;font-weight:600;display:flex;align-items:center;gap:.5em}
    #sc-a5b .par{font-size:1.75em;font-weight:400;line-height:1;position:relative;top:-.04em}
    #sc-a5b .kbox{border:3px solid var(--c3);background:var(--c3bg);padding:0 .35em;display:inline-flex;align-items:center;font-weight:800}
    #sc-a5b .tbl{position:absolute;left:920px;top:268px;width:808px;table-layout:fixed}
    #sc-a5b .tbl th{font-family:var(--sans);font-size:32px;font-weight:800;text-transform:none;letter-spacing:-.01em;color:var(--ink);height:60px;padding:6px 16px;white-space:nowrap}
    #sc-a5b .tbl th .mono{font-size:27px;font-weight:700;margin-left:10px}
    #sc-a5b .tbl th:first-child{padding-left:22px}
    #sc-a5b .tbl td{height:66px;padding:0 16px}
    #sc-a5b .tbl td.rl{padding-left:22px;font-family:var(--mono);font-size:29px;font-weight:700;white-space:nowrap}
    #sc-a5b .cl{display:flex;align-items:center;justify-content:space-between}
    #sc-a5b .cal{font-family:var(--mono);font-size:26px;color:var(--mute);white-space:nowrap}
    #sc-a5b .val{font-family:var(--mono);font-size:42px;font-weight:800;display:inline-block}
    #sc-a5b #msg{left:920px;top:618px;width:808px;padding:10px 28px 14px}
  </style>

  <div class="abs giv">
    <span class="chip c1" id="gA">Land A: s = 10 %</span>
    <span class="chip c2" id="gB">Land B: s = 20 %</span>
    <span class="chip ink" id="gD">δ = 5 %</span>
  </div>
  <div class="abs" id="plotw" style="left:0;top:66px"></div>

  <div class="abs card" id="drv">
    <span class="lab">Steady State: Investition = Abschreibung</span>
    <div class="eq" id="e1"><span id="e1a"><span class="t-c3">s</span> · √k</span><span id="e1b">= δ · k</span></div>
    <div class="eq" id="e2" style="margin-top:2px"><span id="e2a">√k = ${V.frac('<span class="t-c3">s</span>', 'δ')}</span><span id="e2b" style="display:inline-flex;align-items:center;gap:.5em"><span class="t-mute">→</span><span class="kbox">k* = ${par(V.frac('<span class="t-c3">s</span>', 'δ'))}<sup id="sq" style="font-size:.7em;position:relative;top:-.9em;display:inline-block">2</sup></span></span></div>
  </div>

  <table class="tbl" id="tb">
    <colgroup><col style="width:248px"><col style="width:280px"><col style="width:280px"></colgroup>
    <tr><th><span class="lab" style="margin:0" id="hG">gesucht</span></th><th id="hA"><span class="t-c1">Land A</span><span class="mono">s = 0,1</span></th><th id="hB"><span class="t-c2">Land B</span><span class="mono">s = 0,2</span></th></tr>
    <tr><td class="rl">k* = (s/δ)²</td>${cell('ak', '2² =', '4', 'c1')}${cell('bk', '4² =', '16', 'c2')}</tr>
    <tr><td class="rl">y* = √k*</td>${cell('ay', '√4 =', '2', 'c1')}${cell('by', '√16 =', '4', 'c2')}</tr>
    <tr><td class="rl">i* = s · y*</td>${cell('ai', '0,1 · 2 =', '0,2', 'c1')}${cell('bi', '0,2 · 4 =', '0,8', 'c2')}</tr>
    <tr><td class="rl">c* = y* − i*</td>${cell('ac', '2 − 0,2 =', '1,8', 'c1')}${cell('bc', '4 − 0,8 =', '3,2', 'c2')}</tr>
  </table>

  <div class="abs res" id="msg">
    <span class="lab">Botschaft</span>
    <div class="mid" style="font-size:34px;font-weight:700;line-height:1.22">Höhere Sparquote → <span class="t-c3">mehr Kapital</span> und <span class="t-c3">höheres Einkommen</span> im Steady State</div>
  </div>`);

  /* ---------- Diagramm (maßstabsgetreu) ---------- */
  const P = V.plot({ w: 880, h: 704, x: [0, 20], y: [0, 1.1], pad: { l: 96, r: 56, t: 50, b: 84 } });
  $('#plotw').appendChild(P.el);
  const ax = P.axes({ xl: 'k', xt: [4, 8, 12, 16].map(v => [v, String(v)]), yt: [0.2, 0.4, 0.6, 0.8, 1].map(v => [v, V.fmt(v, 1)]) });
  P.add('text', { x: P.X(0) + 18, y: 30, class: 'axl' }, 's·√k, δ·k', ax);
  const gA = P.guide(4, 0.2, { cls: 'c1' }), gB = P.guide(16, 0.8, { cls: 'c2' });
  gA._lines.forEach(l => l.classList.add('c1')); gB._lines.forEach(l => l.classList.add('c2'));
  const dep = P.line(0, 0, 20, 1, { cls: 'ink' });
  const cA = P.fn(k => 0.1 * Math.sqrt(k), { cls: 'c1' });
  const cB = P.fn(k => 0.2 * Math.sqrt(k), { cls: 'c2' });
  const lD = P.text(16.6, 0.975, 'Abschreibung δ·k', { anchor: 'end' });
  const lB = P.text(0.8, 0.63, 'Land B: 0,2·√k', { cls: 'c2', anchor: 'start' });
  const lA = P.text(12.3, 0.265, 'Land A: 0,1·√k', { cls: 'c1', anchor: 'start' });
  const mk = P.g();
  const mArr = V.arrow(mk, `M${P.X(4.8)} ${P.Y(0.05)} L${P.X(15.4)} ${P.Y(0.05)}`, { cls: 'c3', w: 6, head: 24 });
  const mTxt = P.text(12, 0.078, 'mehr Kapital', { cls: 'c3', parent: mk });
  const dA = P.dot(4, 0.2, { cls: 'c1', r: 13 }), dB = P.dot(16, 0.8, { cls: 'c2', r: 13 });
  const kA = P.text(4, 0.2, 'k* = 4', { cls: 'c1', dx: 20, dy: 40, anchor: 'start' });
  const kB = P.text(16, 0.8, 'k* = 16', { cls: 'c2', dx: 18, dy: 46, anchor: 'start' });
  [kA, kB].forEach(t => t.setAttribute('style', 'font-size:34px;font-weight:800'));

  // alles in der Tabelle zunächst verborgen
  gsap.set([...$$('.cal'), ...$$('.val'), ...$$('#tb .rl'), $('#hA'), $('#hB'), $('#hG')], { autoAlpha: 0 });
  gsap.set([$('#e1a'), $('#e1b'), $('#e2a'), $('#e2b'), mTxt], { autoAlpha: 0 });
  const fade = (t, at, d = 0.35) => ctx.to(t, { autoAlpha: 1, duration: d }, at);
  const thick = (el, at) => ctx.to(el, { strokeWidth: 13, duration: 0.25, repeat: 1, yoyo: true, ease: 'sine.inOut' }, at);

  /* ---------- Angaben ---------- */
  ctx.show(ax, 0.9, { y: 0 });
  ctx.show('#tb', 1.2, { y: 24 });
  const tA = T('Land A spart'), tB = T('Land B zwanzig'), tD = T('und jedes Jahr verschleißen');
  ctx.pop('#gA', tA); fade('#hA', tA + 0.2); ctx.draw(cA, tA + 0.3, 1.3).show(lA, tA + 1.3, { y: 0 });
  ctx.pop('#gB', tB); fade('#hB', tB + 0.2); ctx.draw(cB, tB + 0.3, 1.3).show(lB, tB + 1.3, { y: 0 });
  ctx.pop('#gD', tD + 0.5); ctx.draw(dep, tD + 0.6, 1.2).show(lD, tD + 1.5, { y: 0 });
  fade('#hG', tD + 2.0); ctx.to($$('#tb .rl'), { autoAlpha: 1, duration: 0.35, stagger: 0.15 }, tD + 2.1);

  /* ---------- Herleitung ---------- */
  const tS = T('Im Steady State sind');
  ctx.show('#drv', tS, { x: 40, y: 0 });
  thick(cA, T('die Investitionen genau')); thick(cB, T('die Investitionen genau') + 0.15); thick(dep, T('wie die Abschreibungen') + 0.4);
  fade('#e1a', T('Sparquote mal Wurzel k')); fade('#e1b', T('gleich Abschreibungsrate'));
  fade('#e2a', T('Aufgelöst ist')); fade('#e2b', T('k Stern gleich'));
  ctx.pulse('#sq', T('zum Quadrat'), { scale: 1.8 });

  /* ---------- Land A, Land B ---------- */
  const fill = (id, tc, tv) => { fade('#' + id + 'c', tc, 0.3); ctx.pop('#' + id + 'v', tv); };
  const point = (dot, guide, lab, at) => { ctx.pop(dot, at).extend(guide._lines, at + 0.2, 0.6).show(lab, at + 0.3, { y: 0, x: -10 }); };
  const tLA = T('Für Land A');
  ctx.tint('#hA', tLA, { backgroundColor: C.c1bg }).pulse('#gA', tLA, { scale: 1.1 });
  fill('ak', T('ist zwei'), T('zum Quadrat vier') + 0.75); point(dA, gA, kA, T('zum Quadrat vier') + 0.75);
  fill('ay', T('Das Einkommen ist'), T('also zwei') + 0.3);
  fill('ai', T('Investiert werden'), T('null Komma zwei'));
  ctx.to(gA._lines[1], { strokeWidth: 7, duration: 0.25, repeat: 1, yoyo: true }, T('null Komma zwei') + 0.2);
  fill('ac', T('Für den Konsum'), T('eins Komma acht'));
  const tLB = T('Für Land B');
  ctx.tint('#hA', tLB, { backgroundColor: 'rgba(227,234,251,0)' }).tint('#hB', tLB, { backgroundColor: C.c2bg }).pulse('#gB', tLB, { scale: 1.1 });
  fill('bk', T('ist vier'), T('zum Quadrat sechzehn') + 0.75); point(dB, gB, kB, T('zum Quadrat sechzehn') + 0.75);
  fill('by', T('Das Einkommen ist', { n: 2 }), T('Einkommen ist vier') + 0.75);
  fill('bi', T('die Investitionen null'), T('null Komma acht'));
  ctx.to(gB._lines[1], { strokeWidth: 7, duration: 0.25, repeat: 1, yoyo: true }, T('null Komma acht') + 0.2);
  fill('bc', T('der Konsum drei'), T('drei Komma zwei'));

  /* ---------- Diagramm deuten, Botschaft ---------- */
  const tDg = T('Im Diagramm');
  ctx.tint('#hB', tDg, { backgroundColor: 'rgba(249,228,231,0)' });
  ctx.pulse([dA, dB], tDg + 0.6, { scale: 1.6 });
  thick(cA, T('wo die Sparkurve')); thick(cB, T('wo die Sparkurve') + 0.15); thick(dep, T('die Abschreibungsgerade'));
  ctx.pulse([dA, dB], T('schneidet'), { scale: 1.6 });
  ctx.show('#msg', T('Die Botschaft'), { y: 26 });
  ctx.drawArrow(mArr, T('mehr Kapital'), 0.8); fade(mTxt, T('mehr Kapital') + 0.4);
  ctx.pulse([kA, kB], T('mehr Kapital') + 0.3, { scale: 1.12 });
  ctx.pulse($$('#tb tr')[2].querySelectorAll('.val'), T('höheres Einkommen'), { scale: 1.3 });
});
