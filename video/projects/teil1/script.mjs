// Video „Teil I – Übung 2-2 und 2-10 genau erklärt“. Eine Szene = eine TTS-Anfrage.
// Formeln sind ausgeschrieben, damit die Stimme sie sauber spricht.
export { VOICE } from '../../voice.mjs';
import { p } from '../../voice.mjs';

export const META = {
  title: 'Makroökonomie Teil I – Übung 2-2 und 2-10 genau erklärt',
  brand: 'MAKRO · TEIL I',
  out: 'Makro_Teil1_Uebung_2-2_und_2-10.mp4',
  sections: ['Übung 2-2', 'Übung 2-10'],
};

export const SCENES = [
  {
    id: 'intro', sec: 0, label: 'Überblick',
    text: p(
      `Zwei Übungen aus Teil eins, ein gemeinsames Diagramm: Übung zwei zwei und Übung zwei zehn. In beiden geht es um Ersparnis, Investitionen und den Realzins.`,
      `Übung zwei zwei spielt in der geschlossenen Volkswirtschaft, Übung zwei zehn in der kleinen offenen. Wir zeichnen beide Schritt für Schritt.`
    ),
  },
  {
    id: 'u22a', sec: 1, label: 'Übung 2-2 · Das Modell zeichnen',
    text: p(
      `Übung zwei zwei. Die Konsumenten gewinnen Vertrauen in die Zukunft und konsumieren schon heute mehr. Gefragt ist: Was passiert mit den Investitionen und mit dem Realzins?`,
      `Dafür brauchen wir den Finanzmarkt der geschlossenen Volkswirtschaft. Schritt eins, die Achsen: nach oben der Realzins, nach rechts Ersparnis und Investitionen.`,
      `Schritt zwei, die Ersparnis. Sie ist das, was vom Einkommen übrig bleibt, nach Konsum und Staatsausgaben. Das Einkommen ist langfristig fest, es wird durch Kapital und Arbeit bestimmt. Und der Konsum hängt vom verfügbaren Einkommen ab, nicht vom Zins. Deshalb ist die Ersparnis eine senkrechte Linie. Sie ist das Kreditangebot.`,
      `Schritt drei, die Investitionen. Je höher der Zins, desto teurer sind Kredite, und desto weniger wird investiert. Die Investitionskurve fällt also von links oben nach rechts unten. Sie ist die Kreditnachfrage.`,
      `Schritt vier, das Gleichgewicht. Im Schnittpunkt sind Kreditangebot und Kreditnachfrage gleich groß. Dort lesen wir den Realzins ab.`
    ),
  },
  {
    id: 'u22b', sec: 1, label: 'Übung 2-2 · Mehr Konsum',
    text: p(
      `Jetzt kommt der Schock: Die Haushalte konsumieren mehr. Das Einkommen bleibt gleich, die Staatsausgaben auch. Also sinkt die Ersparnis, und zwar genau um den zusätzlichen Konsum.`,
      `In der Zeichnung verschiebst du die senkrechte Linie nach links. Die alte Linie bleibt stehen, beschrifte sie mit S eins, die neue mit S zwei.`,
      `Beim alten Zins wollen die Unternehmen jetzt mehr Kredite, als gespart wird. Die Kreditnachfrage ist größer als das Angebot, und deshalb steigt der Zins. Der neue Schnittpunkt liegt weiter oben auf der Investitionskurve.`,
      `Mit dem höheren Zins sinken die Investitionen, von I eins auf I zwei. Trag beide Werte auf der waagerechten Achse ein, und den alten und neuen Zins auf der senkrechten.`,
      `Die Antwort lautet also: Der Realzins steigt, die Investitionen sinken. Der zusätzliche Konsum verdrängt Investitionen in gleicher Höhe. Das Einkommen selbst ändert sich nicht, nur seine Verwendung.`
    ),
  },
  {
    id: 'u210a', sec: 2, label: 'Übung 2-10 · Das Modell zeichnen',
    text: p(
      `Übung zwei zehn: die kleine offene Volkswirtschaft. Zwei Annahmen sind vorgegeben: Die Ersparnis hängt nicht vom Zins ab, und die Nettoexporte sind am Anfang positiv.`,
      `Das Diagramm startet wie eben: nach oben der Realzins, nach rechts Ersparnis und Investitionen. Die Ersparnis ist wieder eine senkrechte Linie, die Investitionskurve fällt.`,
      `Neu ist der Zins. Ein kleines Land hat keinen Einfluss auf den Weltmarkt, und Kapital kann frei über die Grenzen fließen. Deshalb gilt im Inland der Weltzins. Du zeichnest ihn als waagerechte Linie.`,
      `Und jetzt kommt der entscheidende Punkt: Ersparnis und Investitionen müssen nicht mehr gleich sein. Die Differenz sind die Nettoexporte: Ersparnis minus Investitionen. In der Zeichnung ist das der waagerechte Abstand zwischen der Investitionskurve und der Ersparnislinie, gemessen auf Höhe des Weltzinses.`,
      `Damit die Nettoexporte positiv sind, muss der Weltzins über dem Schnittpunkt der beiden Kurven liegen. Dann wird im Inland weniger investiert als gespart, und der Überschuss fließt ins Ausland.`
    ),
  },
  {
    id: 'u210b', sec: 2, label: 'Übung 2-10 a · Fiskalpolitik im Inland',
    text: p(
      `Teil a: Das Inland senkt die Staatsausgaben oder erhöht die Steuern. In beiden Fällen steigt die Ersparnis.`,
      `Bei niedrigeren Staatsausgaben steigt das öffentliche Sparen direkt. Bei höheren Steuern steigt das öffentliche Sparen ebenfalls. Zwar sparen die Haushalte dann weniger, aber sie senken auch ihren Konsum. Unter dem Strich steigt die gesamte Ersparnis.`,
      `In der Zeichnung verschiebst du die Ersparnislinie nach rechts, von S eins nach S zwei. Der Weltzins bleibt, wo er ist, denn das kleine Land kann ihn nicht beeinflussen. Damit bleiben auch die Investitionen unverändert.`,
      `Der waagerechte Abstand wird größer. Die Nettoexporte steigen. Zeichne beide Abstände ein, den alten und den neuen.`,
      `Das Ergebnis für Teil a: Ersparnis rauf, Investitionen unverändert, Nettoexporte rauf, Zins unverändert.`
    ),
  },
  {
    id: 'u210c', sec: 2, label: 'Übung 2-10 b · Fiskalpolitik im Rest der Welt',
    text: p(
      `Teil b: Jetzt senkt der Rest der Welt die Staatsausgaben oder erhöht die Steuern. Im Inland ändert sich an der Politik nichts.`,
      `Das Weltsparen steigt. Auf dem Weltkapitalmarkt gibt es mehr Angebot, und deshalb sinkt der Weltzins. In der Zeichnung verschiebst du die waagerechte Linie nach unten, von r eins Stern auf r zwei Stern.`,
      `Die Ersparnislinie bleibt stehen, denn im Inland wurde nichts geändert. Aber auf der Investitionskurve wanderst du nach rechts unten: Beim niedrigeren Zins wird mehr investiert.`,
      `Der Abstand zwischen Investitionen und Ersparnis schrumpft. Die Nettoexporte sinken. Fällt der Weltzins unter den Schnittpunkt der beiden Kurven, werden sie sogar negativ. Genau so zeichnet es das Skript.`,
      `Das Ergebnis für Teil b: Ersparnis unverändert, Investitionen rauf, Nettoexporte runter, Zins runter.`
    ),
  },
  {
    id: 'outro', sec: 0, label: 'Zusammenfassung',
    text: p(
      `Zum Schluss der Vergleich. In der geschlossenen Volkswirtschaft passt sich der Zins an, bis Ersparnis und Investitionen gleich sind. In der kleinen offenen Volkswirtschaft ist der Zins vorgegeben, und die Nettoexporte gleichen den Unterschied aus.`,
      `Frag dich bei jeder Aufgabe zuerst: Welche Linie verschiebt sich? Inländische Politik bewegt die Ersparnislinie. Politik im Ausland bewegt den Weltzins. Viel Erfolg!`
    ),
  },
];
