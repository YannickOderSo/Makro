/* Piktogramme im Linienstil. V.icon('van', 120) liefert SVG-Markup mit der Höhe 120 px.
 * Klassen: .st = nur Linie, .fp = Papierfläche, .f1–.f4 = helle Farbfläche, .a1–.a4 = kräftige Farbfläche, .fi = Tinte.
 * Optional: V.icon('van', 120, {tone: 2}) tauscht die Akzentfarbe (1 blau, 2 rot, 3 grün, 4 ocker). */
(function () {
  const gear = (() => {
    const n = 8, R = 40, r = 30, cx = 50, cy = 50; let d = '';
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, s = Math.PI / n;
      const p = (rad, ang) => `${(cx + rad * Math.cos(ang)).toFixed(1)} ${(cy + rad * Math.sin(ang)).toFixed(1)}`;
      d += `${i ? 'L' : 'M'}${p(r, a - s * 0.55)} L${p(R, a - s * 0.32)} L${p(R, a + s * 0.32)} L${p(r, a + s * 0.55)} `;
    }
    return d + 'Z';
  })();
  // [Breite, Höhe, Markup]; A = Akzentfläche (kräftig), B = helle Fläche
  const I = {
    van: [150, 100, `<path class="A" d="M6 24h82v54H6z"/><path class="fp" d="M88 38h26l24 22v18H88z"/><path class="B" d="M96 45h15l13 13H96z"/><path class="st" d="M6 78h132"/><circle class="fp" cx="34" cy="80" r="12"/><circle class="fi" cx="34" cy="80" r="3.5"/><circle class="fp" cx="112" cy="80" r="12"/><circle class="fi" cx="112" cy="80" r="3.5"/><path class="st" d="M20 40h54M20 54h54"/>`],
    car: [150, 100, `<path class="A" d="M8 76V62c0-7 5-11 13-12l15-19c3-4 7-5 12-5h36c5 0 9 2 12 6l13 18c17 1 31 6 31 16v10z"/><path class="B" d="M44 35h20v15H33zM72 35h14l11 15H72z"/><circle class="fp" cx="40" cy="78" r="12"/><circle class="fi" cx="40" cy="78" r="3.5"/><circle class="fp" cx="110" cy="78" r="12"/><circle class="fi" cx="110" cy="78" r="3.5"/>`],
    computer: [110, 100, `<rect class="fp" x="8" y="10" width="94" height="62" rx="5"/><rect class="B" x="17" y="19" width="76" height="44"/><path class="st" d="M28 34h34M28 46h50"/><path class="fp" d="M44 72h22l4 14H40z"/><path class="st" d="M28 88h54"/>`],
    apple: [100, 100, `<path class="A" d="M50 36c-10-9-34-5-34 20 0 22 17 37 25 37 4 0 6-2 9-2s5 2 9 2c8 0 25-15 25-37 0-25-24-29-34-20z"/><path class="st" d="M50 36c0-10 2-17 8-22"/><path class="f3" d="M57 24c8-11 19-11 26-7-5 10-16 14-26 7z"/>`],
    pear: [100, 100, `<path class="A" d="M50 22c-11 0-13 11-15 22-2 12-17 18-17 32 0 12 13 18 32 18s32-6 32-18c0-14-15-20-17-32-2-11-4-22-15-22z"/><path class="st" d="M50 22c1-7 4-12 9-15"/>`],
    basket: [110, 100, `<path class="st" d="M26 44C32 8 78 8 84 44"/><path class="A" d="M8 44h94l-10 46H18z"/><path class="st" d="M30 44l5 46M55 44v46M80 44l-5 46M12 62h86"/>`],
    factory: [120, 100, `<path class="fp" d="M86 6h18v50H86z"/><path class="A" d="M6 92V44l28 16V44l28 16V44l28 16h24v32z"/><path class="fp" d="M20 72h14v20H20zM48 72h14v20H48zM76 72h14v20H76z"/><path class="st" d="M2 92h116"/>`],
    house: [110, 100, `<path class="A" d="M18 48h74v44H18z"/><path class="fp" d="M6 50L55 10l49 40z"/><path class="fp" d="M46 62h18v30H46z"/><path class="st" d="M2 92h106"/>`],
    people: [120, 100, `<circle class="B" cx="40" cy="30" r="16"/><path class="A" d="M10 92c0-22 12-36 30-36s30 14 30 36z"/><circle class="B" cx="86" cy="38" r="13"/><path class="A" d="M64 92c1-17 9-28 22-28s22 11 24 28z"/>`],
    person: [80, 100, `<circle class="B" cx="40" cy="28" r="18"/><path class="A" d="M6 94c0-24 14-40 34-40s34 16 34 40z"/>`],
    staat: [120, 100, `<path class="A" d="M6 38L60 8l54 30z"/><path class="fp" d="M12 38h96v10H12zM8 82h104v10H8z"/><path class="fp" d="M20 48h12v34H20zM44 48h12v34H44zM68 48h12v34H68zM92 48h12v34H92z"/>`],
    globe: [100, 100, `<circle class="B" cx="50" cy="50" r="42"/><ellipse class="st" cx="50" cy="50" rx="18" ry="42"/><path class="st" d="M8 50h84M14 30h72M14 70h72"/>`],
    boxes: [120, 100, `<path class="A" d="M34 8h52v40H34z"/><path class="B" d="M6 48h52v44H6zM62 48h52v44H62z"/><path class="st" d="M54 8v14h12V8M26 48v14h12V48M82 48v14h12V48M2 92h116"/>`],
    coin: [100, 100, `<circle class="A" cx="50" cy="50" r="42"/><circle class="st" cx="50" cy="50" r="32"/><path class="st" d="M62 36c-4-4-9-5-13-4-8 2-11 10-11 18s3 16 11 18c4 1 9 0 13-4M32 45h22M32 56h22" style="stroke:var(--panel);stroke-width:5"/>`],
    note: [140, 100, `<rect class="A" x="6" y="18" width="128" height="64" rx="4"/><circle class="fp" cx="70" cy="50" r="18"/><path class="st" d="M20 32v36M120 32v36"/>`],
    cart: [120, 100, `<path class="st" d="M4 14h18l14 50h60"/><path class="A" d="M27 28h86l-12 36H37z"/><circle class="fp" cx="46" cy="82" r="9"/><circle class="fp" cx="90" cy="82" r="9"/>`],
    plane: [120, 100, `<path class="A" d="M60 6c6 0 9 8 9 18v14l44 26v12L69 62v18l13 10v8L60 92l-22 6v-8l13-10V62L7 76V64l44-26V24c0-10 3-18 9-18z"/>`],
    shield: [100, 100, `<path class="A" d="M50 6l38 12v28c0 24-16 40-38 48-22-8-38-24-38-48V18z"/><path class="fp" d="M50 30l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z"/>`],
    gear: [100, 100, `<path class="A" d="${gear}"/><circle class="fp" cx="50" cy="50" r="13"/>`],
    bulb: [90, 100, `<path class="A" d="M45 6c-19 0-32 14-32 30 0 12 7 20 13 27 3 4 4 7 4 11h30c0-4 1-7 4-11 6-7 13-15 13-27C77 20 64 6 45 6z"/><path class="fp" d="M30 74h30v10H30z"/><path class="st" d="M34 92h22"/>`],
    clock: [100, 100, `<circle class="B" cx="50" cy="50" r="42"/><path class="st" d="M50 24v26l18 12"/>`],
    tag: [110, 100, `<path class="A" d="M8 50L52 8h48v48L56 98z"/><circle class="fp" cx="78" cy="30" r="8"/>`],
    bank: [120, 100, `<rect class="A" x="10" y="20" width="100" height="72"/><path class="fp" d="M24 34h18v14H24zM51 34h18v14H51zM78 34h18v14H78zM24 58h18v14H24zM78 58h18v14H78zM51 62h18v30H51z"/><path class="st" d="M2 92h116"/>`],
    scale: [120, 100, `<path class="st" d="M60 12v76M30 92h60M16 26h88"/><path class="B" d="M2 56h28l-14-30zM90 56h28l-14-30z"/><path class="A" d="M2 56h28c0 9-6 14-14 14S2 65 2 56zM90 56h28c0 9-6 14-14 14s-14-5-14-14z"/>`],
    check: [100, 100, `<circle class="a3" cx="50" cy="50" r="42"/><path class="st" d="M30 52l14 14 28-32" style="stroke:var(--panel);stroke-width:8"/>`],
    cross: [100, 100, `<circle class="a2" cx="50" cy="50" r="42"/><path class="st" d="M34 34l32 32M66 34L34 66" style="stroke:var(--panel);stroke-width:8"/>`],
  };
  V.icons = Object.keys(I);
  V.icon = (name, size = 100, o = {}) => {
    const d = I[name]; if (!d) throw new Error('Piktogramm fehlt: ' + name);
    const tone = o.tone ?? 1;
    const body = d[2].replace(/class="A"/g, `class="a${tone}"`).replace(/class="B"/g, `class="f${tone}"`);
    return `<svg class="ico ${o.cls || ''}" viewBox="0 0 ${d[0]} ${d[1]}" height="${size}" width="${(size * d[0] / d[1]).toFixed(1)}">${body}</svg>`;
  };
})();
