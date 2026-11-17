// Aufgabe 8 – Tabelle Klassik/Neoklassik gegen Keynes (eine Spalte vorgegeben, die andere ergänzen)
V.scene('a8', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 8', title: '<em>Klassik</em> gegen Keynes', src: 'Skript II, Folien 5, 19, 73' });

  const ov = s => `<span style="text-decoration:overline;text-decoration-thickness:3px">${s}</span>`;
  const it = (icon, label, tone) => `<span class="it">${V.icon(icon, 40, { tone })}<span>${label}</span></span>`;
  // Mini-Diagramm P/Y mit senkrechter oder waagerechter Angebotskurve
  const mini = (kind, col) => `<svg class="mini" width="176" height="100" viewBox="0 0 176 100">
      <path d="M40 8V78H150" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="8" y="30" style="font-size:26px;font-weight:700">P</text><text x="157" y="87" style="font-size:26px;font-weight:700">Y</text>
      ${kind === 'v' ? `<line class="ml" x1="100" y1="74" x2="100" y2="12" stroke="${col}" stroke-width="7" stroke-linecap="round"/>` : `<line class="ml" x1="46" y1="42" x2="144" y2="42" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`}
    </svg>`;
  const dbl = `<svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="25" fill="${C.ink}"/><path d="M14 27h26M20 19l-8 8 8 8M34 19l8 8-8 8" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const ROWS = [
    { h: 82, crit: 'Zeithorizont', kl: `<span><b>mittlere bis lange</b> Frist</span>`, ke: `<span><b>kurze</b> Frist</span>` },
    { h: 82, crit: 'Preise', kl: `<b>flexibel</b>`, ke: `<b>starr</b>` },
    { h: 82, crit: 'Märkte', kl: `<b>Markträumung</b>`, ke: `<span>evtl. <b>keine</b> Markträumung</span>` },
    { h: 82, crit: 'Thema', kl: `<b>Wachstum</b>`, ke: `<b>Konjunktur</b>` },
    { h: 134, col: 1, crit: 'Was bestimmt<br>das Einkommen?',
      kl: `<span class="ttl">das <b>Angebot</b></span><span class="its">${it('gear', 'Kapital', 1)}${it('person', 'Arbeit', 1)}${it('bulb', 'Technologie', 1)}</span>`,
      ke: `<span class="ttl">die <b>Nachfrage</b> <i>= Ausgabenwünsche von</i></span><span class="its">${it('people', 'Haushalten', 2)}${it('factory', 'Unternehmen', 2)}${it('staat', 'Staat', 2)}</span>` },
    { h: 118, crit: 'Angebotskurve', kl: `${mini('v', C.c1)}<span><b>senkrecht</b><i class="tagm">LRAS</i></span>`, ke: `${mini('h', C.c2)}<span><b>waagerecht</b><i class="tagm">SRAS</i></span>` },
    { h: 118, crit: '3. Gleichung<br>im IS/LM-Modell',
      kl: `<span class="eqc p1">Y = ${ov('Y')}</span><span class="adj p2"><span class="mono">r</span> und <span class="mono">P</span><br>passen sich an</span>`,
      ke: `<span class="eqc p1">P = ${ov('P')}</span><span class="adj p2"><span class="mono">r</span> und <span class="mono">Y</span><br>passen sich an</span>` },
  ];
  const HH = 60, W0 = 376, W1 = 673;
  let y = HH;
  const rowsHtml = ROWS.map((r, i) => {
    const top = y; y += r.h; r.top = top;
    return `<div class="abs row" style="top:${top}px;height:${r.h}px">
      <div class="crit"><span>${r.crit}</span></div>
      <div class="cell kl"><div class="cin${r.col ? ' colm' : ''}">${r.kl}</div></div>
      <div class="cell ke"><div class="gapbox"><span>?</span></div><div class="cin${r.col ? ' colm' : ''}">${r.ke}</div></div>
      ${[0, 1, 4].includes(i) ? `<div class="abs pair" style="left:${W0 + W1 - 72}px;top:${r.h / 2 - 27}px">${dbl}</div>` : ''}
    </div>`;
  }).join('');
  const TH = y; // Gesamthöhe innen

  ctx.html(`
  <style>
    #sc-a8 .tb{left:0;top:0;width:1728px;height:${TH + 6}px;border:3px solid var(--ink);background:var(--panel);box-shadow:8px 8px 0 var(--line)}
    #sc-a8 .th{top:0;height:${HH}px;display:flex;align-items:center;padding:0 26px;font-family:var(--mono);font-weight:800;font-size:27px;letter-spacing:.1em;text-transform:uppercase;border-bottom:3px solid var(--ink)}
    #sc-a8 .th.c0{left:0;width:${W0}px;color:var(--mute)}
    #sc-a8 .th.c1h{left:${W0}px;width:${W1}px;color:var(--c1);background:var(--c1bg);border-left:3px solid var(--ink)}
    #sc-a8 .th.c2h{left:${W0 + W1}px;width:${W1}px;color:var(--c2);background:var(--c2bg);border-left:3px solid var(--ink)}
    #sc-a8 .cursor{left:0;width:1722px;background:#e9f0ee;border-left:10px solid var(--ink)}
    #sc-a8 .row{left:0;width:1722px;display:flex;border-top:2px solid var(--line)}
    #sc-a8 .row:first-of-type{border-top:0}
    #sc-a8 .crit{width:${W0}px;display:flex;align-items:center;padding:0 16px 0 30px;font-weight:800;font-size:31px;line-height:1.15}
    #sc-a8 .cell{position:relative;width:${W1}px;border-left:3px solid var(--ink)}
    #sc-a8 .cin{position:relative;height:100%;display:flex;align-items:center;gap:22px;padding:0 30px;font-size:35px;font-weight:600;white-space:nowrap}
    #sc-a8 .cin.colm{flex-direction:column;align-items:flex-start;justify-content:center;gap:6px}
    #sc-a8 .cin b{font-weight:800}
    #sc-a8 .kl .cin b{color:var(--c1)} #sc-a8 .ke .cin b{color:var(--c2)}
    #sc-a8 .cin i{font-style:normal;font-size:27px;font-weight:500;color:var(--mute)}
    #sc-a8 .tagm{display:block;font-family:var(--mono);font-weight:700 !important;letter-spacing:.08em;line-height:1.1}
    #sc-a8 .ttl{line-height:1.1}
    #sc-a8 .its{display:flex;gap:18px;align-items:center}
    #sc-a8 .it{display:inline-flex;align-items:center;gap:8px;font-size:27px;font-weight:600}
    #sc-a8 .eqc{font-family:var(--mono);font-weight:800;font-size:44px}
    #sc-a8 .kl .eqc{color:var(--c1)} #sc-a8 .ke .eqc{color:var(--c2)}
    #sc-a8 .adj{font-size:29px;line-height:1.15;font-weight:600;padding-left:22px;border-left:3px solid var(--line)}
    #sc-a8 .adj .mono{font-weight:800}
    #sc-a8 .gapbox{position:absolute;inset:9px 12px;border:3px dashed var(--old);background:var(--soft);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:38px;color:var(--old)}
    #sc-a8 .pair{z-index:3}
    #sc-a8 .hpair{left:${W0 + W1 - 72}px;top:3px;z-index:3}
  </style>
  <div class="abs tb">
    <div class="abs th c0">Kriterium</div>
    <div class="abs th c1h">Klassik / Neoklassik</div>
    <div class="abs th c2h">Keynes</div>
    <div class="abs cursor" style="top:${HH}px;height:82px"></div>
    <div class="abs hpair">${dbl}</div>
    ${rowsHtml}
  </div>`);

  const rows = $$('.row'), crit = $$('.crit'), klc = $$('.kl .cin'), kec = $$('.ke .cin'), gaps = $$('.gapbox'), qm = $$('.gapbox span');
  const pairs = $$('.pair'), cursor = $('.cursor'), DIM = 0.45;

  /* ---------- Aufbau: Tabelle, vorgegebene Spalte, leere Keynes-Spalte ---------- */
  ctx.show('.tb', T('eine Tabelle') - 0.2, { y: 30 });
  ctx.pulse('.th.c1h', T('Klassik und Neoklassik'), { scale: 1.06 });
  ctx.pulse('.th.c2h', T('mit Keynes') + 0.2, { scale: 1.06 });
  gsap.set([...crit, ...klc], { autoAlpha: 0 });
  gsap.set(cursor, { autoAlpha: 0 });
  gsap.set([...pairs, $('.hpair')], { autoAlpha: 0, scale: 0.3 });
  const tGiven = T('Eine Spalte war vorgegeben');
  crit.forEach((e, i) => ctx.to([e, klc[i]], { autoAlpha: DIM, duration: 0.4 }, tGiven + i * 0.09));
  ctx.tint('.th.c1h', tGiven, { backgroundColor: C.c1, color: '#fff' }).tint('.th.c1h', tGiven + 1.5, { backgroundColor: C.c1bg, color: C.c1 }, 0.5);
  const tOther = T('die andere musstest');
  gsap.set(gaps, { autoAlpha: 0, scale: 0.8 });
  gaps.forEach((g, i) => ctx.to(g, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, tOther + i * 0.08));
  ctx.tint('.th.c2h', tOther, { backgroundColor: C.c2, color: '#fff' }).tint('.th.c2h', tOther + 1.6, { backgroundColor: C.c2bg, color: C.c2 }, 0.5);

  /* ---------- Zeile für Zeile ---------- */
  const fillGap = (i, t) => {
    ctx.to(qm[i], { autoAlpha: 0, duration: 0.2 }, t);
    ctx.set(gaps[i], { borderStyle: 'solid' }, t);
    ctx.tint(gaps[i], t, { borderColor: C.c2, backgroundColor: C.c2bg });
  };
  const focus = (i, t) => {
    ctx.to(cursor, { autoAlpha: 1, top: ROWS[i].top, height: ROWS[i].h, duration: 0.45, ease: 'power3.inOut' }, t - 0.1);
    ctx.to(crit[i], { autoAlpha: 1, duration: 0.3 }, t);
  };
  const klOn = (i, t) => { ctx.to(klc[i], { autoAlpha: 1, duration: 0.3 }, t).pulse(klc[i], t, { scale: 1.05, origin: '0% 50%' }); };
  // einfache Zeilen: [Zeile, Kriterium, Klassik, Keynes]
  [[0, 'Der Zeithorizont', 'mittlere bis lange Frist', 'kurze Frist'],
   [1, 'Die Preise', 'flexibel', 'starr.'],
   [2, 'Die Märkte', 'geräumt', 'eventuell nicht'],
   [3, 'Das Thema', 'Wachstum auf', 'Konjunktur auf'],
  ].forEach(([i, a, b, c]) => {
    focus(i, T(a)); klOn(i, T(b));
    fillGap(i, T(c) - 0.1); ctx.wipe(kec[i], T(c) - 0.1, { dur: 0.6 });
  });

  // Zeile 5: Was bestimmt das Einkommen?
  focus(4, T('Was bestimmt das Einkommen'));
  klOn(4, T('das Angebot'));
  const klIt = [...klc[4].querySelectorAll('.it')], keIt = [...kec[4].querySelectorAll('.it')];
  [T('Kapital,'), T('Arbeit und'), T('Technologie')].forEach((t, k) => ctx.pulse(klIt[k], t, { scale: 1.22 }));
  fillGap(4, T('die Nachfrage') - 0.1);
  ctx.wipe(kec[4].querySelector('.ttl'), T('die Nachfrage') - 0.1, { dur: 0.7 });
  [T('Haushalten'), T('Unternehmen und'), T('Staat.')].forEach((t, k) => ctx.pop(keIt[k], t));

  // Zeile 6: Angebotskurve
  focus(5, T('Die Angebotskurve'));
  klOn(5, T('klassisch senkrecht'));
  const mlK = klc[5].querySelector('.ml'), mlE = kec[5].querySelector('.ml');
  ctx.to(mlK, { attr: { 'stroke-width': 13 }, duration: 0.25, yoyo: true, repeat: 1 }, T('senkrecht'));
  const tW = T('keynesianisch waagerecht');
  fillGap(5, tW - 0.1);
  ctx.wipe(kec[5], tW - 0.1, { dur: 0.55 });
  ctx.draw(mlE, T('waagerecht') - 0.05, 0.6);

  // Zeile 7: dritte Gleichung
  focus(6, T('die dritte Gleichung'));
  const k1 = klc[6].querySelector('.p1'), k2 = klc[6].querySelector('.p2'), e1 = kec[6].querySelector('.p1'), e2 = kec[6].querySelector('.p2');
  klOn(6, T('liegt der Output fest'));
  ctx.pulse(k1, T('liegt der Output fest') + 0.2, { scale: 1.16 });
  ctx.pulse(k2, T('Zins und Preisniveau passen'), { scale: 1.08, origin: '0% 50%' });
  fillGap(6, T('liegt das Preisniveau fest') - 0.1);
  ctx.wipe(e1, T('liegt das Preisniveau fest') - 0.1, { dur: 0.55 });
  ctx.wipe(e2, T('Zins und Output passen'), { dur: 0.6 });

  /* ---------- Der Trick: drei Paare ---------- */
  const tT = T('Merk dir die Paare');
  ctx.to(cursor, { autoAlpha: 0, duration: 0.3 }, tT - 0.2);
  ctx.dim([2, 3, 5, 6].map(i => rows[i]), tT, { to: 0.2 });
  [[0, 'Lang und kurz'], [1, 'flexibel und starr'], [4, 'Angebot und Nachfrage']].forEach(([i, ph], k) => {
    const t = T(ph);
    ctx.to(pairs[k], { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t);
    ctx.tint(rows[i], t, { backgroundColor: '#fff6d8' });
    ctx.pulse(klc[i], t, { scale: 1.06, origin: '0% 50%' }).pulse(kec[i], t + 0.45, { scale: 1.06, origin: '0% 50%' });
  });
  const tE = T('Dann kannst du');
  ctx.undim(rows, tE, { dur: 0.6 });
  ctx.tint([0, 1, 4].map(i => rows[i]), tE, { backgroundColor: 'rgba(255,246,216,0)' }, 0.6);
  ctx.to($('.hpair'), { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, T('jede Spalte'));
  ctx.tint('.th.c1h', T('jede Spalte'), { backgroundColor: C.c1, color: '#fff' }).tint('.th.c2h', T('aus der anderen'), { backgroundColor: C.c2, color: '#fff' });
});
