// Aufgabe 2 b – Verbraucherpreisindex (fester Warenkorb) und Inflationsrate; VPI vs. BIP-Deflator
V.scene('a2b', ctx => {
  const { T, $, $$, tl } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 2 b', title: '<em>VPI</em> und Inflationsrate', src: 'Übung 1-6' });

  const ap = (n, h) => V.icon('apple', h, { tone: 2 }).repeat(n), pe = (n, h) => V.icon('pear', h, { tone: 3 }).repeat(n);
  const a = s => `<span class="t-c2">${s}</span>`, b = s => `<span class="t-c3">${s}</span>`;
  const ycard = (y, pa, pb, calc, cost, idx, left) => `
    <div class="abs card yc" id="y${y}" style="left:${left}px">
      <div class="yh"><span class="yr">${y}</span>${y === 2010 ? '<span class="chip c4 bj">Basisjahr</span>' : ''}</div>
      <div class="pr"><span class="lab">Preise</span><span class="pp" id="pp${y}">${V.icon('apple', 40, { tone: 2 })}<b>${pa}</b> ${V.icon('pear', 40, { tone: 3 })}<b>${pb}</b></span></div>
      <div class="cl" id="cl${y}"><span class="lab">Korb kostet</span><div class="eq cq">${calc}</div><div class="eq cv"><i>=</i> <b id="co${y}">${cost}</b></div></div>
      <div class="ix" id="ix${y}"><span class="lab">VPI</span><div class="eq iq">${V.frac(cost, '15')} · 100</div><div class="eq iv"><i>=</i> <b class="t-c4" id="iv${y}">${idx}</b></div></div>
    </div>`;
  const yes = t => `<span class="cell">${V.icon('check', 54)}<span>${t}</span></span>`, no = t => `<span class="cell no">${V.icon('cross', 54)}<span>${t}</span></span>`;

  ctx.html(`
  <style>
    #sc-a2b .stg{left:0;top:0;width:1728px;height:770px}
    /* Bühne 1 */
    #sc-a2b .bk{left:0;top:0;width:560px;height:606px;padding:22px 26px;text-align:center}
    #sc-a2b .bk .fr{display:flex;justify-content:center;gap:4px;height:62px}
    #sc-a2b .bk .cnt{font-family:var(--mono);font-weight:800;font-size:38px;margin-top:2px}
    #sc-a2b .bk .fix{position:absolute;left:26px;right:26px;bottom:24px;font-family:var(--sans);font-size:28px;padding:8px 10px;white-space:normal;line-height:1.2}
    #sc-a2b .yc{top:0;width:354px;height:606px;padding:18px 24px}
    #sc-a2b .yc .yh{display:flex;align-items:center;gap:14px;height:72px;border-bottom:3px solid var(--ink);margin:0 -24px;padding:0 24px 14px}
    #sc-a2b .yc .yr{font-family:var(--mono);font-weight:800;font-size:58px;line-height:1}
    #sc-a2b .yc .bj{font-size:21px;letter-spacing:.04em;text-transform:uppercase;padding:3px 8px}
    #sc-a2b .yc .lab{font-size:21px;margin-bottom:2px}
    #sc-a2b .yc .pr{margin-top:14px}
    #sc-a2b .yc .pp{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:40px}
    #sc-a2b .yc .pp b{font-weight:800;margin-right:16px}
    #sc-a2b .yc .cl{margin-top:16px;padding-top:12px;border-top:2px solid var(--line)}
    #sc-a2b .yc .cq{font-size:32px;font-weight:600;line-height:1.3}
    #sc-a2b .yc .cv{font-size:62px;font-weight:800;line-height:1.15}
    #sc-a2b .yc .cv b,#sc-a2b .yc .iv b{text-decoration:none}
    #sc-a2b .yc .ix{position:absolute;left:0;right:0;bottom:0;height:226px;padding:12px 24px 0;border-top:2px solid var(--line)}
    #sc-a2b .yc .iq{font-size:30px;font-weight:600;line-height:1.1}
    #sc-a2b .yc .iv{font-size:62px;font-weight:800;line-height:1.2}
    #sc-a2b .fm{left:0;top:640px;width:1728px;height:130px;display:flex;align-items:center;gap:30px;padding:0 34px}
    #sc-a2b .fm .eq{font-size:36px;font-weight:700}
    #sc-a2b .fm .frac{font-family:var(--sans);font-size:31px;font-weight:600}
    /* Bühne 2 */
    #sc-a2b .inf{left:0;top:0;width:860px;height:196px;padding:18px 30px}
    #sc-a2b .inf .eq{font-size:38px;font-weight:700}
    #sc-a2b .inf .frac{font-size:34px}
    #sc-a2b .il{left:0;width:860px;height:178px;padding:0 30px;display:flex;align-items:center;gap:24px}
    #sc-a2b .il .chip{font-size:32px}
    #sc-a2b .il .eq{font-size:42px;font-weight:600}
    #sc-a2b .il .rs{font-size:58px;font-weight:800;margin-left:auto}
    #sc-a2b .il .rs b{text-decoration:none}
    #sc-a2b .memo{left:0;top:634px;width:860px;height:136px;display:flex;align-items:center;gap:22px;font-size:30px;font-weight:600;padding:0 30px}
    #sc-a2b .ch{left:908px;top:0;width:820px;height:770px;padding:0}
    #sc-a2b .ch text{font-weight:800}
    /* Bühne 3 */
    #sc-a2b .zf{left:0;top:0;width:1728px;height:176px;display:flex;align-items:center;gap:44px;padding:0 34px}
    #sc-a2b .zf .grp{display:flex;align-items:center;gap:14px}
    #sc-a2b .zf .nm{font-size:36px;font-weight:800;margin-right:10px}
    #sc-a2b .zf .chip{font-size:34px;padding:6px 16px}
    #sc-a2b .zf .eqs{font-family:var(--mono);font-weight:800;font-size:70px}
    #sc-a2b .zfs{left:1372px;top:42px;font:800 46px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--c2);border:5px solid var(--c2);outline:3px solid var(--c2);outline-offset:5px;padding:6px 22px;background:var(--panel)}
    #sc-a2b .cmp{position:absolute;left:0;top:212px;width:1728px;table-layout:fixed}
    #sc-a2b .cmp th{font-size:32px;letter-spacing:.02em;text-transform:none;font-family:var(--sans);font-weight:800;padding:14px 30px;height:78px;border-left:3px solid var(--ink)}
    #sc-a2b .cmp th:first-child{border-left:0}
    #sc-a2b .cmp th.t-c4{color:var(--c4)} #sc-a2b .cmp th.t-c1{color:var(--c1)}
    #sc-a2b .cmp td{height:160px;padding:0 30px;border-left:3px solid var(--ink);font-size:38px;font-weight:700}
    #sc-a2b .cmp td:first-child{border-left:0}
    #sc-a2b .cmp .rl{display:flex;align-items:center;gap:24px}
    #sc-a2b .cmp .rl .nm{font-size:44px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
    #sc-a2b .cmp .rl .sb{display:block;font-size:27px;font-weight:500;color:var(--mute);letter-spacing:0}
    #sc-a2b .cmp .cell{display:flex;align-items:center;gap:18px}
    #sc-a2b .cmp .cell.no{color:var(--mute)}
  </style>

  <!-- Bühne 1: fester Warenkorb -->
  <div class="abs stg" id="s1">
    <div class="abs card bk" id="bk">
      <span class="lab" style="text-align:left">Warenkorb</span>
      <div class="fr" id="ap1">${ap(5, 58)}</div><div class="fr" id="ap2">${ap(5, 58)}</div>
      <div class="fr" id="pe1">${pe(5, 58)}</div>
      <div id="bki" style="margin-top:6px">${V.icon('basket', 176, { tone: 4 })}</div>
      <div class="cnt" id="cnt"><span id="cA">${a('10 Äpfel')}</span> <span id="cB">+ ${b('5 Birnen')}</span></div>
      <div class="chip c4 fix" id="fix">Korb des Basisjahres 2010<br><b>bleibt fest</b></div>
    </div>
    ${ycard(2010, '1', '1', `${a('10 · 1')} + ${b('5 · 1')}`, '15', '100', 596)}
    ${ycard(2011, '1,5', '2', `${a('10 · 1,5')} + ${b('5 · 2')}`, '25', '166,7', 985)}
    ${ycard(2012, '1', '1', `${a('10 · 1')} + ${b('5 · 1')}`, '15', '100', 1374)}
    <div class="abs res fm" id="fm"><span class="lab" style="margin:0;font-size:26px">Formel</span>
      <span class="eq"><span class="t-c4">VPI</span> = ${V.frac('Kosten des festen Korbs zu heutigen Preisen', 'Kosten des Korbs im Basisjahr')} · 100</span></div>
  </div>

  <!-- Bühne 2: Inflationsrate -->
  <div class="abs stg" id="s2">
    <div class="abs card inf" id="inf"><span class="lab">Prozentuale Veränderung gegenüber dem Vorjahr</span>
      <span class="eq"><span class="t-c2">Inflationsrate</span> = ${V.frac('Index<sub>t</sub> − Index<sub>t−1</sub>', 'Index<sub>t−1</sub>')}</span></div>
    <div class="abs card il" id="il1" style="top:222px"><span class="chip">2011</span><span class="eq">${V.frac('166,7 − 100', '100')}</span><span class="eq rs" id="rs1"><i>=</i> <b class="t-c2">+66,7 %</b></span></div>
    <div class="abs card il" id="il2" style="top:426px"><span class="chip">2012</span><span class="eq">${V.frac('100 − 166,7', '166,7')}</span><span class="eq rs" id="rs2"><i>=</i> <b class="t-c1">−40 %</b></span></div>
    <div class="abs res memo" id="memo"><span class="chip c2">Inflation</span> Index steigt <span style="width:26px"></span> <span class="chip c1">Deflation</span> Index sinkt</div>
    <div class="abs card ch" id="ch"><svg id="csvg" width="820" height="770" viewBox="0 0 820 770"></svg></div>
  </div>

  <!-- Bühne 3: VPI vs. Deflator -->
  <div class="abs stg" id="s3">
    <div class="abs card zf" id="zf">
      <div class="grp"><span class="nm t-c4">VPI</span><span class="chip c4">100</span><span class="chip c4">166,7</span><span class="chip c4">100</span></div>
      <span class="eqs">=</span>
      <div class="grp"><span class="nm t-c1">BIP-Deflator</span><span class="chip c1">100</span><span class="chip c1">166,7</span><span class="chip c1">100</span></div>
    </div>
    <div class="abs zfs" id="zfs">Zufall!</div>
    <table class="tbl cmp" id="cmp">
      <colgroup><col style="width:640px"><col style="width:544px"><col style="width:544px"></colgroup>
      <thead><tr><th>Unterschied</th><th class="t-c4">Verbraucherpreisindex</th><th class="t-c1">BIP-Deflator</th></tr></thead>
      <tbody>
        <tr id="q1"><td><div class="rl">${V.icon('globe', 92, { tone: 4 })}<span class="nm">Importgüter<span class="sb">z. B. Rohstoffe</span></span></div></td><td class="v">${yes('enthalten')}</td><td class="d">${no('nicht enthalten')}</td></tr>
        <tr id="q2"><td><div class="rl">${V.icon('gear', 92, { tone: 1 })}<span class="nm">Kapitalgüter<span class="sb">Maschinen, Anlagen</span></span></div></td><td class="v">${no('nicht enthalten')}</td><td class="d">${yes('enthalten')}</td></tr>
        <tr id="q3"><td><div class="rl">${V.icon('basket', 92, { tone: 4 })}<span class="nm">Warenkorb<span class="sb">welche Güter zählen?</span></span></div></td><td class="v"><span class="cell"><span class="chip c4" style="font-size:40px">fest</span></span></td><td class="d"><span class="cell"><span class="chip c1" style="font-size:40px">variabel</span></span></td></tr>
      </tbody>
    </table>
  </div>`);

  const stageOn = (id, t) => { gsap.set($(id), { autoAlpha: 0 }); ctx.to(id, { autoAlpha: 1, duration: 0.01 }, t - 0.05); };

  /* ---------- Bühne 1: Warenkorb und Jahreskarten ---------- */
  ctx.show('#fm', T('der Verbraucherpreisindex'), { y: 30 });
  const tb = T('Hier bleibt der Warenkorb');
  gsap.set($$('#bk .fr svg'), { autoAlpha: 0 }); gsap.set([$('#cA'), $('#cB')], { autoAlpha: 0 });
  ctx.show('#bk', tb, { x: -40, y: 0 });
  gsap.set($('#fix'), { autoAlpha: 0, scale: 1.4 });
  ctx.to('#fix', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, T('Korb des Basisjahres'));
  ctx.pulse('#bki', T('Korb des Basisjahres'), { scale: 1.08 });
  const drop = (sel, t) => { const e = $$(sel); gsap.set(e, { y: -50, scale: 0.4 }); tl.to(e, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.06 }, t); };
  drop('#ap1 svg, #ap2 svg', T('zehn Äpfel'));
  ctx.to('#cA', { autoAlpha: 1, duration: 0.3 }, T('zehn Äpfel') + 0.3);
  drop('#pe1 svg', T('fünf Birnen'));
  ctx.to('#cB', { autoAlpha: 1, duration: 0.3 }, T('fünf Birnen') + 0.2);

  // Karte eines Jahres: Kopf + Preise, dann Rechnung, dann Kosten, dann Index
  const card = (y, tCard, tCalc, tCost, tIdxCalc, tIdx, cost, idx) => {
    const c = $('#y' + y);
    gsap.set([c.querySelector('.cq'), c.querySelector('.cv'), c.querySelector('.cl .lab'), c.querySelector('.ix')], { autoAlpha: 0 });
    ctx.show(c, tCard, { y: 40 });
    tl.to([c.querySelector('.cl .lab'), c.querySelector('.cq')], { autoAlpha: 1, duration: 0.35 }, tCalc);
    tl.to(c.querySelector('.cv'), { autoAlpha: 1, duration: 0.2 }, tCost);
    ctx.count('#co' + y, cost, tCost, { from: 0, dur: 0.7 }).pulse(c.querySelector('.cv'), tCost + 0.7, { scale: 1.1, origin: '0% 50%' });
    tl.to(c.querySelector('.ix'), { autoAlpha: 1, duration: 0.35 }, tIdxCalc);
    gsap.set(c.querySelector('.iv'), { autoAlpha: 0 });
    tl.to(c.querySelector('.iv'), { autoAlpha: 1, duration: 0.2 }, tIdx);
    ctx.count('#iv' + y, idx, tIdx, { from: 100, dur: idx === 100 ? 0.01 : 1.1, dec: idx % 1 ? 1 : 0 });
    ctx.tint(c.querySelector('.ix'), tIdx, { backgroundColor: C.c4bg }).pulse(c.querySelector('.iv'), tIdx + (idx === 100 ? 0 : 1.1), { scale: 1.1, origin: '0% 50%' });
  };
  const t10 = T('2010 kostet er');
  card(2010, t10, t10 + 0.3, T('kostet er fünfzehn') + 0.55, T('kostet er fünfzehn') + 1.35, T('kostet er fünfzehn') + 1.6, 15, 100);
  const t11 = T('Mit den Preisen von 2011');
  card(2011, t11, T('kostet derselbe Korb'), T('Korb fünfundzwanzig') + 0.35, T('Der Index steigt'), T('auf hundertsechsundsechzig'), 25, 166.7);
  ctx.pulse('#pp2011', t11 + 0.5, { scale: 1.12, origin: '0% 50%' }).tint($$('#pp2011 b'), t11 + 0.5, { color: C.c2 });
  ctx.pulse('#bki', T('derselbe Korb'), { scale: 1.1 }).pulse('#fix', T('derselbe Korb'), { scale: 1.05 });
  ctx.pulse('#fm', T('Der Index steigt'), { scale: 1.02 });
  const t12 = T('2012 kostet der Korb');
  card(2012, t12, t12 + 0.3, T('wieder fünfzehn') + 0.3, T('der Index liegt') - 0.1, T('liegt bei hundert') + 0.3, 15, 100);

  /* ---------- Bühne 2: Inflationsrate ---------- */
  const t2 = T('Die Inflationsrate ist');
  ctx.hide('#s1', t2 - 0.3, { dur: 0.3, y: -16 });
  stageOn('#s2', t2);
  ctx.show('#inf', t2, { x: -40, y: 0 });
  ctx.show('#ch', t2 + 0.15, { x: 40, y: 0 });
  // Balken der drei Indexwerte
  const svg = $('#csvg'), BASE = 668, U = 2.4, BW = 156, CX = [154, 410, 666], IDX = [100, 166.7, 100], YRS = [2010, 2011, 2012];
  const S = (tag, at, txt) => { const e = V.S(tag, at, txt); svg.appendChild(e); return e; };
  S('text', { x: 34, y: 54, style: `font:700 24px var(--mono);letter-spacing:.12em;fill:${C.mute}` }, 'PREISINDEX (VPI), 2010 = 100');
  S('line', { x1: 34, y1: BASE, x2: 790, y2: BASE, class: 'ax' });
  const bar = [], val = [];
  CX.forEach((cx, i) => {
    const h = IDX[i] * U;
    const r = S('rect', { x: cx - BW / 2, y: BASE, width: BW, height: 0, fill: C.c4, stroke: C.ink, 'stroke-width': 4 }); r._h = h;
    const v = S('text', { x: cx, y: BASE - h - 16, 'text-anchor': 'middle', style: `font-size:44px;fill:${C.c4}` }, V.fmt(IDX[i], IDX[i] % 1 ? 1 : 0));
    S('text', { x: cx, y: BASE + 54, 'text-anchor': 'middle', style: 'font-size:40px' }, YRS[i]);
    gsap.set(v, { autoAlpha: 0 }); bar.push(r); val.push(v);
    tl.to(r, { attr: { y: BASE - h, height: h }, duration: 0.7, ease: 'power3.out' }, t2 + 0.5 + i * 0.18);
    tl.to(v, { autoAlpha: 1, duration: 0.3 }, t2 + 1.05 + i * 0.18);
  });
  const top = i => BASE - IDX[i] * U;
  const up = V.arrow(svg, `M${CX[0] + 66} ${top(0) - 34} C${CX[0] + 110} ${top(0) - 40} ${CX[1] - 150} ${top(1) + 40} ${CX[1] - 96} ${top(1) - 26}`, { cls: 'c2', w: 9, head: 30 });
  const dn = V.arrow(svg, `M${CX[1] + 92} ${top(1) - 30} C${CX[1] + 150} ${top(1) - 20} ${CX[2] - 96} ${top(2) - 120} ${CX[2] - 72} ${top(2) - 40}`, { cls: 'c1', w: 9, head: 30 });
  const tag = (x, y, w, txt, col, bg) => { const g = S('g', {}); g.innerHTML = `<rect x="${x}" y="${y}" width="${w}" height="64" fill="${bg}" stroke="${col}" stroke-width="4"/><text x="${x + w / 2}" y="${y + 46}" text-anchor="middle" style="font-size:42px;fill:${col}">${txt}</text>`; gsap.set(g, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }); return g; };
  const tgUp = tag(8, 196, 250, '+66,7 %', C.c2, C.c2bg), tgDn = tag(560, 196, 224, '−40 %', C.c1, C.c1bg);
  const defl = S('g', {}); defl.innerHTML = `<text x="${CX[2]}" y="${BASE - 100 * U / 2 + 14}" text-anchor="middle" style="font:800 24px var(--mono);fill:${C.panel}">DEFLATION</text>`; gsap.set(defl, { autoAlpha: 0 });
  // 2011
  const tA = T('2011 geht es von hundert');
  ctx.show('#il1', tA, { x: -40, y: 0 }); gsap.set($('#rs1'), { autoAlpha: 0 });
  ctx.pulse(bar[0], T('von hundert'), { scale: 1.05, origin: '50% 100%' }).pulse(val[0], T('von hundert'), { scale: 1.25 });
  ctx.pulse(bar[1], T('auf hundertsechsundsechzig', { n: 2 }), { scale: 1.05, origin: '50% 100%' }).pulse(val[1], T('auf hundertsechsundsechzig', { n: 2 }), { scale: 1.25 });
  ctx.drawArrow(up, T('auf hundertsechsundsechzig', { n: 2 }) + 0.2, 0.9);
  const tR1 = T('Das sind plus');
  tl.to($('#rs1'), { autoAlpha: 1, duration: 0.25 }, tR1); ctx.pulse('#rs1', tR1 + 0.6, { scale: 1.12, origin: '100% 50%' });
  tl.to(tgUp, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, tR1 + 0.4);
  ctx.tint('#il1', tR1, { borderColor: C.c2, boxShadow: `8px 8px 0 ${C.c2bg}` });
  // 2012
  const tB = T('2012 geht es zurück');
  ctx.show('#il2', tB, { x: -40, y: 0 }); gsap.set($('#rs2'), { autoAlpha: 0 });
  ctx.drawArrow(dn, tB + 0.4, 0.9);
  ctx.pulse(bar[2], T('zurück auf hundert') + 0.5, { scale: 1.05, origin: '50% 100%' }).pulse(val[2], T('zurück auf hundert') + 0.5, { scale: 1.25 });
  const tR2 = T('Das sind minus');
  tl.to($('#rs2'), { autoAlpha: 1, duration: 0.25 }, tR2); ctx.pulse('#rs2', tR2 + 0.6, { scale: 1.12, origin: '100% 50%' });
  tl.to(tgDn, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, tR2 + 0.4);
  ctx.tint('#il2', tR2, { borderColor: C.c1, boxShadow: `8px 8px 0 ${C.c1bg}` });
  const tD = T('also eine Deflation');
  ctx.show('#memo', tD, { y: 30 });
  tl.to(defl, { autoAlpha: 1, duration: 0.3 }, tD + 0.2);
  tl.to(bar[2], { attr: { fill: C.c1 }, duration: 0.4 }, tD + 0.1);

  /* ---------- Bühne 3: VPI vs. Deflator ---------- */
  const t3 = T('Dass Deflator und');
  ctx.hide('#s2', t3 - 0.3, { dur: 0.3, y: -16 });
  stageOn('#s3', t3);
  ctx.show('#zf', t3, { y: -30 });
  ctx.pop($$('#zf .chip'), t3 + 0.3, { stagger: 0.07 });
  gsap.set($('#zfs'), { autoAlpha: 0, scale: 2, rotation: -14 });
  ctx.to('#zfs', { autoAlpha: 1, scale: 1, rotation: -5, duration: 0.3, ease: 'power3.in' }, T('ist Zufall'));
  // Tabelle: Zeilen zunächst leer, Zellen erscheinen synchron
  const tT = T('Die Unterschiede solltest');
  ctx.show('#cmp', t3 + 0.7, { y: 40 });
  gsap.set($$('#cmp .cell'), { autoAlpha: 0 });
  gsap.set($$('#cmp .rl'), { opacity: 0.22 });
  ctx.pulse($('#cmp th'), tT, { scale: 1.08, origin: '0% 50%' }).tint($('#cmp th'), tT, { color: C.ink });
  const rowOn = (id, tLabel, tV, tD2) => {
    const r = $(id);
    tl.to(r.querySelector('.rl'), { opacity: 1, duration: 0.35 }, tLabel);
    ctx.pulse(r.querySelector('.rl svg'), tLabel, { scale: 1.15 });
    const pop = (c, t) => { gsap.set(c, { scale: 0.6, transformOrigin: '0% 50%' }); tl.to(c, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, t); };
    pop(r.querySelector('.v .cell'), tV); pop(r.querySelector('.d .cell'), tD2);
  };
  rowOn('#q1', T('Importgüter stecken'), T('nur im Verbraucherpreisindex'), T('nur im Verbraucherpreisindex') + 0.9);
  ctx.tint($('#q1 .v'), T('nur im Verbraucherpreisindex'), { backgroundColor: C.c3bg });
  rowOn('#q2', T('Kapitalgüter nur'), T('nur im Deflator') + 0.9, T('nur im Deflator'));
  ctx.tint($('#q2 .d'), T('nur im Deflator'), { backgroundColor: C.c3bg });
  rowOn('#q3', T('Und der Warenkorb'), T('beim Verbraucherpreisindex fest') + 0.9, T('beim Deflator variabel') + 0.5);
});
