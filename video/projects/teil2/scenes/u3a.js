// Übung 3 (Teil II): gemeinsames IS/LM-Grunddiagramm für u3a–u3d, ohne Zahlen.
// Datenkoordinaten 0…10. IS: r = 9,8 − (Y − s), LM: r = (Y − s) − 0,2; s = waagerechte Verschiebung.
// V.t2u3.make(host) baut das fertige Grunddiagramm; V.t2u3.policy(ctx, cfg) spielt eine Politikmaßnahme komplett durch.
V.t2u3 = {
  Y1: 5, r1: 4.8,
  // Endpunkte der (auf das Blatt begrenzten) Geraden
  isEnds(s = 0) {
    let a = { Y: 1.0 + s, r: 8.8 }, b = { Y: 8.6 + s, r: 1.2 };
    if (a.Y < 0.4) a = { Y: 0.4, r: 9.8 - (0.4 - s) };
    if (b.Y > 9.5) b = { Y: 9.5, r: 9.8 - (9.5 - s) };
    return [a, b];
  },
  lmEnds(s = 0) {
    let a = { Y: 1.2 + s, r: 1.0 }, b = { Y: 9.0 + s, r: 8.8 };
    if (b.Y > 9.5) b = { Y: 9.5, r: 9.5 - s - 0.2 };
    return [a, b];
  },
  is(P, s, cls, label) {
    const [a, b] = this.isEnds(s);
    const line = P.line(a.Y, a.r, b.Y, b.r, { cls });
    const lab = P.text(b.Y, b.r, label, { cls, dx: 16, dy: 14, anchor: 'start' });
    return { line, lab, a, b };
  },
  lm(P, s, cls, label) {
    const [a, b] = this.lmEnds(s);
    const line = P.line(a.Y, a.r, b.Y, b.r, { cls });
    const lab = b.r > 8.7 ? P.text(b.Y, b.r, label, { cls, dy: -20 }) : P.text(b.Y, b.r, label, { cls, dx: 6, dy: -22 });
    return { line, lab, a, b };
  },
  make(host) {
    const U = this;
    const P = V.plot({ w: 1000, h: 764, x: [0, 10], y: [0, 10], pad: { l: 120, r: 100, t: 76, b: 104 } });
    P.el.classList.add('big');
    host.appendChild(P.el);
    const ax = P.axes({ xl: 'Y', yl: 'r' });
    const [xAxis, yAxis] = ax.querySelectorAll('line.ax'), [xl, yl] = ax.querySelectorAll('text.axl');
    const gH = P.add('line', { x1: P.X(U.Y1), y1: P.Y(U.r1), x2: P.X(0), y2: P.Y(U.r1), class: 'dash' });
    const gV = P.add('line', { x1: P.X(U.Y1), y1: P.Y(U.r1), x2: P.X(U.Y1), y2: P.Y(0), class: 'dash' });
    const is = U.is(P, 0, 'c1', 'IS'), lm = U.lm(P, 0, 'c2', 'LM');
    // Beschriftungen der alten Lage (erscheinen erst, wenn eine Kurve verschoben wird)
    const lIS1 = P.text(is.b.Y, is.b.r, 'IS₁', { cls: 'old', dx: 16, dy: 14, anchor: 'start' });
    const lLM1 = P.text(lm.b.Y, lm.b.r, 'LM₁', { cls: 'old', dy: -20 });
    gsap.set([lIS1, lLM1], { autoAlpha: 0 });
    const lr1 = P.text(0, U.r1, 'r₁', { dx: -22, dy: 12, anchor: 'end' }), lY1 = P.text(U.Y1, 0, 'Y₁', { dy: 50 });
    const dot = P.dot(U.Y1, U.r1, { cls: 'ink', r: 13 });
    gsap.set(dot, { transformOrigin: '50% 50%' });
    return { P, ax, xAxis, yAxis, xl, yl, gH, gV, IS: is.line, LM: lm.line, lIS: is.lab, lLM: lm.lab, lIS1, lLM1, lr1, lY1, dot };
  },
  // Pfad (Pixel) von a nach b in Datenkoordinaten, seitlich um off px versetzt
  seg(P, a, b, off = 0) {
    const x1 = P.X(a[0]), y1 = P.Y(a[1]), x2 = P.X(b[0]), y2 = P.Y(b[1]), L = Math.hypot(x2 - x1, y2 - y1);
    const nx = (-(y2 - y1) / L) * off, ny = ((x2 - x1) / L) * off;
    return `M${(x1 + nx).toFixed(1)} ${(y1 + ny).toFixed(1)}L${(x2 + nx).toFixed(1)} ${(y2 + ny).toFixed(1)}`;
  },
  css: id => `
    #sc-${id} .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-${id} .p1{left:1046px;top:0;width:682px;display:flex;flex-direction:column;gap:18px}
    #sc-${id} .ms{display:flex;align-items:center;gap:22px;padding:16px 24px}
    #sc-${id} .ms .who{font-size:27px;color:var(--mute);font-weight:600}
    #sc-${id} .ms .what{font-size:37px;font-weight:800;letter-spacing:-.01em;line-height:1.12;margin:2px 0 8px}
    #sc-${id} .ms .kind{font-size:25px}
    #sc-${id} .gp{padding:14px 24px 16px;font-size:28px;font-weight:600}
    #sc-${id} .gp .eq{font-size:34px;font-weight:700}
    #sc-${id} .rd{left:1046px;top:0;width:682px;height:616px;padding:14px 22px}
    #sc-${id} .rd > .lab{margin-bottom:4px}
    #sc-${id} .todo li small{font-size:26px}
    #sc-${id} .rnd + .rnd{margin-top:12px;padding-top:6px;border-top:3px solid var(--line)}
    #sc-${id} .rw{margin-top:6px}
    #sc-${id} .mk{font-family:var(--mono);font-size:24px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:14px;margin-bottom:3px;min-height:40px}
    #sc-${id} .mk .chip{font-size:26px;padding:2px 14px;letter-spacing:0;text-transform:none}
    #sc-${id} .rw.gm .mk{color:var(--c4)} #sc-${id} .rw.gu .mk{color:var(--c1)}
    #sc-${id} .chn{display:flex;flex-wrap:wrap;align-items:center;gap:8px 6px}
    #sc-${id} .it{display:inline-flex;align-items:center;gap:6px}
    #sc-${id} .ch{font-family:var(--mono);font-weight:700;font-size:28px;padding:3px 8px;border:3px solid;white-space:nowrap;line-height:1.3}
    #sc-${id} .rw.gm .ch{color:var(--c4);border-color:var(--c4);background:var(--c4bg)}
    #sc-${id} .rw.gu .ch{color:var(--c1);border-color:var(--c1);background:var(--c1bg)}
    #sc-${id} .ch.x2{color:var(--c2)!important;border-color:var(--c2)!important;background:var(--c2bg)!important}
    #sc-${id} .ar{font-family:var(--mono);font-weight:800;font-size:28px;color:var(--mute)}
    #sc-${id} .nt{font-size:26px;color:var(--mute);font-weight:500}
    #sc-${id} .rs{left:1046px;top:634px;width:682px;height:136px;padding:12px 22px 16px}
    #sc-${id} .rs .lab{margin-bottom:6px}
    #sc-${id} .rsr{display:flex;gap:14px}
    #sc-${id} .rc{flex:1;text-align:center;font-family:var(--mono);font-weight:800;font-size:44px;line-height:1.35;border:3px solid;background:var(--panel)}
    #sc-${id} .rc.up{color:var(--c3);border-color:var(--c3)} #sc-${id} .rc.dn{color:var(--c2);border-color:var(--c2)}
    #sc-${id} .tg{position:absolute;white-space:nowrap}`,

  /* Eine Politikmaßnahme komplett: Kurve verschieben, neuen Punkt eintragen, zwei Anpassungsrunden, Gesamteffekt.
   * cfg: kicker,title,src · measure{icon,tone,who,what,kind} · curve 'IS'|'LM' · shift · pt[Y,r] · steps,tSteps · tMeasure,tGrey,tDraw,tPoint,tY,tR
   *      arrow{from,to,t} (Richtungspfeil) · gap{html,t,left,top,card,tCard} · tRounds · rounds[{t,rows:[{m:'gm'|'gu',items:[[html,t,cls]],note:[html,t]}]}]
   *      path[{from,to,t,cls,off}] · tResult,result[[html,'up'|'dn',t]] · extra({D,P,nl}) */
  policy(ctx, c) {
    const { $, $$ } = ctx, C = V.C, U = V.t2u3, id = ctx.id, isLM = c.curve === 'LM', col = isLM ? 'c2' : 'c1';
    ctx.header({ kicker: c.kicker, title: c.title, src: c.src });
    const rows = (r, i) => r.rows.map((w, j) => `<div class="rw ${w.m}"><span class="mk">${j ? '' : `<span class="chip ink rh">Runde ${i + 1}</span>`}<span class="mn">${w.m === 'gm' ? 'Geldmarkt' : 'Gütermarkt'}</span></span><div class="chn">${w.items.map((it, i) => `<span class="it">${i ? '<span class="ar">→</span>' : ''}<span class="ch ${it[2] || ''}">${it[0]}</span></span>`).join('')}${w.note ? `<span class="it nt">${w.note[0]}</span>` : ''}</div></div>`).join('');
    ctx.html(`<style>${U.css(id)}${c.css || ''}</style>
      <div class="abs sheet" id="sheet"></div>
      <div class="abs p1" id="p1">
        ${V.steps(c.steps, { cls: 'sm' })}
        <div class="card ms" id="ms">${V.icon(c.measure.icon, 88, { tone: c.measure.tone })}<div><div class="who">${c.measure.who}</div><div class="what">${c.measure.what}</div><span class="chip ${col} kind">${c.measure.kind}</span></div></div>
        ${c.gap && c.gap.card ? `<div class="card soft gp" id="gp">${c.gap.card}</div>` : ''}
      </div>
      <div class="abs card rd" id="rd"><span class="lab">Anpassung in zwei Runden</span>${c.rounds.map((r, i) => `<div class="rnd">${rows(r, i)}</div>`).join('')}</div>
      <div class="abs res rs" id="rs"><span class="lab">Gesamteffekt</span><div class="rsr">${c.result.map(r => `<span class="rc ${r[1]}">${r[0]}</span>`).join('')}</div></div>
      ${c.html || ''}`);

    const D = U.make($('#sheet')), P = D.P, svg = P.el;

    /* ---- Phase 1: zeichnen ---- */
    ctx.show('#p1 .todo', 0.35, { x: 40, y: 0 });
    ctx.show('#ms', c.tMeasure, { y: 20 });
    ctx.stepsRun('#p1', c.tSteps, { end: c.tRounds - 0.5 });

    // alte Kurve wird grau und bekommt den Index 1
    const oldLine = isLM ? D.LM : D.IS, oldLab = isLM ? D.lLM : D.lIS, oldLab1 = isLM ? D.lLM1 : D.lIS1;
    ctx.pulse(oldLab, c.tGrey - 0.2, { scale: 1.3 });
    ctx.tint(oldLine, c.tGrey, { stroke: C.old }, 0.5);
    ctx.to(oldLab, { autoAlpha: 0, duration: 0.25 }, c.tGrey + 0.2).to(oldLab1, { autoAlpha: 1, duration: 0.3 }, c.tGrey + 0.35);
    // neue Kurve mit dem Stift
    const nl = isLM ? U.lm(P, c.shift, 'c2', 'LM₂') : U.is(P, c.shift, 'c1', 'IS₂');
    gsap.set([nl.line, nl.lab], { autoAlpha: 0 });
    ctx.pen(nl.line, c.tDraw, 1.4);
    ctx.to(nl.lab, { autoAlpha: 1, duration: 0.3 }, c.tDraw + 1.4);
    // Richtungspfeil zwischen alter und neuer Kurve
    const dir = V.arrow(svg, U.seg(P, c.arrow.from, c.arrow.to), { cls: col, w: 7, head: 24 });
    gsap.set(dir, { autoAlpha: 0 });
    ctx.drawArrow(dir, c.arrow.t, 0.6);
    // Beschriftung des Abstands (HTML-Chip mit Bruch) und Zusatzkarte
    if (c.gap) {
      const tg = V.el(`<div class="chip ${col} tg" style="font-size:28px;padding:6px 14px;left:${c.gap.left}px;top:${c.gap.top}px">${c.gap.html}</div>`);
      $('#sheet').appendChild(tg);
      ctx.show(tg, c.gap.t, { y: 14 });
      if (c.gap.card) ctx.show('#gp', c.gap.tCard ?? c.gap.t, { y: 20 });
      D.gapTag = tg;
    }
    // neuer Schnittpunkt, Hilfslinien, Achsenbeschriftung mit Pfeilen
    const [Y2, r2] = c.pt;
    const g2H = P.add('line', { x1: P.X(Y2), y1: P.Y(r2), x2: P.X(0), y2: P.Y(r2), class: 'dash c3' });
    const g2V = P.add('line', { x1: P.X(Y2), y1: P.Y(r2), x2: P.X(Y2), y2: P.Y(0), class: 'dash c3' });
    const lr2 = P.text(0, r2, 'r₂', { cls: 'c3', dx: -22, dy: 12, anchor: 'end' }), lY2 = P.text(Y2, 0, 'Y₂', { cls: 'c3', dy: 50 });
    gsap.set([lr2, lY2, g2H, g2V], { autoAlpha: 0 });
    const dot2 = P.dot(Y2, r2, { cls: 'c3', r: 14 });
    gsap.set(dot2, { transformOrigin: '50% 50%' });
    ctx.pop(dot2, c.tPoint);
    ctx.pen(g2V, c.tY, 0.7).to(lY2, { autoAlpha: 1, duration: 0.3 }, c.tY + 0.7);
    const aY = V.arrow(svg, `M${P.X(U.Y1)} ${P.Y(0) + 82}L${P.X(Y2)} ${P.Y(0) + 82}`, { cls: 'c3', w: 6, head: 20 });
    gsap.set(aY, { autoAlpha: 0 }); ctx.drawArrow(aY, c.tY + 0.8, 0.45);
    ctx.pen(g2H, c.tR, 0.7).to(lr2, { autoAlpha: 1, duration: 0.3 }, c.tR + 0.7);
    const aR = V.arrow(svg, `M34 ${P.Y(U.r1)}L34 ${P.Y(r2)}`, { cls: 'c3', w: 6, head: 20 });
    gsap.set(aR, { autoAlpha: 0 }); ctx.drawArrow(aR, c.tR + 0.8, 0.45);

    /* ---- Phase 2: zwei Runden ---- */
    ctx.hide('#p1', c.tRounds - 0.3, { dur: 0.3, y: -14 });
    ctx.show('#rd', c.tRounds, { x: 40, y: 0 });
    const rh = $$('#rd .rh'), rw = $$('#rd .rw');
    let k = 0;
    c.rounds.forEach((r, i) => {
      ctx.show(rh[i], r.t, { x: -16, y: 0 });
      r.rows.forEach(w => {
        const el = rw[k++], its = [...el.querySelectorAll('.it')];
        ctx.show(el.querySelector('.mn'), w.items[0][1] - 0.15, { x: -12, y: 0, dur: 0.3 });
        w.items.forEach((it, j) => ctx.show(its[j], it[1], { x: -14, y: 0, dur: 0.35 }));
        if (w.note) ctx.show(its[w.items.length], w.note[1], { x: -14, y: 0, dur: 0.35 });
      });
    });
    // Anpassungspfad im Diagramm
    (c.path || []).forEach(p => {
      const a = V.arrow(svg, U.seg(P, p.from, p.to, p.off || 0), { cls: p.cls, w: 7, head: 22 });
      gsap.set(a, { autoAlpha: 0 });
      ctx.drawArrow(a, p.t, p.dur || 0.8);
    });
    svg.appendChild(D.dot); svg.appendChild(dot2); // Punkte bleiben über den Pfeilen

    /* ---- Gesamteffekt ---- */
    ctx.show('#rs', c.tResult, { y: 24 });
    const rc = $$('#rs .rc');
    gsap.set(rc, { autoAlpha: 0, scale: 0.5 });
    c.result.forEach((r, i) => ctx.to(rc[i], { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, r[2]));

    if (c.extra) c.extra({ D, P, nl, dot2 });
    return { D, P, nl };
  },
};

// Übung 3 – Aufgabe und Grunddiagramm
V.scene('u3a', ctx => {
  const { T, $, $$ } = ctx, C = V.C, U = V.t2u3;
  ctx.header({ kicker: 'Übung 3', title: 'Das <em>IS/LM</em>-Grunddiagramm', src: 'Teil II · Übung 3' });

  ctx.html(`
  <style>
    #sc-u3a .task{left:0;top:0;width:1728px;padding:28px 40px 34px}
    #sc-u3a .task .q{font-size:40px;font-weight:600;line-height:1.35}
    #sc-u3a .ms3{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:26px}
    #sc-u3a .m{display:flex;align-items:center;gap:20px;padding:18px 22px}
    #sc-u3a .m .l{font-family:var(--mono);font-weight:800;font-size:40px}
    #sc-u3a .m .t{font-size:32px;font-weight:700;line-height:1.15}
    #sc-u3a .m .t small{display:block;font-size:25px;font-weight:500;color:var(--mute)}
    #sc-u3a .ask{display:flex;align-items:center;gap:16px;margin-top:28px;font-size:32px;font-weight:700}
    #sc-u3a .ask .chip{font-size:30px;padding:5px 16px}
    #sc-u3a .sheet{left:0;top:0;width:1010px;height:770px}
    #sc-u3a .side{left:1046px;top:0;width:682px}
    #sc-u3a .why{left:1046px;top:466px;width:682px;height:304px;padding:18px 26px}
    #sc-u3a .why .eq{font-size:35px;font-weight:700}
    #sc-u3a .why p{margin:8px 0 0;font-size:28px;line-height:1.3;font-weight:500}
    #sc-u3a .todo li small{font-size:26px}
    #sc-u3a .rule{display:flex;align-items:center;gap:12px;font-size:28px;font-weight:700;margin-top:8px;white-space:nowrap;height:52px}
    #sc-u3a .rule .ico{flex:none;width:56px}
    #sc-u3a .rule .chip{font-size:26px;padding:2px 12px}
    #sc-u3a .rule .ar{font-family:var(--mono);font-weight:800;color:var(--mute)}
    #sc-u3a .tip{margin-top:12px;padding-top:10px;border-top:3px solid var(--line);font-size:26px;font-weight:600;line-height:1.28}
    #sc-u3a .tg{position:absolute;white-space:nowrap;font-size:27px}
  </style>

  <div class="abs card task" id="task">
    <span class="lab">Die Aufgabe</span>
    <div class="q">„Was geschieht im IS/LM-Modell mit Zinssatz, Einkommen, Konsum und Investitionen, wenn …“</div>
    <div class="ms3">
      <div class="card c2 m">${V.icon('note', 64, { tone: 4 })}<span class="l t-c2">a)</span><span class="t">Geldangebot ↑<small>Zentralbank</small></span></div>
      <div class="card c1 m">${V.icon('staat', 78, { tone: 2 })}<span class="l t-c1">b)</span><span class="t">Staatsausgaben ↑<small>Regierung</small></span></div>
      <div class="card c1 m">${V.icon('tag', 72, { tone: 4 })}<span class="l t-c1">c)</span><span class="t">Steuern ↑<small>Regierung</small></span></div>
    </div>
    <div class="ask"><span>Gefragt:</span><span class="chip" id="k1">Grafik zeichnen</span><span class="chip" id="k2">Mechanismus erklären</span><span class="chip c3" id="k3">Gesamteffekt auf Y, r, I, C</span></div>
  </div>

  <div class="abs sheet" id="sheet"></div>
  <div class="abs side" id="side">${V.steps([
    ['Achsen', 'r nach oben · Y nach rechts'],
    ['IS-Kurve', 'fallende Linie = Gütermarkt'],
    ['LM-Kurve', 'steigende Linie = Geldmarkt'],
    ['Schnittpunkt', 'markieren, r₁ und Y₁ an die Achsen'],
  ])}</div>

  <div class="abs card c1 why" id="w2">
    <span class="lab">IS = Gleichgewicht am Gütermarkt</span>
    <div class="eq">Y = C(Y − T) + <span class="t-c1">I(r)</span> + G</div>
    <p>Höherer Zins → weniger Investitionen → weniger Einkommen. Deshalb <b>fällt</b> die Kurve.</p>
  </div>
  <div class="abs card c2 why" id="w3">
    <span class="lab">LM = Gleichgewicht am Geldmarkt</span>
    <div class="eq">M/P = <span class="t-c2">L(r, Y)</span></div>
    <p>Höheres Einkommen → mehr Geldnachfrage → höherer Zins. Deshalb <b>steigt</b> die Kurve.</p>
  </div>
  <div class="abs res why" id="w4">
    <span class="lab">Im Schnittpunkt</span>
    <div class="eq">Gütermarkt <span class="t-mute">und</span> Geldmarkt</div>
    <p>sind gleichzeitig im Gleichgewicht. Ablesen: Zins r₁ und Einkommen Y₁.</p>
  </div>
  <div class="abs card why" id="w5">
    <span class="lab">Die wichtigste Regel</span>
    <div class="rule" id="ru1">${V.icon('staat', 46, { tone: 1 })}<span>Fiskalpolitik (G, T)</span><span class="ar">→</span><span class="chip c1">verschiebt IS</span></div>
    <div class="rule" id="ru2">${V.icon('note', 42, { tone: 2 })}<span>Geldpolitik (M)</span><span class="ar">→</span><span class="chip c2">verschiebt LM</span></div>
    <div class="tip" id="tip">Zeichentipp: alte Kurve <b>stehen lassen</b>, neue <b>parallel</b> daneben, <b>Pfeil</b> für die Richtung.</div>
  </div>`);

  /* ---------- Aufgabe ---------- */
  ctx.show('#task', 0.7, { y: 30 });
  ctx.pop($$('.m'), T('was drei Maßnahmen bewirken') - 0.3, { stagger: 0.28, scale: 0.8 });
  ctx.show('.ask span:first-child', T('und zwar mit Grafik') - 0.3, { x: -14, y: 0 });
  ctx.pop('#k1', T('mit Grafik')).pop('#k2', T('und Erklärung')).pop('#k3', T('und Erklärung') + 0.6);

  /* ---------- Zeichenblatt ---------- */
  const t0 = T('Das Grunddiagramm');
  ctx.hide('#task', t0 - 0.3, { y: -20, dur: 0.3 });
  ctx.show('#sheet', t0, { x: -40, y: 0 }).show('#side', t0 + 0.15, { x: 40, y: 0 });
  const D = U.make($('#sheet')), P = D.P;
  gsap.set([D.xl, D.yl, D.lIS, D.lLM, D.lr1, D.lY1, D.dot], { autoAlpha: 0 });
  gsap.set([D.xAxis, D.yAxis, D.IS, D.LM, D.gH, D.gV], { autoAlpha: 0 });

  const tS = [T('Nach oben der Zins') - 0.35, T('Die IS-Kurve fällt') - 0.1, T('Die LM-Kurve steigt') - 0.1, T('Im Schnittpunkt') - 0.1];
  ctx.stepsRun('#side', tS, { end: T('Die wichtigste Regel') - 0.2 });

  // 1 Achsen
  ctx.pen(D.yAxis, T('Nach oben der Zins'), 0.8, { extend: true }).to(D.yl, { autoAlpha: 1, duration: 0.3 }, T('Nach oben der Zins') + 0.8);
  ctx.pen(D.xAxis, T('nach rechts das Einkommen'), 0.8, { extend: true }).to(D.xl, { autoAlpha: 1, duration: 0.3 }, T('nach rechts das Einkommen') + 0.8);

  // 2 IS
  const tI = T('Die IS-Kurve fällt') + 0.15;
  ctx.pen(D.IS, tI, 1.3).to(D.lIS, { autoAlpha: 1, duration: 0.3 }, tI + 1.3);
  ctx.show('#w2', tS[1] + 0.3, { y: 24 });
  const tagI = V.el('<div class="chip c1 tg">Gütermarkt</div>'); $('#sheet').appendChild(tagI);
  tagI.style.left = P.X(0.35) + 'px'; tagI.style.top = P.Y(6.75) + 'px';
  ctx.show(tagI, T('Gleichgewicht am Gütermarkt'), { x: -14, y: 0 });

  // 3 LM
  const tL = T('Die LM-Kurve steigt') + 0.15;
  ctx.pen(D.LM, tL, 1.3).to(D.lLM, { autoAlpha: 1, duration: 0.3 }, tL + 1.3);
  ctx.hide('#w2', tS[2] - 0.1).show('#w3', tS[2] + 0.3, { y: 24 });
  const tagL = V.el('<div class="chip c2 tg">Geldmarkt</div>'); $('#sheet').appendChild(tagL);
  tagL.style.left = P.X(2.5) + 'px'; tagL.style.top = P.Y(2.05) + 'px';
  ctx.show(tagL, T('Gleichgewicht am Geldmarkt'), { x: -14, y: 0 });

  // 4 Schnittpunkt
  ctx.hide('#w3', tS[3] - 0.1).show('#w4', tS[3] + 0.3, { y: 24 });
  ctx.pop(D.dot, T('Im Schnittpunkt') + 0.2);
  ctx.pen(D.gH, T('Beschrifte ihn'), 0.8).to(D.lr1, { autoAlpha: 1, duration: 0.3 }, T('mit r eins') + 0.3);
  ctx.pen(D.gV, T('und Ypsilon eins') - 0.5, 0.8).to(D.lY1, { autoAlpha: 1, duration: 0.3 }, T('und Ypsilon eins') + 0.35);
  ctx.pulse(D.dot, T('und Ypsilon eins') + 0.9, { scale: 1.5 });

  /* ---------- Regel ---------- */
  const tR = T('Die wichtigste Regel');
  ctx.hide('#w4', tR - 0.25).hide([tagI, tagL], tR - 0.25);
  ctx.show('#w5', tR, { y: 24 });
  ctx.show('#ru1', T('Fiskalpolitik verschiebt'), { x: -16, y: 0 });
  ctx.to(D.IS, { strokeWidth: 12, duration: 0.25, yoyo: true, repeat: 1 }, T('Fiskalpolitik verschiebt') + 0.9);
  ctx.show('#ru2', T('Geldpolitik verschiebt'), { x: -16, y: 0 });
  ctx.to(D.LM, { strokeWidth: 12, duration: 0.25, yoyo: true, repeat: 1 }, T('Geldpolitik verschiebt') + 0.9);
  // Zeichentipp: Geisterkurve parallel daneben, Pfeil – wird zum Szenenende wieder ausgeblendet
  const tT = T('Die alte Kurve bleibt stehen');
  ctx.show('#tip', tT, { y: 14 });
  ctx.to(D.IS, { strokeWidth: 12, duration: 0.25, yoyo: true, repeat: 1 }, tT + 0.3);
  const [ga, gb] = U.isEnds(1.6);
  const ghost = P.add('line', { x1: P.X(ga.Y), y1: P.Y(ga.r), x2: P.X(gb.Y), y2: P.Y(gb.r), class: 'dash c1', style: 'stroke-width:5' });
  gsap.set(ghost, { autoAlpha: 0 });
  ctx.pen(ghost, T('die neue zeichnest du parallel'), 1.3);
  const ga2 = V.arrow(P.el, U.seg(P, [2.05, 7.9], [3.35, 7.9]), { cls: 'c1', w: 7, head: 24 });
  gsap.set(ga2, { autoAlpha: 0 });
  ctx.drawArrow(ga2, T('mit einem Pfeil'), 0.6);
  ctx.hide([ghost, ga2], ctx.audioEnd + 0.35, { dur: 0.4 });
});
