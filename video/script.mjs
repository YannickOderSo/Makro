// Sprechertext des Erklärvideos. Eine Szene = eine TTS-Anfrage.
// Formeln sind bewusst ausgeschrieben, damit die Stimme sie sauber spricht.
// Die Animationen hängen sich über Textstellen an die Zeitmarken (siehe stage/engine.js: T()).

export const VOICE = {
  voice_id: 'rKiu7lQ4c5P3az3745s3', // Carla Blum – Confident and Informative (de)
  model_id: 'eleven_multilingual_v2',
  voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.0, use_speaker_boost: true, speed: 1.05 },
};

const p = (...paras) => paras.map(s => s.trim().replace(/\s+/g, ' ')).join('\n\n');

export const SCENES = [
  {
    id: 'intro', task: 0, label: 'Überblick',
    text: p(
      `Neun Aufgaben standen in der letzten Makro-Klausur. Fast alle stammen direkt aus den Übungsblättern, nur mit anderen Zahlen oder anderen Sätzen.`,
      `In diesem Video gehen wir alle neun der Reihe nach durch: erst die Idee, dann der Rechenweg, dann das Ergebnis. Los geht's mit dem Bruttoinlandsprodukt.`
    ),
  },
  {
    id: 'a1a', task: 1, label: 'Aufgabe 1 a · BIP-Definition',
    text: p(
      `Aufgabe eins, Teil a. Gefragt ist die Definition des Bruttoinlandsprodukts, und zwar als Lückentext. Der Satz aus dem Skript lautet: Das BIP ist der Wert aller Endprodukte einer Volkswirtschaft, die in einem bestimmten, abgeschlossenen Zeitraum erzeugt werden. Die beiden Lücken sind: Wert, und Endprodukte.`,
      `Warum Wert? Autos und Computer lassen sich nicht einfach addieren. Deshalb bewertet man jedes Gut mit seinem Marktpreis. Vier Autos zu je zehntausend Euro und fünf Computer zu je tausend Euro ergeben ein BIP von fünfundvierzigtausend Euro.`,
      `Warum Endprodukte? In einem Auto für zehntausend Euro stecken Elektronik für zweitausend und Bleche für tausend Euro. Würde man alles zusammenzählen, wären diese Teile doppelt drin. Gezählt wird deshalb nur das fertige Auto.`,
      `Und merk dir: Das BIP misst gleichzeitig alle Einkommen und alle Ausgaben. Was die einen ausgeben, verdienen die anderen.`
    ),
  },
  {
    id: 'a1b', task: 1, label: 'Aufgabe 1 b · Ausgabenkategorien',
    text: p(
      `Teil b ist Übung eins fünf, nur mit anderen Sätzen. Du sollst Transaktionen der richtigen Ausgabenkategorie zuordnen. Das BIP hat vier Teile: Konsum, Investitionen, Staatsausgaben und Nettoexporte. Die entscheidende Frage ist immer: Wer kauft?`,
      `VW verkauft einen Lieferwagen an die Bundeswehr. Käufer ist der Staat, also Staatsausgaben.`,
      `Der nächste Wagen geht an die BASF. Ein Unternehmen kauft Ausrüstung, das ist eine Investition.`,
      `Air France kauft einen Wagen. Der Käufer sitzt im Ausland, es ist ein Export, also Nettoexporte.`,
      `Herr Merz kauft privat. Ein Haushalt, also Konsum.`,
      `Und der Sonderfall: VW produziert einen Wagen, verkauft ihn aber erst nächstes Jahr. Er wandert ins Lager, und das zählt als Lagerinvestition.`,
      `Die Merkregel: Haushalt ist Konsum, Unternehmen ist Investition, Staat ist Staatsausgaben, Ausland ist Nettoexporte. Und das Lager ist ebenfalls eine Investition.`
    ),
  },
  {
    id: 'a1c', task: 1, label: 'Aufgabe 1 c · Fall 1, Folie 91',
    text: p(
      `Teil c verweist auf Fall eins von Folie einundneunzig im ersten Skript. Dort geht es um die Leistungsbilanz einer offenen Volkswirtschaft. Ausgangspunkt ist die Gleichung: Ersparnis minus Investitionen gleich Nettoexporte.`,
      `Fall eins ist der Leistungsbilanzüberschuss. Die Nettoexporte sind positiv, das Land exportiert also mehr, als es importiert. Es produziert mehr, als es selbst für Konsum, Investitionen und Staat ausgibt. Und es spart mehr, als es im Inland investiert. Die überschüssige Ersparnis fließt ins Ausland: Das sind Netto-Kapitalexporte. Dadurch verbessert sich die Netto-Auslandsposition.`,
      `Zur Einordnung: In Fall zwei ist die Leistungsbilanz ausgeglichen, Ersparnis und Investitionen sind gleich groß. In Fall drei gibt es ein Defizit. Das Land importiert Kapital, und seine Auslandsposition verschlechtert sich.`
    ),
  },
  {
    id: 'a1d', task: 1, label: 'Aufgabe 1 d · Definitionen',
    text: p(
      `Teil d fragte nach zwei Definitionen. Welche genau, ist nicht überliefert. Am wahrscheinlichsten sind die Begriffe aus dem ersten Kapitel.`,
      `Das nominale BIP ist der Euro-Wert der Produktion, also Mengen mal aktuelle Preise. Es kann steigen, weil die Preise steigen, weil die Mengen steigen, oder beides.`,
      `Das reale BIP bewertet die aktuellen Mengen mit den konstanten Preisen eines Basisjahres. Es steigt nur, wenn wirklich mehr produziert wird.`,
      `Der BIP-Deflator ist nominales geteilt durch reales BIP. Er zeigt den Preis einer typischen produzierten Einheit im Vergleich zum Basisjahr.`,
      `Und eine Investition ist nur die Schaffung von neuem Kapital. Wer eine alte Villa oder Aktien an der Börse kauft, verteilt Vermögen nur um.`
    ),
  },
  {
    id: 'a2a', task: 2, label: 'Aufgabe 2 a · BIP-Deflator',
    text: p(
      `Aufgabe zwei: BIP-Deflator, Verbraucherpreisindex und Inflationsrate. Die Zahlen stammen aus Übung eins sechs. Eine Wirtschaft produziert nur Äpfel und Birnen, das Basisjahr ist 2010.`,
      `Schritt eins, das nominale BIP: Menge mal Preis des jeweiligen Jahres. 2010 sind das zehn mal eins plus fünf mal eins, also fünfzehn. 2011 steigen nur die Preise: zehn mal eins Komma fünf plus fünf mal zwei ergibt fünfundzwanzig. 2012 fallen die Preise zurück, aber die Mengen steigen. Das ergibt wieder fünfundzwanzig.`,
      `Schritt zwei, das reale BIP: die Mengen des Jahres, aber immer mit den Preisen von 2010. Das ergibt fünfzehn, fünfzehn und fünfundzwanzig. Man sieht: 2011 ist real nichts gewachsen, 2012 schon.`,
      `Schritt drei, der Deflator: nominal geteilt durch real, mal hundert. 2010 sind das genau hundert. 2011 fünfundzwanzig durch fünfzehn, also hundertsechsundsechzig Komma sieben. Und 2012 wieder hundert.`
    ),
  },
  {
    id: 'a2b', task: 2, label: 'Aufgabe 2 b · VPI und Inflation',
    text: p(
      `Teil b: der Verbraucherpreisindex. Hier bleibt der Warenkorb fest. Es ist der Korb des Basisjahres: zehn Äpfel und fünf Birnen. 2010 kostet er fünfzehn. Mit den Preisen von 2011 kostet derselbe Korb fünfundzwanzig. Der Index steigt damit auf hundertsechsundsechzig Komma sieben. 2012 kostet der Korb wieder fünfzehn, der Index liegt bei hundert.`,
      `Die Inflationsrate ist die prozentuale Veränderung des Index gegenüber dem Vorjahr. 2011 geht es von hundert auf hundertsechsundsechzig Komma sieben. Das sind plus sechsundsechzig Komma sieben Prozent. 2012 geht es zurück auf hundert. Das sind minus vierzig Prozent, also eine Deflation.`,
      `Dass Deflator und Verbraucherpreisindex hier gleich sind, ist Zufall. Die Unterschiede solltest du nennen können: Importgüter stecken nur im Verbraucherpreisindex, Kapitalgüter nur im Deflator. Und der Warenkorb ist beim Verbraucherpreisindex fest, beim Deflator variabel.`
    ),
  },
  {
    id: 'a3', task: 3, label: 'Aufgabe 3 · Übung 2-8 · Realzins',
    text: p(
      `Aufgabe drei ist Übung zwei acht. Gesucht ist der Realzins. Gegeben ist: Die Geldmenge wächst um vierzehn Prozent, das reale BIP um fünf Prozent, der Nominalzins liegt bei elf Prozent, und die Umlaufgeschwindigkeit ist konstant.`,
      `Wir brauchen zwei Gleichungen. Zuerst die Quantitätsgleichung: Geldmenge mal Umlaufgeschwindigkeit gleich Preisniveau mal reales BIP. In Wachstumsraten wird aus dem Mal ein Plus. Die Umlaufgeschwindigkeit ist konstant, ihre Wachstumsrate ist also null. Übrig bleibt: Inflation gleich Geldmengenwachstum minus reales Wachstum. Vierzehn minus fünf ergibt neun Prozent Inflation.`,
      `Dann die Fisher-Gleichung: Der Nominalzins ist der Realzins plus die Inflation. Umgestellt: Realzins gleich elf minus neun, also zwei Prozent. Von elf Prozent Zinsen frisst die Inflation neun auf, real bleiben zwei.`
    ),
  },
  {
    id: 'a4', task: 4, label: 'Aufgabe 4 · Übung 2-4 · Kreislauf',
    text: p(
      `Aufgabe vier ist Übung zwei vier, Teile a bis c. Eine geschlossene Volkswirtschaft: Die Unternehmen zahlen den Haushalten sechshundertzwanzig an Löhnen und hundertachtzig an Kapitaleinkommen. Die Haushalte konsumieren für fünfhundertsechzig und zahlen hundert an Steuern. Die Unternehmen investieren hundertzehn, der Staat gibt hundertdreißig aus.`,
      `Teil a: das BIP auf zwei Wegen. Über die Einkommen: Löhne plus Kapitaleinkommen, das sind achthundert. Über die Verwendung: Konsum plus Investitionen plus Staatsausgaben, ebenfalls achthundert. Beide Wege müssen dasselbe ergeben.`,
      `Teil b: die Ersparnis. Privat ist das Einkommen minus Steuern minus Konsum: achthundert minus hundert minus fünfhundertsechzig, also hundertvierzig. Öffentlich ist das Steuern minus Staatsausgaben: hundert minus hundertdreißig, also minus dreißig, ein Defizit. Zusammen sind das hundertzehn, und das ist genau die Investition. Die Probe stimmt.`,
      `Teil c: die marginale Konsumneigung. Der autonome Konsum ist null, also ist der Konsum ein fester Anteil am verfügbaren Einkommen. Fünfhundertsechzig geteilt durch siebenhundert ergibt null Komma acht. Von jedem zusätzlichen Euro werden achtzig Cent konsumiert.`
    ),
  },
  {
    id: 'a5a', task: 5, label: 'Aufgabe 5 · Übung 3-2 · Solow-Modell',
    text: p(
      `Aufgabe fünf ist Übung drei zwei, das Solow-Modell. Die Produktionsfunktion lautet: Output gleich Wurzel aus Kapital mal Wurzel aus Arbeit.`,
      `Teil a: Gibt es konstante Skalenerträge? Wir vervielfachen beide Faktoren mit z. Aus jeder Wurzel lässt sich Wurzel z herausziehen, und Wurzel z mal Wurzel z ist z. Der Output wächst also um genau denselben Faktor. Ja, konstante Skalenerträge. Der schnelle Check: Die Exponenten addieren sich zu eins.`,
      `Teil b: die Pro-Kopf-Funktion. Wir teilen durch die Arbeit. Übrig bleibt: Output pro Kopf gleich Wurzel aus Kapital pro Kopf.`
    ),
  },
  {
    id: 'a5b', task: 5, label: 'Aufgabe 5 c · Steady State',
    text: p(
      `Teil c: der Steady State. Land A spart zehn Prozent, Land B zwanzig Prozent, und jedes Jahr verschleißen fünf Prozent des Kapitals. Im Steady State sind die Investitionen genau so groß wie die Abschreibungen: Sparquote mal Wurzel k gleich Abschreibungsrate mal k. Aufgelöst ist k Stern gleich Sparquote durch Abschreibungsrate, zum Quadrat.`,
      `Für Land A: zehn Prozent durch fünf Prozent ist zwei, zum Quadrat vier. Das Einkommen ist die Wurzel daraus, also zwei. Investiert werden zehn Prozent davon, null Komma zwei. Für den Konsum bleiben eins Komma acht.`,
      `Für Land B: zwanzig Prozent durch fünf Prozent ist vier, zum Quadrat sechzehn. Das Einkommen ist vier, die Investitionen null Komma acht, der Konsum drei Komma zwei.`,
      `Im Diagramm liegt der Steady State dort, wo die Sparkurve die Abschreibungsgerade schneidet. Die Botschaft: Wer mehr spart, hat langfristig mehr Kapital und ein höheres Einkommen.`
    ),
  },
  {
    id: 'a6a', task: 6, label: 'Aufgabe 6 · Übung 4 (Teil II) · IS/LM',
    text: p(
      `Aufgabe sechs ist Übung vier aus dem zweiten Teil, das IS-LM-Modell.`,
      `Zuerst die IS-Kurve, also das Gleichgewicht am Gütermarkt: Einkommen gleich Konsum plus Investitionen plus Staatsausgaben. Wir setzen alles ein und fassen zusammen. Rechts stehen dann vierhundertfünfundzwanzig, plus null Komma sieben fünf mal Ypsilon, minus fünfundzwanzig mal r. Wir bringen Ypsilon nach links und teilen durch null Komma zwei fünf. Die IS-Kurve lautet: Ypsilon gleich siebzehnhundert minus hundert mal r.`,
      `Jetzt die LM-Kurve, das Gleichgewicht am Geldmarkt. Das reale Geldangebot ist tausend geteilt durch zwei, also fünfhundert. Das muss der Geldnachfrage entsprechen. Daraus folgt: Ypsilon gleich fünfhundert plus hundert mal r.`,
      `Teil b: Wir setzen beide gleich. Zweihundert mal r ist zwölfhundert, der Zins ist also sechs. Eingesetzt ergibt sich ein Einkommen von elfhundert.`
    ),
  },
  {
    id: 'a6b', task: 6, label: 'Aufgabe 6 c, d · Fiskal- und Geldpolitik',
    text: p(
      `Teil c: Die Staatsausgaben steigen von hundert auf hundertfünfzig. Die IS-Kurve verschiebt sich nach rechts, und zwar um den Anstieg mal den Multiplikator: fünfzig geteilt durch null Komma zwei fünf, das sind zweihundert. Im neuen Schnittpunkt liegt der Zins bei sieben und das Einkommen bei zwölfhundert. Das Einkommen steigt also nur um hundert statt um zweihundert. Der Grund: Der höhere Zins verdrängt private Investitionen. Das nennt man Crowding-out.`,
      `Teil d: Zurück zum Ausgangspunkt. Jetzt steigt das Geldangebot von tausend auf zwölfhundert. Das reale Geldangebot wächst auf sechshundert, die LM-Kurve verschiebt sich um hundert nach rechts. Im neuen Gleichgewicht sinkt der Zins auf fünf Komma fünf, und das Einkommen steigt auf elfhundertfünfzig. Mehr Geld senkt den Zins, und das regt die Investitionen an.`
    ),
  },
  {
    id: 'a7', task: 7, label: 'Aufgabe 7 · Übung 2-10 · Offene Volkswirtschaft',
    text: p(
      `Aufgabe sieben: Was passiert in einer kleinen offenen Volkswirtschaft, wenn der Rest der Welt die Staatsausgaben senkt? Das ist Übung zwei zehn, Teil b.`,
      `Das Modell hat drei Bausteine. Die Ersparnis hängt nicht vom Zins ab, sie ist eine senkrechte Linie. Die Investitionen fallen mit dem Zins. Und der Zins selbst ist vorgegeben: Ein kleines Land muss den Weltzins hinnehmen. Die Nettoexporte sind Ersparnis minus Investitionen, im Diagramm der waagerechte Abstand auf Höhe des Weltzinses. Am Anfang ist er positiv.`,
      `Jetzt senkt der Rest der Welt die Staatsausgaben. Dadurch steigt die Ersparnis der Welt, und der Weltzins sinkt. Im Inland ändert sich an der Ersparnis nichts, denn hier wurde keine Politik geändert. Aber beim niedrigeren Zins lohnen sich mehr Investitionen. Die Investitionen steigen, der Abstand schrumpft: Die Nettoexporte sinken und können sogar negativ werden. Passend dazu wertet die Währung real auf.`,
      `Zum Vergleich: Senkt das Inland selbst die Staatsausgaben, steigt die eigene Ersparnis. Der Zins bleibt gleich, die Investitionen auch, und die Nettoexporte steigen.`
    ),
  },
  {
    id: 'a8', task: 8, label: 'Aufgabe 8 · Klassik vs. Keynes',
    text: p(
      `Aufgabe acht: eine Tabelle, die Klassik und Neoklassik mit Keynes vergleicht. Eine Spalte war vorgegeben, die andere musstest du ergänzen. Gehen wir die Zeilen durch.`,
      `Der Zeithorizont: Die Klassik betrachtet die mittlere bis lange Frist, Keynes die kurze Frist.`,
      `Die Preise: in der Klassik flexibel, bei Keynes starr.`,
      `Die Märkte: In der Klassik werden sie geräumt, bei Keynes eventuell nicht.`,
      `Das Thema: Wachstum auf der einen Seite, Konjunktur auf der anderen.`,
      `Was bestimmt das Einkommen? In der Klassik das Angebot, also Kapital, Arbeit und Technologie. Bei Keynes die Nachfrage, also die Ausgabenwünsche von Haushalten, Unternehmen und Staat.`,
      `Die Angebotskurve: klassisch senkrecht, keynesianisch waagerecht.`,
      `Und die dritte Gleichung im IS-LM-Modell: In der Klassik liegt der Output fest, Zins und Preisniveau passen sich an. Bei Keynes liegt das Preisniveau fest, Zins und Output passen sich an.`,
      `Der Trick für die Klausur: Merk dir die Paare. Lang und kurz, flexibel und starr, Angebot und Nachfrage. Dann kannst du jede Spalte aus der anderen ableiten.`
    ),
  },
  {
    id: 'a9a', task: 9, label: 'Aufgabe 9 · Lückentext · AD/AS',
    text: p(
      `Aufgabe neun ist ein Lückentext mit fünf Fragen.`,
      `Erstens: Wie verlaufen die beiden Angebotskurven? Die langfristige, kurz LRAS, verläuft senkrecht beim natürlichen Output. Die kurzfristige, kurz SRAS, verläuft waagerecht beim gegebenen Preisniveau.`,
      `Zweitens: Was passiert mit Output und Preisniveau? Nehmen wir an, die Nachfrage geht zurück. In der kurzen Frist sind die Preise starr. Die Wirtschaft rutscht auf der waagerechten Kurve nach links: Der Output sinkt, das Preisniveau bleibt gleich. In der langen Frist geben die Preise nach. Die Wirtschaft kehrt zum natürlichen Output zurück, aber bei einem niedrigeren Preisniveau. Kurz gesagt: Kurzfristig reagiert der Output, langfristig nur das Preisniveau.`
    ),
  },
  {
    id: 'a9b', task: 9, label: 'Aufgabe 9 · Geld',
    text: p(
      `Drittens: In welcher Frist ist Geld neutral? In der langen Frist. Eine Änderung der Geldmenge verändert dann nur die Preise, aber keine realen Größen.`,
      `Viertens: Wie wird gemessen? Nominale Variablen werden in Geldeinheiten gemessen, zum Beispiel der Nominallohn in Euro. Reale Variablen werden in Mengen- oder Gütereinheiten gemessen, zum Beispiel der Reallohn in Gütern.`,
      `Fünftens: die drei Funktionen des Geldes. Geld ist Tauschmittel: Man kann kaufen und verkaufen, ohne erst einen passenden Tauschpartner zu suchen. Geld ist Recheneinheit: Preise und Schulden werden vergleichbar. Und Geld ist Wertaufbewahrungsmittel: Kaufkraft lässt sich in die Zukunft übertragen.`
    ),
  },
  {
    id: 'outro', task: 0, label: 'Zusammenfassung',
    text: p(
      `Das waren alle neun Aufgaben. Wenn du die passenden Übungen sicher rechnen kannst, also eins fünf und eins sechs, zwei vier, zwei acht und zwei zehn, drei zwei und Übung vier aus dem zweiten Teil, dann hast du den größten Teil der Klausur schon in der Tasche. Viel Erfolg!`
    ),
  },
];
