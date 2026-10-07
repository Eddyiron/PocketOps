# PocketOps

25 kleine Büro-Werkzeuge, die im Browser laufen. Kein Konto, keine Installation,
kein Server. Jedes Werkzeug ist **eine einzige HTML-Datei** — Doppelklick genügt.

## Anfangen

**[ZIP herunterladen](https://github.com/Eddyiron/PocketOps/archive/refs/tags/v1.0.zip)
→ entpacken → `Start_PocketOps.html` öffnen.** Das ist die Übersicht; von dort
führt alles Weitere.

> **Erst entpacken, sonst geht nichts.** Windows zeigt ZIP-Dateien wie Ordner an.
> Klickt man `Start_PocketOps.html` direkt darin an, packt Windows nur diese eine
> Datei aus — der Ordner `tools` fehlt dann, und keine Kachel führt irgendwohin.
> Also: Rechtsklick auf die ZIP → *Alle extrahieren…*, und erst danach öffnen.

```
PocketOps/
  Start_PocketOps.html   ← hier anfangen
  tools/                 die 25 Werkzeuge
  _design/               gemeinsame Gestaltung, nichts zum Anklicken
```

Wer mag, legt sich `Start_PocketOps.html` als Lesezeichen an.

## Was drin ist

| | |
| --- | --- |
| **Planen** | Roadmap, Tagesplan, Kanban, Kanban mit Bahnen, Mindmap |
| **Schreiben und Zeigen** | Dokument (Word-Ausgabe), SlideCraft (PowerPoint-Ausgabe), Markdown-Editor, Notizbuch, Whiteboard, Diagramm |
| **Entscheiden** | Entscheidungsmatrix, Priorisierungsmatrix, RACI-Matrix, Stakeholder-Karte, Team-Radar |
| **Kleinkram** | Rechner, Timer, Sprachmemo, Bildausschnitt, PDF-Werkzeuge, Sichern & Zurückholen |
| **Pause** | Drei gewinnt, Vier gewinnt, Galgenmännchen |

Alles auf Deutsch und Englisch, umschaltbar oben rechts.

## Wo deine Daten liegen

Im Speicher deines Browsers, auf deinem Rechner. Nichts wird an einen Server
geschickt, es gibt keinen.

**Was du eingibst, ist augenblicklich abgelegt.** Es gibt keinen Knopf dafür und
muss keinen geben: ein neues Ticket, ein getippter Satz, ein verschobener Zettel
sind in demselben Moment im Speicher, in dem sie auf dem Schirm stehen. Beim
nächsten Öffnen ist alles wieder da. Klappt das einmal nicht — weil der Vorrat
voll ist oder der Browser nichts ablegen darf —, dann sagt das Werkzeug es mit
einem Streifen unten am Fenster, der stehen bleibt. Still geht nichts verloren.

**Drei Dinge, die man wissen sollte:**

1. **Der Speicher gehört dem Browser, nicht der Datei.** Öffnest du dasselbe
   Werkzeug einmal in Chrome und einmal in Edge, sind es zwei getrennte Ablagen:
   das eine Fenster zeigt deine Arbeit, das andere ist leer. Verloren ist dabei
   nichts — es liegt im jeweils anderen Browser. Wer wechseln will, nimmt die
   `.json`-Datei als Weg dazwischen.
2. **Browser-Speicher ist flüchtig.** Räumt jemand den Browser auf, ist die Arbeit
   weg. Die Sicherung als Datei ist die eigentliche Sicherung — und davon gibt es
   zwei Umfänge:

   | Knopf | wo | was |
   | --- | --- | --- |
   | **Speichern Gesamtsystem** | Übersicht | eine Datei mit allem: die Übersicht, jedes Werkzeug, Bilder und Tonaufnahmen. Dazu **Gesamtsystem öffnen**, um sie zurückzuholen — auch in einen anderen Browser oder auf einen anderen Rechner. |
   | **Tool speichern** | im Werkzeug | nur dieses eine Werkzeug. Für das Weitergeben eines Bretts oder einer Karte; zurück über **Öffnen**. |

   Fürs regelmäßige Sichern nimm das Gesamtsystem. Was gerade im Speicher liegt
   und wie viel davon belegt ist, zeigt `tools/Sicherung.html` oben auf der Seite.
3. **Neun der Werkzeuge laden beim Öffnen eine Programmbibliothek nach** — aus dem
   Netz, nicht aus diesem Ordner. Der jeweilige Server erfährt dabei deine
   IP-Adresse. Betroffen sind SlideCraft, PDF-Werkzeuge, Markdown-Editor,
   Mindmap, RACI-Matrix, Stakeholder-Karte, Priorisierungsmatrix,
   Entscheidungsmatrix und Dokument. Die Anleitung (`?` oben rechts) nennt in
   jedem Werkzeug die konkreten Quellen. Woran du arbeitest, verlässt den
   Rechner auch dabei nicht.

Die übrigen 16 Werkzeuge laufen vollständig ohne Internetverbindung.

## Fremde Bibliotheken

| Bibliothek | wofür | Lizenz |
| --- | --- | --- |
| [Chart.js](https://www.chartjs.org/) | Diagramme in den Matrizen | MIT |
| [docx](https://github.com/dolanmiu/docx) | Word-Ausgabe | MIT |
| [marked](https://marked.js.org/) | Markdown lesen | MIT |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Markdown sicher anzeigen | Apache-2.0 oder MPL-2.0 |
| [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) | PDF-Ausgabe | MIT |
| [Tailwind CSS](https://tailwindcss.com/) | Gestaltung in SlideCraft | MIT |
| [Font Awesome Free](https://fontawesome.com/) | Symbole in SlideCraft | CC BY 4.0 (Symbole), SIL OFL 1.1 (Schrift), MIT (Code) |
| [PptxGenJS](https://gitbrent.github.io/PptxGenJS/) | PowerPoint-Ausgabe | MIT |
| [pdf-lib](https://pdf-lib.js.org/) | PDF zusammenführen und teilen | MIT |
| [pdf.js](https://mozilla.github.io/pdf.js/) | PDF anzeigen | Apache-2.0 |

## Lizenz

[MIT](LICENSE). Nimm es, gib es weiter, bau es um — auch gewerblich. Der
Urheberhinweis muss mitgehen.

**Zur Haftung:** PocketOps wird unentgeltlich und ohne Gewährleistung abgegeben.
Der Haftungsausschluss der MIT-Lizenz gilt, soweit deutsches Recht ihn zulässt;
die Haftung für Vorsatz sowie für Schäden an Leben, Körper und Gesundheit bleibt
davon unberührt. Das praktische Risiko ist Datenverlust — siehe oben, Punkt 1.

## Trinkgeld

PocketOps ist frei und bleibt es. Wenn dir eines der Werkzeuge den Tag leichter
gemacht hat, freue ich mich über ein Trinkgeld — der ♥-Knopf oben rechts in jedem
Werkzeug führt hin. Das ist eine freiwillige Zuwendung an eine Privatperson, keine
Spende im steuerlichen Sinn; eine Spendenquittung gibt es dafür nicht.

## Mitarbeit

Jedes Werkzeug trägt die gemeinsame Gestaltung eingebettet, damit es als einzelne
Datei läuft. Die Urfassungen liegen in `_design/`. Wer dort etwas ändert, zieht es
anschließend überall nach:

```
node _design/sync.mjs
```

Was zwischen den Marken `PO-TOKENS`, `PO-BASE`, `PO-SPRACHE` und `PO-ICON` steht,
wird dabei überschrieben — dort also nicht von Hand hineinschreiben. Mehr dazu in
[`_design/LIESMICH.md`](_design/LIESMICH.md).

Danach die Proben laufen lassen. Sie starten Chrome ohne Fenster, bedienen die
Werkzeuge und sehen nach, ob eine Eingabe das Schliessen und erneute Öffnen
übersteht — es braucht kein `npm install`:

```
node _design/pruef/alle.mjs
```

Fragen und Fehler bitte als Issue hier im Projekt.
