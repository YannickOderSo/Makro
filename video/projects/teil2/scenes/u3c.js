// Übung 3 b – Die Regierung erhöht die Staatsausgaben: IS nach rechts, Crowding-out
V.scene('u3c', ctx => {
  const { T, $ } = ctx, U = V.t2u3, C = V.C;
  const tDraw = T('also verschiebt sich die IS-Kurve') + 0.8;
  U.policy(ctx, {
    kicker: 'Übung 3 b', title: 'b) <em>Staatsausgaben</em> steigen', src: 'Skript II, Folie 68',
    measure: { icon: 'staat', tone: 2, who: 'Die Regierung erhöht die', what: 'Staatsausgaben G ↑', kind: 'Fiskalpolitik → IS-Kurve' },
    curve: 'IS', shift: 2, pt: [6, 5.8],
    steps: [
      ['IS-Kurve verschieben', 'IS₂ parallel nach rechts · alte bleibt als IS₁'],
      ['Abstand beschriften', 'waagerecht: ΔG mal Multiplikator'],
      ['Neuer Schnittpunkt', 'liegt weiter rechts und höher'],
      ['Achsen beschriften', 'Y₂ rechts von Y₁ · r₂ über r₁ · Pfeile'],
    ],
    tSteps: [T('Das ist Fiskalpolitik'), T('Der waagerechte Abstand') - 0.1, T('Der neue Schnittpunkt') - 0.1, T('Einkommen und Zins steigen') - 0.2],
    tMeasure: T('Die Regierung erhöht'),
    tGrey: T('also verschiebt sich die IS-Kurve'),
    tDraw,
    arrow: { from: [2.05, 7.9], to: [3.72, 7.9], t: tDraw + 1.5 },
    gap: {
      html: V.frac('ΔG', '1 − MPC'), left: 494, top: 126, t: T('der Anstieg der Staatsausgaben mal'),
      card: `<div class="eq">Abstand = ΔG · ${V.frac('1', '1 − MPC')}</div>`, tCard: T('Der waagerechte Abstand') + 0.3,
    },
    tPoint: T('Der neue Schnittpunkt') + 0.5,
    tY: T('Einkommen und Zins steigen'), tR: T('Einkommen und Zins steigen') + 0.9,
    tRounds: T('Runde eins beginnt diesmal') - 0.1,
    rounds: [
      { t: T('Runde eins beginnt diesmal') + 0.15, rows: [
        { m: 'gu', items: [['G ↑', T('Mehr Staatsausgaben')], ['E ↑', T('bedeuten mehr Nachfrage')], ['Y ↑', T('Das Einkommen steigt')], ['C ↑', T('auch der Konsum')]] },
        { m: 'gm', items: [['Y ↑', T('Am Geldmarkt')], ['Geldnachfrage ↑', T('die Geldnachfrage')], ['Wertpapierverkäufe', T('Die Leute verkaufen')], ['Kurse ↓', T('die Kurse fallen')], ['r ↑', T('und der Zins steigt')]] },
      ] },
      { t: T('Runde zwei'), rows: [
        { m: 'gu', items: [['r ↑', T('Der höhere Zins')], ['I ↓', T('verdrängt private Investitionen')], ['Y steigt weniger', T('Das Einkommen steigt deshalb')], ['Crowding-out', T('Das ist das Crowding-out'), 'x2']] },
      ] },
    ],
    // Anpassungspfad: erst nach rechts (voller Multiplikator bei altem Zins), dann entlang IS₂ zurück nach links oben
    path: [
      { from: [5.2, 4.8], to: [6.82, 4.8], t: T('Das Einkommen steigt'), cls: 'c1', dur: 1.0 },
      { from: [6.92, 4.88], to: [6.14, 5.66], t: T('und der Zins steigt'), cls: 'c4', off: 18, dur: 1.0 },
    ],
    tResult: T('Der Gesamteffekt'),
    result: [['Y ↑', 'up', T('Einkommen rauf')], ['r ↑', 'up', T('Zins rauf')], ['C ↑', 'up', T('Konsum rauf')], ['I ↓', 'dn', T('Investitionen runter')]],
    extra: ({ D, P, dot2 }) => {
      const svg = P.el, tH = T('Das Einkommen steigt') + 1.0;
      // Punkt „ohne Zinsanstieg“: auf IS₂ in Höhe des alten Zinses
      const gv = P.add('line', { x1: P.X(7), y1: P.Y(4.8), x2: P.X(7), y2: P.Y(0), class: 'dash' });
      const hp = P.add('circle', { cx: P.X(7), cy: P.Y(4.8), r: 12, fill: C.panel, stroke: C.c1, 'stroke-width': 5 });
      const hl = P.add('text', { x: P.X(7.4), y: P.Y(5.3), class: 'lbl mute', 'text-anchor': 'start', style: 'font-size:27px' }, 'ohne Zinsanstieg');
      gsap.set([gv, hp, hl], { autoAlpha: 0 });
      gsap.set(hp, { transformOrigin: '50% 50%' });
      ctx.pop(hp, tH).to(hl, { autoAlpha: 1, duration: 0.3 }, tH + 0.2);
      // Crowding-out: Strecke auf der Y-Achse zwischen Y₂ und dem Punkt ohne Zinsanstieg
      const tC = T('Das Einkommen steigt deshalb');
      ctx.pen(gv, tC, 0.7);
      const co = P.add('line', { x1: P.X(7), y1: P.Y(0), x2: P.X(6), y2: P.Y(0), stroke: C.c2, 'stroke-width': 11, 'stroke-linecap': 'butt' });
      const cl = P.add('text', { x: P.X(6.2), y: P.Y(0) + 92, class: 'lbl c2', 'text-anchor': 'start', style: 'font-size:28px' }, '← Crowding-out');
      gsap.set([co, cl], { autoAlpha: 0 });
      ctx.extend(co, T('weniger stark'), 0.7);
      ctx.to(cl, { autoAlpha: 1, duration: 0.3 }, T('Das ist das Crowding-out'));
      ctx.pulse(dot2, T('Das ist das Crowding-out') + 0.3, { scale: 1.5 });
      svg.appendChild(hp); svg.appendChild(D.dot); svg.appendChild(dot2);
    },
  });
});
