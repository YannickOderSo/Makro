// Aufgabe 1 b – Ausgabenkategorien zuordnen (Übung 1-5): Y = C + I + G + NX, „Wer kauft?“
V.scene('a1b', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 1 b', title: 'Ausgabenkategorien: <em>Wer kauft?</em>', src: 'Übung 1-5' });

  const CAT = {
    C: { n: 'Konsum', c: 'c1' }, I: { n: 'Investitionen', c: 'c3' },
    G: { n: 'Staatsausgaben', c: 'c2' }, NX: { n: 'Nettoexporte', c: 'c4' },
  };
  const TR = [
    { cap: 'VW verkauft einen Lieferwagen an die <b>Bundeswehr</b>', row: '… an die Bundeswehr', buyer: 'Bundeswehr', kind: 'Staat', icon: V.icon('shield', 132, { tone: 2 }), cat: 'G', why: 'Käufer ist der Staat',
      t0: T('VW verkauft einen Lieferwagen'), tb: T('an die Bundeswehr'), tk: T('Käufer ist der Staat'), tc: T('also Staatsausgaben') },
    { cap: 'VW verkauft einen Lieferwagen an die <b>BASF</b>', row: '… an die BASF', buyer: 'BASF', kind: 'Unternehmen', icon: V.icon('factory', 132, { tone: 3 }), cat: 'I', why: 'Unternehmen kauft Ausrüstung',
      t0: T('Der nächste Wagen'), tb: T('an die BASF'), tk: T('Ein Unternehmen kauft'), tc: T('das ist eine Investition') },
    { cap: 'VW verkauft einen Lieferwagen an <b>Air France</b>', row: '… an Air France', buyer: 'Air France', kind: 'Ausland', icon: V.icon('plane', 132, { tone: 4 }), cat: 'NX', why: 'Käufer im Ausland → Export',
      t0: T('Air France kauft'), tb: T('Air France kauft'), tk: T('Der Käufer sitzt im Ausland'), tc: T('also Nettoexporte') },
    { cap: 'VW verkauft einen Lieferwagen an <b>Herrn Merz</b>', row: '… an Herrn Merz', buyer: 'Herr Merz', kind: 'Haushalt', icon: V.icon('person', 132, { tone: 1 }), cat: 'C', why: 'Privathaushalt',
      t0: T('Herr Merz kauft'), tb: T('Herr Merz kauft'), tk: T('Ein Haushalt'), tc: T('also Konsum') },
    { cap: 'VW produziert einen Lieferwagen und verkauft ihn erst <b>nächstes Jahr</b>', row: '… produziert auf Lager', buyer: 'Lager von VW', kind: 'kein Käufer', icon: V.icon('boxes', 132, { tone: 3 }), cat: 'I', why: 'Lagerinvestition',
      t0: T('Und der Sonderfall'), tv: T('Er wandert ins Lager'), tb: T('Er wandert ins Lager'), tk: T('Er wandert ins Lager') + 0.5, tc: T('als Lagerinvestition') },
  ];
  const RULE = [
    ['Haushalt', 'C', V.icon('house', 70, { tone: 1 }), T('Haushalt ist Konsum')],
    ['Unternehmen', 'I', V.icon('factory', 70, { tone: 3 }), T('Unternehmen ist Investition')],
    ['Staat', 'G', V.icon('staat', 70, { tone: 2 }), T('Staat ist Staatsausgaben')],
    ['Ausland', 'NX', V.icon('globe', 70, { tone: 4 }), T('Ausland ist Nettoexporte')],
    ['Lager', 'I', V.icon('boxes', 70, { tone: 3 }), T('Und das Lager')],
  ];

  ctx.html(`
  <style>
    #sc-a1b .eqrow{left:0;top:0;width:1728px;height:132px;display:flex;align-items:center;gap:18px}
    #sc-a1b .eqrow .y{font-family:var(--mono);font-weight:800;font-size:84px;line-height:1;white-space:nowrap}
    #sc-a1b .eqrow .pl{font-family:var(--mono);font-weight:800;font-size:64px;line-height:1}
    #sc-a1b .fld{flex:1;height:124px;display:flex;align-items:center;gap:18px;padding:0 22px;border:4px solid;background:var(--panel)}
    #sc-a1b .fld .l{font-family:var(--mono);font-weight:800;font-size:78px;line-height:1}
    #sc-a1b .fld .n{font-weight:700;font-size:31px;line-height:1.1;color:var(--ink)}
    #sc-a1b .fld.c1{border-color:var(--c1);background:var(--c1bg);color:var(--c1);box-shadow:8px 8px 0 var(--line)}
    #sc-a1b .fld.c2{border-color:var(--c2);background:var(--c2bg);color:var(--c2);box-shadow:8px 8px 0 var(--line)}
    #sc-a1b .fld.c3{border-color:var(--c3);background:var(--c3bg);color:var(--c3);box-shadow:8px 8px 0 var(--line)}
    #sc-a1b .fld.c4{border-color:var(--c4);background:var(--c4bg);color:var(--c4);box-shadow:8px 8px 0 var(--line)}
    #sc-a1b .zone{left:0;top:160px;width:960px;height:610px}
    #sc-a1b .cap{left:0;top:6px;width:610px;font-size:35px;font-weight:600;line-height:1.28}
    #sc-a1b .cap b{font-weight:800;background:var(--soft);padding:0 8px;white-space:nowrap}
    #sc-a1b .wk{left:640px;top:6px;width:320px;text-align:center;font-size:46px;font-weight:800;letter-spacing:-.02em;color:var(--c2);white-space:nowrap}
    #sc-a1b .buyer{left:640px;top:84px;width:320px;height:340px;text-align:center;padding:22px 12px 0}
    #sc-a1b .buyer .nm{font-weight:800;font-size:36px;line-height:1.1;margin:8px 0 12px}
    #sc-a1b .buyer .kd{font-size:30px}
    #sc-a1b .stp{left:248px;top:178px;width:340px;text-align:center;border:5px solid;outline:3px solid;outline-offset:5px;padding:10px 8px 14px;background:rgba(250,252,251,.85)}
    #sc-a1b .stp .l{font-family:var(--mono);font-weight:800;font-size:92px;line-height:1}
    #sc-a1b .stp .n{font-family:var(--mono);font-weight:700;font-size:30px;letter-spacing:.04em;text-transform:uppercase}
    #sc-a1b .vw{left:54px;top:320px;font-size:34px}
    #sc-a1b .list{left:1000px;top:160px;width:728px;height:610px;padding:18px 26px 0}
    #sc-a1b .row{display:grid;grid-template-columns:56px 1fr 120px;align-items:center;column-gap:18px;height:104px;border-top:2px solid var(--line)}
    #sc-a1b .row .m{font-weight:700;font-size:31px;line-height:1.15;white-space:nowrap}
    #sc-a1b .row .w{font-size:27px;color:var(--mute);line-height:1.2;white-space:nowrap}
    #sc-a1b .slot{position:relative;height:66px}
    #sc-a1b .slot>*{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:800;font-size:42px;border:3px solid}
    #sc-a1b .slot .q{border-style:dashed;border-color:var(--old);color:var(--old);background:var(--panel)}
    #sc-a1b .rl{display:grid;grid-template-columns:108px 290px 70px 110px 1fr;align-items:center;height:98px;border-top:2px solid var(--line)}
    #sc-a1b .rl .nm{font-size:40px;font-weight:800}
    #sc-a1b .rl .ar{font-family:var(--mono);font-size:44px;font-weight:700;color:var(--mute)}
    #sc-a1b .rl .cl{font-family:var(--mono);font-weight:800;font-size:44px;height:68px;display:flex;align-items:center;justify-content:center;border:3px solid}
    #sc-a1b .rl .cn{font-size:34px;font-weight:600;padding-left:22px}
    #sc-a1b .q{font-size:50px;font-weight:800;letter-spacing:-.02em}
  </style>

  <!-- Gleichung -->
  <div class="abs eqrow">
    <span class="y" id="ey">Y =</span>
    ${Object.entries(CAT).map(([k, v], i) => `${i ? '<span class="pl">+</span>' : ''}<div class="fld ${v.c}" id="f${k}"><span class="l">${k}</span><span class="n">${v.n}</span></div>`).join('')}
  </div>

  <!-- linke Zone: Fahrt vom Werk zum Käufer -->
  <div class="abs zone" id="drive">
    <div class="abs cap" id="cap0">Gleiche Logik wie in der Übung – in der Klausur nur mit <b>anderen Sätzen</b></div>
    ${TR.map((t, i) => `<div class="abs cap" id="cap${i + 1}">${t.cap}</div>`).join('')}
    <div class="abs wk" id="wk">Wer kauft?</div>
    <svg class="abs" style="left:0;top:0" width="960" height="610">
      <line x1="0" y1="556" x2="960" y2="556" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      <line x1="20" y1="582" x2="940" y2="582" stroke="${C.line}" stroke-width="5" stroke-dasharray="46 34" stroke-linecap="round"/>
    </svg>
    <div class="abs" id="werk" style="left:0;top:366px">${V.icon('factory', 190, { tone: 1 })}</div>
    <div class="abs chip ink vw" id="vw">VW</div>
    ${TR.map((t, i) => `<div class="abs card buyer" id="by${i}">${t.icon}<div class="nm">${t.buyer}</div><span class="chip kd" id="kd${i}">${t.kind}</span>${i === 2 ? ' <span class="chip c4 kd" id="exp" style="margin-top:8px">Export</span>' : ''}</div>`).join('')}
    ${TR.map((t, i) => `<div class="abs stp t-${CAT[t.cat].c}" id="st${i}" style="border-color:currentColor;outline-color:currentColor"><div class="l">${t.cat}</div><div class="n">${t.cat === 'I' && i === 4 ? 'Lagerinvestition' : CAT[t.cat].n}</div></div>`).join('')}
    <div class="abs" id="van" style="left:236px;top:446px">${V.icon('van', 112, { tone: 1 })}</div>
  </div>

  <!-- linke Zone, Schluss: Merkregel -->
  <div class="abs zone" id="rule">
    <div class="abs q" style="left:0;top:0">Merkregel: <span class="t-c2">Wer kauft?</span></div>
    <div class="abs" style="left:0;top:92px;width:940px;border-bottom:2px solid var(--line)">
      ${RULE.map(([n, k, ic]) => `<div class="rl"><span>${ic}</span><span class="nm">${n}</span><span class="ar">→</span><span class="cl t-${CAT[k].c} b-${CAT[k].c}" style="border-color:currentColor">${k}</span><span class="cn">${n === 'Lager' ? 'Lagerinvestition' : CAT[k].n}</span></div>`).join('')}
    </div>
  </div>

  <!-- rechte Zone: Ergebnisliste -->
  <div class="abs card list" id="list">
    <span class="lab" style="margin-bottom:12px">VW verkauft einen Lieferwagen …</span>
    ${TR.map((t, i) => `<div class="row" id="r${i}"><span class="step">${i + 1}</span><div><div class="m">${t.row}</div><div class="w" id="w${i}">${t.why}</div></div>
      <div class="slot"><span class="q" id="q${i}">?</span><span class="t-${CAT[t.cat].c} b-${CAT[t.cat].c}" id="c${i}" style="border-color:currentColor">${t.cat}</span></div></div>`).join('')}
  </div>`);

  /* ---------- Auftakt ---------- */
  const van = $('#van'), cargo = van.querySelector('.a1');
  gsap.set(cargo, { fill: C.old });
  ctx.show('#werk', 0.8, { x: -30, y: 0 }).pop('#vw', 1.1).show('#drive svg', 0.8, { y: 0 }).show(van, 1.3, { x: -40, y: 0 });
  ctx.show('#cap0', T('nur mit anderen Sätzen'), { x: -20, y: 0 });
  ctx.show('#list', T('Du sollst Transaktionen'), { x: 40, y: 0 });
  gsap.set($$('.row .w'), { autoAlpha: 0 });
  gsap.set($$('.slot span:last-child'), { autoAlpha: 0 });
  ctx.show('.row', T('Du sollst Transaktionen') + 0.25, { x: 30, y: 0, stagger: 0.13 });

  /* ---------- Gleichung ---------- */
  ctx.show('#ey', T('Das BIP hat vier Teile'), { x: -30, y: 0 });
  const tf = { C: T('Konsum,'), I: T('Investitionen,'), G: T('Staatsausgaben und'), NX: T('Nettoexporte.') };
  Object.keys(CAT).forEach((k, i) => {
    ctx.pop('#f' + k, tf[k]);
    if (i) ctx.show($$('.eqrow .pl')[i - 1], tf[k] - 0.1, { y: 0 });
  });

  /* ---------- „Wer kauft?“ ---------- */
  const wk = $('#wk'), tq = T('Wer kauft?');
  gsap.set(wk, { autoAlpha: 0, x: -150, y: 200, scale: 0.6, transformOrigin: '50% 50%' });
  ctx.to(wk, { autoAlpha: 1, scale: 2.1, duration: 0.45, ease: 'back.out(1.7)' }, tq);
  ctx.hide('#cap0', tq - 0.3);
  ctx.to(wk, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.inOut' }, TR[0].t0 - 0.2);

  /* ---------- fünf Transaktionen ---------- */
  const END = 590; // Fahrstrecke des Lieferwagens in px
  TR.forEach((t, i) => {
    const next = TR[i + 1] ? TR[i + 1].t0 : T('Die Merkregel'), col = C[CAT[t.cat].c], bg = C[CAT[t.cat].c + 'bg'];
    const by = $('#by' + i), st = $('#st' + i), fld = $('#f' + t.cat), row = $('#r' + i);
    // Satz
    ctx.show('#cap' + (i + 1), t.t0, { x: -20, y: 0 });
    if (i < 4) ctx.hide('#cap' + (i + 1), next - 0.3);
    // Lieferwagen: neu am Werk, fährt zum Käufer
    const tv = t.tv ?? t.t0 + 0.15, arrive = Math.max(t.tb + 0.5, tv + 1.3);
    if (i) { ctx.set(van, { x: 0 }, t.t0 - 0.02).set(cargo, { fill: C.old }, t.t0 - 0.02); ctx.to(van, { autoAlpha: 1, duration: 0.25 }, t.t0); }
    ctx.to(van, { x: END - 126, duration: arrive - tv, ease: 'power2.inOut' }, tv);
    if (i < 4) ctx.to(van, { autoAlpha: 0, duration: 0.25 }, next - 0.32);
    // Käufer
    gsap.set($('#kd' + i), { autoAlpha: 0 });
    ctx.show(by, t.tb, { x: 40, y: 0 });
    ctx.pulse(wk, t.tb, { scale: 1.12 });
    ctx.to($('#kd' + i), { autoAlpha: 1, duration: 0.3 }, t.tk).pulse(by, t.tk, { scale: 1.04 });
    if (i === 2) { gsap.set($('#exp'), { autoAlpha: 0 }); ctx.to($('#exp'), { autoAlpha: 1, duration: 0.3 }, T('es ist ein Export')); }
    if (i < 4) ctx.hide(by, next - 0.3);
    // Stempel + Feld der Gleichung + Listenzeile
    gsap.set(st, { autoAlpha: 0, scale: 1.7, rotation: -14 });
    ctx.to(st, { autoAlpha: 1, scale: 1, rotation: -5, duration: 0.3, ease: 'power3.in' }, t.tc);
    ctx.tint(cargo, t.tc + 0.2, { fill: col }).tint(by, t.tc + 0.2, { borderColor: col, boxShadow: `8px 8px 0 ${bg}` });
    ctx.pulse(fld, t.tc + 0.25, { scale: 1.1 });
    ctx.to($('#q' + i), { autoAlpha: 0, duration: 0.2 }, t.tc + 0.3);
    ctx.tl.fromTo($('#c' + i), { autoAlpha: 0, scale: 1.8 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in', immediateRender: false }, t.tc + 0.3);
    ctx.to($('#w' + i), { autoAlpha: 1, duration: 0.35 }, t.tc + 0.45);
    ctx.tint(row, t.tc + 0.3, { backgroundColor: bg }).tint(row, Math.min(next - 0.2, t.tc + 2.2), { backgroundColor: 'rgba(250,252,251,0)' }, 0.5);
    if (i < 4) ctx.hide(st, next - 0.3);
  });
  // Sonderfall: der Wagen bleibt zunächst am Werk stehen (kein Käufer in Sicht)
  ctx.pulse(van, T('VW produziert einen Wagen'), { scale: 1.12 });
  ctx.to(wk, { opacity: 0.3, duration: 0.3 }, T('verkauft ihn aber erst'));

  /* ---------- Merkregel ---------- */
  const tm = T('Die Merkregel'), rule = $('#rule');
  ctx.hide('#drive', tm - 0.3, { dur: 0.3 });
  gsap.set(rule, { autoAlpha: 0 });
  ctx.to(rule, { autoAlpha: 1, duration: 0.01 }, tm - 0.05);
  ctx.show('#rule .q', tm, { x: -30, y: 0 });
  const rls = $$('.rl');
  ctx.show(rls, tm + 0.2, { x: -30, y: 0, stagger: 0.08 });
  rls.forEach((r, i) => {
    const [, k, , t] = RULE[i], cl = r.querySelector('.cl');
    gsap.set([cl, r.querySelector('.cn'), r.querySelector('.ar')], { opacity: 0.18 });
    ctx.to([r.querySelector('.ar'), cl, r.querySelector('.cn')], { opacity: 1, duration: 0.3, stagger: 0.12 }, t + 0.5);
    ctx.pulse(cl, t + 0.75, { scale: 1.2 }).pulse('#f' + k, t + 0.75, { scale: 1.1 });
    ctx.tint(r, t, { backgroundColor: C[CAT[k].c + 'bg'] }).tint(r, t + 1.7, { backgroundColor: 'rgba(250,252,251,0)' }, 0.5);
  });
});
