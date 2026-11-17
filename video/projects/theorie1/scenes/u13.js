// Übung 1-3 – Was ist das Bruttoinlandsprodukt?
V.scene('u13', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '1-3', title: 'Das <em>Bruttoinlandsprodukt</em>', src: 'Skript I, Folien 23–30',
    question: 'Was ist das (nominale) Bruttoinlandsprodukt (BIP)?',
  });
  const L = V.th.lines(F.ans, [
    `<span class="w">Das BIP ist der <b id="kW">Wert</b></span> <span class="w">aller <b id="kE">Endprodukte</b></span> <span class="w">einer Volkswirtschaft,</span> <span class="w">die in einem bestimmten,</span> <span class="w">abgeschlossenen <b id="kZ">Zeitraum</b></span> <span class="w">erzeugt werden.</span>`,
  ], 'main');
  const L2 = V.th.lines(F.ans, [
    '<span class="k" style="color:var(--c2)">Zählt nicht</span>gebrauchte Güter, Hausarbeit, Schattenwirtschaft',
    '<span class="k">Drei Seiten</span>Entstehung = Verwendung = Verteilung',
  ], 'sm');

  const row = (id, icon, tone, title, why, ok) => `<div class="rw" id="${id}">${V.icon(icon, 76, { tone })}<div><div class="rt">${title}</div><div class="rs">${why}</div></div><span class="mk">${V.icon(ok ? 'check' : 'cross', 44)}</span></div>`;
  F.stage.innerHTML = `
  <style>
    #sc-u13 .al.main{font-size:39px;line-height:1.3;font-weight:600;margin-bottom:22px}
    #sc-u13 .al.main b{display:inline-block}
    #sc-u13 .al.sm{margin-top:14px}
    #sc-u13 .kc{top:0;width:336px;height:640px;padding:22px 22px 0;text-align:center}
    #sc-u13 .kc .kw{font-size:40px;font-weight:900;letter-spacing:-.02em;line-height:1.1}
    #sc-u13 .kc .pic{height:170px;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:10px}
    #sc-u13 .kc .tx{font-size:29px;line-height:1.28;font-weight:500;margin-top:10px;text-align:left}
    #sc-u13 .kc .ex{position:absolute;left:22px;right:22px;bottom:22px;font-family:var(--mono);font-size:26px;font-weight:700;line-height:1.35;padding:10px 12px;text-align:left;border:3px solid var(--line);background:var(--soft)}
    #sc-u13 .pt{font-family:var(--mono);font-weight:700;font-size:26px;display:block;margin-top:2px}
    #sc-u13 .col{top:0;width:516px;height:640px;padding:0}
    #sc-u13 .col .hd2{height:66px;display:flex;align-items:center;gap:12px;padding:0 20px;font-size:32px;font-weight:800;border-bottom:3px solid var(--ink)}
    #sc-u13 .rw{height:188px;display:flex;align-items:center;gap:18px;padding:0 64px 0 20px;border-bottom:2px solid var(--line);position:relative}
    #sc-u13 .rw:last-child{border-bottom:0}
    #sc-u13 .rw svg.ico{flex:none}
    #sc-u13 .rw .rt{font-size:30px;font-weight:800;line-height:1.12;letter-spacing:-.01em}
    #sc-u13 .rw .rs{font-size:26px;line-height:1.2;color:var(--mute);font-weight:500;margin-top:4px}
    #sc-u13 .rw .mk{position:absolute;right:14px;top:14px}
    #sc-u13 .side{top:0;width:320px;height:430px;padding:22px 16px 0;text-align:center}
    #sc-u13 .side .st{font-size:36px;font-weight:900;letter-spacing:-.02em;margin-top:8px}
    #sc-u13 .side .ss{font-family:var(--mono);font-size:26px;font-weight:700;margin-top:6px}
    #sc-u13 .side .sq{font-size:27px;line-height:1.25;color:var(--mute);font-weight:500;margin-top:12px}
    #sc-u13 .eqs{top:170px;width:48px;text-align:center;font-family:var(--mono);font-weight:800;font-size:64px}
  </style>

  <!-- Phase 1: die drei Schlüsselwörter -->
  <div class="abs card kc c1" id="k1" style="left:0">
    <div class="kw t-c1">Wert</div>
    <div class="pic" id="p1"><span>${V.icon('car', 84, { tone: 1 })}<span class="pt t-c1">10.000 €</span></span><span style="font:800 44px var(--mono)">+</span><span>${V.icon('computer', 84, { tone: 4 })}<span class="pt t-c4">1.000 €</span></span></div>
    <div class="tx" id="x1">Güter werden mit ihren <b>Marktpreisen</b> bewertet – so kann man sie addieren.</div>
    <div class="ex" id="e1">4 Autos + 5 Computer<br>= 45.000 €</div>
  </div>
  <div class="abs card kc c2" id="k2" style="left:360px">
    <div class="kw t-c2">Endprodukte</div>
    <div class="pic" id="p2">${V.icon('gear', 64, { tone: 4 })}<span style="font:800 40px var(--mono);color:var(--mute)">→</span>${V.icon('car', 100, { tone: 2 })}</div>
    <div class="tx" id="x2"><b>Zwischenprodukte</b> zählen nicht extra – sonst würden sie doppelt gezählt.</div>
    <div class="ex" id="e2">Auto 10.000 € ✓<br>Teile 3.000 € ✗</div>
  </div>
  <div class="abs card kc c4" id="k3" style="left:720px">
    <div class="kw t-c4">Zeitraum</div>
    <div class="pic" id="p3">${V.icon('clock', 110, { tone: 4 })}</div>
    <div class="tx" id="x3">Es zählt nur, was in diesem Jahr <b>neu produziert</b> wurde.</div>
    <div class="ex" id="e3">neu produziert ✓<br>gebraucht ✗</div>
  </div>

  <!-- Phase 2: Sonderfälle -->
  <div class="abs card col" id="cY" style="left:0">
    <div class="hd2 b-c3">${V.icon('check', 40)}<span>Zählt zum BIP</span></div>
    ${row('rL', 'boxes', 4, 'Produktion auf Lager', 'zählt als Lagerinvestition', true)}
    ${row('rW', 'house', 1, 'Selbst genutzter Wohnraum', 'fiktive Miete wird angesetzt', true)}
    ${row('rS', 'shield', 2, 'Polizei, Feuerwehr', 'kein Marktpreis – gehen mit ihren Kosten ein', true)}
  </div>
  <div class="abs card col" id="cN" style="left:540px">
    <div class="hd2 b-c2">${V.icon('cross', 40)}<span>Zählt nicht</span></div>
    ${row('rG', 'car', 3, 'Gebrauchte Güter', 'nur Vermögen wechselt den Besitzer', false)}
    ${row('rH', 'person', 1, 'Unbezahlte Hausarbeit', 'wird nicht entlohnt', false)}
    ${row('rX', 'note', 4, 'Schattenwirtschaft', 'wird nicht erfasst', false)}
  </div>

  <!-- Phase 3: drei Seiten -->
  <div class="abs card side" id="s1" style="left:0">${V.icon('factory', 110, { tone: 3 })}<div class="st t-c3">Entstehung</div><div class="ss">Wertschöpfung</div><div class="sq">Was wird auf den Produktionsstufen geschaffen?</div></div>
  <div class="abs eqs" id="q1" style="left:324px">=</div>
  <div class="abs card side" id="s2" style="left:368px">${V.icon('cart', 110, { tone: 1 })}<div class="st t-c1">Verwendung</div><div class="ss">Ausgaben</div><div class="sq">Wofür wird das Produzierte gekauft?</div></div>
  <div class="abs eqs" id="q2" style="left:692px">=</div>
  <div class="abs card side" id="s3" style="left:736px">${V.icon('people', 110, { tone: 4 })}<div class="st t-c4">Verteilung</div><div class="ss">Einkommen</div><div class="sq">Wer verdient an der Produktion?</div></div>
  <div class="abs res" id="s4" style="left:0;top:468px;width:1048px;height:172px;display:flex;flex-direction:column;justify-content:center;padding:0 30px">
    <span style="font-size:38px;font-weight:800;letter-spacing:-.015em">Drei Seiten – <span class="t-c3">dieselbe Zahl</span>: das BIP</span>
    <span style="font-family:var(--mono);font-size:28px;font-weight:700;margin-top:8px">Wertschöpfung = Ausgaben = Einkommen</span></div>`;

  /* ---------- Antwortsatz ---------- */
  const ws = [...L[0].querySelectorAll('.w')], kw = [$('#kW'), $('#kE'), $('#kZ')];
  const tW = [T('Das BIP ist der Wert'), T('aller Endprodukte'), T('einer Volkswirtschaft'), T('die in einem bestimmten'), T('abgeschlossenen Zeitraum'), T('erzeugt werden')];
  gsap.set(ws, { opacity: 0 });
  ws.forEach((w, i) => ctx.to(w, { opacity: 1, duration: 0.35 }, tW[i]));
  gsap.set(L2, { autoAlpha: 0 });

  /* ---------- Phase 1: drei Karten ---------- */
  const kc = [$('#k1'), $('#k2'), $('#k3')];
  const inner = i => [$(`#p${i + 1}`), $(`#x${i + 1}`), $(`#e${i + 1}`)];
  kc.forEach((k, i) => { gsap.set(inner(i), { autoAlpha: 0 }); gsap.set(k, { autoAlpha: 0, y: 30 }); });
  // während der Frage stehen die drei Karten schon als leere Platzhalter da; beim Antwortsatz leuchten sie auf
  ctx.to(kc, { autoAlpha: 0.45, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 1.1);
  const tK = [T('der Wert'), T('Endprodukte'), T('Zeitraum')];
  kc.forEach((k, i) => { ctx.to(k, { autoAlpha: 1, duration: 0.3 }, tK[i]).pulse(k, tK[i], { scale: 1.04 }); ctx.to(inner(i)[0], { autoAlpha: 1, duration: 0.4 }, tK[i] + 0.2); });
  // „Jedes Stück dieses Satzes hat eine Bedeutung“
  const tJ = T('Jedes Stück');
  ctx.dim(kc, tJ, { to: 0.45 });
  const tH = [T('Wert heißt'), T('Endprodukte heißt'), T('Und Zeitraum heißt')];
  const tX = [T('Die Güter werden'), T('Zwischenprodukte zählen'), T('Es zählt nur')];
  const tE = [T('damit man sie addieren'), T('sonst würde man sie doppelt'), T('neu produziert wurde')];
  kc.forEach((k, i) => {
    ctx.undim(k, tH[i]).pulse(kw[i], tH[i], { scale: 1.25 });
    ctx.tint(kw[i], tH[i], { color: [C.c1, C.c2, C.c4][i] });
    if (i > 0) ctx.dim(kc[i - 1], tH[i], { to: 0.6 });
    ctx.to(inner(i)[1], { autoAlpha: 1, duration: 0.35 }, tX[i]);
    ctx.to(inner(i)[2], { autoAlpha: 1, duration: 0.35 }, tE[i]);
  });
  ctx.undim(kc, T('neu produziert wurde') + 1.2);

  /* ---------- Phase 2: Sonderfälle ---------- */
  const t2 = T('Daraus folgen');
  ctx.hide(kc, t2 - 0.35, { dur: 0.3 });
  ctx.tint(kw, t2, { color: C.c3 });
  const rows = { rG: T('Der Verkauf gebrauchter'), rL: T('Was auf Lager'), rW: T('Für selbst genutzten'), rS: T('Und Leistungen des Staates'), rH: T('unbezahlte Arbeit'), rX: T('die Schattenwirtschaft') };
  const why = { rG: T('denn dabei wechselt'), rL: T('als Lagerinvestition'), rW: T('eine fiktive Miete'), rS: T('gehen mit ihren Kosten'), rH: T('unbezahlte Arbeit') + 0.4, rX: T('die Schattenwirtschaft') + 0.4 };
  ctx.show(['#cY', '#cN'].map(s => $(s)), t2, { y: 26, stagger: 0.12 });
  for (const id in rows) {
    const r = $('#' + id), parts = [r.querySelector('svg.ico'), r.querySelector('.rt')], rs = r.querySelector('.rs'), mk = r.querySelector('.mk');
    gsap.set([...parts, rs, mk], { autoAlpha: 0 });
    ctx.to(parts, { autoAlpha: 1, duration: 0.35 }, rows[id]);
    ctx.to(rs, { autoAlpha: 1, duration: 0.35 }, why[id]);
    ctx.pop(mk, why[id] + 0.15);
  }
  ctx.to(L2[0], { autoAlpha: 1, duration: 0.4 }, T('Nicht erfasst'));

  /* ---------- Phase 3: drei Seiten ---------- */
  const t3 = T('Außerdem kannst du');
  ctx.hide(['#cY', '#cN'].map(s => $(s)), t3 - 0.35, { dur: 0.3 });
  const sd = [$('#s1'), $('#s2'), $('#s3')], tS = [T('Entstehung'), T('Verwendung, also'), T('Und Verteilung')];
  gsap.set(sd, { autoAlpha: 0, y: 26 });
  ctx.to(sd, { autoAlpha: 0.4, y: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out' }, t3);
  sd.forEach((s, i) => { ctx.to(s, { autoAlpha: 1, duration: 0.3 }, tS[i]).pulse(s, tS[i], { scale: 1.04 }); });
  gsap.set([$('#q1'), $('#q2')], { autoAlpha: 0 });
  const t4 = T('Alle drei ergeben');
  ctx.pop('#q1', t4).pop('#q2', t4 + 0.2);
  ctx.show('#s4', t4 + 0.2, { y: 24 });
  ctx.to(L2[1], { autoAlpha: 1, duration: 0.4 }, t4 + 0.5);
});
