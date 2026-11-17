// Übung 1-7 – Die wichtigsten Zeithorizonte
V.scene('u17', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const F = V.th.frame(ctx, {
    nr: '1-7', title: 'Die <em>Zeithorizonte</em>', src: 'Skript I, Folie 21',
    question: 'Was sind die wichtigsten Zeithorizonte in der Makroökonomie?',
  });
  const L = V.th.lines(F.ans, [
    `<b id="hK" style="color:var(--c2)">Kurze Frist:</b> <span class="s" id="k1">starre Preise,</span> <span class="s" id="k2">evtl. keine Markträumung,</span> <span class="s" id="k3">Konjunktur,</span> <span class="s" id="k4">Keynes.</span>`,
    `<b id="hL" style="color:var(--c1)">Mittlere bis lange Frist:</b> <span class="s" id="l1">flexible Preise,</span> <span class="s" id="l2">Markträumung,</span> <span class="s" id="l3">Wachstum,</span> <span class="s" id="l4">Klassik-Neoklassik.</span>`,
  ], 'big');

  const S = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`;
  const axes = `<path d="M10 4V66H112" fill="none" stroke="${C.ink}" stroke-width="3.5"/>`;
  // kleine Bilder je Zelle (112 × 72)
  const pic = {
    pK: V.icon('tag', 60, { tone: 2 }) + S(34, 60, `<rect x="4" y="26" width="26" height="24" rx="3" fill="${C.ink}"/><path d="M9 26V17a8 8 0 0116 0v9" fill="none" stroke="${C.ink}" stroke-width="4"/>`),
    pL: `<span id="mvTag" style="display:inline-block">${V.icon('tag', 60, { tone: 1 })}</span>` + S(30, 60, `<path d="M15 4V56M5 16L15 4L25 16M5 44L15 56L25 44" fill="none" stroke="${C.c1}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`),
    mK: S(116, 72, axes + `<path d="M22 12L100 58" stroke="${C.mute}" stroke-width="4" fill="none"/><path d="M22 58L100 12" stroke="${C.mute}" stroke-width="4" fill="none"/><path d="M14 22H108" stroke="${C.c2}" stroke-width="4" stroke-dasharray="7 5"/><path d="M40 22H82" stroke="${C.c2}" stroke-width="8"/>`),
    mL: S(116, 72, axes + `<path d="M22 12L100 58" stroke="${C.mute}" stroke-width="4" fill="none"/><path d="M22 58L100 12" stroke="${C.mute}" stroke-width="4" fill="none"/><circle cx="61" cy="35" r="8" fill="${C.c1}" stroke="#fff" stroke-width="3"/>`),
    tK: S(116, 72, axes + `<path d="M14 54L108 22" stroke="${C.old}" stroke-width="3" stroke-dasharray="6 5"/><path id="wave" d="M14 54C24 34 34 34 42 46S58 52 66 34S84 18 92 30S102 30 108 20" fill="none" stroke="${C.c2}" stroke-width="5" stroke-linecap="round"/>`),
    tL: S(116, 72, axes + `<path id="trend" d="M14 58L108 14" fill="none" stroke="${C.c1}" stroke-width="6" stroke-linecap="round"/>`),
    hK: V.icon('person', 62, { tone: 2 }),
    hL: V.icon('bank', 58, { tone: 1 }),
  };
  const cell = (id, p, txt, sub) => `<div class="cl" id="${id}"><span class="pc">${p}</span><span><span class="ct">${txt}</span>${sub ? `<span class="cs">${sub}</span>` : ''}</span></div>`;
  F.stage.innerHTML = `
  <style>
    #sc-u17 .al.big{font-size:38px;line-height:1.36;margin-bottom:34px}
    #sc-u17 .al.big b{display:block;font-size:44px;margin-bottom:6px;letter-spacing:-.015em}
    #sc-u17 .tlin{left:0;top:0;width:1048px;height:112px}
    #sc-u17 .chn{left:0;width:1048px;height:52px;display:flex;align-items:center;gap:14px}
    #sc-u17 .chn .chip{font-size:28px;padding:4px 16px}
    #sc-u17 .chn .ar{font-family:var(--mono);font-weight:800;font-size:34px;color:var(--mute)}
    #sc-u17 .tb{left:0;top:124px;width:1048px;height:516px;display:grid;grid-template-columns:176px 1fr 1fr;grid-template-rows:68px repeat(4,1fr);padding:0;overflow:hidden}
    #sc-u17 .tb>div{border-bottom:2px solid var(--line);border-right:2px solid var(--line);display:flex;align-items:center}
    #sc-u17 .tb .hh{font-size:31px;font-weight:900;letter-spacing:-.015em;padding:0 20px;border-bottom:3px solid var(--ink)}
    #sc-u17 .tb .rl{font-family:var(--mono);font-size:26px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);padding:0 0 0 18px}
    #sc-u17 .cl{display:flex;align-items:center;width:100%;gap:16px;padding:0 16px}
    #sc-u17 .cl .pc{flex:none;width:120px;display:flex;align-items:center;justify-content:center;gap:4px}
    #sc-u17 .cl .ct{display:block;font-size:33px;font-weight:800;line-height:1.1;letter-spacing:-.015em}
    #sc-u17 .cl .cs{display:block;font-size:26px;font-weight:500;color:var(--mute);line-height:1.15;margin-top:2px}
    #sc-u17 .colK .ct{color:var(--c2)} #sc-u17 .colL .ct{color:var(--c1)}
  </style>

  <!-- Zeitstrahl -->
  <svg class="abs tlin" id="tlin" viewBox="0 0 1048 112"></svg>
  <!-- Merkketten (ersetzen am Ende den Zeitstrahl) -->
  <div class="abs chn" id="ch1" style="top:2px"><span class="chip c2" id="c11">starre Preise</span><span class="ar" id="a11">→</span><span class="chip c2" id="c12">Konjunktur</span><span class="ar" id="a12">→</span><span class="chip c2" id="c13">Keynes</span></div>
  <div class="abs chn" id="ch2" style="top:62px"><span class="chip c1" id="c21">flexible Preise</span><span class="ar" id="a21">→</span><span class="chip c1" id="c22">Wachstum</span><span class="ar" id="a22">→</span><span class="chip c1" id="c23">Klassik</span></div>

  <!-- Schema von Folie 21 -->
  <div class="abs card tb" id="tb">
    <div></div><div class="hh b-c2 t-c2" id="hdK">Kurze Frist</div><div class="hh b-c1 t-c1" id="hdL" style="border-right:0">Mittlere bis lange Frist</div>
    <div class="rl" id="r1">Preise</div><div class="colK">${cell('cK1', pic.pK, 'starr')}</div><div class="colL" style="border-right:0">${cell('cL1', pic.pL, 'flexibel')}</div>
    <div class="rl" id="r2">Märkte</div><div class="colK">${cell('cK2', pic.mK, 'evtl. keine Markträumung')}</div><div class="colL" style="border-right:0">${cell('cL2', pic.mL, 'Markträumung')}</div>
    <div class="rl" id="r3">Thema</div><div class="colK">${cell('cK3', pic.tK, 'Konjunktur', 'Schwankungen der Auslastung')}</div><div class="colL" style="border-right:0">${cell('cL3', pic.tL, 'Wachstum')}</div>
    <div class="rl" id="r4" style="border-bottom:0">Theorie</div><div class="colK" style="border-bottom:0">${cell('cK4', pic.hK, 'Keynes')}</div><div class="colL" style="border-bottom:0;border-right:0">${cell('cL4', pic.hL, 'Klassik-Neoklassik')}</div>
  </div>`;

  /* ---------- Zeitstrahl ---------- */
  const tl = $('#tlin');
  const base = V.arrow(tl, 'M10 78H1030', { cls: 'ink', w: 6, head: 26 });
  const brK = V.S('path', { d: 'M14 58V40H330V58', fill: 'none', stroke: C.c2, 'stroke-width': 6, 'stroke-linejoin': 'round' });
  const brL = V.S('path', { d: 'M350 58V40H990V58', fill: 'none', stroke: C.c1, 'stroke-width': 6, 'stroke-linejoin': 'round' });
  const txK = V.S('text', { x: 172, y: 28, 'text-anchor': 'middle', class: 'lbl c2' }, 'kurze Frist');
  const txL = V.S('text', { x: 670, y: 28, 'text-anchor': 'middle', class: 'lbl c1' }, 'mittlere bis lange Frist');
  const txZ = V.S('text', { x: 1030, y: 108, 'text-anchor': 'end', class: 'lbl mute' }, 'Zeit');
  tl.append(brK, brL, txK, txL, txZ);
  gsap.set([txK, txL, txZ], { autoAlpha: 0 });
  ctx.drawArrow(base, 1.0, 0.9).to(txZ, { autoAlpha: 1, duration: 0.3 }, 1.6);
  const tK = T('die kurze Frist'), tLg = T('die mittlere bis lange Frist');
  ctx.draw(brK, tK, 0.5).to(txK, { autoAlpha: 1, duration: 0.3 }, tK + 0.2);
  ctx.draw(brL, tLg, 0.6).to(txL, { autoAlpha: 1, duration: 0.3 }, tLg + 0.2);

  /* ---------- Antwort ---------- */
  gsap.set(L, { autoAlpha: 0 });
  gsap.set($$('.al .s'), { opacity: 0 });
  ctx.to(L[0], { autoAlpha: 1, duration: 0.35 }, tK).to(L[1], { autoAlpha: 1, duration: 0.35 }, tLg);

  /* ---------- Tabelle ---------- */
  const hd = [$('#hdK'), $('#hdL')], rl = [1, 2, 3, 4].map(i => $('#r' + i));
  const cK = [1, 2, 3, 4].map(i => $('#cK' + i)), cL = [1, 2, 3, 4].map(i => $('#cL' + i));
  gsap.set([...cK, ...cL, ...hd], { autoAlpha: 0 });
  gsap.set(rl, { opacity: 0.35 });
  ctx.show('#tb', 1.3, { y: 26 });
  ctx.to(hd[0], { autoAlpha: 1, duration: 0.3 }, tK).to(hd[1], { autoAlpha: 1, duration: 0.3 }, tLg);
  ctx.to(rl[0], { opacity: 1, duration: 0.3 }, T('Der Unterschied')).pulse(rl[0], T('bei den Preisen'), { scale: 1.12, origin: '0% 50%' });
  const tKs = [T('In der kurzen Frist'), T('Märkte werden deshalb'), T('Hier geht es um die Konjunktur'), T('Die passende Theorie stammt')];
  const tLs = [T('In der mittleren bis langen'), T('und die Märkte werden'), T('Hier geht es um Wachstum'), T('Die passende Theorie ist')];
  const aK = [T('sind die Preise starr'), T('eventuell nicht geräumt'), T('um die Konjunktur'), T('von Keynes')];
  const aL = [T('sind die Preise flexibel'), T('werden geräumt'), T('um Wachstum'), T('die Klassik und Neoklassik')];
  cK.forEach((c, i) => {
    ctx.to(rl[i], { opacity: 1, duration: 0.3 }, tKs[i]);
    ctx.to(c, { autoAlpha: 1, duration: 0.35 }, aK[i] - 0.15).pulse(c, aK[i], { scale: 1.05, origin: '0% 50%' });
    ctx.to('#k' + (i + 1), { opacity: 1, duration: 0.3 }, aK[i]);
  });
  cL.forEach((c, i) => {
    ctx.to(c, { autoAlpha: 1, duration: 0.35 }, aL[i] - 0.15).pulse(c, aL[i], { scale: 1.05, origin: '0% 50%' });
    ctx.to('#l' + (i + 1), { opacity: 1, duration: 0.3 }, aL[i]);
  });
  // kleine Bewegungen: Konjunkturwelle zeichnet sich, das flexible Preisschild wandert, der Trend wächst
  ctx.draw($('#wave'), aK[2], 1.6, { ease: 'none' });
  ctx.to('#mvTag', { y: -9, duration: 0.45, yoyo: true, repeat: 5, ease: 'sine.inOut' }, aL[0]);
  ctx.draw($('#trend'), aL[2], 1.0);
  // während die lange Frist erklärt wird, tritt die kurze zurück – und umgekehrt
  ctx.dim(L[1], tKs[0], { to: 0.45 }).undim(L[1], tLs[0]).dim(L[0], tLs[0], { to: 0.45 });

  /* ---------- Merkketten ---------- */
  const t3 = T('Merk dir');
  ctx.undim(L[0], t3);
  ctx.hide(tl, t3 - 0.3, { dur: 0.3 });
  const ids = ['c11', 'a11', 'c12', 'a12', 'c13', 'c21', 'a21', 'c22', 'a22', 'c23'].map(s => $('#' + s));
  gsap.set(ids, { autoAlpha: 0 });
  const on = (id, t) => ctx.to('#' + id, { autoAlpha: 1, duration: 0.25 }, t);
  on('c11', T('Starre Preise, Konjunktur')); on('a11', T('Konjunktur, Keynes') - 0.2); on('c12', T('Konjunktur, Keynes')); on('a12', T('Keynes.', { n: 2 }) - 0.2); on('c13', T('Keynes.', { n: 2 }));
  on('c21', T('Flexible Preise, Wachstum')); on('a21', T('Wachstum, Klassik') - 0.2); on('c22', T('Wachstum, Klassik')); on('a22', T('Klassik.') - 0.2); on('c23', T('Klassik.'));
  // dazu leuchten die passenden Zellen der Tabelle auf
  [[cK[0], 'Starre Preise, Konjunktur'], [cK[2], 'Konjunktur, Keynes'], [cL[0], 'Flexible Preise, Wachstum'], [cL[2], 'Wachstum, Klassik'], [cL[3], 'Klassik.']].forEach(([c, ph]) => ctx.pulse(c, T(ph), { scale: 1.06, origin: '0% 50%' }));
  ctx.pulse(cK[3], T('Keynes.', { n: 2 }), { scale: 1.06, origin: '0% 50%' });
});
