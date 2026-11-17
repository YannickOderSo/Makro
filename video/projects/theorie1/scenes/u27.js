// Übung 2-7 – die drei Funktionen des Geldes (und die zwei Geldformen)
V.scene('u27', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '2-7', title: 'Die <em>Funktionen</em> des Geldes', src: 'Skript I, Folien 75–76',
    question: 'Was sind die Funktionen des Geldes?',
  });
  const L = V.th.lines(F.ans, [
    '<span class="k">1</span><b>Tauschmittel</b>: Käufe und Verkäufe ohne doppelte Koinzidenz der Bedürfnisse; gesetzliches Zahlungsmittel.',
    '<span class="k">2</span><b>Recheneinheit</b>: vergleichbare Angabe von Preisen und Schulden.',
    '<span class="k">3</span><b>Wertaufbewahrungsmittel</b>: Übertragung von Kaufkraft in die Zukunft (Nominalwertsicherheit, keine Realwertsicherheit).',
  ], 'sm');

  const bread = h => `<svg class="ico" viewBox="0 0 120 100" height="${h}" width="${h * 1.2}"><path class="a4" d="M8 62c0-24 20-36 52-36s52 12 52 36c0 9-4 16-11 16H19c-7 0-11-7-11-16z"/><path class="st" d="M38 40l9 15M58 36l9 15M78 40l9 15"/></svg>`;
  const shoe = h => `<svg class="ico" viewBox="0 0 130 90" height="${h}" width="${h * 1.44}"><path class="a1" d="M10 18h34l12 26 48 10c12 3 18 9 18 22H10z"/><path class="st" d="M10 62h112M58 46l-8 9M72 49l-8 9"/></svg>`;
  const note = (txt, cls = '') => `<span class="bn ${cls}">${txt}</span>`;

  F.stage.innerHTML = `
  <style>
    #sc-u27 .al.sm{font-size:30px;margin-bottom:22px}
    #sc-u27 .up{position:absolute;left:0;top:0;width:1056px;height:440px}
    #sc-u27 .sub{position:absolute;inset:0}
    #sc-u27 .sub svg.ov{position:absolute;left:0;top:0}
    #sc-u27 .who{position:absolute;top:56px;width:280px;height:306px;padding:14px 8px 0;text-align:center}
    #sc-u27 .who .nm{font-weight:800;font-size:32px;line-height:1.1;margin-top:2px}
    #sc-u27 .who .has{display:flex;align-items:center;justify-content:center;gap:10px;font-size:27px;font-weight:600;margin-top:10px}
    #sc-u27 .who .chip{font-size:26px;margin-top:10px;font-family:var(--sans);font-weight:700}
    #sc-u27 .mlab{position:absolute;font-size:28px;font-weight:700;white-space:nowrap;text-align:center}
    #sc-u27 .koin{position:absolute;left:318px;top:196px;width:420px;text-align:center;font-size:28px;font-weight:700;line-height:1.2;padding:10px 12px;border:3px solid var(--c2);background:var(--c2bg);color:var(--c2)}
    #sc-u27 .stampz{position:absolute;left:298px;top:186px;width:460px;text-align:center;font-family:var(--mono);font-weight:800;font-size:28px;letter-spacing:.02em;color:var(--c3);border:4px solid var(--c3);outline:2px solid var(--c3);outline-offset:5px;background:var(--panel);padding:12px 0}
    #sc-u27 .mover{position:absolute;left:0;top:0}
    #sc-u27 .big{font-weight:800;font-size:34px;letter-spacing:-.015em;line-height:1.15}
    #sc-u27 .gd{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;width:200px;height:170px;margin-left:-100px}
    #sc-u27 .gd .chip{font-size:30px;padding:2px 14px}
    #sc-u27 .gd .nm2{font-size:26px;font-weight:600;color:var(--mute)}
    #sc-u27 .bn{display:inline-flex;align-items:center;justify-content:center;width:176px;height:92px;border:4px solid var(--ink);background:var(--c3bg);font-family:var(--mono);font-weight:800;font-size:36px;box-shadow:5px 5px 0 var(--line);position:relative}
    #sc-u27 .bn::before,#sc-u27 .bn::after{content:"";position:absolute;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;border:3px solid var(--ink)}
    #sc-u27 .bn::before{left:8px}#sc-u27 .bn::after{right:8px}
    #sc-u27 .cap2{font-size:27px;font-weight:600;color:var(--mute);text-align:center;margin-top:8px}
    #sc-u27 .kk{position:absolute;left:30px;width:1000px;display:flex;align-items:center;gap:16px;font-size:28px;font-weight:700}
    #sc-u27 .kk .lb{width:130px;flex:none}
    #sc-u27 .kk .bar{height:44px;background:var(--c3);border:3px solid var(--ink)}
    #sc-u27 .form{position:absolute;top:70px;width:504px;height:350px;padding:20px 24px 0;text-align:center}
    #sc-u27 .form .nm{font-weight:800;font-size:38px;margin-top:14px;letter-spacing:-.015em}
    #sc-u27 .form .sb{font-size:27px;color:var(--mute);font-weight:500}
    #sc-u27 .form .chip{font-size:30px;margin-top:14px}
    #sc-u27 .tab{position:absolute;top:462px;width:336px;height:186px;padding:18px 10px 0 12px;display:flex;gap:10px;align-items:flex-start}
    #sc-u27 .tab .tn{font-weight:800;font-size:26px;line-height:1.1;letter-spacing:-.02em;white-space:nowrap}
    #sc-u27 .tab .ts{font-size:26px;line-height:1.15;color:var(--mute);font-weight:500;margin-top:6px}
    #sc-u27 .tab .ok{position:absolute;right:10px;bottom:10px}
    #sc-u27 .tab>div{min-width:0}
  </style>
  <div class="up">
    <!-- Auftakt -->
    <div class="sub" id="s0">
      <div class="abs" style="left:0;top:110px;width:1056px;text-align:center">${V.icon('coin', 150, { tone: 4 })}&nbsp;&nbsp;${note('100 €')}</div>
      <div class="abs big" id="s0t" style="left:0;top:300px;width:1056px;text-align:center">Geld kann <span class="t-c1">drei Dinge</span></div>
    </div>

    <!-- 1 Tauschmittel -->
    <div class="sub" id="s1">
      <svg class="ov" id="ov1" width="1056" height="440"></svg>
      <div class="card who" id="bk" style="left:0">${V.icon('person', 104, { tone: 4 })}<div class="nm">Bäcker</div><div class="has">${bread(40)}hat Brot</div><span class="chip c2" id="bkn">braucht Schuhe</span></div>
      <div class="card who" id="sc" style="left:776px">${V.icon('person', 104, { tone: 1 })}<div class="nm">Schuster</div><div class="has">${shoe(36)}hat Schuhe</div><span class="chip c4" id="scn">will gerade Brot?</span></div>
      <div class="mlab" id="tl" style="left:268px;top:112px;width:520px">Tausch: Brot gegen Schuhe</div>
      <div class="koin" id="koin">nur bei doppelter Koinzidenz der Bedürfnisse</div>
      <div class="mlab t-c3" id="gl" style="left:268px;top:18px;width:520px">Geld</div>
      <div class="mlab t-c1" id="sl" style="left:268px;top:372px;width:520px">Schuhe</div>
      <div class="stampz" id="gz">gesetzliches Zahlungsmittel</div>
      <div class="mover" id="mvc">${V.icon('coin', 60, { tone: 3 })}</div>
      <div class="mover" id="mvs">${shoe(44)}</div>
    </div>

    <!-- 2 Recheneinheit -->
    <div class="sub" id="s2">
      <div class="abs big" id="s2t" style="left:20px;top:8px">Alles in <span class="t-c1">derselben Einheit</span>: Euro</div>
      <svg class="ov" id="ov2" width="1056" height="440"></svg>
      <div class="gd" id="g1" style="left:158px;top:96px">${bread(70)}<span class="chip c4">2 €</span><span class="nm2">Brot</span></div>
      <div class="gd" id="g2" style="left:626px;top:96px">${shoe(64)}<span class="chip c1">60 €</span><span class="nm2">Schuhe</span></div>
      <div class="gd" id="g3" style="left:948px;top:96px">${V.icon('basket', 76, { tone: 3 })}<span class="chip c3">100 €</span><span class="nm2">Warenkorb</span></div>
      <div class="gd" id="g4" style="left:465px;top:96px">${V.icon('note', 46, { tone: 2 })}<span class="chip c2">40 €</span><span class="nm2">Schulden</span></div>
      <div class="abs chip c3" id="cmp" style="left:560px;top:372px;font-size:29px">→ vergleichbar: 1 Paar Schuhe = 30 Brote</div>
    </div>

    <!-- 3 Wertaufbewahrung -->
    <div class="sub" id="s3">
      <svg class="ov" id="ov3" width="1056" height="440"></svg>
      <div class="abs" id="n1" style="left:60px;top:18px">${note('100 €')}<div class="cap2">heute</div></div>
      <div class="abs" id="n2" style="left:820px;top:18px">${note('100 €')}<div class="cap2">in der Zukunft</div></div>
      <div class="mlab t-mute" id="zl" style="left:268px;top:10px;width:520px;font-size:27px">Kaufkraft übertragen</div>
      <div class="mover" id="mvn">${note('100 €')}</div>
      <div class="abs chip c3" id="nom" style="left:268px;top:130px;width:520px;text-align:center;font-size:27px;font-family:var(--sans);font-weight:700">Nominalwert sicher: 100 € = 100 €</div>
      <div class="abs lab" id="kkt" style="left:30px;top:214px;font-size:24px">Was man für 100 € kaufen kann</div>
      <div class="kk" id="kk1" style="top:254px"><span class="lb">heute</span><span class="bar" style="width:620px"></span></div>
      <div class="kk" id="kk2" style="top:322px"><span class="lb">später</span><span class="bar" id="bar2" style="width:620px"></span><span class="chip c2" id="rw" style="font-size:27px">Realwert sinkt</span></div>
      <div class="abs t-c2" id="infl" style="left:176px;top:384px;font-size:27px;font-weight:700">bei Inflation: keine Realwertsicherheit</div>
    </div>

    <!-- Geldformen -->
    <div class="sub" id="s4">
      <div class="abs big" id="s4t" style="left:20px;top:8px">Zwei <span class="t-c1">Geldformen</span></div>
      <div class="card form" id="f1" style="left:14px">${note('100 €')}<div class="nm">Nominalgeld</div><div class="sb">Fiat money · Wert = aufgedruckter Betrag</div><span class="chip c2" id="f1c">kein innerer Wert</span></div>
      <div class="card form" id="f2" style="left:538px">${V.icon('coin', 92, { tone: 4 })}<div class="nm">Warengeld</div><div class="sb">zum Beispiel Gold</div><span class="chip c3" id="f2c">innerer Wert</span></div>
    </div>
  </div>

  <div class="card tab" id="t1" style="left:0">${V.icon('cart', 42, { tone: 4 })}<div><div class="tn">Tauschmittel</div><div class="ts">kaufen und verkaufen</div></div><span class="ok">${V.icon('check', 40)}</span></div>
  <div class="card tab" id="t2" style="left:360px">${V.icon('tag', 42, { tone: 1 })}<div><div class="tn">Recheneinheit</div><div class="ts">Preise und Schulden vergleichen</div></div><span class="ok">${V.icon('check', 40)}</span></div>
  <div class="card tab" id="t3" style="left:720px">${V.icon('clock', 42, { tone: 3 })}<div><div class="tn">Wertaufbewahrung</div><div class="ts">Kaufkraft in die Zukunft</div></div><span class="ok">${V.icon('check', 40)}</span></div>`;

  const subs = ['#s0', '#s1', '#s2', '#s3', '#s4'].map(s => $(s)), tabs = ['#t1', '#t2', '#t3'].map(s => $(s)), oks = $$('.tab .ok');
  gsap.set(subs.slice(1), { autoAlpha: 0 });
  gsap.set(oks, { autoAlpha: 0 });
  const swap = (i, t) => { ctx.to(subs[i - 1], { autoAlpha: 0, duration: 0.3 }, t - 0.3); ctx.to(subs[i], { autoAlpha: 1, duration: 0.35 }, t); };
  const tabOn = (i, t, col, bg) => { ctx.to(tabs[i], { opacity: 1, duration: 0.3 }, t).tint(tabs[i], t, { borderColor: col, boxShadow: `8px 8px 0 ${bg}` }).pulse(tabs[i], t, { scale: 1.05 }); };
  const tabDone = (i, t) => { ctx.tint(tabs[i], t, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` }); ctx.pop(oks[i], t); };

  /* ---------- Auftakt ---------- */
  ctx.show('#s0', T('Was sind die Funktionen') - 0.4, { y: 0, scale: 0.85 });
  ctx.show('#s0t', T('Es sind drei') - 0.2, { y: 16 });
  ctx.pop(tabs, T('Es sind drei'), { stagger: 0.2, scale: 0.8 });
  ctx.dim(tabs, T('Es sind drei') + 1.0, { to: 0.45 });

  /* ---------- 1 Tauschmittel ---------- */
  const a1 = T('Geld ist Tauschmittel');
  swap(1, T('Erstens')); tabOn(0, T('Erstens'), C.c4, C.c4bg);
  ctx.show(L[0], a1, { x: -20, y: 0 });
  const ov1 = $('#ov1');
  const barter = V.arrow(ov1, 'M296 172H760', { cls: 'mute', w: 6, head: 22 });
  const barterB = V.arrow(ov1, 'M760 172H296', { cls: 'mute', w: 6, head: 22 });
  const pay = V.arrow(ov1, 'M294 72H762', { cls: 'c3', w: 7, head: 24 });
  const back = V.arrow(ov1, 'M762 356H294', { cls: 'c1', w: 7, head: 24 });
  const x1 = V.S('path', { d: 'M340 206L716 286M716 206L340 286', class: 'arrow c2', 'stroke-width': 8 }); ov1.appendChild(x1);
  gsap.set(['#bk', '#sc', '#bkn', '#scn', '#tl', '#koin', '#gl', '#sl', '#gz', '#mvc', '#mvs'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([barter, barterB, pay, back, x1], { autoAlpha: 0 });
  ctx.show('#bk', T('müsste ein Bäcker') - 0.2, { x: -30, y: 0 });
  ctx.pop('#bkn', T('der Schuhe braucht'));
  ctx.show('#sc', T('einen Schuster finden') - 0.1, { x: 30, y: 0 });
  ctx.pop('#scn', T('der gerade Brot will'));
  ctx.drawArrow(barter, T('der gerade Brot will') - 0.6, 0.6).drawArrow(barterB, T('der gerade Brot will') - 0.3, 0.6);
  ctx.show('#tl', T('der gerade Brot will') - 0.3, { y: 10 });
  ctx.show('#koin', T('doppelte Koinzidenz'), { y: 0, scale: 0.8, ease: 'back.out(1.6)' });
  // mit Geld: nicht nötig
  const tm = T('Mit Geld ist das nicht nötig');
  ctx.draw(x1, tm, 0.4);
  ctx.dim([$('#koin'), $('#tl'), barter, barterB, $('#scn')], tm + 0.2, { to: 0.3 });
  ctx.drawArrow(pay, tm + 0.3, 0.6).show('#gl', tm + 0.4, { y: 10 });
  ctx.drawArrow(back, tm + 0.8, 0.6).show('#sl', tm + 0.9, { y: -10 });
  const run = (el, path, t, dx, dy) => { ctx.to(el, { autoAlpha: 1, duration: 0.2 }, t).along(el, path, t, 1.5, { from: 0.03, to: 0.9, dx, dy, ease: 'sine.inOut' }).to(el, { autoAlpha: 0, duration: 0.25 }, t + 1.35); };
  run($('#mvc'), pay._path, tm + 0.6, -30, -30); run($('#mvs'), back._path, tm + 1.1, -32, -24);
  run($('#mvc'), pay._path, tm + 2.6, -30, -30); run($('#mvs'), back._path, tm + 3.1, -32, -24);
  // gesetzliches Zahlungsmittel
  const tz = T('gesetzliches Zahlungsmittel');
  ctx.hide([$('#koin'), $('#tl'), barter, barterB, x1], tz - 0.5, { dur: 0.3 });
  const gz = $('#gz'); gsap.set(gz, { scale: 1.6, rotation: -6 });
  ctx.to(gz, { autoAlpha: 1, scale: 1, rotation: -2, duration: 0.3, ease: 'power3.in' }, tz);

  /* ---------- 2 Recheneinheit ---------- */
  const a2 = T('Geld ist Recheneinheit');
  swap(2, T('Zweitens')); tabDone(0, T('Zweitens')); tabOn(1, T('Zweitens'), C.c1, C.c1bg);
  ctx.show(L[1], a2, { x: -20, y: 0 });
  const ov2 = $('#ov2'), X = v => 140 + v * 8.08;
  const axis = V.S('line', { x1: 110, y1: 300, x2: 1020, y2: 300, class: 'ax', 'marker-end': 'url(#ah-ink)' }); ov2.appendChild(axis);
  const tk = V.S('g', {}); ov2.appendChild(tk);
  [0, 20, 40, 60, 80, 100].forEach(v => { tk.appendChild(V.S('line', { x1: X(v), y1: 300, x2: X(v), y2: 314, class: 'tick' })); tk.appendChild(V.S('text', { x: X(v), y: 344, class: 'tickl', 'text-anchor': 'middle', style: 'font-size:26px' }, v + ' €')); });
  const stems = [[2, 272], [60, 272], [100, 272], [40, 272]].map(([v, y]) => { const l = V.S('line', { x1: X(v), y1: y, x2: X(v), y2: 300, class: 'dash' }); ov2.appendChild(l); return l; });
  const dots = [2, 60, 100, 40].map((v, i) => { const c = V.S('circle', { cx: X(v), cy: 300, r: 10, class: 'pt ' + ['c4', 'c1', 'c3', 'c2'][i] }); ov2.appendChild(c); gsap.set(c, { transformOrigin: '50% 50%' }); return c; });
  gsap.set(['#s2t', '#g1', '#g2', '#g3', '#g4', '#cmp'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set([axis, tk, ...stems, ...dots], { autoAlpha: 0 });
  $('#g1').style.left = X(2) + 'px'; $('#g2').style.left = X(60) + 'px'; $('#g3').style.left = (X(100) - 30) + 'px';
  $('#g4').style.left = X(40) + 'px';
  ctx.extend(axis, a2 + 0.2, 0.7).to(tk, { autoAlpha: 1, duration: 0.3 }, a2 + 0.7);
  const tp = T('Alle Preise und Schulden');
  ['#g1', '#g2', '#g3'].forEach((g, i) => { ctx.pop(g, tp + i * 0.22); ctx.to([stems[i], dots[i]], { autoAlpha: 1, duration: 0.25 }, tp + 0.15 + i * 0.22); });
  ctx.pop('#g4', T('und Schulden')).to([stems[3], dots[3]], { autoAlpha: 1, duration: 0.25 }, T('und Schulden'));
  ctx.show('#s2t', T('in derselben Einheit'), { x: -20, y: 0 });
  ctx.pulse(tk, T('in derselben Einheit') + 0.3, { scale: 1.03 });
  // „vergleichbar“: Chip rückt an die Stelle des Schulden-Schilds daneben
  const cmp = $('#cmp'); cmp.style.left = '110px'; cmp.style.top = '376px';
  ctx.show(cmp, T('damit vergleichbar') - 0.2, { y: 14 });
  ctx.pulse([$('#g1'), $('#g2')], T('damit vergleichbar'), { scale: 1.08 });

  /* ---------- 3 Wertaufbewahrungsmittel ---------- */
  const a3 = T('Geld ist Wertaufbewahrungsmittel');
  swap(3, T('Drittens')); tabDone(1, T('Drittens')); tabOn(2, T('Drittens'), C.c3, C.c3bg);
  ctx.show(L[2], a3, { x: -20, y: 0 });
  const ov3 = $('#ov3');
  const time = V.arrow(ov3, 'M262 64H800', { cls: 'ink', w: 6, head: 22 });
  gsap.set(['#n1', '#n2', '#zl', '#mvn', '#nom', '#kkt', '#kk1', '#kk2', '#rw', '#infl'].map(s => $(s)), { autoAlpha: 0 });
  gsap.set(time, { autoAlpha: 0 });
  ctx.show('#n1', a3 + 0.2, { x: -24, y: 0 });
  const tk3 = T('Man kann Kaufkraft von heute');
  ctx.drawArrow(time, tk3, 0.8).show('#zl', tk3 + 0.2, { y: 8 });
  const mv = $('#mvn');
  ctx.to(mv, { autoAlpha: 1, duration: 0.2 }, tk3 + 0.5).along(mv, time._path, T('in die Zukunft übertragen') - 0.4, 1.4, { from: 0.0, to: 1.0, dx: -180, dy: -46, ease: 'power2.inOut' });
  gsap.set(mv, { x: 262 - 180, y: 64 - 46 });
  ctx.to('#n2', { autoAlpha: 1, duration: 0.25 }, T('in die Zukunft übertragen') + 0.95).to(mv, { autoAlpha: 0, duration: 0.2 }, T('in die Zukunft übertragen') + 1.0);
  ctx.show('#kkt', T('Aber Vorsicht'), { y: 10 }).show('#kk1', T('Aber Vorsicht') + 0.2, { x: -20, y: 0 }).show('#kk2', T('Aber Vorsicht') + 0.4, { x: -20, y: 0 });
  ctx.pop('#nom', T('Sicher ist nur der Nominalwert'), { scale: 0.8 });
  ctx.pulse([$('#n1'), $('#n2')], T('Sicher ist nur der Nominalwert') + 0.3, { scale: 1.06 });
  const tr = T('Bei Inflation sinkt der reale Wert');
  ctx.show('#infl', tr, { y: 10 });
  ctx.to('#bar2', { width: 430, backgroundColor: C.c2, duration: 1.2, ease: 'power2.inOut' }, tr + 0.3);
  ctx.pop('#rw', T('sinkt der reale Wert') + 0.6);

  /* ---------- Geldformen ---------- */
  const t4 = T('Dazu passen die zwei Geldformen');
  swap(4, t4); tabDone(2, t4);
  ctx.undim(tabs, t4);
  gsap.set(['#s4t', '#f1', '#f2', '#f1c', '#f2c'].map(s => $(s)), { autoAlpha: 0 });
  ctx.show('#s4t', t4, { x: -20, y: 0 });
  ctx.show('#f1', T('Nominalgeld hat') - 0.2, { y: 24 });
  const st = (id, t) => { const e = $(id); gsap.set(e, { scale: 1.6 }); ctx.to(e, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, t); };
  st('#f1c', T('keinen inneren Wert'));
  ctx.show('#f2', T('Warengeld wie Gold') - 0.2, { y: 24 });
  st('#f2c', T('hat einen') - 0.1);
});
