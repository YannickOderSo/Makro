// Aufgabe 1 d – „Zwei Definitionen“: die Kandidaten aus Kapitel 1 (Skript I, Folien 31–34)
V.scene('a1d', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Aufgabe 1 d', title: 'Zwei <em>Definitionen</em>', src: 'Skript I, Folien 31–34' });

  // Stellhebel-Grafik: zwei Regler (Preise, Mengen) und ein Balken für das BIP
  const lever = (id, col, barLabel, lock) => `
    <svg id="${id}" width="350" height="262" viewBox="0 0 350 262">
      <text x="0" y="28" style="font-size:27px;font-weight:700">Preise <tspan class="up1" fill="${C.c2}">↑</tspan></text>
      <line x1="8" y1="58" x2="216" y2="58" stroke="${C.line}" stroke-width="10" stroke-linecap="round"/>
      <line class="fill1" x1="8" y1="58" x2="70" y2="58" stroke="${lock ? C.old : C.ink}" stroke-width="10" stroke-linecap="round"/>
      <circle class="k1" cx="70" cy="58" r="17" fill="${lock ? C.soft : C.panel}" stroke="${lock ? C.old : C.ink}" stroke-width="5"/>
      ${lock ? `<text class="lk" x="8" y="104" fill="${C.mute}" style="font-size:26px;font-weight:700">fest: Basisjahr</text>` : ''}
      <text x="0" y="${lock ? 158 : 138}" style="font-size:27px;font-weight:700">Mengen <tspan class="up2" fill="${C.c2}">↑</tspan></text>
      <line x1="8" y1="${lock ? 188 : 168}" x2="216" y2="${lock ? 188 : 168}" stroke="${C.line}" stroke-width="10" stroke-linecap="round"/>
      <line class="fill2" x1="8" y1="${lock ? 188 : 168}" x2="70" y2="${lock ? 188 : 168}" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
      <circle class="k2" cx="70" cy="${lock ? 188 : 168}" r="17" fill="${C.panel}" stroke="${C.ink}" stroke-width="5"/>
      <line x1="252" y1="232" x2="346" y2="232" stroke="${C.ink}" stroke-width="4"/>
      <rect class="bar" x="266" y="142" width="66" height="90" fill="${col}"/>
      <text x="299" y="260" text-anchor="middle" fill="${C.mute}" style="font-size:26px;font-weight:700">${barLabel}</text>
    </svg>`;

  ctx.html(`
  <style>
    #sc-a1d .hint{left:0;top:0;width:1728px;font-size:33px;font-weight:600;line-height:1.3}
    #sc-a1d .hint b{font-weight:800;color:var(--c2)}
    #sc-a1d .slip{top:230px;width:640px;height:200px;border:4px dashed var(--old);background:var(--panel);display:flex;align-items:center;justify-content:space-between;padding:0 56px}
    #sc-a1d .slip .l{font-family:var(--mono);font-weight:700;font-size:36px;letter-spacing:.1em;color:var(--mute)}
    #sc-a1d .slip .q{font-family:var(--mono);font-weight:800;font-size:130px;line-height:1;color:var(--c2)}
    #sc-a1d .dc{width:852px;height:340px;padding:20px 26px 0 28px;display:flex;gap:18px;border-width:4px}
    #sc-a1d .dc .txt{flex:1;min-width:0}
    #sc-a1d .dc .hdr{display:flex;align-items:center;gap:16px;margin-bottom:12px}
    #sc-a1d .dc .ttl{font-size:44px;font-weight:800;letter-spacing:-.02em;line-height:1.05;white-space:nowrap}
    #sc-a1d .dc .f{font-family:var(--mono);font-weight:700;font-size:31px;line-height:1.32;white-space:nowrap}
    #sc-a1d .dc .nt{font-size:28px;line-height:1.25;font-weight:600;color:var(--mute);margin-top:12px}
    #sc-a1d .dc .nt b{color:var(--ink);font-weight:800}
    #sc-a1d .ex{width:340px;text-align:center;padding-top:6px}
    #sc-a1d .ex .lab{white-space:nowrap;letter-spacing:.08em}
    #sc-a1d .dc svg text{stroke:none}
    #sc-a1d .dc .f.ind{padding-left:0}
    #sc-a1d .yn{width:340px}
    #sc-a1d .yn .r{display:flex;align-items:center;gap:12px;height:86px}
    #sc-a1d .yn .lb{font-size:28px;font-weight:700;line-height:1.1}
    #sc-a1d .yn .lb small{display:block;font-size:26px;font-weight:600;color:var(--mute)}
  </style>

  <div class="abs hint" id="hint">Welche zwei gefragt waren, ist <b>nicht überliefert</b> – das sind die Kandidaten aus Kapitel 1.</div>
  <div class="abs slip" id="sl1" style="left:194px"><span class="l">DEFINITION 1</span><span class="q">?</span></div>
  <div class="abs slip" id="sl2" style="left:894px"><span class="l">DEFINITION 2</span><span class="q">?</span></div>

  <div class="abs card dc c1" id="d1" style="left:0;top:70px">
    <div class="txt"><div class="hdr"><span class="step" style="background:${C.c1}">1</span><span class="ttl">Nominales BIP</span></div>
      <div class="f p1">= <span class="t-c1">Mengen</span> ·<br>&nbsp; <span class="t-c1">aktuelle Preise</span></div>
      <div class="nt p0">Euro-Wert der Produktion</div>
      <div class="nt p2">steigt, wenn <b>Preise</b> und/oder <b>Mengen</b> steigen</div></div>
    ${lever('lv1', C.c1, 'nominal', false)}
  </div>

  <div class="abs card dc c4" id="d2" style="left:876px;top:70px">
    <div class="txt"><div class="hdr"><span class="step" style="background:${C.c4}">2</span><span class="ttl">Reales BIP</span></div>
      <div class="f p1" style="font-size:28px">= <span class="t-c4">aktuelle Mengen</span> ·<br>&nbsp; <span class="t-c4">Preise des Basisjahres</span></div>
      <div class="nt p2">steigt <b>nur</b>, wenn wirklich<br>mehr produziert wird</div></div>
    ${lever('lv2', C.c4, 'real', true)}
  </div>

  <div class="abs card dc c2" id="d3" style="left:0;top:430px">
    <div class="txt"><div class="hdr"><span class="step" style="background:${C.c2}">3</span><span class="ttl">BIP-Deflator</span></div>
      <div class="f p1" style="font-size:33px">= ${V.frac('<span class="t-c1">nominales BIP</span>', '<span class="t-c4">reales BIP</span>')}</div>
      <div class="nt p2">Preis einer <b>typischen produzierten Einheit</b> relativ zum Basisjahr</div></div>
    <div class="ex"><div class="ic">${V.icon('tag', 96, { tone: 2 })}</div>
      <span class="lab" style="margin:12px 0 4px">Beispiel aus Aufgabe 2</span>
      <div class="f" style="font-size:30px">${V.frac('25', '15')} · 100 = <span class="t-c2" style="font-weight:800">166,7</span></div></div>
  </div>

  <div class="abs card dc c3" id="d4" style="left:876px;top:430px">
    <div class="txt"><div class="hdr"><span class="step" style="background:${C.c3}">4</span><span class="ttl">Investition</span></div>
      <div class="f p1">= Schaffung von<br>&nbsp; <span class="t-c3">neuem Kapital</span></div>
      <div class="nt p2">Besitzerwechsel von Vermögen:<br><b>nur Umverteilung</b></div></div>
    <div class="yn">
      <div class="r y1">${V.icon('check', 56)}<div class="lb">neues Haus bauen<small>neue Fabrik</small></div></div>
      <div class="r y2">${V.icon('cross', 56)}<div class="lb">alte Villa kaufen</div></div>
      <div class="r y3">${V.icon('cross', 56)}<div class="lb">Aktien an der Börse<small>kaufen</small></div></div>
    </div>
  </div>`);

  /* ---------- Auftakt ---------- */
  ctx.pop('#sl1', 0.9, { scale: 0.8 }).pop('#sl2', 1.15, { scale: 0.8 });
  ctx.to($$('.slip .q'), { rotation: 12, duration: 0.16, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T('Welche genau'));
  ctx.show('#hint', T('ist nicht überliefert'), { y: 0, x: -24 });
  const tG = T('Am wahrscheinlichsten');
  ctx.hide(['#sl1', '#sl2'].map(s => $(s)), tG - 0.3, { dur: 0.3 });

  const cards = [1, 2, 3, 4].map(i => $('#d' + i));
  // erst nur die Überschriften (abgedunkelt), der Inhalt klappt beim Erklären auf
  cards.forEach(c => gsap.set([...c.querySelectorAll('.txt .f, .txt .nt, svg:not(.ico), .ex, .yn .r')], { autoAlpha: 0 }));
  ctx.show(cards, tG, { y: 30, stagger: 0.14 });
  ctx.to(cards, { opacity: 0.4, duration: 0.01 }, tG + 1.2);
  const open = (i, t) => { ctx.to(cards[i], { opacity: 1, duration: 0.35 }, t).pulse(cards[i].querySelector('.step'), t, { scale: 1.25 }); };
  const rv = (el, t, d = 0.35) => ctx.to(el, { autoAlpha: 1, duration: d }, t);
  const q = (i, s) => cards[i].querySelector(s);

  // Regler bewegen und Balken wachsen lassen
  const knob = (sv, n, t, to = 176) => {
    ctx.to(sv.querySelector('.k' + n), { attr: { cx: to }, duration: 0.7, ease: 'power2.inOut' }, t);
    ctx.to(sv.querySelector('.fill' + n), { attr: { x2: to }, duration: 0.7, ease: 'power2.inOut' }, t);
    ctx.to(sv.querySelector('.up' + n), { autoAlpha: 1, duration: 0.25 }, t + 0.2);
  };
  const grow = (sv, t, h) => ctx.to(sv.querySelector('.bar'), { attr: { y: 232 - h, height: h }, duration: 0.7, ease: 'power2.inOut' }, t + 0.15);

  /* ---------- 1 Nominales BIP ---------- */
  const lv1 = $('#lv1');
  gsap.set(lv1.querySelectorAll('.up1, .up2'), { autoAlpha: 0 });
  open(0, T('Das nominale BIP'));
  rv(q(0, '.p0'), T('Euro-Wert der Produktion'));
  rv(q(0, '.p1'), T('also Mengen mal'));
  rv(lv1, T('also Mengen mal') + 0.4);
  rv(q(0, '.p2'), T('Es kann steigen'));
  knob(lv1, 1, T('weil die Preise steigen')); grow(lv1, T('weil die Preise steigen'), 140);
  knob(lv1, 2, T('weil die Mengen steigen')); grow(lv1, T('weil die Mengen steigen'), 200);
  ctx.pulse(lv1.querySelectorAll('.k1, .k2'), T('oder beides'), { scale: 1.35 }).pulse(lv1.querySelector('.bar'), T('oder beides'), { scale: 1.06, origin: '50% 100%' });

  /* ---------- 2 Reales BIP ---------- */
  const lv2 = $('#lv2');
  gsap.set(lv2.querySelectorAll('.up1, .up2'), { autoAlpha: 0 });
  gsap.set(lv2.querySelector('.lk'), { autoAlpha: 0 });
  open(1, T('Das reale BIP'));
  rv(q(1, '.p1'), T('bewertet die aktuellen Mengen'));
  rv(lv2, T('bewertet die aktuellen Mengen') + 0.4);
  ctx.to(lv2.querySelector('.lk'), { autoAlpha: 1, duration: 0.3 }, T('mit den konstanten Preisen')).pulse(lv2.querySelector('.k1'), T('mit den konstanten Preisen'), { scale: 1.3 });
  rv(q(1, '.p2'), T('Es steigt nur'));
  // der gesperrte Preisregler rüttelt nur – der Balken bleibt
  ctx.to(lv2.querySelector('.k1'), { x: 9, duration: 0.09, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T('Es steigt nur') + 0.3);
  knob(lv2, 2, T('wenn wirklich mehr produziert')); grow(lv2, T('wenn wirklich mehr produziert'), 160);

  /* ---------- 3 BIP-Deflator ---------- */
  open(2, T('Der BIP-Deflator'));
  rv(q(2, '.p1'), T('ist nominales geteilt'));
  ctx.pulse(cards[0].querySelector('.ttl'), T('ist nominales geteilt'), { scale: 1.08, origin: '0% 50%' }).pulse(cards[1].querySelector('.ttl'), T('durch reales BIP'), { scale: 1.08, origin: '0% 50%' });
  rv(q(2, '.p2'), T('Er zeigt den Preis'));
  rv(q(2, '.ex'), T('Er zeigt den Preis') + 0.3);
  ctx.pulse(q(2, '.ex .ic'), T('typischen produzierten Einheit'), { scale: 1.2 });

  /* ---------- 4 Investition ---------- */
  open(3, T('Und eine Investition'));
  rv(q(3, '.p1'), T('ist nur die Schaffung'));
  rv(q(3, '.y1'), T('von neuem Kapital')).pulse(q(3, '.y1 svg'), T('von neuem Kapital') + 0.3, { scale: 1.25 });
  rv(q(3, '.y2'), T('eine alte Villa')).pulse(q(3, '.y2 svg'), T('eine alte Villa') + 0.3, { scale: 1.25 });
  rv(q(3, '.y3'), T('Aktien an der Börse')).pulse(q(3, '.y3 svg'), T('Aktien an der Börse') + 0.3, { scale: 1.25 });
  rv(q(3, '.p2'), T('verteilt Vermögen nur um'));
  ctx.pulse(q(3, '.p2'), T('verteilt Vermögen nur um') + 0.5, { scale: 1.06, origin: '0% 50%' });
});
