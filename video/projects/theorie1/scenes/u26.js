// Übung 2-6 – Preis, Preisniveau, Inflation: drei Definitionen, die aufeinander aufbauen
V.scene('u26', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '2-6', title: 'Preis, Preisniveau, <em>Inflation</em>', src: 'Skript I, Folie 74',
    question: 'Was ist ein Preis, was ist das Preisniveau, was ist Inflation?',
  });
  const L = V.th.lines(F.ans, [
    '<span class="k">Preis</span>Menge von Geld, um <b>eine Ware oder Dienstleistung</b> zu kaufen.',
    '<span class="k">Preisniveau</span>Menge von Geld, um einen <b>Warenkorb</b> zu kaufen.',
    '<span class="k">Inflation</span><b>Prozentuale Veränderung</b> eines durchschnittlichen Preisniveaus.',
  ]);

  const bread = (h, tone = 4) => `<svg class="ico" viewBox="0 0 120 100" height="${h}" width="${h * 1.2}"><path class="a${tone}" d="M8 62c0-24 20-36 52-36s52 12 52 36c0 9-4 16-11 16H19c-7 0-11-7-11-16z"/><path class="st" d="M38 40l9 15M58 36l9 15M78 40l9 15"/></svg>`;
  // Warenkorb mit Gütern obenauf
  const korb = h => `<span class="korb" style="height:${h}px;width:${h * 1.1}px"><span class="gd">${V.icon('apple', h * 0.34, { tone: 2 })}${bread(h * 0.3)}${V.icon('pear', h * 0.34, { tone: 3 })}</span>${V.icon('basket', h * 0.72, { tone: 1 })}</span>`;

  F.stage.innerHTML = `
  <style>
    #sc-u26 .cd{position:absolute;padding:14px 18px 0;text-align:center}
    #sc-u26 .ct{display:flex;align-items:center;gap:12px;font-weight:800;font-size:32px;letter-spacing:-.015em;text-align:left;line-height:1.05}
    #sc-u26 .ct .step{width:46px;height:46px;font-size:25px}
    #sc-u26 .pic{position:relative;display:flex;align-items:flex-end;justify-content:center}
    #sc-u26 .cap{font-size:27px;font-weight:600;color:var(--mute);margin-top:8px;line-height:1.15}
    #sc-u26 .val{font-family:var(--mono);font-weight:800;font-size:44px;line-height:1.1;margin-top:6px}
    #sc-u26 .korb{display:inline-flex;flex-direction:column;align-items:center;justify-content:flex-end}
    #sc-u26 .korb .gd{display:flex;align-items:flex-end;gap:2px;margin-bottom:-10px;position:relative;z-index:1}
    #sc-u26 .tagp{position:absolute;font-family:var(--mono);font-weight:800;font-size:34px;padding:4px 16px;white-space:nowrap}
    #sc-u26 .two{display:grid;grid-template-columns:128px 104px 140px;align-items:end;justify-content:center}
    #sc-u26 .two .col{display:flex;flex-direction:column;align-items:center}
    #sc-u26 .two .mid{align-self:center;display:flex;flex-direction:column;align-items:center;gap:2px;padding-bottom:70px}
    #sc-u26 .two .p{font-family:var(--mono);font-weight:800;font-size:34px;line-height:1.1}
    #sc-u26 .two .cap{margin-top:2px}
    #sc-u26 .calc{font-family:var(--mono);font-weight:700;font-size:30px;margin-top:10px;white-space:nowrap}
    #sc-u26 .strip{position:absolute;left:0;top:462px;width:1056px;height:186px}
    #sc-u26 .chain{display:flex;align-items:center;justify-content:center;gap:18px;padding:0 20px}
    #sc-u26 .chain .lab{position:absolute;left:24px;top:16px;margin:0}
    #sc-u26 .chain .chip{font-size:28px;padding:8px 16px}
    #sc-u26 .chain .ar{font-family:var(--mono);font-weight:800;font-size:40px;color:var(--mute)}
    #sc-u26 .warn{padding:14px 22px 0}
    #sc-u26 .warn .r1{display:flex;align-items:center;justify-content:space-between;gap:14px;height:84px}
    #sc-u26 .al{font-size:36px;margin-bottom:24px}
    #sc-u26 .al .k{font-size:24px}
    #sc-u26 .warn .it{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-weight:700;font-size:27px;white-space:nowrap}
    #sc-u26 .warn .r2{display:flex;align-items:center;gap:18px;font-size:31px;font-weight:600;margin-top:6px}
    #sc-u26 .warn .ach{font-size:26px;letter-spacing:.08em;text-transform:uppercase}
  </style>

  <div class="card cd" id="c1" style="left:0;top:96px;width:300px;height:340px">
    <div class="ct"><span class="step">1</span>Preis</div>
    <div class="pic" id="p1" style="height:150px;margin-top:20px">${bread(104)}<span class="chip c2 tagp" id="tg1" style="right:-4px;top:-12px">2 €</span></div>
    <div class="cap" id="k1">ein Gut</div>
  </div>
  <div class="card cd" id="c2" style="left:324px;top:48px;width:300px;height:388px">
    <div class="ct"><span class="step">2</span>Preisniveau</div>
    <div class="pic" id="p2" style="height:176px;margin-top:16px">${korb(150)}</div>
    <div class="cap" id="k2">ein Warenkorb</div>
    <div class="val t-c1" id="v2">100 €</div>
  </div>
  <div class="card cd" id="c3" style="left:648px;top:0;width:408px;height:436px">
    <div class="ct"><span class="step">3</span>Inflation</div>
    <div class="two" id="p3" style="margin-top:22px">
      <div class="col" id="b3a">${korb(104)}<div class="cap">heute</div><div class="p t-c1" id="v3a">100 €</div></div>
      <div class="mid" id="m3"><span class="chip c2" id="pc3" style="font-size:27px;padding:2px 8px">+3 %</span><svg width="96" height="24" id="ar3"></svg></div>
      <div class="col" id="b3b">${korb(104)}<div class="cap">in 1 Jahr</div><div class="p t-c2" id="v3b">103 €</div></div>
    </div>
    <div class="calc" id="calc">${V.frac('103 − 100', '100')} = <b class="t-c2" id="r3">3 %</b></div>
  </div>

  <div class="card soft strip chain" id="chain"><span class="lab">baut aufeinander auf</span>
    <span class="chip c4">Geld für ein Gut</span><span class="ar">→</span>
    <span class="chip c1">Geld für einen Warenkorb</span><span class="ar">→</span>
    <span class="chip c2">Veränderung in %</span></div>

  <div class="card c2 strip warn" id="warn">
    <div class="r1"><span class="chip c2 ach">Achtung</span>
      <span class="it" id="w1">${bread(46)}<span id="w1t">2 → 2,50 € <b class="t-c2">↑</b></span></span>
      <span class="it" id="w2">${V.icon('apple', 46, { tone: 2 })}<span id="w2t">3 → 2,50 € <b class="t-c3">↓</b></span></span>
      <span class="it" id="w3">${V.icon('basket', 46, { tone: 1 })}<span id="w3t">100 → 100 €</span></span></div>
    <div class="r2"><span class="chip ink" id="neq" style="font-size:28px">≠ Inflation</span><span id="mk">Entscheidend ist der <b>Durchschnitt aller Preise</b>.</span></div>
  </div>`;

  const cards = ['#c1', '#c2', '#c3'].map(s => $(s));
  const hi = (el, t, col, bg) => ctx.tint(el, t, { borderColor: col, boxShadow: `8px 8px 0 ${bg}` });
  const lo = (el, t) => ctx.tint(el, t, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` });

  /* ---------- Frage: die drei Begriffe erscheinen als Stufen ---------- */
  gsap.set(L, { autoAlpha: 0 });
  ctx.pop(cards[0], T('Was ist ein Preis'), { scale: 0.8 });
  ctx.pop(cards[1], T('was ist das Preisniveau'), { scale: 0.8 });
  ctx.pop(cards[2], T('was ist Inflation'), { scale: 0.8 });
  gsap.set(['#p1', '#k1', '#p2', '#k2', '#v2', '#p3', '#calc', '#tg1', '#v3a', '#v3b', '#pc3'].map(s => $(s)), { autoAlpha: 0 });
  ctx.show('#chain', T('drei Definitionen'), { y: 24 });
  ctx.show($$('#chain .chip, #chain .ar'), T('drei Definitionen') + 0.3, { x: -16, y: 0, stagger: 0.28 });

  /* ---------- Definitionen: links der Satz, rechts das Bild ---------- */
  const t1 = T('Ein Preis ist die Menge'), t2 = T('Das Preisniveau ist'), t3 = T('Und Inflation ist');
  ctx.show(L[0], t1, { x: -20, y: 0 }); hi(cards[0], t1, C.c4, C.c4bg);
  ctx.show('#p1', t1 + 0.3, { y: 0, scale: 0.6, ease: 'back.out(1.8)' }).show('#k1', T('um eine Ware oder Dienstleistung'), { y: 10 });
  ctx.show(L[1], t2, { x: -20, y: 0 }); lo(cards[0], t2); hi(cards[1], t2, C.c1, C.c1bg);
  ctx.show('#p2', t2 + 0.3, { y: 0, scale: 0.6, ease: 'back.out(1.8)' }).show('#k2', T('um einen ganzen Warenkorb'), { y: 10 });
  ctx.show(L[2], t3, { x: -20, y: 0 }); lo(cards[1], t3); hi(cards[2], t3, C.c2, C.c2bg);
  ctx.show('#p3', t3 + 0.3, { y: 16 });
  const ar = V.arrow($('#ar3'), 'M4 12H88', { cls: 'c2', w: 5, head: 20 });
  ctx.drawArrow(ar, T('die prozentuale Veränderung'), 0.6);

  /* ---------- Beispiel mit Zahlen ---------- */
  const e1 = T('Ein Brot kostet zwei Euro'), e2 = T('Der ganze Warenkorb kostet'), e3 = T('Kostet derselbe Korb');
  lo(cards[2], e1 - 0.4); hi(cards[0], e1, C.c4, C.c4bg);
  const tg = $('#tg1'); gsap.set(tg, { rotation: 8, scale: 1.6 });
  ctx.to(tg, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, e1 + 0.6);
  ctx.pulse(L[0], T('das ist ein Preis'), { scale: 1.03, origin: '0% 50%' });
  lo(cards[0], e2); hi(cards[1], e2, C.c1, C.c1bg);
  ctx.show('#v2', T('hundert Euro, das ist das Preisniveau') - 0.1, { y: 14 }).count('#v2', 100, T('hundert Euro, das ist das Preisniveau') - 0.1, { from: 0, dur: 0.9, suf: ' €' });
  ctx.pulse(L[1], T('das ist das Preisniveau'), { scale: 1.03, origin: '0% 50%' });
  lo(cards[1], e3); hi(cards[2], e3, C.c2, C.c2bg);
  ctx.show('#v3a', e3 + 0.2, { y: 10 });
  ctx.pulse('#b3b', T('ein Jahr später'), { scale: 1.08 });
  ctx.show('#v3b', T('hundertdrei Euro') - 0.1, { y: 10 }).count('#v3b', 103, T('hundertdrei Euro') - 0.1, { from: 100, dur: 0.9, suf: ' €' });
  const tc = T('dann beträgt die Inflation');
  ctx.show('#calc', tc, { y: 14 });
  ctx.count('#r3', 3, T('drei Prozent') - 0.2, { from: 0, dur: 0.7, suf: ' %' });
  ctx.pop('#pc3', T('drei Prozent'));
  ctx.pulse(L[2], T('drei Prozent') + 0.4, { scale: 1.03, origin: '0% 50%' });

  /* ---------- Achtung: ein einzelner Preis ist noch keine Inflation ---------- */
  const ta = T('Achtung');
  lo(cards[2], ta);
  ctx.hide('#chain', ta - 0.3, { dur: 0.3 });
  gsap.set(['#w1t', '#w2t', '#w3t', '#neq', '#mk'].map(s => $(s)), { autoAlpha: 0 });
  ctx.show('#warn', ta, { y: 24 });
  ctx.to('#w1t', { autoAlpha: 1, duration: 0.3 }, T('nur ein einzelner Preis steigt')).pulse('#w1', T('nur ein einzelner Preis steigt') + 0.1, { scale: 1.08 });
  ctx.to('#w2t', { autoAlpha: 1, duration: 0.3 }, T('nur ein einzelner Preis steigt') + 1.3);
  ctx.to('#w3t', { autoAlpha: 1, duration: 0.3 }, T('ist das noch keine Inflation') - 0.2);
  const neq = $('#neq'); gsap.set(neq, { scale: 1.7, rotation: -6 });
  ctx.to(neq, { autoAlpha: 1, scale: 1, rotation: -2, duration: 0.3, ease: 'power3.in' }, T('noch keine Inflation'));
  ctx.show('#mk', T('Entscheidend ist der Durchschnitt'), { x: -16, y: 0 });
  ctx.pulse('#w3', T('der Durchschnitt aller Preise'), { scale: 1.1 });
  ctx.pulse(L[2], T('der Durchschnitt aller Preise') + 0.3, { scale: 1.03, origin: '0% 50%' });
});
