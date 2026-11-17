// Übung 3 a – Die Zentralbank erhöht das Geldangebot: LM nach rechts unten
V.scene('u3b', ctx => {
  const { T } = ctx, U = V.t2u3;
  const tDraw = T('und zwar nach rechts unten') - 0.25;
  U.policy(ctx, {
    kicker: 'Übung 3 a', title: 'a) <em>Geldangebot</em> steigt', src: 'Skript II, Folie 70',
    measure: { icon: 'note', tone: 4, who: 'Die Zentralbank erhöht das', what: 'Geldangebot M ↑', kind: 'Geldpolitik → LM-Kurve' },
    curve: 'LM', shift: 2, pt: [6, 3.8],
    steps: [
      ['LM-Kurve verschieben', 'LM₂ parallel nach rechts unten · alte bleibt als LM₁'],
      ['Neuer Schnittpunkt', 'liegt weiter rechts und tiefer'],
      ['Achsen beschriften', 'Y₂ rechts von Y₁ · r₂ unter r₁ · Pfeile'],
    ],
    tSteps: [T('Das ist Geldpolitik'), T('Der neue Schnittpunkt') - 0.1, T('Das Einkommen steigt') - 0.2],
    tMeasure: T('Die Zentralbank erhöht'),
    tGrey: T('also verschiebt sich die LM-Kurve'),
    tDraw,
    arrow: { from: [3.55, 3.05], to: [4.3, 2.3], t: tDraw + 1.5 },
    tPoint: T('Der neue Schnittpunkt') + 0.5,
    tY: T('Das Einkommen steigt'), tR: T('der Zins sinkt'),
    tRounds: T('Jetzt die Anpassung'),
    rounds: [
      { t: T('Runde eins beginnt'), rows: [
        { m: 'gm', items: [['M/P ↑', T('Es gibt mehr Geld')], ['Überschuss an Geld', T('als gewünscht')], ['Wertpapierkäufe', T('die Leute kaufen Wertpapiere')], ['r ↓', T('und der Zins sinkt')]] },
        { m: 'gu', items: [['r ↓', T('Am Gütermarkt')], ['I ↑', T('mehr Investitionen')], ['Y ↑', T('Das Einkommen steigt', { n: 2 })], ['C ↑', T('und mit ihm der Konsum')]] },
      ] },
      { t: T('Runde zwei'), rows: [
        { m: 'gm', items: [['Y ↑', T('Das höhere Einkommen')], ['Geldnachfrage ↑', T('erhöht die Geldnachfrage')], ['r steigt etwas', T('Der Zins steigt wieder')]], note: ['(bleibt unter r₁)', T('bleibt aber unter')] },
        { m: 'gu', items: [['I etwas schwächer', T('Dadurch fallen die Investitionen')]] },
      ] },
    ],
    // Anpassungspfad: erst fällt der Zins (Geldmarkt), dann wandert die Wirtschaft entlang LM₂ nach rechts oben (Gütermarkt)
    path: [
      { from: [5, 4.62], to: [5, 3.0], t: T('und der Zins sinkt'), cls: 'c4', off: -16 },
      { from: [5.08, 2.88], to: [5.86, 3.66], t: T('Das Einkommen steigt', { n: 2 }), cls: 'c1', off: 18, dur: 1.1 },
    ],
    tResult: T('Der Gesamteffekt'),
    result: [['Y ↑', 'up', T('Einkommen rauf')], ['r ↓', 'dn', T('Zins runter')], ['I ↑', 'up', T('Investitionen rauf')], ['C ↑', 'up', T('Konsum rauf')]],
    extra: ({ dot2 }) => { ctx.pulse(dot2, T('Der Zins steigt wieder') + 0.4, { scale: 1.5 }); },
  });
});
