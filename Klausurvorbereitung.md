# Makroökonomie – Lösungen zur Altklausur

Fast jede Aufgabe der letzten Klausur ist eine Übungsaufgabe aus den Übungsblättern, teils mit anderen Zahlen oder Sätzen. Rechne deshalb alle Übungsaufgaben sicher durch.

---

## Aufgabe 1 – BIP und Grundbegriffe

### a) Definition BIP (Lückenwörter: „Wert“, „Endprodukte“)
Wortlaut aus dem Skript (Teil I, Folie 23):
> Das BIP ist der **Wert** aller **Endprodukte** einer Volkswirtschaft, die in einem bestimmten, abgeschlossenen Zeitraum erzeugt werden.

- **Wert:** Die Güter werden mit Marktpreisen bewertet, damit man sie addieren kann.
- **Endprodukte:** Zwischenprodukte werden nicht mitgezählt, damit nichts doppelt gezählt wird.

Laut Skript misst das BIP gleichzeitig die **Gesamtheit der Einkommen** und die **Summe der Ausgaben** für neu produzierte Waren und Dienstleistungen. Deshalb sind Einkommen und Ausgaben gleich hoch.

### b) Übung 1-5: Ausgabenkategorien (Y = C + I + G + NX)
| Transaktion | Kategorie |
|---|---|
| VW an die Bundeswehr | **G** (Staatsausgaben) |
| VW an die BASF | **I** (Investition, Ausrüstung eines Unternehmens) |
| VW an Air France | **NX** (Export ins Ausland) |
| VW an Herrn Merz (Privatperson) | **C** (Konsum) |
| VW produziert für das nächste Jahr | **I** (Lagerinvestition) |

In der Klausur kommen andere Sätze, aber die Logik bleibt gleich: Wer kauft? Ein Haushalt ist C, ein Unternehmen I, der Staat G und das Ausland NX. Was auf Lager produziert wird, ist I.

### c) Folie 31 (Teil I): reales vs. nominales BIP
Auf Folie 31 geht es um nominales und reales BIP. Unter „Fall 1“ ist vermutlich der erste Punkt der Folie gemeint: **Das nominale BIP kann steigen, weil die Preise und/oder die Mengen steigen.**
- Das nominale BIP ist deshalb **kein gutes Maß**, um die Güterversorgung in verschiedenen Zeiträumen zu vergleichen.
- Darum gibt es das **reale BIP**: Man nimmt die Mengen des aktuellen Jahres und bewertet sie mit den Preisen des Basisjahres.
- Formel: BIP_real(2017) = Preis_Äpfel(2015) · Menge_Äpfel(2017) + Preis_Computer(2015) · Menge_Computer(2017)
- **Das reale BIP steigt nur, wenn die Mengen steigen.**

Falls „Fall 1“ doch das keynesianische Kreuz meinte (Teil II, Folie 39), hier der Fall Y > E:
- Die geplanten Ausgaben sind kleiner als die Produktion. Es kommt zu einer ungeplanten Lagerzunahme.
- Die Unternehmen entlassen Arbeitskräfte und drosseln die Produktion.
- Das BIP sinkt, bis Y = E gilt.
- Fall 2 (Y < E) läuft umgekehrt: Die Lager werden abgebaut, die Unternehmen stellen ein und das BIP steigt.

### d) Zwei Definitionen (wahrscheinlich nominales und reales BIP bzw. BIP-Deflator)
- **Nominales BIP:** Der Euro-Wert der Produktion, also Mengen mal aktuelle Preise.
- **Reales BIP:** Die produzierte Menge, bewertet mit konstanten Preisen eines Basisjahres.
- **BIP-Deflator:** Nominales BIP / reales BIP. Er gibt den Preis einer typischen produzierten Einheit im Verhältnis zum Basisjahr an. Man nennt ihn auch impliziten Preisindex.
- **Investition (makroökonomisch):** Nur die Schaffung von neuem Kapital zählt. Wenn bestehendes Vermögen nur den Besitzer wechselt, z. B. beim Kauf einer alten Villa oder von Aktien an der Börse, ist das keine Investition.

---

## Aufgabe 2 – BIP-Deflator, VPI, Inflationsrate (Zahlen aus Übung 1-6)

| Jahr | Äpfel (Menge/Preis) | Birnen (Menge/Preis) |
|---|---|---|
| 2010 | 10 / 1 | 5 / 1 |
| 2011 | 10 / 1,5 | 5 / 2 |
| 2012 | 15 / 1 | 10 / 1 |

**Nominales BIP** (Mengen des Jahres mal Preise des Jahres)
- 2010: 10·1 + 5·1 = **15**
- 2011: 10·1,5 + 5·2 = **25**
- 2012: 15·1 + 10·1 = **25**

**Reales BIP** (Mengen des Jahres mal Preise des Basisjahres 2010)
- 2010: **15**
- 2011: 10·1 + 5·1 = **15**
- 2012: 15·1 + 10·1 = **25**

**BIP-Deflator = nominales BIP / reales BIP · 100**
- 2010: **100**
- 2011: 25/15 · 100 = **166,7**
- 2012: 25/25 · 100 = **100**

**Preisindex bzw. VPI** (fester Warenkorb des Basisjahres 2010: 10 Äpfel und 5 Birnen)
VPI = Kosten des Warenkorbs 2010 zu heutigen Preisen / Kosten zu Preisen von 2010 · 100
- 2010: 15/15 · 100 = **100**
- 2011: (10·1,5 + 5·2)/15 · 100 = 25/15 · 100 = **166,7**
- 2012: (10·1 + 5·1)/15 · 100 = **100**

**Inflationsrate = (Index_t − Index_t−1) / Index_t−1 · 100 %**
- 2011: (166,7 − 100)/100 = **+66,7 %**
- 2012: (100 − 166,7)/166,7 = **−40 %** (Deflation)

Den Unterschied zwischen VPI und Deflator solltest du erklären können (Teil I, Folie 36):
- **Importgüter**, z. B. Rohstoffe, sind im VPI enthalten, im Deflator nicht.
- **Kapitalgüter** sind im Deflator enthalten, im VPI nicht.
- Der **Warenkorb** ist beim VPI fest, beim Deflator ändert er sich.

Außerdem überzeichnet der VPI die Inflation, und zwar aus drei Gründen:
- **Substitutionsverzerrung:** Die Konsumenten weichen auf billigere Güter aus, der feste Warenkorb bildet das nicht ab.
- **Neue Güter:** Eine größere Auswahl erhöht faktisch die Kaufkraft. Das zeigt der VPI nicht.
- **Qualitätsänderungen:** Sie werden nicht angemessen erfasst.

Dass Deflator und VPI hier gleich hoch sind, ist Zufall der Zahlen. Mit anderen Zahlen kommen meistens verschiedene Werte heraus.

---

## Aufgabe 3 – Übung 2-8 (Quantitätsgleichung und Fisher-Gleichung)

Die Quantitätsgleichung M·V = P·Y lautet in Wachstumsraten:
ΔM/M + ΔV/V = ΔP/P + ΔY/Y

V ist konstant, also ist ΔV/V = 0:
π = ΔM/M − ΔY/Y = 0,14 − 0,05 = **0,09 (9 %)**

Fisher-Gleichung i = r + π, also r = i − π:
r = 0,11 − 0,09 = **0,02 (2 %)**

---

## Aufgabe 4 – Übung 2-4 a) bis c)

**a) BIP auf zwei Wegen**
- Einkommensansatz: Löhne + Kapitaleinkommen = 620 + 180 = **800**
- Verwendungsansatz: C + I + G = 560 + 110 + 130 = **800**

**b) Ersparnis**
- Privat: Y − T − C = 800 − 100 − 560 = **140**
- Öffentlich: T − G = 100 − 130 = **−30** (Defizit)
- Gesamtwirtschaftlich: 140 + (−30) = **110**

Probe: Y − C − G = 110 = I ✓

**c) Marginale Konsumneigung**
Es gilt C = c·(Y − T), weil der autonome Konsum 0 ist. Daraus folgt 560 = c · 700, also **c = MPC = 0,8**.

**d) (Zusatz, falls gefragt)** Die Löhne steigen um 60 und die Kapitaleinkommen um 40, also ΔY = 100.
- ΔC = 0,8 · 100 = **+80**
- ΔS (gesamt) = ΔY − ΔC = **+20** (G bleibt gleich, deshalb steigt auch die private Ersparnis um 20)

---

## Aufgabe 5 – Übung 3-2 (Solow-Modell), Y = K^0,5 · L^0,5

**a) Konstante Skalenerträge?**
F(zK, zL) = (zK)^0,5 · (zL)^0,5 = z^0,5 · z^0,5 · K^0,5 L^0,5 = z · Y ✓ **Ja.** Die Exponenten ergeben zusammen 1.

**b) Pro-Kopf-Produktionsfunktion**
Teile durch L: y = Y/L = K^0,5 · L^0,5 / L = (K/L)^0,5, also **y = k^0,5 = √k**.

**c) Steady State**
Im Steady State gilt s·y = δ·k, also s·√k = δ·k.
Umgeformt: √k = s/δ, also **k* = (s/δ)²**.
Außerdem gilt y* = √k* = s/δ, i* = s·y* und c* = (1 − s)·y*.

| | Land A (s = 0,1; δ = 0,05) | Land B (s = 0,2; δ = 0,05) |
|---|---|---|
| k* | (0,1/0,05)² = **4** | (0,2/0,05)² = **16** |
| y* | √4 = **2** | √16 = **4** |
| i* = s·y* | 0,1·2 = **0,2** | 0,2·4 = **0,8** |
| c* = y* − i* | **1,8** | **3,2** |

Probe: δk* = 0,05·4 = 0,2 = i* ✓ und 0,05·16 = 0,8 ✓

Für Übung 3-1 gilt allgemein bei y = k^α: k* = (s/δ)^(1/(1−α)). Mit α = 0,3 ist k* = (s/δ)^(1/0,7), y* = (s/δ)^(0,3/0,7) und c* = (1 − s)·y*.

---

## Aufgabe 6 – Übung 4 (Teil II) b) bis d), IS/LM

Gegeben: C = 200 + 0,75(Y − T), I = 200 − 25r, G = T = 100, (M/P)d = Y − 100r, M = 1000, P = 2

**IS-Kurve:** Y = 200 + 0,75(Y − 100) + 200 − 25r + 100
Y = 425 + 0,75Y − 25r
0,25Y = 425 − 25r
**Y = 1700 − 100r**

**LM-Kurve:** M/P = 1000/2 = 500, also 500 = Y − 100r und damit **Y = 500 + 100r**

**b) Gleichgewicht**
1700 − 100r = 500 + 100r, also 200r = 1200.
Ergebnis: **r = 6** und **Y = 1100**.
Probe: C = 200 + 0,75·1000 = 950, I = 200 − 150 = 50, G = 100, Summe 1100 ✓

**c) G steigt von 100 auf 150**
- Die IS-Kurve verschiebt sich um ΔG/(1 − MPC) = 50/0,25 = **200 nach rechts**.
- Neue IS-Kurve: Y = 1900 − 100r
- 1900 − 100r = 500 + 100r, also **r = 7** und **Y = 1200**.

Y steigt nur um 100 statt um 200. Der Grund ist der Zinsanstieg, der Investitionen verdrängt (Crowding-out).

**d) M steigt von 1000 auf 1200**
- Jetzt ist M/P = 600. Die LM-Kurve verschiebt sich um **100 nach rechts**, neue LM-Kurve: Y = 600 + 100r.
- 1700 − 100r = 600 + 100r, also **r = 5,5** und **Y = 1150**.

**e) (Zusatz) P steigt von 2 auf 4**
- Jetzt ist M/P = 250, die LM-Kurve lautet Y = 250 + 100r.
- Ergebnis: **r = 7,25** und **Y = 975**. Die LM-Kurve verschiebt sich nach links.

---

## Aufgabe 7 – Übung 2-10: kleine offene Volkswirtschaft

Grundgleichung: **NX = S − I(r*)**. S ist unabhängig vom Zins und deshalb eine senkrechte Linie. Der Zins r = r* ist der Weltzins.

**b) Der Rest der Welt senkt G oder erhöht T (das war die Klausurfrage)**
- Die Ersparnis der Welt steigt, deshalb **sinkt der Weltzins r***.
- Die inländische Ersparnis S bleibt **unverändert**, weil im Inland keine Politik geändert wurde.
- Weil r* sinkt, **steigen die Investitionen I**.
- NX = S − I **sinkt**. Es wird mehr Kapital im Inland investiert und weniger ins Ausland exportiert.
- Der reale Wechselkurs ε steigt, die inländische Währung **wertet also real auf**.

**a) Das Inland senkt G oder erhöht T**
- Die öffentliche Ersparnis steigt, also **steigt S**. Die S-Linie verschiebt sich nach rechts.
- Der Zins bleibt bei r*, weil das Land klein ist.
- **I bleibt unverändert**.
- NX = S − I **steigt**.
- ε sinkt, die Währung **wertet real ab**.

Zur Grafik: Die r-Achse ist vertikal, S und I liegen auf der horizontalen Achse. S ist eine senkrechte Linie, I(r) fällt nach rechts, r* ist eine waagerechte Linie. NX ist der waagerechte Abstand zwischen I und S auf Höhe von r*.

---

## Aufgabe 8 – Tabelle: Klassik/Neoklassik und Keynes

| Kriterium | Klassik/Neoklassik | Keynes |
|---|---|---|
| Zeithorizont | mittlere bis lange Frist | kurze Frist |
| Preise/Löhne | flexibel | starr (rigide) |
| Märkte | Markträumung | evtl. keine Markträumung |
| Thema | Wachstum | Konjunktur |
| Was bestimmt Y? | das Angebot (K, L, Technologie), Y = Ȳ | die Nachfrage (Ausgabenpläne C + I + G) |
| AS-Kurve | vertikal (LRAS) | horizontal (SRAS) |
| Folge eines Nachfrageschocks | nur P ändert sich | nur Y ändert sich |
| 3. Gleichung im IS/LM | Y = Ȳ, r und P passen sich an | P = P̄, r und Y passen sich an |
| Geld | neutral (klassische Dichotomie) | nicht neutral, wirkt auf r und Y |
| Zinsbestimmung | Kapitalmarkt (S = I) | Geldmarkt (Liquiditätspräferenz) |
| Ersparnis hängt ab von | dem Zins r | dem Einkommen Y |
| Arbeitslosigkeit | nur natürlich/freiwillig | unfreiwillig, wegen Nachfragemangel |
| Wirtschaftspolitik | keine aktive Nachfragesteuerung | aktive Stabilisierungspolitik (Fiskal- und Geldpolitik) |

---

## Aufgabe 9 – Lückentext

- **LRAS** verläuft **vertikal** beim natürlichen Output Ȳ. **SRAS** verläuft **horizontal** beim gegebenen Preisniveau P̄.
- **Kurze Frist:** Eine Änderung der Nachfrage ändert den **Output**. Das Preisniveau bleibt konstant.
- **Lange Frist:** Eine Änderung der Nachfrage ändert nur das **Preisniveau**. Der Output bleibt bei Ȳ.
- Geld ist in der **langen Frist neutral**. Das ist die klassisch-neoklassische Sicht.
- **Nominale Variablen** werden in **Geldeinheiten** gemessen, z. B. Nominallohn, Nominalzins und Preisniveau.
- **Reale Variablen** werden in **Mengen- bzw. Gütereinheiten** gemessen, z. B. Realzins, realer Output und Reallohn.
- Die drei Funktionen des Geldes:
  1. **Tauschmittel:** Man kann kaufen und verkaufen, ohne dass beide Seiten genau das wollen, was die andere hat (keine „doppelte Koinzidenz der Bedürfnisse“). Geld ist gesetzliches Zahlungsmittel.
  2. **Recheneinheit:** Preise und Schulden lassen sich vergleichbar angeben.
  3. **Wertaufbewahrungsmittel:** Man kann Kaufkraft in die Zukunft übertragen. Der Nominalwert ist sicher, der Realwert nicht.

Zwei weitere Definitionen im Wortlaut des Skripts (Übung 2-9):
- **Klassische Dichotomie:** Reale und nominale Variablen werden theoretisch unterschieden. Nominale Größen haben keinen Einfluss auf reale Größen. Reale Größen werden nur durch reale Größen bestimmt.
- **Neutralität des Geldes:** Veränderungen der nominalen Geldmenge haben keinen Einfluss auf reale Größen. Langfristig ist Geld für die Realwirtschaft neutral.

Weitere Begriffe aus Übung 2-6:
- **Preis:** die Geldmenge, die man braucht, um eine Ware oder Dienstleistung zu kaufen
- **Preisniveau:** die Geldmenge, die man braucht, um einen Warenkorb zu kaufen
- **Inflation:** die prozentuale Veränderung des durchschnittlichen Preisniveaus
