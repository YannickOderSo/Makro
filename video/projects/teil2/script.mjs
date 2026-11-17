// Video „Teil II – Übungen 1 bis 4: So zeichnest du sie“. Eine Szene = eine TTS-Anfrage.
// Formeln sind ausgeschrieben, damit die Stimme sie sauber spricht.
export { VOICE } from '../../voice.mjs';
import { p } from '../../voice.mjs';

export const META = {
  title: 'Makroökonomie Teil II – Übungen 1 bis 4: So zeichnest du sie',
  brand: 'MAKRO · TEIL II',
  out: 'Makro_Teil2_Uebungen_1-4_zeichnen.mp4',
  sections: ['Übung 1', 'Übung 2', 'Übung 3', 'Übung 4'],
};

export const SCENES = [
  {
    id: 'intro', sec: 0, label: 'Überblick',
    text: p(
      `Im zweiten Teil der Vorlesung gibt es vier Übungen, und in jeder musst du zeichnen: das keynesianische Kreuz, den Geldmarkt und das IS-LM-Modell.`,
      `In diesem Video zeichnen wir alle vier Aufgaben Schritt für Schritt. Erst die Achsen, dann die Punkte, dann die Linien, und am Ende die Verschiebung.`
    ),
  },
  {
    id: 'u1a', sec: 1, label: 'Übung 1 · Keynesianisches Kreuz zeichnen',
    text: p(
      `Übung eins: das keynesianische Kreuz. Gegeben ist die Konsumfunktion: zweihundert plus null Komma sieben fünf mal das verfügbare Einkommen. Investitionen, Staatsausgaben und Steuern betragen jeweils hundert.`,
      `Zuerst brauchen wir die geplanten Ausgaben: Konsum plus Investitionen plus Staatsausgaben. Eingesetzt und zusammengefasst ergibt das dreihundertfünfundzwanzig plus null Komma sieben fünf mal Ypsilon.`,
      `Jetzt zeichnen wir. Schritt eins, die Achsen: nach rechts das Einkommen, nach oben die geplanten Ausgaben. Beide Achsen bekommen dieselbe Skala.`,
      `Schritt zwei, die Fünfundvierzig-Grad-Linie. Sie verbindet alle Punkte, an denen Einkommen und Ausgaben gleich groß sind. Sie startet im Ursprung und läuft durch den Punkt zweitausend, zweitausend.`,
      `Schritt drei, die Ausgabengerade. Für eine Gerade reichen zwei Punkte. Der erste ist der Achsenabschnitt: Bei einem Einkommen von null liegen die Ausgaben bei dreihundertfünfundzwanzig. Für den zweiten setzen wir zweitausend ein: Das ergibt achtzehnhundertfünfundzwanzig. Beide Punkte verbinden, fertig. Die Gerade ist flacher als die Fünfundvierzig-Grad-Linie, denn ihre Steigung ist die marginale Konsumneigung, null Komma sieben fünf.`
    ),
  },
  {
    id: 'u1b', sec: 1, label: 'Übung 1 · Gleichgewicht',
    text: p(
      `Das Gleichgewicht liegt dort, wo sich beide Linien schneiden. Rechnerisch setzen wir Einkommen gleich Ausgaben: Ypsilon gleich dreihundertfünfundzwanzig plus null Komma sieben fünf mal Ypsilon. Ein Viertel von Ypsilon ist also dreihundertfünfundzwanzig, und Ypsilon ist dreizehnhundert.`,
      `In der Zeichnung markierst du den Schnittpunkt und fällst das Lot auf beide Achsen. An beiden steht dreizehnhundert.`,
      `Warum landet die Wirtschaft genau dort? Rechts vom Schnittpunkt wird mehr produziert als nachgefragt. Die Lager füllen sich, die Unternehmen drosseln die Produktion. Links davon ist es umgekehrt: Die Lager leeren sich, und die Produktion steigt.`
    ),
  },
  {
    id: 'u1c', sec: 1, label: 'Übung 1 · Staatsausgaben steigen',
    text: p(
      `Jetzt erhöht der Staat seine Ausgaben von hundert auf hundertfünfundzwanzig. Die Ausgabengerade verschiebt sich parallel nach oben, und zwar genau um diese fünfundzwanzig. Der neue Achsenabschnitt ist dreihundertfünfzig, die Steigung bleibt gleich.`,
      `Zeichne die neue Gerade in einer zweiten Farbe und markiere den neuen Schnittpunkt. Er liegt bei vierzehnhundert. Das Einkommen steigt also um hundert, obwohl der Staat nur fünfundzwanzig mehr ausgibt.`,
      `Das ist der Multiplikator: eins geteilt durch eins minus die marginale Konsumneigung, also eins durch null Komma zwei fünf, gleich vier. Vier mal fünfundzwanzig ergibt hundert.`,
      `Die letzte Frage dreht das um: Welche Staatsausgaben braucht man für ein Einkommen von sechzehnhundert? Das Einkommen muss um dreihundert steigen. Geteilt durch den Multiplikator vier sind das fünfundsiebzig zusätzliche Staatsausgaben, insgesamt also hundertfünfundsiebzig.`
    ),
  },
  {
    id: 'u2a', sec: 2, label: 'Übung 2 · Geldmarkt zeichnen',
    text: p(
      `Übung zwei: der Geldmarkt. Die Nachfrage nach Realkasse ist tausend minus hundert mal r. Das Geldangebot beträgt tausend, das Preisniveau zwei.`,
      `Schritt eins, die Achsen: nach oben der Zinssatz in Prozent, nach rechts die Realkasse, also Geldmenge geteilt durch Preisniveau.`,
      `Schritt zwei, das Angebot. Tausend geteilt durch zwei ist fünfhundert. Diese Menge legt die Zentralbank fest, sie hängt nicht vom Zins ab. Deshalb ist das Angebot eine senkrechte Linie bei fünfhundert.`,
      `Schritt drei, die Nachfrage. Wieder reichen zwei Punkte. Bei einem Zins von null werden tausend nachgefragt, das ist der Punkt auf der waagerechten Achse. Bei einem Zins von zehn ist die Nachfrage null, das ist der Punkt auf der senkrechten Achse. Verbinden, und die fallende Nachfragekurve steht.`,
      `Schritt vier, das Gleichgewicht. Fünfhundert gleich tausend minus hundert mal r. Der Zins ist also fünf Prozent. Markiere den Schnittpunkt und zieh eine gestrichelte Linie zur Zinsachse.`
    ),
  },
  {
    id: 'u2b', sec: 2, label: 'Übung 2 · Geldangebot ändern',
    text: p(
      `Jetzt erhöht die Zentralbank das Geldangebot von tausend auf zwölfhundert. Die Realkasse steigt auf sechshundert. In der Zeichnung rückt die senkrechte Angebotslinie nach rechts. Der neue Schnittpunkt liegt tiefer: Sechshundert gleich tausend minus hundert mal r ergibt einen Zins von vier Prozent.`,
      `Der Mechanismus dahinter: Beim alten Zins gibt es jetzt mehr Geld, als die Leute halten wollen. Mit dem überschüssigen Geld kaufen sie Wertpapiere. Die Kurse steigen, und der Zins sinkt.`,
      `Die letzte Frage: Welches Geldangebot braucht man für einen Zins von sieben Prozent? Bei sieben Prozent wird eine Realkasse von dreihundert nachgefragt. Mal Preisniveau zwei ergibt ein Geldangebot von sechshundert. Die Angebotslinie rückt also nach links, und der Schnittpunkt wandert nach oben.`
    ),
  },
  {
    id: 'u3a', sec: 3, label: 'Übung 3 · IS/LM-Grunddiagramm',
    text: p(
      `Übung drei kommt ohne Zahlen aus. Du sollst im IS-LM-Modell zeigen, was drei Maßnahmen bewirken, und zwar mit Grafik und Erklärung.`,
      `Das Grunddiagramm ist immer dasselbe. Nach oben der Zins, nach rechts das Einkommen. Die IS-Kurve fällt: Sie steht für das Gleichgewicht am Gütermarkt. Die LM-Kurve steigt: Sie steht für das Gleichgewicht am Geldmarkt. Im Schnittpunkt sind beide Märkte im Gleichgewicht. Beschrifte ihn mit r eins und Ypsilon eins.`,
      `Die wichtigste Regel: Fiskalpolitik verschiebt die IS-Kurve, Geldpolitik verschiebt die LM-Kurve. Die alte Kurve bleibt stehen, die neue zeichnest du parallel daneben, mit einem Pfeil für die Richtung.`
    ),
  },
  {
    id: 'u3b', sec: 3, label: 'Übung 3 a · Geldangebot steigt',
    text: p(
      `Teil a: Die Zentralbank erhöht das Geldangebot. Das ist Geldpolitik, also verschiebt sich die LM-Kurve, und zwar nach rechts unten. Der neue Schnittpunkt liegt weiter rechts und tiefer: Das Einkommen steigt, der Zins sinkt.`,
      `Jetzt die Anpassung in zwei Runden. Runde eins beginnt am Geldmarkt: Es gibt mehr Geld als gewünscht, die Leute kaufen Wertpapiere, und der Zins sinkt. Am Gütermarkt lohnen sich dadurch mehr Investitionen. Das Einkommen steigt, und mit ihm der Konsum.`,
      `Runde zwei: Das höhere Einkommen erhöht die Geldnachfrage. Der Zins steigt wieder ein Stück, bleibt aber unter dem alten Niveau. Dadurch fallen die Investitionen etwas schwächer aus.`,
      `Der Gesamteffekt: Einkommen rauf, Zins runter, Investitionen rauf, Konsum rauf.`
    ),
  },
  {
    id: 'u3c', sec: 3, label: 'Übung 3 b · Staatsausgaben steigen',
    text: p(
      `Teil b: Die Regierung erhöht die Staatsausgaben. Das ist Fiskalpolitik, also verschiebt sich die IS-Kurve nach rechts. Der waagerechte Abstand ist der Anstieg der Staatsausgaben mal der Multiplikator. Der neue Schnittpunkt liegt weiter rechts und höher: Einkommen und Zins steigen beide.`,
      `Runde eins beginnt diesmal am Gütermarkt: Mehr Staatsausgaben bedeuten mehr Nachfrage. Das Einkommen steigt, und über den Multiplikator auch der Konsum. Am Geldmarkt erhöht das höhere Einkommen die Geldnachfrage. Die Leute verkaufen Wertpapiere, die Kurse fallen, und der Zins steigt.`,
      `Runde zwei: Der höhere Zins verdrängt private Investitionen. Das Einkommen steigt deshalb weniger stark als im keynesianischen Kreuz. Das ist das Crowding-out.`,
      `Der Gesamteffekt: Einkommen rauf, Zins rauf, Konsum rauf, Investitionen runter.`
    ),
  },
  {
    id: 'u3d', sec: 3, label: 'Übung 3 c · Steuern steigen',
    text: p(
      `Teil c: Die Regierung erhöht die Steuern. Wieder Fiskalpolitik, aber diesmal verschiebt sich die IS-Kurve nach links. Der Abstand ist kleiner als bei den Staatsausgaben: marginale Konsumneigung mal Steuererhöhung, mal der Multiplikator. Der neue Schnittpunkt liegt weiter links und tiefer.`,
      `Runde eins: Das verfügbare Einkommen sinkt, die Haushalte konsumieren weniger, und das Einkommen fällt. Am Geldmarkt sinkt damit die Geldnachfrage, und der Zins geht zurück.`,
      `Runde zwei: Der niedrigere Zins regt die Investitionen an. Das bremst den Rückgang des Einkommens etwas.`,
      `Der Gesamteffekt: Einkommen runter, Zins runter, Konsum runter, Investitionen rauf. Am Ende hilft dir eine kleine Tabelle mit allen drei Maßnahmen.`
    ),
  },
  {
    id: 'u4a', sec: 4, label: 'Übung 4 a · IS und LM zeichnen',
    text: p(
      `Übung vier: das IS-LM-Modell mit Zahlen. Teil a verlangt, beide Kurven zu zeichnen, für Zinsen zwischen null und acht.`,
      `Dafür brauchen wir zuerst die Gleichungen. Aus dem Gütermarkt folgt die IS-Kurve: Ypsilon gleich siebzehnhundert minus hundert mal r. Aus dem Geldmarkt folgt die LM-Kurve: Ypsilon gleich fünfhundert plus hundert mal r.`,
      `Schritt eins, die Achsen: nach oben der Zins von null bis acht, nach rechts das Einkommen.`,
      `Schritt zwei, eine kleine Wertetabelle mit den beiden Randwerten. Für die IS-Kurve: Bei einem Zins von null ist das Einkommen siebzehnhundert, bei acht ist es neunhundert. Für die LM-Kurve: bei null fünfhundert, bei acht dreizehnhundert.`,
      `Schritt drei: Trage die vier Punkte ein und verbinde jeweils zwei mit dem Lineal. Die IS-Kurve fällt, die LM-Kurve steigt. Schreib die Namen direkt an die Linien.`
    ),
  },
  {
    id: 'u4b', sec: 4, label: 'Übung 4 b · Gleichgewicht',
    text: p(
      `Teil b: das Gleichgewicht. In deiner Zeichnung kannst du es schon ablesen: Die Linien schneiden sich bei einem Zins von sechs und einem Einkommen von elfhundert.`,
      `Die Rechnung bestätigt das. Beide Gleichungen gleichsetzen: siebzehnhundert minus hundert mal r gleich fünfhundert plus hundert mal r. Zweihundert mal r ist zwölfhundert, also ist r gleich sechs. Eingesetzt ergibt sich ein Einkommen von elfhundert. Markiere den Punkt und zieh gestrichelte Linien zu beiden Achsen.`
    ),
  },
  {
    id: 'u4c', sec: 4, label: 'Übung 4 c · Staatsausgaben steigen',
    text: p(
      `Teil c: Die Staatsausgaben steigen von hundert auf hundertfünfzig. Die IS-Kurve verschiebt sich nach rechts, um fünfzig mal den Multiplikator vier, also um zweihundert.`,
      `So zeichnest du das: Verschiebe beide Randpunkte um zweihundert nach rechts. Aus siebzehnhundert wird neunzehnhundert, aus neunhundert wird elfhundert. Verbinde die neuen Punkte, und die neue IS-Kurve liegt parallel zur alten.`,
      `Der neue Schnittpunkt mit der LM-Kurve: Zins sieben, Einkommen zwölfhundert. Das Einkommen steigt nur um hundert und nicht um zweihundert, weil der höhere Zins Investitionen verdrängt.`
    ),
  },
  {
    id: 'u4d', sec: 4, label: 'Übung 4 d · Geldangebot steigt',
    text: p(
      `Teil d: Zurück zum Ausgangspunkt. Jetzt steigt das Geldangebot von tausend auf zwölfhundert. Die Realkasse wächst von fünfhundert auf sechshundert, und die LM-Kurve verschiebt sich um hundert nach rechts.`,
      `Wieder verschiebst du die beiden Randpunkte: aus fünfhundert wird sechshundert, aus dreizehnhundert wird vierzehnhundert. Die neue LM-Kurve liegt parallel rechts neben der alten.`,
      `Der neue Schnittpunkt mit der ursprünglichen IS-Kurve: Zins fünf Komma fünf, Einkommen elfhundertfünfzig.`
    ),
  },
  {
    id: 'u4e', sec: 4, label: 'Übung 4 e · Preisniveau steigt',
    text: p(
      `Teil e: Wieder zurück zum Ausgangspunkt. Diesmal steigt das Preisniveau von zwei auf vier. Bei gleichem Geldangebot halbiert sich die Realkasse auf zweihundertfünfzig. Die LM-Kurve verschiebt sich deshalb nach links.`,
      `Die neuen Randpunkte: bei einem Zins von null zweihundertfünfzig, bei acht tausendfünfzig. Im neuen Schnittpunkt liegt der Zins bei sieben Komma zwei fünf, und das Einkommen fällt auf neunhundertfünfundsiebzig.`,
      `Ein höheres Preisniveau wirkt also wie ein kleineres Geldangebot: Der Zins steigt, das Einkommen sinkt.`
    ),
  },
  {
    id: 'outro', sec: 0, label: 'Zusammenfassung',
    text: p(
      `Das waren alle vier Übungen aus Teil zwei. Die Reihenfolge beim Zeichnen ist immer gleich: Achsen beschriften, zwei Punkte je Gerade berechnen, verbinden, den Schnittpunkt markieren, und Verschiebungen parallel mit Pfeil einzeichnen. Viel Erfolg!`
    ),
  },
];
