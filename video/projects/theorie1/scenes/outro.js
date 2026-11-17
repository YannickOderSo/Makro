// Outro – alle acht Antworten als Spickzettel
V.scene('outro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Zusammenfassung', title: 'Acht Fragen, <em>acht Antworten</em>' });
  const ov = s => `<span style="text-decoration:overline">${s}</span>`;
  const ans = [
    'vereinfachte Theorien · exogen → Modell → endogen',
    'Wert aller Endprodukte eines Zeitraums',
    'Y = C + I + G + NX',
    'kurz: starre Preise, Keynes · lang: flexible Preise, Klassik',
    'Geld für ein Gut · für einen Korb · Veränderung in %',
    'Tauschmittel · Recheneinheit · Wertaufbewahrungsmittel',
    'nominal wirkt nicht auf real · Geld ist neutral',
    'L<sup>d</sup> sinkt · flexibel: Reallohn ↓ · starr: Arbeitslosigkeit',
  ];
  ctx.html(`
  <style>
    #sc-outro .grid{display:grid;grid-template-columns:repeat(2,852px);gap:14px 24px}
    #sc-outro .tile{height:118px;padding:12px 20px 0;display:flex;gap:18px;align-items:flex-start;position:relative}
    #sc-outro .no{font-family:var(--mono);font-weight:800;font-size:24px;color:var(--bg);background:var(--ink);padding:3px 10px;white-space:nowrap;flex:none;margin-top:4px;min-width:96px;text-align:center}
    #sc-outro .tt{font-weight:800;font-size:28px;line-height:1.1;letter-spacing:-.01em}
    #sc-outro .an{font-size:26px;line-height:1.2;color:var(--mute);font-weight:500;margin-top:4px}
    #sc-outro .tip{left:0;top:540px;width:1728px;height:106px;display:flex;align-items:center;gap:22px;padding:0 28px;font-size:33px;font-weight:800;letter-spacing:-.015em}
    #sc-outro .more{left:0;top:664px;width:1728px;height:106px;display:flex;align-items:center;gap:22px;padding:0 28px;font-size:30px;font-weight:600}
    #sc-outro .luck{position:absolute;left:1190px;top:574px;width:500px;text-align:center;font-weight:900;font-size:80px;letter-spacing:-.03em;color:var(--c2);border:8px solid var(--c2);outline:4px solid var(--c2);outline-offset:8px;background:rgba(250,252,251,.96);padding:14px 0 20px;line-height:1}
  </style>
  <div class="grid">${V.th.topics.map((t, i) => `<div class="card tile"><span class="no">Ü ${t[0]}</span><div><div class="tt">${t[1]}</div><div class="an">${ans[i]}</div></div></div>`).join('')}</div>
  <div class="abs res tip" id="tip">${V.icon('bulb', 66, { tone: 4 })}<span>Erst der eine Satz aus dem Skript – dann ein Beispiel dazu.</span></div>
  <div class="abs card more" id="more">${V.icon('globe', 60, { tone: 1 })}<span>Zum Zeichnen: Übung 2-2 und 2-10 haben ein eigenes Video.</span></div>
  <div class="luck" id="luck">Viel Erfolg!</div>`);

  const tl = $$('.tile');
  ctx.pop(tl, T('Das waren alle') - 0.3, { stagger: 0.1, scale: 0.8 });
  ctx.show('#tip', T('Der Tipp für die Klausur'), { y: 24 });
  ctx.show('#more', T('Die Übungen zwei zwei'), { y: 24 });
  const luck = $('#luck'), tE = T('Viel Erfolg');
  gsap.set(luck, { autoAlpha: 0, scale: 2.2, rotation: -14 });
  ctx.to(luck, { autoAlpha: 1, scale: 1, rotation: -4, duration: 0.32, ease: 'power4.in' }, tE);
  ctx.to(luck, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tE + 0.32);
});
