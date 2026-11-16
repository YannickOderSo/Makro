# Erklärvideo zur Altklausur

Quellcode des Videos `Erklaervideo_Altklausur.mp4` (im Hauptordner des Repos): 18 Szenen, 1920 × 1080, 30 Bilder/s.

## Aufbau

| Datei | Zweck |
|---|---|
| `script.mjs` | Sprechertext je Szene und Stimme (ElevenLabs) |
| `tts.mjs` | erzeugt `audio/<szene>.mp3` plus Zeitmarken je Zeichen (`audio/<szene>.json`) |
| `timing.mjs` | baut daraus den Zeitplan `stage/timing.js` und die Tonspur `build/narration.m4a` |
| `stage/` | die Bühne: `engine.js` (Zeitsteuerung, Helfer), `style.css`, `icons.js`, `scenes/*.js` (eine Datei je Szene) |
| `shot.mjs` | Einzelbilder und Kontaktbögen zur Kontrolle |
| `render.mjs` | rendert alle Bilder mit headless Chromium und mischt den Ton dazu |

Die Animationen hängen am gesprochenen Text: `T('Textstelle')` liefert in einer Szene die Sekunde, in der diese Stelle gesprochen wird.

## Neu rendern

Voraussetzungen: Node, Playwright mit Chromium, ffmpeg.

```bash
node timing.mjs
```

```bash
node render.mjs
```

Das Ergebnis liegt in `out/`. Die Sprachaufnahmen in `audio/` sind eingecheckt; `node tts.mjs` ruft ElevenLabs nur für Szenen auf, deren Text sich geändert hat (kostet Zeichenkontingent).

Vorschau im Browser: `stage/index.html?play=1` (ohne Ton), mit `&t=120` ab Sekunde 120.
