# PocketOps · Gestaltung

Fünfundzwanzig HTML-Dateien, jede für sich lauffähig. Doppelklick genügt, es braucht
keinen Server und keine Installation. Verschickt man eine einzelne Datei, bringt
sie ihr Aussehen mit.

## Wie der Ordner aufgebaut ist

```
PocketOps/
  Start_PocketOps.html   die Übersicht, hier fängt der Nutzer an
  README.md, LICENSE     für die Weitergabe
  tools/                 die 25 Werkzeuge
  _design/               dieser Ordner: Urfassungen, nichts zum Anklicken
```

Oben liegt nur die Übersicht. Wer den Ordner auspackt, soll ohne Nachdenken
sehen, was anzuklicken ist — darum stehen die Werkzeuge eine Ebene tiefer.

Daraus folgen zwei Dinge, die man beim Bauen beachten muss: der Rückverweis in
einem Werkzeug geht auf `../Start_PocketOps.html`, und `Start_PocketOps.html`
führt seine Werkzeuge als `tools/<Datei>.html`.

## Warum hier trotzdem Dateien liegen

Wenn jede Datei ihre Gestaltung selbst trägt, laufen die Fassungen mit der Zeit
auseinander. Darum stehen die gemeinsamen Teile hier einmal als Urfassung:

| Datei | Inhalt |
| --- | --- |
| `po-tokens.css` | Farben, Maße, Schatten, Bausteinklassen (`.po-btn`, `.po-panel`, `.po-table` …) |
| `po-base.js` | `poToast`, `poConfirm`, `poAsk`, `poEsc`, `poDownload`, `poReadFile`, dazu Sprache und Anleitung |
| `sprache/<Datei>.js` | je Werkzeug: Kurzanleitung in beiden Sprachen und das Wörterbuch |
| `po-icon.svg` | das Produktzeichen, das als Favicon im Kopf jedes Werkzeugs steht |
| `sync.mjs` | schreibt alles in die Werkzeuge |

Die Werkzeuge **laden diese Dateien nicht**. Sie tragen den Inhalt eingebettet
zwischen Marken:

```
/* PO-TOKENS:ANFANG … */   …   /* PO-TOKENS:ENDE */
/* PO-SPRACHE:ANFANG … */  …   /* PO-SPRACHE:ENDE */
/* PO-BASE:ANFANG … */     …   /* PO-BASE:ENDE */
<!-- PO-ICON:ANFANG … -->  …   <!-- PO-ICON:ENDE -->
```

Der Block `PO-ICON` steht im `<head>` und ist deshalb ein HTML-Kommentar, die
anderen stehen in `<style>` beziehungsweise `<script>`.

Die Blöcke `PO-TOKENS`, `PO-BASE` und `PO-ICON` sind überall gleich. Der Block `PO-SPRACHE` ist der
einzige, der sich von Datei zu Datei unterscheidet: er kommt aus
`sprache/<Datei>.js` und muss **vor** `PO-BASE` stehen.

## Etwas an der Gestaltung ändern

1. `po-tokens.css`, `po-base.js` oder `po-icon.svg` bearbeiten.
2. Im Ordner `PocketOps` aufrufen:

```
node _design/sync.mjs
```

Das Skript ersetzt den Inhalt zwischen den Marken in jeder HTML-Datei. Alles
außerhalb der Marken bleibt unberührt — der werkzeugeigene Teil also auch.

**Nicht von Hand zwischen den Marken schreiben.** Der nächste Lauf überschreibt
es. Werkzeugeigenes CSS gehört unter den Abschnitt „nur für dieses Werkzeug".

## Zwei Sprachen, ein Quelltext

Die Werkzeuge sind auf Deutsch geschrieben — Beschriftungen, Hinweise,
Meldungen, alles. Englisch entsteht **nicht** aus einem zweiten Satz
Quelltext, sondern aus einem Wörterbuch: deutscher Satz → englischer Satz.
Ein Beobachter (`MutationObserver`) schreibt um, was auf der Seite steht, und
merkt sich am Knoten das Original. Darum geht beim Zurückschalten nichts
verloren, und am deutschen Quelltext ändert sich nie etwas.

Der Vorteil: Ein neues Werkzeug braucht **keinen** Umbau für die zweite
Sprache. Es bekommt eine Datei in `_design/sprache/` — mehr nicht. Auch
später hinzugekommene Meldungen, Tabellenzeilen und Dialoge werden erfasst,
weil der Beobachter sie beim Entstehen sieht.

```js
const PO_WB = {
    'Neues Ticket': 'New ticket',
    '{} von {} Fehlern': '{} of {} mistakes'   // {} bleibt stehen
};
```

Vier Dinge, die man dabei wissen muss:

1. *Ein Satz mit `<b>` darin zerfällt in Stücke.* Jedes Stück ist ein eigener
   Textknoten und braucht einen eigenen Eintrag. Die englischen Stücke müssen
   in derselben Reihenfolge einen sinnvollen Satz ergeben.
2. *Was der Nutzer geschrieben hat, wird nie angefasst.* Eingabefelder,
   Textflächen, alles unter `contenteditable` und alles unter `data-po-roh`
   bleibt stehen. Dasselbe gilt für die Beispieldaten beim ersten Start —
   die übersetzt niemand, sie werden ohnehin überschrieben.
3. *Was auf eine Leinwand gezeichnet wird, sieht der Beobachter nicht.* Dort
   muss der Text durch `poT('…')`, und das Werkzeug braucht ein
   `poNeuZeichnen`, damit es nach dem Umschalten neu zeichnet. Im Diagramm
   ist beides zu sehen.
4. *Für lange Prosa ist das Wörterbuch das falsche Mittel.* Eine ganze Seite
   Erklärung steht zweimal da, je Sprache ein Block mit `data-po-nur="de"`
   bzw. `"en"`. So macht es `Sicherung.html`.

**Was noch fehlt, sagt das Werkzeug selbst.** In der Entwicklerkonsole liefert
`poLuecken()` jeden Satz, den das Wörterbuch nicht kannte. Nach einer Änderung
am Werkzeug also: auf Englisch schalten, alles einmal anklicken, `poLuecken()`
abrufen und die Ausbeute ins Wörterbuch nachtragen.

Die Wahl steht in `localStorage` unter `po_sprache` und gilt für alle
Werkzeuge gemeinsam. Umgeschaltet wird oben rechts; dort setzt `po-base.js`
den Umschalter und das Fragezeichen von selbst in die Kopfzeile — kein
Werkzeug muss dafür etwas tun.

## Das Fragezeichen

Jede Seite hat oben rechts ein `?`. Dahinter steht eine kurze Anleitung zum
Werkzeug: ein Satz, was es tut, drei bis vier Schritte, ein paar Hinweise.
Sie kommt aus `PO_HILFE` in `_design/sprache/<Datei>.js` und steht dort in
beiden Sprachen nebeneinander — kurze Anleitungen übersetzt man besser ganz,
als sie aus Satzstücken zusammenzusetzen.

Darunter hängt in **jedem** Werkzeug derselbe Abschnitt über das Sichern,
samt Verweis auf `Sicherung.html`. Der steht einmal in `po-base.js` und
braucht je Werkzeug nichts.

`F1` öffnet die Anleitung ebenfalls.

## Sicherung.html

Eine Seite nur zum Lesen, für die Leute, die vor einer `.json`-Datei
zurückschrecken: was so eine Datei ist (eine Textdatei, mehr nicht), warum
sie wichtig ist (der Browser ist kein Safe), wie man den Ordner anlegt — je
Werkzeug ein Unterordner, Datum rückwärts voran, die letzten drei behalten —
und wie das Zurückholen geht. Dazu die häufigen Sorgen und was wirklich
passiert.

Sie steht in der Übersicht in der eigenen Gruppe „Zum Nachlesen" und wird aus
jedem Hilfefenster heraus verlinkt.

## Der Kopf jedes Werkzeugs

Überall gleich aufgebaut: Markenzeichen, „POCKETOPS", Name des Werkzeugs, ein
Chip mit einem Satz dazu, rechts die Aktionen. Das Markenzeichen führt zurück
auf `Start_PocketOps.html` eine Ebene darüber.

Reihenfolge der Aktionen rechts, von links nach rechts: erst das Beiläufige
(Sichern, Öffnen), dann ein Trenner, dann das Gefährliche (Zurücksetzen) und
zuletzt die Hauptsache des Werkzeugs (Exportieren, Neues Ticket …).

## Das Produktzeichen

`po-icon.svg` ist das Zeichen, das der Browser im Tab und im Lesezeichen
anzeigt. `sync.mjs` macht daraus eine `data:`-Adresse und schreibt sie als
`<link rel="icon">` in den Kopf jeder Datei — keine zweite Datei, sonst wäre
ein Werkzeug nicht mehr für sich allein lauffähig.

Es zeigt denselben Koffer wie `.po-mark` in der Kopfzeile, aber anders
gezeichnet: gefüllt statt umrandet, der Griff breit und flach. Bei 16 Pixeln,
und das ist die Größe im Lesezeichen, verschwindet ein dünner Strich, und ein
schmaler hoher Griff sieht aus wie ein Vorhängeschloss.

Zum Ansehen reicht es, `_design/po-icon.svg` im Browser zu öffnen. Wer etwas
ändert, sollte es bei 16 Pixeln prüfen, nicht bei 128 — klein entscheidet sich,
ob man es erkennt.

Zweierlei dazu. Welches Symbol im Lesezeichen steht, merkt sich der Browser
beim Besuch der Seite: was schon vorher abgelegt wurde, zeigt das alte, leere
Symbol so lange, bis die Seite einmal neu aufgerufen wird. Und geprüft ist,
dass Edge die `data:`-Adresse sauber zeichnet, von 16 bis 128 Pixeln — wie
andere Browser Favicons bei `file:`-Adressen behandeln, ist nicht geprüft.

## Woher der Hinweis auf fremde Server kommt

Die Anleitung schliesst mit einem Satz dazu, was den Rechner verlässt. Er wird
nicht fest hingeschrieben, sondern aus der Seite gelesen: `_poFremdquellen()`
sammelt die Rechnernamen aller `<script src>` und `<link rel=stylesheet>`, die
auf `http` zeigen. Sind welche dabei, nennt der Hinweis sie; sind keine da,
sagt er schlicht, dass nichts geschickt wird.

So bleibt die Aussage richtig, auch wenn später eine Bibliothek dazukommt oder
eingebettet wird. Von Hand gepflegt wäre sie binnen eines Jahres falsch — und
eine falsche Datenschutzaussage ist nichts, womit man leben will.

## Was es nicht mehr gibt

Keine `alert()`, `confirm()` oder `prompt()` der Browser. Stattdessen
`poToast` für Hinweise, `poConfirm` für Rückfragen, `poAsk` für kleine
Eingaben. Jedes Löschen fragt vorher nach und benennt, was verloren geht.

## Zwei Grenzen des Browsers, die man kennen sollte

**Ton kommt nicht in die Zwischenablage.** Browser erlauben dort nur Text,
HTML und PNG. Eine Aufnahme lässt sich also nicht kopieren und anderswo
einfügen. Das Sprachmemo bietet deshalb einen *Verweis* als Textzeile und
das Herunterladen als Datei an.

**Spracherkennung läuft nur am Mikrofon, nicht auf einer Datei.** Chromes
Erkennung hört live mit; eine fertige Aufnahme lässt sich ihr nicht
vorlegen. Das Mitschreiben muss darum während der Aufnahme laufen — und es
schickt den Ton an einen Dienst von Google. Deshalb ist es abschaltbar und
im Werkzeug deutlich gekennzeichnet. Ohne diesen Haken bleibt alles örtlich.

**Word-Dateien entstehen örtlich, aber nicht ohne Bibliothek.** Das Werkzeug
„Dokument" erzeugt eine echte `.docx` über die Bibliothek `docx`, die beim
Start von einem CDN geladen wird — wie SlideCraft seine PPTX-Bibliothek. Ohne
Netz beim *ersten* Start fehlt sie, und der Export meldet das. Wer die Reihe
in ein Netz ohne Außenverbindung gibt, legt die Bibliotheken daneben und
ändert die Verweise auf die örtlichen Dateien.

Ausdrücklich **kein** als Word getarntes HTML: dieser verbreitete Trick
erzeugt Dateien, die Word mit Warnung öffnet und beim Weiterbearbeiten
zerfallen. Die erzeugte Datei ist ein richtiges OOXML-Paket und wurde
Bestandteil für Bestandteil geprüft.

**Die A4-Ansicht zeigt ein durchlaufendes Blatt, keinen Seitenstapel.** Das
Papier ist 210 mm breit mit denselben Rändern, Schriftgraden und
Zeilenabständen wie die Word-Datei; Linien alle 257 mm Satzspiegel zeigen,
wo eine Seite voll ist. Echte Seitentrennung mit wiederholten Rändern ließe
sich mit `contenteditable` nicht erreichen — dafür bräuchte es einen eigenen
Textsatz. Die Linien liegen nah an Words Umbrüchen, aber nicht haargenau:
Word trennt und bricht Zeilen nach eigenen Regeln.

**Das Werkzeug „Dokument" kann bewusst wenig.** Ein leeres A4-Blatt,
Schriftart, Schriftgröße, fett, kursiv — mehr nicht. Eine frühere Fassung
hatte Überschriften als Struktur, Inhaltsverzeichnis, Nummerierung, Listen,
Tabellen, Bilder und Seitenumbrüche; das war im Gebrauch zu fehleranfällig
und wurde herausgenommen. Wer etwas ergänzen will, soll vorher prüfen, ob
es die Bedienung wirklich wert ist.

Eingefügter Text wird dabei auf Absätze, fett und kursiv zurückgeführt.
Alles andere — Farben, Abstände, Rahmen, fremde Schriften, Bilder — bleibt
draußen. Genau das hält das Blatt sauber.

**Kalender lassen sich nicht anbinden, nur einlesen.** Der Tagesplan nimmt
Termine über eine `.ics`-Datei entgegen, die der Nutzer in Outlook selbst
speichert und herüberzieht. Das ist Absicht: eine echte Anbindung wäre genau
die IT-Integration, die das Verkaufsargument der Reihe ausschließt. Von den
Wiederholungsregeln versteht der Leser `FREQ=DAILY` und `FREQ=WEEKLY` samt
`INTERVAL`, `BYDAY`, `COUNT` und `UNTIL`; seltenere Muster werden
weggelassen statt falsch geraten. Zeitzonen jenseits von Weltzeit werden als
hiesige gelesen.

**Whiteboard und Mindmap sind nicht dasselbe.** Die Mindmap ordnet: Knoten
und Verbindungen, die Lage rechnet sie selbst aus. Das Whiteboard macht das
Gegenteil — die Lage ist der Inhalt, Verbindungen sind nur ein Pfeil unter
anderen, und man kann von Hand zeichnen, was die Mindmap nicht kann und
nicht können soll. Wer eine Gliederung braucht, nimmt die Mindmap; wer etwas
hinwerfen will, das Whiteboard.

**Das Whiteboard malt alles selbst auf eine Leinwand.** Nichts liegt als
HTML oder SVG darüber. Darum ist das ausgegebene PNG Punkt für Punkt
dasselbe, was auf dem Schirm steht — dieselbe Hand zeichnet beides, nur mit
anderem Maßstab und Ausschnitt. Auch der Zeilenumbruch in Haftzetteln und
Texten wird von Hand gerechnet, damit er sich bei Zoom und Ausgabe nicht
verschiebt.

Was es bewusst **nicht** kann: Bilder einfügen, Vorlagen, Ebenen, und
Verbinder, die an einer Form kleben bleiben. Freihandstriche lassen sich
verschieben, aber nicht in der Größe ziehen — das verzöge die Handschrift.
Und, wie überall in dieser Reihe: niemand arbeitet gleichzeitig mit. Genau
darin liegt der Wert von Miro und Mural, und genau das bräuchte einen
Server. Das Whiteboard ist ein Zeichenbrett für einen, dessen Ergebnis als
Bild in SlideCraft oder ins Dokument wandert.

**Das Diagramm malt wie das Whiteboard selbst auf eine Leinwand.** Dieselbe
Funktion zeichnet den Schirm und das PNG, nur mit anderem Maßstab — darum
steht im Bild dasselbe, was man vorher gesehen hat. Das Kopieren legt es als
PNG in die Zwischenablage; lehnt der Browser das ab, wird die Datei
heruntergeladen, statt den Nutzer ohne Ergebnis stehen zu lassen.

Drei Festlegungen, die bewusst eng sind:

1. *Höchstens acht Reihen.* Die acht Farben wurden gegen das Prüfskript der
   Visualisierungs-Richtlinie gerechnet: Helligkeit, Buntheit, Abstand bei
   Rot-Grün-Schwäche und Kontrast zum weißen Grund. Eine neunte Farbe wäre
   geraten, nicht geprüft. Wer mehr braucht, macht zwei Diagramme.
2. *Torte und Ring fassen ab dem achten Stück zusammen.* Der Rest wird zu
   „Übrige", weil zwei gleiche Farben in einem Kreis schlimmer sind als ein
   Sammelstück.
3. *Balken beginnen immer bei Null, Linien nicht.* Eine abgeschnittene
   Balkenachse lügt über die Länge; bei einer Linie wäre der erzwungene
   Nullpunkt dagegen oft eine flache, nichtssagende Kurve.

Die Kopfzeile beim Einfügen aus Excel lässt sich **nicht** sicher erraten:
„Quartal · 2025 · 2026" sind Namen, „Q1 · 120 · 132" sind Daten, und beides
beginnt links mit Text. Das Werkzeug rät (Text rechts, oder lauter
Jahreszahlen über Werten anderer Größenordnung) und zeigt das Geratene als
Haken, den man umstellen kann. Danach nennt der Hinweis die erkannten
Reihennamen — so fällt ein Fehlgriff sofort auf.

**Der Bildschirm lässt sich abgreifen — aber nur nach ausdrücklicher Frage.**
Gemessen am 3. Oktober 2026 auf `file://`: `getDisplayMedia` steht zur
Verfügung, ein Einzelbild lässt sich festhalten, zuschneiden und als PNG
**in die Zwischenablage** legen. Das ist der Unterschied zum Ton, der dort
nicht hineindarf.

Zwei Grenzen, die keine Seite umgehen kann und die „Bildausschnitt" darum
offen behandelt statt sie zu verstecken:

1. *Chrome fragt beim Greifen, was geteilt werden soll.* Entschärft wird das
   dadurch, dass der Strom offen bleibt: einmal wählen, danach beliebig oft
   abgreifen. Solange er läuft, zeigt Chrome einen eigenen Hinweis.
2. *Es gibt kein Tastenkürzel, das von außerhalb des Browsers wirkt.* Wer
   das Fenster nach vorn holt, legt es über das Gesuchte. Dagegen hilft die
   eingebaute Verzögerung — oder ein einzelnes Fenster als Quelle statt des
   ganzen Bildschirms.

Nicht geprüft, weil dafür ein Browser mit Oberfläche und der echte
Bildschirm nötig gewesen wären: der Auswahldialog selbst, und ob die
Aufnahme eines verdeckten Fensters unter Windows weiterläuft.

**Eine Falle, die beim Bau zugeschnappt ist.** Trägt ein Element im Gerüst
das Merkmal `hidden`, seine Klasse setzt aber `display: flex` oder `block`,
dann gewinnt die Gestaltung — das Element bleibt sichtbar, obwohl der
Quelltext es für verborgen hält. Eine Probe, die `element.hidden` abfragt,
merkt davon nichts. Darum prüfen die Proben seither `getComputedStyle(…)
.display`. `scratchpad/pruef_hidden.mjs` sucht diese Stelle über alle
Dateien; beim letzten Lauf war keine mehr übrig.

## Die drei Spiele

Sie sind da, damit zwischen zwei Besprechungen etwas anderes auf dem Schirm
stehen kann als Arbeit. Darum tragen sie dieselbe Kopfzeile, dieselben
Schaltflächen und dieselben Rückfragen wie der Rest — und können bewusst
wenig: keine zwei Spieler an einem Gerät, keine Bestenliste, kein Zurücknehmen
eines Zuges. Gezählt werden nur Siege, Remis und Pleiten, je Spiel in
`localStorage` (`po_dreigewinnt`, `po_viergewinnt`, `po_galgen`).

**Der Gegner rechnet, er würfelt nicht.** Drei gewinnt kennt auf der
höchsten Stufe den ganzen Spielbaum — gegen perfektes Spiel ist dort kein
Sieg möglich, nur das Remis. Das ist kein Mangel, sondern die Natur des
Spiels; dafür gibt es die beiden schwächeren Stufen. Vier gewinnt passt
nicht mehr in den Baum und sucht darum nur drei bis fünf Züge weit mit
Alpha-Beta und bewertet die Stellung danach über die Vierer-Fenster. Bei
gleichwertigen Zügen wird gelost, sonst liefe jede Partie gleich ab.

**Galgenmännchen bringt seine Wörter mit.** Einundachtzig Stück in neun
Sachgruppen, in der Datei — ohne Netz, ohne Wörterbuchdienst. Kein Wort
enthält ein ß; so bleibt die Tastatur bei neunundzwanzig Zeichen und kein
Knopf greift ins Leere. Die Sachgruppe steht offen über dem Wort, sonst
rät man Buchstabensuppe. Zuletzt gespielte Wörter werden gemieden, damit
nicht dreimal hintereinander dasselbe kommt.

## Die Übersicht

`Start_PocketOps.html` ordnet die Werkzeuge **nach Mächtigkeit**: oben die ausgebauten,
in denen man länger sitzt, darunter das Tägliche und die Methoden für den
Anlass, zuletzt die Pause. Neun, sechs, fünf und drei Werkzeuge, dazu eine
Seite zum Nachlesen.

| Gruppe | Gedanke | Werkzeuge |
| --- | --- | --- |
| **Große Werkzeuge** | ausgebaut, für längeres Arbeiten | Tagesplan, SlideCraft, Dokument, Mindmap, Diagramm, Whiteboard, PDF-Werkzeuge, Kanban, Kanban mit Bahnen |
| **Am Schreibtisch** | allein, im täglichen Lauf | Notizbuch, Sprachmemo, Bildausschnitt, Markdown-Editor, Rechner, Timer |
| **Mit anderen** | Besprechung, Werkstatt, Abstimmung | RACI-Matrix, Entscheidungsmatrix, Priorisierungsmatrix, Stakeholder-Karte, Team-Radar |
| **In der Pause** | fünf Minuten gegen den Rechner | Drei gewinnt, Vier gewinnt, Galgenmännchen |
| **Zum Nachlesen** | wie die Reihe gesichert wird | Sichern &amp; Zurückholen |

Dazu: Anheften je Werkzeug (wandert in eine eigene Reihe ganz oben),
Gruppen zum Ein- und Ausklappen, und eine Suche, die Werkzeugnamen,
Beschreibungen und die eigenen Verweise gemeinsam erfasst. Enter öffnet den
ersten Treffer. Angeheftetes und Zugeklapptes stehen in `localStorage`
unter `po_hub_ansicht`.

## Ein neues Werkzeug aufnehmen

1. HTML-Datei in den Ordner `tools` legen, mit allen vier Markenpaaren
   (`PO-ICON` im `<head>` hinter dem `<title>`, `PO-TOKENS` im `<style>`,
   `PO-SPRACHE` in einem eigenen `<script>` davor, `PO-BASE` am Anfang des
   Hauptskripts). `sync.mjs` sagt beim Lauf, wenn `PO-ICON` fehlt.
2. `_design/sprache/<Datei>.js` anlegen: `PO_HILFE` mit der Kurzanleitung in
   beiden Sprachen, `PO_WB` mit dem Wörterbuch.
3. `node _design/sync.mjs` laufen lassen.
4. In `Start_PocketOps.html` einen Eintrag in der passenden Gruppe von `GRUPPEN`
   ergänzen — mit `tools/` davor — und Name und Beschreibung ins Wörterbuch
   `_design/sprache/Start_PocketOps.js` nachtragen.
5. Auf Englisch schalten, das Werkzeug einmal durchklicken und `poLuecken()`
   abrufen. Was dort noch steht, fehlt im Wörterbuch.
