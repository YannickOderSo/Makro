// Video „Teil I – alle Theoriefragen beantwortet und erklärt“. Eine Szene = eine TTS-Anfrage.
// Formeln sind ausgeschrieben, damit die Stimme sie sauber spricht.
export { VOICE } from '../../voice.mjs';
import { p } from '../../voice.mjs';

export const META = {
  title: 'Makroökonomie Teil I – alle Theoriefragen beantwortet und erklärt',
  brand: 'MAKRO · TEIL I · THEORIE',
  out: 'Makro_Teil1_Theoriefragen.mp4',
  sections: ['1-1', '1-3', '1-4', '1-7', '2-6', '2-7', '2-9', '2-13'],
};

export const SCENES = [
  {
    id: 'intro', sec: 0, label: 'Überblick',
    text: p(
      `In den Übungen zu Teil eins gibt es acht Fragen, bei denen du nichts rechnen musst, sondern etwas erklären sollst.`,
      `In diesem Video beantworten wir sie alle. Erst kommt die Antwort, so wie du sie in der Klausur hinschreiben kannst. Dann folgt die Erklärung dahinter.`
    ),
  },
  {
    id: 'u11', sec: 1, label: 'Übung 1-1 · Modelle und Variablen',
    text: p(
      `Übung eins eins: Was sind ökonomische Modelle, und welche Variablen werden in ihnen verwendet?`,
      `Die Antwort: Modelle sind vereinfachte Theorien. Sie zeigen die wesentlichen Beziehungen zwischen ökonomischen Variablen. Dabei gibt es zwei Arten von Variablen. Exogene Variablen werden außerhalb des Modells bestimmt, sie sind die Vorgabe. Endogene Variablen werden durch das Modell erklärt, sie sind das Ergebnis. Das Modell zeigt also, wie sich Änderungen der exogenen Variablen auf die endogenen auswirken.`,
      `Das Beispiel aus dem Skript ist der Markt für Brot. Exogen sind das Einkommen der Haushalte und der Mehlpreis. Endogen sind der Brotpreis und die gehandelte Menge. Steigt das Einkommen, verschiebt sich die Nachfragekurve nach rechts: Preis und Menge steigen. Steigt dagegen der Mehlpreis, verschiebt sich die Angebotskurve nach links: Der Preis steigt, die Menge sinkt.`,
      `Und warum vereinfachen? Ein Modell, das alles erklären wollte, wäre so kompliziert, dass es nichts mehr erklärt. Deshalb gibt es für verschiedene Fragen verschiedene Modelle.`
    ),
  },
  {
    id: 'u13', sec: 2, label: 'Übung 1-3 · Das Bruttoinlandsprodukt',
    text: p(
      `Übung eins drei: Was ist das Bruttoinlandsprodukt?`,
      `Die Antwort: Das BIP ist der Wert aller Endprodukte einer Volkswirtschaft, die in einem bestimmten, abgeschlossenen Zeitraum erzeugt werden.`,
      `Jedes Stück dieses Satzes hat eine Bedeutung. Wert heißt: Die Güter werden mit ihren Marktpreisen bewertet, damit man sie addieren kann. Endprodukte heißt: Zwischenprodukte zählen nicht extra, sonst würde man sie doppelt zählen. Und Zeitraum heißt: Es zählt nur, was in diesem Jahr neu produziert wurde.`,
      `Daraus folgen ein paar Sonderfälle. Der Verkauf gebrauchter Güter gehört nicht zum BIP, denn dabei wechselt nur Vermögen den Besitzer. Was auf Lager produziert wird, zählt dagegen mit, als Lagerinvestition. Für selbst genutzten Wohnraum wird eine fiktive Miete angesetzt. Und Leistungen des Staates ohne Marktpreis, wie Polizei oder Feuerwehr, gehen mit ihren Kosten ein. Nicht erfasst werden unbezahlte Arbeit im Haushalt und die Schattenwirtschaft.`,
      `Außerdem kannst du das BIP von drei Seiten betrachten: Entstehung, also die Wertschöpfung. Verwendung, also die Ausgaben. Und Verteilung, also die Einkommen. Alle drei ergeben dieselbe Zahl.`
    ),
  },
  {
    id: 'u14', sec: 3, label: 'Übung 1-4 · Nachfragekomponenten',
    text: p(
      `Übung eins vier: Was sind die Nachfragekomponenten des BIP?`,
      `Die Antwort ist eine Gleichung: Das BIP ist Konsum plus Investitionen plus Staatsausgaben plus Nettoexporte.`,
      `Der Konsum sind die Ausgaben der privaten Haushalte. Investitionen sind Ausgaben für neues Kapital: Maschinen und Gebäude, aber auch der Wohnungsbau und die Lagerbestände. Wichtig: Gemeint ist nur neu geschaffenes Kapital. Wer eine alte Villa kauft oder Aktien an der Börse, investiert im Sinne der Makroökonomie nicht.`,
      `Staatsausgaben sind die Käufe des Staates von Gütern und Dienstleistungen. Und die Nettoexporte sind Exporte minus Importe. Die Importe werden abgezogen, weil sie in Konsum, Investitionen und Staatsausgaben schon enthalten sind, aber nicht im Inland produziert wurden.`
    ),
  },
  {
    id: 'u17', sec: 4, label: 'Übung 1-7 · Zeithorizonte',
    text: p(
      `Übung eins sieben: Was sind die wichtigsten Zeithorizonte in der Makroökonomie?`,
      `Die Antwort: die kurze Frist, und die mittlere bis lange Frist. Der Unterschied liegt bei den Preisen.`,
      `In der kurzen Frist sind die Preise starr. Märkte werden deshalb eventuell nicht geräumt. Hier geht es um die Konjunktur, also um Schwankungen der Auslastung. Die passende Theorie stammt von Keynes.`,
      `In der mittleren bis langen Frist sind die Preise flexibel, und die Märkte werden geräumt. Hier geht es um Wachstum. Die passende Theorie ist die Klassik und Neoklassik.`,
      `Merk dir die beiden Ketten. Starre Preise, Konjunktur, Keynes. Flexible Preise, Wachstum, Klassik.`
    ),
  },
  {
    id: 'u26', sec: 5, label: 'Übung 2-6 · Preis, Preisniveau, Inflation',
    text: p(
      `Übung zwei sechs: Was ist ein Preis, was ist das Preisniveau, und was ist Inflation? Das sind drei Definitionen, die aufeinander aufbauen.`,
      `Ein Preis ist die Menge an Geld, die man braucht, um eine Ware oder Dienstleistung zu kaufen. Das Preisniveau ist die Menge an Geld, die man braucht, um einen ganzen Warenkorb zu kaufen. Und Inflation ist die prozentuale Veränderung des durchschnittlichen Preisniveaus.`,
      `Ein Beispiel: Ein Brot kostet zwei Euro, das ist ein Preis. Der ganze Warenkorb kostet hundert Euro, das ist das Preisniveau. Kostet derselbe Korb ein Jahr später hundertdrei Euro, dann beträgt die Inflation drei Prozent.`,
      `Achtung: Wenn nur ein einzelner Preis steigt, ist das noch keine Inflation. Entscheidend ist der Durchschnitt aller Preise.`
    ),
  },
  {
    id: 'u27', sec: 6, label: 'Übung 2-7 · Funktionen des Geldes',
    text: p(
      `Übung zwei sieben: Was sind die Funktionen des Geldes? Es sind drei.`,
      `Erstens: Geld ist Tauschmittel. Ohne Geld müsste ein Bäcker, der Schuhe braucht, einen Schuster finden, der gerade Brot will. Das nennt man doppelte Koinzidenz der Bedürfnisse. Mit Geld ist das nicht nötig. Außerdem ist Geld gesetzliches Zahlungsmittel.`,
      `Zweitens: Geld ist Recheneinheit. Alle Preise und Schulden werden in derselben Einheit angegeben und sind damit vergleichbar.`,
      `Drittens: Geld ist Wertaufbewahrungsmittel. Man kann Kaufkraft von heute in die Zukunft übertragen. Aber Vorsicht: Sicher ist nur der Nominalwert. Bei Inflation sinkt der reale Wert.`,
      `Dazu passen die zwei Geldformen aus dem Skript: Nominalgeld hat keinen inneren Wert. Warengeld wie Gold hat einen.`
    ),
  },
  {
    id: 'u29', sec: 7, label: 'Übung 2-9 · Dichotomie und Neutralität',
    text: p(
      `Übung zwei neun hat drei Teile.`,
      `Teil a: Was ist die klassische Dichotomie? Sie ist die theoretische Unterscheidung zwischen realen und nominalen Variablen. Nominale Größen haben keinen Einfluss auf reale Größen. Reale Größen werden nur durch reale Größen bestimmt.`,
      `Teil b: Was ist die Neutralität des Geldes? Veränderungen der nominalen Geldmenge haben keinen Einfluss auf reale Größen. Langfristig ist Geld für die Realwirtschaft neutral. Ein Beispiel: Verdoppelt die Zentralbank die Geldmenge, dann verdoppeln sich langfristig die Preise. Produktion, Beschäftigung und Realzins bleiben, wie sie waren.`,
      `Teil c: Wie werden nominale und reale Variablen gemessen? Nominale Variablen werden in Geldeinheiten gemessen, zum Beispiel der Nominallohn, der Nominalzins oder das Preisniveau. Reale Variablen werden in Mengen- oder Gütereinheiten gemessen, zum Beispiel der Reallohn, der Realzins oder der reale Output.`
    ),
  },
  {
    id: 'u213', sec: 8, label: 'Übung 2-13 · Produktivität und Arbeitsmarkt',
    text: p(
      `Übung zwei dreizehn: Die Produktivität eines Landes sinkt plötzlich. Dazu gibt es drei Fragen.`,
      `Zuerst das Diagramm: nach oben der Reallohn, nach rechts die Arbeit. Das Arbeitsangebot ist im Skript eine senkrechte Linie. Die Arbeitsnachfrage fällt, denn sie entspricht dem Grenzprodukt der Arbeit: Unternehmen stellen so lange ein, bis das Grenzprodukt so groß ist wie der Reallohn.`,
      `Frage eins: Was passiert mit der Arbeitsnachfragekurve? Sinkt die Produktivität, dann sinkt das Grenzprodukt der Arbeit. Jede Arbeitskraft bringt weniger ein. Die Arbeitsnachfragekurve verschiebt sich deshalb nach unten, also nach links.`,
      `Frage zwei: Was passiert, wenn der Arbeitsmarkt immer im Gleichgewicht ist? Dann sinkt der Reallohn, bis Angebot und Nachfrage wieder übereinstimmen. Die Beschäftigung bleibt gleich, und es entsteht keine Arbeitslosigkeit.`,
      `Frage drei: Was passiert, wenn Gewerkschaften verhindern, dass der Reallohn sinkt? Dann bleibt der Reallohn auf dem alten Niveau, und das liegt jetzt über dem neuen Gleichgewicht. Zu diesem Lohn fragen die Unternehmen weniger Arbeit nach, als angeboten wird. Die Lücke dazwischen ist Arbeitslosigkeit.`,
      `Das ist die klassische Erklärung: Arbeitslosigkeit entsteht durch einen zu hohen Reallohn.`
    ),
  },
  {
    id: 'outro', sec: 0, label: 'Zusammenfassung',
    text: p(
      `Das waren alle acht Theoriefragen aus Teil eins. Der Tipp für die Klausur: Lern für jede Frage zuerst den einen Satz aus dem Skript, und merk dir dazu ein Beispiel.`,
      `Die Übungen zwei zwei und zwei zehn, bei denen du zeichnen musst, haben ein eigenes Video. Viel Erfolg!`
    ),
  },
];
