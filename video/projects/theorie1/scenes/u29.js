// Übung 2-9 – klassische Dichotomie, Neutralität des Geldes, Messung nominaler und realer Variablen
V.scene('u29', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '2-9', title: '<em>Dichotomie</em> und Neutralität', src: 'Skript I, Folien 85–86',
    question: 'a) Klassische Dichotomie? · b) Neutralität des Geldes? · c) Messung nominaler und realer Variablen?',
  });
  const L = V.th.lines(F.ans, [
    '<span class="k">Teil a</span>Theoretische <b>Unterscheidung zwischen realen und nominalen</b> Variablen.',
    'Nominale Größen haben keinen Einfluss auf reale Größen.',
    '<span class="k">Teil b</span>Veränderungen der nominalen <b>Geldmenge</b> haben <b>keinen Einfluss auf reale Größen</b>.',
    'Langfristig ist Geld neutral.',
    '<span class="k">Teil c</span>Nominal: in <b>Geldeinheiten</b>.',
    'Real: in <b>Mengen- bzw. Gütereinheiten</b>.',
  ], 'sm');
  [0, 2, 4].forEach(i => { L[i].style.marginBottom = '4px'; });
  [1, 3].forEach(i => { L[i].style.marginBottom = '18px'; });

  const row = (id, lab, cls, w, mark) => `<div class="rw" id="${id}"><span class="lb">${lab}</span><span class="br ${cls}" style="width:${w}px"></span><span class="mk chip ${mark[1]}">${mark[0]}</span></div>`;
  const ex = (id, a, b) => `<div class="ex" id="${id}"><b>${a}</b><span>${b}</span></div>`;

  F.stage.innerHTML = `
  <style>
    #sc-u29 .thq .qt{font-size:32px}
    #sc-u29 .al.sm{font-size:29px}
    #sc-u29 .part{position:absolute;inset:0}
    #sc-u29 .wd{position:absolute;top:0;width:490px;height:420px;padding:16px 18px 0}
    #sc-u29 .wt{display:flex;align-items:center;justify-content:space-between;height:66px}
    #sc-u29 .wt .chip{font-size:28px;font-family:var(--sans);font-weight:800}
    #sc-u29 .ics{display:flex;align-items:center;gap:8px;height:92px;margin-top:6px}
    #sc-u29 .rw{display:flex;align-items:center;height:72px;gap:8px;font-size:27px;font-weight:700;border-top:2px solid var(--line)}
    #sc-u29 .rw .lb{width:204px;flex:none;white-space:nowrap}
    #sc-u29 .rw .br{height:34px;border:3px solid var(--ink);flex:none}
    #sc-u29 .rw .br.n{background:var(--c4)} #sc-u29 .rw .br.r{background:var(--c3)}
    #sc-u29 .rw .mk{font-size:26px;padding:1px 8px;margin-left:auto}
    #sc-u29 .wall{position:absolute;left:506px;top:-8px;width:44px;height:548px;border:3px solid var(--ink);background:repeating-linear-gradient(135deg,var(--ink) 0 6px,var(--panel) 6px 16px);display:flex;align-items:center;justify-content:center}
    #sc-u29 .wall span{transform:rotate(-90deg);white-space:nowrap;font-family:var(--mono);font-weight:800;font-size:26px;letter-spacing:.12em;text-transform:uppercase;background:var(--panel);padding:2px 12px;border:3px solid var(--ink)}
    #sc-u29 .nl{position:absolute;font-size:28px;font-weight:800;white-space:nowrap}
    #sc-u29 .bot{position:absolute;left:0;top:556px;width:1056px;height:92px;display:flex;align-items:center;justify-content:center;gap:16px}
    #sc-u29 .bot .chip{font-size:27px;font-family:var(--sans);font-weight:700;padding:6px 14px}
    #sc-u29 .bot .ar{font-family:var(--mono);font-weight:800;font-size:36px;color:var(--mute)}
    #sc-u29 .mc{position:absolute;top:0;width:516px;height:480px;padding:18px 22px 0}
    #sc-u29 .mc .mt{display:flex;align-items:center;gap:16px;font-weight:800;font-size:34px;letter-spacing:-.015em;line-height:1.05}
    #sc-u29 .mc .lab{margin:16px 0 6px}
    #sc-u29 .mc .unit{font-size:29px;font-family:var(--sans);font-weight:800;padding:6px 14px}
    #sc-u29 .ex{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:28px;border-top:2px solid var(--line);padding:11px 2px;white-space:nowrap}
    #sc-u29 .ex b{font-weight:800}
    #sc-u29 .ex span{font-size:26px;color:var(--mute);font-weight:500}
    #sc-u29 .br2{position:absolute;left:0;top:500px;width:1056px;height:148px;padding:12px 22px 0}
    #sc-u29 .br2 .eq{font-size:29px;font-weight:700;display:flex;align-items:center;gap:6px}
  </style>

  <!-- Teil a und b: zwei Welten -->
  <div class="part" id="pa">
    <svg class="abs" id="ov" style="left:0;top:0" width="1056" height="648"></svg>
    <div class="card wd" id="wr" style="left:0">
      <div class="wt"><span class="chip c3">Reale Welt</span><span class="small" style="font-size:26px">Güter, Mengen</span></div>
      <div class="ics">${V.icon('factory', 78, { tone: 3 })}${V.icon('people', 70, { tone: 3 })}${V.icon('boxes', 74, { tone: 3 })}</div>
      ${row('r1', 'Produktion Y', 'r', 150, ['=', 'c3'])}${row('r2', 'Beschäftigung', 'r', 130, ['=', 'c3'])}${row('r3', 'Realzins r', 'r', 90, ['=', 'c3'])}
    </div>
    <div class="wall" id="wall"><span>Dichotomie</span></div>
    <div class="card wd" id="wn" style="left:566px">
      <div class="wt"><span class="chip c4">Nominale Welt</span><span class="small" style="font-size:26px">Geld, Preise</span></div>
      <div class="ics" id="notes">${V.icon('note', 52, { tone: 4 }).repeat(4)}</div>
      ${row('n1', 'Geldmenge M', 'n', 80, ['× 2', 'c2'])}${row('n2', 'Preisniveau P', 'n', 80, ['× 2', 'c2'])}${row('n3', 'Nominallohn W', 'n', 80, ['× 2', 'c2'])}
    </div>
    <div class="nl t-c2" id="noe" style="left:640px;top:504px">kein Einfluss</div>
    <div class="abs" id="xw" style="left:504px;top:462px">${V.icon('cross', 48)}</div>
    <div class="nl t-c3" id="rbr" style="left:120px;top:444px;width:250px;text-align:center">real bestimmt real</div>
    <div class="card soft bot" id="bot"><span class="chip c4">Geldmenge × 2</span><span class="ar">→</span><span class="chip c2">Preise × 2</span><span class="ar">·</span><span class="chip c3">reale Größen: unverändert</span></div>
  </div>

  <!-- Teil c: Messung -->
  <div class="part" id="pc">
    <div class="card c4 mc" id="mn" style="left:0">
      <div class="mt">${V.icon('coin', 76, { tone: 4 })}<span>Nominale<br>Variablen</span></div>
      <span class="lab">gemessen in</span><span class="chip c4 unit" id="un">Geldeinheiten (z. B. Euro)</span>
      <div style="margin-top:18px">${ex('e1', 'Nominallohn', '20 € je Stunde')}${ex('e2', 'Nominalzins', 'Zins auf Geldbeträge')}${ex('e3', 'Preisniveau', '€ je Warenkorb')}</div>
    </div>
    <div class="card c3 mc" id="mr" style="left:540px">
      <div class="mt">${V.icon('boxes', 76, { tone: 3 })}<span>Reale<br>Variablen</span></div>
      <span class="lab">gemessen in</span><span class="chip c3 unit" id="ur">Mengen- bzw. Gütereinheiten</span>
      <div style="margin-top:18px">${ex('e4', 'Reallohn', '2 Stück je Stunde')}${ex('e5', 'Realzins', 'Zins in Kaufkraft')}${ex('e6', 'realer Output', 'produzierte Menge')}</div>
    </div>
    <div class="card soft br2" id="br2"><span class="lab" style="margin:0">Die Brücke zwischen beiden (Skript I, Folie 55)</span>
      <div class="eq"><span class="t-c3">Reallohn</span> = ${V.frac('<span class="t-c4">Nominallohn</span>', 'Preisniveau')} = ${V.frac('20 €', '10 € je Stück')} = <b class="t-c3">2 Stück</b></div></div>
  </div>`;

  const lineIn = (i, t) => ctx.show(L[i], t, { x: -20, y: 0 });
  gsap.set($('#pc'), { autoAlpha: 0 });
  const rows = ['#r1', '#r2', '#r3', '#n1', '#n2', '#n3'].map(s => $(s)), marks = $$('#pa .mk'), notes = $$('#notes svg');
  gsap.set(marks, { autoAlpha: 0 });
  gsap.set(rows, { autoAlpha: 0 });
  gsap.set(notes.slice(2), { autoAlpha: 0, scale: 0.4 });
  gsap.set(['#wall', '#noe', '#xw', '#rbr', '#bot'].map(s => $(s)), { autoAlpha: 0 });

  /* ---------- Auftakt: beide Welten ---------- */
  ctx.show('#wr', 1.0, { x: -30, y: 0 }).show('#wn', 1.2, { x: 30, y: 0 });

  /* ---------- Teil a: klassische Dichotomie ---------- */
  const ta = T('Sie ist die theoretische Unterscheidung');
  lineIn(0, ta);
  const wall = $('#wall'); gsap.set(wall, { transformOrigin: '50% 0%', scaleY: 0 });
  ctx.to(wall, { autoAlpha: 1, scaleY: 1, duration: 0.6, ease: 'power3.out' }, ta + 0.3);
  ctx.show(rows.slice(0, 3), T('zwischen realen') + 0.1, { x: -16, y: 0, stagger: 0.12 }).pulse('#wr', T('zwischen realen') + 0.1, { scale: 1.03 });
  ctx.show(rows.slice(3), T('und nominalen Variablen') + 0.1, { x: 16, y: 0, stagger: 0.12 }).pulse('#wn', T('und nominalen Variablen') + 0.1, { scale: 1.03 });
  // nominal → real prallt ab
  const tb = T('Nominale Größen haben keinen Einfluss');
  lineIn(1, tb);
  const ov = $('#ov');
  const push = V.arrow(ov, 'M930 486H566', { cls: 'c2', w: 8, head: 28 });
  ctx.drawArrow(push, tb + 0.4, 0.7, { ease: 'power2.in' });
  ctx.to(push, { x: 26, duration: 0.18, ease: 'power2.out' }, tb + 1.1).to(push, { x: 8, duration: 0.3, ease: 'power2.inOut' }, tb + 1.3);
  ctx.to(wall, { x: -5, duration: 0.07, repeat: 3, yoyo: true }, tb + 1.1);
  ctx.pop('#xw', T('keinen Einfluss auf reale Größen') + 0.2);
  ctx.show('#noe', T('keinen Einfluss auf reale Größen') + 0.3, { y: 10 });
  // real bestimmt real
  const tc = T('Reale Größen werden nur');
  const loop = V.arrow(ov, 'M66 430C66 548 424 548 424 438', { cls: 'c3', w: 7, head: 26 });
  ctx.drawArrow(loop, tc + 0.3, 0.9);
  ctx.show('#rbr', T('durch reale Größen bestimmt'), { y: 10 });
  ctx.pulse(rows.slice(0, 3), T('durch reale Größen bestimmt') + 0.2, { scale: 1.04 });

  /* ---------- Teil b: Neutralität des Geldes ---------- */
  const t2 = T('Veränderungen der nominalen Geldmenge');
  lineIn(2, t2);
  ctx.tint('#n1', t2 + 0.3, { backgroundColor: C.c4bg }).pulse('#n1', t2 + 0.3, { scale: 1.05 });
  ctx.pulse([$('#xw'), wall], T('keinen Einfluss auf reale Größen', { n: 2 }), { scale: 1.12 });
  lineIn(3, T('Langfristig ist Geld'));
  // Experiment: M × 2 → P × 2, real bleibt
  const tm = T('Verdoppelt die Zentralbank');
  const dbl = (r, t) => { ctx.to(r.querySelector('.br'), { width: 160, duration: 1.0, ease: 'power2.inOut' }, t); ctx.pop(r.querySelector('.mk'), t + 0.7); };
  dbl($('#n1'), tm + 0.4);
  ctx.to(notes.slice(2), { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.2 }, tm + 0.6);
  const tp = T('dann verdoppeln sich langfristig die Preise');
  ctx.tint('#n1', tp, { backgroundColor: 'rgba(246,236,217,0)' }).tint('#n2', tp, { backgroundColor: C.c2bg });
  dbl($('#n2'), tp + 0.4); dbl($('#n3'), tp + 1.3);
  const tr = [T('Produktion, Beschäftigung'), T('Beschäftigung und Realzins'), T('und Realzins bleiben') + 0.3];
  ctx.tint('#n2', tr[0], { backgroundColor: 'rgba(249,228,231,0)' });
  [0, 1, 2].forEach(i => { ctx.pop(rows[i].querySelector('.mk'), tr[i]); ctx.pulse(rows[i].querySelector('.br'), tr[i], { scale: 1.06 }); });
  ctx.hide([$('#noe'), $('#rbr')], T('bleiben, wie sie waren') - 0.5);
  ctx.show('#bot', T('bleiben, wie sie waren'), { y: 20 });

  /* ---------- Teil c: Messung ---------- */
  const t3 = T('Teil c');
  ctx.to('#pa', { autoAlpha: 0, duration: 0.3 }, t3 - 0.3).to('#pc', { autoAlpha: 1, duration: 0.3 }, t3);
  const exs = ['#e1', '#e2', '#e3', '#e4', '#e5', '#e6'].map(s => $(s));
  gsap.set(exs, { autoAlpha: 0 });
  gsap.set([$('#un'), $('#ur'), $('#br2'), $('#mn'), $('#mr')], { autoAlpha: 0 });
  ctx.show('#mn', T('Wie werden nominale') + 0.2, { x: -30, y: 0 }).show('#mr', T('und reale Variablen gemessen'), { x: 30, y: 0 });
  const tn = T('Nominale Variablen werden in Geldeinheiten');
  lineIn(4, tn);
  ctx.pop('#un', T('in Geldeinheiten gemessen'));
  ctx.show(exs[0], T('der Nominallohn'), { x: -16, y: 0 }).show(exs[1], T('der Nominalzins'), { x: -16, y: 0 }).show(exs[2], T('oder das Preisniveau'), { x: -16, y: 0 });
  const trl = T('Reale Variablen werden in Mengen');
  lineIn(5, trl);
  ctx.dim('#mn', trl, { to: 0.6 });
  ctx.pop('#ur', T('in Mengen- oder Gütereinheiten'));
  ctx.show(exs[3], T('der Reallohn'), { x: -16, y: 0 }).show(exs[4], T('der Realzins'), { x: -16, y: 0 }).show(exs[5], T('oder der reale Output'), { x: -16, y: 0 });
  ctx.undim('#mn', T('oder der reale Output') + 0.6);
  ctx.show('#br2', T('oder der reale Output') + 0.7, { y: 20 });
});
