// Outro – geschlossen gegen offen, und die Leitfrage „Welche Linie verschiebt sich?“
V.scene('outro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  ctx.header({ kicker: 'Zusammenfassung', title: '<em>Geschlossen</em> gegen offen' });
  ctx.html(`
  <style>
    #sc-outro .sheet{top:0;width:840px;height:470px}
    #sc-outro .cap{position:absolute;left:0;right:0;top:12px;text-align:center;font-family:var(--mono);font-weight:700;font-size:25px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
    #sc-outro .rule{top:490px;width:840px;padding:14px 24px 16px}
    #sc-outro .rule .eq{font-size:38px;font-weight:700}
    #sc-outro .rule p{margin:2px 0 0;font-size:28px;font-weight:500;color:var(--mute)}
    #sc-outro .ask{left:0;top:646px;width:1728px;height:124px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:0 30px}
    #sc-outro .ask .q{font-size:36px;font-weight:800;letter-spacing:-.015em;white-space:nowrap}
    #sc-outro .ask .a{font-size:26px;font-weight:700;padding:6px 14px;white-space:nowrap}
    #sc-outro .luck{position:absolute;left:514px;top:150px;width:700px;text-align:center;font-weight:900;font-size:120px;letter-spacing:-.03em;color:var(--c2);border:9px solid var(--c2);outline:5px solid var(--c2);outline-offset:9px;background:rgba(250,252,251,.95);padding:16px 0 24px;line-height:1}
  </style>
  <div class="abs sheet" id="sh1" style="left:0"><div class="cap">geschlossene Volkswirtschaft</div></div>
  <div class="abs sheet" id="sh2" style="left:888px"><div class="cap">kleine offene Volkswirtschaft</div></div>
  <div class="abs card rule" id="r1" style="left:0"><div class="eq"><span class="t-c1">S</span> = <span class="t-c3">I(r)</span></div><p>Der Zins passt sich an.</p></div>
  <div class="abs card rule" id="r2" style="left:888px"><div class="eq"><span class="t-c4">NX</span> = <span class="t-c1">S</span> − <span class="t-c3">I(r*)</span></div><p>Der Zins ist vorgegeben, NX gleicht aus.</p></div>
  <div class="abs res ask" id="ask"><span class="q">Welche Linie verschiebt sich?</span>
    <span class="chip c1 a" id="a1">Inland → Ersparnislinie S</span>
    <span class="chip c2 a" id="a2">Ausland → Weltzins r*</span></div>
  <div class="luck" id="luck">Viel Erfolg!</div>`);

  const mk = host => {
    const P = V.plot({ w: 834, h: 464, x: [0, 10], y: [0, 10], pad: { l: 96, r: 96, t: 62, b: 70 } });
    host.appendChild(P.el);
    P.axes({ xl: 'S, I', yl: 'r' });
    const S = P.line(6, 0, 6, 9.2, { cls: 'c1' }); gsap.set(S, { attr: { y1: P.Y(0), y2: P.Y(9.2) } });
    const Ic = P.line(1.0, 9.2, 9.4, 0.8, { cls: 'c3' });
    P.text(6, 9.2, 'S', { cls: 'c1', dy: -12 }); P.text(9.4, 0.8, 'I(r)', { cls: 'c3', dx: 12, dy: 8, anchor: 'start' });
    return { P, S, Ic };
  };
  // links: geschlossen
  const A = mk($('#sh1')), PA = A.P;
  const gA = PA.add('line', { x1: PA.X(6), y1: PA.Y(4.2), x2: PA.X(0), y2: PA.Y(4.2), class: 'dash c2' });
  const dA = PA.dot(6, 4.2, { cls: 'c2', r: 12 }), lA = PA.text(0, 4.2, 'r', { cls: 'c2', dx: -16, dy: 10, anchor: 'end' });
  // rechts: offen
  const B = mk($('#sh2')), PB = B.P;
  const rs = PB.line(0, 6.2, 9.6, 6.2, { cls: 'c2' }), lB = PB.text(0, 6.2, 'r*', { cls: 'c2', dx: -16, dy: 10, anchor: 'end' });
  const nx = PB.line(4.0, 6.2, 6, 6.2, { cls: 'c4' }); nx.style.strokeWidth = '12px';
  const lNX = PB.text(5.0, 6.2, 'NX', { cls: 'c4', dy: -18 });
  gsap.set([gA, lA, rs, lB, nx, lNX], { autoAlpha: 0 });
  gsap.set(dA, { transformOrigin: '50% 50%' });

  ctx.show('#sh1', 0.5, { x: -40, y: 0 }).show('#sh2', 0.65, { x: 40, y: 0 });
  // geschlossen: der Zins passt sich an
  const t1 = T('In der geschlossenen Volkswirtschaft');
  ctx.dim('#sh2', t1, { to: 0.4 });
  ctx.pop(dA, T('passt sich der Zins an')).pen(gA, T('passt sich der Zins an') + 0.2, 0.6);
  ctx.to(lA, { autoAlpha: 1, duration: 0.3 }, T('passt sich der Zins an') + 0.8);
  ctx.show('#r1', T('bis Ersparnis und Investitionen gleich'), { y: 20 });
  // offen: Zins vorgegeben, NX gleicht aus
  const t2 = T('In der kleinen offenen Volkswirtschaft');
  ctx.undim('#sh2', t2).dim(['#sh1', '#r1'].map(s => $(s)), t2, { to: 0.45 });
  ctx.pen(rs, T('ist der Zins vorgegeben') - 0.1, 0.8); ctx.to(lB, { autoAlpha: 1, duration: 0.3 }, T('ist der Zins vorgegeben') + 0.7);
  ctx.pen(nx, T('die Nettoexporte gleichen'), 0.5); ctx.to(lNX, { autoAlpha: 1, duration: 0.3 }, T('die Nettoexporte gleichen') + 0.5);
  ctx.show('#r2', T('die Nettoexporte gleichen') + 0.3, { y: 20 });
  // Leitfrage
  const t3 = T('Welche Linie verschiebt sich');
  ctx.undim(['#sh1', '#r1'].map(s => $(s)), t3 - 0.6);
  ctx.show('#ask', t3 - 0.5, { y: 24 });
  gsap.set([$('#a1'), $('#a2')], { autoAlpha: 0 });
  const tA = T('Inländische Politik bewegt'), tB = T('Politik im Ausland bewegt');
  ctx.to('#a1', { autoAlpha: 1, duration: 0.3 }, tA);
  // die S-Linie rückt in beiden Bildern kurz hin und her, rechts wächst NX mit
  [[A.S, PA], [B.S, PB]].forEach(([S, P]) => { ctx.to(S, { attr: { x1: P.X(7.4), x2: P.X(7.4) }, duration: 0.6, ease: 'power2.inOut' }, tA + 0.2); ctx.to(S, { attr: { x1: P.X(6), x2: P.X(6) }, duration: 0.6, ease: 'power2.inOut' }, tA + 1.3); });
  ctx.to(nx, { attr: { x2: PB.X(7.4) }, duration: 0.6, ease: 'power2.inOut' }, tA + 0.2).to(nx, { attr: { x2: PB.X(6) }, duration: 0.6, ease: 'power2.inOut' }, tA + 1.3);
  ctx.to(dA, { attr: { cx: PA.X(7.4), cy: PA.Y(2.8) }, duration: 0.6, ease: 'power2.inOut' }, tA + 0.2).to(dA, { attr: { cx: PA.X(6), cy: PA.Y(4.2) }, duration: 0.6, ease: 'power2.inOut' }, tA + 1.3);
  ctx.to(gA, { attr: { x1: PA.X(7.4), y1: PA.Y(2.8), y2: PA.Y(2.8) }, duration: 0.6, ease: 'power2.inOut' }, tA + 0.2).to(gA, { attr: { x1: PA.X(6), y1: PA.Y(4.2), y2: PA.Y(4.2) }, duration: 0.6, ease: 'power2.inOut' }, tA + 1.3);
  ctx.to(lA, { attr: { y: PA.Y(2.8) + 10 }, duration: 0.6, ease: 'power2.inOut' }, tA + 0.2).to(lA, { attr: { y: PA.Y(4.2) + 10 }, duration: 0.6, ease: 'power2.inOut' }, tA + 1.3);
  ctx.to('#a2', { autoAlpha: 1, duration: 0.3 }, tB);
  // der Weltzins sinkt kurz und kommt zurück, NX schrumpft mit
  const mv = (r, t) => { const y = PB.Y(r); ctx.to(rs, { attr: { y1: y, y2: y }, duration: 0.6, ease: 'power2.inOut' }, t); ctx.to(nx, { attr: { y1: y, y2: y, x1: PB.X(10.2 - r) }, duration: 0.6, ease: 'power2.inOut' }, t); ctx.to(lB, { attr: { y: y + 10 }, duration: 0.6, ease: 'power2.inOut' }, t); ctx.to(lNX, { attr: { y: y - 18, x: PB.X((10.2 - r + 6) / 2) }, duration: 0.6, ease: 'power2.inOut' }, t); };
  mv(4.9, tB + 0.2); mv(6.2, tB + 1.3);
  // Stempel
  const luck = $('#luck'), tE = T('Viel Erfolg');
  gsap.set(luck, { autoAlpha: 0, scale: 2.2, rotation: -14 });
  ctx.to(luck, { autoAlpha: 1, scale: 1, rotation: -4, duration: 0.32, ease: 'power4.in' }, tE);
  ctx.to(luck, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tE + 0.32);
});
