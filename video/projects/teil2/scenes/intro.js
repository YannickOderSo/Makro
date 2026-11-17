// Intro – vier Übungen, vier Zeichnungen
V.scene('intro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const body = ctx.body();
  body.style.cssText = 'left:0;top:0;width:1920px;height:1016px';
  // Mini-Diagramm: Achsenkreuz 330 × 200, Inhalt je Übung
  const mini = inner => `<svg class="mini" viewBox="0 0 330 200" width="330" height="200"><path class="ax" d="M34 8V172H322" style="stroke-width:3.5"/>${inner}</svg>`;
  const tiles = [
    ['Übung 1', 'Keynesianisches Kreuz', mini(`<path class="curve ink m" d="M34 172L186 20" style="stroke-width:4"/><path class="curve c1 m" d="M34 124L300 46"/><circle class="pt c3 d" cx="131" cy="96" r="8"/>`)],
    ['Übung 2', 'Geldmarkt', mini(`<path class="curve c4 m" d="M170 172V20"/><path class="curve c1 m" d="M56 26C90 110 190 148 300 156"/><circle class="pt c3 d" cx="170" cy="136" r="8"/>`)],
    ['Übung 3', 'IS/LM: Politik', mini(`<path class="curve old m" d="M70 34L250 156" style="stroke-width:4"/><path class="curve c1 m" d="M116 34L296 156"/><path class="curve c2 m" d="M70 156L270 34"/><path class="curve c3 m" d="M150 62H196" style="stroke-width:4" marker-end="url(#ah-c3)"/>`)],
    ['Übung 4', 'IS/LM mit Zahlen', mini(`<path class="curve c1 m" d="M96 30L280 172"/><path class="curve c2 m" d="M96 172L250 30"/><circle class="pt c3 d" cx="178" cy="94" r="8"/><path class="dash m" d="M178 94V172M178 94H34"/>`)],
  ];
  ctx.html(`
  <style>
    #sc-intro .kick{position:absolute;left:96px;top:64px}
    #sc-intro h1{position:absolute;left:96px;top:136px;margin:0;font-size:104px;line-height:1.02;font-weight:900;letter-spacing:-.035em}
    #sc-intro h1 em{font-style:normal;color:var(--c1)}
    #sc-intro .grid{position:absolute;left:96px;top:392px;width:1728px;display:grid;grid-template-columns:repeat(4,414px);gap:24px}
    #sc-intro .tile{height:384px;padding:18px 22px 0}
    #sc-intro .tile .no{font-family:var(--mono);font-weight:800;font-size:24px;letter-spacing:.1em;text-transform:uppercase;color:var(--bg);background:var(--ink);padding:3px 12px;display:inline-block}
    #sc-intro .tile .tt{font-weight:800;font-size:36px;line-height:1.1;margin:12px 0 10px;letter-spacing:-.015em;height:82px}
    #sc-intro .mini{margin:0 auto}
    #sc-intro .steps{position:absolute;left:96px;top:816px;width:1728px;display:flex;align-items:center;justify-content:space-between}
    #sc-intro .stp{display:flex;align-items:center;gap:16px;font-size:44px;font-weight:800;letter-spacing:-.015em}
    #sc-intro .sarr{font-family:var(--mono);font-weight:800;font-size:50px;color:var(--mute)}
  </style>
  <span class="kick">Makroökonomie · Teil II</span>
  <h1>Übungen 1 bis 4:<br><em>So zeichnest du sie</em></h1>
  <div class="grid">${tiles.map(t => `<div class="card tile"><span class="no">${t[0]}</span><div class="tt">${t[1]}</div>${t[2]}</div>`).join('')}</div>
  <div class="steps">
    <div class="stp"><span class="step">1</span><span>Achsen</span></div><span class="sarr">→</span>
    <div class="stp"><span class="step">2</span><span>Punkte</span></div><span class="sarr">→</span>
    <div class="stp"><span class="step">3</span><span>Linien</span></div><span class="sarr">→</span>
    <div class="stp"><span class="step">4</span><span>Verschiebung</span></div>
  </div>`);

  ctx.show('.kick', 0.25, { x: -30, y: 0 });
  ctx.show('h1', 0.4, { y: 40, dur: 0.7 });
  const tl = $$('.tile');
  ctx.pop(tl, T('vier Übungen') - 0.2, { stagger: 0.13, scale: 0.75 });
  // Die Mini-Zeichnungen entstehen, wenn ihr Thema genannt wird
  const tDraw = [T('das keynesianische Kreuz'), T('den Geldmarkt'), T('das IS-LM-Modell'), T('das IS-LM-Modell') + 0.7];
  tl.forEach((t, i) => {
    const ms = [...t.querySelectorAll('.m')], ds = [...t.querySelectorAll('.d')];
    ms.forEach((m, k) => { if (m.classList.contains('dash')) { gsap.set(m, { autoAlpha: 0 }); ctx.to(m, { autoAlpha: 1, duration: 0.3 }, tDraw[i] + 0.9); } else ctx.draw(m, tDraw[i] + k * 0.3, 0.6); });
    gsap.set(ds, { transformOrigin: '50% 50%' }); ctx.pop(ds, tDraw[i] + 0.8);
    ctx.tint(t, tDraw[i], { borderColor: C.c1, boxShadow: `8px 8px 0 ${C.c1bg}` }, 0.2);
    ctx.tint(t, tDraw[i] + 1.3, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` }, 0.4);
  });
  // „Schritt für Schritt“: Achsen → Punkte → Linien → Verschiebung
  const stp = $$('.stp'), sarr = $$('.sarr');
  const ts = [T('Erst die Achsen'), T('dann die Punkte'), T('dann die Linien'), T('am Ende die Verschiebung')];
  stp.forEach((s, i) => { if (i) ctx.show(sarr[i - 1], ts[i] - 0.15, { x: -16, y: 0 }); ctx.show(s, ts[i], { y: 24 }); });
});
