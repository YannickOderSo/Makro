// Aufgabe 2 a – nominales BIP, reales BIP, BIP-Deflator (Zahlen aus Übung 1-6)
V.scene('a2a', ctx => {
  const { T, $, $$, tl } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 2 a', title: 'Nominal, real, <em>BIP-Deflator</em>', src: 'Übung 1-6' });

  const D = { 2010: [10, 1, 5, 1], 2011: [10, 1.5, 5, 2], 2012: [15, 1, 10, 1] };
  const YEARS = [2010, 2011, 2012];
  const f = v => V.fmt(v, v % 1 ? 1 : 0);
  const row = y => `<tr data-y="${y}">
      <td class="yr"><span>${y}</span>${y === 2010 ? '<i class="base" id="base">Basisjahr</i>' : ''}</td>
      <td class="n" data-k="aq">${f(D[y][0])}</td><td class="n" data-k="ap">${f(D[y][1])}</td>
      <td class="n" data-k="bq">${f(D[y][2])}</td><td class="n" data-k="bp">${f(D[y][3])}</td>
      <td class="n cmp" data-k="nom"><b class="v t-c1"></b></td><td class="n cmp" data-k="real"><b class="v t-c3"></b></td><td class="n cmp" data-k="def"><b class="v t-c4"></b></td>
    </tr>`;
  // Rechenzeile: Jahr-Chip + Rechnung + Ergebnis (+ Kommentar)
  const line = (id, y, calc, res, col, note = '') => `<div class="ln" id="${id}"><span class="chip yc">${y}</span><span class="eq calc">${calc}</span><span class="eq r"><span class="eqs">=</span> <b class="${col}">${res}</b></span>${note}</div>`;
  const a = s => `<span class="t-c2">${s}</span>`, b = s => `<span class="t-c3">${s}</span>`;

  ctx.html(`
  <style>
    #sc-a2a .tbl{position:absolute;left:0;top:0;width:1728px;table-layout:fixed}
    #sc-a2a .tbl th{padding:8px 18px;font-size:24px;text-align:right;white-space:nowrap}
    #sc-a2a .tbl th.grp{text-align:center;font-size:27px;color:var(--ink);border-bottom:2px solid var(--line);padding:6px 10px 4px}
    #sc-a2a .tbl th.grp svg{margin-right:10px;vertical-align:-10px}
    #sc-a2a .tbl th.yh{text-align:left}
    #sc-a2a .tbl th.ch{font-size:27px;color:var(--ink);border-left:3px solid var(--ink)}
    #sc-a2a .tbl td{font-family:var(--mono);font-size:40px;font-weight:500;padding:6px 26px;height:66px;line-height:1}
    #sc-a2a .tbl td.yr{font-weight:800;text-align:left;position:relative;white-space:nowrap}
    #sc-a2a .tbl td.cmp{border-left:3px solid var(--ink);font-size:44px}
    #sc-a2a .tbl td.cmp+td.cmp,#sc-a2a .tbl th.ch+th.ch{border-left:2px solid var(--line)}
    #sc-a2a .tbl td .v{display:inline-block;font-weight:800}
    #sc-a2a .base{position:absolute;left:138px;top:17px;font:700 22px var(--mono);font-style:normal;letter-spacing:.06em;text-transform:uppercase;color:var(--c4);border:3px solid var(--c4);background:var(--c4bg);padding:3px 9px}
    #sc-a2a .pan{left:0;top:322px;width:1040px;height:448px}
    #sc-a2a .ph{display:flex;align-items:center;gap:20px;height:64px;white-space:nowrap}
    #sc-a2a .ph .tt{font-size:42px;font-weight:800;letter-spacing:-.02em}
    #sc-a2a .ph .fm{font-family:var(--mono);font-size:30px;font-weight:500;color:var(--mute)}
    #sc-a2a .ln{position:absolute;left:0;display:flex;align-items:center;gap:22px;white-space:nowrap}
    #sc-a2a .ln .yc{font-size:30px}
    #sc-a2a .ln .eq{font-size:46px;font-weight:600;line-height:1.2}
    #sc-a2a .ln .eq.r{font-weight:800}
    #sc-a2a .ln .eq.r .eqs{font-weight:500}
    #sc-a2a .ln .nt{font-size:27px;font-weight:700;font-family:var(--sans);padding:4px 14px}
    #sc-a2a .road{left:0;top:400px;width:1728px;display:flex;gap:36px}
    #sc-a2a .road .rc{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:18px;font-size:42px;font-weight:800;letter-spacing:-.02em;padding:30px 32px 36px;line-height:1.1}
    #sc-a2a .road .rc .chip{font-size:30px}
    #sc-a2a .chart{left:1080px;top:322px;width:648px;height:448px;padding:0}
    #sc-a2a .chart text{font-size:27px;font-weight:700}
    #sc-a2a .chart .yl{font-size:30px;font-weight:800}
    #sc-a2a .chart .lg{font-size:26px;font-weight:700;font-family:var(--sans)}
    #sc-a2a .chart .tg{font-size:26px;font-weight:700}
  </style>

  <table class="tbl" id="tb">
    <colgroup><col style="width:300px"><col style="width:152px"><col style="width:152px"><col style="width:152px"><col style="width:152px"><col style="width:270px"><col style="width:270px"><col style="width:280px"></colgroup>
    <thead>
      <tr><th class="yh" rowspan="2">Jahr</th>
        <th class="grp b-c2" colspan="2" id="hA">${V.icon('apple', 40, { tone: 2 })}Äpfel</th>
        <th class="grp b-c3" colspan="2" id="hB">${V.icon('pear', 40, { tone: 3 })}Birnen</th>
        <th class="ch" rowspan="2" data-h="nom"><span class="t-c1">nominales BIP</span></th>
        <th class="ch" rowspan="2" data-h="real"><span class="t-c3">reales BIP</span></th>
        <th class="ch" rowspan="2" data-h="def"><span class="t-c4">BIP-Deflator</span></th></tr>
      <tr><th data-hk="aq">Menge</th><th data-hk="ap">Preis</th><th data-hk="bq">Menge</th><th data-hk="bp">Preis</th></tr>
    </thead>
    <tbody>${YEARS.map(row).join('')}</tbody>
  </table>

  <!-- Fahrplan der Aufgabe -->
  <div class="abs road" id="road">
    <div class="card rc" id="r1"><span class="chip c1">Teil a</span> BIP-Deflator</div>
    <div class="card rc" id="r2"><span class="chip c4">Teil b</span> Verbraucherpreisindex</div>
    <div class="card rc" id="r3"><span class="chip c4">Teil b</span> Inflationsrate</div>
  </div>

  <!-- Schritt 1: nominal -->
  <div class="abs pan" id="p1">
    <div class="ph"><span class="step">1</span><span class="tt t-c1">Nominales BIP</span><span class="fm" id="p1f">= Menge · Preis des jeweiligen Jahres</span></div>
    ${line('n10', 2010, `${a('10 · 1')} + ${b('5 · 1')}`, '15', 't-c1')}
    ${line('n11', 2011, `${a('10 · 1,5')} + ${b('5 · 2')}`, '25', 't-c1', '<span class="chip c2 nt" id="nt11">nur die Preise steigen</span>')}
    ${line('n12', 2012, `${a('15 · 1')} + ${b('10 · 1')}`, '25', 't-c1', '<span class="chip c3 nt" id="nt12">Mengen steigen</span>')}
  </div>

  <!-- Schritt 2: real -->
  <div class="abs pan" id="p2">
    <div class="ph"><span class="step">2</span><span class="tt t-c3">Reales BIP</span><span class="fm" id="p2f">= Menge des Jahres · <span class="t-c4" style="font-weight:700">Preis von 2010</span></span></div>
    ${line('r10', 2010, `${a('10 · <u>1</u>')} + ${b('5 · <u>1</u>')}`, '15', 't-c3')}
    ${line('r11', 2011, `${a('10 · <u>1</u>')} + ${b('5 · <u>1</u>')}`, '15', 't-c3', '<span class="chip nt" id="rt11" style="color:var(--mute);border-color:var(--mute)">real nichts gewachsen</span>')}
    ${line('r12', 2012, `${a('15 · <u>1</u>')} + ${b('10 · <u>1</u>')}`, '25', 't-c3', '<span class="chip c3 nt" id="rt12">real gewachsen</span>')}
  </div>

  <!-- Schritt 3: Deflator -->
  <div class="abs pan" id="p3">
    <div class="ph" style="height:84px"><span class="step">3</span><span class="tt t-c4">BIP-Deflator</span><span class="eq" style="font-size:34px;font-weight:700" id="p3f">= ${V.frac('<span class="t-c1">nominales BIP</span>', '<span class="t-c3">reales BIP</span>')} · 100</span></div>
    ${line('d10', 2010, `${V.frac('<span class="t-c1">15</span>', '<span class="t-c3">15</span>')} · 100`, '100', 't-c4')}
    ${line('d11', 2011, `${V.frac('<span class="t-c1">25</span>', '<span class="t-c3">15</span>')} · 100`, '166,7', 't-c4')}
    ${line('d12', 2012, `${V.frac('<span class="t-c1">25</span>', '<span class="t-c3">25</span>')} · 100`, '100', 't-c4')}
  </div>

  <div class="abs card chart" id="chart"><svg id="csvg" width="648" height="448" viewBox="0 0 648 448"></svg></div>`);

  /* ---------- Hilfen ---------- */
  const cell = (y, k) => $(`tr[data-y="${y}"] td[data-k="${k}"]`);
  const cells = (ys, ks) => ys.flatMap(y => ks.map(k => cell(y, k)));
  const hl = (list, t, bg) => ctx.tint(list, t, { backgroundColor: bg }, 0.3);
  const CLR = 'rgba(250,252,251,0)';
  const DATA = ['aq', 'ap', 'bq', 'bp'];
  $$('.ln u').forEach(u => { u.style.cssText = 'text-decoration:none;color:' + C.c4 + ';font-weight:800'; });
  // Zeilen der Rechenfelder positionieren
  const place = (ids, top0, step) => ids.forEach((id, i) => { $('#' + id).style.top = top0 + i * step + 'px'; });
  place(['n10', 'n11', 'n12'], 104, 112); place(['r10', 'r11', 'r12'], 104, 112); place(['d10', 'd11', 'd12'], 100, 118);
  $$('#p3 .ln .eq').forEach(e => { e.style.fontSize = '40px'; });
  // Ergebnis einer Rechenzeile zeigen und in die Tabellenspalte „springen“ lassen
  const fillCell = (y, k, txt, t) => {
    const v = cell(y, k).querySelector('.v'); v.textContent = txt;
    gsap.set(v, { autoAlpha: 0, y: 150, scale: 1.7 });
    tl.to(v, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }, t);
    hl(cell(y, k), t, { nom: C.c1bg, real: C.c3bg, def: C.c4bg }[k]);
  };
  const calcLine = (id, tCalc, tRes, y, k, txt) => {
    const ln = $('#' + id);
    ctx.show([ln.querySelector('.yc'), ln.querySelector('.calc')], tCalc, { x: -24, y: 0, dur: 0.4 });
    ctx.pop(ln.querySelector('.r'), tRes, { scale: 0.6 });
    fillCell(y, k, txt, tRes + 0.3);
  };
  const colOn = (k, t) => { ctx.to($(`th[data-h="${k}"]`), { opacity: 1, duration: 0.35 }, t).pulse($(`th[data-h="${k}"] span`), t, { scale: 1.1 }); };
  const stage = (id, t) => { gsap.set($(id), { autoAlpha: 0 }); ctx.to(id, { autoAlpha: 1, duration: 0.01 }, t - 0.05); ctx.show($$(id + ' .ph > *'), t, { x: -24, y: 0, stagger: 0.08 }); };

  /* ---------- Balkendiagramm nominal / real ---------- */
  const svg = $('#csvg'), BASE = 350, U = 7.4, BW = 74, GX = [128, 328, 528];
  const S = (tag, at, txt) => { const e = V.S(tag, at, txt); svg.appendChild(e); return e; };
  S('line', { x1: 34, y1: BASE, x2: 614, y2: BASE, class: 'ax' });
  S('rect', { x: 40, y: 24, width: 26, height: 26, fill: C.c1 }); S('text', { x: 76, y: 46, class: 'lg' }, 'nominal');
  const lgR = [S('rect', { x: 216, y: 24, width: 26, height: 26, fill: C.c3 }), S('text', { x: 252, y: 46, class: 'lg' }, 'real')];
  const NOM = [15, 25, 25], REAL = [15, 15, 25], DEF = ['100', '166,7', '100'];
  const bars = { nom: [], real: [] }, vals = { nom: [], real: [] }, tags = [], defs = [];
  GX.forEach((gx, i) => {
    S('text', { x: gx, y: BASE + 42, 'text-anchor': 'middle', class: 'yl' }, YEARS[i]);
    [['nom', NOM, -BW - 3, C.c1], ['real', REAL, 3, C.c3]].forEach(([k, arr, dx, col]) => {
      const h = arr[i] * U;
      const r = S('rect', { x: gx + dx, y: BASE, width: BW, height: 0, fill: col, stroke: C.ink, 'stroke-width': 3 }); r._h = h;
      const t = S('text', { x: gx + dx + BW / 2, y: BASE - h - 12, 'text-anchor': 'middle', fill: col }, arr[i]); t.style.fill = col;
      gsap.set([r, t], { autoAlpha: 0 }); bars[k].push(r); vals[k].push(t);
    });
    const d = S('g', {}); d.innerHTML = `<rect x="${gx - 86}" y="62" width="172" height="44" fill="${C.c4bg}" stroke="${C.c4}" stroke-width="3"/><text x="${gx}" y="94" text-anchor="middle" class="tg" style="fill:${C.c4}">${DEF[i]}</text>`;
    gsap.set(d, { autoAlpha: 0 }); defs.push(d);
  });
  const lgD = [S('rect', { x: 366, y: 24, width: 26, height: 26, fill: C.c4bg, stroke: C.c4, 'stroke-width': 3 }), S('text', { x: 402, y: 46, class: 'lg' }, 'Deflator')];
  gsap.set(lgR, { autoAlpha: 0 }); gsap.set(lgD, { autoAlpha: 0 });
  const grow = (k, i, t) => {
    const r = bars[k][i];
    tl.set(r, { autoAlpha: 1 }, t);
    tl.to(r, { attr: { y: BASE - r._h, height: r._h }, duration: 0.6, ease: 'power3.out' }, t);
    tl.to(vals[k][i], { autoAlpha: 1, duration: 0.3 }, t + 0.45);
  };

  /* ---------- Einstieg: Tabelle + Fahrplan ---------- */
  gsap.set($$('#tb td'), { backgroundColor: CLR }); // sonst blendet die Zellfarbe über Grau
  const heads = $$('th[data-h]'); gsap.set(heads, { opacity: 0.28 });
  ctx.show('#tb', 0.9, { y: 30 });
  ctx.show('#r1', T('BIP-Deflator'), { y: 40 });
  ctx.show('#r2', T('Verbraucherpreisindex'), { y: 40 });
  ctx.show('#r3', T('Inflationsrate'), { y: 40 });
  ctx.pulse(root().querySelector('.stamp'), T('Übung eins sechs'), { scale: 1.08 });
  ctx.pulse('#hA', T('Äpfel und Birnen'), { scale: 1.08 }).pulse('#hB', T('und Birnen'), { scale: 1.08 });
  gsap.set($('#base'), { autoAlpha: 0, scale: 1.7 });
  ctx.to('#base', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, T('das Basisjahr'));
  hl(cells([2010], DATA), T('das Basisjahr') + 0.25, C.c4bg);
  hl(cells([2010], DATA), T('Schritt eins') - 0.5, CLR);

  /* ---------- Schritt 1: nominales BIP ---------- */
  const t1 = T('Schritt eins');
  ctx.hide('#road', t1 - 0.3, { dur: 0.3 });
  stage('#p1', t1); gsap.set($('#p1f'), { autoAlpha: 0 }); // Formel erst bei „Menge mal Preis“
  colOn('nom', T('das nominale BIP'));
  ctx.show('#chart', T('das nominale BIP'), { x: 40, y: 0 });
  ctx.show('#p1f', T('Menge mal Preis'), { x: -20, y: 0 });
  // 2010
  hl(cells([2010], DATA), T('2010 sind das'), C.c1bg);
  calcLine('n10', T('2010 sind das'), T('also fünfzehn'), 2010, 'nom', '15'); grow('nom', 0, T('also fünfzehn') + 0.3);
  // 2011: nur die Preise steigen
  const t11 = T('2011 steigen');
  hl(cells([2010], DATA), t11, CLR); hl(cells([2011], DATA), t11, C.c1bg);
  ctx.pulse(cells([2011], ['ap', 'bp']), T('nur die Preise'), { scale: 1.25 }).tint(cells([2011], ['ap', 'bp']), T('nur die Preise'), { color: C.c2 });
  ctx.show('#nt11', T('nur die Preise'), { x: -16, y: 0 });
  calcLine('n11', T('zehn mal eins Komma fünf'), T('ergibt fünfundzwanzig'), 2011, 'nom', '25'); grow('nom', 1, T('ergibt fünfundzwanzig') + 0.3);
  // 2012: Preise zurück, Mengen steigen
  const t12 = T('2012 fallen');
  hl(cells([2011], DATA), t12, CLR); hl(cells([2012], DATA), t12, C.c1bg);
  ctx.tint(cells([2011], ['ap', 'bp']), t12, { color: C.ink });
  ctx.pulse(cells([2012], ['ap', 'bp']), T('die Preise zurück'), { scale: 1.2 });
  ctx.pulse(cells([2012], ['aq', 'bq']), T('die Mengen steigen'), { scale: 1.25 }).tint(cells([2012], ['aq', 'bq']), T('die Mengen steigen'), { color: C.c3 });
  ctx.show('#nt12', T('die Mengen steigen'), { x: -16, y: 0 });
  calcLine('n12', T('die Mengen steigen') - 0.9, T('wieder fünfundzwanzig'), 2012, 'nom', '25'); grow('nom', 2, T('wieder fünfundzwanzig') + 0.3);

  /* ---------- Schritt 2: reales BIP ---------- */
  const t2 = T('Schritt zwei');
  ctx.hide('#p1', t2 - 0.3, { dur: 0.3 });
  hl(cells([2012], DATA), t2 - 0.3, CLR); ctx.tint(cells([2012], ['aq', 'bq']), t2 - 0.3, { color: C.ink });
  hl(cells(YEARS, ['nom']), t2 - 0.3, CLR);
  stage('#p2', t2); gsap.set($('#p2f'), { autoAlpha: 0 });
  colOn('real', T('das reale BIP'));
  ctx.to(lgR, { autoAlpha: 1, duration: 0.3 }, T('das reale BIP'));
  ctx.show('#p2f', T('die Mengen des Jahres'), { x: -20, y: 0 });
  hl(cells(YEARS, ['aq', 'bq']), T('die Mengen des Jahres'), C.c3bg);
  ctx.pulse([$('th[data-hk="aq"]'), $('th[data-hk="bq"]')], T('die Mengen des Jahres'), { scale: 1.15 });
  const tp = T('mit den Preisen von 2010');
  hl(cells([2010], ['ap', 'bp']), tp, C.c4bg);
  ctx.pulse(cells([2010], ['ap', 'bp']), tp, { scale: 1.3 }).tint(cells([2010], ['ap', 'bp']), tp, { color: C.c4, fontWeight: 800 });
  ctx.dim(cells([2011, 2012], ['ap', 'bp']), tp + 0.2, { to: 0.22 });
  ctx.pulse('#base', tp, { scale: 1.2 });
  calcLine('r10', T('Das ergibt fünfzehn') - 0.5, T('Das ergibt fünfzehn') + 0.45, 2010, 'real', '15'); grow('real', 0, T('Das ergibt fünfzehn') + 0.75);
  calcLine('r11', T('fünfzehn und fünfundzwanzig') - 0.45, T('fünfzehn und fünfundzwanzig'), 2011, 'real', '15'); grow('real', 1, T('fünfzehn und fünfundzwanzig') + 0.3);
  calcLine('r12', T('und fünfundzwanzig.') - 0.3, T('und fünfundzwanzig.') + 0.25, 2012, 'real', '25'); grow('real', 2, T('und fünfundzwanzig.') + 0.55);
  // „2011 ist real nichts gewachsen, 2012 schon“
  const tn = T('2011 ist real nichts');
  ctx.show('#rt11', tn, { x: -16, y: 0 });
  ctx.pulse([bars.real[0], bars.real[1]], tn, { scale: 1.06, origin: '50% 100%' }).pulse(cell(2011, 'real').querySelector('.v'), tn, { scale: 1.25 });
  const ts = T('2012 schon');
  ctx.show('#rt12', ts, { x: -16, y: 0 });
  ctx.pulse(bars.real[2], ts, { scale: 1.08, origin: '50% 100%' }).pulse(cell(2012, 'real').querySelector('.v'), ts, { scale: 1.25 });

  /* ---------- Schritt 3: Deflator ---------- */
  const t3 = T('Schritt drei');
  ctx.hide('#p2', t3 - 0.3, { dur: 0.3 });
  hl(cells(YEARS, ['aq', 'bq']), t3 - 0.3, CLR); hl(cells([2010], ['ap', 'bp']), t3 - 0.3, CLR); hl(cells(YEARS, ['real']), t3 - 0.3, CLR);
  ctx.tint(cells([2010], ['ap', 'bp']), t3 - 0.3, { color: C.ink, fontWeight: 500 }).undim(cells([2011, 2012], ['ap', 'bp']), t3 - 0.3);
  ctx.dim(cells(YEARS, DATA), t3, { to: 0.4 });
  stage('#p3', t3); gsap.set($('#p3f'), { autoAlpha: 0 });
  colOn('def', T('der Deflator'));
  ctx.to(lgD, { autoAlpha: 1, duration: 0.3 }, T('der Deflator'));
  ctx.show('#p3f', T('nominal geteilt durch real'), { x: -20, y: 0 });
  hl(cells(YEARS, ['nom']), T('nominal geteilt'), C.c1bg); ctx.pulse($('th[data-h="nom"] span'), T('nominal geteilt'), { scale: 1.1 });
  hl(cells(YEARS, ['real']), T('durch real'), C.c3bg); ctx.pulse($('th[data-h="real"] span'), T('durch real'), { scale: 1.1 });
  const dstep = (id, i, y, tC, tR, txt) => {
    calcLine(id, tC, tR, y, 'def', txt);
    ctx.pulse([cell(y, 'nom').querySelector('.v'), cell(y, 'real').querySelector('.v')], tC, { scale: 1.2 });
    tl.to(defs[i], { autoAlpha: 1, duration: 0.35 }, tR + 0.3);
  };
  dstep('d10', 0, 2010, T('2010 sind das genau'), T('genau hundert'), '100');
  dstep('d11', 1, 2011, T('2011 fünfundzwanzig durch'), T('also hundertsechsundsechzig'), '166,7');
  dstep('d12', 2, 2012, T('Und 2012 wieder'), T('wieder hundert') + 0.25, '100');
  // Schlussbild: Tabelle wieder voll lesbar, Deflator-Spalte betont
  const te = T('wieder hundert') + 1.1;
  ctx.undim(cells(YEARS, DATA), te);
  ctx.pulse(cells(YEARS, ['def']).map(c => c.querySelector('.v')), te, { scale: 1.15 });

  function root() { return ctx.el; }
});
