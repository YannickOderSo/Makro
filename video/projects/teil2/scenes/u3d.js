// Übung 3 c – Die Regierung erhöht die Steuern: IS nach links; zum Schluss die Übersicht aller drei Maßnahmen
V.scene('u3d', ctx => {
  const { T, $, $$ } = ctx, U = V.t2u3, C = V.C;
  const tDraw = T('aber diesmal verschiebt sich') + 0.9;

  // Mini-Diagramm für die Übersichtstabelle: kind 'LM' | 'IS', dx = Verschiebung in px
  const mini = (kind, dx) => {
    const k = 74 / 106, ln = (x0, up) => `M${x0} ${up ? 96 : 22}L${x0 + 106} ${up ? 22 : 96}`;
    const isLM = kind === 'LM', col = isLM ? C.c2 : C.c1, ay = isLM ? 84 : 36;
    const xa = 44 + (isLM ? (96 - ay) : (ay - 22)) / k, xb = xa + dx, d = dx > 0 ? 1 : -1;   // Pfeil von der alten zur neuen Kurve
    return `<svg width="200" height="124" viewBox="0 0 200 124"><path d="M20 8V106H192" fill="none" stroke="${C.ink}" stroke-width="3"/>
      <path d="${ln(44, !isLM)}" stroke="${isLM ? C.c1 : C.c2}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="${ln(44, isLM)}" stroke="${C.old}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="${ln(44 + dx, isLM)}" stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M${xa + d * 5} ${ay}H${xb - d * 12}" stroke="${C.ink}" stroke-width="3.5" fill="none"/><path d="M${xb - d * 4} ${ay}l${-d * 10} -6.5v13z" fill="${C.ink}"/></svg>`;
  };
  const up = `<span class="aw up">↑</span>`, dn = `<span class="aw dn">↓</span>`;

  U.policy(ctx, {
    kicker: 'Übung 3 c', title: 'c) <em>Steuern</em> steigen', src: 'Skript II, Folie 69',
    measure: { icon: 'tag', tone: 4, who: 'Die Regierung erhöht die', what: 'Steuern T ↑', kind: 'Fiskalpolitik → IS-Kurve' },
    curve: 'IS', shift: -1.4, pt: [4.3, 4.1],
    steps: [
      ['IS-Kurve verschieben', 'IS₂ parallel nach links · alte bleibt als IS₁'],
      ['Abstand beschriften', 'kleiner als bei den Staatsausgaben'],
      ['Neuer Schnittpunkt', 'weiter links und tiefer · Y₂, r₂, Pfeile'],
    ],
    tSteps: [T('Wieder Fiskalpolitik'), T('Der Abstand ist kleiner') - 0.1, T('Der neue Schnittpunkt') - 0.1],
    tMeasure: T('Die Regierung erhöht die Steuern'),
    tGrey: T('aber diesmal verschiebt sich'),
    tDraw,
    arrow: { from: [1.75, 7.9], to: [0.68, 7.9], t: tDraw + 1.5 },
    gap: {
      html: V.frac('MPC · ΔT', '1 − MPC'), left: 326, top: 126, t: T('marginale Konsumneigung mal'),
      card: `<div class="cmp"><span class="cl t-mute">bei G ↑</span><span class="cb g"></span><span class="cf t-mute">${V.frac('ΔG', '1 − MPC')}</span></div>
             <div class="cmp"><span class="cl t-c1">bei T ↑</span><span class="cb t"></span><span class="cf t-c1">${V.frac('MPC · ΔT', '1 − MPC')}</span></div>`,
      tCard: T('Der Abstand ist kleiner') + 0.3,
    },
    css: `
      #sc-u3d .cmp{display:flex;align-items:center;gap:16px;font-family:var(--mono);font-weight:700;font-size:26px;height:66px}
      #sc-u3d .cmp .cl{width:118px;flex:none}
      #sc-u3d .cb{height:26px;flex:none;border:3px solid var(--ink)}
      #sc-u3d .cb.g{width:230px;background:var(--old)} #sc-u3d .cb.t{width:160px;background:var(--c1)}
      #sc-u3d .tabw{left:0;top:0;width:1728px}
      #sc-u3d .tabw .q{font-size:46px;font-weight:800;letter-spacing:-.02em;margin-bottom:14px}
      #sc-u3d .ov{width:1728px;font-size:36px}
      #sc-u3d .ov th{font-size:26px;padding:12px 26px}
      #sc-u3d .ov th.c, #sc-u3d .ov td.c{text-align:center}
      #sc-u3d .ov td{padding:10px 26px;height:190px}
      #sc-u3d .ov .mn{font-weight:800;font-size:40px;line-height:1.15;letter-spacing:-.01em}
      #sc-u3d .ov .mn small{display:block;font-size:27px;font-weight:500;color:var(--mute);letter-spacing:0}
      #sc-u3d .ov .kv{font-family:var(--mono);font-weight:700;font-size:32px;white-space:nowrap}
      #sc-u3d .aw{font-family:var(--mono);font-weight:800;font-size:68px;line-height:1}
      #sc-u3d .aw.up{color:var(--c3)} #sc-u3d .aw.dn{color:var(--c2)}
      #sc-u3d .ov tr.now td{background:var(--c4bg)}`,
    html: `<div class="abs tabw" id="tab">
      <div class="q">Alle drei Maßnahmen im <span class="t-c1">Überblick</span></div>
      <table class="tbl ov">
        <tr><th>Zeichnung</th><th>Maßnahme</th><th>Kurve</th><th class="c" style="text-transform:none;font-size:34px;color:var(--ink)">Y</th><th class="c" style="text-transform:none;font-size:34px;color:var(--ink)">r</th><th class="c" style="text-transform:none;font-size:34px;color:var(--ink)">C</th><th class="c" style="text-transform:none;font-size:34px;color:var(--ink)">I</th></tr>
        <tr><td>${mini('LM', 34)}</td><td><div class="mn">a) Geldangebot M ↑<small>Geldpolitik</small></div></td><td><span class="kv t-c2">LM → rechts</span></td><td class="c">${up}</td><td class="c">${dn}</td><td class="c">${up}</td><td class="c">${up}</td></tr>
        <tr><td>${mini('IS', 34)}</td><td><div class="mn">b) Staatsausgaben G ↑<small>Fiskalpolitik</small></div></td><td><span class="kv t-c1">IS → rechts</span></td><td class="c">${up}</td><td class="c">${up}</td><td class="c">${up}</td><td class="c">${dn}</td></tr>
        <tr class="now"><td>${mini('IS', -22)}</td><td><div class="mn">c) Steuern T ↑<small>Fiskalpolitik</small></div></td><td><span class="kv t-c1">IS → links</span></td><td class="c">${dn}</td><td class="c">${dn}</td><td class="c">${dn}</td><td class="c">${up}</td></tr>
      </table></div>`,
    tPoint: T('Der neue Schnittpunkt') + 0.4,
    tY: T('weiter links'), tR: T('und tiefer'),
    tRounds: T('Runde eins') - 0.15,
    rounds: [
      { t: T('Runde eins') + 0.1, rows: [
        { m: 'gu', items: [['T ↑', T('Das verfügbare Einkommen sinkt') - 0.35], ['(Y − T) ↓', T('Das verfügbare Einkommen sinkt') + 0.4], ['C ↓', T('die Haushalte konsumieren weniger')], ['Y ↓', T('und das Einkommen fällt')]] },
        { m: 'gm', items: [['Y ↓', T('Am Geldmarkt sinkt')], ['Geldnachfrage ↓', T('die Geldnachfrage')], ['r ↓', T('und der Zins geht zurück')]] },
      ] },
      { t: T('Runde zwei'), rows: [
        { m: 'gu', items: [['r ↓', T('Der niedrigere Zins')], ['I ↑', T('regt die Investitionen an')], ['Y fällt etwas weniger', T('Das bremst')]] },
      ] },
    ],
    // Anpassungspfad: erst nach links (Gütermarkt), dann entlang IS₂ nach rechts unten (Zins sinkt, Investitionen steigen)
    path: [
      { from: [4.82, 4.8], to: [3.78, 4.8], t: T('und das Einkommen fällt'), cls: 'c1', off: 15, dur: 0.9 },
      { from: [3.66, 4.74], to: [4.2, 4.2], t: T('und der Zins geht zurück'), cls: 'c4', off: 18, dur: 0.9 },
    ],
    tResult: T('Der Gesamteffekt'),
    result: [['Y ↓', 'dn', T('Einkommen runter')], ['r ↓', 'dn', T('Zins runter')], ['C ↓', 'dn', T('Konsum runter')], ['I ↑', 'up', T('Investitionen rauf')]],
    extra: () => {
      // Schlussbild: Übersicht aller drei Maßnahmen
      const tT = T('Am Ende hilft dir');
      ctx.hide(['#sheet', '#rd', '#rs'].map(s => $(s)), tT - 0.35, { dur: 0.3, y: -14 });
      const rows = $$('#tab tr');
      gsap.set($('#tab'), { autoAlpha: 0 });
      ctx.to('#tab', { autoAlpha: 1, duration: 0.4 }, tT);
      ctx.show('#tab .q', tT, { x: -30, y: 0 });
      ctx.show(rows[0], tT + 0.15, { y: 16 });
      ctx.show(rows.slice(1), tT + 0.45, { y: 22, stagger: 0.5 });
      ctx.pop($$('#tab .aw'), tT + 0.8, { stagger: 0.09 });
    },
  });
});
