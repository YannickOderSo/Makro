// Outro – alle neun Ergebnisse auf einen Blick
V.scene('outro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Zusammenfassung', title: 'Das waren alle <em>neun Aufgaben</em>' });
  const ov = s => `<span style="text-decoration:overline">${s}</span>`;
  const tiles = [
    ['BIP und Grundbegriffe', 'Ü 1-3 · Ü 1-5', `„Wert aller Endprodukte“<br>Y = C + I + G + NX`],
    ['Deflator, VPI, Inflation', 'Ü 1-6', `Index: 100 · 166,7 · 100<br>Inflation: +66,7 % · −40 %`],
    ['Realzins', 'Ü 2-8', `π = 14 % − 5 % = 9 %<br>r = 11 % − 9 % = 2 %`],
    ['Kreislauf und Ersparnis', 'Ü 2-4', `Y = 800 · S = 110 = I<br>c = 560 / 700 = 0,8`],
    ['Solow-Modell', 'Ü 3-2', `k* = (s/δ)²<br>A: k* = 4 · B: k* = 16`],
    ['IS/LM-Modell', 'Teil II · Ü 4', `r = 6 · Y = 1100<br>G↑: 7 | 1200 · M↑: 5,5 | 1150`],
    ['Offene Volkswirtschaft', 'Ü 2-10', `Welt: G↓ → r*↓ → I↑<br>NX = S − I sinkt`],
    ['Klassik gegen Keynes', 'Tabelle', `lang · flexibel · Angebot<br>kurz · starr · Nachfrage`],
    ['Lückentext', 'Ü 2-7 · Ü 2-9', `LRAS senkrecht, SRAS waagerecht<br>Geld: langfristig neutral`],
  ];
  ctx.html(`
  <style>
    #sc-outro .grid{display:grid;grid-template-columns:repeat(3,560px);gap:22px 24px}
    #sc-outro .tile{height:240px;padding:16px 24px 0;position:relative}
    #sc-outro .top{display:flex;align-items:center;gap:16px}
    #sc-outro .no{font-family:var(--mono);font-weight:800;font-size:54px;line-height:1;color:var(--c1)}
    #sc-outro .tt{font-weight:800;font-size:31px;line-height:1.1;letter-spacing:-.01em}
    #sc-outro .rs{font-family:var(--mono);font-weight:500;font-size:27px;line-height:1.42;margin-top:12px;white-space:nowrap}
    #sc-outro .src{position:absolute;right:16px;bottom:14px;font-family:var(--mono);font-weight:700;font-size:21px;padding:2px 10px;border:2px solid var(--line);color:var(--mute);background:var(--panel);white-space:nowrap}
    #sc-outro .ok{position:absolute;right:14px;top:14px}
    #sc-outro .luck{position:absolute;left:414px;top:250px;width:900px;text-align:center;font-family:var(--sans);font-weight:900;font-size:150px;letter-spacing:-.03em;color:var(--c2);border:10px solid var(--c2);outline:5px solid var(--c2);outline-offset:10px;background:rgba(250,252,251,.94);padding:18px 0 26px;line-height:1}
  </style>
  <div class="grid">${tiles.map((t, i) => `<div class="card tile"><div class="top"><span class="no">${i + 1}</span><span class="tt">${t[0]}</span></div><div class="rs">${t[2]}</div><span class="src">${t[1]}</span><span class="ok">${V.icon('check', 46)}</span></div>`).join('')}</div>
  <div class="luck">Viel Erfolg!</div>`);

  const tl = $$('.tile'), src = $$('.src'), ok = $$('.ok');
  const t0 = T('Das waren alle');
  ctx.pop(tl, t0 - 0.3, { stagger: 0.09, scale: 0.75 });
  ctx.pop(ok, t0 + 0.5, { stagger: 0.09 });
  // die genannten Übungen leuchten in ihrer Kachel auf
  const hit = (i, t) => {
    ctx.tint(src[i], t, { backgroundColor: C.c2bg, borderColor: C.c2, color: C.c2 }).pulse(src[i], t, { scale: 1.25, origin: '100% 100%' });
    ctx.tint(tl[i], t, { borderColor: C.c2, boxShadow: `8px 8px 0 ${C.c2bg}` });
  };
  hit(0, T('eins fünf')); hit(1, T('eins sechs')); hit(3, T('zwei vier')); hit(2, T('zwei acht'));
  hit(6, T('zwei zehn')); hit(4, T('drei zwei')); hit(5, T('Übung vier'));
  // Stempel zum Schluss
  const luck = $('.luck'), tE = T('Viel Erfolg');
  gsap.set(luck, { autoAlpha: 0, scale: 2.2, rotation: -14 });
  ctx.dim(tl, tE - 0.1, { to: 0.45 });
  ctx.to(luck, { autoAlpha: 1, scale: 1, rotation: -5, duration: 0.32, ease: 'power4.in' }, tE);
  ctx.to(luck, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tE + 0.32);
});
