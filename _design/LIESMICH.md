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
| `po-base.js` | `poToast`, `poConfirm`, `poAsk`, `poEsc`, `poDownload`, `poReadFile`, das Speichern (`poSichern`, `poLaden`, `poBeimVerlassen`), dazu Sprache und Anleitung |
| `sprache/<Datei>.js` | je Werkzeug: Kurzanleitung in beiden Sprachen und das Wörterbuch |
| `po-icon.svg` | das Produktzeichen, das als Favicon im Kopf jedes Werkzeugs steht |
| `sync.mjs` | schreibt alles in die Werkzeuge |
| `pruef/` | die Proben: Chrome ohne Fenster, Werkzeuge bedienen, nachsehen |

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

## Speichern

**Jede Eingabe wird augenblicklich abgelegt.** Für den Browser-Speicher gibt es
keinen Speicherknopf und soll keinen geben: wer ein Ticket anlegt und das Fenster
schliesst, muss es beim nächsten Öffnen wiederfinden. Der Knopf oben rechts ist
etwas anderes — er legt die `.json`-Datei ab, die den Browser überlebt.

Die Werkzeuge sprechen `localStorage` nicht selbst an. Sie gehen über drei
Funktionen aus `po-base.js`:

```js
poSichern('po_kanban', tickets)     // schreibt sofort, liefert true/false
poLaden('po_kanban', [])            // liest zurück, verträgt Schrott
poVergessen('po_kanban')            // Stand löschen
```

Das ist nicht Geschmackssache, sondern hat drei Gründe.

**Erster Grund: ein Fehlschlag darf nicht stumm bleiben.** Alle Werkzeuge laufen
unter derselben Adresse `file://` und teilen sich darum *einen* Vorrat von wenigen
Megabyte. Läuft er über, wirft `setItem`. Vorher stand der Aufruf in acht
Werkzeugen ohne `try` — die Karte war gezeichnet, gespeichert war nichts, und die
Ausnahme fiel mitten aus `render()` heraus. In den übrigen stand ein `catch`, das
den Fehler verschluckte. Beides endete gleich: der Nutzer sah seine Arbeit und
hatte sie nicht. `poSichern` fängt den Fehler, liest den Wert zurück und stellt
bei einem Fehlschlag einen Streifen unten ans Fenster, der stehen bleibt, bis
wieder geschrieben werden kann.

Der Streifen verschwindet nur, wenn *derselbe* Schlüssel wieder durchgeht. Sonst
hätte eine Nebensache, die auch bei vollem Speicher noch hineinpasst — eine
Seitenleisten-Einstellung etwa —, den Hinweis weggeräumt, während die eigentliche
Arbeit weiterhin nicht gespeichert wird.

**Zweiter Grund: ein unbrauchbarer Stand darf nicht zum Absturz führen.**
`poLaden` gibt bei kaputtem JSON den Ersatzwert zurück statt zu werfen. Damit
braucht der Aufrufer kein `try` mehr — und soll auch keines haben, denn dort
verdeckt es nur noch Fehler im Quelltext. Genau das war im Kanban und in der
Stakeholder-Karte passiert: beide luden ihren Stand, *bevor* die Hilfsfunktion
dafür deklariert war. Der `ReferenceError` aus der Deklarationslücke fiel ins
`catch`, der Lader gab leer zurück, und das erste Zeichnen schrieb das Leere über
den gespeicherten Stand. Die Tickets waren nach jedem Neuöffnen weg — in jedem
Browser, von Anfang an.

Daraus die Regel: **erst alle Deklarationen, dann laden, dann zeichnen.** Der
Ladeaufruf steht am besten unten, direkt vor dem ersten `render()`, nicht oben bei
`let tickets = …`.

**Dritter Grund: alte Stände sollen nicht verloren gehen.** `poLaden` gibt
unparsbaren Rohtext zurück, wenn der Ersatzwert eine Zeichenkette ist — so liest
der Markdown-Editor seinen Text von früher weiter, der damals nackt im Speicher
lag. Für Ja/Nein gibt es `_poJa`, das `true`, `1` und `'1'` gleich behandelt.

### Was gebündelt schreibt, muss beim Verlassen abschliessen

Ein Zeichenbrett schreibt nicht bei jedem Strich. Whiteboard, Notizbuch, Dokument
und SlideCraft bündeln ihre Schreibvorgänge auf eine halbe Sekunde. Wer tippt und
sofort schliesst, verlöre sonst den letzten Satz. Dafür gibt es:

```js
poBeimVerlassen(sichern);
```

Das hängt sich an `visibilitychange`, `pagehide` **und** `beforeunload`. Nicht nur
an `beforeunload`: beim Schliessen eines Tabs löst Chrome den nicht verlässlich
aus. Der Aufruf muss mehrfaches Ausführen aushalten — bei einem Schreibvorgang,
der immer denselben Stand ablegt, ist das gegeben. `visibilitychange` hat einen
zweiten Nutzen: es greift auch beim blossen Tab-Wechsel, dann ist der Stand schon
weg, bevor etwas schiefgehen kann.

### Die vier Werkzeuge mit eigener Ablage

Notizbuch, Dokument, SlideCraft und Sprachmemo legen nicht in `localStorage` ab,
sondern in IndexedDB — dort passen Bilder und Tonaufnahmen hinein, die den Vorrat
von `localStorage` sprengen würden. Sie benutzen `poSichern` also nicht, sollen
aber denselben Streifen zeigen:

```js
if (!db) { poSpeicherStoerung(); return; }     // statt stumm zurückzugehen
…
poSpeicherBehoben();                           // nach geglücktem Schreiben
```

Vorher stand an diesen Stellen ein nacktes `return` beziehungsweise ein
`console.warn`. In der Konsole sieht das niemand, der eine Präsentation baut.

### Eine Falle in SlideCraft

Dort steht der Block `PO-BASE` im **letzten** `<script>` der Datei, nicht im
ersten. Alles aus `po-base.js`, was beim Auswerten eines früheren Blocks
*aufgerufen* wird, ist dort noch nicht deklariert. Zur Laufzeit ist es da — die
Anmeldung von `poBeimVerlassen` wartet darum auf `DOMContentLoaded`.

### Der Speicher gehört dem Browser

Das ist die Verwechslung, die sich sonst nicht auflösen lässt: wer dieselbe Datei
abwechselnd in Chrome und in Edge öffnet, sieht zwei getrennte Ablagen und hält
das für Datenverlust. Zwei Stellen sagen es darum ausdrücklich:

* die Anleitung in jedem Werkzeug nennt den Browser, in dem man gerade sitzt
  (`poBrowser()`), und erklärt die Trennung;
* `Sicherung.html` zeigt oben, was im Speicher liegt, je Werkzeug mit Grösse und
  Belegung (`poSpeicherLage()`). Liegt dort nichts, sagt der Kasten, dass man im
  anderen Browser nachsehen soll.

Die Grenze von 5 MB ist nicht abfragbar. Der Balken dort ist als Anhalt zu lesen,
die Zahl davor ist gemessen.

### Was bewusst nicht gemacht wurde

**Kein Durchschreiben in eine echte Datei.** Das wäre haltbar auch gegen
Aufräumprogramme, bräuchte aber die File-System-Access-Schnittstelle, und ob die
bei `file://`-Adressen bereitsteht, ist nicht geprüft. Solange das offen ist,
bleibt die `.json`-Datei der Weg nach draussen.

**Kein Zurückholen eines laufenden Timers.** Der Timer merkt sich die *eingestellte*
Zeit, nicht den Lauf. Einen laufenden Zähler über das Schliessen zu retten hiesse
zu entscheiden, ob er in der Zwischenzeit weitergelaufen ist — und beides wäre
falsch.

### Zwei Umfänge, zwei Knöpfe

Vorher hiess derselbe Knopf in sieben Werkzeugen „Sichern", in sechs
„Speichern" und in einem „Alles sichern" — und in der Übersicht sicherte er
nur die Übersicht. Jetzt sagt die Beschriftung, was er umfasst:

| Knopf | wo | Umfang |
| --- | --- | --- |
| `Speichern Gesamtsystem` | Übersicht | alles: die Übersicht, jedes Werkzeug, Bilder und Tonaufnahmen. Zurück über `Gesamtsystem öffnen`. |
| `Tool speichern` | im Werkzeug | nur dieses eine. Zurück über `Öffnen`. |

Die Beschriftung darf nicht wieder auseinanderlaufen; `_design/pruef/knoepfe.mjs`
prüft über alle Dateien, dass kein Sicherungsknopf eine alte Beschriftung trägt
und dass alle sechzehn mit Sicherung `Tool speichern` heissen.

Was das Gesamtsystem umfasst, steht nicht in der Übersicht, sondern in
`PO_ABLAGEN` in `po-base.js`: die Schlüssel in `localStorage`, die aus früheren
Fassungen, und die fünf Datenbanken in IndexedDB. Dieselbe Liste speist die
Auskunft auf `Sicherung.html`. **Kommt ein Werkzeug dazu, gehört sein Schlüssel
dorthin** — sonst wandert seine Arbeit nicht in die Gesamtsicherung, und das
fällt erst auf, wenn jemand sie braucht.

### Wie die Übersicht an die Werkzeuge kommt

Alle Dateien der Reihe laufen unter derselben Adresse `file://`. Der Browser
gibt ihnen darum denselben Speicher: die Übersicht liest den Stand aller
Werkzeuge, ohne eines davon zu öffnen. Nachgemessen in Chrome —
`indexedDB.databases()` nennt von der Übersicht aus die Datenbanken der
Werkzeuge, und ihr Inhalt lässt sich lesen.

Vier Dinge, über die der Entwurf gestolpert ist:

1. **`indexedDB.open(name)` legt eine fehlende Datenbank an.** Ein Sichern darf
   nichts hinterlassen, was vorher nicht da war. `_gsVorhandene()` fragt darum
   erst `databases()`; wo das fehlt, öffnet es, erkennt am leeren
   Behälterverzeichnis die eben entstandene Datenbank und löscht sie wieder.

2. **Beim Zurückholen gibt es nichts zu lesen.** Auf einem Rechner, der ein
   Werkzeug noch nie geöffnet hat, existiert seine Datenbank nicht — und damit
   auch kein Behälter, in den man schreiben könnte. `_gsDbSchreiben` würde
   stumm nichts tun. Darum steht in `PO_ABLAGEN.datenbanken` die Form jedes
   Behälters samt Schlüsselpfad, und die Übersicht legt sie bei Bedarf selbst
   an. Das ist genau der Fall „neuer Browser, Sicherung einlesen", also der
   Hauptzweck der ganzen Übung; `_design/pruef/gesamtsystem.mjs` fährt ihn mit
   zwei Chrome-Profilen durch.

3. **Ein Blob überlebt `JSON.stringify` nicht.** Es käme ein leeres Objekt
   heraus, und niemand merkte etwas — eine Sicherung ohne die Tonaufnahmen,
   die aussieht wie eine vollständige. Bilder und Ton gehen darum als Base64
   mit, rekursiv durch den ganzen Wert, weil der Blob je nach Werkzeug
   verschieden tief liegt. Umgewandelt wird in Stücken von 32 kB:
   `String.fromCharCode` mit einer Tonaufnahme als Argumentliste sprengt den
   Aufrufstapel.

4. **Beim Zurückholen muss der Behälter erst geleert werden.** Sonst blieben
   Bilder stehen, die in der Sicherung nicht vorkommen, und der Vorrat wüchse
   mit jedem Einlesen.

Zurückgeholt wird, was in der Datei steht; Werkzeuge, die darin nicht
vorkommen, bleiben unverändert. Die Rückfrage sagt das ausdrücklich und zählt
die betroffenen Werkzeuge auf — „alles wird ersetzt" wäre gelogen, und
„irgendwas wird ersetzt" wäre keine Grundlage für ein Ja.

Die Werte aus `speicher` gehen mit `localStorage.setItem` zurück, **nicht** über
`poSichern`: in der Datei liegen sie schon als fertiger Text, so wie sie im
Speicher standen. `poSichern` würde sie ein zweites Mal in JSON einpacken.

### Was die Gesamtsicherung nicht ist

**Keine Sicherung der Dateien selbst.** Sie enthält, was du angelegt hast, nicht
die Werkzeuge. Die kommen aus der ZIP.

**Nicht klein.** Eine Tonaufnahme oder ein Dutzend Bilder in SlideCraft machen
aus wenigen Kilobyte schnell viele Megabyte. Das ist der Preis der
Vollständigkeit; wie gross es geworden ist, sagt die Meldung am Ende.

**Nicht verschlüsselt.** Eine Textdatei, lesbar im Editor — wie die
Einzelsicherungen auch. Wer sie in eine Wolke legt, legt den Inhalt dorthin.

## Die Proben

```
node _design/pruef/alle.mjs
node _design/pruef/speicher.mjs Kanban      nur die passenden
```

Sie starten Chrome ohne Fenster, laden die Werkzeuge als `file://`-Adressen und
bedienen sie. Es braucht **kein** `npm install`: der Treiber in `pruef/cdp.mjs`
spricht das DevTools-Protokoll über den WebSocket, den Node selbst mitbringt.
Steht Chrome woanders, hilft `POCKETOPS_CHROME`.

| Probe | prüft |
| --- | --- |
| `speicher.mjs` | Je Werkzeug: etwas eingeben, Seite neu laden, nachsehen, ob es noch da ist. Das ist die Probe, an der Kanban und Stakeholder-Karte durchgefallen sind. |
| `warnung.mjs` | Speicher randvoll schreiben, dann ein Ticket anlegen: steht der Streifen, bleibt der Haken „gespeichert" aus, zeichnet das Brett trotzdem weiter, geht der Streifen nach dem Aufräumen weg? |
| `ablage.mjs` | Notizbuch, Dokument und SlideCraft mit ausgefallener IndexedDB: kommt der Streifen, geht er wieder weg? |
| `gesamtsystem.mjs` | In vier Werkzeugen etwas anlegen, Gesamtsystem sichern, Chrome mit frischem Profil starten, einlesen, überall nachsehen — ein Bild inbegriffen, einmal durch Base64 und zurück. |
| `knoepfe.mjs` | Dass die Beschriftung der Sicherungsknöpfe nicht wieder auseinanderläuft, in beiden Sprachen. |
| `sicherung.mjs` | Der Kasten auf `Sicherung.html`: nennt er den Browser, meldet er leer als leer, steht der Werkzeugname statt des Schlüssels da, geht er beim Umschalten der Sprache mit? |
| `sprache.mjs` | Die neuen Texte auf Englisch, und `poLuecken()` darf bei ihnen nichts melden. |

Jede Probe startet ein eigenes Chrome mit **frischem Profil**. Der Speicher ist
damit leer, und eine bestandene Probe beweist, dass das Werkzeug selbst
geschrieben hat — nicht, dass von früher noch etwas dalag.

Zwei Dinge, über die man beim Schreiben einer Probe stolpert:

1. *Der Haken „gespeichert" steht womöglich schon.* Die Seite speichert beim Laden
   einmal erfolgreich. Wer prüfen will, dass er nach einem Fehlschlag ausbleibt,
   muss ihn vorher wegnehmen.
2. *Rückwärtsstriche in einer Vorlage in einer Vorlage.* Aus `/\s+/` wurde beim
   ersten Versuch `/s+/`; das strich jedes s aus dem Text, und zwei Zusicherungen
   schlugen scheinbar fehl, obwohl die Seite stimmte. Normalisiert wird darum in
   Node, nicht in der Seite.

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

Oben darüber steht, was gerade wirklich im Browser liegt: welcher Browser den
Speicher hält, welches Werkzeug wie viel belegt, und was die zwei Umfänge der
Sicherung unterscheidet. Der Kasten steht **einmal** da und nicht je Sprache,
weil sein Inhalt aus Zahlen besteht — die Beschriftung setzt das Skript, und
po-base ruft nach dem Umschalten von sich aus `poNeuZeichnen` auf. Die Namen
der Werkzeuge kommen aus `PO_ABLAGEN`, nicht aus einer zweiten Liste.

Liegt dort nichts, sagt der Kasten nicht „leer", sondern den Grund, der
wahrscheinlicher ist: im anderen Browser nachsehen. Einstellungen — Sprache,
Angeheftetes, Seitenleisten — zählen dabei nicht als Arbeitsstand, sonst
meldete der frisch ausgepackte Ordner nach dem ersten Sprachwechsel, es liege
schon etwas darin.

Sie steht in der Übersicht in der eigenen Gruppe „Zum Nachlesen" und wird aus
jedem Hilfefenster heraus verlinkt.

## Der Kopf jedes Werkzeugs

Überall gleich aufgebaut: Markenzeichen, „POCKETOPS", Name des Werkzeugs, ein
Chip mit einem Satz dazu, rechts die Aktionen. Das Markenzeichen führt zurück
auf `Start_PocketOps.html` eine Ebene darüber.

Reihenfolge der Aktionen rechts, von links nach rechts: erst das Beiläufige
(Tool speichern, Öffnen), dann ein Trenner, dann das Gefährliche (Zurücksetzen) und
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
Anlass, zuletzt die Pause. Zehn, sechs, fünf und drei Werkzeuge, dazu eine
Seite zum Nachlesen.

| Gruppe | Gedanke | Werkzeuge |
| --- | --- | --- |
| **Große Werkzeuge** | ausgebaut, für längeres Arbeiten | Tagesplan, SlideCraft, Dokument, Mindmap, Diagramm, Whiteboard, PDF-Werkzeuge, Kanban, Kanban mit Bahnen, Roadmap |
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
6. Den Stand über `poSichern`/`poLaden` ablegen — nie über `localStorage`
   unmittelbar — und **erst nach allen Deklarationen laden**, direkt vor dem
   ersten Zeichnen. Warum, steht oben unter „Speichern".
7. Den Schlüssel in `PO_ABLAGEN` in `po-base.js` eintragen. Ohne das wandert
   die Arbeit des Werkzeugs **nicht** in die Gesamtsicherung, und auf
   `Sicherung.html` steht ein Schlüssel ohne Namen. Legt das Werkzeug in
   IndexedDB ab, gehören auch seine Behälter samt Schlüsselpfad dorthin.
8. Den Sicherungsknopf `Tool speichern` nennen.
9. In `_design/pruef/speicher.mjs` eine Probe eintragen: etwas eingeben, neu
   laden, nachsehen. Dann `node _design/pruef/alle.mjs`.
