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

Im Speicher deines Browsers (`localStorage`), auf deinem Rechner. Nichts wird an
einen Server geschickt, es gibt keinen.

**Zwei Dinge, die man wissen sollte:**

1. **Browser-Speicher ist flüchtig.** Räumt jemand den Browser auf, ist die Arbeit
   weg. Jedes Werkzeug kann über **Sichern** eine `.json`-Datei ablegen und über
   **Öffnen** wieder einlesen. Das ist die eigentliche Sicherung.
2. **Neun der Werkzeuge laden beim Öffnen eine Programmbibliothek nach** — aus dem
   Netz, nicht aus diesem Ordner. Der jeweilige Server erfährt dabei deine
   IP-Adresse. Betroffen sind SlideCraft, PDF-Werkzeuge, Markdown-Editor, Mindmap,
   RACI-Matrix, Stakeholder-Karte, Priorisierungsmatrix, Entscheidungsmatrix und
   Dokument. Die Anleitung (`?` oben rechts) nennt in jedem Werkzeug die konkreten
   Quellen. Woran du arbeitest, verlässt den Rechner auch dabei nicht.

Die übrigen 17 Werkzeuge laufen vollständig ohne Internetverbindung.

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

Fragen und Fehler bitte als Issue hier im Projekt.
