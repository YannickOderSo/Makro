// Intro – zwei Übungen, ein gemeinsames Diagramm
V.scene('intro', ctx => {
  const { T, $, $$ } = ctx, C = V.C;
  const body = ctx.body();
  body.style.cssText = 'left:0;top:0;width:1920px;height:1016px';
  ctx.html(`
  <style>
    #sc-intro .kick{position:absolute;left:96px;top:64px}
    #sc-intro h1{position:absolute;left:96px;top:136px;margin:0;font-size:82px;line-height:1.02;font-weight:900;letter-spacing:-.035em}
    #sc-intro h1 em{font-style:normal;color:var(--c1)}
    #sc-intro .tile{position:absolute;left:96px;width:760px;height:236px;padding:20px 26px 0;display:flex;gap:24px;align-items:flex-start}
    #sc-intro .tile .no{font-family:var(--mono);font-weight:800;font-size:24px;letter-spacing:.1em;text-transform:uppercase;color:var(--bg);background:var(--ink);padding:3px 12px;display:inline-block}
    #sc-intro .tile .tt{font-weight:800;font-size:40px;line-height:1.1;margin:12px 0 8px;letter-spacing:-.015em}
    #sc-intro .tile .sb{font-size:29px;color:var(--mute);font-weight:500;line-height:1.25}
    #sc-intro .sheet{position:absolute;left:916px;top:150px;width:908px;height:800px}
    #sc-intro .tagc{position:absolute;font-family:var(--mono);font-weight:700;font-size:30px;padding:4px 14px;white-space:nowrap}
  </style>
  <span class="kick">Makroökonomie · Teil I</span>
  <h1>Übung 2-2 und 2-10:<br><em>genau erklärt</em></h1>
  <div class="card tile" id="t1" style="top:424px">${V.icon('house', 104, { tone: 4 })}<div><span class="no">Übung 2-2</span><div class="tt">Geschlossene Volkswirtschaft</div><div class="sb">Mehr Konsum – was passiert mit I und r?</div></div></div>
  <div class="card tile" id="t2" style="top:690px">${V.icon('globe', 104, { tone: 1 })}<div><span class="no">Übung 2-10</span><div class="tt">Kleine offene Volkswirtschaft</div><div class="sb">Fiskalpolitik im Inland und im Rest der Welt: S, I, NX, r</div></div></div>
  <div class="sheet" id="sheet"></div>`);

  const P = V.plot({ w: 900, h: 792, x: [0, 10], y: [0, 10], pad: { l: 110, r: 110, t: 90, b: 104 } });
  P.el.classList.add('big'); $('#sheet').appendChild(P.el);
  const ax = P.axes({ xl: 'S, I', yl: 'r' });
  const S = P.line(6, 0, 6, 9.3, { cls: 'c1' }); gsap.set(S, { attr: { y1: P.Y(0), y2: P.Y(9.3) } });
  const Ic = P.line(1.0, 9.2, 9.4, 0.8, { cls: 'c3' });
  const g = P.add('line', { x1: P.X(6), y1: P.Y(4.2), x2: P.X(0), y2: P.Y(4.2), class: 'dash c2' });
  const dot = P.dot(6, 4.2, { cls: 'ink', r: 13 }); gsap.set(dot, { transformOrigin: '50% 50%' });
  const tag = (txt, cls, x, y) => { const e = V.el(`<div class="chip ${cls} tagc">${txt}</div>`); e.style.left = x + 'px'; e.style.top = y + 'px'; $('#sheet').appendChild(e); return e; };
  const tS = tag('Ersparnis S', 'c1', P.X(6) + 22, P.Y(8.9)), tI = tag('Investitionen I', 'c3', P.X(7.25), P.Y(3.95)), tR = tag('Realzins r', 'c2', P.X(0) + 18, P.Y(4.2) + 14);
  gsap.set(ax, { autoAlpha: 0 });

  ctx.show('.kick', 0.25, { x: -30, y: 0 });
  ctx.show('h1', 0.4, { y: 40, dur: 0.7 });
  // „ein gemeinsames Diagramm“
  const t0 = T('ein gemeinsames Diagramm');
  ctx.show('#sheet', t0 - 0.3, { x: 50, y: 0 });
  ctx.to(ax, { autoAlpha: 1, duration: 0.4 }, t0);
  ctx.pop('#t1', T('Übung zwei zwei und'), { scale: 0.8 }).pop('#t2', T('Übung zwei zehn'), { scale: 0.8 });
  ctx.pen(S, T('um Ersparnis') - 0.5, 0.8); ctx.show(tS, T('um Ersparnis'), { x: -14, y: 0 });
  ctx.pen(Ic, T('Investitionen und') - 0.5, 0.9); ctx.show(tI, T('Investitionen und'), { x: -14, y: 0 });
  ctx.pop(dot, T('den Realzins') - 0.3); ctx.pen(g, T('den Realzins') - 0.2, 0.6); ctx.show(tR, T('den Realzins') + 0.1, { x: -14, y: 0 });
  // zweiter Absatz: die beiden Kacheln nacheinander betonen
  const hi = (id, t) => { ctx.tint(id, t, { borderColor: C.c1, boxShadow: `8px 8px 0 ${C.c1bg}` }, 0.2).pulse(id, t, { scale: 1.04 }); ctx.tint(id, t + 2.2, { borderColor: C.ink, boxShadow: `8px 8px 0 ${C.line}` }, 0.4); };
  hi('#t1', T('in der geschlossenen Volkswirtschaft') - 0.3);
  hi('#t2', T('in der kleinen offenen') - 0.3);
});
