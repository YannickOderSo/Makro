// Aufgabe 9 (Teil 2) – Lückentext: Neutralität des Geldes, real/nominal, drei Geldfunktionen
V.scene('a9b', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 9', title: 'Lückentext: <em>Geld</em>', src: 'Übungen 2-7, 2-9' });

  const gap = (s, id) => `<span class="gp" id="${id}"><b>${s}</b></span>`;
  const QS = ['LRAS / SRAS', 'Output, Preise', 'Neutralität', 'real / nominal', 'Geldfunktionen'];
  const chk = `<svg class="chk" width="40" height="40" viewBox="0 0 40 40"><path d="M10 21l7 7 13-16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const note = V.icon('note', 92, { tone: 4 });
  const tag = (price, tone) => `<span class="ptag">${V.icon('tag', 118, { tone })}<b>${price}</b></span>`;

  ctx.html(`
  <style>
    #sc-a9b .qs{left:0;top:0;width:1728px;height:60px;display:flex;gap:12px}
    #sc-a9b .qc{flex:1;display:flex;align-items:center;gap:14px;padding:0 16px;border:3px solid var(--line);background:var(--panel);font-weight:700;font-size:28px;color:var(--mute);white-space:nowrap}
    #sc-a9b .qn{position:relative;flex:none;width:40px;height:40px;border-radius:50%;background:var(--soft);color:var(--mute);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:26px}
    #sc-a9b .qn .chk{position:absolute;inset:0}
    #sc-a9b .gp{display:inline-block;border-bottom:4px solid var(--ink);background:var(--soft);padding:0 14px;margin:0 2px;font-weight:800;line-height:1.22}
    #sc-a9b .gp b{display:inline-block}
    #sc-a9b .stg{left:0;top:84px;width:1728px;height:686px}
    #sc-a9b .q{font-size:50px;font-weight:800;letter-spacing:-.02em}
    /* Frage 3 */
    #sc-a9b .sent{left:0;top:0;width:1728px;font-size:54px;font-weight:700;padding:16px 36px 20px}
    #sc-a9b .pn{top:136px;width:500px;height:550px;padding:22px 28px;display:flex;flex-direction:column;align-items:center}
    #sc-a9b .pn .lab{align-self:flex-start;font-size:25px}
    #sc-a9b .vis{flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;border-bottom:4px solid var(--ink);padding-bottom:0}
    #sc-a9b .notes{display:grid;grid-template-columns:repeat(2,auto);gap:14px 16px;align-self:center}
    #sc-a9b .col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end}
    #sc-a9b .col .v{font-family:var(--mono);font-weight:800;font-size:46px;line-height:1.3}
    #sc-a9b .bar{width:180px;border:4px solid var(--ink);border-bottom:0}
    #sc-a9b .pn .chip{margin-top:18px;font-size:30px;padding:5px 18px}
    /* Frage 4 */
    #sc-a9b .mc{top:84px;width:840px;height:602px;padding:28px 34px}
    #sc-a9b .mc .hd4{display:flex;align-items:center;gap:26px}
    #sc-a9b .mc .ttl{font-size:46px;font-weight:800;letter-spacing:-.015em;line-height:1.1}
    #sc-a9b .mc .ms{font-size:38px;font-weight:600;line-height:1.5;margin-top:18px;white-space:nowrap}
    #sc-a9b .ex{margin-top:22px;background:var(--soft);padding:16px 22px 18px}
    #sc-a9b .ex .lab{margin-bottom:2px}
    #sc-a9b .ex .exl{font-size:36px;font-weight:700}
    #sc-a9b .ex .icons{display:flex;gap:12px;align-items:center;margin-top:10px;height:70px}
    #sc-a9b .ex .unit{font-family:var(--mono);font-weight:800;font-size:44px;margin-left:10px}
    #sc-a9b .more{margin-top:20px;display:flex;gap:14px;align-items:center;font-size:28px;color:var(--mute);font-weight:600}
    /* Frage 5 */
    #sc-a9b .fc{top:84px;width:552px;height:602px;padding:26px 28px;text-align:center}
    #sc-a9b .fc .step{position:absolute;left:22px;top:22px}
    #sc-a9b .fc .gfx{height:230px;display:flex;align-items:center;justify-content:center;gap:16px;margin-top:38px}
    #sc-a9b .fc .ttl{font-size:38px;font-weight:800;letter-spacing:-.02em;margin-top:18px;white-space:nowrap}
    #sc-a9b .fc .ds{font-size:30px;line-height:1.3;color:var(--ink);font-weight:500;margin-top:14px}
    #sc-a9b .ptag{position:relative;display:inline-block}
    #sc-a9b .ptag b{position:absolute;left:14px;top:54px;width:104px;text-align:center;font-family:var(--mono);font-weight:800;font-size:30px;color:#fff;transform:rotate(-44deg)}
    #sc-a9b .cmp{font-family:var(--mono);font-weight:800;font-size:60px}
    #sc-a9b .cap{font-family:var(--mono);font-weight:700;font-size:26px;color:var(--mute);letter-spacing:.06em}
    #sc-a9b .tcol{display:flex;flex-direction:column;align-items:center;gap:6px}
  </style>
  <div class="abs qs">${QS.map((q, i) => `<div class="qc"><span class="qn"><span class="num">${i + 1}</span>${chk}</span><span>${q}</span></div>`).join('')}</div>

  <!-- Frage 3: Neutralität -->
  <div class="abs stg" id="s3">
    <div class="abs card sent">Geld ist in der ${gap('langen', 'g1')} Frist neutral.</div>
    <svg class="abs" id="s3svg" style="left:0;top:0" width="1728" height="686"></svg>
    <div class="abs card c4 pn" id="pM" style="left:0">
      <span class="lab">Geldmenge M · nominal</span>
      <div class="vis" style="border-bottom:0;align-items:center"><div class="notes">${note.repeat(4)}</div></div>
      <span class="chip c4" id="cM">M × 2</span>
    </div>
    <div class="abs card c4 pn" id="pP" style="left:614px">
      <span class="lab">Preisniveau P · nominal</span>
      <div class="vis"><div class="col"><span class="v t-c4" id="vP">P</span><div class="bar" id="bP" style="height:150px;background:var(--c4bg);border-color:var(--c4)"></div></div></div>
      <span class="chip c4" id="cP">P × 2</span>
    </div>
    <div class="abs card c3 pn" id="pY" style="left:1228px">
      <span class="lab">Reale Größen · z. B. Output Y</span>
      <div class="vis"><div class="col"><span class="v t-c3">Y</span><div class="bar" id="bY" style="height:230px;background:var(--c3bg);border-color:var(--c3)"></div></div></div>
      <span class="chip c3" id="cY">bleibt gleich</span>
    </div>
  </div>

  <!-- Frage 4: Messung -->
  <div class="abs stg" id="s4">
    <div class="abs" style="left:0;top:0"><span class="q">Wie wird gemessen?</span></div>
    <div class="abs card c4 mc" id="mN" style="left:0">
      <div class="hd4">${V.icon('coin', 104, { tone: 4 })}<div><span class="lab">nominal</span><div class="ttl t-c4">Nominale Variablen</div></div></div>
      <div class="ms">gemessen in ${gap('Geldeinheiten', 'g2')}</div>
      <div class="ex" id="exN"><span class="lab">Beispiel</span><div class="exl">Nominallohn in Euro</div>
        <div class="icons" id="icN">${V.icon('coin', 62, { tone: 4 }).repeat(5)}<span class="unit t-c4">€</span></div></div>
      <div class="more" id="moN">auch: <span class="chip c4">Nominalzins</span><span class="chip c4">Preisniveau</span></div>
    </div>
    <div class="abs card c3 mc" id="mR" style="left:888px">
      <div class="hd4">${V.icon('basket', 104, { tone: 3 })}<div><span class="lab">real</span><div class="ttl t-c3">Reale Variablen</div></div></div>
      <div class="ms">gemessen in ${gap('Mengen- bzw. Gütereinheiten', 'g3')}</div>
      <div class="ex" id="exR"><span class="lab">Beispiel</span><div class="exl">Reallohn in Gütern</div>
        <div class="icons" id="icR">${V.icon('apple', 62, { tone: 2 })}${V.icon('pear', 62, { tone: 3 })}${V.icon('boxes', 62, { tone: 4 })}${V.icon('computer', 62, { tone: 1 })}${V.icon('car', 62, { tone: 2 })}</div></div>
      <div class="more" id="moR">auch: <span class="chip c3">Realzins</span><span class="chip c3">realer Output</span></div>
    </div>
  </div>

  <!-- Frage 5: Geldfunktionen -->
  <div class="abs stg" id="s5">
    <div class="abs" style="left:0;top:0"><span class="q">Die <span class="t-c4">drei Funktionen</span> des Geldes</span></div>
    <div class="abs card c4 fc" id="f1" style="left:0">
      <span class="step">1</span>
      <div class="gfx"><div class="tcol">${V.icon('cart', 120, { tone: 1 })}<span class="cap">WARE</span></div>
        <svg id="xsvg" width="130" height="120"></svg>
        <div class="tcol">${V.icon('coin', 120, { tone: 4 })}<span class="cap">GELD</span></div></div>
      <div class="ttl">Tauschmittel</div>
      <div class="ds">Kaufen und verkaufen, ohne erst einen passenden Tauschpartner zu suchen</div>
    </div>
    <div class="abs card c4 fc" id="f2" style="left:588px">
      <span class="step">2</span>
      <div class="gfx">${tag('5 €', 1)}<span class="cmp">&lt;</span>${tag('8 €', 2)}</div>
      <div class="ttl">Recheneinheit</div>
      <div class="ds">Preise und Schulden werden vergleichbar</div>
    </div>
    <div class="abs card c4 fc" id="f3" style="left:1176px">
      <span class="step">3</span>
      <div class="gfx" style="gap:10px"><div class="tcol">${V.icon('coin', 96, { tone: 4 })}<span class="cap">HEUTE</span></div>
        <svg id="wsvg" width="230" height="130"></svg>
        <div class="tcol">${V.icon('coin', 96, { tone: 4 })}<span class="cap">MORGEN</span></div></div>
      <div class="ttl">Wertaufbewahrungsmittel</div>
      <div class="ds">Kaufkraft lässt sich in die Zukunft übertragen</div>
    </div>
  </div>`);

  /* ---------- Fragen-Leiste (1 und 2 sind schon erledigt) ---------- */
  const qc = $$('.qc'), qn = $$('.qn'), num = $$('.qn .num'), chks = $$('.qn .chk');
  gsap.set(chks, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' });
  [0, 1].forEach(i => { gsap.set(qc[i], { backgroundColor: C.c3bg, borderColor: C.c3, color: C.c3 }); gsap.set(qn[i], { backgroundColor: C.c3 }); gsap.set(num[i], { autoAlpha: 0 }); gsap.set(chks[i], { autoAlpha: 1, scale: 1 }); });
  const qActive = (i, t) => { ctx.tint(qc[i], t, { backgroundColor: C.ink, borderColor: C.ink, color: '#fff' }).tint(qn[i], t, { backgroundColor: '#fff', color: C.ink }).pulse(qc[i], t, { scale: 1.05 }); };
  const qDone = (i, t) => {
    ctx.tint(qc[i], t, { backgroundColor: C.c3bg, borderColor: C.c3, color: C.c3 }).tint(qn[i], t, { backgroundColor: C.c3 });
    ctx.to(num[i], { autoAlpha: 0, duration: 0.2 }, t).to(chks[i], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t + 0.1);
  };
  const fillGap = (sel, t, col, bg) => {
    const g = $(sel), b = g.querySelector('b');
    gsap.set(b, { autoAlpha: 0, y: -34, scale: 1.4 });
    ctx.to(b, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, t);
    ctx.tint(g, t, { backgroundColor: bg, borderColor: col, color: col });
  };
  ctx.show('.qs', 0.25, { y: -16 });

  /* ---------- Frage 3: Neutralität des Geldes ---------- */
  const t3 = T('Drittens');
  qActive(2, t3);
  ctx.show('.sent', t3 + 0.1, { y: 26 });
  ctx.show(['#pM', '#pP', '#pY'].map(s => $(s)), T('In welcher Frist'), { y: 30, stagger: 0.12 });
  fillGap('#g1', T('langen Frist.'), C.c1, C.c1bg);
  const notes = $$('.notes svg');
  gsap.set([$('#cM'), $('#cP'), $('#cY')], { autoAlpha: 0, scale: 0.5 });
  const chipIn = (sel, t) => ctx.to($(sel), { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, t);
  // Geldmenge verdoppelt sich
  const tM = T('Eine Änderung der Geldmenge');
  gsap.set(notes.slice(2), { autoAlpha: 0, scale: 0.4, y: -30 });
  ctx.to(notes.slice(2), { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.7)', stagger: 0.18 }, tM + 0.2);
  chipIn('#cM', T('Geldmenge verändert'));
  const svg3 = $('#s3svg');
  const ar1 = V.arrow(svg3, 'M512 411L600 411', { cls: 'c4', w: 8, head: 28 });
  const ar2 = V.arrow(svg3, 'M1126 411L1214 411', { cls: 'old', w: 8, head: 28 });
  const xg = V.S('g', {}); xg.innerHTML = `<circle cx="1167" cy="411" r="30" fill="${C.c2}" stroke="${C.ink}" stroke-width="4"/><path d="M1154 398l26 26M1180 398l-26 26" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`; svg3.appendChild(xg);
  gsap.set(xg, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' });
  // … nur die Preise ändern sich
  const tP = T('nur die Preise');
  ctx.drawArrow(ar1, tP - 0.6, 0.5);
  ctx.to($('#bP'), { height: 300, duration: 1.0, ease: 'power2.inOut' }, tP);
  ctx.swap('#vP', '2·P', tP + 0.5);
  chipIn('#cP', tP + 0.8);
  // … reale Größen nicht
  const tY = T('keine realen Größen');
  ctx.drawArrow(ar2, tY - 0.5, 0.5);
  ctx.to(xg, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, tY);
  ctx.pulse('#bY', T('realen Größen'), { scale: 1.06, origin: '50% 100%' });
  chipIn('#cY', T('realen Größen') + 0.15);

  /* ---------- Frage 4: Messung ---------- */
  const t4 = T('Viertens');
  ctx.hide('#s3', t4 - 0.3, { y: -16, dur: 0.3 });
  gsap.set($('#s4'), { autoAlpha: 0 }); ctx.to('#s4', { autoAlpha: 1, duration: 0.01 }, t4 - 0.05);
  qDone(2, t4); qActive(3, t4 + 0.15);
  ctx.show('#s4 .q', T('Wie wird gemessen'), { x: -30, y: 0 });
  gsap.set([$('#exN'), $('#exR'), $('#moN'), $('#moR')], { autoAlpha: 0, y: 20 });
  const up = (sel, t) => ctx.to($(sel), { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, t);
  ctx.show('#mN', T('Nominale Variablen'), { x: -40, y: 0 });
  fillGap('#g2', T('Geldeinheiten'), C.c4, C.c4bg);
  up('#exN', T('zum Beispiel der Nominallohn'));
  ctx.pop($$('#icN > *'), T('Nominallohn in Euro') + 0.5, { stagger: 0.08 });
  up('#moN', T('Nominallohn in Euro') + 1.3);
  ctx.show('#mR', T('Reale Variablen'), { x: 40, y: 0 });
  fillGap('#g3', T('Mengen- oder'), C.c3, C.c3bg);
  up('#exR', T('zum Beispiel der Reallohn'));
  ctx.pop($$('#icR > *'), T('Reallohn in Gütern') + 0.5, { stagger: 0.08 });
  up('#moR', T('Reallohn in Gütern') + 1.2);

  /* ---------- Frage 5: drei Funktionen ---------- */
  const t5 = T('Fünftens');
  ctx.hide('#s4', t5 - 0.3, { y: -16, dur: 0.3 });
  gsap.set($('#s5'), { autoAlpha: 0 }); ctx.to('#s5', { autoAlpha: 1, duration: 0.01 }, t5 - 0.05);
  qDone(3, t5); qActive(4, t5 + 0.15);
  ctx.show('#s5 .q', t5 + 0.1, { x: -30, y: 0 });
  ctx.pulse('#s5 .q .t-c4', T('drei Funktionen'), { scale: 1.08 });
  const ds = $$('.fc .ds'); gsap.set(ds, { autoAlpha: 0, y: 16 });
  // 1 Tauschmittel
  const xs = $('#xsvg');
  const x1 = V.arrow(xs, 'M112 38L22 38', { cls: 'c4', w: 7, head: 24 }), x2 = V.arrow(xs, 'M18 80L108 80', { cls: 'c1', w: 7, head: 24 });
  gsap.set([x1, x2], { autoAlpha: 0 });
  ctx.pop('#f1', T('Tauschmittel') - 0.35, { scale: 0.85 });
  ctx.to(ds[0], { autoAlpha: 1, y: 0, duration: 0.45 }, T('Man kann kaufen'));
  ctx.drawArrow(x1, T('kaufen und'), 0.45).drawArrow(x2, T('verkaufen,'), 0.45);
  // 2 Recheneinheit
  ctx.pop('#f2', T('Recheneinheit') - 0.35, { scale: 0.85 });
  ctx.to(ds[1], { autoAlpha: 1, y: 0, duration: 0.45 }, T('Preise und Schulden'));
  const tags = $$('#f2 .ptag'); gsap.set($('#f2 .cmp'), { autoAlpha: 0, scale: 0.4 });
  ctx.pulse(tags, T('Preise und Schulden'), { scale: 1.12 });
  ctx.to($('#f2 .cmp'), { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, T('vergleichbar'));
  // 3 Wertaufbewahrungsmittel
  const ws = $('#wsvg');
  ws.innerHTML = `<g class="ico" transform="translate(74 12) scale(0.82)">${V.icon('clock', 100, { tone: 1 }).replace(/<\/?svg[^>]*>/g, '')}</g>`;
  const w1 = V.arrow(ws, 'M6 112C70 136 160 136 222 112', { cls: 'c4', w: 7, head: 24 });
  gsap.set(w1, { autoAlpha: 0 });
  ctx.pop('#f3', T('Wertaufbewahrungsmittel') - 0.35, { scale: 0.85 });
  ctx.to(ds[2], { autoAlpha: 1, y: 0, duration: 0.45 }, T('Kaufkraft lässt'));
  ctx.drawArrow(w1, T('in die Zukunft'), 0.9);
  const coin2 = $$('#f3 .tcol')[1]; gsap.set(coin2, { autoAlpha: 0.25 });
  ctx.to(coin2, { autoAlpha: 1, duration: 0.5 }, T('in die Zukunft') + 0.7).pulse(coin2, T('in die Zukunft') + 0.8, { scale: 1.12 });
  qDone(4, ctx.audioEnd + 0.15);
  ctx.pulse($$('.fc .ttl'), ctx.audioEnd + 0.25, { scale: 1.05 });
});
