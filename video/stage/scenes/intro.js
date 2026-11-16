// Intro – die neun Aufgaben im Überblick
V.scene('intro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const tasks = [
    ['BIP und Grundbegriffe', 'Ü 1-3 · 1-5 · F. 91'],
    ['Deflator, VPI, Inflation', 'Ü 1-6'],
    ['Realzins', 'Ü 2-8'],
    ['Kreislauf und Ersparnis', 'Ü 2-4'],
    ['Solow-Modell', 'Ü 3-2'],
    ['IS/LM-Modell', 'Teil II · Ü 4'],
    ['Offene Volkswirtschaft', 'Ü 2-10'],
    ['Klassik gegen Keynes', 'Tabelle'],
    ['Lückentext: AD/AS, Geld', 'Ü 2-7 · 2-9'],
  ];
  // eigene Aufteilung ohne Standardkopf: die Arbeitsfläche füllt die ganze Szene
  const body = ctx.body();
  body.style.cssText = 'left:0;top:0;width:1920px;height:1016px';
  ctx.html(`
  <style>
    #sc-intro .kick{position:absolute;left:96px;top:64px}
    #sc-intro h1{position:absolute;left:96px;top:118px;margin:0;font-size:86px;line-height:1.0;font-weight:900;letter-spacing:-.035em}
    #sc-intro h1 em{font-style:normal;color:var(--c1)}
    #sc-intro .note{position:absolute;left:104px;top:408px;width:620px;padding:14px 14px 16px;background:#fff;border:3px solid var(--ink);box-shadow:10px 10px 0 var(--line)}
    #sc-intro .note img{display:block;width:100%}
    #sc-intro .note .cap{font-family:var(--mono);font-size:21px;font-weight:700;letter-spacing:.08em;color:var(--mute);text-transform:uppercase;margin-top:10px}
    #sc-intro .tape{position:absolute;left:250px;top:-24px;width:150px;height:44px;background:rgba(184,110,0,.32);border:2px solid rgba(184,110,0,.5);transform:rotate(-3deg)}
    #sc-intro .grid{position:absolute;left:840px;top:76px;width:984px;display:grid;grid-template-columns:repeat(3,312px);gap:24px}
    #sc-intro .tile{height:196px;padding:14px 20px 0;position:relative}
    #sc-intro .tile .no{font-family:var(--mono);font-weight:800;font-size:56px;line-height:1;color:var(--c1)}
    #sc-intro .tile .tt{font-weight:700;font-size:27px;line-height:1.12;margin-top:6px;letter-spacing:-.01em}
    #sc-intro .tile .src{position:absolute;left:20px;bottom:14px;font-family:var(--mono);font-weight:700;font-size:20px;padding:2px 9px;border:2px solid var(--line);color:var(--mute);background:var(--panel);white-space:nowrap}
    #sc-intro .steps{position:absolute;left:840px;top:776px;width:984px;display:flex;align-items:center;justify-content:space-between}
    #sc-intro .stp{display:flex;align-items:center;gap:12px;font-size:33px;font-weight:800;letter-spacing:-.01em}
    #sc-intro .sarr{font-family:var(--mono);font-weight:800;font-size:38px;color:var(--mute)}
    #sc-intro .go{position:absolute;left:840px;top:888px;width:984px}
  </style>
  <span class="kick">Makroökonomie · Klausurtraining</span>
  <h1>Die Altklausur:<br><em>alle 9 Aufgaben</em><br>erklärt</h1>
  <div class="note"><div class="tape"></div><img src="assets/klausurnotiz.jpg" alt=""><div class="cap">Gedächtnisprotokoll der letzten Klausur</div></div>
  <div class="grid">${tasks.map((t, i) => `<div class="card tile"><div class="no">${i + 1}</div><div class="tt">${t[0]}</div><div class="src">${t[1]}</div></div>`).join('')}</div>
  <div class="steps">
    <div class="stp"><span class="step">1</span>${V.icon('bulb', 54, { tone: 4 })}<span>Idee</span></div><span class="sarr">→</span>
    <div class="stp"><span class="step">2</span><span class="chip" style="font-size:26px">= …</span><span>Rechenweg</span></div><span class="sarr">→</span>
    <div class="stp"><span class="step">3</span>${V.icon('check', 50)}<span>Ergebnis</span></div>
  </div>
  <div class="res go"><span class="eq lg" style="font-weight:700">Los geht’s mit Aufgabe 1: dem <b>BIP</b></span></div>`);

  const tiles = $$('.tile'), srcs = $$('.tile .src');
  ctx.show('.kick', 0.25, { x: -30, y: 0 });
  ctx.show('h1', 0.4, { y: 40, dur: 0.7 });
  // der Zettel fällt ins Bild
  const note = $('.note');
  gsap.set(note, { autoAlpha: 0, y: -60, rotation: 6, transformOrigin: '50% 0%' });
  ctx.to(note, { autoAlpha: 1, y: 0, rotation: -2.2, duration: 0.7, ease: 'back.out(1.3)' }, 0.75);
  // neun Kacheln
  ctx.pop(tiles, T('Neun Aufgaben'), { stagger: 0.11, scale: 0.7 });
  // „stammen direkt aus den Übungsblättern“: Quellenangaben leuchten auf
  srcs.forEach((s, i) => {
    const t = T('stammen direkt') + i * 0.09;
    ctx.tint(s, t, { backgroundColor: C.c2bg, borderColor: C.c2, color: C.c2 }).pulse(s, t, { scale: 1.12, origin: '0% 50%' });
  });
  // „alle neun der Reihe nach“
  tiles.forEach((t, i) => {
    const tt = T('alle neun der Reihe') + i * 0.13;
    ctx.tint(t, tt, { borderColor: C.c1, boxShadow: `8px 8px 0 ${C.c1bg}` }, 0.15);
    ctx.pulse(t, tt, { scale: 1.07 });
    ctx.tint(t, tt + 0.5, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` }, 0.4);
  });
  const stp = $$('.stp'), sarr = $$('.sarr');
  ctx.show(stp[0], T('erst die Idee'), { y: 24 });
  ctx.show(sarr[0], T('dann der Rechenweg') - 0.15, { x: -16, y: 0 }).show(stp[1], T('dann der Rechenweg'), { y: 24 });
  ctx.show(sarr[1], T('dann das Ergebnis') - 0.15, { x: -16, y: 0 }).show(stp[2], T('dann das Ergebnis'), { y: 24 });
  // „Los geht's mit dem Bruttoinlandsprodukt“
  const tg = T("Los geht's");
  ctx.dim(tiles.slice(1), tg, { to: 0.32 });
  ctx.tint(tiles[0], tg, { borderColor: C.c1, boxShadow: `10px 10px 0 ${C.c1bg}`, backgroundColor: '#fff' });
  ctx.to(tiles[0], { scale: 1.08, duration: 0.45, ease: 'back.out(2)' }, tg);
  ctx.show('.go', tg + 0.2, { y: 26 });
});
