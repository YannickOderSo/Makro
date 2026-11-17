# Erklärvideos

Quellcode der Erklärvideos im Hauptordner des Repos (1920 × 1080, 30 Bilder/s). Jedes Video ist ein Projekt unter `projects/`:

| Projekt | Video | Inhalt |
|---|---|---|
| `altklausur` | `Erklaervideo_Altklausur.mp4` | alle 9 Aufgaben der Altklausur |
| `teil1` | `Erklaervideo_Teil1_Uebung_2-2_und_2-10.mp4` | Teil I, Übung 2-2 und 2-10, Schritt für Schritt gezeichnet |
| `teil2` | `Erklaervideo_Teil2_Uebungen_1-4_zeichnen.mp4` | Teil II, Übungen 1 bis 4, Schritt für Schritt gezeichnet |

## Aufbau

| Datei | Zweck |
|---|---|
| `projects/<projekt>/script.mjs` | Sprechertext je Szene, Titel und Abschnitte der Fortschrittsleiste |
| `projects/<projekt>/audio/` | Sprachaufnahmen (`<szene>.mp3`) plus Zeitmarken je Zeichen (`<szene>.json`) |
| `projects/<projekt>/scenes/*.js` | eine Datei je Szene |
| `projects/<projekt>/timing.js` | Zeitplan (wird von `timing.mjs` erzeugt) |
| `voice.mjs` | Stimme (ElevenLabs) für alle Videos |
| `stage/` | die Bühne: `engine.js` (Zeitsteuerung, Helfer, Zeichenstift), `style.css`, `icons.js` |
| `tts.mjs` | erzeugt die Sprachaufnahmen |
| `timing.mjs` | baut den Zeitplan und die Tonspur `build/<projekt>/narration.m4a` |
| `shot.mjs` | Einzelbilder und Kontaktbögen zur Kontrolle |
| `render.mjs` | rendert alle Bilder mit headless Chromium und mischt den Ton dazu |

Die Animationen hängen am gesprochenen Text: `T('Textstelle')` liefert in einer Szene die Sekunde, in der diese Stelle gesprochen wird.

## Neu rendern

Voraussetzungen: Node, Playwright mit Chromium, ffmpeg. Beispiel für das Projekt `teil2`:

```bash
node timing.mjs teil2
```

```bash
node render.mjs -p teil2
```

Das Ergebnis liegt in `out/`. Die Sprachaufnahmen sind eingecheckt; `node tts.mjs <projekt>` ruft ElevenLabs nur für Szenen auf, deren Text sich geändert hat (kostet Zeichenkontingent).

Vorschau im Browser: `stage/index.html?p=teil2&play=1` (ohne Ton), mit `&t=120` ab Sekunde 120.
