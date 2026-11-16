// Aufgabe 1 a – Definition des BIP (Lückentext: „Wert“, „Endprodukte“)
V.scene('a1a', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 1 a', title: 'Definition des <em>BIP</em>', src: 'Übung 1-3 · Skript I, Folie 23' });

  const sheet = `<svg class="ico" viewBox="0 0 120 100" height="92" width="110"><path class="f4" d="M22 62l40-22 52 14-40 24z"/><path class="f4" d="M14 46l40-22 52 14-40 24z"/><path class="a4" d="M6 30l40-22 52 14-40 24z"/></svg>`;
  const chip = `<svg class="ico" viewBox="0 0 100 100" height="92" width="92"><path class="st" d="M30 8v14M50 8v14M70 8v14M30 78v14M50 78v14M70 78v14M8 30h14M8 50h14M8 70h14M78 30h14M78 50h14M78 70h14"/><rect class="a1" x="22" y="22" width="56" height="56" rx="4"/><rect class="fp" x="38" y="38" width="24" height="24"/></svg>`;

  ctx.html(`
  <style>
    #sc-a1a .def{left:0;top:0;width:1728px;font-size:45px;font-weight:600;line-height:1.5;padding:22px 36px 26px}
    #sc-a1a .def .w{display:inline-block}
    #sc-a1a .gap{display:inline-block;position:relative;border-bottom:5px solid var(--ink);background:var(--soft);padding:0 16px;margin:0 4px;line-height:1.22;font-weight:800}
    #sc-a1a .gap b{display:inline-block}
    #sc-a1a .stg{left:0;top:206px;width:1728px;height:564px}
    #sc-a1a .q{font-size:50px;font-weight:800;letter-spacing:-.02em}
    #sc-a1a .sub{font-size:32px;color:var(--mute);font-weight:500;margin-left:22px}
    #sc-a1a .op{font-family:var(--mono);font-weight:800;font-size:76px}
    #sc-a1a .ptag{font-family:var(--mono);font-weight:700;font-size:36px;padding:6px 20px}
    #sc-a1a .node{width:330px;text-align:center;padding:16px 16px 14px}
    #sc-a1a .node .nm{font-weight:700;font-size:32px;line-height:1.1;margin-top:4px}
    #sc-a1a .node .pr{font-family:var(--mono);font-weight:700;font-size:32px}
    #sc-a1a .tally{width:640px}
  </style>

  <div class="abs chip ink" id="luecke" style="left:0;top:118px;font-size:28px;letter-spacing:.1em">LÜCKENTEXT IN DER KLAUSUR · 2 WÖRTER FEHLEN</div>
  <div class="abs card def">
    <span class="w">Das BIP ist der</span> <span class="gap" id="g1"><b>Wert</b></span>
    <span class="w">aller</span> <span class="gap" id="g2"><b>Endprodukte</b></span>
    <span class="w">einer Volkswirtschaft,</span> <span class="w">die in einem bestimmten,</span>
    <span class="w">abgeschlossenen Zeitraum</span> <span class="w">erzeugt werden.</span>
  </div>

  <!-- Bühne 1: Wert -->
  <div class="abs stg" id="s1">
    <div class="abs" style="left:0;top:0"><span class="q">Warum <span class="t-c1">„Wert“</span>?</span><span class="sub" id="s1sub">Jedes Gut wird mit seinem Marktpreis bewertet.</span></div>
    <div class="abs" id="cars" style="left:0;top:112px;display:flex;gap:10px">${V.icon('car', 118, { tone: 1 }).repeat(4)}</div>
    <div class="abs op" id="plus" style="left:762px;top:118px">+</div>
    <div class="abs" id="pcs" style="left:846px;top:112px;display:flex;gap:12px">${V.icon('computer', 118, { tone: 4 }).repeat(5)}</div>
    <div class="abs op" id="eqs" style="left:1560px;top:118px">=</div>
    <div class="abs op t-c2" id="qm" style="left:1640px;top:112px;font-size:92px">?</div>
    <div class="abs chip c1 ptag" id="tag1" style="left:212px;top:252px">4 × 10.000 €</div>
    <div class="abs chip c4 ptag" id="tag2" style="left:1070px;top:252px">5 × 1.000 €</div>
    <div class="abs res" id="s1res" style="left:0;top:372px;width:1728px;display:flex;align-items:center;justify-content:space-between;padding:26px 40px 30px">
      <span class="lab" style="margin:0;font-size:26px">BIP zu<br>Marktpreisen</span>
      <span class="eq xl"><span class="t-c1">4 · 10.000 €</span> + <span class="t-c4">5 · 1.000 €</span> = <b id="sum">45.000 €</b></span>
    </div>
  </div>

  <!-- Bühne 2: Endprodukte -->
  <div class="abs stg" id="s2">
    <div class="abs" style="left:0;top:0"><span class="q">Warum <span class="t-c2">„Endprodukte“</span>?</span><span class="sub" id="s2sub">Zwischenprodukte stecken schon im Preis des fertigen Guts.</span></div>
    <svg class="abs" id="s2svg" style="left:0;top:0" width="1728" height="564"></svg>
    <div class="abs card node" id="n1" style="left:0;top:110px">${chip}<div class="nm">Elektronik</div><div class="pr t-c1">2.000 €</div></div>
    <div class="abs card node" id="n2" style="left:0;top:340px">${sheet}<div class="nm">Bleche</div><div class="pr t-c4">1.000 €</div></div>
    <div class="abs card node" id="n3" style="left:520px;top:190px;width:400px;padding:26px 16px 20px">${V.icon('car', 150, { tone: 2 })}<div class="nm" style="font-size:36px">fertiges Auto</div><div class="pr t-c2" style="font-size:40px">10.000 €</div></div>
    <div class="abs card tally" id="bad" style="left:1088px;top:110px">
      <span class="lab">Alles zusammengezählt</span>
      <div class="eq sm">2.000 + 1.000 + 10.000</div>
      <div class="eq lg" style="position:relative;display:inline-block">= <span id="badsum">13.000 €</span>
        <svg class="abs" style="left:-14px;top:0" width="330" height="70"><line id="strike" x1="60" y1="52" x2="320" y2="18" stroke="${C.c2}" stroke-width="8" stroke-linecap="round"/></svg></div>
      <div class="chip c2" id="dbl" style="position:absolute;right:24px;top:124px;transform:rotate(-4deg)">doppelt gezählt</div>
    </div>
    <div class="abs res tally" id="good" style="left:1088px;top:356px">
      <span class="lab">Im BIP zählt nur das Endprodukt</span>
      <div class="eq xl" style="display:flex;align-items:center;gap:20px"><span>BIP = <b>10.000 €</b></span>${V.icon('check', 64)}</div>
    </div>
  </div>

  <!-- Bühne 3: Einkommen = Ausgaben -->
  <div class="abs stg" id="s3">
    <div class="abs" style="left:0;top:0"><span class="q">Das BIP misst <span class="t-c1">zwei Seiten</span> zugleich</span></div>
    <svg class="abs" id="s3svg" style="left:0;top:0" width="1728" height="564"></svg>
    <div class="abs card node" id="hh" style="left:90px;top:206px;width:360px">${V.icon('people', 130, { tone: 1 })}<div class="nm">Haushalte</div></div>
    <div class="abs card node" id="un" style="left:1278px;top:206px;width:360px">${V.icon('factory', 130, { tone: 3 })}<div class="nm">Unternehmen</div></div>
    <div class="abs chip c1" id="l-ein" style="left:724px;top:96px;font-size:34px">Einkommen</div>
    <div class="abs chip c2" id="l-aus" style="left:746px;top:488px;font-size:34px">Ausgaben</div>
    <div class="abs" id="mid" style="left:534px;top:230px;width:660px;text-align:center">
      <div class="eq xl"><span class="t-c1">Einkommen</span> = <span class="t-c2">Ausgaben</span></div>
      <div class="small" style="margin-top:6px;font-size:29px;white-space:nowrap">Was die einen ausgeben, verdienen die anderen.</div>
    </div>
  </div>`);

  /* ---------- Satz mit Lücken ---------- */
  // am Anfang steht der Satz groß in der Mitte, zur ersten Erklärung rückt er nach oben
  const def = $('.def');
  gsap.set(def, { transformOrigin: '50% 0%' });
  ctx.tl.fromTo(def, { autoAlpha: 0, y: 250, scale: 1 }, { autoAlpha: 1, y: 190, scale: 1, duration: 0.6, ease: 'power3.out' }, 0.9);
  ctx.show('#luecke', 1.3, { y: 0, x: -20 });
  ctx.hide('#luecke', T('Warum Wert?') - 0.5);
  ctx.to(def, { y: 0, duration: 0.7, ease: 'power3.inOut' }, T('Warum Wert?') - 0.55);
  const words = $$('.def .w'), gaps = $$('.gap'), gapB = $$('.gap b');
  gsap.set(gapB, { autoAlpha: 0 });
  const tW = [T('Das BIP ist der Wert'), T('aller Endprodukte'), T('einer Volkswirtschaft'), T('die in einem bestimmten'), T('abgeschlossenen Zeitraum'), T('erzeugt werden')];
  gsap.set(words, { opacity: 0.26 });
  words.forEach((w, i) => ctx.to(w, { opacity: 1, duration: 0.35 }, tW[i]));
  // Lücken pulsieren, während der Satz gelesen wird …
  ctx.tint(gaps[0], T('der Wert aller'), { backgroundColor: C.c2bg, borderColor: C.c2 }).pulse(gaps[0], T('der Wert aller'));
  ctx.tint(gaps[1], T('Endprodukte einer'), { backgroundColor: C.c2bg, borderColor: C.c2 }).pulse(gaps[1], T('Endprodukte einer'));
  // … und werden bei der Auflösung gefüllt
  const fill = (i, t, col, bg) => {
    gsap.set(gapB[i], { y: -46, scale: 1.5 });
    ctx.to(gapB[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, t);
    ctx.tint(gaps[i], t, { backgroundColor: bg, borderColor: col, color: col });
  };
  fill(0, T('Wert, und Endprodukte'), C.c1, C.c1bg);
  fill(1, T('und Endprodukte.') + 0.25, C.c2, C.c2bg);

  /* ---------- Bühne 1: Wert ---------- */
  const t1 = T('Warum Wert?');
  ctx.show('#s1 .q', t1, { x: -30, y: 0 });
  ctx.pulse(gaps[0], t1, { scale: 1.18 });
  ctx.dim(gaps[1], t1, { to: 0.4 });
  ctx.pop('#cars svg', T('Autos und Computer'), { stagger: 0.07 });
  ctx.pop('#plus', T('Autos und Computer') + 0.35);
  ctx.pop('#pcs svg', T('und Computer lassen'), { stagger: 0.06 });
  ctx.pop('#eqs', T('nicht einfach addieren'));
  ctx.pop('#qm', T('nicht einfach addieren') + 0.2);
  ctx.to('#qm', { rotation: 14, duration: 0.14, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T('nicht einfach addieren') + 0.6);
  ctx.show('#s1sub', T('Deshalb bewertet'), { x: -20, y: 0 });
  ctx.show('#tag1', T('Vier Autos'), { y: -18 }).pulse('#cars', T('Vier Autos'), { scale: 1.04 });
  ctx.show('#tag2', T('fünf Computer'), { y: -18 }).pulse('#pcs', T('fünf Computer'), { scale: 1.04 });
  ctx.show('#s1res', T('ergeben ein BIP'), { y: 30 });
  ctx.count('#sum', 45000, T('ergeben ein BIP') + 0.3, { from: 0, dur: 1.5, suf: ' €' });
  ctx.hide('#qm', T('fünfundvierzigtausend'));
  ctx.pulse('#sum', T('fünfundvierzigtausend') + 0.5, { scale: 1.12 });

  /* ---------- Bühne 2: Endprodukte ---------- */
  const t2 = T('Warum Endprodukte?');
  ctx.hide('#s1', t2 - 0.3, { y: -16, dur: 0.3 });
  gsap.set($('#s2'), { autoAlpha: 0 }); ctx.to('#s2', { autoAlpha: 1, duration: 0.01 }, t2 - 0.1);
  ctx.show('#s2 .q', t2, { x: -30, y: 0 });
  ctx.undim(gaps[1], t2).pulse(gaps[1], t2, { scale: 1.12 }).dim(gaps[0], t2, { to: 0.4 });
  const svg2 = $('#s2svg');
  const a1 = V.arrow(svg2, 'M340 205 C430 205 430 300 508 318', { cls: 'c1' });
  const a2 = V.arrow(svg2, 'M340 440 C430 440 430 392 508 372', { cls: 'c4' });
  ctx.pop('#n3', T('In einem Auto'), { scale: 0.8 });
  ctx.show('#n1', T('stecken Elektronik'), { x: -40, y: 0 }).drawArrow(a1, T('stecken Elektronik') + 0.3, 0.6);
  ctx.show('#n2', T('und Bleche'), { x: -40, y: 0 }).drawArrow(a2, T('und Bleche') + 0.3, 0.6);
  ctx.show('#s2sub', T('und Bleche') + 1.2, { x: -20, y: 0 });
  ctx.show('#bad', T('Würde man alles'), { x: 40, y: 0 });
  ctx.count('#badsum', 13000, T('Würde man alles') + 0.5, { dur: 1.1, suf: ' €' });
  gsap.set($('#dbl'), { autoAlpha: 0, scale: 1.6 });
  ctx.to('#dbl', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.in' }, T('doppelt drin'));
  ctx.extend('#strike', T('doppelt drin') + 0.35, 0.35);
  ctx.tint('#badsum', T('doppelt drin') + 0.35, { color: C.c2 });
  ctx.pulse(['#n1', '#n2'].map(s => $(s)), T('diese Teile'), { scale: 1.06 });
  const t2b = T('Gezählt wird deshalb');
  ctx.dim(['#n1', '#n2', '#bad', a1, a2].map(s => (typeof s === 'string' ? $(s) : s)), t2b, { to: 0.3 });
  ctx.show('#good', t2b + 0.2, { y: 30 });
  ctx.tint('#n3', T('nur das fertige Auto'), { borderColor: C.c3, boxShadow: `8px 8px 0 ${C.c3bg}` }).pulse('#n3', T('nur das fertige Auto'), { scale: 1.07 });

  /* ---------- Bühne 3: Einkommen = Ausgaben ---------- */
  const t3 = T('Und merk dir');
  ctx.hide('#s2', t3 - 0.3, { y: -16, dur: 0.3 });
  gsap.set($('#s3'), { autoAlpha: 0 }); ctx.to('#s3', { autoAlpha: 1, duration: 0.01 }, t3 - 0.1);
  ctx.undim(gaps, t3);
  ctx.show('#s3 .q', t3, { x: -30, y: 0 });
  ctx.show('#hh', t3 + 0.2, { x: -40, y: 0 }).show('#un', t3 + 0.35, { x: 40, y: 0 });
  const svg3 = $('#s3svg');
  const top = V.arrow(svg3, 'M1270 250 C1040 96 700 96 462 250', { cls: 'c1', w: 9, head: 30 });
  const bot = V.arrow(svg3, 'M462 420 C700 560 1040 560 1270 420', { cls: 'c2', w: 9, head: 30 });
  ctx.drawArrow(top, T('alle Einkommen'), 0.9).show('#l-ein', T('alle Einkommen') + 0.3, { y: 16 });
  ctx.drawArrow(bot, T('alle Ausgaben'), 0.9).show('#l-aus', T('alle Ausgaben') + 0.3, { y: -16 });
  ctx.show('#mid', T('Was die einen'), { y: 0, scale: 0.8, ease: 'back.out(1.5)' });
  // Münzen laufen im Kreis: Ausgaben (unten) und Einkommen (oben)
  const coins = [0, 1, 2, 3].map(i => { const g = V.S('g', {}); g.innerHTML = `<circle r="17" fill="${i % 2 ? C.c1 : C.c2}" stroke="${C.ink}" stroke-width="4"/><text y="9" text-anchor="middle" style="font-size:24px;font-weight:800;fill:#fff">€</text>`; svg3.appendChild(g); gsap.set(g, { autoAlpha: 0 }); return g; });
  const tc = T('Was die einen');
  [[coins[0], bot._path, 0], [coins[2], bot._path, 1.5], [coins[1], top._path, 0.75], [coins[3], top._path, 2.25]].forEach(([c, p, d]) => {
    ctx.to(c, { autoAlpha: 1, duration: 0.2 }, tc + d).along(c, p, tc + d, 2.6, { from: 0.03, to: 0.93, ease: 'sine.inOut' }).to(c, { autoAlpha: 0, duration: 0.25 }, tc + d + 2.4);
  });
});
