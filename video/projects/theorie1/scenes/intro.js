/* Gemeinsamer Aufbau aller Fragen-Szenen dieses Videos:
 *   oben die Frage (.thq), links die „Antwort zum Hinschreiben“ (.tha), rechts die Erklärbühne (.ths, 1056 × 648 px).
 *   const F = V.th.frame(ctx, { nr: '1-1', title: '…', src: 'Skript I, Folie 14', question: '…' });
 *   const L = V.th.lines(F.ans, ['Satz 1 mit <b>Schlüsselwort</b>', 'Satz 2']);   // Antwortzeilen, mit ctx.show(L[i], T('…')) einblenden
 *   F.stage  -> leerer Container (position:relative) für Grafiken und Beispiele
 */
V.th = {
  topics: [
    ['1-1', 'Modelle und Variablen', 'gear'], ['1-3', 'Bruttoinlands­produkt', 'factory'], ['1-4', 'Nachfrage­komponenten', 'cart'], ['1-7', 'Zeithorizonte', 'clock'],
    ['2-6', 'Preis, Preisniveau, Inflation', 'tag'], ['2-7', 'Funktionen des Geldes', 'coin'], ['2-9', 'Dichotomie und Neutralität', 'scale'], ['2-13', 'Produktivität und Arbeitsmarkt', 'people'],
  ],
  frame(ctx, o) {
    ctx.header({ kicker: 'Übung ' + o.nr, title: o.title, src: o.src });
    ctx.html(`
      <div class="abs card thq"><span class="chip ink">Frage</span><span class="qt">${o.question}</span></div>
      <div class="abs res tha"><span class="lab">${o.ansTitle || 'Antwort zum Hinschreiben'}</span><div class="thal"></div></div>
      <div class="abs ths"></div>`);
    const q = ctx.$('.thq'), ansBox = ctx.$('.tha'), ans = ctx.$('.thal'), stage = ctx.$('.ths');
    ctx.show(q, o.qAt ?? 0.7, { y: 24 });
    return { q, ansBox, ans, stage };
  },
  lines(host, items, cls = '') { return items.map(h => { const e = V.el(`<p class="al ${cls}">${h}</p>`); host.appendChild(e); return e; }); },
};
document.head.appendChild(V.el(`<style>
  .thq{left:0;top:0;width:1728px;min-height:100px;padding:18px 26px;display:flex;align-items:center;gap:22px}
  .thq .chip{font-size:24px;letter-spacing:.1em;text-transform:uppercase;flex:none}
  .thq .qt{font-size:36px;font-weight:700;line-height:1.2;letter-spacing:-.01em}
  .tha{left:0;top:122px;width:640px;height:648px;padding:20px 26px}
  .tha .lab{font-size:23px}
  .al{margin:0 0 14px;font-size:32px;line-height:1.3;font-weight:500}
  .al.sm{font-size:28px;margin-bottom:10px}
  .al b{font-weight:800;color:var(--c3)}
  .al .k{display:block;font-family:var(--mono);font-size:22px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--c3);margin-bottom:2px}
  .ths{left:672px;top:122px;width:1056px;height:648px}
</style>`));

// Intro – acht Fragen im Überblick
V.scene('intro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const body = ctx.body();
  body.style.cssText = 'left:0;top:0;width:1920px;height:1016px';
  ctx.html(`
  <style>
    #sc-intro .kick{position:absolute;left:96px;top:64px}
    #sc-intro h1{position:absolute;left:96px;top:136px;margin:0;font-size:100px;line-height:1.02;font-weight:900;letter-spacing:-.035em}
    #sc-intro h1 em{font-style:normal;color:var(--c1)}
    #sc-intro .grid{position:absolute;left:96px;top:400px;width:1728px;display:grid;grid-template-columns:repeat(4,414px);gap:22px 24px}
    #sc-intro .tile{height:176px;padding:16px 20px 0;display:flex;gap:18px;align-items:flex-start}
    #sc-intro .tile .no{font-family:var(--mono);font-weight:800;font-size:24px;letter-spacing:.08em;color:var(--bg);background:var(--ink);padding:3px 12px;display:inline-block}
    #sc-intro .tile .tt{font-weight:800;font-size:28px;line-height:1.12;margin-top:10px;letter-spacing:-.015em;hyphens:manual}
    #sc-intro .tile>div{min-width:0}
    #sc-intro .steps{position:absolute;left:96px;top:824px;width:1728px;display:flex;align-items:center;gap:36px}
    #sc-intro .stp{display:flex;align-items:center;gap:18px;font-size:44px;font-weight:800;letter-spacing:-.015em}
    #sc-intro .sarr{font-family:var(--mono);font-weight:800;font-size:50px;color:var(--mute)}
  </style>
  <span class="kick">Makroökonomie · Teil I</span>
  <h1>Alle Theoriefragen:<br><em>beantwortet und erklärt</em></h1>
  <div class="grid">${V.th.topics.map((t, i) => `<div class="card tile">${V.icon(t[2], 70, { tone: (i % 4) + 1 })}<div><span class="no">Ü ${t[0]}</span><div class="tt">${t[1]}</div></div></div>`).join('')}</div>
  <div class="steps">
    <div class="stp" id="s1"><span class="step">1</span>${V.icon('check', 58)}<span>Antwort zum Hinschreiben</span></div><span class="sarr">→</span>
    <div class="stp" id="s2"><span class="step">2</span>${V.icon('bulb', 62, { tone: 4 })}<span>Erklärung dahinter</span></div>
  </div>`);

  ctx.show('.kick', 0.25, { x: -30, y: 0 });
  ctx.show('h1', 0.4, { y: 40, dur: 0.7 });
  const tl = $$('.tile');
  ctx.pop(tl, T('acht Fragen') - 0.3, { stagger: 0.12, scale: 0.75 });
  tl.forEach((t, i) => {
    const tt = T('beantworten wir sie alle') + i * 0.11;
    ctx.tint(t, tt, { borderColor: C.c1, boxShadow: `8px 8px 0 ${C.c1bg}` }, 0.15).pulse(t, tt, { scale: 1.06 });
    ctx.tint(t, tt + 0.5, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` }, 0.4);
  });
  ctx.show('#s1', T('Erst kommt die Antwort'), { y: 24 });
  ctx.show('.sarr', T('Dann folgt') - 0.15, { x: -16, y: 0 }).show('#s2', T('Dann folgt'), { y: 24 });
});
